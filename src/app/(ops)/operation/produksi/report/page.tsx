'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import {
  Factory,
  QrCode,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Package,
  Calendar,
  ClipboardText,
  Barcode,
  Camera
} from '@phosphor-icons/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import { Input } from '@/components/atoms/ui/input'
import { Label } from '@/components/atoms/ui/label'
import { Textarea } from '@/components/atoms/ui/textarea'
import { QRScanner } from '@/components/molecules/QRScanner'

import { cn } from '@/utils/cn'

// Mock Data - Job Orders
interface JobOrder {
  id: string
  joNumber: string
  productName: string
  targetQty: number
  unit: string
  scheduledDate: string
  status: 'scheduled' | 'in-progress' | 'completed'
  actualQty?: number
  rejectQty?: number
  batchId?: string
  reportedBy?: string
  reportedDate?: string
  notes?: string
}

const MOCK_JOB_ORDERS: JobOrder[] = [
  {
    id: '1',
    joNumber: 'JO-2026-001',
    productName: 'Saos Sambal Bawang 500ml',
    targetQty: 1000,
    unit: 'Botol',
    scheduledDate: '2026-01-04',
    status: 'in-progress'
  },
  {
    id: '2',
    joNumber: 'JO-2026-002',
    productName: 'Bumbu Rendang 250g',
    targetQty: 500,
    unit: 'Pack',
    scheduledDate: '2026-01-04',
    status: 'scheduled'
  },
  {
    id: '3',
    joNumber: 'JO-2025-198',
    productName: 'Saos Tomat Pedas 1L',
    targetQty: 800,
    unit: 'Botol',
    scheduledDate: '2026-01-03',
    status: 'completed',
    actualQty: 780,
    rejectQty: 20,
    batchId: 'BATCH-SAOS-0103',
    reportedBy: 'Ahmad Fauzi',
    reportedDate: '2026-01-03',
    notes: 'Produksi lancar, reject karena kemasan bocor'
  }
]

