import { CartesianGrid, ComposedChart, LabelList, Line, XAxis, YAxis } from 'recharts'
import { ChartContainer, type ChartConfig } from '@/components/ui/chart'
import { useChartStore } from '@/store/chartStore'
import { COLORS } from '@/lib/colors'
import { formatCL, formatPct } from '@/lib/format'
import { ticksRange } from '@/lib/scale'
import { ChartTitle, EmptyState } from './EmptyState'
import { LegendItem } from './primitives/LegendItem'
import { ValueCard } from './primitives/ValueCard'

const ISN_COLOR = COLORS.blue
const CES_COLOR = COLORS.purple
const ISN_STEP = 10
const CES_STEPS = [0.1, 0.2, 0.25, 0.5, 1, 2, 5]
const AXIS_TICK = { fontFamily: 'Poppins', fontSize: 10 }

interface Scale {
  domain: [number, number]
  ticks: number[]
  step: number
}

function isnScale(vals: number[]): Scale {
  const minV = Math.min(...vals, 0)
  const maxV = Math.max(...vals, 0)
  const max = Math.ceil((maxV * 1.15) / ISN_STEP) * ISN_STEP || ISN_STEP
  const min = minV < 0 ? Math.floor((minV * 1.15) / ISN_STEP) * ISN_STEP : 0
  return { domain: [min, max], ticks: ticksRange(min, max, ISN_STEP), step: ISN_STEP }
}

/** Escala CES desde 0 con la misma cantidad de divisiones que el ISN, para compartir la grilla. */
function cesScale(vals: number[], intervals: number): Scale {
  const target = Math.max(...vals, 0) * 1.15
  const step = CES_STEPS.find((s) => s * intervals >= target) ?? Math.ceil(target / intervals)
  const max = step * intervals
  return { domain: [0, max], ticks: ticksRange(0, max, step), step }
}

const formatCes = (v: number) => formatCL(v, 2)

function seriesLabel(color: string, format: (v: number) => string, preferBelow: (v: number) => boolean) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: any) => {
    if (props.value == null) return null
    const v = Number(props.value)
    return (
      <ValueCard
        x={Number(props.x)}
        y={Number(props.y)}
        v={v}
        minWidth={0}
        valueFormatter={format}
        color={color}
        preferBelow={preferBelow(v)}
      />
    )
  }
}

export function CesIsnChart() {
  const points = useChartStore((s) => s.cesIsnPoints)
  const config = useChartStore((s) => s.cesIsnConfig)
  const title = useChartStore((s) => s.titles.cesisn)

  if (!points.length) return <EmptyState message="Agrega periodos para ver el gráfico" />

  const isn = isnScale(points.map((p) => p.isn))
  const ces = cesScale(
    points.map((p) => p.ces),
    isn.ticks.length - 1,
  )
  const cesTickDecimals = ces.step < 1 ? (ces.step * 10) % 1 === 0 ? 1 : 2 : 0

  const chartConfig = {
    isn: { label: config.isnLbl, color: ISN_COLOR },
    ces: { label: config.cesLbl, color: CES_COLOR },
  } satisfies ChartConfig

  return (
    <div>
      <ChartTitle title={title} className="!mb-2" />
      <div className="flex flex-wrap gap-4">
        <LegendItem color={ISN_COLOR} label={`${config.isnLbl} (eje izq.)`} />
        <LegendItem color={CES_COLOR} label={`${config.cesLbl} (eje der.)`} />
      </div>
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[280px] w-full [&_.recharts-cartesian-axis-tick_text]:fill-[#6B7280]"
      >
        <ComposedChart data={points} margin={{ top: 36, right: 4, bottom: 4, left: 0 }}>
          <CartesianGrid stroke={COLORS.grid} vertical horizontal />
          <XAxis
            dataKey="l"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={AXIS_TICK}
            padding={{ left: 32, right: 32 }}
          />
          <YAxis
            yAxisId="isn"
            domain={isn.domain}
            ticks={isn.ticks}
            tickFormatter={(v: number) => `${v}%`}
            tickLine={false}
            axisLine={false}
            width={44}
            tick={AXIS_TICK}
          />
          <YAxis
            yAxisId="ces"
            orientation="right"
            domain={ces.domain}
            ticks={ces.ticks}
            tickFormatter={(v: number) => formatCL(v, cesTickDecimals)}
            tickLine={false}
            axisLine={false}
            width={40}
            tick={AXIS_TICK}
          />

          <Line
            yAxisId="isn"
            dataKey="isn"
            type="linear"
            stroke={ISN_COLOR}
            strokeWidth={2}
            isAnimationActive={false}
            activeDot={false}
            dot={{ r: 5, fill: ISN_COLOR, stroke: '#FFFFFF', strokeWidth: 2 }}
          >
            <LabelList dataKey="isn" content={seriesLabel(ISN_COLOR, formatPct, (v) => v < 0)} />
          </Line>
          <Line
            yAxisId="ces"
            dataKey="ces"
            type="linear"
            stroke={CES_COLOR}
            strokeWidth={2}
            isAnimationActive={false}
            activeDot={false}
            dot={{ r: 5, fill: CES_COLOR, stroke: '#FFFFFF', strokeWidth: 2 }}
          >
            <LabelList dataKey="ces" content={seriesLabel(CES_COLOR, formatCes, () => true)} />
          </Line>
        </ComposedChart>
      </ChartContainer>
    </div>
  )
}
