'use client'

import { ApprovalRequest } from '@/data/mock-approvals'
import { CheckCircle, Package, Scroll, Truck, User, XCircle } from '@phosphor-icons/react'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/atoms/ui/dialog'

import { cn } from '@/utils/cn'

interface ApprovalQuickCardProps {
  request: ApprovalRequest
  onApprove: (id: number) => void
  onReject: (id: number, reason: string) => void
}

export const ApprovalQuickCard = ({ request, onApprove, onReject }: ApprovalQuickCardProps) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectReason, setRejectReason] = useState('')

  const getIcon = () => {
    switch (request.type) {
      case 'LEAVE':
        return User
      case 'PO':
        return Scroll
      case 'HIRING':
        return User
      default:
        return Package
    }
  }

  const getIconColor = () => {
    switch (request.type) {
      case 'LEAVE':
        return 'bg-blue-100 text-blue-600'
      case 'PO':
        return 'bg-purple-100 text-purple-600'
      case 'HIRING':
        return 'bg-emerald-100 text-emerald-600'
      case 'BUDGET':
        return 'bg-amber-100 text-amber-600'
      case 'EXPENSE':
        return 'bg-orange-100 text-orange-600'
      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  const handleApprove = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    onApprove(request.id)
  }

  const handleRejectClick = () => {
    setShowRejectDialog(true)
    setRejectReason('')
  }

  const handleRejectConfirm = () => {
    if (rejectReason.trim()) {
      onReject(request.id, rejectReason)
      setShowRejectDialog(false)
    }
  }

  const Icon = getIcon()

  return (
    <>
      <div className="group flex items-start gap-3 border-b border-slate-100 px-4 py-3 transition-colors last:border-0 hover:bg-slate-50">
        <div className={cn('mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', getIconColor())}>
          <Icon size={16} weight="duotone" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-semibold text-slate-900">{request.title}</p>
            {request.priority === 'high' && (
              <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">Urgent</span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            {request.id} • {request.requester.split('(')[0].trim()}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {new Date(request.requestDate).toLocaleString('id-ID', {
              dateStyle: 'short',
              timeStyle: 'short'
            })}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={handleRejectClick}
            disabled={isProcessing}
            className="rounded-md p-1.5 text-primary transition-colors hover:bg-red-50 disabled:opacity-50"
            title="Tolak"
          >
            <XCircle size={20} weight="fill" />
          </button>
          <button
            onClick={handleApprove}
            disabled={isProcessing}
            className="rounded-md p-1.5 text-green-600 transition-colors hover:bg-green-50 disabled:opacity-50"
            title="Setujui"
          >
            {isProcessing ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
            ) : (
              <CheckCircle size={20} weight="fill" />
            )}
          </button>
        </div>
      </div>

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tolak Permintaan</DialogTitle>
            <DialogDescription>
              Anda akan menolak permintaan <span className="font-semibold">{request.id}</span>. Mohon berikan alasan
              penolakan di bawah ini.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <label htmlFor="quick-reason" className="text-sm font-medium text-slate-700">
              Alasan Penolakan <span className="text-primary">*</span>
            </label>
            <textarea
              id="quick-reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Contoh: Dokumen tidak lengkap, Budget tidak tersedia, dll..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              rows={4}
            />
          </div>

          <DialogFooter>
            <button
              onClick={() => setShowRejectDialog(false)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              onClick={handleRejectConfirm}
              disabled={!rejectReason.trim()}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
            >
              Konfirmasi Penolakan
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
