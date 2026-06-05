import { Header } from '@/components/layout/header'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brasa-bg relative">
      {/* Atmospheric verde glow — stadium lights effect */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-80 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% -10%, oklch(35% 0.12 145 / 0.14) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      <Header />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
