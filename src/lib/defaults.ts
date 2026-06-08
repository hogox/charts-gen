import type { ChartData, ChartType } from '@/types/charts'

/** Títulos por defecto recordados por tipo de gráfico (del original `titles`). */
export const DEFAULT_TITLES: Record<ChartType, string> = {
  nps: 'Evolución NPS',
  linea: 'Evolución de la métrica',
  ces: 'Evolución CES',
  isn: 'Evolución ISN',
  funnel: '',
  comp: '',
  barras: '',
  avance: '',
}

/**
 * Estado inicial completo. Equivale a `window.onload` + `loadNPS(DEF.nps)` del
 * original: los valores de NPS provienen de DEF.nps (no de los atributos HTML).
 */
export function getDefaultData(): ChartData {
  return {
    tipo: 'nps',
    titles: { ...DEFAULT_TITLES },
    npsPoints: [
      { l: 'Q1 2025', v: 50, n: 1842 },
      { l: 'Q2 2025', v: 53, n: 1435 },
      { l: 'Q3 2025', v: 53, n: 1468 },
      { l: 'Enero', v: 44, n: 352 },
      { l: 'Febrero', v: 55, n: 365 },
    ],
    lineaPoints: [
      { l: 'Enero', v: 0, n: 0 },
      { l: 'Febrero', v: 49, n: 295 },
      { l: 'Marzo', v: 58, n: 2461 },
    ],
    cesPoints: [
      { l: 'Q1 2025', v: 0, n: 0 },
      { l: 'Q2 2025', v: 0, n: 0 },
      { l: 'Marzo 2026', v: 2.05, n: 482 },
    ],
    isnPoints: [
      { l: 'Enero', v: 0, n: 0 },
      { l: 'Febrero', v: 49, n: 295 },
      { l: 'Marzo', v: 58, n: 2461 },
    ],
    bars: [
      { l: 'Etapa 1', p: 94 },
      { l: 'Etapa 2', p: 28 },
      { l: 'Etapa 3', p: 38 },
      { l: 'Etapa 4', p: 50 },
    ],
    comps: [
      { l: 'Categoría A', n: 1407, c: '#0063FF' },
      { l: 'Categoría B', n: 608, c: '#F5A623' },
      { l: 'Categoría C', n: 588, c: '#8891A4' },
      { l: 'Categoría D', n: 256, c: '#9455D2' },
    ],
    funs: [
      { l: 'Paso 1', n: 633, p: '100%' },
      { l: 'Paso 2', n: 320, p: '50,6%' },
      { l: 'Paso 3', n: 294, p: '91,9%' },
      { l: 'Paso 4', n: 172, p: '58,5%' },
      { l: 'Paso 5', n: 88, p: '51,2%' },
    ],
    avs: [
      { l: 'Segmento A', p: 64, c: '#5B9BD5' },
      { l: 'Segmento B', p: 36, c: '#002064' },
    ],
    npsConfig: {
      meta: 30,
      metaLbl: 'Meta 2026',
      showMeta: false,
      kpiMetaLbl: 'Meta 2026',
      kpiMeta: '30%',
      kpiSpromLbl: 'Promedio 2026',
      kpiSprom: '35%',
      k3Lbl: 'Actual 2026',
      kpiWeb: '27%',
      kpiWpromLbl: 'Promedio anual',
      kpiWprom: '12%',
      distTitle: 'Distribución NPS (ejemplo)',
      prom: 14,
      promLbl: '14 personas',
      neut: 3,
      neutLbl: '3 personas',
      detr: 14,
      detrLbl: '14 personas',
    },
    lineaConfig: {
      meta: 58,
      metaLbl: 'Meta 2026',
      showMeta: false,
    },
    cesConfig: {
      meta: 2.05,
      metaLbl: 'Meta CES 2026',
    },
    isnConfig: {
      meta: 58,
      metaLbl: 'Meta ISN 2026',
      showBadge: true,
    },
    funnelConfig: {
      convLbl: 'Conversión total',
      convVal: '13,9%',
      convN: '88 usuarios',
    },
    barConfig: {
      color: '#0063FF',
    },
    avanceConfig: {
      item: 'Ítem',
    },
  }
}
