import { renderToString } from 'react-dom/server';
import { createElement, type ComponentType } from 'react';
import { matchRoutes, MemoryRouter, Route, Routes, type RouteObject } from 'react-router';
import { describe, expect, it } from 'vitest';
import { rutas } from './rutas';

/** Carga la pantalla perezosa de la ruta, sola, y la renderiza en esa URL. */
async function renderizar(url: string): Promise<string> {
  const match = matchRoutes(rutas, url);
  expect(match).not.toBeNull();
  const ruta = match!.at(-1)!.route as RouteObject;
  const lazy = typeof ruta.lazy === 'function' ? await ruta.lazy() : {};
  const Component = ('Component' in lazy ? lazy.Component : ruta.Component) as ComponentType;
  expect(Component).toBeTypeOf('function');

  return renderToString(
    createElement(
      MemoryRouter,
      { initialEntries: [url] },
      createElement(
        Routes,
        null,
        createElement(Route, { path: ruta.path, element: createElement(Component) }),
      ),
    ),
  );
}

describe('rutas', () => {
  it.each([
    ['/panel/salon', 'Salón'],
    ['/panel/barra', 'Barra'],
    ['/panel/caja', 'Caja'],
    ['/panel/admin', 'Administración'],
  ])('%s carga y renderiza su pantalla', async (url, titulo) => {
    expect(await renderizar(url)).toContain(titulo);
  });

  it('la carta del cliente toma el código del QR de la URL', async () => {
    const html = await renderizar('/m/A7K2QX9P');

    expect(html).toContain('Carta');
    expect(html).toContain('A7K2QX9P');
  });

  it('una URL desconocida muestra la página de no encontrada', async () => {
    expect(await renderizar('/cualquier-cosa')).toContain('Página no encontrada');
  });
});
