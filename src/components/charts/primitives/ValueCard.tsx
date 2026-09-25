import { usePlotArea } from 'recharts'
import { COLORS } from '@/lib/colors'
import { formatInt } from '@/lib/format'

const GAP = 10
const VALUE_CHAR_W = 7.5
const N_CHAR_W = 6.5

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), Math.max(min, max))

export interface ValueCardProps {
  /** Coordenadas del punto (provistas por Recharts LabelList). */
  x?: number
  y?: number
  v: number
  /** Nº de personas; si es 0 no se muestra la segunda fila. */
  n?: number
  minWidth: number
  valueFormatter: (v: number) => string
  /** Color del valor; por defecto rojo si es negativo, texto oscuro si no. */
  color?: string
  /** Lado preferido; se invierte si la tarjeta no cabe dentro del área del gráfico. */
  preferBelow?: boolean
}

/** Tarjeta blanca con el valor (y nº personas) sobre o bajo cada punto de la línea. */
export function ValueCard({ x, y, v, n = 0, minWidth, valueFormatter, color, preferBelow = v < 0 }: ValueCardProps) {
  const plot = usePlotArea()
  if (x == null || y == null || !Number.isFinite(x) || !Number.isFinite(y)) return null

  const valueText = valueFormatter(v)
  const nText = n ? formatInt(n) : ''
  const bw = Math.max(minWidth, valueText.length * VALUE_CHAR_W + 14, nText.length * N_CHAR_W + 30)
  const bh = n ? 40 : 22

  const aboveY = y - bh - GAP
  const belowY = y + GAP
  const fitsBelow = !plot || belowY + bh <= plot.y + plot.height
  const fitsAbove = aboveY >= 0
  const below = preferBelow ? fitsBelow || !fitsAbove : !fitsAbove && fitsBelow
  const by = below ? belowY : aboveY
  // Mantiene la tarjeta dentro del área del gráfico en el primer y último punto.
  const bx = plot ? clamp(x - bw / 2, plot.x, plot.x + plot.width - bw) : x - bw / 2
  const cx = bx + bw / 2

  const rowY = by + 28
  const nWidth = nText.length * N_CHAR_W
  const iconCx = cx - nWidth / 2 - 4

  return (
    <g style={{ pointerEvents: 'none' }}>
      <g style={{ filter: 'drop-shadow(0 2px 6px rgba(0,32,100,0.12))' }}>
        <rect x={bx} y={by} width={bw} height={bh} rx={5} fill="white" />
      </g>
      <text
        x={cx}
        y={by + 14}
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontWeight={600}
        fontSize={12}
        fill={color ?? (v < 0 ? COLORS.red : COLORS.text)}
      >
        {valueText}
      </text>
      {nText ? (
        <g>
          {/* glifo de persona: cabeza + hombros */}
          <circle cx={iconCx} cy={rowY - 3} r={2.5} fill={COLORS.textMuted} />
          <path d={`M ${iconCx - 4} ${rowY + 3} A 4 4 0 0 1 ${iconCx + 4} ${rowY + 3} Z`} fill={COLORS.textMuted} />
          <text
            x={cx + 5}
            y={rowY + 3}
            textAnchor="middle"
            fontFamily="Poppins, sans-serif"
            fontWeight={400}
            fontSize={11}
            fill={COLORS.textMuted}
          >
            {nText}
          </text>
        </g>
      ) : null}
    </g>
  )
}
