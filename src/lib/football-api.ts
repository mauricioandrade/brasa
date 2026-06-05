const BASE_URL = 'https://api.football-data.org/v4'
const COMPETITION = process.env.FOOTBALL_DATA_COMPETITION ?? 'WC'

export type FDScore = {
  home: number | null
  away: number | null
}

export type FDMatch = {
  id: number
  utcDate: string
  status:
    | 'SCHEDULED'
    | 'TIMED'
    | 'IN_PLAY'
    | 'PAUSED'
    | 'FINISHED'
    | 'SUSPENDED'
    | 'POSTPONED'
    | 'CANCELLED'
    | 'AWARDED'
  homeTeam: { id: number; name: string; shortName: string }
  awayTeam: { id: number; name: string; shortName: string }
  score: {
    fullTime: FDScore
    halfTime: FDScore
  }
  topScorer?: string | null
}

async function fetchFD<T>(path: string): Promise<T> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10_000)

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      signal: controller.signal,
      headers: { 'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY! },
      next: { revalidate: 60 },
    })

    if (res.status === 429) {
      console.warn('[football-api] rate limit atingido, aguardando próximo ciclo')
      return { matches: [] } as T
    }

    if (!res.ok) {
      throw new Error(`football-data.org ${res.status}: ${path}`)
    }

    return res.json() as Promise<T>
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.warn('[football-api] timeout de 10s atingido:', path)
    } else {
      console.error('[football-api] erro de rede:', path, err)
    }
    return { matches: [] } as T
  } finally {
    clearTimeout(timeout)
  }
}

export async function getFinishedMatches(): Promise<FDMatch[]> {
  const data = await fetchFD<{ matches: FDMatch[] }>(
    `/competitions/${COMPETITION}/matches?status=FINISHED`,
  )
  return data.matches
}

export async function getLiveMatches(): Promise<FDMatch[]> {
  const data = await fetchFD<{ matches: FDMatch[] }>(
    `/competitions/${COMPETITION}/matches?status=IN_PLAY,PAUSED`,
  )
  return data.matches
}

// Mapeamento football-data.org (inglês) → nomes no seed (português)
export const FD_TEAM_NAMES: Record<string, string> = {
  // Grupo A
  'United States': 'Estados Unidos',
  Panama: 'Panamá',
  Mexico: 'México',
  Guatemala: 'Guatemala',
  // Grupo B
  Argentina: 'Argentina',
  Peru: 'Peru',
  Chile: 'Chile',
  Ecuador: 'Equador',
  // Grupo C
  Brazil: 'Brasil',
  Japan: 'Japão',
  Croatia: 'Croácia',
  // Grupo D
  France: 'França',
  Australia: 'Austrália',
  Morocco: 'Marrocos',
  Tanzania: 'Tanzânia',
  // Grupo E
  Spain: 'Espanha',
  'South Korea': 'Coreia do Sul',
  Germany: 'Alemanha',
  Bolivia: 'Bolívia',
  // Grupo F
  Portugal: 'Portugal',
  Iran: 'Irã',
  Uruguay: 'Uruguai',
  Angola: 'Angola',
  // Grupo G
  England: 'Inglaterra',
  Serbia: 'Sérvia',
  Netherlands: 'Holanda',
  Senegal: 'Senegal',
  // Grupo H
  Italy: 'Itália',
  Nigeria: 'Nigéria',
  Belgium: 'Bélgica',
  Norway: 'Noruega',
  // Times adicionais Copa 2026
  Canada: 'Canadá',
  Honduras: 'Honduras',
  Jamaica: 'Jamaica',
  'Costa Rica': 'Costa Rica',
  Venezuela: 'Venezuela',
  Paraguay: 'Paraguai',
  Colombia: 'Colômbia',
  'Saudi Arabia': 'Arábia Saudita',
  'New Zealand': 'Nova Zelândia',
  Indonesia: 'Indonésia',
  'IR Iran': 'Irã',
  'China PR': 'China',
  Qatar: 'Catar',
  'South Africa': 'África do Sul',
  'DR Congo': 'República Democrática do Congo',
  Egypt: 'Egito',
  'Ivory Coast': 'Costa do Marfim',
  Cameroon: 'Camarões',
  Mali: 'Mali',
  Switzerland: 'Suíça',
  Austria: 'Áustria',
  Ukraine: 'Ucrânia',
  Turkey: 'Turquia',
  Romania: 'Romênia',
  Slovakia: 'Eslováquia',
  Albania: 'Albânia',
}

export function toLocalName(fdName: string): string {
  return FD_TEAM_NAMES[fdName] ?? fdName
}
