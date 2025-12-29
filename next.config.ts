/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa'

const nextConfig = {
  ...withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true
  }),
  reactStrictMode: true,
  devIndicators: {
    position: 'bottom-right'
  },
  turbopack: {
    root: __dirname,
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json']
  },
  allowedDevOrigins: ['http://localhost:3000', 'http://localhost:1337'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com'
      },
      {
        protocol: 'https',
        hostname: 'products.aspose.app'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ],
    dangerouslyAllowSVG: true
  },
  env: {
    SITE_NAME: 'Kertasari Sejahtera',
    APP_URL: process.env.APP_URL,
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL
  },
  experimental: {
    webpackMemoryOptimizations: process.env.NODE_ENV === 'development' ? true : false
  }
}

export default nextConfig
