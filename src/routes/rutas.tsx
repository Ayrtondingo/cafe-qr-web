import type { RouteObject } from 'react-router';
import { NotFoundPage } from '@/pages/NotFoundPage';

/**
 * Rutas de la app. Cada pantalla (cliente, salón, barra, caja, admin) se carga aparte con
 * `lazy`: el celular del cliente no descarga el panel del local, y ninguna pantalla importa a
 * otra (comparten solo components/, services/, types/ y utils/).
 */
export const rutas: RouteObject[] = [
  {
    // El QR de la mesa lleva un código aleatorio, nunca el número de mesa.
    path: '/m/:codigo',
    lazy: async () => ({ Component: (await import('@/features/cliente/CartaPage')).CartaPage }),
  },
  {
    path: '/panel/salon',
    lazy: async () => ({ Component: (await import('@/features/salon/SalonPage')).SalonPage }),
  },
  {
    path: '/panel/barra',
    lazy: async () => ({ Component: (await import('@/features/barra/BarraPage')).BarraPage }),
  },
  {
    path: '/panel/caja',
    lazy: async () => ({ Component: (await import('@/features/caja/CajaPage')).CajaPage }),
  },
  {
    path: '/panel/admin',
    lazy: async () => ({ Component: (await import('@/features/admin/AdminPage')).AdminPage }),
  },
  { path: '*', Component: NotFoundPage },
];
