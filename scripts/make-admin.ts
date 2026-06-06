import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  const email = process.argv[2]
  if (!email) {
    console.error('Uso: npx tsx scripts/make-admin.ts email@exemplo.com')
    process.exit(1)
  }

  const user = await db.user.findUnique({ where: { email } })
  if (!user) {
    console.error(`Usuário não encontrado: ${email}`)
    console.error('O usuário precisa ter feito login ao menos uma vez.')
    process.exit(1)
  }

  await db.user.update({ where: { email }, data: { role: 'ADMIN' } })
  console.log(`✓ ${user.name ?? email} agora é ADMIN.`)
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
