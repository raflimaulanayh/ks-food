'use client'

import { motion } from 'framer-motion'

import { Container } from '@/components/templates/container'

export const ValueProposition = () => {
  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <Container>
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl leading-tight font-semibold text-slate-900 md:text-5xl"
          >
            Kualitas yang Menjadi Prioritas Kami
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-1 gap-12 md:grid-cols-3"
        >
          {[
            {
              title: 'Bahan Baku Pilihan',
              desc: 'Menggunakan tomat, cabai, dan rempah segar berkualitas tinggi dari pemasok tepercaya.'
            },
            {
              title: 'Proses Higienis & Modern',
              desc: 'Diproduksi dengan standar kebersihan yang ketat untuk menjamin keamanan dan konsistensi rasa.'
            },
            {
              title: 'Terjamin & Tersertifikasi',
              desc: 'Seluruh produk kami telah memiliki sertifikasi resmi Halal dan BPOM sebagai jaminan mutu tertinggi.'
            }
          ].map((val, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <h3 className="mb-4 text-xl font-semibold text-primary md:text-2xl">{val.title}</h3>
              <p className="max-w-xs text-base leading-relaxed text-slate-600">{val.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
