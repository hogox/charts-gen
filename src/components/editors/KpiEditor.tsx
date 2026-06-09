import { useChartStore } from '@/store/chartStore'
import type { NpsConfig } from '@/types/charts'
import { Section } from './_shared'

type LblKey = 'kpiMetaLbl' | 'kpiSpromLbl' | 'k3Lbl' | 'kpiWpromLbl'
type ValKey = 'kpiMeta' | 'kpiSprom' | 'kpiWeb' | 'kpiWprom'

function Card({
  lblKey,
  valKey,
  amber,
}: {
  lblKey: LblKey
  valKey: ValKey
  amber?: boolean
}) {
  const config = useChartStore((s) => s.npsConfig)
  const updateConfig = useChartStore((s) => s.updateConfig)
  const set = (patch: Partial<NpsConfig>) => updateConfig('npsConfig', patch)

  return (
    <div className="flex flex-col gap-2 rounded-md border border-[#DCDDE3] bg-[#EEEFF2] px-3 py-2.5">
      <label className="flex flex-col gap-1">
        <span className="text-[10px] font-medium text-[#6B7280]">Título</span>
        <input
          type="text"
          value={config[lblKey]}
          onChange={(e) => set({ [lblKey]: e.target.value } as Partial<NpsConfig>)}
          className="w-full rounded-md border border-[#DCDDE3] bg-white px-2 py-1 text-[11px] font-medium text-[#41464E] outline-none transition-colors hover:border-[#C0BCC9] focus-visible:border-[#6D28D9]"
          aria-label="Título de la tarjeta"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-[10px] font-medium text-[#6B7280]">Valor</span>
        <input
          type="text"
          value={config[valKey]}
          onChange={(e) => set({ [valKey]: e.target.value } as Partial<NpsConfig>)}
          className={`w-full rounded-md border border-[#DCDDE3] bg-white px-2 py-1.5 text-sm font-semibold outline-none transition-colors hover:border-[#C0BCC9] focus-visible:border-[#6D28D9] ${amber ? 'text-[#9A4E00]' : 'text-[#060B25]'}`}
          aria-label="Valor"
        />
      </label>
    </div>
  )
}

export function KpiEditor() {
  return (
    <Section title="Tarjetas KPI" description="Indicadores destacados en la parte superior del gráfico">
      <div className="grid grid-cols-2 gap-2.5">
        <Card lblKey="kpiMetaLbl" valKey="kpiMeta" />
        <Card lblKey="kpiSpromLbl" valKey="kpiSprom" amber />
        <Card lblKey="k3Lbl" valKey="kpiWeb" />
        <Card lblKey="kpiWpromLbl" valKey="kpiWprom" amber />
      </div>
    </Section>
  )
}
