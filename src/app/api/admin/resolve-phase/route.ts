import { NextResponse } from 'next/server'

import type { Phase } from '@prisma/client'

import { auth } from '@/lib/auth'
import { resolvePhaseAwards } from '@/lib/award-resolver'

const VALID_PHASES: Phase[] = [
  'GROUP',
  'ROUND_OF_16',
  'QUARTER_FINAL',
  'SEMI_FINAL',
  'THIRD_PLACE',
  'FINAL',
]

export async function POST(req: Request) {
  const session = await auth()
  const role = (session?.user as { role?: string } | undefined)?.role
  if (!session?.user?.id || role !== 'ADMIN') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { phase } = body as { phase: unknown }

  if (typeof phase !== 'string' || !VALID_PHASES.includes(phase as Phase)) {
    return NextResponse.json({ error: 'Fase inválida' }, { status: 400 })
  }

  try {
    await resolvePhaseAwards(phase as Phase)
    return NextResponse.json({ ok: true, phase })
  } catch (err) {
    console.error('resolve-phase error', err)
    return NextResponse.json({ error: 'Erro ao resolver fase' }, { status: 500 })
  }
}
