# cafe-qr-web

Frontend del sistema para café (React 19 + Vite 8 + Tailwind 4). Una sola app con las pantallas del cliente, salón, barra, caja y admin. Las reglas generales, la especificación, el contrato con la API y los ADR están en el repo padre `cafe-qr/` (`CLAUDE.md`, `docs/`).

## Scripts

| Script                       | Qué hace                                                        |
| ---------------------------- | --------------------------------------------------------------- |
| `npm run dev`                | http://localhost:5173 (proxy de `/api` a http://localhost:3000) |
| `npm run typecheck` · `lint` | Tipos y ESLint                                                  |
| `npm test`                   | Vitest (`src/**/*.test.{ts,tsx}`)                               |
| `npm run format:check`       | Prettier                                                        |
| `npm run build`              | Compila a `dist/`                                               |

Antes de terminar una tarea corré `typecheck`, `lint`, `test` y `build`.

## Estructura

- `src/features/{cliente,salon,barra,caja,admin}`: una carpeta por pantalla. **No se importan entre sí.**
- Compartido: `src/components/`, `src/services/` (cliente HTTP), `src/types/`, `src/utils/`, `src/config/`.
- `src/routes/rutas.tsx`: cada pantalla se carga aparte con `lazy`. Rutas: `/m/:codigo` (cliente) y `/panel/{salon,barra,caja,admin}`.

## Reglas de este repo

- Toda llamada a la API pasa por `src/services/http.ts`: nada de `fetch` ni `axios` directo en componentes.
- Los errores llegan siempre como `ApiError` (`status`, `codigo`, `mensaje`, `detalles`). La UI decide el texto según el `codigo`.
- Montos en centavos enteros, como los manda la API. Se formatean solo con `formatearPesos` (`src/utils/moneda.ts`); nada de `parseFloat` ni `toFixed`.
- Solo las variables `VITE_*` llegan al navegador: nunca poner secretos en `.env`.
- La PWA (instalable y con caché de la carta) llega con la tarea de la carta del cliente.
