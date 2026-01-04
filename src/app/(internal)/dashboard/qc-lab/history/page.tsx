'use client'

import {
  Funnel,
  MagnifyingGlass,
  CaretLeft,
  CaretRight,
  Eye,
  DownloadSimple,
  CheckCircle,
  XCircle,
  Printer
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

type InspectionRecord = {
  id: string
  date: string
  refNo: string
  itemName: string
  itemDetail: string
  keyParameter: string
  status: 'Passed' | 'Rejected'
  inspector: string
  visualCheck: string
  aroma: string
  pH: string
  moisture: string
  viscosity?: string
  notes: string
}

// MOCK HISTORICAL DATA
const mockInspectionHistory: InspectionRecord[] = [
  {
    id: 'INS-2026-001',
    date: '03 Jan 2026',
    refNo: 'QC-IN-001 / PO-2601-002',
    itemName: 'Minyak Goreng',
    itemDetail: 'CV. Sumber Makmur',
    keyParameter: 'pH: 7.2',
    status: 'Passed',
    inspector: 'Budi S.',
    visualCheck: 'Bersih, tidak ada endapan',
    aroma: 'Normal, tidak tengik',
    pH: '7.2',
    moisture: '0.1%',
    viscosity: '45 cP',
    notes: 'Lolos semua parameter standar'
  },
  {
    id: 'INS-2026-002',
    date: '03 Jan 2026',
    refNo: 'QC-IN-002 / PO-2601-005',
    itemName: 'Tepung Terigu',
    itemDetail: 'PT. Aneka Pangan',
    keyParameter: 'Moisture: 13.5%',
    status: 'Passed',
    inspector: 'Siti R.',
    visualCheck: 'Putih bersih, tekstur halus',
    aroma: 'Khas tepung, normal',
    pH: '6.8',
    moisture: '13.5%',
    notes: 'Sesuai spesifikasi'
  },
  {
    id: 'INS-2026-003',
    date: '02 Jan 2026',
    refNo: 'QC-FG-880 / BATCH-2400',
    itemName: 'Kecap Manis Premium',
    itemDetail: 'Production Line 1',
    keyParameter: 'Viscosity: 120 cP',
    status: 'Passed',
    inspector: 'Ahmad F.',
    visualCheck: 'Warna coklat gelap konsisten',
    aroma: 'Manis, khas kecap',
    pH: '4.5',
    moisture: '42%',
    viscosity: '120 cP',
    notes: 'Kualitas premium, siap distribusi'
  },
  {
    id: 'INS-2026-004',
    date: '02 Jan 2026',
    refNo: 'QC-FG-879 / BATCH-2399',
    itemName: 'Saos Sambal Botol',
    itemDetail: 'Production Line 2',
    keyParameter: 'pH: 3.2',
    status: 'Rejected',
    inspector: 'Dewi L.',
    visualCheck: 'Warna terlalu pucat',
    aroma: 'Kurang pedas',
    pH: '3.2',
    moisture: '65%',
    viscosity: '85 cP',
    notes: 'Ditolak: warna tidak sesuai standar, kadar cabai rendah'
  },
  {
    id: 'INS-2026-005',
    date: '01 Jan 2026',
    refNo: 'QC-IN-003 / PO-2601-001',
    itemName: 'Gula Pasir',
    itemDetail: 'PT. Manis Jaya',
    keyParameter: 'Moisture: 0.05%',
    status: 'Passed',
    inspector: 'Budi S.',
    visualCheck: 'Kristal putih bersih',
    aroma: 'Tidak berbau',
    pH: '7.0',
    moisture: '0.05%',
    notes: 'Grade A, lulus inspeksi'
  }
]

export default function QCHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedRecord, setSelectedRecord] = useState<InspectionRecord | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handleViewDetail = (record: InspectionRecord) => {
    setSelectedRecord(record)
    setIsDetailOpen(true)
  }

  const handleExport = () => {
    toast.success('Data sedang diekspor ke format Excel (.xlsx)')
  }

  const handlePrintCOA = () => {
    toast.info('Fitur print COA akan segera hadir')
  }

  const getStatusBadge = (status: string) => {
    return status === 'Passed'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
      : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
  }

  // Filter data
  const filteredData = mockInspectionHistory.filter((record) => {
    const matchesSearch =
      searchTerm === '' ||
      record.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.refNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || record.status.toLowerCase() === filterStatus

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 pt-2 pb-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Riwayat Pemeriksaan Kualitas</h1>
          <p className="mt-1 text-sm text-slate-500">Arsip data hasil pengujian bahan baku dan produk jadi.</p>
        </div>
        <Button onClick={handleExport} className="gap-2 bg-emerald-600 text-white shadow-sm hover:bg-emerald-700">
          <DownloadSimple size={18} weight="bold" /> Export Data (.xlsx)
        </Button>
      </div>

      {/* MAIN CONTENT CARD (MATCHING PO STYLE) */}
      <Card className="overflow-hidden rounded-xl border-slate-200 bg-white shadow-sm">
        {/* TOOLBAR */}
        <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-100 bg-white p-4 md:flex-row">
          <div className="relative w-full md:max-w-md">
            <MagnifyingGlass className="absolute top-2.5 left-3 text-slate-400" size={18} />
            <Input
              placeholder="Cari No. Referensi atau Nama Item..."
              className="border-slate-200 bg-white pl-10 focus:border-red-500 focus:ring-red-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex w-full items-center gap-3 md:w-auto">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px] border-slate-200 bg-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 border-slate-200 text-slate-600">
              <Funnel size={16} /> Filter
            </Button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-semibold text-slate-600">Tanggal</TableHead>
                <TableHead className="font-semibold text-slate-600">No. Referensi</TableHead>
                <TableHead className="font-semibold text-slate-600">Item</TableHead>
                <TableHead className="font-semibold text-slate-600">Parameter Kunci</TableHead>
                <TableHead className="text-center font-semibold text-slate-600">Status</TableHead>
                <TableHead className="font-semibold text-slate-600">Inspector</TableHead>
                <TableHead className="text-right font-semibold text-slate-600">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/50"
                >
                  <TableCell className="font-medium text-slate-700">{row.date}</TableCell>
                  <TableCell>
                    <div className="font-mono text-xs font-bold text-slate-600">{row.id}</div>
                    <div className="text-[10px] text-slate-400">{row.refNo}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-slate-800">{row.itemName}</div>
                    <div className="text-xs text-slate-500">{row.itemDetail}</div>
                  </TableCell>
                  <TableCell className="text-slate-600">{row.keyParameter}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={`${getStatusBadge(row.status)} border-0 px-2.5 py-0.5 shadow-sm`}>
                      {row.status === 'Passed' ? <span className="mr-1">●</span> : <span className="mr-1">✕</span>}
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{row.inspector}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetail(row)}
                      className="h-8 gap-1 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Eye size={16} /> <span className="text-xs">Detail</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-white p-4">
          <span className="text-sm text-slate-500">
            Menampilkan <span className="font-bold text-slate-700">{filteredData.length}</span> dari{' '}
            <span className="font-bold text-slate-700">{mockInspectionHistory.length}</span> data
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1 border-slate-200 text-slate-600" disabled>
              <CaretLeft size={14} /> Previous
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1 border-slate-200 text-slate-600">
              Next <CaretRight size={14} />
            </Button>
          </div>
        </div>
      </Card>

      {/* DETAIL MODAL (READ-ONLY REPORT) */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedRecord && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Certificate of Analysis (COA)</DialogTitle>
                <DialogDescription>Laporan hasil pemeriksaan kualitas</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {/* HEADER INFO */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-semibold text-slate-700">No. Inspeksi</p>
                      <p className="text-slate-900">{selectedRecord.id}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700">Tanggal</p>
                      <p className="text-slate-900">{selectedRecord.date}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700">Item Name</p>
                      <p className="font-bold text-slate-900">{selectedRecord.itemName}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700">Batch / Ref</p>
                      <p className="text-slate-900">{selectedRecord.refNo}</p>
                    </div>
                  </div>
                </div>

                {/* TEST PARAMETERS */}
                <div>
                  <h3 className="mb-3 font-bold text-slate-800">Parameter Pengujian</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="text-xs font-semibold text-slate-500">Visual Check</p>
                      <p className="mt-1 text-sm text-slate-800">{selectedRecord.visualCheck}</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="text-xs font-semibold text-slate-500">Aroma / Rasa</p>
                      <p className="mt-1 text-sm text-slate-800">{selectedRecord.aroma}</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="text-xs font-semibold text-slate-500">pH Level</p>
                      <p className="mt-1 text-sm font-bold text-slate-900">{selectedRecord.pH}</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="text-xs font-semibold text-slate-500">Kadar Air (Moisture)</p>
                      <p className="mt-1 text-sm font-bold text-slate-900">{selectedRecord.moisture}</p>
                    </div>
                    {selectedRecord.viscosity && (
                      <div className="col-span-2 rounded-lg border border-slate-200 bg-white p-3">
                        <p className="text-xs font-semibold text-slate-500">Viscosity</p>
                        <p className="mt-1 text-sm font-bold text-slate-900">{selectedRecord.viscosity}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* NOTES */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">Catatan Inspector</p>
                  <p className="mt-1 text-sm text-slate-800">{selectedRecord.notes}</p>
                </div>

                {/* FINAL STATUS */}
                <div className="flex items-center justify-between rounded-lg border-2 border-slate-200 bg-white p-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Status Akhir</p>
                    <Badge variant="outline" className={`${getStatusBadge(selectedRecord.status)} mt-1 border-0`}>
                      {selectedRecord.status === 'Passed' ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle size={14} weight="fill" /> PASSED - RELEASE
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <XCircle size={14} weight="fill" /> REJECTED - HOLD
                        </span>
                      )}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-500">Inspector</p>
                    <p className="mt-1 font-bold text-slate-900">{selectedRecord.inspector}</p>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Tutup
                </Button>
                <Button onClick={handlePrintCOA} className="gap-2 bg-blue-600 text-white hover:bg-blue-700">
                  <Printer size={16} weight="bold" /> Print COA
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
