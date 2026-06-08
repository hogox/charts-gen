export type ChartType =
  | 'nps'
  | 'ces'
  | 'isn'
  | 'linea'
  | 'funnel'
  | 'comp'
  | 'barras'
  | 'avance'

/** Punto de una serie de línea (NPS / Línea / CES / ISN). l=etiqueta, v=valor, n=nº personas */
export interface Point {
  l: string
  v: number
  n: number
}

/** Barra horizontal (Barras). p = porcentaje 0-100 */
export interface BarItem {
  l: string
  p: number
}

/** Segmento de composición. n = cantidad, c = color hex */
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
}

export interface IsnConfig {
  meta: number
  metaLbl: string
  showMeta: boolean
}

export interface FunnelConfig {
  convLbl: string
  convVal: string
  convN: string
}

export interface BarConfig {
  color: string
}

export interface AvanceConfig {
  item: string
}

export interface ChartData {
  tipo: ChartType
  titles: Record<ChartType, string>
  npsPoints: Point[]
  lineaPoints: Point[]
  cesPoints: Point[]
  isnPoints: Point[]
  bars: BarItem[]
  comps: CompSeg[]
  funs: FunStep[]
  avs: AvSeg[]
  npsConfig: NpsConfig
  lineaConfig: LineaConfig
  cesConfig: CesConfig
  isnConfig: IsnConfig
  funnelConfig: FunnelConfig
  barConfig: BarConfig
  avanceConfig: AvanceConfig
}
