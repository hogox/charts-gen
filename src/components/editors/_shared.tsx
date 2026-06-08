import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Etiqueta de sección (.slbl del original). */
export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('text-sm font-semibold text-[#060B25] mb-0.5', className)}>{children}</div>
}

/** Encabezado de columnas de una tabla de filas. */
export function ColumnHeaders({ cols, labels }: { cols: string; labels: string[] }) {
  return (
    <div className="grid gap-2 mb-1.5" style={{ gridTemplateColumns: cols }} aria-hidden="true">
      {labels.map((l, i) => (
        <div key={i} className={cn('text-[10px] text-[#6B7280] font-medium', i === 0 ? 'text-left' : 'text-center')}>
          {l}
        </div>
      ))}
    </div>
  )
}

const inputBase =
  'border border-[#DCDDE3] rounded-md bg-white text-[#060B25] outline-none transition-colors ' +
  'hover:border-[#C0BCC9] focus-visible:border-[#6D28D9] focus-visible:shadow-[0_0_0_2px_var(--brand-accent2),0_0_0_4px_rgba(109,40,217,.2)] w-full'

/** Input de texto/numero compacto (.prow-input / .list-row-input). */
export function CellInput({
  value,
  onChange,
  type = 'text',
  size = 'sm',
  step,
  min,
  max,
  placeholder,
  ariaLabel,
}: {
  value: string | number
  onChange: (v: string) => void
  type?: 'text' | 'number'
  size?: 'sm' | 'xs'
  step?: number
  min?: number
  max?: number
  placeholder?: string
  ariaLabel?: string
}) {
  return (
    <input
      type={type}
      value={value}
      step={step}
      min={min}
      max={max}
      placeholder={placeholder}
      aria-label={ariaLabel}
      onChange={(e) => onChange(e.target.value)}
      className={cn(inputBase, size === 'sm' ? 'px-3 py-[9px] text-xs' : 'px-2 py-[7px] text-[11px]')}
    />
  )
}

/** Selector de color compacto. */
export function ColorInput({ value, onChange, ariaLabel }: { value: string; onChange: (v: string) => void; ariaLabel?: string }) {
  return (
    <input
      type="color"
      value={value}
      aria-label={ariaLabel}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 w-full cursor-pointer rounded-md border border-[#DCDDE3] bg-white px-1 py-0.5"
    />
  )
}

/** Campo con etiqueta arriba (.fg). */
export function Field({ label, htmlFor, children }: { label: string; htmlFor?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[11px] font-medium text-[#41464E]">
        {label}
      </label>
      {children}
    </div>
  )
}

/** Input de texto/numero con label (.fg input). */
export function FieldInput({
  label,
  value,
  onChange,
  type = 'text',
  step,
}: {
  label: string
  value: string | number
  onChange: (v: string) => void
  type?: 'text' | 'number'
  step?: number
}) {
  return (
    <Field label={label}>
      <input
        type={type}
        value={value}
        step={step}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputBase, 'px-3 py-[9px] text-[13px]')}
      />
    </Field>
  )
}

/** Botón "+ Agregar …" (.btn-add). */
export function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-1.5 flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-[#DCDDE3] bg-transparent px-3 py-2 text-[11px] text-[#41464E] transition-colors hover:border-[#6D28D9] hover:bg-[rgba(109,40,217,.08)] hover:text-[#6D28D9]"
      aria-label={label}
    >
      <span aria-hidden="true">+</span> {label}
    </button>
  )
}

/** Botón de eliminar fila (.btn-icon). */
export function DeleteButton({ onClick, ariaLabel }: { onClick: () => void; ariaLabel: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#DCDDE3] bg-white text-sm leading-none text-[#41464E] transition-colors hover:border-[#D93636] hover:bg-[#FEF0F0] hover:text-[#D93636]"
    >
      <span aria-hidden="true">×</span>
    </button>
  )
}

/** Fila de edición con grid configurable. */
export function RowGrid({ cols, children }: { cols: string; children: ReactNode }) {
  return (
    <div role="listitem" className="grid items-center gap-2 mb-1.5" style={{ gridTemplateColumns: cols }}>
      {children}
    </div>
  )
}
