import { useChartStore } from '@/store/chartStore'
import { ticksRange } from '@/lib/scale'
import { diffLine, parseNum } from '@/lib/format'
import type { NpsConfig } from '@/types/charts'
import { ChartTitle } from './EmptyState'
import { LineChartBase } from './LineChartBase'

function KpiTile({ label, value, diff }: { label: string; value: string; diff?: string | null }) {
  const diffColor = diff?.startsWith('Excede')
    ? 'text-[#0F7B3F]'
    : diff?.startsWith('Faltan')
      ? 'text-[#EB5454]'
      : 'text-[#060B25]'
  return (
    <div className="rounded-[7px] border border-[var(--kpi-border)] bg-[var(--kpi-bg)] px-3 py-2.5">
      <div className="mb-1 text-xs text-[#6B7280]">{label}</div>
      <div className="text-[22px] font-semibold leading-none tracking-[-0.02em] text-[#060B25]">{value}</div>
      {diff ? <div className={`mt-1 text-xs font-semibold ${diffColor}`}>{diff}</div> : null}
    </div>
  )
}

function KpiRow({ c }: { c: NpsConfig }) {
  return (
    <div className="mb-[18px] grid grid-cols-4 gap-1.5" role="group" aria-label="Indicadores KPI">
      <KpiTile label={c.kpiMetaLbl} value={c.kpiMeta} />
      <KpiTile label={c.kpiSpromLbl} value={c.kpiSprom} diff={diffLine(c.kpiMeta, c.kpiSprom)} />
      <KpiTile label={c.k3Lbl} value={c.kpiWeb} />
      <KpiTile label={c.kpiWpromLbl} value={c.kpiWprom} diff={diffLine(c.kpiWeb, c.kpiWprom)} />
    </div>
  )
}

function DistributionBar({ c }: { c: NpsConfig }) {
  const tot = c.prom + c.neut + c.detr
  const pp = tot ? Math.round((c.prom / tot) * 100) : 0
  const pn = tot ? Math.round((c.neut / tot) * 100) : 0
  const pd = tot ? Math.round((c.detr / tot) * 100) : 0

  return (
    <div className="mt-8">
      <div className="mb-2 text-sm font-semibold text-[#060B25]">{c.distTitle}</div>
      <div
        className="mb-2 flex h-5 overflow-hidden rounded-[7px]"
        role="img"
        aria-label={`Distribución: Detractores ${pd}%, Neutros ${pn}%, Promotores ${pp}%`}
      >
        <div className="flex min-w-[24px] items-center justify-center text-xs font-semibold text-white" style={{ width: `${pd}%`, background: '#EB5454' }}>
          {pd}%
        </div>
        <div className="flex min-w-[24px] items-center justify-center text-xs font-semibold text-white" style={{ width: `${pn}%`, background: '#002168' }}>
          {pn}%
        </div>
        <div className="flex min-w-[24px] items-center justify-center text-xs font-semibold text-white" style={{ width: `${pp}%`, background: '#0064FF' }}>
          {pp}%
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-1.5 text-xs text-[#41464E]">
          <span className="h-2 w-2 rounded-full bg-[#EB5454]" aria-hidden="true" />
          Detractores: {c.detrLbl}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#002168]">
          <span className="h-2 w-2 rounded-full bg-[#002168]" aria-hidden="true" />
          Neutros: {c.neutLbl}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#41464E]">
          <span className="h-2 w-2 rounded-full bg-[#0064FF]" aria-hidden="true" />
          Promotores: {c.promLbl}
        </div>
      </div>
    </div>
  )
}

export function NpsChart() {
  const points = useChartStore((s) => s.npsPoints)
  const config = useChartStore((s) => s.npsConfig)
  const title = useChartStore((s) => s.titles.nps)

  const vals = points.map((p) => p.v)
  // La meta del gráfico siempre proviene del primer KPI card (Meta).
  const metaNum = parseNum(config.kpiMeta)
  const mv = Number.isNaN(metaNum) ? 0 : metaNum
  const minV = Math.min(...vals, 0)
  const maxV = Math.max(...vals, mv, 0)
  const pad = Math.max(Math.abs(maxV - minV) * 0.2, 10)
  const yMin = minV < 0 ? Math.floor((minV - pad) / 10) * 10 : 0
  const yMax = Math.ceil((maxV + pad) / 10) * 10

  return (
    <div>
      <KpiRow c={config} />
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
        meta={Number.isNaN(metaNum) ? undefined : mv}
        metaLbl={config.kpiMetaLbl}
        showZeroLine={yMin < 0}
      />
      <DistributionBar c={config} />
    </div>
  )
}
