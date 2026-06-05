import { Header } from '@/components/layout/header'
import { LayoutBackground } from '@/components/layout/layout-background'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brasa-bg relative">
      <LayoutBackground />
      <Header />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
