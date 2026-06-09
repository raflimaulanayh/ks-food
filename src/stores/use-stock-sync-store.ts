import { create } from 'zustand'

export type SyncChannel = 'shopee' | 'tokopedia' | 'blibli' | 'website'
export type SyncStatus = 'synced' | 'out_of_sync' | 'error'
export type SyncHistoryStatus = 'success' | 'failed'

export interface ProductStock {
  id: string
  sku: string
  name: string
  stock: {
    internal: number // Master stock (reference)
    shopee: number
    tokopedia: number
    blibli: number
    website: number
  }
  syncStatus: SyncStatus
  lastSync: Date
  unit: string
}

export interface SyncHistory {
  id: string
  productId: string
  productName: string
  channel: SyncChannel | 'all'
  timestamp: Date
  status: SyncHistoryStatus
  oldStock: number
  newStock: number
  message?: string
}

interface StockSyncState {
  products: ProductStock[]
  history: SyncHistory[]
  isLoading: boolean
  autoSyncEnabled: boolean
  autoSyncInterval: number // in minutes
  lastAutoSync: Date | null
  syncProduct: (productId: string, channel?: SyncChannel) => Promise<void>
  syncAll: () => Promise<void>
  getSyncStatus: () => { synced: number; outOfSync: number; error: number }
  getLastSyncTime: () => Date | null
  toggleAutoSync: (enabled: boolean) => void
  setAutoSyncInterval: (minutes: number) => void
  performAutoSync: () => Promise<void>
}

// Mock Data
const mockProducts: ProductStock[] = [
  {
    id: '1',
    sku: 'SKU-SMBL-135',
    name: 'Saos Sambal Pedas Manis 135ml',
    stock: {
      internal: 150,
      shopee: 150,
      tokopedia: 145,
      blibli: 150,
      website: 148
    },
    syncStatus: 'out_of_sync',
    lastSync: new Date('2026-06-09T03:45:00'),
    unit: 'BOTOL'
  },
  {
    id: '2',
    sku: 'SKU-KCP-250',
    name: 'Kecap Manis Cap Noni 250ml',
    stock: {
      internal: 200,
      shopee: 200,
      tokopedia: 200,
      blibli: 200,
      website: 200
    },
    syncStatus: 'synced',
    lastSync: new Date('2026-06-09T04:15:00'),
    unit: 'BOTOL'
  },
  {
    id: '3',
    sku: 'SKU-MAYO-135',
    name: 'Mayones Original Premium 135ml',
    stock: {
      internal: 300,
      shopee: 295,
      tokopedia: 300,
      blibli: 298,
      website: 300
    },
    syncStatus: 'out_of_sync',
    lastSync: new Date('2026-06-09T02:30:00'),
    unit: 'BOTOL'
  },
  {
    id: '4',
    sku: 'SKU-TOM-500',
    name: 'Saus Tomat Asam Manis 500ml',
    stock: {
      internal: 180,
      shopee: 180,
      tokopedia: 180,
      blibli: 180,
      website: 180
    },
    syncStatus: 'synced',
    lastSync: new Date('2026-06-09T04:10:00'),
    unit: 'BOTOL'
  },
  {
    id: '5',
    sku: 'SKU-ASN-100',
    name: 'Kecap Asin Kedelai Hitam 100ml',
    stock: {
      internal: 250,
      shopee: 250,
      tokopedia: 242,
      blibli: 250,
      website: 245
    },
    syncStatus: 'out_of_sync',
    lastSync: new Date('2026-06-09T01:20:00'),
    unit: 'BOTOL'
  },
  {
    id: '6',
    sku: 'SKU-WJN-100',
    name: 'Minyak Wijen Wangi Murni 100ml',
    stock: {
      internal: 120,
      shopee: 120,
      tokopedia: 120,
      blibli: 120,
      website: 120
    },
    syncStatus: 'synced',
    lastSync: new Date('2026-06-09T04:20:00'),
    unit: 'BOTOL'
  },
  {
    id: '7',
    sku: 'SKU-TRM-1K',
    name: 'Saus Tiram Selera Gurih 1kg',
    stock: {
      internal: 160,
      shopee: 155,
      tokopedia: 160,
      blibli: 158,
      website: 160
    },
    syncStatus: 'out_of_sync',
    lastSync: new Date('2026-06-08T23:45:00'),
    unit: 'POUCH'
  },
  {
    id: '8',
    sku: 'SKU-LADA-25',
    name: 'Bumbu Lada Putih Bubuk 25g',
    stock: {
      internal: 280,
      shopee: 280,
      tokopedia: 280,
      blibli: 280,
      website: 280
    },
    syncStatus: 'synced',
    lastSync: new Date('2026-06-09T04:05:00'),
    unit: 'SACHET'
  },
  {
    id: '9',
    sku: 'SKU-TERI-330',
    name: 'Saus Teriyaki Jepang 330ml',
    stock: {
      internal: 50,
      shopee: 0,
      tokopedia: 0,
      blibli: 0,
      website: 48
    },
    syncStatus: 'out_of_sync',
    lastSync: new Date('2026-06-09T00:15:00'),
    unit: 'BOTOL'
  },
  {
    id: '10',
    sku: 'SKU-CUKA-10K',
    name: 'Cuka Makan Asam Murni 10kg',
    stock: {
      internal: 75,
      shopee: 0,
      tokopedia: 0,
      blibli: 0,
      website: 75
    },
    syncStatus: 'synced',
    lastSync: new Date('2026-06-09T04:00:00'),
    unit: 'JERIGEN'
  }
]

