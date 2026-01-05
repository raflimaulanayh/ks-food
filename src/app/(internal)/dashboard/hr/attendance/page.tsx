'use client'

import {
  MagnifyingGlass,
  Funnel,
  CalendarBlank,
  CheckCircle,
  XCircle,
  DownloadSimple,
  CaretLeft,
  CaretRight
} from '@phosphor-icons/react'
import { useState } from 'react'
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/atoms/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'
import { Textarea } from '@/components/atoms/ui/textarea'

// MOCK DATA
const attendanceData = [
  { id: 1, name: 'Budi Santoso', nik: 'EMP-2024-001', shift: 'Shift 1 (Pagi)', in: '06:55', out: '15:05', status: 'Hadir' },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    nik: 'EMP-2023-045',
    shift: 'Shift 1 (Pagi)',
    in: '07:15',
    out: '15:10',
    status: 'Terlambat'
  },
  { id: 3, name: 'Ahmad Fauzi', nik: 'EMP-2025-012', shift: 'Shift 2 (Siang)', in: '14:50', out: '-', status: 'Hadir' },
  { id: 4, name: 'Eko Prasetyo', nik: 'EMP-2022-089', shift: 'Shift 1 (Pagi)', in: '-', out: '-', status: 'Alpha' }
]

const leaveData = [
  {
    id: 101,
    name: 'Lina Wijaya',
    type: 'Cuti Tahunan',
    date: '12 Jan - 14 Jan 2026',
    reason: 'Acara keluarga di luar kota',
    status: 'Pending'
  },
  {
    id: 102,
    name: 'Dewi Lestari',
    type: 'Sakit',
    date: '04 Jan 2026',
    reason: 'Demam tinggi (Surat Dokter terlampir)',
    status: 'Pending'
  },
  {
    id: 103,
    name: 'Rudi Hartono',
    type: 'Cuti Tahunan',
    date: '20 Jan 2026',
    reason: 'Mengurus administrasi bank',
    status: 'Approved'
  }
]

