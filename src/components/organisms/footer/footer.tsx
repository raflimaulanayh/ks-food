'use client'

import { Envelope, FacebookLogo, InstagramLogo, LinkedinLogo, MapPin, Phone, XLogo } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/templates/container'

export const Footer = () => {
  return (
    <footer className="bg-slate-50 pt-16">
      <Container>
        <div className="grid grid-cols-1 gap-12 pb-16 lg:grid-cols-12 lg:gap-20">
          {/* Brand & Contact Section - Spans 4 columns */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div className="flex items-start gap-4">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="KS Food Logo"
                  width={120}
                  height={40}
                  className="h-18 w-72 object-contain"
                  priority
                />
              </Link>
              <p className="text-sm leading-relaxed text-slate-600">
                KSFOOD menghadirkan saus dan bumbu premium bercita rasa otentik untuk melayani mitra B2B dan pelanggan di
                seluruh Indonesia.
              </p>
            </div>

            <hr className="border-slate-200" />

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-primary">ALAMAT & KONTAK</h3>
              <ul className="flex flex-col gap-4 text-sm text-slate-600">
                <li className="flex gap-3">
                  <MapPin className="size-6 shrink-0 text-primary" />
                  <span>Jl. Raya Sayuran No.9, Cangkuang Kulon, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40239</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-5 shrink-0 text-primary" />
                  <span>(022) 5404141</span>
                </li>
                <li className="flex items-center gap-3">
                  <Envelope className="size-5 shrink-0 text-primary" />
                  <span>halo@ksfood.id</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Links Section - Spans 8 columns (divided into 4 sub-cols if space allows, or 2) */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-7">
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-primary">PRODUK KS FOOD</h4>
              <ul className="flex flex-col gap-3 text-sm text-slate-600">
                {[
                  { label: 'Saus Tomat', href: '/products/saus-tomat' },
                  { label: 'Sambal Cabe', href: '/products/sambal-cabe' },
                  { label: 'Mayonaise', href: '/products/mayonaise-premium' },
                  { label: 'Sambal Bawang', href: '/products/sambal-bawang' },
                  { label: 'Chili Oil', href: '/products/chili-oil' },
                  { label: 'Saus BBQ', href: '/products/saus-bbq' },
                  { label: 'Saus Blackpepper', href: '/products/saus-blackpepper' },
                  { label: 'Sambal Nusantara', href: '/products/sambal-nusantara' },
                  { label: 'Selai Nanas', href: '/products/selai-nanas' }
                ].map((item) => (
                  <li key={item.label}>
                    <Link href="/products" className="transition-colors hover:text-primary">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-primary">BANTUAN & PANDUAN</h4>
              <ul className="flex flex-col gap-3 text-sm text-slate-600">
                {[
                  { label: 'Tentang Kami', href: '/about' },
                  { label: 'Cara Pemesanan', href: '/faq' },
                  { label: 'Lacak Pesanan', href: '/user/orders' },
                  { label: 'Informasi Pembayaran', href: '/faq' },
                  { label: 'Privasi & Ketentuan', href: '/terms' },
                  { label: 'FAQ', href: '/faq' }
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition-colors hover:text-primary">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-primary">MARKETPLACE</h4>
              <ul className="flex flex-col gap-3 text-sm text-slate-600">
                {[
                  { label: 'Shopee', href: 'https://shopee.co.id' },
                  { label: 'Tokopedia', href: 'https://tokopedia.com' },
                  { label: 'Blibli', href: 'https://blibli.com' }
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="bg-primary py-6 text-white">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-white/80">
              &copy; {new Date().getFullYear()} KS Food. Semua hak dilindungi undang-undang.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="transition-colors hover:text-white/80">
                <FacebookLogo className="size-5" />
              </Link>
              <Link href="#" className="transition-colors hover:text-white/80">
                <InstagramLogo className="size-5" />
              </Link>
              <Link href="#" className="transition-colors hover:text-white/80">
                <XLogo className="size-5" />
              </Link>
              <Link href="#" className="transition-colors hover:text-white/80">
                <LinkedinLogo className="size-5" />
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
