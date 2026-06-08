import type { FunStep } from '@/types/charts'

/** Ancho mínimo visual de un paso del funnel (%). */
export const FUNNEL_MIN_W = 4
/** Umbral bajo el cual el badge se renderiza fuera de la barra. */
export const FUNNEL_NARROW = 28

/**
 * Calcula los anchos visuales de cada paso del funnel.
 * Port literal de `rFunnel`: cada paso es % del anterior, con amortiguación por
 * raíz cuadrada del ratio para que las caídas extremas no colapsen la barra.
 */
export function funnelWidths(funs: FunStep[]): number[] {
  const widths: number[] = []
  funs.forEach((s, i) => {
    if (i === 0) {
      widths.push(100)
    } else {
      const prev = funs[i - 1].n || 0
      const curr = s.n || 0
      const ratio = prev > 0 ? Math.min(curr / prev, 1) : 0
      const visualRatio = Math.sqrt(ratio)
      const newW = widths[i - 1] * visualRatio
      widths.push(Math.max(newW, FUNNEL_MIN_W))
    }
  })
  return widths
}
