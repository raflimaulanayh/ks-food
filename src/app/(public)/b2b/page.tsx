'use client'

import { useB2BStore } from '@/stores/use-b2b-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Handshake, Factory, Truck, Notebook, CheckCircle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/atoms/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/atoms/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/atoms/ui/form'
import { Input } from '@/components/atoms/ui/input'
import { Textarea } from '@/components/atoms/ui/textarea'
import { Container } from '@/components/templates/container'

export default function B2BPage() {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const { addInquiry } = useB2BStore()

  const formSchema = z.object({
    companyName: z.string().min(2, 'Nama perusahaan wajib diisi'),
    picName: z.string().min(2, 'Nama PIC wajib diisi'),
    email: z.string().email('Email tidak valid'),
    phone: z.string().min(10, 'Nomor telepon tidak valid'),
    requirements: z.string().min(10, 'Mohon jelaskan kebutuhan Anda')
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      picName: '',
      email: '',
      phone: '',
      requirements: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Save to store
    addInquiry(values)

    // Show success dialog
    setIsSuccessOpen(true)
    form.reset()
  }

  const benefits = [
    {
      icon: Factory,
      title: 'Produksi Skala Besar',
      description:
        'Kapasitas produksi yang memadai untuk memenuhi kebutuhan bisnis Anda, mulai dari UMKM hingga industri besar.'
    },
    {
      icon: Notebook,
      title: 'Kustomisasi Resep',
      description: 'Tim R&D kami siap membantu mengembangkan formula bumbu khusus yang sesuai dengan karakter produk Anda.'
    },
    {
      icon: Handshake,
      title: 'Harga Kompetitif',
      description:
        'Dapatkan penawaran harga khusus untuk pembelian dalam jumlah besar (grosir) dengan kualitas yang konsisten.'
    },
    {
      icon: Truck,
      title: 'Distribusi Luas',
      description:
        'Jaringan distribusi yang handal memastikan produk sampai ke lokasi Anda tepat waktu dan dalam kondisi prima.'
    }
  ]

  const workflow = [
    { step: 1, title: 'Konsultasi', desc: 'Diskusikan kebutuhan spesifik bisnis Anda dengan tim kami.' },
    { step: 2, title: 'Sampling', desc: 'Kami kirimkan sampel produk atau kembangkan formula baru.' },
    { step: 3, title: 'Penawaran', desc: 'Kami berikan penawaran harga terbaik sesuai volume pesanan.' },
    { step: 4, title: 'Produksi & Kirim', desc: 'Proses produksi dimulai dan barang dikirim ke lokasi Anda.' }
  ]

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      {/* Success Dialog */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600">
              <CheckCircle size={48} weight="fill" />
            </div>
            <DialogTitle className="text-xl font-bold text-slate-900">Permintaan Terkirim!</DialogTitle>
            <DialogDescription className="mt-2 text-slate-600">
              Terima kasih telah menghubungi kami. Tim kami akan segera meninjau permintaan Anda dan menghubungi Anda
              kembali.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => setIsSuccessOpen(false)}
              className="w-full bg-primary font-bold text-white hover:bg-primary/90 sm:w-auto sm:px-8"
            >
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Hero Section */}
      <Container className="mb-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-4xl font-extrabold text-slate-900 md:text-5xl"
        >
          Solusi B2B untuk <span className="text-primary">Bisnis Kuliner</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mx-auto max-w-3xl text-lg text-slate-600"
        >
          KS Food siap menjadi mitra strategis Anda dalam penyediaan bumbu berkualitas tinggi. Tingkatkan efisiensi dan
          konsistensi rasa produk Anda bersama kami.
        </motion.p>
      </Container>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Mengapa Bermitra dengan Kami?</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-slate-100 bg-slate-50 p-6 shadow-sm hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <benefit.icon size={32} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-800">{benefit.title}</h3>
                <p className="text-sm text-slate-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Workflow Section */}
      <section className="py-16">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Alur Kerja Sama</h2>
          </div>
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="absolute top-8 left-0 z-0 hidden h-0.5 w-full -translate-y-1/2 bg-slate-200 lg:block"></div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {workflow.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-slate-50 bg-primary text-2xl font-bold text-white shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-800">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Request Form Section */}
      <section className="bg-white py-16">
        <Container className="max-w-4xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl md:p-12">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-slate-900">Ajukan Penawaran</h2>
              <p className="mt-2 text-slate-600">Isi formulir di bawah ini untuk memulai diskusi kemitraan.</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Perusahaan / Usaha</FormLabel>
                        <FormControl>
                          <Input placeholder="CV. Maju Mundur" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="picName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Penanggung Jawab (PIC)</FormLabel>
                        <FormControl>
                          <Input placeholder="Bapak Budi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Perusahaan</FormLabel>
                        <FormControl>
                          <Input placeholder="procurement@company.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Telepon / WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="08123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kebutuhan Anda</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Jelaskan jenis bumbu, estimasi volume pemesanan per bulan, atau spesifikasi khusus lainnya..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Kirim Permintaan
                </Button>
              </form>
            </Form>
          </div>
        </Container>
      </section>
    </div>
  )
}
