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
  {
    id: '1',
    orderNumber: 'ORDER-001',
    source: 'B2B',
    customer: {
      name: 'PT Gokana Resto Indonesia',
      email: 'procurement@gokana.co.id',
      phone: '081299998802'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 1, price: 12000, unit: 'Botol' }],
    totalAmount: 111000,
    status: 'READY_TO_SHIP',
    paymentStatus: 'PAID',
    paymentMethod: 'Transfer Bank BCA',
    shippingAddress: 'Gudang Pusat Gokana, Kawasan Industri Cikarang Blok C/2, Tangerang, Banten',
    shippingCourier: 'Armada Internal Pabrik',
    date: new Date('2026-06-01T10:00:00'),
    contractNumber: 'AGR-CORP-002',
    notes: 'Catatan item order #1'
  },
  {
    id: '2',
    orderNumber: 'ORDER-002',
    source: 'SHOPEE',
    customer: {
      name: 'Candra Hartono',
      email: 'candra_ret@gmail.com',
      phone: '081333333003'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 2, price: 12000, unit: 'Botol' }],
    totalAmount: 121000,
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    paymentMethod: 'ShopeePay',
    shippingAddress: 'Jl. Kebon Jeruk Indah No. 3, Jakarta Barat, DKI Jakarta',
    shippingCourier: 'J&T Express',
    trackingNumber: 'AWB-KSFOOD-0002',
    date: new Date('2026-06-02T15:30:00'),
    notes: 'Catatan item order #2'
  },
  {
    id: '3',
    orderNumber: 'ORDER-003',
    source: 'B2B',
    customer: {
      name: 'PT Indofood CBP Sukses Makmur',
      email: 'procurement@indofood.co.id',
      phone: '081299998804'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 3, price: 12000, unit: 'Botol' }],
    totalAmount: 333000,
    status: 'READY_TO_SHIP',
    paymentStatus: 'PAID',
    paymentMethod: 'Transfer Bank Mandiri',
    shippingAddress: 'Gudang Pusat Indofood, Kawasan Industri Cikarang Blok C/4, Tangerang, Banten',
    shippingCourier: 'Armada Internal Pabrik',
    date: new Date('2026-06-03T10:00:00'),
    contractNumber: 'AGR-CORP-004',
    notes: 'Catatan item order #3'
  },
  {
    id: '4',
    orderNumber: 'ORDER-004',
    source: 'TOKOPEDIA',
    customer: {
      name: 'Erik Hartono',
      email: 'erik_ret@gmail.com',
      phone: '081333333005'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 4, price: 12000, unit: 'Botol' }],
    totalAmount: 242000,
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    paymentMethod: 'GoPay',
    shippingAddress: 'Jl. Kebon Jeruk Indah No. 5, Jakarta Barat, DKI Jakarta',
    shippingCourier: 'J&T Express',
    trackingNumber: 'AWB-KSFOOD-0004',
    date: new Date('2026-06-04T15:30:00'),
    notes: 'Catatan item order #4'
  },
  {
    id: '5',
    orderNumber: 'ORDER-005',
    source: 'B2B',
    customer: {
      name: 'PT ABC President Indonesia',
      email: 'procurement@abc.co.id',
      phone: '081299998806'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 5, price: 12000, unit: 'Botol' }],
    totalAmount: 555000,
    status: 'READY_TO_SHIP',
    paymentStatus: 'PAID',
    paymentMethod: 'Transfer Bank BCA',
    shippingAddress: 'Gudang Pusat ABC, Kawasan Industri Cikarang Blok C/6, Tangerang, Banten',
    shippingCourier: 'Armada Internal Pabrik',
    date: new Date('2026-06-05T10:00:00'),
    contractNumber: 'AGR-CORP-006',
    notes: 'Catatan item order #5'
  },
  {
    id: '6',
    orderNumber: 'ORDER-006',
    source: 'BLIBLI',
    customer: {
      name: 'Gandi Hartono',
      email: 'gandi_ret@gmail.com',
      phone: '081333333007'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 6, price: 12000, unit: 'Botol' }],
    totalAmount: 363000,
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    paymentMethod: 'BCA Klikpay',
    shippingAddress: 'Jl. Kebon Jeruk Indah No. 7, Jakarta Barat, DKI Jakarta',
    shippingCourier: 'J&T Express',
    trackingNumber: 'AWB-KSFOOD-0006',
    date: new Date('2026-06-06T15:30:00'),
    notes: 'Catatan item order #6'
  },
  {
    id: '7',
    orderNumber: 'ORDER-007',
    source: 'B2B',
    customer: {
      name: 'PT Ajinomoto Indonesia',
      email: 'procurement@ajinomoto.co.id',
      phone: '081299998808'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 7, price: 12000, unit: 'Botol' }],
    totalAmount: 777000,
    status: 'READY_TO_SHIP',
    paymentStatus: 'PAID',
    paymentMethod: 'Transfer Bank Mandiri',
    shippingAddress: 'Gudang Pusat Ajinomoto, Kawasan Industri Cikarang Blok C/8, Tangerang, Banten',
    shippingCourier: 'Armada Internal Pabrik',
    date: new Date('2026-06-07T10:00:00'),
    contractNumber: 'AGR-CORP-008',
    notes: 'Catatan item order #7'
  },
  {
    id: '8',
    orderNumber: 'ORDER-008',
    source: 'INTERNAL',
    customer: {
      name: 'Indra Hartono',
      email: 'indra_ret@gmail.com',
      phone: '081333333009'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 8, price: 12000, unit: 'Botol' }],
    totalAmount: 484000,
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    paymentMethod: 'Transfer Bank Mandiri',
    shippingAddress: 'Jl. Kebon Jeruk Indah No. 9, Jakarta Barat, DKI Jakarta',
    shippingCourier: 'J&T Express',
    trackingNumber: 'AWB-KSFOOD-0008',
    date: new Date('2026-06-08T15:30:00'),
    notes: 'Catatan item order #8'
  },
  {
    id: '9',
    orderNumber: 'ORDER-009',
    source: 'B2B',
    customer: {
      name: 'PT Nutrifood Indonesia',
      email: 'procurement@nutrifood.co.id',
      phone: '081299998810'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 9, price: 12000, unit: 'Botol' }],
    totalAmount: 999000,
    status: 'READY_TO_SHIP',
    paymentStatus: 'PAID',
    paymentMethod: 'Transfer Bank BCA',
    shippingAddress: 'Gudang Pusat Nutrifood, Kawasan Industri Cikarang Blok C/10, Tangerang, Banten',
    shippingCourier: 'Armada Internal Pabrik',
    date: new Date('2026-06-09T10:00:00'),
    contractNumber: 'AGR-CORP-010',
    notes: 'Catatan item order #9'
  },
  {
    id: '10',
    orderNumber: 'ORDER-010',
    source: 'SHOPEE',
    customer: {
      name: 'Kiki Hartono',
      email: 'kiki_ret@gmail.com',
      phone: '081333333011'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 10, price: 12000, unit: 'Botol' }],
    totalAmount: 605000,
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    paymentMethod: 'ShopeePay',
    shippingAddress: 'Jl. Kebon Jeruk Indah No. 11, Jakarta Barat, DKI Jakarta',
    shippingCourier: 'J&T Express',
    trackingNumber: 'AWB-KSFOOD-0010',
    date: new Date('2026-06-10T15:30:00'),
    notes: 'Catatan item order #10'
  },
  {
    id: '11',
    orderNumber: 'ORDER-011',
    source: 'B2B',
    customer: {
      name: 'PT Nestle Indonesia',
      email: 'procurement@nestle.co.id',
      phone: '081299998812'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 11, price: 12000, unit: 'Botol' }],
    totalAmount: 1221000,
    status: 'READY_TO_SHIP',
    paymentStatus: 'PAID',
    paymentMethod: 'Transfer Bank Mandiri',
    shippingAddress: 'Gudang Pusat Nestle, Kawasan Industri Cikarang Blok C/12, Tangerang, Banten',
    shippingCourier: 'Armada Internal Pabrik',
    date: new Date('2026-06-11T10:00:00'),
    contractNumber: 'AGR-CORP-012',
    notes: 'Catatan item order #11'
  },
  {
    id: '12',
    orderNumber: 'ORDER-012',
    source: 'TOKOPEDIA',
    customer: {
      name: 'Budi Hartono',
      email: 'budi_ret@gmail.com',
      phone: '081333333001'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 12, price: 12000, unit: 'Botol' }],
    totalAmount: 726000,
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    paymentMethod: 'GoPay',
    shippingAddress: 'Jl. Kebon Jeruk Indah No. 1, Jakarta Barat, DKI Jakarta',
    shippingCourier: 'J&T Express',
    trackingNumber: 'AWB-KSFOOD-0012',
    date: new Date('2026-06-12T15:30:00'),
    notes: 'Catatan item order #12'
  },
  {
    id: '13',
    orderNumber: 'ORDER-013',
    source: 'B2B',
    customer: {
      name: 'PT Gokana Resto Indonesia',
      email: 'procurement@gokana.co.id',
      phone: '081299998802'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 13, price: 12000, unit: 'Botol' }],
    totalAmount: 1433000,
    status: 'READY_TO_SHIP',
    paymentStatus: 'PAID',
    paymentMethod: 'Transfer Bank BCA',
    shippingAddress: 'Gudang Pusat Gokana, Kawasan Industri Cikarang Blok C/2, Tangerang, Banten',
    shippingCourier: 'Armada Internal Pabrik',
    date: new Date('2026-06-13T10:00:00'),
    contractNumber: 'AGR-CORP-002',
    notes: 'Catatan item order #13'
  },
  {
    id: '14',
    orderNumber: 'ORDER-014',
    source: 'BLIBLI',
    customer: {
      name: 'Candra Hartono',
      email: 'candra_ret@gmail.com',
      phone: '081333333003'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 14, price: 12000, unit: 'Botol' }],
    totalAmount: 847000,
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    paymentMethod: 'BCA Klikpay',
    shippingAddress: 'Jl. Kebon Jeruk Indah No. 3, Jakarta Barat, DKI Jakarta',
    shippingCourier: 'J&T Express',
    trackingNumber: 'AWB-KSFOOD-0014',
    date: new Date('2026-06-14T15:30:00'),
    notes: 'Catatan item order #14'
  },
  {
    id: '15',
    orderNumber: 'ORDER-015',
    source: 'B2B',
    customer: {
      name: 'PT Indofood CBP Sukses Makmur',
      email: 'procurement@indofood.co.id',
      phone: '081299998804'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 15, price: 12000, unit: 'Botol' }],
    totalAmount: 1665000,
    status: 'READY_TO_SHIP',
    paymentStatus: 'PAID',
    paymentMethod: 'Transfer Bank Mandiri',
    shippingAddress: 'Gudang Pusat Indofood, Kawasan Industri Cikarang Blok C/4, Tangerang, Banten',
    shippingCourier: 'Armada Internal Pabrik',
    date: new Date('2026-06-15T10:00:00'),
    contractNumber: 'AGR-CORP-004',
    notes: 'Catatan item order #15'
  },
  {
    id: '16',
    orderNumber: 'ORDER-016',
    source: 'INTERNAL',
    customer: {
      name: 'Erik Hartono',
      email: 'erik_ret@gmail.com',
      phone: '081333333005'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 16, price: 12000, unit: 'Botol' }],
    totalAmount: 968000,
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    paymentMethod: 'Transfer Bank Mandiri',
    shippingAddress: 'Jl. Kebon Jeruk Indah No. 5, Jakarta Barat, DKI Jakarta',
    shippingCourier: 'J&T Express',
    trackingNumber: 'AWB-KSFOOD-0016',
    date: new Date('2026-06-16T15:30:00'),
    notes: 'Catatan item order #16'
  },
  {
    id: '17',
    orderNumber: 'ORDER-017',
    source: 'B2B',
    customer: {
      name: 'PT ABC President Indonesia',
      email: 'procurement@abc.co.id',
      phone: '081299998806'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 17, price: 12000, unit: 'Botol' }],
    totalAmount: 1887000,
    status: 'READY_TO_SHIP',
    paymentStatus: 'PAID',
    paymentMethod: 'Transfer Bank BCA',
    shippingAddress: 'Gudang Pusat ABC, Kawasan Industri Cikarang Blok C/6, Tangerang, Banten',
    shippingCourier: 'Armada Internal Pabrik',
    date: new Date('2026-06-17T10:00:00'),
    contractNumber: 'AGR-CORP-006',
    notes: 'Catatan item order #17'
  },
  {
    id: '18',
    orderNumber: 'ORDER-018',
    source: 'SHOPEE',
    customer: {
      name: 'Gandi Hartono',
      email: 'gandi_ret@gmail.com',
      phone: '081333333007'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 18, price: 12000, unit: 'Botol' }],
    totalAmount: 1089000,
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    paymentMethod: 'ShopeePay',
    shippingAddress: 'Jl. Kebon Jeruk Indah No. 7, Jakarta Barat, DKI Jakarta',
    shippingCourier: 'J&T Express',
    trackingNumber: 'AWB-KSFOOD-0018',
    date: new Date('2026-06-18T15:30:00'),
    notes: 'Catatan item order #18'
  },
  {
    id: '19',
    orderNumber: 'ORDER-019',
    source: 'B2B',
    customer: {
      name: 'PT Ajinomoto Indonesia',
      email: 'procurement@ajinomoto.co.id',
      phone: '081299998808'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 19, price: 12000, unit: 'Botol' }],
    totalAmount: 2109000,
    status: 'READY_TO_SHIP',
    paymentStatus: 'PAID',
    paymentMethod: 'Transfer Bank Mandiri',
    shippingAddress: 'Gudang Pusat Ajinomoto, Kawasan Industri Cikarang Blok C/8, Tangerang, Banten',
    shippingCourier: 'Armada Internal Pabrik',
    date: new Date('2026-06-19T10:00:00'),
    contractNumber: 'AGR-CORP-008',
    notes: 'Catatan item order #19'
  },
  {
    id: '20',
    orderNumber: 'ORDER-020',
    source: 'TOKOPEDIA',
    customer: {
      name: 'Indra Hartono',
      email: 'indra_ret@gmail.com',
      phone: '081333333009'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 20, price: 12000, unit: 'Botol' }],
    totalAmount: 1210000,
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    paymentMethod: 'GoPay',
    shippingAddress: 'Jl. Kebon Jeruk Indah No. 9, Jakarta Barat, DKI Jakarta',
    shippingCourier: 'J&T Express',
    trackingNumber: 'AWB-KSFOOD-0020',
    date: new Date('2026-06-20T15:30:00'),
    notes: 'Catatan item order #20'
  },
  {
    id: '21',
    orderNumber: 'ORDER-021',
    source: 'B2B',
    customer: {
      name: 'PT Nutrifood Indonesia',
      email: 'procurement@nutrifood.co.id',
      phone: '081299998810'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 21, price: 12000, unit: 'Botol' }],
    totalAmount: 2331000,
    status: 'READY_TO_SHIP',
    paymentStatus: 'PAID',
    paymentMethod: 'Transfer Bank BCA',
    shippingAddress: 'Gudang Pusat Nutrifood, Kawasan Industri Cikarang Blok C/10, Tangerang, Banten',
    shippingCourier: 'Armada Internal Pabrik',
    date: new Date('2026-06-21T10:00:00'),
    contractNumber: 'AGR-CORP-010',
    notes: 'Catatan item order #21'
  },
  {
    id: '22',
    orderNumber: 'ORDER-022',
    source: 'BLIBLI',
    customer: {
      name: 'Kiki Hartono',
      email: 'kiki_ret@gmail.com',
      phone: '081333333011'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 22, price: 12000, unit: 'Botol' }],
    totalAmount: 1331000,
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    paymentMethod: 'BCA Klikpay',
    shippingAddress: 'Jl. Kebon Jeruk Indah No. 11, Jakarta Barat, DKI Jakarta',
    shippingCourier: 'J&T Express',
    trackingNumber: 'AWB-KSFOOD-0022',
    date: new Date('2026-06-22T15:30:00'),
    notes: 'Catatan item order #22'
  },
  {
    id: '23',
    orderNumber: 'ORDER-023',
    source: 'B2B',
    customer: {
      name: 'PT Nestle Indonesia',
      email: 'procurement@nestle.co.id',
      phone: '081299998812'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 23, price: 12000, unit: 'Botol' }],
    totalAmount: 2553000,
    status: 'READY_TO_SHIP',
    paymentStatus: 'PAID',
    paymentMethod: 'Transfer Bank Mandiri',
    shippingAddress: 'Gudang Pusat Nestle, Kawasan Industri Cikarang Blok C/12, Tangerang, Banten',
    shippingCourier: 'Armada Internal Pabrik',
    date: new Date('2026-06-23T10:00:00'),
    contractNumber: 'AGR-CORP-012',
    notes: 'Catatan item order #23'
  },
  {
    id: '24',
    orderNumber: 'ORDER-024',
    source: 'INTERNAL',
    customer: {
      name: 'Budi Hartono',
      email: 'budi_ret@gmail.com',
      phone: '081333333001'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 24, price: 12000, unit: 'Botol' }],
    totalAmount: 1452000,
    status: 'DELIVERED',
    paymentStatus: 'UNPAID',
    paymentMethod: 'COD',
    shippingAddress: 'Jl. Kebon Jeruk Indah No. 1, Jakarta Barat, DKI Jakarta',
    shippingCourier: 'J&T Express',
    trackingNumber: 'AWB-KSFOOD-0024',
    date: new Date('2026-06-24T15:30:00'),
    notes: 'Catatan item order #24'
  },
  {
    id: '25',
    orderNumber: 'ORDER-025',
    source: 'B2B',
    customer: {
      name: 'PT Gokana Resto Indonesia',
      email: 'procurement@gokana.co.id',
      phone: '081299998802'
    },
    products: [{ name: 'Saos Sambal Pedas Manis 135ml', qty: 25, price: 12000, unit: 'Botol' }],
    totalAmount: 2775000,
    status: 'READY_TO_SHIP',
    paymentStatus: 'UNPAID',
    paymentMethod: 'Tempo 30 Hari',
    shippingAddress: 'Gudang Pusat Gokana, Kawasan Industri Cikarang Blok C/2, Tangerang, Banten',
    shippingCourier: 'Armada Internal Pabrik',
    date: new Date('2026-06-25T10:00:00'),
    contractNumber: 'AGR-CORP-002',
    notes: 'Catatan item order #25'
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
