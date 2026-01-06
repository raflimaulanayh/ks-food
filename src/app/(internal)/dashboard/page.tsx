'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import {
  Users,
  Gauge,
  Warning,
  Shield,
  UserPlus,
  Cursor,
  TrendUp,
  ShoppingCart,
  Truck,
  Wallet,
  Clock,
  Flask,
  CheckCircle,
  XCircle,
  ClipboardText,
  Package,
  MagnifyingGlass,
  Bank,
  Receipt,
  ChartPieSlice,
  UserCheck,
  UserMinus,
  ArrowRight,
  ListChecks,
  CaretLeft,
  CaretRight
} from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// IMPORT NOTE: Pastikan path komponen UI ini sesuai project Anda
import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/atoms/ui/dialog'
import { Input } from '@/components/atoms/ui/input'
import { Label } from '@/components/atoms/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/atoms/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'
import { DashboardHeader } from '@/components/molecules/dashboard/dashboard-header'
import DirectorView from '@/components/templates/dashboard-views/DirectorView'

// --- MOCK DATA ADMIN ---
const dataAdmin = [
  { name: 'Week 1', request: 4200, error: 20 },
  { name: 'Week 2', request: 3500, error: 15 },
  { name: 'Week 3', request: 5000, error: 45 },
  { name: 'Week 4', request: 4800, error: 10 }
]

// --- MOCK RECENT ACTIVITY LOGS ---
const recentActivityLogs = [
  {
    id: 1,
    timestamp: '2026-01-02 14:35:22',
    level: 'SUCCESS',
    module: 'USER',
    message: "User 'Budi Santoso' created successfully",
    user: 'Rafli Maulana',
    ip: '10.0.0.12'
  },
  {
    id: 2,
    timestamp: '2026-01-02 14:00:18',
    level: 'WARNING',
    module: 'AUTH',
    message: 'Failed Login Attempt (3x) for admin@ksfood.id',
    user: 'Unknown',
    ip: '192.168.0.15'
  },
  {
    id: 3,
    timestamp: '2026-01-02 13:03:08',
    level: 'SUCCESS',
    module: 'SCHEDULER',
    message: 'Daily Stock Calculation Job finished in 2.5s',
    user: 'System',
    ip: '127.0.0.1'
  },
  {
    id: 4,
    timestamp: '2026-01-02 12:45:18',
    level: 'ERROR',
    module: 'FINANCE',
    message: 'Payment Gateway Timeout (Invoice #INV-99)',
    user: 'Dewi Lestari',
    ip: '10.0.0.8'
  },
  {
    id: 5,
    timestamp: '2026-01-02 09:08:05',
    level: 'SUCCESS',
    module: 'GUDANG',
    message: 'Inbound Stock Approved (PO #4021)',
    user: 'Budi Santoso',
    ip: '10.0.0.32'
  }
]

// --- MOCK DATA PROCUREMENT ---
const dataProcurement = [
  { month: 'Jan', amount: 850000 },
  { month: 'Feb', amount: 920000 },
  { month: 'Mar', amount: 1100000 },
  { month: 'Apr', amount: 980000 },
  { month: 'Mei', amount: 1200000 },
  { month: 'Jun', amount: 1150000 }
]

// --- MOCK DATA QC ---
const dataQC = [
  { day: 'Senin', passed: 15, rejected: 1 },
  { day: 'Selasa', passed: 12, rejected: 0 },
  { day: 'Rabu', passed: 18, rejected: 2 },
  { day: 'Kamis', passed: 14, rejected: 1 },
  { day: 'Jumat', passed: 16, rejected: 0 },
  { day: 'Sabtu', passed: 10, rejected: 1 }
]

// --- MOCK DATA FINANCE ---
const dataFinance = [
  { week: 'W1', plan: 200, actual: 180 },
  { week: 'W2', plan: 300, actual: 250 },
  { week: 'W3', plan: 250, actual: 280 },
  { week: 'W4', plan: 400, actual: 100 }
]

