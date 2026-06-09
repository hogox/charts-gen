import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  AvSeg,
  BarItem,
  ChartData,
  ChartType,
  CompSeg,
  FunStep,
  Point,
} from '@/types/charts'
import { getDefaultData } from '@/lib/defaults'
import { seriesColor } from '@/lib/colors'
import { importLegacy } from '@/lib/migrate'

const STORAGE_KEY = 'gdg-charts'

/** Claves de arrays editables en el store. */
type ListKey = 'npsPoints' | 'lineaPoints' | 'cesPoints' | 'isnPoints' | 'bars' | 'comps' | 'rings' | 'funs' | 'avs'
/** Claves de objetos de configuración. */
type ConfigKey =
  | 'npsConfig'
  | 'lineaConfig'
  | 'cesConfig'
  | 'isnConfig'
  | 'funnelConfig'
  | 'barConfig'
  | 'avanceConfig'
  | 'anilloConfig'

/** Item nuevo por defecto al agregar una fila (mirror de addPer/addCes/... del original). */
const NEW_ROW: Record<ListKey, Point | BarItem | CompSeg | FunStep | AvSeg> = {
  npsPoints: { l: 'Nuevo', v: 0, n: 0 },
  lineaPoints: { l: 'Nuevo', v: 0, n: 0 },
  cesPoints: { l: 'Nuevo', v: 0, n: 0 },
  isnPoints: { l: 'Nuevo', v: 0, n: 0 },
  bars: { l: 'Nueva barra', p: 50 },
  comps: { l: 'Segmento', n: 100, c: seriesColor(0) },
  rings: { l: 'Segmento', n: 100, c: seriesColor(0) },
  funs: { l: 'Etapa', n: 0, p: '0%' },
  avs: { l: 'Segmento', p: 20, c: seriesColor(0) },
}

export interface ChartStore extends ChartData {
  setTipo: (t: ChartType) => void
  setTitle: (value: string) => void
  updateConfig: <K extends ConfigKey>(key: K, patch: Partial<ChartData[K]>) => void
  addRow: (key: ListKey) => void
  removeRow: (key: ListKey, index: number) => void
  updateRow: (key: ListKey, index: number, patch: Record<string, string | number>) => void
  reset: () => void
}

/** Estado inicial: importa datos del original si no hay estado nuevo guardado. */
function computeInitial(): ChartData {
  try {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const legacy = importLegacy()
      if (legacy) return legacy
    }
  } catch {
    /* storage no disponible */
  }
  return getDefaultData()
}

export const useChartStore = create<ChartStore>()(
  persist(
    (set, get) => ({
      ...computeInitial(),

      setTipo: (t) => set({ tipo: t }),

      setTitle: (value) => set((s) => ({ titles: { ...s.titles, [s.tipo]: value } })),

      updateConfig: (key, patch) =>
        set((s) => ({ [key]: { ...s[key], ...patch } }) as Partial<ChartStore>),

      addRow: (key) =>
        set((s) => {
          const next = { ...NEW_ROW[key] }
          // Composición, Anillo y Avance: el nuevo segmento toma el siguiente color de la paleta.
          if (key === 'comps' || key === 'rings' || key === 'avs') {
            ;(next as CompSeg | AvSeg).c = seriesColor(s[key].length)
          }
          return { [key]: [...s[key], next] } as Partial<ChartStore>
        }),

      removeRow: (key, index) =>
        set((s) => ({ [key]: s[key].filter((_, i) => i !== index) }) as Partial<ChartStore>),

      updateRow: (key, index, patch) =>
        set(
          (s) =>
            ({
              [key]: s[key].map((row, i) => (i === index ? { ...row, ...patch } : row)),
            }) as Partial<ChartStore>,
        ),

      reset: () => {
        set(getDefaultData())
        // mantiene los métodos (set reemplaza solo las claves dadas)
        void get
      },
    }),
    {
      name: STORAGE_KEY,
      version: 2,
      // v1 → v2: la "caja verde" del ISN pasó a ser la línea de meta (showBadge → showMeta).
      migrate: (persisted, version) => {
        const isn = (persisted as { isnConfig?: { showBadge?: boolean; showMeta?: boolean } })
          ?.isnConfig
        if (version < 2 && isn && !('showMeta' in isn)) {
          isn.showMeta = isn.showBadge ?? true
          delete isn.showBadge
        }
        return persisted as ChartStore
      },
      // Rellena claves faltantes con defaults (compatibilidad hacia adelante).
      merge: (persisted, current) => ({
        ...current,
        ...(persisted as Partial<ChartStore>),
      }),
    },
  ),
)
