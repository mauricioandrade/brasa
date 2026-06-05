import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = new PrismaClient({ adapter } as any)

const matches = [
  // ── Grupo A ── México · África do Sul · Coreia do Sul · Rep. Tcheca
  {
    homeTeam: 'México',
    awayTeam: 'África do Sul',
    homeFlag: '🇲🇽',
    awayFlag: '🇿🇦',
    group: 'A',
    scheduledAt: new Date('2026-06-11T19:00:00Z'),
  },
  {
    homeTeam: 'Coreia do Sul',
    awayTeam: 'Rep. Tcheca',
    homeFlag: '🇰🇷',
    awayFlag: '🇨🇿',
    group: 'A',
    scheduledAt: new Date('2026-06-12T02:00:00Z'),
  },
  {
    homeTeam: 'Rep. Tcheca',
    awayTeam: 'África do Sul',
    homeFlag: '🇨🇿',
    awayFlag: '🇿🇦',
    group: 'A',
    scheduledAt: new Date('2026-06-18T16:00:00Z'),
  },
  {
    homeTeam: 'México',
    awayTeam: 'Coreia do Sul',
    homeFlag: '🇲🇽',
    awayFlag: '🇰🇷',
    group: 'A',
    scheduledAt: new Date('2026-06-19T01:00:00Z'),
  },
  {
    homeTeam: 'Rep. Tcheca',
    awayTeam: 'México',
    homeFlag: '🇨🇿',
    awayFlag: '🇲🇽',
    group: 'A',
    scheduledAt: new Date('2026-06-25T01:00:00Z'),
  },
  {
    homeTeam: 'África do Sul',
    awayTeam: 'Coreia do Sul',
    homeFlag: '🇿🇦',
    awayFlag: '🇰🇷',
    group: 'A',
    scheduledAt: new Date('2026-06-25T01:00:00Z'),
  },

  // ── Grupo B ── Canadá · Catar · Suíça · Bósnia e Herzegovina
  {
    homeTeam: 'Canadá',
    awayTeam: 'Bósnia e Herzegovina',
    homeFlag: '🇨🇦',
    awayFlag: '🇧🇦',
    group: 'B',
    scheduledAt: new Date('2026-06-12T19:00:00Z'),
  },
  {
    homeTeam: 'Catar',
    awayTeam: 'Suíça',
    homeFlag: '🇶🇦',
    awayFlag: '🇨🇭',
    group: 'B',
    scheduledAt: new Date('2026-06-13T19:00:00Z'),
  },
  {
    homeTeam: 'Suíça',
    awayTeam: 'Bósnia e Herzegovina',
    homeFlag: '🇨🇭',
    awayFlag: '🇧🇦',
    group: 'B',
    scheduledAt: new Date('2026-06-18T19:00:00Z'),
  },
  {
    homeTeam: 'Canadá',
    awayTeam: 'Catar',
    homeFlag: '🇨🇦',
    awayFlag: '🇶🇦',
    group: 'B',
    scheduledAt: new Date('2026-06-18T22:00:00Z'),
  },
  {
    homeTeam: 'Bósnia e Herzegovina',
    awayTeam: 'Catar',
    homeFlag: '🇧🇦',
    awayFlag: '🇶🇦',
    group: 'B',
    scheduledAt: new Date('2026-06-24T19:00:00Z'),
  },
  {
    homeTeam: 'Suíça',
    awayTeam: 'Canadá',
    homeFlag: '🇨🇭',
    awayFlag: '🇨🇦',
    group: 'B',
    scheduledAt: new Date('2026-06-24T19:00:00Z'),
  },

  // ── Grupo C ── Brasil · Marrocos · Haiti · Escócia
  {
    homeTeam: 'Brasil',
    awayTeam: 'Marrocos',
    homeFlag: '🇧🇷',
    awayFlag: '🇲🇦',
    group: 'C',
    scheduledAt: new Date('2026-06-13T22:00:00Z'),
  },
  {
    homeTeam: 'Haiti',
    awayTeam: 'Escócia',
    homeFlag: '🇭🇹',
    awayFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    group: 'C',
    scheduledAt: new Date('2026-06-14T01:00:00Z'),
  },
  {
    homeTeam: 'Escócia',
    awayTeam: 'Marrocos',
    homeFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    awayFlag: '🇲🇦',
    group: 'C',
    scheduledAt: new Date('2026-06-19T22:00:00Z'),
  },
  {
    homeTeam: 'Brasil',
    awayTeam: 'Haiti',
    homeFlag: '🇧🇷',
    awayFlag: '🇭🇹',
    group: 'C',
    scheduledAt: new Date('2026-06-20T00:30:00Z'),
  },
  {
    homeTeam: 'Marrocos',
    awayTeam: 'Haiti',
    homeFlag: '🇲🇦',
    awayFlag: '🇭🇹',
    group: 'C',
    scheduledAt: new Date('2026-06-24T22:00:00Z'),
  },
  {
    homeTeam: 'Escócia',
    awayTeam: 'Brasil',
    homeFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    awayFlag: '🇧🇷',
    group: 'C',
    scheduledAt: new Date('2026-06-24T22:00:00Z'),
  },

  // ── Grupo D ── Estados Unidos · Paraguai · Austrália · Turquia
  {
    homeTeam: 'Estados Unidos',
    awayTeam: 'Paraguai',
    homeFlag: '🇺🇸',
    awayFlag: '🇵🇾',
    group: 'D',
    scheduledAt: new Date('2026-06-13T01:00:00Z'),
  },
  {
    homeTeam: 'Austrália',
    awayTeam: 'Turquia',
    homeFlag: '🇦🇺',
    awayFlag: '🇹🇷',
    group: 'D',
    scheduledAt: new Date('2026-06-14T04:00:00Z'),
  },
  {
    homeTeam: 'Estados Unidos',
    awayTeam: 'Austrália',
    homeFlag: '🇺🇸',
    awayFlag: '🇦🇺',
    group: 'D',
    scheduledAt: new Date('2026-06-19T19:00:00Z'),
  },
  {
    homeTeam: 'Turquia',
    awayTeam: 'Paraguai',
    homeFlag: '🇹🇷',
    awayFlag: '🇵🇾',
    group: 'D',
    scheduledAt: new Date('2026-06-20T03:00:00Z'),
  },
  {
    homeTeam: 'Paraguai',
    awayTeam: 'Austrália',
    homeFlag: '🇵🇾',
    awayFlag: '🇦🇺',
    group: 'D',
    scheduledAt: new Date('2026-06-26T02:00:00Z'),
  },
  {
    homeTeam: 'Turquia',
    awayTeam: 'Estados Unidos',
    homeFlag: '🇹🇷',
    awayFlag: '🇺🇸',
    group: 'D',
    scheduledAt: new Date('2026-06-26T02:00:00Z'),
  },

  // ── Grupo E ── Alemanha · Curaçao · Costa do Marfim · Equador
  {
    homeTeam: 'Alemanha',
    awayTeam: 'Curaçao',
    homeFlag: '🇩🇪',
    awayFlag: '🇨🇼',
    group: 'E',
    scheduledAt: new Date('2026-06-14T17:00:00Z'),
  },
  {
    homeTeam: 'Costa do Marfim',
    awayTeam: 'Equador',
    homeFlag: '🇨🇮',
    awayFlag: '🇪🇨',
    group: 'E',
    scheduledAt: new Date('2026-06-14T23:00:00Z'),
  },
  {
    homeTeam: 'Alemanha',
    awayTeam: 'Costa do Marfim',
    homeFlag: '🇩🇪',
    awayFlag: '🇨🇮',
    group: 'E',
    scheduledAt: new Date('2026-06-20T20:00:00Z'),
  },
  {
    homeTeam: 'Equador',
    awayTeam: 'Curaçao',
    homeFlag: '🇪🇨',
    awayFlag: '🇨🇼',
    group: 'E',
    scheduledAt: new Date('2026-06-21T00:00:00Z'),
  },
  {
    homeTeam: 'Curaçao',
    awayTeam: 'Costa do Marfim',
    homeFlag: '🇨🇼',
    awayFlag: '🇨🇮',
    group: 'E',
    scheduledAt: new Date('2026-06-25T20:00:00Z'),
  },
  {
    homeTeam: 'Equador',
    awayTeam: 'Alemanha',
    homeFlag: '🇪🇨',
    awayFlag: '🇩🇪',
    group: 'E',
    scheduledAt: new Date('2026-06-25T20:00:00Z'),
  },

  // ── Grupo F ── Holanda · Japão · Suécia · Tunísia
  {
    homeTeam: 'Holanda',
    awayTeam: 'Japão',
    homeFlag: '🇳🇱',
    awayFlag: '🇯🇵',
    group: 'F',
    scheduledAt: new Date('2026-06-14T20:00:00Z'),
  },
  {
    homeTeam: 'Suécia',
    awayTeam: 'Tunísia',
    homeFlag: '🇸🇪',
    awayFlag: '🇹🇳',
    group: 'F',
    scheduledAt: new Date('2026-06-15T02:00:00Z'),
  },
  {
    homeTeam: 'Holanda',
    awayTeam: 'Suécia',
    homeFlag: '🇳🇱',
    awayFlag: '🇸🇪',
    group: 'F',
    scheduledAt: new Date('2026-06-20T17:00:00Z'),
  },
  {
    homeTeam: 'Tunísia',
    awayTeam: 'Japão',
    homeFlag: '🇹🇳',
    awayFlag: '🇯🇵',
    group: 'F',
    scheduledAt: new Date('2026-06-21T04:00:00Z'),
  },
  {
    homeTeam: 'Japão',
    awayTeam: 'Suécia',
    homeFlag: '🇯🇵',
    awayFlag: '🇸🇪',
    group: 'F',
    scheduledAt: new Date('2026-06-25T23:00:00Z'),
  },
  {
    homeTeam: 'Tunísia',
    awayTeam: 'Holanda',
    homeFlag: '🇹🇳',
    awayFlag: '🇳🇱',
    group: 'F',
    scheduledAt: new Date('2026-06-25T23:00:00Z'),
  },

  // ── Grupo G ── Espanha · Cabo Verde · Arábia Saudita · Uruguai
  {
    homeTeam: 'Espanha',
    awayTeam: 'Cabo Verde',
    homeFlag: '🇪🇸',
    awayFlag: '🇨🇻',
    group: 'G',
    scheduledAt: new Date('2026-06-15T16:00:00Z'),
  },
  {
    homeTeam: 'Arábia Saudita',
    awayTeam: 'Uruguai',
    homeFlag: '🇸🇦',
    awayFlag: '🇺🇾',
    group: 'G',
    scheduledAt: new Date('2026-06-15T22:00:00Z'),
  },
  {
    homeTeam: 'Espanha',
    awayTeam: 'Arábia Saudita',
    homeFlag: '🇪🇸',
    awayFlag: '🇸🇦',
    group: 'G',
    scheduledAt: new Date('2026-06-21T16:00:00Z'),
  },
  {
    homeTeam: 'Uruguai',
    awayTeam: 'Cabo Verde',
    homeFlag: '🇺🇾',
    awayFlag: '🇨🇻',
    group: 'G',
    scheduledAt: new Date('2026-06-21T22:00:00Z'),
  },
  {
    homeTeam: 'Cabo Verde',
    awayTeam: 'Arábia Saudita',
    homeFlag: '🇨🇻',
    awayFlag: '🇸🇦',
    group: 'G',
    scheduledAt: new Date('2026-06-27T00:00:00Z'),
  },
  {
    homeTeam: 'Uruguai',
    awayTeam: 'Espanha',
    homeFlag: '🇺🇾',
    awayFlag: '🇪🇸',
    group: 'G',
    scheduledAt: new Date('2026-06-27T00:00:00Z'),
  },

  // ── Grupo H ── Bélgica · Egito · Irã · Nova Zelândia
  {
    homeTeam: 'Bélgica',
    awayTeam: 'Egito',
    homeFlag: '🇧🇪',
    awayFlag: '🇪🇬',
    group: 'H',
    scheduledAt: new Date('2026-06-15T19:00:00Z'),
  },
  {
    homeTeam: 'Irã',
    awayTeam: 'Nova Zelândia',
    homeFlag: '🇮🇷',
    awayFlag: '🇳🇿',
    group: 'H',
    scheduledAt: new Date('2026-06-16T01:00:00Z'),
  },
  {
    homeTeam: 'Bélgica',
    awayTeam: 'Irã',
    homeFlag: '🇧🇪',
    awayFlag: '🇮🇷',
    group: 'H',
    scheduledAt: new Date('2026-06-21T19:00:00Z'),
  },
  {
    homeTeam: 'Nova Zelândia',
    awayTeam: 'Egito',
    homeFlag: '🇳🇿',
    awayFlag: '🇪🇬',
    group: 'H',
    scheduledAt: new Date('2026-06-22T01:00:00Z'),
  },
  {
    homeTeam: 'Egito',
    awayTeam: 'Irã',
    homeFlag: '🇪🇬',
    awayFlag: '🇮🇷',
    group: 'H',
    scheduledAt: new Date('2026-06-27T03:00:00Z'),
  },
  {
    homeTeam: 'Nova Zelândia',
    awayTeam: 'Bélgica',
    homeFlag: '🇳🇿',
    awayFlag: '🇧🇪',
    group: 'H',
    scheduledAt: new Date('2026-06-27T03:00:00Z'),
  },

  // ── Grupo I ── França · Senegal · Noruega · Iraque
  {
    homeTeam: 'França',
    awayTeam: 'Senegal',
    homeFlag: '🇫🇷',
    awayFlag: '🇸🇳',
    group: 'I',
    scheduledAt: new Date('2026-06-16T19:00:00Z'),
  },
  {
    homeTeam: 'Iraque',
    awayTeam: 'Noruega',
    homeFlag: '🇮🇶',
    awayFlag: '🇳🇴',
    group: 'I',
    scheduledAt: new Date('2026-06-16T22:00:00Z'),
  },
  {
    homeTeam: 'França',
    awayTeam: 'Iraque',
    homeFlag: '🇫🇷',
    awayFlag: '🇮🇶',
    group: 'I',
    scheduledAt: new Date('2026-06-22T21:00:00Z'),
  },
  {
    homeTeam: 'Noruega',
    awayTeam: 'Senegal',
    homeFlag: '🇳🇴',
    awayFlag: '🇸🇳',
    group: 'I',
    scheduledAt: new Date('2026-06-23T00:00:00Z'),
  },
  {
    homeTeam: 'Noruega',
    awayTeam: 'França',
    homeFlag: '🇳🇴',
    awayFlag: '🇫🇷',
    group: 'I',
    scheduledAt: new Date('2026-06-26T19:00:00Z'),
  },
  {
    homeTeam: 'Senegal',
    awayTeam: 'Iraque',
    homeFlag: '🇸🇳',
    awayFlag: '🇮🇶',
    group: 'I',
    scheduledAt: new Date('2026-06-26T19:00:00Z'),
  },

  // ── Grupo J ── Argentina · Argélia · Áustria · Jordânia
  {
    homeTeam: 'Argentina',
    awayTeam: 'Argélia',
    homeFlag: '🇦🇷',
    awayFlag: '🇩🇿',
    group: 'J',
    scheduledAt: new Date('2026-06-17T01:00:00Z'),
  },
  {
    homeTeam: 'Áustria',
    awayTeam: 'Jordânia',
    homeFlag: '🇦🇹',
    awayFlag: '🇯🇴',
    group: 'J',
    scheduledAt: new Date('2026-06-17T04:00:00Z'),
  },
  {
    homeTeam: 'Argentina',
    awayTeam: 'Áustria',
    homeFlag: '🇦🇷',
    awayFlag: '🇦🇹',
    group: 'J',
    scheduledAt: new Date('2026-06-22T17:00:00Z'),
  },
  {
    homeTeam: 'Jordânia',
    awayTeam: 'Argélia',
    homeFlag: '🇯🇴',
    awayFlag: '🇩🇿',
    group: 'J',
    scheduledAt: new Date('2026-06-23T03:00:00Z'),
  },
  {
    homeTeam: 'Argélia',
    awayTeam: 'Áustria',
    homeFlag: '🇩🇿',
    awayFlag: '🇦🇹',
    group: 'J',
    scheduledAt: new Date('2026-06-28T02:00:00Z'),
  },
  {
    homeTeam: 'Jordânia',
    awayTeam: 'Argentina',
    homeFlag: '🇯🇴',
    awayFlag: '🇦🇷',
    group: 'J',
    scheduledAt: new Date('2026-06-28T02:00:00Z'),
  },

  // ── Grupo K ── Inglaterra · Croácia · Gana · Panamá
  {
    homeTeam: 'Inglaterra',
    awayTeam: 'Croácia',
    homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayFlag: '🇭🇷',
    group: 'K',
    scheduledAt: new Date('2026-06-17T20:00:00Z'),
  },
  {
    homeTeam: 'Gana',
    awayTeam: 'Panamá',
    homeFlag: '🇬🇭',
    awayFlag: '🇵🇦',
    group: 'K',
    scheduledAt: new Date('2026-06-17T23:00:00Z'),
  },
  {
    homeTeam: 'Inglaterra',
    awayTeam: 'Gana',
    homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayFlag: '🇬🇭',
    group: 'K',
    scheduledAt: new Date('2026-06-23T20:00:00Z'),
  },
  {
    homeTeam: 'Panamá',
    awayTeam: 'Croácia',
    homeFlag: '🇵🇦',
    awayFlag: '🇭🇷',
    group: 'K',
    scheduledAt: new Date('2026-06-23T23:00:00Z'),
  },
  {
    homeTeam: 'Croácia',
    awayTeam: 'Gana',
    homeFlag: '🇭🇷',
    awayFlag: '🇬🇭',
    group: 'K',
    scheduledAt: new Date('2026-06-27T21:00:00Z'),
  },
  {
    homeTeam: 'Panamá',
    awayTeam: 'Inglaterra',
    homeFlag: '🇵🇦',
    awayFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    group: 'K',
    scheduledAt: new Date('2026-06-27T21:00:00Z'),
  },

  // ── Grupo L ── Portugal · Uzbequistão · Colômbia · Rep. Dem. do Congo
  {
    homeTeam: 'Portugal',
    awayTeam: 'Rep. Dem. do Congo',
    homeFlag: '🇵🇹',
    awayFlag: '🇨🇩',
    group: 'L',
    scheduledAt: new Date('2026-06-17T17:00:00Z'),
  },
  {
    homeTeam: 'Uzbequistão',
    awayTeam: 'Colômbia',
    homeFlag: '🇺🇿',
    awayFlag: '🇨🇴',
    group: 'L',
    scheduledAt: new Date('2026-06-18T02:00:00Z'),
  },
  {
    homeTeam: 'Portugal',
    awayTeam: 'Uzbequistão',
    homeFlag: '🇵🇹',
    awayFlag: '🇺🇿',
    group: 'L',
    scheduledAt: new Date('2026-06-23T17:00:00Z'),
  },
  {
    homeTeam: 'Colômbia',
    awayTeam: 'Rep. Dem. do Congo',
    homeFlag: '🇨🇴',
    awayFlag: '🇨🇩',
    group: 'L',
    scheduledAt: new Date('2026-06-24T02:00:00Z'),
  },
  {
    homeTeam: 'Colômbia',
    awayTeam: 'Portugal',
    homeFlag: '🇨🇴',
    awayFlag: '🇵🇹',
    group: 'L',
    scheduledAt: new Date('2026-06-27T23:30:00Z'),
  },
  {
    homeTeam: 'Rep. Dem. do Congo',
    awayTeam: 'Uzbequistão',
    homeFlag: '🇨🇩',
    awayFlag: '🇺🇿',
    group: 'L',
    scheduledAt: new Date('2026-06-27T23:30:00Z'),
  },
]

async function main() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Seed não deve rodar em produção')
  }

  console.warn('Seeding matches...')

  await db.match.deleteMany()

  for (const match of matches) {
    await db.match.create({
      data: {
        ...match,
        phase: 'GROUP',
      },
    })
  }

  console.warn(`Seeded ${matches.length} matches.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
