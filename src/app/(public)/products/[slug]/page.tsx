'use client'

import { useCartStore } from '@/stores/use-cart-store'
import { Star, Minus, Plus, ShoppingCart, Heart, ShareNetwork, Truck, ShieldCheck, ThumbsUp } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/atoms/ui/button'
import { Container } from '@/components/templates/container'

// Mock Data
interface Review {
  id: number
  user: string
  avatar: string
  rating: number
  date: string
  content: string
  attributes?: string[]
  images: string[]
  response?: string
}

interface ProductDetail {
  id: string
  name: string
  price: number
  originalPrice: number
  description: string
  images: string[]
  rating: number
  reviewsCount: number
  sold: string
  category: string
  sku: string
  weight: string
  stock: number
  specifications: { label: string; value: string }[]
  reviews: Review[]
}

const PRODUCTS_DB: Record<string, ProductDetail> = {
  default: {
    id: 'prod-001',
    name: 'Saus Sambal - Pedas Alami 1KG',
    price: 25000,
    originalPrice: 35000,
    description:
      'Saus sambal dengan perpaduan cabai segar pilihan dan rempah-rempah berkualitas. Memberikan rasa pedas yang pas dan aroma yang menggugah selera. Cocok untuk berbagai hidangan, mulai dari gorengan hingga makanan berkuah.\n\nKomposisi:\nCabai Segar, Bawang Putih, Gula, Garam, Cuka, Penguat Rasa, Pengawet Makanan.\n\nSaran Penyajian:\nDapat digunakan sebagai cocolan atau bumbu masak.',
    images: [
      '/static/images/products/sambal-bawang.png',
      '/static/images/products/sambal-bawang.png',
      '/static/images/products/sambal-bawang.png'
    ],
    rating: 4.8,
    reviewsCount: 128,
    sold: '4RB+',
    category: 'Saus & Sambal',
    sku: 'KS-SAMBAL-ORIGINAL-1KG',
    weight: '1KG',
    stock: 500,
    specifications: [
      { label: 'Kategori', value: 'Saus & Sambal' },
      { label: 'Stok', value: '500' },
      { label: 'Masa Penyimpanan', value: '12 Bulan' },
      { label: 'No. Izin Edar', value: 'BPOM RI MD 255428014446' },
      { label: 'Dikirim Dari', value: 'KAB. BANDUNG' }
    ],
    reviews: [
      {
        id: 1,
        user: 'budi_santoso',
        avatar: '',
        rating: 5,
        date: '2023-12-20',
        content:
          'Pengiriman cepat, packing aman pakai bubble wrap tebal. Rasa sausnya mantap, pedasnya pas ga bikin sakit perut. Bakal langganan disini!',
        attributes: ['Rasa: Enak', 'Harga: Terjangkau', 'Kualitas: Standar'],
        images: [],
        response: 'Terima kasih kak Budi sudah berbelanja di KS Food! Ditunggu pesanan selanjutnya ya kak :)'
      },
      {
        id: 2,
        user: 'siti_aminah',
        avatar: '',
        rating: 5,
        date: '2023-12-18',
        content: 'Suka banget sama teksturnya, ga terlalu cair. Cocok buat cocolan gorengan. Recommended seller!',
        attributes: ['Rasa: Pedas Mantap', 'Kualitas: Premium'],
        images: []
      },
      {
        id: 3,
        user: 'joko_widodo',
        avatar: '',
        rating: 4,
        date: '2023-12-15',
        content: 'Barang sampai dengan selamat. Cuma pengiriman agak lama dari ekspedisinya. Overall oke.',
        attributes: ['Kualitas: Baik'],
        images: []
      }
    ]
  }
}

