'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { useOpnameStore } from '@/stores/use-opname-store'
import { StockItem, useStockStore } from '@/stores/use-stock-store'
import {
  Package,
  MagnifyingGlass,
  ArrowsClockwise,
  Warning,
  CheckCircle,
  CaretLeft,
  CaretRight,
  DownloadSimple,
  ArrowUpRight,
  Truck,
  ClipboardText,
  Cube,
  Barcode,
  Printer
} from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from '@/components/atoms/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'
import { BarcodeScanner } from '@/components/molecules/barcode-scanner'
import { ImageUpload } from '@/components/molecules/image-upload'
import { QRCodePrintModal } from '@/components/molecules/qrcode-print-modal'

// Mock Inbound Data
const mockInboundShipments = [
  {
    id: 'IN-001',
    po: 'PO-2601-002',
    supplier: 'CV. Sumber Makmur',
    item: 'Minyak Goreng',
    qty: 200,
    unit: 'L',
    status: 'Arrived',
    eta: '2026-01-03'
  },
  {
    id: 'IN-002',
    po: 'PO-2601-005',
    supplier: 'PT. Aneka Pangan',
    item: 'Tepung Terigu Premium',
    qty: 500,
    unit: 'KG',
    status: 'On The Way',
    eta: '2026-01-04'
  }
]

