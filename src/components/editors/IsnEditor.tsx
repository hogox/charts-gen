import { Switch } from '@/components/ui/switch'
import { useChartStore } from '@/store/chartStore'
import { AddButton, CellInput, ColumnHeaders, DeleteButton, Field, RowGrid, Section } from './_shared'

const GRID = '1fr 80px 80px 32px'

export function IsnEditor() {
  const points = useChartStore((s) => s.isnPoints)
  const config = useChartStore((s) => s.isnConfig)
  const addRow = useChartStore((s) => s.addRow)
  const removeRow = useChartStore((s) => s.removeRow)
  const updateRow = useChartStore((s) => s.updateRow)
  const updateConfig = useChartStore((s) => s.updateConfig)

  return (
    <Section title="Puntos de datos ISN" description="Evolución del índice por periodo">
      <ColumnHeaders cols={GRID} labels={['Periodo', 'Valor', 'N° personas', '']} />
      <div role="list" aria-label="Lista de periodos ISN">
        {points.map((p, i) => (
          <RowGrid key={i} cols={GRID}>
            <CellInput value={p.l} ariaLabel={`Nombre periodo ${i + 1}`} onChange={(v) => updateRow('isnPoints', i, { l: v })} />
            <CellInput
              type="number"
              value={p.v}
              ariaLabel={`Valor ISN periodo ${i + 1}`}
              onChange={(v) => updateRow('isnPoints', i, { v: parseFloat(v) || 0 })}
            />
            <CellInput
              type="number"
              value={p.n}
              ariaLabel={`n periodo ${i + 1}`}
              onChange={(v) => updateRow('isnPoints', i, { n: parseInt(v) || 0 })}
            />
            <DeleteButton onClick={() => removeRow('isnPoints', i)} ariaLabel={`Eliminar periodo ${p.l}`} />
          </RowGrid>
        ))}
      </div>
      <AddButton onClick={() => addRow('isnPoints')} label="Agregar periodo" />

      <div className="mt-3 grid gap-2.5" style={{ gridTemplateColumns: '100px 1fr' }}>
        <Field label="Meta (valor)">
          <CellInput
            type="number"
            value={config.meta}
            onChange={(v) => updateConfig('isnConfig', { meta: parseFloat(v) || 0 })}
          />
        </Field>
        <Field label="Etiqueta meta">
          <CellInput value={config.metaLbl} onChange={(v) => updateConfig('isnConfig', { metaLbl: v })} />
        </Field>
      </div>

      <label className="mt-3 flex cursor-pointer items-center justify-between gap-2 text-[11px] font-medium text-[#41464E]">
        Mostrar línea de meta
        <Switch
          checked={config.showMeta}
          onCheckedChange={(c) => updateConfig('isnConfig', { showMeta: c === true })}
        />
      </label>
    </Section>
  )
}
