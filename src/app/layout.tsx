import '@/styles/globals.css'

import { siteMetadata } from '@/constants/site-metadata'
import { Analytics } from '@vercel/analytics/react'
import { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
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

const sans = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans'
})

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-slate-50 antialiased', sans.variable)}>
        <SplashScreen />
        <NextTopLoader color="#A31313" showSpinner={false} />
        {children}
        <Toaster richColors position="top-right" closeButton theme="light" />
        <Analytics />
      </body>
    </html>
  )
}
