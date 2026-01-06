'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { Plus, Trash } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useState } from 'react'
import { toast } from 'sonner'

import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { Card, CardContent } from '@/components/atoms/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/atoms/ui/dialog'
import { Input } from '@/components/atoms/ui/input'
import { Textarea } from '@/components/atoms/ui/textarea'
import { Container } from '@/components/templates/container'

interface ProductionPlan {
  id: string
  productId: string
  productName: string
  quantity: number
  productionDate: Date
  status: 'draft' | 'approved' | 'in-production' | 'completed'
  createdBy: string
  notes?: string
}

const mockPlans: ProductionPlan[] = [
  {
    id: 'plan-001',
    productId: 'prod-001',
    productName: 'Sambal Bawang Original',
    quantity: 500,
    productionDate: new Date(),
    status: 'in-production',
    createdBy: 'Supervisor A',
    notes: 'Order reguler mingguan'
  },
  {
    id: 'plan-002',
    productId: 'prod-006',
    productName: 'Saus Tomat Premium 1L',
    quantity: 800,
    productionDate: new Date(Date.now() + 86400000),
    status: 'approved',
    createdBy: 'Supervisor B',
    notes: 'Order besar client PT ABC'
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
    productName: '',
    quantity: '',
    productionDate: '',
    notes: ''
  })

  const handleCreatePlan = () => {
    if (!formData.productName || !formData.quantity || !formData.productionDate) {
      toast.error('Mohon lengkapi data plan')

      return
    }

    const newPlan: ProductionPlan = {
      id: `plan-${Date.now()}`,
      productId: `prod-${Date.now()}`,
      productName: formData.productName,
      quantity: parseInt(formData.quantity),
      productionDate: new Date(formData.productionDate),
      status: 'draft',
      createdBy: user?.name || 'User',
      notes: formData.notes
    }

    setPlans([newPlan, ...plans])
    setIsDialogOpen(false)
    setFormData({ productName: '', quantity: '', productionDate: '', notes: '' })
    toast.success('Plan produksi berhasil dibuat!')
  }

  const handleDeletePlan = (id: string) => {
    setPlans(plans.filter((p) => p.id !== id))
    toast.success('Plan produksi dihapus')
  }

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
    <div className="min-h-screen bg-slate-50">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Plan Produksi</h1>
          <p className="text-sm text-slate-500">Kelola rencana produksi dan target</p>
        </div>
        <Button variant="default" onClick={() => setIsDialogOpen(true)} className="gap-2">
          <Plus size={16} weight="bold" />
          Buat Plan Baru
        </Button>
      </div>

      {/* Plans List */}
      <div className="space-y-4">
        {plans.map((plan) => (
          <Card key={plan.id}>
            <CardContent className="p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-900">{plan.productName}</h3>
                    <Badge variant="outline" className={statusConfig[plan.status].color}>
                      {statusConfig[plan.status].label}
                    </Badge>
                  </div>
                  <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                    <div>
                      <span className="text-slate-500">Target Qty:</span> {plan.quantity} unit
                    </div>
                    <div>
                      <span className="text-slate-500">Tanggal:</span>{' '}
                      {format(plan.productionDate, 'dd MMM yyyy', { locale: id })}
                    </div>
                    <div>
                      <span className="text-slate-500">Dibuat oleh:</span> {plan.createdBy}
                    </div>
                    {plan.notes && (
                      <div className="sm:col-span-2">
                        <span className="text-slate-500">Catatan:</span> {plan.notes}
                      </div>
                    )}
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Plan Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Buat Plan Produksi Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Nama Produk</label>
              <Input
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                placeholder="Contoh: Sambal Bawang Original"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Target Quantity</label>
              <Input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="Contoh: 500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Tanggal Produksi</label>
              <Input
                type="date"
                value={formData.productionDate}
                onChange={(e) => setFormData({ ...formData, productionDate: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Catatan (Opsional)</label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Catatan tambahan..."
                className="min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline-red" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="default" onClick={handleCreatePlan}>
              Buat Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
