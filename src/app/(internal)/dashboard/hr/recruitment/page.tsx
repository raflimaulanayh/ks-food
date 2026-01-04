'use client'

import { Star, Eye, ArrowRight, UserPlus, X } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/atoms/ui/dialog'
import { Label } from '@/components/atoms/ui/label'
import { Textarea } from '@/components/atoms/ui/textarea'

type CandidateStatus = 'new' | 'screening' | 'interview' | 'offering'

type Candidate = {
  id: number
  name: string
  role: string
  status: CandidateStatus
  rating: number
  appliedDate: string
  notes?: string
}

// MOCK DATA
const initialCandidates: Candidate[] = [
  {
    id: 1,
    name: 'Rina Melati',
    role: 'Admin Gudang',
    status: 'new',
    rating: 4.0,
    appliedDate: '2 hari lalu',
    notes: 'Kandidat potensial, pengalaman admin 2 tahun'
  },
  { id: 2, name: 'Sinta Dewi', role: 'Staff QC', status: 'new', rating: 4.2, appliedDate: '1 hari lalu', notes: '' },
  {
    id: 3,
    name: 'Andi Wijaya',
    role: 'Operator Produksi',
    status: 'new',
    rating: 3.8,
    appliedDate: '3 hari lalu',
    notes: ''
  },
  {
    id: 4,
    name: 'Dimas Anggara',
    role: 'Staff IT',
    status: 'screening',
    rating: 4.8,
    appliedDate: '5 hari lalu',
    notes: 'Lulus psikotes dengan nilai baik'
  },
  {
    id: 5,
    name: 'Putri Ayu',
    role: 'Admin Finance',
    status: 'screening',
    rating: 4.5,
    appliedDate: '1 minggu lalu',
    notes: ''
  },
  {
    id: 6,
    name: 'Bella Sophie',
    role: 'SPG Event',
    status: 'interview',
    rating: 3.5,
    appliedDate: '2 minggu lalu',
    notes: ''
  },
  {
    id: 7,
    name: 'Reza Pratama',
    role: 'Supervisor Gudang',
    status: 'interview',
    rating: 4.6,
    appliedDate: '2 minggu lalu',
    notes: 'Interview user scheduled 5 Jan'
  },
  {
    id: 8,
    name: 'Maya Sari',
    role: 'Staff HR',
    status: 'offering',
    rating: 4.9,
    appliedDate: '3 minggu lalu',
    notes: 'Offering letter sent, waiting response'
  }
]

const stages = [
  { id: 'new', title: 'Pelamar Baru', color: 'border-t-4 border-t-blue-500', bgHeader: 'bg-blue-50' },
  { id: 'screening', title: 'Screening / Psikotes', color: 'border-t-4 border-t-amber-500', bgHeader: 'bg-amber-50' },
  { id: 'interview', title: 'Interview User', color: 'border-t-4 border-t-purple-500', bgHeader: 'bg-purple-50' },
  { id: 'offering', title: 'Offering / Hired', color: 'border-t-4 border-t-emerald-500', bgHeader: 'bg-emerald-50' }
]

const getNextStatus = (current: CandidateStatus): CandidateStatus | null => {
  const statusOrder: CandidateStatus[] = ['new', 'screening', 'interview', 'offering']
  const currentIndex = statusOrder.indexOf(current)

  return currentIndex < statusOrder.length - 1 ? statusOrder[currentIndex + 1] : null
}

