'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { Container } from '@/components/templates/container'

const clients = [
  { name: 'Mayora', logo: '/static/images/client/mayora.png' },
  { name: 'Gokana', logo: '/static/images/client/gokana.png' },
  { name: 'Indofood', logo: '/static/images/client/indofood.png' }
]

export const TrustedBy = () => {
  return (
    <section className="relative overflow-hidden bg-primary py-16 md:py-20">
      {/* Decorative Wave Pattern */}
      <div className="absolute top-0 left-0 h-full w-full opacity-10">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-0 -left-20 size-96 rounded-full border-20 border-white/20 blur-sm"
        />
        <div className="absolute top-10 -left-10 size-96 rounded-full border-20 border-white/20 blur-sm" />
        <div className="absolute top-20 left-0 size-96 rounded-full border-20 border-white/20 blur-sm" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-xl font-medium text-white/90 md:text-3xl">Telah Dipercaya oleh Brand Terkemuka</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-12 md:gap-24"
        >
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative h-12 w-32 md:h-16 md:w-52"
            >
              <Image src={client.logo} alt={client.name} fill className="object-contain duration-300 hover:opacity-80" />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
