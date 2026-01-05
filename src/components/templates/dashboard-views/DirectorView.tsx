'use client'

import {
  Clock,
  Money,
  Wallet,
  ChartPie,
  Signature,
  TrendUp,
  WarningCircle,
  CheckCircle,
  XCircle,
  ShoppingCartSimple,
  Bank,
  Users,
  ArrowRight,
  Key
} from '@phosphor-icons/react'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { toast } from 'sonner'

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
import { Textarea } from '@/components/atoms/ui/textarea'
import { DashboardHeader } from '@/components/molecules/dashboard/dashboard-header'

// MOCK DATA
const financialTrend = [
  { month: 'Jan', revenue: 4500, profit: 1200 },
  { month: 'Feb', revenue: 4700, profit: 1300 },
  { month: 'Mar', revenue: 4200, profit: 1100 },
  { month: 'Apr', revenue: 5100, profit: 1500 },
  { month: 'May', revenue: 5300, profit: 1600 },
  { month: 'Jun', revenue: 5800, profit: 1800 }
]

const pendingApprovals = [
  {
    id: 'PO-2601-999',
    type: 'Purchase Order',
    requester: 'Dept. Procurement',
    amount: 'Rp 150.000.000',
    urgent: true
  },
  {
    id: 'REC-2602-001',
    type: 'New Hire',
    requester: 'HR Manager',
    amount: '',
    urgent: false
  },
  {
    id: 'MKT-BUD-Q2',
    type: 'Budget Approval',
    requester: 'Dept. Marketing',
    amount: 'Rp 45.000.000',
    urgent: true
  }
]

