'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

import type { AwardCategory, Phase } from '@prisma/client'

import { TEAM_COLORS } from '@/lib/team-data'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Candidate {
  name: string
  team: string
  flag: string
  position: string
}

interface UserPrediction {
  phase: Phase
  category: AwardCategory
  playerName: string
  team: string
}

interface ResolvedAward {
  phase: Phase
  category: AwardCategory
  playerName: string
  team: string
  stat: string | null
}

interface AwardPredictionFormProps {
  phase: Phase
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<AwardCategory, string> = {
  TOP_SCORER: '⚽ Melhor Atacante',
  BEST_GOALKEEPER: '🧤 Melhor Goleiro',
  BEST_DEFENSE: '🛡️ Melhor Defesa',
  BEST_PLAYER: '⭐ Melhor Jogador',
}

const CATEGORY_ORDER: AwardCategory[] = [
  'TOP_SCORER',
  'BEST_PLAYER',
  'BEST_GOALKEEPER',
  'BEST_DEFENSE',
]

const POSITION_PT: Record<string, string> = { ATK: 'ATA', MID: 'MEI', GK: 'GOL', DEF: 'DEF' }

// ─── PlayerPhotoCard (same visual as prediction-form.tsx) ─────────────────────

function PlayerPhotoCard({
  candidate,
  isSelected,
  onClick,
}: {
  candidate: Candidate
  isSelected: boolean
  onClick: () => void
}) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const color = TEAM_COLORS[candidate.team] ?? '#1a1a2e'
  const surname = candidate.name.split(' ').pop()?.toUpperCase() ?? candidate.name.toUpperCase()
  const positionPt = POSITION_PT[candidate.position] ?? candidate.position

  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/players/photo?name=${encodeURIComponent(candidate.name)}`, {
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((d: { photoUrl: string | null }) => setPhotoUrl(d.photoUrl))
      .catch((err) => {
        if (err instanceof Error && err.name !== 'AbortError') console.error(err)
      })
    return () => controller.abort()
  }, [candidate.name])

  const initials = candidate.name
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
      {isSelected && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(0,156,59,0.30) 0%, transparent 70%)',
          }}
        />
      )}
      <div
        className="flex items-center justify-center gap-1 py-1 px-1 shrink-0"
        style={{ backgroundColor: color }}
      >
        <span className="text-sm leading-none">{candidate.flag}</span>
        <span className="text-white/90 font-bold tracking-widest" style={{ fontSize: '6px' }}>
          {candidate.team.toUpperCase().slice(0, 3)}
        </span>
      </div>
      <div
        className="relative overflow-hidden w-full"
        style={{
          height: '80px',
          background: `linear-gradient(180deg, ${color}55 0%, ${color}18 50%, #001a0a 100%)`,
        }}
      >
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={candidate.name}
            fill
            className="object-cover object-top"
            unoptimized
          />
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
      <div
        className="px-1.5 py-1.5 flex-1 flex flex-col justify-center"
        style={{ background: `linear-gradient(135deg, ${color}15 0%, #030f04 100%)` }}
      >
        <p className="text-white font-bold truncate leading-none text-[10px]">{surname}</p>
        <p className="text-white/40 leading-none mt-0.5 text-[8px]">{positionPt}</p>
      </div>
      {isSelected && (
        <div
          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-verde-500 z-20"
          style={{ boxShadow: '0 0 4px rgba(0,156,59,0.9)' }}
        />
      )}
    </motion.button>
  )
}

// ─── CategoryCard ─────────────────────────────────────────────────────────────

