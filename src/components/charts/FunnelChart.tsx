import { useChartStore } from '@/store/chartStore'
import { funnelWidths, FUNNEL_NARROW } from '@/lib/funnel'
import { ChartTitle, EmptyState } from './EmptyState'
import { PersonIcon } from './primitives/PersonIcon'

function Badge({ n, p }: { n: number; p: string }) {
  return (
    <span
      className="inline-flex items-center whitespace-nowrap rounded border border-[#D6DFF0] bg-white px-1.5 py-0.5 text-[11px] font-semibold leading-[1.4] text-[#41464E]"
    >
      <PersonIcon />
      {n} — {p}
    </span>
  )
}

/** Funnel con anchos amortiguados por sqrt (rFunnel). */
export function FunnelChart() {
  const funs = useChartStore((s) => s.funs)
  const config = useChartStore((s) => s.funnelConfig)
  const title = useChartStore((s) => s.titles.funnel)

  if (!funs.length) return <EmptyState message="Agrega pasos para ver el funnel" />

  const widths = funnelWidths(funs)

  return (
    <div className="py-1">
      <ChartTitle title={title} />
      {(config.insightTitle || config.insightDesc) && (
        <div className="mb-4 rounded-[8px] bg-[#F4F6FB] px-3.5 py-3">
          {config.insightTitle && (
            <div className="text-[13px] font-semibold leading-snug text-[#060B25]">{config.insightTitle}</div>
          )}
          {config.insightDesc && (
            <div className="mt-1 text-[11px] text-[#6B7280]">{config.insightDesc}</div>
          )}
        </div>
      )}
      {funs.map((s, i) => {
        const w = widths[i]
        const prevW = i === 0 ? w : widths[i - 1]
        const isNarrow = w < FUNNEL_NARROW
        return (
          <div key={i} className="mb-[7px] flex items-center gap-[9px]">
            <div className="w-[100px] shrink-0 text-right text-[11px] font-medium text-[#41464E]">{s.l}</div>
            <div
              className="relative h-[34px] flex-1 overflow-visible"
              role="img"
              aria-label={`${s.l}: ${s.n} — ${s.p}`}
            >
              <div
                className="absolute left-0 top-0 h-full rounded-[5px] bg-[#EDF1F9]"
                style={{ width: `${prevW.toFixed(1)}%` }}
              />
              <div
                className="relative h-full overflow-visible rounded-[5px] bg-[#0063FF]"
                style={{ width: `${w.toFixed(1)}%` }}
              >
                {isNarrow ? (
                  <div className="absolute top-1/2 -translate-y-1/2" style={{ left: 'calc(100% + 6px)' }}>
                    <Badge n={s.n} p={s.p} />
                  </div>
                ) : (
                  <div className="flex h-full items-center px-2">
                    <Badge n={s.n} p={s.p} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
      <div className="mt-[13px] flex items-center justify-between border-t border-[#EDF1F9] pt-[13px]">
        <div className="text-[13px] font-semibold text-[#41464E]">{config.convLbl}</div>
        <div className="text-right">
          <div className="text-[17px] font-bold text-[#0F7B3F]">{config.convVal}</div>
          <div className="text-[10px] text-[#6B7280]">{config.convN}</div>
        </div>
      </div>
    </div>
  )
}
