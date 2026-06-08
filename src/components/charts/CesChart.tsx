import { useChartStore } from '@/store/chartStore'
import { ticksRange } from '@/lib/scale'
import { formatCL } from '@/lib/format'
import { ChartTitle } from './EmptyState'
import { LineChartBase } from './LineChartBase'

export function CesChart() {
  const points = useChartStore((s) => s.cesPoints)
  const config = useChartStore((s) => s.cesConfig)
  const title = useChartStore((s) => s.titles.ces)

  const vals = points.map((p) => p.v)
  const mv = config.meta
  // En CES: valor > meta = malo (rojo), valor <= meta = bueno (azul)
  const dotColors = vals.map((v) => (v > mv ? '#EB5454' : '#0063FF'))

  const maxV = Math.max(...vals, mv, 0)
  const yMax = Math.ceil(maxV * 1.25 * 2) / 2 || 3

  // Stops del gradiente del trazo: un stop por punto, color según meta.
  const n = vals.length
  const lineGradientStops = vals.map((v, i) => ({
    offset: `${n > 1 ? (i / (n - 1)) * 100 : 0}%`,
    color: v > mv ? '#EB5454' : '#0063FF',
  }))

  return (
    <div>
      <ChartTitle title={title} />
      <LineChartBase
        points={points}
        lineStroke="#0063FF"
        lineGradientStops={lineGradientStops}
        dotColors={dotColors}
        cardWidth={52}
        valueFormatter={(v) => formatCL(v, 2)}
        yDomain={[0, yMax]}
        yTicks={ticksRange(0, yMax, 0.5)}
        yTickFormatter={(v) => formatCL(v, 1)}
      />
    </div>
  )
}