export default function AttendancePage() {
  // Interaction State
  const [isApproveOpen, setIsApproveOpen] = useState(false)
  const [isRejectOpen, setIsRejectOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<{
    id: number
    name: string
    type: string
    date: string
    reason: string
    status: string
  } | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const handleApproveClick = (req: (typeof leaveData)[0]) => {
    setSelectedRequest(req)
    setIsApproveOpen(true)
  }

  const handleRejectClick = (req: (typeof leaveData)[0]) => {
    setSelectedRequest(req)
    setRejectReason('')
    setIsRejectOpen(true)
  }

  const confirmApprove = () => {
    setIsApproveOpen(false)
    toast.success('Cuti Disetujui!', {
      description: `Pengajuan cuti ${selectedRequest?.name} berhasil disetujui`
    })
  }

  const confirmReject = () => {
    if (!rejectReason.trim()) {
      toast.error('Alasan diperlukan', {
        description: 'Mohon isi alasan penolakan terlebih dahulu'
      })

      return
    }
    setIsRejectOpen(false)
    toast.error('Cuti Ditolak', {
      description: `Pengajuan cuti ${selectedRequest?.name} telah ditolak`
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Hadir':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'Terlambat':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'Alpha':
        return 'bg-red-50 text-red-700 border-red-200'
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'Rejected':
        return 'bg-red-50 text-red-700 border-red-200'
      case 'Pending':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200'
    }
  }

  return (
    <div className="space-y-6 pt-2 pb-10">
      {/* HEADER */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manajemen Kehadiran</h1>
          <p className="mt-1 text-sm text-slate-500">Monitoring absensi harian dan persetujuan cuti pegawai.</p>
        </div>
        <Button className="gap-2 bg-emerald-600 text-white shadow-sm hover:bg-emerald-700">
          <DownloadSimple size={18} weight="bold" /> Download Laporan
        </Button>
      </div>

      {/* MAIN CARD CONTAINER */}
      <Tabs defaultValue="logs" className="w-full">
        <Card className="overflow-hidden rounded-xl border-slate-200 bg-white shadow-sm">
          {/* TABS HEADER (Clean Underline Style) */}
          <div className="border-b border-slate-200 bg-white px-6 pt-2">
            <TabsList className="h-auto gap-8 bg-transparent p-0">
              <TabsTrigger
                value="logs"
                className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-slate-500 hover:text-slate-700 data-[state=active]:border-primary data-[state=active]:text-primary"
              >
                Log Absensi Harian
              </TabsTrigger>
              <TabsTrigger
                value="leave"
                className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-slate-500 hover:text-slate-700 data-[state=active]:border-primary data-[state=active]:text-primary"
              >
                Pengajuan Cuti / Izin{' '}
                <Badge className="ml-2 h-5 rounded-full border-0 bg-amber-100 px-1.5 text-amber-700 hover:bg-amber-200">
                  2
                </Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: ATTENDANCE LOGS */}
          <TabsContent value="logs" className="m-0">
            {/* Toolbar */}
            <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-100 bg-white p-4 md:flex-row">
              <div className="relative w-full md:max-w-md">
                <MagnifyingGlass className="absolute top-2.5 left-3 text-slate-400" size={18} />
                <Input placeholder="Cari Pegawai atau NIK..." className="border-slate-200 bg-white pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline-red" className="gap-2 border-slate-200 text-slate-600">
                  <CalendarBlank size={16} /> Hari Ini
                </Button>
                <Button variant="outline-red" className="gap-2 border-slate-200 text-slate-600">
                  <Funnel size={16} /> Semua Shift
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-600">Pegawai</TableHead>
                    <TableHead className="font-semibold text-slate-600">Shift</TableHead>
                    <TableHead className="font-semibold text-slate-600">Jam Masuk</TableHead>
                    <TableHead className="font-semibold text-slate-600">Jam Pulang</TableHead>
                    <TableHead className="text-center font-semibold text-slate-600">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((row) => (
                    <TableRow
                      key={row.id}
                      className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/50"
                    >
                      <TableCell>
                        <div className="font-bold text-slate-800">{row.name}</div>
                        <div className="font-mono text-xs text-slate-500">{row.nik}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-slate-200 bg-slate-100 font-normal text-slate-600">
                          {row.shift}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`font-mono font-medium ${row.status === 'Terlambat' ? 'text-amber-600' : 'text-slate-700'}`}
                      >
                        {row.in}
                      </TableCell>
                      <TableCell className="font-mono text-slate-500">{row.out}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={`${getStatusBadge(row.status)} border-0 px-2.5 shadow-sm`}>
                          {row.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* TAB 2: LEAVE REQUESTS */}
          <TabsContent value="leave" className="m-0">
            {/* Toolbar */}
            <div className="flex gap-4 border-b border-slate-100 bg-white p-4">
              <div className="relative w-full md:max-w-md">
                <MagnifyingGlass className="absolute top-2.5 left-3 text-slate-400" size={18} />
                <Input placeholder="Cari Pengajuan..." className="border-slate-200 bg-white pl-10" />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-600">Pegawai</TableHead>
                    <TableHead className="font-semibold text-slate-600">Jenis Cuti</TableHead>
                    <TableHead className="font-semibold text-slate-600">Tanggal</TableHead>
                    <TableHead className="font-semibold text-slate-600">Alasan</TableHead>
                    <TableHead className="text-center font-semibold text-slate-600">Status</TableHead>
                    <TableHead className="text-right font-semibold text-slate-600">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveData.map((row) => (
                    <TableRow
                      key={row.id}
                      className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/50"
                    >
                      <TableCell className="font-bold text-slate-800">{row.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-slate-200 bg-white text-slate-600 shadow-sm">
                          {row.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">{row.date}</TableCell>
                      <TableCell className="max-w-[200px] truncate text-sm text-slate-500 italic">{row.reason}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={`${getStatusBadge(row.status)} border-0 px-2.5 shadow-sm`}>
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {row.status === 'Pending' ? (
                          <div className="flex justify-end gap-2">
                            <Button
                              size="icon"
                              variant="outline-red"
                              onClick={() => handleRejectClick(row)}
                              className="h-8 w-8 border-slate-200 text-primary shadow-sm hover:border-red-200 hover:bg-red-50"
                            >
                              <XCircle size={18} weight="bold" />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline-red"
                              onClick={() => handleApproveClick(row)}
                              className="h-8 w-8 border-slate-200 text-emerald-600 shadow-sm hover:border-emerald-200 hover:bg-emerald-50"
                            >
                              <CheckCircle size={18} weight="bold" />
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Selesai</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* PAGINATION FOOTER */}
          <div className="flex items-center justify-between border-t border-slate-100 bg-white p-4">
            <span className="text-sm text-slate-500">
              Menampilkan <span className="font-bold text-slate-700">4</span> dari{' '}
              <span className="font-bold text-slate-700">128</span> data
            </span>
            <div className="flex gap-2">
              <Button variant="outline-slate" size="sm" disabled>
                <CaretLeft size={14} /> Previous
              </Button>
              <Button variant="outline-slate" size="sm">
                Next <CaretRight size={14} />
              </Button>
            </div>
          </div>
        </Card>
      </Tabs>

      {/* MODAL: APPROVE CONFIRMATION */}
      <Dialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-800">
              <CheckCircle size={24} className="text-emerald-500" weight="fill" /> Setujui Pengajuan?
            </DialogTitle>
            <DialogDescription className="pt-2">
              Anda akan menyetujui pengajuan cuti untuk <b>{selectedRequest?.name}</b>. Tindakan ini akan mengupdate kuota
              cuti pegawai.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline-red" onClick={() => setIsApproveOpen(false)}>
              Batal
            </Button>
            <Button className="bg-emerald-600 text-white hover:bg-emerald-700" onClick={confirmApprove}>
              Ya, Setujui
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL: REJECT REASON */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-800">
              <XCircle size={24} className="text-red-500" weight="fill" /> Tolak Pengajuan
            </DialogTitle>
            <DialogDescription>
              Mohon berikan alasan penolakan untuk <b>{selectedRequest?.name}</b> agar dapat ditinjau oleh pegawai.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <Label className="mb-2 block font-medium text-slate-700">
              Alasan Penolakan <span className="text-red-500">*</span>
            </Label>
            <Textarea
              placeholder="Contoh: Jadwal produksi padat, kuota tim penuh..."
              className="resize-none focus:border-red-500 focus:ring-red-500"
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline-red" onClick={() => setIsRejectOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={confirmReject}>
              Tolak Pengajuan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
