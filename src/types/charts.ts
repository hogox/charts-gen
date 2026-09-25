export type ChartType =
  | 'nps'
  | 'ces'
  | 'isn'
  | 'cesisn'
  | 'linea'
  | 'funnel'
  | 'comp'
  | 'anillo'
  | 'barras'
  | 'avance'

/** Punto de una serie de línea (NPS / Línea / CES / ISN). l=etiqueta, v=valor, n=nº personas */
export interface Point {
  l: string
  v: number
  n: number
}

/** Línea del gráfico "Líneas": nombre y color. */
export interface LineSeries {
  name: string
  c: string
}

/** Periodo del gráfico "Líneas": un valor (v) y nº personas (n) por cada línea, en el mismo orden. */
export interface LineRow {
  l: string
  vals: { v: number; n: number }[]
}

/** Punto del gráfico combinado CES + ISN. l=etiqueta, ces/isn=valor de cada métrica */
export interface CesIsnPoint {
  l: string
  ces: number
  isn: number
}

/** Barra (Barras). p = porcentaje 0-100 */
export interface BarItem {
  l: string
  p: number
}

/** Orientación del gráfico de barras. */
export type BarOrientation = 'horizontal' | 'vertical'

/** Segmento de composición / anillo. n = cantidad, c = color hex */
export interface CompSeg {
  l: string
  n: number
  c: string
}

/** Paso de funnel. n = nº usuarios, p = etiqueta libre de porcentaje (ej. "50,6%") */
export interface FunStep {
  l: string
  n: number
  p: string
}

/** Segmento de barra de avance. p = porcentaje, c = color hex */
export interface AvSeg {
  l: string
  p: number
  c: string
}

export interface NpsConfig {
  meta: number
  metaLbl: string
  showMeta: boolean
  kpiMetaLbl: string
  kpiMeta: string
  kpiSpromLbl: string
  kpiSprom: string
  k3Lbl: string
  kpiWeb: string
  kpiWpromLbl: string
  kpiWprom: string
  distTitle: string
  prom: number
  promLbl: string
  neut: number
  neutLbl: string
  detr: number
  detrLbl: string
}

export interface LineaConfig {
  meta: number
  metaLbl: string
  showMeta: boolean
}

export interface CesConfig {
  meta: number
  metaLbl: string
  showMeta: boolean
}

export interface IsnConfig {
  meta: number
  metaLbl: string
  showMeta: boolean
}

export interface CesIsnConfig {
  cesLbl: string
  isnLbl: string
}

export interface FunnelConfig {
  insightTitle: string
  insightDesc: string
  convLbl: string
  convVal: string
  convN: string
}

export interface BarConfig {
  color: string
  orientation: BarOrientation
}

export interface AvanceConfig {
  item: string
}

export interface AnilloConfig {
  centerLabel: string
}

export interface ChartData {
  tipo: ChartType
  titles: Record<ChartType, string>
  npsPoints: Point[]
  lineaSeries: LineSeries[]
  lineaRows: LineRow[]
  cesPoints: Point[]
  isnPoints: Point[]
  cesIsnPoints: CesIsnPoint[]
  bars: BarItem[]
  comps: CompSeg[]
  rings: CompSeg[]
  funs: FunStep[]
  avs: AvSeg[]
  npsConfig: NpsConfig
  lineaConfig: LineaConfig
  cesConfig: CesConfig
  isnConfig: IsnConfig
  cesIsnConfig: CesIsnConfig
  funnelConfig: FunnelConfig
  barConfig: BarConfig
  avanceConfig: AvanceConfig
  anilloConfig: AnilloConfig
}
