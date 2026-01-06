'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { CalendarBlank, Plus, Trash } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useState } from 'react'
import { toast } from 'sonner'

import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { Card, CardContent } from '@/components/atoms/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/atoms/ui/dialog'
import { Input } from '@/components/atoms/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/ui/select'

// Master data produk
const PRODUCTS = [
  { id: 'prod-001', name: 'Sambal Bawang Original 250ml' },
  { id: 'prod-002', name: 'Sambal Bawang Pedas 250ml' },
  { id: 'prod-003', name: 'Saus Tomat Premium 1L' },
  { id: 'prod-004', name: 'Saus Tomat Premium 500ml' },
  { id: 'prod-005', name: 'Sambal Ijo Pedas 250ml' },
  { id: 'prod-006', name: 'Kecap Manis 600ml' }
]

interface WeeklyScheduleEntry {
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu'
  divisi1Product: string
  divisi1Batch: number
  divisi2Product: string
  divisi2Batch: number
}

interface ProductionPlan {
  id: string
  weekNumber: number
  startDate: Date
  revision: number
  createdBy: string
  schedule: WeeklyScheduleEntry[]
  status: 'draft' | 'approved' | 'in-production' | 'completed'
}

const mockPlans: ProductionPlan[] = [
  {
    id: 'plan-001',
    weekNumber: 1,
    startDate: new Date('2026-01-06'),
    revision: 0,
    createdBy: 'Supervisor A',
    status: 'in-production',
    schedule: [
      {
        day: 'Senin',
        divisi1Product: 'Sambal Bawang Original 250ml',
        divisi1Batch: 10,
        divisi2Product: 'Saus Tomat Premium 1L',
        divisi2Batch: 8
      },
      {
        day: 'Selasa',
        divisi1Product: 'Sambal Bawang Original 250ml',
        divisi1Batch: 12,
        divisi2Product: 'Saus Tomat Premium 500ml',
        divisi2Batch: 10
      },
      {
        day: 'Rabu',
        divisi1Product: 'Sambal Ijo Pedas 250ml',
        divisi1Batch: 8,
        divisi2Product: 'Kecap Manis 600ml',
        divisi2Batch: 6
      },
      {
        day: 'Kamis',
        divisi1Product: 'Sambal Bawang Pedas 250ml',
        divisi1Batch: 10,
        divisi2Product: 'Saus Tomat Premium 1L',
        divisi2Batch: 8
      },
      {
        day: 'Jumat',
        divisi1Product: 'Sambal Bawang Original 250ml',
        divisi1Batch: 15,
        divisi2Product: 'Saus Tomat Premium 500ml',
        divisi2Batch: 12
      },
      {
        day: 'Sabtu',
        divisi1Product: 'Kecap Manis 600ml',
        divisi1Batch: 5,
        divisi2Product: 'Sambal Ijo Pedas 250ml',
        divisi2Batch: 6
      }
    ]
  }
]

