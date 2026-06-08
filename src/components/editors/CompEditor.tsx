import { useChartStore } from '@/store/chartStore'
import { AddButton, CellInput, ColorInput, ColumnHeaders, DeleteButton, RowGrid, SectionLabel } from './_shared'

const GRID = '1fr 80px 50px 32px'

export function CompEditor() {
  const comps = useChartStore((s) => s.comps)
  const addRow = useChartStore((s) => s.addRow)
  const removeRow = useChartStore((s) => s.removeRow)
  const updateRow = useChartStore((s) => s.updateRow)

  return (
    <fieldset className="border-0 p-0">
      <SectionLabel>
        <legend>Segmentos</legend>
      </SectionLabel>
      <ColumnHeaders cols={GRID} labels={['Etiqueta', 'n', 'Color', '']} />
      <div role="list" aria-label="Lista de segmentos">
        {comps.map((s, i) => (
          <RowGrid key={i} cols={GRID}>
            <CellInput size="xs" value={s.l} ariaLabel={`Etiqueta segmento ${i + 1}`} onChange={(v) => updateRow('comps', i, { l: v })} />
            <CellInput
              size="xs"
              type="number"
              value={s.n}
              ariaLabel={`Cantidad segmento ${i + 1}`}
              onChange={(v) => updateRow('comps', i, { n: parseInt(v) || 0 })}
            />
            <ColorInput value={s.c} ariaLabel={`Color segmento ${i + 1}`} onChange={(v) => updateRow('comps', i, { c: v })} />
            <DeleteButton onClick={() => removeRow('comps', i)} ariaLabel={`Eliminar segmento ${s.l}`} />
          </RowGrid>
        ))}
      </div>
      <AddButton onClick={() => addRow('comps')} label="Agregar segmento" />
    </fieldset>
  )
}
