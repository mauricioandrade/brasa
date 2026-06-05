import type { Match, Prediction } from '@prisma/client'

interface PredictionCardProps {
  prediction: Prediction & { match: Match }
}

export function PredictionCard({ prediction: p }: PredictionCardProps) {
  const hasResult = p.match.homeScore !== null
  const statusColor = !hasResult
    ? 'text-white/40'
    : p.calculated && p.pointsEarned > 0
      ? 'text-verde-500'
      : 'text-white/30'

  return (
    <div className="bg-brasa-surface rounded-xl p-4 border border-white/5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/60 text-sm">
          {p.match.homeFlag} {p.match.homeTeam} × {p.match.awayTeam} {p.match.awayFlag}
        </span>
        {p.calculated && (
          <span className="text-amarelo-400 font-display text-lg">{p.pointsEarned}pts</span>
        )}
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span className="text-white font-semibold">
          Palpite: {p.homeScore} × {p.awayScore}
        </span>
        {hasResult && (
          <span className={statusColor}>
            Resultado: {p.match.homeScore} × {p.match.awayScore}
          </span>
        )}
        {!hasResult && <span className="text-white/30 text-xs">aguardando kickoff</span>}
      </div>
      {p.topScorerName && (
        <p className="text-white/40 text-xs mt-1">Artilheiro: {p.topScorerName}</p>
      )}
    </div>
  )
}
