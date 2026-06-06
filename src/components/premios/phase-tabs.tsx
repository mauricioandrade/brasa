'use client'

import { useState } from 'react'

import type { Phase } from '@prisma/client'

import { AwardPredictionForm } from './award-prediction-form'

const PHASES: { value: Phase; label: string }[] = [
  { value: 'GROUP', label: 'Grupos' },
  { value: 'ROUND_OF_16', label: 'Oitavas' },
  { value: 'QUARTER_FINAL', label: 'Quartas' },
  { value: 'SEMI_FINAL', label: 'Semis' },
  { value: 'FINAL', label: 'Final' },
]

export function PhaseTabs() {
  const [active, setActive] = useState<Phase>('GROUP')

  return (
    <div className="flex flex-col gap-4">
      {/* Tab strip */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {PHASES.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setActive(value)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${
              active === value
                ? 'bg-amarelo-400 text-brasa-bg'
                : 'bg-white/6 text-white/40 hover:bg-white/10 hover:text-white/70'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Active phase predictions */}
      <AwardPredictionForm phase={active} />
    </div>
  )
}
