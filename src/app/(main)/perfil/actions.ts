'use server'

import { redirect } from 'next/navigation'

import { signOut } from '@/lib/auth'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function deleteAccount() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  await db.session.deleteMany({ where: { userId: session.user.id } })
  await db.user.delete({ where: { id: session.user.id } })

  await signOut({ redirect: false })
  redirect('/login?deleted=true')
}
