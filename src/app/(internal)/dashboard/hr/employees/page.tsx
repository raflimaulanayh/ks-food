'use client'

import { APPLICANTS, type Employee, EMPLOYEES, formatRupiah, getExpiringContracts, PAYROLL_DECEMBER } from '@/data/mock-hr'
import {
  Briefcase,
  CalendarBlank,
  CheckCircle,
  Download,
  Envelope,
  Eye,
  FileText,
  LinkedinLogo,
  PencilSimple,
  Phone,
  Plus,
  Trash,
  Users,
  WarningCircle
} from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/atoms/ui/alert-dialog'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/atoms/ui/dialog'

import { cn } from '@/utils/cn'

type TabName = 'employees' | 'payroll' | 'recruitment'

export default function HREmployeesPage() {
  const [activeTab, setActiveTab] = useState<TabName>('employees')

  // Employee state
  const [employees, setEmployees] = useState(EMPLOYEES)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [showFormDialog, setShowFormDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

  // Payroll state
  const [selectedPayslip, setSelectedPayslip] = useState<(typeof PAYROLL_DECEMBER)[0] | null>(null)
  const [showPayslipDialog, setShowPayslipDialog] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState('2024-12')
  const [payrollStatus, setPayrollStatus] = useState<'DRAFT' | 'PAID'>('DRAFT')
  const [showPayrollConfirm, setShowPayrollConfirm] = useState(false)
  const [isProcessingPayroll, setIsProcessingPayroll] = useState(false)

  // Candidate state
  const [selectedCandidate, setSelectedCandidate] = useState<(typeof APPLICANTS)[0] | null>(null)
  const [showCandidateDialog, setShowCandidateDialog] = useState(false)

  // Applicants state (mutable for moving between stages)
  const [applicants, setApplicants] = useState(APPLICANTS)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: 'GUDANG' as Employee['department'],
    status: 'TETAP' as Employee['status'],
    baseSalary: 0,
    joinDate: ''
  })

  const expiringContracts = getExpiringContracts()

  // CRUD Handlers
  const handleAdd = () => {
    setEditingEmployee(null)
    setFormData({
      name: '',
      email: '',
      role: '',
      department: 'GUDANG',
      status: 'TETAP',
      baseSalary: 5000000,
      joinDate: new Date().toISOString().split('T')[0]
    })
    setShowFormDialog(true)
  }

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee)
    setFormData({
      name: employee.name,
      email: employee.email,
      role: employee.role,
      department: employee.department,
      status: employee.status,
      baseSalary: employee.baseSalary,
      joinDate: employee.joinDate
    })
    setShowFormDialog(true)
  }

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (selectedEmployee) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== selectedEmployee.id))
      toast.success(`Karyawan ${selectedEmployee.name} berhasil dihapus`)
      setShowDeleteDialog(false)
      setSelectedEmployee(null)
    }
  }

  const handleSubmitForm = () => {
    if (editingEmployee) {
      // Update
      setEmployees((prev) => prev.map((emp) => (emp.id === editingEmployee.id ? { ...emp, ...formData } : emp)))
      toast.success(`Data ${formData.name} berhasil diperbarui`)
    } else {
      // Create
      const newEmployee: Employee = {
        id: `EMP-${String(employees.length + 1).padStart(3, '0')}`,
        ...formData
      }
      setEmployees((prev) => [...prev, newEmployee])
      toast.success(`Karyawan ${formData.name} berhasil ditambahkan`)
    }
    setShowFormDialog(false)
  }

  const handleViewPayslip = (payroll: (typeof PAYROLL_DECEMBER)[0]) => {
    setSelectedPayslip(payroll)
    setShowPayslipDialog(true)
  }

  const handleDownloadPDF = () => {
    toast.success('Slip gaji berhasil diunduh!', {
      description: 'File PDF tersimpan di folder Downloads'
    })
  }

  const handleSendEmail = () => {
    toast.success('Slip gaji berhasil dikirim via email!', {
      description: `Email terkirim ke ${selectedPayslip?.employeeName}`
    })
  }

  const handleExportBank = () => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
    const [_year, month] = selectedMonth.split('-')
    const monthName = monthNames[parseInt(month) - 1]
    toast.success('File berhasil diunduh!', {
      description: `Payroll_Batch_BCA_${monthName}${_year}.csv tersimpan di Downloads`
    })
  }

  const handleProcessPayroll = () => {
    setShowPayrollConfirm(true)
  }

  const confirmProcessPayroll = async () => {
    setShowPayrollConfirm(false)
    setIsProcessingPayroll(true)

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setPayrollStatus('PAID')
    setIsProcessingPayroll(false)

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
    const [year, month] = selectedMonth.split('-')
    const monthName = monthNames[parseInt(month) - 1]

    toast.success(`Payroll ${monthName} berhasil diproses!`, {
      description: 'Dana telah dipotong dari Finance. Status: PAID.'
    })
  }

  // Move candidate between stages
  const moveCandidate = (candidateId: string, newStage: (typeof APPLICANTS)[0]['stage']) => {
    setApplicants((prev) =>
      prev.map((app) => {
        if (app.id === candidateId) {
          const candidate = prev.find((a) => a.id === candidateId)
          if (candidate) {
            toast.success('Berhasil!', {
              description: `${candidate.name} dipindahkan ke tahap ${newStage.replace('_', ' ')}`
            })
          }

          return { ...app, stage: newStage }
        }

        return app
      })
    )
    setShowCandidateDialog(false)
    setSelectedCandidate(null)
  }

  // Group applicants by stage (use state instead of imported data)
  const applicantsByStage = {
    APLIKASI: applicants.filter((app) => app.stage === 'APLIKASI'),
    INTERVIEW_HR: applicants.filter((app) => app.stage === 'INTERVIEW_HR'),
    INTERVIEW_USER: applicants.filter((app) => app.stage === 'INTERVIEW_USER'),
    OFFERING: applicants.filter((app) => app.stage === 'OFFERING')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manajemen SDM & Gaji</h1>
        <p className="mt-1 text-sm text-slate-500">Kelola data karyawan, payroll, dan rekrutmen</p>
      </div>

      {/* Tabs */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('employees')}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors sm:px-6',
              activeTab === 'employees'
                ? 'border-b-2 border-primary bg-red-50 text-primary'
                : 'text-slate-600 hover:bg-slate-50'
            )}
          >
            <Users size={20} weight={activeTab === 'employees' ? 'fill' : 'regular'} />
            Data Karyawan
          </button>
          <button
            onClick={() => setActiveTab('payroll')}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors sm:px-6',
              activeTab === 'payroll'
                ? 'border-b-2 border-primary bg-red-50 text-primary'
                : 'text-slate-600 hover:bg-slate-50'
            )}
          >
            <CheckCircle size={20} weight={activeTab === 'payroll' ? 'fill' : 'regular'} />
            Payroll (Gaji)
          </button>
          <button
            onClick={() => setActiveTab('recruitment')}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors sm:px-6',
              activeTab === 'recruitment'
                ? 'border-b-2 border-primary bg-red-50 text-primary'
                : 'text-slate-600 hover:bg-slate-50'
            )}
          >
            <Plus size={20} weight={activeTab === 'recruitment' ? 'fill' : 'regular'} />
            Rekrutmen
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Tab 1: Employees with CRUD */}
          {activeTab === 'employees' && (
            <div className="space-y-4">
              {/* Add Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  <Plus size={20} weight="bold" />
                  Tambah Karyawan Baru
                </button>
              </div>

              {expiringContracts.length > 0 && (
                <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-4">
                  <div className="flex items-start gap-3">
                    <WarningCircle size={24} weight="fill" className="text-yellow-600" />
                    <div>
                      <h3 className="font-semibold text-yellow-900">Kontrak Akan Habis</h3>
                      <p className="mt-1 text-sm text-yellow-700">
                        {expiringContracts.length} karyawan dengan kontrak habis dalam 60 hari ke depan
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Nama</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Posisi</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Dept</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Join Date</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {employees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm font-medium text-slate-900">{emp.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{emp.role}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{emp.department}</td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              'rounded-full px-3 py-1 text-xs font-semibold',
                              emp.status === 'TETAP' && 'bg-green-100 text-green-700',
                              emp.status === 'KONTRAK' && 'bg-blue-100 text-blue-700',
                              emp.status === 'PROBATION' && 'bg-yellow-100 text-yellow-700'
                            )}
                          >
                            {emp.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {new Date(emp.joinDate).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(emp)}
                              className="rounded-lg bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
                              aria-label="Edit"
                            >
                              <PencilSimple size={16} weight="bold" />
                            </button>
                            <button
                              onClick={() => handleDelete(emp)}
                              className="rounded-lg bg-red-600 p-2 text-white transition-colors hover:bg-red-700"
                              aria-label="Delete"
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
          )}

          {/* Tab 2: Payroll ERP-Standard */}
          {activeTab === 'payroll' && (
            <div className="space-y-6">
              {/* Payroll Toolbar */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <CalendarBlank size={24} weight="duotone" className="text-slate-600" />
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="rounded-lg border-2 border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition-colors hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  >
                    <option value="2024-12">Desember 2024</option>
                    <option value="2024-11">November 2024</option>
                    <option value="2024-10">Oktober 2024</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleExportBank}
                    className="flex items-center gap-2 rounded-lg border-2 border-emerald-600 bg-white px-4 py-2 font-semibold text-emerald-600 transition-all hover:bg-emerald-50"
                  >
                    <Download size={20} weight="bold" />
                    Export Bank (.csv)
                  </button>
                  {payrollStatus === 'DRAFT' ? (
                    <button
                      onClick={handleProcessPayroll}
                      disabled={isProcessingPayroll}
                      className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isProcessingPayroll ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Memproses...
                        </>
                      ) : (
                        <>
                          <CheckCircle size={20} weight="bold" />
                          Batch ini akan memasuki proses produksi. Pastikan bahan baku &quot;Ready&quot;.
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => toast.success('Email sent!', { description: '45 slip gaji terkirim ke karyawan' })}
                      className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-purple-700"
                    >
                      <Envelope size={20} weight="bold" />
                      Kirim Slip Gaji (Email)
                    </button>
                  )}
                </div>
              </div>

              {/* Enhanced Summary Card */}
              <div className="relative overflow-hidden rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6">
                <div className="absolute top-6 right-6">
                  <span
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-bold shadow-md',
                      payrollStatus === 'DRAFT' && 'bg-yellow-500 text-yellow-900',
                      payrollStatus === 'PAID' && 'bg-green-500 text-white'
                    )}
                  >
                    STATUS: {payrollStatus}
                  </span>
                </div>

                <Briefcase size={64} weight="duotone" className="mb-4 text-purple-600" />
                <h3 className="text-lg font-bold text-purple-900">Payroll Desember 2024</h3>
                <p className="mt-1 text-sm text-purple-700">Total pembayaran gaji bulan ini</p>
                <p className="mt-3 text-4xl font-bold text-purple-900">{formatRupiah(120000000)}</p>

                {/* Mini Stats Row */}
                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-purple-300 pt-4">
                  <div>
                    <p className="text-xs font-medium text-purple-700">Total Karyawan</p>
                    <p className="mt-1 text-xl font-bold text-purple-900">45</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-purple-700">Total Lembur</p>
                    <p className="mt-1 text-xl font-bold text-purple-900">124 Jam</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-purple-700">Potongan Telat</p>
                    <p className="mt-1 text-xl font-bold text-purple-900">{formatRupiah(450000)}</p>
                  </div>
                </div>
              </div>

              {/* Payroll Table with Status Column */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Karyawan</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Gaji Pokok</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Lembur</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Potongan</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Total</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Status</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {PAYROLL_DECEMBER.map((pay) => (
                      <tr key={pay.employeeId} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm font-medium text-slate-900">{pay.employeeName}</td>
                        <td className="px-4 py-3 text-right text-sm text-slate-600">{formatRupiah(pay.baseSalary)}</td>
                        <td className="px-4 py-3 text-right text-sm text-slate-600">
                          {formatRupiah(pay.overtimePay)}
                          <span className="ml-1 text-xs text-slate-400">({pay.overtimeHours}h)</span>
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-red-600">{formatRupiah(pay.deductions)}</td>
                        <td className="px-4 py-3 text-right text-sm font-bold text-emerald-600">
                          {formatRupiah(pay.totalPay)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={cn(
                              'rounded-full px-3 py-1 text-xs font-semibold',
                              payrollStatus === 'DRAFT' && 'bg-yellow-100 text-yellow-700',
                              payrollStatus === 'PAID' && 'bg-green-100 text-green-700'
                            )}
                          >
                            {payrollStatus === 'DRAFT' ? 'Pending' : 'Paid'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleViewPayslip(pay)}
                            className="flex items-center gap-1 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-purple-700"
                          >
                            <Eye size={16} />
                            Lihat Slip
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Recruitment Kanban */}
          {activeTab === 'recruitment' && (
            <div className="overflow-x-auto">
              <div className="flex gap-4 pb-4" style={{ minWidth: '800px' }}>
                {/* Column 1: Aplikasi */}
                <KanbanColumn title="Pelamar Masuk" count={applicantsByStage.APLIKASI.length} color="blue">
                  {applicantsByStage.APLIKASI.map((app) => (
                    <ApplicantCard
                      key={app.id}
                      applicant={app}
                      onClick={() => {
                        setSelectedCandidate(app)
                        setShowCandidateDialog(true)
                      }}
                    />
                  ))}
                </KanbanColumn>

                {/* Column 2: Interview HR */}
                <KanbanColumn title="Interview HR" count={applicantsByStage.INTERVIEW_HR.length} color="yellow">
                  {applicantsByStage.INTERVIEW_HR.map((app) => (
                    <ApplicantCard
                      key={app.id}
                      applicant={app}
                      onClick={() => {
                        setSelectedCandidate(app)
                        setShowCandidateDialog(true)
                      }}
                    />
                  ))}
                </KanbanColumn>

                {/* Column 3: Interview User */}
                <KanbanColumn title="Interview User" count={applicantsByStage.INTERVIEW_USER.length} color="purple">
                  {applicantsByStage.INTERVIEW_USER.map((app) => (
                    <ApplicantCard
                      key={app.id}
                      applicant={app}
                      onClick={() => {
                        setSelectedCandidate(app)
                        setShowCandidateDialog(true)
                      }}
                    />
                  ))}
                </KanbanColumn>

                {/* Column 4: Offering */}
                <KanbanColumn title="Offering" count={applicantsByStage.OFFERING.length} color="green">
                  {applicantsByStage.OFFERING.map((app) => (
                    <ApplicantCard
                      key={app.id}
                      applicant={app}
                      onClick={() => {
                        setSelectedCandidate(app)
                        setShowCandidateDialog(true)
                      }}
                    />
                  ))}
                </KanbanColumn>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Employee Form Dialog */}
      <Dialog open={showFormDialog} onOpenChange={setShowFormDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingEmployee ? 'Edit Karyawan' : 'Tambah Karyawan Baru'}</DialogTitle>
            <DialogDescription>Isi formulir di bawah ini untuk mengelola data karyawan</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Nama Lengkap</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                placeholder="e.g., John Doe"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                placeholder="email@ksfood.id"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Posisi</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                placeholder="e.g., Staff Gudang"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Divisi</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value as Employee['department'] })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option value="GUDANG">Gudang</option>
                <option value="QC">QC Lab</option>
                <option value="FINANCE">Finance</option>
                <option value="SALES">Sales</option>
                <option value="PRODUCTION">Production</option>
                <option value="HR">HR</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Employee['status'] })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option value="TETAP">Tetap</option>
                <option value="KONTRAK">Kontrak</option>
                <option value="PROBATION">Probation</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Gaji Pokok</label>
              <input
                type="number"
                value={formData.baseSalary}
                onChange={(e) => setFormData({ ...formData, baseSalary: Number(e.target.value) })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                placeholder="5000000"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Tanggal Join</label>
              <input
                type="date"
                value={formData.joinDate}
                onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <button
                onClick={handleSubmitForm}
                className="flex-1 rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
              >
                {editingEmployee ? 'Update' : 'Tambah'}
              </button>
              <button
                onClick={() => setShowFormDialog(false)}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Batal
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Yakin ingin menghapus data karyawan <strong>{selectedEmployee?.name}</strong>? Aksi ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Payroll Confirmation Dialog */}
      <AlertDialog open={showPayrollConfirm} onOpenChange={setShowPayrollConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Proses Payroll</AlertDialogTitle>
            <AlertDialogDescription>
              Pastikan semua data lembur & potongan sudah benar. Dana sebesar <strong>{formatRupiah(120000000)}</strong> akan
              dipotong dari Finance. Lanjutkan pembayaran?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmProcessPayroll} className="bg-primary hover:bg-red-700">
              Ya, Proses Payroll
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Payslip Dialog */}
      <Dialog open={showPayslipDialog} onOpenChange={setShowPayslipDialog}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-hidden p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Slip Gaji Karyawan</DialogTitle>
          </DialogHeader>

          <div className="max-h-[calc(90vh-80px)] overflow-y-auto px-6 pb-6">
            {selectedPayslip && (
              <div className="space-y-6">
                {/* Paper Header */}
                <div className="border-b-2 border-slate-200 pb-4 text-center">
                  <h2 className="text-2xl font-bold text-primary">KS FOOD</h2>
                  <p className="text-sm text-slate-600">Slip Gaji Karyawan</p>
                  <p className="mt-2 text-xs font-semibold text-slate-800">Periode: Desember 2024</p>
                </div>

                {/* Employee Info */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 rounded-lg bg-slate-50 p-4 text-sm">
                  <div>
                    <span className="font-medium text-slate-600">Nama:</span>
                    <span className="ml-2 font-semibold text-slate-900">{selectedPayslip.employeeName}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-600">ID:</span>
                    <span className="ml-2 font-mono font-semibold text-slate-900">{selectedPayslip.employeeId}</span>
                  </div>
                </div>

                {/* Income Section */}
                <div>
                  <h4 className="mb-3 font-semibold text-emerald-700">💰 Pendapatan</h4>
                  <div className="space-y-2 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700">Gaji Pokok:</span>
                      <span className="font-semibold text-slate-900">{formatRupiah(selectedPayslip.baseSalary)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700">Tunjangan Makan:</span>
                      <span className="font-semibold text-slate-900">{formatRupiah(750000)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700">Lembur ({selectedPayslip.overtimeHours} jam):</span>
                      <span className="font-semibold text-slate-900">{formatRupiah(selectedPayslip.overtimePay)}</span>
                    </div>
                    <div className="border-t border-emerald-300 pt-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-emerald-800">Total Pendapatan:</span>
                        <span className="text-emerald-800">
                          {formatRupiah(selectedPayslip.baseSalary + 750000 + selectedPayslip.overtimePay)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deduction Section */}
                <div>
                  <h4 className="mb-3 font-semibold text-red-700">📉 Potongan</h4>
                  <div className="space-y-2 rounded-lg border border-red-200 bg-red-50 p-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700">BPJS Kesehatan:</span>
                      <span className="font-semibold text-slate-900">{formatRupiah(100000)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700">PPh 21:</span>
                      <span className="font-semibold text-slate-900">
                        {formatRupiah(selectedPayslip.deductions - 100000)}
                      </span>
                    </div>
                    <div className="border-t border-red-300 pt-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-red-800">Total Potongan:</span>
                        <span className="text-red-800">{formatRupiah(selectedPayslip.deductions)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Take Home Pay */}
                <div className="rounded-xl border-4 border-emerald-600 bg-emerald-50 p-6 text-center">
                  <p className="text-sm font-medium text-emerald-800">Take Home Pay</p>
                  <p className="mt-2 text-4xl font-bold text-emerald-600">{formatRupiah(selectedPayslip.totalPay)}</p>
                </div>

                {/* Footer Signature */}
                <div className="border- t border-slate-200 pt-4 text-center">
                  <p className="text-xs text-slate-500">Authorized by HR Department</p>
                  <p className="mt-4 text-xs font-semibold text-slate-700">Tanda Tangan Digital</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={handleDownloadPDF}
                    className="flex-1 rounded-lg border-2 border-purple-600 px-4 py-3 font-semibold text-purple-600 transition-colors hover:bg-purple-50"
                  >
                    📄 Download PDF
                  </button>
                  <button
                    onClick={handleSendEmail}
                    className="flex-1 rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
                  >
                    📧 Kirim Email
                  </button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Candidate Profile Dialog */}
      <Dialog open={showCandidateDialog} onOpenChange={setShowCandidateDialog}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Profil Kandidat</DialogTitle>
            <DialogDescription>Informasi lengkap pelamar dan riwayat profesional</DialogDescription>
          </DialogHeader>

          <div className="max-h-[calc(90vh-120px)] overflow-y-auto px-6 pb-6">
            {selectedCandidate && (
              <div className="space-y-6">
                {/* Header */}
                <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{selectedCandidate.name}</h2>
                      <p className="mt-1 text-lg text-slate-600">{selectedCandidate.position}</p>
                    </div>
                    <span
                      className={cn(
                        'rounded-full px-4 py-2 text-sm font-semibold',
                        selectedCandidate.stage === 'APLIKASI' && 'bg-blue-100 text-blue-700',
                        selectedCandidate.stage === 'INTERVIEW_HR' && 'bg-yellow-100 text-yellow-700',
                        selectedCandidate.stage === 'INTERVIEW_USER' && 'bg-purple-100 text-purple-700',
                        selectedCandidate.stage === 'OFFERING' && 'bg-green-100 text-green-700'
                      )}
                    >
                      {selectedCandidate.stage.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-500">
                    Applied{' '}
                    {Math.floor(
                      (new Date().getTime() - new Date(selectedCandidate.appliedDate).getTime()) / (1000 * 60 * 60 * 24)
                    )}{' '}
                    days ago • {selectedCandidate.id}
                  </p>
                </div>

                {/* Contact Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={`mailto:${selectedCandidate.email}`}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-primary hover:bg-red-50"
                  >
                    <div className="rounded-lg bg-red-100 p-2">
                      <Envelope size={20} weight="fill" className="text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-500">Email</p>
                      <p className="truncate text-sm font-semibold text-slate-900">{selectedCandidate.email}</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${selectedCandidate.phone}`}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-emerald-500 hover:bg-emerald-50"
                  >
                    <div className="rounded-lg bg-emerald-100 p-2">
                      <Phone size={20} weight="fill" className="text-emerald-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-500">Phone</p>
                      <p className="truncate text-sm font-semibold text-slate-900">{selectedCandidate.phone}</p>
                    </div>
                  </a>

                  {selectedCandidate.linkedin && (
                    <a
                      href={selectedCandidate.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-blue-500 hover:bg-blue-50"
                    >
                      <div className="rounded-lg bg-blue-100 p-2">
                        <LinkedinLogo size={20} weight="fill" className="text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-slate-500">LinkedIn</p>
                        <p className="truncate text-sm font-semibold text-slate-900">View Profile →</p>
                      </div>
                    </a>
                  )}

                  <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="rounded-lg bg-slate-200 p-2">
                      <FileText size={20} weight="fill" className="text-slate-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-500">CV/Resume</p>
                      <p className="truncate text-sm font-semibold text-slate-900">Available</p>
                    </div>
                  </div>
                </div>

                {/* Professional Summary */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase">Professional Summary</h3>
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <p className="leading-relaxed text-slate-700">{selectedCandidate.summary}</p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map((skill, index) => (
                      <span key={index} className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 border-t border-slate-200 pt-6">
                  {/* Primary Action - Download CV */}
                  <button
                    onClick={() => {
                      toast.success('CV berhasil diunduh!', {
                        description: `File: ${selectedCandidate.name.replace(' ', '_')}_CV.pdf`
                      })
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-purple-700 hover:shadow-md"
                  >
                    <FileText size={20} weight="bold" />
                    Download CV / Resume
                  </button>

                  {/* Secondary Actions Row */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <select
                        onChange={(e) => {
                          const newStage = e.target.value as (typeof APPLICANTS)[0]['stage']
                          if (newStage && selectedCandidate) {
                            moveCandidate(selectedCandidate.id, newStage)
                          }
                        }}
                        defaultValue=""
                        className="w-full cursor-pointer rounded-lg border-2 border-emerald-600 bg-white px-4 py-3 font-semibold text-emerald-600 transition-all hover:bg-emerald-50 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      >
                        <option value="" disabled>
                          ✓ Pindah Tahap
                        </option>
                        <option value="APLIKASI" className="text-slate-900">
                          📋 Pelamar Masuk
                        </option>
                        <option value="INTERVIEW_HR" className="text-slate-900">
                          💼 Interview HR
                        </option>
                        <option value="INTERVIEW_USER" className="text-slate-900">
                          👤 Interview User
                        </option>
                        <option value="OFFERING" className="text-slate-900">
                          ✅ Offering
                        </option>
                      </select>
                    </div>

                    <button
                      onClick={() => {
                        toast.error('Kandidat ditolak', {
                          description: `${selectedCandidate.name} telah dihapus dari pipeline`
                        })
                        setShowCandidateDialog(false)
                      }}
                      className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
                    >
                      Tolak
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Kanban Components
function KanbanColumn({
  title,
  count,
  color,
  children
}: {
  title: string
  count: number
  color: string
  children: React.ReactNode
}) {
  const colorClasses = {
    blue: 'bg-blue-100 border-blue-300',
    yellow: 'bg-yellow-100 border-yellow-300',
    purple: 'bg-purple-100 border-purple-300',
    green: 'bg-green-100 border-green-300'
  }

  return (
    <div className="flex-1" style={{ minWidth: '280px' }}>
      <div className={cn('mb-3 rounded-lg border-2 p-3', colorClasses[color as keyof typeof colorClasses])}>
        <h3 className="font-semibold text-slate-800">{title}</h3>
        <p className="text-xs text-slate-600">{count} pelamar</p>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function ApplicantCard({ applicant, onClick }: { applicant: (typeof APPLICANTS)[0]; onClick: () => void }) {
  const daysAgo = Math.floor((new Date().getTime() - new Date(applicant.appliedDate).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:border-primary hover:shadow-md"
    >
      <h4 className="font-semibold text-slate-900">{applicant.name}</h4>
      <p className="mt-1 text-sm text-slate-600">{applicant.position}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>{daysAgo === 0 ? 'Hari ini' : `${daysAgo} hari lalu`}</span>
        <span className="font-mono">{applicant.id}</span>
      </div>
    </div>
  )
}
