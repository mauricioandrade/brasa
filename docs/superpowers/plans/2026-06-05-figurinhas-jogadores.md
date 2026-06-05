# Figurinhas de Jogadores — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar fotos de jogadores estilo Panini no banner de artilheiros e nos game cards da Copa do Mundo 2026.

**Architecture:** Rota `/api/players/photo` busca fotos no TheSportsDB (free tier) com cache ISR de 24h e retorna `{ photoUrl }`. Componente `<PlayerFigurina>` exibe o card e busca a foto via fetch no client. `<PlayersBanner>` exibe um ticker horizontal com os artilheiros. `game-card.tsx` ganha uma seção com 2 mini-figurinhas (estrela de cada seleção) via mapa estático `TEAM_STARS`.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, Framer Motion, TypeScript, TheSportsDB free API (key `3`), `next/image`

---

## Arquivo map

| Ação      | Arquivo                                    |
| --------- | ------------------------------------------ |
| Criar     | `src/lib/team-data.ts`                     |
| Modificar | `next.config.ts`                           |
| Criar     | `src/app/api/players/top/route.ts`         |
| Criar     | `src/app/api/players/photo/route.ts`       |
| Modificar | `src/app/globals.css`                      |
| Criar     | `src/components/brasa/player-figurina.tsx` |
| Criar     | `src/components/layout/players-banner.tsx` |
| Modificar | `src/components/jogos/game-card.tsx`       |
| Modificar | `src/app/(main)/jogos/page.tsx`            |

---

## Task 1: Constantes de times — `src/lib/team-data.ts`

**Files:**

- Create: `src/lib/team-data.ts`

- [ ] **Step 1: Criar arquivo de constantes**

```ts
export const TEAM_COLORS: Record<string, string> = {
  Brazil: '#009C3B',
  Argentina: '#74ACDF',
  France: '#003189',
  Portugal: '#CC0000',
  Germany: '#1a1a2e',
  Spain: '#AA151B',
  England: '#012169',
  Netherlands: '#FF6200',
  Belgium: '#EF3340',
  Uruguay: '#75AADB',
  Colombia: '#FCD116',
  Mexico: '#006847',
  'United States': '#B22234',
  Canada: '#FF0000',
  Japan: '#BC002D',
  'South Korea': '#003478',
  Morocco: '#C1272D',
  Senegal: '#00853F',
  Nigeria: '#008751',
  Ghana: '#006B3F',
  Ecuador: '#FFD100',
  Switzerland: '#FF0000',
  Poland: '#DC143C',
  Croatia: '#FF0000',
  Serbia: '#C6363C',
  Denmark: '#C60C30',
  Austria: '#ED2939',
  Turkey: '#E30A17',
  Iran: '#239F40',
  Australia: '#00008B',
  Norway: '#EF2B2D',
  Ukraine: '#005BBB',
  Italy: '#003399',
}

export const TEAM_STARS: Record<string, { name: string; position: string }> = {
  Brazil: { name: 'Vinicius Jr.', position: 'ATK' },
  Argentina: { name: 'L. Messi', position: 'ATK' },
  France: { name: 'K. Mbappé', position: 'ATK' },
  Portugal: { name: 'C. Ronaldo', position: 'ATK' },
  Germany: { name: 'J. Musiala', position: 'MID' },
  Spain: { name: 'Pedri', position: 'MID' },
  England: { name: 'J. Bellingham', position: 'MID' },
  Netherlands: { name: 'V. van Dijk', position: 'DEF' },
  Belgium: { name: 'K. De Bruyne', position: 'MID' },
  Uruguay: { name: 'D. Núñez', position: 'ATK' },
  Colombia: { name: 'L. Díaz', position: 'ATK' },
  Mexico: { name: 'H. Lozano', position: 'ATK' },
  'United States': { name: 'C. Pulisic', position: 'ATK' },
  Canada: { name: 'A. Davies', position: 'DEF' },
  Japan: { name: 'T. Kubo', position: 'MID' },
  'South Korea': { name: 'Son H.', position: 'ATK' },
  Morocco: { name: 'A. Hakimi', position: 'DEF' },
  Senegal: { name: 'S. Mané', position: 'ATK' },
  Nigeria: { name: 'V. Osimhen', position: 'ATK' },
  Norway: { name: 'E. Haaland', position: 'ATK' },
  Ecuador: { name: 'E. Caicedo', position: 'MID' },
  Croatia: { name: 'L. Modrić', position: 'MID' },
  Switzerland: { name: 'G. Xhaka', position: 'MID' },
  Denmark: { name: 'C. Eriksen', position: 'MID' },
  Poland: { name: 'R. Lewandowski', position: 'ATK' },
  Serbia: { name: 'D. Vlahović', position: 'ATK' },
  Austria: { name: 'M. Sabitzer', position: 'MID' },
  Turkey: { name: 'H. Çalhanoğlu', position: 'MID' },
  Iran: { name: 'M. Taremi', position: 'ATK' },
  Australia: { name: 'M. Leckie', position: 'ATK' },
  Ukraine: { name: 'M. Mudryk', position: 'ATK' },
  Italy: { name: 'G. Donnarumma', position: 'GK' },
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/team-data.ts
git commit -m "feat: team colors and star players data map"
```

