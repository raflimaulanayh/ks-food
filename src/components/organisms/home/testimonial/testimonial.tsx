'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import Image from 'next/image'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/atoms/ui/carousel'
import { Container } from '@/components/templates/container'

const testimonials = [
  {
    name: 'Budi Santoso',
    role: 'Operational Manager, Restoran Sederhana',
    content:
      'Kualitas saus dari KS Food sangat konsisten. Sejak beralih menggunakan produk mereka, komplain pelanggan mengenai rasa masakan menurun drastis.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Siti Aminah',
    role: 'Owner, Catering Berkah',
    content:
      'Layanan B2B mereka luar biasa. Tim sales sangat responsif dan membantu kami menemukan formulasi bumbu yang pas untuk menu katering kami.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Hendra Gunawan',
    role: 'Head Chef, Hotel Grand Asia',
    content:
      'Saus sambal dan tomatnya memiliki tekstur dan rasa yang premium. Sangat cocok untuk standar hotel bintang 4 kami. Harga juga sangat kompetitif.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Dewi Lestari',
    role: 'Purchasing, PT Food Makmur',
    content:
      'Kerjasama dengan KS Food sangat profesional. Dokumen legalitas dan sertifikasi halal lengkap, memudahkan proses audit internal kami.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Rahmat Wijaya',
    role: 'Owner, Waroeng Pedas',
    content:
      'Chili oil-nya juara! Pedasnya nendang dan aromanya wangi banget. Pelanggan saya selalu minta tambah. Recommended banget buat usaha kuliner.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Lina Marlina',
    role: 'Manager, Cafe Bunga',
    content:
      'Mayonaise-nya creamy dan stabil, gak pecah saat diolah. Cocok banget buat dressing salad dan saus cocolan di cafe kami.',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Agus Pratama',
    role: 'Distributor Sembako',
    content:
      'Sebagai distributor, saya senang dengan kecepatan pengiriman dan packaging KS Food yang aman. Jarang ada barang rusak saat sampai.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Sari Indah',
    role: 'Product Dev, Snack Factory',
    content:
      'Kami menggunakan bumbu tabur custom dari KS Food untuk produk keripik kami. Rasanya unik dan bikin produk kami beda dari kompetitor.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  }
]

export const Testimonials = () => {
  return (
    <section className="bg-slate-50 py-20">
      <Container className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold text-primary md:text-4xl"
          >
            Apa Kata Mitra Kami?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 lg:text-lg"
          >
            Ribuan bisnis kuliner telah mempercayakan rasa masakan mereka pada KS Food.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Carousel
            opts={{
              align: 'start',
              loop: true
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6 py-4">
              {testimonials.map((item, index) => (
                <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/3">
                  <div className="group relative flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1">
                    <Quote className="absolute top-6 right-6 size-12 text-slate-100 transition-colors group-hover:text-primary/10" />

                    <div>
                      <div className="mb-6 flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`size-4 ${i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-200 text-slate-200'}`}
                          />
                        ))}
                      </div>

                      <p className="relative z-10 mb-8 text-base leading-relaxed text-slate-600">
                        &quot;{item.content}&quot;
                      </p>
                    </div>

                    <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm">
                        <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="truncate font-bold text-slate-900">{item.name}</h4>
                        <p className="truncate text-xs text-slate-500">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-8 flex justify-end gap-2 pr-4">
              <CarouselPrevious className="static translate-y-0 border-primary! text-primary! hover:bg-primary/10!" />
              <CarouselNext className="static translate-y-0 border-primary! text-primary! hover:bg-primary/10!" />
            </div>
          </Carousel>
        </motion.div>
      </Container>
    </section>
  )
}
