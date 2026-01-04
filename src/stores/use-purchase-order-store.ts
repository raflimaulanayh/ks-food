import { create } from 'zustand'

export type POItem = {
  id: string
  name: string
  qty: number
  unit: string
  price: number
  total: number
}

export type PO = {
  id: string
  supplier: string
  orderDate: string
  deliveryDate: string
  paymentTerm: string
  items: POItem[]
  grandTotal: number
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled'
}

interface POStore {
  orders: PO[]
  addOrder: (order: PO) => void
  updateStatus: (id: string, status: PO['status']) => void
  deleteOrder: (id: string) => void
}

export const usePurchaseOrderStore = create<POStore>((set) => ({
  orders: [
    {
      id: 'PO-2601-001',
      supplier: 'PT. Aneka Pangan',
      orderDate: '2026-01-02',
      deliveryDate: '2026-01-05',
      paymentTerm: 'Net 30',
      items: [
        { id: '1', name: 'Tepung Terigu Premium', qty: 50, unit: 'KG', price: 12000, total: 600000 },
        { id: '2', name: 'Gula Pasir', qty: 100, unit: 'KG', price: 13500, total: 1350000 }
      ],
      grandTotal: 1950000,
      status: 'Pending'
    },
    {
      id: 'PO-2601-002',
      supplier: 'CV. Sumber Makmur',
      orderDate: '2026-01-01',
      deliveryDate: '2026-01-03',
      paymentTerm: 'COD',
      items: [{ id: '1', name: 'Minyak Goreng', qty: 200, unit: 'Liter', price: 24000, total: 4800000 }],
      grandTotal: 4800000,
      status: 'Processing'
    }
  ],
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  updateStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o))
    })),
  deleteOrder: (id) => set((state) => ({ orders: state.orders.filter((o) => o.id !== id) }))
}))
