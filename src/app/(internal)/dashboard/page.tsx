'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (mounted && !isAuthenticated) {
      router.push('/internal/login')
    }
  }, [isAuthenticated, router, mounted])

  if (!mounted || !user) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard - {user.role}</h1>
          <p className="text-sm text-slate-500">Selamat datang kembali, {user.name}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-slate-600">Dashboard untuk role {user.role} sedang dalam pengembangan.</p>
        <p className="mt-2 text-sm text-slate-400">Data dan grafik akan segera ditampilkan di sini.</p>
      </div>
    </div>
  )
}
