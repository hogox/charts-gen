/** Extrae el primer número (admite coma o punto decimal) de un string. NaN si no hay. */
export function parseNum(s: string | number): number {
  const m = String(s).match(/-?\d+(?:[.,]\d+)?/)
  return m ? parseFloat(m[0].replace(',', '.')) : NaN
}

/**
 * Diferencia meta − promedio para las tarjetas KPI del NPS.
 * Devuelve "Faltan Xpts" / "Excede Xpts" / "En meta", o null si no parsea.
 * Port literal de `diffLine` del index.html original.
 */
export function diffLine(metaStr: string, promStr: string): string | null {
  const metaN = parseNum(metaStr)
  const promN = parseNum(promStr)
  if (isNaN(metaN) || isNaN(promN)) return null
  const diff = +(metaN - promN).toFixed(1)
  const abs = Math.abs(diff)
  const absStr = Number.isInteger(abs) ? String(abs) : abs.toFixed(1)
  if (diff > 0) return `Faltan ${absStr}pts`
  if (diff < 0) return `Excede ${absStr}pts`
  return 'En meta'
}

/** Formato es-CL con N decimales fijos (para CES). */
export function formatCL(v: number, decimals: number): string {
  return v.toLocaleString('es-CL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}
