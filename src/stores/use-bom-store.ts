import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface BOMItem {
  materialId: string
  materialName: string
  materialSku: string
  quantityPerBatch: number
  unit: string
  cost?: number
}

export interface ProductBOM {
  productId: string
  productName: string
  batchSize: number
  materials: BOMItem[]
  estimatedCostPerBatch?: number
}

interface BOMStore {
  boms: ProductBOM[]
  getBOMByProduct: (productName: string) => ProductBOM | undefined
  calculateMaterialRequirements: (productName: string, batchCount: number) => MaterialRequirement[]
}

export interface MaterialRequirement {
  materialId: string
  materialName: string
  materialSku: string
  required: number
  unit: string
}

export const useBOMStore = create<BOMStore>()(
  persist(
    (set, get) => ({
      boms: [
        {
          productId: 'prod-001',
          productName: 'Sambal Bawang Original 250ml',
          batchSize: 100,
          materials: [
            {
              materialId: '3',
              materialName: 'Gula Pasir',
              materialSku: 'RM-SGR-005',
              quantityPerBatch: 3,
              unit: 'KG',
              cost: 15000
            },
            {
              materialId: '2',
              materialName: 'Minyak Goreng',
              materialSku: 'RM-OIL-022',
              quantityPerBatch: 2,
              unit: 'L',
              cost: 25000
            },
            {
              materialId: '4',
              materialName: 'Botol Sambal 150ml',
              materialSku: 'PK-BTL-150',
              quantityPerBatch: 100,
              unit: 'Pcs',
              cost: 2000
            },
            {
              materialId: '5',
              materialName: 'Label Stiker',
              materialSku: 'PK-LBL-001',
              quantityPerBatch: 100,
              unit: 'Pcs',
              cost: 500
            }
          ],
          estimatedCostPerBatch: 295000
        },
        {
          productId: 'prod-002',
          productName: 'Sambal Bawang Pedas 250ml',
          batchSize: 100,
          materials: [
            {
              materialId: '3',
              materialName: 'Gula Pasir',
              materialSku: 'RM-SGR-005',
              quantityPerBatch: 3,
              unit: 'KG',
              cost: 15000
            },
            {
              materialId: '2',
              materialName: 'Minyak Goreng',
              materialSku: 'RM-OIL-022',
              quantityPerBatch: 2.5,
              unit: 'L',
              cost: 25000
            },
            {
              materialId: '4',
              materialName: 'Botol Sambal 150ml',
              materialSku: 'PK-BTL-150',
              quantityPerBatch: 100,
              unit: 'Pcs',
              cost: 2000
            },
            {
              materialId: '5',
              materialName: 'Label Stiker',
              materialSku: 'PK-LBL-001',
              quantityPerBatch: 100,
              unit: 'Pcs',
              cost: 500
            }
          ],
          estimatedCostPerBatch: 307500
        },
        {
          productId: 'prod-003',
          productName: 'Saus Tomat Premium 1L',
          batchSize: 50,
          materials: [
            {
              materialId: '1',
              materialName: 'Tepung Terigu Premium',
              materialSku: 'RM-FLR-001',
              quantityPerBatch: 5,
              unit: 'KG',
              cost: 12000
            },
            {
              materialId: '3',
              materialName: 'Gula Pasir',
              materialSku: 'RM-SGR-005',
              quantityPerBatch: 4,
              unit: 'KG',
              cost: 15000
            },
            {
              materialId: '2',
              materialName: 'Minyak Goreng',
              materialSku: 'RM-OIL-022',
              quantityPerBatch: 1,
              unit: 'L',
              cost: 25000
            }
          ],
          estimatedCostPerBatch: 145000
        },
        {
          productId: 'prod-004',
          productName: 'Saus Tomat Premium 500ml',
          batchSize: 100,
          materials: [
            {
              materialId: '1',
              materialName: 'Tepung Terigu Premium',
              materialSku: 'RM-FLR-001',
              quantityPerBatch: 4,
              unit: 'KG',
              cost: 12000
            },
            {
              materialId: '3',
              materialName: 'Gula Pasir',
              materialSku: 'RM-SGR-005',
              quantityPerBatch: 3,
              unit: 'KG',
              cost: 15000
            }
          ],
          estimatedCostPerBatch: 93000
        },
        {
          productId: 'prod-005',
          productName: 'Sambal Ijo Pedas 250ml',
          batchSize: 100,
          materials: [
            {
              materialId: '3',
              materialName: 'Gula Pasir',
              materialSku: 'RM-SGR-005',
              quantityPerBatch: 2.5,
              unit: 'KG',
              cost: 15000
            },
            {
              materialId: '2',
              materialName: 'Minyak Goreng',
              materialSku: 'RM-OIL-022',
              quantityPerBatch: 2,
              unit: 'L',
              cost: 25000
            },
            {
              materialId: '4',
              materialName: 'Botol Sambal 150ml',
              materialSku: 'PK-BTL-150',
              quantityPerBatch: 100,
              unit: 'Pcs',
              cost: 2000
            }
          ],
          estimatedCostPerBatch: 287500
        },
        {
          productId: 'prod-006',
          productName: 'Kecap Manis 600ml',
          batchSize: 80,
          materials: [
            {
              materialId: '3',
              materialName: 'Gula Pasir',
              materialSku: 'RM-SGR-005',
              quantityPerBatch: 10,
              unit: 'KG',
              cost: 15000
            },
            {
              materialId: '2',
              materialName: 'Minyak Goreng',
              materialSku: 'RM-OIL-022',
              quantityPerBatch: 1,
              unit: 'L',
              cost: 25000
            }
          ],
          estimatedCostPerBatch: 175000
        }
      ],

      getBOMByProduct: (productName) => {
        return get().boms.find((bom) => bom.productName === productName)
      },

      calculateMaterialRequirements: (productName, batchCount) => {
        const bom = get().getBOMByProduct(productName)
        if (!bom) return []

        return bom.materials.map((material) => ({
          materialId: material.materialId,
          materialName: material.materialName,
          materialSku: material.materialSku,
          required: material.quantityPerBatch * batchCount,
          unit: material.unit
        }))
      }
    }),
    {
      name: 'bom-storage'
    }
  )
)
