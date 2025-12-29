'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MapPin, Phone, Envelope, Clock, CheckCircle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/atoms/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/atoms/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/atoms/ui/form'
import { Input } from '@/components/atoms/ui/input'
import { Textarea } from '@/components/atoms/ui/textarea'
import { Container } from '@/components/templates/container'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Nama harus diisi minimal 2 karakter.'
  }),
  email: z.string().email({
    message: 'Email tidak valid.'
  }),
  subject: z.string().min(5, {
    message: 'Subjek harus diisi minimal 5 karakter.'
  }),
  message: z.string().min(10, {
    message: 'Pesan harus diisi minimal 10 karakter.'
  })
})

export default function ContactPage() {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.info(values)
    // Simulate API call
    setTimeout(() => {
      setIsSuccessOpen(true)
      form.reset()
    }, 500)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Alamat Kantor',
      details: ['Jl. Raya Kertasari No. 123,', 'Bandung, Jawa Barat', 'Indonesia 40287'],
      color: 'bg-red-50 text-primary',
      borderColor: 'border-red-100'
    },
    {
      icon: Phone,
      title: 'Telepon & WhatsApp',
      details: ['+62 812-3456-7890 (CS)', '+62 22 1234 5678 (Office)'],
      color: 'bg-yellow-50 text-yellow-600',
      borderColor: 'border-yellow-100'
    },
    {
      icon: Envelope,
      title: 'Email',
      details: ['halo@ksfood.id', 'support@ksfood.id'],
      color: 'bg-blue-50 text-blue-600',
      borderColor: 'border-blue-100'
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      details: ['Senin - Jumat: 08:00 - 17:00', 'Sabtu - Minggu: Libur'],
      color: 'bg-green-50 text-green-600',
      borderColor: 'border-green-100'
    }
  ]

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      {/* Success Dialog */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600">
              <CheckCircle size={48} weight="fill" />
            </div>
            <DialogTitle className="text-xl font-bold text-slate-900">Pesan Terkirim!</DialogTitle>
            <DialogDescription className="mt-2 text-slate-600">
              Terima kasih telah menghubungi kami. Tim kami akan segera membalas pesan Anda melalui email yang terlampir.
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

      <Container className="space-y-10">
        {/* Page Header */}
        <div className="mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-extrabold text-slate-900 md:text-5xl"
          >
            Get in Touch with <span className="text-primary">KS Food</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg text-slate-600"
          >
            Kami sangat terbuka untuk berdiskusi tentang bagaimana bumbu kami dapat meningkatkan cita rasa produk Anda.
          </motion.p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="order-2 lg:order-1 lg:col-span-7"
          >
            <div className="rounded-xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50 md:p-10">
              <h2 className="mb-6 text-2xl font-bold text-slate-800">Kirim Pesan</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700">Nama Lengkap</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-slate-50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="bg-slate-50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">Subjek</FormLabel>
                        <FormControl>
                          <Input placeholder="Sebutkan tujuan Anda..." className="bg-slate-50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">Pesan</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ceritakan kebutuhan Anda secara detail..."
                            className="min-h-[150px] bg-slate-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Kirim Sekarang
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="order-1 flex flex-col gap-6 lg:order-2 lg:col-span-5"
          >
            {/* Info Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 rounded-2xl border bg-white p-5 transition-all hover:bg-slate-50 ${info.borderColor}`}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${info.color}`}>
                    <info.icon size={24} weight="fill" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-slate-800">{info.title}</h3>
                    <div className="space-y-0.5 text-sm text-slate-600">
                      {info.details.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Map Card */}
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d107.573117!3d-6.9034443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sBandung%2C%20Bandung%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1703649568965!5m2!1sen!2sid"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
            className="grayscale filter transition-all hover:grayscale-0"
          ></iframe>
        </div>
      </Container>
    </div>
  )
}
