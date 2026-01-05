'use client'

import { useOrderStore, type OrderSource, type OrderStatus } from '@/stores/use-order-store'
import {
  MagnifyingGlass,
  ShoppingCart,
  Eye,
  X,
  Check,
  Package,
  CreditCard,
  Truck,
  MapPin,
  Phone,
  Envelope,
  Calendar,
  DownloadSimple
} from '@phosphor-icons/react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/atoms/ui/dialog'

import { cn } from '@/utils/cn'

const formatIDR = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

const SOURCE_CONFIG = {
  SHOPEE: { label: 'Shopee', color: 'bg-[#EE4D2D]', textColor: 'text-white' },
  TOKOPEDIA: { label: 'Tokopedia', color: 'bg-[#42B549]', textColor: 'text-white' },
  BLIBLI: { label: 'Blibli', color: 'bg-[#0095DA]', textColor: 'text-white' },
  INTERNAL: { label: 'Internal', color: 'bg-primary', textColor: 'text-white' },
  B2B: { label: 'B2B Corporate', color: 'bg-purple-600', textColor: 'text-white' }
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; className: string }> = {
  PENDING: { label: 'Pending', className: 'border-amber-200 bg-amber-50 text-amber-700' },
  CONFIRMED: { label: 'Confirmed', className: 'border-blue-200 bg-blue-50 text-blue-700' },
  PROCESSING: { label: 'Processing', className: 'border-cyan-200 bg-cyan-50 text-cyan-700' },
  READY_TO_SHIP: { label: 'Ready to Ship', className: 'border-indigo-200 bg-indigo-50 text-indigo-700' },
  SHIPPED: { label: 'Shipped', className: 'border-purple-200 bg-purple-50 text-purple-700' },
  DELIVERED: { label: 'Delivered', className: 'border-green-200 bg-green-50 text-green-700' },
  CANCELLED: { label: 'Cancelled', className: 'border-red-200 bg-red-50 text-red-700' }
}

