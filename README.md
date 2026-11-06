# cafe-qr-web

Web del sistema para café: carta y pedidos por QR para el cliente, y panel del local (salón, barra, caja y admin). React 19 + Vite 8 + Tailwind 4.

## Requisitos

- Node 24 (ver `.nvmrc`)
- La API (`cafe-qr-api`) corriendo en http://localhost:3000 para usar datos reales

## Puesta en marcha

```bash
cp .env.example .env
npm install
npm run dev              # http://localhost:5173
```

Pantallas: `/m/<código del QR>` (cliente), `/panel/salon`, `/panel/barra`, `/panel/caja`, `/panel/admin`.

## Tests

```bash
npm test
```

La especificación, el contrato con la API y los ADR están en el repo `cafe-qr` (`docs/`).
