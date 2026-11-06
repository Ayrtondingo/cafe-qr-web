/**
 * Variables de entorno públicas (VITE_*), validadas al iniciar.
 * Sin Zod a propósito: este archivo va en el bundle inicial y Zod solo hace falta
 * en los formularios (que se cargan bajo demanda).
 */
function readApiUrl(): string {
  const value: unknown = import.meta.env.VITE_API_URL;
  if (value === undefined || value === '') return '/api/v1';
  if (typeof value !== 'string') throw new Error('VITE_API_URL inválida');
  return value;
}

export const env = {
  VITE_API_URL: readApiUrl(),
} as const;
