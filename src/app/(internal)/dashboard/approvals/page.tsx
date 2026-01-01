'use client'

import { ApprovalRequest, ApprovalType, MOCK_APPROVALS } from '@/data/mock-approvals'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { toast } from 'sonner'

import { ApprovalCard } from '@/components/molecules/dashboard/approval-card'

import { cn } from '@/utils/cn'

const TABS: { label: string; value: ApprovalType | 'ALL' }[] = [
  { label: 'Semua', value: 'ALL' },
  { label: 'Gate Pass', value: 'GATE_PASS' },
  { label: 'Purchase Order', value: 'PURCHASE_ORDER' },
  { label: 'Perizinan', value: 'LEAVE_REQUEST' }
]

export default function ApprovalsPage() {
  const [requests, setRequests] = useState<ApprovalRequest[]>(MOCK_APPROVALS)
  const [activeTab, setActiveTab] = useState<ApprovalType | 'ALL'>('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const handleApprove = (id: string) => {
    setRequests((prev) => prev.filter((req) => req.id !== id))
    toast.success(`Dokumen ${id} berhasil disetujui`, {
      description: 'Permintaan telah diproses dan diteruskan ke departemen terkait.'
    })
  }

  const handleReject = (id: string, reason: string) => {
    setRequests((prev) => prev.filter((req) => req.id !== id))
    toast.error(`Dokumen ${id} ditolak`, {
      description: `Alasan: ${reason}`
    })
  }

  const filteredRequests = requests.filter((req) => {
    const matchesTab = activeTab === 'ALL' || req.type === activeTab
    const matchesSearch =
      searchQuery === '' ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.title.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  const pendingCount = requests.filter((r) => r.status === 'PENDING').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Pusat Persetujuan</h1>
        <p className="mt-1 text-sm text-slate-500">
          Tinjau dan kelola permintaan operasional yang masuk.{' '}
          <span className="font-semibold text-primary">{pendingCount} permintaan menunggu</span>
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'rounded-t-lg px-4 py-2 text-sm font-medium transition-colors',
              activeTab === tab.value
                ? 'border-b-2 border-primary bg-red-50 text-primary'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            )}
          >
            {tab.label}
            {tab.value === 'ALL' && (
              <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">
                {requests.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Cari berdasarkan ID, nama pemohon, atau judul..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
        />
      </div>

      {/* Request List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <p className="text-slate-500">
              {searchQuery
                ? 'Tidak ada permintaan yang cocok dengan pencarian.'
                : 'Semua permintaan telah diproses. Tidak ada yang menunggu persetujuan.'}
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredRequests.map((request) => (
              <ApprovalCard key={request.id} request={request} onApprove={handleApprove} onReject={handleReject} />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
