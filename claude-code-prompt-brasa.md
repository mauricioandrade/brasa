# Prompt — Claude Code: scaffold completo do Brasa

Cole este prompt diretamente no Claude Code dentro da pasta onde quer criar o projeto.

> **Pré-requisitos:** `gh` CLI autenticado (`gh auth login`) e Node.js 20+.

---

## Contexto

Crie um projeto chamado `brasa` — bolão da Copa do Mundo 2026, open source, público, deploy na Vercel.

**Nome:** Brasa  
**Tagline:** O bolão mais quente da Copa  
**Stack:** Next.js 15 (App Router) + TypeScript strict + Tailwind CSS + shadcn/ui + Prisma + NextAuth v5 + PostgreSQL (Neon)

**Identidade visual aprovada:**

- Verde: `#009c3b`
- Amarelo: `#ffdf00`
- Azul escuro: `#002776`
- Fundo dark: `#001a0a`
- Fonte display: Bebas Neue (Google Fonts)
- Logo: emblema circular azul com borda dourada + wordmark "BRASA" (S em verde, A em amarelo)

---

## Tarefa 1 — Scaffold do projeto

```bash
pnpm create next-app@latest brasa \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack
cd brasa
```

---

## Tarefa 2 — Instalar dependências

```bash
# UI
pnpm add @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react
pnpm dlx shadcn@latest init -d

# Auth
pnpm add next-auth@beta @auth/prisma-adapter

# ORM
pnpm add @prisma/client
pnpm add -D prisma

# Qualidade de código
pnpm add -D \
  prettier \
  eslint-config-prettier \
  eslint-plugin-prettier \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint-plugin-import \
  eslint-plugin-jsx-a11y \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  @trivago/prettier-plugin-sort-imports

# Commits padronizados
pnpm add -D \
  husky \
  lint-staged \
  @commitlint/cli \
  @commitlint/config-conventional

# Inicializar husky
pnpm exec husky init
```

---

## Tarefa 3 — Arquivos de configuração

### `.prettierrc`

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "all",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["@trivago/prettier-plugin-sort-imports"],
  "importOrder": ["^react$", "^next(.*)$", "<THIRD_PARTY_MODULES>", "^@/(.*)$", "^[./]"],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
}
```

### `.prettierignore`

```
.next
node_modules
pnpm-lock.yaml
prisma/migrations
public
```

### `.eslintrc.json`

```json
{
  "root": true,
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  "plugins": ["@typescript-eslint", "prettier", "import"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "rules": {
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/consistent-type-imports": ["error", { "prefer": "type-imports" }],
    "import/order": "off",
    "import/no-duplicates": "error",
    "react/self-closing-comp": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

### `commitlint.config.js`

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'ci', 'revert'],
    ],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 72],
  },
}
```

### `.husky/commit-msg`

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm exec commitlint --edit $1
```

### `.husky/pre-commit`

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm exec lint-staged
```

### `lint-staged.config.js`

```js
module.exports = {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,css}': ['prettier --write'],
}
```

### `.editorconfig`

```ini
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

### `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        verde: {
          50: '#e6f7ed',
          100: '#b3e5c5',
          200: '#80d49d',
          300: '#4dc275',
          400: '#26b357',
          500: '#009c3b',
          600: '#008a34',
          700: '#00742b',
          800: '#005f23',
          900: '#003d16',
        },
        amarelo: {
          50: '#fffde6',
          100: '#fff9b3',
          200: '#fff480',
          300: '#ffee4d',
          400: '#ffdf00',
          500: '#e5c800',
          600: '#ccb200',
          700: '#998500',
          800: '#665900',
          900: '#332c00',
        },
        azul: {
          50: '#e6eaf3',
          100: '#b3bedd',
          200: '#8093c7',
          300: '#4d67b1',
          400: '#1a3b9b',
          500: '#002776',
          600: '#002268',
          700: '#001c57',
          800: '#001546',
          900: '#000d2c',
        },
        brasa: {
          bg: '#001a0a',
          surface: '#0d1f0f',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-bebas)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

### `src/app/layout.tsx` — substituir pelo gerado