function CategoryCard({
  phase,
  category,
  prediction,
  resolved,
  onSaved,
}: {
  phase: Phase
  category: AwardCategory
  prediction: UserPrediction | undefined
  resolved: ResolvedAward | undefined
  onSaved: (pred: UserPrediction) => void
}) {
  const [open, setOpen] = useState(false)
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loadingCandidates, setLoadingCandidates] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const loadCandidates = useCallback(() => {
    if (candidates.length > 0) {
      setOpen(true)
      return
    }
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    setLoadingCandidates(true)
    fetch(`/api/award-candidates?category=${category}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((d: { candidates: Candidate[] }) => {
        setCandidates(d.candidates)
        setOpen(true)
      })
      .catch((err) => {
        if (err instanceof Error && err.name !== 'AbortError') setError('Erro ao carregar candidatos')
      })
      .finally(() => setLoadingCandidates(false))
  }, [category, candidates.length])

  useEffect(() => () => abortRef.current?.abort(), [])

  async function selectCandidate(candidate: Candidate) {
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/award-predictions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phase,
          category,
          playerName: candidate.name,
          team: candidate.team,
        }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error((d as { error?: string }).error ?? 'Erro ao salvar')
      }
      onSaved({ phase, category, playerName: candidate.name, team: candidate.team })
      setOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setSaving(false)
    }
  }

  const isCorrect =
    resolved && prediction ? prediction.playerName === resolved.playerName : undefined

  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-white/60 uppercase tracking-widest">
          {CATEGORY_LABELS[category]}
        </span>
        {resolved && (
          <span className="text-[10px] bg-amarelo-400/10 border border-amarelo-400/25 text-amarelo-400/70 px-1.5 py-0.5 rounded-full">
            Encerrado
          </span>
        )}
        {!resolved && prediction && (
          <span className="text-[10px] text-white/30">+5 pts se acertar</span>
        )}
      </div>

      {/* Resolved result */}
      {resolved && (
        <div className="flex items-center gap-3 bg-white/4 rounded-xl p-3">
          <span className="text-lg">{resolved.playerName === prediction?.playerName ? '✅' : resolved && prediction ? '❌' : '🏅'}</span>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-bold truncate">{resolved.playerName}</p>
            <p className="text-white/40 text-[10px]">{resolved.team} · {resolved.stat}</p>
          </div>
          {isCorrect === true && (
            <span className="text-verde-400 font-bold text-xs shrink-0">+5 pts</span>
          )}
        </div>
      )}

      {/* User's pick (unresolved phase) */}
      {!resolved && prediction && (
        <div className="flex items-center gap-3 bg-verde-500/5 border border-verde-500/20 rounded-xl p-3">
          <span className="text-base">✅</span>
          <div className="flex-1 min-w-0">
            <p className="text-verde-400 text-sm font-semibold truncate">{prediction.playerName}</p>
            <p className="text-white/30 text-[10px]">{prediction.team}</p>
          </div>
          <button
            type="button"
            onClick={loadCandidates}
            className="text-[10px] text-white/30 hover:text-white/60 transition-colors shrink-0"
          >
            Alterar
          </button>
        </div>
      )}

      {/* CTA — no prediction yet and phase not resolved */}
      {!resolved && !prediction && (
        <button
          type="button"
          onClick={loadCandidates}
          disabled={loadingCandidates}
          className="h-9 rounded-full border border-white/10 bg-white/4 hover:bg-white/8 hover:border-white/20 text-white/60 hover:text-white text-xs font-medium transition-all disabled:opacity-40"
        >
          {loadingCandidates ? 'Carregando...' : 'Fazer previsão'}
        </button>
      )}

      {error && <p className="text-red-400 text-[11px]">{error}</p>}

      {/* Candidate picker */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="picker"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2 border-t border-white/8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
                  Selecione
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-white/20 hover:text-white/50 text-[10px] transition-colors"
                >
                  Fechar
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-72 overflow-y-auto pr-1">
                {candidates.map((c) => (
                  <PlayerPhotoCard
                    key={`${c.team}-${c.name}`}
                    candidate={c}
                    isSelected={prediction?.playerName === c.name}
                    onClick={() => { if (!saving) void selectCandidate(c) }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AwardPredictionForm({ phase }: AwardPredictionFormProps) {
  const [predictions, setPredictions] = useState<UserPrediction[]>([])
  const [resolved, setResolved] = useState<ResolvedAward[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/award-predictions', { signal: controller.signal })
      .then((r) => r.json())
      .then((d: { predictions: UserPrediction[]; resolved: ResolvedAward[] }) => {
        setPredictions(d.predictions)
        setResolved(d.resolved)
      })
      .catch((err) => {
        if (err instanceof Error && err.name !== 'AbortError') console.error(err)
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  function handleSaved(pred: UserPrediction) {
    setPredictions((prev) => {
      const idx = prev.findIndex(
        (p) => p.phase === pred.phase && p.category === pred.category,
      )
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = pred
        return next
      }
      return [...prev, pred]
    })
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORY_ORDER.map((c) => (
          <div key={c} className="h-32 rounded-2xl bg-white/3 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {CATEGORY_ORDER.map((category) => (
        <CategoryCard
          key={category}
          phase={phase}
          category={category}
          prediction={predictions.find((p) => p.phase === phase && p.category === category)}
          resolved={resolved.find((r) => r.phase === phase && r.category === category)}
          onSaved={handleSaved}
        />
      ))}
    </div>
  )
}
