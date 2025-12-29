'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { Button } from '@/components/atoms/ui/button'
import { SectionHeader } from '@/components/molecules/section-header'
import { Container } from '@/components/templates/container'

export const ProductHighlights = () => {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <SectionHeader
            title="Produk Unggulan Kami"
            subtitle="Cita rasa terbaik yang paling diminati oleh pelanggan kami."
            align="center"
          />
        </motion.div>

        <div className="mx-auto mb-12 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:max-w-3xl">
          {[
            { title: 'Sambal Tomat', img: '/static/images/category/sambal-tomat.png' },
            { title: 'Mayonaise', img: '/static/images/category/mayonaise.png' },
            { title: 'Saus BBQ', img: '/static/images/category/saus-bbq.png' },
            { title: 'Chili Oil', img: '/static/images/category/sambal-tomat.png' }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col items-center gap-4"
            >
              <div className="relative aspect-square w-full max-w-[150px] overflow-hidden rounded-full bg-pink-50 transition-transform duration-300 group-hover:scale-105">
                <Image src={item.img} alt={item.title} fill className="object-cover p-4" />
              </div>
              <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button url="/products" size="lg" variant="secondary">
            Lihat Semua Produk Kami
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}