export default function DirectorView() {
  const [approvals, setApprovals] = useState(pendingApprovals)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [selectedApproval, setSelectedApproval] = useState<(typeof pendingApprovals)[0] | null>(null)
  const [rejectReason, setRejectReason] = useState('')
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState('')
  const [rejectPinInput, setRejectPinInput] = useState('')
  const [rejectPinError, setRejectPinError] = useState('')

  const handleApproveClick = (item: (typeof pendingApprovals)[0]) => {
    setSelectedApproval(item)
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

    if (selectedApproval) {
      setApprovals((prev) => prev.filter((a) => a.id !== selectedApproval.id))
      toast.success('Persetujuan Diberikan', {
        description: `${selectedApproval.id} telah disetujui`
      })
      setIsApproveDialogOpen(false)
      setSelectedApproval(null)
      setPinInput('')
      setPinError('')
    }
  }

  const handleRejectClick = (item: (typeof pendingApprovals)[0]) => {
    setSelectedApproval(item)
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

    if (selectedApproval) {
      setApprovals((prev) => prev.filter((a) => a.id !== selectedApproval.id))
      toast.error('Permohonan Ditolak', {
        description: `${selectedApproval.id} ditolak: ${rejectReason}`
      })
      setIsRejectDialogOpen(false)
      setSelectedApproval(null)
      setRejectReason('')
      setRejectPinInput('')
      setRejectPinError('')
    }
  }

  const formatIDR = (num: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num * 1000000)

  const urgentCount = approvals.filter((a) => a.urgent).length

  return (
    <div className="space-y-6 pt-2 pb-10">
      <DashboardHeader
        title="Executive Dashboard"
        subtitle="Ringkasan kesehatan bisnis dan pusat persetujuan strategis."
        onFilterChange={(filters) => {
          // Handle filter change if needed
          console.info('Filter changed:', filters)
        }}
      />

      {/* KPI CARDS */}
      <div className="grid animate-in gap-6 duration-500 fade-in slide-in-from-bottom-4 md:grid-cols-4">
        <Card className="group relative overflow-hidden border-l-[6px] border-emerald-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Net Profit (YTD)</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">{formatIDR(180)}</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                <TrendUp size={10} weight="bold" /> +12% dari target
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-emerald-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <Money size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-blue-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Total Revenue</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">{formatIDR(580)}</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                <TrendUp size={10} weight="bold" /> +5% MoM
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-blue-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <Wallet size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-red-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Operational Cost</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">{formatIDR(400)}</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-100 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                Within budget
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-red-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <ChartPie size={90} weight="duotone" />
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-l-[6px] border-amber-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Need Approval</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">{approvals.length} Dokumen</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-100 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                <WarningCircle size={10} weight="bold" /> {urgentCount} Urgent
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 rotate-12 text-amber-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
            <Signature size={90} weight="duotone" />
          </div>
        </Card>
      </div>

      {/* CHART & APPROVAL SECTION */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* CHART */}
        <Card className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <div className="border-b bg-white p-4">
            <h3 className="font-bold text-slate-800">Performa Finansial 2026</h3>
            <p className="text-xs text-slate-500">Revenue vs Net Profit (dalam Juta IDR).</p>
          </div>
          <div className="flex-1 p-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialTrend}>
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
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" fill="#10b981" name="Net Profit" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* APPROVAL CENTER */}
        <Card className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b bg-white p-4">
            <h3 className="font-bold text-slate-800">Approval Center</h3>
            <Badge className="bg-amber-50 text-amber-600">{approvals.length} Pending</Badge>
          </div>
          <div className="space-y-3 p-3">
            {approvals.map((item) => (
              <div key={item.id} className="space-y-3 rounded-lg border border-slate-200 bg-slate-50/30 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100">
                      {item.type.includes('Purchase') ? (
                        <ShoppingCartSimple size={20} weight="fill" className="text-purple-600" />
                      ) : item.type.includes('Capital') ? (
                        <Bank size={20} weight="fill" className="text-purple-600" />
                      ) : (
                        <Users size={20} weight="fill" className="text-purple-600" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-bold text-slate-900">{item.id}</h4>
                        {item.urgent && (
                          <Badge className="h-5 border-0 bg-red-100 px-2 text-[11px] font-semibold text-red-600">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-sm text-slate-500">{item.type}</p>
                      <p className="truncate text-xs text-slate-400">{item.requester}</p>
                    </div>
                  </div>
                  {item.amount && (
                    <span className="shrink-0 text-right text-sm font-bold whitespace-nowrap text-slate-900">
                      {item.amount}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline-red" onClick={() => handleRejectClick(item)} className="h-9 gap-1.5">
                    <XCircle size={14} /> Reject
                  </Button>
                  <Button
                    onClick={() => handleApproveClick(item)}
                    className="h-9 gap-1.5 bg-emerald-600 text-xs font-medium text-white hover:bg-emerald-700"
                  >
                    <CheckCircle size={14} /> Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t bg-white p-3">
            <Button url="/dashboard/approvals" variant="default" className="w-full">
              Lihat Semua Approval <ArrowRight size={16} />
            </Button>
          </div>
        </Card>
      </div>

      {/* APPROVE CONFIRMATION DIALOG */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Persetujuan</DialogTitle>
            <DialogDescription>Anda akan menyetujui permohonan berikut. Pastikan data sudah benar.</DialogDescription>
          </DialogHeader>

          {selectedApproval && (
            <div className="space-y-4 py-4">
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100">
                    {selectedApproval.type.includes('Purchase') ? (
                      <ShoppingCartSimple size={20} weight="fill" className="text-purple-600" />
                    ) : selectedApproval.type.includes('Capital') ? (
                      <Bank size={20} weight="fill" className="text-purple-600" />
                    ) : (
                      <Users size={20} weight="fill" className="text-purple-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900">{selectedApproval.id}</h4>
                    <p className="text-sm text-slate-500">{selectedApproval.type}</p>
                    <p className="text-xs text-slate-400">{selectedApproval.requester}</p>
                  </div>
                  {selectedApproval.amount && (
                    <span className="text-base font-bold text-emerald-600">{selectedApproval.amount}</span>
                  )}
                </div>
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
                <p className="font-medium">Permohonan akan disetujui</p>
                <p className="mt-1 text-xs">Tindakan ini akan memproses permohonan untuk tahap berikutnya.</p>
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

      {/* REJECT DIALOG WITH REASON */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Tolak Permohonan</DialogTitle>
            <DialogDescription>
              Anda akan menolak permohonan <strong>{selectedApproval?.id}</strong>. Mohon isi alasan penolakan.
            </DialogDescription>
          </DialogHeader>

          {selectedApproval && (
            <div className="space-y-4 py-4">
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                <p className="text-sm font-medium text-slate-700">{selectedApproval.type}</p>
                <p className="text-xs text-slate-500">{selectedApproval.requester}</p>
                {selectedApproval.amount && (
                  <p className="mt-1 text-sm font-bold text-slate-900">{selectedApproval.amount}</p>
                )}
              </div>

              <div className="flex flex-col gap-y-2">
                <Label>Alasan Penolakan</Label>
                <Textarea
                  placeholder="Contoh: Tidak sesuai budget, perlu revisi dokumen, dll."
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

              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                <p className="font-medium">⚠️ Peringatan</p>
                <p className="mt-1 text-xs">Permohonan yang ditolak akan dihapus dari daftar approval.</p>
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
            <Button onClick={confirmReject} className="gap-2 bg-red-600 text-white hover:bg-red-700">
              <XCircle size={16} /> Tolak Permohonan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
