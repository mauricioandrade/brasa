import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export const revalidate = 60

export async function GET() {
  const awards = await db.phaseAward.findMany({
    orderBy: [{ phase: 'asc' }, { category: 'asc' }],
  })
  return NextResponse.json(awards)
}
