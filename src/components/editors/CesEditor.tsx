import { Switch } from '@/components/ui/switch'
import { useChartStore } from '@/store/chartStore'
import { AddButton, CellInput, ColumnHeaders, DeleteButton, Field, RowGrid, Section } from './_shared'

const GRID = '1fr 80px 80px 32px'

export function CesEditor() {
  const points = useChartStore((s) => s.cesPoints)
  const config = useChartStore((s) => s.cesConfig)
  const addRow = useChartStore((s) => s.addRow)
  const removeRow = useChartStore((s) => s.removeRow)
  const updateRow = useChartStore((s) => s.updateRow)
  const updateConfig = useChartStore((s) => s.updateConfig)

  return (
    <Section title="Puntos de datos CES" description="Evolución del esfuerzo del cliente por periodo">
      <ColumnHeaders cols={GRID} labels={['Periodo', 'Valor', 'N° personas', '']} />
      <div role="list" aria-label="Lista de periodos CES">
        {points.map((p, i) => (
          <RowGrid key={i} cols={GRID}>
            <CellInput value={p.l} ariaLabel={`Nombre periodo ${i + 1}`} onChange={(v) => updateRow('cesPoints', i, { l: v })} />
            <CellInput
              type="number"
              step={0.01}
              value={p.v}
              ariaLabel={`Valor CES periodo ${i + 1}`}
              onChange={(v) => updateRow('cesPoints', i, { v: parseFloat(v) || 0 })}
            />
            <CellInput
              type="number"
              value={p.n}
              ariaLabel={`n periodo ${i + 1}`}
              onChange={(v) => updateRow('cesPoints', i, { n: parseInt(v) || 0 })}
            />
            <DeleteButton onClick={() => removeRow('cesPoints', i)} ariaLabel={`Eliminar periodo ${p.l}`} />
          </RowGrid>
        ))}
      </div>
      <AddButton onClick={() => addRow('cesPoints')} label="Agregar periodo" />

      <div className="mt-3 grid gap-2.5" style={{ gridTemplateColumns: '100px 1fr' }}>
        <Field label="Meta (valor)">
          <CellInput
            type="number"
            step={0.01}
            value={config.meta}
            onChange={(v) => updateConfig('cesConfig', { meta: parseFloat(v) || 0 })}
          />
        </Field>
        <Field label="Etiqueta meta">
          <CellInput value={config.metaLbl} onChange={(v) => updateConfig('cesConfig', { metaLbl: v })} />
        </Field>
      </div>

      <label className="mt-3 flex cursor-pointer items-center justify-between gap-2 text-[11px] font-medium text-[#41464E]">
        Mostrar línea de meta
        <Switch
          checked={config.showMeta ?? false}
          onCheckedChange={(c) => updateConfig('cesConfig', { showMeta: c === true })}
        />
      </label>
    </Section>
  )
}
