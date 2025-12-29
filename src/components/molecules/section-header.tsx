'use client'

import { motion } from 'framer-motion'

import { cn } from '@/utils/cn'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export const SectionHeader = ({ title, subtitle, align = 'center', className }: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        'mb-12 flex max-w-3xl flex-col gap-4',
        align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left',
        className
      )}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl leading-tight font-semibold text-slate-900 md:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg font-light text-slate-600 md:text-xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
