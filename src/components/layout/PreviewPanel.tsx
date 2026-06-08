import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { toast } from 'sonner'
import { useChartStore } from '@/store/chartStore'
import { NpsChart } from '@/components/charts/NpsChart'
import { CesChart } from '@/components/charts/CesChart'
import { IsnChart } from '@/components/charts/IsnChart'
import { LineaChart } from '@/components/charts/LineaChart'
import { FunnelChart } from '@/components/charts/FunnelChart'
import { CompChart } from '@/components/charts/CompChart'
import { BarsChart } from '@/components/charts/BarsChart'
import { AvanceChart } from '@/components/charts/AvanceChart'

function ChartView() {
  const tipo = useChartStore((s) => s.tipo)
  switch (tipo) {
    case 'nps':
      return <NpsChart />
    case 'ces':
      return <CesChart />
    case 'isn':
      return <IsnChart />
    case 'linea':
      return <LineaChart />
    case 'funnel':
      return <FunnelChart />
    case 'comp':
      return <CompChart />
    case 'barras':
      return <BarsChart />
    case 'avance':
      return <AvanceChart />
  }
}

export function PreviewPanel() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState(false)

  async function downloadPNG() {
    if (!cardRef.current || busy) return
    setBusy(true)
    try {
      await document.fonts.ready
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        cacheBust: true,
        // excluye la barra de botones de la captura
        filter: (node) => !(node instanceof HTMLElement && node.dataset.exclude === 'true'),
      })
      const a = document.createElement('a')
      a.download = 'grafico.png'
      a.href = dataUrl
      a.click()
      toast('Imagen descargada correctamente')
    } catch {
      toast('Error al generar la imagen')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="flex flex-col items-center gap-3 overflow-y-auto bg-[#F4F6FB] p-6" aria-label="Vista previa del gráfico">
      <div className="self-center text-sm font-semibold text-[#060B25]" aria-hidden="true">
        Vista previa
      </div>
      <div
        ref={cardRef}
        className="flex min-h-[380px] w-full max-w-[560px] flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(0,32,100,0.08)]"
        role="img"
        aria-label="Gráfico generado"
      >
        <div className="flex-1 px-[26px] pb-5 pt-[22px]">
          <ChartView />
        </div>
        <div className="flex gap-2.5 border-t border-[#EDF1F9] px-[26px] pb-[22px] pt-4" data-exclude="true">
          <button
            type="button"
            onClick={() => useChartStore.setState({})}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#DCDDE3] px-4 py-2.5 text-[13px] font-medium text-[#41464E] transition-colors hover:border-[#6D28D9] hover:bg-[rgba(109,40,217,.08)] hover:text-[#6D28D9]"
          >
            ↻ Actualizar
          </button>
          <button
            type="button"
            onClick={downloadPNG}
            disabled={busy}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#6D28D9] px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#5B21B6] disabled:opacity-60"
          >
            ↓ Descargar PNG
          </button>
        </div>
      </div>
    </main>
  )
}
