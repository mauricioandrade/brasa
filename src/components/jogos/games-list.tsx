import type { Match } from '@prisma/client'

import { GameCard } from './game-card'

interface GamesListProps {
  matches: Match[]
}

export function GamesList({ matches }: GamesListProps) {
  return (
    <div className="grid gap-4">
      {matches.map((match) => (
        <GameCard key={match.id} match={match} />
      ))}
    </div>
  )
}
