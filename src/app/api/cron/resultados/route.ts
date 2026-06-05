import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { getFinishedMatches, getLiveMatches, toLocalName } from '@/lib/football-api'
import { calculatePoints } from '@/lib/scoring'
import type { Phase } from '@/types'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET(request: Request) {
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const [finished, live] = await Promise.all([getFinishedMatches(), getLiveMatches()])

    let updatedScores = 0
    let updatedStatus = 0

    // Marcar jogos ao vivo
    for (const fdMatch of live) {
      const home = toLocalName(fdMatch.homeTeam.name)
      const away = toLocalName(fdMatch.awayTeam.name)
      const matchDate = new Date(fdMatch.utcDate)

      const match = await db.match.findFirst({
        where: {
          homeTeam: home,
          awayTeam: away,
          scheduledAt: {
            gte: new Date(matchDate.getTime() - 3 * 60 * 60 * 1000),
            lte: new Date(matchDate.getTime() + 3 * 60 * 60 * 1000),
          },
          status: { not: 'FINISHED' },
        },
      })

      if (match && match.status !== 'LIVE') {
        await db.match.update({ where: { id: match.id }, data: { status: 'LIVE' } })
        updatedStatus++
      }
    }

    // Processar jogos encerrados
    for (const fdMatch of finished) {
      const { home, away } = fdMatch.score.fullTime
      if (home === null || away === null) continue

      const homeTeam = toLocalName(fdMatch.homeTeam.name)
      const awayTeam = toLocalName(fdMatch.awayTeam.name)
      const matchDate = new Date(fdMatch.utcDate)

      const match = await db.match.findFirst({
        where: {
          homeTeam,
          awayTeam,
          scheduledAt: {
            gte: new Date(matchDate.getTime() - 3 * 60 * 60 * 1000),
            lte: new Date(matchDate.getTime() + 3 * 60 * 60 * 1000),
          },
          status: { not: 'FINISHED' },
        },
        include: { predictions: true },
      })

      if (!match) continue

      // Atualizar placar
      await db.match.update({
        where: { id: match.id },
        data: {
          homeScore: home,
          awayScore: away,
          status: 'FINISHED',
          ...(fdMatch.topScorer ? { topScorerName: fdMatch.topScorer } : {}),
        },
      })

      // Calcular pontos de cada palpite em paralelo.
      await Promise.all(
        match.predictions
          .filter((p) => !p.calculated)
          .map((p) => {
            const points = calculatePoints(
              { homeScore: p.homeScore, awayScore: p.awayScore, topScorerName: p.topScorerName },
              {
                homeScore: home,
                awayScore: away,
                topScorerName: fdMatch.topScorer ?? match.topScorerName,
                phase: match.phase as Phase,
              },
            )
            return db.prediction.update({
              where: { id: p.id },
              data: { pointsEarned: points, calculated: true },
            })
          }),
      )

      updatedScores++
    }

    if (updatedScores > 0) {
      revalidateTag('ranking', {})
    }

    console.warn(`[cron] ciclo completo: ${updatedScores} placares, ${updatedStatus} ao vivo`)
    return NextResponse.json({ updatedScores, updatedStatus })
  } catch (err) {
    console.error('[cron/resultados]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
