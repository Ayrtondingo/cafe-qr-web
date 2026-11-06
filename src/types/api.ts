/** Espejo de las convenciones de la API (docs/api/contratos.md → Convenciones). */

export interface ApiResponse<T, M = unknown> {
  data: T;
  /** Solo en listas: paginación o totales. */
  meta?: M;
}

export interface ApiErrorBody {
  codigo: string;
  mensaje: string;
  detalles: Record<string, unknown> | null;
  ruta?: string;
  fecha?: string;
  requestId?: string;
}
