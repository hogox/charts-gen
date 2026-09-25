import { CartesianGrid, ComposedChart, LabelList, Line, ReferenceLine, XAxis, YAxis } from 'recharts'
import { ChartContainer, type ChartConfig } from '@/components/ui/chart'
import { useChartStore } from '@/store/chartStore'
import { COLORS } from '@/lib/colors'
import { formatPct } from '@/lib/format'
import { ticksRange } from '@/lib/scale'
import type { LineaConfig, LineRow, LineSeries } from '@/types/charts'
import { ChartTitle, EmptyState } from './EmptyState'
import { LineChartBase } from './LineChartBase'
import { LegendItem } from './primitives/LegendItem'
import { ValueCard } from './primitives/ValueCard'

const AXIS_TICK = { fontFamily: 'Poppins', fontSize: 10 }
const CARD_MIN_WIDTH = 46

function yScale(vals: number[], meta: number) {
  const minV = Math.min(...vals, 0)
  const maxV = Math.max(...vals, meta, 0)
  const pad = Math.max(Math.abs(maxV - minV) * 0.2, 10)
  const yMin = minV < 0 ? Math.floor((minV - pad) / 10) * 10 : 0
  const yMax = Math.ceil((maxV + pad) / 10) * 10
  return { yMin, yMax, ticks: ticksRange(yMin, yMax, 10) }
}

/** En cada periodo, solo la línea con el valor más alto muestra su tarjeta arriba. */
function isTopAt(rows: LineRow[], row: number, series: number): boolean {
  const vals = rows[row]?.vals.map((x) => x.v) ?? []
  return vals.indexOf(Math.max(...vals)) === series
}

interface MultiProps {
  rows: LineRow[]
  series: LineSeries[]
  config: LineaConfig
}

function MultiLineChart({ rows, series, config }: MultiProps) {
  const data = rows.map((r) => ({
    l: r.l,
    ...Object.fromEntries(series.map((_, si) => [`s${si}`, r.vals[si]?.v ?? 0])),
  }))
  const { yMin, yMax, ticks } = yScale(
    rows.flatMap((r) => r.vals.map((x) => x.v)),
    config.showMeta ? config.meta : 0,
  )
  const chartConfig = Object.fromEntries(
    series.map((s, si) => [`s${si}`, { label: s.name, color: s.c }]),
  ) satisfies ChartConfig

  return (
    <>
      <div className="mt-2 flex flex-wrap gap-4">
        {series.map((s, si) => (
          <LegendItem key={si} color={s.c} label={s.name} />
        ))}
      </div>
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[300px] w-full [&_.recharts-cartesian-axis-tick_text]:fill-[#6B7280]"
      >
        <ComposedChart data={data} margin={{ top: 48, right: 20, bottom: 4, left: 0 }}>
          <CartesianGrid stroke={COLORS.grid} vertical horizontal />
          <XAxis dataKey="l" tickLine={false} axisLine={false} tickMargin={8} tick={AXIS_TICK} padding={{ left: 28, right: 28 }} />
          <YAxis
            domain={[yMin, yMax]}
            ticks={ticks}
            tickFormatter={(v: number) => `${v}%`}
            tickLine={false}
            axisLine={false}
            width={44}
            tick={AXIS_TICK}
          />
          {yMin < 0 ? <ReferenceLine y={0} stroke="rgba(235,84,84,.3)" strokeDasharray="4 4" /> : null}
          {config.showMeta ? (
            <ReferenceLine
              y={config.meta}
              stroke={COLORS.purple}
              strokeDasharray="6 4"
              strokeWidth={1.5}
              label={{
                value: `${config.metaLbl} · ${formatPct(config.meta)}`,
                position: 'insideTopLeft',
                fill: COLORS.purple,
                fontSize: 11,
                fontWeight: 600,
                fontFamily: 'Poppins',
              }}
            />
          ) : null}

          {series.map((s, si) => (
            <Line
              key={si}
              dataKey={`s${si}`}
              type="linear"
              stroke={s.c}
              strokeWidth={2}
              isAnimationActive={false}
              activeDot={false}
              dot={{ r: 5, fill: s.c, stroke: '#FFFFFF', strokeWidth: 2 }}
            >
              <LabelList
                dataKey={`s${si}`}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                content={(props: any) => {
                  const val = rows[props.index]?.vals[si]
                  if (!val) return null
                  return (
                    <ValueCard
                      x={Number(props.x)}
                      y={Number(props.y)}
                      v={val.v}
                      n={val.n}
                      minWidth={CARD_MIN_WIDTH}
                      valueFormatter={formatPct}
                      color={s.c}
                      preferBelow={!isTopAt(rows, props.index, si)}
                    />
                  )
                }}
              />
            </Line>
          ))}
        </ComposedChart>
      </ChartContainer>
    </>
  )
}

/** Gráfico de líneas: una o varias series sobre los mismos periodos. */
export function LineaChart() {
  const rows = useChartStore((s) => s.lineaRows)
  const series = useChartStore((s) => s.lineaSeries)
  const config = useChartStore((s) => s.lineaConfig)
  const title = useChartStore((s) => s.titles.linea)

  if (!rows.length || !series.length) return <EmptyState message="Agrega periodos para ver el gráfico" />

  if (series.length > 1) {
    return (
      <div>
        <ChartTitle title={title} className="!mb-0" />
        <MultiLineChart rows={rows} series={series} config={config} />
      </div>
    )
  }

  const color = series[0].c
  const points = rows.map((r) => ({ l: r.l, v: r.vals[0]?.v ?? 0, n: r.vals[0]?.n ?? 0 }))
  const { yMin, yMax, ticks } = yScale(
    points.map((p) => p.v),
    config.meta,
  )

  return (
    <div>
      <ChartTitle title={title} className="!mb-0" />
      <LineChartBase
        points={points}
        lineStroke={color}
        dotColors={points.map(() => color)}
        cardWidth={CARD_MIN_WIDTH}
        valueFormatter={formatPct}
        yDomain={[yMin, yMax]}
        yTicks={ticks}
        yTickFormatter={(v) => `${v}%`}
        showMeta={config.showMeta}
        meta={config.meta}
        metaLbl={config.metaLbl}
        showZeroLine={yMin < 0}
      />
    </div>
  )
}
