'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { ArrowRight, Factory, Package, SignOut, User as UserIcon, ClipboardText, Warning, Cube } from '@phosphor-icons/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Card } from '@/components/atoms/ui/card'

import { cn } from '@/utils/cn'

interface DepartmentCard {
  id: string
  title: string
  description: string
  icon: React.ElementType
  allowedRoles: string[] // Role-based access control
  colorScheme: {
    bg: string
    text: string
    border: string
    hover: string
  }
  buttons: {
    label: string
    href: string
  }[]
}

const DEPARTMENTS: DepartmentCard[] = [
  {
    id: 'gudang',
    title: 'Gudang & Logistik',
    description: 'Kelola barang masuk, keluar, dan cek stok.',
    icon: Package,
    allowedRoles: ['WAREHOUSE', 'ADMIN', 'PIMPINAN'], // Only warehouse staff
    colorScheme: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      hover: 'hover:bg-blue-100'
    },
    buttons: [
      { label: 'Penerimaan (Inbound)', href: '/operation/gudang/inbound' },
      { label: 'Pengiriman (Outbound)', href: '/operation/gudang/outbound' },
      { label: 'Cek Stok', href: '/operation/gudang/stock' }
    ]
  },
  {
    id: 'qc',
    title: 'Quality Control (Inbound)',
    description: 'Pemeriksaan kualitas bahan baku datang.',
    icon: ClipboardText,
    allowedRoles: ['QC_INBOUND', 'ADMIN', 'PIMPINAN'], // Only QC staff
    colorScheme: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-200',
      hover: 'hover:bg-amber-100'
    },
    buttons: [{ label: 'Inspeksi Bahan Baku', href: '/operation/qc/inspection' }]
  },
  {
    id: 'produksi',
    title: 'Lantai Produksi',
    description: 'Permintaan bahan dan laporan hasil produksi.',
    icon: Factory,
    allowedRoles: ['PRODUCTION', 'ADMIN', 'PIMPINAN'], // Only production staff
    colorScheme: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-200',
      hover: 'hover:bg-emerald-100'
    },
    buttons: [
      { label: 'Ambil Bahan', href: '/operation/produksi/request-material' },
      { label: 'Lapor Hasil Produksi', href: '/operation/produksi/report' }
    ]
  }
]

