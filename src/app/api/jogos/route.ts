import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const matches = await db.match.findMany({
      orderBy: { scheduledAt: 'asc' },
    })
    return NextResponse.json(matches)
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
