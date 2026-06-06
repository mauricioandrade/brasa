import { CookieBanner } from '@/components/layout/cookie-banner'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { LayoutBackground } from '@/components/layout/layout-background'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brasa-bg relative flex flex-col">
      <LayoutBackground />
      <Header />
      <div className="relative z-10 flex-1">{children}</div>
      <Footer />
      <CookieBanner />
    </div>
  )
}
