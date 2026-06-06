import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import { PrismaAdapter } from '@auth/prisma-adapter'

import { authConfig } from '@/auth.config'

import { db } from './db'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user }) {
      const adminEmails = (process.env.ADMIN_EMAILS ?? '')
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean)

      if (user.email && adminEmails.includes(user.email.toLowerCase())) {
        await db.user.update({
          where: { email: user.email },
          data: { role: 'ADMIN' },
        })
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role: 'USER' | 'ADMIN' }).role ?? 'USER'
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = (token.role as 'USER' | 'ADMIN') ?? 'USER'
      return session
    },
  },
})
