import { useChartStore } from '@/store/chartStore'
import { AddButton, CellInput, ColumnHeaders, DeleteButton, Field, RowGrid, SectionLabel } from './_shared'

const GRID = '1fr 80px 32px'

export function BarEditor() {
  const bars = useChartStore((s) => s.bars)
  const color = useChartStore((s) => s.barConfig.color)
  const addRow = useChartStore((s) => s.addRow)
  const removeRow = useChartStore((s) => s.removeRow)
  const updateRow = useChartStore((s) => s.updateRow)
  const updateConfig = useChartStore((s) => s.updateConfig)

  return (
    <fieldset className="border-0 p-0">
      <SectionLabel>
        <legend>Barras</legend>
      </SectionLabel>
      <ColumnHeaders cols={GRID} labels={['Etiqueta', '%', '']} />
      <div role="list" aria-label="Lista de barras">
        {bars.map((b, i) => (
          <RowGrid key={i} cols={GRID}>
            <CellInput size="xs" value={b.l} ariaLabel={`Etiqueta barra ${i + 1}`} onChange={(v) => updateRow('bars', i, { l: v })} />
            <CellInput
              size="xs"
              type="number"
              min={0}
              max={100}
              value={b.p}
              ariaLabel={`Porcentaje barra ${i + 1}`}
              onChange={(v) => updateRow('bars', i, { p: parseFloat(v) || 0 })}
            />
            <DeleteButton onClick={() => removeRow('bars', i)} ariaLabel={`Eliminar barra ${b.l}`} />
          </RowGrid>
        ))}
      </div>
      <AddButton onClick={() => addRow('bars')} label="Agregar barra" />
      <div className="mt-2.5">
        <Field label="Color">
          <input
            type="color"
            value={color}
            onChange={(e) => updateConfig('barConfig', { color: e.target.value })}
            className="h-9 w-full cursor-pointer rounded-md border border-[#DCDDE3] bg-white px-1 py-0.5"
          />
        </Field>
      </div>
    </fieldset>
  )
}
