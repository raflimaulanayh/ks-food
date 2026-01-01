'use client'

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Finance Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Kelola keuangan dan cashflow perusahaan</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-slate-600">Modul Finance sedang dalam pengembangan.</p>
        <p className="mt-2 text-sm text-slate-400">Untuk invoice management, silakan gunakan menu "Manajemen Tagihan".</p>
      </div>
    </div>
  )
}