export default function OrderManagementPage() {
  const { orders, getOrdersBySource, updateOrderStatus } = useOrderStore()
  const [activeTab, setActiveTab] = useState<OrderSource | 'ALL'>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'ALL'>('ALL')
  const [isEditingStatus, setIsEditingStatus] = useState(false)
  const [newStatus, setNewStatus] = useState<OrderStatus | ''>('')
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  // Get filtered orders
  const getFilteredOrders = () => {
    let filtered = activeTab === 'ALL' ? orders : getOrdersBySource(activeTab)

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(query) ||
          order.customer.name.toLowerCase().includes(query) ||
          order.products.some((p) => p.name.toLowerCase().includes(query))
      )
    }

    // Apply status filter
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    // Sort by date descending
    return filtered.sort((a, b) => b.date.getTime() - a.date.getTime())
  }

  const filteredOrders = getFilteredOrders()
  const selectedOrderData = orders.find((o) => o.id === selectedOrder)

  // Get counts for tabs
  const getCounts = () => ({
    ALL: orders.length,
    SHOPEE: getOrdersBySource('SHOPEE').length,
    TOKOPEDIA: getOrdersBySource('TOKOPEDIA').length,
    BLIBLI: getOrdersBySource('BLIBLI').length,
    INTERNAL: getOrdersBySource('INTERNAL').length,
    B2B: getOrdersBySource('B2B').length
  })

  const counts = getCounts()

  // Handle status update - show confirmation dialog
  const handleUpdateStatus = () => {
    if (!selectedOrderData || !newStatus) return
    setShowConfirmDialog(true)
  }

  // Confirm and execute status update
  const confirmUpdateStatus = () => {
    if (!selectedOrderData || !newStatus) return

    const newStatusLabel = STATUS_CONFIG[newStatus].label

    updateOrderStatus(selectedOrderData.id, newStatus)
    toast.success(`Status pesanan berhasil diubah menjadi ${newStatusLabel}!`)
    setShowConfirmDialog(false)
    setIsEditingStatus(false)
    setNewStatus('')
    setSelectedOrder(null)
  }

  // Reset edit mode when dialog closes
  const handleCloseDialog = () => {
    setSelectedOrder(null)
    setIsEditingStatus(false)
    setNewStatus('')
    setShowConfirmDialog(false)
  }

  return (
    <div className="space-y-4 pt-2 pb-10">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Kelola Pesanan (Omnichannel)</h1>
          <p className="mt-1 text-sm text-slate-500">Manage all orders from B2C marketplaces and B2B clients</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline-red" className="gap-2">
            <DownloadSimple size={16} /> Export
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* TABS */}
        <div className="scrollbar-hide overflow-x-auto border-b bg-white px-2 pt-2 lg:px-6">
          <div className="flex gap-2 lg:gap-4">
            {(['ALL', 'SHOPEE', 'TOKOPEDIA', 'BLIBLI', 'INTERNAL', 'B2B'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'rounded-t-lg px-3 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors sm:px-4 sm:text-sm',
                  activeTab === tab
                    ? 'border-b-2 border-primary bg-red-50/50 text-primary'
                    : 'text-slate-600 hover:bg-slate-50'
                )}
              >
                {tab === 'ALL' ? 'Semua' : SOURCE_CONFIG[tab].label}
                <span className="ml-1.5 text-[10px] opacity-60">({counts[tab]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex flex-col gap-3 border-b bg-slate-50/50 p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-96">
            <MagnifyingGlass className="absolute top-2.5 left-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Cari order ID, customer, atau produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'ALL')}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none"
            >
              <option value="ALL">Semua Status</option>
              {Object.entries(STATUS_CONFIG).map(([value, { label }]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="border-b bg-slate-50/50 font-medium text-slate-500">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Products</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                    <Package size={48} className="mx-auto mb-3 text-slate-300" weight="duotone" />
                    <p>Tidak ada pesanan ditemukan</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const sourceConfig = SOURCE_CONFIG[order.source]
                  const statusConfig = STATUS_CONFIG[order.status]

                  return (
                    <tr key={order.id} className="group transition-colors hover:bg-slate-50/80">
                      <td className="px-6 py-4">
                        <div className="font-mono text-xs font-bold text-slate-800">{order.orderNumber}</div>
                        {order.contractNumber && (
                          <div className="mt-0.5 text-[10px] text-slate-500">Kontrak: {order.contractNumber}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            'inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold text-nowrap',
                            sourceConfig.color,
                            sourceConfig.textColor
                          )}
                        >
                          {sourceConfig.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800">{order.customer.name}</div>
                        <div className="mt-0.5 text-xs text-slate-500">{order.customer.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <span className="text-slate-600">{order.products[0].name}</span>
                          {order.products.length > 1 && (
                            <span className="ml-1 text-xs text-slate-400">+{order.products.length - 1} lainnya</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-bold text-slate-900">{formatIDR(order.totalAmount)}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={cn(
                            'inline-flex rounded-full border px-2 py-0.5 text-xs font-medium text-nowrap',
                            statusConfig.className
                          )}
                        >
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-nowrap">
                        <div className="text-xs text-slate-600">{format(order.date, 'dd MMM yyyy', { locale: id })}</div>
                        <div className="text-[10px] text-slate-400">{format(order.date, 'HH:mm')}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button
                          onClick={() => setSelectedOrder(order.id)}
                          variant="outline-red"
                          size="sm"
                          className="h-8 gap-1.5"
                        >
                          <Eye size={14} /> Detail
                        </Button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between border-t bg-slate-50/50 p-4">
          <span className="text-xs font-medium text-slate-500">Menampilkan {filteredOrders.length} pesanan</span>
        </div>
      </Card>

      {/* ORDER DETAIL DIALOG */}
      <Dialog open={!!selectedOrder} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-3xl">
          {selectedOrderData && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Detail Pesanan</span>
                  <span
                    className={cn(
                      'inline-flex rounded-full px-3 py-1 text-xs font-bold',
                      SOURCE_CONFIG[selectedOrderData.source].color,
                      SOURCE_CONFIG[selectedOrderData.source].textColor
                    )}
                  >
                    {SOURCE_CONFIG[selectedOrderData.source].label}
                  </span>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* ORDER INFO */}
                <div className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase">Order Number</div>
                    <div className="mt-1 font-mono text-lg font-bold text-slate-900">{selectedOrderData.orderNumber}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase">Status</div>
                    <div className="mt-1">
                      <span
                        className={cn(
                          'inline-flex rounded-full border px-3 py-1 text-sm font-medium',
                          STATUS_CONFIG[selectedOrderData.status].className
                        )}
                      >
                        {STATUS_CONFIG[selectedOrderData.status].label}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase">Order Date</div>
                    <div className="mt-1 flex items-center gap-1.5 text-sm">
                      <Calendar size={14} className="text-slate-400" />
                      {format(selectedOrderData.date, 'dd MMMM yyyy, HH:mm', { locale: id })}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase">Total Amount</div>
                    <div className="mt-1 text-lg font-bold text-primary">{formatIDR(selectedOrderData.totalAmount)}</div>
                  </div>
                </div>

                {/* CUSTOMER INFO */}
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Package size={16} weight="fill" className="text-primary" />
                    Customer Information
                  </h3>
                  <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4">
                    <div className="font-medium text-slate-900">{selectedOrderData.customer.name}</div>
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <Phone size={14} />
                      {selectedOrderData.customer.phone}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <Envelope size={14} />
                      {selectedOrderData.customer.email}
                    </div>
                    <div className="flex items-start gap-1.5 text-sm text-slate-600">
                      <MapPin size={14} className="mt-0.5 shrink-0" />
                      <span>{selectedOrderData.shippingAddress}</span>
                    </div>
                  </div>
                </div>

                {/* PRODUCTS */}
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
                    <ShoppingCart size={16} weight="fill" className="text-primary" />
                    Products ({selectedOrderData.products.length} items)
                  </h3>
                  <div className="overflow-hidden rounded-lg border border-slate-200">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                        <tr>
                          <th className="px-4 py-2">Product</th>
                          <th className="px-4 py-2 text-center">Qty</th>
                          <th className="px-4 py-2 text-right">Price</th>
                          <th className="px-4 py-2 text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedOrderData.products.map((product, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-3 font-medium text-slate-900">{product.name}</td>
                            <td className="px-4 py-3 text-center">
                              {product.qty} {product.unit}
                            </td>
                            <td className="px-4 py-3 text-right">{formatIDR(product.price)}</td>
                            <td className="px-4 py-3 text-right font-medium">{formatIDR(product.qty * product.price)}</td>
                          </tr>
                        ))}
                        <tr className="bg-slate-50 font-bold">
                          <td colSpan={3} className="px-4 py-3 text-right">
                            Total
                          </td>
                          <td className="px-4 py-3 text-right text-primary">{formatIDR(selectedOrderData.totalAmount)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* PAYMENT & SHIPPING */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
                      <CreditCard size={16} weight="fill" className="text-primary" />
                      Payment Info
                    </h3>
                    <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Method:</span>
                        <span className="font-medium">{selectedOrderData.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Status:</span>
                        <span
                          className={cn(
                            'font-medium text-nowrap',
                            selectedOrderData.paymentStatus === 'PAID'
                              ? 'text-green-600'
                              : selectedOrderData.paymentStatus === 'UNPAID'
                                ? 'text-amber-600'
                                : 'text-red-600'
                          )}
                        >
                          {selectedOrderData.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
                      <Truck size={16} weight="fill" className="text-primary" />
                      Shipping Info
                    </h3>
                    <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Courier:</span>
                        <span className="font-medium">{selectedOrderData.shippingCourier || '-'}</span>
                      </div>
                      {selectedOrderData.trackingNumber && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Tracking:</span>
                          <span className="font-mono text-xs font-medium">{selectedOrderData.trackingNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {selectedOrderData.notes && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                    <div className="text-xs font-semibold text-amber-800 uppercase">Notes</div>
                    <div className="mt-1 text-sm text-amber-900">{selectedOrderData.notes}</div>
                  </div>
                )}
              </div>

              <DialogFooter className="flex-col gap-3 sm:flex-row">
                {isEditingStatus ? (
                  <>
                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-1 sm:flex-row">
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                        className="h-10 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none"
                      >
                        <option value="">-- Pilih Status Baru --</option>
                        {Object.entries(STATUS_CONFIG).map(([value, { label }]) => (
                          <option key={value} value={value} disabled={value === selectedOrderData.status}>
                            {label} {value === selectedOrderData.status ? '(Current)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline-red"
                        onClick={() => {
                          setIsEditingStatus(false)
                          setNewStatus('')
                        }}
                        className="flex-1 sm:flex-none"
                      >
                        <X size={16} /> Batal
                      </Button>
                      <Button
                        variant="default"
                        onClick={handleUpdateStatus}
                        disabled={!newStatus}
                        className="flex-1 gap-2 sm:flex-none"
                      >
                        <Check size={16} /> Simpan
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Button variant="outline-red" onClick={handleCloseDialog} className="w-full sm:w-auto">
                      Close
                    </Button>
                    <Button variant="default" onClick={() => setIsEditingStatus(true)} className="w-full gap-2 sm:w-auto">
                      <Check size={16} /> Update Status
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* CONFIRMATION DIALOG */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Konfirmasi Perubahan Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-slate-600">Apakah Anda yakin ingin mengubah status pesanan ini?</p>
            {selectedOrderData && newStatus && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-center">
                    <div className="mb-2 text-xs text-slate-500">Status Saat Ini</div>
                    <span
                      className={cn(
                        'inline-flex rounded-full border px-3 py-1 text-sm font-medium',
                        STATUS_CONFIG[selectedOrderData.status].className
                      )}
                    >
                      {STATUS_CONFIG[selectedOrderData.status].label}
                    </span>
                  </div>
                  <div className="mx-4 text-slate-400">→</div>
                  <div className="flex-1 text-center">
                    <div className="mb-2 text-xs text-slate-500">Status Baru</div>
                    <span
                      className={cn(
                        'inline-flex rounded-full border px-3 py-1 text-sm font-medium',
                        STATUS_CONFIG[newStatus].className
                      )}
                    >
                      {STATUS_CONFIG[newStatus].label}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline-red" onClick={() => setShowConfirmDialog(false)}>
              <X size={16} /> Batal
            </Button>
            <Button variant="default" onClick={confirmUpdateStatus} className="gap-2">
              <Check size={16} /> Ya, Ubah Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
