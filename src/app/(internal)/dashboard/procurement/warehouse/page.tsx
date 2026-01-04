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
  DownloadSimple,
  ArrowUpRight
} from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'

export default function WarehousePage() {
  const { items, updateStock } = useStockStore()
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Helper Status Logic
  const getStatus = (current: number, min: number) => {
    if (current <= min) return 'CRITICAL'
    if (current <= min * 1.5) return 'WARNING'

    return 'SAFE'
  }

  const filteredItems = items.filter((item) => {
    const status = getStatus(item.current, item.min)
    const matchTab =
      activeTab === 'all'
        ? true
        : activeTab === 'critical'
          ? status === 'CRITICAL' || status === 'WARNING'
          : status === 'SAFE'
    const matchSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase())

    return matchTab && matchSearch
  })

  const criticalCount = items.filter((i) => getStatus(i.current, i.min) === 'CRITICAL').length

  const handleRestock = (id: string, name: string, min: number) => {
    updateStock(id, min * 2)
    toast.success(`Restock request submitted for ${name}`)
  }

  return (
    <div className="space-y-6 pt-2 pb-10">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manajemen Gudang & Stok</h1>
          <p className="mt-1 text-sm text-slate-500">Monitor level stok bahan baku dan status persediaan</p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
            <DownloadSimple size={16} /> Report
          </Button>
          {/* PRIMARY BUTTON: Solid Red */}
          <Button className="gap-2 bg-primary font-bold !text-white shadow-md hover:bg-red-700">
            <ArrowsClockwise size={16} weight="bold" /> Opname Stok
          </Button>
        </div>
      </div>

      {/* TABS CONTAINER */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* TAB HEADER */}
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
                  <Warning size={16} /> Stok Kritis
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

          {/* TOOLBAR */}
          <div className="flex items-center justify-between gap-4 border-b bg-slate-50/50 p-4">
            <div className="relative w-full md:w-96">
              <MagnifyingGlass className="absolute top-2.5 left-3 text-slate-400" size={18} />
              <input
                placeholder="Cari SKU atau Nama Material..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="gap-2 border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
              <Funnel size={16} /> Filter Kategori
            </Button>
          </div>

          {/* TABLE */}
          <TabsContent value={activeTab} className="m-0 p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-slate-50/50 font-medium text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Material Info</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="w-1/3 px-6 py-4">Ketersediaan (Current / Min)</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.map((item) => {
                    const status = getStatus(item.current, item.min)
                    const percentage = Math.min((item.current / (item.min * 1.5)) * 100, 100)
                    const barColor =
                      status === 'CRITICAL' ? 'bg-red-500' : status === 'WARNING' ? 'bg-amber-500' : 'bg-emerald-500'

                    return (
                      <tr key={item.id} className="group transition-colors hover:bg-slate-50/80">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-800">{item.name}</div>
                          <div className="mt-1 flex items-center gap-1 font-mono text-xs text-slate-500">
                            <Package size={12} /> {item.sku}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-normal text-slate-600">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="mb-2 flex justify-between text-xs font-semibold text-slate-700">
                            <span className={status === 'CRITICAL' ? 'font-bold text-primary' : ''}>
                              {item.current} {item.unit}
                            </span>
                            <span className="text-slate-400">
                              Min: {item.min} {item.unit}
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full border border-slate-100 bg-slate-100">
                            <div
                              className={`h-full transition-all duration-500 ${barColor}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`border px-2.5 py-0.5 shadow-sm ${
                              status === 'CRITICAL'
                                ? 'border-red-200 bg-red-50 text-red-700'
                                : status === 'WARNING'
                                  ? 'border-amber-200 bg-amber-50 text-amber-700'
                                  : 'border-green-200 bg-green-50 text-green-700'
                            } inline-flex rounded-full text-xs font-medium`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {/* CLEANER BUTTON STYLE: Outline instead of Solid */}
                          {status === 'CRITICAL' || status === 'WARNING' ? (
                            <Button
                              onClick={() => handleRestock(item.id, item.name, item.min)}
                              className="h-8 gap-1 border-red-200 bg-white text-xs font-medium text-primary shadow-sm hover:bg-red-50 hover:text-red-700"
                            >
                              <ArrowUpRight size={14} /> Restock
                            </Button>
                          ) : (
                            <Button disabled className="h-8 gap-1 text-xs text-slate-400">
                              Aman
                            </Button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                  {filteredItems.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                        Tidak ada material yang sesuai filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between border-t bg-slate-50/50 p-4">
              <span className="text-xs font-medium text-slate-500">Menampilkan {filteredItems.length} material</span>
              <div className="flex gap-2">
                <button
                  disabled
                  className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white p-0 text-slate-400 disabled:opacity-50"
                >
                  <CaretLeft size={16} />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white p-0 text-slate-600 hover:bg-slate-50">
                  <CaretRight size={16} />
                </button>
              </div>
            </div>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  )
}
