/**
 * Único lugar donde se formatean montos. La API manda y recibe CENTAVOS ENTEROS
 * (docs/api/contratos.md); acá se pasan a texto sin usar float.
 */
const miles = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 });

/** 150050 → "$ 1.500,50"; -50 → "-$ 0,50". */
export function formatearPesos(centavos: number): string {
  if (!Number.isSafeInteger(centavos)) {
    throw new RangeError(`Monto inválido: ${centavos} no es un entero de centavos`);
  }
  const signo = centavos < 0 ? '-' : '';
  const absoluto = Math.abs(centavos);
  const pesos = miles.format(Math.trunc(absoluto / 100));
  const resto = String(absoluto % 100).padStart(2, '0');
  return `${signo}$ ${pesos},${resto}`;
}
