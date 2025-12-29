'use client'

import { useState } from 'react'

import { Button } from '@/components/atoms/ui/button'
import { ProductCard } from '@/components/molecules/product-card'
import { SectionHeader } from '@/components/molecules/section-header'
import { Container } from '@/components/templates/container'

// Expanded dummy data
const allProducts = [
  {
    id: '1',
    title: 'Saus Sambal Ekstra Pedas',
    price: 25000,
    imageUrl: 'https://images.unsplash.com/photo-1585325701165-351af916e581?q=80&w=800&auto=format&fit=crop',
    badges: ['Best Seller', 'Halal'],
    category: 'Saus'
  },
  {
    id: '2',
    title: 'Saus Tomat Premium',
    price: 22000,
    imageUrl: 'https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?q=80&w=2070&auto=format&fit=crop',
    badges: ['BPOM', 'Halal'],
    category: 'Saus'
  },
  {
    id: '3',
    title: 'Mayonnaise Serbaguna',
    price: 35000,
    imageUrl: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=800&auto=format&fit=crop',
    badges: ['Creamy'],
    category: 'Mayonnaise'
  },
  {
    id: '4',
    title: 'Saus Barbeque Special',
    price: 45000,
    imageUrl: 'https://images.unsplash.com/photo-1627245084931-e40263f350c3?q=80&w=800&auto=format&fit=crop',
    badges: ['New'],
    category: 'Saus'
  },
  {
    id: '5',
    title: 'Sambal Terasi Instan',
    price: 18000,
    imageUrl: 'https://images.unsplash.com/photo-1574484284008-59d7305d0126?auto=format&fit=crop&w=800&q=80',
    badges: ['Pedas'],
    category: 'Bumbu'
  },
  {
    id: '6',
    title: 'Kecap Manis Legit',
    price: 20000,
    imageUrl: 'https://images.unsplash.com/photo-1625937985794-6b952b95b863?auto=format&fit=crop&w=800&q=80',
    badges: ['Asli'],
    category: 'Kecap'
  },
  {
    id: '7',
    title: 'Bumbu Nasi Goreng',
    price: 12000,
    imageUrl: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=800&q=80',
    badges: ['Praktis'],
    category: 'Bumbu'
  },
  {
    id: '8',
    title: 'Saus Keju Creamy',
    price: 38000,
    imageUrl: 'https://images.unsplash.com/photo-1610427956890-48e02d449339?auto=format&fit=crop&w=800&q=80',
    badges: ['Favorit'],
    category: 'Saus'
  }
]

const categories = ['Semua', 'Saus', 'Bumbu', 'Mayonnaise', 'Kecap']

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('Semua')

  const filteredProducts =
    activeCategory === 'Semua' ? allProducts : allProducts.filter((product) => product.category === activeCategory)

  return (
    <div className="min-h-screen bg-white py-10 md:py-20">
      <Container>
        <SectionHeader
          title="Katalog Produk"
          subtitle="Temukan aneka pilihan saus dan bumbu berkualitas untuk kebutuhan Anda."
          className="mb-10"
        />

        {/* Filter Tabs */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2 md:gap-4">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'} // variant="default" uses primary color
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-6 transition-all ${activeCategory === cat ? 'bg-primary text-white shadow-md' : 'border-primary bg-transparent text-primary hover:text-primary'}`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              imageUrl={product.imageUrl}
              badges={product.badges}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center text-slate-500">
            <p>Produk tidak ditemukan untuk kategori ini.</p>
          </div>
        )}
      </Container>
    </div>
  )
}
