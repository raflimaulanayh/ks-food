'use client'

import { useState } from 'react'

import { Button } from '@/components/atoms/ui/button'
import { ProductCard } from '@/components/molecules/product-card'
import { SectionHeader } from '@/components/molecules/section-header'
import { Container } from '@/components/templates/container'

// Real Products with actual images
const allProducts = [
  {
    id: '1',
    title: 'Sambal Bawang Original',
    price: 25000,
    imageUrl: '/static/images/products/sambal-bawang.png',
    badges: ['Best Seller', 'Halal'],
    category: 'Sambal',
    slug: 'sambal-bawang'
  },
  {
    id: '2',
    title: 'Sambal Bawang Botol 340ml',
    price: 28000,
    imageUrl: '/static/images/products/sambal-bawang-botol.png',
    badges: ['BPOM', 'Halal'],
    category: 'Sambal',
    slug: 'sambal-bawang-botol'
  },
  {
    id: '3',
    title: 'Sambal Dadak Pedas',
    price: 22000,
    imageUrl: '/static/images/products/sambal-dadak.png',
    badges: ['Pedas', 'Halal'],
    category: 'Sambal',
    slug: 'sambal-dadak'
  },
  {
    id: '4',
    title: 'Sambal Geprek Extra Hot',
    price: 26000,
    imageUrl: '/static/images/products/sambal-geprek.png',
    badges: ['Extra Pedas', 'New'],
    category: 'Sambal',
    slug: 'sambal-geprek'
  },
  {
    id: '5',
    title: 'Chili Oil Premium',
    price: 35000,
    imageUrl: '/static/images/products/chili-oil.png',
    badges: ['Premium', 'Aromatis'],
    category: 'Sambal',
    slug: 'chili-oil'
  },
  {
    id: '6',
    title: 'Saus Tomat Premium 1L',
    price: 45000,
    imageUrl: '/static/images/products/saus-tomat.png',
    badges: ['Best Seller', 'BPOM'],
    category: 'Saus',
    slug: 'saus-tomat'
  },
  {
    id: '7',
    title: 'Saus Tomat Botol 340ml',
    price: 22000,
    imageUrl: '/static/images/products/saus-tomat-botol.png',
    badges: ['Halal', 'Favorit'],
    category: 'Saus',
    slug: 'saus-tomat-botol'
  },
  {
    id: '8',
    title: 'Saus BBQ Spesial',
    price: 38000,
    imageUrl: '/static/images/products/saus-bbq.png',
    badges: ['New', 'Premium'],
    category: 'Saus',
    slug: 'saus-bbq'
  },
  {
    id: '9',
    title: 'Saus Black Pepper',
    price: 42000,
    imageUrl: '/static/images/products/saus-blackpepper.png',
    badges: ['Premium', 'Favorit'],
    category: 'Saus',
    slug: 'saus-blackpepper'
  },
  {
    id: '10',
    title: 'Mayonaise Creamy',
    price: 35000,
    imageUrl: '/static/images/products/mayonaise.png',
    badges: ['Creamy', 'Best Seller'],
    category: 'Mayonnaise',
    slug: 'mayonaise'
  },
  {
    id: '11',
    title: 'Selai Nastar Homemade',
    price: 32000,
    imageUrl: '/static/images/products/selai-nastar.png',
    badges: ['Homemade', 'Manis'],
    category: 'Selai',
    slug: 'selai-nastar'
  },
  {
    id: '12',
    title: 'Sambal Tomat Spesial',
    price: 24000,
    imageUrl: '/static/images/category/sambal-tomat.png',
    badges: ['Halal', 'BPOM'],
    category: 'Sambal',
    slug: 'sambal-tomat'
  }
]

const categories = ['Semua', 'Sambal', 'Saus', 'Mayonnaise', 'Selai']

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
              slug={product.slug}
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
