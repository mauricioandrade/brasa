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
      <h1 className="font-display text-4xl text-white mb-8">Ranking</h1>
      {ranking.length === 0 ? (
        <p className="text-white/40">Nenhum palpite registrado ainda.</p>
      ) : (
        <RankingTable ranking={ranking} />
      )}
    </main>
  )
}
