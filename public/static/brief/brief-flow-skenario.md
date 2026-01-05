# Flow Skenario

# Flow

Skenario ini dirancang untuk menunjukkan bagaimana sistem memecahkan masalah operasional KS FOOD (Human Error, Stok Hantu, Keterlambatan Data) dengan menerapkan teori **PPIC, BOM, dan Supply Chain Management**.

Data dummy yang digunakan mengacu pada atribut yang sudah kita definisikan di **Domain Class Diagram** 1 dan **Dokumen Fisik** (Form Kontrol Produksi, Laporan Hasil).

---

### **1. Flow Pra-Transaksi: Perencanaan & Produksi (Make-to-Stock)**

*Konteks: KS FOOD harus memproduksi stok sebelum pesanan ritel masuk. Ini menerapkan teori **PPIC (Production Planning & Inventory Control)**.* Sebelum transaksi penjualan terjadi, KS FOOD harus memastikan stok tersedia.
**Masalah Lama:** Perhitungan bahan baku manual (sering kurang saat masak), resep hanya di kepala koki (risiko hilang), dan data hasil produksi telat masuk ke admin.

Skenario:

Manager Produksi (Budi) merencanakan pembuatan "Saos Sambal Bawang 500ml" sebanyak 100 Batch untuk stok minggu depan.

| **Langkah** | **Aktor & Aktivitas** | **Data Dummy & Proses Sistem** | **Solusi & Teori** |
| --- | --- | --- | --- |
| **1. Perencanaan (Planning)** | **Budi** (Produksi) membuat `Job Order` baru di **Aplikasi 3 (Internal)**. | **Input:** 
• Produk: Saos Sambal Bawang
• Target: 100 Batch
• Tgl: 25 Okt 2025
**Output Sistem (BOM Calculation):**
Sistem otomatis menghitung kebutuhan bahan berdasarkan **`MS Recipe`**:
• Cabai: Butuh 500 Kg (Stok: 800 Kg - **OK**)
• Bawang: Butuh 100 Kg (Stok: 50 Kg - **KURANG!**) | **Solusi:** 
Sistem mencegah "Stok Habis Mendadak" dengan kalkulasi otomatis.
**Teori: BOM (Bill of Materials)**
Daftar bahan baku yang diperlukan untuk membuat 1 unit produk jadi. Sistem menggunakan ini untuk memprediksi kekurangan bahan. |
| **2. Pengambilan Bahan (Intake)** | **Operator Gudang** menyiapkan bahan. Membuka **Aplikasi 2 (Tablet)** menu "Ambil Bahan". | **Aksi:** Scan QR Code karung Cabai.
**Data Terkam (`TR DailyMaterialIntake`):**
• Material: Cabai Rawit
• Batch Asal: #SUP-009 (Exp: Des 2025)
• Qty Ambil: 500 Kg | **Solusi:** 
Mencegah pengambilan bahan expired (FEFO). Validasi scan memastikan bahan yang diambil benar.
**Teori: FEFO (First Expired First Out)**
Barang yang kedaluwarsa duluan harus dipakai duluan. |
| **3. Proses Masak (In-Process Control)** | **Koki** memasak saos. Membuka **Aplikasi 2 (Tablet)** menu "Job Order". | **Data Input (`TR ProductionControl`):**
• Suhu Masak: 98°C
• Viskositas Panas: 120 cP
• Waktu: 09:00 - 11:00
**Fitur KM:** Tablet menampilkan **SOP Digital** (Video cara mengaduk). | **Solusi:** 
Digitalisasi "Feeling Koki". Data suhu tercatat untuk pelacakan jika nanti produk gagal.
**Teori: SECI (Internalization)**
Transfer pengetahuan SOP (Eksplisit) menjadi skill koki (Tacit) lewat panduan digital. |
| **4. Hasil Produksi (Output)** | **Admin Produksi** lapor hasil. | **Input (`TR ProductionResult`):**
• Hasil Bagus: 980 Botol
• Reject: 20 Botol
• Batch ID Baru: **#BATCH-SAOS-1025** (QR Code digenerate). | **Solusi:** 
Stok Barang Jadi otomatis bertambah. Traceability terbentuk (Batch 1025 dibuat dari Cabai Batch SUP-009). |

---

### **2. Flow Transaksi B2B: Penjualan Kontrak (Make-to-Order)**

*Konteks: Penjualan ke klien korporat (Gokana/Mayora) dengan sistem tempo dan kontrak.*

Skenario:

Klien "PT Gokana Utama" memesan 1.000 Jerigen Saos sesuai kontrak kerjasama.

