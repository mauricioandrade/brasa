import { GameCard } from '@/components/jogos/game-card'
import { db } from '@/lib/db'

export default async function JogosPage() {
  const matches = await db.match.findMany({ orderBy: { scheduledAt: 'asc' } })

  const groups = matches.reduce(
    (acc, m) => {
      const key = m.group ?? m.phase
      if (!acc[key]) acc[key] = []
      acc[key].push(m)
      return acc
    },
    {} as Record<string, typeof matches>,
  )

  return (
    <main className="min-h-screen bg-brasa-bg px-4 py-8 max-w-2xl mx-auto">
      <h1 className="font-display text-4xl text-white mb-8">Jogos</h1>
      {Object.entries(groups).map(([group, games]) => (
        <section key={group} className="mb-8">
          <h2 className="font-display text-xl text-amarelo-400 mb-3">
            {group.length === 1 ? `Grupo ${group}` : group.replace(/_/g, ' ')}
          </h2>
          <div className="flex flex-col gap-2">
            {games.map((match) => (
              <GameCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
