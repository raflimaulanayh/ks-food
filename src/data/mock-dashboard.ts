export interface DashboardStat {
  title: string
  value: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  color: 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'orange'
}

export interface ChartDataPoint {
  name: string
  value1: number
  value2?: number
  [key: string]: string | number | undefined
}

export interface ActivityLog {
  id: string
  message: string
  time: string
  type: 'alert' | 'info' | 'success'
}

export const MOCK_DATA = {
  PIMPINAN: {
    stats: [
      { title: 'Total Pendapatan', value: 'Rp 42,5 M', trend: 'up', trendValue: '+12,5%', color: 'green' },
      { title: 'Total Produksi', value: '1.250 Ton', trend: 'up', trendValue: '+5,2%', color: 'blue' },
      { title: 'Menunggu Persetujuan', value: '8 Item', trend: 'neutral', trendValue: 'Urgent', color: 'red' },
      { title: 'Tingkat Kecacatan', value: '0,45%', trend: 'down', trendValue: '-0,1%', color: 'green' }
    ] as DashboardStat[],
    chart1: [
      { name: 'Sen', value1: 4000, value2: 2400 },
      { name: 'Sel', value1: 3000, value2: 1398 },
      { name: 'Rab', value1: 2000, value2: 9800 },
      { name: 'Kam', value1: 2780, value2: 3908 },
      { name: 'Jum', value1: 1890, value2: 4800 },
      { name: 'Sab', value1: 2390, value2: 3800 },
      { name: 'Min', value1: 3490, value2: 4300 }
    ] as ChartDataPoint[],
    chart2: [
      { name: 'Bahan Baku', value1: 85, value2: 100 },
      { name: 'WIP', value1: 45, value2: 50 },
      { name: 'Barang Jadi', value1: 120, value2: 100 }
    ] as ChartDataPoint[],
    activities: [
      { id: '1', message: 'PO #4502 > Rp 500jt memerlukan persetujuan', time: '10 menit lalu', type: 'alert' },
      { id: '2', message: 'Gate Pass untuk Kendaraan B-2031-TXZ', time: '1 jam lalu', type: 'info' },
      { id: '3', message: 'Laporan Penjualan Bulanan telah dibuat', time: '3 jam lalu', type: 'success' }
    ] as ActivityLog[]
  },
  ADMIN: {
    stats: [
      { title: 'Total Pengguna Aktif', value: '128 User', trend: 'up', trendValue: '+5 Minggu Ini', color: 'blue' },
      { title: 'Server Uptime', value: '99.99%', trend: 'up', trendValue: 'Stable', color: 'green' },
      { title: 'Error Log Hari Ini', value: '12 Errors', trend: 'down', trendValue: '-5 dari kemarin', color: 'red' },
      { title: 'Storage Used', value: '450 GB', trend: 'neutral', trendValue: '45% of 1TB', color: 'purple' }
    ] as DashboardStat[],
    chart1: [
      { name: '00:00', value1: 50 },
      { name: '04:00', value1: 30 },
      { name: '08:00', value1: 340 },
      { name: '12:00', value1: 520 },
      { name: '16:00', value1: 450 },
      { name: '20:00', value1: 280 }
    ] as ChartDataPoint[],
    chart2: [
      { name: 'QC Lab', value1: 20 },
      { name: 'Warehouse', value1: 30 },
      { name: 'Procurement', value1: 15 },
      { name: 'Finance', value1: 12 },
      { name: 'HR', value1: 10 },
      { name: 'Production', value1: 13 }
    ] as ChartDataPoint[],
    activities: [
      { id: '1', message: 'User baru "Budi Santoso" ditambahkan ke Warehouse', time: '10 menit lalu', type: 'success' },
      { id: '2', message: 'Database backup otomatis berhasil', time: '02:00 AM', type: 'info' },
      { id: '3', message: 'Warning: High CPU Usage detected on Server-1', time: '1 jam lalu', type: 'alert' }
    ] as ActivityLog[]
  },
  QC: {
    stats: [
      { title: 'Batch Diperiksa', value: '24 Batch', trend: 'up', trendValue: 'Hari ini', color: 'blue' },
      { title: 'Tingkat Lulus', value: '98,2%', trend: 'up', trendValue: '+1,2%', color: 'green' },
      { title: 'Batch Ditolak', value: '2 Batch', trend: 'down', trendValue: 'Rendah', color: 'red' },
      { title: 'Rata-rata Waktu Lab', value: '45 Menit', trend: 'neutral', trendValue: 'Stabil', color: 'purple' }
    ] as DashboardStat[],
    chart1: [
      { name: 'Sen', value1: 2 },
      { name: 'Sel', value1: 5 },
      { name: 'Rab', value1: 1 },
      { name: 'Kam', value1: 0 },
      { name: 'Jum', value1: 3 },
      { name: 'Sab', value1: 1 },
      { name: 'Min', value1: 0 }
    ] as ChartDataPoint[],
    chart2: [
      { name: 'Asin', value1: 40 },
      { name: 'Gosong', value1: 30 },
      { name: 'Cair', value1: 30 }
    ] as ChartDataPoint[],
    activities: [
      { id: '1', message: 'Batch #203 gagal uji Salmonella', time: '20 menit lalu', type: 'alert' },
      { id: '2', message: 'Kalibrasi alat lab jatuh tempo', time: '2 hari', type: 'info' }
    ] as ActivityLog[]
  },
  PROCUREMENT: {
    stats: [
      { title: 'Stok Menipis', value: '5 Item', trend: 'down', trendValue: 'Kritis', color: 'red' },
      { title: 'PO Aktif', value: '12 Pesanan', trend: 'up', trendValue: 'On Track', color: 'blue' },
      { title: 'Ketepatan Supplier', value: '88%', trend: 'down', trendValue: '-2%', color: 'yellow' },
      { title: 'Pengeluaran (MTD)', value: 'Rp 1,2 M', trend: 'up', trendValue: '+5%', color: 'purple' }
    ] as DashboardStat[],
    chart1: [
      { name: 'W1', value1: 400 },
      { name: 'W2', value1: 300 },
      { name: 'W3', value1: 500 },
      { name: 'W4', value1: 200 }
    ] as ChartDataPoint[],
    chart2: [
      { name: 'CV Tani Jaya', value1: 90 },
      { name: 'UD Bumbu Desa', value1: 85 },
      { name: 'PT Plastik Indo', value1: 75 },
      { name: 'PT Mitra Plastik', value1: 80 }
    ] as ChartDataPoint[],
    activities: [
      { id: '1', message: 'Stok tepung di bawah batas aman (500kg)', time: '5 menit lalu', type: 'alert' },
      { id: '2', message: 'PO #555 ke Bogasari telah disetujui', time: '2 jam lalu', type: 'success' }
    ] as ActivityLog[]
  },
  WAREHOUSE: {
    stats: [
      { title: 'Total SKU Disimpan', value: '150 Item', trend: 'neutral', trendValue: 'Stabil', color: 'blue' },
      { title: 'Stok Menipis', value: '5 Item', trend: 'down', trendValue: 'Perlu Restock', color: 'red' },
      { title: 'Inbound Hari Ini', value: '12 Pallet', trend: 'up', trendValue: '+3 dari kemarin', color: 'blue' },
      { title: 'Outbound Hari Ini', value: '8 Pengiriman', trend: 'up', trendValue: '+2 dari kemarin', color: 'orange' }
    ] as DashboardStat[],
    chart1: [
      { name: 'Sen', value1: 15, value2: 8 },
      { name: 'Sel', value1: 12, value2: 10 },
      { name: 'Rab', value1: 18, value2: 7 },
      { name: 'Kam', value1: 14, value2: 9 },
      { name: 'Jum', value1: 16, value2: 11 },
      { name: 'Sab', value1: 10, value2: 6 },
      { name: 'Min', value1: 12, value2: 8 }
    ] as ChartDataPoint[],
    chart2: [
      { name: 'Gudang A', value1: 85 },
      { name: 'Gudang B', value1: 92 },
      { name: 'Gudang C', value1: 78 }
    ] as ChartDataPoint[],
    activities: [
      { id: '1', message: 'Inbound: Batch #SAOS-1020 (+500 pcs) diterima', time: '10:30 AM', type: 'success' },
      { id: '2', message: 'Outbound: SO-005 ke Toko Abadi (150 pcs) dikirim', time: '09:15 AM', type: 'info' },
      { id: '3', message: 'ALERT: Stok Saos Tomat di bawah safety stock', time: '08:45 AM', type: 'alert' }
    ] as ActivityLog[]
  },
  FINANCE: {
    stats: [
      { title: 'Total Revenue (Bulan Ini)', value: 'Rp 450 Juta', trend: 'up', trendValue: '+18%', color: 'green' },
      { title: 'Invoice Belum Dibayar', value: 'Rp 85 Juta', trend: 'neutral', trendValue: '5 Invoice', color: 'yellow' },
      { title: 'Profit Margin Estimasi', value: '35%', trend: 'up', trendValue: '+2%', color: 'green' },
      { title: 'Tagihan Jatuh Tempo', value: '1 Invoice', trend: 'down', trendValue: 'Overdue', color: 'red' }
    ] as DashboardStat[],
    chart1: [
      { name: '02 Des', value1: 12000000, value2: 8000000 },
      { name: '05 Des', value1: 15000000, value2: 9000000 },
      { name: '10 Des', value1: 16000000, value2: 10000000 },
      { name: '15 Des', value1: 14000000, value2: 9500000 },
      { name: '20 Des', value1: 13000000, value2: 9000000 },
      { name: '25 Des', value1: 16000000, value2: 11000000 },
      { name: '30 Des', value1: 15000000, value2: 10200000 }
    ] as ChartDataPoint[],
    chart2: [
      { name: 'Bahan Baku', value1: 45 },
      { name: 'Gaji', value1: 30 },
      { name: 'Operasional', value1: 15 },
      { name: 'Marketing', value1: 10 }
    ] as ChartDataPoint[],
    activities: [
      { id: '1', message: 'Invoice INV-2024-004 dibayar Rp 6.660.000', time: '10:30 AM', type: 'success' },
      { id: '2', message: 'Invoice INV-2024-003 JATUH TEMPO', time: '09:00 AM', type: 'alert' }
    ] as ActivityLog[]
  },
  HR: {
    stats: [
      { title: 'Total Karyawan', value: '45 Orang', trend: 'up', trendValue: '+3 bulan ini', color: 'blue' },
      { title: 'Kehadiran Hari Ini', value: '98%', trend: 'up', trendValue: 'Excellent', color: 'green' },
      { title: 'Payroll Bulan Ini', value: 'Rp 120 Juta', trend: 'neutral', trendValue: 'On Budget', color: 'purple' },
      { title: 'Kontrak Akan Habis', value: '3 Orang', trend: 'down', trendValue: '<60 hari', color: 'yellow' }
    ] as DashboardStat[],
    chart1: [
      { name: 'Sen', value1: 98, value2: 12 },
      { name: 'Sel', value1: 96, value2: 8 },
      { name: 'Rab', value1: 99, value2: 15 },
      { name: 'Kam', value1: 97, value2: 10 },
      { name: 'Jum', value1: 95, value2: 6 },
      { name: 'Sab', value1: 100, value2: 18 },
      { name: 'Min', value1: 100, value2: 20 }
    ] as ChartDataPoint[],
    chart2: [
      { name: 'Produksi', value1: 20 },
      { name: 'QC', value1: 8 },
      { name: 'Gudang', value1: 10 },
      { name: 'Admin', value1: 7 }
    ] as ChartDataPoint[],
    activities: [
      { id: '1', message: 'Kontrak Baru: Budi Santoso (Gudang) - Status Tetap', time: '2 jam lalu', type: 'success' },
      { id: '2', message: 'Payroll Desember 2024 disetujui (Rp 120 Juta)', time: '5 jam lalu', type: 'success' }
    ] as ActivityLog[]
  }
}
