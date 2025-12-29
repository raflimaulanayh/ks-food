'use client'

import { motion } from 'framer-motion'
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/atoms/ui/button'
import { ArticleCard } from '@/components/molecules/article-card'
import { Container } from '@/components/templates/container'

const featuredArticle = {
  category: 'Resep Unggulan',
  title: '5 Resep Ayam Bakar Lezat Menggunakan Saus BBQ & Blackpepper KSFOOD',
  description:
    'Musim liburan enaknya kumpul bareng keluarga sambil barbeque. Yuk, intip 5 resep ayam bakar praktis dan lezat yang dijamin bikin nagih dengan Saus BBQ & Blackpepper andalan dari KSFOOD!',
  image: '/static/images/hero/hero1.png',
  slug: 'cara-mengolah-saos'
}

const articles = [
  {
    category: 'Resep',
    title: 'Rahasia Membuat Nasi Goreng Spesial Rumahan Ala KSFOOD',
    image: '/static/images/hero/hero1.png',
    slug: 'nasi-goreng-spesial'
  },
  {
    category: 'Tips & Trik',
    title: 'Bukan Cuma Buat Salad, Ini 3 Cara Unik Menggunakan Mayonaise',
    image: '/static/images/hero/hero1.png',
    slug: 'cara-unik-mayonaise'
  },
  {
    category: 'Wawasan Kuliner',
    title: 'Mengapa Saus Berbasis Buah (Saus Nanas) Akan Populer di Restoran?',
    image: '/static/images/hero/hero1.png',
    slug: 'saus-nanas-populer'
  },
  {
    category: 'Kualitas',
    title: 'Perjalanan Bahan Baku Segar Menjadi Saus Tomat Berkualitas',
    image: '/static/images/hero/hero1.png',
    slug: 'bahan-baku-segar'
  },
  {
    category: 'Resep',
    title: 'Kreasi Menu Sarapan Sehat dengan Saus Tomat KS FOOD',
    image: '/static/images/hero/hero1.png',
    slug: 'sarapan-sehat'
  },
  {
    category: 'Bisnis',
    title: 'Tips Memilih Supplier Bumbu Terpercaya untuk Usaha Restoran',
    image: '/static/images/hero/hero1.png',
    slug: 'tips-supplier'
  },
  {
    category: 'Inspirasi',
    title: 'Tren Kuliner Pedas yang Wajib Dicoba Tahun Ini',
    image: '/static/images/hero/hero1.png',
    slug: 'tren-kuliner-pedas'
  },
  {
    category: 'Edukasi',
    title: 'Mengenal Perbedaan Saus Sambal Asli dan Saos Sambal Abal-abal',
    image: '/static/images/hero/hero1.png',
    slug: 'perbedaan-saos'
  }
]

const tags = [
  'Resep Ayam',
  'Saus BBQ',
  'Tips Memasak',
  'Sambal Nusantara',
  'Wawasan F&B',
  'Mayonaise',
  'Kualitas KSFOOD',
  'Resep Praktis'
]

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-white pt-10 pb-20 md:pt-10">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-12 flex items-center gap-2 text-xs font-medium text-slate-500 md:text-sm">
          <Link href="/" className="hover:text-primary">
            Beranda
          </Link>
          <span>/</span>
          <span className="text-slate-900">Artikel</span>
        </div>

        {/* Featured Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-20"
        >
          <h2 className="mb-8 text-3xl font-bold text-primary">Artikel Populer</h2>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex md:gap-8 md:p-8">
            {/* Image */}
            <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl md:mb-0 md:w-1/2 lg:w-5/12">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                className="object-cover transition-transform hover:scale-105"
                priority
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center text-left md:w-1/2 lg:w-7/12">
              <span className="mb-4 text-sm font-bold text-primary">{featuredArticle.category}</span>
              <h3 className="mb-4 text-2xl leading-tight font-bold text-slate-900 md:text-3xl lg:text-4xl">
                {featuredArticle.title}
              </h3>
              <p className="mb-8 leading-relaxed text-slate-600">{featuredArticle.description}</p>
              <Link href={`/article/${featuredArticle.slug}`}>
                <Button className="bg-secondary px-8 font-bold text-primary hover:bg-secondary/90">Selengkapnya</Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Latest Articles Grid */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
          >
            <h2 className="text-2xl font-bold text-primary">Artikel Terbaru</h2>
            <button className="flex items-center gap-2 font-semibold text-slate-600 hover:text-primary">
              <Filter className="size-5" />
              Filter Kategori
            </button>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {articles.map((article, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <ArticleCard {...article} />
              </motion.div>
            ))}
          </motion.div>

          {/* Custom Pagination */}
          <div className="mt-16 flex items-center justify-center gap-4">
            <button className="flex size-10 items-center justify-center rounded-full border border-red-200 text-primary hover:bg-red-50">
              <ChevronLeft className="size-5" />
            </button>

            <button className="flex size-10 items-center justify-center rounded-full bg-primary font-bold text-white shadow-md">
              1
            </button>
            <button className="flex size-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100">
              2
            </button>
            <button className="flex size-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100">
              3
            </button>
            <button className="flex size-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100">
              4
            </button>
            <button className="flex size-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100">
              5
            </button>
            <span className="text-slate-400">...</span>
            <button className="flex size-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100">
              50
            </button>

            <button className="flex size-10 items-center justify-center rounded-full border border-red-200 text-primary hover:bg-red-50">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </section>

        {/* Tags Section */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <h2 className="mb-6 text-2xl font-bold text-primary">Tag</h2>
          <div className="flex flex-wrap gap-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="cursor-pointer rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-primary transition-all hover:border-primary hover:bg-primary hover:text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.section>
      </Container>
    </div>
  )
}
