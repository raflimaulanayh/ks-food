'use client'

import {
  UploadSimple,
  MagnifyingGlass,
  CaretLeft,
  CaretRight,
  Eye,
  CheckCircle,
  CreditCard,
  DownloadSimple,
  WarningCircle
} from '@phosphor-icons/react'
import { useState } from 'react'

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/atoms/ui/table'

// MOCK DATA
const invoiceData = [
  {
    id: 'INV-2026-001',
    date: '28 Des 2025',
    supplier: 'PT. Aneka Pangan',
    ref: 'PO-2601-002',
    due: '03 Jan 2026',
    amount: 'Rp 450.000.000',
    status: 'Lunas',
    overdue: false
  },
  {
    id: 'INV-2026-002',
    date: '29 Des 2025',
    supplier: 'CV. Sumber Makmur',
    ref: 'PO-2601-005',
    due: '04 Jan 2026',
    amount: 'Rp 120.000.000',
    status: 'Belum Dibayar',
    overdue: false
  },
  {
    id: 'INV-2025-998',
    date: '20 Des 2025',
    supplier: 'PT. Manis Jaya',
    ref: 'PO-2512-089',
    due: '27 Des 2025',
    amount: 'Rp 85.000.000',
    status: 'Lunas',
    overdue: false
  },
  {
    id: 'INV-2025-999',
    date: '22 Des 2025',
    supplier: 'UD. Tani Jaya',
    ref: 'PO-2512-091',
    due: '05 Jan 2026',
    amount: 'Rp 65.000.000',
    status: 'Belum Dibayar',
    overdue: true
  }
]

