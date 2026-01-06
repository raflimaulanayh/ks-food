'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import {
  House,
  Users,
  CreditCard,
  ShoppingCart,
  Package,
  Cpu,
  Shield,
  BookOpen,
  SignOut,
  ChartBar,
  Calendar,
  Clock,
  Briefcase,
  ClipboardText,
  ArrowsClockwise,
  CalendarBlank
} from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils/cn'

type UserRole = 'PIMPINAN' | 'ADMIN' | 'FINANCE' | 'PROCUREMENT' | 'PRODUCTION' | 'QC' | 'HR' | 'WAREHOUSE' | 'ALL'

interface MenuItem {
  label: string
  href: string
  icon: React.ElementType
  roles: UserRole[]
  exact?: boolean
}

const MENU_ITEMS: MenuItem[] = [
  // GLOBAL
  { label: 'Dashboard', href: '/dashboard', icon: House, roles: ['ALL'], exact: true },

  // ADMIN
  { label: 'Manajemen User', href: '/dashboard/admin/users', icon: Users, roles: ['ADMIN'] },
  { label: 'Kelola Pesanan', href: '/dashboard/admin/orders', icon: ShoppingCart, roles: ['ADMIN'] },
  { label: 'Sinkronisasi Stok', href: '/dashboard/admin/stock-sync', icon: ArrowsClockwise, roles: ['ADMIN', 'WAREHOUSE'] },
  { label: 'Data Master', href: '/dashboard/admin/master', icon: Package, roles: ['ADMIN'] },
  { label: 'Log Sistem', href: '/dashboard/admin/logs', icon: Shield, roles: ['ADMIN'] },

  // HR
  { label: 'Kehadiran', href: '/dashboard/hr/attendance', icon: Clock, roles: ['HR'] },
  { label: 'Data Karyawan', href: '/dashboard/hr/employees', icon: Users, roles: ['HR'] },
  { label: 'Payroll & Gaji', href: '/dashboard/hr/payroll', icon: CreditCard, roles: ['HR'] },
  { label: 'Rekrutmen', href: '/dashboard/hr/recruitment', icon: Briefcase, roles: ['HR'] },

  // WAREHOUSE
  { label: 'Perencanaan', href: '/dashboard/procurement/planning', icon: Calendar, roles: ['WAREHOUSE'] },
  { label: 'Purchase Order', href: '/dashboard/procurement/orders', icon: ShoppingCart, roles: ['WAREHOUSE'] },
  { label: 'Monitor Stok', href: '/dashboard/warehouse', icon: Package, roles: ['WAREHOUSE'] },

  // FINANCE
  { label: 'Invoices', href: '/dashboard/finance/invoices', icon: CreditCard, roles: ['FINANCE'] },

  // PIMPINAN
  { label: 'Laporan Bisnis', href: '/dashboard/reports', icon: ChartBar, roles: ['PIMPINAN'] },
  { label: 'Persetujuan', href: '/dashboard/approvals', icon: Cpu, roles: ['PIMPINAN'] },

  // QC
  { label: 'Riwayat Inspeksi', href: '/dashboard/qc-lab/history', icon: ClipboardText, roles: ['QC'] },
  { label: 'Laporan & Analisa', href: '/dashboard/qc-lab/reports', icon: ChartBar, roles: ['QC'] },

  // PRODUCTION
  { label: 'Jadwal Produksi', href: '/dashboard/production/schedule', icon: CalendarBlank, roles: ['PRODUCTION'] },
  { label: 'Plan Produksi', href: '/dashboard/production/planning', icon: ClipboardText, roles: ['PRODUCTION'] },
  { label: 'SOP & Resep', href: '/dashboard/production/sop', icon: BookOpen, roles: ['PRODUCTION'] },

  // KNOWLEDGE (ALL)
  { label: 'Pustaka Ilmu', href: '/dashboard/knowledge', icon: BookOpen, roles: ['ALL'] }
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()

  if (!user) return null

  const filteredMenu = MENU_ITEMS.filter(
    (item) => item.roles.includes('ALL') || (user?.role && item.roles.includes(user.role as UserRole))
  )

  return (
    <div className="flex h-screen w-64 flex-col bg-primary p-4 text-white shadow-xl">
      {/* Logo Section - White Square with Red Text */}
      <div className="mb-8 flex items-center gap-3 px-2 pt-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-lg font-black text-primary">
          K
        </div>
        <div>
          <h1 className="text-xl leading-none font-bold tracking-tight text-white">KSFOOD</h1>
          <p className="mt-1 text-[10px] text-red-100">Internal Management</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 space-y-1 overflow-x-hidden overflow-y-auto">
        {filteredMenu.map((item) => {
          const Icon = item.icon
          // Check active state with exact match support
          const basePath = item.href.split('?')[0]
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname === basePath || pathname.startsWith(basePath + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                isActive ? 'bg-[#FFC107] font-bold text-[#8B0000] shadow-md' : 'text-red-50 hover:bg-white/10'
              )}
            >
              <Icon className="h-[18px] w-[18px]" weight={isActive ? 'fill' : 'regular'} />
              {item.label}
            </Link>
          )
        })}
      </div>

      {/* User Info */}
      {user && (
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-semibold">
            {user.name.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-white">{user.name}</p>
            <p className="text-[10px] text-red-100">{user.role}</p>
          </div>
        </div>
      )}

      {/* Logout Button */}
      <div className="border-t border-white/10 pt-4">
        <button
          onClick={() => logout()}
          className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-50 transition-colors hover:text-red-200"
        >
          <SignOut className="h-[18px] w-[18px]" />
          Keluar
        </button>
      </div>
    </div>
  )
}
