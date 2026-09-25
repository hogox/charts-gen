import type { LineRow, LineSeries, Point } from '@/types/charts'
import { seriesColor } from '@/lib/colors'

/** Datos del gráfico "Líneas". Las operaciones devuelven copias nuevas. */
export interface LineaData {
  lineaSeries: LineSeries[]
  lineaRows: LineRow[]
}

const EMPTY_VAL = { v: 0, n: 0 }

/** Convierte el modelo antiguo (una sola línea de `Point`) al de varias líneas. */
export function pointsToLinea(points: Point[]): LineaData {
  return {
    lineaSeries: [{ name: 'Línea 1', c: seriesColor(0) }],
    lineaRows: points.map((p) => ({ l: p.l, vals: [{ v: p.v, n: p.n }] })),
  }
}

export function addPeriod(d: LineaData): LineaData {
  return {
    ...d,
    lineaRows: [...d.lineaRows, { l: 'Nuevo', vals: d.lineaSeries.map(() => ({ ...EMPTY_VAL })) }],
  }
}

export function removePeriod(d: LineaData, row: number): LineaData {
  return { ...d, lineaRows: d.lineaRows.filter((_, i) => i !== row) }
}

export function renamePeriod(d: LineaData, row: number, l: string): LineaData {
  return { ...d, lineaRows: d.lineaRows.map((r, i) => (i === row ? { ...r, l } : r)) }
}

export function addSeries(d: LineaData): LineaData {
  const idx = d.lineaSeries.length
  return {
    lineaSeries: [...d.lineaSeries, { name: `Línea ${idx + 1}`, c: seriesColor(idx) }],
    lineaRows: d.lineaRows.map((r) => ({ ...r, vals: [...r.vals, { ...EMPTY_VAL }] })),
  }
}

export function removeSeries(d: LineaData, series: number): LineaData {
  return {
    lineaSeries: d.lineaSeries.filter((_, i) => i !== series),
    lineaRows: d.lineaRows.map((r) => ({ ...r, vals: r.vals.filter((_, i) => i !== series) })),
  }
}

export function updateSeries(d: LineaData, series: number, patch: Partial<LineSeries>): LineaData {
  return { ...d, lineaSeries: d.lineaSeries.map((s, i) => (i === series ? { ...s, ...patch } : s)) }
}

export function updateValue(
  d: LineaData,
  row: number,
  series: number,
  patch: Partial<{ v: number; n: number }>,
): LineaData {
  return {
    ...d,
    lineaRows: d.lineaRows.map((r, i) =>
      i === row
        ? { ...r, vals: r.vals.map((val, j) => (j === series ? { ...(val ?? EMPTY_VAL), ...patch } : val)) }
        : r,
    ),
  }
}
