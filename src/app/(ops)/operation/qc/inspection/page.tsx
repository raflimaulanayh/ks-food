'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import {
  ClipboardText,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Thermometer,
  Eye,
  Wind,
  Package,
  Warning
} from '@phosphor-icons/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import { Input } from '@/components/atoms/ui/input'
import { Label } from '@/components/atoms/ui/label'
import { Textarea } from '@/components/atoms/ui/textarea'

import { cn } from '@/utils/cn'

// Mock Data - Incoming Materials for QC
interface IncomingMaterial {
  id: string
  poNumber: string
  materialName: string
  supplier: string
  qty: number
  unit: string
  arrivalDate: string
  status: 'waiting' | 'inspecting' | 'approved' | 'rejected'
  qcResult?: {
    inspector: string
    inspectionDate: string
    temperature?: number
    color: string
    smell: string
    texture: string
    notes: string
    decision: 'approved' | 'rejected'
  }
}

const MOCK_INCOMING_MATERIALS: IncomingMaterial[] = [
  {
    id: '1',
    poNumber: 'PO-2026-001',
    materialName: 'Cabai Rawit Merah',
    supplier: 'PT Maju Jaya Cabai',
    qty: 500,
    unit: 'Kg',
    arrivalDate: '2026-01-04',
    status: 'waiting'
  },
  {
    id: '2',
    poNumber: 'PO-2026-001',
    materialName: 'Cabai Keriting',
    supplier: 'PT Maju Jaya Cabai',
    qty: 300,
    unit: 'Kg',
    arrivalDate: '2026-01-04',
    status: 'waiting'
  },
  {
    id: '3',
    poNumber: 'PO-2026-002',
    materialName: 'Bawang Putih',
    supplier: 'CV Bawang Sejahtera',
    qty: 200,
    unit: 'Kg',
    arrivalDate: '2026-01-04',
    status: 'waiting'
  },
  {
    id: '4',
    poNumber: 'PO-2025-198',
    materialName: 'Garam Halus',
    supplier: 'UD Garam Laut',
    qty: 100,
    unit: 'Kg',
    arrivalDate: '2026-01-03',
    status: 'approved',
    qcResult: {
      inspector: 'Siti Nurhaliza',
      inspectionDate: '2026-01-03',
      temperature: 28,
      color: 'Putih bersih',
      smell: 'Normal, tidak berbau',
      texture: 'Halus, kering',
      notes: 'Kualitas baik, sesuai standar',
      decision: 'approved'
    }
  }
]

