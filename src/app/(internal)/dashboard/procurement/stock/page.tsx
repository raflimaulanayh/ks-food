'use client'

import { useStockStore } from '@/stores/use-stock-store'
import {
  Package,
  MagnifyingGlass,
  Funnel,
  ArrowsClockwise,
  Warning,
  CheckCircle,
  CaretLeft,
  CaretRight,
  Plus,
  Minus
} from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'

export default function StockMonitorPage() {
  const { items, updateStock } = useStockStore()
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)

  // Helper: Calculate status
  const getStatus = (current: number, min: number) => {
    if (current <= min) return 'CRITICAL'
    if (current <= min * 1.2) return 'WARNING'

    return 'SAFE'
  }

  // Filter items
  const filteredItems = items.filter((item) => {
    const status = getStatus(item.current, item.min)
    const matchesTab =
      activeTab === 'all'
        ? true
        : activeTab === 'critical'
          ? status === 'CRITICAL' || status === 'WARNING'
          : status === 'SAFE'
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesTab && matchesSearch
  })

  const criticalCount = items.filter((i) => getStatus(i.current, i.min) === 'CRITICAL').length

  const handleRestock = (id: string, name: string, min: number) => {
    // Set stock to double the minimum
    updateStock(id, min * 2)
    toast.success(`Restock request submitted for ${name}`)
  }

  return (
    <div className="space-y-6 pt-2 pb-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Monitor Stok Material</h1>
          <p className="mt-1 text-sm text-slate-500">Pantau ketersediaan bahan baku untuk mencegah hambatan produksi</p>
        </div>

        {/* Manual Update Button */}
        <Button
          onClick={() => setShowUpdateDialog(!showUpdateDialog)}
          className="gap-2 bg-primary font-bold shadow-md hover:bg-red-700"
        >
          <ArrowsClockwise size={18} weight="bold" /> Update Stok Manual
        </Button>
      </div>

      {/* Quick Update Panel */}
      {showUpdateDialog && (
        <Card className="border-amber-200 bg-amber-50 p-4">
          <div className="mb-4">
            <h3 className="font-bold text-slate-800">Update Stok Cepat</h3>
            <p className="text-xs text-slate-600">
              Fitur ini untuk penyesuaian darurat. Gunakan modul Gudang untuk Inbound resmi.
            </p>
          </div>
          <div className="flex flex-col gap-y-2">
            {items.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded border border-amber-200 bg-white p-2">
                <span className="text-sm font-medium">{item.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateStock(item.id, Math.max(0, item.current - 10))}
                    className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 text-slate-600 hover:bg-slate-50"
                  >
                    <Minus size={14} weight="bold" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold">{item.current}</span>
                  <button
                    onClick={() => updateStock(item.id, item.current + 10)}
                    className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 text-slate-600 hover:bg-slate-50"
                  >
                    <Plus size={14} weight="bold" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tabs Container */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* Tabs Header - Red Underline Style */}
          <div className="border-b bg-white px-6 pt-2">
            <TabsList className="h-auto gap-8 bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                Semua Material
              </TabsTrigger>
              <TabsTrigger
                value="critical"
                className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <div className="flex items-center gap-2">
                  <Warning size={16} /> Stok Menipis
                  {criticalCount > 0 && (
                    <span className="inline-flex h-5 items-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">
                      {criticalCount}
                    </span>
                  )}
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="safe"
                className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} /> Stok Aman
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Filter Toolbar */}
          <div className="flex flex-col items-center justify-between gap-4 border-b bg-slate-50/50 p-4 md:flex-row">
            <div className="relative w-full md:w-96">
              <MagnifyingGlass className="absolute top-2.5 left-3 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Cari SKU atau Nama Material..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <Button className="gap-2 border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
                <Funnel size={16} /> Kategori
              </Button>
            </div>
          </div>

          {/* Table Content */}
          <TabsContent value={activeTab} className="m-0 p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-slate-50/50 font-medium text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Material Info</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="w-1/4 px-6 py-4">Level Stok</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4">Last Update</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                        Tidak ada material sesuai filter.
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map((item) => {
                      const status = getStatus(item.current, item.min)
                      const percent = Math.min((item.current / (item.min * 2)) * 100, 100)

                      return (
                        <tr key={item.id} className="group transition-colors hover:bg-slate-50/80">
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-800">{item.name}</div>
                            <div className="flex items-center gap-1 font-mono text-xs text-slate-400">
                              <Package size={12} /> {item.sku}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="mb-1 flex justify-between text-xs font-semibold text-slate-700">
                              <span>
                                {item.current} {item.unit}
                              </span>
                              <span className="text-slate-400">Min: {item.min}</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                              <div
                                className={`h-full ${status === 'CRITICAL' ? 'bg-primary' : status === 'WARNING' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium shadow-sm ${
                                status === 'CRITICAL'
                                  ? 'border-red-200 bg-red-100 text-red-700 hover:bg-red-200'
                                  : status === 'WARNING'
                                    ? 'border-amber-200 bg-amber-100 text-amber-700 hover:bg-amber-200'
                                    : 'border-green-200 bg-green-100 text-green-700 hover:bg-green-200'
                              }`}
                            >
                              {status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-500">{item.lastUpdate}</td>
                          <td className="px-6 py-4 text-right">
                            {status === 'CRITICAL' || status === 'WARNING' ? (
                              <Button
                                onClick={() => handleRestock(item.id, item.name, item.min)}
                                className="h-8 gap-1 bg-primary text-xs text-white shadow-sm hover:bg-red-700"
                              >
                                <Plus size={14} /> Restock
                              </Button>
                            ) : (
                              <Button disabled className="h-8 gap-1 text-xs text-slate-500">
                                <CheckCircle size={14} /> Aman
                              </Button>
                            )}
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between border-t bg-slate-50/30 p-4 text-xs text-slate-600">
              <span className="font-medium">
                Menampilkan {filteredItems.length} dari {items.length} baris
              </span>
              <div className="flex gap-2">
                <Button variant="outline-slate" size="sm" disabled>
                  <CaretLeft size={14} /> Previous
                </Button>
                <Button variant="outline-slate" size="sm">
                  Next <CaretRight size={14} />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  )
}
