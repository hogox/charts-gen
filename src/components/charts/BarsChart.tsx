import { useChartStore } from '@/store/chartStore'
import { ChartTitle } from './EmptyState'

/** Barras horizontales porcentuales (rBarras). */
export function BarsChart() {
  const bars = useChartStore((s) => s.bars)
  const color = useChartStore((s) => s.barConfig.color)
  const title = useChartStore((s) => s.titles.barras)

  return (
    <div className="py-1">
      <ChartTitle title={title} />
      {bars.map((b, i) => (
        <div key={i} className="mb-3.5">
          <div className="mb-1 text-xs font-medium text-[#060B25]">{b.l}</div>
          <div className="h-[34px] overflow-hidden rounded-[5px] bg-[#EDF1F9]" role="img" aria-label={`${b.l}: ${b.p}%`}>
            <div
              className="flex h-full items-center rounded-[5px] pl-2.5"
              style={{ width: `${b.p}%`, background: color }}
            >
              <span className="text-xs font-semibold text-white">{b.p}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
