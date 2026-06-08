import { Toaster } from '@/components/ui/sonner'
import { AppHeader } from '@/components/layout/AppHeader'
import { Sidebar } from '@/components/layout/Sidebar'
import { PreviewPanel } from '@/components/layout/PreviewPanel'

function App() {
  return (
    <>
      <AppHeader />
      <div className="grid min-h-[calc(100vh-53px)] grid-cols-1 min-[900px]:grid-cols-[420px_1fr]">
        <Sidebar />
        <PreviewPanel />
      </div>
      <Toaster />
    </>
  )
}

export default App