```tsx
import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

export const metadata: Metadata = {
  title: 'Brasa — O bolão mais quente da Copa',
  description: 'Bolão da Copa do Mundo 2026 com fantasy points. Acerte o placar, supere a galera.',
  openGraph: {
    title: 'Brasa',
    description: 'O bolão mais quente da Copa do Mundo 2026',
    siteName: 'Brasa',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${bebas.variable}`}>
      <body className="bg-brasa-bg text-white antialiased">{children}</body>
    </html>
  )
}
```

---

## Tarefa 4 — Estrutura de pastas

Crie a estrutura abaixo com arquivos mínimos em cada `page.tsx`:

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── layout.tsx
│   ├── (main)/
│   │   ├── jogos/page.tsx
│   │   ├── ranking/page.tsx
│   │   ├── palpites/page.tsx
│   │   └── layout.tsx
│   ├── admin/
│   │   ├── jogos/page.tsx
│   │   ├── resultados/page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── jogos/route.ts
│   │   └── palpites/route.ts
│   ├── globals.css
│   ├── layout.tsx        ← já criado acima
│   └── page.tsx
├── components/
│   ├── ui/               ← shadcn (gerado pelo CLI)
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── nav.tsx
│   ├── brasa/
│   │   └── logo.tsx      ← componente do emblema + wordmark
│   ├── jogos/
│   │   ├── game-card.tsx
│   │   └── games-list.tsx
│   ├── palpites/
│   │   ├── prediction-form.tsx
│   │   └── prediction-card.tsx
│   └── ranking/
│       └── ranking-table.tsx
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   ├── scoring.ts
│   └── utils.ts
├── types/
│   └── index.ts
└── hooks/
    └── use-predictions.ts
```

### `src/components/brasa/logo.tsx`

```tsx
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: { emblem: 34, fontSize: 22, tagSize: 8 },
  md: { emblem: 52, fontSize: 32, tagSize: 10 },
  lg: { emblem: 110, fontSize: 64, tagSize: 12 },
}

export function BrasaLogo({ size = 'md', className }: LogoProps) {
  const s = sizes[size]

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className="rounded-full bg-azul-500 border-2 border-amarelo-400 flex flex-col items-center justify-center flex-shrink-0"
        style={{ width: s.emblem, height: s.emblem }}
      >
        <span
          className="font-sans font-black text-amarelo-400 leading-none"
          style={{ fontSize: s.tagSize * 0.7 }}
        >
          COPA
        </span>
        <span className="font-display text-white leading-none" style={{ fontSize: s.emblem * 0.3 }}>
          B26
        </span>
        <span
          className="font-sans font-semibold text-white/40 leading-none"
          style={{ fontSize: s.tagSize * 0.6 }}
        >
          BRASA
        </span>
      </div>
      <div className="flex flex-col">
        <span
          className="font-display text-white leading-none tracking-widest"
          style={{ fontSize: s.fontSize }}
        >
          BRA<span className="text-verde-500">S</span>
          <span className="text-amarelo-400">A</span>
        </span>
        {size === 'lg' && (
          <span
            className="font-sans text-white/35 tracking-widest font-medium"
            style={{ fontSize: 11 }}
          >
            O BOLÃO MAIS QUENTE DA COPA
          </span>
        )}
      </div>
    </div>
  )
}
```

---

## Tarefa 5 — Prisma schema

```bash
pnpm exec prisma init --datasource-provider postgresql
```

Substitua `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id            String       @id @default(cuid())
  name          String?
  email         String       @unique
  emailVerified DateTime?
  image         String?
  role          Role         @default(USER)
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  accounts      Account[]
  sessions      Session[]
  predictions   Prediction[]

  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model Match {
  id          String       @id @default(cuid())
  homeTeam    String
  awayTeam    String
  homeFlag    String
  awayFlag    String
  phase       Phase
  group       String?
  scheduledAt DateTime
  homeScore   Int?
  awayScore   Int?
  status      MatchStatus  @default(SCHEDULED)
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  predictions Prediction[]

  @@map("matches")
}

model Prediction {
  id            String   @id @default(cuid())
  userId        String
  matchId       String
  homeScore     Int
  awayScore     Int
  topScorerName String?
  pointsEarned  Int      @default(0)
  calculated    Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  match         Match    @relation(fields: [matchId], references: [id], onDelete: Cascade)

  @@unique([userId, matchId])
  @@map("predictions")
}

enum Role {
  USER
  ADMIN
}

enum Phase {
  GROUP
  ROUND_OF_16
  QUARTER_FINAL
  SEMI_FINAL
  THIRD_PLACE
  FINAL
}

enum MatchStatus {
  SCHEDULED
  LIVE
  FINISHED
  CANCELLED
}
```

