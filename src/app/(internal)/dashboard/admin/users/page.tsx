'use client'

import { useUserStore, type Staff } from '@/stores/use-user-store'
import {
  MagnifyingGlass,
  Plus,
  Funnel,
  MapPin,
  Phone,
  User,
  Shield,
  PencilSimple,
  Trash,
  Warning,
  CaretLeft,
  CaretRight
} from '@phosphor-icons/react'
import { useState, useMemo } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'

export default function UserManagementPage() {
  const { staffList, customerList, addStaff, updateStaff, deleteStaff, deleteCustomer } = useUserStore()

  const [activeTab, setActiveTab] = useState('staff')
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('ALL')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [editingUser, setEditingUser] = useState<Staff | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'HR' as Staff['role'],
    phone: '',
    password: '',
    pin: '',
    gender: 'L',
    birthdate: '',
    address: '',
    addressLabel: '',
    gps: ''
  })

  // Filtered staff list
  const filteredStaff = useMemo(() => {
    return staffList.filter((staff) => {
      const matchesSearch =
        staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = roleFilter === 'ALL' || staff.role === roleFilter

      return matchesSearch && matchesRole
    })
  }, [staffList, searchQuery, roleFilter])

  // Filtered customer list
  const filteredCustomers = useMemo(() => {
    return customerList.filter(
      (cust) =>
        cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [customerList, searchQuery])

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      PIMPINAN: 'bg-red-100 text-red-700 border-red-200',
      ADMIN: 'bg-slate-800 text-white border-slate-700',
      HR: 'bg-purple-100 text-purple-700 border-purple-200',
      WAREHOUSE: 'bg-amber-100 text-amber-700 border-amber-200',
      FINANCE: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      PROCUREMENT: 'bg-blue-100 text-blue-700 border-blue-200'
    }

    return styles[role] || 'bg-slate-100 text-slate-700 border-slate-200'
  }

  const handleOpenCreate = () => {
    setEditingUser(null)
    setFormData({
      name: '',
      email: '',
      role: 'HR',
      phone: '',
      password: '',
      pin: '',
      gender: 'L',
      birthdate: '',
      address: '',
      addressLabel: '',
      gps: ''
    })
    setShowAddModal(true)
  }

  const handleOpenEdit = (staff: Staff) => {
    setEditingUser(staff)
    setFormData({
      name: staff.name,
      email: staff.email,
      role: staff.role,
      phone: staff.phone,
      password: '',
      pin: '',
      gender: 'L',
      birthdate: '',
      address: '',
      addressLabel: '',
      gps: ''
    })
    setShowAddModal(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingUser) {
      // Update existing user
      updateStaff(editingUser.id, {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        phone: formData.phone
      })
      toast.success('Data karyawan berhasil diperbarui!')
    } else {
      // Create new user
      const newStaff: Staff = {
        id: Math.max(...staffList.map((s) => s.id), 0) + 1,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        phone: formData.phone,
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0]
      }
      addStaff(newStaff)
      toast.success('Karyawan baru berhasil ditambahkan!')
    }

    setShowAddModal(false)
    setEditingUser(null)
  }

  const handleDeleteClick = (id: number, type: 'staff' | 'customer') => {
    console.info(id, type)

    setDeletingId(id)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (deletingId !== null) {
      if (activeTab === 'staff') {
        deleteStaff(deletingId)
        toast.success('User berhasil dihapus')
      } else {
        deleteCustomer(deletingId)
        toast.success('Pelanggan berhasil dihapus')
      }
      setShowDeleteDialog(false)
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6 pt-2 pb-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manajemen Pengguna</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola akun staf internal, hak akses, dan data pelanggan</p>
        </div>

        <Button onClick={handleOpenCreate} variant="default">
          <Plus size={18} weight="bold" /> Tambah User Baru
        </Button>
      </div>

      {/* Tabs with Premium Style */}
      <Tabs defaultValue="staff" className="w-full" onValueChange={setActiveTab}>
        <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* Custom Tab List */}
          <div className="border-b bg-white px-2 pt-2 lg:px-6">
            <TabsList className="h-auto gap-3 bg-transparent p-0 lg:gap-6">
              <TabsTrigger
                value="staff"
                className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <div className="flex items-center gap-2">
                  <User size={16} /> Staf Internal
                  <span className="ml-1 rounded bg-primary px-1.5 py-0.5 text-xs font-bold text-white">
                    {staffList.length}
                  </span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="customers"
                className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <div className="flex items-center gap-2">
                  <MapPin size={16} /> Pelanggan / Outlet
                  <span className="ml-1 rounded bg-primary px-1.5 py-0.5 text-xs font-bold text-white">
                    {customerList.length}
                  </span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col items-center justify-between gap-4 border-b bg-slate-50/50 p-4 md:flex-row">
            <div className="flex w-full gap-3 md:w-auto">
              <div className="relative w-full md:w-80">
                <MagnifyingGlass className="absolute top-2.5 left-3 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder={activeTab === 'staff' ? 'Cari nama karyawan atau email...' : 'Cari nama outlet...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white py-2 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                />
              </div>

              {activeTab === 'staff' && (
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                >
                  <option value="ALL">Semua Role</option>
                  <option value="PIMPINAN">Pimpinan</option>
                  <option value="ADMIN">Admin</option>
                  <option value="HR">HR</option>
                  <option value="FINANCE">Finance</option>
                  <option value="PROCUREMENT">Procurement</option>
                  <option value="WAREHOUSE">Warehouse</option>
                  <option value="QC_LAB">QC Lab</option>
                </select>
              )}
            </div>
            <div className="flex w-full gap-2 md:w-auto">
              <Button variant="outline-red">
                <Funnel size={16} weight="bold" /> Filter
              </Button>
              <Button variant="outline-red">Export CSV</Button>
            </div>
          </div>

          {/* Staff Tab Content */}
          <TabsContent value="staff" className="m-0 p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-slate-50/50 font-medium text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Nama & Email</th>
                    <th className="px-6 py-4">Role / Jabatan</th>
                    <th className="px-6 py-4">Kontak</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Bergabung</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStaff.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                        Tidak ada data yang sesuai dengan filter
                      </td>
                    </tr>
                  ) : (
                    filteredStaff.map((staff) => (
                      <tr key={staff.id} className="group transition-colors hover:bg-slate-50/80">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 font-bold text-slate-600">
                              {staff.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-800">{staff.name}</div>
                              <div className="text-xs text-slate-500">{staff.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${getRoleBadge(staff.role)}`}
                          >
                            {staff.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{staff.phone}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                              staff.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${staff.status === 'Active' ? 'bg-green-600' : 'bg-primary'}`}
                            ></span>
                            {staff.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">{staff.joinDate}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-1">
                            <button
                              onClick={() => handleOpenEdit(staff)}
                              className="rounded-md p-2 text-blue-600 transition-colors hover:bg-blue-50"
                              title="Edit"
                            >
                              <PencilSimple size={16} weight="bold" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(staff.id, 'staff')}
                              className="rounded-md p-2 text-primary transition-colors hover:bg-red-50"
                              title="Delete"
                            >
                              <Trash size={16} weight="bold" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between border-t bg-slate-50/30 p-4 text-xs text-slate-600">
              <span className="font-medium">
                Menampilkan {filteredStaff.length} dari {staffList.length} baris
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

          {/* Customer Tab Content */}
          <TabsContent value="customers" className="m-0 p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-slate-50/50 font-medium text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Nama Pelanggan</th>
                    <th className="px-6 py-4">Kontak</th>
                    <th className="px-6 py-4">Perusahaan</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Bergabung</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCustomers.map((cust) => (
                    <tr key={cust.id} className="transition-colors hover:bg-slate-50/80">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 font-bold text-blue-600">
                            {cust.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800">{cust.name}</div>
                            <div className="text-xs text-slate-500">{cust.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone size={14} /> {cust.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{cust.company}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{cust.joinDate}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button className="h-8 bg-primary px-4 text-xs font-semibold text-white hover:bg-red-700">
                            Detail
                          </Button>
                          <button
                            onClick={() => handleDeleteClick(cust.id, 'customer')}
                            className="rounded-md p-2 text-primary transition-colors hover:bg-red-50"
                            title="Delete"
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
                Menampilkan {filteredCustomers.length} dari {customerList.length} baris
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

      {/* Add/Edit User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col gap-0 rounded-xl bg-white p-0 shadow-xl">
            <div className="border-b p-6 pb-4">
              <h2 className="text-xl font-bold text-slate-900">
                {editingUser ? 'Edit Data Karyawan' : 'Tambah Karyawan Baru'}
              </h2>
              <p className="text-sm text-slate-500">
                {editingUser ? 'Perbarui informasi karyawan' : 'Isi data lengkap sesuai identitas karyawan'}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 pt-2">
              <form onSubmit={handleSubmit} id="user-form" className="space-y-6">
                {/* Section 1: Account */}
                <div className="space-y-4 rounded-xl border bg-slate-50/50 p-4">
                  <div className="flex items-center gap-2 border-b pb-2 text-sm font-semibold text-slate-800">
                    <Shield size={16} className="text-blue-600" /> Informasi Akun & Akses
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-y-2">
                      <label className="text-sm font-medium text-slate-700">Email Perusahaan</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nama@ksfood.id"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <label className="text-sm font-medium text-slate-700">Role / Jabatan</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as Staff['role'] })}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                      >
                        <option value="HR">HR Staff</option>
                        <option value="ADMIN">Admin System</option>
                        <option value="WAREHOUSE">Warehouse / Gudang</option>
                        <option value="PROCUREMENT">Procurement</option>
                        <option value="QC_LAB">QC Staff</option>
                        <option value="FINANCE">Finance</option>
                      </select>
                    </div>
                    {!editingUser && (
                      <>
                        <div className="flex flex-col gap-y-2">
                          <label className="text-sm font-medium text-slate-700">Password Default</label>
                          <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••"
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-y-2">
                          <label className="text-sm font-medium text-slate-700">PIN (Absensi)</label>
                          <input
                            type="text"
                            value={formData.pin}
                            onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                            placeholder="123456"
                            maxLength={6}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Section 2: Personal */}
                <div className="space-y-4 rounded-xl border bg-white p-4">
                  <div className="flex items-center gap-2 border-b pb-2 text-sm font-semibold text-slate-800">
                    <User size={16} className="text-amber-600" /> Data Pribadi
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-y-2">
                      <label className="text-sm font-medium text-slate-700">Nama Lengkap (Sesuai KTP)</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-y-2">
                        <label className="text-sm font-medium text-slate-700">Nomor HP / WhatsApp</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0812..."
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <label className="text-sm font-medium text-slate-700">Tanggal Lahir</label>
                        <input
                          type="date"
                          value={formData.birthdate}
                          onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <label className="text-sm font-medium text-slate-700">Jenis Kelamin</label>
                      <div className="flex gap-4">
                        <label className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 hover:bg-slate-50">
                          <input
                            type="radio"
                            name="gender"
                            value="L"
                            checked={formData.gender === 'L'}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="h-4 w-4"
                          />
                          <span className="text-sm">Laki-laki</span>
                        </label>
                        <label className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 hover:bg-slate-50">
                          <input
                            type="radio"
                            name="gender"
                            value="P"
                            checked={formData.gender === 'P'}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="h-4 w-4"
                          />
                          <span className="text-sm">Perempuan</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Address */}
                <div className="space-y-4 rounded-xl border bg-white p-4">
                  <div className="flex items-center gap-2 border-b pb-2 text-sm font-semibold text-slate-800">
                    <MapPin size={16} className="text-primary" /> Alamat Domisili
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-sm font-medium text-slate-700">Alamat Lengkap</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Jl. Nama Jalan, No. Rumah, RT/RW"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <label className="text-sm font-medium text-slate-700">Label Alamat</label>
                      <input
                        type="text"
                        value={formData.addressLabel}
                        onChange={(e) => setFormData({ ...formData, addressLabel: e.target.value })}
                        placeholder="Rumah / Kost"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <label className="text-sm font-medium text-slate-700">Koordinat GPS (Opsional)</label>
                      <input
                        type="text"
                        value={formData.gps}
                        onChange={(e) => setFormData({ ...formData, gps: e.target.value })}
                        placeholder="-6.200000, 106.816666"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="border-t bg-slate-50 p-6 pt-4">
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingUser(null)
                  }}
                  variant="outline-red"
                >
                  Batal
                </Button>
                <Button type="submit" form="user-form" variant="default">
                  {editingUser ? 'Update Data' : 'Simpan Data Karyawan'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Warning size={24} className="text-primary" weight="bold" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-slate-900">Hapus Pengguna?</h3>
            <p className="mb-6 text-sm text-slate-600">
              Aksi ini tidak dapat dibatalkan. Data pengguna akan dihapus permanen dari sistem.
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
              <Button variant="default" onClick={confirmDelete}>
                Ya, Hapus
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
