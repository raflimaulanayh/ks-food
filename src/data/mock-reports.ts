// Mock data for Reports page

export const FINANCIAL_SUMMARY = {
  totalRevenue: 62100000000,
  totalExpense: 43200000000,
  cogs: 24800000000,
  grossProfit: 37300000000,
  netProfit: 18900000000,
  profitMargin: 30.4
}

export const REVENUE_EXPENSE_DATA = [
  { month: 'Jan', revenue: 4200000000, expense: 3100000000 },
  { month: 'Feb', revenue: 4500000000, expense: 3300000000 },
  { month: 'Mar', revenue: 4300000000, expense: 3200000000 },
  { month: 'Apr', revenue: 4700000000, expense: 3400000000 },
  { month: 'Mei', revenue: 4900000000, expense: 3500000000 },
  { month: 'Jun', revenue: 5100000000, expense: 3600000000 },
  { month: 'Jul', revenue: 5300000000, expense: 3700000000 },
  { month: 'Agu', revenue: 5200000000, expense: 3650000000 },
  { month: 'Sep', revenue: 5400000000, expense: 3800000000 },
  { month: 'Okt', revenue: 5600000000, expense: 3900000000 },
  { month: 'Nov', revenue: 5500000000, expense: 3850000000 },
  { month: 'Des', revenue: 5800000000, expense: 4000000000 }
]

export const SALES_CATEGORIES = [
  { name: 'Saos Tomat', value: 35, amount: 21700000000 },
  { name: 'Saos Sambal', value: 28, amount: 17400000000 },
  { name: 'Mayonaise', value: 22, amount: 13700000000 },
  { name: 'Kecap', value: 15, amount: 9300000000 }
]

export const TOP_PRODUCTS = [
  { name: 'Saos Tomat Original 340ml', sales: 125000, revenue: 8750000000 },
  { name: 'Saos Sambal Pedas 250ml', sales: 98000, revenue: 6860000000 },
  { name: 'Mayonaise Premium 500ml', sales: 87000, revenue: 7830000000 },
  { name: 'Kecap Manis 600ml', sales: 76000, revenue: 5320000000 },
  { name: 'Saos Tomat Sachet 10ml', sales: 450000, revenue: 4500000000 }
]

export const B2B_SALES_DATA = [
  { client: 'Indomaret', category: 'Retail', amount: 8500000000, growth: 12 },
  { client: 'Alfamart', category: 'Retail', amount: 7200000000, growth: 8 },
  { client: 'Transmart', category: 'Retail', amount: 4300000000, growth: 15 },
  { client: 'Hotel Santika Group', category: 'Hospitality', amount: 3800000000, growth: 22 },
  { client: 'Restoran Padang Sederhana', category: 'F&B', amount: 2900000000, growth: 18 }
]

export const OPERATIONAL_METRICS = {
  productionCapacity: 85,
  warehouseUtilization: 92,
  deliveryOnTime: 94,
  qualityPassRate: 98.5
}

export const DEFECT_REASONS = [
  { reason: 'Packaging Issue', count: 45, percentage: 35 },
  { reason: 'Color Variation', count: 32, percentage: 25 },
  { reason: 'Viscosity Out of Spec', count: 28, percentage: 22 },
  { reason: 'Contamination', count: 15, percentage: 12 },
  { reason: 'Others', count: 8, percentage: 6 }
]

export const SALES_INSIGHTS = [
  'Jawa Barat merupakan region dengan penjualan tertinggi (45% total revenue)',
  'Modern Trade channel mendominasi dengan 60% dari total penjualan',
  'Average order value meningkat 12% menjadi Rp 2.5 juta per transaksi',
  'Customer retention rate mencapai 87%, naik 5% dari kuartal sebelumnya'
]
