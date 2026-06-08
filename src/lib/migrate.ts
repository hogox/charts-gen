import type { ChartData, ChartType } from '@/types/charts'
import { getDefaultData } from '@/lib/defaults'

const LEGACY_KEY = 'gdg_state_v1'
const TIPOS: ChartType[] = ['nps', 'ces', 'isn', 'linea', 'funnel', 'comp', 'barras', 'avance']

const num = (v: unknown, fallback: number) => {
  const n = parseFloat(String(v))
  return Number.isFinite(n) ? n : fallback
}
const str = (v: unknown, fallback: string) => (typeof v === 'string' ? v : fallback)

/**
 * Importa el estado del index.html original (clave `gdg_state_v1`) al nuevo modelo.
 * Mapea los arrays directamente y los `inputs` (claves por id DOM) a los configs.
 * Devuelve null si no hay datos antiguos o si algo falla.
 */
export function importLegacy(): ChartData | null {
  try {
    const raw = localStorage.getItem(LEGACY_KEY)
    if (!raw) return null
    const s = JSON.parse(raw)
    if (!s || typeof s !== 'object') return null

    const inp: Record<string, unknown> = s.inputs && typeof s.inputs === 'object' ? s.inputs : {}
    const d = getDefaultData()

    const arr = <T>(v: unknown, fallback: T[]): T[] => (Array.isArray(v) ? v : fallback)

    return {
      tipo: typeof s.tipo === 'string' && TIPOS.includes(s.tipo) ? s.tipo : d.tipo,
      titles: s.titles && typeof s.titles === 'object' ? { ...d.titles, ...s.titles } : d.titles,
      npsPoints: arr(s.npspers, d.npsPoints),
      lineaPoints: arr(s.lineapers, d.lineaPoints),
      cesPoints: arr(s.cespers, d.cesPoints),
      isnPoints: arr(s.isnpers, d.isnPoints),
      bars: arr(s.bars, d.bars),
      comps: arr(s.comps, d.comps),
      funs: arr(s.funs, d.funs),
      avs: arr(s.avs, d.avs),
      npsConfig: {
        meta: num(inp['mval'], d.npsConfig.meta),
        metaLbl: str(inp['mlbl'], d.npsConfig.metaLbl),
        showMeta: !!inp['show-meta'],
        kpiMetaLbl: str(inp['kpi-meta-lbl'], d.npsConfig.kpiMetaLbl),
        kpiMeta: str(inp['kpi-meta'], d.npsConfig.kpiMeta),
        kpiSpromLbl: str(inp['kpi-sprom-lbl'], d.npsConfig.kpiSpromLbl),
        kpiSprom: str(inp['kpi-sprom'], d.npsConfig.kpiSprom),
        k3Lbl: str(inp['k3lbl-input'], d.npsConfig.k3Lbl),
        kpiWeb: str(inp['kpi-web'], d.npsConfig.kpiWeb),
        kpiWpromLbl: str(inp['kpi-wprom-lbl'], d.npsConfig.kpiWpromLbl),
        kpiWprom: str(inp['kpi-wprom'], d.npsConfig.kpiWprom),
        distTitle: str(inp['dtit'], d.npsConfig.distTitle),
        prom: num(inp['dp'], d.npsConfig.prom),
        promLbl: str(inp['dpl'], d.npsConfig.promLbl),
        neut: num(inp['dn'], d.npsConfig.neut),
        neutLbl: str(inp['dnl'], d.npsConfig.neutLbl),
        detr: num(inp['dd'], d.npsConfig.detr),
        detrLbl: str(inp['ddl'], d.npsConfig.detrLbl),
      },
      lineaConfig: {
        meta: num(inp['mval'], d.lineaConfig.meta),
        metaLbl: str(inp['mlbl'], d.lineaConfig.metaLbl),
        showMeta: !!inp['show-meta'],
      },
      cesConfig: {
        meta: num(inp['ces-mval'], d.cesConfig.meta),
        metaLbl: str(inp['ces-mlbl'], d.cesConfig.metaLbl),
      },
      isnConfig: {
        meta: num(inp['isn-mval'], d.isnConfig.meta),
        metaLbl: str(inp['isn-mlbl'], d.isnConfig.metaLbl),
        showMeta: inp['isn-show-badge'] === undefined ? d.isnConfig.showMeta : !!inp['isn-show-badge'],
      },
      funnelConfig: {
        convLbl: str(inp['fclbl'], d.funnelConfig.convLbl),
        convVal: str(inp['fcval'], d.funnelConfig.convVal),
        convN: str(inp['fcn'], d.funnelConfig.convN),
      },
      barConfig: {
        color: str(inp['barcol'], d.barConfig.color),
      },
      avanceConfig: {
        item: str(inp['av-item'], d.avanceConfig.item),
      },
    }
  } catch {
    return null
  }
}
