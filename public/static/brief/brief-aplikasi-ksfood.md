# Aplikasi

[Menu aplikasi](https://www.notion.so/Menu-aplikasi-2d894a6c62e080899150da64986f9991?pvs=21)

[Flow Skenario](https://www.notion.so/Flow-Skenario-2d894a6c62e080c29e6bc31374a5cc67?pvs=21)

**3 Aplikasi** yang akan dibangun, beserta pemetaan **Kegiatan (Activity)** ke **Use Case** yang sesuai.

Disusun secara **kronologis (Flow)** mulai dari user manajemen, pembelian pelanggan, pengadaan bahan, produksi, hingga manajemen internal.

### **Daftar Aplikasi (System Boundaries)**

1. **Aplikasi 1: KS FOOD Customer Portal**
    - *Boundary:* Website Portofolio & Pemesanan.
    - *Platform:* Web (Public).
    - *User:* Pelanggan B2C & B2B.
2. **Aplikasi 2: KS FOOD Ops Mobile**
    - *Boundary:* System Gudang (Aplikasi Monitoring Stok Barang).
    - *Platform:* Tablet/Mobile (Android).
    - *User:* Staff Gudang, Tim Produksi (Lantai Pabrik), Staff QC (Inbound).
3. **Aplikasi 3: KS FOOD ERP (Internal System)**
    - *Boundary:* System Internal.
    - *Platform:* Web Desktop.
    - *User:* Pimpinan, Admin, Finance, Procurement, QC Lab, HR.

---

### **Urutan Kegiatan & Pemetaan Use Case**

### **A. Flow Manajemen Awal (Setup)**

1. Admin IT membuatkan akun untuk karyawan baru: **Aplikasi 3**, *Mengelola Akun User*.

### **B. Flow Penjualan & Pelanggan (Sales)**

1. Pelanggan baru mendaftar akun di website: **Aplikasi 1**, *Register (pribadi / bisnis)*.
2. Pelanggan melihat-lihat daftar produk: **Aplikasi 1**, *Melihat Katalog Produk*.
3. Pelanggan B2C memasukkan barang ke keranjang dan checkout: **Aplikasi 1**, *Memesan Barang*.
4. Pelanggan melakukan pembayaran transfer/VA: **Aplikasi 1**, *Pembayaran*.
5. Pelanggan B2B mengajukan kerjasama kontrak: **Aplikasi 1**, *Mengajukan Kontrak*.
6. Pimpinan memvalidasi pengajuan kontrak B2B tersebut: **Aplikasi 3**, *Validasi Kontrak*.
7. Admin memproses pesanan yang masuk dari Web/Shopee/Tokopedia: **Aplikasi 3**, *Mengelola Pesanan*.
8. Pelanggan mengecek posisi paket mereka: **Aplikasi 1**, *Tracking Pesanan*.
9. Pelanggan melihat riwayat belanja masa lalu: **Aplikasi 1**, *Melihat History Transaksi*.

### **C. Flow Pengadaan Bahan Baku (Procurement)**

1. Pihak Gudang/Sistem mengecek level stok saat ini: **Aplikasi 2**, *Melihat Analisis Stok*.
2. Staff Pengadaan membuat draft pesanan pembelian bahan: **Aplikasi 3**, *Membuat Purchase Order*.
3. Pimpinan menyetujui pembelian bahan baku tersebut: **Aplikasi 3**, *Memberi Persetujuan Purchase Order*.
4. Supplier datang, QC memeriksa kualitas bahan baku fisik: **Aplikasi 2**, *Manage laporan Pemeriksaan kualitas bahan baku*.
5. Staff Gudang memindai QR bahan dan mencatat masuk gudang: **Aplikasi 2**, *Scan QR Code*.
6. Staff Gudang menyelesaikan input penerimaan di sistem: **Aplikasi 2**, *Manage Penerimaan Bahan Baku*.
7. Pimpinan memvalidasi penerimaan aset bahan baku tersebut: **Aplikasi 3**, *Memberi Persetujuan Penerimaan Bahan baku*.

### **D. Flow Produksi (Production)**

1. Tim Produksi membuat rencana kerja (Job Order): **Aplikasi 3**, *Membuat Plan Produksi*.
2. Operator melihat jadwal kerja harian di tablet/layar: **Aplikasi 3**, *Melihat jadwal Produksi*.
3. Operator Gudang/Produksi mengambil bahan baku dari gudang: **Aplikasi 2**, *Membuat laporan Pengambilan bahan baku*.
    - *(Kegiatan ini menggunakan Scan QR Code juga)*.
4. Operator Produksi membuka panduan resep/cara masak: **Aplikasi 3**, *Melihat SOP & Resep*.
5. Setelah masak selesai, Operator mencatat hasil output: **Aplikasi 2**, *Membuat laporan Produksi*.
    - *(Kegiatan ini menggunakan Scan QR Code untuk batch hasil)*.

### **E. Flow Kontrol Kualitas & Knowledge Management (QC & KM)**

1. QC Lab menguji sampel produk jadi (kimia/fisik): **Aplikasi 3**, *Manage laporan hasil QC*.
2. Jika produk gagal, QC mencatat cacat dan penyebabnya: **Aplikasi 3**, *Membuat Laporan Produk Tidak Sesuai*.
3. QC/Produksi mencari riwayat masalah serupa di masa lalu: **Aplikasi 3**, *Mencari Lesson Learned*.
4. Admin/Pimpinan mengupdate dokumen resep/SOP baru: **Aplikasi 3**, *Mengelola Data SOP & Resep*.

### **F. Flow Pengiriman Barang (Outbound)**

1. Staff Gudang mengatur jadwal dan supir pengiriman: **Aplikasi 2**, *Manage Jadwal Pengiriman*.
    - *(Kegiatan ini menggunakan Scan QR Code saat picking barang)*.
2. Pimpinan menyetujui barang keluar (Gate Pass): **Aplikasi 3**, *Memberi Persetujuan Pengiriman Barang*.

### **G. Flow Manajemen & Keuangan (Back Office)**

1. Pimpinan memantau grafik penjualan dan stok real-time: **Aplikasi 3**, *Memantau Kinerja Bisnis (Dashboard)*.
2. Accounting menarik data untuk laporan laba rugi: **Aplikasi 3**, *Mengelola Laporan Keuangan*.
3. Karyawan mengajukan izin keluar kantor/pabrik: **Aplikasi 3**, *Mengajukan Perizinan keluar gedung*.
4. Pimpinan/HR menyetujui izin karyawan tersebut: **Aplikasi 3**, *Mengelola Perizinan Karyawan*.

---

*Catatan: Semua 32 Use Case telah terpetakan ke dalam aktivitas spesifik.*

---

### **Ringkasan Poin Penting untuk Laporan:**

1. **Integrasi Data (Single Source of Truth):** Flow di atas menunjukkan bahwa data Produksi, Gudang, dan Sales saling terhubung. Produksi tahu apa yang harus dimasak dari Sales, Gudang tahu apa yang harus dikirim dari Sales, dan Sales tahu stok dari Produksi.
2. **Validasi Sistem:** Penggunaan QR Code di setiap langkah (Intake, Produksi, Shipping) adalah kunci solusi untuk masalah *Human Error* KS FOOD.
3. **Teori Pendukung:** Pastikan Anda menyebutkan **BOM** (untuk efisiensi bahan), **PPIC** (untuk perencanaan stok), dan **Traceability** (untuk keamanan pangan) dalam penjelasan alur Anda.