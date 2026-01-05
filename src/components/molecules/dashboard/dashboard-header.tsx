'use client'

import { Clock, FunnelSimple } from '@phosphor-icons/react'
import { useState, useEffect } from 'react'

import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { FilterDialog, getFilterLabel, type FilterState } from '@/components/molecules/dashboard/filter-dialog'

interface DashboardHeaderProps {
  title: string
  subtitle: string
  onFilterChange?: (filters: FilterState) => void
}

export function DashboardHeader({ title, subtitle, onFilterChange }: DashboardHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    type: 'quick',
    quick: 'all',
    month: '',
    year: '2026',
    startDate: '',
    endDate: ''
  })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const formatDate = (date: Date) =>
    date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  const handleFilterApply = (newFilters: FilterState) => {
    setFilters(newFilters)
    if (onFilterChange) {
      onFilterChange(newFilters)
    }
  }

  return (
    <>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Filter Button */}
          <Button
            variant="outline-red"
            onClick={() => setIsFilterOpen(true)}
            className="flex h-14 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm"
          >
            <FunnelSimple size={24} />
            <span className="hidden sm:inline">Filter Data</span>
            {getFilterLabel(filters) !== 'Semua Data' && (
              <Badge className="ml-1 bg-primary text-white">{getFilterLabel(filters)}</Badge>
            )}
          </Button>

          {/* Clock */}
          <div className="flex h-14 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
            <Clock size={24} className="text-primary" weight="duotone" />
            <div className="text-right">
              <div className="font-bold text-slate-800">{formatTime(currentTime)}</div>
              <div className="text-[10px] text-slate-500">{formatDate(currentTime)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Dialog */}
      <FilterDialog
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleFilterApply}
        initialFilters={filters}
      />
    </>
  )
}
