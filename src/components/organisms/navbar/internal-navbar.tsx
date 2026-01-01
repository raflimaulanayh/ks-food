'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { List } from '@phosphor-icons/react'

import { Container } from '@/components/templates/container'

interface InternalNavbarProps {
  onMenuClick: () => void
}

export const InternalNavbar = ({ onMenuClick }: InternalNavbarProps) => {
  const { user } = useAuthStore()

  return (
    <header className="flex h-16 items-center border-b bg-white shadow-sm">
      <Container className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="rounded-md p-2 text-slate-500 hover:bg-slate-100 lg:hidden">
            <List size={24} />
          </button>
          <h2 className="text-lg font-semibold text-slate-800">Welcome back, {user?.name.split(' ')[0]}!</h2>
        </div>

        <div className="flex items-center gap-4 max-sm:hidden">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs font-medium text-slate-600">System Online</span>
          </div>
        </div>
      </Container>
    </header>
  )
}
