'use client'

import { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { usePredictions } from '@/hooks/use-predictions'
import { TEAM_STARS } from '@/lib/team-data'

interface PredictionFormProps {
  matchId: string
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
  existingPrediction?: { homeScore: number; awayScore: number; topScorerName: string | null }
  onSuccess?: () => void
}

function ScoreButton({
  label,
  onClick,
  variant,
}: {
  label: string
  onClick: () => void
  variant: 'minus' | 'plus'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-8 h-8 rounded-full flex items-center justify-center text-base font-bold transition-colors ${
        variant === 'plus'
          ? 'bg-verde-500/20 border border-verde-500/40 text-verde-400 hover:bg-verde-500/30'
          : 'border border-white/15 text-white/40 hover:text-white hover:border-white/30'
      }`}
    >
      {label}
    </button>
  )
}

export function PredictionForm({
  matchId,
  homeTeam,
  awayTeam,
  homeFlag,
  awayFlag,
  existingPrediction,
  onSuccess,
}: PredictionFormProps) {
  const [homeScore, setHomeScore] = useState(existingPrediction?.homeScore ?? 0)
  const [awayScore, setAwayScore] = useState(existingPrediction?.awayScore ?? 0)
  const [topScorer, setTopScorer] = useState(existingPrediction?.topScorerName ?? '')
  const [hasMadeScorerChoice, setHasMadeScorerChoice] = useState(existingPrediction !== undefined)
  const [saved, setSaved] = useState(false)
  const { savePrediction, loading, error } = usePredictions()

  const homeStar = TEAM_STARS[homeTeam]
  const awayStar = TEAM_STARS[awayTeam]

  const scorerOptions = [
    homeStar
      ? { name: homeStar.name, flag: homeFlag, team: homeTeam, position: homeStar.position }
      : null,
    awayStar
      ? { name: awayStar.name, flag: awayFlag, team: awayTeam, position: awayStar.position }
      : null,
  ].filter((p): p is NonNullable<typeof p> => p !== null)

  function selectScorer(name: string) {
    setTopScorer((prev) => (prev === name ? '' : name))
    setHasMadeScorerChoice(true)
    setSaved(false)
  }

  function skipScorer() {
    setTopScorer('')
    setHasMadeScorerChoice(true)
    setSaved(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await savePrediction(matchId, homeScore, awayScore, topScorer || undefined)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-3 border-t border-white/10">
      {/* Placar — botões +/− */}
      <div className="flex items-center gap-3">
        <div className="flex-1 flex flex-col items-center gap-1.5">
          <span className="text-2xl">{homeFlag}</span>
          <span className="text-[10px] text-white/50 text-center leading-tight">{homeTeam}</span>
          <div className="flex items-center gap-2 mt-0.5">
            <ScoreButton
              label="−"
              variant="minus"
              onClick={() => setHomeScore((s) => Math.max(0, s - 1))}
            />
            <span className="font-display text-3xl text-white min-w-[1.5ch] text-center">
              {homeScore}
            </span>
            <ScoreButton
              label="+"
              variant="plus"
              onClick={() => setHomeScore((s) => Math.min(20, s + 1))}
            />
          </div>
        </div>

        <span className="text-white/20 font-display text-xl pb-3">×</span>

        <div className="flex-1 flex flex-col items-center gap-1.5">
          <span className="text-2xl">{awayFlag}</span>
          <span className="text-[10px] text-white/50 text-center leading-tight">{awayTeam}</span>
          <div className="flex items-center gap-2 mt-0.5">
            <ScoreButton
              label="−"
              variant="minus"
              onClick={() => setAwayScore((s) => Math.max(0, s - 1))}
            />
            <span className="font-display text-3xl text-white min-w-[1.5ch] text-center">
              {awayScore}
            </span>
            <ScoreButton
              label="+"
              variant="plus"
              onClick={() => setAwayScore((s) => Math.min(20, s + 1))}
            />
          </div>
        </div>
      </div>

      {/* Artilheiro — cards clicáveis */}
      {scorerOptions.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">
              Artilheiro
            </p>
            <span className="text-[10px] bg-amarelo-400/10 border border-amarelo-400/25 text-amarelo-400/70 px-1.5 py-0.5 rounded-full">
              +2 pts
            </span>
          </div>

          <div
            className={`grid gap-2 ${scorerOptions.length === 2 ? 'grid-cols-3' : 'grid-cols-2'}`}
          >
            {scorerOptions.map((player) => {
              const isSelected = topScorer === player.name
              const surname = player.name.split(' ').pop()?.toUpperCase() ?? player.name
              return (
                <motion.button
                  key={player.name}
                  type="button"
                  onClick={() => selectScorer(player.name)}
                  whileTap={{ scale: 0.93 }}
                  className={`relative rounded-xl border p-2.5 text-center transition-all duration-150 overflow-hidden ${
                    isSelected
                      ? 'border-verde-500/50 bg-verde-500/12'
                      : 'border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5'
                  }`}
                >
                  {isSelected && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(ellipse at 50% 0%, rgba(0,156,59,0.35) 0%, transparent 65%)',
                      }}
                    />
                  )}
                  <div className="relative flex flex-col items-center gap-0.5">
                    <span className="text-xl leading-none">{player.flag}</span>
                    <p className="text-[11px] font-bold text-white mt-1 leading-none">{surname}</p>
                    <p className="text-[9px] text-white/35 mt-0.5">{player.position}</p>
                  </div>
                  {isSelected && (
                    <div
                      className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-verde-500"
                      style={{ boxShadow: '0 0 4px rgba(0,156,59,0.9)' }}
                    />
                  )}
                </motion.button>
              )
            })}

            {/* Pular */}
            <motion.button
              type="button"
              onClick={skipScorer}
              whileTap={{ scale: 0.93 }}
              className={`rounded-xl border p-2.5 text-center transition-all duration-150 ${
                hasMadeScorerChoice && !topScorer
                  ? 'border-white/20 bg-white/8'
                  : 'border-white/5 bg-transparent hover:border-white/10 hover:bg-white/3'
              }`}
            >
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-xl text-white/15 leading-none">—</span>
                <p className="text-[11px] font-medium text-white/35 mt-1 leading-none">Pular</p>
                <p className="text-[9px] text-white/20 mt-0.5">sem bônus</p>
              </div>
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {topScorer && (
              <motion.div
                key="scorer-hint"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <p className="text-[11px] text-verde-400/70 pt-0.5">
                  ⚽ {topScorer} marcará o primeiro gol
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="h-9 rounded-full bg-verde-500 hover:bg-verde-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
      >
        {loading
          ? 'Salvando...'
          : saved
            ? '✓ Salvo!'
            : existingPrediction
              ? 'Atualizar palpite'
              : 'Confirmar palpite'}
      </button>
    </form>
  )
}
