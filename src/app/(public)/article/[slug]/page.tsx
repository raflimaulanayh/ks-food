'use client'

import { FacebookLogo, TwitterLogo, WhatsappLogo } from '@phosphor-icons/react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/atoms/ui/button'
import { ArticleBody } from '@/components/organisms/articles/article-body'
import { Container } from '@/components/templates/container'

export default function ArticleDetailPage() {
  const article = {
    title: '5 Resep Ayam Bakar Lezat Menggunakan Saus BBQ & Blackpepper KSFOOD',
    date: 'Kamis, 26 Oktober 2023',
    author: 'Chef Junaedi',
    category: 'Resep Unggulan',
    image: '/static/images/hero/hero1.png',
    slug: 'cara-mengolah-saos',
    tags: ['Resep Ayam', 'Sambal Nusantara']
  }

  // Related Articles Data
  const relatedArticles = [
    {
      category: 'Resep',
      title: 'Rahasia Membuat Nasi Goreng Spesial Rumahan Ala KSFOOD',
      slug: 'nasi-goreng-spesial'
    },
    {
      category: 'Resep',
      title: 'Mengapa Saus Berbasis Buah (Saus Nanas) Akan Populer di Restoran?',
      slug: 'saus-nanas-populer'
    },
    {
      category: 'Resep',
      title: 'Perjalanan Bahan Baku Segar Menjadi Saus Tomat Berkualitas',
      slug: 'bahan-baku-segar'
    }
  ]

  const handleShare = (platform: string) => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
    const shareText = `Baca artikel menarik ini: ${article.title}`
    let url = ''

    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
        break
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
        break
    }

    if (url) window.open(url, '_blank')
  }

  return (
    <article className="min-h-screen bg-white pt-10 pb-20">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 md:text-sm">
          <Link href="/" className="hover:text-primary">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/article" className="hover:text-primary">
            Artikel
          </Link>
          <span>/</span>
          <span className="text-primary">{article.category}</span>
          <span>/</span>
          <span className="truncate text-slate-400">{article.title}</span>
        </div>

        {/* Title & Date */}
        <div className="mb-8 max-w-5xl">
          <h1 className="mb-4 text-3xl leading-tight font-bold text-primary md:text-4xl lg:text-5xl">{article.title}</h1>
          <p className="text-sm text-slate-500">{article.date}</p>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Main Content (Left) */}
          <div className="w-full lg:w-9/12">
            {/* Main Image */}
            <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl">
              <Image src={article.image} alt={article.title} fill className="object-cover" priority />
            </div>

            {/* Content Body */}
            <ArticleBody />

            {/* CTA Card */}
            <div className="mt-12 overflow-hidden rounded-xl bg-primary p-8 text-white shadow-lg md:p-10">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold md:text-2xl">Siap Memasak Ayam Bakar Lezat Anda?</h3>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button className="bg-secondary text-primary hover:bg-secondary/90">Dapatkan Saus BBQ</Button>
                  <Button variant="outline-red" className="border-white text-white hover:bg-white hover:text-primary">
                    Lihat Resep Lainnya
                  </Button>
                </div>
              </div>
            </div>

            {/* Share & Tags */}
            <div className="mt-12 space-y-8">
              {/* Share */}
              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-900">Bagikan Artikel:</span>
                <div className="flex gap-2">
                  <button
                    className="flex size-9 items-center justify-center rounded-full bg-[#B30D00] text-white transition-opacity hover:opacity-90"
                    onClick={() => handleShare('facebook')}
                  >
                    <FacebookLogo className="size-5" />
                  </button>
                  <button
                    className="flex size-9 items-center justify-center rounded-full bg-[#B30D00] text-white transition-opacity hover:opacity-90"
                    onClick={() => handleShare('twitter')}
                  >
                    <TwitterLogo className="size-5" />
                  </button>
                  <button
                    className="flex size-9 items-center justify-center rounded-full bg-[#B30D00] text-white transition-opacity hover:opacity-90"
                    onClick={() => handleShare('whatsapp')}
                  >
                    <WhatsappLogo className="size-5" />
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="cursor-pointer rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-primary hover:text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="w-full lg:w-3/12">
            <div className="sticky top-44 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">Artikel Terkait</h3>
                <div className="mt-4 h-0.5 w-full bg-primary"></div>
              </div>

              <div className="flex flex-col gap-6">
                {relatedArticles.map((item, index) => (
                  <div key={index}>
                    <Link href={`/article/${item.slug}`} className="group flex gap-6">
                      <span className="block w-20 text-6xl leading-none font-bold text-slate-100 transition-colors group-hover:text-primary/10">
                        {index + 1}
                      </span>
                      <div className="pt-2">
                        <span className="mb-1 block text-sm font-semibold text-primary">{item.category}</span>
                        <h4 className="leading-snug font-bold text-slate-900 transition-colors group-hover:text-primary">
                          {item.title}
                        </h4>
                      </div>
                    </Link>
                    {index < relatedArticles.length - 1 && <div className="mt-6 border-b border-dashed border-red-200" />}
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-dashed border-red-200 pt-6">
                <Link href="/article" className="group flex items-center justify-between font-bold text-primary">
                  <span className="text-lg">Lihat semua</span>
                  <div className="flex size-10 items-center justify-center rounded-full border border-primary text-primary transition-all group-hover:bg-primary group-hover:text-white">
                    <ArrowRight className="size-5" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </article>
  )
}