export default function RecruitmentPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newCandidate, setNewCandidate] = useState({ name: '', role: '' })
  const [isRejectOpen, setIsRejectOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [candidateToReject, setCandidateToReject] = useState<{ id: number; name: string } | null>(null)
  const [editedNotes, setEditedNotes] = useState('')

  const handleMoveNext = (candidateId: number) => {
    setCandidates((prev) =>
      prev.map((candidate) => {
        if (candidate.id === candidateId) {
          const nextStatus = getNextStatus(candidate.status)
          if (nextStatus) {
            toast.success('Kandidat dipindahkan', {
              description: `${candidate.name} telah dipindahkan ke tahap berikutnya`
            })

            return { ...candidate, status: nextStatus }
          }
        }

        return candidate
      })
    )
  }

  const getCandidatesByStatus = (status: CandidateStatus) => {
    return candidates.filter((c) => c.status === status)
  }

  const handleViewDetail = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setEditedNotes(candidate.notes || '')
    setIsDetailOpen(true)
  }

  const handleReject = (candidateId: number, candidateName: string) => {
    setCandidateToReject({ id: candidateId, name: candidateName })
    setRejectReason('')
    setIsRejectOpen(true)
  }

  const confirmReject = () => {
    if (!rejectReason.trim()) {
      toast.error('Alasan diperlukan', {
        description: 'Mohon isi alasan penolakan terlebih dahulu'
      })

      return
    }

    if (candidateToReject) {
      setCandidates((prev) =>
        prev.map((c) => (c.id === candidateToReject.id ? { ...c, status: 'rejected' as CandidateStatus } : c))
      )
      toast.error('Kandidat ditolak', {
        description: `${candidateToReject.name} telah ditolak dari proses rekrutmen`
      })
      setIsRejectOpen(false)
      setCandidateToReject(null)
      setRejectReason('')
    }
  }

  const handleAddCandidate = () => {
    if (!newCandidate.name || !newCandidate.role) {
      toast.error('Data tidak lengkap', {
        description: 'Mohon isi nama dan posisi kandidat'
      })

      return
    }

    const newCandidateData: Candidate = {
      id: Date.now(),
      name: newCandidate.name,
      role: newCandidate.role,
      status: 'new',
      rating: 0,
      appliedDate: 'Baru saja'
    }

    setCandidates((prev) => [...prev, newCandidateData])
    setIsAddOpen(false)
    setNewCandidate({ name: '', role: '' })
    toast.success('Kandidat berhasil ditambahkan!', {
      description: `${newCandidate.name} telah ditambahkan ke pipeline rekrutmen`
    })
  }

  const handleRating = (candidateId: number, newRating: number) => {
    setCandidates((prev) => prev.map((c) => (c.id === candidateId ? { ...c, rating: newRating } : c)))
    setSelectedCandidate((prev) => (prev ? { ...prev, rating: newRating } : null))
    toast.success('Rating berhasil diperbarui!', {
      description: `Rating kandidat: ${newRating} bintang`
    })
  }

  const handleSaveNotes = () => {
    if (!selectedCandidate) return

    setCandidates((prev) => prev.map((c) => (c.id === selectedCandidate.id ? { ...c, notes: editedNotes } : c)))
    setSelectedCandidate((prev) => (prev ? { ...prev, notes: editedNotes } : null))
    toast.success('Catatan berhasil disimpan!', {
      description: 'Catatan kandidat telah diperbarui'
    })
  }

  return (
    <div className="space-y-6 pt-2 pb-10">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Pipeline Rekrutmen</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola kandidat dan proses hiring dari awal hingga offering.</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2 bg-primary text-white shadow-sm hover:bg-red-700">
          <UserPlus size={18} weight="bold" /> Tambah Kandidat Manual
        </Button>
      </div>

      {/* KANBAN BOARD */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage) => {
          const stageCandidates = getCandidatesByStatus(stage.id as CandidateStatus)

          return (
            <div key={stage.id} className="flex flex-col">
              {/* COLUMN HEADER */}
              <Card className={`mb-4 overflow-hidden rounded-xl border-slate-200 shadow-sm ${stage.color}`}>
                <div className={`p-4 ${stage.bgHeader}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">{stage.title}</h3>
                    <Badge className="rounded-full bg-slate-900 text-white">{stageCandidates.length}</Badge>
                  </div>
                </div>
              </Card>

              {/* CANDIDATE CARDS */}
              <div className="space-y-3">
                {stageCandidates.length === 0 ? (
                  <div className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                    <p className="text-sm text-slate-400">Tidak ada kandidat</p>
                  </div>
                ) : (
                  stageCandidates.map((candidate) => (
                    <Card
                      key={candidate.id}
                      className="overflow-hidden border-slate-200 bg-white p-3 shadow-sm transition-all hover:shadow-md"
                    >
                      {/* Card Content */}
                      <div className="mb-3">
                        {/* Avatar & Name */}
                        <div className="mb-2 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 font-bold text-slate-700">
                            {candidate.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-900">{candidate.name}</h4>
                            <p className="text-xs text-slate-500">{candidate.role}</p>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="mb-2 flex items-center gap-1">
                          <Star size={14} className="text-amber-400" weight="fill" />
                          <span className="text-sm font-medium text-slate-700">{candidate.rating.toFixed(1)}</span>
                          <span className="text-xs text-slate-400">• {candidate.appliedDate}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 border-t border-slate-100 pt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReject(candidate.id, candidate.name)}
                          className="gap-1 border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <X size={14} weight="bold" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetail(candidate)}
                          className="flex-1 gap-2 border-slate-200 text-slate-600"
                        >
                          <Eye size={14} /> Detail
                        </Button>
                        {getNextStatus(candidate.status) && (
                          <Button
                            size="sm"
                            onClick={() => handleMoveNext(candidate.id)}
                            className="gap-2 bg-primary text-white hover:bg-red-700"
                          >
                            <ArrowRight size={14} weight="bold" /> Next
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* SUMMARY STATS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <UserPlus size={20} className="text-blue-600" weight="duotone" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Total Kandidat</p>
              <p className="text-lg font-bold text-slate-900">{candidates.length}</p>
            </div>
          </div>
        </Card>
        <Card className="border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-amber-100 p-2">
              <Star size={20} className="text-amber-600" weight="duotone" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Avg Rating</p>
              <p className="text-lg font-bold text-slate-900">
                {(candidates.reduce((sum, c) => sum + c.rating, 0) / candidates.length).toFixed(1)}
              </p>
            </div>
          </div>
        </Card>
        <Card className="border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-100 p-2">
              <Eye size={20} className="text-purple-600" weight="duotone" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Dalam Interview</p>
              <p className="text-lg font-bold text-slate-900">{getCandidatesByStatus('interview').length}</p>
            </div>
          </div>
        </Card>
        <Card className="border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-100 p-2">
              <ArrowRight size={20} className="text-emerald-600" weight="duotone" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Ready to Hire</p>
              <p className="text-lg font-bold text-slate-900">{getCandidatesByStatus('offering').length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* DETAIL MODAL */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedCandidate && (
            <>
              <DialogHeader>
                <DialogTitle>Detail Kandidat</DialogTitle>
                <DialogDescription>Informasi lengkap pelamar</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {/* Avatar & Name */}
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 text-2xl font-bold text-slate-700">
                    {selectedCandidate.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{selectedCandidate.name}</h3>
                    <p className="text-sm text-slate-500">Melamar sebagai {selectedCandidate.role}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-slate-500">Rating Kandidat</Label>
                    <div className="mt-2 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRating(selectedCandidate.id, star)}
                          className="transition-transform hover:scale-110 focus:outline-none"
                        >
                          <Star
                            size={24}
                            className={
                              star <= selectedCandidate.rating ? 'text-amber-400' : 'text-slate-300 hover:text-amber-200'
                            }
                            weight={star <= selectedCandidate.rating ? 'fill' : 'regular'}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm font-medium text-slate-600">
                        {selectedCandidate.rating.toFixed(1)} / 5.0
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">Klik bintang untuk memberi rating</p>
                  </div>

                  <div>
                    <Label className="text-xs text-slate-500">Status Lamaran</Label>
                    <div className="mt-1">
                      <Badge
                        className={
                          selectedCandidate.status === 'new'
                            ? 'bg-blue-100 text-blue-700'
                            : selectedCandidate.status === 'screening'
                              ? 'bg-amber-100 text-amber-700'
                              : selectedCandidate.status === 'interview'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-emerald-100 text-emerald-700'
                        }
                      >
                        {selectedCandidate.status === 'new'
                          ? 'Pelamar Baru'
                          : selectedCandidate.status === 'screening'
                            ? 'Screening / Psikotes'
                            : selectedCandidate.status === 'interview'
                              ? 'Interview User'
                              : 'Offering / Hired'}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-slate-500">Tanggal Melamar</Label>
                    <p className="mt-1 font-medium text-slate-900">{selectedCandidate.appliedDate}</p>
                  </div>

                  <div>
                    <Label className="text-xs text-slate-500">Email</Label>
                    <p className="mt-1 font-medium text-slate-900">kandidat@email.com</p>
                  </div>

                  <div>
                    <Label className="text-xs text-slate-500">Telepon</Label>
                    <p className="mt-1 font-medium text-slate-900">0812-3456-7890</p>
                  </div>

                  {/* NOTES SECTION */}
                  <div className="border-t border-slate-200 pt-3">
                    <Label className="text-xs text-slate-500">Catatan HR</Label>
                    <Textarea
                      placeholder="Tambahkan catatan tentang kandidat ini (hasil interview, kelebihan, follow-up, dll.)..."
                      value={editedNotes}
                      onChange={(e) => setEditedNotes(e.target.value)}
                      className="mt-2 min-h-[100px] resize-none border-slate-200"
                    />
                    <Button
                      onClick={handleSaveNotes}
                      size="sm"
                      className="mt-2 gap-2 bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <Star size={14} weight="fill" /> Simpan Catatan
                    </Button>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Tutup
                </Button>
                <Button className="gap-2 bg-primary text-white hover:bg-red-700">
                  <Eye size={16} /> Download CV
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ADD CANDIDATE MODAL */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Tambah Kandidat Manual</DialogTitle>
            <DialogDescription>Masukkan data kandidat baru ke pipeline rekrutmen</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>
                Nama Kandidat <span className="text-red-500">*</span>
              </Label>
              <input
                type="text"
                placeholder="Contoh: Rina Melati"
                value={newCandidate.name}
                onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <Label>
                Posisi Dilamar <span className="text-red-500">*</span>
              </Label>
              <input
                type="text"
                placeholder="Contoh: Staff Admin"
                value={newCandidate.role}
                onChange={(e) => setNewCandidate({ ...newCandidate, role: e.target.value })}
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
              <p className="font-medium">ℹ️ Informasi</p>
              <p className="mt-1 text-xs">Kandidat baru akan muncul di kolom "Pelamar Baru" dengan rating 0.</p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddOpen(false)
                setNewCandidate({ name: '', role: '' })
              }}
            >
              Batal
            </Button>
            <Button onClick={handleAddCandidate} className="gap-2 bg-primary text-white hover:bg-red-700">
              <UserPlus size={16} weight="bold" /> Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* REJECT CONFIRMATION MODAL */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Tolak Kandidat</DialogTitle>
            <DialogDescription>
              Anda akan menolak kandidat <strong>{candidateToReject?.name}</strong> dari proses rekrutmen.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>
                Alasan Penolakan <span className="text-red-500">*</span>
              </Label>
              <Textarea
                placeholder="Contoh: Tidak memenuhi kualifikasi minimum, pengalaman kurang sesuai, dll."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="min-h-[100px] resize-none border-slate-200"
              />
            </div>

            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              <p className="font-medium">⚠️ Peringatan</p>
              <p className="mt-1 text-xs">Kandidat yang ditolak akan dihapus dari pipeline dan tidak dapat dikembalikan.</p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsRejectOpen(false)
                setRejectReason('')
                setCandidateToReject(null)
              }}
            >
              Batal
            </Button>
            <Button onClick={confirmReject} className="gap-2 bg-red-600 text-white hover:bg-red-700">
              <X size={16} weight="bold" /> Tolak Kandidat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
