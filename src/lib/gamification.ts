export type Rank = {
  name: string
  emoji: string
  minPoints: number
  color: string
}

export type PredictionForStreak = {
  calculated: boolean
  pointsEarned: number
  match: { scheduledAt: Date }
}

export function computeStreak(predictions: PredictionForStreak[]): {
  current: number
  best: number
} {
  const done = predictions
    .filter((p) => p.calculated)
    .sort((a, b) => b.match.scheduledAt.getTime() - a.match.scheduledAt.getTime())

  let current = 0
  for (const p of done) {
    if (p.pointsEarned > 0) current++
    else break
  }

  let best = 0
  let run = 0
  for (const p of [...done].reverse()) {
    if (p.pointsEarned > 0) {
      run++
      if (run > best) best = run
    } else {
      run = 0
    }
  }

  return { current, best }
}

export const RANKS: Rank[] = [
  { name: 'Torcedor', emoji: '🏟️', minPoints: 0, color: 'text-white/50' },
  { name: 'Reserva', emoji: '⚽', minPoints: 1, color: 'text-white/70' },
  { name: 'Titular', emoji: '🥅', minPoints: 51, color: 'text-verde-500' },
  { name: 'Craque', emoji: '🔥', minPoints: 151, color: 'text-amarelo-400' },
  { name: 'Fenômeno', emoji: '⚡', minPoints: 301, color: 'text-azul-400' },
  { name: 'Lenda', emoji: '👑', minPoints: 501, color: 'text-amarelo-400' },
]

export function getRank(points: number): Rank {
  return [...RANKS].reverse().find((r) => points >= r.minPoints) ?? RANKS[0]
}

export function getNextRank(points: number): Rank | null {
  const idx = RANKS.findIndex((r) => r === getRank(points))
  return RANKS[idx + 1] ?? null
}

export function getProgress(points: number): number {
  const current = getRank(points)
  const next = getNextRank(points)
  if (!next) return 100
  const range = next.minPoints - current.minPoints
  const earned = points - current.minPoints
  return Math.min(100, Math.round((earned / range) * 100))
}
