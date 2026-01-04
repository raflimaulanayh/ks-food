'use client'

import { useStockStore } from '@/stores/use-stock-store'
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
  Cube
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
  const { items, updateStock } = useStockStore()
  const [activeTab, setActiveTab] = useState('inbound')
  const [searchTerm, setSearchTerm] = useState('')

  // Opname State
  const [isOpnameOpen, setIsOpnameOpen] = useState(false)
  const [opnameId, setOpnameId] = useState('')
  const [opnameQty, setOpnameQty] = useState('')

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

  // LOGIC: Handle Opname Submit
  const handleOpnameSubmit = () => {
    if (!opnameId || !opnameQty) {
      toast.error('Mohon pilih material dan isi stok fisik')

      return
    }
    const selectedItem = items.find((i) => i.id === opnameId)
    updateStock(opnameId, Number(opnameQty))
    setIsOpnameOpen(false)
    toast.success(`Stok ${selectedItem?.name} berhasil dikoreksi menjadi ${opnameQty}`)
    setOpnameId('')
    setOpnameQty('')
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
          <Button
            onClick={handleReportDownload}
            className="gap-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          >
            <DownloadSimple size={16} /> Report
          </Button>

          {/* OPNAME DIALOG */}
          <Dialog open={isOpnameOpen} onOpenChange={setIsOpnameOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary font-bold text-white shadow-md hover:bg-red-700">
                <ArrowsClockwise size={16} weight="bold" /> Opname Stok
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Koreksi Stok (Stock Opname)</DialogTitle>
                <DialogDescription>Sesuaikan jumlah stok di sistem dengan fisik aktual di gudang</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-700">Pilih Material</label>
                  <select
                    value={opnameId}
                    onChange={(e) => setOpnameId(e.target.value)}
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none"
                  >
                    <option value="">Pilih barang...</option>
                    {items.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name} (Sistem: {i.current} {i.unit})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-700">Stok Fisik Aktual</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={opnameQty}
                    onChange={(e) => setOpnameQty(e.target.value)}
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => setIsOpnameOpen(false)}
                  className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </Button>
                <Button onClick={handleOpnameSubmit} className="bg-primary font-bold text-white hover:bg-red-700">
                  Simpan Perubahan
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
          <div className="border-b bg-white px-6 pt-2">
            <TabsList className="h-auto gap-8 bg-transparent p-0">
              <TabsTrigger
                value="inbound"
                className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <div className="flex items-center gap-2">
                  <Truck size={16} weight="bold" /> Barang Masuk
                  {inboundList.length > 0 && (
                    <span className="inline-flex h-5 items-center rounded-full bg-blue-600 px-1.5 text-[10px] font-bold text-white">
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
            <div className="p-6">
              {inboundList.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {inboundList.map((shipment) => (
                    <Card
                      key={shipment.id}
                      className="group border-slate-200 shadow-sm transition-colors hover:border-red-200"
                    >
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center rounded-xl bg-red-50 p-3 text-primary transition-colors">
                            <Cube size={24} weight="bold" />
                          </div>
                          <div>
                            <div className="mb-1 flex items-center gap-2">
                              <span className="font-bold text-slate-800">{shipment.item}</span>
                              <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-xs font-normal text-slate-600">
                                {shipment.po}
                              </span>
                            </div>
                            <p className="text-sm text-slate-500">{shipment.supplier}</p>
                            <div className="mt-2 flex items-center gap-2 text-xs font-medium text-slate-600">
                              <span
                                className={`rounded-full border px-2 py-0.5 ${
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
                          className="gap-2 bg-primary px-6 font-bold text-white shadow-md shadow-red-100 hover:bg-red-700"
                        >
                          <ClipboardText size={18} weight="bold" /> Terima
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
              <table className="w-full text-left text-sm">
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
                          {status === 'CRITICAL' || status === 'WARNING' ? (
                            <Button
                              onClick={() => handleRestock(item.name)}
                              className="h-8 gap-1 border-red-200 bg-white text-xs font-medium text-primary shadow-sm hover:bg-red-50 hover:text-red-700"
                            >
                              <ArrowUpRight size={14} /> Restock
                            </Button>
                          ) : (
                            <Button disabled className="h-8 gap-1 text-xs text-slate-400">
                              Aman
                            </Button>
                          )}
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
            <div className="p-6 text-center text-sm text-slate-400">
              Menampilkan barang dengan stok kritis. Gunakan tab "Semua Material" untuk kontrol penuh.
            </div>
          </TabsContent>
          <TabsContent value="safe" className="m-0 p-0">
            <div className="p-6 text-center text-sm text-slate-400">
              Menampilkan barang dengan stok aman. Gunakan tab "Semua Material" untuk kontrol penuh.
            </div>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  )
}
