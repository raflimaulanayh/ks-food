# Menu aplikasi

# Aplikasi

---

### **Aplikasi 1: Website Portofolio & Pemesanan (Web Store)**

Platform: Web Based (Responsive untuk Desktop & HP)

Target: Eksternal (Pelanggan)

### **Aktor 1: Customer B2C (Perorangan) & B2B (Bisnis)**

- **Navbar / Menu Utama:**
    1. **Beranda:** Banner promo, Tentang KS FOOD.
    2. **Produk:** Katalog Saos & Bumbu (Filter Kategori).
    3. **Mitra B2B:** Halaman khusus pendaftaran/login akun bisnis.
    4. **Keranjang:** List barang yang akan dibeli.
    5. **Akun Saya:**
        - *Riwayat Pesanan* (Invoice Digital).
        - *Lacak Pesanan* (Tracking Resi).
        - *Pengajuan Kontrak* (Khusus B2B).
- **Fitur Unggulan:**
    - **Live Stock Check:** Stok yang tampil sinkron dengan gudang (Mencegah order barang kosong).
    - **Contract Upload (B2B):** Form digital untuk mengajukan kerjasama harga khusus.
- **Flow Aktivitas (Skenario Belanja):**
    1. Customer Login -> Memilih produk di **Katalog** -> Masuk **Keranjang**.
    2. **Checkout:** Sistem menghitung ongkir otomatis -> Customer memilih metode bayar -> **Pembayaran** via Payment Gateway.
    3. **Pasca Bayar:** Customer masuk menu **Akun Saya** -> Klik **Lacak Pesanan** untuk melihat posisi barang secara *real-time*.

---

### **Aplikasi 2: Monitoring Stok Barang (Ops Mobile)**

Platform: Tablet (Android) - Orientasi Landscape

Target: Operasional Lapangan (Gudang & Produksi)

Fokus: Perpindahan fisik barang & Validasi via Scan QR Code.

### **Aktor 1: Staf Gudang**

- **Menu Utama (Dashboard Tablet):**
    1. **Penerimaan (Inbound):** List PO dari Supplier.
    2. **Pengiriman (Outbound):** List Pesanan Siap Kirim.
    3. **Info Stok:** Cek stok cepat & Opname.
- **Fitur Unggulan:**
    - **QR Scanner Button:** Tombol fisik/layar besar untuk scan barcode.
    - **Batch & Expired Input:** Wajib isi saat terima barang (Solusi FEFO).
- **Flow Aktivitas (Penerimaan Barang):**
    1. Buka menu **Penerimaan** -> Pilih PO Supplier yang datang.
    2. Klik **Scan QR** pada karung bahan -> Sistem memvalidasi item sesuai PO.
    3. Input `Expired Date` & `Batch` -> Simpan (Stok bertambah di sistem).
