'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { Package, MagnifyingGlass, ArrowLeft, Warning, CheckCircle, Barcode } from '@phosphor-icons/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import { Input } from '@/components/atoms/ui/input'

import { cn } from '@/utils/cn'

// Mock Data - Stock Items
interface StockBatch {
  batchId: string
  qty: number
  expiredDate: string
  location: string
}

interface StockItem {
  id: string
  materialName: string
  category: 'bahan-baku' | 'produk-jadi' | 'kemasan'
  totalQty: number
  unit: string
  minStock: number
  status: 'aman' | 'menipis' | 'kritis'
  batches: StockBatch[]
  lastUpdate: string
}

const MOCK_STOCK_DATA: StockItem[] = [
  {
    id: '1',
    materialName: 'Cabai Rawit Merah',
    category: 'bahan-baku',
    totalQty: 800,
    unit: 'Kg',
    minStock: 500,
    status: 'aman',
    batches: [
      { batchId: 'BATCH-SUP-009', qty: 500, expiredDate: '2026-12-31', location: 'Rak A1' },
      { batchId: 'BATCH-SUP-012', qty: 300, expiredDate: '2027-01-15', location: 'Rak A2' }
    ],
    lastUpdate: '2026-01-04T10:30:00'
  },
  {
    id: '2',
    materialName: 'Bawang Putih',
    category: 'bahan-baku',
    totalQty: 50,
    unit: 'Kg',
    minStock: 100,
    status: 'kritis',
    batches: [{ batchId: 'BATCH-SUP-008', qty: 50, expiredDate: '2026-06-30', location: 'Rak B1' }],
    lastUpdate: '2026-01-04T09:15:00'
  },
  {
    id: '3',
    materialName: 'Garam Halus',
    category: 'bahan-baku',
    totalQty: 150,
    unit: 'Kg',
    minStock: 100,
    status: 'menipis',
    batches: [
      { batchId: 'BATCH-SUP-010', qty: 100, expiredDate: '2027-12-31', location: 'Rak C1' },
      { batchId: 'BATCH-SUP-011', qty: 50, expiredDate: '2027-06-30', location: 'Rak C2' }
    ],
    lastUpdate: '2026-01-04T11:00:00'
  },
  {
    id: '4',
    materialName: 'Saos Sambal Bawang 500ml',
    category: 'produk-jadi',
    totalQty: 2500,
    unit: 'Botol',
    minStock: 1000,
    status: 'aman',
    batches: [
      { batchId: 'BATCH-SAOS-1025', qty: 1500, expiredDate: '2026-12-31', location: 'Rak FG-A1' },
      { batchId: 'BATCH-SAOS-1103', qty: 1000, expiredDate: '2027-01-31', location: 'Rak FG-A2' }
    ],
    lastUpdate: '2026-01-04T14:20:00'
  },
  {
    id: '5',
    materialName: 'Botol PET 500ml',
    category: 'kemasan',
    totalQty: 5000,
    unit: 'Pcs',
    minStock: 3000,
    status: 'aman',
    batches: [{ batchId: 'BATCH-PKG-001', qty: 5000, expiredDate: '2030-12-31', location: 'Rak PKG-1' }],
    lastUpdate: '2026-01-04T08:00:00'
  }
]

