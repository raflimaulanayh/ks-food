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

export interface InternalUser {
  id: string
  name: string
  email: string
  role: 'PIMPINAN' | 'ADMIN' | 'FINANCE' | 'PROCUREMENT' | 'WAREHOUSE' | 'QC_LAB' | 'HR'
  status: 'Active' | 'Inactive'
  joinDate: string
}

export interface CustomerUser {
  id: string
  name: string
  email: string
  company: string
  status: 'Active' | 'Inactive'
  joinDate: string
}

export const INTERNAL_USERS: InternalUser[] = [
  {
    id: 'USR-001',
    name: 'Rafli Maulana',
    email: 'rafli@ksfood.com',
    role: 'PIMPINAN',
    status: 'Active',
    joinDate: '2023-01-15'
  },
  {
    id: 'USR-002',
    name: 'Siti Aminah',
    email: 'siti@ksfood.com',
    role: 'HR',
    status: 'Active',
    joinDate: '2023-03-20'
  },
  {
    id: 'USR-003',
    name: 'Budi Santoso',
    email: 'budi@ksfood.com',
    role: 'PROCUREMENT',
    status: 'Active',
    joinDate: '2023-02-10'
  },
  {
    id: 'USR-004',
    name: 'Dewi Lestari',
    email: 'dewi@ksfood.com',
    role: 'FINANCE',
    status: 'Active',
    joinDate: '2023-04-05'
  }
]

export const CUSTOMER_USERS: CustomerUser[] = [
  {
    id: 'CUST-001',
    name: 'PT Maju Jaya',
    email: 'contact@majujaya.com',
    company: 'PT Maju Jaya',
    status: 'Active',
    joinDate: '2024-01-10'
  },
  {
    id: 'CUST-002',
    name: 'CV Berkah Sentosa',
    email: 'info@berkahsentosa.com',
    company: 'CV Berkah Sentosa',
    status: 'Active',
    joinDate: '2024-02-15'
  },
  {
    id: 'CUST-003',
    name: 'Toko Sumber Rezeki',
    email: 'toko@sumberrezeki.com',
    company: 'Toko Sumber Rezeki',
    status: 'Inactive',
    joinDate: '2024-03-20'
  }
]
