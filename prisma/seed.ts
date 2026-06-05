import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = new PrismaClient({ adapter } as any)

const matches = [
  // Grupo A
  {
    homeTeam: 'Estados Unidos',
    awayTeam: 'Panamá',
    homeFlag: '🇺🇸',
    awayFlag: '🇵🇦',
    group: 'A',
    scheduledAt: new Date('2026-06-11T21:00:00-03:00'),
  },
  {
    homeTeam: 'México',
    awayTeam: 'Guatemala',
    homeFlag: '🇲🇽',
    awayFlag: '🇬🇹',
    group: 'A',
    scheduledAt: new Date('2026-06-11T18:00:00-03:00'),
  },
  {
    homeTeam: 'Estados Unidos',
    awayTeam: 'Guatemala',
    homeFlag: '🇺🇸',
    awayFlag: '🇬🇹',
    group: 'A',
    scheduledAt: new Date('2026-06-15T18:00:00-03:00'),
  },
  {
    homeTeam: 'Panamá',
    awayTeam: 'México',
    homeFlag: '🇵🇦',
    awayFlag: '🇲🇽',
    group: 'A',
    scheduledAt: new Date('2026-06-15T21:00:00-03:00'),
  },
  {
    homeTeam: 'Panamá',
    awayTeam: 'Guatemala',
    homeFlag: '🇵🇦',
    awayFlag: '🇬🇹',
    group: 'A',
    scheduledAt: new Date('2026-06-19T18:00:00-03:00'),
  },
  {
    homeTeam: 'México',
    awayTeam: 'Estados Unidos',
    homeFlag: '🇲🇽',
    awayFlag: '🇺🇸',
    group: 'A',
    scheduledAt: new Date('2026-06-19T21:00:00-03:00'),
  },

  // Grupo B
  {
    homeTeam: 'Argentina',
    awayTeam: 'Peru',
    homeFlag: '🇦🇷',
    awayFlag: '🇵🇪',
    group: 'B',
    scheduledAt: new Date('2026-06-12T21:00:00-03:00'),
  },
  {
    homeTeam: 'Chile',
    awayTeam: 'Equador',
    homeFlag: '🇨🇱',
    awayFlag: '🇪🇨',
    group: 'B',
    scheduledAt: new Date('2026-06-12T18:00:00-03:00'),
  },
  {
    homeTeam: 'Argentina',
    awayTeam: 'Chile',
    homeFlag: '🇦🇷',
    awayFlag: '🇨🇱',
    group: 'B',
    scheduledAt: new Date('2026-06-16T21:00:00-03:00'),
  },
  {
    homeTeam: 'Peru',
    awayTeam: 'Equador',
    homeFlag: '🇵🇪',
    awayFlag: '🇪🇨',
    group: 'B',
    scheduledAt: new Date('2026-06-16T18:00:00-03:00'),
  },
  {
    homeTeam: 'Argentina',
    awayTeam: 'Equador',
    homeFlag: '🇦🇷',
    awayFlag: '🇪🇨',
    group: 'B',
    scheduledAt: new Date('2026-06-20T21:00:00-03:00'),
  },
  {
    homeTeam: 'Chile',
    awayTeam: 'Peru',
    homeFlag: '🇨🇱',
    awayFlag: '🇵🇪',
    group: 'B',
    scheduledAt: new Date('2026-06-20T18:00:00-03:00'),
  },

  // Grupo C
  {
    homeTeam: 'Brasil',
    awayTeam: 'México',
    homeFlag: '🇧🇷',
    awayFlag: '🇲🇽',
    group: 'C',
    scheduledAt: new Date('2026-06-13T21:00:00-03:00'),
  },
  {
    homeTeam: 'Japão',
    awayTeam: 'Croácia',
    homeFlag: '🇯🇵',
    awayFlag: '🇭🇷',
    group: 'C',
    scheduledAt: new Date('2026-06-13T18:00:00-03:00'),
  },
  {
    homeTeam: 'Brasil',
    awayTeam: 'Croácia',
    homeFlag: '🇧🇷',
    awayFlag: '🇭🇷',
    group: 'C',
    scheduledAt: new Date('2026-06-17T21:00:00-03:00'),
  },
  {
    homeTeam: 'México',
    awayTeam: 'Japão',
    homeFlag: '🇲🇽',
    awayFlag: '🇯🇵',
    group: 'C',
    scheduledAt: new Date('2026-06-17T18:00:00-03:00'),
  },
  {
    homeTeam: 'Brasil',
    awayTeam: 'Japão',
    homeFlag: '🇧🇷',
    awayFlag: '🇯🇵',
    group: 'C',
    scheduledAt: new Date('2026-06-21T21:00:00-03:00'),
  },
  {
    homeTeam: 'Croácia',
    awayTeam: 'México',
    homeFlag: '🇭🇷',
    awayFlag: '🇲🇽',
    group: 'C',
    scheduledAt: new Date('2026-06-21T18:00:00-03:00'),
  },

  // Grupo D
  {
    homeTeam: 'França',
    awayTeam: 'Austrália',
    homeFlag: '🇫🇷',
    awayFlag: '🇦🇺',
    group: 'D',
    scheduledAt: new Date('2026-06-14T18:00:00-03:00'),
  },
  {
    homeTeam: 'Marrocos',
    awayTeam: 'Tanzânia',
    homeFlag: '🇲🇦',
    awayFlag: '🇹🇿',
    group: 'D',
    scheduledAt: new Date('2026-06-14T21:00:00-03:00'),
  },
  {
    homeTeam: 'França',
    awayTeam: 'Tanzânia',
    homeFlag: '🇫🇷',
    awayFlag: '🇹🇿',
    group: 'D',
    scheduledAt: new Date('2026-06-18T18:00:00-03:00'),
  },
  {
    homeTeam: 'Austrália',
    awayTeam: 'Marrocos',
    homeFlag: '🇦🇺',
    awayFlag: '🇲🇦',
    group: 'D',
    scheduledAt: new Date('2026-06-18T21:00:00-03:00'),
  },
  {
    homeTeam: 'França',
    awayTeam: 'Marrocos',
    homeFlag: '🇫🇷',
    awayFlag: '🇲🇦',
    group: 'D',
    scheduledAt: new Date('2026-06-22T21:00:00-03:00'),
  },
  {
    homeTeam: 'Tanzânia',
    awayTeam: 'Austrália',
    homeFlag: '🇹🇿',
    awayFlag: '🇦🇺',
    group: 'D',
    scheduledAt: new Date('2026-06-22T21:00:00-03:00'),
  },

  // Grupo E
  {
    homeTeam: 'Espanha',
    awayTeam: 'Coreia do Sul',
    homeFlag: '🇪🇸',
    awayFlag: '🇰🇷',
    group: 'E',
    scheduledAt: new Date('2026-06-13T15:00:00-03:00'),
  },
  {
    homeTeam: 'Alemanha',
    awayTeam: 'Bolívia',
    homeFlag: '🇩🇪',
    awayFlag: '🇧🇴',
    group: 'E',
    scheduledAt: new Date('2026-06-13T12:00:00-03:00'),
  },
  {
    homeTeam: 'Espanha',
    awayTeam: 'Alemanha',
    homeFlag: '🇪🇸',
    awayFlag: '🇩🇪',
    group: 'E',
    scheduledAt: new Date('2026-06-17T21:00:00-03:00'),
  },
  {
    homeTeam: 'Coreia do Sul',
    awayTeam: 'Bolívia',
    homeFlag: '🇰🇷',
    awayFlag: '🇧🇴',
    group: 'E',
    scheduledAt: new Date('2026-06-17T15:00:00-03:00'),
  },
  {
    homeTeam: 'Espanha',
    awayTeam: 'Bolívia',
    homeFlag: '🇪🇸',
    awayFlag: '🇧🇴',
    group: 'E',
    scheduledAt: new Date('2026-06-21T21:00:00-03:00'),
  },
  {
    homeTeam: 'Coreia do Sul',
    awayTeam: 'Alemanha',
    homeFlag: '🇰🇷',
    awayFlag: '🇩🇪',
    group: 'E',
    scheduledAt: new Date('2026-06-21T21:00:00-03:00'),
  },

  // Grupo F
  {
    homeTeam: 'Portugal',
    awayTeam: 'Irã',
    homeFlag: '🇵🇹',
    awayFlag: '🇮🇷',
    group: 'F',
    scheduledAt: new Date('2026-06-14T15:00:00-03:00'),
  },
  {
    homeTeam: 'Uruguai',
    awayTeam: 'Angola',
    homeFlag: '🇺🇾',
    awayFlag: '🇦🇴',
    group: 'F',
    scheduledAt: new Date('2026-06-14T12:00:00-03:00'),
  },
  {
    homeTeam: 'Portugal',
    awayTeam: 'Angola',
    homeFlag: '🇵🇹',
    awayFlag: '🇦🇴',
    group: 'F',
    scheduledAt: new Date('2026-06-18T15:00:00-03:00'),
  },
  {
    homeTeam: 'Irã',
    awayTeam: 'Uruguai',
    homeFlag: '🇮🇷',
    awayFlag: '🇺🇾',
    group: 'F',
    scheduledAt: new Date('2026-06-18T12:00:00-03:00'),
  },
  {
    homeTeam: 'Portugal',
    awayTeam: 'Uruguai',
    homeFlag: '🇵🇹',
    awayFlag: '🇺🇾',
    group: 'F',
    scheduledAt: new Date('2026-06-22T21:00:00-03:00'),
  },
  {
    homeTeam: 'Angola',
    awayTeam: 'Irã',
    homeFlag: '🇦🇴',
    awayFlag: '🇮🇷',
    group: 'F',
    scheduledAt: new Date('2026-06-22T21:00:00-03:00'),
  },

  // Grupo G
  {
    homeTeam: 'Inglaterra',
    awayTeam: 'Sérvia',
    homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayFlag: '🇷🇸',
    group: 'G',
    scheduledAt: new Date('2026-06-15T15:00:00-03:00'),
  },
  {
    homeTeam: 'Holanda',
    awayTeam: 'Senegal',
    homeFlag: '🇳🇱',
    awayFlag: '🇸🇳',
    group: 'G',
    scheduledAt: new Date('2026-06-15T12:00:00-03:00'),
  },
  {
    homeTeam: 'Inglaterra',
    awayTeam: 'Holanda',
    homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayFlag: '🇳🇱',
    group: 'G',
    scheduledAt: new Date('2026-06-19T15:00:00-03:00'),
  },
  {
    homeTeam: 'Sérvia',
    awayTeam: 'Senegal',
    homeFlag: '🇷🇸',
    awayFlag: '🇸🇳',
    group: 'G',
    scheduledAt: new Date('2026-06-19T12:00:00-03:00'),
  },
  {
    homeTeam: 'Inglaterra',
    awayTeam: 'Senegal',
    homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayFlag: '🇸🇳',
    group: 'G',
    scheduledAt: new Date('2026-06-23T21:00:00-03:00'),
  },
  {
    homeTeam: 'Holanda',
    awayTeam: 'Sérvia',
    homeFlag: '🇳🇱',
    awayFlag: '🇷🇸',
    group: 'G',
    scheduledAt: new Date('2026-06-23T21:00:00-03:00'),
  },

  // Grupo H
  {
    homeTeam: 'Itália',
    awayTeam: 'Nigéria',
    homeFlag: '🇮🇹',
    awayFlag: '🇳🇬',
    group: 'H',
    scheduledAt: new Date('2026-06-16T15:00:00-03:00'),
  },
  {
    homeTeam: 'Bélgica',
    awayTeam: 'Noruega',
    homeFlag: '🇧🇪',
    awayFlag: '🇳🇴',
    group: 'H',
    scheduledAt: new Date('2026-06-16T12:00:00-03:00'),
  },
  {
    homeTeam: 'Itália',
    awayTeam: 'Noruega',
    homeFlag: '🇮🇹',
    awayFlag: '🇳🇴',
    group: 'H',
    scheduledAt: new Date('2026-06-20T15:00:00-03:00'),
  },
  {
    homeTeam: 'Nigéria',
    awayTeam: 'Bélgica',
    homeFlag: '🇳🇬',
    awayFlag: '🇧🇪',
    group: 'H',
    scheduledAt: new Date('2026-06-20T12:00:00-03:00'),
  },
  {
    homeTeam: 'Itália',
    awayTeam: 'Bélgica',
    homeFlag: '🇮🇹',
    awayFlag: '🇧🇪',
    group: 'H',
    scheduledAt: new Date('2026-06-24T21:00:00-03:00'),
  },
  {
    homeTeam: 'Noruega',
    awayTeam: 'Nigéria',
    homeFlag: '🇳🇴',
    awayFlag: '🇳🇬',
    group: 'H',
    scheduledAt: new Date('2026-06-24T21:00:00-03:00'),
  },
]

async function main() {
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
