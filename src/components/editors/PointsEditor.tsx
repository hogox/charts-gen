import { Switch } from '@/components/ui/switch'
import { useChartStore } from '@/store/chartStore'
import { AddButton, CellInput, ColumnHeaders, DeleteButton, RowGrid, Section } from './_shared'

const GRID = '1fr 80px 80px 32px'

/** Editor de puntos del NPS (sec-per del original). */
export function PointsEditor() {
  const points = useChartStore((s) => s.npsPoints)
  const config = useChartStore((s) => s.npsConfig)
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
            <CellInput value={p.l} ariaLabel={`Nombre periodo ${i + 1}`} onChange={(v) => updateRow('npsPoints', i, { l: v })} />
            <CellInput
              type="number"
              value={p.v}
              ariaLabel={`Valor periodo ${i + 1}`}
              onChange={(v) => updateRow('npsPoints', i, { v: parseFloat(v) || 0 })}
            />
            <CellInput
              type="number"
              integer
              value={p.n}
              ariaLabel={`n periodo ${i + 1}`}
              onChange={(v) => updateRow('npsPoints', i, { n: parseInt(v) || 0 })}
            />
            <DeleteButton onClick={() => removeRow('npsPoints', i)} ariaLabel={`Eliminar periodo ${p.l}`} />
          </RowGrid>
        ))}
      </div>
      <AddButton onClick={() => addRow('npsPoints')} label="Agregar periodo" />

      <label className="mt-3 flex cursor-pointer items-center justify-between gap-2 text-[11px] font-medium text-[#41464E]">
        Mostrar línea de meta
        <Switch
          checked={config.showMeta}
          onCheckedChange={(c) => updateConfig('npsConfig', { showMeta: c === true })}
        />
      </label>
      <p className="mt-1.5 text-[10px] leading-snug text-[#9096A2]">
        La meta usa el valor y la etiqueta del primer KPI (Meta).
      </p>
    </Section>
  )
}
