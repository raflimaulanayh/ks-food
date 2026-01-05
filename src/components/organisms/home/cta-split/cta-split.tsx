'use client'

import { Button } from '@/components/atoms/ui/button'
import { Container } from '@/components/templates/container'

export const CtaSplit = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center text-white shadow-xl md:px-16 md:py-24">
          {/* Decorative Pattern / Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50" />
          <div className="absolute -top-20 -right-20 size-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-96 rounded-full bg-black/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-semibold md:text-5xl">Solusi Kemitraan untuk Bisnis Anda</h2>
            <p className="mb-10 text-sm leading-relaxed text-white/90 sm:text-lg md:text-xl">
              Perlu pasokan saos & bumbu (bulk) yang konsisten untuk bisnis Anda? Kami melayani F&B dan manufaktur dengan
              harga dan spesifikasi yang fleksibel.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" url="/b2b" className="w-full sm:w-auto">
                Jelajahi Solusi B2B
              </Button>
              <Button size="lg" variant="outline-red" url="/contact" className="w-full sm:w-auto">
                Hubungi Tim Sales
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
