import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { AwardCategory, Phase } from '@prisma/client'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

const PHASES: { value: Phase; label: string }[] = [
  { value: 'GROUP', label: 'Fase de Grupos' },
  { value: 'ROUND_OF_16', label: 'Oitavas de Final' },
  { value: 'QUARTER_FINAL', label: 'Quartas de Final' },
  { value: 'SEMI_FINAL', label: 'Semifinais' },
  { value: 'FINAL', label: 'Final' },
]

const CATEGORIES: { value: AwardCategory; label: string }[] = [
  { value: 'TOP_SCORER', label: '⚽ Artilheiro' },
  { value: 'BEST_GOALKEEPER', label: '🧤 Melhor Goleiro' },
  { value: 'BEST_PLAYER', label: '⭐ Melhor Jogador' },
  { value: 'BEST_DEFENSE', label: '🛡️ Melhor Defesa' },
]

const VALID_PHASES = [
  'GROUP',
  'ROUND_OF_16',
  'QUARTER_FINAL',
  'SEMI_FINAL',
  'THIRD_PLACE',
  'FINAL',
] as const

const VALID_CATEGORIES = [
  'TOP_SCORER',
  'BEST_GOALKEEPER',
  'BEST_PLAYER',
  'BEST_DEFENSE',
] as const

async function upsertPhaseAward(formData: FormData) {
  'use server'

  const session = await auth()
  if (session?.user?.role !== 'ADMIN') throw new Error('Unauthorized')

  const phaseRaw = formData.get('phase') as string
  const categoryRaw = formData.get('category') as string

  if (!VALID_PHASES.includes(phaseRaw as (typeof VALID_PHASES)[number])) {
    throw new Error('Fase inválida')
  }
  if (!VALID_CATEGORIES.includes(categoryRaw as (typeof VALID_CATEGORIES)[number])) {
    throw new Error('Categoria inválida')
  }

  const phase = phaseRaw as Phase
  const category = categoryRaw as AwardCategory
  const playerName = (formData.get('playerName') as string).trim()
  const team = (formData.get('team') as string).trim()
  const flag = (formData.get('flag') as string).trim()
  const stat = (formData.get('stat') as string).trim() || null

  await db.phaseAward.upsert({
    where: { phase_category: { phase, category } },
    create: { phase, category, playerName, team, flag, stat },
    update: { playerName, team, flag, stat },
  })

  revalidatePath('/premios')
  redirect('/admin/premios')
}

export default async function AdminPremiosPage() {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') redirect('/')

  const awards = await db.phaseAward.findMany({
    orderBy: [{ phase: 'asc' }, { category: 'asc' }],
  })

  return (
    <main className="min-h-screen bg-brasa-bg px-4 py-8 max-w-2xl mx-auto">
      <Link
        href="/admin"
        className="text-xs text-amarelo-400 hover:text-amarelo-300 font-semibold transition-colors mb-8 inline-block"
      >
        ← Voltar para admin
      </Link>

      <h1 className="font-display text-4xl text-white mb-6">PRÊMIOS POR FASE</h1>

      <div className="bg-brasa-surface rounded-2xl p-6 border border-white/5 mb-8">
        <h2 className="text-white font-semibold mb-4">Cadastrar / Atualizar Prêmio</h2>
        <form action={upsertPhaseAward} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 text-sm">Fase</label>
              <select
                name="phase"
                required
                className="bg-white/5 border border-white/10 rounded-lg px-3 h-10 text-white focus:border-verde-500 focus:outline-none"
              >
                {PHASES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 text-sm">Categoria</label>
              <select
                name="category"
                required
                className="bg-white/5 border border-white/10 rounded-lg px-3 h-10 text-white focus:border-verde-500 focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white/60 text-sm">Nome do Jogador</label>
            <input
              type="text"
              name="playerName"
              required
              placeholder="Ex: Neymar"
              className="bg-white/5 border border-white/10 rounded-lg px-3 h-10 text-white focus:border-verde-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 text-sm">Seleção</label>
              <input
                type="text"
                name="team"
                required
                placeholder="Ex: Brasil"
                className="bg-white/5 border border-white/10 rounded-lg px-3 h-10 text-white focus:border-verde-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 text-sm">Bandeira (emoji)</label>
              <input
                type="text"
                name="flag"
                required
                placeholder="Ex: 🇧🇷"
                className="bg-white/5 border border-white/10 rounded-lg px-3 h-10 text-white focus:border-verde-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white/60 text-sm">Estatística (opcional)</label>
            <input
              type="text"
              name="stat"
              placeholder="Ex: 4 gols · 2 assistências"
              className="bg-white/5 border border-white/10 rounded-lg px-3 h-10 text-white focus:border-verde-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-verde-500 hover:bg-verde-600 text-white font-semibold rounded-full h-10 px-6 transition-colors mt-2 self-start"
          >
            Salvar prêmio
          </button>
        </form>
      </div>

      {awards.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-2">
            Prêmios cadastrados ({awards.length})
          </h2>
          {awards.map((award) => {
            const phaseLabel = PHASES.find((p) => p.value === award.phase)?.label ?? award.phase
            const categoryLabel =
              CATEGORIES.find((c) => c.value === award.category)?.label ?? award.category
            return (
              <div
                key={award.id}
                className="bg-brasa-surface border border-white/5 rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <span className="text-2xl leading-none">{award.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{award.playerName}</p>
                  <p className="text-white/40 text-xs truncate">
                    {award.team} · {phaseLabel} · {categoryLabel}
                  </p>
                  {award.stat && (
                    <p className="text-verde-500 text-xs mt-0.5">{award.stat}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {awards.length === 0 && (
        <p className="text-white/30 text-sm text-center py-8">Nenhum prêmio cadastrado ainda.</p>
      )}
    </main>
  )
}
