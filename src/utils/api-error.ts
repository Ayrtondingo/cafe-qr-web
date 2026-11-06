import { isAxiosError } from 'axios';
import type { ApiErrorBody } from '@/types/api';

/** Códigos que genera la web cuando la API no devolvió un error con la forma del contrato. */
export const CodigoErrorWeb = {
  SIN_CONEXION: 'SIN_CONEXION',
  RESPUESTA_INESPERADA: 'RESPUESTA_INESPERADA',
  ERROR_DESCONOCIDO: 'ERROR_DESCONOCIDO',
} as const;

/**
 * Error normalizado de la API. Toda llamada HTTP que falla termina en un ApiError, así la UI
 * siempre trabaja con { status, codigo, mensaje, detalles }.
 */
export class ApiError extends Error {
  /** HTTP status; 0 si no hubo respuesta (sin conexión). */
  readonly status: number;
  readonly codigo: string;
  readonly detalles: Record<string, unknown> | null;
  readonly requestId?: string;

  constructor(status: number, body: ApiErrorBody) {
    super(body.mensaje);
    this.name = 'ApiError';
    this.status = status;
    this.codigo = body.codigo;
    this.detalles = body.detalles;
    this.requestId = body.requestId;
  }
}

function esErrorDeLaApi(value: unknown): value is ApiErrorBody {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as ApiErrorBody).codigo === 'string' &&
    typeof (value as ApiErrorBody).mensaje === 'string'
  );
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (isAxiosError(error)) {
    const body: unknown = error.response?.data;
    if (error.response && esErrorDeLaApi(body)) {
      return new ApiError(error.response.status, { ...body, detalles: body.detalles ?? null });
    }
    if (!error.response) {
      return new ApiError(0, {
        codigo: CodigoErrorWeb.SIN_CONEXION,
        mensaje: 'No se pudo conectar con el servidor.',
        detalles: null,
      });
    }
    return new ApiError(error.response.status, {
      codigo: CodigoErrorWeb.RESPUESTA_INESPERADA,
      mensaje: 'El servidor respondió de forma inesperada.',
      detalles: null,
    });
  }

  return new ApiError(0, {
    codigo: CodigoErrorWeb.ERROR_DESCONOCIDO,
    mensaje: 'Ocurrió un error inesperado.',
    detalles: null,
  });
}
