import { Switch } from '@/components/ui/switch'
import { useChartStore } from '@/store/chartStore'
import {
  addPeriod,
  addSeries,
  removePeriod,
  removeSeries,
  renamePeriod,
  updateSeries,
  updateValue,
} from '@/lib/linea'
import type { LineRow, LineSeries } from '@/types/charts'
import { AddButton, CellInput, ColorInput, ColumnHeaders, DeleteButton, Field, RowGrid, Section } from './_shared'

const PERIOD_GRID = '1fr 32px'
const VALUE_GRID = '1fr 80px 80px'
const SERIES_HEAD_GRID = '1fr 56px 32px'

function PeriodsSection({ rows }: { rows: LineRow[] }) {
  const setLinea = useChartStore((s) => s.setLinea)
  return (
    <Section title="Periodos" description="Eje horizontal, compartido por todas las líneas">
      <div role="list" aria-label="Lista de periodos">
        {rows.map((r, i) => (
          <RowGrid key={i} cols={PERIOD_GRID}>
            <CellInput
              value={r.l}
              ariaLabel={`Nombre periodo ${i + 1}`}
              onChange={(v) => setLinea((d) => renamePeriod(d, i, v))}
            />
            <DeleteButton onClick={() => setLinea((d) => removePeriod(d, i))} ariaLabel={`Eliminar periodo ${r.l}`} />
          </RowGrid>
        ))}
      </div>
      <AddButton onClick={() => setLinea(addPeriod)} label="Agregar periodo" />
    </Section>
  )
}

function SeriesSection({ series, index, rows, canRemove }: { series: LineSeries; index: number; rows: LineRow[]; canRemove: boolean }) {
  const setLinea = useChartStore((s) => s.setLinea)
  return (
    <Section title={series.name || `Línea ${index + 1}`} description="Nombre, color y valores por periodo">
      <RowGrid cols={canRemove ? SERIES_HEAD_GRID : '1fr 56px'}>
        <CellInput
          value={series.name}
          ariaLabel={`Nombre línea ${index + 1}`}
          onChange={(v) => setLinea((d) => updateSeries(d, index, { name: v }))}
        />
        <ColorInput
          value={series.c}
          ariaLabel={`Color línea ${index + 1}`}
          onChange={(v) => setLinea((d) => updateSeries(d, index, { c: v }))}
        />
        {canRemove ? (
          <DeleteButton onClick={() => setLinea((d) => removeSeries(d, index))} ariaLabel={`Eliminar ${series.name}`} />
        ) : null}
      </RowGrid>

      <div className="mt-2">
        <ColumnHeaders cols={VALUE_GRID} labels={['Periodo', 'Valor', 'N° personas']} />
        <div role="list" aria-label={`Valores de ${series.name}`}>
          {rows.map((r, i) => {
            const val = r.vals[index] ?? { v: 0, n: 0 }
            return (
              <RowGrid key={i} cols={VALUE_GRID}>
                <span className="truncate text-xs text-[#41464E]">{r.l}</span>
                <CellInput
                  type="number"
                  value={val.v}
                  ariaLabel={`Valor ${series.name} ${r.l}`}
                  onChange={(v) => setLinea((d) => updateValue(d, i, index, { v: parseFloat(v) || 0 }))}
                />
                <CellInput
                  type="number"
                  integer
                  value={val.n}
                  ariaLabel={`N° personas ${series.name} ${r.l}`}
                  onChange={(v) => setLinea((d) => updateValue(d, i, index, { n: parseInt(v) || 0 }))}
                />
              </RowGrid>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

function MetaSection() {
  const config = useChartStore((s) => s.lineaConfig)
  const updateConfig = useChartStore((s) => s.updateConfig)
  return (
    <Section title="Meta" description="Línea objetivo horizontal">
      <div className="grid gap-2.5" style={{ gridTemplateColumns: '100px 1fr' }}>
        <Field label="Meta (valor)">
          <CellInput
            type="number"
            value={config.meta}
            onChange={(v) => updateConfig('lineaConfig', { meta: parseFloat(v) || 0 })}
          />
        </Field>
        <Field label="Etiqueta meta">
          <CellInput value={config.metaLbl} onChange={(v) => updateConfig('lineaConfig', { metaLbl: v })} />
        </Field>
      </div>
      <label className="mt-3 flex cursor-pointer items-center justify-between gap-2 text-[11px] font-medium text-[#41464E]">
        Mostrar línea de meta
        <Switch
          checked={config.showMeta}
          onCheckedChange={(c) => updateConfig('lineaConfig', { showMeta: c === true })}
        />
      </label>
    </Section>
  )
}

export function LineaEditor() {
  const series = useChartStore((s) => s.lineaSeries)
  const rows = useChartStore((s) => s.lineaRows)
  const setLinea = useChartStore((s) => s.setLinea)

  return (
    <>
      <PeriodsSection rows={rows} />
      {series.map((s, i) => (
        <SeriesSection key={i} series={s} index={i} rows={rows} canRemove={series.length > 1} />
      ))}
      <AddButton onClick={() => setLinea(addSeries)} label="Agregar línea" />
      <MetaSection />
    </>
  )
}
