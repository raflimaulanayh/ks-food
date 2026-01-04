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
import {
  Calendar,
  CheckCircle,
  DownloadSimple,
  Factory,
  FileXls,
  TrendUp,
  WarningCircle,
  ChartLine,
  CurrencyCircleDollar,
  ChartBar
} from '@phosphor-icons/react'
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

import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'

import { cn } from '@/utils/cn'

type DateRange = 'month' | 'quarter' | 'year'
type TabName = 'financial' | 'sales' | 'operational'

const COLORS = ['#a31313', '#e87c36', '#ffae0d', '#10b981']

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
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatShortCurrency = (value: number) => {
    if (value >= 1000000000) return `Rp ${(value / 1000000000).toFixed(1)} M`
    if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(1)} Jt`

    return formatCurrency(value)
  }

  return (
    <div className="space-y-6 pt-2 pb-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Laporan Bisnis Terpadu</h1>
          <p className="mt-1 text-sm text-slate-500">Analisis performa keuangan dan operasional perusahaan</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleExportPDF}
            className="gap-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          >
            <DownloadSimple size={16} weight="bold" />
            Unduh PDF
          </Button>
          <Button onClick={handleExportExcel} className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700">
            <FileXls size={16} weight="bold" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Date Range Filter */}
      <Card className="border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Calendar size={18} className="text-slate-600" weight="duotone" />
          <span className="text-sm font-medium text-slate-700">Periode:</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleDateRangeChange('month')}
              className={cn(
                'rounded-lg px-4 py-1.5 text-sm font-medium transition-colors',
                dateRange === 'month' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              )}
            >
              Bulan Ini
            </button>
            <button
              onClick={() => handleDateRangeChange('quarter')}
              className={cn(
                'rounded-lg px-4 py-1.5 text-sm font-medium transition-colors',
                dateRange === 'quarter' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              )}
            >
              Kuartal Ini
            </button>
            <button
              onClick={() => handleDateRangeChange('year')}
              className={cn(
                'rounded-lg px-4 py-1.5 text-sm font-medium transition-colors',
                dateRange === 'year' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              )}
            >
              Tahun Ini
            </button>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Card className="border-slate-200 bg-white shadow-sm">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('financial')}
            className={cn(
              'group relative flex-1 px-6 py-3 text-sm font-semibold transition-colors',
              activeTab === 'financial' ? 'text-red-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            )}
          >
            <span className="flex items-center justify-center gap-2">
              <CurrencyCircleDollar size={18} weight="duotone" /> Keuangan
            </span>
            {activeTab === 'financial' && <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-red-600"></div>}
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={cn(
              'group relative flex-1 px-6 py-3 text-sm font-semibold transition-colors',
              activeTab === 'sales' ? 'text-red-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            )}
          >
            <span className="flex items-center justify-center gap-2">
              <ChartBar size={18} weight="duotone" /> Penjualan
            </span>
            {activeTab === 'sales' && <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-red-600"></div>}
          </button>
          <button
            onClick={() => setActiveTab('operational')}
            className={cn(
              'group relative flex-1 px-6 py-3 text-sm font-semibold transition-colors',
              activeTab === 'operational' ? 'text-red-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            )}
          >
            <span className="flex items-center justify-center gap-2">
              <Factory size={18} weight="duotone" /> Operasional
            </span>
            {activeTab === 'operational' && <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-red-600"></div>}
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex h-96 items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
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
                    <Card className="group relative overflow-hidden border-l-[6px] border-emerald-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
                      <div className="relative z-10">
                        <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Total Omzet</p>
                        <h3 className="mt-1 text-2xl font-bold text-slate-800">
                          {formatShortCurrency(FINANCIAL_SUMMARY.totalRevenue)}
                        </h3>
                        <div className="mt-3 flex items-center gap-2">
                          <Badge className="bg-emerald-50 text-emerald-700">
                            <TrendUp size={10} weight="bold" /> +12% vs last month
                          </Badge>
                        </div>
                      </div>
                      <div className="absolute -right-4 -bottom-4 rotate-12 text-emerald-50 opacity-20 transition-transform duration-500 group-hover:scale-110">
                        <ChartLine size={90} weight="duotone" />
                      </div>
                    </Card>

                    <Card className="group relative overflow-hidden border-l-[6px] border-slate-400 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
                      <div className="relative z-10">
                        <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">HPP (COGS)</p>
                        <h3 className="mt-1 text-2xl font-bold text-slate-800">
                          {formatShortCurrency(FINANCIAL_SUMMARY.cogs)}
                        </h3>
                        <div className="mt-3">
                          <span className="text-xs text-slate-500">Cost of Goods Sold</span>
                        </div>
                      </div>
                    </Card>

                    <Card className="group relative overflow-hidden border-l-[6px] border-emerald-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
                      <div className="relative z-10">
                        <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Gross Profit</p>
                        <h3 className="mt-1 text-2xl font-bold text-slate-800">
                          {formatShortCurrency(FINANCIAL_SUMMARY.grossProfit)}
                        </h3>
                        <div className="mt-3 flex items-center gap-2">
                          <Badge className="bg-emerald-50 text-emerald-700">
                            <TrendUp size={10} weight="bold" /> +8%
                          </Badge>
                        </div>
                      </div>
                    </Card>

                    <Card className="group relative overflow-hidden border-l-[6px] border-emerald-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
                      <div className="relative z-10">
                        <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Net Profit</p>
                        <h3 className="mt-1 text-2xl font-bold text-slate-800">
                          {formatShortCurrency(FINANCIAL_SUMMARY.netProfit)}
                        </h3>
                        <div className="mt-3 flex items-center gap-2">
                          <Badge className="bg-emerald-50 text-emerald-700">
                            <TrendUp size={10} weight="bold" /> +15%
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Revenue vs Expenses Chart */}
                  <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b bg-white p-4">
                      <h3 className="font-bold text-slate-800">Tren Pendapatan vs Pengeluaran</h3>
                      <p className="text-xs text-slate-500">Analisis keuangan bulanan (dalam juta IDR)</p>
                    </div>
                    <div className="p-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={REVENUE_EXPENSE_DATA}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
                          <YAxis
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`}
                          />
                          <Tooltip formatter={(val: number | undefined) => (val ? formatCurrency(val) : '0')} />
                          <Legend wrapperStyle={{ fontSize: '12px' }} />
                          <Bar dataKey="revenue" fill="#10b981" name="Pendapatan" radius={[4, 4, 0, 0]} />
                          <Line
                            type="monotone"
                            dataKey="expense"
                            stroke="#ef4444"
                            strokeWidth={2}
                            name="Pengeluaran"
                            dot={{ r: 4 }}
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>

                  {/* Top Products Table */}
                  <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 bg-white p-4">
                      <h3 className="font-bold text-slate-800">Top 5 Produk Paling Menguntungkan</h3>
                      <p className="text-xs text-slate-500">Berdasarkan margin profit tertinggi</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-slate-100 bg-slate-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">#</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Produk</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">
                              Penjualan
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Revenue</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {TOP_PRODUCTS.map((product, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="px-6 py-4 text-sm text-slate-600">{idx + 1}</td>
                              <td className="px-6 py-4 text-sm font-medium text-slate-900">{product.name}</td>
                              <td className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                                {product.sales.toLocaleString('id-ID')} unit
                              </td>
                              <td className="px-6 py-4 text-right text-sm font-semibold text-emerald-600">
                                {formatShortCurrency(product.revenue)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
              )}

              {/* Sales Tab */}
              {activeTab === 'sales' && (
                <div className="space-y-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* Pie Chart */}
                    <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                      <div className="border-b bg-white p-4">
                        <h3 className="font-bold text-slate-800">Penjualan per Kategori</h3>
                        <p className="text-xs text-slate-500">Distribusi penjualan berdasarkan kategori produk</p>
                      </div>
                      <div className="p-6">
                        <ResponsiveContainer width="100%" height={280}>
                          <PieChart>
                            <Pie
                              data={SALES_CATEGORIES}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={90}
                              label={(entry) => `${entry.name}: ${entry.value}%`}
                            >
                              {SALES_CATEGORIES.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(val: number | undefined) => (val ? `${val}%` : '0')} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </Card>

                    {/* Stacked Bar Chart */}
                    <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                      <div className="border-b bg-white p-4">
                        <h3 className="font-bold text-slate-800">Penjualan B2B</h3>
                        <p className="text-xs text-slate-500">Top klien berdasarkan nilai transaksi</p>
                      </div>
                      <div className="p-6">
                        <div className="space-y-3">
                          {B2B_SALES_DATA.map((client, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
                            >
                              <div>
                                <p className="font-semibold text-slate-900">{client.client}</p>
                                <p className="text-xs text-slate-500">{client.category}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-emerald-600">{formatShortCurrency(client.amount)}</p>
                                <p className="text-xs text-emerald-600">+{client.growth}% growth</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Insights */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    {SALES_INSIGHTS.map((insight, idx) => (
                      <div key={idx} className="flex items-start gap-3 rounded-lg bg-blue-50 p-4">
                        <TrendUp size={20} weight="bold" className="shrink-0 text-blue-600" />
                        <p className="text-sm font-medium text-blue-900">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Operational Tab */}
              {activeTab === 'operational' && (
                <div className="space-y-6">
                  {/* Operational Stats */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <Card className="group relative overflow-hidden border-l-[6px] border-emerald-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
                      <div className="relative z-10">
                        <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Efisiensi Produksi</p>
                        <h3 className="mt-1 text-2xl font-bold text-slate-800">{OPERATIONAL_METRICS.productionCapacity}%</h3>
                        <div className="mt-3">
                          <Badge className="bg-emerald-50 text-emerald-700">
                            <TrendUp size={10} weight="bold" /> +3%
                          </Badge>
                        </div>
                      </div>
                      <div className="absolute -right-4 -bottom-4 rotate-12 text-emerald-50 opacity-20">
                        <Factory size={90} weight="duotone" />
                      </div>
                    </Card>

                    <Card className="group relative overflow-hidden border-l-[6px] border-red-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
                      <div className="relative z-10">
                        <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Quality Pass Rate</p>
                        <h3 className="mt-1 text-2xl font-bold text-slate-800">{OPERATIONAL_METRICS.qualityPassRate}%</h3>
                        <div className="mt-3">
                          <Badge className="bg-red-50 text-red-700">
                            <WarningCircle size={10} weight="bold" /> Maintain
                          </Badge>
                        </div>
                      </div>
                    </Card>

                    <Card className="group relative overflow-hidden border-l-[6px] border-emerald-500 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
                      <div className="relative z-10">
                        <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">On-Time Delivery</p>
                        <h3 className="mt-1 text-2xl font-bold text-slate-800">{OPERATIONAL_METRICS.deliveryOnTime}%</h3>
                        <div className="mt-3">
                          <Badge className="bg-emerald-50 text-emerald-700">
                            <CheckCircle size={10} weight="bold" /> +2%
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Defect Analysis Chart */}
                  <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b bg-white p-4">
                      <h3 className="font-bold text-slate-800">Analisis Penyebab Kecacatan</h3>
                      <p className="text-xs text-slate-500">Top 5 penyebab kecacatan produk</p>
                    </div>
                    <div className="p-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={DEFECT_REASONS} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis type="number" tick={{ fill: '#64748b', fontSize: 12 }} />
                          <YAxis dataKey="reason" type="category" width={150} tick={{ fill: '#64748b', fontSize: 12 }} />
                          <Tooltip />
                          <Bar dataKey="count" fill="#ef4444" name="Jumlah Kasus" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </div>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