export default function InvoicesPage() {
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isProofOpen, setIsProofOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)

  const handleViewProof = (inv: any) => {
    setSelectedInvoice(inv)
    setIsProofOpen(true)
  }

  const handleUploadSubmit = () => {
    setIsUploadOpen(false)
    alert('Invoice berhasil diupload ke sistem!')
  }

  return (
    <div className="space-y-6 pt-2 pb-10">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Daftar Tagihan Supplier (Invoices)</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola pembayaran hutang dagang dan riwayat transaksi.</p>
        </div>
        <Button onClick={() => setIsUploadOpen(true)} className="gap-2 bg-blue-600 text-white shadow-sm hover:bg-blue-700">
          <UploadSimple size={18} weight="bold" /> Upload Invoice Manual
        </Button>
      </div>

      {/* MAIN CONTENT */}
      <Card className="overflow-hidden rounded-xl border-slate-200 bg-white shadow-sm">
        {/* TOOLBAR */}
        <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-100 bg-white p-4 md:flex-row">
          <div className="relative w-full md:max-w-md">
            <MagnifyingGlass className="absolute top-2.5 left-3 text-slate-400" size={18} />
            <Input placeholder="Cari No. Invoice atau Supplier..." className="border-slate-200 bg-white pl-10" />
          </div>
          <div className="flex rounded-lg bg-slate-100 p-1">
            <button className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900">Belum Dibayar</button>
            <button className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900">Lunas</button>
            <button className="rounded-md bg-white px-4 py-1.5 text-sm font-medium text-slate-900 shadow-sm">Semua</button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-semibold text-slate-600">Invoice Info</TableHead>
                <TableHead className="font-semibold text-slate-600">Supplier</TableHead>
                <TableHead className="font-semibold text-slate-600">Ref PO</TableHead>
                <TableHead className="font-semibold text-slate-600">Jatuh Tempo</TableHead>
                <TableHead className="text-right font-semibold text-slate-600">Nominal</TableHead>
                <TableHead className="text-center font-semibold text-slate-600">Status</TableHead>
                <TableHead className="text-right font-semibold text-slate-600">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceData.map((inv) => (
                <TableRow key={inv.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <TableCell>
                    <div className="font-bold text-slate-700">{inv.id}</div>
                    <div className="text-xs text-slate-500">{inv.date}</div>
                  </TableCell>
                  <TableCell className="font-medium text-slate-800">{inv.supplier}</TableCell>
                  <TableCell>
                    <span className="cursor-pointer font-mono text-xs text-blue-600 hover:underline">{inv.ref}</span>
                  </TableCell>
                  <TableCell>
                    <div className={`${inv.overdue ? 'font-bold text-primary' : 'text-slate-600'}`}>{inv.due}</div>
                    {inv.overdue && (
                      <span className="flex items-center gap-1 text-[10px] text-red-500">
                        <WarningCircle size={10} weight="fill" /> Terlambat
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-bold text-slate-800">{inv.amount}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={`${
                        inv.status === 'Lunas'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 bg-slate-100 text-slate-600'
                      } border-0 shadow-sm`}
                    >
                      {inv.status === 'Lunas' && <CheckCircle className="mr-1" size={12} weight="fill" />}
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {inv.status === 'Lunas' ? (
                      <Button
                        size="sm"
                        variant="outline-red"
                        onClick={() => handleViewProof(inv)}
                        className="h-8 gap-2 border-slate-200 text-slate-600"
                      >
                        <Eye size={14} /> Lihat Bukti
                      </Button>
                    ) : (
                      <Button size="sm" className="h-8 gap-2 bg-blue-600 text-white shadow-sm hover:bg-blue-700">
                        <CreditCard size={14} /> Proses Bayar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-white p-4">
          <span className="text-sm text-slate-500">
            Menampilkan <span className="font-bold text-slate-700">4</span> dari{' '}
            <span className="font-bold text-slate-700">4</span> data
          </span>
          <div className="flex gap-2">
            <Button variant="outline-red" size="sm" className="h-8 gap-1 border-slate-200 text-slate-600" disabled>
              <CaretLeft size={14} /> Previous
            </Button>
            <Button variant="outline-red" size="sm" className="h-8 gap-1 border-slate-200 text-slate-600" disabled>
              Next <CaretRight size={14} />
            </Button>
          </div>
        </div>
      </Card>

      {/* MODAL 1: UPLOAD INVOICE */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Input Tagihan Manual</DialogTitle>
            <DialogDescription>Masukkan data invoice fisik yang diterima dari supplier.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-y-2">
                <Label>No. Invoice</Label>
                <Input placeholder="INV-..." />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Ref. PO</Label>
                <Input placeholder="Cari PO..." />
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Supplier</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-a">PT. Aneka Pangan</SelectItem>
                  <SelectItem value="cv-s">CV. Sumber Makmur</SelectItem>
                  <SelectItem value="pt-m">PT. Manis Jaya</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-y-2">
                <Label>Jatuh Tempo</Label>
                <Input type="date" />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Nominal (Rp)</Label>
                <Input type="number" placeholder="0" />
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Upload Scan File (PDF/JPG)</Label>
              <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 p-6 text-slate-400 hover:bg-slate-50">
                <UploadSimple size={24} className="mb-2" />
                <span className="text-xs">Klik untuk upload dokumen</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline-red" onClick={() => setIsUploadOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleUploadSubmit} className="bg-blue-600 text-white hover:bg-blue-700">
              Simpan Tagihan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: LIHAT BUKTI (PROOF) */}
      <Dialog open={isProofOpen} onOpenChange={setIsProofOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Bukti Pembayaran</DialogTitle>
            <DialogDescription>ID Transaksi: TRX-88291002</DialogDescription>
          </DialogHeader>

          {/* MOCK RECEIPT VISUALIZATION */}
          <div className="flex flex-col items-center gap-4 rounded-lg border border-slate-200 bg-slate-100 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
              <CheckCircle size={24} className="text-emerald-500" weight="fill" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-800">{selectedInvoice?.amount}</h3>
              <p className="text-xs text-slate-500">Berhasil ditransfer ke {selectedInvoice?.supplier}</p>
            </div>
            <div className="my-2 w-full border-t border-dashed border-slate-300"></div>
            <div className="w-full space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Bank Tujuan</span>
                <span className="font-bold text-slate-700">BCA - 123456789</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Tanggal</span>
                <span className="font-bold text-slate-700">{selectedInvoice?.date} 14:30</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Reff</span>
                <span className="font-bold text-slate-700">{selectedInvoice?.id}</span>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:justify-between">
            <Button variant="ghost" size="sm" className="text-slate-500">
              <DownloadSimple size={16} className="mr-2" /> Unduh
            </Button>
            <Button onClick={() => setIsProofOpen(false)}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
