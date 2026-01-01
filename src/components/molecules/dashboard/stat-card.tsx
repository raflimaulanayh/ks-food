'use client'

import { ArrowDown, ArrowUp, Minus } from '@phosphor-icons/react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const statCardVariants = cva('rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md', {
  variants: {
    colorScheme: {
      red: 'border-l-4 border-l-red-500',
      yellow: 'border-l-4 border-l-yellow-500',
      green: 'border-l-4 border-l-green-500',
      blue: 'border-l-4 border-l-blue-500',
      purple: 'border-l-4 border-l-purple-500',
      orange: 'border-l-4 border-l-orange-500',
      default: 'border-slate-200'
    }
  },
  defaultVariants: {
    colorScheme: 'default'
  }
})

interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string
  value: string
  icon?: React.ElementType
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  className?: string
}

export const StatCard = ({ title, value, icon: Icon, trend, trendValue, colorScheme, className }: StatCardProps) => {
  return (
    <div className={cn(statCardVariants({ colorScheme }), className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        {Icon && (
          <div className={cn('rounded-lg bg-slate-100/50 p-2 text-slate-600')}>
            <Icon size={20} weight="duotone" />
          </div>
        )}
      </div>

      <div className="mt-2">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">{value}</h3>
      </div>

      {(trend || trendValue) && (
        <div className="mt-4 flex items-center gap-2 text-xs font-medium">
          {trend === 'up' && (
            <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-green-700">
              <ArrowUp weight="bold" />
              {trendValue}
            </span>
          )}
          {trend === 'down' && (
            <span className="flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-red-700">
              <ArrowDown weight="bold" />
              {trendValue}
            </span>
          )}
          {trend === 'neutral' && (
            <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
              <Minus weight="bold" />
              {trendValue}
            </span>
          )}
          <span className="text-slate-400">vs last month</span>
        </div>
      )}
    </div>
  )
}
