import 'next-auth'

declare module 'next-auth/jwt' {
  interface JWT {
    jwt: string
    user: Session['user']
  }
}
