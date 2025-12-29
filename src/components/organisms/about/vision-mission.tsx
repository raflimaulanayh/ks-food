'use client'

import { motion } from 'framer-motion'
import { Target, TrendingUp } from 'lucide-react'

import { Container } from '@/components/templates/container'

export const VisionMission = () => {
  return (
    <section className="bg-primary py-20 text-white md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-secondary/20 p-3">
                <Target className="size-8 text-secondary" />
              </div>
              <h2 className="text-3xl font-bold">Visi Kami</h2>
            </div>
            <p className="text-2xl leading-relaxed font-light text-white md:text-3xl">
              &quot;Menjadi produsen bumbu dan saus terdepan di Indonesia yang menghadirkan inovasi rasa berkualitas global
              dengan sentuhan lokal.&quot;
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-secondary/20 p-3">
                <TrendingUp className="size-8 text-secondary" />
              </div>
              <h2 className="text-3xl font-bold">Misi Kami</h2>
            </div>
            <ul className="space-y-6">
              {[
                'Memproduksi produk pangan yang aman, halal, dan berkualitas tinggi.',
                'Melakukan inovasi berkelanjutan untuk memenuhi selera pasar yang dinamis.',
                'Memberikan pelayanan terbaik dan solusi tepat guna bagi mitra bisnis.',
                'Memberdayakan sumber daya lokal dan berkontribusi pada kesejahteraan masyarakat.'
              ].map((item, index) => (
                <li key={index} className="flex gap-4">
                  <div className="mt-2 size-2 rounded-full bg-secondary" />
                  <p className="text-lg text-white">{item}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
