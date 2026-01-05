'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { Package, QrCode, CheckCircle, ArrowLeft, Calendar, Barcode, Truck, Camera } from '@phosphor-icons/react'
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

// Mock Data - Purchase Orders
interface POItem {
  id: string
  materialName: string
  qtyOrdered: number
  unit: string
  qtyReceived: number
  status: 'pending' | 'partial' | 'completed'
}

interface PurchaseOrder {
  id: string
  poNumber: string
  supplier: string
  orderDate: string
  expectedDate: string
  status: 'pending' | 'receiving' | 'completed'
  items: POItem[]
}

const MOCK_PO_LIST: PurchaseOrder[] = [
  {
    id: '1',
    poNumber: 'PO-2026-001',
    supplier: 'PT Maju Jaya Cabai',
    orderDate: '2026-01-02',
    expectedDate: '2026-01-05',
    status: 'pending',
    items: [
      { id: '1', materialName: 'Cabai Rawit Merah', qtyOrdered: 500, unit: 'Kg', qtyReceived: 0, status: 'pending' },
      { id: '2', materialName: 'Cabai Keriting', qtyOrdered: 300, unit: 'Kg', qtyReceived: 0, status: 'pending' }
    ]
  },
  {
    id: '2',
    poNumber: 'PO-2026-002',
    supplier: 'CV Bawang Sejahtera',
    orderDate: '2026-01-03',
    expectedDate: '2026-01-06',
    status: 'pending',
    items: [
      { id: '3', materialName: 'Bawang Putih', qtyOrdered: 200, unit: 'Kg', qtyReceived: 0, status: 'pending' },
      { id: '4', materialName: 'Bawang Merah', qtyOrdered: 150, unit: 'Kg', qtyReceived: 0, status: 'pending' }
    ]
  },
  {
    id: '3',
    poNumber: 'PO-2025-198',
    supplier: 'UD Garam Laut',
    orderDate: '2025-12-28',
    expectedDate: '2026-01-04',
    status: 'receiving',
    items: [{ id: '5', materialName: 'Garam Halus', qtyOrdered: 100, unit: 'Kg', qtyReceived: 50, status: 'partial' }]
  }
]

