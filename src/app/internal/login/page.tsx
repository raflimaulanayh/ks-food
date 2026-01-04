'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { Factory, Lightning, SignIn } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/atoms/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/atoms/ui/card'
import { Input } from '@/components/atoms/ui/input'

const DEMO_ACCOUNTS = [
  { label: 'Pimpinan (Owner)', email: 'pimpinan@ksfood.id', role: 'PIMPINAN' },
  { label: 'Administrator', email: 'admin@ksfood.id', role: 'ADMIN' },
  { label: 'Staff Procurement', email: 'procure@ksfood.id', role: 'PROCUREMENT' },
  { label: 'Staff Gudang (Warehouse)', email: 'gudang@ksfood.id', role: 'WAREHOUSE' },
  { label: 'Staff QC (Lab)', email: 'qc@ksfood.id', role: 'QC_LAB' },
  { label: 'Staff Finance', email: 'finance@ksfood.id', role: 'FINANCE' },
  { label: 'Staff HR', email: 'hr@ksfood.id', role: 'HR' },
  { label: 'Customer (Public)', email: 'beli@sederhana.com', role: 'CUSTOMER' }
]

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedDemoRole, setSelectedDemoRole] = useState('')

  // Handle demo role selection
  const handleDemoSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEmail = e.target.value
    setSelectedDemoRole(selectedEmail)

    if (selectedEmail) {
      setEmail(selectedEmail)
      setPassword('123') // Default credential for demo
      toast.info('Credential auto-filled for Demo Mode')
    } else {
      setEmail('')
      setPassword('')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Mohon lengkapi email dan password')

      return
    }

    setLoading(true)

    try {
      // Simulate network delay for realism
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simple credential check for demo purposes
      if (password !== '123' && password !== 'password') {
        throw new Error('Password salah! Coba gunakan "123"')
      }

      // Find the matching demo account to get role
      const demoAccount = DEMO_ACCOUNTS.find((acc) => acc.email === email)
      const userRole =
        (demoAccount?.role as 'PIMPINAN' | 'ADMIN' | 'FINANCE' | 'PROCUREMENT' | 'QC_LAB' | 'HR' | 'WAREHOUSE') || 'ADMIN'

      // Get name from demo account or use default
      const userName = demoAccount ? demoAccount.label.split(' ')[0] : 'User'

      // Pass role and name to login
      login({ email, role: userRole, name: userName })
      toast.success('Login berhasil! Mengalihkan...')
      router.push('/dashboard')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Gagal masuk ke sistem')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 pt-20">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 z-50 flex w-full items-center gap-3 bg-primary px-6 py-4 shadow-md">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-sm">
          <Factory size={24} weight="fill" />
        </div>
        <div>
          <h1 className="text-lg leading-tight font-bold text-white">KS Food</h1>
          <p className="text-xs text-white/80">Enterprise Resource Planning</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-primary/10">
            <Factory size={40} weight="duotone" className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Selamat Datang</h1>
          <p className="mt-2 text-sm text-slate-600">Silakan masuk untuk mengakses sistem</p>
        </div>

        <Card className="border-slate-200 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <h2 className="text-xl font-semibold text-slate-800">Sign in to your account</h2>
            <p className="text-sm text-slate-500">Enter your credentials to access the system</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Demo Mode Quick Fill */}
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-amber-700">
                  <Lightning weight="fill" />
                  Mode Demo: Pilih Role (Auto-Fill)
                </label>
                <select
                  value={selectedDemoRole}
                  onChange={handleDemoSelect}
                  className="w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="">-- Pilih Akun Demo --</option>
                  {DEMO_ACCOUNTS.map((account) => (
                    <option key={account.email} value={account.email}>
                      {account.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@ksfood.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <a href="#" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" loading={loading} variant="default">
                {!loading && <SignIn className="mr-2" size={18} />}
                Masuk / Sign In
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t bg-slate-50 py-4 text-center">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} KS Food Application. All rights reserved.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