export default function ProductDetailPage() {
  const router = useRouter()
  const product = PRODUCTS_DB['default']

  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  const { addItem } = useCartStore()

  const handleQuantityChange = (type: 'inc' | 'dec') => {
    if (type === 'dec' && quantity > 1) {
      setQuantity((q) => q - 1)
    } else if (type === 'inc') {
      setQuantity((q) => q + 1)
    }
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: 'saus-sambal-premium',
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      category: product.category
    })
    toast.success('Produk berhasil ditambahkan ke keranjang!', {
      description: `${product.name} - ${quantity} pcs`
    })
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push('/cart')
  }

  return (
    <div className="min-h-screen bg-white py-10 lg:py-20">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/products" className="hover:text-primary">
            Produk
          </Link>
          <span>/</span>
          <span className="line-clamp-1 font-semibold text-slate-900">{product.name}</span>
        </div>

        {/* Top Section: Product Info */}
        <div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Left: Gallery */}
            <div className="flex flex-col items-start space-y-4 lg:col-span-5">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-square w-full overflow-hidden rounded-lg border border-slate-100"
              >
                <Image
                  src={product.images[activeImage] || product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform hover:scale-110"
                  priority
                />
              </motion.div>
              <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onMouseEnter={() => setActiveImage(idx)}
                    onClick={() => setActiveImage(idx)}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 ${activeImage === idx ? 'border-primary' : 'border-transparent'}`}
                  >
                    <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>

              {/* Social Share */}
              <div className="flex items-center justify-center gap-6 text-slate-600">
                <div className="flex cursor-pointer items-center gap-2 hover:text-primary">
                  <p>Share:</p>
                  <ShareNetwork size={20} weight="fill" />
                </div>
                <div className="h-4 w-px bg-slate-300"></div>
                <div className="flex cursor-pointer items-center gap-2 hover:text-red-500">
                  <Heart size={20} />
                  <p>Favorit (542)</p>
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col lg:col-span-7">
              <h1 className="mb-2 line-clamp-2 text-2xl font-bold text-slate-900 md:text-3xl">{product.name}</h1>

              <div className="mb-6 flex items-center divide-x divide-slate-300 text-sm">
                <div className="flex items-center gap-1 pr-4 text-primary">
                  <span className="mr-1 border-b border-primary pb-0.5 font-bold">{product.rating}</span>
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        weight="fill"
                        className={i < Math.floor(product.rating) ? '' : 'text-slate-200'}
                      />
                    ))}
                  </div>
                </div>
                <div className="px-4">
                  <span className="mr-1 border-b border-slate-900 pb-0.5 font-bold">{product.reviewsCount}</span>
                  <span className="text-slate-500">Penilaian</span>
                </div>
                <div className="px-4">
                  <span className="mr-1 border-b border-slate-900 pb-0.5 font-bold">{product.sold}</span>
                  <span className="text-slate-500">Terjual</span>
                </div>
              </div>

              {/* Price Box */}
              <div className="mb-8 space-y-3 rounded bg-slate-50 p-6 md:px-8">
                <div className="flex flex-wrap items-center gap-4 lg:gap-3">
                  {product.originalPrice && (
                    <span className="text-slate-400 line-through">Rp {product.originalPrice.toLocaleString('id-ID')}</span>
                  )}
                  <span className="text-3xl font-bold text-primary">Rp {product.price.toLocaleString('id-ID')}</span>
                  <span className="rounded bg-primary px-1.5 py-0.5 text-xs font-bold text-white">29% OFF</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <span className="text-xs font-medium text-primary">Grosir</span>
                  <span className="text-xs text-slate-500">Beli (≥5) Rp23.500</span>
                </div>
              </div>

              {/* Shipping & Insurance */}
              <div className="mb-8 space-y-4 px-2">
                <div className="flex gap-4 text-sm sm:gap-8">
                  <span className="w-24 shrink-0 text-slate-500">Pengiriman</span>
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <Truck size={20} className="text-slate-700" />
                      <span className="text-slate-700">
                        Pengiriman ke <span className="font-bold">Kota Bandung</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <span className="font-medium text-green-600">Bebas Ongkir</span>
                      <span>Rp0 - Rp10.000 (Estimasi 3 Hari)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto space-y-6">
                <div className="flex items-center gap-4 px-2 sm:gap-8">
                  <span className="w-24 shrink-0 text-sm text-slate-500">Kuantitas</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center rounded border border-slate-300 bg-white">
                      <button
                        onClick={() => handleQuantityChange('dec')}
                        className="flex h-8 w-8 items-center justify-center border-r border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                        disabled={quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        readOnly
                        className="w-12 text-center text-sm font-bold text-slate-900 outline-none"
                      />
                      <button
                        onClick={() => handleQuantityChange('inc')}
                        className="flex h-8 w-8 items-center justify-center border-l border-slate-300 text-slate-600 hover:bg-slate-50"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="text-sm text-slate-500">Tersedia {product.stock} buah</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-6 pb-2 sm:flex-row">
                  <Button
                    onClick={handleAddToCart}
                    className="h-12 flex-1 gap-2 border border-primary bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    <ShoppingCart size={22} />
                    Masukkan Keranjang
                  </Button>
                  <Button onClick={handleBuyNow} className="h-12 flex-1 gap-2 bg-primary text-white hover:bg-primary/90">
                    Beli Sekarang
                  </Button>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-2 pt-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-primary" />
                  <span>Garansi KS Food</span>
                </div>
                <span>Dapatkan barang pesananmu atau uang kembali.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Specs & Description */}
        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 bg-slate-50 p-3 text-lg font-bold text-slate-900">Spesifikasi Produk</h2>
          <div className="mb-10 space-y-4 px-3">
            {product.specifications.map((spec, idx) => (
              <div key={idx} className="flex gap-4 text-sm">
                <span className="w-32 shrink-0 text-slate-500">{spec.label}</span>
                <span className="text-slate-900">{spec.value}</span>
              </div>
            ))}
          </div>

          <h2 className="mb-6 bg-slate-50 p-3 text-lg font-bold text-slate-900">Deskripsi Produk</h2>
          <div className="px-3 text-sm leading-relaxed whitespace-pre-line text-slate-700">{product.description}</div>
        </div>

        {/* Bottom Section: Reviews */}
        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 text-xl font-bold text-slate-900">Penilaian Produk</h2>

          <div className="mb-8 flex flex-col gap-8 rounded border border-primary/20 bg-primary/5 p-8 md:flex-row">
            <div className="flex flex-col items-center justify-center gap-2 md:border-r md:border-primary/20 md:pr-12">
              <div className="text-5xl font-bold text-primary">
                {product.rating} <span className="text-3xl font-normal text-slate-500">/ 5</span>
              </div>
              <div className="flex gap-1 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} weight="fill" className={i < Math.floor(product.rating) ? '' : 'text-slate-300'} />
                ))}
              </div>
            </div>
            <div className="flex flex-1 flex-wrap items-center gap-3">
              <Button variant="outline-red" className="border-primary bg-white text-primary hover:bg-primary/5">
                Semua
              </Button>
              <Button
                variant="outline-red"
                className="border-slate-200 bg-white text-slate-600 hover:border-primary hover:bg-slate-50 hover:text-primary"
              >
                5 Bintang ({product.reviewsCount})
              </Button>
              <Button
                variant="outline-red"
                className="border-slate-200 bg-white text-slate-600 hover:border-primary hover:bg-slate-50 hover:text-primary"
              >
                4 Bintang (2)
              </Button>
              <Button
                variant="outline-red"
                className="border-slate-200 bg-white text-slate-600 hover:border-primary hover:bg-slate-50 hover:text-primary"
              >
                3 Bintang (0)
              </Button>
              <Button
                variant="outline-red"
                className="border-slate-200 bg-white text-slate-600 hover:border-primary hover:bg-slate-50 hover:text-primary"
              >
                Dengan Media (59)
              </Button>
            </div>
          </div>

          <div className="space-y-8 divide-y divide-slate-100">
            {product.reviews.map((review) => (
              <div key={review.id} className="flex gap-4 pb-8 first:pt-0 last:pb-8">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-200">
                  {review.avatar ? (
                    <Image src={review.avatar} alt={review.user} width={40} height={40} className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 font-bold text-slate-400">
                      {review.user.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{review.user}</p>
                    <div className="mt-1 flex items-center gap-1 text-xs text-primary">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} weight="fill" className={i < review.rating ? '' : 'text-slate-200'} />
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-slate-500">
                    {review.date}{' '}
                    {review.attributes && review.attributes.length > 0 && ` | ${review.attributes.join(' | ')}`}
                  </div>

                  <p className="text-sm text-slate-700">{review.content}</p>

                  {/* Seller Response */}
                  {review.response && (
                    <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm">
                      <div className="mb-1 font-bold text-primary">Respon Penjual:</div>
                      <p className="text-slate-600">{review.response}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 pt-2">
                    <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700">
                      <ThumbsUp size={14} /> Membantu?
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
