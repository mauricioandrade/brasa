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

[![CI](https://github.com/mauricioandrade/brasa/actions/workflows/ci.yml/badge.svg)](https://github.com/mauricioandrade/brasa/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

[Demo](https://brasa.vercel.app) · [Abrir issue](https://github.com/mauricioandrade/brasa/issues) · [Contribuir](./CONTRIBUTING.md)

</div>

---

## O que é o Brasa?

O Brasa é um bolão open source da Copa do Mundo 2026 com mecânica de **fantasy points** — você não pontua só acertando o vencedor. Quanto mais ousado e preciso o palpite, mais pontos você acumula.

Sem taxas, sem premiação em dinheiro. Só a glória de chegar no topo do ranking.

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

---

## Stack

### Frontend

| Tecnologia                                   | Versão | Por quê                                                   |
| -------------------------------------------- | ------ | --------------------------------------------------------- |
| [Next.js](https://nextjs.org)                | 16     | App Router, RSC, Server Actions, deploy trivial na Vercel |
| [TypeScript](https://www.typescriptlang.org) | 5      | Strict mode — sem `any`, sem surpresa                     |
| [Tailwind CSS](https://tailwindcss.com)      | 4      | Paleta customizada com tokens Brasil (verde/amarelo/azul) |
| [shadcn/ui](https://ui.shadcn.com)           | latest | Componentes acessíveis, sem lock-in de biblioteca         |
| [Lucide React](https://lucide.dev)           | latest | Ícones consistentes e tree-shakeable                      |

### Backend

| Tecnologia                                                                                         | Versão | Por quê                                                             |
| -------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------- |
| [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) | 16     | Fullstack no mesmo projeto, zero overhead                           |
| [Prisma](https://www.prisma.io)                                                                    | 7      | ORM com migrations, type-safe queries, schema como fonte de verdade |
| [NextAuth v5](https://authjs.dev)                                                                  | beta   | Login social (Google + GitHub) sem precisar gerenciar senha         |

### Resultados automáticos

Os placares são **sincronizados automaticamente** via [football-data.org](https://www.football-data.org) (free tier). Um cron job roda a cada 5 minutos durante a Copa e, quando um jogo termina, busca o placar final, atualiza o `Match` no banco e dispara o cálculo de pontos para todos os palpites daquele jogo.

| Componente                 | Função                                                              |
| -------------------------- | ------------------------------------------------------------------- |
| `GET /api/cron/resultados` | Route handler protegida por `CRON_SECRET`, chamada pelo Vercel Cron |
| `lib/football-api.ts`      | Client da football-data.org com cache e tratamento de erros         |
| `lib/scoring.ts`           | Motor de pontuação — função pura chamada pelo cron                  |
| Painel admin               | Fallback para correções manuais quando necessário                   |

> Variável necessária: `FOOTBALL_DATA_API_KEY` (gratuita em [football-data.org](https://www.football-data.org/client/register))

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

| Serviço                      | Uso                                                        |
| ---------------------------- | ---------------------------------------------------------- |
| [Vercel](https://vercel.com) | Deploy automático a cada push na `main` + Vercel Cron Jobs |
| [Neon](https://neon.tech)    | Banco em produção, região São Paulo                        |

---

## Arquitetura

```
brasa/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (auth)/           # Grupo de rotas públicas (login)
│   │   ├── (main)/           # Rotas protegidas (jogos, ranking, palpites)
│   │   ├── admin/            # Painel admin — correções manuais de placar
│   │   └── api/
│   │       ├── auth/         # NextAuth handlers
│   │       ├── jogos/        # CRUD de jogos
│   │       ├── palpites/     # Salvar/consultar palpites
│   │       └── cron/
│   │           └── resultados/ # Cron job — busca placares e calcula pontos
│   ├── components/
│   │   ├── brasa/            # Logo e identidade visual
│   │   ├── jogos/            # Cards e lista de jogos
│   │   ├── palpites/         # Formulário e histórico de palpites
│   │   ├── ranking/          # Tabela de ranking
│   │   └── ui/               # shadcn/ui (gerado)
│   ├── lib/
│   │   ├── auth.ts           # Configuração NextAuth
│   │   ├── db.ts             # Prisma Client singleton
│   │   ├── football-api.ts   # Client football-data.org
│   │   ├── scoring.ts        # Motor de pontuação (função pura)
│   │   └── utils.ts          # cn() e helpers
│   ├── hooks/                # React hooks customizados
│   └── types/                # Tipos globais
├── prisma/
│   ├── schema.prisma         # Fonte de verdade do banco
│   └── seed.ts               # 48 jogos da Copa 2026
└── .github/
    └── workflows/ci.yml      # GitHub Actions
```

### Modelo de dados

```
User ──< Prediction >── Match
```

- **User** — conta criada via login social
- **Match** — os 48 jogos da Copa, atualizado automaticamente pelo cron
- **Prediction** — palpite de um usuário para um jogo (placar + artilheiro)

### Fluxo de resultados

```
Vercel Cron (a cada 5min)
  → GET /api/cron/resultados
    → football-data.org API
      → Match FINISHED? → atualiza placar no banco
        → calcula pontos de cada Prediction
          → revalidateTag('ranking')
```

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
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
AUTH_SECRET="..."               # openssl rand -base64 32
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."
AUTH_GITHUB_ID="..."
AUTH_GITHUB_SECRET="..."
FOOTBALL_DATA_API_KEY="..."     # football-data.org
CRON_SECRET="..."               # openssl rand -base64 32
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
pnpm build          # build de produção
pnpm lint           # ESLint (0 warnings tolerados)
pnpm lint:fix       # ESLint com auto-fix
pnpm format         # Prettier em todo src/
pnpm typecheck      # tsc --noEmit
pnpm db:studio      # Prisma Studio (UI do banco)
pnpm db:migrate     # nova migration
pnpm db:seed        # popular com os 48 jogos
```

---

## Contribuindo

Contribuições são bem-vindas! Leia o [CONTRIBUTING.md](./CONTRIBUTING.md) antes de abrir um PR.

### Fluxo rápido

```bash
# 1. Fork e clone
git clone https://github.com/SEU-USER/brasa.git

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

| Milestone                                              | Status          |
| ------------------------------------------------------ | --------------- |
| v0.1 — Base (scaffold, auth, banco, deploy)            | 🚧 Em andamento |
| v0.2 — Palpites (jogos, formulário, kickoff lock)      | ⏳ Pendente     |
| v0.3 — Pontuação (motor de pontos, cron de resultados) | ⏳ Pendente     |
| v0.4 — Ranking (ranking geral, perfil)                 | ⏳ Pendente     |
| v1.0 — Copa ao vivo (ao vivo, mata-mata, performance)  | ⏳ Pendente     |

---

## Licença

MIT © 2026 — feito com 🔥 para a Copa do Mundo

---

<div align="center">

**🇧🇷 Feito no Brasil, para o Brasil, na Copa do Brasil**

</div>
