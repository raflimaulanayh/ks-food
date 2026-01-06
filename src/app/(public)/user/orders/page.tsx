'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { useOrderStore, OrderStatus, type Order } from '@/stores/use-order-store'
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  ShoppingBag,
  User,
  Phone,
  Envelope,
  MapPin,
  CreditCard,
  Star
} from '@phosphor-icons/react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, type ElementType } from 'react'
import { toast } from 'sonner'

import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/atoms/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/atoms/ui/dialog'
import { Textarea } from '@/components/atoms/ui/textarea'
import { Container } from '@/components/templates/container'

const XCircle = ({ className }: { className?: string }) => <div className={className}>X</div>

const statusMap: Record<OrderStatus, { label: string; color: string; icon: ElementType }> = {
  PENDING: { label: 'Belum Bayar', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  CONFIRMED: { label: 'Dikonfirmasi', color: 'bg-cyan-100 text-cyan-700', icon: CheckCircle },
  PROCESSING: { label: 'Dikemas', color: 'bg-blue-100 text-blue-700', icon: Package },
  READY_TO_SHIP: { label: 'Siap Kirim', color: 'bg-indigo-100 text-indigo-700', icon: Package },
  SHIPPED: { label: 'Dikirim', color: 'bg-purple-100 text-purple-700', icon: Truck },
  DELIVERED: { label: 'Selesai', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  CANCELLED: { label: 'Dibatalkan', color: 'bg-red-100 text-red-700', icon: XCircle }
}

const paymentStatusMap = {
  PAID: { label: 'Lunas', color: 'bg-green-100 text-green-700' },
  UNPAID: { label: 'Belum Bayar', color: 'bg-red-100 text-red-700' },
  REFUNDED: { label: 'Dikembalikan', color: 'bg-gray-100 text-gray-700' }
}

export default function MyOrdersPage() {
  const router = useRouter()
  /* const { isAuthenticated } = useAuthStore() */
  const { orders, updateOrderStatus, addReview } = useOrderStore()
  const [activeTab, setActiveTab] = useState<OrderStatus | 'all'>('all')
  const [mounted, setMounted] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')

  useEffect(() => {
    setMounted(true)
    if (!useAuthStore.getState().isAuthenticated) {
      router.push('/auth/login')
    }
  }, [router])

  if (!mounted) return null

  const filteredOrders = activeTab === 'all' ? orders : orders.filter((o) => o.status === activeTab)

  const handleAction = (orderId: string, currentStatus: OrderStatus) => {
    if (currentStatus === 'PENDING') {
      // Simulate Payment -> Processing
      toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
        loading: 'Memverifikasi pembayaran...',
        success: () => {
          updateOrderStatus(orderId, 'PROCESSING')

          return 'Pembayaran berhasil diverifikasi!'
        },
        error: 'Gagal memproses pembayaran'
      })
    } else if (currentStatus === 'PROCESSING') {
      // Simulate Shipping
      updateOrderStatus(orderId, 'SHIPPED')
      toast.success('Pesanan telah diserahkan ke kurir')
    } else if (currentStatus === 'SHIPPED') {
      // Simulate Receive
      updateOrderStatus(orderId, 'DELIVERED')
      toast.success('Pesanan diterima! Terima kasih.')
    }
  }

  const handleSubmitReview = () => {
    if (!selectedOrder) return

    if (reviewComment.trim().length < 10) {
      toast.error('Komentar minimal 10 karakter')

      return
    }

    addReview(selectedOrder.id, reviewRating, reviewComment.trim())
    toast.success('Review berhasil dikirim! Terima kasih atas feedback Anda.')

    // Reset & close
    setIsReviewOpen(false)
    setReviewRating(5)
    setReviewComment('')
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Container>
        <h1 className="mb-8 text-3xl font-bold text-slate-900">Pesanan Saya</h1>

        {/* Status Tabs */}
        <div className="custom-scrollbar mb-8 flex overflow-x-auto border-b border-slate-200 pb-1">
          {['all', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'].map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status as OrderStatus | 'all')}
              className={`mr-6 min-w-fit border-b-2 px-1 pb-3 text-sm font-semibold transition-colors ${
                activeTab === status
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {status === 'all' ? 'Semua Pesanan' : statusMap[status as OrderStatus].label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="params flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-sm">
              <div className="mb-4 rounded-full bg-slate-100 p-6 text-slate-400">
                <ShoppingBag size={48} weight="fill" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Belum ada pesanan</h3>
              <p className="mt-2 text-slate-500">Yuk mulai belanja makanan favoritmu!</p>
              <Link href="/products" className="mt-6 inline-block">
                <Button>Mulai Belanja</Button>
              </Link>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const StatusIcon = statusMap[order.status].icon

              return (
                <Card key={order.id} className="overflow-hidden border-slate-200 shadow-sm">
                  <CardHeader className="border-b border-slate-50 bg-slate-50/50 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-900">{order.orderNumber}</span>
                        <span className="text-xs text-slate-500">
                          {format(new Date(order.date), 'dd MMM yyyy, HH:mm', { locale: id })}
                        </span>
                      </div>
                      <Badge variant="outline" className={`${statusMap[order.status].color} border-0 px-3 py-1`}>
                        <span className="mr-1.5">
                          <StatusIcon weight="fill" />
                        </span>
                        {statusMap[order.status].label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {order.products.map((product, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-slate-100 bg-white">
                            <Package size={32} className="absolute inset-0 m-auto text-slate-300" />
                          </div>
                          <div className="flex-1">
                            <p className="line-clamp-1 font-semibold text-slate-900">{product.name}</p>
                            <p className="text-sm text-slate-500">
                              {product.qty} {product.unit} x Rp {product.price.toLocaleString('id-ID')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-slate-900">
                              Rp {(product.price * product.qty).toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-end gap-4 border-t border-slate-50 bg-slate-50/30 p-4 sm:flex-row sm:justify-between">
                    <div className="text-right sm:text-left">
                      <p className="text-sm text-slate-500">Total Pesanan</p>
                      <p className="text-lg font-bold text-primary">Rp {order.totalAmount.toLocaleString('id-ID')}</p>
                    </div>

                    <div className="flex w-full gap-2 sm:w-auto">
                      <Button
                        variant="outline-red"
                        className="flex-1 sm:flex-none"
                        onClick={() => {
                          setSelectedOrder(order)
                          setIsDetailOpen(true)
                        }}
                      >
                        Detail
                      </Button>

                      {order.status === 'PENDING' && (
                        <Button
                          onClick={() => handleAction(order.id, 'PENDING')}
                          variant="default"
                          className="flex-1 sm:flex-none"
                        >
                          Bayar Sekarang
                        </Button>
                      )}
                      {order.status === 'PROCESSING' && (
                        <Button
                          onClick={() => handleAction(order.id, 'PROCESSING')}
                          variant="default"
                          className="flex-1 sm:flex-none"
                        >
                          Simulasi Kirim
                        </Button>
                      )}
                      {order.status === 'SHIPPED' && (
                        <Button
                          onClick={() => handleAction(order.id, 'SHIPPED')}
                          variant="default"
                          className="flex-1 sm:flex-none"
                        >
                          Pesanan Diterima
                        </Button>
                      )}
                      {order.status === 'DELIVERED' && !order.review && (
                        <Button
                          onClick={() => {
                            setSelectedOrder(order)
                            setIsReviewOpen(true)
                          }}
                          variant="default"
                          className="flex-1 gap-2 sm:flex-none"
                        >
                          <Star size={16} weight="fill" />
                          Beri Review
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              )
            })
          )}
        </div>

        {/* ORDER DETAIL DIALOG */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
            {selectedOrder && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Detail Pesanan</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* Order Info */}
                  <div className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-slate-500">Nomor Pesanan</p>
                      <p className="font-bold text-slate-900">{selectedOrder.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Tanggal Pemesanan</p>
                      <p className="font-medium text-slate-900">
                        {format(new Date(selectedOrder.date), 'dd MMMM yyyy, HH:mm', { locale: id })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Status Pesanan</p>
                      <Badge variant="outline" className={`${statusMap[selectedOrder.status].color} mt-1 border-0`}>
                        {statusMap[selectedOrder.status].label}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Total Pembayaran</p>
                      <p className="text-lg font-bold text-primary">
                        Rp {selectedOrder.totalAmount.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
                      <User size={20} weight="duotone" className="text-slate-600" />
                      Informasi Pelanggan
                    </h3>
                    <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4">
                      <div className="flex items-start gap-2">
                        <User size={16} className="mt-0.5 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Nama</p>
                          <p className="font-medium text-slate-900">{selectedOrder.customer.name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Envelope size={16} className="mt-0.5 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Email</p>
                          <p className="font-medium text-slate-900">{selectedOrder.customer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone size={16} className="mt-0.5 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Telepon</p>
                          <p className="font-medium text-slate-900">{selectedOrder.customer.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="mt-0.5 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Alamat Pengiriman</p>
                          <p className="font-medium text-slate-900">{selectedOrder.shippingAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Products */}
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
                      <Package size={20} weight="duotone" className="text-slate-600" />
                      Produk Dipesan
                    </h3>
                    <div className="overflow-hidden rounded-lg border border-slate-200">
                      <table className="w-full text-left text-sm">
                        <thead className="border-b bg-slate-50 text-xs font-medium text-slate-600">
                          <tr>
                            <th className="px-4 py-3">Produk</th>
                            <th className="px-4 py-3 text-center">Jumlah</th>
                            <th className="px-4 py-3 text-right">Harga Satuan</th>
                            <th className="px-4 py-3 text-right">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {selectedOrder.products.map((product, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="px-4 py-3 font-medium text-slate-900">{product.name}</td>
                              <td className="px-4 py-3 text-center text-slate-600">
                                {product.qty} {product.unit}
                              </td>
                              <td className="px-4 py-3 text-right text-slate-600">
                                Rp {product.price.toLocaleString('id-ID')}
                              </td>
                              <td className="px-4 py-3 text-right font-semibold text-slate-900">
                                Rp {(product.price * product.qty).toLocaleString('id-ID')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="border-t-2 border-slate-200 bg-slate-50">
                          <tr>
                            <td colSpan={3} className="px-4 py-3 text-right font-bold text-slate-900">
                              Total
                            </td>
                            <td className="px-4 py-3 text-right text-lg font-bold text-primary">
                              Rp {selectedOrder.totalAmount.toLocaleString('id-ID')}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>

                  {/* Payment & Shipping Info */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Payment */}
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
                        <CreditCard size={20} weight="duotone" className="text-slate-600" />
                        Informasi Pembayaran
                      </h3>
                      <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4">
                        <div>
                          <p className="text-xs text-slate-500">Metode Pembayaran</p>
                          <p className="font-medium text-slate-900">{selectedOrder.paymentMethod}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Status Pembayaran</p>
                          <Badge
                            variant="outline"
                            className={`${paymentStatusMap[selectedOrder.paymentStatus].color} mt-1 border-0`}
                          >
                            {paymentStatusMap[selectedOrder.paymentStatus].label}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Shipping */}
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
                        <Truck size={20} weight="duotone" className="text-slate-600" />
                        Informasi Pengiriman
                      </h3>
                      <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4">
                        {selectedOrder.shippingCourier && (
                          <div>
                            <p className="text-xs text-slate-500">Kurir</p>
                            <p className="font-medium text-slate-900">{selectedOrder.shippingCourier}</p>
                          </div>
                        )}
                        {selectedOrder.trackingNumber && (
                          <div>
                            <p className="text-xs text-slate-500">Nomor Resi</p>
                            <p className="font-mono text-sm font-medium text-slate-900">{selectedOrder.trackingNumber}</p>
                          </div>
                        )}
                        {!selectedOrder.shippingCourier && !selectedOrder.trackingNumber && (
                          <p className="text-sm text-slate-500">Informasi pengiriman belum tersedia</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Review (if exists) */}
                  {selectedOrder.review && (
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
                        <Star size={20} weight="duotone" className="text-amber-500" />
                        Review Anda
                      </h3>
                      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={20}
                                weight="fill"
                                className={star <= selectedOrder.review!.rating ? 'text-amber-500' : 'text-slate-300'}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-slate-500">
                            • {format(new Date(selectedOrder.review.date), 'dd MMM yyyy', { locale: id })}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700">{selectedOrder.review.comment}</p>
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {selectedOrder.notes && (
                    <div>
                      <h3 className="mb-2 text-sm font-semibold text-slate-700">Catatan</h3>
                      <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                        {selectedOrder.notes}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* REVIEW DIALOG */}
        <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Beri Review & Rating</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {selectedOrder && (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Pesanan</p>
                  <p className="font-semibold text-slate-900">{selectedOrder.orderNumber}</p>
                  <p className="mt-1 text-xs text-slate-600">
                    {selectedOrder.products.length} produk • Rp {selectedOrder.totalAmount.toLocaleString('id-ID')}
                  </p>
                </div>
              )}

              {/* Rating Stars */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star size={32} weight="fill" className={star <= reviewRating ? 'text-amber-500' : 'text-slate-300'} />
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  {reviewRating === 5
                    ? '⭐ Sangat Puas'
                    : reviewRating === 4
                      ? '😊 Puas'
                      : reviewRating === 3
                        ? '😐 Cukup'
                        : reviewRating === 2
                          ? '😕 Kurang Puas'
                          : '😞 Tidak Puas'}
                </p>
              </div>

              {/* Comment */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Komentar <span className="text-xs font-normal text-slate-500">(minimal 10 karakter)</span>
                </label>
                <Textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Ceritakan pengalaman Anda dengan produk dan layanan kami..."
                  className="min-h-[120px] resize-none"
                />
                <p className="mt-1 text-xs text-slate-500">{reviewComment.length} karakter</p>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline-red"
                onClick={() => {
                  setIsReviewOpen(false)
                  setReviewRating(5)
                  setReviewComment('')
                }}
              >
                Batal
              </Button>
              <Button
                variant="default"
                onClick={handleSubmitReview}
                disabled={reviewComment.trim().length < 10}
                className="gap-2"
              >
                <Star size={16} weight="fill" />
                Kirim Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  )
}
