'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { Button } from '@/components/atoms/ui/button'
import { Container } from '@/components/templates/container'

const slides = [
  {
    id: 1,
    image: '/static/images/hero/hero1.png',
    title: 'Kertasari Sejahtera',
    subtitle: 'Solusi tepat untuk kebutuhan bisnis F&B dan manufaktur Anda.'
  }
]

export const HeroSection = () => {
  const slide = slides[0]

  return (
    <section className="relative h-[600px] w-full overflow-hidden bg-slate-900 md:h-[700px]">
      <div className="absolute inset-0">
        <Image src={slide.image} alt="Hero Background" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      <Container className="relative h-full">
        <div className="flex h-full flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl rounded bg-primary/70 p-8 text-white shadow-lg backdrop-blur-sm md:p-12 lg:p-14"
          >
            <h1 className="mb-6 text-4xl leading-tight font-semibold md:text-5xl lg:text-6xl">{slide.title}</h1>

            <p className="mb-8 max-w-2xl text-lg text-white/90 md:text-xl">{slide.subtitle}</p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" className="max-sm:w-full">
                Jelajahi Produk Kami
              </Button>
              <Button size="lg" variant="outline" className="max-sm:w-full">
                Hubungi Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
