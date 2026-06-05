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

  return (
    <main className="min-h-screen bg-brasa-bg px-4 sm:px-6 py-8 max-w-2xl mx-auto">
      <h1 className="font-display text-4xl text-white mb-8">Meus Palpites</h1>
      {predictions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/40 mb-4">Você ainda não fez nenhum palpite.</p>
          <Link href="/jogos" className="text-verde-500 hover:text-verde-400 font-semibold">
            Ver jogos e palpitar →
          </Link>
        </div>
      )}
      <div className="flex flex-col gap-3">
        {predictions.map((p) => (
          <PredictionCard key={p.id} prediction={p} />
        ))}
      </div>
    </main>
  )
}
