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
}

async function fetchFD<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY! },
    next: { revalidate: 60 },
  })
  if (!res.ok) {
    throw new Error(`football-data.org ${res.status}: ${path}`)
  }
  return res.json() as Promise<T>
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
  'United States': 'Estados Unidos',
  Panama: 'Panamá',
  Mexico: 'México',
  Guatemala: 'Guatemala',
  Argentina: 'Argentina',
  Peru: 'Peru',
  Chile: 'Chile',
  Ecuador: 'Equador',
  Brazil: 'Brasil',
  Japan: 'Japão',
  Croatia: 'Croácia',
  France: 'França',
  Australia: 'Austrália',
  Morocco: 'Marrocos',
  Tanzania: 'Tanzânia',
  Spain: 'Espanha',
  'South Korea': 'Coreia do Sul',
  Germany: 'Alemanha',
  Bolivia: 'Bolívia',
  Portugal: 'Portugal',
  Iran: 'Irã',
  Uruguay: 'Uruguai',
  Angola: 'Angola',
  England: 'Inglaterra',
  Serbia: 'Sérvia',
  Netherlands: 'Holanda',
  Senegal: 'Senegal',
  Italy: 'Itália',
  Nigeria: 'Nigéria',
  Belgium: 'Bélgica',
  Norway: 'Noruega',
}

export function toLocalName(fdName: string): string {
  return FD_TEAM_NAMES[fdName] ?? fdName
}
