import { AxiosError, AxiosHeaders } from 'axios';
import { describe, expect, it } from 'vitest';
import { ApiError, toApiError } from './api-error';

function axiosErrorCon(status: number | null, data?: unknown): AxiosError {
  const config = { headers: new AxiosHeaders() };
  const response =
    status === null ? undefined : { status, statusText: '', headers: {}, config, data };
  return new AxiosError('Request failed', 'ERR', config, null, response);
}

describe('toApiError', () => {
  it('usa el cuerpo de error del contrato', () => {
    const error = toApiError(
      axiosErrorCon(409, {
        codigo: 'PRODUCTO_AGOTADO',
        mensaje: 'El producto está agotado',
        detalles: { productoId: 'p1' },
        ruta: '/api/v1/x',
        fecha: '2026-11-05T12:00:00.000Z',
        requestId: 'req-1',
      }),
    );

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({
      status: 409,
      codigo: 'PRODUCTO_AGOTADO',
      message: 'El producto está agotado',
      detalles: { productoId: 'p1' },
      requestId: 'req-1',
    });
  });

  it('deja detalles en null si no vienen', () => {
    const error = toApiError(axiosErrorCon(404, { codigo: 'NO_ENCONTRADO', mensaje: 'No' }));

    expect(error.detalles).toBeNull();
  });

  it('detecta la falta de conexión', () => {
    expect(toApiError(axiosErrorCon(null))).toMatchObject({ status: 0, codigo: 'SIN_CONEXION' });
  });

  it('maneja respuestas que no siguen el formato', () => {
    const error = toApiError(axiosErrorCon(502, '<html>Bad Gateway</html>'));

    expect(error).toMatchObject({ status: 502, codigo: 'RESPUESTA_INESPERADA' });
  });

  it('maneja errores desconocidos', () => {
    expect(toApiError(new Error('boom')).codigo).toBe('ERROR_DESCONOCIDO');
  });
});
