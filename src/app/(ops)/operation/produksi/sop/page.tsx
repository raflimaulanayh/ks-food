'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { BookOpen, MagnifyingGlass, ArrowLeft, FileText, Video, Clock, Thermometer, ListChecks } from '@phosphor-icons/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import { Input } from '@/components/atoms/ui/input'

import { cn } from '@/utils/cn'

// Mock Data - SOP & Recipes
interface SOPStep {
  step: number
  instruction: string
  duration?: string
  temperature?: string
  notes?: string
}

interface SOPDocument {
  id: string
  title: string
  category: 'resep' | 'sop-produksi' | 'sop-keselamatan' | 'sop-kebersihan'
  productName?: string
  version: string
  lastUpdated: string
  difficulty: 'mudah' | 'sedang' | 'sulit'
  estimatedTime: string
  hasVideo: boolean
  steps: SOPStep[]
  ingredients?: {
    name: string
    qty: number
    unit: string
  }[]
  equipment?: string[]
  safetyNotes?: string[]
}

const MOCK_SOP_DATA: SOPDocument[] = [
  {
    id: '1',
    title: 'Resep Saos Sambal Bawang 500ml',
    category: 'resep',
    productName: 'Saos Sambal Bawang 500ml',
    version: 'v2.1',
    lastUpdated: '2025-12-15',
    difficulty: 'sedang',
    estimatedTime: '2 jam',
    hasVideo: true,
    ingredients: [
      { name: 'Cabai Rawit Merah', qty: 500, unit: 'gram' },
      { name: 'Bawang Putih', qty: 100, unit: 'gram' },
      { name: 'Garam Halus', qty: 50, unit: 'gram' },
      { name: 'Gula Pasir', qty: 30, unit: 'gram' },
      { name: 'Cuka', qty: 20, unit: 'ml' }
    ],
    equipment: ['Blender Industrial', 'Wajan Besar', 'Termometer Digital', 'Timbangan Digital'],
    steps: [
      {
        step: 1,
        instruction: 'Cuci bersih cabai dan bawang putih, tiriskan hingga kering',
        duration: '15 menit'
      },
      {
        step: 2,
        instruction: 'Blender cabai dan bawang putih hingga halus, tambahkan sedikit air jika perlu',
        duration: '10 menit'
      },
      {
        step: 3,
        instruction: 'Panaskan wajan, masukkan hasil blender. Masak dengan api sedang',
        temperature: '95-98°C',
        duration: '45 menit',
        notes: 'Aduk terus agar tidak gosong'
      },
      {
        step: 4,
        instruction: 'Tambahkan garam, gula, dan cuka. Aduk rata',
        duration: '10 menit'
      },
      {
        step: 5,
        instruction: 'Cek viskositas dengan sendok. Jika sudah kental, matikan api',
        notes: 'Target viskositas: 120 cP (panas)'
      },
      {
        step: 6,
        instruction: 'Dinginkan hingga suhu 60°C, lalu kemas dalam botol steril',
        temperature: '60°C',
        duration: '30 menit'
      }
    ],
    safetyNotes: [
      'Gunakan sarung tangan saat menangani cabai',
      'Pastikan ruangan berventilasi baik',
      'Jangan menyentuh mata setelah memegang cabai'
    ]
  },
  {
    id: '2',
    title: 'SOP Pembersihan Mesin Blender',
    category: 'sop-kebersihan',
    version: 'v1.3',
    lastUpdated: '2025-11-20',
    difficulty: 'mudah',
    estimatedTime: '30 menit',
    hasVideo: false,
    equipment: ['Sikat Pembersih', 'Detergen Food Grade', 'Air Panas', 'Kain Microfiber'],
    steps: [
      {
        step: 1,
        instruction: 'Matikan dan cabut kabel listrik mesin blender',
        notes: 'WAJIB! Untuk keselamatan'
      },
      {
        step: 2,
        instruction: 'Lepas pisau blender dengan hati-hati menggunakan kunci pas',
        duration: '5 menit'
      },
      {
        step: 3,
        instruction: 'Rendam pisau dalam air panas + detergen food grade',
        temperature: '70-80°C',
        duration: '10 menit'
      },
      {
        step: 4,
        instruction: 'Sikat bagian dalam wadah blender hingga bersih',
        duration: '10 menit'
      },
      {
        step: 5,
        instruction: 'Bilas dengan air mengalir hingga tidak ada sisa detergen',
        duration: '5 menit'
      },
      {
        step: 6,
        instruction: 'Keringkan dengan kain microfiber atau angin-anginkan',
        notes: 'Pastikan benar-benar kering sebelum digunakan kembali'
      }
    ],
    safetyNotes: ['Hati-hati dengan pisau yang tajam', 'Pastikan mesin tidak terhubung listrik saat dibersihkan']
  },
  {
    id: '3',
    title: 'SOP Keselamatan Kerja di Lantai Produksi',
    category: 'sop-keselamatan',
    version: 'v2.0',
    lastUpdated: '2026-01-01',
    difficulty: 'mudah',
    estimatedTime: '10 menit (baca)',
    hasVideo: true,
    steps: [
      {
        step: 1,
        instruction: 'Gunakan APD lengkap: hairnet, masker, sarung tangan, sepatu safety',
        notes: 'WAJIB sebelum memasuki area produksi'
      },
      {
        step: 2,
        instruction: 'Cuci tangan dengan sabun antiseptik minimal 20 detik',
        duration: '20 detik'
      },
      {
        step: 3,
        instruction: 'Periksa kondisi mesin sebelum digunakan',
        notes: 'Laporkan jika ada kerusakan'
      },
      {
        step: 4,
        instruction: 'Jangan makan, minum, atau merokok di area produksi',
        notes: 'Gunakan area istirahat yang telah disediakan'
      },
      {
        step: 5,
        instruction: 'Laporkan segera jika terjadi kecelakaan kerja atau near-miss',
        notes: 'Hubungi supervisor atau HSE officer'
      }
    ],
    safetyNotes: [
      'Keselamatan adalah prioritas utama',
      'Jika ragu, tanyakan kepada supervisor',
      'Ikuti semua rambu dan petunjuk keselamatan'
    ]
  }
]

