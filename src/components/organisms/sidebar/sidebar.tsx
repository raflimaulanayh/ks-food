'use client'

import { useAuthStore, UserRole } from '@/stores/use-auth-store'
import {
  Briefcase,
  ChartLineUp,
  ChartPie,
  ClipboardText,
  Factory,
  FileText,
  Flask,
  Gear,
  Lightbulb,
  Package,
  Receipt,
  Scroll,
  SignOut,
  Users,
  WarningCircle
} from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/atoms/ui/button'

import { cn } from '@/utils/cn'

interface MenuItem {
  label: string
  href: string
  icon: React.ElementType
}

const MENU_ITEMS: Record<UserRole, MenuItem[]> = {
  PIMPINAN: [
    { label: 'Dashboard', href: '/dashboard', icon: ChartLineUp },
    { label: 'Pusat Persetujuan', href: '/dashboard/approvals', icon: ClipboardText },
    { label: 'Laporan Bisnis', href: '/dashboard/reports', icon: FileText },
    { label: 'Pustaka Pengetahuan', href: '/dashboard/knowledge', icon: Lightbulb }
  ],
  ADMIN: [
    { label: 'Status Sistem', href: '/dashboard', icon: Gear },
    { label: 'Manajemen Pengguna', href: '/dashboard/admin/users', icon: Users },
    { label: 'Log Sistem', href: '/dashboard/admin/logs', icon: Scroll },
    { label: 'Data Master', href: '/dashboard/admin/master', icon: Package },
    { label: 'Pustaka Ilmu', href: '/dashboard/knowledge', icon: Lightbulb }
  ],
  FINANCE: [
    { label: 'Beranda', href: '/dashboard', icon: ChartPie },
    { label: 'Manajemen Tagihan', href: '/dashboard/finance/invoices', icon: Receipt },
    { label: 'Pustaka Ilmu', href: '/dashboard/knowledge', icon: Lightbulb }
  ],
  PROCUREMENT: [
    { label: 'Peringatan Stok Menipis', href: '/dashboard', icon: WarningCircle },
    { label: 'Perencanaan Produksi', href: '/dashboard/procurement/planning', icon: Factory },
    { label: 'Pengadaan Bahan (PO)', href: '/dashboard/procurement/orders', icon: ClipboardText },
    { label: 'Monitor Stok', href: '/dashboard/warehouse', icon: Package },
    { label: 'Pustaka Ilmu', href: '/dashboard/knowledge', icon: Lightbulb }
  ],
  QC_LAB: [
    { label: 'Beranda', href: '/dashboard', icon: ChartPie },
    { label: 'Kontrol Kualitas', href: '/qc/lab-result', icon: Flask },
    { label: 'Pustaka Pengetahuan', href: '/dashboard/knowledge', icon: Lightbulb }
  ],
  HR: [
    { label: 'Kehadiran', href: '/dashboard', icon: Users },
    { label: 'Data Karyawan', href: '/dashboard/hr/employees', icon: Briefcase },
    { label: 'Pustaka Ilmu', href: '/dashboard/knowledge', icon: Lightbulb }
  ],
  WAREHOUSE: [
    { label: 'Beranda', href: '/dashboard', icon: ChartPie },
    { label: 'Manajemen Gudang', href: '/dashboard/warehouse', icon: Package },
    { label: 'Pustaka Ilmu', href: '/dashboard/knowledge', icon: Lightbulb }
  ]
}

export const Sidebar = ({ className }: { className?: string }) => {
  const { user, logout } = useAuthStore()
  const pathname = usePathname()
  const router = useRouter()

  if (!user) return null

  const items = MENU_ITEMS[user.role] || []

  const handleLogout = () => {
    logout()
    router.push('/internal/login')
  }

  return (
    <aside className={cn('flex h-screen w-64 flex-col gap-6 bg-primary pt-8 text-white', className)}>
      <div className="space-y-2 px-6">
        <Image src="/static/images/logo.png" alt="Logo" width={150} height={150} />
        <p className="text-xs opacity-80">Internal Management System</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {items.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                isActive ? 'bg-secondary text-primary shadow-sm' : 'hover:bg-white/10'
              )}
            >
              <item.icon size={20} weight={isActive ? 'fill' : 'regular'} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="mb-4 flex items-center gap-3 px-2">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border border-white/50 bg-white/20"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-bold text-primary">
              {user.name.charAt(0)}
            </div>
          )}
          <div className="overflow-hidden">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs opacity-70">{user.role}</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start border-white/20 text-white hover:bg-white/10 hover:text-white"
          onClick={handleLogout}
        >
          <SignOut size={18} />
          Keluar
        </Button>
      </div>
    </aside>
  )
}
