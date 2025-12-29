'use client'

import { motion } from 'framer-motion'

import { Container } from '@/components/templates/container'

const milestones = [
  {
    year: '2010',
    title: 'Awal Mula',
    description: 'Didirikan sebagai industri rumahan sederhana dengan fokus pada produksi saus sambal kemasan botol.'
  },
  {
    year: '2013',
    title: 'Ekspansi Pasar Lokal',
    description: 'Mulai mendistribusikan produk ke pasar tradisional dan warung-warung di seluruh wilayah Bandung Raya.'
  },
  {
    year: '2016',
    title: 'Modernisasi Pabrik',
    description:
      'Pindah ke fasilitas produksi semi-modern dan meningkatkan kapasitas produksi untuk memenuhi permintaan yang melonjak.'
  },
  {
    year: '2019',
    title: 'Sertifikasi Lengkap',
    description: 'Resmi mendapatkan sertifikasi Halal MUI dan izin edar BPOM, membuka peluang pasar yang lebih luas.'
  },
  {
    year: '2021',
    title: 'Fokus B2B & Horeca',
    description: 'Membuka divisi khusus B2B untuk melayani kebutuhan hotel, restoran, dan katering dengan kemasan bulk.'
  },
  {
    year: '2024',
    title: 'Go National',
    description:
      'Kini produk KS Food telah terdistribusi di lebih dari 15 kota besar di Indonesia dan dipercaya oleh ratusan mitra.'
  }
]

export const CompanyMilestones = () => {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-primary md:text-4xl"
          >
            Jejak Langkah Kami
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-600"
          >
            Transformasi dari dapur sederhana hingga menjadi manufaktur terpercaya.
          </motion.p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Vertical Line */}
          <div className="absolute top-0 left-4 h-full w-0.5 bg-slate-200 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col gap-8 md:flex-row md:items-center md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Side */}
                <div className="pl-12 md:w-1/2 md:px-12">
                  <div className={`text-left ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <span className="mb-3 inline-block rounded-full bg-secondary/10 px-4 py-1 text-sm font-bold text-primary">
                      {item.year}
                    </span>
                    <h3 className="mb-2 text-xl font-bold text-slate-900">{item.title}</h3>
                    <p className="leading-relaxed text-slate-600">{item.description}</p>
                  </div>
                </div>

                {/* Dot */}
                <div className="absolute left-4 size-4 -translate-x-[7px] rounded-full border-4 border-white bg-primary shadow-sm md:left-1/2 md:-translate-x-1/2" />

                {/* Empty Side for layout balance */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
