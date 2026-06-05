import { NextResponse } from 'next/server'

import { TEAM_STARS } from '@/lib/team-data'

export const revalidate = 86400

type PlayerDisplay = {
  id: number
  name: string
  nationality: string
  flag: string
  club: string
  position: string
  goals: number
}

const FLAG_MAP: Record<string, string> = {
  Brazil: '🇧🇷',
  Argentina: '🇦🇷',
  France: '🇫🇷',
  Portugal: '🇵🇹',
  Norway: '🇳🇴',
  England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  Germany: '🇩🇪',
  Spain: '🇪🇸',
  Belgium: '🇧🇪',
  Netherlands: '🇳🇱',
  Uruguay: '🇺🇾',
  Colombia: '🇨🇴',
  Serbia: '🇷🇸',
  Poland: '🇵🇱',
  Croatia: '🇭🇷',
  Nigeria: '🇳🇬',
}

export async function GET() {
  const players: PlayerDisplay[] = Object.entries(TEAM_STARS)
    .slice(0, 12)
    .map(([nationality, star], i) => ({
      id: i + 1,
      name: star.name,
      nationality,
      flag: FLAG_MAP[nationality] ?? '🏳️',
      club: nationality,
      position: star.position,
      goals: 0,
    }))

  return NextResponse.json(players)
}
