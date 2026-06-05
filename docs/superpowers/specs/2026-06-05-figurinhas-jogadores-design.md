# Design: Figurinhas de Jogadores

**Data:** 2026-06-05  
**Status:** Aprovado

## Objetivo

Adicionar fotos de jogadores estilo "figurinha Panini" em dois lugares:

1. **Banner de artilheiros** (`<PlayersBanner>`) — faixa horizontal com scroll infinito na home/jogos
2. **Game card** — mini-figurinhas das estrelas de cada seleção, dentro do `game-card.tsx`

## Fonte de fotos

**TheSportsDB** (free tier, API key `3`)  
Endpoint: `GET https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p={name}`  
Campos usados: `strThumb` (foto com fundo) e `strCutout` (foto sem fundo, preferencial).  
Cobertura estimada: ~80% dos jogadores de Copa.

## Componentes novos

### `<PlayerFigurina>` — `src/components/brasa/player-figurina.tsx`

Card estilo Panini clássico. Props:

```ts
interface PlayerFigarinaProps {
  name: string
  team: string
  flag: string
  position: string
  goals: number
  size?: 'sm' | 'md' // sm = game card, md = banner
}
```

Layout:

```
┌──────────────────┐
│  🇧🇷  BRAZIL  🇧🇷  │  ← faixa colorida (cor da seleção)
│  ──────────────  │
│   [foto cutout]  │  ← busca via /api/players/photo, fallback = iniciais
│ ──────────────── │
│  VINICIUS JR.    │  ← fundo escuro, nome em branco bold
│  ATK  ·  ⚽ 0   │  ← posição + gols
└──────────────────┘
```

Busca foto com `useSWR('/api/players/photo?name={name}')`. Fallback: círculo com iniciais na cor da seleção.

### `/api/players/photo/route.ts` — `src/app/api/players/photo/route.ts`

```
GET /api/players/photo?name=Vinicius+Jr
→ { photoUrl: string | null }
```

- Busca no TheSportsDB: `searchplayers.php?p={name}`
- Prefere `strCutout`, fallback para `strThumb`, fallback para `null`
- `export const revalidate = 86400` (cache 24h)
- Sem banco, sem migration

### `<PlayersBanner>` — `src/components/layout/players-banner.tsx`

Faixa horizontal com scroll CSS infinito (`animation: scroll linear infinite`).  
Busca `/api/players/top` (já existe no prompt, retorna top scorers da Copa).  
Duplica o array para criar loop visual seamless.  
Cada item: `<PlayerFigurina size="md" />`.

### Atualização `game-card.tsx`

Adicionar seção abaixo do placar com 2 mini-figurinhas (`size="sm"`), uma por time.  
Lookup de estrela: mapa estático `TEAM_STARS: Record<string, { name, position }>` com ~30 seleções principais. Quando os scorers reais estiverem disponíveis (após seed), usar o artilheiro real da seleção.

## Mapa de cores das seleções

Mapa estático `TEAM_COLORS: Record<string, string>` com ~30 seleções:

```ts
{ Brazil: '#009C3B', Argentina: '#74ACDF', France: '#003189',
  Portugal: '#CC0000', Germany: '#000000', Spain: '#AA151B', ... }
```

Fallback: `#1a1a2e` (cor escura genérica).

## Mapa de estrelas por seleção

Mapa estático `TEAM_STARS: Record<string, { name: string, position: string }>`:

```ts
{ Brazil: { name: 'Vinicius Jr.', position: 'ATK' },
  Argentina: { name: 'L. Messi', position: 'ATK' },
  France: { name: 'K. Mbappé', position: 'ATK' }, ... }
```

## Fluxo de dados

```
/api/players/top  →  <PlayersBanner>  →  <PlayerFigurina md>
                                              ↓
                                   /api/players/photo?name=X
                                              ↓
                                        TheSportsDB API

game-card.tsx  →  TEAM_STARS[homeTeam]  →  <PlayerFigurina sm>
               →  TEAM_STARS[awayTeam]  →  <PlayerFigurina sm>
```

## Tratamento de erros

- Foto não encontrada → avatar com iniciais + cor da seleção (sem quebra visual)
- `/api/players/top` falhando → banner não renderiza (sem crash)
- Time não mapeado em `TEAM_STARS` → game card não mostra figurinhas (não bloqueia palpite)

## Arquivos envolvidos

| Arquivo                                    | Ação                       |
| ------------------------------------------ | -------------------------- |
| `src/components/brasa/player-figurina.tsx` | Criar                      |
| `src/app/api/players/photo/route.ts`       | Criar                      |
| `src/components/layout/players-banner.tsx` | Criar                      |
| `src/components/jogos/game-card.tsx`       | Atualizar                  |
| `src/app/(main)/jogos/page.tsx`            | Atualizar (inserir banner) |
| `src/app/page.tsx` ou `home-animated.tsx`  | Atualizar (inserir banner) |

## Fora do escopo

- Efeito holográfico (holo)
- Salvar fotos no banco (Prisma)
- Busca automática de elenco completo por seleção
- Página de álbum de figurinhas dedicada
