import '@/styles/globals.css'

import { siteMetadata } from '@/constants/site-metadata'
import { Analytics } from '@vercel/analytics/react'
import { Metadata, Viewport } from 'next'
import { Merriweather, Plus_Jakarta_Sans } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import React from 'react'

import { Toaster } from '@/components/atoms/ui/sonner'
import { SplashScreen } from '@/components/organisms/splash-screen'

import { cn } from '@/utils/cn'

export const metadata: Metadata = {
  title: {
    default: siteMetadata.name,
    template: `%s | ${siteMetadata.name}`
  },
  description: siteMetadata.description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: '/manifest.json',
  openGraph: {
    images: '/logo.png'
  },
  metadataBase: new URL(siteMetadata.url)
}

export const viewport: Viewport = {
  width: 'device-width',
  themeColor: '#A31313',
  colorScheme: 'light',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover'
}

const sans = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans'
})

const serif = Merriweather({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif'
})

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-slate-50 antialiased', sans.variable, serif.variable)}>
        <SplashScreen />
        <NextTopLoader color="#A31313" showSpinner={false} />
        {children}
        <Toaster richColors position="top-right" closeButton theme="light" />
        <Analytics />
      </body>
    </html>
  )
}
