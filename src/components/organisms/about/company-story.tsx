'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { Container } from '@/components/templates/container'

export const CompanyStory = () => {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/static/images/hero/hero1.png"
                alt="KS Food Factory"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -right-8 -bottom-8 hidden rounded-2xl bg-secondary p-8 shadow-lg md:block">
              <p className="text-5xl font-bold text-primary">15+</p>
              <p className="mt-2 font-medium text-primary">Tahun Pengalaman</p>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20">
              Cerita Kami
            </span>
            <h2 className="mb-6 text-3xl leading-tight font-bold text-slate-900 md:text-4xl">
              Berawal dari Dapur Rumahan, Kini Menjadi Mitra Terpercaya
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-slate-600">
              <p>
                Kertasari Food (KS Food) didirikan pada tahun 2010 dengan satu visi sederhana: menghadirkan cita rasa otentik
                yang dapat dinikmati oleh semua kalangan.
              </p>
              <p>
                Perjalanan kami dimulai dari produksi saus sambal rumahan yang dipasarkan ke warung-warung kecil. Berkat
                konsistensi rasa dan kualitas bahan baku pilihan, permintaan terus meningkat hingga kami berkembang menjadi
                manufaktur modern.
              </p>
              <p>
                Kini, kami melayani ratusan mitra bisnis mulai dari HORECA (Hotel, Restaurant, Cafe), UMKM, hingga industri
                makanan berskala besar di seluruh Indonesia.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
