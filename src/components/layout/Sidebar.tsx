import { toast } from 'sonner'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useChartStore } from '@/store/chartStore'
import type { ChartType } from '@/types/charts'
import { TitleEditor } from '@/components/editors/TitleEditor'
import { KpiEditor } from '@/components/editors/KpiEditor'
import { PointsEditor } from '@/components/editors/PointsEditor'
import { DistributionEditor } from '@/components/editors/DistributionEditor'
import { CesEditor } from '@/components/editors/CesEditor'
import { IsnEditor } from '@/components/editors/IsnEditor'
import { CompEditor } from '@/components/editors/CompEditor'
import { BarEditor } from '@/components/editors/BarEditor'
import { FunnelEditor } from '@/components/editors/FunnelEditor'
import { AvanceEditor } from '@/components/editors/AvanceEditor'

const TABS: { v: ChartType; label: string }[] = [
  { v: 'nps', label: 'NPS línea' },
  { v: 'ces', label: 'CES' },
  { v: 'isn', label: 'ISN' },
  { v: 'linea', label: 'Línea simple' },
  { v: 'funnel', label: 'Funnel' },
  { v: 'comp', label: 'Composición' },
  { v: 'barras', label: 'Barras' },
  { v: 'avance', label: 'Avance' },
]

function Editors({ tipo }: { tipo: ChartType }) {
  switch (tipo) {
    case 'nps':
      return (
        <>
          <TitleEditor />
          <KpiEditor />
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
  const reset = useChartStore((s) => s.reset)

  return (
    <aside className="flex flex-col gap-5 overflow-y-auto border-r border-[#DCDDE3] bg-white p-5" aria-label="Configuración del gráfico">
      <div className="flex flex-col gap-2.5">
        <div className="text-sm font-semibold text-[#060B25]" id="tipo-label">
          Tipo de gráfico
        </div>
        <Tabs value={tipo} onValueChange={(v) => setTipo(v as ChartType)}>
          <TabsList className="grid h-auto w-full grid-cols-4 gap-1 bg-[#EEEFF2] p-[3px]" aria-labelledby="tipo-label">
            {TABS.map((t) => (
              <TabsTrigger
                key={t.v}
                value={t.v}
                className="h-auto rounded-md px-2 py-[7px] text-[11px] leading-tight data-active:bg-white data-active:text-[#6D28D9] data-active:shadow-sm"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <button
          type="button"
          onClick={() => {
            reset()
            toast('Datos de ejemplo restablecidos')
          }}
          className="self-start rounded px-1.5 py-1 text-[10px] text-[#6B7280] transition-colors hover:bg-[rgba(109,40,217,.08)] hover:text-[#6D28D9]"
          aria-label="Restablecer datos de ejemplo"
        >
          ↺ Restablecer ejemplos
        </button>
      </div>

      <Editors tipo={tipo} />
    </aside>
  )
}
