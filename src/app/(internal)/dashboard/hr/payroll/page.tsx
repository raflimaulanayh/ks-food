'use client'

import {
  Money,
  ChartPie,
  TrendDown,
  Play,
  MagnifyingGlass,
  FileText,
  DownloadSimple,
  PaperPlaneTilt,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/atoms/ui/table'

// INITIAL MOCK DATA
const initialPayroll = [
  {
    id: 1,
    name: 'Budi Santoso',
    nik: 'EMP-2024-001',
    role: 'Supervisor QC',
    basic: 8500000,
    allow: 1500000,
    deduct: 350000,
    status: 'Lunas'
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    nik: 'EMP-2023-045',
    role: 'Staff Finance',
    basic: 7000000,
    allow: 1200000,
    deduct: 280000,
    status: 'Lunas'
  },
  {
    id: 3,
    name: 'Ahmad Fauzi',
    nik: 'EMP-2025-012',
    role: 'Operator Produksi',
    basic: 5500000,
    allow: 800000,
    deduct: 220000,
    status: 'Pending'
  },
  {
    id: 4,
    name: 'Lina Wijaya',
    nik: 'EMP-2025-018',
    role: 'Staff HR',
    basic: 6500000,
    allow: 1000000,
    deduct: 260000,
    status: 'Lunas'
  },
  {
    id: 5,
    name: 'Eko Prasetyo',
    nik: 'EMP-2022-089',
    role: 'Driver Logistik',
    basic: 4500000,
    allow: 600000,
    deduct: 180000,
    status: 'Pending'
  }
]

export default function PayrollPage() {
  const [payrollData, setPayrollData] = useState(initialPayroll)

  // MODAL STATES
  const [isRunModalOpen, setIsRunModalOpen] = useState(false)
  const [isSlipModalOpen, setIsSlipModalOpen] = useState(false)
  const [selectedEmp, setSelectedEmp] = useState<(typeof initialPayroll)[0] | null>(null)

  // CALCULATIONS
  const totalPayroll = payrollData.reduce((acc, curr) => acc + (curr.basic + curr.allow - curr.deduct), 0)
  const totalDeduction = payrollData.reduce((acc, curr) => acc + curr.deduct, 0)
  const pendingCount = payrollData.filter((p) => p.status === 'Pending').length
  const paidCount = payrollData.filter((p) => p.status === 'Lunas').length
  const progress = Math.round((paidCount / payrollData.length) * 100)

  // FORMATTER
  const formatIDR = (num: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num)

  // HANDLERS
  const handleRunPayroll = () => {
    // Logic: Convert all 'Pending' to 'Lunas'
    const updatedData = payrollData.map((p) => ({
      ...p,
      status: 'Lunas' as const
    }))
    setPayrollData(updatedData)
    setIsRunModalOpen(false)
    toast.success('Payroll Berhasil Diproses!', {
      description: `Pembayaran untuk ${pendingCount} pegawai telah berhasil diproses untuk periode Januari 2026`
    })
  }

  const handleOpenSlip = (emp: (typeof initialPayroll)[0]) => {
    setSelectedEmp(emp)
    setIsSlipModalOpen(true)
  }

  return (
    <div className="space-y-6 pt-2 pb-10">
      {/* HEADER */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Payroll & Gaji</h1>
          <p className="mt-1 text-sm text-slate-500">Manajemen penggajian, tunjangan, dan slip gaji pegawai.</p>
        </div>
        <Button
          onClick={() => setIsRunModalOpen(true)}
          disabled={pendingCount === 0}
          className={`${pendingCount === 0 ? 'bg-slate-300' : 'bg-emerald-600 hover:bg-emerald-700'} gap-2 text-white shadow-sm`}
        >
          <Play size={18} weight="fill" /> {pendingCount === 0 ? 'Semua Terbayar' : 'Proses Payroll'}
        </Button>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="flex items-center justify-between border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Total Payroll (Jan 2026)</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-900">{formatIDR(totalPayroll)}</h3>
          </div>
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <Money size={28} weight="duotone" />
          </div>
        </Card>
        <Card className="flex items-center justify-between border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Status Pembayaran</p>
            <div className="mt-1 flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-slate-900">{progress}% Paid</h3>
              <span className="text-xs text-slate-500">{pendingCount} Pending</span>
            </div>
          </div>
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
            <ChartPie size={28} weight="duotone" />
          </div>
        </Card>
        <Card className="flex items-center justify-between border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Total Potongan</p>
            <h3 className="mt-1 text-2xl font-bold text-red-600">{formatIDR(totalDeduction)}</h3>
          </div>
          <div className="rounded-xl bg-red-50 p-3 text-red-600">
            <TrendDown size={28} weight="duotone" />
          </div>
        </Card>
      </div>

      {/* MAIN TABLE */}
      <Card className="overflow-hidden rounded-xl border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-100 bg-white p-4 md:flex-row">
          <div className="relative w-full md:max-w-md">
            <MagnifyingGlass className="absolute top-2.5 left-3 text-slate-400" size={18} />
            <Input placeholder="Cari Pegawai..." className="border-slate-200 bg-white pl-10" />
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Januari 2026" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jan">Januari 2026</SelectItem>
                <SelectItem value="dec">Desember 2025</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="lunas">Lunas</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-semibold text-slate-600">Pegawai</TableHead>
                <TableHead className="font-semibold text-slate-600">Gaji Pokok</TableHead>
                <TableHead className="font-semibold text-slate-600">Tunjangan</TableHead>
                <TableHead className="font-semibold text-slate-600">Potongan</TableHead>
                <TableHead className="font-semibold text-slate-600">Take Home Pay</TableHead>
                <TableHead className="font-semibold text-slate-600">Status</TableHead>
                <TableHead className="text-right font-semibold text-slate-600">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollData.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/50"
                >
                  <TableCell>
                    <div className="font-bold text-slate-800">{row.name}</div>
                    <div className="text-xs text-slate-500">
                      {row.nik} • {row.role}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-slate-600">{formatIDR(row.basic)}</TableCell>
                  <TableCell className="font-mono text-emerald-600">{formatIDR(row.allow)}</TableCell>
                  <TableCell className="font-mono text-red-600">{formatIDR(row.deduct)}</TableCell>
                  <TableCell className="font-bold text-slate-900">{formatIDR(row.basic + row.allow - row.deduct)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        row.status === 'Lunas'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-amber-200 bg-amber-50 text-amber-700'
                      }
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenSlip(row)}
                      className="h-8 gap-2 border-slate-200 text-slate-600"
                    >
                      <FileText size={14} /> Lihat Slip
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 bg-white p-4">
          <span className="text-sm text-slate-500">
            Menampilkan {payrollData.length} dari {payrollData.length} data
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              <CaretLeft size={14} /> Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next <CaretRight size={14} />
            </Button>
          </div>
        </div>
      </Card>

      {/* MODAL 1: RUN PAYROLL CONFIRMATION */}
      <Dialog open={isRunModalOpen} onOpenChange={setIsRunModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Proses Payroll Bulanan</DialogTitle>
            <DialogDescription>
              Anda akan memproses pembayaran gaji untuk periode <b>Januari 2026</b>.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 rounded-lg border border-slate-100 bg-slate-50 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Total Karyawan (Pending):</span>
              <span className="font-bold text-slate-800">{pendingCount} Orang</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Estimasi Total Transfer:</span>
              <span className="text-lg font-bold text-emerald-600">{formatIDR(totalPayroll)}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRunModalOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleRunPayroll} className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700">
              <Play size={16} weight="fill" /> Proses Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: SLIP GAJI (PAYSLIP) */}
      <Dialog open={isSlipModalOpen} onOpenChange={setIsSlipModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Slip Gaji Elektronik</DialogTitle>
            <DialogDescription>Periode: Januari 2026</DialogDescription>
          </DialogHeader>

          {selectedEmp && (
            <div className="space-y-4 py-2">
              {/* Header Slip */}
              <div className="flex items-center gap-4 border-b border-dashed pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-xl font-bold text-white">
                  KS
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{selectedEmp.name}</h3>
                  <p className="text-xs text-slate-500">
                    {selectedEmp.role} • {selectedEmp.nik}
                  </p>
                </div>
                <div className="ml-auto">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                    {selectedEmp.status}
                  </Badge>
                </div>
              </div>

              {/* Rincian */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Gaji Pokok</span>
                  <span className="font-medium text-slate-900">{formatIDR(selectedEmp.basic)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tunjangan Jabatan</span>
                  <span className="font-medium text-emerald-600">+ {formatIDR(selectedEmp.allow)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Potongan (BPJS/Pajak)</span>
                  <span className="font-medium text-red-600">- {formatIDR(selectedEmp.deduct)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="font-bold text-slate-700">Take Home Pay</span>
                <span className="text-2xl font-bold text-slate-900">
                  {formatIDR(selectedEmp.basic + selectedEmp.allow - selectedEmp.deduct)}
                </span>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" className="gap-2 text-slate-600">
              <PaperPlaneTilt size={16} /> Kirim Email
            </Button>
            <Button className="gap-2 bg-slate-900 text-white">
              <DownloadSimple size={16} /> Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
