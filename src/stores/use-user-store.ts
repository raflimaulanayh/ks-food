import { create } from 'zustand'

export type Staff = {
  id: number
  name: string
  email: string
  role: 'PIMPINAN' | 'ADMIN' | 'HR' | 'FINANCE' | 'PROCUREMENT' | 'WAREHOUSE' | 'QC'
  phone: string
  status: 'Active' | 'Suspended'
  joinDate: string
}

export type Customer = {
  id: number
  name: string
  email: string
  phone: string
  company: string
  status: 'Active' | 'Inactive'
  joinDate: string
}

interface UserStore {
  staffList: Staff[]
  customerList: Customer[]
  addStaff: (staff: Staff) => void
  updateStaff: (id: number, data: Partial<Staff>) => void
  deleteStaff: (id: number) => void
  addCustomer: (customer: Customer) => void
  updateCustomer: (id: number, data: Partial<Customer>) => void
  deleteCustomer: (id: number) => void
}

export const useUserStore = create<UserStore>((set) => ({
  staffList: [
    {
      id: 1,
      name: 'Grace Indriani',
      email: 'grace@ksfood.co.id',
      role: 'PIMPINAN',
      phone: '081234567801',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 2,
      name: 'Budi Santoso',
      email: 'budi@ksfood.co.id',
      role: 'WAREHOUSE',
      phone: '081234567802',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 3,
      name: 'Joko Susilo',
      email: 'joko@ksfood.co.id',
      role: 'QC',
      phone: '081234567803',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 4,
      name: 'Siti Aminah',
      email: 'siti@ksfood.co.id',
      role: 'QC',
      phone: '081234567804',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 5,
      name: 'Eko Prasetyo',
      email: 'eko@ksfood.co.id',
      role: 'FINANCE',
      phone: '081234567805',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 6,
      name: 'Ratna Sari',
      email: 'ratna@ksfood.co.id',
      role: 'HR',
      phone: '081234567806',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 7,
      name: 'Agus Setiawan',
      email: 'agus@ksfood.co.id',
      role: 'ADMIN',
      phone: '081234567807',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 8,
      name: 'Dewi Lestari',
      email: 'dewi@ksfood.co.id',
      role: 'ADMIN',
      phone: '081234567808',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 9,
      name: 'Hendra Wijaya',
      email: 'hendra@ksfood.co.id',
      role: 'PROCUREMENT',
      phone: '081234567809',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 10,
      name: 'Megaawati Putri',
      email: 'mega@ksfood.co.id',
      role: 'WAREHOUSE',
      phone: '0812345678010',
      status: 'Active',
      joinDate: '2026-06-01'
    }
  ],

  customerList: [
    {
      id: 1,
      name: 'Budi Hartono',
      email: 'budi_ret@gmail.com',
      phone: '081333333001',
      company: 'Personal/Retail',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 2,
      name: 'Ani Hartono',
      email: 'ani_ret@gmail.com',
      phone: '081333333002',
      company: 'Personal/Retail',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 3,
      name: 'Candra Hartono',
      email: 'candra_ret@gmail.com',
      phone: '081333333003',
      company: 'Personal/Retail',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 4,
      name: 'Diana Hartono',
      email: 'diana_ret@gmail.com',
      phone: '081333333004',
      company: 'Personal/Retail',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 5,
      name: 'Erik Hartono',
      email: 'erik_ret@gmail.com',
      phone: '081333333005',
      company: 'Personal/Retail',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 6,
      name: 'Fiona Hartono',
      email: 'fiona_ret@gmail.com',
      phone: '081333333006',
      company: 'Personal/Retail',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 7,
      name: 'Gandi Hartono',
      email: 'gandi_ret@gmail.com',
      phone: '081333333007',
      company: 'Personal/Retail',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 8,
      name: 'Hilda Hartono',
      email: 'hilda_ret@gmail.com',
      phone: '081333333008',
      company: 'Personal/Retail',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 9,
      name: 'Indra Hartono',
      email: 'indra_ret@gmail.com',
      phone: '081333333009',
      company: 'Personal/Retail',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 10,
      name: 'Julia Hartono',
      email: 'julia_ret@gmail.com',
      phone: '081333333010',
      company: 'Personal/Retail',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 11,
      name: 'Kiki Hartono',
      email: 'kiki_ret@gmail.com',
      phone: '081333333011',
      company: 'Personal/Retail',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 12,
      name: 'Lisa Hartono',
      email: 'lisa_ret@gmail.com',
      phone: '081333333012',
      company: 'Personal/Retail',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 13,
      name: 'PT Mayora Indah Tbk',
      email: 'procurement@mayora.co.id',
      phone: '0215555001',
      company: 'PT Mayora Indah Tbk',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 14,
      name: 'PT Gokana Resto Indonesia',
      email: 'procurement@gokana.co.id',
      phone: '0215555002',
      company: 'PT Gokana Resto Indonesia',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 15,
      name: 'PT Garuda Food Putra Putri Tbk',
      email: 'procurement@garudafood.co.id',
      phone: '0215555003',
      company: 'PT Garuda Food Putra Putri Tbk',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 16,
      name: 'PT Indofood CBP Sukses Makmur',
      email: 'procurement@indofood.co.id',
      phone: '0215555004',
      company: 'PT Indofood CBP Sukses Makmur',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 17,
      name: 'PT Wings Surya',
      email: 'procurement@wings.co.id',
      phone: '0215555005',
      company: 'PT Wings Surya',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 18,
      name: 'PT ABC President Indonesia',
      email: 'procurement@abc.co.id',
      phone: '0215555006',
      company: 'PT ABC President Indonesia',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 19,
      name: 'PT Sasa Inti',
      email: 'procurement@sasa.co.id',
      phone: '0215555007',
      company: 'PT Sasa Inti',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 20,
      name: 'PT Ajinomoto Indonesia',
      email: 'procurement@ajinomoto.co.id',
      phone: '0215555008',
      company: 'PT Ajinomoto Indonesia',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 21,
      name: 'PT Kobe Boga Utama',
      email: 'procurement@kobe.co.id',
      phone: '0215555009',
      company: 'PT Kobe Boga Utama',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 22,
      name: 'PT Nutrifood Indonesia',
      email: 'procurement@nutrifood.co.id',
      phone: '0215555010',
      company: 'PT Nutrifood Indonesia',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 23,
      name: 'PT Unilever Indonesia Tbk',
      email: 'procurement@unilever.co.id',
      phone: '0215555011',
      company: 'PT Unilever Indonesia Tbk',
      status: 'Active',
      joinDate: '2026-06-01'
    },
    {
      id: 24,
      name: 'PT Nestle Indonesia',
      email: 'procurement@nestle.co.id',
      phone: '0215555012',
      company: 'PT Nestle Indonesia',
      status: 'Active',
      joinDate: '2026-06-01'
    }
  ],

  addStaff: (staff) =>
    set((state) => ({
      staffList: [...state.staffList, staff]
    })),

  updateStaff: (id, data) =>
    set((state) => ({
      staffList: state.staffList.map((s) => (s.id === id ? { ...s, ...data } : s))
    })),

  deleteStaff: (id) =>
    set((state) => ({
      staffList: state.staffList.filter((s) => s.id !== id)
    })),

  addCustomer: (customer) =>
    set((state) => ({
      customerList: [...state.customerList, customer]
    })),

  updateCustomer: (id, data) =>
    set((state) => ({
      customerList: state.customerList.map((c) => (c.id === id ? { ...c, ...data } : c))
    })),

  deleteCustomer: (id) =>
    set((state) => ({
      customerList: state.customerList.filter((c) => c.id !== id)
    }))
}))
