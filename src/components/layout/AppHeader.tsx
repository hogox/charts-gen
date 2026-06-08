export function AppHeader() {
  return (
    <header className="flex items-center gap-3 bg-[#4C1D95] px-7 py-3.5" role="banner">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="12" width="4" height="8" rx="1" fill="white" />
        <rect x="10" y="7" width="4" height="13" rx="1" fill="white" />
        <rect x="17" y="3" width="4" height="17" rx="1" fill="white" />
      </svg>
      <div className="h-5 w-px bg-white/20" aria-hidden="true" />
      <h1 className="text-sm font-medium leading-tight text-white">Generador de gráficos</h1>
    </header>
  )
}
