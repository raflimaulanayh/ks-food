import 'next-auth'

declare module 'next-auth' {
  interface User {
    jwt: string
    user: {
      id: string
      email: string
      nik: string
      emailKemenkes: string
      username: string
      firstName: string
      confirmed: boolean
      gender: 'male' | 'female'
      middleName: string
      lastName: string
      institution: string
      country: {
        id: number
        name: string
        highIncome: boolean
      }
      province: {
        id: number
        name: string
      }
      birthDate: Date | string
      phoneNumber: string
      accountComplete: boolean
      role: 'admin' | 'committee' | 'reviewer' | 'authenticated' | 'finance' | 'staff'
      speaker?: boolean
    }
  }

  interface Session {
    jwt: string
    user: User['user']
  }
}
