'use client'

export default function QCPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Quality Control Lab</h1>
        <p className="mt-1 text-sm text-slate-500">Kelola pengujian lab dan inspeksi kualitas</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-slate-600">Modul QC Lab sedang dalam pengembangan.</p>
        <p className="mt-2 text-sm text-slate-400">
          Fitur: Lab Testing, Batch Inspection, dan Defect Reporting akan ditambahkan di sini.
        </p>
      </div>
    </div>
  )
}
