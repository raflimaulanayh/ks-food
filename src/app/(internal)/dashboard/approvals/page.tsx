'use client'

import { ApprovalRequest, ApprovalType, MOCK_APPROVALS } from '@/data/mock-approvals'
import { CheckCircle, MagnifyingGlass, Package, Scroll, Truck, User, XCircle } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { toast } from 'sonner'

import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/atoms/ui/dialog'
import { Input } from '@/components/atoms/ui/input'
import { Label } from '@/components/atoms/ui/label'
import { Textarea } from '@/components/atoms/ui/textarea'

import { cn } from '@/utils/cn'

const TABS: { label: string; value: ApprovalType | 'ALL' }[] = [
  { label: 'Semua', value: 'ALL' },
  { label: 'Gate Pass', value: 'LEAVE' },
  { label: 'Purchase Order', value: 'PO' },
  { label: 'Penolakan', value: 'BUDGET' }
]

export default function ApprovalsPage() {
  const [requests, setRequests] = useState<ApprovalRequest[]>(MOCK_APPROVALS)
  const [activeTab, setActiveTab] = useState<ApprovalType | 'ALL'>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null)
  const [rejectReason, setRejectReason] = useState('')
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState('')
  const [rejectPinInput, setRejectPinInput] = useState('')
  const [rejectPinError, setRejectPinError] = useState('')

  const handleApproveClick = (request: ApprovalRequest) => {
    setSelectedRequest(request)
    setPinInput('')
    setPinError('')
    setIsApproveDialogOpen(true)
  }

  const confirmApprove = () => {
    if (!pinInput) {
      setPinError('PIN wajib diisi')

      return
    }

    if (pinInput.length < 4) {
      setPinError('PIN minimal 4 digit')

      return
    }

    // TODO: Validate PIN with backend/stored PIN
    // For now, we'll accept any PIN with 4+ digits
    // Example: if (pinInput !== '1234') { setPinError('PIN salah'); return; }

    if (selectedRequest) {
      setRequests((prev) => prev.filter((r) => r.id !== selectedRequest.id))
      toast.success('Permintaan Disetujui', {
        description: `${selectedRequest.title} telah disetujui dan diproses`
      })
      setIsApproveDialogOpen(false)
      setSelectedRequest(null)
      setPinInput('')
      setPinError('')
    }
  }

  const handleRejectClick = (request: ApprovalRequest) => {
    setSelectedRequest(request)
    setRejectReason('')
    setRejectPinInput('')
    setRejectPinError('')
    setIsRejectDialogOpen(true)
  }

  const confirmReject = () => {
    if (!rejectPinInput) {
      setRejectPinError('PIN wajib diisi')

      return
    }

    if (rejectPinInput.length < 4) {
      setRejectPinError('PIN minimal 4 digit')

      return
    }

    // TODO: Validate PIN with backend/stored PIN
    // For now, we'll accept any PIN with 4+ digits
    // Example: if (rejectPinInput !== '1234') { setRejectPinError('PIN salah'); return; }

    if (selectedRequest) {
      setRequests((prev) => prev.filter((r) => r.id !== selectedRequest.id))
      toast.error('Permintaan Ditolak', {
        description: `${selectedRequest.title} ditolak: ${rejectReason}`
      })
      setIsRejectDialogOpen(false)
      setSelectedRequest(null)
      setRejectReason('')
      setRejectPinInput('')
      setRejectPinError('')
    }
  }

  const filteredRequests = requests.filter((req) => {
    const matchesTab = activeTab === 'ALL' || req.type === activeTab
    const matchesSearch =
      searchQuery === '' ||
      String(req.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.title.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch && req.status === 'pending'
  })

  const pendingCount = requests.filter((r) => r.status === 'pending').length

  const getIcon = (type: ApprovalType) => {
    switch (type) {
      case 'LEAVE':
        return Truck
      case 'PO':
        return Scroll
      case 'HIRING':
        return User
      default:
        return Package
    }
  }

  const getTypeLabel = (type: ApprovalType) => {
    switch (type) {
      case 'LEAVE':
        return 'LEAVE'
      case 'PO':
        return 'PO'
      case 'HIRING':
        return 'HIRING'
      case 'BUDGET':
        return 'BUDGET'
      case 'EXPENSE':
        return 'EXPENSE'
      default:
        return type
    }
  }

  return (
    <div className="space-y-6 pt-2 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Pusat Persetujuan</h1>
        <p className="mt-1 text-sm text-slate-500">
          Tinjau dan kelola permintaan operasional yang masuk.{' '}
          <span className="font-semibold text-primary">{pendingCount} permintaan menunggu</span>
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {TABS.map((tab) => (
          <Button
            variant={activeTab === tab.value ? 'default' : 'outline-red'}
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className="font-semibold"
          >
            {tab.label}
            {tab.value === 'ALL' && (
              <Badge
                className={cn(
                  'ml-2 bg-white text-primary',
                  activeTab !== tab.value ? 'bg-primary text-white' : 'bg-white text-primary'
                )}
              >
                {requests.length}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Search Bar */}
      <Card className="border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative">
          <MagnifyingGlass size={18} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" weight="bold" />
          <Input
            type="text"
            placeholder="Cari berdasarkan ID, nama pemohon, atau judul..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Request List */}
      <div className="flex flex-col gap-y-3">
        {filteredRequests.length === 0 ? (
          <Card className="border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              {searchQuery
                ? 'Tidak ada permintaan yang cocok dengan pencarian.'
                : 'Semua permintaan telah diproses. Tidak ada yang menunggu persetujuan.'}
            </p>
          </Card>
        ) : (
          <AnimatePresence>
            {filteredRequests.map((request) => {
              const Icon = getIcon(request.type)

              return (
                <motion.div
                  key={request.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                >
                  <Card className="border-slate-200 bg-white p-4 shadow transition-shadow hover:shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      {/* Left Section */}
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            'flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
                            request.type === 'LEAVE' && 'bg-blue-100',
                            request.type === 'PO' && 'bg-purple-100',
                            request.type === 'HIRING' && 'bg-emerald-100',
                            request.type === 'BUDGET' && 'bg-amber-100',
                            request.type === 'EXPENSE' && 'bg-orange-100'
                          )}
                        >
                          <Icon
                            size={20}
                            weight="fill"
                            className={cn(
                              request.type === 'LEAVE' && 'text-blue-600',
                              request.type === 'PO' && 'text-purple-600',
                              request.type === 'HIRING' && 'text-emerald-600',
                              request.type === 'BUDGET' && 'text-amber-600',
                              request.type === 'EXPENSE' && 'text-orange-600'
                            )}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <Badge
                              className={cn(
                                'text-[10px] font-bold',
                                request.type === 'LEAVE' && 'bg-blue-100 text-blue-700',
                                request.type === 'PO' && 'bg-purple-100 text-purple-700',
                                request.type === 'HIRING' && 'bg-emerald-100 text-emerald-700',
                                request.type === 'BUDGET' && 'bg-amber-100 text-amber-700',
                                request.type === 'EXPENSE' && 'bg-orange-100 text-orange-700'
                              )}
                            >
                              {getTypeLabel(request.type)}
                            </Badge>
                            {request.priority === 'high' && <Badge className="bg-red-100 text-red-700">Urgent</Badge>}
                          </div>

                          <h3 className="mb-1 text-base font-bold text-slate-900">{request.title}</h3>

                          <p className="text-sm text-slate-600">
                            <span className="font-medium">Diajukan oleh:</span> {request.requester}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(request.requestDate).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>

                          {request.amount && (
                            <p className="mt-2 text-sm font-bold text-emerald-600">
                              Nilai: Rp {request.amount.toLocaleString('id-ID')}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right Section - Actions */}
                      <div className="flex shrink-0 gap-2">
                        <Button variant="outline-red" onClick={() => handleRejectClick(request)}>
                          <XCircle size={16} weight="fill" /> Tolak
                        </Button>
                        <Button
                          onClick={() => handleApproveClick(request)}
                          className="gap-1.5 bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                          <CheckCircle size={16} weight="fill" /> Setujui
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Approve Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Persetujuan</DialogTitle>
            <DialogDescription>Anda akan menyetujui permintaan berikut. Pastikan data sudah benar.</DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <h4 className="font-bold text-slate-900">{selectedRequest.title}</h4>
                <p className="text-sm text-slate-500">{selectedRequest.requester}</p>
                {selectedRequest.amount && (
                  <p className="mt-2 text-base font-bold text-emerald-600">
                    Rp {selectedRequest.amount.toLocaleString('id-ID')}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pin-input" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  Masukkan PIN Pimpinan
                </Label>
                <Input
                  id="pin-input"
                  type="password"
                  inputMode="numeric"
                  placeholder="******"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value.replace(/\D/g, ''))
                    setPinError('')
                  }}
                  maxLength={6}
                  className={`h-16 text-center text-2xl font-bold ${pinError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  autoComplete="off"
                />
                {pinError && <p className="text-xs font-medium text-red-600">{pinError}</p>}
                <p className="text-xs text-slate-500">
                  PIN diperlukan untuk memastikan persetujuan dilakukan oleh pimpinan yang berwenang.
                </p>
              </div>

              <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
                <p className="font-medium">Permintaan akan disetujui</p>
                <p className="mt-1 text-xs">Tindakan ini akan memproses permintaan untuk tahap berikutnya.</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline-red"
              onClick={() => {
                setIsApproveDialogOpen(false)
                setPinInput('')
                setPinError('')
              }}
            >
              Batal
            </Button>
            <Button onClick={confirmApprove} className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700">
              <CheckCircle size={16} /> Ya, Setujui
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Tolak Permintaan</DialogTitle>
            <DialogDescription>
              Anda akan menolak permintaan <strong>{selectedRequest?.id}</strong>. Mohon isi alasan penolakan.
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                <p className="text-sm font-medium text-slate-700">{selectedRequest.title}</p>
                <p className="text-xs text-slate-500">{selectedRequest.requester}</p>
              </div>

              <div className="flex flex-col gap-y-2">
                <Label>Alasan Penolakan</Label>
                <Textarea
                  placeholder="Contoh: Dokumen tidak lengkap, budget tidak tersedia, dll."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="min-h-[100px] resize-none border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reject-pin-input" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  Masukkan PIN Pimpinan
                </Label>
                <Input
                  id="reject-pin-input"
                  type="password"
                  inputMode="numeric"
                  placeholder="******"
                  value={rejectPinInput}
                  onChange={(e) => {
                    setRejectPinInput(e.target.value.replace(/\D/g, ''))
                    setRejectPinError('')
                  }}
                  maxLength={6}
                  className={`h-16 text-center text-2xl font-bold ${rejectPinError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  autoComplete="off"
                />
                {rejectPinError && <p className="text-xs font-medium text-red-600">{rejectPinError}</p>}
                <p className="text-xs text-slate-500">
                  PIN diperlukan untuk memastikan penolakan dilakukan oleh pimpinan yang berwenang.
                </p>
              </div>

              <div className="rounded-lg bg-red-50 p-3 text-sm text-primary">
                <p className="font-medium">⚠️ Peringatan</p>
                <p className="mt-1 text-xs">Permintaan yang ditolak akan dihapus dari daftar approval.</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline-red"
              onClick={() => {
                setIsRejectDialogOpen(false)
                setRejectReason('')
                setRejectPinInput('')
                setRejectPinError('')
              }}
            >
              Batal
            </Button>
            <Button onClick={confirmReject} className="gap-2 bg-primary text-white hover:bg-red-700">
              <XCircle size={16} /> Tolak Permintaan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
