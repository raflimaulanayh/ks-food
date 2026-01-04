'use client'

import {
  Shield,
  Warning,
  MagnifyingGlass,
  Download,
  FileText,
  Pulse,
  HardDrives,
  CaretLeft,
  CaretRight
} from '@phosphor-icons/react'
import { useState } from 'react'

import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'

// Mock Log Data
const mockLogs = [
  {
    id: 'LOG-001',
    time: '2026-01-02 14:45:22',
    level: 'CRITICAL',
    module: 'SYSTEM',
    message: 'Database Connection Timeout (Retrying...)',
    user: 'System',
    ip: '127.0.0.1'
  },
  {
    id: 'LOG-002',
    time: '2026-01-02 14:40:10',
    level: 'WARNING',
    module: 'AUTH',
    message: 'Failed Login Attempt (3x) for admin@ksfood.id',
    user: 'Unknown',
    ip: '192.168.1.55'
  },
  {
    id: 'LOG-003',
    time: '2026-01-02 14:35:00',
    level: 'SUCCESS',
    module: 'USER',
    message: 'User "Budi Santoso" created successfully',
    user: 'Rafli Maulana',
    ip: '10.0.0.5'
  },
  {
    id: 'LOG-004',
    time: '2026-01-02 13:00:00',
    level: 'INFO',
    module: 'SCHEDULER',
    message: 'Daily Stock Calculation Job finished in 2.5s',
    user: 'System',
    ip: '127.0.0.1'
  },
  {
    id: 'LOG-005',
    time: '2026-01-02 12:45:10',
    level: 'ERROR',
    module: 'FINANCE',
    message: 'Payment Gateway Timeout (Invoice #INV-99)',
    user: 'Dewi Lestari',
    ip: '10.0.0.8'
  },
  {
    id: 'LOG-006',
    time: '2026-01-02 10:20:30',
    level: 'SUCCESS',
    module: 'GUDANG',
    message: 'Inbound Stock Approved (PO #4021)',
    user: 'Budi Santoso',
    ip: '10.0.0.12'
  },
  {
    id: 'LOG-007',
    time: '2026-01-02 09:00:05',
    level: 'INFO',
    module: 'SYSTEM',
    message: 'System Backup to S3 Bucket Completed',
    user: 'System',
    ip: '127.0.0.1'
  }
]

export default function SystemLogsPage() {
  const [filterLevel, setFilterLevel] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')

  // Filter Logic
  const filteredLogs = mockLogs.filter((log) => {
    const matchLevel = filterLevel === 'ALL' || log.level === filterLevel
    const matchSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase())

    return matchLevel && matchSearch
  })

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-primary text-white hover:bg-red-700 shadow-sm font-bold'
      case 'ERROR':
        return 'bg-red-50 text-red-700 border-red-200 border font-bold'
      case 'WARNING':
        return 'bg-amber-50 text-amber-700 border-amber-200 border font-bold'
      case 'SUCCESS':
        return 'bg-green-50 text-green-700 border-green-200 border font-bold'
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200 border font-bold'
    }
  }

  return (
    <div className="space-y-6 pt-2 pb-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Log Sistem & Audit Trail</h1>
          <p className="mt-1 text-sm text-slate-500">Rekaman jejak aktivitas sistem, keamanan, dan error</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 shadow-sm">
          <Pulse size={16} className="animate-pulse" weight="bold" />
          Live Monitoring Active
        </div>
      </div>

      {/* Top Stats Cards - High Contrast with Icon Boxes */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Total Events</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">14,205</h3>
            </div>
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-3">
              <FileText size={24} className="text-blue-600" weight="duotone" />
            </div>
          </div>
        </Card>
        <Card className="border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Critical Errors</p>
              <h3 className="mt-1 text-2xl font-bold text-primary">5</h3>
            </div>
            <div className="rounded-xl border border-red-100 bg-red-50 p-3">
              <Shield size={24} className="text-primary" weight="duotone" />
            </div>
          </div>
        </Card>
        <Card className="border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Security Alerts</p>
              <h3 className="mt-1 text-2xl font-bold text-amber-600">12</h3>
            </div>
            <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
              <Warning size={24} className="text-amber-600" weight="duotone" />
            </div>
          </div>
        </Card>
        <Card className="border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">System Uptime</p>
              <h3 className="mt-1 text-2xl font-bold text-green-600">99.99%</h3>
            </div>
            <div className="rounded-xl border border-green-100 bg-green-50 p-3">
              <HardDrives size={24} className="text-green-600" weight="duotone" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Card */}
      <Card className="overflow-hidden rounded-xl border bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col justify-between gap-4 border-b bg-slate-50/50 p-4 md:flex-row">
          <div className="flex w-full gap-2 md:w-auto">
            <div className="relative w-full md:w-80">
              <MagnifyingGlass className="absolute top-2.5 left-3 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Cari pesan log atau user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pr-4 pl-9 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
              />
            </div>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="w-[180px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            >
              <option value="ALL">Semua Level</option>
              <option value="CRITICAL">Critical</option>
              <option value="ERROR">Error</option>
              <option value="WARNING">Warning</option>
              <option value="SUCCESS">Success</option>
              <option value="INFO">Info</option>
            </select>
          </div>
          <Button className="gap-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900">
            <Download size={16} weight="bold" /> Export Logs
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-slate-50 font-semibold text-slate-600">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4">Module</th>
                <th className="w-1/3 px-6 py-4">Message</th>
                <th className="px-6 py-4">User / IP</th>
                <th className="px-6 py-4 text-right">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="group transition-colors hover:bg-slate-50/80">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-slate-600">{log.time}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`rounded px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase ${getLevelBadge(log.level)}`}
                    >
                      {log.level}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center rounded border-2 border-slate-300 bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
                      {log.module}
                    </span>
                  </td>
                  <td className="px-6 py-3 font-medium text-slate-900">{log.message}</td>
                  <td className="px-6 py-3">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800">{log.user}</span>
                      <span className="font-mono text-[10px] font-medium text-slate-600">{log.ip}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Button className="h-8 border border-slate-200 bg-white text-xs font-semibold text-blue-600 shadow-sm hover:bg-blue-50 hover:text-blue-700">
                      View Raw
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <p>Tidak ada log yang cocok dengan filter Anda.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with Pagination */}
        <div className="flex items-center justify-between border-t bg-slate-50/30 p-4 text-xs text-slate-600">
          <span className="font-medium">Menampilkan {filteredLogs.length} dari 14,205 baris</span>
          <div className="flex gap-4">
            <button
              disabled
              className="flex h-8 items-center gap-1 border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              <CaretLeft size={14} weight="bold" /> Previous
            </button>
            <button className="flex h-8 items-center gap-1 border-slate-300 bg-white text-xs font-medium text-slate-700 hover:text-slate-900">
              Next <CaretRight size={14} weight="bold" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
