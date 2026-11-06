import axios, { type AxiosError } from 'axios';
import { env } from '@/config/env';
import type { ApiResponse } from '@/types/api';
import { toApiError } from '@/utils/api-error';

/**
 * Cliente HTTP único de la aplicación: ninguna pantalla llama a axios ni a fetch directo.
 * Normaliza todos los errores a ApiError. El token del personal se agrega con la tarea de auth.
 */
export const http = axios.create({
  baseURL: env.VITE_API_URL,
  timeout: 15_000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(toApiError(error)),
);

/** Desenvuelve { data } de las respuestas de la API. */
export async function unwrap<T>(request: Promise<{ data: ApiResponse<T> }>): Promise<T> {
  return (await request).data.data;
}
