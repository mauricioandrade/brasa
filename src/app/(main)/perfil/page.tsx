import Image from 'next/image'
import { redirect } from 'next/navigation'

import { Lock } from 'lucide-react'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { computeStreak, getNextRank, getProgress, getRank } from '@/lib/gamification'

import { RankMedal } from '@/components/brasa/rank-medal'
import { DeleteAccountButton } from '@/components/perfil/delete-account-button'

import { deleteAccount } from './actions'
import { ProgressBar } from './progress-bar'

export default async function PerfilPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const [predictions, totalMatches] = await Promise.all([
    db.prediction.findMany({
      where: { userId: session.user.id },
      include: { match: true },
      orderBy: { createdAt: 'desc' },
    }),
    db.match.count(),
  ])

  const rankingEntries = await db.prediction.groupBy({
    by: ['userId'],
    _sum: { pointsEarned: true },
    having: { pointsEarned: { _sum: { gt: 0 } } },
    orderBy: { _sum: { pointsEarned: 'desc' } },
  })
  const userRankPosition =
    rankingEntries.findIndex((e) => e.userId === session.user.id) + 1

  const finished = predictions.filter((p) => p.calculated)
  const totalPoints = finished.reduce((sum, p) => sum + p.pointsEarned, 0)
  const exactScores = finished.filter((p) => {
    return p.homeScore === p.match.homeScore && p.awayScore === p.match.awayScore
  }).length
  const correctWinners = finished.filter((p) => p.pointsEarned > 0).length
  const scorerHits = finished.filter((p) => {
    return (
      p.topScorerName &&
      p.match.topScorerName &&
      p.topScorerName.toLowerCase() === p.match.topScorerName.toLowerCase()
    )
  }).length
  const accuracy = finished.length > 0 ? Math.round((correctWinners / finished.length) * 100) : 0
  const participation = totalMatches > 0 ? Math.round((predictions.length / totalMatches) * 100) : 0

  const { current: streakCurrent, best: streakBest } = computeStreak(predictions)

  const rank = getRank(totalPoints)
  const nextRank = getNextRank(totalPoints)
  const progress = getProgress(totalPoints)

  const last5 = predictions.slice(0, 5)

  const achievements = [
    {
      id: 'first-prediction',
      emoji: '🎯',
      title: 'Primeiro palpite',
      description: 'Fez o primeiro palpite',
      unlocked: predictions.length > 0,
    },
    {
      id: 'exact-score',
      emoji: '🎯',
      title: 'Placar exato',
      description: 'Acertou o placar exato de um jogo',
      unlocked: exactScores > 0,
    },
    {
      id: 'scorer',
      emoji: '⚽',
      title: 'Artilheiro',
      description: 'Acertou o artilheiro de um jogo',
      unlocked: scorerHits > 0,
    },
    {
      id: 'faithful',
      emoji: '🏆',
      title: 'Fiel',
      description: 'Palpitou em 50% ou mais dos jogos',
      unlocked: participation >= 50,
    },
    {
      id: 'streak-3',
      emoji: '🔥',
      title: 'Em chamas',
      description: '3 acertos consecutivos',
      unlocked: streakBest >= 3,
    },
    {
      id: 'streak-5',
      emoji: '⚡',
      title: 'Invencível',
      description: '5 acertos consecutivos',
      unlocked: streakBest >= 5,
    },
    {
      id: 'prophete',
      emoji: '🔮',
      title: 'Profeta',
      description: '10 palpites certos no total',
      unlocked: correctWinners >= 10,
    },
    {
      id: 'sharpshooter',
      emoji: '🏅',
      title: 'Sniper',
      description: '3 placares exatos',
      unlocked: exactScores >= 3,
    },
  ]

  function getRankMedalVariant(pos: number): { variant: 'trophy' | 'silver' | 'bronze'; label: string } | null {
    if (pos === 1) return { variant: 'trophy', label: 'Líder do bolão' }
    if (pos === 2) return { variant: 'silver', label: '2º lugar' }
    if (pos === 3) return { variant: 'bronze', label: '3º lugar' }
    return null
  }

  const medalInfo = userRankPosition > 0 ? getRankMedalVariant(userRankPosition) : null

  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 max-w-2xl mx-auto relative">
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(0,156,59,0.25) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      {/* Section 1 — Identity */}
      <div className="bg-brasa-surface rounded-xl border border-white/5 p-6 mb-4">
        <div className="flex items-center gap-3">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name ?? 'Avatar'}
              width={64}
              height={64}
              className="rounded-full shrink-0 ring-2 ring-verde-500/20"
            />
          ) : (
            <div
              className="w-16 h-16 rounded-full shrink-0 flex items-center justify-center ring-2 ring-verde-500/25"
              style={{ background: 'linear-gradient(135deg, #003d18 0%, #001a0a 100%)' }}
            >
              <span className="font-display text-xl text-verde-500 leading-none select-none">
                {(session.user.name ?? session.user.email ?? 'US')
                  .split(' ')
                  .map((w: string) => w[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase()}
              </span>
            </div>
          )}
          {/* Rank medal (top 3 only) */}
          {medalInfo && (
            <div className="flex flex-col items-center gap-1 shrink-0">
              <RankMedal variant={medalInfo.variant} size="lg" />
              <span className="text-[10px] font-bold tracking-wider text-amarelo-400 uppercase">
                {medalInfo.label}
              </span>
            </div>
          )}
          <div className="min-w-0">
            <p className="font-semibold text-white text-lg truncate">
              {session.user.name ?? 'Usuário'}
            </p>
            <p className="text-sm text-white/50 truncate">{session.user.email}</p>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-white/5">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="font-display text-4xl sm:text-5xl leading-none">{rank.emoji}</span>
            <span className="font-display text-3xl sm:text-4xl text-amarelo-400 leading-none">
              {rank.name}
            </span>
            <span className="text-white/40 text-sm">{totalPoints} pts</span>
          </div>

          {nextRank ? (
            <div className="flex flex-col gap-1.5 mt-3">
              <ProgressBar progress={progress} />
              <span className="text-white/30 text-xs">
                {nextRank.minPoints - totalPoints} pts para {nextRank.emoji} {nextRank.name}
              </span>
            </div>
          ) : (
            <p className="text-white/30 text-xs mt-1">Rank máximo atingido</p>
          )}
        </div>
      </div>

      {/* Section 2 — Stats */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
        {/* Pontos — destacado com fundo amarelo sutil */}
        <div
          className="rounded-xl border border-amarelo-400/20 p-3 sm:p-4"
          style={{ background: 'linear-gradient(135deg, #0d1f0f 0%, #141400 100%)' }}
        >
          <p className="font-display text-3xl sm:text-4xl text-amarelo-400">{totalPoints}</p>
          <p className="text-xs sm:text-sm text-white/50 mt-1">pontos total</p>
        </div>
        {/* Acertos — verde accent */}
        <div
          className="rounded-xl border border-verde-500/20 p-3 sm:p-4"
          style={{ background: 'linear-gradient(135deg, #0d1f0f 0%, #001a08 100%)' }}
        >
          <p className="font-display text-3xl sm:text-4xl text-verde-500">{accuracy}%</p>
          <p className="text-xs sm:text-sm text-white/50 mt-1">acertos</p>
        </div>
        {/* Placares exatos — neutro */}
        <div className="bg-brasa-surface rounded-xl border border-white/5 p-3 sm:p-4">
          <p className="font-display text-3xl sm:text-4xl text-white/80">{exactScores}</p>
          <p className="text-xs sm:text-sm text-white/50 mt-1">placares exatos</p>
        </div>
        {/* Palpites — neutro */}
        <div className="bg-brasa-surface rounded-xl border border-white/5 p-3 sm:p-4">
          <p className="font-display text-3xl sm:text-4xl text-white/80">{predictions.length}</p>
          <p className="text-xs sm:text-sm text-white/50 mt-1">palpites feitos</p>
        </div>
      </div>

      {/* Section 2b — Streak */}
      {streakBest > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
          <div
            className={`rounded-xl border p-3 sm:p-4 ${
              streakCurrent >= 3
                ? 'border-orange-500/30 bg-orange-500/8'
                : 'border-white/5 bg-brasa-surface'
            }`}
          >
            <div className="flex items-baseline gap-1.5">
              <p
                className={`font-display text-3xl sm:text-4xl ${streakCurrent >= 3 ? 'text-orange-400' : 'text-white/80'}`}
              >
                {streakCurrent}
              </p>
              {streakCurrent >= 3 && <span className="text-xl">🔥</span>}
            </div>
            <p className="text-xs sm:text-sm text-white/50 mt-1">sequência atual</p>
          </div>
          <div className="bg-brasa-surface rounded-xl border border-white/5 p-3 sm:p-4">
            <p className="font-display text-3xl sm:text-4xl text-white/80">{streakBest}</p>
            <p className="text-xs sm:text-sm text-white/50 mt-1">melhor sequência</p>
          </div>
        </div>
      )}

      {/* Section 3 — Last 5 predictions */}
      {last5.length > 0 && (
        <div className="bg-brasa-surface rounded-xl border border-white/5 p-4 mb-4">
          <h2 className="font-display text-xl sm:text-2xl text-white mb-3">Últimos palpites</h2>
          <div className="flex flex-col gap-2">
            {last5.map((p) => {
              const hasResult = p.match.homeScore !== null && p.match.awayScore !== null
              return (
                <div
                  key={p.id}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm">{p.match.homeFlag}</span>
                    <span className="text-white/70 text-sm truncate">{p.match.homeTeam}</span>
                    <span className="text-white/30 text-xs font-mono">
                      {p.homeScore}–{p.awayScore}
                    </span>
                    <span className="text-white/70 text-sm truncate">{p.match.awayTeam}</span>
                    <span className="text-sm">{p.match.awayFlag}</span>
                  </div>
                  <div className="shrink-0 ml-3 text-right">
                    {p.calculated ? (
                      <>
                        {hasResult && (
                          <span className="text-white/30 text-xs font-mono block">
                            {p.match.homeScore}–{p.match.awayScore}
                          </span>
                        )}
                        <span
                          className={`text-sm font-semibold ${
                            p.pointsEarned > 0 ? 'text-verde-500' : 'text-white/30'
                          }`}
                        >
                          {p.pointsEarned > 0 ? `+${p.pointsEarned} pts` : '0 pts'}
                        </span>
                      </>
                    ) : (
                      <span className="text-white/30 text-xs">pendente</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Section 4 — Achievements */}
      <div className="bg-brasa-surface rounded-xl border border-white/5 p-4">
        <h2 className="font-display text-xl sm:text-2xl text-white mb-3">Conquistas</h2>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {achievements.map((a) => (
            <div
              key={a.id}
              className={`rounded-lg border p-3 flex items-start gap-3 ${
                a.unlocked ? 'border-verde-500/30 bg-verde-500/5' : 'border-white/5 opacity-50'
              }`}
            >
              <span className={`text-2xl ${a.unlocked ? '' : 'grayscale'}`}>
                {a.unlocked ? a.emoji : <Lock size={24} className="text-white/30" />}
              </span>
              <div>
                <p
                  className={`text-sm font-semibold ${a.unlocked ? 'text-white' : 'text-white/40'}`}
                >
                  {a.title}
                </p>
                <p className="text-xs text-white/30 mt-0.5">{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="mt-8 flex justify-center">
        <DeleteAccountButton deleteAccount={deleteAccount} />
      </div>
    </main>
  )
}
