'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { Package, QrCode, CheckCircle, ArrowLeft, Factory, Barcode, Warning, Camera } from '@phosphor-icons/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import { Input } from '@/components/atoms/ui/input'
import { Label } from '@/components/atoms/ui/label'
import { QRScanner } from '@/components/molecules/QRScanner'

import { cn } from '@/utils/cn'

// Mock Data - Material Requests
interface MaterialItem {
  id: string
  materialName: string
  qtyNeeded: number
  unit: string
  qtyTaken: number
  status: 'pending' | 'taken' | 'completed'
  batchId?: string
  location?: string
}

interface MaterialRequest {
  id: string
  joNumber: string
  productName: string
  requestDate: string
  status: 'pending' | 'in-progress' | 'completed'
  items: MaterialItem[]
  takenBy?: string
  takenDate?: string
}

const MOCK_MATERIAL_REQUESTS: MaterialRequest[] = [
  {
    id: '1',
    joNumber: 'JO-2026-001',
    productName: 'Saos Sambal Bawang 500ml',
    requestDate: '2026-01-04',
    status: 'pending',
    items: [
      { id: '1', materialName: 'Cabai Rawit Merah', qtyNeeded: 500, unit: 'Kg', qtyTaken: 0, status: 'pending' },
      { id: '2', materialName: 'Bawang Putih', qtyNeeded: 100, unit: 'Kg', qtyTaken: 0, status: 'pending' },
      { id: '3', materialName: 'Garam Halus', qtyNeeded: 50, unit: 'Kg', qtyTaken: 0, status: 'pending' }
    ]
  },
  {
    id: '2',
    joNumber: 'JO-2026-002',
    productName: 'Bumbu Rendang 250g',
    requestDate: '2026-01-04',
    status: 'in-progress',
    items: [
      {
        id: '4',
        materialName: 'Cabai Keriting',
        qtyNeeded: 200,
        unit: 'Kg',
        qtyTaken: 200,
        status: 'completed',
        batchId: 'BATCH-SUP-012',
        location: 'Rak A2'
      },
      { id: '5', materialName: 'Bawang Merah', qtyNeeded: 150, unit: 'Kg', qtyTaken: 0, status: 'pending' }
    ]
  },
  {
    id: '3',
    joNumber: 'JO-2025-198',
    productName: 'Saos Tomat Pedas 1L',
    requestDate: '2026-01-03',
    status: 'completed',
    items: [
      {
        id: '6',
        materialName: 'Tomat',
        qtyNeeded: 300,
        unit: 'Kg',
        qtyTaken: 300,
        status: 'completed',
        batchId: 'BATCH-SUP-007',
        location: 'Rak D1'
      }
    ],
    takenBy: 'Ahmad Fauzi',
    takenDate: '2026-01-03'
  }
]

