import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isPublicRoute = nextUrl.pathname === '/'
      const isAuthRoute = nextUrl.pathname.startsWith('/login')

      if (isPublicRoute || isAuthRoute) return true
      if (!isLoggedIn) return false
      return true
    },
  },
  providers: [],
}
