'use client'

import {
  MagnifyingGlass,
  UserPlus,
  Briefcase,
  CalendarBlank,
  CaretRight,
  PencilSimple,
  FloppyDisk,
  UploadSimple
} from '@phosphor-icons/react'
import { useState, useMemo } from 'react'
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
import { Input } from '@/components/atoms/ui/input'
import { Label } from '@/components/atoms/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'

// INITIAL DATA
const initialEmployees = [
  {
    id: 1,
    name: 'Budi Santoso',
    nik: 'EMP-2024-001',
    role: 'Supervisor QC',
    dept: 'QC',
    join: '2020-01-15',
    status: 'Tetap',
    email: 'budi.s@ksfood.id',
    phone: '0812-3456-7890',
    img: 'https://i.pravatar.cc/150?u=1'
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    nik: 'EMP-2023-045',
    role: 'Staff Finance',
    dept: 'Finance',
    join: '2021-03-20',
    status: 'Tetap',
    email: 'siti.n@ksfood.id',
    phone: '0812-9876-5432',
    img: 'https://i.pravatar.cc/150?u=2'
  },
  {
    id: 3,
    name: 'Ahmad Fauzi',
    nik: 'EMP-2025-012',
    role: 'Operator Produksi',
    dept: 'Produksi',
    join: '2024-11-10',
    status: 'Kontrak',
    email: 'ahmad.f@ksfood.id',
    phone: '0857-1234-5678',
    img: 'https://i.pravatar.cc/150?u=3'
  },
  {
    id: 4,
    name: 'Lina Wijaya',
    nik: 'EMP-2025-018',
    role: 'Staff HR',
    dept: 'HR',
    join: '2025-01-01',
    status: 'Probation',
    email: 'lina.w@ksfood.id',
    phone: '0813-5555-9999',
    img: 'https://i.pravatar.cc/150?u=4'
  }
]

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(initialEmployees)

  // -- STATE: SEARCH & FILTER --
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDept, setFilterDept] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  // -- STATE: ADD MODAL --
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newEmp, setNewEmp] = useState({
    name: '',
    role: '',
    dept: '',
    email: '',
    status: '',
    phone: ''
  })

  // -- STATE: DETAIL / EDIT MODAL --
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedEmp, setSelectedEmp] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<any>(null)

  // -- COMPUTED: FILTERED EMPLOYEES --
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        searchTerm === '' ||
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.nik.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDept = filterDept === 'all' || emp.dept === filterDept
      const matchesStatus = filterStatus === 'all' || emp.status === filterStatus

      return matchesSearch && matchesDept && matchesStatus
    })
  }, [employees, searchTerm, filterDept, filterStatus])

  // -- HANDLER: ADD EMPLOYEE --
  const handleAddSubmit = () => {
    // FIXED: Image is NOT required, only core fields
    if (!newEmp.name || !newEmp.role || !newEmp.dept || !newEmp.status) {
      const missing = []
      if (!newEmp.name) missing.push('Nama')
      if (!newEmp.dept) missing.push('Departemen')
      if (!newEmp.role) missing.push('Jabatan')
      if (!newEmp.status) missing.push('Status')

      toast.error('Data tidak lengkap', {
        description: `Field yang kosong: ${missing.join(', ')}`
      })

      return
    }

    const newId = employees.length + 1
    const newData = {
      id: newId,
      ...newEmp,
      nik: `EMP-2026-0${newId.toString().padStart(2, '0')}`,
      join: new Date().toISOString().split('T')[0],
      img: `https://i.pravatar.cc/150?u=${newId + 10}` // Default avatar
    }

    setEmployees([...employees, newData])
    setIsAddOpen(false)
    setNewEmp({ name: '', role: '', dept: '', email: '', status: '', phone: '' })
    toast.success('Pegawai berhasil ditambahkan!', {
      description: `${newData.name} telah ditambahkan ke database`
    })
  }

  // -- HANDLER: DETAIL & EDIT --
  const openDetail = (emp: any) => {
    setSelectedEmp(emp)
    setEditForm(emp) // Copy data to editable state
    setIsEditing(false)
    setIsDetailOpen(true)
  }

  const saveEdit = () => {
    setEmployees((prev) => prev.map((e) => (e.id === editForm.id ? editForm : e)))
    setSelectedEmp(editForm) // Update read-only view
    setIsEditing(false)
    toast.success('Perubahan berhasil disimpan!', {
      description: `Data ${editForm.name} telah diperbarui`
    })
  }

  return (
    <div className="space-y-6 pt-2 pb-10">
      {/* HEADER */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Data Karyawan</h1>
          <p className="mt-1 text-sm text-slate-500">Database lengkap personel KS Food (Tetap & Kontrak).</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2 bg-primary text-white shadow-sm hover:bg-red-700">
          <UserPlus size={18} weight="bold" /> Tambah Pegawai
        </Button>
      </div>

      {/* FILTER BAR */}
      <Card className="flex flex-col items-center justify-between gap-4 rounded-xl border-slate-200 bg-white p-4 shadow-sm md:flex-row">
        <div className="relative w-full md:w-[400px]">
          <MagnifyingGlass className="absolute top-2.5 left-3 text-slate-400" size={18} />
          <Input
            placeholder="Cari Nama atau NIK..."
            className="border-slate-200 bg-white pl-10 focus:border-red-500 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex w-full gap-2 md:w-auto">
          <Select value={filterDept} onValueChange={setFilterDept}>
            <SelectTrigger className="w-[180px] border-slate-200 bg-white">
              <SelectValue placeholder="Semua Departemen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Departemen</SelectItem>
              <SelectItem value="QC">QC</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Produksi">Produksi</SelectItem>
              <SelectItem value="Gudang">Gudang</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px] border-slate-200 bg-white">
              <SelectValue placeholder="Semua Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="Tetap">Tetap</SelectItem>
              <SelectItem value="Kontrak">Kontrak</SelectItem>
              <SelectItem value="Probation">Probation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* EMPLOYEE GRID */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((emp) => (
          <Card
            key={emp.id}
            className="group overflow-hidden rounded-xl border-slate-200 bg-white shadow-sm transition-all hover:border-red-300 hover:shadow-md"
          >
            <div className="flex flex-col items-center p-6 text-center">
              <div className="relative mb-4">
                <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-slate-50 transition-colors group-hover:border-red-50">
                  <img src={emp.img} alt={emp.name} className="h-full w-full object-cover" />
                </div>
                <span
                  className={`absolute right-1 bottom-0 h-4 w-4 rounded-full border-2 border-white ${emp.status === 'Tetap' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                ></span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">{emp.name}</h3>
              <p className="mt-1 mb-2 font-mono text-xs text-slate-400">{emp.nik}</p>
              <Badge variant="outline" className="mb-4 border-slate-200 bg-slate-100 text-slate-600">
                {emp.role}
              </Badge>

              <div className="grid w-full grid-cols-2 gap-2 rounded-lg border border-slate-100 bg-slate-50 p-3 text-left text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Briefcase size={14} className="text-slate-400" /> {emp.dept}
                </div>
                <div className="flex items-center gap-2">
                  <CalendarBlank size={14} className="text-slate-400" /> {emp.join}
                </div>
              </div>
            </div>
            <div className="flex justify-center border-t border-slate-100 bg-slate-50/50 p-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openDetail(emp)}
                className="w-full gap-2 bg-red-50 font-medium text-primary shadow-sm transition-all hover:bg-primary hover:text-white"
              >
                Lihat Profil <CaretRight size={14} weight="bold" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* MODAL 1: ADD EMPLOYEE (Fixed Validation) */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Tambah Pegawai Baru</DialogTitle>
            <DialogDescription>Masukkan data lengkap pegawai.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="mb-2 flex items-center gap-4">
              <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-slate-300 bg-slate-100 text-slate-400 hover:bg-slate-200">
                <UploadSimple size={24} />
              </div>
              <div>
                <Label>Foto Profil</Label>
                <p className="text-xs text-slate-500">Opsional (Default avatar akan digunakan).</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-y-2">
                <Label>
                  Nama Lengkap <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={newEmp.name}
                  onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                  placeholder="Nama Pegawai"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>NIK</Label>
                <Input disabled placeholder="Auto Generated" className="bg-slate-50" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-y-2">
                <Label>
                  Departemen <span className="text-red-500">*</span>
                </Label>
                {/* FIXED: onValueChange updates state */}
                <Select value={newEmp.dept} onValueChange={(val) => setNewEmp({ ...newEmp, dept: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="QC">QC Lab</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Produksi">Produksi</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Gudang">Gudang</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>
                  Jabatan <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={newEmp.role}
                  onChange={(e) => setNewEmp({ ...newEmp, role: e.target.value })}
                  placeholder="Contoh: Staff Admin"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input
                  value={newEmp.email}
                  onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
                  placeholder="email@kantor.com"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>
                  Status <span className="text-red-500">*</span>
                </Label>
                {/* FIXED: onValueChange updates state */}
                <Select value={newEmp.status} onValueChange={(val) => setNewEmp({ ...newEmp, status: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tetap">Tetap</SelectItem>
                    <SelectItem value="Kontrak">Kontrak</SelectItem>
                    <SelectItem value="Probation">Probation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline-red" onClick={() => setIsAddOpen(false)}>
              Batal
            </Button>
            <Button variant="default" onClick={handleAddSubmit}>
              Simpan Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: DETAIL & EDIT (Restored Logic) */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader className="flex flex-row items-start justify-between">
            <div>
              <DialogTitle>Profil Karyawan</DialogTitle>
              <DialogDescription>Informasi detail pegawai.</DialogDescription>
            </div>
            <Button
              size="sm"
              variant={isEditing ? 'default' : 'outline'}
              onClick={() => (isEditing ? saveEdit() : setIsEditing(true))}
              className={isEditing ? 'gap-2 bg-emerald-600 text-white hover:bg-emerald-700' : 'gap-2'}
            >
              {isEditing ? (
                <>
                  <FloppyDisk size={16} /> Simpan
                </>
              ) : (
                <>
                  <PencilSimple size={16} /> Edit Profil
                </>
              )}
            </Button>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-6 py-4 md:grid-cols-3">
            {/* Left: Avatar */}
            <div className="flex flex-col items-center rounded-xl border bg-slate-50 p-4 text-center md:col-span-1">
              <div className="mb-4 h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-sm">
                <img src={editForm?.img} alt={editForm?.name} className="h-full w-full object-cover" />
              </div>
              {isEditing ? (
                <Input
                  value={editForm?.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="mb-2 h-8 text-center font-bold"
                />
              ) : (
                <h3 className="text-lg font-bold text-slate-900">{selectedEmp?.name}</h3>
              )}
              <p className="mb-2 font-mono text-xs text-slate-500">{selectedEmp?.nik}</p>
              <Badge className={selectedEmp?.status === 'Tetap' ? 'bg-emerald-600' : 'bg-amber-600'}>
                {selectedEmp?.status}
              </Badge>
            </div>

            {/* Right: Info Tabs */}
            <div className="md:col-span-2">
              <Tabs defaultValue="pribadi" className="w-full">
                <TabsList className="mb-4 grid w-full grid-cols-2">
                  <TabsTrigger value="pribadi">Pribadi</TabsTrigger>
                  <TabsTrigger value="pekerjaan">Pekerjaan</TabsTrigger>
                </TabsList>

                <TabsContent value="pribadi" className="space-y-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-slate-500">Email</Label>
                    {isEditing ? (
                      <Input
                        value={editForm?.email || ''}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      />
                    ) : (
                      <p className="font-medium text-slate-800">{selectedEmp?.email || '-'}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-slate-500">Telepon</Label>
                    {isEditing ? (
                      <Input
                        value={editForm?.phone || ''}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      />
                    ) : (
                      <p className="font-medium text-slate-800">{selectedEmp?.phone || '-'}</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="pekerjaan" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-slate-500">Departemen</Label>
                      {isEditing ? (
                        <Select value={editForm?.dept} onValueChange={(val) => setEditForm({ ...editForm, dept: val })}>
                          <SelectTrigger className="h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="QC">QC</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                            <SelectItem value="Produksi">Produksi</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Gudang">Gudang</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="font-medium">{selectedEmp?.dept}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-xs text-slate-500">Jabatan</Label>
                      {isEditing ? (
                        <Input
                          value={editForm?.role || ''}
                          onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                          className="h-9"
                        />
                      ) : (
                        <p className="font-medium">{selectedEmp?.role}</p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
