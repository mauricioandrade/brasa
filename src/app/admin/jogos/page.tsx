import Link from 'next/link'

import { db } from '@/lib/db'

export default async function AdminJogosPage() {
  const matches = await db.match.findMany({
    orderBy: { scheduledAt: 'asc' },
    include: { _count: { select: { predictions: true } } },
  })

  const byGroup = matches.reduce(
    (acc, m) => {
      const key = m.group ?? m.phase
      if (!acc[key]) acc[key] = []
      acc[key].push(m)
      return acc
    },
    {} as Record<string, typeof matches>,
  )

  return (
    <main className="min-h-screen bg-brasa-bg px-4 py-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-4xl text-white">Admin — Jogos</h1>
        <span className="text-white/40 text-sm">{matches.length} jogos</span>
      </div>

      {Object.entries(byGroup)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([group, games]) => (
          <section key={group} className="mb-8">
            <h2 className="font-display text-xl text-amarelo-400 mb-3">
              {group.length === 1 ? `Grupo ${group}` : group.replace(/_/g, ' ')}
            </h2>
            <div className="flex flex-col gap-2">
              {games.map((match) => (
                <div
                  key={match.id}
                  className="bg-brasa-surface rounded-xl p-4 border border-white/5 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold">
                      {match.homeFlag} {match.homeTeam} × {match.awayTeam} {match.awayFlag}
                    </p>
                    <p className="text-white/40 text-xs mt-0.5">
                      {new Date(match.scheduledAt).toLocaleString('pt-BR', {
                        timeZone: 'America/Sao_Paulo',
                      })}
                      {' · '}
                      {match._count.predictions} palpites
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {match.homeScore !== null && (
                      <span className="font-display text-xl text-amarelo-400">
                        {match.homeScore} × {match.awayScore}
                      </span>
                    )}
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        match.status === 'LIVE'
                          ? 'bg-red-500/20 text-red-400'
                          : match.status === 'FINISHED'
                            ? 'bg-white/5 text-white/40'
                            : 'bg-verde-500/10 text-verde-500'
                      }`}
                    >
                      {match.status}
                    </span>
                    <Link
                      href={`/admin/resultados?matchId=${match.id}`}
                      className="text-xs text-amarelo-400 hover:text-amarelo-300 font-semibold transition-colors"
                    >
                      Editar →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
    </main>
  )
}
