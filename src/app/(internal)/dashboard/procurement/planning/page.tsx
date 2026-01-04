'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { Warning, ShoppingCart, Truck, Wallet, FileText, CheckCircle, Clock } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

import { Card } from '@/components/atoms/ui/card'

// Mock Data - Spending Trend
const spendingData = [
  { month: 'Jan', amount: 850000 },
  { month: 'Feb', amount: 920000 },
  { month: 'Mar', amount: 1100000 },
  { month: 'Apr', amount: 980000 },
  { month: 'Mei', amount: 1200000 },
  { month: 'Jun', amount: 1150000 }
]

// Mock Data - Recent PO Activity
const recentPOs = [
  {
    id: 'PO-2601',
    action: 'PO Created',
    supplier: 'PT Maju Jaya',
    amount: 'Rp 45 Jt',
    time: '10 menit lalu',
    type: 'CREATE'
  },
  {
    id: 'PO-2598',
    action: 'PO Approved',
    supplier: 'CV Sumber Baru',
    amount: 'Rp 32 Jt',
    time: '2 jam lalu',
    type: 'APPROVE'
  },
  {
    id: 'PO-2595',
    action: 'PO Created',
    supplier: 'UD Karya Makmur',
    amount: 'Rp 28 Jt',
    time: '5 jam lalu',
    type: 'CREATE'
  },
  { id: 'PO-2590', action: 'PO Approved', supplier: 'PT Indo Prima', amount: 'Rp 67 Jt', time: 'Kemarin', type: 'APPROVE' }
]

export default function ProcurementPlanningPage() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedMonth, setSelectedMonth] = useState('Semua')
  const [selectedYear, setSelectedYear] = useState('2026')

  // Real-time Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Auth Check
  useEffect(() => {
    if (!user) {
      router.push('/internal/login')
    }
  }, [user, router])

  if (!user) return null

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <div className="space-y-6 pt-2 pb-10">
      {/* Header with Clock */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Perencanaan & Pengadaan</h1>
          <p className="mt-1 text-sm text-slate-500">Monitor stok material, purchase order, dan performa supplier</p>
        </div>

        {/* Real-time Clock */}
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
          <Clock size={20} className="text-blue-600" weight="duotone" />
          <div className="text-right">
            <div className="text-lg font-bold text-slate-800">{formatTime(currentTime)}</div>
            <div className="text-[10px] text-slate-500">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Card 1: Material Kritis */}
        <Card className="border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Material Kritis</p>
              <h3 className="mt-1 text-2xl font-bold text-primary">5 Item</h3>
            </div>
            <div className="rounded-xl border border-red-100 bg-red-50 p-3">
              <Warning size={24} className="text-primary" weight="duotone" />
            </div>
          </div>
        </Card>

        {/* Card 2: PO Aktif */}
        <Card className="border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">PO Aktif</p>
              <h3 className="mt-1 text-2xl font-bold text-blue-600">12 Orders</h3>
            </div>
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-3">
              <ShoppingCart size={24} className="text-blue-600" weight="duotone" />
            </div>
          </div>
        </Card>

        {/* Card 3: Total Supplier */}
        <Card className="border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Total Supplier</p>
              <h3 className="mt-1 text-2xl font-bold text-amber-600">24 Verified</h3>
            </div>
            <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
              <Truck size={24} className="text-amber-600" weight="duotone" />
            </div>
          </div>
        </Card>

        {/* Card 4: Spending */}
        <Card className="border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Spending (Bulan Ini)</p>
              <h3 className="mt-1 text-2xl font-bold text-purple-600">Rp 1.2 M</h3>
            </div>
            <div className="rounded-xl border border-purple-100 bg-purple-50 p-3">
              <Wallet size={24} className="text-purple-600" weight="duotone" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content: Chart & Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Chart - Spending Trend */}
        <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <div className="border-b bg-white p-4">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h3 className="font-bold text-slate-800">Tren Pengeluaran Pembelian</h3>
                <p className="text-xs text-slate-500">Monitoring spending pattern per bulan</p>
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                >
                  <option value="Semua">Semua Bulan</option>
                  <option value="Jan">Januari</option>
                  <option value="Feb">Februari</option>
                  <option value="Mar">Maret</option>
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number | undefined) => (value ? `Rp ${(value / 1000).toFixed(0)}k` : '0')}
                />
                <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent PO Activity */}
        <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b bg-white p-4">
            <h3 className="font-bold text-slate-800">Status PO Terbaru</h3>
            <p className="text-xs text-slate-500">Purchase order updates</p>
          </div>

          <div className="divide-y divide-slate-100">
            {recentPOs.map((po) => (
              <div key={po.id} className="p-4 transition-colors hover:bg-slate-50/50">
                <div className="flex gap-3">
                  {/* Icon Box */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      po.type === 'CREATE' ? 'border border-blue-100 bg-blue-50' : 'border border-green-100 bg-green-50'
                    }`}
                  >
                    {po.type === 'CREATE' ? (
                      <FileText size={18} className="text-blue-600" weight="duotone" />
                    ) : (
                      <CheckCircle size={18} className="text-green-600" weight="duotone" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-bold text-slate-800">{po.action}</div>
                        <div className="text-xs text-slate-500">{po.supplier}</div>
                      </div>
                      <span className="shrink-0 text-xs font-bold text-blue-600">{po.amount}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                        {po.id}
                      </span>
                      <span className="text-[10px] text-slate-400">{po.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
