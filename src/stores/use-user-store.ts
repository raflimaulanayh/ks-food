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

export type Address = {
  addressId: string
  customerId: string
  label: string
  fullAddress: string
  city: string
  province: string
  postalCode: string
  isPrimary: boolean
}

interface UserStore {
  staffList: Staff[]
  customerList: Customer[]
  addressList: Address[]
  addStaff: (staff: Staff) => void
  updateStaff: (id: number, data: Partial<Staff>) => void
  deleteStaff: (id: number) => void
  addCustomer: (customer: Customer) => void
  updateCustomer: (id: number, data: Partial<Customer>) => void
  deleteCustomer: (id: number) => void
  addAddress: (address: Address) => void
  updateAddress: (addressId: string, data: Partial<Address>) => void
  deleteAddress: (addressId: string) => void
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

  addressList: [
    // Retail Customer Addresses
    {
      addressId: 'ADDR-RET-001',
      customerId: 'CUST-RET-001',
      label: 'Rumah Budi (Utama)',
      fullAddress: 'Jl. Kebon Jeruk Indah No. 1',
      city: 'Jakarta Barat',
      province: 'DKI Jakarta',
      postalCode: '11530',
      isPrimary: true
    },
    {
      addressId: 'ADDR-RET-001-KANTOR',
      customerId: 'CUST-RET-001',
      label: 'Kantor Budi',
      fullAddress: 'Jl. Sudirman Kav 21, Gedung Chase Plaza Lt. 10',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12190',
      isPrimary: false
    },
    {
      addressId: 'ADDR-RET-001-APART',
      customerId: 'CUST-RET-001',
      label: 'Apartemen Budi',
      fullAddress: 'Apartemen Green Bay Tower D Lnt 12 No. 5',
      city: 'Jakarta Utara',
      province: 'DKI Jakarta',
      postalCode: '14450',
      isPrimary: false
    },
    {
      addressId: 'ADDR-RET-002',
      customerId: 'CUST-RET-002',
      label: 'Rumah Ani',
      fullAddress: 'Jl. Kebon Jeruk Indah No. 2',
      city: 'Jakarta Barat',
      province: 'DKI Jakarta',
      postalCode: '11530',
      isPrimary: true
    },
    {
      addressId: 'ADDR-RET-003',
      customerId: 'CUST-RET-003',
      label: 'Rumah Candra',
      fullAddress: 'Jl. Kebon Jeruk Indah No. 3',
      city: 'Jakarta Barat',
      province: 'DKI Jakarta',
      postalCode: '11530',
      isPrimary: true
    },
    {
      addressId: 'ADDR-RET-004',
      customerId: 'CUST-RET-004',
      label: 'Rumah Diana',
      fullAddress: 'Jl. Kebon Jeruk Indah No. 4',
      city: 'Jakarta Barat',
      province: 'DKI Jakarta',
      postalCode: '11530',
      isPrimary: true
    },
    {
      addressId: 'ADDR-RET-005',
      customerId: 'CUST-RET-005',
      label: 'Rumah Erik',
      fullAddress: 'Jl. Kebon Jeruk Indah No. 5',
      city: 'Jakarta Barat',
      province: 'DKI Jakarta',
      postalCode: '11530',
      isPrimary: true
    },
    {
      addressId: 'ADDR-RET-006',
      customerId: 'CUST-RET-006',
      label: 'Rumah Fiona',
      fullAddress: 'Jl. Kebon Jeruk Indah No. 6',
      city: 'Jakarta Barat',
      province: 'DKI Jakarta',
      postalCode: '11530',
      isPrimary: true
    },
    {
      addressId: 'ADDR-RET-007',
      customerId: 'CUST-RET-007',
      label: 'Rumah Gandi',
      fullAddress: 'Jl. Kebon Jeruk Indah No. 7',
      city: 'Jakarta Barat',
      province: 'DKI Jakarta',
      postalCode: '11530',
      isPrimary: true
    },
    {
      addressId: 'ADDR-RET-008',
      customerId: 'CUST-RET-008',
      label: 'Rumah Hilda',
      fullAddress: 'Jl. Kebon Jeruk Indah No. 8',
      city: 'Jakarta Barat',
      province: 'DKI Jakarta',
      postalCode: '11530',
      isPrimary: true
    },
    {
      addressId: 'ADDR-RET-009',
      customerId: 'CUST-RET-009',
      label: 'Rumah Indra',
      fullAddress: 'Jl. Kebon Jeruk Indah No. 9',
      city: 'Jakarta Barat',
      province: 'DKI Jakarta',
      postalCode: '11530',
      isPrimary: true
    },
    {
      addressId: 'ADDR-RET-010',
      customerId: 'CUST-RET-010',
      label: 'Rumah Julia',
      fullAddress: 'Jl. Kebon Jeruk Indah No. 10',
      city: 'Jakarta Barat',
      province: 'DKI Jakarta',
      postalCode: '11530',
      isPrimary: true
    },
    {
      addressId: 'ADDR-RET-011',
      customerId: 'CUST-RET-011',
      label: 'Rumah Kiki',
      fullAddress: 'Jl. Kebon Jeruk Indah No. 11',
      city: 'Jakarta Barat',
      province: 'DKI Jakarta',
      postalCode: '11530',
      isPrimary: true
    },
    {
      addressId: 'ADDR-RET-012',
      customerId: 'CUST-RET-012',
      label: 'Rumah Lisa',
      fullAddress: 'Jl. Kebon Jeruk Indah No. 12',
      city: 'Jakarta Barat',
      province: 'DKI Jakarta',
      postalCode: '11530',
      isPrimary: true
    },
    // Corporate Customer Addresses
    {
      addressId: 'ADDR-CORP-001',
      customerId: 'CUST-CORP-001',
      label: 'Gudang Pusat Mayora',
      fullAddress: 'Kawasan Industri Cikarang Blok C/1',
      city: 'Tangerang',
      province: 'Banten',
      postalCode: '15136',
      isPrimary: true
    },
    {
      addressId: 'ADDR-CORP-002',
      customerId: 'CUST-CORP-002',
      label: 'Gudang Pusat Gokana',
      fullAddress: 'Kawasan Industri Cikarang Blok C/2',
      city: 'Tangerang',
      province: 'Banten',
      postalCode: '15136',
      isPrimary: true
    },
    {
      addressId: 'ADDR-CORP-003',
      customerId: 'CUST-CORP-003',
      label: 'Gudang Pusat Garuda',
      fullAddress: 'Kawasan Industri Cikarang Blok C/3',
      city: 'Tangerang',
      province: 'Banten',
      postalCode: '15136',
      isPrimary: true
    },
    {
      addressId: 'ADDR-CORP-004',
      customerId: 'CUST-CORP-004',
      label: 'Gudang Pusat Indofood',
      fullAddress: 'Kawasan Industri Cikarang Blok C/4',
      city: 'Tangerang',
      province: 'Banten',
      postalCode: '15136',
      isPrimary: true
    },
    {
      addressId: 'ADDR-CORP-005',
      customerId: 'CUST-CORP-005',
      label: 'Gudang Pusat Wings',
      fullAddress: 'Kawasan Industri Cikarang Blok C/5',
      city: 'Tangerang',
      province: 'Banten',
      postalCode: '15136',
      isPrimary: true
    },
    {
      addressId: 'ADDR-CORP-006',
      customerId: 'CUST-CORP-006',
      label: 'Gudang Pusat ABC',
      fullAddress: 'Kawasan Industri Cikarang Blok C/6',
      city: 'Tangerang',
      province: 'Banten',
      postalCode: '15136',
      isPrimary: true
    },
    {
      addressId: 'ADDR-CORP-007',
      customerId: 'CUST-CORP-007',
      label: 'Gudang Pusat Sasa',
      fullAddress: 'Kawasan Industri Cikarang Blok C/7',
      city: 'Tangerang',
      province: 'Banten',
      postalCode: '15136',
      isPrimary: true
    },
    {
      addressId: 'ADDR-CORP-008',
      customerId: 'CUST-CORP-008',
      label: 'Gudang Pusat Ajinomoto',
      fullAddress: 'Kawasan Industri Cikarang Blok C/8',
      city: 'Tangerang',
      province: 'Banten',
      postalCode: '15136',
      isPrimary: true
    },
    {
      addressId: 'ADDR-CORP-009',
      customerId: 'CUST-CORP-009',
      label: 'Gudang Pusat Kobe',
      fullAddress: 'Kawasan Industri Cikarang Blok C/9',
      city: 'Tangerang',
      province: 'Banten',
      postalCode: '15136',
      isPrimary: true
    },
    {
      addressId: 'ADDR-CORP-010',
      customerId: 'CUST-CORP-010',
      label: 'Gudang Pusat Nutrifood',
      fullAddress: 'Kawasan Industri Cikarang Blok C/10',
      city: 'Tangerang',
      province: 'Banten',
      postalCode: '15136',
      isPrimary: true
    },
    {
      addressId: 'ADDR-CORP-011',
      customerId: 'CUST-CORP-011',
      label: 'Gudang Pusat Unilever',
      fullAddress: 'Kawasan Industri Cikarang Blok C/11',
      city: 'Tangerang',
      province: 'Banten',
      postalCode: '15136',
      isPrimary: true
    },
    {
      addressId: 'ADDR-CORP-012',
      customerId: 'CUST-CORP-012',
      label: 'Gudang Pusat Nestle',
      fullAddress: 'Kawasan Industri Cikarang Blok C/12',
      city: 'Tangerang',
      province: 'Banten',
      postalCode: '15136',
      isPrimary: true
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
    })),

  addAddress: (address) =>
    set((state) => ({
      addressList: [...state.addressList, address]
    })),

  updateAddress: (addressId, data) =>
    set((state) => ({
      addressList: state.addressList.map((a) => (a.addressId === addressId ? { ...a, ...data } : a))
    })),

  deleteAddress: (addressId) =>
    set((state) => ({
      addressList: state.addressList.filter((a) => a.addressId !== addressId)
    }))
}))