export default function QCInspectionPage() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [materials, setMaterials] = useState<IncomingMaterial[]>(MOCK_INCOMING_MATERIALS)
  const [selectedMaterial, setSelectedMaterial] = useState<IncomingMaterial | null>(null)
  const [inspecting, setInspecting] = useState(false)

  // QC Form State
  const [temperature, setTemperature] = useState('')
  const [color, setColor] = useState('')
  const [smell, setSmell] = useState('')
  const [texture, setTexture] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (!user) {
      router.push('/operation/login')
    }
  }, [user, router])

  if (!user) return null

  const handleStartInspection = (material: IncomingMaterial) => {
    setSelectedMaterial(material)
    setInspecting(true)
    // Reset form
    setTemperature('')
    setColor('')
    setSmell('')
    setTexture('')
    setNotes('')
  }

  const handleSubmitInspection = (decision: 'approved' | 'rejected') => {
    if (!color || !smell || !texture) {
      toast.error('Lengkapi pemeriksaan fisik', {
        description: 'Warna, Bau, dan Tekstur wajib diisi'
      })

      return
    }

    if (decision === 'rejected' && !notes) {
      toast.error('Alasan penolakan diperlukan', {
        description: 'Isi catatan untuk material yang ditolak'
      })

      return
    }

    // Update material status
    setMaterials((prev) =>
      prev.map((m) =>
        m.id === selectedMaterial?.id
          ? {
              ...m,
              status: decision,
              qcResult: {
                inspector: user.name,
                inspectionDate: new Date().toISOString().split('T')[0],
                temperature: temperature ? parseFloat(temperature) : undefined,
                color,
                smell,
                texture,
                notes,
                decision
              }
            }
          : m
      )
    )

    if (decision === 'approved') {
      toast.success('Material Disetujui!', {
        description: 'Gudang dapat melanjutkan penerimaan barang'
      })
    } else {
      toast.error('Material Ditolak', {
        description: 'Supplier akan dihubungi untuk pengembalian'
      })
    }

    // Reset
    setInspecting(false)
    setSelectedMaterial(null)
  }

  const handleViewDetail = (material: IncomingMaterial) => {
    setSelectedMaterial(material)
    setInspecting(false)
  }

  // List View
  if (!selectedMaterial) {
    return (
      <div className="min-h-screen bg-slate-50 pb-20">
        {/* Header - Improved */}
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
            <Link href="/operation">
              <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-slate-100">
                <ArrowLeft size={22} weight="bold" className="text-slate-700" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-slate-900">Inspeksi Bahan Baku</h1>
              <p className="text-xs text-slate-500">QC Inbound</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
              <ClipboardText size={22} weight="duotone" className="text-amber-600" />
            </div>
          </div>
        </header>

        {/* Material List */}
        <main className="mx-auto max-w-5xl px-4 py-4">
          <div className="mb-3">
            <h2 className="text-base font-bold text-slate-900">Bahan Baku Masuk</h2>
            <p className="text-xs text-slate-500">Periksa kualitas sebelum diterima gudang</p>
          </div>

          {/* Waiting Inspection */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-bold text-amber-600">Menunggu Inspeksi</h3>
            <div className="space-y-2">
              {materials
                .filter((m) => m.status === 'waiting')
                .map((material) => (
                  <Card
                    key={material.id}
                    className="border-2 border-amber-200 bg-white p-4 transition-all hover:border-primary hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-amber-700">{material.poNumber}</span>
                          <Badge className="shrink-0 bg-amber-100 text-xs text-amber-700">Menunggu</Badge>
                        </div>

                        <h3 className="mb-1 truncate text-base font-bold text-slate-900">{material.materialName}</h3>

                        <div className="mb-2 text-xs text-slate-600">
                          <span className="font-medium">Supplier:</span> {material.supplier}
                        </div>

                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-slate-600">
                            Qty:{' '}
                            <strong>
                              {material.qty} {material.unit}
                            </strong>
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500">
                            Tiba: {new Date(material.arrivalDate).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleStartInspection(material)}
                        size="sm"
                        className="h-9 shrink-0 gap-1.5 bg-amber-600 text-white! hover:bg-amber-700"
                      >
                        <ClipboardText size={16} weight="bold" />
                        <span className="text-xs">Inspeksi</span>
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </div>

          {/* Completed Inspection */}
          <div>
            <h3 className="mb-2 text-sm font-bold text-slate-600">Sudah Diinspeksi</h3>
            <div className="space-y-2">
              {materials
                .filter((m) => m.status === 'approved' || m.status === 'rejected')
                .map((material) => (
                  <Card
                    key={material.id}
                    onClick={() => handleViewDetail(material)}
                    className="cursor-pointer border-2 border-slate-200 bg-white p-4 transition-all hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold text-slate-600">{material.poNumber}</span>
                          <Badge
                            className={cn(
                              'shrink-0 text-xs',
                              material.status === 'approved' && 'bg-green-100 text-green-700',
                              material.status === 'rejected' && 'bg-red-100 text-red-700'
                            )}
                          >
                            {material.status === 'approved' ? 'Disetujui' : 'Ditolak'}
                          </Badge>
                        </div>

                        <h3 className="mb-1 truncate text-base font-bold text-slate-900">{material.materialName}</h3>

                        <div className="text-xs text-slate-500">
                          Inspektur: {material.qcResult?.inspector} •{' '}
                          {new Date(material.qcResult?.inspectionDate || '').toLocaleDateString('id-ID')}
                        </div>
                      </div>

                      <div
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                          material.status === 'approved' && 'bg-green-100',
                          material.status === 'rejected' && 'bg-red-100'
                        )}
                      >
                        {material.status === 'approved' ? (
                          <CheckCircle size={20} className="text-green-600" weight="fill" />
                        ) : (
                          <XCircle size={20} className="text-red-600" weight="fill" />
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Inspection Form View
  if (inspecting) {
    return (
      <div className="min-h-screen bg-slate-50 pb-20">
        {/* Header - Improved */}
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setInspecting(false)
                setSelectedMaterial(null)
              }}
              className="h-10 w-10 hover:bg-slate-100"
            >
              <ArrowLeft size={22} weight="bold" className="text-slate-700" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-slate-900">Form Inspeksi</h1>
              <p className="text-xs text-slate-500">{selectedMaterial.materialName}</p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-4">
          {/* Material Info */}
          <Card className="mb-4 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white p-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-slate-600">PO Number:</p>
                <p className="font-mono font-semibold text-slate-900">{selectedMaterial.poNumber}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600">Supplier:</p>
                <p className="font-semibold text-slate-900">{selectedMaterial.supplier}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600">Quantity:</p>
                <p className="font-semibold text-slate-900">
                  {selectedMaterial.qty} {selectedMaterial.unit}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-600">Tanggal Tiba:</p>
                <p className="font-semibold text-slate-900">
                  {new Date(selectedMaterial.arrivalDate).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
          </Card>

          {/* Inspection Form */}
          <Card className="mb-4 border-2 border-amber-200 bg-white p-4">
            <h3 className="mb-4 text-base font-bold text-slate-900">Pemeriksaan Fisik</h3>

            <div className="space-y-4">
              {/* Temperature (Optional) */}
              <div>
                <Label className="flex items-center gap-2 text-sm">
                  <Thermometer size={16} className="text-amber-600" />
                  Suhu (°C) <span className="text-xs text-slate-500">(Opsional)</span>
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Contoh: 25.5"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="h-11"
                />
              </div>

              {/* Color */}
              <div>
                <Label className="flex items-center gap-2 text-sm">
                  <Eye size={16} className="text-amber-600" />
                  Warna <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Contoh: Merah segar, tidak pucat"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-11"
                />
              </div>

              {/* Smell */}
              <div>
                <Label className="flex items-center gap-2 text-sm">
                  <Wind size={16} className="text-amber-600" />
                  Bau <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Contoh: Normal, tidak busuk"
                  value={smell}
                  onChange={(e) => setSmell(e.target.value)}
                  className="h-11"
                />
              </div>

              {/* Texture */}
              <div>
                <Label className="flex items-center gap-2 text-sm">
                  <Package size={16} className="text-amber-600" />
                  Tekstur <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Contoh: Segar, tidak lembek"
                  value={texture}
                  onChange={(e) => setTexture(e.target.value)}
                  className="h-11"
                />
              </div>

              {/* Notes */}
              <div>
                <Label className="flex items-center gap-2 text-sm">
                  <ClipboardText size={16} className="text-amber-600" />
                  Catatan Tambahan
                </Label>
                <Textarea
                  placeholder="Tulis catatan atau temuan khusus..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[80px] resize-none text-sm"
                />
              </div>
            </div>
          </Card>

          {/* Decision Buttons */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleSubmitInspection('rejected')}
              variant="outline"
              className="h-12 gap-2 border-2 border-red-300 text-red-600 hover:bg-red-50"
            >
              <XCircle size={18} weight="fill" />
              <span className="text-sm">Tolak Material</span>
            </Button>
            <Button
              onClick={() => handleSubmitInspection('approved')}
              className="h-12 gap-2 bg-green-600 text-white! hover:bg-green-700"
            >
              <CheckCircle size={18} weight="fill" />
              <span className="text-sm">Setujui Material</span>
            </Button>
          </div>

          {/* Warning */}
          <Card className="border-amber-300 bg-amber-50 p-3">
            <div className="flex gap-3">
              <Warning size={18} className="shrink-0 text-amber-600" weight="fill" />
              <p className="text-xs text-amber-900">
                <strong>Penting:</strong> Material yang ditolak tidak dapat diterima oleh gudang. Pastikan pemeriksaan sudah
                benar sebelum submit.
              </p>
            </div>
          </Card>
        </main>
      </div>
    )
  }

  // Detail View (Read-only)
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header - Improved */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedMaterial(null)}
            className="h-10 w-10 hover:bg-slate-100"
          >
            <ArrowLeft size={22} weight="bold" className="text-slate-700" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-slate-900">Detail Inspeksi</h1>
            <p className="text-xs text-slate-500">{selectedMaterial.materialName}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-4">
        {/* Material Info */}
        <Card className="mb-4 border-2 border-slate-200 bg-white p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-sm font-semibold text-slate-600">{selectedMaterial.poNumber}</span>
            <Badge
              className={cn(
                'text-xs',
                selectedMaterial.status === 'approved' && 'bg-green-100 text-green-700',
                selectedMaterial.status === 'rejected' && 'bg-red-100 text-red-700'
              )}
            >
              {selectedMaterial.status === 'approved' ? 'Disetujui' : 'Ditolak'}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-slate-600">Supplier:</p>
              <p className="font-semibold text-slate-900">{selectedMaterial.supplier}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600">Quantity:</p>
              <p className="font-semibold text-slate-900">
                {selectedMaterial.qty} {selectedMaterial.unit}
              </p>
            </div>
          </div>
        </Card>

        {/* QC Result */}
        {selectedMaterial.qcResult && (
          <Card className="border-2 border-slate-200 bg-white p-4">
            <h3 className="mb-3 text-base font-bold text-slate-900">Hasil Inspeksi</h3>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-slate-600">Inspektur:</p>
                <p className="font-semibold text-slate-900">{selectedMaterial.qcResult.inspector}</p>
              </div>

              <div>
                <p className="text-xs text-slate-600">Tanggal Inspeksi:</p>
                <p className="font-semibold text-slate-900">
                  {new Date(selectedMaterial.qcResult.inspectionDate).toLocaleDateString('id-ID')}
                </p>
              </div>

              {selectedMaterial.qcResult.temperature && (
                <div>
                  <p className="text-xs text-slate-600">Suhu:</p>
                  <p className="font-semibold text-slate-900">{selectedMaterial.qcResult.temperature}°C</p>
                </div>
              )}

              <div>
                <p className="text-xs text-slate-600">Warna:</p>
                <p className="font-semibold text-slate-900">{selectedMaterial.qcResult.color}</p>
              </div>

              <div>
                <p className="text-xs text-slate-600">Bau:</p>
                <p className="font-semibold text-slate-900">{selectedMaterial.qcResult.smell}</p>
              </div>

              <div>
                <p className="text-xs text-slate-600">Tekstur:</p>
                <p className="font-semibold text-slate-900">{selectedMaterial.qcResult.texture}</p>
              </div>

              {selectedMaterial.qcResult.notes && (
                <div>
                  <p className="text-xs text-slate-600">Catatan:</p>
                  <p className="text-slate-900">{selectedMaterial.qcResult.notes}</p>
                </div>
              )}
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}
