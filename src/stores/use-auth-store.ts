import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string
  role: 'PIMPINAN' | 'ADMIN' | 'FINANCE' | 'PROCUREMENT' | 'QC_LAB' | 'HR' | 'WAREHOUSE' | 'PRODUCTION' | 'QC_INBOUND'
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (userInfo: Partial<User>) => void
  logout: (isOperation?: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (userInfo) => {
        // Mock full user data based on input + defaults
        const mockUser: User = {
          id: 'user-001', // Static ID for prototype
          name: userInfo.name || 'Rafli Maulana',
          email: userInfo.email || 'rafli@example.com',
          phone: userInfo.phone || '081234567890',
          address: userInfo.address || 'Jl. Dago No. 101',
          city: userInfo.city || 'Bandung',
          zipCode: userInfo.zipCode || '40135',
          role: userInfo.role || 'ADMIN'
        }
        set({ user: mockUser, isAuthenticated: true })
      },
      logout: (isOperation?: boolean) => {
        set({ user: null, isAuthenticated: false })
        window.location.href = isOperation ? '/operation/login' : '/internal/login'
      }
    }),
    {
      name: 'ks-food-auth'
    }
  )
)
