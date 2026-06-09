import type { RefObject } from 'react'
import { useChartStore } from '@/store/chartStore'
import { NpsChart } from '@/components/charts/NpsChart'
import { CesChart } from '@/components/charts/CesChart'
import { IsnChart } from '@/components/charts/IsnChart'
import { LineaChart } from '@/components/charts/LineaChart'
import { FunnelChart } from '@/components/charts/FunnelChart'
import { CompChart } from '@/components/charts/CompChart'
import { AnilloChart } from '@/components/charts/AnilloChart'
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
    case 'anillo':
      return <AnilloChart />
    case 'barras':
      return <BarsChart />
    case 'avance':
      return <AvanceChart />
  }
}

export function PreviewPanel({ cardRef }: { cardRef: RefObject<HTMLDivElement | null> }) {
  return (
    <main className="flex min-h-0 flex-col items-center gap-3 overflow-y-auto bg-[#F4F6FB] p-6" aria-label="Vista previa del gráfico">
      <div className="self-center text-sm font-semibold text-[#060B25]" aria-hidden="true">
        Vista previa
      </div>
      <div
        ref={cardRef}
        className="flex min-h-[380px] w-full max-w-[560px] flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(0,32,100,0.08)]"
        role="img"
        aria-label="Gráfico generado"
      >
        <div className="flex-1 px-[26px] pb-[22px] pt-[22px]">
          <ChartView />
        </div>
      </div>
    </main>
  )
}
