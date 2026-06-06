import { revalidatePath, revalidateTag } from 'next/cache'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { calculatePoints } from '@/lib/scoring'
import type { Phase } from '@/types'

const VALID_STATUSES = ['SCHEDULED', 'LIVE', 'FINISHED', 'CANCELLED'] as const

async function updateMatchResult(formData: FormData) {
  'use server'

  const session = await auth()
  if (session?.user?.role !== 'ADMIN') throw new Error('Unauthorized')

  const matchId = formData.get('matchId') as string
  const homeScoreRaw = formData.get('homeScore') as string
  const awayScoreRaw = formData.get('awayScore') as string
  const homeScore = homeScoreRaw !== '' ? Number(homeScoreRaw) : NaN
  const awayScore = awayScoreRaw !== '' ? Number(awayScoreRaw) : NaN

  const statusRaw = formData.get('status') as string
  if (!VALID_STATUSES.includes(statusRaw as (typeof VALID_STATUSES)[number])) {
    throw new Error('Status inválido')
  }
  const status = statusRaw as 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'CANCELLED'

  const match = await db.match.update({
    where: { id: matchId },
    data: {
      homeScore: isNaN(homeScore) ? null : homeScore,
      awayScore: isNaN(awayScore) ? null : awayScore,
      status,
    },
  })

  if (status === 'FINISHED' && match.homeScore !== null && match.awayScore !== null) {
    const predictions = await db.prediction.findMany({
      where: { matchId, calculated: false },
    })

    await Promise.all(
      predictions.map((p) => {
        const points = calculatePoints(
          { homeScore: p.homeScore, awayScore: p.awayScore, topScorerName: p.topScorerName },
          {
            homeScore: match.homeScore!,
            awayScore: match.awayScore!,
            phase: match.phase as Phase,
          },
        )
        return db.prediction.update({
          where: { id: p.id },
          data: { pointsEarned: points, calculated: true },
        })
      }),
    )
    revalidateTag('ranking', {})
    revalidatePath('/jogos')
  }

  redirect('/admin/jogos')
}

export default async function AdminResultadosPage({
  searchParams,
}: {
  searchParams: Promise<{ matchId?: string }>
}) {
  const { matchId } = await searchParams

  if (!matchId) {
    return (
      <main className="min-h-screen bg-brasa-bg px-4 py-8 max-w-xl mx-auto flex flex-col items-center justify-center gap-4">
        <p className="text-white/60 text-sm">Nenhum jogo selecionado.</p>
        <Link
          href="/admin/jogos"
          className="text-xs text-amarelo-400 hover:text-amarelo-300 font-semibold transition-colors"
        >
          ← Voltar para jogos
        </Link>
      </main>
    )
  }

  const match = await db.match.findUnique({
    where: { id: matchId },
    include: { _count: { select: { predictions: true } } },
  })

  if (!match) {
    return (
      <main className="min-h-screen bg-brasa-bg px-4 py-8 max-w-xl mx-auto flex flex-col items-center justify-center gap-4">
        <p className="text-white/60 text-sm">Jogo não encontrado.</p>
        <Link
          href="/admin/jogos"
          className="text-xs text-amarelo-400 hover:text-amarelo-300 font-semibold transition-colors"
        >
          ← Voltar para jogos
        </Link>
      </main>
    )
  }

  const scheduledLabel = new Date(match.scheduledAt).toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  })

  return (
    <main className="min-h-screen bg-brasa-bg px-4 py-8 max-w-xl mx-auto">
      <Link
        href="/admin/jogos"
        className="text-xs text-amarelo-400 hover:text-amarelo-300 font-semibold transition-colors mb-8 inline-block"
      >
        ← Voltar para jogos
      </Link>

      <div className="bg-brasa-surface rounded-2xl p-6 border border-white/5">
        <h1 className="font-display text-3xl text-white mb-1">
          {match.homeFlag} {match.homeTeam} × {match.awayTeam} {match.awayFlag}
        </h1>
        <p className="text-white/40 text-sm mb-1">{scheduledLabel}</p>
        <p className="text-white/30 text-xs mb-6">{match._count.predictions} palpites</p>

        <form action={updateMatchResult} className="flex flex-col gap-5">
          <input type="hidden" name="matchId" value={match.id} />

          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-white/60 text-sm">Gols {match.homeTeam}</label>
              <input
                type="number"
                name="homeScore"
                min={0}
                defaultValue={match.homeScore ?? ''}
                placeholder="–"
                className="bg-white/5 border border-white/10 rounded-lg px-3 h-10 text-white focus:border-verde-500 focus:outline-none w-full"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-white/60 text-sm">Gols {match.awayTeam}</label>
              <input
                type="number"
                name="awayScore"
                min={0}
                defaultValue={match.awayScore ?? ''}
                placeholder="–"
                className="bg-white/5 border border-white/10 rounded-lg px-3 h-10 text-white focus:border-verde-500 focus:outline-none w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white/60 text-sm">Status</label>
            <select
              name="status"
              defaultValue={match.status}
              className="bg-white/5 border border-white/10 rounded-lg px-3 h-10 text-white focus:border-verde-500 focus:outline-none"
            >
              <option value="SCHEDULED">SCHEDULED</option>
              <option value="LIVE">LIVE</option>
              <option value="FINISHED">FINISHED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white/60 text-sm">Artilheiro (opcional)</label>
            <input
              type="text"
              name="topScorerName"
              defaultValue={''}
              placeholder="Nome do artilheiro"
              className="bg-white/5 border border-white/10 rounded-lg px-3 h-10 text-white focus:border-verde-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-verde-500 hover:bg-verde-600 text-white font-semibold rounded-full h-10 px-6 transition-colors mt-2 self-start"
          >
            Salvar resultado
          </button>
        </form>
      </div>
    </main>
  )
}
