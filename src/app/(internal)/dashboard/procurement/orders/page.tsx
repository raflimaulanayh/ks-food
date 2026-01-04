'use client'

import { usePurchaseOrderStore, type POItem, type PO } from '@/stores/use-purchase-order-store'
import {
  ShoppingCart,
  Plus,
  MagnifyingGlass,
  Funnel,
  Trash,
  FileText,
  CheckCircle,
  Clock,
  Truck,
  CaretLeft,
  CaretRight,
  DotsThree,
  Eye,
  XCircle,
  Printer
} from '@phosphor-icons/react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/atoms/ui/alert-dialog'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/atoms/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'

export default function PurchaseOrderPage() {
  const searchParams = useSearchParams()
  const { orders, addOrder, deleteOrder, updateStatus } = usePurchaseOrderStore()
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [poToDelete, setPoToDelete] = useState<string | null>(null)
  const [selectedPO, setSelectedPO] = useState<PO | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // --- FORM STATE ---
  const [supplier, setSupplier] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [paymentTerm, setPaymentTerm] = useState('Net 30')
  const [tempItems, setTempItems] = useState<POItem[]>([])

  // Temp Input for adding line items
  const [newItemName, setNewItemName] = useState('')
  const [newItemQty, setNewItemQty] = useState(1)
  const [newItemUnit, setNewItemUnit] = useState('Pcs')
  const [newItemPrice, setNewItemPrice] = useState(0)

  // DETECT RESTOCK QUERY PARAM
  useEffect(() => {
    const restockItem = searchParams.get('restock_item')
    if (restockItem) {
      // Auto-open dialog and pre-fill first item name
      setIsDialogOpen(true)
      setNewItemName(restockItem)
      toast.info(`Pre-filling PO for: ${restockItem}`)
    }
  }, [searchParams])

  // LOGIC: Add Item to Temp List
  const handleAddItem = () => {
    if (!newItemName || newItemPrice <= 0) {
      toast.error('Nama dan harga item harus diisi')

      return
    }
    const itemTotal = newItemQty * newItemPrice
    const newItem: POItem = {
      id: Math.random().toString(),
      name: newItemName,
      qty: newItemQty,
      unit: newItemUnit,
      price: newItemPrice,
      total: itemTotal
    }
    setTempItems([...tempItems, newItem])
    // Reset inputs
    setNewItemName('')
    setNewItemPrice(0)
    setNewItemQty(1)
    toast.success('Item ditambahkan')
  }

  // LOGIC: Remove Item
  const handleRemoveItem = (id: string) => {
    setTempItems(tempItems.filter((i) => i.id !== id))
  }

  // LOGIC: Calculate Grand Total
  const grandTotal = tempItems.reduce((acc, curr) => acc + curr.total, 0)

  // LOGIC: Handle Delete Confirmation
  const handleDeleteClick = (id: string) => {
    setPoToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    if (poToDelete) {
      deleteOrder(poToDelete)
      toast.success('PO berhasil dihapus')
      setDeleteConfirmOpen(false)
      setPoToDelete(null)
    }
  }

  const handleViewDetail = (po: PO) => {
    setSelectedPO(po)
    setIsDetailOpen(true)
  }

  // LOGIC: Submit PO
  const handleSubmit = () => {
    if (!supplier || tempItems.length === 0) {
      toast.error('Supplier dan minimal 1 item harus diisi')

      return
    }
    const generatedId = `PO-2601-${Math.floor(Math.random() * 1000)}`

    addOrder({
      id: generatedId,
      supplier,
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: deliveryDate || new Date().toISOString().split('T')[0],
      paymentTerm,
      items: tempItems,
      grandTotal,
      status: 'Pending'
    })

    setIsDialogOpen(false)
    // Reset Form
    setSupplier('')
    setTempItems([])
    setDeliveryDate('')
    toast.success('PO berhasil dibuat!')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'border-amber-200 bg-amber-50 text-amber-700'
      case 'Processing':
        return 'border-blue-200 bg-blue-50 text-blue-700'
      case 'Completed':
        return 'border-green-200 bg-green-50 text-green-700'
      case 'Cancelled':
        return 'border-red-200 bg-red-50 text-red-700'
      default:
        return 'border-slate-200 bg-slate-100 text-slate-700'
    }
  }

  const filteredPO = orders.filter((po) => {
    const matchTab = activeTab === 'all' || po.status.toLowerCase() === activeTab.toLowerCase()
    const matchSearch =
      po.supplier.toLowerCase().includes(searchTerm.toLowerCase()) || po.id.toLowerCase().includes(searchTerm.toLowerCase())

    return matchTab && matchSearch
  })

  return (
    <div className="space-y-6 pt-2 pb-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Purchase Orders (PO)</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola dokumen pemesanan bahan baku dan status persetujuan</p>
        </div>

        {/* MODAL TRIGGER */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-10 gap-2 bg-primary px-6 font-bold !text-white shadow-md transition-transform hover:bg-red-700 active:scale-95">
              <Plus size={18} weight="bold" /> Buat PO Baru
            </Button>
          </DialogTrigger>

          {/* WIDER MODAL FOR TABLE */}
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Buat Purchase Order Baru</DialogTitle>
              <DialogDescription>Lengkapi detail supplier dan daftar barang yang akan dipesan.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              {/* SECTION 1: HEADER INFO */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2 md:col-span-1">
                  <label className="text-sm font-medium text-slate-700">Nama Supplier</label>
                  <input
                    placeholder="PT. Vendor..."
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Tanggal Pengiriman</label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium text-slate-700">Termin Pembayaran</label>
                  <select
                    value={paymentTerm}
                    onChange={(e) => setPaymentTerm(e.target.value)}
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none"
                  >
                    <option value="Cash on Delivery">Cash on Delivery (COD)</option>
                    <option value="Net 14">Tempo 14 Hari (Net 14)</option>
                    <option value="Net 30">Tempo 30 Hari (Net 30)</option>
                    <option value="Transfer">Direct Transfer</option>
                  </select>
                </div>
              </div>

              {/* SECTION 2: ADD ITEM FORM */}
              <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <label className="flex items-center gap-2 font-bold text-slate-700">
                  <ShoppingCart size={14} /> Tambah Item Barang
                </label>
                <div className="flex flex-col items-end gap-2 md:flex-row">
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Nama Barang</span>
                    <input
                      placeholder="Contoh: Tepung"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-100 focus:outline-none"
                    />
                  </div>
                  <div className="w-20 space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Qty</span>
                    <input
                      type="number"
                      value={newItemQty}
                      onChange={(e) => setNewItemQty(Number(e.target.value))}
                      className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-100 focus:outline-none"
                    />
                  </div>
                  <div className="w-24 space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Satuan</span>
                    <select
                      value={newItemUnit}
                      onChange={(e) => setNewItemUnit(e.target.value)}
                      className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-100 focus:outline-none"
                    >
                      <option value="Pcs">Pcs</option>
                      <option value="KG">KG</option>
                      <option value="Liter">Liter</option>
                      <option value="Box">Box</option>
                    </select>
                  </div>
                  <div className="w-32 space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Harga (@)</span>
                    <input
                      type="number"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(Number(e.target.value))}
                      className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-100 focus:outline-none"
                    />
                  </div>
                  <Button onClick={handleAddItem} className="h-9 bg-slate-800 text-white hover:bg-slate-900">
                    <Plus size={16} weight="bold" />
                  </Button>
                </div>
              </div>

              {/* SECTION 3: ITEM LIST TABLE */}
              <div className="max-h-[200px] overflow-y-auto rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium text-slate-600">Barang</th>
                      <th className="px-4 py-3 text-center font-medium text-slate-600">Qty</th>
                      <th className="px-4 py-3 text-right font-medium text-slate-600">Harga</th>
                      <th className="px-4 py-3 text-right font-medium text-slate-600">Total</th>
                      <th className="w-[50px] px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tempItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-4 py-2 font-medium text-slate-700">{item.name}</td>
                        <td className="px-4 py-2 text-center text-slate-600">
                          {item.qty} {item.unit}
                        </td>
                        <td className="px-4 py-2 text-right text-slate-600">{item.price.toLocaleString('id-ID')}</td>
                        <td className="px-4 py-2 text-right font-bold text-slate-800">
                          {item.total.toLocaleString('id-ID')}
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="flex h-6 w-6 items-center justify-center rounded text-red-500 hover:bg-red-50"
                          >
                            <Trash size={14} weight="bold" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {tempItems.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400">
                          Belum ada item ditambahkan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* GRAND TOTAL */}
              <div className="flex items-center justify-end gap-4 rounded-lg border bg-slate-50 p-3">
                <span className="font-medium text-slate-500">Grand Total:</span>
                <span className="text-xl font-bold text-slate-900">Rp {grandTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={() => setIsDialogOpen(false)}
                className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              >
                Batal
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-primary font-bold !text-white hover:bg-red-700"
                disabled={tempItems.length === 0}
              >
                Simpan & Proses PO
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b bg-white px-6 pt-2">
            <TabsList className="h-auto gap-8 bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                Semua Order
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <div className="flex items-center gap-2">
                  <Clock size={16} /> Pending
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="processing"
                className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <div className="flex items-center gap-2">
                  <Truck size={16} /> Diproses
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} /> Selesai
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-b bg-slate-50/50 p-4 md:flex-row">
            <div className="relative w-full md:w-96">
              <MagnifyingGlass className="absolute top-2.5 left-3 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Cari No. PO atau Supplier..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="gap-2 border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
              <Funnel size={16} /> Filter
            </Button>
          </div>

          <TabsContent value={activeTab} className="m-0 p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-slate-50/50 font-medium text-slate-500">
                  <tr>
                    <th className="px-6 py-4">No. PO</th>
                    <th className="px-6 py-4">Supplier</th>
                    <th className="px-6 py-4">Tgl Kirim</th>
                    <th className="px-6 py-4">Jml Item</th>
                    <th className="px-6 py-4 text-right">Total Nominal</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPO.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                        Tidak ada purchase order.
                      </td>
                    </tr>
                  ) : (
                    filteredPO.map((po) => (
                      <tr key={po.id} className="group transition-colors hover:bg-slate-50/80">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 font-mono font-bold text-slate-800">
                            <FileText size={16} className="text-slate-400" />
                            {po.id}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-700">{po.supplier}</td>
                        <td className="px-6 py-4 text-slate-500">{po.deliveryDate || '-'}</td>
                        <td className="px-6 py-4 text-slate-600">{Array.isArray(po.items) ? po.items.length : 1} Item</td>
                        <td className="px-6 py-4 text-right font-bold text-slate-800">
                          Rp {(po.grandTotal || 0).toLocaleString('id-ID')}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium shadow-sm ${getStatusBadge(po.status)}`}
                          >
                            {po.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800">
                                <DotsThree size={20} weight="bold" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel className="text-slate-700">Aksi Pesanan</DropdownMenuLabel>
                              <DropdownMenuSeparator />

                              {/* View Detail */}
                              <DropdownMenuItem onClick={() => handleViewDetail(po)} className="cursor-pointer">
                                <Eye size={14} className="mr-2 text-slate-500" weight="bold" /> Lihat Detail
                              </DropdownMenuItem>

                              {/* FLOW: Pending -> Processing */}
                              {po.status === 'Pending' && (
                                <DropdownMenuItem
                                  onClick={() => {
                                    updateStatus(po.id, 'Processing')
                                    toast.success('Status PO berhasil diperbarui menjadi Processing')
                                  }}
                                  className="mt-1 cursor-pointer bg-blue-50 text-blue-600 focus:bg-blue-100 focus:text-blue-700"
                                >
                                  <Truck size={14} className="mr-2" weight="bold" /> Proses Order
                                </DropdownMenuItem>
                              )}

                              {/* FLOW: Processing -> Completed */}
                              {po.status === 'Processing' && (
                                <DropdownMenuItem
                                  onClick={() => {
                                    updateStatus(po.id, 'Completed')
                                    toast.success('Status PO berhasil diperbarui menjadi Completed')
                                  }}
                                  className="mt-1 cursor-pointer bg-green-50 text-green-600 focus:bg-green-100 focus:text-green-700"
                                >
                                  <CheckCircle size={14} className="mr-2" weight="bold" /> Tandai Selesai
                                </DropdownMenuItem>
                              )}

                              <DropdownMenuSeparator />

                              {/* Cancel Order */}
                              {po.status !== 'Cancelled' && po.status !== 'Completed' && (
                                <DropdownMenuItem
                                  onClick={() => {
                                    updateStatus(po.id, 'Cancelled')
                                    toast.warning('PO dibatalkan')
                                  }}
                                  className="cursor-pointer text-amber-600 focus:text-amber-700"
                                >
                                  <XCircle size={14} className="mr-2" weight="bold" /> Batalkan
                                </DropdownMenuItem>
                              )}

                              {/* Delete Order */}
                              <DropdownMenuItem
                                onClick={() => handleDeleteClick(po.id)}
                                className="cursor-pointer text-primary focus:bg-red-50 focus:text-red-700"
                              >
                                <Trash size={14} className="mr-2" weight="bold" /> Hapus Data
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t bg-slate-50/30 p-4 text-xs text-slate-600">
              <span className="font-medium">
                Menampilkan {filteredPO.length} dari {orders.length} baris
              </span>
              <div className="flex gap-4">
                <button
                  disabled
                  className="flex h-8 items-center gap-1 text-xs font-medium text-slate-700 disabled:opacity-50"
                >
                  <CaretLeft size={14} weight="bold" /> Previous
                </button>
                <button className="flex h-8 items-center gap-1 text-xs font-medium text-slate-700">
                  Next <CaretRight size={14} weight="bold" />
                </button>
              </div>
            </div>
          </TabsContent>
        </Card>
      </Tabs>

      {/* DELETE CONFIRMATION DIALOG */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus Purchase Order</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus PO ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-primary hover:bg-red-700 focus:ring-primary">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* DETAIL VIEW MODAL */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedPO && (
            <>
              <DialogHeader className="border-b pb-4">
                <div className="mr-6 flex items-center justify-between">
                  <div>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold">{selectedPO.id}</DialogTitle>
                    <DialogDescription>Dibuat pada: {selectedPO.orderDate}</DialogDescription>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-sm font-medium ${getStatusBadge(selectedPO.status)}`}>
                    {selectedPO.status}
                  </span>
                </div>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                {/* INFO GRID */}
                <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                  <div>
                    <p className="font-medium text-slate-500">Supplier</p>
                    <p className="font-bold text-slate-800">{selectedPO.supplier}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-500">Tgl Pengiriman</p>
                    <p className="font-bold text-slate-800">{selectedPO.deliveryDate || '-'}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-500">Termin Bayar</p>
                    <p className="font-bold text-slate-800">{selectedPO.paymentTerm || 'Net 30'}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-500">Total Item</p>
                    <p className="font-bold text-slate-800">
                      {Array.isArray(selectedPO.items) ? selectedPO.items.length : 1}
                    </p>
                  </div>
                </div>

                {/* ITEMS TABLE */}
                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 font-medium text-slate-700">Nama Barang</th>
                        <th className="px-4 py-3 text-center font-medium text-slate-700">Qty</th>
                        <th className="px-4 py-3 text-right font-medium text-slate-700">Harga Satuan</th>
                        <th className="px-4 py-3 text-right font-medium text-slate-700">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {Array.isArray(selectedPO.items) ? (
                        selectedPO.items.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
                            <td className="px-4 py-3 text-center text-slate-600">
                              {item.qty} {item.unit}
                            </td>
                            <td className="px-4 py-3 text-right text-slate-600">Rp {item.price.toLocaleString('id-ID')}</td>
                            <td className="px-4 py-3 text-right font-bold text-slate-800">
                              Rp {item.total.toLocaleString('id-ID')}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-4 text-center text-slate-500">
                            {selectedPO.items}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* FOOTER TOTAL */}
                <div className="flex items-center justify-end gap-4 pt-2">
                  <span className="font-medium text-slate-500">Grand Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    Rp {(selectedPO.grandTotal || 0).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <DialogFooter className="gap-2 border-t pt-4 sm:justify-between">
                <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
                  <Printer size={16} weight="bold" /> Cetak PDF
                </button>
                <Button onClick={() => setIsDetailOpen(false)} className="bg-slate-900 text-white hover:bg-slate-800">
                  Tutup Detail
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
