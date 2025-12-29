'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/atoms/ui/button'

interface ProductCardProps {
  title: string
  price: number
  imageUrl?: string
  badges?: string[]
  slug?: string
}

export const ProductCard = ({ title, price, imageUrl, badges = [], slug = 'saus-sambal-premium' }: ProductCardProps) => {
  return (
    <Link href={`/products/${slug}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
      >
        <div className="relative aspect-square overflow-hidden border-b border-slate-100 bg-slate-50">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400">
              <span className="text-sm">No Image</span>
            </div>
          )}

          {badges && badges.length > 0 && (
            <div className="absolute top-3 right-3 flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm ring-1 ring-slate-100"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="mb-2 line-clamp-2 text-base font-semibold text-slate-800 transition-colors group-hover:text-primary md:text-lg">
            {title}
          </h3>

          <div className="mt-auto flex items-end justify-between gap-4 pt-3">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500">Harga</span>
              <span className="text-lg font-semibold text-primary">Rp {price.toLocaleString('id-ID')}</span>
            </div>
            <Button size="sm" variant="secondary">
              Detail
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
