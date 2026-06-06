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

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

[Demo](https://brasa-pi.vercel.app) · [Abrir issue](https://github.com/mauricioandrade/brasa/issues) · [Contribuir](./CONTRIBUTING.md)

</div>

---

## O que é o Brasa?

O Brasa é um bolão open source da Copa do Mundo 2026 com mecânica de **fantasy points** — você não pontua só acertando o vencedor. Quanto mais ousado e preciso o palpite, mais pontos você acumula.

**104 jogos reais** (72 de fase de grupos + 32 de mata-mata), calendário e resultados atualizados automaticamente via API. Sem taxas, sem premiação em dinheiro. Só a glória de chegar no topo do ranking.

---

## Dados automáticos

O Brasa não exige manutenção manual dos jogos. Tudo é puxado de APIs públicas:

| Fonte           | O que fornece                                                | Atualização        |
| --------------- | ------------------------------------------------------------ | ------------------ |
| **ESPN API**    | Calendário completo (104 jogos), datas, horários, resultados | Cron a cada 15 min |
| **TheSportsDB** | Fotos dos jogadores para as figurinhas                       | Cache 24h (ISR)    |

O cron de resultados roda via **GitHub Actions** a cada 15 minutos. Quando um jogo termina, ele busca o placar final, atualiza o `Match` no banco e calcula os pontos automaticamente:

```
GitHub Actions (a cada 15 min)
  → GET /api/cron/resultados  (autenticado via CRON_SECRET)
    → ESPN API
      → Match FINISHED? → atualiza placar
        → calcula pontos de cada Prediction (lib/scoring.ts)
          → award-resolver computa vencedores da fase automaticamente
```

---

## Funcionalidades

| Funcionalidade                                            | Status   |
| --------------------------------------------------------- | -------- |
| Scaffold Next.js 16 + TypeScript strict + Tailwind 4      | ✅       |
| NextAuth v5 — Google + GitHub OAuth                       | ✅       |
| Prisma 7 + PostgreSQL (Neon) com adapter Neon             | ✅       |
| Schema: User, Account, Session, Match, Prediction         | ✅       |
| Seed: 72 jogos reais da fase de grupos (grupos A–L)       | ✅       |
| Motor de pontuação com normalização de acentos            | ✅       |
| Sistema de ranks: Torcedor → Reserva → Titular → Lenda    | ✅       |
| Rate limiting (10 req/min por usuário)                    | ✅       |
| Cron job GitHub Actions (a cada 15 min)                   | ✅       |
| Security headers + admin guard por role ADMIN             | ✅       |
| CI GitHub Actions (lint + typecheck em PRs)               | ✅       |
| Deploy Vercel (https://brasa-pi.vercel.app)               | ✅       |
| Figurinhas dos jogadores com foto real (TheSportsDB)      | ✅       |
| Banner de estrelas da Copa com scroll infinito            | ✅       |
| Animações com Framer Motion + tsparticles                 | ✅       |
| Painel admin para override de resultados e prêmios        | ✅       |
| Formulário de palpite com cards de foto do artilheiro     | ✅       |
| Ranking com medalhas SVG (ouro/prata/bronze/troféu)       | ✅       |
| Perfil com medalha automática para top 3                  | ✅       |
| Streak de acertos (sequência atual e melhor sequência)    | ✅       |
| 8 conquistas desbloqueáveis no perfil                     | ✅       |
| Leaderboard relativo ("X pts para subir uma posição")     | ✅       |
| Previsões de prêmios por fase (atacante, goleiro, etc.)   | ✅       |
| Auto-resolução de prêmios ao fim de cada fase             | ✅       |
| Página de prêmios `/premios` com cards por fase           | ✅       |
| Conformidade básica com LGPD                              | ✅       |
| Exclusão de conta com confirmação                         | ✅       |
| Fase de mata-mata (32 avos → final)                       | ⏳       |

---

## Sistema de pontuação

| Acerto                        |   Pontos |
| ----------------------------- | -------: |
| 🏆 Placar exato               |    **7** |
| ✅ Vencedor correto           |    **3** |
| 🤝 Empate correto             |    **4** |
| ⚽ Artilheiro do jogo         |    **2** |
| 🏅 Prêmio de fase correto     |    **5** |
| 🔥 Multiplicador mata-mata    | **1.5×** |

> Os palpites fecham automaticamente **5 minutos antes do kickoff**. Sem volta.

### Prêmios de fase

Antes de cada fase, os usuários apostam em quatro categorias. Quando todos os jogos da fase encerram, o sistema auto-computa os vencedores a partir dos dados do banco:

| Categoria         | Como é calculado                                         |
| ----------------- | -------------------------------------------------------- |
| ⚽ Artilheiro     | Jogador mais vezes registrado como `topScorerName`       |
| 🧤 Melhor goleiro | Goleiro do time com menos gols sofridos na fase          |
| 🛡️ Melhor defesa  | Time com menos gols sofridos (desempate alfabético)      |
| ⭐ Melhor jogador | Mesmo critério do artilheiro                             |

### Sistema de ranks

| Rank        | Mínimo   |
| ----------- | -------- |
| 🟤 Torcedor | 0 pts    |
| ⚪ Reserva  | 50 pts   |
| 🟡 Titular  | 150 pts  |
| 🟠 Craque   | 350 pts  |
| 🔴 Fenômeno | 700 pts  |
| 🏆 Lenda    | 1200 pts |

---

## Stack

### Frontend

| Tecnologia                                     | Versão | Por quê                                   |
| ---------------------------------------------- | ------ | ----------------------------------------- |
| [Next.js](https://nextjs.org)                  | 16     | App Router, RSC, deploy trivial na Vercel |
| [TypeScript](https://www.typescriptlang.org)   | 5      | Strict mode                               |
| [Tailwind CSS](https://tailwindcss.com)        | 4      | Paleta customizada verde/amarelo Brasil   |
| [Framer Motion](https://www.framer.com/motion) | 12     | Animações de entrada e hover              |
| [tsparticles](https://particles.js.org)        | 4      | Efeito de brasa/faíscas na tela inicial   |
| [Lucide React](https://lucide.dev)             | latest | Ícones                                    |

### Backend

| Tecnologia                                        | Versão  | Por quê                                 |
| ------------------------------------------------- | ------- | --------------------------------------- |
| [Next.js API Routes](https://nextjs.org/docs/app) | 16      | Fullstack no mesmo projeto              |
| [Prisma](https://www.prisma.io)                   | 7       | ORM type-safe com migrations            |
| [NextAuth v5](https://authjs.dev)                 | beta.31 | Login social (Google + GitHub)          |
| [Neon](https://neon.tech)                         | —       | PostgreSQL serverless, região São Paulo |

### APIs externas

| API                                        | Uso                             | Auth                 |
| ------------------------------------------ | ------------------------------- | -------------------- |
| [ESPN API](https://site.api.espn.com)      | Calendário e resultados da Copa | Pública, sem chave   |
| [TheSportsDB](https://www.thesportsdb.com) | Fotos dos jogadores             | Free tier, chave `3` |

---

## Arquitetura

```
brasa/
├── src/
│   ├── app/
│   │   ├── (auth)/login/           # Login (Google + GitHub)
│   │   ├── (main)/
│   │   │   ├── jogos/              # Jogos com palpite inline e figurinhas
│   │   │   ├── palpites/           # Histórico agrupado com total de pts
│   │   │   ├── ranking/            # Leaderboard + medalhas SVG + relativo
│   │   │   ├── premios/            # Prêmios por fase + previsões do usuário
│   │   │   ├── perfil/             # Stats, rank, conquistas, medalha top 3
│   │   │   ├── privacidade/        # Política de privacidade (LGPD)
│   │   │   └── termos/             # Termos de uso
│   │   ├── admin/
│   │   │   ├── jogos/              # Gerenciar jogos
│   │   │   ├── resultados/         # Lançar resultados e artilheiros
│   │   │   └── premios/            # Cadastrar prêmios de fase
│   │   └── api/
│   │       ├── auth/               # NextAuth handlers
│   │       ├── jogos/              # GET — lista jogos
│   │       ├── jogos/proximos/     # GET — próximos 3 jogos
│   │       ├── palpites/           # GET/POST — histórico e salvar palpites
│   │       ├── premios/            # GET — prêmios de fase
│   │       ├── award-predictions/  # GET/POST — previsões de prêmios
│   │       ├── award-candidates/   # GET — candidatos por categoria
│   │       ├── admin/resolve-phase/# POST — resolver fase manualmente
│   │       ├── players/
│   │       │   ├── top/            # GET — estrelas da Copa (banner)
│   │       │   └── photo/          # GET — foto via TheSportsDB (timeout 5s)
│   │       └── cron/resultados/    # Cron — placares e pontos automáticos
│   ├── components/
│   │   ├── brasa/                  # Logo, home animada, figurinhas, medalhas SVG
│   │   ├── jogos/                  # Cards de jogo com figurinhas das estrelas
│   │   ├── layout/                 # Header, footer, cookie banner, nav
│   │   ├── lgpd/                   # Cookie banner
│   │   ├── palpites/               # Formulário com foto do artilheiro, histórico
│   │   ├── perfil/                 # Barra de progresso, exclusão de conta
│   │   ├── premios/                # Cards de prêmio, abas de fase, previsões
│   │   ├── ranking/                # Tabela com medalhas SVG e highlight do usuário
│   │   └── ui/                     # shadcn/ui
│   └── lib/
│       ├── auth.ts                 # NextAuth config + promoção admin via env
│       ├── award-resolver.ts       # Auto-computa vencedores de fase
│       ├── db.ts                   # Prisma Client (Neon adapter)
│       ├── gamification.ts         # Ranks, progressão e streaks
│       ├── scoring.ts              # Motor de pontuação (normaliza acentos)
│       └── team-data.ts            # Cores, estrelas e goleiros das 48 seleções
├── prisma/
│   ├── schema.prisma               # Fonte de verdade do banco
│   └── seed.ts                     # 72 jogos reais da fase de grupos (A–L)
├── scripts/
│   └── make-admin.ts               # Promove usuário a ADMIN por e-mail
└── .github/workflows/
    ├── ci.yml                      # CI: lint + typecheck em PRs
    └── cron.yml                    # Cron: atualiza placares a cada 15 min
```

### Modelo de dados

```
User ──< Prediction >── Match
 │   └──< AwardPrediction
 └──< Account
 └──< Session

Match ──< PhaseAward (vencedores auto-computados por fase)
```

- **User** — conta OAuth (Google ou GitHub); role USER ou ADMIN
- **Match** — jogo da Copa com status SCHEDULED/LIVE/FINISHED/CANCELLED
- **Prediction** — palpite com placar + artilheiro opcional; armazena `pointsEarned` e flag `calculated`
- **AwardPrediction** — aposta do usuário no melhor jogador por categoria/fase
- **PhaseAward** — vencedor oficial de cada categoria por fase (auto-resolvido)

---

## Rodando local

**Pré-requisitos:** Node.js 20+, pnpm 9+, conta no [Neon](https://neon.tech) (free tier)

```bash
git clone https://github.com/mauricioandrade/brasa.git
cd brasa
pnpm install
cp .env.example .env.local
```

Preencha o `.env.local`:

```env
DATABASE_URL="postgresql://..."      # Neon connection pooling
DIRECT_URL="postgresql://..."        # Neon direct (migrations)
AUTH_SECRET="..."                    # openssl rand -base64 32
AUTH_URL="http://localhost:3000"
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."
AUTH_GITHUB_ID="..."
AUTH_GITHUB_SECRET="..."
CRON_SECRET="..."                    # openssl rand -base64 32
ADMIN_EMAILS="voce@email.com"        # Separar por vírgula para múltiplos admins
```

```bash
pnpm db:push          # aplica o schema
pnpm db:seed          # 72 jogos reais da fase de grupos
pnpm dev              # http://localhost:3000
```

### Scripts

```bash
pnpm dev            # servidor de desenvolvimento
pnpm build          # prisma generate + build de produção
pnpm lint           # ESLint (0 warnings tolerados)
pnpm typecheck      # tsc --noEmit
pnpm db:seed        # popular com os 72 jogos da fase de grupos
pnpm db:studio      # Prisma Studio (UI do banco)
```

---

## Tornando-se admin

Com OAuth puro (Google/GitHub), há duas formas de obter role ADMIN:

**Via env var (recomendado):** adicione seu e-mail em `ADMIN_EMAILS` no `.env.local` e faça login. O sistema promove automaticamente.

**Via script (imediato):** se já tem conta criada:

```bash
npx tsx scripts/make-admin.ts voce@email.com
```

Após virar admin, acesse `/admin/jogos`, `/admin/resultados` e `/admin/premios`.

---

## LGPD

O Brasa implementa os requisitos básicos da Lei Geral de Proteção de Dados:

- **`/privacidade`** — política de privacidade completa
- **`/termos`** — termos de uso do bolão
- Cookie banner não-bloqueante com consentimento via localStorage
- Exclusão de conta com confirmação (digitar "EXCLUIR") e cascata no banco

---

## Contribuindo

Contribuições são bem-vindas! Leia o [CONTRIBUTING.md](./CONTRIBUTING.md) antes de abrir um PR.

### Padrão de commits

```
feat:     nova funcionalidade
fix:      correção de bug
docs:     documentação
style:    visual/UI sem mudança de lógica
refactor: refatoração
chore:    manutenção, dependências
ci:       CI/CD
```

### Roadmap

| Milestone                                              | Status       |
| ------------------------------------------------------ | ------------ |
| v0.1 — Base (scaffold, auth, banco, deploy)            | ✅ Concluído |
| v0.2 — Palpites (jogos, formulário, kickoff lock)      | ✅ Concluído |
| v0.3 — Pontuação (motor de pontos, cron de resultados) | ✅ Concluído |
| v0.4 — Ranking (ranking geral, perfil, gamificação)    | ✅ Concluído |
| v0.5 — Visual (figurinhas, animações, identidade)      | ✅ Concluído |
| v0.6 — Gamificação avançada (prêmios, medalhas, streaks) | ✅ Concluído |
| v0.7 — Segurança e LGPD                               | ✅ Concluído |
| v1.0 — Copa ao vivo (mata-mata, ao vivo, performance)  | ⏳ Pendente  |

---

## Licença

MIT © 2026 — feito com 🔥 para a Copa do Mundo

---

<div align="center">

**🇧🇷 Feito no Brasil, para o Brasil, na Copa do Brasil**

por [@mauricioandrade](https://github.com/mauricioandrade)

</div>