---

## Task 2: Configurar `next/image` para TheSportsDB — `next.config.ts`

**Files:**

- Modify: `next.config.ts`

- [ ] **Step 1: Adicionar remotePatterns**

Substituir o conteúdo de `next.config.ts` por:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.thesportsdb.com',
        pathname: '/images/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
```

- [ ] **Step 2: Verificar que o build não quebra**

```bash
pnpm typecheck
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "feat: allow thesportsdb images in next/image"
```

---

## Task 3: Rota `/api/players/top` com fallback estático

**Files:**

- Create: `src/app/api/players/top/route.ts`

> Nota: essa rota usa FALLBACK_SCORERS como dados estáticos. Quando a integração football-data.org for implementada, ela será substituída por dados reais da API.

- [ ] **Step 1: Criar a rota**

```ts
import { NextResponse } from 'next/server'

import { TEAM_STARS } from '@/lib/team-data'

export const revalidate = 86400

type PlayerDisplay = {
  id: number
  name: string
  nationality: string
  flag: string
  club: string
  position: string
  goals: number
}

const FLAG_MAP: Record<string, string> = {
  Brazil: '🇧🇷',
  Argentina: '🇦🇷',
  France: '🇫🇷',
  Portugal: '🇵🇹',
  Norway: '🇳🇴',
  England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  Germany: '🇩🇪',
  Spain: '🇪🇸',
  Belgium: '🇧🇪',
  Netherlands: '🇳🇱',
  Uruguay: '🇺🇾',
  Colombia: '🇨🇴',
  Serbia: '🇷🇸',
  Poland: '🇵🇱',
  Croatia: '🇭🇷',
  Nigeria: '🇳🇬',
}

export async function GET() {
  const players: PlayerDisplay[] = Object.entries(TEAM_STARS)
    .slice(0, 12)
    .map(([nationality, star], i) => ({
      id: i + 1,
      name: star.name,
      nationality,
      flag: FLAG_MAP[nationality] ?? '🏳️',
      club: nationality,
      position: star.position,
      goals: 0,
    }))

  return NextResponse.json(players)
}
```

- [ ] **Step 2: Testar a rota**

```bash
pnpm dev
# em outro terminal:
curl http://localhost:3000/api/players/top | head -c 200
```

Expected: JSON array com 12 jogadores

- [ ] **Step 3: Commit**

```bash
git add src/app/api/players/top/route.ts
git commit -m "feat: /api/players/top route with static fallback data"
```

---

## Task 4: Rota `/api/players/photo` — TheSportsDB lookup

**Files:**

- Create: `src/app/api/players/photo/route.ts`

- [ ] **Step 1: Criar a rota**

```ts
import { NextResponse } from 'next/server'

export const revalidate = 86400

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name')

  if (!name) {
    return NextResponse.json({ photoUrl: null })
  }

  try {
    const res = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(name)}`,
      { next: { revalidate: 86400 } },
    )
    const data = (await res.json()) as {
      player: Array<{ strCutout?: string; strThumb?: string }> | null
    }
    const player = data?.player?.[0]
    const photoUrl = player?.strCutout || player?.strThumb || null
    return NextResponse.json({ photoUrl })
  } catch {
    return NextResponse.json({ photoUrl: null })
  }
}
```

- [ ] **Step 2: Testar manualmente**

```bash
# com pnpm dev rodando:
curl "http://localhost:3000/api/players/photo?name=Vinicius+Jr" | python3 -m json.tool
```

Expected: `{ "photoUrl": "https://www.thesportsdb.com/images/..." }` ou `{ "photoUrl": null }`

- [ ] **Step 3: Commit**

```bash
git add src/app/api/players/photo/route.ts
git commit -m "feat: /api/players/photo route with TheSportsDB lookup"
```

---

## Task 5: Animação CSS para o banner — `src/app/globals.css`

**Files:**

- Modify: `src/app/globals.css`

- [ ] **Step 1: Adicionar keyframe no final do globals.css**

