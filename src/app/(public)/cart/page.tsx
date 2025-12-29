'use client'

import { useCartStore } from '@/stores/use-cart-store'
import { Trash, Minus, Plus, ArrowRight, ShoppingBag } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import { Button } from '@/components/atoms/ui/button'
import { Container } from '@/components/templates/container'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const subtotal = getTotalPrice()
  const tax = subtotal * 0.11 // PPN 11%
  const total = subtotal + tax

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <Container>
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-slate-300">
            <ShoppingBag size={48} weight="fill" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-slate-900">Keranjang Belanja Kosong</h1>
          <p className="mb-8 text-slate-500">Sepertinya Anda belum menambahkan produk apapun.</p>
          <Link href="/products">
            <Button className="bg-primary px-8 font-bold text-white hover:bg-primary/90">Mulai Belanja</Button>
          </Link>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <Container>
        <h1 className="mb-8 text-3xl font-bold text-slate-900">Keranjang Belanja ({items.length})</h1>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Cart Items List */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {items.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:gap-6 sm:p-6"
                >
                  {/* Product Image */}
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50 sm:h-32 sm:w-32">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between">
                        <div>
                          <h3 className="line-clamp-1 font-bold text-slate-900 sm:line-clamp-2">{item.name}</h3>
                          <p className="text-sm text-slate-500">{item.category}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500">
                          <Trash size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div className="font-bold text-primary">Rp {item.price.toLocaleString('id-ID')}</div>

                      {/* Qty Control */}
                      <div className="flex items-center rounded-lg border border-slate-200 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-primary disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} weight="bold" />
                        </button>
                        <span className="flex w-8 items-center justify-center text-sm font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-primary"
                        >
                          <Plus size={14} weight="bold" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-slate-900">Ringkasan Pesanan</h2>
              <div className="mb-6 space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>PPN (11%)</span>
                  <span>Rp {tax.toLocaleString('id-ID')}</span>
                </div>
                <div className="my-2 border-t border-slate-100 pt-2" />
                <div className="flex justify-between text-lg font-bold text-slate-900">
                  <span>Total</span>
                  <span className="text-primary">Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <Link href="/checkout" className="block w-full">
                <Button className="w-full gap-2 bg-primary py-6 text-lg font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90">
                  Checkout
                  <ArrowRight weight="bold" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
