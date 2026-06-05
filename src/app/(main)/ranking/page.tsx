import Link from 'next/link'

import { RankingTable } from '@/components/ranking/ranking-table'
import { db } from '@/lib/db'

export const revalidate = 60

export default async function RankingPage() {
  const scores = await db.prediction.groupBy({
    by: ['userId'],
    _sum: { pointsEarned: true },
    orderBy: { _sum: { pointsEarned: 'desc' } },
  })

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

  return (
    <main className="min-h-screen bg-brasa-bg px-4 sm:px-6 py-8 max-w-2xl mx-auto">
      <h1 className="font-display text-4xl text-white mb-1">Ranking</h1>
      <p className="text-sm text-white/40 mb-8">Copa do Mundo 2026</p>

      {ranking.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center gap-4">
          <span className="text-5xl">🏆</span>
          <p className="text-white/40 text-base">Ninguém palpitou ainda.</p>
          <Link
            href="/jogos"
            className="text-verde-500 hover:text-verde-400 font-semibold text-sm transition-colors"
          >
            Ver jogos e palpitar →
          </Link>
        </div>
      ) : (
        <RankingTable ranking={ranking} />
      )}
    </main>
  )
}
