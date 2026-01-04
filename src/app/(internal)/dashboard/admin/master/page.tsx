'use client'

import { useMasterStore, type Product, type Unit, type Location } from '@/stores/use-master-store'
import {
  Package,
  MapPin,
  Scales,
  Plus,
  MagnifyingGlass,
  PencilSimple,
  Trash,
  Image as ImageIcon,
  Globe,
  Warning,
  CaretLeft,
  CaretRight
} from '@phosphor-icons/react'
import { useState, useMemo } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'

export default function DataMasterPage() {
  const {
    products,
    units,
    locations,
    addProduct,
    updateProduct,
    deleteProduct,
    addUnit,
    updateUnit,
    deleteUnit,
    addLocation,
    updateLocation,
    deleteLocation
  } = useMasterStore()

  const [activeTab, setActiveTab] = useState('products')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  // Form state
  const [formData, setFormData] = useState<any>({
    name: '',
    sku: '',
    category: 'Finished Goods',
    price: 0,
    image: '',
    isPublic: false,
    code: '',
    type: 'Mass',
    capacity: ''
  })

  // Filtered data
  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [products, searchQuery])

  const filteredUnits = useMemo(() => {
    return units.filter(
      (u) =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.code.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [units, searchQuery])

  const filteredLocations = useMemo(() => {
    return locations.filter(
      (l) =>
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.code.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [locations, searchQuery])

  const handleOpenCreate = () => {
    setEditingItem(null)
    setFormData({
      name: '',
      sku: '',
      category: 'Finished Goods',
      price: 0,
      image: '',
      isPublic: false,
      code: '',
      type: 'Mass',
      capacity: ''
    })
    setShowAddModal(true)
  }

  const handleOpenEdit = (item: any) => {
    setEditingItem(item)
    setFormData({ ...item })
    setShowAddModal(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (activeTab === 'products') {
      if (editingItem) {
        updateProduct(editingItem.id, {
          name: formData.name,
          sku: formData.sku,
          category: formData.category,
          price: Number(formData.price),
          image: formData.image,
          status: formData.isPublic ? 'Published' : 'Draft',
          isPublic: formData.isPublic
        })
        toast.success('Produk berhasil diperbarui!')
      } else {
        const newProduct: Product = {
          id: Math.max(...products.map((p) => p.id), 0) + 1,
          name: formData.name,
          sku: formData.sku,
          category: formData.category,
          price: Number(formData.price),
          image: formData.image || '/img/default.jpg',
          status: formData.isPublic ? 'Published' : 'Draft',
          isPublic: formData.isPublic
        }
        addProduct(newProduct)
        toast.success('Produk baru berhasil ditambahkan!')
      }
    } else if (activeTab === 'units') {
      if (editingItem) {
        updateUnit(editingItem.id, {
          code: formData.code,
          name: formData.name,
          type: formData.type
        })
        toast.success('Satuan berhasil diperbarui!')
      } else {
        const newUnit: Unit = {
          id: Math.max(...units.map((u) => u.id), 0) + 1,
          code: formData.code,
          name: formData.name,
          type: formData.type
        }
        addUnit(newUnit)
        toast.success('Satuan baru berhasil ditambahkan!')
      }
    } else if (activeTab === 'locations') {
      if (editingItem) {
        updateLocation(editingItem.id, {
          code: formData.code,
          name: formData.name,
          capacity: formData.capacity
        })
        toast.success('Lokasi berhasil diperbarui!')
      } else {
        const newLocation: Location = {
          id: Math.max(...locations.map((l) => l.id), 0) + 1,
          code: formData.code,
          name: formData.name,
          capacity: formData.capacity
        }
        addLocation(newLocation)
        toast.success('Lokasi baru berhasil ditambahkan!')
      }
    }

    setShowAddModal(false)
    setEditingItem(null)
  }

  const handleDeleteClick = (id: number) => {
    setDeletingId(id)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (deletingId !== null) {
      if (activeTab === 'products') {
        deleteProduct(deletingId)
        toast.success('Produk berhasil dihapus')
      } else if (activeTab === 'units') {
        deleteUnit(deletingId)
        toast.success('Satuan berhasil dihapus')
      } else if (activeTab === 'locations') {
        deleteLocation(deletingId)
        toast.success('Lokasi berhasil dihapus')
      }
      setShowDeleteDialog(false)
      setDeletingId(null)
    }
  }

  const getModalTitle = () => {
    const action = editingItem ? 'Edit' : 'Tambah'
    if (activeTab === 'products') return `${action} Produk`
    if (activeTab === 'units') return `${action} Satuan`

    return `${action} Lokasi`
  }

  return (
    <div className="space-y-6 pt-2 pb-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Data Master & Referensi</h1>
          <p className="mt-1 text-sm text-slate-500">Pusat data produk, satuan ukur, dan lokasi gudang</p>
        </div>

        <Button onClick={handleOpenCreate}>
          <Plus size={18} weight="bold" />{' '}
          {activeTab === 'products' ? 'Tambah Produk' : activeTab === 'units' ? 'Tambah Satuan' : 'Tambah Lokasi'}
        </Button>
      </div>

      {/* Tabs with Premium Style */}
      <Tabs defaultValue="products" className="w-full" onValueChange={setActiveTab}>
        <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* Custom Tab List */}
          <div className="border-b bg-white px-6 pt-2">
            <TabsList className="h-auto gap-8 bg-transparent p-0">
              <TabsTrigger
                value="products"
                className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <div className="flex items-center gap-2">
                  <Package size={16} /> Katalog Produk (Public)
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="units"
                className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <div className="flex items-center gap-2">
                  <Scales size={16} /> Satuan (UoM)
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="locations"
                className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <div className="flex items-center gap-2">
                  <MapPin size={16} /> Lokasi Gudang
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-4 border-b bg-slate-50/50 p-4">
            <div className="relative w-full md:w-96">
              <MagnifyingGlass className="absolute top-2.5 left-3 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Cari data..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
              />
            </div>
          </div>

          {/* Products Tab */}
          <TabsContent value="products" className="m-0 p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-slate-50/50 font-medium text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Produk</th>
                    <th className="px-6 py-4">SKU</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4">Harga Public</th>
                    <th className="px-6 py-4">Status Web</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((item) => (
                    <tr key={item.id} className="transition-colors hover:bg-slate-50/80">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded bg-slate-100 text-slate-400">
                            <ImageIcon size={18} />
                          </div>
                          <span className="font-semibold text-slate-800">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{item.sku}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-800">Rp {item.price.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                            item.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.status === 'Published' && <Globe size={12} weight="fill" />}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="rounded-md p-2 text-blue-600 transition-colors hover:bg-blue-50"
                          >
                            <PencilSimple size={16} weight="bold" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(item.id)}
                            className="rounded-md p-2 text-primary transition-colors hover:bg-red-50"
                          >
                            <Trash size={16} weight="bold" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between border-t bg-slate-50/30 p-4 text-xs text-slate-600">
              <span className="font-medium">
                Menampilkan {filteredProducts.length} dari {products.length} baris
              </span>
              <div className="flex gap-4">
                <button
                  disabled
                  className="flex h-8 items-center gap-1 border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  <CaretLeft size={14} weight="bold" /> Previous
                </button>
                <button className="flex h-8 items-center gap-1 border-slate-300 bg-white text-xs font-medium text-slate-700 hover:text-slate-900">
                  Next <CaretRight size={14} weight="bold" />
                </button>
              </div>
            </div>
          </TabsContent>

          {/* Units Tab */}
          <TabsContent value="units" className="m-0 p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-slate-50/50 font-medium text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Kode</th>
                    <th className="px-6 py-4">Nama Satuan</th>
                    <th className="px-6 py-4">Tipe</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUnits.map((item) => (
                    <tr key={item.id} className="transition-colors hover:bg-slate-50/80">
                      <td className="px-6 py-4 font-bold text-slate-800">{item.code}</td>
                      <td className="px-6 py-4 text-slate-700">{item.name}</td>
                      <td className="px-6 py-4 text-slate-600">{item.type}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="rounded-md p-2 text-blue-600 transition-colors hover:bg-blue-50"
                          >
                            <PencilSimple size={16} weight="bold" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(item.id)}
                            className="rounded-md p-2 text-primary transition-colors hover:bg-red-50"
                          >
                            <Trash size={16} weight="bold" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between border-t bg-slate-50/30 p-4 text-xs text-slate-600">
              <span className="font-medium">
                Menampilkan {filteredUnits.length} dari {units.length} baris
              </span>
              <div className="flex gap-4">
                <button
                  disabled
                  className="flex h-8 items-center gap-1 border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  <CaretLeft size={14} weight="bold" /> Previous
                </button>
                <button className="flex h-8 items-center gap-1 border-slate-300 bg-white text-xs font-medium text-slate-700 hover:text-slate-900">
                  Next <CaretRight size={14} weight="bold" />
                </button>
              </div>
            </div>
          </TabsContent>

          {/* Locations Tab */}
          <TabsContent value="locations" className="m-0 p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-slate-50/50 font-medium text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Kode Lokasi</th>
                    <th className="px-6 py-4">Nama Gudang</th>
                    <th className="px-6 py-4">Kapasitas</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLocations.map((item) => (
                    <tr key={item.id} className="transition-colors hover:bg-slate-50/80">
                      <td className="px-6 py-4 font-bold text-slate-800">{item.code}</td>
                      <td className="px-6 py-4 text-slate-700">{item.name}</td>
                      <td className="px-6 py-4 text-slate-600">{item.capacity}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="rounded-md p-2 text-blue-600 transition-colors hover:bg-blue-50"
                          >
                            <PencilSimple size={16} weight="bold" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(item.id)}
                            className="rounded-md p-2 text-primary transition-colors hover:bg-red-50"
                          >
                            <Trash size={16} weight="bold" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between border-t bg-slate-50/30 p-4 text-xs text-slate-600">
              <span className="font-medium">
                Menampilkan {filteredLocations.length} dari {locations.length} baris
              </span>
              <div className="flex gap-4">
                <button
                  disabled
                  className="flex h-8 items-center gap-1 border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  <CaretLeft size={14} weight="bold" /> Previous
                </button>
                <button className="flex h-8 items-center gap-1 border-slate-300 bg-white text-xs font-medium text-slate-700 hover:text-slate-900">
                  Next <CaretRight size={14} weight="bold" />
                </button>
              </div>
            </div>
          </TabsContent>
        </Card>
      </Tabs>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-0 shadow-xl">
            <div className="border-b p-6 pb-4">
              <h2 className="text-xl font-bold text-slate-900">{getModalTitle()}</h2>
              <p className="text-sm text-slate-500">
                {editingItem ? 'Perbarui informasi data master' : 'Tambahkan data baru ke sistem'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              {activeTab === 'products' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Nama Produk</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Saos Sambal"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">SKU / Kode</label>
                      <input
                        type="text"
                        required
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        placeholder="SSB-001"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Harga Jual (Public)</label>
                      <input
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="15000"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Kategori</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                      >
                        <option value="Finished Goods">Barang Jadi</option>
                        <option value="Raw Material">Bahan Baku</option>
                        <option value="Packaging">Packaging</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <Globe size={18} className="text-blue-600" />
                      <label className="text-sm font-medium text-slate-700">Tampilkan di Website?</label>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.isPublic}
                      onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                      className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </>
              )}

              {activeTab === 'units' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Kode Satuan</label>
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="KG"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Nama Satuan</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Kilogram"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'locations' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Kode Lokasi</label>
                      <input
                        type="text"
                        required
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        placeholder="WH-A"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Nama Gudang</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Gudang Bahan"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Kapasitas</label>
                    <input
                      type="text"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      placeholder="1000 Pallet"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 border-t pt-4">
                <Button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingItem(null)
                  }}
                  className="bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  Batal
                </Button>
                <Button type="submit">{editingItem ? 'Update Data' : 'Simpan Data'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Warning size={24} className="text-primary" weight="bold" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-slate-900">Hapus Data?</h3>
            <p className="mb-6 text-sm text-slate-600">
              Aksi ini tidak dapat dibatalkan. Data akan dihapus permanen dari sistem.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => {
                  setShowDeleteDialog(false)
                  setDeletingId(null)
                }}
                className="bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                Batal
              </Button>
              <Button onClick={confirmDelete}>Ya, Hapus</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
