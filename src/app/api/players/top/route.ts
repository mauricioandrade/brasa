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
  Brasil: '🇧🇷',
  Argentina: '🇦🇷',
  França: '🇫🇷',
  Portugal: '🇵🇹',
  Noruega: '🇳🇴',
  Inglaterra: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  Alemanha: '🇩🇪',
  Espanha: '🇪🇸',
  Bélgica: '🇧🇪',
  Holanda: '🇳🇱',
  Uruguai: '🇺🇾',
  Colômbia: '🇨🇴',
  Croácia: '🇭🇷',
  Gana: '🇬🇭',
  'Estados Unidos': '🇺🇸',
  Canadá: '🇨🇦',
  México: '🇲🇽',
  Japão: '🇯🇵',
  'Coreia do Sul': '🇰🇷',
  Marrocos: '🇲🇦',
  Senegal: '🇸🇳',
  Equador: '🇪🇨',
  Suíça: '🇨🇭',
  Áustria: '🇦🇹',
  Turquia: '🇹🇷',
  Irã: '🇮🇷',
  Austrália: '🇦🇺',
  Egito: '🇪🇬',
  Argélia: '🇩🇿',
  Suécia: '🇸🇪',
  'Costa do Marfim': '🇨🇮',
  'Arábia Saudita': '🇸🇦',
  Escócia: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  Paraguai: '🇵🇾',
  Tunísia: '🇹🇳',
  'Rep. Tcheca': '🇨🇿',
  'Bósnia e Herzegovina': '🇧🇦',
  Catar: '🇶🇦',
  'África do Sul': '🇿🇦',
  'Cabo Verde': '🇨🇻',
  Uzbequistão: '🇺🇿',
  'Rep. Dem. do Congo': '🇨🇩',
}

export async function GET() {
  const players: PlayerDisplay[] = Object.entries(TEAM_STARS)
    .slice(0, 16)
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
