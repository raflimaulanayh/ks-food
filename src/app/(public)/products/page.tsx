'use client'

import { useState } from 'react'

import { Button } from '@/components/atoms/ui/button'
import { ProductCard } from '@/components/molecules/product-card'
import { SectionHeader } from '@/components/molecules/section-header'
import { Container } from '@/components/templates/container'

// Real Products synchronized with database schema DDL & DML
const allProducts = [
  {
    id: 'PROD-001',
    title: 'Saos Sambal Pedas Manis 135ml',
    price: 12000,
    imageUrl: '/static/images/products/sambal-bawang.png',
    badges: ['Best Seller', 'Pedas', 'Halal'],
    category: 'Saus Pedas',
    slug: 'saos-sambal-pedas-manis-135ml'
  },
  {
    id: 'PROD-002',
    title: 'Kecap Manis Cap Noni 250ml',
    price: 18000,
    imageUrl: '/static/images/products/sambal-bawang-botol.png',
    badges: ['Tradisional', 'Manis', 'Halal'],
    category: 'Kecap Manis',
    slug: 'kecap-manis-cap-noni-250ml'
  },
  {
    id: 'PROD-003',
    title: 'Mayones Original Premium 135ml',
    price: 15000,
    imageUrl: '/static/images/products/mayonaise.png',
    badges: ['Premium', 'Gurih', 'Halal'],
    category: 'Mayones',
    slug: 'mayones-original-premium-135ml'
  },
  {
    id: 'PROD-004',
    title: 'Saus Tomat Asam Manis 500ml',
    price: 22000,
    imageUrl: '/static/images/products/saus-tomat-botol.png',
    badges: ['Segar', 'Manis Asam', 'Halal'],
    category: 'Saus Tomat',
    slug: 'saus-tomat-asam-manis-500ml'
  },
  {
    id: 'PROD-005',
    title: 'Kecap Asin Kedelai Hitam 100ml',
    price: 9500,
    imageUrl: '/static/images/products/saus-tomat.png',
    badges: ['Gurih', 'Fermentasi', 'Halal'],
    category: 'Kecap Asin',
    slug: 'kecap-asin-kedelai-hitam-100ml'
  },
  {
    id: 'PROD-006',
    title: 'Minyak Wijen Wangi Murni 100ml',
    price: 25000,
    imageUrl: '/static/images/products/chili-oil.png',
    badges: ['Aromatik', 'Murni', 'Halal'],
    category: 'Minyak Wijen',
    slug: 'minyak-wijen-wangi-murni-100ml'
  },
  {
    id: 'PROD-007',
    title: 'Saus Tiram Selera Gurih 1kg',
    price: 45000,
    imageUrl: '/static/images/products/saus-bbq.png',
    badges: ['Kental', 'Gurih', 'Porsi Besar'],
    category: 'Saus Tiram',
    slug: 'saus-tiram-selera-gurih-1kg'
  },
  {
    id: 'PROD-008',
    title: 'Bumbu Lada Putih Bubuk 25g',
    price: 3500,
    imageUrl: '/static/images/products/selai-nastar.png',
    badges: ['Bubuk', 'Pedas Hangat', 'Praktis'],
    category: 'Bumbu Bubuk',
    slug: 'bumbu-lada-putih-bubuk-25g'
  },
  {
    id: 'PROD-009',
    title: 'Saus Teriyaki Jepang 330ml',
    price: 28000,
    imageUrl: '/static/images/products/saus-blackpepper.png',
    badges: ['Tumis', 'Khas Jepang', 'Halal'],
    category: 'Saus Teriyaki',
    slug: 'saus-teriyaki-jepang-330ml'
  },
  {
    id: 'PROD-010',
    title: 'Cuka Makan Asam Murni 10kg',
    price: 98000,
    imageUrl: '/static/images/products/sambal-dadak.png',
    badges: ['Asam Murni', 'Industri', 'Ukuran Besar'],
    category: 'Cuka Makan',
    slug: 'cuka-makan-asam-murni-10kg'
  }
]

const categories = [
  'Semua',
  'Saus Pedas',
  'Saus Tomat',
  'Mayones',
  'Kecap Manis',
  'Kecap Asin',
  'Minyak Wijen',
  'Saus Tiram',
  'Bumbu Bubuk',
  'Saus Teriyaki',
  'Cuka Makan'
]

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
