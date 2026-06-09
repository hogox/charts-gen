import { useChartStore } from '@/store/chartStore'
import type { NpsConfig } from '@/types/charts'
import { CellInput, Field, Section } from './_shared'

const ROWS: { label: string; color: string; numKey: keyof NpsConfig; lblKey: keyof NpsConfig }[] = [
  { label: 'Promotores', color: '#002064', numKey: 'prom', lblKey: 'promLbl' },
  { label: 'Neutros', color: '#0063FF', numKey: 'neut', lblKey: 'neutLbl' },
  { label: 'Detractores', color: '#9455D2', numKey: 'detr', lblKey: 'detrLbl' },
]

export function DistributionEditor() {
  const config = useChartStore((s) => s.npsConfig)
  const updateConfig = useChartStore((s) => s.updateConfig)
  const set = (patch: Partial<NpsConfig>) => updateConfig('npsConfig', patch)

  return (
    <Section title="Distribución NPS" description="Promotores, neutros y detractores">
      <div className="mb-2.5">
        <Field label="Título">
          <CellInput value={config.distTitle} onChange={(v) => set({ distTitle: v })} />
        </Field>
      </div>
      <div className="flex flex-col gap-2">
        {ROWS.map((r) => (
          <div key={r.label} className="grid items-center gap-2.5" style={{ gridTemplateColumns: '1fr 70px 110px' }}>
            <div className="flex items-center gap-1.5 text-xs text-[#060B25]">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: r.color }} aria-hidden="true" />
              {r.label}
            </div>
            <CellInput
              type="number"
              value={config[r.numKey] as number}
              ariaLabel={`Cantidad de ${r.label.toLowerCase()}`}
              onChange={(v) => set({ [r.numKey]: parseInt(v) || 0 } as Partial<NpsConfig>)}
            />
            <CellInput
              value={config[r.lblKey] as string}
              ariaLabel={`Descripción ${r.label.toLowerCase()}`}
              onChange={(v) => set({ [r.lblKey]: v } as Partial<NpsConfig>)}
            />
          </div>
        ))}
      </div>
    </Section>
  )
}
