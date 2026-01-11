'use client'

import type { MaterialRequirement } from '@/stores/use-bom-store'
import type { StockItem } from '@/stores/use-stock-store'
import { CheckCircle, Warning, XCircle } from '@phosphor-icons/react'

interface MaterialRequirementCardProps {
  requirements: MaterialRequirement[]
  stockItems: StockItem[]
}

interface MaterialWithStock extends MaterialRequirement {
  available: number
  sufficient: boolean
  shortage: number
}

export function MaterialRequirementCard({ requirements, stockItems }: MaterialRequirementCardProps) {
  const materialsWithStock: MaterialWithStock[] = requirements.map((req) => {
    const stockItem = stockItems.find((s) => s.id === req.materialId)
    const available = stockItem?.current || 0
    const sufficient = available >= req.required
    const shortage = sufficient ? 0 : req.required - available

    return {
      ...req,
      available,
      sufficient,
      shortage
    }
  })

  const allSufficient = materialsWithStock.every((m) => m.sufficient)
  const insufficientCount = materialsWithStock.filter((m) => !m.sufficient).length

  if (requirements.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-500">
        Pilih produk untuk melihat kebutuhan bahan baku
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Summary Header */}
      <div
        className={`rounded-lg border p-3 ${
          allSufficient ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'
        }`}
      >
        <div className="flex items-center gap-2">
          {allSufficient ? (
            <>
              <CheckCircle size={20} weight="fill" className="text-emerald-600" />
              <span className="font-semibold text-emerald-900">Semua bahan baku tersedia</span>
            </>
          ) : (
            <>
              <Warning size={20} weight="fill" className="text-amber-600" />
              <span className="font-semibold text-amber-900">{insufficientCount} bahan tidak mencukupi</span>
            </>
          )}
        </div>
      </div>

      {/* Material List */}
      <div className="space-y-2">
        {materialsWithStock.map((material) => (
          <div
            key={material.materialId}
            className={`rounded-lg border p-3 ${
              material.sufficient ? 'border-slate-200 bg-white' : 'border-red-200 bg-red-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {material.sufficient ? (
                    <CheckCircle size={16} weight="fill" className="text-emerald-600" />
                  ) : (
                    <XCircle size={16} weight="fill" className="text-red-600" />
                  )}
                  <span className="font-medium text-slate-900">{material.materialName}</span>
                  <span className="text-xs text-slate-500">({material.materialSku})</span>
                </div>
                <div className="mt-1 flex items-center gap-4 text-sm">
                  <span className="text-slate-600">
                    Dibutuhkan:{' '}
                    <span className="font-semibold">
                      {material.required} {material.unit}
                    </span>
                  </span>
                  <span className={material.sufficient ? 'text-emerald-600' : 'text-red-600'}>
                    Tersedia:{' '}
                    <span className="font-semibold">
                      {material.available} {material.unit}
                    </span>
                  </span>
                  {!material.sufficient && (
                    <span className="font-semibold text-red-600">
                      ⚠️ Kurang {material.shortage} {material.unit}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