Adicionar ao final do arquivo `src/app/globals.css`:

```css
@keyframes scroll-x {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: scroll-x keyframe animation for players banner"
```

---

## Task 6: Componente `<PlayerFigurina>` — `src/components/brasa/player-figurina.tsx`

**Files:**

- Create: `src/components/brasa/player-figurina.tsx`

- [ ] **Step 1: Criar o componente**

```tsx
'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

import { TEAM_COLORS } from '@/lib/team-data'

interface PlayerFigurinaProps {
  name: string
  team: string
  flag: string
  position: string
  goals: number
  size?: 'sm' | 'md'
}

function Initials({ name, color }: { name: string; color: string }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <div
      className="w-full h-full flex items-center justify-center font-display text-white"
      style={{ backgroundColor: color, fontSize: '1.25rem' }}
    >
      {initials}
    </div>
  )
}

export function PlayerFigurina({
  name,
  team,
  flag,
  position,
  goals,
  size = 'md',
}: PlayerFigurinaProps) {
  const color = TEAM_COLORS[team] ?? '#1a1a2e'
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/players/photo?name=${encodeURIComponent(name)}`)
      .then((r) => r.json())
      .then((d: { photoUrl: string | null }) => setPhotoUrl(d.photoUrl))
      .catch(() => {})
  }, [name])

  const isSmall = size === 'sm'
  const surname = name.split(' ').pop()?.toUpperCase() ?? name.toUpperCase()

  return (
    <div
      className={`
        ${isSmall ? 'w-16' : 'w-24'}
        rounded-lg overflow-hidden flex flex-col border border-white/10 shrink-0
      `}
      style={{ boxShadow: `0 0 0 1.5px ${color}55` }}
    >
      {/* Header — faixa colorida */}
      <div
        className={`flex items-center justify-center gap-1 ${isSmall ? 'py-1 px-1' : 'py-1.5 px-2'}`}
        style={{ backgroundColor: color }}
      >
        <span className={`leading-none ${isSmall ? 'text-base' : 'text-lg'}`}>{flag}</span>
        {!isSmall && (
          <span className="text-white font-bold tracking-widest" style={{ fontSize: '8px' }}>
            {team.toUpperCase().slice(0, 3)}
          </span>
        )}
      </div>

      {/* Foto */}
      <div className={`relative overflow-hidden bg-brasa-surface ${isSmall ? 'h-16' : 'h-24'}`}>
        {photoUrl ? (
          <Image src={photoUrl} alt={name} fill className="object-cover object-top" unoptimized />
        ) : (
          <Initials name={name} color={color} />
        )}
      </div>

      {/* Footer */}
      <div className="bg-[#0d0d14] px-1.5 py-1">
        <p
          className={`text-white font-bold truncate leading-none ${isSmall ? 'text-[9px]' : 'text-[11px]'}`}
        >
          {surname}
        </p>
        <p className={`text-white/40 leading-none mt-0.5 ${isSmall ? 'text-[8px]' : 'text-[9px]'}`}>
          {position} · ⚽{goals}
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/brasa/player-figurina.tsx
git commit -m "feat: PlayerFigurina card component with Panini style"
```

---

## Task 7: Componente `<PlayersBanner>` — `src/components/layout/players-banner.tsx`

**Files:**

- Create: `src/components/layout/players-banner.tsx`

- [ ] **Step 1: Criar o componente**

```tsx
'use client'

import { useEffect, useState } from 'react'

import { PlayerFigurina } from '@/components/brasa/player-figurina'

type PlayerDisplay = {
  id: number
  name: string
  nationality: string
  flag: string
  position: string
  goals: number
}

export function PlayersBanner() {
  const [players, setPlayers] = useState<PlayerDisplay[]>([])

  useEffect(() => {
    fetch('/api/players/top')
      .then((r) => r.json())
      .then((data: PlayerDisplay[]) => setPlayers(data))
      .catch(() => {})
  }, [])

  if (players.length === 0) return null

  // Duplica para loop infinito seamless
  const items = [...players, ...players]

  return (
    <div className="w-full overflow-hidden py-3 border-y border-white/5">
      <div className="flex gap-3 w-max" style={{ animation: 'scroll-x 45s linear infinite' }}>
        {items.map((p, i) => (
          <PlayerFigurina
            key={`${p.id}-${i}`}
            name={p.name}
            team={p.nationality}
            flag={p.flag}
            position={p.position}
            goals={p.goals}
            size="md"
          />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/players-banner.tsx
git commit -m "feat: PlayersBanner scrolling ticker with figurinha cards"
```

---

## Task 8: Atualizar `game-card.tsx` com mini-figurinhas das estrelas

**Files:**

- Modify: `src/components/jogos/game-card.tsx`

- [ ] **Step 1: Adicionar import de PlayerFigurina e TEAM_STARS**

No topo de `src/components/jogos/game-card.tsx`, adicionar após os imports existentes:

```tsx
import { PlayerFigurina } from '@/components/brasa/player-figurina'
import { TEAM_STARS } from '@/lib/team-data'
```

- [ ] **Step 2: Adicionar seção de estrelas dentro do GameCard**

Dentro da função `GameCard`, adicionar o bloco de estrelas logo após o bloco `{/* Teams + score row */}` (após a `</div>` que fecha esse bloco, antes do bloco de prediction):

```tsx
{
  /* Star players */
}
{
  ;(() => {
    const homeStar = TEAM_STARS[match.homeTeam]
    const awayStar = TEAM_STARS[match.awayTeam]
    if (!homeStar && !awayStar) return null
    return (
      <div className="flex items-center justify-between gap-2">
        {homeStar ? (
          <PlayerFigurina
            name={homeStar.name}
            team={match.homeTeam}
            flag={match.homeFlag}
            position={homeStar.position}
            goals={0}
            size="sm"
          />
        ) : (
          <div className="w-16" />
        )}
        <span className="text-white/10 text-xs font-display">vs</span>
        {awayStar ? (
          <PlayerFigurina
            name={awayStar.name}
            team={match.awayTeam}
            flag={match.awayFlag}
            position={awayStar.position}
            goals={0}
            size="sm"
          />
        ) : (
          <div className="w-16" />
        )}
      </div>
    )
  })()
}
```

- [ ] **Step 3: Typecheck e lint**

```bash
pnpm typecheck && pnpm lint
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/components/jogos/game-card.tsx
git commit -m "feat: add star player figurinhas to game card"
```

---

## Task 9: Inserir `<PlayersBanner>` na página de jogos

**Files:**

- Modify: `src/app/(main)/jogos/page.tsx`

- [ ] **Step 1: Adicionar import e banner no topo da página**

Em `src/app/(main)/jogos/page.tsx`, adicionar import:

```tsx
import { PlayersBanner } from '@/components/layout/players-banner'
```

Dentro do `return`, inserir `<PlayersBanner />` entre o parágrafo de subtitle e a lista de jogos:

```tsx
return (
  <main className="min-h-screen bg-brasa-bg px-4 sm:px-6 py-8 max-w-2xl mx-auto">
    <h1 className="font-display text-4xl text-white mb-1">Jogos</h1>
    <p className="text-xs text-white/30 mb-4">{matches.length} jogos · Copa do Mundo 2026</p>

    <PlayersBanner />

    <div className="mb-8" />

    {Object.entries(groups)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([group, games]) => (
        <section key={group} className="mb-8">
          <h2 className="font-display text-lg sm:text-xl text-amarelo-400 mb-3">
            {group.length === 1 ? `Grupo ${group}` : group.replace(/_/g, ' ')}
            <span className="font-sans text-xs text-white/30 ml-2 normal-case">
              · {games.length} jogos
            </span>
          </h2>
          <div className="flex flex-col gap-2">
            {games.map((match) => (
              <GameCard
                key={match.id}
                match={match}
                userPrediction={predictionMap.get(match.id) ?? undefined}
              />
            ))}
          </div>
        </section>
      ))}
  </main>
)
```

- [ ] **Step 2: Typecheck e lint**

```bash
pnpm typecheck && pnpm lint
```

Expected: no errors

- [ ] **Step 3: Testar visualmente**

```bash
pnpm dev
```

Abrir `http://localhost:3000/jogos` e verificar:

- Banner de figurinhas aparece e está rolando horizontalmente
- Cada game card mostra 2 mini-figurinhas das estrelas
- Fallback de iniciais aparece enquanto a foto carrega
- Fotos carregam depois de ~1s (request para TheSportsDB)
- Não há erros no console

- [ ] **Step 4: Commit final**

```bash
git add src/app/(main)/jogos/page.tsx
git commit -m "feat: wire PlayersBanner into jogos page"
```

---

## Checklist de verificação final

- [ ] `pnpm typecheck` sem erros
- [ ] `pnpm lint` sem erros
- [ ] Banner rola continuamente sem saltos
- [ ] Figurinhas `size="md"` visíveis no banner
- [ ] Figurinhas `size="sm"` visíveis nos game cards
- [ ] Fallback de iniciais aparece para jogadores sem foto
- [ ] Nenhum 401/403 no console (TheSportsDB free key `3`)
- [ ] `next/image` não gera erro de domínio não autorizado
