export type JobOrderStatus = 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'DRAFT'

export interface RawMaterial {
  id: string
  name: string
  stock: number
  unit: 'kg' | 'pcs' | 'liter'
  minStock: number
}

export interface RecipeIngredient {
  materialId: string
  materialName: string
  qtyPerBatch: number
  unit: string
}

export interface Recipe {
  productId: string
  productName: string
  ingredients: RecipeIngredient[]
}

export interface JobOrder {
  id: string
  productName: string
  productId: string
  batchQty: number
  deadline: string
  status: JobOrderStatus
  createdDate: string
}

// Raw Materials Inventory
export const RAW_MATERIALS: RawMaterial[] = [
  { id: 'MAT-001', name: 'Cabai Merah', stock: 500, unit: 'kg', minStock: 100 },
  { id: 'MAT-002', name: 'Gula Pasir', stock: 200, unit: 'kg', minStock: 50 },
  { id: 'MAT-003', name: 'Botol Plastik 500ml', stock: 5000, unit: 'pcs', minStock: 1000 },
  { id: 'MAT-004', name: 'Minyak Goreng', stock: 150, unit: 'kg', minStock: 50 },
  { id: 'MAT-005', name: 'Telur', stock: 100, unit: 'kg', minStock: 30 },
  { id: 'MAT-006', name: 'Bawang Putih', stock: 80, unit: 'kg', minStock: 20 },
  { id: 'MAT-007', name: 'Garam', stock: 300, unit: 'kg', minStock: 50 }
]

// Product Recipes (BOM - Bill of Materials)
export const RECIPES: Recipe[] = [
  {
    productId: 'PROD-001',
    productName: 'Saos Sambal Bawang',
    ingredients: [
      { materialId: 'MAT-001', materialName: 'Cabai Merah', qtyPerBatch: 5, unit: 'kg' },
      { materialId: 'MAT-002', materialName: 'Gula Pasir', qtyPerBatch: 2, unit: 'kg' },
      { materialId: 'MAT-006', materialName: 'Bawang Putih', qtyPerBatch: 1, unit: 'kg' },
      { materialId: 'MAT-007', materialName: 'Garam', qtyPerBatch: 0.5, unit: 'kg' },
      { materialId: 'MAT-003', materialName: 'Botol Plastik 500ml', qtyPerBatch: 50, unit: 'pcs' }
    ]
  },
  {
    productId: 'PROD-002',
    productName: 'Mayonaise Original',
    ingredients: [
      { materialId: 'MAT-004', materialName: 'Minyak Goreng', qtyPerBatch: 5, unit: 'kg' },
      { materialId: 'MAT-005', materialName: 'Telur', qtyPerBatch: 3, unit: 'kg' },
      { materialId: 'MAT-002', materialName: 'Gula Pasir', qtyPerBatch: 1, unit: 'kg' },
      { materialId: 'MAT-007', materialName: 'Garam', qtyPerBatch: 0.3, unit: 'kg' },
      { materialId: 'MAT-003', materialName: 'Botol Plastik 500ml', qtyPerBatch: 50, unit: 'pcs' }
    ]
  },
  {
    productId: 'PROD-003',
    productName: 'Saos Tomat Pedas',
    ingredients: [
      { materialId: 'MAT-001', materialName: 'Cabai Merah', qtyPerBatch: 3, unit: 'kg' },
      { materialId: 'MAT-002', materialName: 'Gula Pasir', qtyPerBatch: 2.5, unit: 'kg' },
      { materialId: 'MAT-007', materialName: 'Garam', qtyPerBatch: 0.4, unit: 'kg' },
      { materialId: 'MAT-003', materialName: 'Botol Plastik 500ml', qtyPerBatch: 50, unit: 'pcs' }
    ]
  }
]

// Active Job Orders
export const JOB_ORDERS: JobOrder[] = [
  {
    id: 'JO-2024-001',
    productName: 'Saos Sambal Bawang',
    productId: 'PROD-001',
    batchQty: 50,
    deadline: '2024-01-10',
    status: 'IN_PROGRESS',
    createdDate: '2024-01-01T08:00:00'
  },
  {
    id: 'JO-2024-002',
    productName: 'Mayonaise Original',
    productId: 'PROD-002',
    batchQty: 20,
    deadline: '2024-01-12',
    status: 'PLANNED',
    createdDate: '2024-01-01T10:30:00'
  },
  {
    id: 'JO-2024-003',
    productName: 'Saos Tomat Pedas',
    productId: 'PROD-003',
    batchQty: 30,
    deadline: '2024-01-08',
    status: 'COMPLETED',
    createdDate: '2023-12-28T14:00:00'
  }
]

// Helper function to get recipe by product ID
export const getRecipeByProductId = (productId: string): Recipe | undefined => {
  return RECIPES.find((recipe) => recipe.productId === productId)
}

// Helper function to get material by ID
export const getMaterialById = (materialId: string): RawMaterial | undefined => {
  return RAW_MATERIALS.find((material) => material.id === materialId)
}
