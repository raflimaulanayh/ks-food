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

export interface StockAuditLog {
  id: string
  itemId: string
  itemName: string
  action: 'OPNAME_APPROVED' | 'INBOUND' | 'OUTBOUND' | 'MANUAL_ADJUSTMENT'
  previousQty: number
  newQty: number
  difference: number
  performedBy: string
  performedByName: string
  timestamp: string
  opnameRequestId?: string
  notes?: string
}

interface StockStore {
  items: StockItem[]
  auditLogs: StockAuditLog[]
  updateStock: (id: string, val: number) => void
  updateStockWithAudit: (
    id: string,
    newQty: number,
    performedBy: string,
    performedByName: string,
    action: StockAuditLog['action'],
    opnameRequestId?: string,
    notes?: string
  ) => void
  getAuditLogs: (itemId?: string) => StockAuditLog[]
}

export const useStockStore = create<StockStore>((set, get) => ({
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
  auditLogs: [],

  updateStock: (id, val) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, current: val, lastUpdate: new Date().toISOString().split('T')[0] } : i
      )
    })),

  updateStockWithAudit: (id, newQty, performedBy, performedByName, action, opnameRequestId, notes) => {
    const state = get()
    const item = state.items.find((i) => i.id === id)
    if (!item) return

    const auditLog: StockAuditLog = {
      id: `AUDIT-${Date.now()}`,
      itemId: id,
      itemName: item.name,
      action,
      previousQty: item.current,
      newQty,
      difference: newQty - item.current,
      performedBy,
      performedByName,
      timestamp: new Date().toISOString(),
      opnameRequestId,
      notes
    }

    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, current: newQty, lastUpdate: new Date().toISOString().split('T')[0] } : i
      ),
      auditLogs: [...state.auditLogs, auditLog]
    }))
  },

  getAuditLogs: (itemId) => {
    const logs = get().auditLogs
    if (itemId) {
      return logs
        .filter((log) => log.itemId === itemId)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    }

    return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }
}))
