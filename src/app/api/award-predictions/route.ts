import { NextResponse } from 'next/server'

import type { AwardCategory, Phase } from '@prisma/client'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

const VALID_PHASES: Phase[] = [
  'GROUP',
  'ROUND_OF_16',
  'QUARTER_FINAL',
  'SEMI_FINAL',
  'THIRD_PLACE',
  'FINAL',
]

const VALID_CATEGORIES: AwardCategory[] = [
  'TOP_SCORER',
  'BEST_GOALKEEPER',
  'BEST_PLAYER',
  'BEST_DEFENSE',
]

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const [predictions, resolved] = await Promise.all([
    db.awardPrediction.findMany({ where: { userId: session.user.id } }),
    db.phaseAward.findMany(),
  ])

  return NextResponse.json({
    predictions: predictions.map((p) => ({
      phase: p.phase,
      category: p.category,
      playerName: p.playerName,
      team: p.team,
    })),
    resolved: resolved.map((r) => ({
      phase: r.phase,
      category: r.category,
      playerName: r.playerName,
      team: r.team,
      stat: r.stat,
    })),
  })
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { phase, category, playerName, team } = body as {
    phase: unknown
    category: unknown
    playerName: unknown
    team: unknown
  }

  if (
    typeof phase !== 'string' ||
    !VALID_PHASES.includes(phase as Phase) ||
    typeof category !== 'string' ||
    !VALID_CATEGORIES.includes(category as AwardCategory) ||
    typeof playerName !== 'string' ||
    playerName.trim().length === 0 ||
    playerName.length > 100 ||
    typeof team !== 'string' ||
    team.trim().length === 0 ||
    team.length > 100
  ) {
    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
  }

  // Block changes once the phase has a resolved award for this category
  const resolved = await db.phaseAward.findUnique({
    where: { phase_category: { phase: phase as Phase, category: category as AwardCategory } },
  })
  if (resolved) {
    return NextResponse.json({ error: 'Esta fase já foi resolvida' }, { status: 400 })
  }

  const prediction = await db.awardPrediction.upsert({
    where: {
      userId_phase_category: {
        userId: session.user.id,
        phase: phase as Phase,
        category: category as AwardCategory,
      },
    },
    create: {
      userId: session.user.id,
      phase: phase as Phase,
      category: category as AwardCategory,
      playerName: playerName.trim(),
      team: team.trim(),
    },
    update: {
      playerName: playerName.trim(),
      team: team.trim(),
    },
  })

  return NextResponse.json(prediction)
}