const mockHistory: SyncHistory[] = [
  {
    id: '1',
    productId: '2',
    productName: 'Kecap Manis Cap Noni 250ml',
    channel: 'all',
    timestamp: new Date('2026-06-09T04:15:00'),
    status: 'success',
    oldStock: 195,
    newStock: 200,
    message: 'Synced successfully to all channels'
  },
  {
    id: '2',
    productId: '1',
    productName: 'Saos Sambal Pedas Manis 135ml',
    channel: 'tokopedia',
    timestamp: new Date('2026-06-09T03:45:00'),
    status: 'failed',
    oldStock: 145,
    newStock: 145,
    message: 'API timeout - please retry'
  },
  {
    id: '3',
    productId: '6',
    productName: 'Minyak Wijen Wangi Murni 100ml',
    channel: 'all',
    timestamp: new Date('2026-06-09T04:20:00'),
    status: 'success',
    oldStock: 118,
    newStock: 120,
    message: 'Synced successfully to all channels'
  }
]

export const useStockSyncStore = create<StockSyncState>((set, get) => ({
  products: mockProducts,
  history: mockHistory,
  isLoading: false,
  autoSyncEnabled: true, // Auto-sync enabled by default
  autoSyncInterval: 15, // Default 15 minutes
  lastAutoSync: new Date(), // Initialize with current time

  syncProduct: async (productId: string, channel?: SyncChannel) => {
    set({ isLoading: true })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const { products, history } = get()
    const product = products.find((p) => p.id === productId)

    if (!product) {
      set({ isLoading: false })

      return
    }

    const updatedStock = { ...product.stock }
    const channelsToSync: SyncChannel[] = channel ? [channel] : ['shopee', 'tokopedia', 'blibli', 'website']

    // Mock sync logic - set all channels to internal stock
    channelsToSync.forEach((ch) => {
      if (product.stock[ch] !== 0) {
        // Don't sync if channel stock is 0 (product not sold there)
        updatedStock[ch] = product.stock.internal
      }
    })

    // Calculate overall sync status
    const isFullySynced = Object.entries(updatedStock).every(
      ([key, value]) => key === 'internal' || value === 0 || value === updatedStock.internal
    )

    // Update product
    const updatedProducts = products.map((p) =>
      p.id === productId
        ? {
            ...p,
            stock: updatedStock,
            syncStatus: isFullySynced ? ('synced' as SyncStatus) : ('out_of_sync' as SyncStatus),
            lastSync: new Date()
          }
        : p
    )

    // Add to history
    const newHistoryEntry: SyncHistory = {
      id: Date.now().toString(),
      productId,
      productName: product.name,
      channel: channel || 'all',
      timestamp: new Date(),
      status: 'success',
      oldStock: channel ? product.stock[channel] : 0,
      newStock: channel ? updatedStock[channel] : product.stock.internal,
      message: `Synced successfully to ${channel || 'all channels'}`
    }

    set({
      products: updatedProducts,
      history: [newHistoryEntry, ...history],
      isLoading: false
    })
  },

  syncAll: async () => {
    set({ isLoading: true })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2500))

    const { products, history } = get()

    // Sync all products
    const updatedProducts = products.map((product) => {
      const updatedStock = { ...product.stock }

      // Set all channels to internal stock (except 0 values)
      ;(['shopee', 'tokopedia', 'blibli', 'website'] as SyncChannel[]).forEach((channel) => {
        if (product.stock[channel] !== 0) {
          updatedStock[channel] = product.stock.internal
        }
      })

      return {
        ...product,
        stock: updatedStock,
        syncStatus: 'synced' as SyncStatus,
        lastSync: new Date()
      }
    })

    // Add history entry for bulk sync
    const newHistoryEntry: SyncHistory = {
      id: Date.now().toString(),
      productId: 'all',
      productName: 'All Products',
      channel: 'all',
      timestamp: new Date(),
      status: 'success',
      oldStock: 0,
      newStock: 0,
      message: 'Bulk sync completed successfully'
    }

    set({
      products: updatedProducts,
      history: [newHistoryEntry, ...history],
      isLoading: false
    })
  },

  performAutoSync: async () => {
    const { products, history, autoSyncEnabled } = get()

    if (!autoSyncEnabled) return

    // Find products that are out of sync
    const outOfSyncProducts = products.filter((p) => p.syncStatus === 'out_of_sync')

    if (outOfSyncProducts.length === 0) {
      set({ lastAutoSync: new Date() })

      return
    }

    // Sync all out-of-sync products silently (no loading state for auto-sync)
    const updatedProducts = products.map((product) => {
      if (product.syncStatus !== 'out_of_sync') return product

      const updatedStock = { ...product.stock }

      // Set all channels to internal stock (except 0 values)
      ;(['shopee', 'tokopedia', 'blibli', 'website'] as SyncChannel[]).forEach((channel) => {
        if (product.stock[channel] !== 0) {
          updatedStock[channel] = product.stock.internal
        }
      })

      return {
        ...product,
        stock: updatedStock,
        syncStatus: 'synced' as SyncStatus,
        lastSync: new Date()
      }
    })

    // Add history entry for auto-sync
    const newHistoryEntry: SyncHistory = {
      id: Date.now().toString(),
      productId: 'auto',
      productName: `${outOfSyncProducts.length} Products`,
      channel: 'all',
      timestamp: new Date(),
      status: 'success',
      oldStock: 0,
      newStock: 0,
      message: `Auto-sync: ${outOfSyncProducts.length} products synchronized`
    }

    set({
      products: updatedProducts,
      history: [newHistoryEntry, ...history],
      lastAutoSync: new Date()
    })
  },

  getSyncStatus: () => {
    const { products } = get()

    return {
      synced: products.filter((p) => p.syncStatus === 'synced').length,
      outOfSync: products.filter((p) => p.syncStatus === 'out_of_sync').length,
      error: products.filter((p) => p.syncStatus === 'error').length
    }
  },

  getLastSyncTime: () => {
    const { products } = get()
    if (products.length === 0) return null

    const dates = products.map((p) => p.lastSync.getTime())

    return new Date(Math.max(...dates))
  },

  toggleAutoSync: (enabled: boolean) => {
    set({ autoSyncEnabled: enabled })
  },

  setAutoSyncInterval: (minutes: number) => {
    set({ autoSyncInterval: minutes })
  }
}))
