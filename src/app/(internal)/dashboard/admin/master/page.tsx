'use client'

import {
  ITEM_CATEGORIES,
  type ItemCategory,
  type Product,
  PRODUCTS,
  type UnitOfMeasure,
  UNITS_OF_MEASURE,
  type WarehouseLocation,
  WAREHOUSE_LOCATIONS
} from '@/data/mock-admin'
import { ImageSquare, PencilSimple, Plus, Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/atoms/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'

import { cn } from '@/utils/cn'

type TabName = 'products' | 'uom' | 'categories' | 'locations'

export default function DataMasterPage() {
  const [activeTab, setActiveTab] = useState<TabName>('products')

  // Products state
  const [products, setProducts] = useState<Product[]>(PRODUCTS)
  const [showProductDialog, setShowProductDialog] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [productForm, setProductForm] = useState({
    name: '',
    sku: '',
    category: 'Finished Goods',
    price: 0,
    description: '',
    image: '',
    status: 'Draft' as 'Published' | 'Draft'
  })

  // UoM state
  const [units, setUnits] = useState<UnitOfMeasure[]>(UNITS_OF_MEASURE)
  const [showUomDialog, setShowUomDialog] = useState(false)
  const [uomForm, setUomForm] = useState({ code: '', name: '', type: 'Mass' as const })

  // Categories state
  const [categories, setCategories] = useState<ItemCategory[]>(ITEM_CATEGORIES)
  const [showCategoryDialog, setShowCategoryDialog] = useState(false)
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '' })

  // Locations state
  const [locations, setLocations] = useState<WarehouseLocation[]>(WAREHOUSE_LOCATIONS)
  const [showLocationDialog, setShowLocationDialog] = useState(false)
  const [locationForm, setLocationForm] = useState({ code: '', name: '', capacity: '' })

  // Product handlers
  const handleAddProduct = () => {
    setEditingProduct(null)
    setProductForm({ name: '', sku: '', category: 'Finished Goods', price: 0, description: '', image: '', status: 'Draft' })
    setShowProductDialog(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setProductForm(product)
    setShowProductDialog(true)
  }

  const handleSaveProduct = () => {
    if (!productForm.name || !productForm.sku) {
      toast.error('Form tidak lengkap!')

      return
    }

    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...p, ...productForm } : p)))
      toast.success('Produk berhasil diupdate!', { description: productForm.name })
    } else {
      const newProduct: Product = { id: `PROD-${Date.now()}`, ...productForm }
      setProducts([...products, newProduct])
      toast.success('Produk berhasil ditambahkan!', { description: productForm.name })
    }
    setShowProductDialog(false)
  }

  const handleToggleProductStatus = (product: Product) => {
    const newStatus = product.status === 'Published' ? 'Draft' : 'Published'
    setProducts(products.map((p) => (p.id === product.id ? { ...p, status: newStatus } : p)))
    toast.success(newStatus === 'Published' ? 'Produk dipublikasikan!' : 'Produk dijadikan draft', {
      description: product.name
    })
  }

  const handleDeleteProduct = (product: Product) => {
    setProducts(products.filter((p) => p.id !== product.id))
    toast.success('Produk dihapus!', { description: product.name })
  }

  // UoM handlers
  const handleSaveUom = () => {
    if (!uomForm.code || !uomForm.name) {
      toast.error('Form tidak lengkap!')

      return
    }

    const newUom: UnitOfMeasure = { id: `UOM-${Date.now()}`, ...uomForm }
    setUnits([...units, newUom])
    toast.success('Satuan baru disimpan!', { description: uomForm.code })
    setShowUomDialog(false)
    setUomForm({ code: '', name: '', type: 'Mass' })
  }

  // Category handlers
  const handleSaveCategory = () => {
    if (!categoryForm.name) {
      toast.error('Nama kategori wajib diisi!')

      return
    }

    const newCategory: ItemCategory = { id: `CAT-${Date.now()}`, ...categoryForm }
    setCategories([...categories, newCategory])
    toast.success('Kategori baru disimpan!', { description: categoryForm.name })
    setShowCategoryDialog(false)
    setCategoryForm({ name: '', description: '' })
  }

  // Location handlers
  const handleSaveLocation = () => {
    if (!locationForm.code || !locationForm.name) {
      toast.error('Form tidak lengkap!')

      return
    }

    const newLocation: WarehouseLocation = { id: `LOC-${Date.now()}`, ...locationForm }
    setLocations([...locations, newLocation])
    toast.success('Lokasi gudang baru disimpan!', { description: locationForm.name })
    setShowLocationDialog(false)
    setLocationForm({ code: '', name: '', capacity: '' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Data Master & Referensi</h1>
        <p className="mt-2 text-slate-600">Kelola katalog produk dan data referensi sistem</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabName)} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">Katalog Produk (Public)</TabsTrigger>
          <TabsTrigger value="uom">Satuan (UoM)</TabsTrigger>
          <TabsTrigger value="categories">Kategori Barang</TabsTrigger>
          <TabsTrigger value="locations">Lokasi Gudang</TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-end pb-4">
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-white shadow-md transition-all hover:bg-red-700"
            >
              <Plus size={20} weight="bold" />
              Tambah Produk
            </button>
          </div>

          <div className="rounded-xl border-2 border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Image</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">SKU</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Category</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Price</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200">
                          {product.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                                e.currentTarget.nextElementSibling?.classList.remove('hidden')
                              }}
                            />
                          ) : null}
                          <div
                            className={cn(
                              'flex h-full w-full items-center justify-center bg-slate-100 text-slate-400',
                              product.image ? 'hidden' : ''
                            )}
                          >
                            <ImageSquare size={24} weight="duotone" />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-900">{product.name}</p>
                        <p className="text-xs text-slate-500">{product.description}</p>
                      </td>
                      <td className="px-4 py-3 font-mono text-sm text-slate-600">{product.sku}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-900">
                        Rp {product.price.toLocaleString('id-ID')}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleToggleProductStatus(product)}
                          className={cn(
                            'rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                            product.status === 'Published'
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                          )}
                        >
                          {product.status}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="rounded-lg bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
                          >
                            <PencilSimple size={16} weight="bold" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product)}
                            className="rounded-lg bg-red-600 p-2 text-white transition-colors hover:bg-red-700"
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
          </div>
        </TabsContent>

        {/* UoM Tab */}
        <TabsContent value="uom" className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowUomDialog(true)}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-white shadow-md transition-all hover:bg-red-700"
            >
              <Plus size={20} weight="bold" />
              Tambah Satuan
            </button>
          </div>

          <div className="rounded-xl border-2 border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Code</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {units.map((unit) => (
                    <tr key={unit.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-semibold text-slate-900">{unit.code}</td>
                      <td className="px-4 py-3 text-slate-700">{unit.name}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-700">
                          {unit.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowCategoryDialog(true)}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-white shadow-md transition-all hover:bg-red-700"
            >
              <Plus size={20} weight="bold" />
              Tambah Kategori
            </button>
          </div>

          <div className="rounded-xl border-2 border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono text-sm text-slate-600">{category.id}</td>
                      <td className="px-4 py-3 font-semibold text-slate-900">{category.name}</td>
                      <td className="px-4 py-3 text-slate-700">{category.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Locations Tab */}
        <TabsContent value="locations" className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowLocationDialog(true)}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-white shadow-md transition-all hover:bg-red-700"
            >
              <Plus size={20} weight="bold" />
              Tambah Lokasi
            </button>
          </div>

          <div className="rounded-xl border-2 border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Code</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Name</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Capacity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {locations.map((location) => (
                    <tr key={location.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-semibold text-slate-900">{location.code}</td>
                      <td className="px-4 py-3 text-slate-900">{location.name}</td>
                      <td className="px-4 py-3 text-right font-medium text-slate-700">{location.capacity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Product Dialog */}
      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Nama Produk</label>
              <input
                type="text"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                className="w-full rounded-lg border-2 border-slate-300 px-4 py-2 transition-colors focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">SKU</label>
              <input
                type="text"
                value={productForm.sku}
                onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                className="w-full rounded-lg border-2 border-slate-300 px-4 py-2 transition-colors focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Category</label>
              <select
                value={productForm.category}
                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                className="w-full rounded-lg border-2 border-slate-300 px-4 py-2 transition-colors focus:border-primary focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Harga (Rp)</label>
              <input
                type="number"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                className="w-full rounded-lg border-2 border-slate-300 px-4 py-2 transition-colors focus:border-primary focus:outline-none"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Deskripsi</label>
              <textarea
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                rows={3}
                className="w-full rounded-lg border-2 border-slate-300 px-4 py-2 transition-colors focus:border-primary focus:outline-none"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Image URL</label>
              <input
                type="text"
                value={productForm.image}
                onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                className="w-full rounded-lg border-2 border-slate-300 px-4 py-2 transition-colors focus:border-primary focus:outline-none"
              />
            </div>
            <div className="col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={productForm.status === 'Published'}
                  onChange={(e) => setProductForm({ ...productForm, status: e.target.checked ? 'Published' : 'Draft' })}
                  className="h-4 w-4"
                />
                <span className="font-semibold text-slate-700">Tampilkan di Website?</span>
              </label>
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setShowProductDialog(false)}
              className="rounded-lg border-2 border-slate-300 px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              onClick={handleSaveProduct}
              className="rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
            >
              {editingProduct ? 'Update' : 'Tambah'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* UoM Dialog */}
      <Dialog open={showUomDialog} onOpenChange={setShowUomDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah Satuan Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Code</label>
              <input
                type="text"
                value={uomForm.code}
                onChange={(e) => setUomForm({ ...uomForm, code: e.target.value.toUpperCase() })}
                placeholder="e.g. DRUM"
                className="w-full rounded-lg border-2 border-slate-300 px-4 py-2 transition-colors focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Nama</label>
              <input
                type="text"
                value={uomForm.name}
                onChange={(e) => setUomForm({ ...uomForm, name: e.target.value })}
                placeholder="e.g. Drum"
                className="w-full rounded-lg border-2 border-slate-300 px-4 py-2 transition-colors focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Type</label>
              <select
                value={uomForm.type}
                onChange={(e) => setUomForm({ ...uomForm, type: e.target.value as 'Mass' | 'Volume' | 'Count' | 'Length' })}
                className="w-full rounded-lg border-2 border-slate-300 px-4 py-2 transition-colors focus:border-primary focus:outline-none"
              >
                <option value="Mass">Mass</option>
                <option value="Volume">Volume</option>
                <option value="Count">Count</option>
                <option value="Length">Length</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setShowUomDialog(false)}
              className="rounded-lg border-2 border-slate-300 px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              onClick={handleSaveUom}
              className="rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
            >
              Tambah
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Category Dialog */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah Kategori Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Nama</label>
              <input
                type="text"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                className="w-full rounded-lg border-2 border-slate-300 px-4 py-2 transition-colors focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
              <textarea
                value={categoryForm.description}
                onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                rows={3}
                className="w-full rounded-lg border-2 border-slate-300 px-4 py-2 transition-colors focus:border-primary focus:outline-none"
              />
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setShowCategoryDialog(false)}
              className="rounded-lg border-2 border-slate-300 px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              onClick={handleSaveCategory}
              className="rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
            >
              Tambah
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Location Dialog */}
      <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah Lokasi Gudang</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Code</label>
              <input
                type="text"
                value={locationForm.code}
                onChange={(e) => setLocationForm({ ...locationForm, code: e.target.value })}
                placeholder="e.g. WH-C"
                className="w-full rounded-lg border-2 border-slate-300 px-4 py-2 transition-colors focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Nama</label>
              <input
                type="text"
                value={locationForm.name}
                onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
                placeholder="e.g. Gudang C"
                className="w-full rounded-lg border-2 border-slate-300 px-4 py-2 transition-colors focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Capacity</label>
              <input
                type="text"
                value={locationForm.capacity}
                onChange={(e) => setLocationForm({ ...locationForm, capacity: e.target.value })}
                placeholder="e.g. 300 Pallets"
                className="w-full rounded-lg border-2 border-slate-300 px-4 py-2 transition-colors focus:border-primary focus:outline-none"
              />
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setShowLocationDialog(false)}
              className="rounded-lg border-2 border-slate-300 px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              onClick={handleSaveLocation}
              className="rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
            >
              Tambah
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
