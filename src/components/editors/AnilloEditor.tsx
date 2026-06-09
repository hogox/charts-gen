import { useChartStore } from '@/store/chartStore'
import { AddButton, CellInput, ColorInput, ColumnHeaders, DeleteButton, FieldInput, RowGrid, Section } from './_shared'

const GRID = '1fr 80px 50px 32px'

export function AnilloEditor() {
  const rings = useChartStore((s) => s.rings)
  const centerLabel = useChartStore((s) => s.anilloConfig.centerLabel)
  const addRow = useChartStore((s) => s.addRow)
  const removeRow = useChartStore((s) => s.removeRow)
  const updateRow = useChartStore((s) => s.updateRow)
  const updateConfig = useChartStore((s) => s.updateConfig)

  return (
    <Section title="Segmentos del anillo" description="Categorías parte-de-un-todo del gráfico de anillo">
      <ColumnHeaders cols={GRID} labels={['Etiqueta', 'n', 'Color', '']} />
      <div role="list" aria-label="Lista de segmentos del anillo">
        {rings.map((s, i) => (
          <RowGrid key={i} cols={GRID}>
            <CellInput size="xs" value={s.l} ariaLabel={`Etiqueta segmento ${i + 1}`} onChange={(v) => updateRow('rings', i, { l: v })} />
            <CellInput
              size="xs"
              type="number"
              value={s.n}
              ariaLabel={`Cantidad segmento ${i + 1}`}
              onChange={(v) => updateRow('rings', i, { n: parseInt(v) || 0 })}
            />
            <ColorInput value={s.c} ariaLabel={`Color segmento ${i + 1}`} onChange={(v) => updateRow('rings', i, { c: v })} />
            <DeleteButton onClick={() => removeRow('rings', i)} ariaLabel={`Eliminar segmento ${s.l}`} />
          </RowGrid>
        ))}
      </div>
      <AddButton onClick={() => addRow('rings')} label="Agregar segmento" />
      <div className="mt-2.5">
        <FieldInput label="Etiqueta central" value={centerLabel} onChange={(v) => updateConfig('anilloConfig', { centerLabel: v })} />
      </div>
    </Section>
  )
}
