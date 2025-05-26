import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    tokenType?: string
    expiresIn?: number
    user: {
      id: string
      role: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role: string
    accessToken: string
    tokenType: string
    expiresIn: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken?: string
    role?: string
    tokenType?: string
    expiresIn?: number
  }
}
