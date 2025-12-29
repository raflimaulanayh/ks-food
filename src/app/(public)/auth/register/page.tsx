'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/atoms/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/atoms/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/atoms/ui/form'
import { Input } from '@/components/atoms/ui/input'
import { Container } from '@/components/templates/container'

const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Nama lengkap wajib diisi'),
    email: z.string().email('Email tidak valid'),
    phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak cocok',
    path: ['confirmPassword']
  })

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }
  })

  function onSubmit(values: z.infer<typeof registerSchema>) {
    console.info(values)
    setIsLoading(true)

    setTimeout(() => {
      toast.success('Pendaftaran Berhasil!', {
        description: 'Akun Anda telah dibuat. Selamat berbelanja!'
      })

      router.push('/auth/login')
      router.refresh()
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-white py-20">
      <Container className="flex justify-center">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl font-bold text-primary">Daftar Akun Baru</CardTitle>
            <CardDescription className="text-center">Lengkapi data diri Anda untuk bergabung</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="user@example.com" {...field} />
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
                      <FormLabel>Nomor Telepon</FormLabel>
                      <FormControl>
                        <Input placeholder="081234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t px-6 py-4">
            <div className="text-center text-sm text-slate-500">
              Sudah punya akun?{' '}
              <Link href="/auth/login" className="cursor-pointer font-bold text-primary hover:underline">
                Masuk di sini
              </Link>
            </div>
          </CardFooter>
        </Card>
      </Container>
    </div>
  )
}
