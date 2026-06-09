import { useChartStore } from '@/store/chartStore'
import { ChartTitle } from './EmptyState'

/** Barras porcentuales en orientación horizontal o vertical (rBarras). */
export function BarsChart() {
  const bars = useChartStore((s) => s.bars)
  const color = useChartStore((s) => s.barConfig.color)
  const orientation = useChartStore((s) => s.barConfig.orientation) ?? 'horizontal'
  const title = useChartStore((s) => s.titles.barras)

  if (orientation === 'vertical') {
    return (
      <div className="py-1">
        <ChartTitle title={title} />
        <div className="flex items-end justify-around gap-3" style={{ height: 240 }}>
          {bars.map((b, i) => (
            <div key={i} className="flex h-full flex-1 flex-col items-center gap-1.5">
              <div className="mx-auto flex w-full max-w-[72px] flex-1 items-end overflow-hidden rounded-[5px] bg-[#EDF1F9]">
                <div
                  className="flex w-full items-start justify-center rounded-t-[5px] pt-1.5"
                  style={{ height: `${Math.min(Math.max(b.p, 0), 100)}%`, minHeight: 20, background: color }}
                  role="img"
                  aria-label={`${b.l}: ${b.p}%`}
                >
                  <span className="text-xs font-semibold text-white">{b.p}%</span>
                </div>
              </div>
              <div className="text-center text-xs font-medium text-[#060B25]">{b.l}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

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
