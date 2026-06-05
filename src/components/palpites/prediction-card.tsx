import type { Match, Prediction } from '@prisma/client'

interface PredictionCardProps {
  prediction: Prediction & { match: Match }
}

export function PredictionCard({ prediction: p }: PredictionCardProps) {
  const hasResult = p.match.homeScore !== null && p.match.awayScore !== null
  const hasPoints = p.calculated && p.pointsEarned > 0
  const isFinished = p.match.status === 'FINISHED'

  return (
    <div className="bg-brasa-surface rounded-2xl p-4 border border-white/5">
      {/* Match title */}
      <p className="text-sm text-white/50 mb-3">
        {p.match.homeFlag} {p.match.homeTeam} × {p.match.awayTeam} {p.match.awayFlag}
      </p>

      {/* Scores block */}
      <div className="flex flex-col gap-1.5 mb-2">
        {/* User prediction row */}
        <div className="flex items-baseline gap-3">
          <span className="text-xs text-white/40 w-24 shrink-0">Meu palpite</span>
          <span className="font-display text-2xl text-white leading-none">
            {p.homeScore} × {p.awayScore}
          </span>
        </div>

        {/* Result row */}
        {hasResult ? (
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40 w-24 shrink-0">Resultado</span>
            <span
              className={`font-display text-2xl leading-none ${hasPoints ? 'text-amarelo-400' : 'text-white/50'}`}
            >
              {p.match.homeScore} × {p.match.awayScore}
            </span>
            {p.calculated ? (
              <span
                className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${
                  hasPoints ? 'bg-verde-500/20 text-verde-500' : 'bg-white/5 text-white/30'
                }`}
              >
                {hasPoints ? `+${p.pointsEarned} pts` : '0 pts'}
              </span>
            ) : null}
          </div>
        ) : (
          <div className="flex items-baseline gap-3">
            <span className="text-xs text-white/40 w-24 shrink-0">Resultado</span>
            <span className="text-xs text-white/30">
              {isFinished ? 'Calculando...' : 'Aguardando resultado'}
            </span>
          </div>
        )}
      </div>

      {/* Top scorer */}
      {p.topScorerName && (
        <p className="text-xs text-white/30 mt-2 pt-2 border-t border-white/5">
          Artilheiro: {p.topScorerName}
        </p>
      )}
    </div>
  )
}
