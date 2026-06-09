import { useChartStore } from '@/store/chartStore'
import { AddButton, CellInput, ColumnHeaders, DeleteButton, FieldInput, RowGrid, Section } from './_shared'

const GRID = '1fr 80px 80px 32px'

export function FunnelEditor() {
  const funs = useChartStore((s) => s.funs)
  const config = useChartStore((s) => s.funnelConfig)
  const addRow = useChartStore((s) => s.addRow)
  const removeRow = useChartStore((s) => s.removeRow)
  const updateRow = useChartStore((s) => s.updateRow)
  const updateConfig = useChartStore((s) => s.updateConfig)

  return (
    <Section title="Pasos del funnel" description="Etapas de conversión, de mayor a menor">
      <ColumnHeaders cols={GRID} labels={['Etapa', 'n', '%', '']} />
      <div role="list" aria-label="Lista de etapas del funnel">
        {funs.map((s, i) => (
          <RowGrid key={i} cols={GRID}>
            <CellInput size="xs" value={s.l} ariaLabel={`Etiqueta etapa ${i + 1}`} onChange={(v) => updateRow('funs', i, { l: v })} />
            <CellInput
              size="xs"
              type="number"
              value={s.n}
              ariaLabel={`n etapa ${i + 1}`}
              onChange={(v) => updateRow('funs', i, { n: parseInt(v) || 0 })}
            />
            <CellInput
              size="xs"
              value={s.p}
              placeholder="100%"
              ariaLabel={`Porcentaje etapa ${i + 1}`}
              onChange={(v) => updateRow('funs', i, { p: v })}
            />
            <DeleteButton onClick={() => removeRow('funs', i)} ariaLabel={`Eliminar etapa ${s.l}`} />
          </RowGrid>
        ))}
      </div>
      <AddButton onClick={() => addRow('funs')} label="Agregar etapa" />
      <div className="mt-2.5 flex flex-col gap-2">
        <FieldInput label="Etiqueta conversión" value={config.convLbl} onChange={(v) => updateConfig('funnelConfig', { convLbl: v })} />
        <FieldInput label="Valor conversión" value={config.convVal} onChange={(v) => updateConfig('funnelConfig', { convVal: v })} />
        <FieldInput label="Número de usuarios" value={config.convN} onChange={(v) => updateConfig('funnelConfig', { convN: v })} />
      </div>
    </Section>
  )
}
