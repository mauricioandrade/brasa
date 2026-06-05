'use client'

import { useState } from 'react'

export function usePredictions() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function savePrediction(
    matchId: string,
    homeScore: number,
    awayScore: number,
    topScorerName?: string,
  ) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/palpites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId, homeScore, awayScore, topScorerName }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error ?? 'Erro ao salvar palpite')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  return { savePrediction, loading, error }
}
