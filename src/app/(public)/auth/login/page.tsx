'use client'

import { useAuthStore } from '@/stores/use-auth-store'
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

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter')
})

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      login({
        email: values.email,
        name: 'Guest User' // Default name for the demo
      })

      toast.success('Login Berhasil!', {
        description: 'Selamat datang kembali.'
      })

      router.push('/products')
      router.refresh()
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-white py-20">
      <Container className="flex justify-center">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl font-bold text-primary">Masuk Akun</CardTitle>
            <CardDescription className="text-center">Masukkan email dan password untuk melanjutkan</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Memproses...' : 'Masuk'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t px-6 py-4">
            <div className="text-center text-sm text-slate-500">
              Belum punya akun?{' '}
              <Link href="/auth/register" className="cursor-pointer font-bold text-primary hover:underline">
                Daftar Sekarang
              </Link>
            </div>
          </CardFooter>
        </Card>
      </Container>
    </div>
  )
}
