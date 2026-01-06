import { create } from 'zustand'

export type OrderSource = 'SHOPEE' | 'TOKOPEDIA' | 'BLIBLI' | 'INTERNAL' | 'B2B'
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'READY_TO_SHIP' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
export type PaymentStatus = 'UNPAID' | 'PAID' | 'REFUNDED'

export interface OrderProduct {
  name: string
  qty: number
  price: number
  unit: string
}

export interface OrderReview {
  rating: number // 1-5
  comment: string
  date: Date
}

export interface Order {
  id: string
  orderNumber: string
  source: OrderSource
  customer: {
    name: string
    email: string
    phone: string
  }
  products: OrderProduct[]
  totalAmount: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: string
  shippingAddress: string
  shippingCourier?: string
  trackingNumber?: string
  date: Date
  notes?: string
  contractNumber?: string // For B2B
  review?: OrderReview // Customer review
}

interface OrderState {
  orders: Order[]
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  getOrdersBySource: (source: OrderSource | 'ALL') => Order[]
  searchOrders: (query: string) => Order[]
  addReview: (orderId: string, rating: number, comment: string) => void
  addOrder: (order: {
    id: string
    date: string
    items: { id: string; name: string; price: number; quantity: number; image: string }[]
    total: number
    status: string
    paymentMethod: string
    address: string
  }) => void
}

