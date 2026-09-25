import { useChartStore } from '@/store/chartStore'
import { AddButton, CellInput, ColumnHeaders, DeleteButton, Field, RowGrid, Section } from './_shared'

const GRID = '1fr 72px 72px 32px'

export function CesIsnEditor() {
  const points = useChartStore((s) => s.cesIsnPoints)
  const config = useChartStore((s) => s.cesIsnConfig)
  const addRow = useChartStore((s) => s.addRow)
  const removeRow = useChartStore((s) => s.removeRow)
  const updateRow = useChartStore((s) => s.updateRow)
  const updateConfig = useChartStore((s) => s.updateConfig)

  return (
    <>
      <Section title="Puntos de datos" description="Valores de CES e ISN por periodo">
        <ColumnHeaders cols={GRID} labels={['Periodo', config.cesLbl, `${config.isnLbl} %`, '']} />
        <div role="list" aria-label="Lista de periodos CES e ISN">
          {points.map((p, i) => (
            <RowGrid key={i} cols={GRID}>
              <CellInput
                value={p.l}
                ariaLabel={`Nombre periodo ${i + 1}`}
                onChange={(v) => updateRow('cesIsnPoints', i, { l: v })}
              />
              <CellInput
                type="number"
                value={p.ces}
                ariaLabel={`Valor CES periodo ${i + 1}`}
                onChange={(v) => updateRow('cesIsnPoints', i, { ces: parseFloat(v) || 0 })}
              />
              <CellInput
                type="number"
                value={p.isn}
                ariaLabel={`Valor ISN periodo ${i + 1}`}
                onChange={(v) => updateRow('cesIsnPoints', i, { isn: parseFloat(v) || 0 })}
              />
              <DeleteButton onClick={() => removeRow('cesIsnPoints', i)} ariaLabel={`Eliminar periodo ${p.l}`} />
            </RowGrid>
          ))}
        </div>
        <AddButton onClick={() => addRow('cesIsnPoints')} label="Agregar periodo" />
      </Section>

      <Section title="Leyenda" description="Nombre de cada línea en el gráfico">
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Nombre línea CES">
            <CellInput value={config.cesLbl} onChange={(v) => updateConfig('cesIsnConfig', { cesLbl: v })} />
          </Field>
          <Field label="Nombre línea ISN">
            <CellInput value={config.isnLbl} onChange={(v) => updateConfig('cesIsnConfig', { isnLbl: v })} />
          </Field>
        </div>
      </Section>
    </>
  )
}
