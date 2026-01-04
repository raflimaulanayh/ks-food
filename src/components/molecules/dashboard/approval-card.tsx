'use client'

import { ApprovalRequest } from '@/data/mock-approvals'
import { CheckCircle, Package, Scroll, Truck, User, XCircle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
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

interface ApprovalCardProps {
  request: ApprovalRequest
  onApprove: (id: number) => void
  onReject: (id: number, reason: string) => void
}

export const ApprovalCard = ({ request, onApprove, onReject }: ApprovalCardProps) => {
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

  const getTypeLabel = () => {
    switch (request.type) {
      case 'LEAVE':
        return 'Cuti'
      case 'PO':
        return 'Purchase Order'
      case 'HIRING':
        return 'Rekrutmen'
      case 'BUDGET':
        return 'Budget'
      case 'EXPENSE':
        return 'Pengeluaran'
      default:
        return request.type
    }
  }

  const handleApprove = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
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
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left Section - Icon & Meta */}
          <div className="flex items-start gap-4">
            <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg',
                request.type === 'LEAVE' && 'bg-blue-100 text-blue-600',
                request.type === 'PO' && 'bg-purple-100 text-purple-600',
                request.type === 'HIRING' && 'bg-emerald-100 text-emerald-600',
                request.type === 'BUDGET' && 'bg-amber-100 text-amber-600',
                request.type === 'EXPENSE' && 'bg-orange-100 text-orange-600'
              )}
            >
              <Icon size={24} weight="duotone" />
            </div>

            <div className="flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-slate-500">{getTypeLabel()}</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="font-mono text-xs text-slate-600">{request.id}</span>
                {request.priority === 'high' && (
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">Urgent</span>
                )}
              </div>

              <h3 className="mb-2 text-base font-bold text-slate-900">{request.title}</h3>

              <div className="space-y-1 text-sm text-slate-600">
                <p>
                  <span className="font-medium">Diajukan oleh:</span> {request.requester}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(request.requestDate).toLocaleString('id-ID', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </p>
              </div>

              {/* Details - Disabled for now, needs proper data structure
              <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm">
                <p className="text-xs text-slate-500">{request.description}</p>
              </div>
              */}
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex shrink-0 gap-2 md:flex-col">
            <button
              onClick={handleRejectClick}
              disabled={isProcessing}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition-all hover:border-red-300 hover:bg-red-50 disabled:opacity-50 md:flex-none"
            >
              <XCircle size={18} weight="fill" />
              Tolak
            </button>

            <button
              onClick={handleApprove}
              disabled={isProcessing}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green-700 disabled:opacity-50 md:flex-none"
            >
              {isProcessing ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <CheckCircle size={18} weight="fill" />
              )}
              {isProcessing ? 'Proses...' : 'Setujui'}
            </button>
          </div>
        </div>
      </motion.div>

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
            <label htmlFor="reason" className="text-sm font-medium text-slate-700">
              Alasan Penolakan <span className="text-primary">*</span>
            </label>
            <textarea
              id="reason"
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
