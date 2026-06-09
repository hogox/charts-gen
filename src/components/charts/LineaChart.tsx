import { useChartStore } from '@/store/chartStore'
import { ticksRange } from '@/lib/scale'
import { ChartTitle } from './EmptyState'
import { LineChartBase } from './LineChartBase'

/** Línea simple: misma base que NPS pero sin KPI ni distribución. */
export function LineaChart() {
  const points = useChartStore((s) => s.lineaPoints)
  const config = useChartStore((s) => s.lineaConfig)
  const title = useChartStore((s) => s.titles.linea)

  const vals = points.map((p) => p.v)
  const mv = config.meta
  const minV = Math.min(...vals, 0)
  const maxV = Math.max(...vals, mv, 0)
  const pad = Math.max(Math.abs(maxV - minV) * 0.2, 10)
  const yMin = minV < 0 ? Math.floor((minV - pad) / 10) * 10 : 0
  const yMax = Math.ceil((maxV + pad) / 10) * 10

  return (
    <div>
      <ChartTitle title={title} className="!mb-0" />
      <LineChartBase
        points={points}
        lineStroke="#0063FF"
        dotColors={vals.map(() => '#0063FF')}
        cardWidth={46}
        valueFormatter={(v) => `${v}%`}
        yDomain={[yMin, yMax]}
        yTicks={ticksRange(yMin, yMax, 10)}
        yTickFormatter={(v) => `${v}%`}
        showMeta={config.showMeta}
        meta={mv}
        metaLbl={config.metaLbl}
        showZeroLine={yMin < 0}
      />
    </div>
  )
}
