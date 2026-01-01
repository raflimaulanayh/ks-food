'use client'

import { calculateMaterialNeeds, JOB_ORDERS, type JobOrder, PRODUCT_RECIPES, RAW_MATERIALS } from '@/data/mock-procurement'
import { CalendarBlank, CheckCircle, ClipboardText, Package, Plus } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'

import { cn } from '@/utils/cn'

export default function ProductionPlanningPage() {
  const [jobOrders, setJobOrders] = useState<JobOrder[]>(JOB_ORDERS)
  const [selectedProduct, setSelectedProduct] = useState('')
  const [targetQty, setTargetQty] = useState<number>(0)
  const [productionDate, setProductionDate] = useState('')

  // Calculate estimated materials when product or qty changes
  const estimatedMaterials = selectedProduct && targetQty > 0 ? calculateMaterialNeeds(selectedProduct, targetQty) : []

  const handleCreateJobOrder = () => {
    if (!selectedProduct || targetQty <= 0 || !productionDate) {
      toast.error('Form tidak lengkap!', {
        description: 'Mohon isi semua field sebelum membuat Job Order'
      })

      return
    }

    const newJO: JobOrder = {
      id: `JO-${new Date().getFullYear()}-${String(jobOrders.length + 1).padStart(3, '0')}`,
      productName: selectedProduct,
      targetQty,
      unit: 'pcs',
      productionDate,
      status: 'PLANNED',
      estimatedMaterials: estimatedMaterials.map((m) => ({
        materialName: m.materialName,
        qtyNeeded: m.qtyNeeded,
        unit: m.unit
      })),
      createdAt: new Date().toISOString().split('T')[0]
    }

    setJobOrders([newJO, ...jobOrders])
    toast.success('Job Order berhasil diterbitkan!', {
      description: `${newJO.id} - ${selectedProduct} (${targetQty} pcs)`
    })

    // Reset form
    setSelectedProduct('')
    setTargetQty(0)
    setProductionDate('')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Perencanaan Produksi (PPIC)</h1>
        <p className="mt-2 text-slate-600">Buat dan kelola Job Order untuk proses produksi</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: Form */}
        <div className="space-y-6">
          <div className="rounded-xl border-2 border-primary/20 bg-red-50/50 p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-primary p-2">
                <Plus size={24} weight="bold" className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Buat Job Order Baru</h2>
            </div>

            <div className="space-y-4">
              {/* Product Selection */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Produk</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-2.5 font-medium transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                >
                  <option value="">-- Pilih Produk --</option>
                  {PRODUCT_RECIPES.map((recipe) => (
                    <option key={recipe.productId} value={recipe.productName}>
                      {recipe.productName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Qty */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Target Quantity (pcs)</label>
                <input
                  type="number"
                  value={targetQty || ''}
                  onChange={(e) => setTargetQty(Number(e.target.value))}
                  placeholder="e.g. 1000"
                  className="w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-2.5 font-medium transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>

              {/* Production Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Tanggal Produksi</label>
                <input
                  type="date"
                  value={productionDate}
                  onChange={(e) => setProductionDate(e.target.value)}
                  className="w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-2.5 font-medium transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>

              {/* Estimated Materials */}
              {estimatedMaterials.length > 0 && (
                <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-blue-900">
                    <Package size={20} weight="fill" />
                    Estimasi Kebutuhan Bahan Baku
                  </h3>
                  <div className="space-y-2">
                    {estimatedMaterials.map((material, idx) => {
                      const rawMat = RAW_MATERIALS.find((m) => m.name === material.materialName)
                      const isLowStock = rawMat && rawMat.stock < material.qtyNeeded

                      return (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="font-medium text-blue-900">{material.materialName}</span>
                          <div className="flex items-center gap-2">
                            <span className={cn('font-bold', isLowStock && 'text-red-600')}>
                              {material.qtyNeeded} {material.unit}
                            </span>
                            {isLowStock && (
                              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                                Stok Kurang!
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleCreateJobOrder}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-bold text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg"
              >
                <ClipboardText size={20} weight="bold" />
                Terbitkan Job Order
              </button>
            </div>
          </div>
        </div>

        {/* Right: Job Orders List */}
        <div className="space-y-4">
          <div className="rounded-xl border-2 border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-xl font-bold text-slate-900">Daftar Rencana Produksi</h2>

            <div className="space-y-3">
              {jobOrders.map((jo) => (
                <div
                  key={jo.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-slate-600">{jo.id}</span>
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-0.5 text-xs font-bold',
                            jo.status === 'PLANNED' && 'bg-blue-100 text-blue-700',
                            jo.status === 'IN_PROGRESS' && 'bg-yellow-100 text-yellow-700',
                            jo.status === 'COMPLETED' && 'bg-green-100 text-green-700'
                          )}
                        >
                          {jo.status.replace('_', ' ')}
                        </span>
                      </div>
                      <h3 className="mt-2 font-bold text-slate-900">{jo.productName}</h3>
                      <p className="mt-1 text-sm text-slate-600">
                        Target:{' '}
                        <span className="font-semibold">
                          {jo.targetQty} {jo.unit}
                        </span>
                      </p>
                      <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                        <CalendarBlank size={14} weight="fill" />
                        <span>Produksi: {new Date(jo.productionDate).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                    {jo.status === 'PLANNED' && (
                      <button
                        onClick={() => {
                          const updated = jobOrders.map((item) =>
                            item.id === jo.id ? { ...item, status: 'IN_PROGRESS' as const } : item
                          )
                          setJobOrders(updated)
                          toast.success('Status diupdate!', { description: `${jo.id} → IN PROGRESS` })
                        }}
                        className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
                      >
                        <CheckCircle size={16} weight="fill" className="inline" /> Mulai Produksi
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
