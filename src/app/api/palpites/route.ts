import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json()) as {
    matchId: string
    homeScore: number
    awayScore: number
    topScorerName?: string
  }

  const { matchId, homeScore, awayScore, topScorerName } = body

  if (
    !matchId ||
    typeof homeScore !== 'number' ||
    typeof awayScore !== 'number' ||
    homeScore < 0 ||
    awayScore < 0 ||
    homeScore > 20 ||
    awayScore > 20
  ) {
    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
  }

  const match = await db.match.findUnique({ where: { id: matchId } })
  if (!match) {
    return NextResponse.json({ error: 'Jogo não encontrado' }, { status: 404 })
  }

  const kickoffLock = new Date(match.scheduledAt.getTime() - 5 * 60 * 1000)
  if (new Date() >= kickoffLock) {
    return NextResponse.json({ error: 'Prazo de palpite encerrado' }, { status: 400 })
  }

  const prediction = await db.prediction.upsert({
    where: { userId_matchId: { userId: session.user.id, matchId } },
    create: {
      userId: session.user.id,
      matchId,
      homeScore,
      awayScore,
      topScorerName: topScorerName ?? null,
    },
    update: {
      homeScore,
      awayScore,
      topScorerName: topScorerName ?? null,
    },
  })

  return NextResponse.json(prediction)
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const predictions = await db.prediction.findMany({
    where: { userId: session.user.id },
    include: { match: true },
    orderBy: { match: { scheduledAt: 'asc' } },
  })

  return NextResponse.json(predictions)
}
