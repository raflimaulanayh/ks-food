export interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  description: string
  image: string
  status: 'Published' | 'Draft'
}

export interface UnitOfMeasure {
  id: string
  code: string
  name: string
  type: 'Mass' | 'Volume' | 'Count' | 'Length'
}

export interface ItemCategory {
  id: string
  name: string
  description: string
}

export interface WarehouseLocation {
  id: string
  code: string
  name: string
  capacity: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'PROD-001',
    name: 'Saos Sambal Bawang',
    sku: 'SSB-500',
    category: 'Finished Goods',
    price: 15000,
    description: 'Saos sambal dengan aroma bawang',
    image: '',
    status: 'Published'
  },
  {
    id: 'PROD-002',
    name: 'Saos Tomat Pedas',
    sku: 'STP-500',
    category: 'Finished Goods',
    price: 12000,
    description: 'Saos tomat rasa pedas',
    image: '',
    status: 'Published'
  }
]

export const UNITS_OF_MEASURE: UnitOfMeasure[] = [
  { id: 'UOM-001', code: 'KG', name: 'Kilogram', type: 'Mass' },
  { id: 'UOM-002', code: 'LITER', name: 'Liter', type: 'Volume' },
  { id: 'UOM-003', code: 'PCS', name: 'Pieces', type: 'Count' }
]

export const ITEM_CATEGORIES: ItemCategory[] = [
  { id: 'CAT-001', name: 'Finished Goods', description: 'Produk jadi siap jual' },
  { id: 'CAT-002', name: 'Raw Material', description: 'Bahan baku produksi' },
  { id: 'CAT-003', name: 'Packaging', description: 'Material kemasan' }
]

export const WAREHOUSE_LOCATIONS: WarehouseLocation[] = [
  { id: 'LOC-001', code: 'WH-A', name: 'Gudang A - Raw Material', capacity: '500 Pallets' },
  { id: 'LOC-002', code: 'WH-B', name: 'Gudang B - Finished Goods', capacity: '300 Pallets' }
]
