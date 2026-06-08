import { useChartStore } from '@/store/chartStore'
import { ChartTitle, EmptyState } from './EmptyState'

/** Barra de composición apilada (rComp). */
export function CompChart() {
  const comps = useChartStore((s) => s.comps)
  const title = useChartStore((s) => s.titles.comp)

  const tot = comps.reduce((s, c) => s + c.n, 0)
  if (!tot) return <EmptyState message="Agrega segmentos para ver el gráfico" />

  return (
    <div>
      <ChartTitle title={title} />
      <div className="mb-2.5 flex h-[46px] overflow-hidden rounded-[7px]" role="img" aria-label="Gráfico de composición">
        {comps.map((s, i) => {
          const pct = ((s.n / tot) * 100).toFixed(1)
          return (
            <div
              key={i}
              className="flex min-w-[36px] flex-col items-start justify-center px-[9px]"
              style={{ width: `${pct}%`, background: s.c }}
            >
              <div className="text-xs font-bold text-white">{s.n}</div>
              <div className="text-[9px] text-white/75">{pct}%</div>
            </div>
          )
        })}
      </div>
      <div className="mt-[9px] flex flex-wrap gap-3">
        {comps.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-[#41464E]">
            <span className="h-2 w-2 rounded-full" style={{ background: s.c }} aria-hidden="true" />
            {s.l}
          </div>
        ))}
      </div>
    </div>
  )
}
