import {
  Activity,
  BarChart3,
  Donut,
  Filter,
  Gauge,
  LineChart,
  PieChart,
  Target,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import type { ChartType } from '@/types/charts'

/** Tipos de gráfico con su etiqueta e icono, en el orden en que se muestran. */
export const CHART_TYPES: { v: ChartType; label: string; Icon: LucideIcon }[] = [
  { v: 'nps', label: 'NPS línea', Icon: LineChart },
  { v: 'ces', label: 'CES', Icon: Activity },
  { v: 'isn', label: 'ISN', Icon: Gauge },
  { v: 'linea', label: 'Línea simple', Icon: TrendingUp },
  { v: 'funnel', label: 'Funnel', Icon: Filter },
  { v: 'comp', label: 'Composición', Icon: PieChart },
  { v: 'anillo', label: 'Anillo', Icon: Donut },
  { v: 'barras', label: 'Barras', Icon: BarChart3 },
  { v: 'avance', label: 'Avance', Icon: Target },
]

/** Mapa rápido de tipo de gráfico a su etiqueta. */
export const CHART_LABEL = Object.fromEntries(
  CHART_TYPES.map((t) => [t.v, t.label]),
) as Record<ChartType, string>
