import { useChartStore } from '@/store/chartStore'
import { Section } from './_shared'

export function TitleEditor() {
  const tipo = useChartStore((s) => s.tipo)
  const title = useChartStore((s) => s.titles[s.tipo])
  const setTitle = useChartStore((s) => s.setTitle)

  return (
    <Section title="Título del gráfico" description="Encabezado que aparece sobre el gráfico">
      <input
        id={`chart-title-${tipo}`}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-md border border-[#DCDDE3] bg-white px-3 py-[9px] text-[13px] text-[#060B25] outline-none transition-colors hover:border-[#C0BCC9] focus-visible:border-[#6D28D9]"
      />
    </Section>
  )
}
