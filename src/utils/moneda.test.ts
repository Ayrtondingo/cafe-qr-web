import { describe, expect, it } from 'vitest';
import { formatearPesos } from './moneda';

describe('formatearPesos', () => {
  it.each([
    [150050, '$ 1.500,50'],
    [0, '$ 0,00'],
    [7, '$ 0,07'],
    [100, '$ 1,00'],
    [123456789, '$ 1.234.567,89'],
    [-50, '-$ 0,50'],
  ])('%i centavos → "%s"', (centavos, esperado) => {
    expect(formatearPesos(centavos)).toBe(esperado);
  });

  it('rechaza montos que no son centavos enteros', () => {
    expect(() => formatearPesos(1500.5)).toThrow(RangeError);
    expect(() => formatearPesos(Number.NaN)).toThrow(RangeError);
  });
});
