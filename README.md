# Brasa

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

Acesse `http://localhost:3000`

## Contribuindo

Todo PR passa pelo CI (lint + typecheck).
Padrão de commits: [Conventional Commits](https://conventionalcommits.org)

```
feat: adicionar página de ranking
fix: corrigir cálculo de pontos no mata-mata
docs: atualizar instruções de setup
```

## Licença

MIT
