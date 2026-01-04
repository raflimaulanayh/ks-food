'use client'

import { JOB_ORDERS, RAW_MATERIALS } from '@/data/mock-production'
import { CheckCircle, Factory, Plus, WarningCircle } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'

import { StatCard } from '@/components/molecules/dashboard/stat-card'

import { cn } from '@/utils/cn'

export default function ProductionPlanningPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  // Calculate stats
  const activeOrders = JOB_ORDERS.filter((jo) => jo.status !== 'COMPLETED').length
  const factoryCapacity = 80 // Mock percentage
  const criticalMaterials = RAW_MATERIALS.filter((m) => m.stock <= m.minStock).length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PLANNED':
        return { label: 'Direncanakan', color: 'bg-blue-100 text-blue-700' }
      case 'IN_PROGRESS':
        return { label: 'Sedang Berjalan', color: 'bg-yellow-100 text-yellow-700' }
      case 'COMPLETED':
        return { label: 'Selesai', color: 'bg-green-100 text-green-700' }
      case 'DRAFT':
        return { label: 'Draft', color: 'bg-gray-100 text-gray-700' }
      default:
        return { label: status, color: 'bg-gray-100 text-gray-700' }
    }
  }

  const handleCreateJobOrder = () => {
    toast.info('Fitur Buat Job Order', {
      description: 'Dialog untuk membuat job order akan tersedia segera'
    })
    setShowCreateDialog(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Perencanaan Produksi</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola jadwal produksi dan cek ketersediaan bahan baku</p>
        </div>
        <button
          onClick={handleCreateJobOrder}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          <Plus size={20} weight="bold" />
          Buat Job Order
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Job Order Aktif"
          value={activeOrders.toString()}
          icon={Factory}
          colorScheme="blue"
          trend="neutral"
        />
        <StatCard
          title="Kapasitas Pabrik"
          value={`${factoryCapacity}%`}
          icon={CheckCircle}
          colorScheme="green"
          trend="up"
          trendValue="+5%"
        />
        <StatCard
          title="Bahan Baku Kritis"
          value={`${criticalMaterials} Item`}
          icon={WarningCircle}
          colorScheme="red"
          trend="down"
        />
      </div>

      {/* Job Orders Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h3 className="text-lg font-bold text-slate-800">Daftar Job Order</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wide text-slate-600 uppercase">
                  ID Job Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wide text-slate-600 uppercase">Produk</th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wide text-slate-600 uppercase">
                  Jumlah Batch
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wide text-slate-600 uppercase">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wide text-slate-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {JOB_ORDERS.map((order) => {
                const badge = getStatusBadge(order.status)

                return (
                  <tr key={order.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono text-sm text-slate-900">{order.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{order.productName}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{order.batchQty} Batch</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(order.deadline).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', badge.color)}>{badge.label}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {JOB_ORDERS.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-slate-500">Belum ada job order yang dibuat</div>
        )}
      </div>
    </div>
  )
}
