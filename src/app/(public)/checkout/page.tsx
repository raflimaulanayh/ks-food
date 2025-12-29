'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { useCartStore } from '@/stores/use-cart-store'
import { useOrderStore } from '@/stores/use-order-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, Truck, CreditCard, Wallet, Bank } from '@phosphor-icons/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/atoms/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/atoms/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/atoms/ui/form'
import { Input } from '@/components/atoms/ui/input'
import { Textarea } from '@/components/atoms/ui/textarea'
import { Container } from '@/components/templates/container'

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Nama lengkap wajib diisi'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor telepon tidak valid'),
  address: z.string().min(10, 'Alamat lengkap wajib diisi'),
  city: z.string().min(2, 'Kota wajib diisi'),
  zipCode: z.string().min(5, 'Kode pos wajib diisi'),
  paymentMethod: z.enum(['transfer', 'ewallet', 'cod'])
})

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart, getTotalPrice } = useCartStore()
  const { addOrder } = useOrderStore()
  const [mounted, setMounted] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'ewallet' | 'cod'>('transfer')
  const [lastOrder, setLastOrder] = useState<{
    id: string
    total: number
    items: { id: string; name: string; price: number; quantity: number; image: string }[]
    method: string
  } | null>(null)

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      paymentMethod: 'transfer'
    }
  })

  // Auth & Cart Check
  useEffect(() => {
    setMounted(true)

    // Allow cart check logic to run, but prioritize auth check for checkout
    const authState = useAuthStore.getState()

    if (!authState.isAuthenticated) {
      toast.warning('Silakan login terlebih dahulu untuk melanjutkan')
      router.push('/auth/login')

      return
    }

    // Autofill form if user exists
    if (authState.user) {
      const u = authState.user
      form.reset({
        fullName: u.name,
        email: u.email,
        phone: u.phone,
        address: u.address,
        city: u.city,
        zipCode: u.zipCode,
        paymentMethod: 'transfer'
      })
    }
  }, [router, form])

  if (!mounted) return null

  const subtotal = getTotalPrice()
  const tax = subtotal * 0.11
  const total = subtotal + tax

  function onSubmit(values: z.infer<typeof checkoutSchema>) {
    console.info(values)
    setPaymentMethod(values.paymentMethod)

    // Generate Random Order ID
    const orderId = `INV-${Math.floor(Math.random() * 1000000)}`

    // Prepare Order Data
    const orderData = {
      id: orderId,
      total: total,
      items: items,
      method: values.paymentMethod,
      customer: values
    }
    setLastOrder(orderData)

    // Save to Order History Store
    addOrder({
      id: orderId,
      date: new Date().toISOString(),
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      total: total,
      status: 'pending', // Default status
      paymentMethod: values.paymentMethod,
      address: values.address
    })

    // Simulate Processing
    setTimeout(() => {
      setIsSuccessOpen(true)
      clearCart()
    }, 1000)
  }

  const generateWhatsAppRaw = () => {
    if (!lastOrder) return ''

    const customer = form.getValues()

    let message = `*Halo Admin KS Food, Saya mau Konfirmasi Pesanan Baru* 🛒\n\n`
    message += `🆔 No. Pesanan: *${lastOrder.id}*\n`
    message += `👤 Nama: ${customer.fullName}\n`
    message += `📍 Alamat: ${customer.address}, ${customer.city}\n`
    message += `💰 Total: *Rp ${lastOrder.total.toLocaleString('id-ID')}*\n`
    message += `💳 Pembayaran: ${lastOrder.method.toUpperCase()}\n\n`

    message += `*Detail Pesanan:*\n`
    lastOrder.items.forEach((item) => {
      message += `- ${item.name} (${item.quantity}x)\n`
    })

    message += `\nMohon diproses ya kak, Terima kasih! 🙏`

    return message
  }

  const handleConfirmWhatsApp = () => {
    const message = generateWhatsAppRaw()
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/6281234567890?text=${encodedMessage}`, '_blank')
    handleCloseSuccess() // Optional: close dialog/redirect after clicking
  }

  const handleCloseSuccess = () => {
    setIsSuccessOpen(false)
    router.push('/user/orders')
  }

  return (
    <div className="min-h-screen bg-white py-20">
      {/* Success Dialog */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-green-100 p-4 text-green-600">
              <CheckCircle size={56} weight="fill" />
            </div>
            <DialogTitle className="text-2xl font-bold text-slate-900">Pesanan Berhasil!</DialogTitle>
            <DialogDescription className="mt-2 text-slate-600">Terima kasih telah berbelanja di KS Food.</DialogDescription>
          </DialogHeader>

          <div className="my-4 rounded-lg bg-slate-50 p-4">
            <h3 className="mb-2 font-semibold text-slate-900">Instruksi Pembayaran</h3>
            {paymentMethod === 'transfer' && (
              <div className="space-y-2 text-sm text-slate-700">
                <p>Silakan transfer ke rekening berikut:</p>
                <div className="flex items-center gap-3 rounded border border-slate-200 bg-white p-3">
                  <Bank size={24} className="text-blue-600" />
                  <div className="text-left">
                    <p className="font-bold text-slate-900">BCA 1234567890</p>
                    <p className="text-xs text-slate-500">a.n PT KS Food Indonesia</p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Pesanan akan diproses otomatis setelah pembayaran dikonfirmasi.
                </p>
              </div>
            )}
            {paymentMethod === 'ewallet' && (
              <div className="space-y-2 text-sm text-slate-700">
                <p>Silakan scan QRIS atau transfer ke:</p>
                <div className="flex items-center gap-3 rounded border border-slate-200 bg-white p-3">
                  <Wallet size={24} className="text-blue-600" />
                  <div className="text-left">
                    <p className="font-bold text-slate-900">GoPay/OVO: 0812-3456-7890</p>
                    <p className="text-xs text-slate-500">KS Food Merchant</p>
                  </div>
                </div>
              </div>
            )}
            {paymentMethod === 'cod' && (
              <div className="flex items-center gap-3 rounded border border-slate-200 bg-white p-3">
                <Truck size={24} className="text-orange-600" />
                <div className="text-left text-sm">
                  <p className="font-bold text-slate-900">Bayar di Tempat</p>
                  <p className="text-slate-600">
                    Siapkan uang tunai sebesar <span className="font-bold">Rp {total.toLocaleString('id-ID')}</span> saat
                    kurir tiba.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center gap-3">
            {paymentMethod !== 'cod' && (
              <Button
                onClick={handleConfirmWhatsApp}
                className="w-full bg-green-600 py-6 font-bold text-white hover:bg-green-700"
              >
                Konfirmasi via WhatsApp
              </Button>
            )}
            <Button
              onClick={handleCloseSuccess}
              variant="outline"
              className="w-full border-primary py-6 font-bold text-primary hover:bg-primary/5"
            >
              Lihat Pesanan Saya
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Container>
        <h1 className="mb-8 text-3xl font-bold text-slate-900">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: Form */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              {/* Shipping Info Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Truck size={24} weight="fill" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Informasi Pengiriman</h2>
                </div>

                <Form {...form}>
                  <form id="checkout-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Lengkap</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nomor Telepon</FormLabel>
                            <FormControl>
                              <Input placeholder="08123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alamat Lengkap</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Nama Jalan, No. Rumah, RT/RW..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-5 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kota / Kabupaten</FormLabel>
                            <FormControl>
                              <Input placeholder="Bandung" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kode Pos</FormLabel>
                            <FormControl>
                              <Input placeholder="40287" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </div>

              {/* Payment Method Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600">
                    <CreditCard size={24} weight="fill" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Metode Pembayaran</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { id: 'transfer', label: 'Bank Transfer', icon: Bank },
                    { id: 'ewallet', label: 'E-Wallet', icon: Wallet }
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all hover:bg-slate-50 ${
                        form.watch('paymentMethod') === method.id
                          ? 'border-primary bg-red-50/50 text-primary'
                          : 'border-slate-100 text-slate-600'
                      }`}
                    >
                      <input type="radio" value={method.id} {...form.register('paymentMethod')} className="hidden" />
                      <method.icon size={32} weight={form.watch('paymentMethod') === method.id ? 'fill' : 'regular'} />
                      <span className="font-semibold">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-44 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-slate-900">Ringkasan Pesanan</h2>

                {/* Mini Items List */}
                <div className="custom-scrollbar mb-4 max-h-60 overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="mb-3 flex gap-3 border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded bg-slate-50">
                        <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                      </div>
                      <div>
                        <p className="line-clamp-2 text-sm font-semibold text-slate-800">{item.name}</p>
                        <p className="text-xs text-slate-500">
                          {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-slate-100 pt-4 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Pengiriman</span>
                    <span className="font-medium text-green-600">Gratis</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>PPN (11%)</span>
                    <span>Rp {tax.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="border-t border-slate-100 pt-3">
                    <div className="flex justify-between text-lg font-bold text-slate-900">
                      <span>Total</span>
                      <span className="text-primary">Rp {total.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  form="checkout-form"
                  disabled={items.length === 0}
                  className="mt-6 w-full bg-primary py-6 text-lg font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:bg-slate-300 disabled:shadow-none"
                >
                  Bayar Sekarang
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