- **Flow Aktivitas (Pengiriman Barang):**
    1. Buka menu **Pengiriman** -> Pilih Pesanan (misal: Order Shopee #123).
    2. Ambil barang di rak -> **Scan QR Barang**.
    3. Jika barang benar & tidak expired -> Sistem ACC -> Klik **Cetak Surat Jalan**.

### **Aktor 2: Staf QC (Inbound)**

- **Menu Utama:**
    1. **QC Bahan Baku:** List kedatangan bahan yang perlu diperiksa.
- **Fitur:** Form Cek Fisik (Warna, Bau, Suhu) & Toggle (Terima/Tolak).
- **Flow Aktivitas:**
    1. Barang datang di loading dock -> Buka menu **QC Bahan Baku**.
    2. Pilih Item -> Cek kondisi fisik -> Input hasil.
    3. Jika **Lolos**, tombol "Terima" di menu Staf Gudang baru akan aktif.

### **Aktor 3: Tim Produksi (Bagian Input)**

- **Menu Utama:**
    1. **Ambil Bahan:** Permintaan bahan baku ke gudang.
    2. **Lapor Hasil:** Input output produksi.
- **Flow Aktivitas:**
    1. Selesai masak -> Buka menu **Lapor Hasil**.
    2. Pilih Job Order -> **Scan QR Mesin/Batch**.
    3. Input: "Jumlah Jadi: 500", "Jumlah Reject: 5" -> Simpan.

---

### **Aplikasi 3: System Internal (KS FOOD ERP)**

Platform: Web Desktop (Untuk Admin/Pimpinan) & Tablet Mode (Untuk Lab/Produksi View)

Target: Manajemen & Administrasi Pusat

Fokus: Pengolahan Data, Approval, & Knowledge Management.

### **Aktor 1: Pimpinan (Ibu Grace)**

- **Navbar / Sidebar:**
    1. **Dashboard Utama:** Grafik Sales, Stok Kritis, Keuangan.
    2. **Approval Center:** Pusat notifikasi dokumen butuh tanda tangan.
    3. **Laporan:** Keuangan & Performa Bisnis.
- **Fitur Unggulan:**
    - **One-Click Approval:** Setujui PO/Kontrak dengan PIN 6 digit.
    - **Business Intelligence:** Melihat tren penjualan terlaris.
- **Flow Aktivitas:**
    1. Login -> Cek **Dashboard** (Melihat omzet hari ini).
    2. Masuk **Approval Center** -> Lihat pengajuan "Pembelian Cabai 1 Ton".
    3. Cek harga & budget -> Masukkan PIN -> **Approve** (PO terkirim ke supplier).

### **Aktor 2: Admin (Sales & Procurement)**

- **Navbar / Sidebar:**
    1. **Omnichannel Order:** Pesanan gabungan (Web, Tokopedia, Shopee).
    2. **Procurement:** Buat PO, Analisis Kebutuhan Material.
    3. **User Management:** Kelola akun karyawan.
- **Flow Aktivitas (Omnichannel):**
    1. Terima notifikasi order baru dari Shopee di menu **Omnichannel**.
    2. Sistem otomatis mem-booking stok.
    3. Admin meneruskan order ke Gudang untuk dipacking (Status: "Siap Kirim").

### **Aktor 3: Tim Produksi (Planning & SOP)**

- **Navbar / Sidebar:**
    1. **Production Planning:** Buat Jadwal & Job Order.
    2. **Knowledge Base:** Lihat SOP & Resep (Akses Tablet di pabrik).
- **Flow Aktivitas (Planning - PPIC):**
    1. Cek stok barang jadi menipis -> Buka **Production Planning**.
    2. Buat Job Order "Saos 500 Botol" -> Sistem hitung kebutuhan bahan (BOM).
    3. Terbitkan Job Order.
- **Flow Aktivitas (Knowledge Management):**
    1. Operator di pabrik buka menu **Knowledge Base** via Tablet.
    2. Pilih "SOP Pemasakan Saos" -> Baca panduan suhu & durasi.

### **Aktor 4: Staf QC (Lab & Defect)**

- **Navbar / Sidebar:**
    1. **QC Lab (Produk Jadi):** Input hasil tes laboratorium.
    2. **Defect Report:** Lapor produk gagal & Solusinya.
- **Flow Aktivitas (Lesson Learned):**
    1. Ada produk gagal -> Input di **Defect Report**.
    2. Isi "Masalah: Terlalu Asin", "Penyebab: Timbangan Error", "Solusi: Kalibrasi Ulang".
    3. Data tersimpan sebagai *Lesson Learned* untuk masa depan.

---

### **Ringkasan Hubungan Antar Aplikasi**

1. **Customer** beli di **App 1**.
2. Data pesanan masuk ke **App 3** (Omnichannel) untuk dikelola Admin.
3. Admin kirim instruksi ke **App 2** (Gudang) untuk packing & kirim.
4. Stok di **App 2** berkurang, otomatis update stok di **App 1** & **App 3** (Real-time).