import { useParams } from 'react-router';
import { PantallaPendiente } from '@/components/PantallaPendiente';

/** Carta del cliente, abierta desde el QR de la mesa (/m/:codigo). */
export function CartaPage() {
  const { codigo = '' } = useParams();
  return (
    <PantallaPendiente titulo="Carta" descripcion="Acá vas a ver la carta y hacer tu pedido.">
      <p className="text-xs text-stone-400">Código de mesa: {codigo}</p>
    </PantallaPendiente>
  );
}
