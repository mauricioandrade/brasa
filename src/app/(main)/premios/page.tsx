import { AwardsSection } from '@/components/premios/awards-section'

export default function PremiosPage() {
  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 max-w-4xl mx-auto">
      <h1 className="font-display text-5xl sm:text-7xl text-white mb-2">PRÊMIOS</h1>
      <p className="text-white/40 text-sm mb-8">Melhores jogadores de cada fase</p>
      <AwardsSection />
    </main>
  )
}
