'use client'

import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

import { usePredictions } from '@/hooks/use-predictions'
import { TEAM_COLORS, TEAM_STARS } from '@/lib/team-data'

interface PredictionFormProps {
  matchId: string
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
  existingPrediction?: { homeScore: number; awayScore: number; topScorerName: string | null }
  onSuccess?: () => void
}

interface ScorerOption {
  name: string
  flag: string
  team: string
  position: string
}

const POSITION_PT: Record<string, string> = { ATK: 'ATA', MID: 'MEI', GK: 'GOL', DEF: 'DEF' }

function PlayerPhotoCard({
  player,
  isSelected,
  onClick,
}: {
  player: ScorerOption
  isSelected: boolean
  onClick: () => void
}) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const color = TEAM_COLORS[player.team] ?? '#1a1a2e'
  const surname = player.name.split(' ').pop()?.toUpperCase() ?? player.name.toUpperCase()
  const positionPt = POSITION_PT[player.position] ?? player.position

  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/players/photo?name=${encodeURIComponent(player.name)}`, {
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((d: { photoUrl: string | null }) => setPhotoUrl(d.photoUrl))
      .catch((err) => {
        if (err instanceof Error && err.name !== 'AbortError') console.error(err)
      })
    return () => controller.abort()
  }, [player.name])

  const initials = player.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.93 }}
      className={`relative rounded-xl border text-center transition-all duration-150 overflow-hidden flex flex-col ${
        isSelected
          ? 'border-verde-500/60 bg-verde-500/10'
          : 'border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5'
      }`}
      style={
        isSelected
          ? { boxShadow: '0 0 12px rgba(0,156,59,0.25), 0 0 0 1px rgba(0,156,59,0.3)' }
          : undefined
      }
    >
      {/* Selected overlay glow */}
      {isSelected && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(0,156,59,0.30) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Header faixa colorida com flag */}
      <div
        className="flex items-center justify-center gap-1 py-1 px-1 shrink-0"
        style={{ backgroundColor: color }}
      >
        <span className="text-sm leading-none">{player.flag}</span>
        <span className="text-white/90 font-bold tracking-widest" style={{ fontSize: '6px' }}>
          {player.team.toUpperCase().slice(0, 3)}
        </span>
      </div>

      {/* Foto area */}
      <div
        className="relative overflow-hidden w-full"
        style={{
          height: '80px',
          background: `linear-gradient(180deg, ${color}55 0%, ${color}18 50%, #001a0a 100%)`,
        }}
      >
        {photoUrl ? (
          <Image src={photoUrl} alt={player.name} fill className="object-cover object-top" unoptimized />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center font-display text-white/80 text-lg font-bold"
            style={{
              background: `radial-gradient(circle at 50% 40%, ${color}80 0%, ${color}30 50%, transparent 75%)`,
            }}
          >
            {initials}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="px-1.5 py-1.5 flex-1 flex flex-col justify-center"
        style={{ background: `linear-gradient(135deg, ${color}15 0%, #030f04 100%)` }}
      >
        <p className="text-white font-bold truncate leading-none text-[10px]">{surname}</p>
        <p className="text-white/40 leading-none mt-0.5 text-[8px]">{positionPt}</p>
      </div>

      {/* Selected dot indicator */}
      {isSelected && (
        <div
          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-verde-500 z-20"
          style={{ boxShadow: '0 0 4px rgba(0,156,59,0.9)' }}
        />
      )}
    </motion.button>
  )
}

function ScoreButton({
  label,
  onClick,
  variant,
  disabled,
}: {
  label: string
  onClick: () => void
  variant: 'minus' | 'plus'
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-8 h-8 rounded-full flex items-center justify-center text-base font-bold transition-colors disabled:opacity-25 disabled:cursor-not-allowed ${
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

  const scorerOptions: ScorerOption[] = [
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
              disabled={homeScore === 0}
              onClick={() => setHomeScore((s) => Math.max(0, s - 1))}
            />
            <span className="font-display text-3xl text-white min-w-[1.5ch] text-center">
              {homeScore}
            </span>
            <ScoreButton
              label="+"
              variant="plus"
              disabled={homeScore === 20}
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
              disabled={awayScore === 0}
              onClick={() => setAwayScore((s) => Math.max(0, s - 1))}
            />
            <span className="font-display text-3xl text-white min-w-[1.5ch] text-center">
              {awayScore}
            </span>
            <ScoreButton
              label="+"
              variant="plus"
              disabled={awayScore === 20}
              onClick={() => setAwayScore((s) => Math.min(20, s + 1))}
            />
          </div>
        </div>
      </div>

      {/* Artilheiro — cards com foto */}
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
            {scorerOptions.map((player) => (
              <PlayerPhotoCard
                key={player.name}
                player={player}
                isSelected={topScorer === player.name}
                onClick={() => selectScorer(player.name)}
              />
            ))}

            {/* Pular */}
            <motion.button
              type="button"
              onClick={skipScorer}
              whileTap={{ scale: 0.93 }}
              className={`rounded-xl border text-center transition-all duration-150 flex flex-col overflow-hidden ${
                hasMadeScorerChoice && !topScorer
                  ? 'border-white/20 bg-white/8'
                  : 'border-white/5 bg-transparent hover:border-white/10 hover:bg-white/3'
              }`}
            >
              {/* Fake header spacer to align heights */}
              <div className="py-1 px-1 shrink-0 bg-white/5" style={{ height: '26px' }} />
              {/* Fake photo area spacer */}
              <div
                className="w-full flex items-center justify-center"
                style={{ height: '80px' }}
              >
                <span className="text-2xl text-white/10 leading-none select-none">—</span>
              </div>
              {/* Footer */}
              <div className="px-1.5 py-1.5 flex-1 flex flex-col justify-center bg-white/3">
                <p className="text-[10px] font-medium text-white/35 leading-none">Pular</p>
                <p className="text-[8px] text-white/20 mt-0.5">sem bônus</p>
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
