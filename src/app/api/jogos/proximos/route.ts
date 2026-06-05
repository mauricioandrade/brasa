import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export const revalidate = 60

export async function GET() {
  try {
    const matches = await db.match.findMany({
      where: {
        status: 'SCHEDULED',
        scheduledAt: { gte: new Date() },
      },
      orderBy: { scheduledAt: 'asc' },
      take: 3,
      select: {
        id: true,
        homeTeam: true,
        awayTeam: true,
        homeFlag: true,
        awayFlag: true,
        scheduledAt: true,
        group: true,
      },
    })
    return NextResponse.json(matches)
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
