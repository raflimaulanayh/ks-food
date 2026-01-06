'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/atoms/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/atoms/ui/carousel'
import { ArticleCard } from '@/components/molecules/article-card'
import { Container } from '@/components/templates/container'

const articles = [
  {
    category: 'Resep',
    title: '5 Cara Mengolah Saos Sambal Menjadi Bumbu Marinasi',
    image: '/static/images/hero/hero1.png',
    slug: 'cara-mengolah-saos'
  },
  {
    category: 'Tips Bisnis',
    title: 'Strategi Menghemat Cost Food Tanpa Mengurangi Kualitas Rasa',
    image: '/static/images/hero/hero1.png',
    slug: 'strategi-hemat-cost'
  },
  {
    category: 'Inspirasi',
    title: 'Tren Kuliner Pedas yang Wajib Dicoba Tahun Ini',
    image: '/static/images/hero/hero1.png',
    slug: 'tren-kuliner-pedas'
  },
  {
    category: 'Berita',
    title: 'Kertasari Food Raih Penghargaan UMKM Terbaik 2024',
    image: '/static/images/hero/hero1.png',
    slug: 'penghargaan-umkm-2024'
  },
  {
    category: 'Wawasan Kuliner',
    title: 'Mengapa Saus Berbasis Buah (Saus Nanas) Akan Populer di Restoran?',
    image: '/static/images/hero/hero1.png',
    slug: 'saus-nanas-populer'
  }
]

export const LatestArticles = () => {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="mb-12 flex items-center justify-between">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold text-primary md:text-4xl"
          >
            Artikel Terbaru
          </motion.h2>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Button variant="link" className="md:text-lg" url="/article">
              Lihat Semua
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Carousel
            opts={{
              align: 'start',
              loop: true
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {articles.map((article, index) => (
                <CarouselItem key={index} className="pl-4 sm:basis-1/2 lg:basis-1/4">
                  <div className="h-full">
                    <ArticleCard {...article} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="mt-8 flex items-center justify-between">
              {/* Fake Pagination Dots */}
              <div className="flex gap-2">
                <div className="size-3 rounded-full bg-red-700" />
                <div className="size-3 rounded-full bg-slate-200" />
                <div className="size-3 rounded-full bg-slate-200" />
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-2">
                <CarouselPrevious
                  customArrow={<ArrowLeft className="size-6 text-slate-400" />}
                  className="static translate-y-0 border-none bg-transparent hover:bg-transparent"
                />
                <CarouselNext
                  customArrow={<ArrowRight className="size-6 text-red-700" />}
                  className="static translate-y-0 border-none bg-transparent hover:bg-transparent"
                />
              </div>
            </div>
          </Carousel>
        </motion.div>
      </Container>
    </section>
  )
}
