'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { useBOMStore } from '@/stores/use-bom-store'
import { useStockStore } from '@/stores/use-stock-store'
import { CalendarBlank, Package, CheckCircle, HourglassHigh, X, BookOpen, ClipboardText } from '@phosphor-icons/react'
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns'
import { id } from 'date-fns/locale'
import { useState } from 'react'

import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { Card, CardContent, CardHeader } from '@/components/atoms/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/atoms/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'
import { MaterialRequirementCard } from '@/components/molecules/material-requirement-card'
import { Container } from '@/components/templates/container'

// Mock Production Schedule Data
interface ProductionSchedule {
  id: string
  productName: string
  sku: string
  scheduledDate: Date
  targetQuantity: number
  batchNumber: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  assignedTo?: string
  notes?: string
}

const mockSchedules: ProductionSchedule[] = [
  {
    id: 'sch-001',
    productName: 'Sambal Bawang Original',
    sku: 'KS-SAMBAL-BAWANG-300',
    scheduledDate: new Date(),
    targetQuantity: 500,
    batchNumber: 'BATCH-2024-001',
    status: 'in-progress',
    assignedTo: 'Team A',
    notes: 'Produksi reguler'
  },
  {
    id: 'sch-002',
    productName: 'Saus Tomat Premium 1L',
    sku: 'KS-SAUS-TOMAT-1L',
    scheduledDate: addDays(new Date(), 1),
    targetQuantity: 800,
    batchNumber: 'BATCH-2024-002',
    status: 'scheduled',
    assignedTo: 'Team B',
    notes: 'Order besar dari client'
  },
  {
    id: 'sch-003',
    productName: 'Mayonaise Creamy',
    sku: 'KS-MAYO-CREAMY-500',
    scheduledDate: addDays(new Date(), 2),
    targetQuantity: 650,
    batchNumber: 'BATCH-2024-003',
    status: 'scheduled',
    assignedTo: 'Team A'
  },
  {
    id: 'sch-004',
    productName: 'Sambal Geprek Extra Hot',
    sku: 'KS-SAMBAL-GEPREK-300',
    scheduledDate: addDays(new Date(), -1),
    targetQuantity: 450,
    batchNumber: 'BATCH-2023-099',
    status: 'completed',
    assignedTo: 'Team C',
    notes: 'Selesai lebih cepat'
  }
]