// Mock Data
const mockOrders: Order[] = [
  // SHOPEE ORDERS
  {
    id: '1',
    orderNumber: 'SHP-001',
    source: 'SHOPEE',
    customer: {
      name: 'Ani Kusuma',
      email: 'ani@gmail.com',
      phone: '081234567890'
    },
    products: [
      { name: 'Saos Sambal Bawang 500ml', qty: 2, price: 25000, unit: 'Botol' },
      { name: 'Bumbu Rendang 100g', qty: 1, price: 15000, unit: 'Pack' }
    ],
    totalAmount: 65000,
    status: 'PENDING',
    paymentStatus: 'PAID',
    paymentMethod: 'Shopee Pay',
    shippingAddress: 'Jl. Sudirman No. 123, Jakarta Pusat',
    shippingCourier: 'J&T Express',
    date: new Date('2026-01-05T10:30:00'),
    notes: 'Mohon packing rapi'
  },
  {
    id: '2',
    orderNumber: 'SHP-002',
    source: 'SHOPEE',
    customer: {
      name: 'Budi Santoso',
      email: 'budi@yahoo.com',
      phone: '082345678901'
    },
    products: [{ name: 'Saos Tomat Premium 1L', qty: 3, price: 45000, unit: 'Botol' }],
    totalAmount: 135000,
    status: 'PROCESSING',
    paymentStatus: 'PAID',
    paymentMethod: 'COD',
    shippingAddress: 'Jl. Gatot Subroto No. 45, Bandung',
    shippingCourier: 'SiCepat',
    date: new Date('2026-01-05T11:15:00')
  },
  {
    id: '3',
    orderNumber: 'SHP-003',
    source: 'SHOPEE',
    customer: {
      name: 'Citra Dewi',
      email: 'citra@outlook.com',
      phone: '083456789012'
    },
    products: [
      { name: 'Saos Sambal Bawang 500ml', qty: 5, price: 25000, unit: 'Botol' },
      { name: 'Saos ABC Pedas 340ml', qty: 3, price: 18000, unit: 'Botol' }
    ],
    totalAmount: 179000,
    status: 'SHIPPED',
    paymentStatus: 'PAID',
    paymentMethod: 'Transfer Bank',
    shippingAddress: 'Jl. Veteran No. 78, Surabaya',
    shippingCourier: 'JNE',
    trackingNumber: 'JNE1234567890',
    date: new Date('2026-01-04T14:20:00')
  },
  {
    id: '4',
    orderNumber: 'SHP-004',
    source: 'SHOPEE',
    customer: {
      name: 'Deni Pratama',
      email: 'deni@gmail.com',
      phone: '084567890123'
    },
    products: [{ name: 'Bumbu Kari Instan 75g', qty: 10, price: 12000, unit: 'Pack' }],
    totalAmount: 120000,
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    paymentMethod: 'ShopeePay',
    shippingAddress: 'Jl. Ahmad Yani No. 90, Semarang',
    shippingCourier: 'Ninja Express',
    trackingNumber: 'NINJA9876543210',
    date: new Date('2026-01-03T09:00:00')
  },
  {
    id: '5',
    orderNumber: 'SHP-005',
    source: 'SHOPEE',
    customer: {
      name: 'Eka Putri',
      email: 'eka@hotmail.com',
      phone: '085678901234'
    },
    products: [{ name: 'Saos Sambal Original 250ml', qty: 4, price: 15000, unit: 'Botol' }],
    totalAmount: 60000,
    status: 'READY_TO_SHIP',
    paymentStatus: 'PAID',
    paymentMethod: 'Indomaret',
    shippingAddress: 'Jl. Diponegoro No. 56, Yogyakarta',
    shippingCourier: 'Anteraja',
    date: new Date('2026-01-05T13:45:00')
  },

  // TOKOPEDIA ORDERS
  {
    id: '6',
    orderNumber: 'TKP-001',
    source: 'TOKOPEDIA',
    customer: {
      name: 'Fitri Handayani',
      email: 'fitri@gmail.com',
      phone: '086789012345'
    },
    products: [
      { name: 'Saos Tomat Premium 1L', qty: 2, price: 45000, unit: 'Botol' },
      { name: 'Bumbu Rendang 100g', qty: 2, price: 15000, unit: 'Pack' }
    ],
    totalAmount: 120000,
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    paymentMethod: 'OVO',
    shippingAddress: 'Jl. Malioboro No. 12, Yogyakarta',
    shippingCourier: 'GoSend',
    date: new Date('2026-01-05T15:30:00')
  },
  {
    id: '7',
    orderNumber: 'TKP-002',
    source: 'TOKOPEDIA',
    customer: {
      name: 'Gina Marlina',
      email: 'gina@tokopedia.com',
      phone: '087890123456'
    },
    products: [{ name: 'Saos ABC Manis 340ml', qty: 6, price: 16000, unit: 'Botol' }],
    totalAmount: 96000,
    status: 'PROCESSING',
    paymentStatus: 'PAID',
    paymentMethod: 'GoPay',
    shippingAddress: 'Jl. Thamrin No. 34, Jakarta Selatan',
    shippingCourier: 'Grab Express',
    date: new Date('2026-01-05T08:20:00')
  },
  {
    id: '8',
    orderNumber: 'TKP-003',
    source: 'TOKOPEDIA',
    customer: {
      name: 'Hadi Wijaya',
      email: 'hadi@yahoo.com',
      phone: '088901234567'
    },
    products: [{ name: 'Saos Sambal Bawang 500ml', qty: 8, price: 25000, unit: 'Botol' }],
    totalAmount: 200000,
    status: 'SHIPPED',
    paymentStatus: 'PAID',
    paymentMethod: 'Virtual Account BCA',
    shippingAddress: 'Jl. Pahlawan No. 67, Medan',
    shippingCourier: 'JNE',
    trackingNumber: 'JNE0987654321',
    date: new Date('2026-01-04T16:00:00')
  },
  {
    id: '9',
    orderNumber: 'TKP-004',
    source: 'TOKOPEDIA',
    customer: {
      name: 'Indah Permata',
      email: 'indah@gmail.com',
      phone: '089012345678'
    },
    products: [{ name: 'Bumbu Soto Ayam 50g', qty: 15, price: 10000, unit: 'Pack' }],
    totalAmount: 150000,
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    paymentMethod: 'Kredivo',
    shippingAddress: 'Jl. Kemerdekaan No. 89, Bandung',
    shippingCourier: 'SiCepat',
    trackingNumber: 'SICEPAT1234567',
    date: new Date('2026-01-02T10:15:00')
  },

  // BLIBLI ORDERS
  {
    id: '10',
    orderNumber: 'BLI-001',
    source: 'BLIBLI',
    customer: {
      name: 'Joko Susanto',
      email: 'joko@blibli.com',
      phone: '081122334455'
    },
    products: [
      { name: 'Saos Tomat Premium 1L', qty: 4, price: 45000, unit: 'Botol' },
      { name: 'Saos ABC Pedas 340ml', qty: 4, price: 18000, unit: 'Botol' }
    ],
    totalAmount: 252000,
    status: 'PENDING',
    paymentStatus: 'PAID',
    paymentMethod: 'BCA Klikpay',
    shippingAddress: 'Jl. Cikini Raya No. 23, Jakarta Pusat',
    date: new Date('2026-01-05T12:00:00')
  },
  {
    id: '11',
    orderNumber: 'BLI-002',
    source: 'BLIBLI',
    customer: {
      name: 'Kiki Amelia',
      email: 'kiki@outlook.com',
      phone: '082233445566'
    },
    products: [{ name: 'Bumbu Rendang 100g', qty: 10, price: 15000, unit: 'Pack' }],
    totalAmount: 150000,
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    paymentMethod: 'Mandiri Clickpay',
    shippingAddress: 'Jl. Pemuda No. 45, Surabaya',
    shippingCourier: 'Blibli Express',
    date: new Date('2026-01-05T14:30:00')
  },
  {
    id: '12',
    orderNumber: 'BLI-003',
    source: 'BLIBLI',
    customer: {
      name: 'Lina Sari',
      email: 'lina@gmail.com',
      phone: '083344556677'
    },
    products: [{ name: 'Saos Sambal Original 250ml', qty: 12, price: 15000, unit: 'Botol' }],
    totalAmount: 180000,
    status: 'READY_TO_SHIP',
    paymentStatus: 'PAID',
    paymentMethod: 'Credit Card',
    shippingAddress: 'Jl. Asia Afrika No. 78, Bandung',
    shippingCourier: 'Blibli Express',
    date: new Date('2026-01-05T09:45:00')
  },

  // INTERNAL E-COMMERCE
  {
    id: '13',
    orderNumber: 'WEB-001',
    source: 'INTERNAL',
    customer: {
      name: 'Maya Angelina',
      email: 'maya@ksfood.com',
      phone: '084455667788'
    },
    products: [
      { name: 'Saos Sambal Bawang 500ml', qty: 10, price: 25000, unit: 'Botol' },
      { name: 'Bumbu Kari Instan 75g', qty: 5, price: 12000, unit: 'Pack' }
    ],
    totalAmount: 310000,
    status: 'PROCESSING',
    paymentStatus: 'PAID',
    paymentMethod: 'Transfer Bank BRI',
    shippingAddress: 'Jl. Sudirman No. 234, Jakarta Barat',
    shippingCourier: 'JNE',
    date: new Date('2026-01-05T11:00:00'),
    notes: 'Tolong kirim secepatnya'
  },
  {
    id: '14',
    orderNumber: 'WEB-002',
    source: 'INTERNAL',
    customer: {
      name: 'Nanda Pratiwi',
      email: 'nanda@yahoo.com',
      phone: '085566778899'
    },
    products: [{ name: 'Saos Tomat Premium 1L', qty: 5, price: 45000, unit: 'Botol' }],
    totalAmount: 225000,
    status: 'SHIPPED',
    paymentStatus: 'PAID',
    paymentMethod: 'QRIS',
    shippingAddress: 'Jl. Raya Bogor No. 56, Depok',
    shippingCourier: 'SiCepat',
    trackingNumber: 'SICEPAT9876543',
    date: new Date('2026-01-04T13:20:00')
  },
  {
    id: '15',
    orderNumber: 'WEB-003',
    source: 'INTERNAL',
    customer: {
      name: 'Omar Hakim',
      email: 'omar@gmail.com',
      phone: '086677889900'
    },
    products: [{ name: 'Saos ABC Manis 340ml', qty: 20, price: 16000, unit: 'Botol' }],
    totalAmount: 320000,
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    paymentMethod: 'Transfer Bank Mandiri',
    shippingAddress: 'Jl. Gatot Kaca No. 12, Bekasi',
    shippingCourier: 'Anteraja',
    trackingNumber: 'ANTERAJA123456',
    date: new Date('2026-01-02T15:40:00')
  },
  {
    id: '16',
    orderNumber: 'WEB-004',
    source: 'INTERNAL',
    customer: {
      name: 'Putri Ayu',
      email: 'putri@ksfood.com',
      phone: '087788990011'
    },
    products: [
      { name: 'Bumbu Rendang 100g', qty: 8, price: 15000, unit: 'Pack' },
      { name: 'Bumbu Soto Ayam 50g', qty: 8, price: 10000, unit: 'Pack' }
    ],
    totalAmount: 200000,
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    paymentMethod: 'COD',
    shippingAddress: 'Jl. Kebon Jeruk No. 34, Jakarta Barat',
    date: new Date('2026-01-05T16:15:00')
  },

  // B2B ORDERS
  {
    id: '17',
    orderNumber: 'B2B-001',
    source: 'B2B',
    customer: {
      name: 'PT Gokana Resto',
      email: 'procurement@gokana.co.id',
      phone: '02112345678'
    },
    products: [{ name: 'Saos Sambal Jerigen 20L', qty: 50, price: 850000, unit: 'Jerigen' }],
    totalAmount: 42500000,
    status: 'CONFIRMED',
    paymentStatus: 'UNPAID',
    paymentMethod: 'Tempo 30 Hari',
    shippingAddress: 'Gudang PT Gokana, Jl. Industri Raya No. 45, Tangerang',
    shippingCourier: 'Truck Sendiri',
    date: new Date('2026-01-05T10:00:00'),
    contractNumber: 'K-GKN-2024',
    notes: 'Pengiriman maksimal 3 hari'
  },
  {
    id: '18',
    orderNumber: 'B2B-002',
    source: 'B2B',
    customer: {
      name: 'PT Mayora Indah',
      email: 'purchasing@mayora.co.id',
      phone: '02187654321'
    },
    products: [
      { name: 'Saos Tomat Jerigen 20L', qty: 30, price: 800000, unit: 'Jerigen' },
      { name: 'Bumbu Rendang Bulk 5Kg', qty: 20, price: 650000, unit: 'Karung' }
    ],
    totalAmount: 37000000,
    status: 'PROCESSING',
    paymentStatus: 'PAID',
    paymentMethod: 'Transfer Lunas',
    shippingAddress: 'Pabrik PT Mayora, Jl. Tomang Raya No. 21-23, Jakarta Barat',
    shippingCourier: 'Ekspedisi Kontrak',
    date: new Date('2026-01-04T09:30:00'),
    contractNumber: 'K-MYR-2024'
  },
  {
    id: '19',
    orderNumber: 'B2B-003',
    source: 'B2B',
    customer: {
      name: 'CV Warung Kita',
      email: 'admin@warungkita.id',
      phone: '081999888777'
    },
    products: [{ name: 'Saos ABC Pedas 340ml', qty: 200, price: 16000, unit: 'Botol' }],
    totalAmount: 3200000,
    status: 'SHIPPED',
    paymentStatus: 'PAID',
    paymentMethod: 'Transfer 50% DP',
    shippingAddress: 'Toko CV Warung Kita, Jl. Pasar Minggu No. 67, Jakarta Selatan',
    shippingCourier: 'JNE Trucking',
    trackingNumber: 'JNETRK1234567',
    date: new Date('2026-01-03T14:00:00'),
    contractNumber: 'K-WKT-2025'
  },
  {
    id: '20',
    orderNumber: 'B2B-004',
    source: 'B2B',
    customer: {
      name: 'PT Indomarco Prismatama',
      email: 'vendor@indomaret.co.id',
      phone: '02155556666'
    },
    products: [
      { name: 'Saos Sambal Bawang 500ml', qty: 500, price: 23000, unit: 'Botol' },
      { name: 'Saos Tomat Premium 1L', qty: 300, price: 42000, unit: 'Botol' }
    ],
    totalAmount: 24100000,
    status: 'READY_TO_SHIP',
    paymentStatus: 'UNPAID',
    paymentMethod: 'Tempo 45 Hari',
    shippingAddress: 'DC Indomaret Cibitung, Jl. Raya Narogong KM 23, Bekasi',
    shippingCourier: 'Armada DC',
    date: new Date('2026-01-05T07:45:00'),
    contractNumber: 'K-IDM-2024',
    notes: 'Pengiriman sesuai jadwal DC'
  }
]

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: mockOrders,

  updateOrderStatus: (orderId: string, status: OrderStatus) => {
    set((state) => ({
      orders: state.orders.map((order) => (order.id === orderId ? { ...order, status } : order))
    }))
  },

  getOrdersBySource: (source: OrderSource | 'ALL') => {
    const { orders } = get()
    if (source === 'ALL') return orders

    return orders.filter((order) => order.source === source)
  },

  searchOrders: (query: string) => {
    const { orders } = get()
    const lowerQuery = query.toLowerCase()

    return orders.filter(
      (order) =>
        order.orderNumber.toLowerCase().includes(lowerQuery) ||
        order.customer.name.toLowerCase().includes(lowerQuery) ||
        order.products.some((p) => p.name.toLowerCase().includes(lowerQuery))
    )
  },

  addReview: (orderId: string, rating: number, comment: string) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              review: {
                rating,
                comment,
                date: new Date()
              }
            }
          : order
      )
    }))
  },

  addOrder: (order) => {
    // Convert from checkout format to internal Order format
    const newOrder: Order = {
      id: order.id,
      orderNumber: order.id,
      source: 'INTERNAL', // Orders from checkout are from internal website
      customer: {
        name: 'Customer', // Will be filled from auth if available
        email: 'customer@email.com',
        phone: '081234567890'
      },
      products: order.items.map((item) => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
        unit: 'pcs'
      })),
      totalAmount: order.total,
      status: order.status.toUpperCase() as OrderStatus,
      paymentStatus: 'UNPAID',
      paymentMethod: order.paymentMethod,
      shippingAddress: order.address,
      date: new Date(order.date)
    }

    set((state) => ({
      orders: [newOrder, ...state.orders]
    }))
  }
}))
