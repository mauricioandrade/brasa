# Brasa — Design System

## Color Strategy: Committed

Verde and Amarelo carry 30–60% of active/interactive surfaces. Azul is the night sky behind everything. The overall feel is a Brazilian summer night at a bar with a TV on.

## Colors (Tailwind v4 CSS variables, defined in globals.css)

| Role        | Token                                 | Value   | Usage                               |
| ----------- | ------------------------------------- | ------- | ----------------------------------- |
| Background  | `bg-brasa-bg`                         | #001a0a | Page backgrounds                    |
| Surface     | `bg-brasa-surface`                    | #0d1f0f | Cards, inputs                       |
| Verde 500   | `text-verde-500` / `bg-verde-500`     | #009c3b | Primary actions, CTAs, success      |
| Verde 600   | `bg-verde-600`                        | #008a34 | Hover on verde CTAs                 |
| Amarelo 400 | `text-amarelo-400`                    | #ffdf00 | Points, scores, rank gold, headings |
| Azul 500    | `bg-azul-500`                         | #002776 | Logo emblem, tertiary accent        |
| White       | `text-white`                          | #ffffff | Primary text                        |
| Muted text  | `text-white/60`                       | —       | Secondary text                      |
| Subtle text | `text-white/30`                       | —       | Tertiary, hints                     |
| Borders     | `border-white/5` to `border-white/15` | —       | Card borders                        |

## Typography

| Role               | Font                        | Weight  | Size    |
| ------------------ | --------------------------- | ------- | ------- |
| Display / headings | Bebas Neue (`font-display`) | 400     | 3xl–6xl |
| Body               | Inter (`font-sans`)         | 400–600 | sm–base |
| Scores/points      | Bebas Neue                  | 400     | 2xl–4xl |
| Labels/meta        | Inter                       | 400     | xs–sm   |

## Spacing & Layout

- Max content width: `max-w-2xl` (42rem) — keeps focus, reads well on mobile
- Page padding: `px-4 sm:px-6`
- Section gaps: `gap-8` between major sections, `gap-3` between cards
- Card padding: `p-4` standard, `p-5` for featured

## Elevation

- Level 0: page background (`bg-brasa-bg`)
- Level 1: cards (`bg-brasa-surface`, `border border-white/5`)
- Level 2: active/hover states (slightly lighter surface, brighter border)
- Level 3: overlays, dropdowns (`backdrop-blur`, `bg-brasa-bg/90`)

## Components

### Cards

- Rounded: `rounded-xl` (standard), `rounded-2xl` (featured)
- Border: `border border-white/5` standard, `border-verde-500/30` active, `border-amarelo-400/20` top-3/special
- NO side-stripe borders
- NO glassmorphism by default

### Buttons

- Primary: `bg-verde-500 hover:bg-verde-600 text-white rounded-full`
- Secondary: `border border-white/15 hover:border-white/30 text-white/70 hover:text-white rounded-full`
- Destructive/neutral: bare text with hover color change

### Badges

- Status LIVE: red dot + pulse animation + "AO VIVO" text
- Status FINISHED: muted text
- Ranks: emoji + colored name text

## Motion

- Library: Framer Motion
- Entrance: `opacity 0→1` + `y 20→0`, `ease: 'easeOut'`, duration 0.4–0.5s
- Stagger: 0.1s between items
- Hover: `scale: 1.01` on cards, duration 0.15s
- Progress bars: `width 0→X%`, duration 1s easeOut
- NO bounce, NO elastic, NO springs on UI elements

## Iconography

- Library: Lucide React (already installed)
- Size: 16px (sm), 20px (md), 24px (lg)
- Color: inherit from text

## Absolute Bans (from impeccable)

- Side-stripe borders
- Gradient text
- Glassmorphism as default
- Hero-metric template (big number + gradient card)
- Identical card grids
- Modal as first thought
