import { create } from 'zustand'

export type StockItem = {
  id: string
  name: string
  sku: string
  category: string
  current: number
  min: number
  unit: string
  lastUpdate: string
}

interface StockStore {
  items: StockItem[]
  updateStock: (id: string, val: number) => void
}

export const useStockStore = create<StockStore>((set) => ({
  items: [
    {
      id: '1',
      name: 'Tepung Terigu Premium',
      sku: 'RM-FLR-001',
      category: 'Raw Material',
      current: 45,
      min: 100,
      unit: 'KG',
      lastUpdate: '2026-01-03'
    },
    {
      id: '2',
      name: 'Minyak Goreng',
      sku: 'RM-OIL-022',
      category: 'Raw Material',
      current: 120,
      min: 100,
      unit: 'L',
      lastUpdate: '2026-01-02'
    },
    {
      id: '3',
      name: 'Gula Pasir',
      sku: 'RM-SGR-005',
      category: 'Raw Material',
      current: 500,
      min: 200,
      unit: 'KG',
      lastUpdate: '2026-01-01'
    },
    {
      id: '4',
      name: 'Botol Sambal 150ml',
      sku: 'PK-BTL-150',
      category: 'Packaging',
      current: 50,
      min: 500,
      unit: 'Pcs',
      lastUpdate: '2026-01-03'
    },
    {
      id: '5',
      name: 'Label Stiker',
      sku: 'PK-LBL-001',
      category: 'Packaging',
      current: 2000,
      min: 1000,
      unit: 'Pcs',
      lastUpdate: '2025-12-30'
    }
  ],
  updateStock: (id, val) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, current: val } : i))
    }))
}))
