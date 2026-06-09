import { Switch } from '@/components/ui/switch'
import { useChartStore } from '@/store/chartStore'
import type { NpsConfig, LineaConfig } from '@/types/charts'
import { AddButton, CellInput, ColumnHeaders, DeleteButton, Field, RowGrid, Section } from './_shared'

const GRID = '1fr 80px 80px 32px'

/** Editor de puntos compartido por NPS y Línea simple (sec-per del original). */
export function PointsEditor({ variant }: { variant: 'nps' | 'linea' }) {
  const listKey = variant === 'nps' ? 'npsPoints' : 'lineaPoints'
  const configKey = variant === 'nps' ? 'npsConfig' : 'lineaConfig'

  const points = useChartStore((s) => s[listKey])
  const config = useChartStore((s) => s[configKey]) as NpsConfig | LineaConfig
  const addRow = useChartStore((s) => s.addRow)
  const removeRow = useChartStore((s) => s.removeRow)
  const updateRow = useChartStore((s) => s.updateRow)
  const updateConfig = useChartStore((s) => s.updateConfig)

  return (
    <Section title="Puntos de datos" description="Cada periodo de la línea de tendencia">
      <ColumnHeaders cols={GRID} labels={['Periodo', 'Valor', 'N° personas', '']} />
      <div role="list" aria-label="Lista de periodos">
        {points.map((p, i) => (
          <RowGrid key={i} cols={GRID}>
            <CellInput value={p.l} ariaLabel={`Nombre periodo ${i + 1}`} onChange={(v) => updateRow(listKey, i, { l: v })} />
            <CellInput
              type="number"
              value={p.v}
              ariaLabel={`Valor periodo ${i + 1}`}
              onChange={(v) => updateRow(listKey, i, { v: parseFloat(v) || 0 })}
            />
            <CellInput
              type="number"
              value={p.n}
              ariaLabel={`n periodo ${i + 1}`}
              onChange={(v) => updateRow(listKey, i, { n: parseInt(v) || 0 })}
            />
            <DeleteButton onClick={() => removeRow(listKey, i)} ariaLabel={`Eliminar periodo ${p.l}`} />
          </RowGrid>
        ))}
      </div>
      <AddButton onClick={() => addRow(listKey)} label="Agregar periodo" />

      <div className="mt-3 grid gap-2.5" style={{ gridTemplateColumns: '100px 1fr' }}>
        <Field label="Meta (valor)" hint="Línea objetivo">
          <CellInput
            type="number"
            value={config.meta}
            onChange={(v) => updateConfig(configKey, { meta: parseFloat(v) || 0 })}
          />
        </Field>
        <Field label="Etiqueta meta">
          <CellInput value={config.metaLbl} onChange={(v) => updateConfig(configKey, { metaLbl: v })} />
        </Field>
      </div>

      <label className="mt-3 flex cursor-pointer items-center justify-between gap-2 text-[11px] font-medium text-[#41464E]">
        Mostrar línea de meta
        <Switch
          checked={config.showMeta}
          onCheckedChange={(c) => updateConfig(configKey, { showMeta: c === true })}
        />
      </label>
    </Section>
  )
}
