import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export default async function PalpitesPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const predictions = await db.prediction.findMany({
    where: { userId: session.user.id },
    include: { match: true },
    orderBy: { match: { scheduledAt: 'asc' } },
  })

  return (
    <main className="min-h-screen bg-brasa-bg px-4 sm:px-6 py-8 max-w-2xl mx-auto">
      <h1 className="font-display text-4xl text-white mb-8">Meus Palpites</h1>
      {predictions.length === 0 && (
        <p className="text-white/40">Você ainda não fez nenhum palpite.</p>
      )}
      <div className="flex flex-col gap-3">
        {predictions.map((p) => (
          <div key={p.id} className="bg-brasa-surface rounded-xl p-4 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-sm">
                {p.match.homeFlag} {p.match.homeTeam} × {p.match.awayTeam} {p.match.awayFlag}
              </span>
              {p.calculated && (
                <span className="text-amarelo-400 font-display text-lg">{p.pointsEarned}pts</span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-white font-semibold">
                Palpite: {p.homeScore} × {p.awayScore}
              </span>
              {p.match.homeScore !== null && (
                <span className="text-white/50">
                  Resultado: {p.match.homeScore} × {p.match.awayScore}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
