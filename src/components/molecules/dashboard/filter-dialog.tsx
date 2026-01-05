'use client'

import { CalendarBlank, X } from '@phosphor-icons/react'
import { useState } from 'react'

import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/atoms/ui/dialog'
import { Input } from '@/components/atoms/ui/input'
import { Label } from '@/components/atoms/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'

interface FilterDialogProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: FilterState) => void
  initialFilters?: FilterState
}

export interface FilterState {
  type: 'quick' | 'month' | 'range'
  quick: string
  month: string
  year: string
  startDate: string
  endDate: string
}

export function FilterDialog({ isOpen, onClose, onApply, initialFilters }: FilterDialogProps) {
  const [filterType, setFilterType] = useState<'quick' | 'month' | 'range'>(initialFilters?.type || 'quick')
  const [filterQuick, setFilterQuick] = useState(initialFilters?.quick || 'all')
  const [filterMonth, setFilterMonth] = useState(initialFilters?.month || '')
  const [filterYear, setFilterYear] = useState(initialFilters?.year || '2026')
  const [filterStartDate, setFilterStartDate] = useState(initialFilters?.startDate || '')
  const [filterEndDate, setFilterEndDate] = useState(initialFilters?.endDate || '')

  const handleApply = () => {
    onApply({
      type: filterType,
      quick: filterQuick,
      month: filterMonth,
      year: filterYear,
      startDate: filterStartDate,
      endDate: filterEndDate
    })
    onClose()
  }

  const handleReset = () => {
    setFilterType('quick')
    setFilterQuick('all')
    setFilterMonth('')
    setFilterYear('2026')
    setFilterStartDate('')
    setFilterEndDate('')
    onApply({
      type: 'quick',
      quick: 'all',
      month: '',
      year: '2026',
      startDate: '',
      endDate: ''
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarBlank size={24} weight="duotone" className="text-primary" />
            Filter Data Dashboard
          </DialogTitle>
        </DialogHeader>

        <Tabs value={filterType} onValueChange={(v) => setFilterType(v as 'quick' | 'month' | 'range')}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quick">Cepat</TabsTrigger>
            <TabsTrigger value="month">Bulan/Tahun</TabsTrigger>
            <TabsTrigger value="range">Rentang Tanggal</TabsTrigger>
          </TabsList>

          {/* Quick Filter Tab */}
          <TabsContent value="quick" className="space-y-4">
            <div className="flex flex-col gap-y-3">
              <Label>Pilih Periode</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={filterQuick === 'all' ? 'default' : 'outline-red'}
                  onClick={() => setFilterQuick('all')}
                  className="justify-start"
                >
                  Semua Data
                </Button>
                <Button
                  variant={filterQuick === 'today' ? 'default' : 'outline-red'}
                  onClick={() => setFilterQuick('today')}
                  className="justify-start"
                >
                  Hari Ini
                </Button>
                <Button
                  variant={filterQuick === 'week' ? 'default' : 'outline-red'}
                  onClick={() => setFilterQuick('week')}
                  className="justify-start"
                >
                  7 Hari Terakhir
                </Button>
                <Button
                  variant={filterQuick === 'month' ? 'default' : 'outline-red'}
                  onClick={() => setFilterQuick('month')}
                  className="justify-start"
                >
                  30 Hari Terakhir
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Month/Year Filter Tab */}
          <TabsContent value="month" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Bulan</Label>
                <Select value={filterMonth} onValueChange={setFilterMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Bulan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Januari</SelectItem>
                    <SelectItem value="2">Februari</SelectItem>
                    <SelectItem value="3">Maret</SelectItem>
                    <SelectItem value="4">April</SelectItem>
                    <SelectItem value="5">Mei</SelectItem>
                    <SelectItem value="6">Juni</SelectItem>
                    <SelectItem value="7">Juli</SelectItem>
                    <SelectItem value="8">Agustus</SelectItem>
                    <SelectItem value="9">September</SelectItem>
                    <SelectItem value="10">Oktober</SelectItem>
                    <SelectItem value="11">November</SelectItem>
                    <SelectItem value="12">Desember</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tahun</Label>
                <Select value={filterYear} onValueChange={setFilterYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Tahun" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* Date Range Filter Tab */}
          <TabsContent value="range" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tanggal Mulai</Label>
                <Input type="date" value={filterStartDate} onChange={(e) => setFilterStartDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Tanggal Akhir</Label>
                <Input type="date" value={filterEndDate} onChange={(e) => setFilterEndDate(e.target.value)} />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2">
          <Button variant="outline-red" onClick={handleReset} className="gap-2">
            <X size={16} />
            Reset
          </Button>
          <Button onClick={handleApply} variant="default" className="gap-2">
            <CalendarBlank size={16} />
            Terapkan Filter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function getFilterLabel(filters: FilterState): string {
  if (filters.type === 'quick') {
    switch (filters.quick) {
      case 'today':
        return 'Hari Ini'
      case 'week':
        return '7 Hari Terakhir'
      case 'month':
        return '30 Hari Terakhir'
      default:
        return 'Semua Data'
    }
  } else if (filters.type === 'month' && filters.month && filters.year) {
    const months = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember'
    ]

    return `${months[parseInt(filters.month) - 1]} ${filters.year}`
  } else if (filters.type === 'range' && filters.startDate && filters.endDate) {
    return `${filters.startDate} - ${filters.endDate}`
  }

  return 'Semua Data'
}
