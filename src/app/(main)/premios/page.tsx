import { auth } from '@/lib/auth'
import { AwardsSection } from '@/components/premios/awards-section'
import { PhaseTabs } from '@/components/premios/phase-tabs'

export default async function PremiosPage() {
  const session = await auth()
  const isLoggedIn = !!session?.user?.id

  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 max-w-4xl mx-auto">
      <h1 className="font-display text-5xl sm:text-7xl text-white mb-2">PRÊMIOS</h1>
      <p className="text-white/40 text-sm mb-8">Melhores jogadores de cada fase</p>

      {isLoggedIn && (
        <section className="mb-12">
          <h2 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">
            Suas Previsões
          </h2>
          <PhaseTabs />
        </section>
      )}

      <section>
        <h2 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">
          Vencedores Oficiais
        </h2>
        <AwardsSection />
      </section>
    </main>
  )
}
