import { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError } from '@/utils/api-error';
import { http, unwrap } from './http';

function responder(config: InternalAxiosRequestConfig, status: number, data: unknown) {
  const response = { status, statusText: '', headers: {}, config, data };
  if (status >= 400) {
    return Promise.reject(new AxiosError('error', 'ERR', config, null, response));
  }
  return Promise.resolve(response);
}

describe('http', () => {
  const adapter = vi.fn();

  beforeEach(() => {
    adapter.mockReset();
    http.defaults.adapter = adapter;
  });

  it('usa el prefijo /api/v1 por defecto', () => {
    expect(http.defaults.baseURL).toBe('/api/v1');
  });

  it('desenvuelve { data }', async () => {
    adapter.mockImplementation((config: InternalAxiosRequestConfig) =>
      responder(config, 200, { data: { estado: 'ok' } }),
    );

    await expect(unwrap(http.get('/health'))).resolves.toEqual({ estado: 'ok' });
  });

  it('rechaza con un ApiError normalizado', async () => {
    adapter.mockImplementation((config: InternalAxiosRequestConfig) =>
      responder(config, 409, {
        codigo: 'PRODUCTO_AGOTADO',
        mensaje: 'El producto está agotado',
        detalles: null,
      }),
    );

    const error: unknown = await http.get('/x').catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 409, codigo: 'PRODUCTO_AGOTADO' });
  });
});
