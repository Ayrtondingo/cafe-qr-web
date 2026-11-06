import { PantallaPendiente } from '@/components/PantallaPendiente';

export function NotFoundPage() {
  return (
    <PantallaPendiente
      titulo="Página no encontrada"
      descripcion="Si llegaste desde el QR de tu mesa, volvé a escanearlo."
    />
  );
}