---

## Tarefa 6 — Variáveis de ambiente

Crie `.env.example`:

```env
# Banco de dados (Neon)
DATABASE_URL="postgresql://user:password@host/brasa?sslmode=require"
DIRECT_URL="postgresql://user:password@host/brasa?sslmode=require"

# NextAuth
AUTH_SECRET="gere-com: openssl rand -base64 32"
AUTH_URL="http://localhost:3000"

# OAuth
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
```

Adicione ao `.gitignore`:

```
.env
.env.local
.env.production
```

---

## Tarefa 7 — GitHub Actions CI

Crie `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  quality:
    name: Lint & Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v3
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - run: pnpm install --frozen-lockfile

      - name: Type check
        run: pnpm tsc --noEmit

      - name: Lint
        run: pnpm eslint src --ext .ts,.tsx --max-warnings 0

      - name: Format check
        run: pnpm prettier --check "src/**/*.{ts,tsx,json,css}"
```

---

## Tarefa 8 — Scripts no package.json

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint src --ext .ts,.tsx --max-warnings 0",
  "lint:fix": "eslint src --ext .ts,.tsx --fix",
  "format": "prettier --write \"src/**/*.{ts,tsx,json,css,md}\"",
  "format:check": "prettier --check \"src/**/*.{ts,tsx,json,css,md}\"",
  "typecheck": "tsc --noEmit",
  "db:generate": "prisma generate",
  "db:migrate": "prisma migrate dev",
  "db:push": "prisma db push",
  "db:studio": "prisma studio",
  "db:seed": "tsx prisma/seed.ts",
  "prepare": "husky"
}
```

---

## Tarefa 9 — Milestones, Issues e Labels no GitHub

Crie o repositório se ainda não existir:

```bash
gh repo create brasa --public --description "🔥 O bolão mais quente da Copa do Mundo 2026"
```

### Labels

```bash
gh label create "setup"       --color "0075ca" --description "Configuração inicial"
gh label create "database"    --color "e4e669" --description "Banco de dados e migrações"
gh label create "auth"        --color "d93f0b" --description "Autenticação e sessão"
gh label create "feature"     --color "009c3b" --description "Nova funcionalidade"
gh label create "api"         --color "5319e7" --description "Endpoints de API"
gh label create "admin"       --color "b60205" --description "Área administrativa"
gh label create "infra"       --color "006b75" --description "Deploy e infraestrutura"
gh label create "ci"          --color "1d76db" --description "CI/CD e automação"
gh label create "performance" --color "f9d0c4" --description "Otimizações de performance"
gh label create "docs"        --color "ffdf00" --description "Documentação"
```

### Milestones

```bash
gh milestone create "v0.1 — Base"       --description "Scaffold, auth, banco, deploy inicial" --due-date 2026-06-08
gh milestone create "v0.2 — Palpites"   --description "Jogos, formulário de palpites, bloqueio por kickoff" --due-date 2026-06-12
gh milestone create "v0.3 — Pontuação"  --description "Motor de pontos, admin de resultados" --due-date 2026-06-16
gh milestone create "v0.4 — Ranking"    --description "Ranking geral, perfil do usuário" --due-date 2026-06-20
gh milestone create "v1.0 — Copa ao vivo" --description "Polimento, performance, mata-mata" --due-date 2026-07-01
```

### Issues — v0.1 Base

```bash
gh issue create \
  --title "feat: scaffold next.js 15 com typescript e tailwind" \
  --body "Criar projeto base com pnpm, Next.js App Router, TypeScript strict, Tailwind com paleta Brasil (verde/amarelo/azul). Nome do projeto: brasa." \
  --label "setup" --milestone "v0.1 — Base"