// --- MOCK DATA HR ---
const dataHR = [
  { day: 'Senin', hadir: 120, absen: 8 },
  { day: 'Selasa', hadir: 118, absen: 10 },
  { day: 'Rabu', hadir: 122, absen: 6 },
  { day: 'Kamis', hadir: 115, absen: 13 },
  { day: 'Jumat', hadir: 119, absen: 9 },
  { day: 'Sabtu', hadir: 95, absen: 5 }
]

// ==========================================
// 1. ADMIN VIEW (Original Code Preserved)
// ==========================================
const AdminView = () => {
  const [selectedYear, setSelectedYear] = useState('2026')

  return (
    <div className="space-y-6 pt-2 pb-10">
      <DashboardHeader
        title="Panel Admin"
        subtitle="Monitoring sistem, pengguna, dan aktivitas keamanan"
        onFilterChange={(filters) => {
          // Handle filter change if needed
          console.info('Filter changed:', filters)
        }}
      />

      <div className="grid animate-in gap-6 duration-500 fade-in slide-in-from-bottom-4 md:grid-cols-4">
        <Card className="group relative overflow-hidden border-l-[6px] border-blue-600 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Total Pengguna</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">48 Akun</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                <UserPlus size={10} /> +2 Baru
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-blue-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <Users size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-emerald-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Traffic Sistem</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">12.5k Hits</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                <TrendUp size={10} /> High Load
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-2 text-emerald-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <Cursor size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-amber-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Isu / Tiket</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">3 Pending</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-full border border-amber-100 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                Perlu Review
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-2 text-amber-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <Warning size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-purple-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Server Uptime</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">99.9%</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full border border-purple-100 bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                <Gauge size={10} /> Stable
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-2 text-purple-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <Gauge size={90} weight="duotone" />
          </div>
        </Card>
      </div>

      {/* Chart & Activity Log Section - 2 Columns */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* System Request Performance Chart - 2/3 width */}
        <Card className="flex min-h-[400px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2 lg:h-full">
          <div className="border-b bg-white p-4">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h3 className="font-bold text-slate-800">Performa Request Sistem</h3>
                <p className="text-xs text-slate-500">Monitoring mingguan</p>
              </div>
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
          <div className="flex-1 p-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataAdmin}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="request" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activity Log Widget - 1/3 width */}
        <Card className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b bg-white p-4">
            <div className="flex items-center gap-2">
              <ListChecks size={28} className="text-blue-600" />
              <div>
                <h3 className="font-bold text-slate-800">Log Aktivitas Terbaru</h3>
                <p className="text-xs text-slate-500">Aktivitas dan event sistem terkini</p>
              </div>
            </div>
            <Badge className="bg-blue-50 text-blue-600">{recentActivityLogs.length} Terbaru</Badge>
          </div>
          <div className="flex-1 divide-y divide-slate-100 overflow-y-auto">
            {recentActivityLogs.map((log) => {
              const getLevelBadge = (level: string) => {
                switch (level) {
                  case 'SUCCESS':
                    return 'bg-emerald-100 text-emerald-700 border-emerald-200'
                  case 'WARNING':
                    return 'bg-amber-100 text-amber-700 border-amber-200'
                  case 'ERROR':
                    return 'bg-red-100 text-red-700 border-red-200'
                  case 'CRITICAL':
                    return 'bg-purple-100 text-purple-700 border-purple-200'
                  default:
                    return 'bg-slate-100 text-slate-700 border-slate-200'
                }
              }

              const getLevelText = (level: string) => {
                switch (level) {
                  case 'SUCCESS':
                    return 'SUKSES'
                  case 'WARNING':
                    return 'PERINGATAN'
                  case 'ERROR':
                    return 'ERROR'
                  case 'CRITICAL':
                    return 'KRITIS'
                  default:
                    return level
                }
              }

              return (
                <div key={log.id} className="p-4 transition-colors hover:bg-slate-50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className={`border ${getLevelBadge(log.level)} text-[10px] font-bold`}>
                          {getLevelText(log.level)}
                        </Badge>
                        <Badge variant="outline" className="border-0 bg-slate-100 text-[10px] font-semibold text-slate-600">
                          {log.module}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-slate-800">{log.message}</p>
                      <div className="flex flex-col gap-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Users size={12} weight="bold" />
                          {log.user}
                        </span>
                        <span className="text-xs text-slate-400">{log.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="border-t bg-white p-3">
            <Button url="/dashboard/admin/logs" variant="default" className="w-full gap-2">
              Lihat Semua Log <ArrowRight size={16} />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

// ==========================================
// 2. PROCUREMENT VIEW (Original Code Preserved)
// ==========================================
const ProcurementView = () => {
  const [selectedMonth, setSelectedMonth] = useState('Semua')

  return (
    <div className="space-y-6 pt-2 pb-10">
      <DashboardHeader
        title="Ringkasan Pengadaan"
        subtitle="Overview PO, stok material, dan performa supplier"
        onFilterChange={(filters) => {
          console.info('Filter changed:', filters)
        }}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card className="group relative overflow-hidden border-l-[6px] border-amber-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Menunggu Approval</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">5 PO</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-100 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                Urgent
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-amber-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <ShoppingCart size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-red-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Stok Kritis</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">8 Item</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-red-100 bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700">
                Restock Now
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-red-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <Warning size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-blue-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Supplier Aktif</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">24 Vendor</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                Verified
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-blue-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <Truck size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-purple-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Spending (Bulan Ini)</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">Rp 1.2 M</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-purple-100 bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                On Budget
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-purple-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <Wallet size={90} weight="duotone" />
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b bg-white p-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="font-bold text-slate-800">Tren Pengeluaran Pembelian</h3>
              <p className="text-xs text-slate-500">Monitoring spending pattern per bulan</p>
            </div>
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
          </div>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dataProcurement}>
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
              <Bar dataKey="amount" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}

// ==========================================
// 3. QC VIEW (Quality Control Dashboard)
// ==========================================
const QCView = () => {
  const [selectedDay, setSelectedDay] = useState('Semua')
  const [activeTab, setActiveTab] = useState('incoming')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  // Mock inspection data
  const [incomingItems, setIncomingItems] = useState([
    {
      id: 'QC-IN-001',
      ref: 'PO-2601-002',
      name: 'Minyak Goreng',
      supplier: 'CV. Sumber Makmur',
      date: '2026-01-03',
      qty: '200 L',
      status: 'Pending'
    },
    {
      id: 'QC-IN-002',
      ref: 'PO-2601-005',
      name: 'Tepung Terigu',
      supplier: 'PT. Aneka Pangan',
      date: '2026-01-03',
      qty: '500 KG',
      status: 'Pending'
    }
  ])

  const [finishedGoods, setFinishedGoods] = useState([
    {
      id: 'QC-FG-881',
      batch: 'BATCH-2401',
      name: 'Saos Sambal Extra Pedas',
      date: 'Hari Ini',
      qty: '500 Box',
      status: 'Pending'
    }
  ])

  const handleInspect = (item: any) => {
    setSelectedItem(item)
    setIsDialogOpen(true)
  }

  const submitResult = (result: 'Passed' | 'Rejected') => {
    if (activeTab === 'incoming') {
      setIncomingItems((prev) => prev.map((i) => (i.id === selectedItem.id ? { ...i, status: result } : i)))
    } else {
      setFinishedGoods((prev) => prev.map((i) => (i.id === selectedItem.id ? { ...i, status: result } : i)))
    }
    setIsDialogOpen(false)
    alert(`QC Result: ${result.toUpperCase()}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'Passed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'Rejected':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  return (
    <div className="space-y-6 pt-2 pb-10">
      <DashboardHeader
        title="Laboratorium QC"
        subtitle="Pemeriksaan kualitas bahan baku (Incoming) dan produk jadi."
        onFilterChange={(filters) => {
          // Handle filter change if needed
          console.info('Filter changed:', filters)
        }}
      />

      {/* KPI CARDS */}
      <div className="grid animate-in gap-6 duration-500 fade-in slide-in-from-bottom-4 md:grid-cols-4">
        <Card className="group relative overflow-hidden border-l-[6px] border-amber-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Antrian Inspeksi</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">
              2 <span className="text-sm font-normal text-slate-500">Lot</span>
            </h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-full border border-amber-100 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                Pending
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-amber-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <Flask size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-emerald-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Lolos QC</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">
              12 <span className="text-sm font-normal text-slate-500">Lot</span>
            </h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                <CheckCircle size={10} /> Passed
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-2 text-emerald-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <CheckCircle size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-red-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Rejected</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">
              1 <span className="text-sm font-normal text-slate-500">Lot</span>
            </h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-full border border-red-100 bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700">
                Failed
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-2 text-red-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <XCircle size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-blue-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Defect Rate</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">0.8%</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                <TrendUp size={10} /> Good
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-2 text-blue-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <TrendUp size={90} weight="duotone" />
          </div>
        </Card>
      </div>

      {/* CHART SECTION */}
      <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b bg-white p-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="font-bold text-slate-800">QC Results (Weekly Trend)</h3>
              <p className="text-xs text-slate-500">Monitoring tingkat kelulusan vs rejection</p>
            </div>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            >
              <option value="Semua">Semua Hari</option>
              <option value="Senin">Senin</option>
              <option value="Selasa">Selasa</option>
              <option value="Rabu">Rabu</option>
            </select>
          </div>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dataQC}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="passed" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="rejected" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* INSPECTION TABLE */}
      <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <Tabs defaultValue="incoming" className="w-full" onValueChange={setActiveTab}>
          {/* TABS HEADER */}
          <div className="border-b bg-white px-6 pt-3">
            <TabsList className="h-auto gap-8 bg-transparent p-0">
              <TabsTrigger
                value="incoming"
                className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium transition-colors data-[state=active]:border-primary data-[state=active]:text-primary"
              >
                <div className="flex items-center gap-2">
                  <Package size={16} weight="duotone" /> Incoming Material
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="finished"
                className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium transition-colors data-[state=active]:border-primary data-[state=active]:text-primary"
              >
                <div className="flex items-center gap-2">
                  <ClipboardText size={16} weight="duotone" /> Finished Goods
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* FILTER BAR */}
          <div className="flex items-center gap-4 border-b bg-slate-50 px-6 py-4">
            <div className="relative w-full md:w-96">
              <MagnifyingGlass className="absolute top-2.5 left-3 text-slate-400" size={18} weight="bold" />
              <Input placeholder="Cari Batch, Material, atau Supplier..." className="bg-white pl-10" />
            </div>
          </div>

          {/* INCOMING MATERIAL TAB */}
          <TabsContent value="incoming" className="m-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="font-semibold">Ref ID</TableHead>
                    <TableHead className="font-semibold">Material Name</TableHead>
                    <TableHead className="font-semibold">Tanggal</TableHead>
                    <TableHead className="font-semibold">Qty</TableHead>
                    <TableHead className="text-center font-semibold">Status QC</TableHead>
                    <TableHead className="text-right font-semibold">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomingItems.map((item: any) => (
                    <TableRow key={item.id} className="transition-colors hover:bg-slate-50">
                      <TableCell className="font-mono text-xs font-bold text-slate-600">
                        {item.id}
                        <div className="text-[10px] font-normal text-slate-400">{item.ref}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-slate-800">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.supplier}</div>
                      </TableCell>
                      <TableCell className="text-slate-600">{item.date}</TableCell>
                      <TableCell className="font-medium text-slate-700">{item.qty}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={`${getStatusBadge(item.status)} border-0 shadow-sm`}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.status === 'Pending' ? (
                          <Button
                            size="sm"
                            onClick={() => handleInspect(item)}
                            className="h-8 gap-2 bg-primary text-xs font-bold text-white shadow-sm hover:bg-red-700"
                          >
                            <Flask size={14} weight="bold" /> Uji Lab
                          </Button>
                        ) : (
                          <Button size="sm" variant="ghost" disabled className="text-slate-400">
                            Selesai
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* FINISHED GOODS TAB */}
          <TabsContent value="finished" className="m-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="font-semibold">Batch ID</TableHead>
                    <TableHead className="font-semibold">Product Name</TableHead>
                    <TableHead className="font-semibold">Tanggal</TableHead>
                    <TableHead className="font-semibold">Qty</TableHead>
                    <TableHead className="text-center font-semibold">Status QC</TableHead>
                    <TableHead className="text-right font-semibold">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {finishedGoods.map((item: any) => (
                    <TableRow key={item.id} className="transition-colors hover:bg-slate-50">
                      <TableCell className="font-mono text-xs font-bold text-slate-600">
                        {item.id}
                        <div className="text-[10px] font-normal text-slate-400">{item.batch}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-slate-800">{item.name}</div>
                        <div className="text-xs text-slate-500">Production Line 1</div>
                      </TableCell>
                      <TableCell className="text-slate-600">{item.date}</TableCell>
                      <TableCell className="font-medium text-slate-700">{item.qty}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={`${getStatusBadge(item.status)} border-0 shadow-sm`}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.status === 'Pending' ? (
                          <Button
                            size="sm"
                            onClick={() => handleInspect(item)}
                            className="h-8 gap-2 bg-primary text-xs font-bold text-white shadow-sm hover:bg-red-700"
                          >
                            <Flask size={14} weight="bold" /> Uji Lab
                          </Button>
                        ) : (
                          <Button size="sm" variant="ghost" disabled className="text-slate-400">
                            Selesai
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* PAGINATION FOOTER */}
          <div className="flex items-center justify-between border-t bg-slate-50 px-6 py-4">
            <p className="text-sm text-slate-600">Menampilkan 5 data terbaru</p>
            <div className="flex gap-2">
              <Button variant="outline-slate" size="sm" disabled>
                <CaretLeft size={14} /> Previous
              </Button>
              <Button variant="outline-slate" size="sm">
                Next <CaretRight size={14} />
              </Button>
            </div>
          </div>
        </Tabs>
      </Card>

      {/* QC TESTING DIALOG */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Input Hasil Lab QC</DialogTitle>
            <DialogDescription>Masukkan parameter pengujian untuk {selectedItem?.name}.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-y-2">
                <Label>Visual Check</Label>
                <Select defaultValue="pass">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pass">OK / Bersih</SelectItem>
                    <SelectItem value="fail">Kotor / Rusak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>pH Level</Label>
                <Input type="number" placeholder="7.0" />
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Catatan Lab</Label>
              <Input placeholder="Opsional..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline-red" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={() => submitResult('Rejected')}>
              REJECT
            </Button>
            <Button className="bg-emerald-600 text-white hover:bg-emerald-700" onClick={() => submitResult('Passed')}>
              RELEASE (Lolos)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ==========================================
// 4. FINANCE VIEW (Financial Dashboard)
// ==========================================
const FinanceView = () => {
  return (
    <div className="space-y-6 pt-2 pb-10">
      <DashboardHeader
        title="Dashboard Keuangan"
        subtitle="Monitoring arus kas, hutang dagang, dan status pembayaran."
        onFilterChange={(filters) => {
          // Handle filter change if needed
          console.info('Filter changed:', filters)
        }}
      />

      {/* KPI CARDS */}
      <div className="grid animate-in gap-6 duration-500 fade-in slide-in-from-bottom-4 md:grid-cols-4">
        <Card className="group relative overflow-hidden border-l-[6px] border-red-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Hutang Jatuh Tempo</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">Rp 450 Jt</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-red-100 bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700">
                Bayar Segera
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-red-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <Warning size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-blue-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Siap Dibayar</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">Rp 1.2 M</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                Verified PO
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-blue-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <Receipt size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-purple-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Cash Out (Bulan Ini)</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">Rp 850 Jt</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-purple-100 bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                On Track
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-purple-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <Bank size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-emerald-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Sisa Budget Q1</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">45%</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                Aman
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-emerald-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <ChartPieSlice size={90} weight="duotone" />
          </div>
        </Card>
      </div>

      {/* CHART & TABLE SECTION */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* CHART */}
        <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <div className="border-b bg-white p-4">
            <h3 className="font-bold text-slate-800">Cash Flow: Rencana vs Realisasi</h3>
            <p className="text-xs text-slate-500">Pemantauan cash flow mingguan</p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={dataFinance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="plan" name="Rencana" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Realisasi" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* INVOICE LIST */}
        <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b bg-white p-4">
            <h3 className="font-bold text-slate-800">Tagihan Jatuh Tempo</h3>
            <p className="text-xs text-slate-500">Invoice perlu perhatian</p>
          </div>
          <div className="p-0">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Supplier</th>
                  <th className="px-4 py-3 text-right font-medium">Nominal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { sup: 'PT. Aneka Pangan', val: 'Rp 450.000.000', date: 'Hari Ini' },
                  { sup: 'CV. Sumber Makmur', val: 'Rp 120.000.000', date: 'Besok' },
                  { sup: 'UD. Tani Jaya', val: 'Rp 85.000.000', date: '3 Hari Lagi' }
                ].map((inv, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-700">{inv.sup}</div>
                      <div className="text-[10px] font-bold text-red-500">Jatuh Tempo: {inv.date}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="font-bold text-slate-800">{inv.val}</div>
                      <Button size="sm" variant="outline-red" className="mt-1 h-6 border-blue-200 text-[10px] text-blue-600">
                        Bayar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}

// ==========================================
// 5. HR VIEW (Human Resources Dashboard)
// ==========================================
const HRView = () => {
  return (
    <div className="space-y-6 pt-2 pb-10">
      <DashboardHeader
        title="Dashboard HRD"
        subtitle="Monitoring kepegawaian, absensi, dan rekrutmen."
        onFilterChange={(filters) => {
          // Handle filter change if needed
          console.info('Filter changed:', filters)
        }}
      />

      {/* KPI CARDS */}
      <div className="grid animate-in gap-6 duration-500 fade-in slide-in-from-bottom-4 md:grid-cols-4">
        <Card className="group relative overflow-hidden border-l-[6px] border-blue-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Total Pegawai</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">128 Orang</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                Aktif
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-blue-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <Users size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-emerald-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Hadir Hari Ini</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">115 Orang</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                89.8%
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-emerald-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <UserCheck size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-amber-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Izin / Sakit</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">5 Orang</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-100 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                Pending
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-amber-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <UserMinus size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-red-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Kontrak Akan Habis</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">3 Orang</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-red-100 bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700">
                Review
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-red-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <Clock size={90} weight="duotone" />
          </div>
        </Card>
      </div>

      {/* CHART & BOTTOM SECTION */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ATTENDANCE CHART */}
        <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <div className="border-b bg-white p-4">
            <h3 className="font-bold text-slate-800">Tren Kehadiran Mingguan</h3>
            <p className="text-xs text-slate-500">Data kehadiran vs absensi pekan ini</p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={dataHR}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="hadir" name="Hadir" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absen" name="Absen" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* QUICK INFO PANEL */}
        <div className="space-y-6">
          {/* LEAVE REQUESTS */}
          <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b bg-white p-4">
              <h3 className="font-bold text-slate-800">Pengajuan Cuti</h3>
              <p className="text-xs text-slate-500">Permohonan terbaru</p>
            </div>
            <div className="p-0">
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: 'Andi Pratama', type: 'Cuti Tahunan', days: '3 Hari' },
                    { name: 'Siti Nurhaliza', type: 'Sakit', days: '2 Hari' },
                    { name: 'Budi Santoso', type: 'Izin', days: '1 Hari' }
                  ].map((req, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-700">{req.name}</div>
                        <div className="text-xs text-slate-500">
                          {req.type} • {req.days}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* RECRUITMENT */}
          <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b bg-white p-4">
              <h3 className="font-bold text-slate-800">Rekrutmen</h3>
              <p className="text-xs text-slate-500">Pelamar baru</p>
            </div>
            <div className="p-0">
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: 'Ahmad Fauzi', pos: 'Staff QC', stat: 'Interview' },
                    { name: 'Lina Wijaya', pos: 'Admin', stat: 'Screening' }
                  ].map((app, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-700">{app.name}</div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">{app.pos}</span>
                          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-blue-700">{app.stat}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 6. PRODUCTION VIEW (Production Dashboard)
// ==========================================
const ProductionView = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Minggu Ini')

  const productionData = [
    { day: 'Sen', target: 500, actual: 520 },
    { day: 'Sel', target: 500, actual: 480 },
    { day: 'Rab', target: 500, actual: 510 },
    { day: 'Kam', target: 500, actual: 495 },
    { day: 'Jum', target: 500, actual: 530 }
  ]

  return (
    <div className="space-y-6 pt-2 pb-10">
      <DashboardHeader
        title="Dashboard Produksi"
        subtitle="Monitoring output produksi, efisiensi, dan kualitas harian."
        onFilterChange={(filters) => {
          console.info('Filter changed:', filters)
        }}
      />

      {/* KPI CARDS */}
      <div className="grid animate-in gap-6 duration-500 fade-in slide-in-from-bottom-4 md:grid-cols-4">
        <Card className="group relative overflow-hidden border-l-[6px] border-primary bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Output Hari Ini</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">
              530 <span className="text-sm font-normal text-slate-500">Box</span>
            </h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                <TrendUp size={10} /> +6% vs Target
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-red-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <Package size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-emerald-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Efisiensi Produksi</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">94.2%</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                <CheckCircle size={10} /> Excellent
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-2 text-emerald-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <Gauge size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-blue-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Pass Rate QC</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">98.5%</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                <Flask size={10} /> High Quality
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-2 text-blue-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <CheckCircle size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-amber-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Downtime</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">
              45 <span className="text-sm font-normal text-slate-500">Menit</span>
            </h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-100 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                <Clock size={10} /> Normal
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-amber-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <Clock size={90} weight="duotone" />
          </div>
        </Card>
      </div>

      {/* PRODUCTION CHART */}
      <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b bg-white p-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="font-bold text-slate-800">Output Produksi: Target vs Aktual</h3>
              <p className="text-xs text-slate-500">Monitoring pencapaian target produksi harian</p>
            </div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            >
              <option value="Minggu Ini">Minggu Ini</option>
              <option value="Bulan Ini">Bulan Ini</option>
              <option value="Custom">Custom Range</option>
            </select>
          </div>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="target" name="Target" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" name="Aktual" fill="#dc2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}

// ==========================================
// 7. MAIN DASHBOARD PAGE
// ==========================================
export default function DashboardPage() {
  const { user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/internal/login')
    }
  }, [user, router])

  if (!user) return null

  // STRICT ROLE SWITCHING
  if (user.role === 'QC') return <QCView />
  if (user.role === 'WAREHOUSE') return <ProcurementView />
  if (user.role === 'FINANCE') return <FinanceView />
  if (user.role === 'HR') return <HRView />
  if (user.role === 'PRODUCTION') return <ProductionView />
  if (user.role === 'PIMPINAN') return <DirectorView />
  if (user.role === 'ADMIN') return <AdminView />

  // Fallback
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-10">
      <Card className="max-w-md p-8 text-center">
        <Shield size={48} className="mx-auto mb-4 text-slate-400" weight="duotone" />
        <h2 className="text-xl font-bold text-slate-800">Dashboard Belum Tersedia</h2>
        <p className="mt-2 text-sm text-slate-500">
          Dashboard untuk role <span className="font-bold text-slate-700">{user.role}</span> sedang dalam pengembangan.
        </p>
      </Card>
    </div>
  )
}
