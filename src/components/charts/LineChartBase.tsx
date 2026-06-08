import { useId } from 'react'
import {
  Area,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Line,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartContainer, type ChartConfig } from '@/components/ui/chart'
import type { Point } from '@/types/charts'
import { ValueCard } from './primitives/ValueCard'

const CHART_CONFIG = { v: { label: 'Valor', color: '#0063FF' } } satisfies ChartConfig

interface GradientStop {
  offset: string
  color: string
}

export interface LineChartBaseProps {
  points: Point[]
  /** Color del trazo, o se ignora si `lineGradientStops` está presente. */
  lineStroke: string
  /** Color del relleno del punto por índice. */
  dotColors: string[]
  cardWidth: number
  valueFormatter: (v: number) => string
  yDomain: [number, number]
  yTicks: number[]
  yTickFormatter: (v: number) => string
  showMeta?: boolean
  meta?: number
  metaLbl?: string
  showZeroLine?: boolean
  rightMargin?: number
  /** Stops para colorear el trazo (CES rojo/azul). */
  lineGradientStops?: GradientStop[]
}

export function LineChartBase({
  points,
  lineStroke,
  dotColors,
  cardWidth,
  valueFormatter,
  yDomain,
  yTicks,
  yTickFormatter,
  showMeta,
  meta,
  metaLbl,
  showZeroLine,
  rightMargin = 20,
  lineGradientStops,
}: LineChartBaseProps) {
  const uid = useId().replace(/:/g, '')
  const areaId = `area-${uid}`
  const lineGradId = `line-${uid}`
  const stroke = lineGradientStops ? `url(#${lineGradId})` : lineStroke

  return (
    <ChartContainer config={CHART_CONFIG} className="aspect-auto h-[260px] w-full [&_.recharts-cartesian-axis-tick_text]:fill-[#6B7280]">
      <ComposedChart data={points} margin={{ top: 40, right: rightMargin, bottom: 4, left: 0 }}>
        <defs>
          <linearGradient id={areaId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(148,170,255,.35)" />
            <stop offset="100%" stopColor="rgba(148,170,255,.02)" />
          </linearGradient>
          {lineGradientStops ? (
            <linearGradient id={lineGradId} x1="0" y1="0" x2="1" y2="0">
              {lineGradientStops.map((s, i) => (
                <stop key={i} offset={s.offset} stopColor={s.color} />
              ))}
            </linearGradient>
          ) : null}
        </defs>

        <CartesianGrid stroke="#EDF1F9" vertical horizontal />
        <XAxis
          dataKey="l"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fontFamily: 'Poppins', fontSize: 10 }}
        />
        <YAxis
          domain={yDomain}
          ticks={yTicks}
          tickFormatter={yTickFormatter}
          tickLine={false}
          axisLine={false}
          width={44}
          tick={{ fontFamily: 'Poppins', fontSize: 10 }}
        />

        <Area
          dataKey="v"
          stroke="none"
          fill={`url(#${areaId})`}
          isAnimationActive={false}
          activeDot={false}
        />

        {showZeroLine ? (
          <ReferenceLine y={0} stroke="rgba(235,84,84,.3)" strokeDasharray="4 4" strokeWidth={1} />
        ) : null}
        {showMeta && meta != null ? (
          <ReferenceLine
            y={meta}
            stroke="#9455D2"
            strokeDasharray="6 4"
            strokeWidth={1.5}
            label={{
              value: `${metaLbl} · ${meta}%`,
              position: 'insideTopLeft',
              fill: '#9455D2',
              fontSize: 11,
              fontWeight: 600,
              fontFamily: 'Poppins',
            }}
          />
        ) : null}

        <Line
          dataKey="v"
          type="linear"
          stroke={stroke}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          isAnimationActive={false}
          activeDot={false}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dot={(props: any) => {
            const { cx, cy, index, key } = props
            if (cx == null || cy == null) return <g key={key} />
            return (
              <circle
                key={key}
                cx={cx}
                cy={cy}
                r={5}
                fill={dotColors[index ?? 0] ?? '#0063FF'}
                stroke="#FFFFFF"
                strokeWidth={2}
              />
            )
          }}
        >
          <LabelList
            dataKey="v"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            content={(props: any) => (
              <ValueCard
                x={typeof props.x === 'number' ? props.x : Number(props.x)}
                y={typeof props.y === 'number' ? props.y : Number(props.y)}
                index={props.index}
                points={points}
                cardWidth={cardWidth}
                valueFormatter={valueFormatter}
              />
            )}
          />
        </Line>
      </ComposedChart>
    </ChartContainer>
  )
}
