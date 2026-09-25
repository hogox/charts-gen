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

/** Entero con separador de miles es-CL (ej. 2.461). */
export function formatInt(n: number): string {
  return Math.round(n).toLocaleString('es-CL')
}

/** Número es-CL con coma decimal y hasta `maxDecimals` decimales (ej. 43,2). */
export function formatNum(v: number, maxDecimals = 2): string {
  return v.toLocaleString('es-CL', { maximumFractionDigits: maxDecimals })
}

/** Porcentaje es-CL (ej. 43,2%). */
export function formatPct(v: number): string {
  return `${formatNum(v)}%`
}

/**
 * Normaliza lo que escribe el usuario a un string que `parseFloat` entiende.
 * Enteros: descarta todo salvo dígitos y signo (así "2.461" → "2461").
 * Decimales: si hay coma, los puntos son miles y la coma es el decimal.
 */
export function normalizeNumInput(raw: string, integer: boolean): string {
  const s = raw.replace(/\s/g, '')
  if (integer) return s.replace(/[^\d-]/g, '')
  return s.includes(',') ? s.replace(/\./g, '').replace(',', '.') : s
}

/** Formato es-CL con N decimales fijos (para CES). */
export function formatCL(v: number, decimals: number): string {
  return v.toLocaleString('es-CL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}
