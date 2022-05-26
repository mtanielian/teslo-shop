import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import { loginUser, loginUserOauth } from "../../../lib/user";



export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Custom Login',
      credentials: {
        email: { label: "Correo", type: "email", placeholder: "juan@gmail.com" },
        password: { label: "Contraseña", type: "password", placeholder: 'Contraseña' }
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials
        const user = await loginUser({ email, password})
        return user
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/login',
    newUser: 'auth/register'
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        const { type, access_token, provider = '' } = account
        token.accessToken = access_token
        
        switch (type) {
          case 'oauth':
            const { email = '', name = '' } = user
            token.user = await loginUserOauth({ email, name, provider })
            break
          case 'credentials':
            token.user = user || {}
            break
        }
      }
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      session.user = token.user
      return session
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt',
    updateAge: 86400, // cada día
  },
})