export default function InboundPage() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [poList, setPoList] = useState<PurchaseOrder[]>(MOCK_PO_LIST)
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null)
  const [scanMode, setScanMode] = useState(false)
  const [scanInput, setScanInput] = useState('')
  const [useManualInput, setUseManualInput] = useState(false)

  // Form state for receiving
  const [receivingItem, setReceivingItem] = useState<POItem | null>(null)
  const [qtyReceiving, setQtyReceiving] = useState('')
  const [batchNumber, setBatchNumber] = useState('')
  const [expiredDate, setExpiredDate] = useState('')

  useEffect(() => {
    if (!user) {
      router.push('/operation/login')
    }
  }, [user, router])

  if (!user) return null

  const handleSelectPO = (po: PurchaseOrder) => {
    setSelectedPO(po)
    setScanMode(false)
  }

  const handleStartScan = (item: POItem) => {
    setReceivingItem(item)
    setScanMode(true)
    setScanInput('')
    setQtyReceiving('')
    setBatchNumber('')
    setExpiredDate('')
    setUseManualInput(false) // Auto-activate camera mode
  }

  const handleQRScanSuccess = (decodedText: string) => {
    setScanInput(decodedText)
    toast.success('QR Code Berhasil Discan!', {
      description: `Kode: ${decodedText}`
    })
    // Auto-fill batch from QR
    setBatchNumber(`BATCH-${decodedText.slice(-6)}`)
  }

  const handleScanSubmit = () => {
    if (!scanInput) {
      toast.error('Scan QR Code terlebih dahulu')

      return
    }

    // Simulate QR validation
    toast.success('QR Code Valid!', {
      description: `Material: ${receivingItem?.materialName}`
    })

    // Auto-fill batch from QR (simulation)
    setBatchNumber(`BATCH-${scanInput.slice(-6)}`)
  }

  const handleReceiveItem = () => {
    if (!qtyReceiving || !batchNumber || !expiredDate) {
      toast.error('Lengkapi semua data', {
        description: 'Qty, Batch, dan Expired Date wajib diisi'
      })

      return
    }

    const qty = parseFloat(qtyReceiving)
    if (qty <= 0 || qty > (receivingItem?.qtyOrdered || 0)) {
      toast.error('Qty tidak valid')

      return
    }

    // Update PO item
    setPoList((prev) =>
      prev.map((po) =>
        po.id === selectedPO?.id
          ? {
              ...po,
              items: po.items.map((item) =>
                item.id === receivingItem?.id
                  ? {
                      ...item,
                      qtyReceived: item.qtyReceived + qty,
                      status: item.qtyReceived + qty >= item.qtyOrdered ? 'completed' : 'partial'
                    }
                  : item
              )
            }
          : po
      )
    )

    toast.success('Penerimaan Berhasil!', {
      description: `${qty} ${receivingItem?.unit} ${receivingItem?.materialName} diterima`
    })

    // Reset form
    setScanMode(false)
    setReceivingItem(null)
    setScanInput('')
    setQtyReceiving('')
    setBatchNumber('')
    setExpiredDate('')
  }

  // List View
  if (!selectedPO) {
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
              <h1 className="text-lg font-bold text-slate-900">Penerimaan Barang</h1>
              <p className="text-xs text-slate-500">Inbound - Staff Gudang</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Package size={22} weight="duotone" className="text-blue-600" />
            </div>
          </div>
        </header>

        {/* PO List */}
        <main className="mx-auto max-w-5xl px-4 py-4">
          <div className="mb-3">
            <h2 className="text-base font-bold text-slate-900">Daftar Purchase Order</h2>
            <p className="text-xs text-slate-500">Pilih PO untuk memulai penerimaan</p>
          </div>

          <div className="space-y-2">
            {poList.map((po) => (
              <Card
                key={po.id}
                onClick={() => handleSelectPO(po)}
                className="cursor-pointer border-2 border-slate-200 bg-white p-4 transition-all hover:border-primary hover:shadow-md active:scale-[0.99]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-blue-600">{po.poNumber}</span>
                      <Badge
                        className={cn(
                          'shrink-0 text-xs',
                          po.status === 'completed' && 'bg-green-100 text-green-700',
                          po.status === 'receiving' && 'bg-amber-100 text-amber-700',
                          po.status === 'pending' && 'bg-slate-100 text-slate-700'
                        )}
                      >
                        {po.status === 'completed' && 'Selesai'}
                        {po.status === 'receiving' && 'Sedang Diterima'}
                        {po.status === 'pending' && 'Menunggu'}
                      </Badge>
                    </div>

                    <div className="mb-2 flex items-center gap-2 text-sm">
                      <Truck size={16} className="shrink-0 text-slate-400" />
                      <span className="truncate font-semibold text-slate-700">{po.supplier}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>Tgl Order: {new Date(po.orderDate).toLocaleDateString('id-ID')}</span>
                      <span className="text-slate-300">•</span>
                      <span>Tgl Kirim: {new Date(po.expectedDate).toLocaleDateString('id-ID')}</span>
                    </div>

                    <div className="mt-2 text-xs text-slate-600">
                      {po.items.length} item • {po.items.filter((i) => i.status === 'completed').length} selesai
                    </div>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <Package size={20} className="text-blue-600" weight="duotone" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    )
  }

  // Detail View - Scan Mode (Fullscreen Camera)
  if (scanMode && receivingItem) {
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
              <h1 className="text-base font-bold text-white">Scan QR Code</h1>
              <p className="text-xs text-white/80">{receivingItem.materialName}</p>
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
                  <QrCode size={64} className="mx-auto mb-4 text-primary" weight="duotone" />
                  <h3 className="mb-2 text-lg font-bold text-slate-900">Input Manual</h3>
                  <p className="mb-4 text-sm text-slate-600">Ketik kode QR secara manual</p>
                  <Input
                    placeholder="Ketik kode QR..."
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    className="mb-3 h-12 text-center font-mono"
                  />
                  <Button variant="default" onClick={handleScanSubmit} className="h-12 w-full gap-2">
                    <Barcode size={18} />
                    Validasi QR Code
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
          {!useManualInput && !batchNumber && (
            <p className="text-center text-sm text-white/80">Arahkan kamera ke QR Code pada kemasan</p>
          )}
        </div>

        {/* Bottom Sheet - Receiving Form (Appears after scan) */}
        {batchNumber && (
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
                    <p className="text-sm font-semibold text-green-900">QR Code Berhasil Discan!</p>
                    <p className="text-xs text-green-700">Lengkapi data penerimaan di bawah</p>
                  </div>
                </div>

                {/* Title */}
                <h3 className="mb-4 text-lg font-bold text-slate-900">Data Penerimaan</h3>

                <div className="space-y-4">
                  {/* Qty */}
                  <div>
                    <Label className="mb-2 text-sm font-semibold text-slate-700">
                      Jumlah Diterima <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Input
                          type="number"
                          placeholder="0"
                          value={qtyReceiving}
                          onChange={(e) => setQtyReceiving(e.target.value)}
                          className="h-14 pr-16 text-center text-xl font-bold"
                        />
                        <span className="absolute top-1/2 right-4 -translate-y-1/2 text-base font-semibold text-slate-500">
                          {receivingItem.unit}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2">
                      <span className="text-xs text-blue-700">Dipesan:</span>
                      <span className="text-sm font-bold text-blue-900">
                        {receivingItem.qtyOrdered} {receivingItem.unit}
                      </span>
                    </div>
                  </div>

                  {/* Batch */}
                  <div>
                    <Label className="mb-2 text-sm font-semibold text-slate-700">
                      Batch Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Barcode size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        value={batchNumber}
                        onChange={(e) => setBatchNumber(e.target.value)}
                        className="h-14 pl-12 font-mono text-base"
                        placeholder="BATCH-XXXXXX"
                      />
                    </div>
                  </div>

                  {/* Expired Date */}
                  <div>
                    <Label className="mb-2 text-sm font-semibold text-slate-700">
                      Tanggal Kadaluarsa <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Calendar size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        type="date"
                        value={expiredDate}
                        onChange={(e) => setExpiredDate(e.target.value)}
                        className="h-14 pl-12 text-base"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline-slate"
                      onClick={() => {
                        setBatchNumber('')
                        setScanInput('')
                      }}
                      className="h-14 flex-1 text-base font-semibold"
                    >
                      Scan Ulang
                    </Button>
                    <Button onClick={handleReceiveItem} className="h-14 flex-1 gap-2 text-base font-semibold">
                      <CheckCircle size={22} weight="fill" />
                      Terima Barang
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

  // Detail View - Item List
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header - Improved */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => setSelectedPO(null)} className="h-10 w-10 hover:bg-slate-100">
            <ArrowLeft size={22} weight="bold" className="text-slate-700" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-slate-900">{selectedPO.poNumber}</h1>
            <p className="text-xs text-slate-500">{selectedPO.supplier}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-4">
        {/* PO Info */}
        <Card className="mb-4 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-slate-600">Tanggal Order:</p>
              <p className="font-semibold text-slate-900">{new Date(selectedPO.orderDate).toLocaleDateString('id-ID')}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600">Tanggal Kirim:</p>
              <p className="font-semibold text-slate-900">{new Date(selectedPO.expectedDate).toLocaleDateString('id-ID')}</p>
            </div>
          </div>
        </Card>

        {/* Item List */}
        <div className="mb-3">
          <h2 className="text-base font-bold text-slate-900">Daftar Material</h2>
          <p className="text-xs text-slate-500">Scan QR untuk menerima barang</p>
        </div>

        <div className="space-y-2">
          {selectedPO.items.map((item) => (
            <Card key={item.id} className="border-2 border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="mb-2 truncate text-base font-bold text-slate-900">{item.materialName}</h3>

                  <div className="mb-2 flex items-center gap-2 text-xs sm:text-sm">
                    <span className="text-slate-600">
                      Dipesan:{' '}
                      <strong>
                        {item.qtyOrdered} {item.unit}
                      </strong>
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-green-600">
                      Diterima:{' '}
                      <strong>
                        {item.qtyReceived} {item.unit}
                      </strong>
                    </span>
                  </div>

                  <Badge
                    className={cn(
                      'text-xs',
                      item.status === 'completed' && 'bg-green-100 text-green-700',
                      item.status === 'partial' && 'bg-amber-100 text-amber-700',
                      item.status === 'pending' && 'bg-slate-100 text-slate-700'
                    )}
                  >
                    {item.status === 'completed' && 'Selesai'}
                    {item.status === 'partial' && 'Sebagian'}
                    {item.status === 'pending' && 'Belum Diterima'}
                  </Badge>
                </div>

                <Button
                  onClick={() => handleStartScan(item)}
                  disabled={item.status === 'completed'}
                  size="sm"
                  variant="default"
                  className="h-9 shrink-0 gap-1.5"
                >
                  <QrCode size={16} weight="bold" />
                  <span className="text-xs">Scan</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
