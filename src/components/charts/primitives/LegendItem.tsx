/** Ítem de leyenda para gráficos de línea: trazo corto del color de la serie + nombre. */
export function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs font-medium text-[#41464E]">
      <span className="h-[3px] w-4 rounded-full" style={{ background: color }} aria-hidden="true" />
      {label}
    </div>
  )
}
