import { cn } from '@/lib/utils'
import { useChartStore } from '@/store/chartStore'
import type { BarOrientation } from '@/types/charts'
import { AddButton, CellInput, ColumnHeaders, DeleteButton, Field, RowGrid, Section } from './_shared'

const GRID = '1fr 80px 32px'

const ORIENTATIONS: { v: BarOrientation; label: string }[] = [
  { v: 'horizontal', label: 'Horizontal' },
  { v: 'vertical', label: 'Vertical' },
]

export function BarEditor() {
  const bars = useChartStore((s) => s.bars)
  const color = useChartStore((s) => s.barConfig.color)
  const orientation = useChartStore((s) => s.barConfig.orientation) ?? 'horizontal'
  const addRow = useChartStore((s) => s.addRow)
  const removeRow = useChartStore((s) => s.removeRow)
  const updateRow = useChartStore((s) => s.updateRow)
  const updateConfig = useChartStore((s) => s.updateConfig)

  return (
    <Section title="Barras" description="Valor porcentual por categoría">
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
      <div className="mt-2.5 flex flex-col gap-2.5">
        <Field label="Orientación">
          <div className="grid grid-cols-2 gap-1.5 rounded-md bg-[#EEEFF2] p-[3px]" role="group" aria-label="Orientación de las barras">
            {ORIENTATIONS.map(({ v, label }) => (
              <button
                key={v}
                type="button"
                aria-pressed={orientation === v}
                onClick={() => updateConfig('barConfig', { orientation: v })}
                className={cn(
                  'rounded-[5px] px-2 py-1.5 text-[12px] font-medium transition-colors',
                  orientation === v ? 'bg-white text-[#6D28D9] shadow-sm' : 'text-[#41464E] hover:text-[#6D28D9]',
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Color">
          <input
            type="color"
            value={color}
            onChange={(e) => updateConfig('barConfig', { color: e.target.value })}
            className="h-9 w-full cursor-pointer rounded-md border border-[#DCDDE3] bg-white px-1 py-0.5"
          />
        </Field>
      </div>
    </Section>
  )
}
