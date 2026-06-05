export interface RankMedalProps {
  variant: 'trophy' | 'gold' | 'silver' | 'bronze'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SIZE_MAP = {
  sm: 28,
  md: 44,
  lg: 72,
} as const

function GoldMedal({ px }: { px: number }) {
  return (
    <svg
      width={px}
      height={Math.round(px * 1.22)}
      viewBox="0 0 100 122"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ribbonGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <radialGradient id="outerGold" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#FFF2A0" />
          <stop offset="55%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </radialGradient>
        <radialGradient id="innerGold" cx="42%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FFFBE0" />
          <stop offset="50%" stopColor="#FFE84D" />
          <stop offset="100%" stopColor="#CC9900" />
        </radialGradient>
        <linearGradient id="textGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7A5200" />
          <stop offset="100%" stopColor="#3D2800" />
        </linearGradient>
      </defs>
      {/* Ribbon */}
      <rect x="40" y="0" width="20" height="20" rx="5" fill="url(#ribbonGold)" />
      {/* Outer circle */}
      <circle cx="50" cy="72" r="46" fill="url(#outerGold)" />
      {/* Inner circle */}
      <circle cx="50" cy="72" r="37" fill="url(#innerGold)" />
      {/* Number */}
      <text
        x="50"
        y="90"
        textAnchor="middle"
        fill="url(#textGold)"
        fontSize="46"
        fontWeight="900"
        fontFamily="Georgia, serif"
      >
        1
      </text>
      {/* Highlight */}
      <ellipse
        cx="33"
        cy="53"
        rx="11"
        ry="6"
        fill="white"
        opacity="0.38"
        transform="rotate(-30 33 53)"
      />
    </svg>
  )
}

function SilverMedal({ px }: { px: number }) {
  return (
    <svg
      width={px}
      height={Math.round(px * 1.22)}
      viewBox="0 0 100 122"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ribbonSilver" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8E8E8" />
          <stop offset="100%" stopColor="#909090" />
        </linearGradient>
        <radialGradient id="outerSilver" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#D0D0D0" />
          <stop offset="100%" stopColor="#808080" />
        </radialGradient>
        <radialGradient id="innerSilver" cx="42%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#E0E0E0" />
          <stop offset="100%" stopColor="#A0A0A0" />
        </radialGradient>
        <linearGradient id="textSilver" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#404040" />
          <stop offset="100%" stopColor="#202020" />
        </linearGradient>
      </defs>
      <rect x="40" y="0" width="20" height="20" rx="5" fill="url(#ribbonSilver)" />
      <circle cx="50" cy="72" r="46" fill="url(#outerSilver)" />
      <circle cx="50" cy="72" r="37" fill="url(#innerSilver)" />
      <text
        x="50"
        y="90"
        textAnchor="middle"
        fill="url(#textSilver)"
        fontSize="46"
        fontWeight="900"
        fontFamily="Georgia, serif"
      >
        2
      </text>
      <ellipse
        cx="33"
        cy="53"
        rx="11"
        ry="6"
        fill="white"
        opacity="0.45"
        transform="rotate(-30 33 53)"
      />
    </svg>
  )
}

function BronzeMedal({ px }: { px: number }) {
  return (
    <svg
      width={px}
      height={Math.round(px * 1.22)}
      viewBox="0 0 100 122"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ribbonBronze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CD7F32" />
          <stop offset="100%" stopColor="#8B4513" />
        </linearGradient>
        <radialGradient id="outerBronze" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#F4A460" />
          <stop offset="55%" stopColor="#CD7F32" />
          <stop offset="100%" stopColor="#8B4513" />
        </radialGradient>
        <radialGradient id="innerBronze" cx="42%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FCDAAC" />
          <stop offset="50%" stopColor="#D4914A" />
          <stop offset="100%" stopColor="#A0521A" />
        </radialGradient>
        <linearGradient id="textBronze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A2000" />
          <stop offset="100%" stopColor="#2A1000" />
        </linearGradient>
      </defs>
      <rect x="40" y="0" width="20" height="20" rx="5" fill="url(#ribbonBronze)" />
      <circle cx="50" cy="72" r="46" fill="url(#outerBronze)" />
      <circle cx="50" cy="72" r="37" fill="url(#innerBronze)" />
      <text
        x="50"
        y="90"
        textAnchor="middle"
        fill="url(#textBronze)"
        fontSize="46"
        fontWeight="900"
        fontFamily="Georgia, serif"
      >
        3
      </text>
      <ellipse
        cx="33"
        cy="53"
        rx="11"
        ry="6"
        fill="white"
        opacity="0.32"
        transform="rotate(-30 33 53)"
      />
    </svg>
  )
}

function TrophyIcon({ px }: { px: number }) {
  return (
    <svg
      width={px}
      height={Math.round(px * 1.2)}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="trophyBody" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FFF5B0" />
          <stop offset="40%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#9A6A00" />
        </linearGradient>
        <linearGradient id="trophyBase" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#8A5C00" />
        </linearGradient>
        <radialGradient id="trophyStar" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFBE0" />
          <stop offset="100%" stopColor="#FFCC00" />
        </radialGradient>
        <linearGradient id="trophyArm" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8860B" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>

      {/* Left arm */}
      <path
        d="M30 18 Q10 18 10 38 Q10 54 26 54"
        stroke="url(#trophyArm)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right arm */}
      <path
        d="M70 18 Q90 18 90 38 Q90 54 74 54"
        stroke="url(#trophyArm)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Cup body */}
      <path
        d="M28 8 L72 8 Q78 8 78 14 L74 62 Q72 72 62 76 L50 80 L38 76 Q28 72 26 62 L22 14 Q22 8 28 8 Z"
        fill="url(#trophyBody)"
      />

      {/* Cup highlight */}
      <ellipse cx="40" cy="22" rx="7" ry="4" fill="white" opacity="0.4" transform="rotate(-20 40 22)" />

      {/* Stem */}
      <rect x="44" y="80" width="12" height="14" rx="2" fill="url(#trophyBody)" />

      {/* Base */}
      <rect x="30" y="94" width="40" height="10" rx="4" fill="url(#trophyBase)" />
      <rect x="26" y="104" width="48" height="8" rx="4" fill="url(#trophyBase)" />

      {/* Star */}
      <text
        x="50"
        y="52"
        textAnchor="middle"
        fontSize="22"
        fill="url(#trophyStar)"
        fontWeight="bold"
      >
        ★
      </text>
    </svg>
  )
}

export function RankMedal({ variant, size = 'md', className }: RankMedalProps) {
  const px = SIZE_MAP[size]

  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center' }}>
      {variant === 'trophy' && <TrophyIcon px={px} />}
      {variant === 'gold' && <GoldMedal px={px} />}
      {variant === 'silver' && <SilverMedal px={px} />}
      {variant === 'bronze' && <BronzeMedal px={px} />}
    </span>
  )
}