gh issue create \
  --title "feat: configurar eslint, prettier e husky" \
  --body "ESLint com @typescript-eslint, Prettier com sort-imports, Husky + lint-staged + commitlint. Padrão: 2 espaços, single quotes, sem semicolons." \
  --label "setup" --milestone "v0.1 — Base"

gh issue create \
  --title "feat: componente BrasaLogo com emblema e wordmark" \
  --body "Emblema circular azul com borda dourada + wordmark BRASA (S em verde #009c3b, A em amarelo #ffdf00). Tamanhos: sm/md/lg. Usar Bebas Neue via next/font." \
  --label "feature" --milestone "v0.1 — Base"

gh issue create \
  --title "feat: prisma schema — user, match, prediction" \
  --body "Modelagem completa com enums Phase (GROUP, ROUND_OF_16, QUARTER_FINAL, SEMI_FINAL, THIRD_PLACE, FINAL), MatchStatus, Role. Migration inicial." \
  --label "database" --milestone "v0.1 — Base"

gh issue create \
  --title "feat: autenticação com nextauth v5 (google + github)" \
  --body "Login social, sessão, middleware de proteção de rotas. Role ADMIN para painel de resultados." \
  --label "auth" --milestone "v0.1 — Base"

gh issue create \
  --title "feat: seed dos 48 jogos da copa 2026" \
  --body "Todos os jogos da fase de grupos com times, flags emoji, datas, horários (BRT) e grupos reais. Arquivo: prisma/seed.ts." \
  --label "database" --milestone "v0.1 — Base"

gh issue create \
  --title "chore: deploy na vercel + neon" \
  --body "Configurar env vars na Vercel: DATABASE_URL, DIRECT_URL (Neon sa-east-1), AUTH_SECRET, AUTH_GOOGLE_ID/SECRET, AUTH_GITHUB_ID/SECRET." \
  --label "infra" --milestone "v0.1 — Base"

gh issue create \
  --title "ci: github actions — lint e typecheck em prs" \
  --body "Workflow que bloqueia merge se lint ou typecheck falhar. Roda em PRs para main e develop." \
  --label "ci" --milestone "v0.1 — Base"
```

### Issues — v0.2 Palpites

```bash
gh issue create \
  --title "feat: página /jogos com listagem por fase e grupo" \
  --body "Cards de jogos com times, flags, horário e status (agendado/ao vivo/encerrado). Filtro por fase. Layout inspirado na identidade Brasa." \
  --label "feature" --milestone "v0.2 — Palpites"

gh issue create \
  --title "feat: formulário de palpite por jogo" \
  --body "Input de placar (casa × fora) + artilheiro opcional. Bloqueio automático 5 min antes do kickoff. Feedback visual de salvo." \
  --label "feature" --milestone "v0.2 — Palpites"

gh issue create \
  --title "feat: api post /api/palpites" \
  --body "Validação de prazo (rejeita após kickoff), upsert do palpite, retorno com status. Autenticação obrigatória." \
  --label "api" --milestone "v0.2 — Palpites"

gh issue create \
  --title "feat: página /palpites — histórico do usuário logado" \
  --body "Lista todos os palpites com status (pendente/acertou/errou) e pontos ganhos por jogo." \
  --label "feature" --milestone "v0.2 — Palpites"
```

### Issues — v0.3 Pontuação

```bash
gh issue create \
  --title "feat: motor de pontuação em lib/scoring.ts" \
  --body "Regras: placar exato = 7pts, vencedor correto = 3pts, empate correto = 4pts, artilheiro = 2pts, multiplicador mata-mata = 1.5x. Função pura e testável." \
  --label "feature" --milestone "v0.3 — Pontuação"

gh issue create \
  --title "feat: painel admin — inserir resultado de jogo" \
  --body "Formulário protegido por role ADMIN. Insere placar final e dispara recálculo de todos os palpites daquele jogo." \
  --label "admin" --milestone "v0.3 — Pontuação"

gh issue create \
  --title "feat: api patch /api/admin/jogos/[id]" \
  --body "Atualiza Match com placar, chama motor de pontuação para cada Prediction do jogo, marca calculated=true." \
  --label "api" --milestone "v0.3 — Pontuação"
