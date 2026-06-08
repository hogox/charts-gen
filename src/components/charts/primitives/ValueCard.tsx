import type { Point } from '@/types/charts'

interface ValueCardProps {
  /** Coordenadas del punto (provistas por Recharts LabelList). */
  x?: number
  y?: number
  index?: number
  points: Point[]
  cardWidth: number
  valueFormatter: (v: number) => string
}

/**
 * Tarjeta blanca con el valor (y nº personas) sobre cada punto de la línea.
 * Reproduce el dibujo canvas `afterDraw` del original en SVG.
 */
export function ValueCard({ x, y, index, points, cardWidth, valueFormatter }: ValueCardProps) {
  if (x == null || y == null || index == null) return null
  const p = points[index]
  if (!p) return null

  const { v, n } = p
  const above = v >= 0
  const bw = cardWidth
  const bh = n ? 40 : 22
  const bx = x - bw / 2
  const by = above ? y - bh - 10 : y + 10

  const rowY = by + 28
  const iconCx = x - 18 + 4

  return (
    <g style={{ pointerEvents: 'none' }}>
      <g style={{ filter: 'drop-shadow(0 2px 6px rgba(0,32,100,0.12))' }}>
        <rect x={bx} y={by} width={bw} height={bh} rx={5} fill="white" />
      </g>
      <text
        x={x}
        y={by + 14}
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontWeight={600}
        fontSize={12}
        fill={v < 0 ? '#EB5454' : '#060B25'}
      >
        {valueFormatter(v)}
      </text>
      {n ? (
        <g>
          {/* glifo de persona: cabeza + hombros */}
          <circle cx={iconCx} cy={rowY - 3} r={2.5} fill="#6B7280" />
          <path d={`M ${iconCx - 4} ${rowY + 3} A 4 4 0 0 1 ${iconCx + 4} ${rowY + 3} Z`} fill="#6B7280" />
          <text
            x={x + 3}
            y={rowY + 1}
            textAnchor="middle"
            fontFamily="Poppins, sans-serif"
            fontWeight={400}
            fontSize={11}
            fill="#6B7280"
          >
            {n}
          </text>
        </g>
      ) : null}
    </g>
  )
}
