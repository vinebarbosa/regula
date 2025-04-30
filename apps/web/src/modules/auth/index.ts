import NextAuth from "next-auth"
import { GovBr } from "./providers/gov-br"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GovBr],
  pages: {
    signIn: '/'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  }
})
