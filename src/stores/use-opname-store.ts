import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type OpnameStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export interface OpnameRequest {
  id: string
  itemId: string
  itemName: string
  itemSku: string
  systemQty: number
  physicalQty: number
  difference: number
  reason: string
  photos: string[]
  requestedBy: string
  requestedByName: string
  requestedAt: string
  status: OpnameStatus
  reviewedBy?: string
  reviewedByName?: string
  reviewedAt?: string
  reviewNotes?: string
}

interface OpnameStore {
  requests: OpnameRequest[]
  createOpnameRequest: (request: Omit<OpnameRequest, 'id' | 'requestedAt' | 'status'>) => void
  approveOpname: (id: string, reviewedBy: string, reviewedByName: string, notes?: string) => void
  rejectOpname: (id: string, reviewedBy: string, reviewedByName: string, notes: string) => void
  getMyRequests: (userId: string) => OpnameRequest[]
  getPendingRequests: () => OpnameRequest[]
}

export const useOpnameStore = create<OpnameStore>()(
  persist(
    (set, get) => ({
      requests: [],

      createOpnameRequest: (request) =>
        set((state) => ({
          requests: [
            ...state.requests,
            {
              ...request,
              id: `OPN-${Date.now()}`,
              requestedAt: new Date().toISOString(),
              status: 'PENDING'
            }
          ]
        })),

      approveOpname: (id, reviewedBy, reviewedByName, notes) =>
        set((state) => ({
          requests: state.requests.map((req) =>
            req.id === id
              ? {
                  ...req,
                  status: 'APPROVED' as OpnameStatus,
                  reviewedBy,
                  reviewedByName,
                  reviewedAt: new Date().toISOString(),
                  reviewNotes: notes
                }
              : req
          )
        })),

      rejectOpname: (id, reviewedBy, reviewedByName, notes) =>
        set((state) => ({
          requests: state.requests.map((req) =>
            req.id === id
              ? {
                  ...req,
                  status: 'REJECTED' as OpnameStatus,
                  reviewedBy,
                  reviewedByName,
                  reviewedAt: new Date().toISOString(),
                  reviewNotes: notes
                }
              : req
          )
        })),

      getMyRequests: (userId) => {
        return get().requests.filter((req) => req.requestedBy === userId)
      },

      getPendingRequests: () => {
        return get().requests.filter((req) => req.status === 'PENDING')
      }
    }),
    {
      name: 'opname-storage'
    }
  )
)
