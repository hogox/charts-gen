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

  const maxV = Math.max(...vals, mv, 0)
  const yMax = Math.ceil(maxV * 1.25 * 2) / 2 || 3

  return (
    <div>
      <ChartTitle title={title} className="!mb-0" />
      <LineChartBase
        points={points}
        lineStroke="#0063FF"
        dotColors={vals.map(() => '#0063FF')}
        cardWidth={52}
        valueFormatter={(v) => formatCL(v, 2)}
        yDomain={[0, yMax]}
        yTicks={ticksRange(0, yMax, 0.5)}
        yTickFormatter={(v) => formatCL(v, 1)}
        showMeta={config.showMeta}
        meta={mv}
        metaLbl={config.metaLbl}
        metaFormatter={(v) => formatCL(v, 2)}
      />
    </div>
  )
}
