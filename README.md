<div align="center">

```
██████╗ ██████╗  █████╗ ███████╗ █████╗
██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗
██████╔╝██████╔╝███████║███████╗███████║
██╔══██╗██╔══██╗██╔══██║╚════██║██╔══██║
██████╔╝██║  ██║██║  ██║███████║██║  ██║
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
```

**O bolão mais quente da Copa do Mundo 2026**

[![CI](https://github.com/mauricioandrade/brasa/actions/workflows/ci.yml/badge.svg)](https://github.com/mauricioandrade/brasa/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

[Demo](https://brasa-pi.vercel.app) · [Abrir issue](https://github.com/mauricioandrade/brasa/issues) · [Contribuir](./CONTRIBUTING.md)

</div>

---

## O que é o Brasa?

O Brasa é um bolão open source da Copa do Mundo 2026 com mecânica de **fantasy points** — você não pontua só acertando o vencedor. Quanto mais ousado e preciso o palpite, mais pontos você acumula.

Sem taxas, sem premiação em dinheiro. Só a glória de chegar no topo do ranking.

---

## Estado atual

| Funcionalidade                                            | Status      |
| --------------------------------------------------------- | ----------- |
| Scaffold Next.js 16 + TypeScript strict + Tailwind 4      | ✅ Feito    |
| NextAuth v5 — Google + GitHub OAuth                       | ✅ Feito    |
| Prisma 7 + PostgreSQL (Neon) com adapter Neon             | ✅ Feito    |
| Schema: User, Account, Session, Match, Prediction         | ✅ Feito    |
| Seed: 48 jogos da Copa 2026                               | ✅ Feito    |
| Motor de pontuação (`lib/scoring.ts`)                     | ✅ Feito    |
| Sistema de ranks: Torcedor → Reserva → Titular → Lenda    | ✅ Feito    |
| `GET /api/jogos` — lista 48 jogos                         | ✅ Feito    |
| `POST /api/palpites` — salva com lock 5 min antes kickoff | ✅ Feito    |
| `GET /api/palpites` — histórico do usuário                | ✅ Feito    |
| Rate limiting via banco (10 req/min por usuário)          | ✅ Feito    |
| Integração football-data.org (rate limit + timeout)       | ✅ Feito    |
| Cron job GitHub Actions (a cada 15 min)                   | ✅ Feito    |
| Security headers + admin guard por role ADMIN             | ✅ Feito    |
| CI GitHub Actions (lint + typecheck em PRs)               | ✅ Feito    |
| Deploy Vercel (https://brasa-pi.vercel.app)               | ✅ Feito    |
| Página `/` — home com título BRASA + stats strip          | ✅ Feito    |
| Página `/login` — Google + GitHub com separador           | ✅ Feito    |
| Página `/jogos` — 48 jogos com formulário de palpite      | ✅ Feito    |
| Página `/palpites` — histórico agrupado com total de pts  | ✅ Feito    |
| Página `/ranking` — leaderboard real com top 3 destacado  | ✅ Feito    |
| Página `/perfil` — stats, rank, conquistas, progressão    | ✅ Feito    |
| Header sticky com nav ativa + avatar + logout             | ✅ Feito    |
| Animações Framer Motion em todas as páginas               | ✅ Feito    |
| Loading skeletons (jogos, palpites, ranking, perfil)      | ✅ Feito    |
| Painel admin para override de resultados                  | ⏳ Pendente |
| `topScorerName` no Match (artilheiro via cron)            | ⏳ Pendente |

---

## Sistema de pontuação

| Acerto                     |   Pontos |
| -------------------------- | -------: |
| 🏆 Placar exato            |    **7** |
| ✅ Vencedor correto        |    **3** |
| 🤝 Empate correto          |    **4** |
| ⚽ Artilheiro do jogo      |    **2** |
| 🔥 Multiplicador mata-mata | **1.5×** |

> Os palpites fecham automaticamente **5 minutos antes do kickoff**. Sem volta.

### Sistema de ranks

| Rank     | Descrição       |
| -------- | --------------- |
| Torcedor | Iniciante       |
| Reserva  | Crescendo       |
| Titular  | Jogador regular |
| Craque   | Destaque        |
| Fenômeno | Elite           |
| Lenda    | Topo absoluto   |

---

## Stack

### Frontend

| Tecnologia                                     | Versão | Por quê                                                   |
| ---------------------------------------------- | ------ | --------------------------------------------------------- |
| [Next.js](https://nextjs.org)                  | 16     | App Router, RSC, Server Actions, deploy trivial na Vercel |
| [TypeScript](https://www.typescriptlang.org)   | 5      | Strict mode — sem `any`, sem surpresa                     |
| [Tailwind CSS](https://tailwindcss.com)        | 4      | Paleta customizada com tokens Brasil (verde/amarelo/azul) |
| [shadcn/ui](https://ui.shadcn.com)             | latest | Componentes acessíveis, sem lock-in de biblioteca         |
| [Framer Motion](https://www.framer.com/motion) | 12     | Animações em todas as páginas                             |
| [Lucide React](https://lucide.dev)             | latest | Ícones consistentes e tree-shakeable                      |

### Backend

| Tecnologia                                                                                         | Versão  | Por quê                                                             |
| -------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------- |
| [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) | 16      | Fullstack no mesmo projeto, zero overhead                           |
| [Prisma](https://www.prisma.io)                                                                    | 7       | ORM com migrations, type-safe queries, schema como fonte de verdade |
| [NextAuth v5](https://authjs.dev)                                                                  | beta.31 | Login social (Google + GitHub) sem precisar gerenciar senha         |
| [React](https://react.dev)                                                                         | 19      | Base do frontend                                                    |

### Banco de dados

| Tecnologia                               | Por quê                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------- |
| [PostgreSQL](https://www.postgresql.org) | Banco relacional robusto, suporte nativo a enums e constraints            |
| [Neon](https://neon.tech)                | PostgreSQL serverless, free tier generoso, região `sa-east-1` (São Paulo) |

### Qualidade de código

| Ferramenta                    | Função                                                        |
| ----------------------------- | ------------------------------------------------------------- |
| ESLint + `@typescript-eslint` | Lint estático com regras TypeScript                           |
| Prettier                      | Formatação automática, 2 espaços, single quotes               |
| Husky + lint-staged           | Lint e format rodando no pre-commit                           |
| Commitlint                    | Força [Conventional Commits](https://conventionalcommits.org) |
| GitHub Actions                | CI em todo PR — bloqueia merge se lint ou typecheck falhar    |

### Deploy

| Serviço                      | Uso                                     |
| ---------------------------- | --------------------------------------- |
| [Vercel](https://vercel.com) | Deploy automático a cada push na `main` |
| [Neon](https://neon.tech)    | Banco em produção, região São Paulo     |

---

## Cron de resultados

Os placares são sincronizados automaticamente via [football-data.org](https://www.football-data.org) (free tier). O cron roda via **GitHub Actions** a cada 15 minutos e, quando um jogo termina, busca o placar final, atualiza o `Match` no banco e calcula os pontos para todos os palpites daquele jogo.

```
GitHub Actions (a cada 15 min)
  → GET /api/cron/resultados  (autenticado via CRON_SECRET)
    → football-data.org API
      → Match FINISHED? → atualiza placar no banco
        → calcula pontos de cada Prediction (lib/scoring.ts)
```

| Componente                   | Função                                                  |
| ---------------------------- | ------------------------------------------------------- |
| `.github/workflows/cron.yml` | Agenda e dispara o job a cada 15 min                    |
| `GET /api/cron/resultados`   | Route handler protegida por `CRON_SECRET`               |
| `lib/football-api.ts`        | Client da football-data.org com rate limiting e timeout |
| `lib/scoring.ts`             | Motor de pontuação — função pura chamada pelo cron      |

**GitHub Secrets necessários para o cron:**

```
APP_URL        # URL da aplicação em produção (ex: https://brasa-pi.vercel.app)
CRON_SECRET    # mesmo valor definido em CRON_SECRET no ambiente Vercel
```

---

## Arquitetura

```
brasa/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Rotas públicas
│   │   │   └── login/          # Página de login (Google + GitHub)
│   │   ├── (main)/             # Rotas protegidas
│   │   │   ├── jogos/          # 48 jogos com formulário de palpite inline
│   │   │   ├── palpites/       # Histórico de palpites agrupado por status
│   │   │   ├── ranking/        # Leaderboard com top 3 e rank badges
│   │   │   └── perfil/         # Stats pessoais, rank, conquistas, progressão
│   │   ├── admin/              # Painel admin (guard por role ADMIN)
│   │   │   ├── jogos/          # Gestão de jogos
│   │   │   └── resultados/     # Override manual de resultados
│   │   └── api/
│   │       ├── auth/           # NextAuth handlers
│   │       ├── jogos/          # GET — lista 48 jogos
│   │       ├── palpites/       # GET/POST — histórico e salvar palpites
│   │       └── cron/
│   │           └── resultados/ # Cron job — busca placares e calcula pontos
│   ├── components/
│   │   ├── brasa/              # Logo e identidade visual
│   │   ├── jogos/              # Cards e lista de jogos
│   │   ├── palpites/           # Formulário e histórico de palpites
│   │   ├── ranking/            # Tabela de ranking
│   │   └── ui/                 # shadcn/ui (gerado)
│   ├── lib/
│   │   ├── auth.ts             # Configuração NextAuth + session callbacks
│   │   ├── auth.config.ts      # Config edge-safe para middleware
│   │   ├── db.ts               # Prisma Client singleton (Neon adapter)
│   │   ├── football-api.ts     # Client football-data.org (rate limit + timeout)
│   │   ├── gamification.ts     # Sistema de ranks e progressão
│   │   ├── scoring.ts          # Motor de pontuação (função pura)
│   │   └── utils.ts            # cn() e helpers
│   ├── hooks/                  # React hooks customizados
│   └── types/                  # Tipos globais
├── prisma/
│   ├── schema.prisma           # Fonte de verdade do banco
│   └── seed.ts                 # 48 jogos da Copa 2026
└── .github/
    └── workflows/
        ├── ci.yml              # CI: lint + typecheck em PRs
        └── cron.yml            # Cron: atualiza placares a cada 15 min
```

### Modelo de dados

```
User ──< Prediction >── Match
 └──< Account
 └──< Session
```

- **User** — conta criada via login social; tem role USER ou ADMIN
- **Match** — os 48 jogos da Copa (fases GROUP até FINAL), com status SCHEDULED/LIVE/FINISHED/CANCELLED
- **Prediction** — palpite de um usuário para um jogo (placar + artilheiro opcional); armazena `pointsEarned` e flag `calculated`
- **Account / Session** — gerenciados pelo NextAuth v5

---

## Rodando local

### Pré-requisitos

- Node.js 20+
- pnpm 9+
- Conta no [Neon](https://neon.tech) (free tier) ou PostgreSQL local
- API key gratuita em [football-data.org](https://www.football-data.org/client/register)

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/mauricioandrade/brasa.git
cd brasa

# 2. Instale as dependências
pnpm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
```

Preencha o `.env.local`:

```env
# Banco de dados (Neon)
DATABASE_URL="postgresql://..."     # connection pooling
DIRECT_URL="postgresql://..."       # direct connection (migrations)

# NextAuth
AUTH_SECRET="..."                   # openssl rand -base64 32
AUTH_URL="http://localhost:3000"    # URL base da aplicação

# OAuth — Google
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."

# OAuth — GitHub
AUTH_GITHUB_ID="..."
AUTH_GITHUB_SECRET="..."

# Resultados automáticos
FOOTBALL_DATA_API_KEY="..."         # football-data.org (free tier)
CRON_SECRET="..."                   # openssl rand -base64 32
```

```bash
# 4. Rode as migrations e o seed
pnpm db:push
pnpm db:seed

# 5. Inicie o servidor de desenvolvimento
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Scripts disponíveis

```bash
pnpm dev            # servidor de desenvolvimento
pnpm build          # prisma generate + build de produção
pnpm start          # servidor de produção
pnpm lint           # ESLint (0 warnings tolerados)
pnpm lint:fix       # ESLint com auto-fix
pnpm format         # Prettier em todo src/
pnpm format:check   # Verifica formatação sem alterar
pnpm typecheck      # tsc --noEmit
pnpm db:generate    # prisma generate
pnpm db:migrate     # nova migration (dev)
pnpm db:push        # push do schema sem migration (dev rápido)
pnpm db:studio      # Prisma Studio (UI do banco)
pnpm db:seed        # popular com os 48 jogos
```

---

## Contribuindo

Contribuições são bem-vindas! Leia o [CONTRIBUTING.md](./CONTRIBUTING.md) antes de abrir um PR.

### Fluxo rápido

```bash
# 1. Fork e clone
git clone https://github.com/mauricioandrade/brasa.git

# 2. Crie uma branch
git checkout -b feat/minha-feature

# 3. Faça as mudanças e commite
git commit -m "feat: adicionar filtro por grupo na página de jogos"

# 4. Abra um PR para a branch develop
```

### Padrão de commits

```
feat:     nova funcionalidade
fix:      correção de bug
docs:     documentação
refactor: refatoração sem mudança de comportamento
perf:     otimização de performance
test:     testes
chore:    manutenção, dependências
ci:       CI/CD
```

> O Commitlint vai rejeitar commits fora do padrão. O CI vai rejeitar PRs com lint ou typecheck falhando.

### Roadmap

Veja as [milestones](https://github.com/mauricioandrade/brasa/milestones) e as [issues abertas](https://github.com/mauricioandrade/brasa/issues) para saber o que está em andamento.

| Milestone                                              | Status       |
| ------------------------------------------------------ | ------------ |
| v0.1 — Base (scaffold, auth, banco, deploy)            | ✅ Concluído |
| v0.2 — Palpites (jogos, formulário, kickoff lock)      | ✅ Concluído |
| v0.3 — Pontuação (motor de pontos, cron de resultados) | ✅ Concluído |
| v0.4 — Ranking (ranking geral, perfil, gamificação)    | ✅ Concluído |
| v1.0 — Copa ao vivo (ao vivo, mata-mata, performance)  | ⏳ Pendente  |

---

## Licença

MIT © 2026 — feito com 🔥 para a Copa do Mundo

---

<div align="center">

**🇧🇷 Feito no Brasil, para o Brasil, na Copa do Brasil**

</div>
