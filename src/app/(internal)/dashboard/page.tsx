'use client'

import { MOCK_DATA } from '@/data/mock-dashboard'
import { useAuthStore } from '@/stores/use-auth-store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { RecentActivityList } from '@/components/molecules/dashboard/recent-activity-list'
import { StatCard } from '@/components/molecules/dashboard/stat-card'

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

  // Map user role to MOCK_DATA key
  const roleKey = user.role as keyof typeof MOCK_DATA
  const roleData = MOCK_DATA[roleKey]

  // If roleData not found, show placeholder
  if (!roleData) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard - {user.role}</h1>
          <p className="mt-1 text-sm text-slate-500">Selamat datang kembali, {user.name}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-slate-600">Dashboard untuk role {user.role} sedang dalam pengembangan.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard - {user.role}</h1>
        <p className="mt-1 text-sm text-slate-500">Selamat datang kembali, {user.name}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {roleData.stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            colorScheme={stat.color}
            trend={stat.trend}
            trendValue={stat.trendValue}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Chart 1 */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-slate-800">Trend Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roleData.chart1}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value1" fill="#a31313" name="Primary" />
              {roleData.chart1[0]?.value2 !== undefined && <Bar dataKey="value2" fill="#e87c36" name="Secondary" />}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2 */}
        {roleData.chart2 && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-800">Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roleData.chart2}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value1" fill="#3b82f6" name="Current" />
                {roleData.chart2[0]?.value2 !== undefined && <Bar dataKey="value2" fill="#10b981" name="Target" />}
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Activities */}
      <RecentActivityList activities={roleData.activities} title="Recent Activity" />
    </div>
  )
}
