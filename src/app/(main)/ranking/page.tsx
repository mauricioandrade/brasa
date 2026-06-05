import Link from 'next/link'

import { RankingTable } from '@/components/ranking/ranking-table'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export const revalidate = 60

export default async function RankingPage() {
  const [session, scores] = await Promise.all([
    auth(),
    db.prediction.groupBy({
      by: ['userId'],
      _sum: { pointsEarned: true },
      orderBy: { _sum: { pointsEarned: 'desc' } },
    }),
  ])

  const users = await db.user.findMany({
    where: { id: { in: scores.map((s) => s.userId) } },
    select: { id: true, name: true, image: true },
  })

  const userMap = new Map(users.map((u) => [u.id, u]))

  const ranking = scores.map((s, i) => ({
    position: i + 1,
    userId: s.userId,
    name: userMap.get(s.userId)?.name ?? 'Anônimo',
    image: userMap.get(s.userId)?.image ?? null,
    points: s._sum.pointsEarned ?? 0,
  }))

  const currentUserId = session?.user?.id ?? null
  const myEntry = currentUserId ? ranking.find((r) => r.userId === currentUserId) : null
  const nextEntry = myEntry ? ranking[myEntry.position - 2] : null

  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 max-w-2xl mx-auto">
      <h1 className="font-display text-4xl text-white mb-1">Ranking</h1>
      <p className="text-sm text-white/40 mb-6">Copa do Mundo 2026</p>

      {myEntry && (
        <div className="mb-6 rounded-xl border border-verde-500/20 bg-verde-500/5 px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">
              Você está em{' '}
              <span className="font-display text-xl text-amarelo-400">{myEntry.position}°</span>{' '}
              lugar
            </p>
            {nextEntry && myEntry.position > 1 && (
              <p className="text-xs text-white/40 mt-0.5">
                {nextEntry.points - myEntry.points} pts para alcançar {nextEntry.name}
              </p>
            )}
          </div>
          <span className="font-display text-2xl text-verde-500">{myEntry.points} pts</span>
        </div>
      )}

      {ranking.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center gap-4">
          <span className="text-5xl">🏆</span>
          <p className="text-white/40 text-base">Ninguém palpitou ainda.</p>
          <Link
            href={currentUserId ? '/jogos' : '/login'}
            className="text-verde-500 hover:text-verde-400 font-semibold text-sm transition-colors"
          >
            {currentUserId ? 'Ver jogos e palpitar →' : 'Entrar para palpitar →'}
          </Link>
        </div>
      ) : (
        <RankingTable ranking={ranking} currentUserId={currentUserId} />
      )}
    </main>
  )
}
