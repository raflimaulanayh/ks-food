// Mock data for Approvals page

export type ApprovalType = 'PO' | 'BUDGET' | 'HIRING' | 'EXPENSE' | 'LEAVE' | 'OTHER'

export type ApprovalStatus = 'pending' | 'approved' | 'rejected'

export interface ApprovalRequest {
  id: number
  type: ApprovalType
  title: string
  requester: string
  department: string
  amount?: number
  description: string
  requestDate: string
  priority: 'low' | 'medium' | 'high'
  status: ApprovalStatus
}

export const MOCK_APPROVALS: ApprovalRequest[] = [
  {
    id: 1,
    type: 'PO',
    title: 'PO-2026-005 - Raw Material Procurement',
    requester: 'Procurement Manager',
    department: 'Procurement',
    amount: 125000000,
    description: 'Purchase order untuk bahan baku tomat 50 ton',
    requestDate: '2026-01-02',
    priority: 'high',
    status: 'pending'
  },
  {
    id: 2,
    type: 'HIRING',
    title: 'Hiring: Manager QC',
    requester: 'HR Director',
    department: 'HR',
    amount: 15000000,
    description: 'Recruitment untuk posisi Manager QC Lab',
    requestDate: '2026-01-03',
    priority: 'high',
    status: 'pending'
  },
  {
    id: 3,
    type: 'BUDGET',
    title: 'Budget Marketing Q1 2026',
    requester: 'Marketing Head',
    department: 'Marketing',
    amount: 50000000,
    description: 'Budget untuk kampanye marketing Q1',
    requestDate: '2026-01-01',
    priority: 'medium',
    status: 'pending'
  },
  {
    id: 4,
    type: 'EXPENSE',
    title: 'Office Equipment Purchase',
    requester: 'Admin Manager',
    department: 'Admin',
    amount: 8500000,
    description: 'Pembelian laptop dan printer untuk tim admin',
    requestDate: '2025-12-30',
    priority: 'low',
    status: 'pending'
  },
  {
    id: 5,
    type: 'LEAVE',
    title: 'Annual Leave - Budi Santoso',
    requester: 'Budi Santoso',
    department: 'QC',
    description: 'Cuti tahunan 5 hari (10-14 Januari 2026)',
    requestDate: '2025-12-28',
    priority: 'low',
    status: 'pending'
  },
  {
    id: 6,
    type: 'PO',
    title: 'PO-2025-198 - Packaging Material',
    requester: 'Procurement Staff',
    department: 'Procurement',
    amount: 35000000,
    description: 'Purchase order untuk bahan kemasan botol plastik',
    requestDate: '2025-12-20',
    priority: 'medium',
    status: 'approved'
  },
  {
    id: 7,
    type: 'BUDGET',
    title: 'IT Infrastructure Upgrade',
    requester: 'IT Manager',
    department: 'IT',
    amount: 75000000,
    description: 'Upgrade server dan network infrastructure',
    requestDate: '2025-12-15',
    priority: 'high',
    status: 'approved'
  },
  {
    id: 8,
    type: 'EXPENSE',
    title: 'Team Building Event',
    requester: 'HR Manager',
    department: 'HR',
    amount: 12000000,
    description: 'Budget untuk team building seluruh karyawan',
    requestDate: '2025-12-10',
    priority: 'low',
    status: 'rejected'
  }
]