export default function OperationPage() {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/operation/login')
    }
  }, [user, router])

  if (!user) return null

  const handleLogout = () => {
    logout(true)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-red-700 to-primary">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAzLTVzMi0yIDItNGMwLTItMi00LTMtNXMtMi0yLTItNGMwLTIgMi00IDMtNXMyLTIgMi00YzAtMi0yLTQtMy01cy0yLTItMi00YzAtMiAyLTQgMy01czItMiAyLTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

        {/* Header */}
        <header className="relative border-b border-white/10">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-5 lg:px-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm sm:h-14 sm:w-14">
                <Factory size={24} weight="fill" className="text-white sm:hidden" />
                <Factory size={32} weight="fill" className="hidden text-white sm:block" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white sm:text-2xl">KS FOOD Operasional</h1>
                <p className="text-xs text-white/90 sm:text-sm">Portal Lapangan</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <p className="text-xs text-white/80">{user.role}</p>
              </div>
              <div className="flex size-9 items-center justify-center rounded-full bg-white/20 ring-2 ring-white/30 backdrop-blur-sm">
                <UserIcon size={18} weight="bold" className="text-white sm:hidden" />
                <UserIcon size={22} weight="bold" className="hidden text-white sm:block" />
              </div>
              <button
                onClick={handleLogout}
                className="flex h-9 items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-2 text-xs font-semibold text-white ring-2 ring-white/30 backdrop-blur-sm transition-all hover:bg-white/40 active:scale-95 sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
              >
                <SignOut size={16} weight="bold" className="sm:hidden" />
                <SignOut size={18} weight="bold" className="hidden sm:block" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative px-4 py-12 text-center sm:px-6 lg:px-8">
          <h2 className="mb-3 text-2xl font-bold text-white sm:text-4xl">Pilih Departemen</h2>
          <p className="mx-auto max-w-2xl text-white/90 lg:text-lg">
            Akses menu sesuai area kerja Anda untuk mengelola operasional dengan efisien
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Compact Info Bar - Horizontal */}
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="flex items-center justify-between gap-3 rounded-xl border-2 border-red-200 bg-red-50 p-3">
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-slate-600">Stok Kritis</p>
              <p className="text-lg font-bold text-red-700">5</p>
            </div>
            <Warning size={20} className="size-8 shrink-0 text-primary" weight="fill" />
          </div>

          <div className="flex items-center justify-between gap-3 rounded-xl border-2 border-amber-200 bg-amber-50 p-3">
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-slate-600">Pending QC</p>
              <p className="text-lg font-bold text-amber-700">12</p>
            </div>
            <ClipboardText size={20} className="size-8 shrink-0 text-amber-600" weight="duotone" />
          </div>

          <div className="flex items-center justify-between gap-3 rounded-xl border-2 border-blue-200 bg-blue-50 p-3">
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-slate-600">Produksi</p>
              <p className="text-lg font-bold text-blue-700">3</p>
            </div>
            <Cube size={20} className="size-8 shrink-0 text-blue-600" weight="duotone" />
          </div>
        </div>

        {/* Menu Buttons - Direct Navigation */}
        <div className="flex flex-col gap-y-3">
          {DEPARTMENTS.filter((dept) => dept.allowedRoles.includes(user.role)).flatMap((dept) =>
            dept.buttons.map((button, idx) => {
              const Icon = dept.icon

              return (
                <Link key={`${dept.id}-${idx}`} href={button.href}>
                  <Card
                    className={cn(
                      'group border-2 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]',
                      dept.id === 'gudang' && 'border-blue-200 bg-gradient-to-r from-blue-50 to-white',
                      dept.id === 'qc' && 'border-amber-200 bg-gradient-to-r from-amber-50 to-white',
                      dept.id === 'produksi' && 'border-emerald-200 bg-gradient-to-r from-emerald-50 to-white'
                    )}
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div
                        className={cn(
                          'flex h-14 w-14 shrink-0 items-center justify-center rounded-xl shadow-sm transition-transform group-hover:scale-110',
                          dept.id === 'gudang' && 'bg-gradient-to-br from-blue-500 to-blue-600',
                          dept.id === 'qc' && 'bg-gradient-to-br from-amber-500 to-amber-600',
                          dept.id === 'produksi' && 'bg-gradient-to-br from-emerald-500 to-emerald-600'
                        )}
                      >
                        <Icon size={28} weight="duotone" className="text-white" />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <h3
                          className={cn(
                            'font-bold lg:text-lg',
                            dept.id === 'gudang' && 'text-blue-900',
                            dept.id === 'qc' && 'text-amber-900',
                            dept.id === 'produksi' && 'text-emerald-900'
                          )}
                        >
                          {button.label}
                        </h3>
                        <p className="text-sm text-slate-600">{dept.title}</p>
                      </div>

                      {/* Arrow */}
                      <ArrowRight
                        size={24}
                        weight="bold"
                        className={cn(
                          'shrink-0 transition-transform group-hover:translate-x-1',
                          dept.id === 'gudang' && 'text-blue-600',
                          dept.id === 'qc' && 'text-amber-600',
                          dept.id === 'produksi' && 'text-emerald-600'
                        )}
                      />
                    </div>
                  </Card>
                </Link>
              )
            })
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-white/50 p-4 text-center">
          <p className="text-xs text-slate-600">
            Butuh bantuan? Hubungi <span className="font-semibold text-primary">IT Support</span> atau{' '}
            <span className="font-semibold text-primary">Admin Operasional</span>
          </p>
        </div>
      </main>
    </div>
  )
}
