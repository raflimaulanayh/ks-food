'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { MagnifyingGlass, DownloadSimple } from '@phosphor-icons/react'
import { useState } from 'react'

import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { Card, CardContent } from '@/components/atoms/ui/card'
import { Input } from '@/components/atoms/ui/input'
import { Container } from '@/components/templates/container'

interface SOP {
  id: string
  title: string
  category: string
  steps: string[]
  safetyNotes: string[]
  equipment: string[]
}

interface Recipe {
  id: string
  productName: string
  ingredients: { name: string; quantity: number; unit: string }[]
  steps: string[]
  yield: { quantity: number; unit: string }
  qualityStandards: string[]
}

const mockSOPs: SOP[] = [
  {
    id: 'sop-001',
    title: 'SOP Produksi Sambal',
    category: 'Produksi',
    steps: [
      'Persiapan bahan baku (cabai, bawang, dll)',
      'Proses pencucian dan sanitasi',
      'Penggilingan/blending bahan',
      'Proses pemasakan dengan suhu 85-90°C',
      'Pengemasan dalam kondisi panas',
      'Labeling dan quality check'
    ],
    safetyNotes: ['Gunakan APD lengkap', 'Pastikan ventilasi baik saat memasak', 'Hindari kontak langsung dengan cabai'],
    equipment: ['Blender industrial', 'Kompor gas', 'Thermometer', 'Sealer kemasan']
  },
  {
    id: 'sop-002',
    title: 'SOP Sanitasi Area Produksi',
    category: 'Hygiene',
    steps: [
      'Bersihkan area sebelum produksi',
      'Sanitasi equipment dengan chlorine 200ppm',
      'Bilas dengan air bersih',
      'Keringkan dengan lap steril'
    ],
    safetyNotes: ['Gunakan sarung tangan', 'Pastikan ruangan ter-ventilasi'],
    equipment: ['Spray sanitizer', 'Lap microfiber', 'Chlorine solution']
  }
]

const mockRecipes: Recipe[] = [
  {
    id: 'rec-001',
    productName: 'Sambal Bawang Original',
    ingredients: [
      { name: 'Cabai merah keriting', quantity: 5, unit: 'kg' },
      { name: 'Bawang putih', quantity: 2, unit: 'kg' },
      { name: 'Gula pasir', quantity: 800, unit: 'gram' },
      { name: 'Garam', quantity: 500, unit: 'gram' },
      { name: 'Cuka', quantity: 200, unit: 'ml' }
    ],
    steps: [
      'Cuci bersih cabai dan bawang putih',
      'Blender cabai dan bawang sampai halus',
      'Masak dengan api sedang sambil diaduk',
      'Tambahkan gula, garam, dan cuka',
      'Masak hingga mengental (±30 menit)',
      'Cek pH (harus 3.5-4.0)',
      'Kemas dalam kondisi panas'
    ],
    yield: { quantity: 8, unit: 'kg' },
    qualityStandards: ['Warna merah cerah', 'pH 3.5-4.0', 'Tekstur kental tidak terlalu cair', 'Aroma harum']
  },
  {
    id: 'rec-002',
    productName: 'Saus Tomat Premium',
    ingredients: [
      { name: 'Tomat segar', quantity: 10, unit: 'kg' },
      { name: 'Gula pasir', quantity: 1, unit: 'kg' },
      { name: 'Garam', quantity: 300, unit: 'gram' },
      { name: 'Cuka', quantity: 150, unit: 'ml' }
    ],
    steps: [
      'Cuci dan potong tomat',
      'Blender tomat sampai halus',
      'Saring untuk memisahkan biji',
      'Masak dengan api sedang',
      'Tambahkan gula, garam, cuka',
      'Masak sampai kental (±45 menit)',
      'Kemas dalam kondisi panas'
    ],
    yield: { quantity: 7, unit: 'liter' },
    qualityStandards: ['Warna merah segar', 'Rasa manis asam seimbang', 'Tidak ada biji', 'Tekstur smooth']
  }
]