export default function WarehousePage() {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const { items, updateStockWithAudit } = useStockStore()
  const { createOpnameRequest, approveOpname, rejectOpname, getPendingRequests, getMyRequests } = useOpnameStore()
  const [activeTab, setActiveTab] = useState('inbound')
  const [searchTerm, setSearchTerm] = useState('')

  // Opname Request State
  const [isOpnameOpen, setIsOpnameOpen] = useState(false)
  const [opnameId, setOpnameId] = useState('')
  const [opnameQty, setOpnameQty] = useState('')
  const [opnameReason, setOpnameReason] = useState('')
  const [opnamePhotos, setOpnamePhotos] = useState<string[]>([])
  const [showScanner, setShowScanner] = useState(false)
  const [opnameCategory, setOpnameCategory] = useState<string>('ALL')

  // QR Print State
  const [showQRCategoryDialog, setShowQRCategoryDialog] = useState(false)
  const [showQRPrint, setShowQRPrint] = useState(false)
  const [qrPrintItems, setQRPrintItems] = useState<StockItem[]>([])

  // Inbound State
  const [inboundList, setInboundList] = useState(mockInboundShipments)

  // Helper Status Logic
  const getStatus = (current: number, min: number) => {
    if (current <= min) return 'CRITICAL'
    if (current <= min * 1.5) return 'WARNING'

    return 'SAFE'
  }

  const filteredItems = items.filter((item) => {
    const status = getStatus(item.current, item.min)
    const matchTab =
      activeTab === 'all'
        ? true
        : activeTab === 'critical'
          ? status === 'CRITICAL' || status === 'WARNING'
          : status === 'SAFE'
    const matchSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase())

    return matchTab && matchSearch
  })

  const criticalCount = items.filter((i) => getStatus(i.current, i.min) === 'CRITICAL').length

  // LOGIC: Handle Opname Request Submit
  const handleOpnameRequestSubmit = () => {
    if (!opnameId || !opnameQty) {
      toast.error('Mohon pilih material dan isi stok fisik')

      return
    }
    if (!opnameReason.trim()) {
      toast.error('Mohon isi alasan selisih stok')

      return
    }
    if (opnamePhotos.length === 0) {
      toast.error('Mohon upload minimal 1 foto bukti')

      return
    }

    const selectedItem = items.find((i) => i.id === opnameId)
    if (!selectedItem) return

    const difference = Number(opnameQty) - selectedItem.current

    createOpnameRequest({
      itemId: opnameId,
      itemName: selectedItem.name,
      itemSku: selectedItem.sku,
      systemQty: selectedItem.current,
      physicalQty: Number(opnameQty),
      difference,
      reason: opnameReason,
      photos: opnamePhotos,
      requestedBy: user?.id || 'unknown',
      requestedByName: user?.name || 'Unknown User'
    })

    setIsOpnameOpen(false)
    toast.success('Permintaan opname berhasil diajukan. Menunggu persetujuan supervisor.')
    setOpnameId('')
    setOpnameQty('')
    setOpnameReason('')
    setOpnamePhotos([])
  }

  // LOGIC: Handle Opname Approval
  const handleApproveOpname = (requestId: string, itemId: string, newQty: number, opnameRequestId: string) => {
    approveOpname(requestId, user?.id || 'unknown', user?.name || 'Unknown')
    updateStockWithAudit(
      itemId,
      newQty,
      user?.id || 'unknown',
      user?.name || 'Unknown',
      'OPNAME_APPROVED',
      opnameRequestId,
      'Approved via opname request'
    )
    toast.success('Permintaan opname disetujui. Stok telah diperbarui.')
  }

  // LOGIC: Handle Opname Rejection
  const handleRejectOpname = (requestId: string, notes: string) => {
    if (!notes.trim()) {
      toast.error('Mohon isi alasan penolakan')

      return
    }
    rejectOpname(requestId, user?.id || 'unknown', user?.name || 'Unknown', notes)
    toast.success('Permintaan opname ditolak.')
  }

  // LOGIC: Handle Barcode Scan
  const handleBarcodeScan = (sku: string) => {
    const item = items.find((i) => i.sku.toLowerCase() === sku.toLowerCase())
    if (item) {
      setOpnameId(item.id)
      setOpnameQty('')
      toast.success(`Item ditemukan: ${item.name}`)
    } else {
      toast.error(`SKU "${sku}" tidak ditemukan`)
    }
  }

  // LOGIC: Handle Print QR for Single Item
  const handlePrintQR = (item: StockItem) => {
    setQRPrintItems([item])
    setShowQRPrint(true)
  }

  // LOGIC: Handle Bulk Print QR
  const handleBulkPrintQR = () => {
    if (filteredItems.length === 0) {
      toast.error('Tidak ada item untuk di-print')

      return
    }
    setQRPrintItems(filteredItems)
    setShowQRPrint(true)
    toast.success(`Siap print ${filteredItems.length} label QR code`)
  }

  // LOGIC: Handle Restock Click
  const handleRestock = (itemName: string) => {
    toast.info('Redirecting to Purchase Order...', { duration: 1500 })
    setTimeout(() => {
      router.push(`/dashboard/procurement/orders?restock_item=${encodeURIComponent(itemName)}`)
    }, 500)
  }

  // LOGIC: Handle Report Download
  const handleReportDownload = () => {
    toast.success('Laporan stok berhasil diunduh (XLSX)')
  }

  // LOGIC: Handle Receive Shipment
  const handleReceive = (id: string, item: string, qty: number, unit: string) => {
    setInboundList((prev) => prev.filter((i) => i.id !== id))
    toast.success(`Berhasil! Stok ${item} bertambah +${qty} ${unit}`)
  }

  return (
    <div className="space-y-6 pt-2 pb-10">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manajemen Gudang & Stok</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola penerimaan barang (Inbound) dan monitor level stok</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleReportDownload} variant="outline-red">
            <DownloadSimple size={16} /> Report
          </Button>

          {/* QR PRINT CATEGORY DIALOG */}
          <Dialog open={showQRCategoryDialog} onOpenChange={setShowQRCategoryDialog}>
            <DialogTrigger asChild>
              <Button variant="outline-red">
                <Printer size={16} weight="bold" /> Print QR Labels
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Pilih Kategori untuk Print QR</DialogTitle>
                <DialogDescription>Pilih kategori barang yang ingin di-print label QR code-nya</DialogDescription>
              </DialogHeader>
              <div className="grid gap-3 py-4">
                <Button
                  onClick={() => {
                    setQRPrintItems(items)
                    setShowQRCategoryDialog(false)
                    setShowQRPrint(true)
                  }}
                  variant="outline-red"
                  className="h-auto justify-start py-3 text-left"
                >
                  <div className="flex items-center gap-2">
                    <Package size={18} />
                    <span>Semua Item ({items.length} items)</span>
                  </div>
                </Button>
                <Button
                  onClick={() => {
                    const rawMaterials = items.filter((i) => i.category === 'Raw Material')
                    setQRPrintItems(rawMaterials)
                    setShowQRCategoryDialog(false)
                    setShowQRPrint(true)
                  }}
                  variant="outline-red"
                  className="h-auto justify-start py-3 text-left"
                >
                  <div className="flex items-center gap-2">
                    <Cube size={18} />
                    <span>Raw Material ({items.filter((i) => i.category === 'Raw Material').length} items)</span>
                  </div>
                </Button>
                <Button
                  onClick={() => {
                    const packaging = items.filter((i) => i.category === 'Packaging')
                    setQRPrintItems(packaging)
                    setShowQRCategoryDialog(false)
                    setShowQRPrint(true)
                  }}
                  variant="outline-red"
                  className="h-auto justify-start py-3 text-left"
                >
                  <div className="flex items-center gap-2">
                    <Package size={18} />
                    <span>Packaging ({items.filter((i) => i.category === 'Packaging').length} items)</span>
                  </div>
                </Button>
                <Button
                  onClick={() => {
                    const finished = items.filter((i) => i.category === 'Finished Goods')
                    setQRPrintItems(finished)
                    setShowQRCategoryDialog(false)
                    setShowQRPrint(true)
                  }}
                  variant="outline-red"
                  className="h-auto justify-start py-3 text-left"
                  disabled={items.filter((i) => i.category === 'Finished Goods').length === 0}
                >
                  <div className="flex items-center gap-2">
                    <ClipboardText size={18} />
                    <span>Finished Goods ({items.filter((i) => i.category === 'Finished Goods').length} items)</span>
                  </div>
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* OPNAME DIALOG */}
          <Dialog open={isOpnameOpen} onOpenChange={setIsOpnameOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary font-bold text-white shadow-md hover:bg-red-700">
                <ArrowsClockwise size={16} weight="bold" /> Opname Stok
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Ajukan Permintaan Opname Stok</DialogTitle>
                <DialogDescription>
                  Permintaan akan direview oleh supervisor. Wajib isi alasan dan upload foto bukti.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Category Filter for Cycle Counting */}
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-900">
                    <Package size={16} weight="fill" />
                    Cycle Counting - Pilih Kategori
                  </div>
                  <select
                    value={opnameCategory}
                    onChange={(e) => {
                      setOpnameCategory(e.target.value)
                      setOpnameId('')
                      setOpnameQty('')
                    }}
                    className="h-9 w-full rounded-lg border border-blue-200 bg-white px-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                  >
                    <option value="ALL">Semua Kategori</option>
                    <option value="Raw Material">Raw Material</option>
                    <option value="Packaging">Packaging</option>
                    <option value="Finished Goods">Finished Goods</option>
                  </select>
                  <p className="mt-1 text-xs text-blue-700">
                    💡 Hitung per kategori untuk efisiensi, tidak perlu semua item sekaligus
                  </p>
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-700">
                      Pilih Material <span className="text-primary">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowScanner(true)}
                      className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
                    >
                      <Barcode size={14} weight="bold" />
                      Scan Barcode
                    </button>
                  </div>
                  <select
                    value={opnameId}
                    onChange={(e) => {
                      setOpnameId(e.target.value)
                      setOpnameQty('')
                    }}
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none"
                  >
                    <option value="">Pilih barang...</option>
                    {items
                      .filter((i) => opnameCategory === 'ALL' || i.category === opnameCategory)
                      .map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.sku} - {i.name} - Stok: {i.current} {i.unit}
                        </option>
                      ))}
                  </select>
                  {opnameCategory !== 'ALL' && (
                    <p className="text-xs text-slate-500">
                      Menampilkan {items.filter((i) => i.category === opnameCategory).length} item dari kategori{' '}
                      {opnameCategory}
                    </p>
                  )}
                </div>

                {opnameId && (
                  <>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-slate-700">
                        Stok Fisik Aktual <span className="text-primary">*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        value={opnameQty}
                        onChange={(e) => setOpnameQty(e.target.value)}
                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none"
                      />
                    </div>

                    {opnameQty && (
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <div className="text-xs font-medium text-slate-600">Selisih:</div>
                        <div
                          className={`mt-1 text-lg font-bold ${
                            Number(opnameQty) - items.find((i) => i.id === opnameId)!.current < 0
                              ? 'text-primary'
                              : 'text-emerald-600'
                          }`}
                        >
                          {Number(opnameQty) - items.find((i) => i.id === opnameId)!.current > 0 ? '+' : ''}
                          {Number(opnameQty) - items.find((i) => i.id === opnameId)!.current}{' '}
                          {items.find((i) => i.id === opnameId)!.unit}
                          {Number(opnameQty) - items.find((i) => i.id === opnameId)!.current < 0 ? ' (Kurang)' : ' (Lebih)'}
                        </div>
                      </div>
                    )}

                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-slate-700">
                        Alasan Selisih <span className="text-primary">*</span>
                      </label>
                      <textarea
                        value={opnameReason}
                        onChange={(e) => setOpnameReason(e.target.value)}
                        placeholder="Jelaskan mengapa terjadi selisih stok (contoh: ditemukan barang rusak, tumpah, dll)"
                        rows={3}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none"
                      />
                    </div>

                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-slate-700">
                        Foto Bukti <span className="text-primary">*</span> (Min 1)
                      </label>
                      <ImageUpload images={opnamePhotos} onImagesChange={setOpnamePhotos} maxImages={3} />
                    </div>
                  </>
                )}
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    setIsOpnameOpen(false)
                    setOpnameId('')
                    setOpnameQty('')
                    setOpnameReason('')
                    setOpnamePhotos([])
                  }}
                  className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </Button>
                <Button onClick={handleOpnameRequestSubmit} className="bg-primary font-bold text-white hover:bg-red-700">
                  Ajukan Permintaan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* TABS CONTAINER */}
      <Tabs defaultValue="inbound" className="w-full" onValueChange={setActiveTab}>
        <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* TAB HEADER */}
          <div className="scrollbar-hide overflow-x-auto border-b bg-white px-6 pt-2">
            <TabsList className="h-auto gap-4 bg-transparent p-0 lg:gap-8">
              <TabsTrigger
                value="inbound"
                className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <div className="flex items-center gap-2">
                  <Truck size={16} weight="bold" /> Barang Masuk
                  {inboundList.length > 0 && (
                    <span className="inline-flex h-5 items-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">
                      {inboundList.length}
                    </span>
                  )}
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                Semua Material
              </TabsTrigger>
              <TabsTrigger
                value="critical"
                className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <div className="flex items-center gap-2">
                  <Warning size={16} /> Stok Kritis
                  {criticalCount > 0 && (
                    <span className="inline-flex h-5 items-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">
                      {criticalCount}
                    </span>
                  )}
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="safe"
                className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} /> Stok Aman
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB CONTENT: INBOUND */}
          <TabsContent value="inbound" className="m-0 p-0">
            <div className="p-4">
              {inboundList.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {inboundList.map((shipment) => (
                    <Card
                      key={shipment.id}
                      className="group border-slate-200 shadow-sm transition-colors hover:border-red-200"
                    >
                      <div className="flex items-center justify-between gap-3 p-3">
                        <div className="flex min-w-0 flex-1 items-start gap-2">
                          <div className="flex shrink-0 items-center justify-center rounded-lg bg-red-50 p-2 text-primary transition-colors">
                            <Cube size={20} weight="bold" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="mb-0.5 flex flex-wrap items-center gap-1.5">
                              <span className="truncate text-sm font-bold text-slate-800">{shipment.item}</span>
                              <span className="shrink-0 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-normal text-slate-600">
                                {shipment.po}
                              </span>
                            </div>
                            <p className="truncate text-xs text-slate-500">{shipment.supplier}</p>
                            <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[10px] font-medium text-slate-600">
                              <span
                                className={`rounded-full border px-1.5 py-0.5 ${
                                  shipment.status === 'Arrived'
                                    ? 'border-green-200 bg-green-50 text-green-700'
                                    : 'border-amber-200 bg-amber-50 text-amber-700'
                                }`}
                              >
                                {shipment.status}
                              </span>
                              <span>•</span>
                              <span>
                                Qty: {shipment.qty} {shipment.unit}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleReceive(shipment.id, shipment.item, shipment.qty, shipment.unit)}
                          className="h-8 shrink-0 gap-1.5 bg-primary px-3 text-xs font-bold text-white shadow-md shadow-red-100 hover:bg-red-700"
                        >
                          <ClipboardText size={16} weight="bold" /> Terima
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500">
                  <CheckCircle size={48} className="mx-auto mb-4 text-slate-200" weight="duotone" />
                  <p>Semua barang masuk sudah diterima</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* TAB CONTENT: ALL MATERIALS */}
          <TabsContent value="all" className="m-0 p-0">
            {/* TOOLBAR */}
            <div className="flex items-center justify-between gap-4 border-b bg-slate-50/50 p-4">
              <div className="relative w-full md:w-96">
                <MagnifyingGlass className="absolute top-2.5 left-3 text-slate-400" size={18} />
                <input
                  placeholder="Cari SKU atau Nama Material..."
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead className="border-b bg-slate-50/50 font-medium text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Material Info</th>
                    <th className="w-1/3 px-6 py-4">Ketersediaan (Current / Min)</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.map((item) => {
                    const status = getStatus(item.current, item.min)
                    const percentage = Math.min((item.current / (item.min * 1.5)) * 100, 100)
                    const barColor =
                      status === 'CRITICAL' ? 'bg-red-500' : status === 'WARNING' ? 'bg-amber-500' : 'bg-emerald-500'

                    return (
                      <tr key={item.id} className="group transition-colors hover:bg-slate-50/80">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-800">{item.name}</div>
                          <div className="mt-1 flex items-center gap-1 font-mono text-xs text-slate-500">
                            <Package size={12} /> {item.sku}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="mb-2 flex justify-between text-xs font-semibold text-slate-700">
                            <span className={status === 'CRITICAL' ? 'font-bold text-primary' : ''}>
                              {item.current} {item.unit}
                            </span>
                            <span className="text-slate-400">
                              Min: {item.min} {item.unit}
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full border border-slate-100 bg-slate-100">
                            <div
                              className={`h-full transition-all duration-500 ${barColor}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`border px-2.5 py-0.5 shadow-sm ${
                              status === 'CRITICAL'
                                ? 'border-red-200 bg-red-50 text-red-700'
                                : status === 'WARNING'
                                  ? 'border-amber-200 bg-amber-50 text-amber-700'
                                  : 'border-green-200 bg-green-50 text-green-700'
                            } inline-flex rounded-full text-xs font-medium`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            {status === 'CRITICAL' || status === 'WARNING' ? (
                              <Button onClick={() => handleRestock(item.name)} variant="default" className="h-8">
                                <ArrowUpRight size={14} /> Restock
                              </Button>
                            ) : (
                              <Button disabled className="h-8 gap-1 bg-emerald-600 text-xs text-white">
                                Aman
                              </Button>
                            )}
                            <Button onClick={() => handlePrintQR(item)} variant="outline-red" className="h-8">
                              <Printer size={14} weight="bold" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between border-t bg-slate-50/50 p-4">
              <span className="text-xs font-medium text-slate-500">Menampilkan {filteredItems.length} material</span>
              <div className="flex gap-2">
                <button
                  disabled
                  className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white p-0 text-slate-400 disabled:opacity-50"
                >
                  <CaretLeft size={16} />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white p-0 text-slate-600 hover:bg-slate-50">
                  <CaretRight size={16} />
                </button>
              </div>
            </div>
          </TabsContent>

          {/* TAB CONTENT: CRITICAL & SAFE (Same as ALL but filtered) */}
          <TabsContent value="critical" className="m-0 p-0">
            {/* TOOLBAR */}
            <div className="flex items-center justify-between gap-4 border-b bg-slate-50/50 p-4">
              <div className="relative w-full md:w-96">
                <MagnifyingGlass className="absolute top-2.5 left-3 text-slate-400" size={18} />
                <input
                  placeholder="Cari SKU atau Nama Material..."
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead className="border-b bg-slate-50/50 font-medium text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Material Info</th>
                    <th className="w-1/3 px-6 py-4">Ketersediaan (Current / Min)</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.map((item) => {
                    const status = getStatus(item.current, item.min)
                    const percentage = Math.min((item.current / (item.min * 1.5)) * 100, 100)
                    const barColor =
                      status === 'CRITICAL' ? 'bg-red-500' : status === 'WARNING' ? 'bg-amber-500' : 'bg-emerald-500'

                    return (
                      <tr key={item.id} className="group transition-colors hover:bg-slate-50/80">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-800">{item.name}</div>
                          <div className="mt-1 flex items-center gap-1 font-mono text-xs text-slate-500">
                            <Package size={12} /> {item.sku}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="mb-2 flex justify-between text-xs font-semibold text-slate-700">
                            <span className={status === 'CRITICAL' ? 'font-bold text-primary' : ''}>
                              {item.current} {item.unit}
                            </span>
                            <span className="text-slate-400">
                              Min: {item.min} {item.unit}
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full border border-slate-100 bg-slate-100">
                            <div
                              className={`h-full transition-all duration-500 ${barColor}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`border px-2.5 py-0.5 shadow-sm ${
                              status === 'CRITICAL'
                                ? 'border-red-200 bg-red-50 text-red-700'
                                : status === 'WARNING'
                                  ? 'border-amber-200 bg-amber-50 text-amber-700'
                                  : 'border-green-200 bg-green-50 text-green-700'
                            } inline-flex rounded-full text-xs font-medium`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            {status === 'CRITICAL' || status === 'WARNING' ? (
                              <Button onClick={() => handleRestock(item.name)} variant="default" className="h-8">
                                <ArrowUpRight size={14} /> Restock
                              </Button>
                            ) : (
                              <Button disabled className="h-8 gap-1 bg-emerald-600 text-xs text-white">
                                Aman
                              </Button>
                            )}
                            <Button onClick={() => handlePrintQR(item)} variant="outline-red" className="h-8">
                              <Printer size={14} weight="bold" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between border-t bg-slate-50/50 p-4">
              <span className="text-xs font-medium text-slate-500">Menampilkan {filteredItems.length} material</span>
              <div className="flex gap-2">
                <button
                  disabled
                  className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white p-0 text-slate-400 disabled:opacity-50"
                >
                  <CaretLeft size={16} />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white p-0 text-slate-600 hover:bg-slate-50">
                  <CaretRight size={16} />
                </button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="safe" className="m-0 p-0">
            {/* TOOLBAR */}
            <div className="flex items-center justify-between gap-4 border-b bg-slate-50/50 p-4">
              <div className="relative w-full md:w-96">
                <MagnifyingGlass className="absolute top-2.5 left-3 text-slate-400" size={18} />
                <input
                  placeholder="Cari SKU atau Nama Material..."
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead className="border-b bg-slate-50/50 font-medium text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Material Info</th>
                    <th className="w-1/3 px-6 py-4">Ketersediaan (Current / Min)</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.map((item) => {
                    const status = getStatus(item.current, item.min)
                    const percentage = Math.min((item.current / (item.min * 1.5)) * 100, 100)
                    const barColor =
                      status === 'CRITICAL' ? 'bg-red-500' : status === 'WARNING' ? 'bg-amber-500' : 'bg-emerald-500'

                    return (
                      <tr key={item.id} className="group transition-colors hover:bg-slate-50/80">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-800">{item.name}</div>
                          <div className="mt-1 flex items-center gap-1 font-mono text-xs text-slate-500">
                            <Package size={12} /> {item.sku}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="mb-2 flex justify-between text-xs font-semibold text-slate-700">
                            <span className={status === 'CRITICAL' ? 'font-bold text-primary' : ''}>
                              {item.current} {item.unit}
                            </span>
                            <span className="text-slate-400">
                              Min: {item.min} {item.unit}
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full border border-slate-100 bg-slate-100">
                            <div
                              className={`h-full transition-all duration-500 ${barColor}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`border px-2.5 py-0.5 shadow-sm ${
                              status === 'CRITICAL'
                                ? 'border-red-200 bg-red-50 text-red-700'
                                : status === 'WARNING'
                                  ? 'border-amber-200 bg-amber-50 text-amber-700'
                                  : 'border-green-200 bg-green-50 text-green-700'
                            } inline-flex rounded-full text-xs font-medium`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            {status === 'CRITICAL' || status === 'WARNING' ? (
                              <Button onClick={() => handleRestock(item.name)} variant="default" className="h-8">
                                <ArrowUpRight size={14} /> Restock
                              </Button>
                            ) : (
                              <Button disabled className="h-8 gap-1 bg-emerald-600 text-xs text-white">
                                Aman
                              </Button>
                            )}
                            <Button onClick={() => handlePrintQR(item)} variant="outline-red" className="h-8">
                              <Printer size={14} weight="bold" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between border-t bg-slate-50/50 p-4">
              <span className="text-xs font-medium text-slate-500">Menampilkan {filteredItems.length} material</span>
              <div className="flex gap-2">
                <button
                  disabled
                  className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white p-0 text-slate-400 disabled:opacity-50"
                >
                  <CaretLeft size={16} />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white p-0 text-slate-600 hover:bg-slate-50">
                  <CaretRight size={16} />
                </button>
              </div>
            </div>
          </TabsContent>
        </Card>
      </Tabs>

      {/* Barcode Scanner Modal */}
      {showScanner && <BarcodeScanner onScan={handleBarcodeScan} onClose={() => setShowScanner(false)} />}

      {/* QR Code Print Modal */}
      {showQRPrint && <QRCodePrintModal items={qrPrintItems} onClose={() => setShowQRPrint(false)} />}
    </div>
  )
}
