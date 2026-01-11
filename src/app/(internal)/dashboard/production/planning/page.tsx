'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { useBOMStore, type MaterialRequirement } from '@/stores/use-bom-store'
import { useStockStore } from '@/stores/use-stock-store'
import { CalendarBlank, Plus, Trash, Package } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'

import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { Card, CardContent } from '@/components/atoms/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/atoms/ui/dialog'
import { Input } from '@/components/atoms/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'
import { MaterialRequirementCard } from '@/components/molecules/material-requirement-card'

// Master data produk
const PRODUCTS = [
  { id: 'prod-001', name: 'Sambal Bawang Original 250ml' },
  { id: 'prod-002', name: 'Sambal Bawang Pedas 250ml' },
  { id: 'prod-003', name: 'Saus Tomat Premium 1L' },
  { id: 'prod-004', name: 'Saus Tomat Premium 500ml' },
  { id: 'prod-005', name: 'Sambal Ijo Pedas 250ml' },
  { id: 'prod-006', name: 'Kecap Manis 600ml' }
]

const DIVISIONS = ['Divisi I', 'Divisi II', 'Divisi III'] as const
const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'] as const

interface ProductionEntry {
  id: string
  day: (typeof DAYS)[number]
  division: (typeof DIVISIONS)[number]
  product: string
  batch: number
}

interface ProductionPlan {
  id: string
  weekNumber: number
  startDate: Date
  revision: number
  createdBy: string
  entries: ProductionEntry[]
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
    entries: [
      {
        id: 'entry-1',
        day: 'Senin',
        division: 'Divisi I',
        product: 'Sambal Bawang Original 250ml',
        batch: 10
      },
      {
        id: 'entry-2',
        day: 'Senin',
        division: 'Divisi II',
        product: 'Saus Tomat Premium 1L',
        batch: 8
      },
      {
        id: 'entry-3',
        day: 'Selasa',
        division: 'Divisi I',
        product: 'Sambal Bawang Original 250ml',
        batch: 12
      },
      {
        id: 'entry-4',
        day: 'Selasa',
        division: 'Divisi II',
        product: 'Saus Tomat Premium 500ml',
        batch: 10
      },
      {
        id: 'entry-5',
        day: 'Rabu',
        division: 'Divisi I',
        product: 'Sambal Ijo Pedas 250ml',
        batch: 8
      },
      {
        id: 'entry-6',
        day: 'Rabu',
        division: 'Divisi II',
        product: 'Kecap Manis 600ml',
        batch: 6
      },
      {
        id: 'entry-7',
        day: 'Kamis',
        division: 'Divisi I',
        product: 'Sambal Bawang Pedas 250ml',
        batch: 10
      },
      {
        id: 'entry-8',
        day: 'Kamis',
        division: 'Divisi II',
        product: 'Saus Tomat Premium 1L',
        batch: 8
      },
      {
        id: 'entry-9',
        day: 'Jumat',
        division: 'Divisi I',
        product: 'Sambal Bawang Original 250ml',
        batch: 15
      },
      {
        id: 'entry-10',
        day: 'Jumat',
        division: 'Divisi II',
        product: 'Saus Tomat Premium 500ml',
        batch: 12
      },
      {
        id: 'entry-11',
        day: 'Sabtu',
        division: 'Divisi I',
        product: 'Kecap Manis 600ml',
        batch: 5
      },
      {
        id: 'entry-12',
        day: 'Sabtu',
        division: 'Divisi II',
        product: 'Sambal Ijo Pedas 250ml',
        batch: 6
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
  const { calculateMaterialRequirements } = useBOMStore()
  const { items: stockItems } = useStockStore()
  const [plans, setPlans] = useState(mockPlans)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    startDate: '',
    weekNumber: '1',
    revision: '0'
  })

  const [entries, setEntries] = useState<ProductionEntry[]>([
    {
      id: `entry-${Date.now()}`,
      day: 'Senin',
      division: 'Divisi I',
      product: '',
      batch: 0
    }
  ])

  // Material requirements for preview
  const [materialRequirements, setMaterialRequirements] = useState<MaterialRequirement[]>([])

