import { create } from 'zustand'

export type Staff = {
  id: number
  name: string
  email: string
  role: 'PIMPINAN' | 'ADMIN' | 'HR' | 'FINANCE' | 'PROCUREMENT' | 'WAREHOUSE' | 'QC_LAB'
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
      name: 'Rafli Maulana',
      email: 'rafli@ksfood.id',
      role: 'PIMPINAN',
      phone: '08123456789',
      status: 'Active',
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Siti Aminah',
      email: 'siti@ksfood.id',
      role: 'HR',
      phone: '08198765432',
      status: 'Active',
      joinDate: '2023-03-20'
    },
    {
      id: 3,
      name: 'Budi Santoso',
      email: 'budi@ksfood.id',
      role: 'WAREHOUSE',
      phone: '081299887766',
      status: 'Active',
      joinDate: '2024-02-10'
    },
    {
      id: 4,
      name: 'Andi Saputra',
      email: 'andi@ksfood.id',
      role: 'PROCUREMENT',
      phone: '085677889900',
      status: 'Suspended',
      joinDate: '2024-12-05'
    },
    {
      id: 5,
      name: 'Dewi Lestari',
      email: 'dewi@ksfood.id',
      role: 'FINANCE',
      phone: '081234567890',
      status: 'Active',
      joinDate: '2023-04-05'
    }
  ],

  customerList: [
    {
      id: 1,
      name: 'PT Maju Jaya',
      email: 'contact@majujaya.com',
      phone: '0811223344',
      company: 'PT Maju Jaya',
      status: 'Active',
      joinDate: '2024-01-10'
    },
    {
      id: 2,
      name: 'CV Berkah Sentosa',
      email: 'info@berkahsentosa.com',
      phone: '0815667788',
      company: 'CV Berkah Sentosa',
      status: 'Active',
      joinDate: '2024-02-15'
    },
    {
      id: 3,
      name: 'Toko Sumber Rezeki',
      email: 'toko@sumberrezeki.com',
      phone: '0819988776',
      company: 'Toko Sumber Rezeki',
      status: 'Active',
      joinDate: '2024-03-20'
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
