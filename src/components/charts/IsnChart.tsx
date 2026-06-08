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

  // último punto con valor positivo (para la caja verde)
  const lastIdx = vals.reduce((acc, v, i) => (v > 0 ? i : acc), -1)
  const showBadge = config.showBadge && lastIdx >= 0

  return (
    <div>
      <ChartTitle title={title} />
      <div className="relative">
        <LineChartBase
          points={points}
          lineStroke="#0063FF"
          dotColors={vals.map(() => '#0063FF')}
          cardWidth={52}
          valueFormatter={(v) => `${v}%`}
          yDomain={[yMin, yMax]}
          yTicks={ticksRange(yMin, yMax, 10)}
          yTickFormatter={(v) => `${v}`}
          rightMargin={showBadge ? 110 : 20}
        />
        {showBadge ? (
          <div
            className="absolute flex h-[52px] w-[100px] flex-col items-center justify-center rounded-lg bg-[#1A6B35] shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
            style={{ top: 40, right: 8 }}
          >
            <div className="text-[22px] font-bold leading-none text-white">{vals[lastIdx]}%</div>
            <div className="mt-1 text-[10px] text-white">{config.metaLbl}</div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
