'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Heart, ShieldCheck, Zap } from 'lucide-react'

import { Container } from '@/components/templates/container'

const values = [
  {
    icon: ShieldCheck,
    title: 'Kualitas Terjamin',
    desc: 'Kami menerapkan standar ketat dalam pemilihan bahan baku hingga proses produksi untuk memastikan keamanan pangan.'
  },
  {
    icon: Heart,
    title: 'Sepenuh Hati',
    desc: 'Kami melayani setiap pelanggan dengan tulus, mendengarkan kebutuhan, dan memberikan solusi terbaik.'
  },
  {
    icon: Zap,
    title: 'Inovasi Tanpa Henti',
    desc: 'Kami terus berinovasi menciptakan varian rasa baru yang relevan dengan tren kuliner masa kini.'
  },
  {
    icon: CheckCircle,
    title: 'Integritas',
    desc: 'Kami menjunjung tinggi kejujuran dan transparansi dalam setiap aspek bisnis dan kemitraan.'
  }
]

export const OurValues = () => {
  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-primary md:text-4xl">Nilai Inti Kami</h2>
          <p className="mt-4 text-lg text-slate-600">Prinsip yang menjadi landasan kami dalam berkarya.</p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((val, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-6 inline-flex rounded-xl bg-primary/5 p-4 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <val.icon className="size-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">{val.title}</h3>
              <p className="leading-relaxed text-slate-600">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
