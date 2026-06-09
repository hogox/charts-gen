import { useChartStore } from '@/store/chartStore'
import { AddButton, CellInput, ColorInput, ColumnHeaders, DeleteButton, FieldInput, RowGrid, Section } from './_shared'

const GRID = '1fr 70px 50px 32px'

export function AvanceEditor() {
  const avs = useChartStore((s) => s.avs)
  const item = useChartStore((s) => s.avanceConfig.item)
  const addRow = useChartStore((s) => s.addRow)
  const removeRow = useChartStore((s) => s.removeRow)
  const updateRow = useChartStore((s) => s.updateRow)
  const updateConfig = useChartStore((s) => s.updateConfig)

  return (
    <Section title="Barra de avance apilada" description="Segmentos apilados que suman el avance total">
      <div className="mb-3">
        <FieldInput label="Ítem medido" value={item} onChange={(v) => updateConfig('avanceConfig', { item: v })} />
      </div>
      <ColumnHeaders cols={GRID} labels={['Segmento', '%', 'Color', '']} />
      <div role="list" aria-label="Lista de segmentos de avance">
        {avs.map((s, i) => (
          <RowGrid key={i} cols={GRID}>
            <CellInput size="xs" value={s.l} ariaLabel={`Etiqueta segmento avance ${i + 1}`} onChange={(v) => updateRow('avs', i, { l: v })} />
            <CellInput
              size="xs"
              type="number"
              min={0}
              max={100}
              value={s.p}
              ariaLabel={`Porcentaje segmento avance ${i + 1}`}
              onChange={(v) => updateRow('avs', i, { p: parseFloat(v) || 0 })}
            />
            <ColorInput value={s.c} ariaLabel={`Color segmento avance ${i + 1}`} onChange={(v) => updateRow('avs', i, { c: v })} />
            <DeleteButton onClick={() => removeRow('avs', i)} ariaLabel={`Eliminar segmento ${s.l}`} />
          </RowGrid>
        ))}
      </div>
      <AddButton onClick={() => addRow('avs')} label="Agregar segmento" />
    </Section>
  )
}