const statusConfig = {
  draft: { label: 'Draft', color: 'bg-slate-100 text-slate-700' },
  approved: { label: 'Disetujui', color: 'bg-green-100 text-green-700' },
  'in-production': { label: 'Produksi', color: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Selesai', color: 'bg-slate-500 text-white' }
}

export default function ProductionPlanningPage() {
  const { user } = useAuthStore()
  const [plans, setPlans] = useState(mockPlans)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    startDate: '',
    weekNumber: '1',
    revision: '0'
  })

  const [schedule, setSchedule] = useState<WeeklyScheduleEntry[]>([
    { day: 'Senin', divisi1Product: '', divisi1Batch: 0, divisi2Product: '', divisi2Batch: 0 },
    { day: 'Selasa', divisi1Product: '', divisi1Batch: 0, divisi2Product: '', divisi2Batch: 0 },
    { day: 'Rabu', divisi1Product: '', divisi1Batch: 0, divisi2Product: '', divisi2Batch: 0 },
    { day: 'Kamis', divisi1Product: '', divisi1Batch: 0, divisi2Product: '', divisi2Batch: 0 },
    { day: 'Jumat', divisi1Product: '', divisi1Batch: 0, divisi2Product: '', divisi2Batch: 0 },
    { day: 'Sabtu', divisi1Product: '', divisi1Batch: 0, divisi2Product: '', divisi2Batch: 0 }
  ])

  const updateSchedule = (index: number, field: keyof WeeklyScheduleEntry, value: string | number) => {
    const newSchedule = [...schedule]
    newSchedule[index] = { ...newSchedule[index], [field]: value }
    setSchedule(newSchedule)
  }

  const handleCreatePlan = () => {
    if (!formData.startDate) {
      toast.error('Mohon pilih tanggal mulai jadwal')

      return
    }

    // Validate at least one entry
    const hasData = schedule.some((s) => s.divisi1Product || s.divisi2Product)
    if (!hasData) {
      toast.error('Mohon isi minimal satu produk di jadwal')

      return
    }

    const newPlan: ProductionPlan = {
      id: `plan-${Date.now()}`,
      weekNumber: parseInt(formData.weekNumber),
      startDate: new Date(formData.startDate),
      revision: parseInt(formData.revision),
      createdBy: user?.name || 'User',
      schedule: schedule.filter((s) => s.divisi1Product || s.divisi2Product),
      status: 'draft'
    }

    setPlans([newPlan, ...plans])
    setIsDialogOpen(false)
    setFormData({ startDate: '', weekNumber: '1', revision: '0' })
    setSchedule([
      { day: 'Senin', divisi1Product: '', divisi1Batch: 0, divisi2Product: '', divisi2Batch: 0 },
      { day: 'Selasa', divisi1Product: '', divisi1Batch: 0, divisi2Product: '', divisi2Batch: 0 },
      { day: 'Rabu', divisi1Product: '', divisi1Batch: 0, divisi2Product: '', divisi2Batch: 0 },
      { day: 'Kamis', divisi1Product: '', divisi1Batch: 0, divisi2Product: '', divisi2Batch: 0 },
      { day: 'Jumat', divisi1Product: '', divisi1Batch: 0, divisi2Product: '', divisi2Batch: 0 },
      { day: 'Sabtu', divisi1Product: '', divisi1Batch: 0, divisi2Product: '', divisi2Batch: 0 }
    ])
    toast.success('Rencana produksi berhasil dibuat!')
  }

  const handleDeletePlan = (id: string) => {
    setPlans(plans.filter((p) => p.id !== id))
    toast.success('Rencana produksi dihapus')
  }

  if (!user) return null
  const isAuthorized = user.role === 'PRODUCTION' || user.role === 'ADMIN'
  if (!isAuthorized) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-500">Anda tidak memiliki akses ke halaman ini.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Rencana Produksi Mingguan</h1>
          <p className="text-sm text-slate-500">Form perencanaan produksi per divisi per hari</p>
        </div>
        <Button variant="default" onClick={() => setIsDialogOpen(true)} className="gap-2">
          <Plus size={16} weight="bold" />
          Buat Rencana Baru
        </Button>
      </div>

      {/* Plans List */}
      <div className="space-y-4">
        {plans.map((plan) => (
          <Card key={plan.id}>
            <CardContent className="p-6">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="text-lg font-bold text-slate-900">
                      Minggu {plan.weekNumber} - {format(plan.startDate, 'dd MMM yyyy', { locale: id })}
                    </h3>
                    <Badge variant="outline" className={statusConfig[plan.status].color}>
                      {statusConfig[plan.status].label}
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-sm text-slate-600">
                    <span>Revisi: {plan.revision}</span>
                    <span>•</span>
                    <span>Dibuat: {plan.createdBy}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline-red">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline-red" onClick={() => handleDeletePlan(plan.id)}>
                    <Trash size={14} />
                  </Button>
                </div>
              </div>

              {/* Schedule Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-slate-300 bg-slate-50">
                      <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Hari</th>
                      <th className="border border-slate-300 px-3 py-2 text-center font-semibold" colSpan={2}>
                        Divisi I
                      </th>
                      <th className="border border-slate-300 px-3 py-2 text-center font-semibold" colSpan={2}>
                        Divisi II
                      </th>
                    </tr>
                    <tr className="border-b border-slate-300 bg-slate-50">
                      <th className="border border-slate-300 px-3 py-2"></th>
                      <th className="border border-slate-300 px-3 py-2 text-center text-xs font-medium">Produk</th>
                      <th className="border border-slate-300 px-3 py-2 text-center text-xs font-medium">Jml Batch</th>
                      <th className="border border-slate-300 px-3 py-2 text-center text-xs font-medium">Produk</th>
                      <th className="border border-slate-300 px-3 py-2 text-center text-xs font-medium">Jml Batch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.schedule.map((entry, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="border border-slate-300 px-3 py-2 font-medium">{entry.day}</td>
                        <td className="border border-slate-300 px-3 py-2">{entry.divisi1Product}</td>
                        <td className="border border-slate-300 px-3 py-2 text-center">{entry.divisi1Batch}</td>
                        <td className="border border-slate-300 px-3 py-2">{entry.divisi2Product}</td>
                        <td className="border border-slate-300 px-3 py-2 text-center">{entry.divisi2Batch}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Plan Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Buat Rencana Produksi Mingguan</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Header Info */}
            <div className="grid grid-cols-3 gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Tanggal Mulai Jadwal</label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Minggu Ke</label>
                <Input
                  type="number"
                  value={formData.weekNumber}
                  onChange={(e) => setFormData({ ...formData, weekNumber: e.target.value })}
                  min="1"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Revisi</label>
                <Input
                  type="number"
                  value={formData.revision}
                  onChange={(e) => setFormData({ ...formData, revision: e.target.value })}
                  min="0"
                />
              </div>
            </div>

            {/* Weekly Schedule Table */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
                <CalendarBlank size={18} weight="duotone" />
                Jadwal Produksi Per Hari
              </h4>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-slate-300 bg-slate-100">
                      <th className="border-r border-slate-300 px-3 py-2 text-left font-semibold">Hari</th>
                      <th className="border-r border-slate-300 px-3 py-2 text-center font-semibold" colSpan={2}>
                        Divisi I
                      </th>
                      <th className="px-3 py-2 text-center font-semibold" colSpan={2}>
                        Divisi II
                      </th>
                    </tr>
                    <tr className="border-b border-slate-300 bg-slate-50">
                      <th className="border-r border-slate-300 px-3 py-2"></th>
                      <th className="border-r border-slate-300 px-3 py-2 text-center text-xs font-medium">Produk</th>
                      <th className="border-r border-slate-300 px-3 py-2 text-center text-xs font-medium">Jml Batch</th>
                      <th className="border-r border-slate-300 px-3 py-2 text-center text-xs font-medium">Produk</th>
                      <th className="px-3 py-2 text-center text-xs font-medium">Jml Batch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((entry, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="border-t border-r border-slate-300 px-3 py-2 font-medium">{entry.day}</td>
                        <td className="border-t border-r border-slate-300 px-2 py-2">
                          <Select
                            value={entry.divisi1Product}
                            onValueChange={(val) => updateSchedule(idx, 'divisi1Product', val)}
                          >
                            <SelectTrigger className="h-9 text-xs">
                              <SelectValue placeholder="Pilih produk..." />
                            </SelectTrigger>
                            <SelectContent>
                              {PRODUCTS.map((prod) => (
                                <SelectItem key={prod.id} value={prod.name} className="text-xs">
                                  {prod.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="border-t border-r border-slate-300 px-2 py-2">
                          <Input
                            type="number"
                            value={entry.divisi1Batch || ''}
                            onChange={(e) => updateSchedule(idx, 'divisi1Batch', parseInt(e.target.value) || 0)}
                            className="h-9 text-center text-xs"
                            min="0"
                            placeholder="0"
                          />
                        </td>
                        <td className="border-t border-r border-slate-300 px-2 py-2">
                          <Select
                            value={entry.divisi2Product}
                            onValueChange={(val) => updateSchedule(idx, 'divisi2Product', val)}
                          >
                            <SelectTrigger className="h-9 text-xs">
                              <SelectValue placeholder="Pilih produk..." />
                            </SelectTrigger>
                            <SelectContent>
                              {PRODUCTS.map((prod) => (
                                <SelectItem key={prod.id} value={prod.name} className="text-xs">
                                  {prod.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="border-t border-slate-300 px-2 py-2">
                          <Input
                            type="number"
                            value={entry.divisi2Batch || ''}
                            onChange={(e) => updateSchedule(idx, 'divisi2Batch', parseInt(e.target.value) || 0)}
                            className="h-9 text-center text-xs"
                            min="0"
                            placeholder="0"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                * Pilih produk dari dropdown dan isi jumlah batch untuk setiap divisi per hari
              </p>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline-red" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="default" onClick={handleCreatePlan}>
              Simpan Rencana
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
