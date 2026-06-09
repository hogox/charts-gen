import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { AppHeader } from '@/components/layout/AppHeader'
import { Sidebar } from '@/components/layout/Sidebar'
import { PreviewPanel } from '@/components/layout/PreviewPanel'

function App() {
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
    <>
      <AppHeader onDownload={downloadPNG} busy={busy} />
      <div className="grid min-h-[calc(100vh-57px)] grid-cols-1 min-[900px]:h-[calc(100vh-57px)] min-[900px]:min-h-0 min-[900px]:grid-cols-[460px_1fr] min-[1280px]:grid-cols-[520px_1fr] min-[900px]:overflow-hidden">
        <Sidebar />
        <PreviewPanel cardRef={cardRef} />
      </div>
      <Toaster />
    </>
  )
}

export default App
