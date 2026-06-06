export type PredictionInput = {
  homeScore: number
  awayScore: number
  topScorerName?: string | null
}

export type MatchResult = {
  homeScore: number
  awayScore: number
  topScorerName?: string | null
  phase: 'GROUP' | 'ROUND_OF_16' | 'QUARTER_FINAL' | 'SEMI_FINAL' | 'THIRD_PLACE' | 'FINAL'
}

const KNOCKOUT_PHASES = new Set([
  'ROUND_OF_16',
  'QUARTER_FINAL',
  'SEMI_FINAL',
  'THIRD_PLACE',
  'FINAL',
])

function getWinner(home: number, away: number): 'home' | 'away' | 'draw' {
  if (home > away) return 'home'
  if (away > home) return 'away'
  return 'draw'
}

function normalizeStr(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
}

export function calculatePoints(prediction: PredictionInput, result: MatchResult): number {
  let points = 0

  const isExact =
    prediction.homeScore === result.homeScore && prediction.awayScore === result.awayScore

  if (isExact) {
    points += 7
  } else {
    const predictedWinner = getWinner(prediction.homeScore, prediction.awayScore)
    const actualWinner = getWinner(result.homeScore, result.awayScore)

    if (predictedWinner === actualWinner) {
      points += actualWinner === 'draw' ? 4 : 3
    }
  }

  if (
    prediction.topScorerName &&
    result.topScorerName &&
    normalizeStr(prediction.topScorerName) === normalizeStr(result.topScorerName)
  ) {
    points += 2
  }

  if (KNOCKOUT_PHASES.has(result.phase)) {
    points = Math.round(points * 1.5)
  }

  return points
}