const statusConfig = {
  scheduled: { label: 'Terjadwal', color: 'bg-blue-100 text-blue-700', icon: CalendarBlank },
  'in-progress': { label: 'Sedang Berjalan', color: 'bg-amber-100 text-amber-700', icon: HourglassHigh },
  completed: { label: 'Selesai', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  cancelled: { label: 'Dibatalkan', color: 'bg-red-100 text-red-700', icon: X }
}

export default function ProductionSchedulePage() {
  const { user } = useAuthStore()
  const { calculateMaterialRequirements } = useBOMStore()
  const { items: stockItems } = useStockStore()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [selectedSchedule, setSelectedSchedule] = useState<ProductionSchedule | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handleViewDetail = (schedule: ProductionSchedule) => {
    setSelectedSchedule(schedule)
    setIsDetailOpen(true)
  }

  const monthStart = startOfMonth(selectedDate)
  const monthEnd = endOfMonth(selectedDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Group schedules by date
  const schedulesByDate = mockSchedules.reduce(
    (acc, schedule) => {
      const dateKey = format(schedule.scheduledDate, 'yyyy-MM-dd')
      if (!acc[dateKey]) acc[dateKey] = []
      acc[dateKey].push(schedule)

      return acc
    },
    {} as Record<string, ProductionSchedule[]>
  )

  const filteredSchedules = mockSchedules.filter((s) => {
    if (viewMode === 'calendar') {
      return isSameDay(s.scheduledDate, selectedDate)
    }

    return true
  })

  if (!user) return null
  const isAuthorized = user.role === 'PRODUCTION' || user.role === 'ADMIN'
  if (!isAuthorized) {
    return (
      <Container>
        <div className="py-20 text-center">
          <p className="text-slate-500">Anda tidak memiliki akses ke halaman ini.</p>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Jadwal Produksi</h1>
            <p className="text-sm text-slate-500">Monitor dan kelola jadwal produksi harian</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline-red'}
              onClick={() => setViewMode('list')}
              className="text-sm"
            >
              List View
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'outline-red'}
              onClick={() => setViewMode('calendar')}
              className="text-sm"
            >
              Calendar View
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2">
                  <CalendarBlank size={20} className="text-blue-600" weight="duotone" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Terjadwal</p>
                  <p className="text-lg font-bold text-slate-900">
                    {mockSchedules.filter((s) => s.status === 'scheduled').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-100 p-2">
                  <HourglassHigh size={20} className="text-amber-600" weight="duotone" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Sedang Berjalan</p>
                  <p className="text-lg font-bold text-slate-900">
                    {mockSchedules.filter((s) => s.status === 'in-progress').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-2">
                  <CheckCircle size={20} className="text-green-600" weight="duotone" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Selesai</p>
                  <p className="text-lg font-bold text-slate-900">
                    {mockSchedules.filter((s) => s.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-100 p-2">
                  <Package size={20} className="text-slate-600" weight="duotone" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Total Produk</p>
                  <p className="text-lg font-bold text-slate-900">{mockSchedules.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        {viewMode === 'calendar' && (
          <Card className="mb-6">
            <CardHeader>
              <h3 className="font-semibold text-slate-900">{format(selectedDate, 'MMMM yyyy', { locale: id })}</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
                  <div key={day} className="text-center text-xs font-semibold text-slate-600">
                    {day}
                  </div>
                ))}
                {daysInMonth.map((day) => {
                  const dateKey = format(day, 'yyyy-MM-dd')
                  const daySchedules = schedulesByDate[dateKey] || []
                  const isSelected = isSameDay(day, selectedDate)
                  const isCurrentDay = isToday(day)

                  return (
                    <button
                      key={day.toString()}
                      onClick={() => setSelectedDate(day)}
                      className={`relative min-h-[60px] rounded-lg border p-2 text-sm transition-colors ${
                        isSelected
                          ? 'border-primary bg-primary/10 font-semibold'
                          : isCurrentDay
                            ? 'border-primary/30 bg-white font-semibold'
                            : 'border-slate-200 bg-white hover:border-primary/50'
                      }`}
                    >
                      <div className="text-left">{format(day, 'd')}</div>
                      {daySchedules.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {daySchedules.slice(0, 2).map((_, i) => (
                            <div key={i} className="h-1.5 w-1.5 rounded-full bg-primary" />
                          ))}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Schedule List */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-slate-900">
              {viewMode === 'calendar'
                ? `Jadwal ${format(selectedDate, 'dd MMMM yyyy', { locale: id })}`
                : 'Semua Jadwal Produksi'}
            </h3>
          </CardHeader>
          <CardContent>
            {filteredSchedules.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                <Package size={48} className="mx-auto mb-3 text-slate-300" weight="duotone" />
                <p>Tidak ada jadwal produksi</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSchedules.map((schedule) => {
                  const StatusIcon = statusConfig[schedule.status].icon

                  return (
                    <div
                      key={schedule.id}
                      className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <h4 className="font-semibold text-slate-900">{schedule.productName}</h4>
                          <Badge variant="outline" className={statusConfig[schedule.status].color}>
                            <StatusIcon size={12} className="mr-1" weight="fill" />
                            {statusConfig[schedule.status].label}
                          </Badge>
                        </div>
                        <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                          <div>
                            <span className="text-slate-500">SKU:</span> {schedule.sku}
                          </div>
                          <div>
                            <span className="text-slate-500">Batch:</span> {schedule.batchNumber}
                          </div>
                          <div>
                            <span className="text-slate-500">Target:</span> {schedule.targetQuantity} unit
                          </div>
                          <div>
                            <span className="text-slate-500">Tanggal:</span>{' '}
                            {format(schedule.scheduledDate, 'dd MMM yyyy', { locale: id })}
                          </div>
                          {schedule.assignedTo && (
                            <div>
                              <span className="text-slate-500">Tim:</span> {schedule.assignedTo}
                            </div>
                          )}
                          {schedule.notes && (
                            <div className="sm:col-span-2">
                              <span className="text-slate-500">Catatan:</span> {schedule.notes}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline-red" onClick={() => handleViewDetail(schedule)}>
                          Detail
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detail Produksi: {selectedSchedule?.productName}</DialogTitle>
            </DialogHeader>

            {selectedSchedule && (
              <div className="space-y-4">
                {/* Basic Info */}
                <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm sm:grid-cols-2">
                  <div>
                    <span className="text-slate-500">SKU:</span> <span className="font-medium">{selectedSchedule.sku}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Batch:</span>{' '}
                    <span className="font-medium">{selectedSchedule.batchNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Target:</span>{' '}
                    <span className="font-medium">{selectedSchedule.targetQuantity} unit</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Tanggal:</span>{' '}
                    <span className="font-medium">
                      {format(selectedSchedule.scheduledDate, 'dd MMMM yyyy', { locale: id })}
                    </span>
                  </div>
                  {selectedSchedule.assignedTo && (
                    <div>
                      <span className="text-slate-500">Tim:</span>{' '}
                      <span className="font-medium">{selectedSchedule.assignedTo}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-500">Status:</span>{' '}
                    <Badge variant="outline" className={statusConfig[selectedSchedule.status].color}>
                      {statusConfig[selectedSchedule.status].label}
                    </Badge>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="materials" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="materials">
                      <Package size={16} className="mr-2" />
                      Kebutuhan Bahan
                    </TabsTrigger>
                    <TabsTrigger value="recipe">
                      <BookOpen size={16} className="mr-2" />
                      Resep
                    </TabsTrigger>
                    <TabsTrigger value="sop">
                      <ClipboardText size={16} className="mr-2" />
                      SOP
                    </TabsTrigger>
                  </TabsList>

                  {/* Material Requirements Tab */}
                  <TabsContent value="materials" className="mt-4">
                    <div>
                      <h4 className="mb-3 font-semibold text-slate-900">Kebutuhan Bahan Baku</h4>
                      <MaterialRequirementCard
                        requirements={calculateMaterialRequirements(
                          selectedSchedule.productName,
                          selectedSchedule.targetQuantity
                        )}
                        stockItems={stockItems || []}
                      />
                    </div>
                  </TabsContent>

                  {/* Recipe Tab */}
                  <TabsContent value="recipe" className="mt-4">
                    <div className="rounded-lg border border-slate-200 bg-white p-4">
                      <h4 className="mb-3 font-semibold text-slate-900">Resep Pembuatan</h4>
                      <div className="space-y-3 text-sm text-slate-600">
                        <p className="text-slate-500 italic">
                          Resep untuk produk <strong>{selectedSchedule.productName}</strong>
                        </p>
                        <div className="space-y-2">
                          <h5 className="font-semibold text-slate-700">Langkah-langkah:</h5>
                          <ol className="list-inside list-decimal space-y-1">
                            <li>Siapkan semua bahan baku sesuai kebutuhan</li>
                            <li>Pastikan peralatan produksi dalam kondisi bersih dan steril</li>
                            <li>Lakukan proses pencampuran bahan sesuai formula</li>
                            <li>Masak dengan suhu dan waktu yang telah ditentukan</li>
                            <li>Lakukan quality check pada setiap batch</li>
                            <li>Kemas produk sesuai standar packaging</li>
                          </ol>
                        </div>
                        <div className="mt-4 rounded-lg bg-amber-50 p-3 text-amber-800">
                          <p className="text-xs">
                            <strong>Catatan:</strong> Resep detail dapat diakses melalui sistem Knowledge Base
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* SOP Tab */}
                  <TabsContent value="sop" className="mt-4">
                    <div className="rounded-lg border border-slate-200 bg-white p-4">
                      <h4 className="mb-3 font-semibold text-slate-900">Standard Operating Procedure</h4>
                      <div className="space-y-3 text-sm text-slate-600">
                        <div className="space-y-2">
                          <h5 className="font-semibold text-slate-700">Persiapan:</h5>
                          <ul className="list-inside list-disc space-y-1">
                            <li>Gunakan APD (Alat Pelindung Diri) lengkap</li>
                            <li>Cuci tangan dengan sabun dan sanitizer</li>
                            <li>Pastikan area produksi bersih dan steril</li>
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-semibold text-slate-700">Proses Produksi:</h5>
                          <ul className="list-inside list-disc space-y-1">
                            <li>Ikuti resep dan formula yang telah ditetapkan</li>
                            <li>Catat semua parameter produksi (suhu, waktu, dll)</li>
                            <li>Lakukan sampling untuk quality control</li>
                            <li>Dokumentasikan setiap tahap produksi</li>
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-semibold text-slate-700">Quality Control:</h5>
                          <ul className="list-inside list-disc space-y-1">
                            <li>Periksa warna, aroma, dan tekstur produk</li>
                            <li>Lakukan uji organoleptik</li>
                            <li>Pastikan produk memenuhi standar kualitas</li>
                          </ul>
                        </div>
                        <div className="mt-4 rounded-lg bg-blue-50 p-3 text-blue-800">
                          <p className="text-xs">
                            <strong>Info:</strong> SOP lengkap tersedia di Knowledge Base dengan tag #SOP-Produksi
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Container>
  )
}
