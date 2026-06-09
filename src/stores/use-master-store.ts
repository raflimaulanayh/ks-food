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
      name: 'Saos Sambal Pedas Manis 135ml',
      sku: 'SKU-SMBL-135',
      category: 'Finished Goods',
      price: 12000,
      status: 'Published',
      image: '/img/saos.jpg',
      isPublic: true
    },
    {
      id: 2,
      name: 'Kecap Manis Cap Noni 250ml',
      sku: 'SKU-KCP-250',
      category: 'Finished Goods',
      price: 18000,
      status: 'Published',
      image: '/img/kecap.jpg',
      isPublic: true
    },
    {
      id: 3,
      name: 'Mayones Original Premium 135ml',
      sku: 'SKU-MAYO-135',
      category: 'Finished Goods',
      price: 15000,
      status: 'Published',
      image: '/img/mayo.jpg',
      isPublic: true
    },
    {
      id: 4,
      name: 'Saus Tomat Asam Manis 500ml',
      sku: 'SKU-TOM-500',
      category: 'Finished Goods',
      price: 22000,
      status: 'Published',
      image: '/img/default.jpg',
      isPublic: true
    },
    {
      id: 5,
      name: 'Kecap Asin Kedelai Hitam 100ml',
      sku: 'SKU-ASN-100',
      category: 'Finished Goods',
      price: 9500,
      status: 'Published',
      image: '/img/default.jpg',
      isPublic: true
    },
    {
      id: 6,
      name: 'Minyak Wijen Wangi Murni 100ml',
      sku: 'SKU-WJN-100',
      category: 'Finished Goods',
      price: 25000,
      status: 'Published',
      image: '/img/default.jpg',
      isPublic: true
    },
    {
      id: 7,
      name: 'Saus Tiram Selera Gurih 1kg',
      sku: 'SKU-TRM-1K',
      category: 'Finished Goods',
      price: 45000,
      status: 'Published',
      image: '/img/default.jpg',
      isPublic: true
    },
    {
      id: 8,
      name: 'Bumbu Lada Putih Bubuk 25g',
      sku: 'SKU-LADA-25',
      category: 'Finished Goods',
      price: 3500,
      status: 'Published',
      image: '/img/default.jpg',
      isPublic: true
    },
    {
      id: 9,
      name: 'Saus Teriyaki Jepang 330ml',
      sku: 'SKU-TERI-330',
      category: 'Finished Goods',
      price: 28000,
      status: 'Published',
      image: '/img/default.jpg',
      isPublic: true
    },
    {
      id: 10,
      name: 'Cuka Makan Asam Murni 10kg',
      sku: 'SKU-CUKA-10K',
      category: 'Finished Goods',
      price: 98000,
      status: 'Published',
      image: '/img/default.jpg',
      isPublic: true
    }
  ],

  units: [
    { id: 1, code: 'KG', name: 'Kilogram', type: 'Mass' },
    { id: 2, code: 'LITER', name: 'Liter', type: 'Volume' },
    { id: 3, code: 'BOTOL', name: 'Botol', type: 'Package' },
    { id: 4, code: 'POUCH', name: 'Pouch', type: 'Package' },
    { id: 5, code: 'SACHET', name: 'Sachet', type: 'Package' },
    { id: 6, code: 'JERIGEN', name: 'Jerigen', type: 'Package' }
  ],

  locations: [
    { id: 1, code: 'WH-RAW-01', name: 'Gudang Bahan Baku A', capacity: '5000 Pallet' },
    { id: 2, code: 'WH-FIN-01', name: 'Gudang Barang Jadi B', capacity: '10000 Pallet' },
    { id: 3, code: 'WH-PKG-01', name: 'Gudang Kemasan C', capacity: '8000 Pallet' },
    { id: 4, code: 'WH-RET-01', name: 'Gudang Barang Retur D', capacity: '2000 Pallet' },
    { id: 5, code: 'WH-SPARE-01', name: 'Gudang Suku Cadang Mesin', capacity: '1000 Pallet' },
    { id: 6, code: 'WH-RAW-02', name: 'Gudang Bahan Baku Basah (Chiller)', capacity: '3000 Pallet' },
    { id: 7, code: 'WH-FIN-02', name: 'Gudang Barang Jadi Cirebon', capacity: '15000 Pallet' },
    { id: 8, code: 'WH-FIN-03', name: 'Gudang Transit Jakarta', capacity: '20000 Pallet' },
    { id: 9, code: 'WH-SPICE-01', name: 'Gudang Rempah & Bubuk', capacity: '4000 Pallet' },
    { id: 10, code: 'WH-LIQ-01', name: 'Gudang Tangki Cairan', capacity: '50000 Pallet' }
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
