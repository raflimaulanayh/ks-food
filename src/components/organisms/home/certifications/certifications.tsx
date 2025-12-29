'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { Container } from '@/components/templates/container'

export const Certifications = () => {
  return (
    <section className="bg-slate-50 pb-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-8 text-center md:flex-row md:gap-16"
        >
          <div className="flex items-center gap-4">
            <Image src="/static/images/halal.png" alt="Halal" width={80} height={80} className="h-16 w-auto md:h-36" />
            <div className="text-left">
              <h3 className="font-semibold text-slate-800">Sertifikasi Halal</h3>
              <p className="text-sm text-slate-500">Jaminan kehalalan produk</p>
            </div>
          </div>
          <div className="h-px w-full bg-slate-300 md:h-14 md:w-px" />
          <div className="flex items-center gap-4">
            <Image src="/static/images/bpom.png" alt="BPOM" width={80} height={80} className="h-16 w-auto md:h-36" />
            <div className="text-left">
              <h3 className="font-semibold text-slate-800">Izin Edar BPOM</h3>
              <p className="text-sm text-slate-500">Standar keamanan pangan</p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
