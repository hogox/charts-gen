export function EmptyState({ message }: { message: string }) {
  return (
    <div className="px-5 py-[50px] text-center text-[#6B7280]">
      <div className="mb-2 text-[32px]" aria-hidden="true">
        📊
      </div>
      <p className="text-xs">{message}</p>
    </div>
  )
}

/** Título del gráfico (.chart-title-display). */
export function ChartTitle({ title }: { title: string }) {
  if (!title) return null
  return <div className="mb-3.5 text-[22px] font-bold text-[#060B25]">{title}</div>
}
