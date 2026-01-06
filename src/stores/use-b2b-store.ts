import { create } from 'zustand'

export interface B2BInquiry {
  id: string
  companyName: string
  picName: string
  email: string
  phone: string
  requirements: string
  status: 'pending' | 'contacted' | 'converted' | 'rejected'
  createdAt: Date
  convertedOrderId?: string
}

export interface B2BOrder {
  id: string
  inquiryId: string
  companyName: string
  picName: string
  email: string
  phone: string

  // Detailed order info (filled by admin)
  products: Array<{
    id: string
    name: string
    quantity: number
    unit: string
    price: number
  }>
  totalAmount: number
  paymentTerm: string // TOP: 30 days, 45 days, etc.
  shippingAddress: string
  npwp?: string
  taxInvoiceRequired: boolean

  status: 'confirmed' | 'ready_to_ship' | 'processing' | 'shipped' | 'delivered'
  notes?: string
  createdAt: Date
  createdBy: string
}

interface B2BStore {
  inquiries: B2BInquiry[]
  orders: B2BOrder[]

  addInquiry: (inquiry: Omit<B2BInquiry, 'id' | 'status' | 'createdAt'>) => void
  updateInquiryStatus: (id: string, status: B2BInquiry['status']) => void
  convertToOrder: (
    inquiryId: string,
    orderData: Omit<B2BOrder, 'id' | 'inquiryId' | 'createdAt' | 'companyName' | 'picName' | 'email' | 'phone'>
  ) => void
  updateOrderStatus: (id: string, status: B2BOrder['status']) => void
}

export const useB2BStore = create<B2BStore>((set) => ({
  inquiries: [
    {
      id: 'INQ-001',
      companyName: 'PT Gokana Resto',
      picName: 'Budi Santoso',
      email: 'procurement@gokana.com',
      phone: '0211234567',
      requirements: 'Butuh sambal bawang 20L per minggu untuk 15 outlet di Jakarta',
      status: 'pending',
      createdAt: new Date('2026-01-05')
    },
    {
      id: 'INQ-002',
      companyName: 'PT Indomarco Prismatama',
      picName: 'Siti Nurhaliza',
      email: 'buyer@indomaret.co.id',
      phone: '0216356666',
      requirements: 'Sampling kecap manis 600ml untuk listing produk di 500 toko Indomaret region Jabodetabek',
      status: 'contacted',
      createdAt: new Date('2026-01-04')
    },
    {
      id: 'INQ-003',
      companyName: 'CV Warung Kita',
      picName: 'Ahmad Fauzi',
      email: 'owner@warungkita.id',
      phone: '08197888777',
      requirements: 'Saus tomat premium 1L sebanyak 50 botol per bulan',
      status: 'converted',
      createdAt: new Date('2026-01-03'),
      convertedOrderId: 'B2B-001'
    }
  ],

  orders: [
    {
      id: 'B2B-001',
      inquiryId: 'INQ-003',
      companyName: 'CV Warung Kita',
      picName: 'Ahmad Fauzi',
      email: 'owner@warungkita.id',
      phone: '08197888777',
      products: [
        {
          id: 'prod-003',
          name: 'Saus Tomat Premium 1L',
          quantity: 50,
          unit: 'botol',
          price: 45000
        }
      ],
      totalAmount: 2250000,
      paymentTerm: '30 hari setelah invoice',
      shippingAddress: 'Jl. Raya Bogor KM 25, Cibinong, Bogor 16914',
      npwp: '01.234.567.8-901.000',
      taxInvoiceRequired: true,
      status: 'confirmed',
      notes: 'Pengiriman setiap tanggal 1 setiap bulan',
      createdAt: new Date('2026-01-04'),
      createdBy: 'Admin'
    },
    {
      id: 'B2B-004',
      inquiryId: 'INQ-004',
      companyName: 'PT Mayora Indah',
      picName: 'Dewi Lestari',
      email: 'procurement@mayora.com',
      phone: '0216565321',
      products: [
        {
          id: 'prod-001',
          name: 'Sambal Bawang Original 250ml',
          quantity: 200,
          unit: 'botol',
          price: 18000
        }
      ],
      totalAmount: 3600000,
      paymentTerm: '45 hari setelah invoice',
      shippingAddress: 'Jl. Tomang Raya No. 21-23, Jakarta Barat 11440',
      npwp: '02.345.678.9-012.000',
      taxInvoiceRequired: true,
      status: 'ready_to_ship',
      notes: 'Prioritas pengiriman',
      createdAt: new Date('2026-01-02'),
      createdBy: 'Admin'
    }
  ],

  addInquiry: (inquiry) =>
    set((state) => ({
      inquiries: [
        {
          ...inquiry,
          id: `INQ-${String(state.inquiries.length + 1).padStart(3, '0')}`,
          status: 'pending',
          createdAt: new Date()
        },
        ...state.inquiries
      ]
    })),

  updateInquiryStatus: (id, status) =>
    set((state) => ({
      inquiries: state.inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    })),

  convertToOrder: (inquiryId, orderData) =>
    set((state) => {
      const inquiry = state.inquiries.find((inq) => inq.id === inquiryId)
      if (!inquiry) return state

      const newOrderId = `B2B-${String(state.orders.length + 1).padStart(3, '0')}`

      return {
        inquiries: state.inquiries.map((inq) =>
          inq.id === inquiryId ? { ...inq, status: 'converted' as const, convertedOrderId: newOrderId } : inq
        ),
        orders: [
          {
            ...orderData,
            id: newOrderId,
            inquiryId,
            companyName: inquiry.companyName,
            picName: inquiry.picName,
            email: inquiry.email,
            phone: inquiry.phone,
            createdAt: new Date()
          },
          ...state.orders
        ]
      }
    }),

  updateOrderStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((order) => (order.id === id ? { ...order, status } : order))
    }))
}))
