import { GameCard } from '@/components/jogos/game-card'
import { JogosBackground } from '@/components/jogos/jogos-background'
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
    <main className="min-h-screen bg-brasa-bg px-4 sm:px-6 py-8 relative">
      <JogosBackground />
      <div className="max-w-2xl mx-auto relative z-10">
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
            <section key={group} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-xs text-brasa-bg bg-amarelo-400 rounded px-2 py-0.5 leading-tight">
                  {group.length === 1 ? group : '·'}
                </span>
                <h2 className="font-display text-lg text-white leading-none">
                  {group.length === 1 ? `GRUPO ${group}` : group.replace(/_/g, ' ')}
                </h2>
                <span className="text-xs text-white/25">· {games.length} jogos</span>
              </div>
              <div className="flex flex-col gap-3">
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
      </div>
    </main>
  )
}
