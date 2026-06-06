import { NextResponse } from 'next/server'

import type { AwardCategory } from '@prisma/client'

import { TEAM_FLAGS, TEAM_GOALKEEPERS, TEAM_STARS } from '@/lib/team-data'

export const revalidate = 3600

interface Candidate {
  name: string
  team: string
  flag: string
  position: string
}

const VALID_CATEGORIES: AwardCategory[] = [
  'TOP_SCORER',
  'BEST_GOALKEEPER',
  'BEST_PLAYER',
  'BEST_DEFENSE',
]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const rawCategory = searchParams.get('category')

  if (!rawCategory || !VALID_CATEGORIES.includes(rawCategory as AwardCategory)) {
    return NextResponse.json({ error: 'Categoria inválida' }, { status: 400 })
  }

  const category = rawCategory as AwardCategory
  const candidates: Candidate[] = []

  if (category === 'TOP_SCORER' || category === 'BEST_PLAYER') {
    // Attackers and midfielders from TEAM_STARS
    for (const [team, star] of Object.entries(TEAM_STARS)) {
      if (star.position === 'ATK' || star.position === 'MID') {
        candidates.push({
          name: star.name,
          team,
          flag: TEAM_FLAGS[team] ?? '🏳️',
          position: star.position,
        })
      }
    }
  } else if (category === 'BEST_GOALKEEPER') {
    for (const [team, gk] of Object.entries(TEAM_GOALKEEPERS)) {
      candidates.push({
        name: gk.name,
        team,
        flag: TEAM_FLAGS[team] ?? '🏳️',
        position: 'GK',
      })
    }
  } else if (category === 'BEST_DEFENSE') {
    // All 48 teams — playerName and team are both team name
    for (const [team] of Object.entries(TEAM_FLAGS)) {
      candidates.push({
        name: team,
        team,
        flag: TEAM_FLAGS[team] ?? '🏳️',
        position: 'DEF',
      })
    }
  }

  // Sort by name and limit to 48
  const sorted = candidates.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 48)

  return NextResponse.json({ candidates: sorted })
}
