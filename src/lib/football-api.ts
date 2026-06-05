const ESPN_BASE = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world'

// ── Tipos públicos (interface mantida idêntica ao cliente anterior) ────────────

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

// ── Tipos internos da ESPN ────────────────────────────────────────────────────

type ESPNCompetitor = {
  homeAway: 'home' | 'away'
  team: { displayName: string; shortDisplayName: string; id: string }
  score?: string
}

type ESPNCompetition = {
  competitors: ESPNCompetitor[]
  status: {
    type: {
      name: string
      completed: boolean
    }
  }
}

type ESPNEvent = {
  id: string
  date: string
  competitions: ESPNCompetition[]
}

type ESPNScoreboard = {
  events?: ESPNEvent[]
}

// ── Fetch helper ──────────────────────────────────────────────────────────────

async function fetchESPN(url: string): Promise<ESPNScoreboard> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10_000)

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 0 },
    })

    if (!res.ok) {
      throw new Error(`ESPN API ${res.status}: ${url}`)
    }

    return res.json() as Promise<ESPNScoreboard>
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.warn('[football-api] timeout de 10s atingido:', url)
    } else {
      console.error('[football-api] erro de rede:', url, err)
    }
    return { events: [] }
  } finally {
    clearTimeout(timeout)
  }
}

// ── Conversão ESPN → FDMatch ──────────────────────────────────────────────────

function toFDMatch(event: ESPNEvent): FDMatch | null {
  const competition = event.competitions[0]
  if (!competition) return null

  const home = competition.competitors.find((c) => c.homeAway === 'home')
  const away = competition.competitors.find((c) => c.homeAway === 'away')
  if (!home || !away) return null

  const statusName = competition.status.type.name
  const completed = competition.status.type.completed

  let fdStatus: FDMatch['status']
  if (completed || statusName === 'STATUS_FINAL') {
    fdStatus = 'FINISHED'
  } else if (statusName === 'STATUS_IN_PLAY') {
    fdStatus = 'IN_PLAY'
  } else if (statusName === 'STATUS_HALFTIME') {
    fdStatus = 'PAUSED'
  } else if (statusName === 'STATUS_POSTPONED') {
    fdStatus = 'POSTPONED'
  } else if (statusName === 'STATUS_CANCELLED') {
    fdStatus = 'CANCELLED'
  } else {
    fdStatus = 'SCHEDULED'
  }

  const homeScore = home.score !== undefined ? Number(home.score) : null
  const awayScore = away.score !== undefined ? Number(away.score) : null

  return {
    id: Number(event.id),
    utcDate: event.date,
    status: fdStatus,
    homeTeam: {
      id: Number(home.team.id),
      name: home.team.displayName,
      shortName: home.team.shortDisplayName,
    },
    awayTeam: {
      id: Number(away.team.id),
      name: away.team.displayName,
      shortName: away.team.shortDisplayName,
    },
    score: {
      fullTime: {
        home: homeScore,
        away: awayScore,
      },
      halfTime: {
        home: null,
        away: null,
      },
    },
    topScorer: null,
  }
}

// ── Helpers de data ───────────────────────────────────────────────────────────

function toESPNDate(date: Date): string {
  const y = date.getUTCFullYear()
  const m = String(date.getUTCMonth() + 1).padStart(2, '0')
  const d = String(date.getUTCDate()).padStart(2, '0')
  return `${y}${m}${d}`
}

function fetchByDate(yyyymmdd: string): Promise<ESPNScoreboard> {
  return fetchESPN(`${ESPN_BASE}/scoreboard?dates=${yyyymmdd}`)
}

// ── Funções públicas ──────────────────────────────────────────────────────────

export async function getLiveMatches(): Promise<FDMatch[]> {
  const data = await fetchESPN(`${ESPN_BASE}/scoreboard`)
  const events = data.events ?? []
  return events
    .map(toFDMatch)
    .filter((m): m is FDMatch => m !== null)
    .filter((m) => m.status === 'IN_PLAY' || m.status === 'PAUSED')
}

export async function getFinishedMatches(): Promise<FDMatch[]> {
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setUTCDate(yesterday.getUTCDate() - 1)

  const [todayData, yesterdayData] = await Promise.all([
    fetchByDate(toESPNDate(now)),
    fetchByDate(toESPNDate(yesterday)),
  ])

  const events = [...(todayData.events ?? []), ...(yesterdayData.events ?? [])]
  return events
    .map(toFDMatch)
    .filter((m): m is FDMatch => m !== null)
    .filter((m) => m.status === 'FINISHED')
}

// ── Mapeamento ESPN displayName (inglês) → português ─────────────────────────

export const FD_TEAM_NAMES: Record<string, string> = {
  // Américas
  Brazil: 'Brasil',
  Argentina: 'Argentina',
  'United States': 'Estados Unidos',
  Mexico: 'México',
  Canada: 'Canadá',
  Colombia: 'Colômbia',
  Uruguay: 'Uruguai',
  Ecuador: 'Equador',
  Paraguay: 'Paraguai',
  Panama: 'Panamá',
  Honduras: 'Honduras',
  Jamaica: 'Jamaica',
  'Costa Rica': 'Costa Rica',
  Venezuela: 'Venezuela',
  Bolivia: 'Bolívia',
  Haiti: 'Haiti',
  Curaçao: 'Curaçao',
  'United States Virgin Islands': 'Ilhas Virgens (EUA)',
  // Europa
  France: 'França',
  Germany: 'Alemanha',
  Spain: 'Espanha',
  England: 'Inglaterra',
  Portugal: 'Portugal',
  Netherlands: 'Holanda',
  Belgium: 'Bélgica',
  Norway: 'Noruega',
  Croatia: 'Croácia',
  Switzerland: 'Suíça',
  Austria: 'Áustria',
  Turkey: 'Turquia',
  Sweden: 'Suécia',
  Scotland: 'Escócia',
  'Czech Republic': 'Rep. Tcheca',
  'Bosnia & Herzegovina': 'Bósnia e Herzegovina',
  Romania: 'Romênia',
  Slovakia: 'Eslováquia',
  Albania: 'Albânia',
  Ukraine: 'Ucrânia',
  Serbia: 'Sérvia',
  Italy: 'Itália',
  // África
  Morocco: 'Marrocos',
  Senegal: 'Senegal',
  Egypt: 'Egito',
  Algeria: 'Argélia',
  Ghana: 'Gana',
  'Ivory Coast': 'Costa do Marfim',
  'South Africa': 'África do Sul',
  'Cape Verde': 'Cabo Verde',
  'DR Congo': 'Rep. Dem. do Congo',
  Nigeria: 'Nigéria',
  Cameroon: 'Camarões',
  Mali: 'Mali',
  Tanzania: 'Tanzânia',
  // Ásia / Oceania
  Japan: 'Japão',
  'South Korea': 'Coreia do Sul',
  Iran: 'Irã',
  'IR Iran': 'Irã',
  Australia: 'Austrália',
  'Saudi Arabia': 'Arábia Saudita',
  Iraq: 'Iraque',
  Jordan: 'Jordânia',
  Qatar: 'Catar',
  Uzbekistan: 'Uzbequistão',
  Indonesia: 'Indonésia',
  'China PR': 'China',
  'New Zealand': 'Nova Zelândia',
}

export function toLocalName(fdName: string): string {
  return FD_TEAM_NAMES[fdName] ?? fdName
}
