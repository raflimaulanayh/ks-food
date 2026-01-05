'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import {
  Truck,
  QrCode,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Package,
  MapPin,
  User,
  Barcode,
  Printer,
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
import { QRScanner } from '@/components/molecules/QRScanner'

import { cn } from '@/utils/cn'

// Mock Data - Shipping Orders
interface ShippingItem {
  id: string
  productName: string
  qtyOrdered: number
  unit: string
  qtyPicked: number
  status: 'pending' | 'picked' | 'completed'
  batchId?: string
  expiredDate?: string
}

interface ShippingOrder {
  id: string
  orderNumber: string
  customerName: string
  destination: string
  orderDate: string
  shippingDate: string
  status: 'pending' | 'picking' | 'ready' | 'shipped'
  items: ShippingItem[]
  trackingNumber?: string
  driver?: string
}

const MOCK_SHIPPING_ORDERS: ShippingOrder[] = [
  {
    id: '1',
    orderNumber: 'ORD-WEB-2026-001',
    customerName: 'Ani Wijaya',
    destination: 'Jakarta Selatan',
    orderDate: '2026-01-04',
    shippingDate: '2026-01-04',
    status: 'pending',
    items: [
      {
        id: '1',
        productName: 'Saos Sambal Bawang 500ml',
        qtyOrdered: 2,
        unit: 'Botol',
        qtyPicked: 0,
        status: 'pending'
      }
    ]
  },
  {
    id: '2',
    orderNumber: 'ORD-SHP-22049',
    customerName: 'Budi Santoso (Shopee)',
    destination: 'Bandung',
    orderDate: '2026-01-04',
    shippingDate: '2026-01-04',
    status: 'picking',
    items: [
      {
        id: '2',
        productName: 'Saos Tomat Pedas 1L',
        qtyOrdered: 3,
        unit: 'Botol',
        qtyPicked: 2,
        status: 'picked',
        batchId: 'BATCH-SAOS-0103',
        expiredDate: '2026-12-31'
      },
      {
        id: '3',
        productName: 'Bumbu Rendang 250g',
        qtyOrdered: 5,
        unit: 'Pack',
        qtyPicked: 0,
        status: 'pending'
      }
    ]
  },
  {
    id: '3',
    orderNumber: 'ORD-B2B-GKN-001',
    customerName: 'PT Gokana Utama',
    destination: 'Jakarta Pusat',
    orderDate: '2026-01-03',
    shippingDate: '2026-01-04',
    status: 'ready',
    items: [
      {
        id: '4',
        productName: 'Saos Jerigen 20L',
        qtyOrdered: 50,
        unit: 'Jerigen',
        qtyPicked: 50,
        status: 'completed',
        batchId: 'BATCH-SAOS-1025',
        expiredDate: '2027-06-30'
      }
    ],
    trackingNumber: 'JNT-123456789',
    driver: 'Pak Joko'
  }
]