```

### Issues — v0.4 Ranking

```bash
gh issue create \
  --title "feat: página /ranking — ranking geral" \
  --body "Top usuários por pontos totais. Exibir posição, avatar, nome, pontos e total de acertos. Top 3 com destaque visual (ouro/prata/bronze)." \
  --label "feature" --milestone "v0.4 — Ranking"

gh issue create \
  --title "feat: página /perfil — estatísticas do usuário" \
  --body "Total de pontos, % de acertos, quantidade de placares exatos, artilheiros acertados. Histórico completo de palpites." \
  --label "feature" --milestone "v0.4 — Ranking"
```

### Issues — v1.0 Copa ao vivo

```bash
gh issue create \
  --title "feat: badge ao vivo nos cards de jogo" \
  --body "Badge vermelho pulsante quando MatchStatus = LIVE. Polling a cada 60s via SWR ou React Query." \
  --label "feature" --milestone "v1.0 — Copa ao vivo"

gh issue create \
  --title "feat: mata-mata — palpites com confrontos dinâmicos" \
  --body "Jogos de oitavas em diante só liberam palpite quando as equipes forem definidas (após fase anterior encerrada)." \
  --label "feature" --milestone "v1.0 — Copa ao vivo"

gh issue create \
  --title "perf: cache de ranking com next.js cache tags" \
  --body "Invalidar cache do ranking somente quando pontos forem recalculados, via revalidateTag('ranking')." \
  --label "performance" --milestone "v1.0 — Copa ao vivo"

gh issue create \
  --title "docs: contributing.md e readme completo" \
  --body "Instruções para rodar local, variáveis de ambiente, padrão de commits (conventional commits), como abrir PR, roadmap." \
  --label "docs" --milestone "v1.0 — Copa ao vivo"
```

---

## Tarefa 10 — README.md

````markdown
# 🔥 Brasa

> O bolão mais quente da Copa do Mundo 2026

Bolão open source com sistema de fantasy points. Palpite no placar, artilheiro e muito mais.

## Stack

| Camada    | Tecnologia                    |
| --------- | ----------------------------- |
| Framework | Next.js 15 (App Router)       |
| Linguagem | TypeScript strict             |
| Estilo    | Tailwind CSS + shadcn/ui      |
| Banco     | PostgreSQL via Neon           |
| ORM       | Prisma                        |
| Auth      | NextAuth v5 (Google + GitHub) |
| Deploy    | Vercel                        |

## Sistema de pontos

| Acerto                  | Pontos |
| ----------------------- | ------ |
| Placar exato            | 7      |
| Vencedor correto        | 3      |
| Empate correto          | 4      |
| Artilheiro do jogo      | 2      |
| Multiplicador mata-mata | 1.5×   |

## Rodando local

```bash
git clone https://github.com/seu-user/brasa
cd brasa
pnpm install

cp .env.example .env.local
# preencha as variáveis

pnpm db:push
pnpm db:seed
pnpm dev
```
````

Acesse `http://localhost:3000`

## Contribuindo

Leia `CONTRIBUTING.md`. Todo PR passa pelo CI (lint + typecheck).  
Padrão de commits: [Conventional Commits](https://conventionalcommits.org)

```
feat: adicionar página de ranking
fix: corrigir cálculo de pontos no mata-mata
docs: atualizar instruções de setup
```

## Licença

MIT — feito com 🔥 para a Copa 2026

```

---

## Checklist final

Confirme antes de considerar concluído:

- [ ] `pnpm dev` sobe em `localhost:3000` sem erros
- [ ] `pnpm lint` passa com 0 warnings
- [ ] `pnpm typecheck` passa sem erros
- [ ] `pnpm format:check` passa
- [ ] Husky instalado (hooks executáveis em `.husky/`)
- [ ] `.env.example` presente, `.env` não commitado
- [ ] Fontes Inter e Bebas Neue carregando via `next/font`
- [ ] Cores `verde`, `amarelo`, `azul`, `brasa` disponíveis no Tailwind
- [ ] Componente `BrasaLogo` renderiza nas 3 variantes de tamanho
- [ ] Repositório GitHub criado como público
- [ ] 10 labels criadas
- [ ] 5 milestones criadas
- [ ] 18 issues criadas e vinculadas às milestones
```
