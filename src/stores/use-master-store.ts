import { create } from 'zustand'

export type Product = {
  id: number
  name: string
  sku: string
  category: string
  price: number
  status: 'Published' | 'Draft'
  image: string
  isPublic: boolean
}

export type Unit = {
  id: number
  code: string
  name: string
  type: string
}

export type Location = {
  id: number
  code: string
  name: string
  capacity: string
}

interface MasterStore {
  products: Product[]
  units: Unit[]
  locations: Location[]
  addProduct: (product: Product) => void
  updateProduct: (id: number, data: Partial<Product>) => void
  deleteProduct: (id: number) => void
  addUnit: (unit: Unit) => void
  updateUnit: (id: number, data: Partial<Unit>) => void
  deleteUnit: (id: number) => void
  addLocation: (location: Location) => void
  updateLocation: (id: number, data: Partial<Location>) => void
  deleteLocation: (id: number) => void
}

export const useMasterStore = create<MasterStore>((set) => ({
  products: [
    {
      id: 1,
      name: 'Saos Sambal Bawang',
      sku: 'SSB-200',
      category: 'Finished Goods',
      price: 15000,
      status: 'Published',
      image: '/img/saos.jpg',
      isPublic: true
    },
    {
      id: 2,
      name: 'Mayonaise Original',
      sku: 'MYO-100',
      category: 'Finished Goods',
      price: 22000,
      status: 'Draft',
      image: '/img/mayo.jpg',
      isPublic: false
    },
    {
      id: 3,
      name: 'Kecap Manis Premium',
      sku: 'KMP-150',
      category: 'Finished Goods',
      price: 18000,
      status: 'Published',
      image: '/img/kecap.jpg',
      isPublic: true
    }
  ],

  units: [
    { id: 1, code: 'KG', name: 'Kilogram', type: 'Mass' },
    { id: 2, code: 'PCS', name: 'Pieces', type: 'Count' },
    { id: 3, code: 'L', name: 'Liter', type: 'Volume' },
    { id: 4, code: 'KTN', name: 'Karton', type: 'Package' },
    { id: 5, code: 'BOX', name: 'Box', type: 'Package' }
  ],

  locations: [
    { id: 1, code: 'WH-A', name: 'Gudang Bahan Baku', capacity: '1000 Pallet' },
    { id: 2, code: 'WH-B', name: 'Gudang Barang Jadi', capacity: '500 Pallet' },
    { id: 3, code: 'WH-C', name: 'Gudang Packaging', capacity: '300 Pallet' }
  ],

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product]
    })),

  updateProduct: (id, data) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...data } : p))
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id)
    })),

  addUnit: (unit) =>
    set((state) => ({
      units: [...state.units, unit]
    })),

  updateUnit: (id, data) =>
    set((state) => ({
      units: state.units.map((u) => (u.id === id ? { ...u, ...data } : u))
    })),

  deleteUnit: (id) =>
    set((state) => ({
      units: state.units.filter((u) => u.id !== id)
    })),

  addLocation: (location) =>
    set((state) => ({
      locations: [...state.locations, location]
    })),

  updateLocation: (id, data) =>
    set((state) => ({
      locations: state.locations.map((l) => (l.id === id ? { ...l, ...data } : l))
    })),

  deleteLocation: (id) =>
    set((state) => ({
      locations: state.locations.filter((l) => l.id !== id)
    }))
}))