export default function ProductionReportPage() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [jobOrders, setJobOrders] = useState<JobOrder[]>(MOCK_JOB_ORDERS)
  const [selectedJO, setSelectedJO] = useState<JobOrder | null>(null)
  const [reporting, setReporting] = useState(false)
  const [scanningBatch, setScanningBatch] = useState(false)
  const [useManualInput, setUseManualInput] = useState(false)

  // Form State
  const [scanInput, setScanInput] = useState('')
  const [batchId, setBatchId] = useState('')
  const [actualQty, setActualQty] = useState('')
  const [rejectQty, setRejectQty] = useState('')
  const [notes, setNotes] = useState('')
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/operation/login')
    }
  }, [user, router])

  if (!user) return null

  const handleSelectJO = (jo: JobOrder) => {
    setSelectedJO(jo)
    setReporting(false)
  }

  const handleStartReport = () => {
    setReporting(true)
    setScanningBatch(true)
    setUseManualInput(false)
    setScanned(false)
    setScanInput('')
    setBatchId('')
    setActualQty('')
    setRejectQty('0')
    setNotes('')
  }

  const handleQRScanSuccess = (decodedText: string) => {
    setScanInput(decodedText)
    handleScanBatch()
  }

  const handleScanBatch = () => {
    if (!scanInput) {
      toast.error('Scan QR Code terlebih dahulu')

      return
    }

    // Simulate QR validation
    const generatedBatch = `BATCH-${selectedJO?.productName.split(' ')[1].toUpperCase()}-${scanInput.slice(-4)}`
    setBatchId(generatedBatch)
    setScanned(true)
    setScanningBatch(false) // Close scanner

    toast.success('QR Code Valid!', {
      description: `Batch ID: ${generatedBatch}`
    })
  }

  const handleSubmitReport = () => {
    if (!scanned || !batchId) {
      toast.error('Scan QR Code terlebih dahulu')

      return
    }

    if (!actualQty) {
      toast.error('Jumlah hasil produksi wajib diisi')

      return
    }

    const actual = parseFloat(actualQty)
    const reject = parseFloat(rejectQty || '0')

    if (actual <= 0) {
      toast.error('Jumlah hasil harus lebih dari 0')

      return
    }

    if (reject < 0) {
      toast.error('Jumlah reject tidak valid')

      return
    }

    // Update job order
    setJobOrders((prev) =>
      prev.map((jo) =>
        jo.id === selectedJO?.id
          ? {
              ...jo,
              status: 'completed',
              actualQty: actual,
              rejectQty: reject,
              batchId,
              reportedBy: user.name,
              reportedDate: new Date().toISOString().split('T')[0],
              notes
            }
          : jo
      )
    )

    toast.success('Laporan Produksi Berhasil!', {
      description: `${actual} ${selectedJO?.unit} dilaporkan`
    })

    // Reset
    setReporting(false)
    setSelectedJO(null)
  }

  const handleViewDetail = (jo: JobOrder) => {
    setSelectedJO(jo)
    setReporting(false)
  }

  // List View
  if (!selectedJO) {
    return (
      <div className="min-h-screen bg-slate-50 pb-20">
        {/* Header - Improved */}
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
            <Link href="/operation">
              <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-slate-100">
                <ArrowLeft size={22} weight="bold" className="text-slate-700" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-slate-900">Lapor Hasil Produksi</h1>
              <p className="text-xs text-slate-500">Tim Produksi</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <Factory size={22} weight="duotone" className="text-emerald-600" />
            </div>
          </div>
        </header>

        {/* Job Order List */}
        <main className="mx-auto max-w-5xl px-4 py-4">
          <div className="mb-3">
            <h2 className="text-base font-bold text-slate-900">Job Order Hari Ini</h2>
            <p className="text-xs text-slate-500">Pilih JO untuk melaporkan hasil produksi</p>
          </div>

          {/* Active JO */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-bold text-emerald-600">Aktif / Terjadwal</h3>
            <div className="flex flex-col gap-y-2">
              {jobOrders
                .filter((jo) => jo.status === 'scheduled' || jo.status === 'in-progress')
                .map((jo) => (
                  <Card
                    key={jo.id}
                    onClick={() => handleSelectJO(jo)}
                    className="cursor-pointer border-2 border-emerald-200 bg-white p-4 transition-all hover:border-primary hover:shadow-md active:scale-[0.99]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-emerald-700">{jo.joNumber}</span>
                          <Badge
                            className={cn(
                              'shrink-0 text-xs',
                              jo.status === 'in-progress' && 'bg-amber-100 text-amber-700',
                              jo.status === 'scheduled' && 'bg-blue-100 text-blue-700'
                            )}
                          >
                            {jo.status === 'in-progress' ? 'Sedang Berjalan' : 'Terjadwal'}
                          </Badge>
                        </div>

                        <h3 className="mb-2 truncate text-base font-bold text-slate-900">{jo.productName}</h3>

                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-slate-600">
                            Target:{' '}
                            <strong>
                              {jo.targetQty} {jo.unit}
                            </strong>
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500">
                            <Calendar size={14} className="mr-1 inline" />
                            {new Date(jo.scheduledDate).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                      </div>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                        <Package size={20} className="text-emerald-600" weight="duotone" />
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>

          {/* Completed JO */}
          <div>
            <h3 className="mb-2 text-sm font-bold text-slate-600">Selesai Dilaporkan</h3>
            <div className="flex flex-col gap-y-2">
              {jobOrders
                .filter((jo) => jo.status === 'completed')
                .map((jo) => (
                  <Card
                    key={jo.id}
                    onClick={() => handleViewDetail(jo)}
                    className="cursor-pointer border-2 border-slate-200 bg-white p-4 transition-all hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold text-slate-600">{jo.joNumber}</span>
                          <Badge className="shrink-0 bg-green-100 text-xs text-green-700">Selesai</Badge>
                        </div>

                        <h3 className="mb-1 truncate text-base font-bold text-slate-900">{jo.productName}</h3>

                        <div className="text-xs text-slate-600">
                          Hasil: <strong className="text-green-600">{jo.actualQty}</strong> • Reject:{' '}
                          <strong className="text-primary">{jo.rejectQty}</strong>
                        </div>

                        <div className="mt-1 text-xs text-slate-500">
                          Batch: {jo.batchId} • {jo.reportedBy}
                        </div>
                      </div>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100">
                        <CheckCircle size={20} className="text-green-600" weight="fill" />
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Reporting Form View
  if (reporting) {
    // Fullscreen Batch Scanner
    if (scanningBatch) {
      return (
        <div className="fixed inset-0 z-50 bg-black">
          {/* Overlay Header - Floating */}
          <header className="absolute top-0 right-0 left-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setScanningBatch(false)
                  setReporting(false)
                }}
                className="h-10 w-10 text-white hover:bg-white/20"
              >
                <ArrowLeft size={24} weight="bold" />
              </Button>
              <div className="flex-1">
                <h1 className="text-base font-bold text-white">Scan QR Mesin/Batch</h1>
                <p className="text-xs text-white/80">{selectedJO.productName}</p>
              </div>
            </div>
          </header>

          {/* Camera View - Fullscreen */}
          <div className="h-full w-full">
            {!useManualInput ? (
              <QRScanner
                autoStart={true}
                onScanSuccess={handleQRScanSuccess}
                onScanError={(error) => {
                  toast.error('Gagal mengakses kamera', {
                    description: error
                  })
                  setUseManualInput(true)
                }}
              />
            ) : (
              // Manual Input Mode - Light Theme
              <div className="flex h-full items-center justify-center bg-slate-50 p-4">
                <div className="w-full max-w-sm space-y-3">
                  <div className="rounded-2xl border-2 border-slate-200 bg-white p-8 text-center shadow-xl">
                    <QrCode size={64} className="mx-auto mb-4 text-emerald-600" weight="duotone" />
                    <h3 className="mb-2 text-lg font-bold text-slate-900">Input Manual</h3>
                    <p className="mb-4 text-sm text-slate-600">Ketik kode QR secara manual</p>
                    <Input
                      placeholder="Ketik kode QR..."
                      value={scanInput}
                      onChange={(e) => setScanInput(e.target.value)}
                      className="mb-3 h-12 text-center font-mono"
                    />
                    <Button
                      onClick={handleScanBatch}
                      variant="default"
                      className="h-12 w-full gap-2 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Barcode size={18} />
                      Generate Batch ID
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Controls - Floating */}
          <div className="absolute right-0 bottom-0 left-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* Mode Toggle */}
            <div className="mb-4 flex justify-center gap-3">
              <Button
                variant={!useManualInput ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setUseManualInput(false)}
                className={cn(
                  'h-10 gap-2 px-6',
                  !useManualInput ? 'bg-white text-slate-900 hover:bg-white/90' : 'text-white hover:bg-white/20'
                )}
              >
                <Camera size={18} weight="bold" />
                <span className="text-sm font-semibold">Kamera</span>
              </Button>
              <Button
                variant={useManualInput ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setUseManualInput(true)}
                className={cn(
                  'h-10 gap-2 px-6',
                  useManualInput ? 'bg-white text-slate-900 hover:bg-white/90' : 'text-white hover:bg-white/20'
                )}
              >
                <Barcode size={18} weight="bold" />
                <span className="text-sm font-semibold">Manual</span>
              </Button>
            </div>

            {/* Scan Hint */}
            {!useManualInput && !batchId && (
              <p className="text-center text-sm text-white/80">Scan QR Code pada mesin/batch produksi</p>
            )}
          </div>

          {/* Bottom Sheet - Batch Info (Appears after scan) */}
          {batchId && (
            <>
              {/* Backdrop Overlay */}
              <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm" />

              {/* Bottom Sheet */}
              <div className="absolute right-0 bottom-0 left-0 z-30 max-h-[75vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl">
                {/* Drag Handle */}
                <div className="sticky top-0 z-10 bg-white pt-3 pb-2">
                  <div className="mx-auto h-1 w-12 rounded-full bg-slate-300" />
                </div>

                {/* Content */}
                <div className="px-6 pb-6">
                  {/* Success Indicator */}
                  <div className="mb-4 flex items-center gap-3 rounded-xl bg-green-50 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle size={24} weight="fill" className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-green-900">QR Code Valid!</p>
                      <p className="text-xs text-green-700">Batch ID berhasil di-generate</p>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-lg font-bold text-slate-900">Batch ID Produksi</h3>

                  <div className="space-y-4">
                    {/* Batch ID */}
                    <div>
                      <Label className="mb-2 text-sm font-semibold text-slate-700">Batch ID (Auto-Generated)</Label>
                      <div className="rounded-lg bg-emerald-50 p-3">
                        <p className="font-mono text-base font-semibold text-emerald-900">{batchId}</p>
                      </div>
                    </div>

                    {/* Job Order Info */}
                    <div>
                      <Label className="mb-2 text-sm font-semibold text-slate-700">Job Order</Label>
                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="font-mono text-base font-semibold text-slate-900">{selectedJO.joNumber}</p>
                      </div>
                    </div>

                    {/* Product */}
                    <div>
                      <Label className="mb-2 text-sm font-semibold text-slate-700">Produk</Label>
                      <div className="rounded-lg bg-blue-50 p-3">
                        <p className="text-base font-semibold text-blue-900">{selectedJO.productName}</p>
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="outline-slate"
                        onClick={() => {
                          setBatchId('')
                          setScanInput('')
                          setScanned(false)
                        }}
                        className="h-14 flex-1 text-base font-semibold"
                      >
                        Scan Ulang
                      </Button>
                      <Button
                        onClick={() => setScanningBatch(false)}
                        className="h-14 flex-1 gap-2 bg-emerald-600 text-base font-semibold hover:bg-emerald-700"
                      >
                        <CheckCircle size={22} weight="fill" />
                        Lanjut Input Data
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )
    }

    // Production Form (After Batch Scan)
    return (
      <div className="min-h-screen bg-slate-50 pb-20">
        {/* Header - Improved */}
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setReporting(false)
              }}
              className="h-10 w-10 hover:bg-slate-100"
            >
              <ArrowLeft size={22} weight="bold" className="text-slate-700" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-slate-900">Form Laporan Produksi</h1>
              <p className="text-xs text-slate-500">{selectedJO.productName}</p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-4">
          {/* JO Info */}
          <Card className="mb-4 border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-slate-600">Job Order:</p>
                <p className="font-mono font-semibold text-slate-900">{selectedJO.joNumber}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600">Target Produksi:</p>
                <p className="font-semibold text-slate-900">
                  {selectedJO.targetQty} {selectedJO.unit}
                </p>
              </div>
            </div>
          </Card>

          {/* Batch ID Display */}
          {!scanned && (
            <Card className="mb-4 border-2 border-dashed border-emerald-300 bg-white p-4 text-center">
              <p className="mb-2 text-xs text-slate-600">Batch ID belum di-generate</p>
              <Button onClick={() => setScanningBatch(true)} className="h-11 gap-2 bg-emerald-600 hover:bg-emerald-700">
                <QrCode size={18} weight="bold" />
                <span className="text-sm">Scan QR Mesin/Batch</span>
              </Button>
            </Card>
          )}

          {/* Production Form */}
          {scanned && (
            <Card className="border-2 border-emerald-200 bg-white p-4">
              <h3 className="mb-4 text-base font-bold text-slate-900">Data Hasil Produksi</h3>

              <div className="space-y-4">
                {/* Batch ID */}
                <div>
                  <Label className="text-sm">Batch ID (Auto-Generated)</Label>
                  <Input value={batchId} disabled className="h-11 bg-slate-50 font-mono font-bold" />
                </div>

                {/* Actual Qty */}
                <div>
                  <Label className="text-sm">
                    Jumlah Hasil Bagus <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="0"
                      value={actualQty}
                      onChange={(e) => setActualQty(e.target.value)}
                      className="h-11 flex-1"
                    />
                    <span className="text-sm font-semibold text-slate-600">{selectedJO.unit}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Target: {selectedJO.targetQty} {selectedJO.unit}
                  </p>
                </div>

                {/* Reject Qty */}
                <div>
                  <Label className="text-sm">Jumlah Reject/Cacat</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="0"
                      value={rejectQty}
                      onChange={(e) => setRejectQty(e.target.value)}
                      className="h-11 flex-1"
                    />
                    <span className="text-sm font-semibold text-slate-600">{selectedJO.unit}</span>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label className="text-sm">Catatan Produksi</Label>
                  <Textarea
                    placeholder="Tulis catatan atau kendala selama produksi..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[80px] resize-none text-sm"
                  />
                </div>

                {/* Summary */}
                <div className="rounded-lg bg-emerald-50 p-3">
                  <h4 className="mb-2 text-sm font-bold text-emerald-900">Ringkasan:</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Hasil Bagus:</span>
                      <span className="font-bold text-green-600">
                        {actualQty || 0} {selectedJO.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Reject:</span>
                      <span className="font-bold text-primary">
                        {rejectQty || 0} {selectedJO.unit}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-emerald-200 pt-1">
                      <span className="font-semibold text-slate-700">Total Produksi:</span>
                      <span className="font-bold text-slate-900">
                        {(parseFloat(actualQty || '0') + parseFloat(rejectQty || '0')).toFixed(0)} {selectedJO.unit}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-2">
                  <Button variant="outline-slate" onClick={() => setReporting(false)} className="h-11 flex-1">
                    Batal
                  </Button>
                  <Button
                    onClick={handleSubmitReport}
                    className="h-11 flex-1 gap-2 bg-emerald-600 text-white! hover:bg-emerald-700"
                  >
                    <CheckCircle size={18} weight="fill" />
                    <span className="text-sm">Submit Laporan</span>
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </main>
      </div>
    )
  }

  // Detail View (Read-only)
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header - Improved */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => setSelectedJO(null)} className="h-10 w-10 hover:bg-slate-100">
            <ArrowLeft size={22} weight="bold" className="text-slate-700" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-slate-900">Detail Job Order</h1>
            <p className="text-xs text-slate-500">{selectedJO.productName}</p>
          </div>
          {selectedJO.status !== 'completed' && (
            <Button
              onClick={handleStartReport}
              size="sm"
              className="h-9 gap-1.5 bg-emerald-600 text-white! hover:bg-emerald-700"
            >
              <ClipboardText size={16} weight="bold" />
              <span className="text-xs">Lapor Hasil</span>
            </Button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-4">
        {/* JO Info */}
        <Card className="mb-4 border-2 border-slate-200 bg-white p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-sm font-semibold text-slate-600">{selectedJO.joNumber}</span>
            <Badge
              className={cn(
                'text-xs',
                selectedJO.status === 'completed' && 'bg-green-100 text-green-700',
                selectedJO.status === 'in-progress' && 'bg-amber-100 text-amber-700',
                selectedJO.status === 'scheduled' && 'bg-blue-100 text-blue-700'
              )}
            >
              {selectedJO.status === 'completed' && 'Selesai'}
              {selectedJO.status === 'in-progress' && 'Sedang Berjalan'}
              {selectedJO.status === 'scheduled' && 'Terjadwal'}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-slate-600">Target Produksi:</p>
              <p className="font-semibold text-slate-900">
                {selectedJO.targetQty} {selectedJO.unit}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-600">Tanggal Jadwal:</p>
              <p className="font-semibold text-slate-900">
                {new Date(selectedJO.scheduledDate).toLocaleDateString('id-ID')}
              </p>
            </div>
          </div>
        </Card>

        {/* Production Result */}
        {selectedJO.status === 'completed' && (
          <Card className="border-2 border-slate-200 bg-white p-4">
            <h3 className="mb-3 text-base font-bold text-slate-900">Hasil Produksi</h3>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-slate-600">Batch ID:</p>
                <p className="font-mono font-semibold text-slate-900">{selectedJO.batchId}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-slate-600">Hasil Bagus:</p>
                  <p className="text-lg font-bold text-green-600">
                    {selectedJO.actualQty} {selectedJO.unit}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Reject:</p>
                  <p className="text-lg font-bold text-primary">
                    {selectedJO.rejectQty} {selectedJO.unit}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-600">Dilaporkan Oleh:</p>
                <p className="font-semibold text-slate-900">{selectedJO.reportedBy}</p>
              </div>

              <div>
                <p className="text-xs text-slate-600">Tanggal Laporan:</p>
                <p className="font-semibold text-slate-900">
                  {new Date(selectedJO.reportedDate || '').toLocaleDateString('id-ID')}
                </p>
              </div>

              {selectedJO.notes && (
                <div>
                  <p className="text-xs text-slate-600">Catatan:</p>
                  <p className="text-slate-900">{selectedJO.notes}</p>
                </div>
              )}
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}