export default function OutboundPage() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [orders, setOrders] = useState<ShippingOrder[]>(MOCK_SHIPPING_ORDERS)
  const [selectedOrder, setSelectedOrder] = useState<ShippingOrder | null>(null)
  const [pickingItem, setPickingItem] = useState<ShippingItem | null>(null)
  const [scanMode, setScanMode] = useState(false)
  const [useManualInput, setUseManualInput] = useState(false)

  // Form state
  const [scanInput, setScanInput] = useState('')
  const [scannedBatch, setScannedBatch] = useState('')
  const [scannedExpiry, setScannedExpiry] = useState('')

  useEffect(() => {
    if (!user) {
      router.push('/operation/login')
    }
  }, [user, router])

  if (!user) return null

  const handleSelectOrder = (order: ShippingOrder) => {
    setSelectedOrder(order)
    setScanMode(false)
  }

  const handleStartPicking = (item: ShippingItem) => {
    setPickingItem(item)
    setScanMode(true)
    setUseManualInput(false) // Start with camera mode
    setScanInput('')
    setScannedBatch('')
    setScannedExpiry('')
  }

  const handleQRScanSuccess = (decodedText: string) => {
    setScanInput(decodedText)
    handleScanProduct()
  }

  const handleScanProduct = () => {
    if (!scanInput) {
      toast.error('Scan QR Code terlebih dahulu')

      return
    }

    // Simulate QR validation
    const batch = `BATCH-${pickingItem?.productName.split(' ')[1].toUpperCase()}-${scanInput.slice(-4)}`
    const expiry = '2026-12-31' // Simulated from QR

    // Check if expired (simple check)
    const expiryDate = new Date(expiry)
    const today = new Date()
    const monthsUntilExpiry = (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30)

    if (monthsUntilExpiry < 3) {
      toast.error('Produk akan expired dalam 3 bulan!', {
        description: 'Pilih batch yang lebih baru'
      })

      return
    }

    setScannedBatch(batch)
    setScannedExpiry(expiry)

    toast.success('Produk Valid!', {
      description: `Batch: ${batch} | Exp: ${expiry}`
    })
  }

  const handleConfirmPick = () => {
    if (!scannedBatch) {
      toast.error('Scan produk terlebih dahulu')

      return
    }

    // Update item status
    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder?.id
          ? {
              ...order,
              status: 'picking',
              items: order.items.map((item) =>
                item.id === pickingItem?.id
                  ? {
                      ...item,
                      qtyPicked: item.qtyOrdered,
                      status: 'completed',
                      batchId: scannedBatch,
                      expiredDate: scannedExpiry
                    }
                  : item
              )
            }
          : order
      )
    )

    toast.success('Item Berhasil Dipick!', {
      description: `${pickingItem?.qtyOrdered} ${pickingItem?.unit} ${pickingItem?.productName}`
    })

    // Check if all items completed
    const updatedOrder = orders.find((o) => o.id === selectedOrder?.id)
    const allCompleted = updatedOrder?.items.every((i) => i.id === pickingItem?.id || i.status === 'completed')

    if (allCompleted) {
      setOrders((prev) => prev.map((order) => (order.id === selectedOrder?.id ? { ...order, status: 'ready' } : order)))
      toast.info('Semua item sudah dipick!', {
        description: 'Order siap untuk dikirim'
      })
    }

    // Reset
    setScanMode(false)
    setPickingItem(null)
  }

  const handlePrintShippingLabel = () => {
    toast.success('Surat Jalan Dicetak!', {
      description: 'Silakan tempelkan pada paket'
    })

    // Mark as shipped
    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder?.id
          ? {
              ...order,
              status: 'shipped',
              trackingNumber: `JNT-${Math.random().toString().slice(2, 11)}`,
              driver: 'Pak Joko'
            }
          : order
      )
    )

    setSelectedOrder(null)
  }

  // List View
  if (!selectedOrder) {
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
              <h1 className="text-lg font-bold text-slate-900">Pengiriman Barang</h1>
              <p className="text-xs text-slate-500">Outbound - Staff Gudang</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Truck size={22} weight="duotone" className="text-blue-600" />
            </div>
          </div>
        </header>

        {/* Order List */}
        <main className="mx-auto max-w-5xl px-4 py-4">
          <div className="mb-3">
            <h2 className="text-base font-bold text-slate-900">Pesanan Siap Kirim</h2>
            <p className="text-xs text-slate-500">Pilih order untuk picking barang</p>
          </div>

          {/* Pending/Picking Orders */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-bold text-blue-600">Perlu Diproses</h3>
            <div className="space-y-2">
              {orders
                .filter((o) => o.status === 'pending' || o.status === 'picking' || o.status === 'ready')
                .map((order) => (
                  <Card
                    key={order.id}
                    onClick={() => handleSelectOrder(order)}
                    className={cn(
                      'cursor-pointer border-2 bg-white p-4 transition-all hover:border-primary hover:shadow-md active:scale-[0.99]',
                      order.status === 'ready' ? 'border-green-200' : 'border-blue-200'
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-blue-600">{order.orderNumber}</span>
                          <Badge
                            className={cn(
                              'shrink-0 text-xs',
                              order.status === 'pending' && 'bg-slate-100 text-slate-700',
                              order.status === 'picking' && 'bg-amber-100 text-amber-700',
                              order.status === 'ready' && 'bg-green-100 text-green-700'
                            )}
                          >
                            {order.status === 'pending' && 'Menunggu'}
                            {order.status === 'picking' && 'Sedang Dipick'}
                            {order.status === 'ready' && 'Siap Kirim'}
                          </Badge>
                        </div>

                        <div className="mb-2 flex items-center gap-2 text-sm">
                          <User size={16} className="shrink-0 text-slate-400" />
                          <span className="truncate font-semibold text-slate-700">{order.customerName}</span>
                        </div>

                        <div className="mb-2 flex items-center gap-2 text-xs text-slate-600">
                          <MapPin size={16} className="shrink-0 text-slate-400" />
                          <span className="truncate">{order.destination}</span>
                        </div>

                        <div className="text-xs text-slate-500">
                          {order.items.length} item • {order.items.filter((i) => i.status === 'completed').length} sudah
                          dipick
                        </div>
                      </div>

                      <div
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                          order.status === 'ready' ? 'bg-green-100' : 'bg-blue-100'
                        )}
                      >
                        <Package
                          size={20}
                          className={cn(order.status === 'ready' ? 'text-green-600' : 'text-blue-600')}
                          weight="duotone"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>

          {/* Shipped Orders */}
          <div>
            <h3 className="mb-2 text-sm font-bold text-slate-600">Sudah Dikirim</h3>
            <div className="space-y-2">
              {orders
                .filter((o) => o.status === 'shipped')
                .map((order) => (
                  <Card key={order.id} className="border-2 border-slate-200 bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold text-slate-600">{order.orderNumber}</span>
                          <Badge className="shrink-0 bg-green-100 text-xs text-green-700">Terkirim</Badge>
                        </div>

                        <div className="text-sm text-slate-700">{order.customerName}</div>

                        <div className="mt-2 text-xs text-slate-500">
                          Resi: {order.trackingNumber} • Driver: {order.driver}
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
  if (scanMode && pickingItem) {
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
              <h1 className="text-base font-bold text-white">Scan Produk</h1>
              <p className="text-xs text-white/80">{pickingItem.productName}</p>
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
                  <Button onClick={handleScanProduct} variant="default" className="h-12 w-full gap-2">
                    <Barcode size={18} />
                    Validasi Produk
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
            <p className="text-center text-sm text-white/80">Arahkan kamera ke QR Code pada produk</p>
          )}
        </div>

        {/* Bottom Sheet - Product Info (Appears after scan) */}
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
                    <p className="text-sm font-semibold text-green-900">Produk Valid!</p>
                    <p className="text-xs text-green-700">Konfirmasi picking di bawah</p>
                  </div>
                </div>

                {/* Title */}
                <h3 className="mb-4 text-lg font-bold text-slate-900">Informasi Produk</h3>

                <div className="space-y-4">
                  {/* Batch ID */}
                  <div>
                    <Label className="mb-2 text-sm font-semibold text-slate-700">Batch ID</Label>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="font-mono text-base font-semibold text-slate-900">{scannedBatch}</p>
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
                    <div className="rounded-lg bg-blue-50 p-3">
                      <p className="text-base font-semibold text-blue-900">
                        {pickingItem.qtyOrdered} {pickingItem.unit}
                      </p>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline-slate"
                      onClick={() => {
                        setScannedBatch('')
                        setScannedExpiry('')
                        setScanInput('')
                      }}
                      className="h-14 flex-1 text-base font-semibold"
                    >
                      Scan Ulang
                    </Button>
                    <Button onClick={handleConfirmPick} className="h-14 flex-1 gap-2 text-base font-semibold">
                      <CheckCircle size={22} weight="fill" />
                      Konfirmasi Pick
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
            onClick={() => setSelectedOrder(null)}
            className="h-10 w-10 hover:bg-slate-100"
          >
            <ArrowLeft size={22} weight="bold" className="text-slate-700" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-slate-900">{selectedOrder.orderNumber}</h1>
            <p className="text-xs text-slate-500">{selectedOrder.customerName}</p>
          </div>
          {selectedOrder.status === 'ready' && (
            <Button onClick={handlePrintShippingLabel} size="sm" className="h-9 gap-1.5">
              <Printer size={16} weight="bold" />
              <span className="text-xs">Cetak</span>
            </Button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-4">
        {/* Order Info */}
        <Card className="mb-4 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-slate-600">Tujuan:</p>
              <p className="font-semibold text-slate-900">{selectedOrder.destination}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600">Tanggal Kirim:</p>
              <p className="font-semibold text-slate-900">
                {new Date(selectedOrder.shippingDate).toLocaleDateString('id-ID')}
              </p>
            </div>
          </div>
        </Card>

        {/* Item List */}
        <div className="mb-3">
          <h2 className="text-base font-bold text-slate-900">Daftar Barang</h2>
          <p className="text-xs text-slate-500">Scan setiap item untuk picking</p>
        </div>

        <div className="space-y-2">
          {selectedOrder.items.map((item) => (
            <Card key={item.id} className="border-2 border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="mb-2 truncate text-base font-bold text-slate-900">{item.productName}</h3>

                  <div className="mb-2 text-xs text-slate-600 sm:text-sm">
                    Qty:{' '}
                    <strong>
                      {item.qtyOrdered} {item.unit}
                    </strong>
                  </div>

                  {item.batchId && (
                    <div className="text-xs text-slate-500">
                      Batch: {item.batchId} • Exp: {new Date(item.expiredDate || '').toLocaleDateString('id-ID')}
                    </div>
                  )}

                  <Badge
                    className={cn(
                      'mt-2 text-xs',
                      item.status === 'completed' && 'bg-green-100 text-green-700',
                      item.status === 'picked' && 'bg-amber-100 text-amber-700',
                      item.status === 'pending' && 'bg-slate-100 text-slate-700'
                    )}
                  >
                    {item.status === 'completed' && 'Selesai'}
                    {item.status === 'picked' && 'Dipick'}
                    {item.status === 'pending' && 'Belum Dipick'}
                  </Badge>
                </div>

                <Button
                  onClick={() => handleStartPicking(item)}
                  disabled={item.status === 'completed'}
                  size="sm"
                  variant="default"
                  className="h-9 shrink-0 gap-1.5"
                >
                  <QrCode size={16} weight="bold" />
                  <span className="text-xs">Pick</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