export default function RequestMaterialPage() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [requests, setRequests] = useState<MaterialRequest[]>(MOCK_MATERIAL_REQUESTS)
  const [selectedRequest, setSelectedRequest] = useState<MaterialRequest | null>(null)
  const [takingItem, setTakingItem] = useState<MaterialItem | null>(null)
  const [scanMode, setScanMode] = useState(false)
  const [useManualInput, setUseManualInput] = useState(false)

  // Form state
  const [scanInput, setScanInput] = useState('')
  const [scannedBatch, setScannedBatch] = useState('')
  const [scannedLocation, setScannedLocation] = useState('')
  const [scannedExpiry, setScannedExpiry] = useState('')

  useEffect(() => {
    if (!user) {
      router.push('/operation/login')
    }
  }, [user, router])

  if (!user) return null

  const handleSelectRequest = (request: MaterialRequest) => {
    setSelectedRequest(request)
    setScanMode(false)
  }

  const handleStartTaking = (item: MaterialItem) => {
    setTakingItem(item)
    setScanMode(true)
    setUseManualInput(false) // Start with camera mode
    setScanInput('')
    setScannedBatch('')
    setScannedLocation('')
    setScannedExpiry('')
  }

  const handleQRScanSuccess = (decodedText: string) => {
    setScanInput(decodedText)
    handleScanMaterial()
  }

  const handleScanMaterial = () => {
    if (!scanInput) {
      toast.error('Scan QR Code terlebih dahulu')

      return
    }

    // Simulate QR validation
    const batch = `BATCH-SUP-${scanInput.slice(-3)}`
    const location = `Rak ${String.fromCharCode(65 + Math.floor(Math.random() * 4))}${Math.floor(Math.random() * 3) + 1}`
    const expiry = '2026-12-31'

    // Check FEFO - expired date
    const expiryDate = new Date(expiry)
    const today = new Date()
    const daysUntilExpiry = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilExpiry < 30) {
      toast.error('Material akan expired dalam 30 hari!', {
        description: 'Hubungi supervisor untuk konfirmasi'
      })

      return
    }

    setScannedBatch(batch)
    setScannedLocation(location)
    setScannedExpiry(expiry)

    toast.success('Material Valid!', {
      description: `Batch: ${batch} | Lokasi: ${location}`
    })
  }

  const handleConfirmTake = () => {
    if (!scannedBatch) {
      toast.error('Scan material terlebih dahulu')

      return
    }

    // Update item status
    setRequests((prev) =>
      prev.map((req) =>
        req.id === selectedRequest?.id
          ? {
              ...req,
              status: 'in-progress',
              items: req.items.map((item) =>
                item.id === takingItem?.id
                  ? {
                      ...item,
                      qtyTaken: item.qtyNeeded,
                      status: 'completed',
                      batchId: scannedBatch,
                      location: scannedLocation
                    }
                  : item
              )
            }
          : req
      )
    )

    toast.success('Material Berhasil Diambil!', {
      description: `${takingItem?.qtyNeeded} ${takingItem?.unit} ${takingItem?.materialName}`
    })

    // Check if all items completed
    const updatedReq = requests.find((r) => r.id === selectedRequest?.id)
    const allCompleted = updatedReq?.items.every((i) => i.id === takingItem?.id || i.status === 'completed')

    if (allCompleted) {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === selectedRequest?.id
            ? {
                ...req,
                status: 'completed',
                takenBy: user.name,
                takenDate: new Date().toISOString().split('T')[0]
              }
            : req
        )
      )
      toast.info('Semua material sudah diambil!', {
        description: 'Silakan lanjut ke proses produksi'
      })
    }

    // Reset
    setScanMode(false)
    setTakingItem(null)
  }

  const handleViewDetail = (request: MaterialRequest) => {
    setSelectedRequest(request)
    setScanMode(false)
  }

  // List View
  if (!selectedRequest) {
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
              <h1 className="text-lg font-bold text-slate-900">Ambil Bahan</h1>
              <p className="text-xs text-slate-500">Request Material - Tim Produksi</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <Package size={22} weight="duotone" className="text-emerald-600" />
            </div>
          </div>
        </header>

        {/* Request List */}
        <main className="mx-auto max-w-5xl px-4 py-4">
          <div className="mb-3">
            <h2 className="text-base font-bold text-slate-900">Permintaan Bahan Baku</h2>
            <p className="text-xs text-slate-500">Berdasarkan Job Order produksi</p>
          </div>

          {/* Active Requests */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-bold text-emerald-600">Perlu Diambil</h3>
            <div className="space-y-2">
              {requests
                .filter((r) => r.status === 'pending' || r.status === 'in-progress')
                .map((request) => (
                  <Card
                    key={request.id}
                    onClick={() => handleSelectRequest(request)}
                    className="cursor-pointer border-2 border-emerald-200 bg-white p-4 transition-all hover:border-primary hover:shadow-md active:scale-[0.99]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-emerald-700">{request.joNumber}</span>
                          <Badge
                            className={cn(
                              'shrink-0 text-xs',
                              request.status === 'pending' && 'bg-slate-100 text-slate-700',
                              request.status === 'in-progress' && 'bg-amber-100 text-amber-700'
                            )}
                          >
                            {request.status === 'pending' && 'Belum Diambil'}
                            {request.status === 'in-progress' && 'Sedang Diambil'}
                          </Badge>
                        </div>

                        <h3 className="mb-2 truncate text-base font-bold text-slate-900">{request.productName}</h3>

                        <div className="text-xs text-slate-600">
                          {request.items.length} material • {request.items.filter((i) => i.status === 'completed').length}{' '}
                          sudah diambil
                        </div>
                      </div>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                        <Factory size={20} className="text-emerald-600" weight="duotone" />
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>

          {/* Completed Requests */}
          <div>
            <h3 className="mb-2 text-sm font-bold text-slate-600">Sudah Selesai</h3>
            <div className="space-y-2">
              {requests
                .filter((r) => r.status === 'completed')
                .map((request) => (
                  <Card
                    key={request.id}
                    onClick={() => handleViewDetail(request)}
                    className="cursor-pointer border-2 border-slate-200 bg-white p-4 transition-all hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold text-slate-600">{request.joNumber}</span>
                          <Badge className="shrink-0 bg-green-100 text-xs text-green-700">Selesai</Badge>
                        </div>

                        <h3 className="mb-1 truncate text-base font-bold text-slate-900">{request.productName}</h3>

                        <div className="text-xs text-slate-500">
                          Diambil oleh: {request.takenBy} • {new Date(request.takenDate || '').toLocaleDateString('id-ID')}
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

  // Scan Mode (Fullscreen Camera)
  if (scanMode && takingItem) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        {/* Overlay Header - Floating */}
        <header className="absolute top-0 right-0 left-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setScanMode(false)}
              className="h-10 w-10 text-white hover:bg-white/20"
            >
              <ArrowLeft size={24} weight="bold" />
            </Button>
            <div className="flex-1">
              <h1 className="text-base font-bold text-white">Scan Material</h1>
              <p className="text-xs text-white/80">{takingItem.materialName}</p>
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
                    onClick={handleScanMaterial}
                    variant="default"
                    className="h-12 w-full gap-2 bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Barcode size={18} />
                    Validasi Material
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
          {!useManualInput && !scannedBatch && (
            <p className="text-center text-sm text-white/80">Scan QR Code pada karung/kemasan material</p>
          )}
        </div>

        {/* Bottom Sheet - Material Info (Appears after scan) */}
        {scannedBatch && (
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
                    <p className="text-sm font-semibold text-green-900">Material Valid!</p>
                    <p className="text-xs text-green-700">Konfirmasi pengambilan di bawah</p>
                  </div>
                </div>

                {/* Title */}
                <h3 className="mb-4 text-lg font-bold text-slate-900">Informasi Material</h3>

                <div className="space-y-4">
                  {/* Batch ID */}
                  <div>
                    <Label className="mb-2 text-sm font-semibold text-slate-700">Batch ID</Label>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="font-mono text-base font-semibold text-slate-900">{scannedBatch}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <Label className="mb-2 text-sm font-semibold text-slate-700">Lokasi Rak</Label>
                    <div className="rounded-lg bg-blue-50 p-3">
                      <p className="text-base font-semibold text-blue-900">{scannedLocation}</p>
                    </div>
                  </div>

                  {/* Expired Date */}
                  <div>
                    <Label className="mb-2 text-sm font-semibold text-slate-700">Expired Date</Label>
                    <div className="rounded-lg bg-green-50 p-3">
                      <p className="text-base font-semibold text-green-700">
                        {new Date(scannedExpiry).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <Label className="mb-2 text-sm font-semibold text-slate-700">Quantity</Label>
                    <div className="rounded-lg bg-emerald-50 p-3">
                      <p className="text-base font-semibold text-emerald-900">
                        {takingItem.qtyNeeded} {takingItem.unit}
                      </p>
                    </div>
                  </div>

                  {/* FEFO Warning */}
                  <div className="rounded-lg bg-emerald-50 p-4">
                    <div className="flex gap-3">
                      <Warning size={20} className="shrink-0 text-emerald-600" weight="fill" />
                      <p className="text-sm text-emerald-900">
                        <strong>FEFO:</strong> Pastikan mengambil batch dengan expired date terdekat untuk menghindari waste.
                      </p>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline-slate"
                      onClick={() => {
                        setScannedBatch('')
                        setScannedLocation('')
                        setScannedExpiry('')
                        setScanInput('')
                      }}
                      className="h-14 flex-1 text-base font-semibold"
                    >
                      Scan Ulang
                    </Button>
                    <Button
                      onClick={handleConfirmTake}
                      className="h-14 flex-1 gap-2 bg-emerald-600 text-base font-semibold text-white! hover:bg-emerald-700"
                    >
                      <CheckCircle size={22} weight="fill" />
                      Konfirmasi Ambil
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

  // Detail View
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header - Improved */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedRequest(null)}
            className="h-10 w-10 hover:bg-slate-100"
          >
            <ArrowLeft size={22} weight="bold" className="text-slate-700" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-slate-900">{selectedRequest.joNumber}</h1>
            <p className="text-xs text-slate-500">{selectedRequest.productName}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-4">
        {/* Request Info */}
        <Card className="mb-4 border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-slate-600">Tanggal Request:</p>
              <p className="font-semibold text-slate-900">
                {new Date(selectedRequest.requestDate).toLocaleDateString('id-ID')}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-600">Status:</p>
              <Badge
                className={cn(
                  'text-xs',
                  selectedRequest.status === 'completed' && 'bg-green-100 text-green-700',
                  selectedRequest.status === 'in-progress' && 'bg-amber-100 text-amber-700',
                  selectedRequest.status === 'pending' && 'bg-slate-100 text-slate-700'
                )}
              >
                {selectedRequest.status === 'completed' && 'Selesai'}
                {selectedRequest.status === 'in-progress' && 'Sedang Diambil'}
                {selectedRequest.status === 'pending' && 'Belum Diambil'}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Material List */}
        <div className="mb-3">
          <h2 className="text-base font-bold text-slate-900">Daftar Material</h2>
          <p className="text-xs text-slate-500">Scan untuk mengambil material dari gudang</p>
        </div>

        <div className="space-y-2">
          {selectedRequest.items.map((item) => (
            <Card key={item.id} className="border-2 border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="mb-2 truncate text-base font-bold text-slate-900">{item.materialName}</h3>

                  <div className="mb-2 text-xs text-slate-600 sm:text-sm">
                    Qty:{' '}
                    <strong>
                      {item.qtyNeeded} {item.unit}
                    </strong>
                  </div>

                  {item.batchId && (
                    <div className="text-xs text-slate-500">
                      Batch: {item.batchId} • Lokasi: {item.location}
                    </div>
                  )}

                  <Badge
                    className={cn(
                      'mt-2 text-xs',
                      item.status === 'completed' && 'bg-green-100 text-green-700',
                      item.status === 'pending' && 'bg-slate-100 text-slate-700'
                    )}
                  >
                    {item.status === 'completed' && 'Sudah Diambil'}
                    {item.status === 'pending' && 'Belum Diambil'}
                  </Badge>
                </div>

                <Button
                  onClick={() => handleStartTaking(item)}
                  disabled={item.status === 'completed'}
                  size="sm"
                  variant="default"
                  className="h-9 shrink-0 gap-1.5 bg-emerald-600 hover:bg-emerald-700"
                >
                  <QrCode size={16} weight="bold" />
                  <span className="text-xs">Ambil</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
