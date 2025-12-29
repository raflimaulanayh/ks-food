'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { Container } from '@/components/templates/container'

export const AboutHero = () => {
  return (
    <section className="relative h-[400px] w-full overflow-hidden md:h-[500px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/static/images/hero/hero1.png" // Placeholder, will need a real image later or reuse hero1
          alt="About KS Food"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/60" />
      </div>

      <Container className="relative flex h-full items-center justify-center text-center">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          >
            Tentang Kami
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white/90 md:text-xl"
          >
            Dedikasi rasa dan kualitas sejak 2010. Menciptakan solusi bumbu terbaik untuk setiap sajian Anda.
          </motion.p>
        </div>
      </Container>
    </section>
  )
}
