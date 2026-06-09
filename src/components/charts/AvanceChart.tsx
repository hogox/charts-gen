import { useChartStore } from '@/store/chartStore'
import { ChartTitle, EmptyState } from './EmptyState'

const TICKS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

/** Barra de avance apilada con eje 0-100 (rAvance). */
export function AvanceChart() {
  const avs = useChartStore((s) => s.avs)
  const item = useChartStore((s) => s.avanceConfig.item)
  const title = useChartStore((s) => s.titles.avance)

  if (!avs.length) return <EmptyState message="Agrega segmentos para ver el avance" />

  const tot = avs.reduce((s, a) => s + a.p, 0) || 100
  const firstPct = Math.round((avs[0].p / tot) * 100)
  const summary = `${firstPct}%`
  const barLabel = avs.map((s) => `${s.l}: ${((s.p / tot) * 100).toFixed(0)}%`).join(', ')

  return (
    <div>
      <ChartTitle title={title} className="!mb-0" />
      <div className="pb-2 pt-4">
        <div className="mb-[18px] flex items-center gap-3.5">
          <div className="w-[110px] shrink-0 text-right text-xs font-medium text-[#41464E]">{item}</div>
          <div className="flex flex-1 flex-col">
            <div className="flex h-7 overflow-hidden rounded-md" role="img" aria-label={`Avance: ${barLabel}`}>
              {avs.map((s, i) => {
                const w = ((s.p / tot) * 100).toFixed(2)
                return (
                  <div
                    key={i}
                    className="flex items-center justify-center text-[10px] font-semibold text-white"
                    style={{ width: `${w}%`, background: s.c }}
                  >
                    {s.p / tot > 0.08 ? `${s.p}%` : ''}
                  </div>
                )
              })}
            </div>
            <div className="mt-[5px] flex justify-between" aria-hidden="true">
              {TICKS.map((t) => (
                <span key={t} className="text-[9px] text-[#6B7280]">
                  {t}%
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="my-2.5 flex flex-wrap justify-center gap-3.5">
          {avs.map((s, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-[#41464E]">
              <span className="h-2 w-2 rounded-full" style={{ background: s.c }} aria-hidden="true" />
              {s.l}
            </div>
          ))}
        </div>
        <div className="mt-0.5 text-center text-[15px] font-bold text-[#41464E]">{summary}</div>
      </div>
    </div>
  )
}
