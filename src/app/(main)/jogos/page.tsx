import { GameCard } from '@/components/jogos/game-card'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export default async function JogosPage() {
  const session = await auth()

  const [matches, predictions] = await Promise.all([
    db.match.findMany({ orderBy: { scheduledAt: 'asc' } }),
    session?.user?.id
      ? db.prediction.findMany({ where: { userId: session.user.id } })
      : Promise.resolve([]),
  ])

  const predictionMap = new Map(predictions.map((p) => [p.matchId, p]))

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
    <main className="min-h-screen bg-brasa-bg px-4 sm:px-6 py-8 max-w-2xl mx-auto">
      <h1 className="font-display text-4xl text-white mb-8">Jogos</h1>
      {Object.entries(groups)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([group, games]) => (
          <section key={group} className="mb-8">
            <h2 className="font-display text-lg sm:text-xl text-amarelo-400 mb-3">
              {group.length === 1 ? `Grupo ${group}` : group.replace(/_/g, ' ')}
            </h2>
            <div className="flex flex-col gap-2">
              {games.map((match) => (
                <GameCard
                  key={match.id}
                  match={match}
                  userPrediction={predictionMap.get(match.id) ?? undefined}
                />
              ))}
            </div>
          </section>
        ))}
    </main>
  )
}
