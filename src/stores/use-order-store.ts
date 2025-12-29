import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  date: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  paymentMethod: string
  address: string
}

interface OrderState {
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrderStatus: (id: string, status: OrderStatus) => void
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders]
        })),
      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((order) => (order.id === id ? { ...order, status } : order))
        }))
    }),
    {
      name: 'ks-food-orders'
    }
  )
)