export default function SOPPage() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [sopData, setSOPData] = useState<SOPDocument[]>(MOCK_SOP_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'resep' | 'sop-produksi' | 'sop-keselamatan' | 'sop-kebersihan'
  >('all')
  const [selectedSOP, setSelectedSOP] = useState<SOPDocument | null>(null)

  useEffect(() => {
    if (!user) {
      router.push('/operation/login')
    }
  }, [user, router])

  if (!user) return null

  // Filter logic
  const filteredSOP = sopData.filter((sop) => {
    const matchSearch = sop.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = selectedCategory === 'all' || sop.category === selectedCategory

    return matchSearch && matchCategory
  })

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'resep':
        return 'Resep Produk'
      case 'sop-produksi':
        return 'SOP Produksi'
      case 'sop-keselamatan':
        return 'SOP Keselamatan'
      case 'sop-kebersihan':
        return 'SOP Kebersihan'
      default:
        return category
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'mudah':
        return 'bg-green-100 text-green-700'
      case 'sedang':
        return 'bg-amber-100 text-amber-700'
      case 'sulit':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  // Detail View
  if (selectedSOP) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
            <Button variant="outline-red" size="icon" onClick={() => setSelectedSOP(null)} className="h-10 w-10">
              <ArrowLeft size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-slate-900">{selectedSOP.title}</h1>
              <p className="text-sm text-slate-500">
                {getCategoryLabel(selectedSOP.category)} • {selectedSOP.version}
              </p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-4 py-6">
          {/* Document Info */}
          <Card className="mb-6 border-2 border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className={getDifficultyColor(selectedSOP.difficulty)}>
                  {selectedSOP.difficulty === 'mudah' && 'Mudah'}
                  {selectedSOP.difficulty === 'sedang' && 'Sedang'}
                  {selectedSOP.difficulty === 'sulit' && 'Sulit'}
                </Badge>
                {selectedSOP.hasVideo && (
                  <Badge className="bg-blue-100 text-blue-700">
                    <Video size={14} className="mr-1" weight="fill" />
                    Ada Video
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock size={16} />
                <span>{selectedSOP.estimatedTime}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Versi:</span>
                <p className="font-semibold text-slate-900">{selectedSOP.version}</p>
              </div>
              <div>
                <span className="text-slate-600">Update Terakhir:</span>
                <p className="font-semibold text-slate-900">
                  {new Date(selectedSOP.lastUpdated).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
          </Card>

          {/* Ingredients (if recipe) */}
          {selectedSOP.ingredients && (
            <Card className="mb-6 border-2 border-emerald-200 bg-emerald-50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                <ListChecks size={20} className="text-emerald-600" />
                Bahan-Bahan
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {selectedSOP.ingredients.map((ing, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-lg bg-white p-3 text-sm">
                    <span className="text-slate-700">{ing.name}</span>
                    <span className="font-semibold text-slate-900">
                      {ing.qty} {ing.unit}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Equipment */}
          {selectedSOP.equipment && (
            <Card className="mb-6 border-2 border-blue-200 bg-blue-50 p-6">
              <h3 className="mb-4 text-lg font-bold text-slate-900">Peralatan yang Dibutuhkan</h3>
              <div className="grid grid-cols-2 gap-2">
                {selectedSOP.equipment.map((eq, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                    {eq}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Steps */}
          <Card className="mb-6 border-2 border-slate-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Langkah-Langkah</h3>
            <div className="space-y-4">
              {selectedSOP.steps.map((step) => (
                <div key={step.step} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <p className="mb-2 text-slate-900">{step.instruction}</p>

                    <div className="flex flex-wrap gap-3 text-xs">
                      {step.duration && (
                        <div className="flex items-center gap-1 text-slate-600">
                          <Clock size={14} />
                          <span>{step.duration}</span>
                        </div>
                      )}
                      {step.temperature && (
                        <div className="flex items-center gap-1 text-amber-600">
                          <Thermometer size={14} />
                          <span>{step.temperature}</span>
                        </div>
                      )}
                    </div>

                    {step.notes && (
                      <div className="mt-2 rounded-lg bg-amber-50 p-2 text-xs text-amber-900">
                        💡 <strong>Catatan:</strong> {step.notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Safety Notes */}
          {selectedSOP.safetyNotes && (
            <Card className="border-2 border-red-200 bg-red-50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-red-900">⚠️ Catatan Keselamatan</h3>
              <ul className="space-y-2">
                {selectedSOP.safetyNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-red-900">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {note}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </main>
      </div>
    )
  }

  // List View
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
          <Link href="/operation">
            <Button variant="outline-red" size="icon" className="h-10 w-10">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-900">SOP & Resep</h1>
            <p className="text-sm text-slate-500">Knowledge Base - Tim Produksi</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <BookOpen size={20} weight="bold" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Search & Filter */}
        <Card className="mb-6 border-slate-200 bg-white p-4">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <MagnifyingGlass size={18} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Cari SOP atau resep..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 pl-10"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              size="sm"
            >
              Semua
            </Button>
            <Button
              variant={selectedCategory === 'resep' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('resep')}
              size="sm"
            >
              Resep
            </Button>
            <Button
              variant={selectedCategory === 'sop-produksi' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('sop-produksi')}
              size="sm"
            >
              SOP Produksi
            </Button>
            <Button
              variant={selectedCategory === 'sop-keselamatan' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('sop-keselamatan')}
              size="sm"
            >
              Keselamatan
            </Button>
            <Button
              variant={selectedCategory === 'sop-kebersihan' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('sop-kebersihan')}
              size="sm"
            >
              Kebersihan
            </Button>
          </div>
        </Card>

        {/* SOP List */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">Dokumen Tersedia</h2>
          <p className="text-sm text-slate-600">{filteredSOP.length} dokumen ditemukan</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredSOP.map((sop) => (
            <Card
              key={sop.id}
              onClick={() => setSelectedSOP(sop)}
              className="cursor-pointer border-2 border-slate-200 p-4 transition-all hover:border-emerald-400 hover:shadow-md active:scale-[0.99]"
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="mb-2 font-bold text-slate-900">{sop.title}</h3>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge className="bg-slate-100 text-xs text-slate-700">{getCategoryLabel(sop.category)}</Badge>
                    <Badge className={cn('text-xs', getDifficultyColor(sop.difficulty))}>
                      {sop.difficulty === 'mudah' && 'Mudah'}
                      {sop.difficulty === 'sedang' && 'Sedang'}
                      {sop.difficulty === 'sulit' && 'Sulit'}
                    </Badge>
                    {sop.hasVideo && (
                      <Badge className="bg-blue-100 text-xs text-blue-700">
                        <Video size={12} className="mr-1" weight="fill" />
                        Video
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                  <FileText size={24} className="text-emerald-600" weight="duotone" />
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{sop.estimatedTime}</span>
                </div>
                <span>•</span>
                <span>{sop.version}</span>
                <span>•</span>
                <span>{sop.steps.length} langkah</span>
              </div>
            </Card>
          ))}

          {filteredSOP.length === 0 && (
            <Card className="col-span-full border-2 border-dashed border-slate-300 bg-slate-50 p-12">
              <div className="text-center">
                <BookOpen size={48} className="mx-auto mb-3 text-slate-400" weight="duotone" />
                <p className="text-sm text-slate-600">Tidak ada dokumen yang ditemukan</p>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
