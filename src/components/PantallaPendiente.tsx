import type { ReactNode } from 'react';

interface PantallaPendienteProps {
  titulo: string;
  descripcion: string;
  children?: ReactNode;
}

/** Relleno de una pantalla de la etapa 1 que todavía no tiene su tarea implementada. */
export function PantallaPendiente({ titulo, descripcion, children }: PantallaPendienteProps) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-3 p-6 text-center">
      <h1 className="text-2xl font-semibold text-brand-700">{titulo}</h1>
      <p className="text-stone-600">{descripcion}</p>
      {children}
    </main>
  );
}
