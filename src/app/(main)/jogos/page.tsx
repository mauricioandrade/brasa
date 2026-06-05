import { GameCard } from '@/components/jogos/game-card'
import { PlayersBanner } from '@/components/layout/players-banner'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export const revalidate = 30

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
      <h1 className="font-display text-8xl sm:text-9xl text-white leading-none mb-0 tracking-wide">
        JOGOS
      </h1>
      <p className="text-xs text-white/30 mb-6 mt-2">
        {matches.length} jogos · <span className="text-amarelo-400/70">Copa do Mundo 2026</span>
      </p>

      <PlayersBanner />

      <div className="mb-8" />

      {Object.entries(groups)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([group, games]) => (
          <section key={group} className="mb-8">
            <h2 className="font-display text-lg sm:text-xl text-amarelo-400 mb-3">
              {group.length === 1 ? `Grupo ${group}` : group.replace(/_/g, ' ')}
              <span className="font-sans text-xs text-white/30 ml-2 normal-case">
                · {games.length} jogos
              </span>
            </h2>
            <div className="flex flex-col gap-2">
              {games.map((match, i) => (
                <GameCard
                  key={match.id}
                  match={match}
                  userPrediction={predictionMap.get(match.id) ?? undefined}
                  index={i}
                />
              ))}
            </div>
          </section>
        ))}
    </main>
  )
}
