'use client'

import { useState } from 'react'

import { usePredictions } from '@/hooks/use-predictions'

interface PredictionFormProps {
  matchId: string
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
  existingPrediction?: { homeScore: number; awayScore: number; topScorerName: string | null }
  onSuccess?: () => void
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
  const [homeScore, setHomeScore] = useState<number | ''>(existingPrediction?.homeScore ?? '')
  const [awayScore, setAwayScore] = useState<number | ''>(existingPrediction?.awayScore ?? '')
  const [topScorer, setTopScorer] = useState(existingPrediction?.topScorerName ?? '')
  const [saved, setSaved] = useState(false)
  const { savePrediction, loading, error } = usePredictions()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (homeScore === '' || awayScore === '') return
    await savePrediction(matchId, Number(homeScore), Number(awayScore), topScorer || undefined)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-3 border-t border-white/10">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1 justify-end">
          <span className="text-sm text-white/70">
            {homeFlag} {homeTeam}
          </span>
          <input
            type="number"
            min={0}
            max={20}
            value={homeScore}
            onChange={(e) => {
              setHomeScore(e.target.value === '' ? '' : Number(e.target.value))
              setSaved(false)
            }}
            className="w-12 h-10 text-center bg-white/10 border border-white/20 rounded-lg text-white font-display text-xl focus:outline-none focus:border-verde-500"
            placeholder="0"
          />
        </div>
        <span className="text-white/30 font-display text-xl">×</span>
        <div className="flex items-center gap-2 flex-1">
          <input
            type="number"
            min={0}
            max={20}
            value={awayScore}
            onChange={(e) => {
              setAwayScore(e.target.value === '' ? '' : Number(e.target.value))
              setSaved(false)
            }}
            className="w-12 h-10 text-center bg-white/10 border border-white/20 rounded-lg text-white font-display text-xl focus:outline-none focus:border-verde-500"
            placeholder="0"
          />
          <span className="text-sm text-white/70">
            {awayTeam} {awayFlag}
          </span>
        </div>
      </div>

      <input
        type="text"
        value={topScorer}
        onChange={(e) => setTopScorer(e.target.value)}
        placeholder="Artilheiro do jogo (opcional, +2pts)"
        className="w-full h-9 px-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-verde-500"
      />

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <button
        type="submit"
        disabled={loading || homeScore === '' || awayScore === ''}
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