| **Langkah** | **Aktor & Aktivitas** | **Data Dummy & Proses Sistem** | **Solusi & Teori** |
| --- | --- | --- | --- |
| **1. Order Masuk (Contract Based)** | **Admin Sales** menerima PO dari Gokana atau Gokana input via Portal B2B. | **Input (`TR Order`):**
• Customer: PT Gokana Utama
• Item: Saos Jerigen 20L
• Qty: 50 Jerigen
• No Kontrak: #K-GKN-2024 (Harga Khusus) | **Solusi:** 
Harga otomatis sesuai kontrak (tidak salah harga). Sistem mengunci stok agar tidak terjual ke orang lain.
**Teori: Sales Contract Management**
Mengelola kesepakatan harga dan term pembayaran spesifik per klien. |
| **2. Approval Pimpinan (Credit Check)** | **Ibu Grace (Pimpinan)** menerima notifikasi approval di **Aplikasi 3 (Dashboard)**. | **Tampilan Dashboard:**
• Pemesan: Gokana
• Total Order: Rp 15.000.000
• Status Piutang: Lancar (Limit sisa 50 Juta)
**Aksi:** Klik "Approve" & Input PIN. | **Solusi:** 
Keputusan berbasis data (*Data Driven Decision*). Pimpinan tidak perlu tanya Finance manual tentang status hutang klien. |
| **3. Pengiriman (Shipping & QC)** | **Staf Gudang** melakukan *Picking* barang. | **Aksi:** Scan QR Code Jerigen #BATCH-SAOS-1025.
**Validasi Sistem:**
✅ Barang Benar
✅ Expired Date Aman (> 6 Bulan)
✅ Status QC: *Released* (Lolos Lab)
**Output:** Cetak **Surat Jalan Digital**. | **Solusi:** 
Mencegah kirim barang salah/expired. Surat jalan otomatis sinkron dengan barang yang keluar.
**Teori: Outbound Logistics**
Memastikan barang yang tepat dikirim ke tempat yang tepat pada waktu yang tepat. |
| **4. Penagihan (Invoicing)** | **Sistem (Otomatis)** setelah barang diterima. | **Integrasi Accurate:**
Sistem KS FOOD mengirim data ke Accurate untuk menerbitkan **Invoice #INV-2025-001** dengan tempo 30 hari. | **Solusi:** 
Mengurangi beban admin finance rekap ulang data surat jalan ke invoice. |

---

### **3. Flow Transaksi B2C: Omnichannel (E-Commerce)**

*Konteks: Penjualan eceran via Shopee/Tokopedia yang butuh kecepatan sinkronisasi stok.*

Skenario:

User "Ani" membeli 2 Botol Saos di Shopee KS FOOD Official Shop.

| **Langkah** | **Aktor & Aktivitas** | **Data Dummy & Proses Sistem** | **Solusi & Teori** |
| --- | --- | --- | --- |
| **1. Order Sync (Real-time)** | **Sistem Omnichannel** mendeteksi pesanan baru via API. | **Data Masuk (`TR Order`):**
• Source: `Shopee`
• No Pesanan: #SHP-22049
• Item: Saos Bawang 500ml
• Qty: 2 Pcs
**Aksi Sistem:** Stok "Available" di database dikurangi 2. Update stok ke Tokopedia (agar tidak double order). | **Solusi:** 
Mencegah **"Stok Hantu"** (Overselling). Stok di semua marketplace selalu sinkron.
**Teori: Inventory Synchronization**
Menjaga konsistensi data stok di berbagai saluran penjualan secara *real-time*. |
| **2. Packing (Validation)** | **Tim Packing** menyiapkan paket. | **Aksi:** Ambil botol di rak, Scan QR Code botol.
**Validasi:** "Produk sesuai dengan Order #SHP-22049".
**Input:** Scan No Resi Ekspedisi (J&T). | **Solusi:** 
Mengurangi tingkat retur akibat salah kirim barang.
**Teori: Error Proofing (Poka-Yoke)**
Mencegah kesalahan manusia dengan mekanisme sistem (Scan QR) yang menolak jika produk salah. |
| **3. Update Status** | **Sistem** update ke Shopee. | Status di Shopee berubah otomatis: "Dikirim". Stok fisik di gudang resmi berkurang. | **Solusi:** 
Efisien. Admin tidak perlu login ke Seller Center Shopee satu per satu untuk update resi. |

---

### **4. Flow Tambahan: Penanganan Produk Tidak Sesuai (Defect Handling)**

*Konteks: QC menemukan produk gagal. Penting untuk Knowledge Management.*

Skenario:

QC Lab menemukan Batch #BATCH-SAOS-1025 rasanya terlalu asin.

| **Langkah** | **Aktor & Aktivitas** | **Data Dummy & Proses Sistem** | **Solusi & Teori** |
| --- | --- | --- | --- |
| **1. Input Hasil Lab (QC)** | **Staf QC** input hasil tes di **Aplikasi 3 (Internal)**. | **Input (`TR ProductAnalysis`):**
• Batch: #BATCH-SAOS-1025
• Kadar Garam: 5% (Standar Max: 3%)
• Status: **REJECT / HOLD** | **Solusi:** 
Sistem otomatis memblokir Batch ini di Gudang. Staf gudang tidak akan bisa men-scan barang ini untuk dikirim (Scan Gagal: "Barang di-Hold QC"). |
| **2. Analisis & Lesson Learned** | **Kepala Produksi** investigasi & lapor. | **Input (`TR PengendalianProdukTidakSesuai`):**
• Masalah: Terlalu Asin
• Penyebab (*Root Cause*): Timbangan garam error.
• Tindakan: *Rework* (Campur dengan batch tawar). | **Solusi:** 
Mencatat pengetahuan perbaikan masalah.
**Teori: Knowledge Management (Lesson Learned Database)**
Menyimpan pengalaman pemecahan masalah agar bisa dicari kembali di masa depan ("Kenapa dulu saos asin? Oh timbangan error"). |

---