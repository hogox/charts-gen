import { Download, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { useChartStore } from '@/store/chartStore'
import { CHART_LABEL } from '@/lib/chartMeta'

export function AppHeader({ onDownload, busy }: { onDownload: () => void; busy: boolean }) {
  const tipo = useChartStore((s) => s.tipo)
  const reset = useChartStore((s) => s.reset)

  return (
    <header className="flex items-center gap-3 bg-[#4C1D95] px-7 py-3" role="banner">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="12" width="4" height="8" rx="1" fill="white" />
        <rect x="10" y="7" width="4" height="13" rx="1" fill="white" />
        <rect x="17" y="3" width="4" height="17" rx="1" fill="white" />
      </svg>
      <div className="h-5 w-px bg-white/20" aria-hidden="true" />
      <h1 className="text-sm font-medium leading-tight text-white">Generador de gráficos</h1>
      <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/80">
        {CHART_LABEL[tipo]}
      </span>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            reset()
            toast('Datos de ejemplo restablecidos')
          }}
          className="flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1.5 text-[13px] font-medium text-white/90 transition-colors hover:bg-white/10"
          aria-label="Restablecer datos de ejemplo"
        >
          <RotateCcw className="size-3.5" aria-hidden="true" />
          Restablecer
        </button>
        <button
          type="button"
          onClick={onDownload}
          disabled={busy}
          className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[#4C1D95] transition-colors hover:bg-white/90 disabled:opacity-60"
        >
          <Download className="size-3.5" aria-hidden="true" />
          Descargar PNG
        </button>
      </div>
    </header>
  )
}
