import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { useChartStore } from '@/store/chartStore'
import { formatCL } from '@/lib/format'
import { ChartTitle, EmptyState } from './EmptyState'

/** Gráfico de anillo (donut): segmentos parte-de-un-todo con total al centro. */
export function AnilloChart() {
  const rings = useChartStore((s) => s.rings)
  const centerLabel = useChartStore((s) => s.anilloConfig.centerLabel)
  const title = useChartStore((s) => s.titles.anillo)

  const tot = rings.reduce((sum, r) => sum + r.n, 0)
  if (!tot) return <EmptyState message="Agrega segmentos para ver el anillo" />

  const barLabel = rings.map((r) => `${r.l}: ${((r.n / tot) * 100).toFixed(0)}%`).join(', ')

  return (
    <div>
      <ChartTitle title={title} className="!mb-0" />
      <div className="relative mx-auto" style={{ height: 248, maxWidth: 320 }} role="img" aria-label={`Anillo — ${barLabel}`}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={rings}
              dataKey="n"
              nameKey="l"
              cx="50%"
              cy="50%"
              innerRadius={72}
              outerRadius={108}
              paddingAngle={2}
              stroke="none"
              isAnimationActive={false}
            >
              {rings.map((r, i) => (
                <Cell key={i} fill={r.c} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[26px] font-bold leading-none tracking-[-0.02em] text-[#060B25]">{formatCL(tot, 0)}</span>
          {centerLabel ? <span className="mt-1 text-xs text-[#6B7280]">{centerLabel}</span> : null}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2">
        {rings.map((r, i) => {
          const pct = ((r.n / tot) * 100).toFixed(1)
          return (
            <div key={i} className="flex items-center gap-1.5 text-xs text-[#41464E]">
              <span className="h-2 w-2 rounded-full" style={{ background: r.c }} aria-hidden="true" />
              {r.l} — {formatCL(r.n, 0)} ({pct}%)
            </div>
          )
        })}
      </div>
    </div>
  )
}
