import { cn } from '@/lib/utils'
import { CHART_TYPES } from '@/lib/chartMeta'
import { useChartStore } from '@/store/chartStore'
import type { ChartType } from '@/types/charts'
import { TitleEditor } from '@/components/editors/TitleEditor'
import { KpiEditor } from '@/components/editors/KpiEditor'
import { PointsEditor } from '@/components/editors/PointsEditor'
import { DistributionEditor } from '@/components/editors/DistributionEditor'
import { CesEditor } from '@/components/editors/CesEditor'
import { IsnEditor } from '@/components/editors/IsnEditor'
import { CompEditor } from '@/components/editors/CompEditor'
import { AnilloEditor } from '@/components/editors/AnilloEditor'
import { BarEditor } from '@/components/editors/BarEditor'
import { FunnelEditor, FunnelInsightEditor } from '@/components/editors/FunnelEditor'
import { AvanceEditor } from '@/components/editors/AvanceEditor'

function Editors({ tipo }: { tipo: ChartType }) {
  switch (tipo) {
    case 'nps':
      return (
        <>
          <KpiEditor />
          <TitleEditor />
          <PointsEditor variant="nps" />
          <DistributionEditor />
        </>
      )
    case 'linea':
      return (
        <>
          <TitleEditor />
          <PointsEditor variant="linea" />
        </>
      )
    case 'ces':
      return (
        <>
          <TitleEditor />
          <CesEditor />
        </>
      )
    case 'isn':
      return (
        <>
          <TitleEditor />
          <IsnEditor />
        </>
      )
    case 'comp':
      return (
        <>
          <TitleEditor />
          <CompEditor />
        </>
      )
    case 'anillo':
      return (
        <>
          <TitleEditor />
          <AnilloEditor />
        </>
      )
    case 'barras':
      return (
        <>
          <TitleEditor />
          <BarEditor />
        </>
      )
    case 'funnel':
      return (
        <>
          <TitleEditor />
          <FunnelInsightEditor />
          <FunnelEditor />
        </>
      )
    case 'avance':
      return (
        <>
          <TitleEditor />
          <AvanceEditor />
        </>
      )
  }
}

export function Sidebar() {
  const tipo = useChartStore((s) => s.tipo)
  const setTipo = useChartStore((s) => s.setTipo)

  return (
    <aside className="flex min-h-0 flex-col gap-5 overflow-y-auto border-r border-[#DCDDE3] bg-white p-5" aria-label="Configuración del gráfico">
      <div className="flex flex-col gap-2.5">
        <div className="text-sm font-semibold text-[#060B25]" id="tipo-label">
          Tipo de gráfico
        </div>
        <div className="grid grid-cols-2 gap-2 min-[1280px]:grid-cols-3" role="radiogroup" aria-labelledby="tipo-label">
          {CHART_TYPES.map(({ v, label, Icon }) => {
            const active = v === tipo
            return (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setTipo(v)}
                className={cn(
                  'flex items-center gap-2 rounded-lg border px-3 py-2.5 text-[12px] font-medium transition-colors',
                  active
                    ? 'border-[#6D28D9] bg-[rgba(109,40,217,.06)] text-[#6D28D9]'
                    : 'border-[#E4E5EA] bg-white text-[#41464E] hover:border-[#C0BCC9] hover:bg-[#F7F7F9]',
                )}
              >
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <Editors tipo={tipo} />
    </aside>
  )
}
