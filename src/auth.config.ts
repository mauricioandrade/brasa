import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isPublicRoute = nextUrl.pathname === '/'
      const isAuthRoute = nextUrl.pathname.startsWith('/login')
      const isAdminRoute = nextUrl.pathname.startsWith('/admin')

      if (isPublicRoute || isAuthRoute) return true
      if (!isLoggedIn) return false
      if (isAdminRoute && (auth?.user as { role?: string })?.role !== 'ADMIN') return false
      return true
    },
  },
  providers: [],
}