  // Calculate total material requirements from entries
  useEffect(() => {
    const totalRequirements: { [key: string]: MaterialRequirement } = {}

    entries.forEach((entry) => {
      if (entry.product && entry.batch > 0) {
        const reqs = calculateMaterialRequirements(entry.product, entry.batch)
        reqs.forEach((req) => {
          if (totalRequirements[req.materialId]) {
            totalRequirements[req.materialId].required += req.required
          } else {
            totalRequirements[req.materialId] = { ...req }
          }
        })
      }
    })

    setMaterialRequirements(Object.values(totalRequirements))
  }, [entries, calculateMaterialRequirements])

  // Remove entry
  const removeEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id))
  }

  // Update entry
  const updateEntry = (id: string, field: keyof ProductionEntry, value: string | number) => {
    setEntries(entries.map((e) => (e.id === id ? { ...e, [field]: value } : e)))
  }

  const handleCreatePlan = () => {
    if (!formData.startDate) {
      toast.error('Mohon pilih tanggal mulai jadwal')

      return
    }

    // Validate at least one entry with product
    const hasData = entries.some((e) => e.product && e.batch > 0)
    if (!hasData) {
      toast.error('Mohon isi minimal satu produksi')

      return
    }

    const validEntries = entries.filter((e) => e.product && e.batch > 0)

    if (editingPlanId) {
      // Update existing plan
      setPlans(
        plans.map((p) =>
          p.id === editingPlanId
            ? {
                ...p,
                weekNumber: parseInt(formData.weekNumber),
                startDate: new Date(formData.startDate),
                revision: parseInt(formData.revision),
                entries: validEntries
              }
            : p
        )
      )
      toast.success('Rencana produksi berhasil diupdate!')
    } else {
      // Create new plan
      const newPlan: ProductionPlan = {
        id: `plan-${Date.now()}`,
        weekNumber: parseInt(formData.weekNumber),
        startDate: new Date(formData.startDate),
        revision: parseInt(formData.revision),
        createdBy: user?.name || 'User',
        entries: validEntries,
        status: 'draft'
      }

      setPlans([newPlan, ...plans])
      toast.success('Rencana produksi berhasil dibuat!')
    }

    // Reset form
    setIsDialogOpen(false)
    setEditingPlanId(null)
    setFormData({ startDate: '', weekNumber: '1', revision: '0' })
    setEntries([
      {
        id: `entry-${Date.now()}`,
        day: 'Senin',
        division: 'Divisi I',
        product: '',
        batch: 0
      }
    ])
  }

  const handleEditPlan = (planId: string) => {
    const plan = plans.find((p) => p.id === planId)
    if (!plan) return

    setEditingPlanId(planId)
    setFormData({
      startDate: format(plan.startDate, 'yyyy-MM-dd'),
      weekNumber: plan.weekNumber.toString(),
      revision: plan.revision.toString()
    })

    // Populate entries with existing data
    setEntries(
      plan.entries.length > 0
        ? plan.entries
        : [
            {
              id: `entry-${Date.now()}`,
              day: 'Senin',
              division: 'Divisi I',
              product: '',
              batch: 0
            }
          ]
    )

    setIsDialogOpen(true)
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
                  <Button size="sm" variant="outline-red" onClick={() => handleEditPlan(plan.id)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="outline-red" onClick={() => handleDeletePlan(plan.id)}>
                    <Trash size={14} />
                  </Button>
                </div>
              </div>

              {/* Entries Tables - Split by Division */}
              <div className="grid grid-cols-2 gap-4">
                {/* Divisi I Table */}
                <div>
                  <h5 className="mb-2 font-semibold text-slate-700">Divisi I</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="border-b-2 border-slate-300 bg-slate-50">
                          <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Hari</th>
                          <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Produk</th>
                          <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Batch</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DAYS.map((day) => {
                          const dayEntries = plan.entries.filter((e) => e.day === day && e.division === 'Divisi I')

                          if (dayEntries.length === 0) {
                            return (
                              <tr key={day} className="hover:bg-slate-50">
                                <td className="border border-slate-300 px-3 py-2 font-medium">{day}</td>
                                <td className="border border-slate-300 px-3 py-2 text-center text-slate-400" colSpan={2}>
                                  -
                                </td>
                              </tr>
                            )
                          }

                          return dayEntries.map((entry, idx) => (
                            <tr key={entry.id} className="hover:bg-slate-50">
                              {idx === 0 && (
                                <td className="border border-slate-300 px-3 py-2 font-medium" rowSpan={dayEntries.length}>
                                  {day}
                                </td>
                              )}
                              <td className="border border-slate-300 px-3 py-2">{entry.product}</td>
                              <td className="border border-slate-300 px-3 py-2 text-center">{entry.batch}</td>
                            </tr>
                          ))
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Divisi II Table */}
                <div>
                  <h5 className="mb-2 font-semibold text-slate-700">Divisi II</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="border-b-2 border-slate-300 bg-slate-50">
                          <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Hari</th>
                          <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Produk</th>
                          <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Batch</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DAYS.map((day) => {
                          const dayEntries = plan.entries.filter((e) => e.day === day && e.division === 'Divisi II')

                          if (dayEntries.length === 0) {
                            return (
                              <tr key={day} className="hover:bg-slate-50">
                                <td className="border border-slate-300 px-3 py-2 font-medium">{day}</td>
                                <td className="border border-slate-300 px-3 py-2 text-center text-slate-400" colSpan={2}>
                                  -
                                </td>
                              </tr>
                            )
                          }

                          return dayEntries.map((entry, idx) => (
                            <tr key={entry.id} className="hover:bg-slate-50">
                              {idx === 0 && (
                                <td className="border border-slate-300 px-3 py-2 font-medium" rowSpan={dayEntries.length}>
                                  {day}
                                </td>
                              )}
                              <td className="border border-slate-300 px-3 py-2">{entry.product}</td>
                              <td className="border border-slate-300 px-3 py-2 text-center">{entry.batch}</td>
                            </tr>
                          ))
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Plan Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPlanId ? 'Edit Rencana Produksi Mingguan' : 'Buat Rencana Produksi Mingguan'}</DialogTitle>
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

            {/* Production Entries - Split by Division */}
            <div className="grid grid-cols-2 gap-4">
              {/* Divisi I */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
                  <CalendarBlank size={18} weight="duotone" />
                  Divisi I
                </h4>
                <div className="space-y-4">
                  {DAYS.map((day) => {
                    const dayEntries = entries.filter((e) => e.day === day && e.division === 'Divisi I')

                    return (
                      <div key={day} className="rounded-lg border border-slate-200">
                        <div className="bg-slate-100 px-4 py-2">
                          <h5 className="font-semibold text-slate-900">{day}</h5>
                        </div>
                        <div className="p-3">
                          {dayEntries.length > 0 ? (
                            <div className="space-y-2">
                              {dayEntries.map((entry) => (
                                <div key={entry.id} className="grid grid-cols-12 gap-2 rounded border border-slate-200 p-2">
                                  <div className="col-span-8">
                                    <label className="mb-1 block text-xs font-medium text-slate-600">Produk</label>
                                    <Select
                                      value={entry.product}
                                      onValueChange={(val) => updateEntry(entry.id, 'product', val)}
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
                                  </div>
                                  <div className="col-span-3">
                                    <label className="mb-1 block text-xs font-medium text-slate-600">Batch</label>
                                    <Input
                                      type="number"
                                      value={entry.batch || ''}
                                      onChange={(e) => updateEntry(entry.id, 'batch', parseInt(e.target.value) || 0)}
                                      className="h-9 text-center text-xs"
                                      min="0"
                                      placeholder="0"
                                    />
                                  </div>
                                  <div className="col-span-1 flex items-end">
                                    <Button
                                      size="sm"
                                      variant="outline-red"
                                      onClick={() => removeEntry(entry.id)}
                                      className="h-9 w-full"
                                    >
                                      <Trash size={14} />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-center text-sm text-slate-500">Belum ada produksi</p>
                          )}
                          <Button
                            onClick={() => {
                              setEntries([
                                ...entries,
                                {
                                  id: `entry-${Date.now()}-${Math.random()}`,
                                  day: day,
                                  division: 'Divisi I',
                                  product: '',
                                  batch: 0
                                }
                              ])
                            }}
                            variant="outline-red"
                            size="sm"
                            className="mt-2 w-full"
                          >
                            <Plus size={14} weight="bold" />
                            Tambah
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Divisi II */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
                  <CalendarBlank size={18} weight="duotone" />
                  Divisi II
                </h4>
                <div className="space-y-4">
                  {DAYS.map((day) => {
                    const dayEntries = entries.filter((e) => e.day === day && e.division === 'Divisi II')

                    return (
                      <div key={day} className="rounded-lg border border-slate-200">
                        <div className="bg-slate-100 px-4 py-2">
                          <h5 className="font-semibold text-slate-900">{day}</h5>
                        </div>
                        <div className="p-3">
                          {dayEntries.length > 0 ? (
                            <div className="space-y-2">
                              {dayEntries.map((entry) => (
                                <div key={entry.id} className="grid grid-cols-12 gap-2 rounded border border-slate-200 p-2">
                                  <div className="col-span-8">
                                    <label className="mb-1 block text-xs font-medium text-slate-600">Produk</label>
                                    <Select
                                      value={entry.product}
                                      onValueChange={(val) => updateEntry(entry.id, 'product', val)}
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
                                  </div>
                                  <div className="col-span-3">
                                    <label className="mb-1 block text-xs font-medium text-slate-600">Batch</label>
                                    <Input
                                      type="number"
                                      value={entry.batch || ''}
                                      onChange={(e) => updateEntry(entry.id, 'batch', parseInt(e.target.value) || 0)}
                                      className="h-9 text-center text-xs"
                                      min="0"
                                      placeholder="0"
                                    />
                                  </div>
                                  <div className="col-span-1 flex items-end">
                                    <Button
                                      size="sm"
                                      variant="outline-red"
                                      onClick={() => removeEntry(entry.id)}
                                      className="h-9 w-full"
                                    >
                                      <Trash size={14} />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-center text-sm text-slate-500">Belum ada produksi</p>
                          )}
                          <Button
                            onClick={() => {
                              setEntries([
                                ...entries,
                                {
                                  id: `entry-${Date.now()}-${Math.random()}`,
                                  day: day,
                                  division: 'Divisi II',
                                  product: '',
                                  batch: 0
                                }
                              ])
                            }}
                            variant="outline-red"
                            size="sm"
                            className="mt-2 w-full"
                          >
                            <Plus size={14} weight="bold" />
                            Tambah
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Material Requirements Summary */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
                <Package size={18} weight="duotone" />
                Kebutuhan Bahan Baku
              </h4>

              {/* View Mode Tabs */}
              <Tabs defaultValue="weekly" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="weekly">Total Mingguan</TabsTrigger>
                  <TabsTrigger value="daily">Per Hari</TabsTrigger>
                </TabsList>

                {/* Weekly View */}
                <TabsContent value="weekly" className="mt-3">
                  <MaterialRequirementCard requirements={materialRequirements} stockItems={stockItems} />
                </TabsContent>

                {/* Daily View */}
                <TabsContent value="daily" className="mt-3">
                  <div className="space-y-3">
                    {DAYS.map((day) => {
                      const dayEntries = entries.filter((e) => e.day === day)
                      if (dayEntries.length === 0) return null

                      // Calculate material requirements for this day only
                      const dayMaterialMap = new Map<string, MaterialRequirement>()

                      dayEntries.forEach((entry) => {
                        if (entry.product && entry.batch > 0) {
                          const materials = calculateMaterialRequirements(entry.product, entry.batch)
                          materials.forEach((material) => {
                            const existing = dayMaterialMap.get(material.materialId)
                            if (existing) {
                              existing.required += material.required
                            } else {
                              dayMaterialMap.set(material.materialId, { ...material })
                            }
                          })
                        }
                      })

                      const dayRequirementsArray = Array.from(dayMaterialMap.values())

                      return (
                        <div key={day} className="rounded-lg border border-slate-200 p-3">
                          <h5 className="mb-2 font-semibold text-slate-700">{day}</h5>
                          <MaterialRequirementCard requirements={dayRequirementsArray} stockItems={stockItems} />
                        </div>
                      )
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline-red"
              onClick={() => {
                setIsDialogOpen(false)
                setEditingPlanId(null)
              }}
            >
              Batal
            </Button>
            <Button variant="default" onClick={handleCreatePlan}>
              {editingPlanId ? 'Update Rencana' : 'Simpan Rencana'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
