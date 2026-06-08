import { useChartStore } from '@/store/chartStore'
import { ticksRange } from '@/lib/scale'
import { ChartTitle } from './EmptyState'
import { LineChartBase } from './LineChartBase'

export function IsnChart() {
  const points = useChartStore((s) => s.isnPoints)
  const config = useChartStore((s) => s.isnConfig)
  const title = useChartStore((s) => s.titles.isn)

  const vals = points.map((p) => p.v)
  const mv = config.meta
  const minV = Math.min(...vals, 0)
  const maxV = Math.max(...vals, mv, 0)
  const yMax = Math.ceil((maxV * 1.15) / 10) * 10 || 10
  const yMin = minV < 0 ? Math.floor((minV * 1.15) / 10) * 10 : 0

  return (
    <div>
      <ChartTitle title={title} />
      <LineChartBase
        points={points}
        lineStroke="#0063FF"
        dotColors={vals.map(() => '#0063FF')}
        cardWidth={52}
        valueFormatter={(v) => `${v}%`}
        yDomain={[yMin, yMax]}
        yTicks={ticksRange(yMin, yMax, 10)}
        yTickFormatter={(v) => `${v}`}
        showMeta={config.showMeta}
        meta={mv}
        metaLbl={config.metaLbl}
      />
    </div>
  )
}
