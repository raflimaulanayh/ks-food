'use client'

import { ApprovalRequest } from '@/data/mock-approvals'
import { ArrowRight } from '@phosphor-icons/react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

import { ApprovalQuickCard } from './approval-quick-card'

interface ApprovalWidgetProps {
  approvals: ApprovalRequest[]
  title?: string
  maxItems?: number
}

export const ApprovalWidget = ({ approvals, title = 'Persetujuan yang Diperlukan', maxItems = 5 }: ApprovalWidgetProps) => {
  const [items, setItems] = useState(approvals.slice(0, maxItems))

  const handleApprove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    toast.success(`${id} disetujui`, {
      description: 'Permintaan telah diproses'
    })
  }

  const handleReject = (id: string, reason: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    toast.error(`${id} ditolak`, {
      description: reason
    })
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <Link
          href="/dashboard/approvals"
          className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Lihat Semua
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {items.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-slate-500">Tidak ada permintaan yang menunggu persetujuan</div>
        ) : (
          items.map((item) => (
            <ApprovalQuickCard key={item.id} request={item} onApprove={handleApprove} onReject={handleReject} />
          ))
        )}
      </div>
    </div>
  )
}