export default function StockCheckPage() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [stockData, setStockData] = useState<StockItem[]>(MOCK_STOCK_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'bahan-baku' | 'produk-jadi' | 'kemasan'>('all')
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null)

  useEffect(() => {
    if (!user) {
      router.push('/operation/login')
    }
  }, [user, router])

  if (!user) return null

  // Filter logic
  const filteredStock = stockData.filter((item) => {
    const matchSearch = item.materialName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory

    return matchSearch && matchCategory
  })

  // Stats
  const totalItems = stockData.length
  const kritisItems = stockData.filter((i) => i.status === 'kritis').length
  const menipisItems = stockData.filter((i) => i.status === 'menipis').length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aman':
        return 'bg-green-100 text-green-700'
      case 'menipis':
        return 'bg-amber-100 text-amber-700'
      case 'kritis':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aman':
        return <CheckCircle size={20} weight="fill" className="text-green-600" />
      case 'menipis':
        return <Warning size={20} weight="fill" className="text-amber-600" />
      case 'kritis':
        return <Warning size={20} weight="fill" className="text-red-600" />
      default:
        return <Package size={20} />
    }
  }

  // Detail View
  if (selectedItem) {
    return (
      <div className="min-h-screen bg-slate-50 pb-20">
        {/* Header - Improved */}
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedItem(null)}
              className="h-10 w-10 hover:bg-slate-100"
            >
              <ArrowLeft size={22} weight="bold" className="text-slate-700" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-slate-900">{selectedItem.materialName}</h1>
              <p className="text-xs text-slate-500">Detail Stok & Batch</p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-4">
          {/* Stock Summary - Compact */}
          <Card className="mb-4 border-2 border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {selectedItem.totalQty.toLocaleString('id-ID')} {selectedItem.unit}
                </h2>
                <p className="text-xs text-slate-600">Total Stok Tersedia</p>
              </div>
              <Badge
                className={cn(
                  'text-xs',
                  selectedItem.status === 'aman' && 'bg-green-100 text-green-700',
                  selectedItem.status === 'menipis' && 'bg-amber-100 text-amber-700',
                  selectedItem.status === 'kritis' && 'bg-red-100 text-red-700'
                )}
              >
                {selectedItem.status === 'aman' && 'Stok Aman'}
                {selectedItem.status === 'menipis' && 'Stok Menipis'}
                {selectedItem.status === 'kritis' && 'Stok Kritis!'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-slate-600">Kategori:</p>
                <p className="font-semibold text-slate-900 capitalize">{selectedItem.category.replace('-', ' ')}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600">Min. Stock:</p>
                <p className="font-semibold text-slate-900">
                  {selectedItem.minStock} {selectedItem.unit}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-600">Jumlah Batch:</p>
                <p className="font-semibold text-slate-900">{selectedItem.batches.length} batch</p>
              </div>
              <div>
                <p className="text-xs text-slate-600">Update Terakhir:</p>
                <p className="font-semibold text-slate-900">
                  {new Date(selectedItem.lastUpdate).toLocaleString('id-ID', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                  })}
                </p>
              </div>
            </div>
          </Card>

          {/* Batch List Header */}
          <div className="mb-3">
            <h3 className="text-base font-bold text-slate-900">Daftar Batch (FEFO)</h3>
            <p className="text-xs text-slate-500">Diurutkan berdasarkan expired date terdekat</p>
          </div>

          {/* Batch Cards */}
          <div className="space-y-2">
            {selectedItem.batches
              .sort((a, b) => new Date(a.expiredDate).getTime() - new Date(b.expiredDate).getTime())
              .map((batch, idx) => {
                const expiryDate = new Date(batch.expiredDate)
                const today = new Date()
                const daysUntilExpiry = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                const isNearExpiry = daysUntilExpiry < 90 // 3 months

                return (
                  <Card
                    key={idx}
                    className={cn(
                      'border-2 p-4',
                      isNearExpiry ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-white'
                    )}
                  >
                    {/* Batch ID */}
                    <div className="mb-3 flex items-center gap-2">
                      <Barcode size={18} className="shrink-0 text-slate-400" />
                      <span className="font-mono text-sm font-bold text-slate-900">{batch.batchId}</span>
                      {isNearExpiry && (
                        <Badge className="bg-amber-100 text-amber-700">
                          <Warning size={12} weight="fill" className="mr-1" />
                          Segera Expired
                        </Badge>
                      )}
                    </div>

                    {/* Batch Info Grid */}
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-slate-600">Qty:</p>
                        <p className="font-semibold text-slate-900">
                          {batch.qty} {selectedItem.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Expired:</p>
                        <p className={cn('font-semibold', isNearExpiry ? 'text-amber-700' : 'text-green-600')}>
                          {new Date(batch.expiredDate).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Lokasi:</p>
                        <p className="font-semibold text-slate-900">{batch.location}</p>
                      </div>
                    </div>

                    {/* Warning Message */}
                    {isNearExpiry && (
                      <p className="mt-2 text-xs text-amber-700">
                        ⚠️ Sisa {daysUntilExpiry} hari - Prioritaskan penggunaan batch ini!
                      </p>
                    )}
                  </Card>
                )
              })}
          </div>
        </main>
      </div>
    )
  }

  // List View
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header - Improved Visibility */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <Link href="/operation">
            <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-slate-100">
              <ArrowLeft size={22} weight="bold" className="text-slate-700" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-slate-900">Cek Stok</h1>
            <p className="text-xs text-slate-500">Info Stok - Staff Gudang</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
            <Package size={22} weight="duotone" className="text-blue-600" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-4">
        {/* Compact Stats - Horizontal */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-3">
            <p className="mb-1 text-xs font-medium text-blue-700">Total Item</p>
            <p className="text-xl font-bold text-blue-900">{totalItems}</p>
          </Card>

          <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white p-3">
            <p className="mb-1 text-xs font-medium text-amber-700">Menipis</p>
            <p className="text-xl font-bold text-amber-900">{menipisItems}</p>
          </Card>

          <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-white p-3">
            <p className="mb-1 text-xs font-medium text-red-700">Kritis</p>
            <p className="text-xl font-bold text-red-900">{kritisItems}</p>
          </Card>
        </div>

        {/* Search & Filter - Compact */}
        <Card className="mb-4 border-slate-200 bg-white p-3">
          <div className="mb-2 flex items-center gap-2">
            <div className="relative flex-1">
              <MagnifyingGlass size={18} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Cari nama material..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 pl-10"
              />
            </div>
          </div>

          {/* Category Pills - Scrollable */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline-slate'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className="h-8 shrink-0 text-xs whitespace-nowrap"
            >
              Semua
            </Button>
            <Button
              variant={selectedCategory === 'bahan-baku' ? 'default' : 'outline-slate'}
              size="sm"
              onClick={() => setSelectedCategory('bahan-baku')}
              className="h-8 shrink-0 text-xs whitespace-nowrap"
            >
              Bahan Baku
            </Button>
            <Button
              variant={selectedCategory === 'produk-jadi' ? 'default' : 'outline-slate'}
              size="sm"
              onClick={() => setSelectedCategory('produk-jadi')}
              className="h-8 shrink-0 text-xs whitespace-nowrap"
            >
              Produk Jadi
            </Button>
            <Button
              variant={selectedCategory === 'kemasan' ? 'default' : 'outline-slate'}
              size="sm"
              onClick={() => setSelectedCategory('kemasan')}
              className="h-8 shrink-0 text-xs whitespace-nowrap"
            >
              Kemasan
            </Button>
          </div>
        </Card>

        {/* List Header */}
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Daftar Stok</h2>
            <p className="text-xs text-slate-500">{filteredStock.length} item ditemukan</p>
          </div>
        </div>

        {/* Stock List - Improved Cards */}
        <div className="space-y-2">
          {filteredStock.map((item) => (
            <Card
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="cursor-pointer border-2 border-slate-200 bg-white p-4 transition-all hover:border-primary hover:shadow-md active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  {/* Title & Badge */}
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="truncate text-base font-bold text-slate-900">{item.materialName}</h3>
                    <Badge
                      className={cn(
                        'shrink-0 text-xs',
                        item.status === 'aman' && 'bg-green-100 text-green-700',
                        item.status === 'menipis' && 'bg-amber-100 text-amber-700',
                        item.status === 'kritis' && 'bg-red-100 text-red-700'
                      )}
                    >
                      {item.status === 'aman' && 'Aman'}
                      {item.status === 'menipis' && 'Menipis'}
                      {item.status === 'kritis' && 'Kritis!'}
                    </Badge>
                  </div>

                  {/* Category */}
                  <p className="mb-2 text-xs text-slate-500 capitalize">{item.category.replace('-', ' ')}</p>

                  {/* Stats Row */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <div>
                      <span className="text-slate-600">Stok: </span>
                      <strong className="text-slate-900">
                        {item.totalQty.toLocaleString('id-ID')} {item.unit}
                      </strong>
                    </div>
                    <span className="text-slate-300">•</span>
                    <div>
                      <span className="text-slate-600">Min: </span>
                      <strong className="text-slate-900">
                        {item.minStock} {item.unit}
                      </strong>
                    </div>
                    <span className="text-slate-300">•</span>
                    <div className="text-slate-500">{item.batches.length} batch</div>
                  </div>
                </div>

                {/* Status Icon */}
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                    item.status === 'aman' && 'bg-green-100',
                    item.status === 'menipis' && 'bg-amber-100',
                    item.status === 'kritis' && 'bg-red-100'
                  )}
                >
                  {getStatusIcon(item.status)}
                </div>
              </div>
            </Card>
          ))}

          {filteredStock.length === 0 && (
            <Card className="border-2 border-dashed border-slate-300 bg-slate-50 p-12">
              <div className="text-center">
                <Package size={48} className="mx-auto mb-3 text-slate-400" weight="duotone" />
                <p className="text-sm text-slate-600">Tidak ada item yang ditemukan</p>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
