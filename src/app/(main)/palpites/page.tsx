import Link from 'next/link'
import { redirect } from 'next/navigation'

import { PredictionCard } from '@/components/palpites/prediction-card'
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

  const totalPoints = predictions.reduce((s, p) => s + p.pointsEarned, 0)
  const count = predictions.length

  const finished = predictions.filter((p) => p.match.homeScore !== null)
  const pending = predictions.filter((p) => p.match.homeScore === null)

  return (
    <main className="min-h-screen bg-brasa-bg px-4 sm:px-6 py-8 max-w-2xl mx-auto">
      <h1 className="font-display text-4xl text-white mb-1">Meus Palpites</h1>

      {count > 0 && (
        <p className="text-xs text-white/30 mb-8">
          <span className="font-display text-3xl text-amarelo-400 mr-1">{totalPoints}</span>
          pontos · {count} palpites
        </p>
      )}

      {count === 0 && (
        <div className="text-center py-12">
          <p className="text-white/40 mb-4">Você ainda não fez nenhum palpite.</p>
          <Link href="/jogos" className="text-verde-500 hover:text-verde-400 font-semibold">
            Ver jogos e palpitar →
          </Link>
        </div>
      )}

      {finished.length > 0 && (
        <section className="mb-8">
          <h2 className="font-display text-lg text-white/50 mb-3">
            Encerrados
            <span className="font-sans text-xs text-white/30 ml-2 normal-case">
              · {finished.length}
            </span>
          </h2>
          <div className="flex flex-col gap-3">
            {finished.map((p, i) => (
              <PredictionCard key={p.id} prediction={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {pending.length > 0 && (
        <section>
          <h2 className="font-display text-lg text-white/50 mb-3">
            Aguardando
            <span className="font-sans text-xs text-white/30 ml-2 normal-case">
              · {pending.length}
            </span>
          </h2>
          <div className="flex flex-col gap-3">
            {pending.map((p, i) => (
              <PredictionCard key={p.id} prediction={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
