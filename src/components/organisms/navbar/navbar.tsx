'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { useCartStore } from '@/stores/use-cart-store'
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  MagnifyingGlass,
  ShoppingCart,
  XLogo,
  User,
  Package
} from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import { Container } from '@/components/templates/container'

const navLinks = [
  { label: 'BERANDA', href: '/' },
  { label: 'TENTANG KAMI', href: '/about' },
  { label: 'PRODUK KAMI', href: '/products' },
  { label: 'B2B', href: '/b2b' },
  { label: 'ARTIKEL', href: '/article' },
  { label: 'KONTAK', href: '/contact' }
]

export const Navbar = () => {
  const [lang, setLang] = useState<'ID' | 'EN'>('ID')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const cartItemsCount = useCartStore((state) => state.getTotalItems())
  const { isAuthenticated, user, logout } = useAuthStore()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/internal/login')
  }
  // ...

  return (
    <header className="sticky top-0 z-50 w-full flex-col shadow">
      {/* Top Bar - Hidden on mobile */}
      <div className="hidden h-14 w-full items-center bg-primary text-white md:flex">
        <Container className="flex h-full items-center justify-end">
          <div className="flex items-center gap-6 text-sm">
            <button className="hover:text-white/80" aria-label="Search">
              <MagnifyingGlass weight="bold" className="size-5" />
            </button>

            <div className="flex items-center rounded-full bg-white/20 p-1 text-xs font-semibold">
              <button
                onClick={() => setLang('ID')}
                className={`rounded-full px-3 py-0.5 transition-colors ${
                  lang === 'ID' ? 'bg-white text-primary' : 'text-white hover:bg-white/10'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLang('EN')}
                className={`rounded-full px-3 py-0.5 transition-colors ${
                  lang === 'EN' ? 'bg-white text-primary' : 'text-white hover:bg-white/10'
                }`}
              >
                EN
              </button>
            </div>

            <div className="h-4 w-px bg-white/30" />

            <div className="flex items-center gap-3">
              <Link href="#" className="hover:scale-110">
                <FacebookLogo className="size-5" />
              </Link>
              <Link href="#" className="hover:scale-110">
                <InstagramLogo className="size-5" />
              </Link>
              <Link href="#" className="hover:scale-110">
                <XLogo className="size-5" />
              </Link>
              <Link href="#" className="hover:scale-110">
                <LinkedinLogo className="size-5" />
              </Link>
            </div>

            {/* Auth Button */}
            {mounted &&
              (isAuthenticated ? (
                <div className="group relative z-50 ml-3 border-l border-white/30 pl-6">
                  <button className="flex items-center gap-2 py-2 hover:text-white/80">
                    <span className="hidden max-w-[100px] truncate text-xs leading-none font-bold uppercase md:block">
                      {user?.name.split(' ')[0]}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-2 ring-transparent transition-all group-hover:ring-white/30">
                      <User weight="fill" className="size-5" />
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="invisible absolute top-full right-0 w-56 origin-top-right transform pt-2 opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100">
                    <div className="overflow-hidden rounded-xl border border-slate-100 bg-white py-2 text-slate-900 shadow-xl ring-1 ring-black/5">
                      <div className="border-b border-slate-50 bg-slate-50/50 px-4 py-3">
                        <p className="truncate text-sm font-bold text-slate-900">{user?.name}</p>
                        <p className="truncate text-xs text-slate-500">{user?.email}</p>
                      </div>

                      <div className="p-1">
                        <Link
                          href="/user/orders"
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-primary/5 hover:text-primary"
                        >
                          <Package className="size-4 text-slate-400" />
                          Pesanan Saya
                        </Link>
                      </div>

                      <div className="mx-1 my-1 h-px bg-slate-100" />

                      <div className="p-1">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-primary transition-colors hover:bg-red-50"
                        >
                          <User className="size-4 text-red-400" />
                          Keluar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="ml-3 flex items-center gap-2 border-l border-white/30 pl-6 hover:text-white/80"
                >
                  <span className="text-xs font-bold">MASUK</span>
                  <User className="size-5" />
                </Link>
              ))}

            <Link href="/cart" className="relative ml-4 hover:text-white/80" aria-label="Cart">
              <ShoppingCart className="size-5" />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-slate-900">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <div className="flex h-20 w-full items-center bg-white/95 backdrop-blur-sm">
        <Container className="relative flex h-full items-center justify-between">
          <Link href="/" className="relative flex items-center md:-mt-14">
            <Image
              src="/logo.png"
              alt="KS Food Logo"
              width={120}
              height={40}
              className="h-10 w-auto object-contain md:h-20 md:w-60"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-slate-700 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <Link href="/cart" className="relative text-slate-900" aria-label="Cart">
              <ShoppingCart className="size-6" />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-slate-900">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button
              className="rounded-full p-2 hover:bg-primary hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">{isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}</span>
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-50 h-screen w-80 bg-white shadow-2xl lg:hidden"
            >
              <div className="flex h-full flex-col">
                {/* Header with Close Button */}
                <div className="flex items-center justify-between border-b border-slate-100 p-6">
                  <h3 className="text-lg font-semibold text-slate-900">Menu</h3>
                  <button
                    className="rounded-full p-2 hover:bg-primary hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto p-6">
                  <nav className="flex flex-col space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}

                    <div className="my-4 h-px bg-slate-100" />

                    {mounted &&
                      (isAuthenticated ? (
                        <>
                          <div className="mb-2 flex items-center gap-3 px-4 py-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <User size={20} weight="fill" />
                            </div>
                            <div className="overflow-hidden">
                              <p className="truncate font-bold text-slate-900">Halo, {user?.name.split(' ')[0]}</p>
                              <p className="truncate text-xs text-slate-500">{user?.email}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              handleLogout()
                              setIsMobileMenuOpen(false)
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-sm font-medium text-primary transition-colors hover:bg-red-50"
                          >
                            <User className="size-4" />
                            KELUAR
                          </button>
                        </>
                      ) : (
                        <Link
                          href="/auth/login"
                          className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <User className="size-4" />
                          MASUK AKUN
                        </Link>
                      ))}
                  </nav>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
