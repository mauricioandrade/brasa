import type { AwardCategory, Phase } from '@prisma/client'

import { db } from './db'
import { TEAM_FLAGS, TEAM_GOALKEEPERS, TEAM_STARS } from './team-data'

/** Reverse map: player name → team name, built from TEAM_STARS */
function buildPlayerTeamMap(): Map<string, string> {
  const map = new Map<string, string>()
  for (const [team, star] of Object.entries(TEAM_STARS)) {
    map.set(star.name, team)
  }
  return map
}

/** Find which team a scorer belongs to by matching against TEAM_STARS */
function findScorerTeam(scorerName: string, fallbackTeam: string): string {
  const playerTeamMap = buildPlayerTeamMap()
  return playerTeamMap.get(scorerName) ?? fallbackTeam
}

interface AwardResult {
  category: AwardCategory
  playerName: string
  team: string
  flag: string
  stat: string
}

/**
 * Computes award winners for a phase from finished match data and upserts them
 * into PhaseAward. Skips if no finished matches exist for the phase.
 */
export async function resolvePhaseAwards(phase: Phase): Promise<void> {
  const matches = await db.match.findMany({
    where: { phase, status: 'FINISHED' },
  })

  if (matches.length === 0) return

  const results: AwardResult[] = []

  // --- TOP_SCORER ---
  const scorerCounts = new Map<string, number>()
  for (const m of matches) {
    if (m.topScorerName) {
      scorerCounts.set(m.topScorerName, (scorerCounts.get(m.topScorerName) ?? 0) + 1)
    }
  }

  if (scorerCounts.size > 0) {
    const topScorer = [...scorerCounts.entries()].sort((a, b) => b[1] - a[1])[0]
    const [scorerName, scorerGoals] = topScorer
    const scorerTeam = findScorerTeam(scorerName, matches[0].homeTeam)
    const scorerFlag = TEAM_FLAGS[scorerTeam] ?? '🏳️'

    results.push({
      category: 'TOP_SCORER',
      playerName: scorerName,
      team: scorerTeam,
      flag: scorerFlag,
      stat: `${scorerGoals} gol${scorerGoals !== 1 ? 's' : ''}`,
    })

    // BEST_PLAYER = same as TOP_SCORER for now
    results.push({
      category: 'BEST_PLAYER',
      playerName: scorerName,
      team: scorerTeam,
      flag: scorerFlag,
      stat: `${scorerGoals} gol${scorerGoals !== 1 ? 's' : ''}`,
    })
  }

  // --- BEST_DEFENSE ---
  const goalsConceded = new Map<string, number>()

  for (const m of matches) {
    if (m.homeScore === null || m.awayScore === null) continue
    // homeTeam concedes awayScore goals
    goalsConceded.set(m.homeTeam, (goalsConceded.get(m.homeTeam) ?? 0) + m.awayScore)
    // awayTeam concedes homeScore goals
    goalsConceded.set(m.awayTeam, (goalsConceded.get(m.awayTeam) ?? 0) + m.homeScore)
  }

  if (goalsConceded.size > 0) {
    const [bestDefenseTeam, conceded] = [...goalsConceded.entries()].sort(
      (a, b) => a[1] - b[1],
    )[0]
    const defenseFlag = TEAM_FLAGS[bestDefenseTeam] ?? '🏳️'

    results.push({
      category: 'BEST_DEFENSE',
      playerName: bestDefenseTeam, // for teams, playerName stores the team name
      team: bestDefenseTeam,
      flag: defenseFlag,
      stat: `${conceded} gol${conceded !== 1 ? 's' : ''} sofrido${conceded !== 1 ? 's' : ''}`,
    })

    // --- BEST_GOALKEEPER (GK from best defense team) ---
    const gk = TEAM_GOALKEEPERS[bestDefenseTeam]
    const gkName = gk?.name ?? `Goleiro - ${bestDefenseTeam}`
    results.push({
      category: 'BEST_GOALKEEPER',
      playerName: gkName,
      team: bestDefenseTeam,
      flag: defenseFlag,
      stat: `${conceded} gol${conceded !== 1 ? 's' : ''} sofrido${conceded !== 1 ? 's' : ''}`,
    })
  }

  // Upsert all computed awards
  await Promise.all(
    results.map((r) =>
      db.phaseAward.upsert({
        where: { phase_category: { phase, category: r.category } },
        create: { phase, ...r },
        update: { playerName: r.playerName, team: r.team, flag: r.flag, stat: r.stat },
      }),
    ),
  )
}
