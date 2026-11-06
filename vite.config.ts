import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    build: {
      // Sin source maps en producción: permitirían reconstruir el código fuente.
      sourcemap: false,
    },
    server: {
      port: Number(env.WEB_DEV_PORT) || 5173,
      strictPort: true,
      // En desarrollo, /api se redirige al backend NestJS (misma origin, sin CORS).
      proxy: {
        '/api': { target: env.API_PROXY_TARGET || 'http://localhost:3000' },
      },
    },
    test: {
      environment: 'node',
      include: ['src/**/*.test.{ts,tsx}'],
    },
  };
});
