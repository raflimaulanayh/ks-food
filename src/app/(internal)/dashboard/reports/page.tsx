'use client'

import {
  B2B_SALES_DATA,
  DEFECT_REASONS,
  FINANCIAL_SUMMARY,
  OPERATIONAL_METRICS,
  REVENUE_EXPENSE_DATA,
  SALES_CATEGORIES,
  SALES_INSIGHTS,
  TOP_PRODUCTS
} from '@/data/mock-reports'
import { Calendar, CheckCircle, DownloadSimple, Factory, FileXls, TrendUp, WarningCircle } from '@phosphor-icons/react'
import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { toast } from 'sonner'

import { StatCard } from '@/components/molecules/dashboard/stat-card'

import { cn } from '@/utils/cn'

type DateRange = 'month' | 'quarter' | 'year'
type TabName = 'financial' | 'sales' | 'operational'

const COLORS = ['#a31313', '#e87c36', '#ffae0d']

export default function BusinessReportsPage() {
  const [activeTab, setActiveTab] = useState<TabName>('financial')
  const [dateRange, setDateRange] = useState<DateRange>('month')
  const [isLoading, setIsLoading] = useState(false)

  const handleDateRangeChange = (range: DateRange) => {
    setIsLoading(true)
    setDateRange(range)

    setTimeout(() => {
      setIsLoading(false)
      toast.success('Data diperbarui', {
        description: `Menampilkan laporan ${range === 'month' ? 'Bulan Ini' : range === 'quarter' ? 'Kuartal Ini' : 'Tahun Ini'}`
      })
    }, 500)
  }

  const handleExportPDF = () => {
    toast.info('Laporan PDF sedang diunduh...', {
      description: 'File akan tersedia dalam beberapa saat'
    })
  }

  const handleExportExcel = () => {
    toast.info('File Excel sedang disiapkan...', {
      description: 'Download akan dimulai segera'
    })
  }

  const formatCurrency = (value: number) => {
    return `Rp ${(value / 1000000).toFixed(1)} M`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Laporan Bisnis Terpadu</h1>
        <p className="mt-1 text-sm text-slate-500">Analisis performa keuangan dan operasional perusahaan</p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Calendar size={20} className="text-slate-600" />
          <span className="text-sm font-medium text-slate-700">Periode:</span>
          <button
            onClick={() => handleDateRangeChange('month')}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              dateRange === 'month' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            )}
          >
            Bulan Ini
          </button>
          <button
            onClick={() => handleDateRangeChange('quarter')}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              dateRange === 'quarter' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            )}
          >
            Kuartal Ini
          </button>
          <button
            onClick={() => handleDateRangeChange('year')}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              dateRange === 'year' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            )}
          >
            Tahun Ini
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 rounded-lg border-2 border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <DownloadSimple size={18} weight="bold" />
            Unduh PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 rounded-lg border-2 border-green-600 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 transition-colors hover:bg-green-100"
          >
            <FileXls size={18} weight="bold" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('financial')}
            className={cn(
              'flex-1 px-6 py-3 text-sm font-semibold transition-colors',
              activeTab === 'financial'
                ? 'border-b-2 border-primary bg-red-50 text-primary'
                : 'text-slate-600 hover:bg-slate-50'
            )}
          >
            💰 Keuangan
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={cn(
              'flex-1 px-6 py-3 text-sm font-semibold transition-colors',
              activeTab === 'sales' ? 'border-b-2 border-primary bg-red-50 text-primary' : 'text-slate-600 hover:bg-slate-50'
            )}
          >
            📊 Penjualan
          </button>
          <button
            onClick={() => setActiveTab('operational')}
            className={cn(
              'flex-1 px-6 py-3 text-sm font-semibold transition-colors',
              activeTab === 'operational'
                ? 'border-b-2 border-primary bg-red-50 text-primary'
                : 'text-slate-600 hover:bg-slate-50'
            )}
          >
            🏭 Operasional
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex h-96 items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p className="mt-4 text-sm text-slate-500">Memuat data...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Financial Tab */}
              {activeTab === 'financial' && (
                <div className="space-y-6">
                  {/* Financial Stats */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                      title="Total Omzet"
                      value={formatCurrency(FINANCIAL_SUMMARY.totalRevenue)}
                      colorScheme="green"
                      trend="up"
                      trendValue="+12%"
                    />
                    <StatCard title="HPP (COGS)" value={formatCurrency(FINANCIAL_SUMMARY.cogs)} colorScheme="default" />
                    <StatCard
                      title="Gross Profit"
                      value={formatCurrency(FINANCIAL_SUMMARY.grossProfit)}
                      colorScheme="green"
                      trend="up"
                      trendValue="+8%"
                    />
                    <StatCard
                      title="Net Profit"
                      value={formatCurrency(FINANCIAL_SUMMARY.netProfit)}
                      colorScheme="green"
                      trend="up"
                      trendValue="+15%"
                    />
                  </div>

                  {/* Revenue vs Expenses Chart */}
                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-bold text-slate-800">Tren Pendapatan vs Pengeluaran</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={REVENUE_EXPENSE_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`} />
                        <Tooltip formatter={(val: number | undefined) => (val ? formatCurrency(val) : '0')} />
                        <Legend />
                        <Bar dataKey="revenue" fill="#10b981" name="Pendapatan" />
                        <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} name="Pengeluaran" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Top Products Table */}
                  <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 px-6 py-4">
                      <h3 className="text-lg font-bold text-slate-800">Top 5 Produk Paling Menguntungkan</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-slate-100 bg-slate-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">#</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Produk</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Margin %</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">
                              Total Profit
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {TOP_PRODUCTS.map((product, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="px-6 py-4 text-sm text-slate-600">{idx + 1}</td>
                              <td className="px-6 py-4 text-sm font-medium text-slate-900">{product.productName}</td>
                              <td className="px-6 py-4 text-right text-sm font-semibold text-green-600">
                                {product.marginPercent}%
                              </td>
                              <td className="px-6 py-4 text-right text-sm font-semibold text-slate-900">
                                {formatCurrency(product.totalProfit)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Sales Tab */}
              {activeTab === 'sales' && (
                <div className="space-y-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* Pie Chart */}
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                      <h3 className="mb-4 text-lg font-bold text-slate-800">Penjualan per Kategori</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={SALES_CATEGORIES}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label={(entry) => `${entry.name}: ${entry.percent?.toFixed(0)}%`}
                          >
                            {SALES_CATEGORIES.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(val: number | undefined) => (val ? formatCurrency(val) : '0')} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Stacked Bar Chart */}
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                      <h3 className="mb-4 text-lg font-bold text-slate-800">Tren B2B vs B2C</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={B2B_SALES_DATA}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="month" />
                          <YAxis tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`} />
                          <Tooltip formatter={(val: number | undefined) => (val ? formatCurrency(val) : '0')} />
                          <Legend />
                          <Bar dataKey="b2b" stackId="a" fill="#3b82f6" name="B2B" />
                          <Bar dataKey="b2c" stackId="a" fill="#10b981" name="B2C" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Insights */}
                  <div className="space-y-3">
                    {SALES_INSIGHTS.map((insight, idx) => (
                      <div key={idx} className="flex items-start gap-3 rounded-lg bg-blue-50 p-4">
                        <TrendUp size={24} weight="bold" className="shrink-0 text-blue-600" />
                        <p className="text-sm text-blue-800">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Operational Tab */}
              {activeTab === 'operational' && (
                <div className="space-y-6">
                  {/* Operational Stats */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <StatCard
                      title="Efisiensi Produksi"
                      value={`${OPERATIONAL_METRICS.productionEfficiency}%`}
                      icon={Factory}
                      colorScheme="green"
                      trend="up"
                      trendValue="+3%"
                    />
                    <StatCard
                      title="Tingkat Kecacatan"
                      value={`${OPERATIONAL_METRICS.defectRate}%`}
                      icon={WarningCircle}
                      colorScheme="red"
                      trend="down"
                      trendValue="-0.5%"
                    />
                    <StatCard
                      title="On-Time Delivery"
                      value={`${OPERATIONAL_METRICS.onTimeDelivery}%`}
                      icon={CheckCircle}
                      colorScheme="green"
                      trend="up"
                      trendValue="+2%"
                    />
                  </div>

                  {/* Defect Analysis Chart */}
                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-bold text-slate-800">Analisis Penyebab Cacat</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={DEFECT_REASONS} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis type="number" />
                        <YAxis dataKey="reason" type="category" width={150} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#ef4444" name="Jumlah Kasus" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
