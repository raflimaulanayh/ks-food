'use client'

import { FileText, Truck, SealCheck, DownloadSimple, CalendarBlank, ChartBar, WarningCircle } from '@phosphor-icons/react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'

// MOCK DATA
const rejectData = [
  { name: 'Kadar Air', value: 35, color: '#ef4444' }, // Red-500
  { name: 'Kemasan', value: 25, color: '#f97316' }, // Orange-500
  { name: 'Warna', value: 20, color: '#eab308' }, // Yellow-500
  { name: 'pH Level', value: 15, color: '#3b82f6' }, // Blue-500
  { name: 'Asing', value: 5, color: '#64748b' } // Slate-500
]

const recentReports = [
  { id: 1, name: 'Laporan_QC_Januari_2026.pdf', type: 'Bulanan', date: '03 Jan 2026', size: '2.4 MB' },
  { id: 2, name: 'Supplier_Scorecard_Q4_2025.xlsx', type: 'Analisa', date: '01 Jan 2026', size: '1.1 MB' },
  { id: 3, name: 'COA_Batch_2401.pdf', type: 'Sertifikat', date: '31 Des 2025', size: '850 KB' }
]

export default function QCReportsPage() {
  return (
    <div className="space-y-6 pt-2 pb-10">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Laporan & Analisa Kualitas</h1>
          <p className="mt-1 text-sm text-slate-500">Pusat data analitik performa kualitas dan generator laporan.</p>
        </div>
        <Button variant="outline-red" className="gap-2 bg-white text-slate-600 shadow-sm">
          <CalendarBlank size={18} /> Januari 2026
        </Button>
      </div>

      {/* GENERATOR CARDS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="group cursor-pointer border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-blue-300">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <FileText size={32} weight="duotone" />
            </div>
            <Badge className="border-blue-100 bg-blue-50 text-blue-700">Monthly</Badge>
          </div>
          <h3 className="text-lg font-bold text-slate-800">Laporan Bulanan</h3>
          <p className="mt-1 text-sm text-slate-500">Ringkasan performa incoming material & finished goods.</p>
          <Button
            size="sm"
            variant="ghost"
            className="mt-4 w-full justify-between px-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          >
            Generate PDF <DownloadSimple size={16} />
          </Button>
        </Card>

        <Card className="group cursor-pointer border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-amber-300">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600 transition-colors group-hover:bg-amber-600 group-hover:text-white">
              <Truck size={32} weight="duotone" />
            </div>
            <Badge className="border-amber-100 bg-amber-50 text-amber-700">Analisa</Badge>
          </div>
          <h3 className="text-lg font-bold text-slate-800">Scorecard Supplier</h3>
          <p className="mt-1 text-sm text-slate-500">Evaluasi kualitas supplier berdasarkan tingkat reject.</p>
          <Button
            size="sm"
            variant="ghost"
            className="mt-4 w-full justify-between px-0 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
          >
            Export Excel <DownloadSimple size={16} />
          </Button>
        </Card>

        <Card className="group cursor-pointer border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-emerald-300">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <SealCheck size={32} weight="duotone" />
            </div>
            <Badge className="border-emerald-100 bg-emerald-50 text-emerald-700">Dokumen</Badge>
          </div>
          <h3 className="text-lg font-bold text-slate-800">Certificate of Analysis</h3>
          <p className="mt-1 text-sm text-slate-500">Buat sertifikat COA resmi untuk batch produksi tertentu.</p>
          <Button
            size="sm"
            variant="ghost"
            className="mt-4 w-full justify-between px-0 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Buat Sertifikat <DownloadSimple size={16} />
          </Button>
        </Card>
      </div>

      {/* ANALYTICS SECTION */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* PARETO CHART */}
        <Card className="border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="flex items-center gap-2 font-bold text-slate-800">
                <ChartBar size={20} className="text-slate-400" /> Top 5 Penyebab Reject
              </h3>
              <p className="text-sm text-slate-500">Analisa pareto defect minggu ini</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={rejectData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12, fill: '#64748b' }} interval={0} />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                {rejectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* SUPPLIER WATCHLIST */}
        <Card className="border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-800">
            <WarningCircle size={20} className="text-red-500" /> Supplier Watchlist
          </h3>
          <div className="space-y-4">
            {[
              { name: 'PT. Aneka Pangan', issue: 'Kadar air tidak stabil', rate: '5.2%', trend: 'up' },
              { name: 'CV. Sumber Makmur', issue: 'Kemasan sering bocor', rate: '3.8%', trend: 'down' },
              { name: 'UD. Tani Jaya', issue: 'Kontaminasi fisik', rate: '1.1%', trend: 'same' }
            ].map((sup, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-bold text-slate-700">{sup.name}</h4>
                    <span className="rounded bg-red-50 px-1.5 text-xs font-bold text-primary">{sup.rate}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{sup.issue}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline-red" size="sm" className="mt-4 w-full text-xs">
            Lihat Semua Supplier
          </Button>
        </Card>
      </div>

      {/* RECENT FILES */}
      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50/50 p-4">
          <h3 className="text-sm font-bold text-slate-700">File Terakhir Dibuat</h3>
        </div>
        <div className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-white text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Nama File</th>
                <th className="px-4 py-3 font-medium">Tipe</th>
                <th className="px-4 py-3 font-medium">Tanggal</th>
                <th className="px-4 py-3 text-right font-medium">Ukuran</th>
                <th className="px-4 py-3 text-right font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentReports.map((file) => (
                <tr key={file.id} className="hover:bg-slate-50">
                  <td className="flex items-center gap-2 px-4 py-3 font-medium text-slate-700">
                    <FileText size={16} className="text-blue-500" /> {file.name}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className="font-normal">{file.type}</Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{file.date}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-slate-500">{file.size}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-800">
                      <DownloadSimple size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
