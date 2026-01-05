'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { useOrderStore, OrderStatus } from '@/stores/use-order-store'
import { Package, Truck, CheckCircle, Clock, ShoppingBag } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, type ElementType } from 'react'
import { toast } from 'sonner'

import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/atoms/ui/card'
import { Container } from '@/components/templates/container'

const XCircle = ({ className }: { className?: string }) => <div className={className}>X</div>

const statusMap: Record<OrderStatus, { label: string; color: string; icon: ElementType }> = {
  pending: { label: 'Belum Bayar', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  processing: { label: 'Dikemas', color: 'bg-blue-100 text-blue-700', icon: Package },
  shipped: { label: 'Dikirim', color: 'bg-purple-100 text-purple-700', icon: Truck },
  delivered: { label: 'Selesai', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  cancelled: { label: 'Dibatalkan', color: 'bg-red-100 text-red-700', icon: XCircle }
}

export default function MyOrdersPage() {
  const router = useRouter()
  /* const { isAuthenticated } = useAuthStore() */
  const { orders, updateOrderStatus } = useOrderStore()
  const [activeTab, setActiveTab] = useState<OrderStatus | 'all'>('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!useAuthStore.getState().isAuthenticated) {
      router.push('/auth/login')
    }
  }, [router])

  if (!mounted) return null

  const filteredOrders = activeTab === 'all' ? orders : orders.filter((o) => o.status === activeTab)

  const handleAction = (orderId: string, currentStatus: OrderStatus) => {
    if (currentStatus === 'pending') {
      // Simulate Payment -> Processing
      toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
        loading: 'Memverifikasi pembayaran...',
        success: () => {
          updateOrderStatus(orderId, 'processing')

          return 'Pembayaran berhasil diverifikasi!'
        },
        error: 'Gagal memproses pembayaran'
      })
    } else if (currentStatus === 'processing') {
      // Simulate Shipping
      updateOrderStatus(orderId, 'shipped')
      toast.success('Pesanan telah diserahkan ke kurir')
    } else if (currentStatus === 'shipped') {
      // Simulate Receive
      updateOrderStatus(orderId, 'delivered')
      toast.success('Pesanan diterima! Terima kasih.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Container>
        <h1 className="mb-8 text-3xl font-bold text-slate-900">Pesanan Saya</h1>

        {/* Status Tabs */}
        <div className="custom-scrollbar mb-8 flex overflow-x-auto border-b border-slate-200 pb-1">
          {['all', 'pending', 'processing', 'shipped', 'delivered'].map((status) => (
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
                        <span className="font-bold text-slate-900">{order.id}</span>
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
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-slate-100 bg-white">
                            <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                          </div>
                          <div className="flex-1">
                            <p className="line-clamp-1 font-semibold text-slate-900">{item.name}</p>
                            <p className="text-sm text-slate-500">
                              {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-slate-900">
                              Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-end gap-4 border-t border-slate-50 bg-slate-50/30 p-4 sm:flex-row sm:justify-between">
                    <div className="text-right sm:text-left">
                      <p className="text-sm text-slate-500">Total Pesanan</p>
                      <p className="text-lg font-bold text-primary">Rp {order.total.toLocaleString('id-ID')}</p>
                    </div>

                    <div className="flex w-full gap-2 sm:w-auto">
                      <Button variant="outline-red" className="flex-1 sm:flex-none">
                        Detail
                      </Button>

                      {order.status === 'pending' && (
                        <Button onClick={() => handleAction(order.id, 'pending')} className="flex-1 bg-primary sm:flex-none">
                          Bayar Sekarang
                        </Button>
                      )}
                      {order.status === 'processing' && (
                        <Button
                          onClick={() => handleAction(order.id, 'processing')}
                          variant="secondary"
                          className="flex-1 sm:flex-none"
                        >
                          Simulasi Kirim
                        </Button>
                      )}
                      {order.status === 'shipped' && (
                        <Button
                          onClick={() => handleAction(order.id, 'shipped')}
                          className="flex-1 bg-green-600 text-white hover:bg-green-700 sm:flex-none"
                        >
                          Pesanan Diterima
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              )
            })
          )}
        </div>
      </Container>
    </div>
  )
}