export default function SOPRecipePage() {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'sop' | 'recipe'>('sop')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredSOPs = mockSOPs.filter((sop) => sop.title.toLowerCase().includes(searchQuery.toLowerCase()))
  const filteredRecipes = mockRecipes.filter((recipe) =>
    recipe.productName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!user) return null
  const isAuthorized = user.role === 'PRODUCTION' || user.role === 'ADMIN'
  if (!isAuthorized) {
    return (
      <Container>
        <div className="py-20 text-center">
          <p className="text-slate-500">Anda tidak memiliki akses ke halaman ini.</p>
        </div>
      </Container>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">SOP & Resep Produksi</h1>
        <p className="text-sm text-slate-500">Dokumentasi prosedur dan resep produk</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('sop')}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'sop' ? 'border-primary text-primary' : 'border-transparent text-slate-500'
          }`}
        >
          SOP ({mockSOPs.length})
        </button>
        <button
          onClick={() => setActiveTab('recipe')}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'recipe' ? 'border-primary text-primary' : 'border-transparent text-slate-500'
          }`}
        >
          Resep ({mockRecipes.length})
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <MagnifyingGlass size={18} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Cari ${activeTab === 'sop' ? 'SOP' : 'resep'}...`}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'sop' &&
          filteredSOPs.map((sop) => (
            <Card key={sop.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{sop.title}</h3>
                      <Badge variant="outline" className="bg-blue-100 text-blue-700">
                        {sop.category}
                      </Badge>
                    </div>
                    {expandedId === sop.id ? (
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="mb-1 font-semibold text-slate-700">Langkah-langkah:</p>
                          <ol className="list-inside list-decimal space-y-1 text-slate-600">
                            {sop.steps.map((step, i) => (
                              <li key={i}>{step}</li>
                            ))}
                          </ol>
                        </div>
                        <div>
                          <p className="mb-1 font-semibold text-slate-700">Equipment:</p>
                          <ul className="list-inside list-disc space-y-1 text-slate-600">
                            {sop.equipment.map((eq, i) => (
                              <li key={i}>{eq}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="mb-1 font-semibold text-red-600">⚠️ Safety Notes:</p>
                          <ul className="list-inside list-disc space-y-1 text-slate-600">
                            {sop.safetyNotes.map((note, i) => (
                              <li key={i}>{note}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600">{sop.steps.length} langkah</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline-red"
                      onClick={() => setExpandedId(expandedId === sop.id ? null : sop.id)}
                    >
                      {expandedId === sop.id ? 'Tutup' : 'Lihat'}
                    </Button>
                    <Button size="sm" variant="outline-red">
                      <DownloadSimple size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

        {activeTab === 'recipe' &&
          filteredRecipes.map((recipe) => (
            <Card key={recipe.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="mb-2 font-semibold text-slate-900">{recipe.productName}</h3>
                    {expandedId === recipe.id ? (
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="mb-1 font-semibold text-slate-700">Bahan:</p>
                          <ul className="list-inside list-disc space-y-1 text-slate-600">
                            {recipe.ingredients.map((ing, i) => (
                              <li key={i}>
                                {ing.name}: {ing.quantity} {ing.unit}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="mb-1 font-semibold text-slate-700">Cara Pembuatan:</p>
                          <ol className="list-inside list-decimal space-y-1 text-slate-600">
                            {recipe.steps.map((step, i) => (
                              <li key={i}>{step}</li>
                            ))}
                          </ol>
                        </div>
                        <div>
                          <p className="mb-1 font-semibold text-slate-700">Hasil:</p>
                          <p className="text-slate-600">
                            {recipe.yield.quantity} {recipe.yield.unit}
                          </p>
                        </div>
                        <div>
                          <p className="mb-1 font-semibold text-green-600">✓ Standar Kualitas:</p>
                          <ul className="list-inside list-disc space-y-1 text-slate-600">
                            {recipe.qualityStandards.map((std, i) => (
                              <li key={i}>{std}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600">
                        {recipe.ingredients.length} bahan • Yield: {recipe.yield.quantity} {recipe.yield.unit}
                      </p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline-red"
                    onClick={() => setExpandedId(expandedId === recipe.id ? null : recipe.id)}
                  >
                    {expandedId === recipe.id ? 'Tutup' : 'Lihat'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}
