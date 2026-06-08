/** Genera ticks de `min` a `max` (inclusive) con paso `step`. */
export function ticksRange(min: number, max: number, step: number): number[] {
  const out: number[] = []
  // redondeo para evitar acumulación de error de punto flotante
  const decimals = step < 1 ? 2 : 0
  for (let v = min; v <= max + 1e-9; v += step) {
    out.push(Number(v.toFixed(decimals)))
  }
  return out
}
