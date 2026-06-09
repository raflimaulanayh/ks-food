# 📝 Kumpulan Notes Presentasi: Perancangan Database ERP KS FOOD
**Kelompok 3: Rafli Maulana, Russell Reece, & Dave Evander**

> **Tips Presentasi:** 
> - Santai saja, anggap dosen dan teman-teman kelas sebagai penonton stand-up comedy berbayar (yang bayarnya pakai perhatian).
> - Kontak mata dengan dosen, jangan cuma liat ke layar PPT atau kertas terus-menerus.
> - Klik navigasi slides dengan tenang.

---

## 🎬 PEMBAGIAN PRESENTASI (Saran Peran Baru)
* **Rafli (Opener, DB Specialist & Lead Presenter):** 
  * Pembuka & Cover (Slide 1), Profil Perusahaan (Slide 2), Sejarah (Slide 3).
  * Validasi Bottom-Up & Normalisasi Dokumen (Slide 19-22), Logical ERD (Slide 23).
  * Implementasi SQL DDL/DML (Slide 25), Keamanan DCL/TCL (Slide 26).
  * Physical ERD (Slide 27).
  * Demo Prototype Aplikasi & QR Codes (Slide 28).
  * Sesi Tanya Jawab (Q&A) & Penutup (Slide 29).
* **Russell (Business Analyst):** 
  * Struktur Organisasi (Slide 4), End-to-End Business Process (Slide 5), Sistem Saat Ini (Slide 6).
  * Masalah Utama / Problem Statements (Slide 7), Isolasi Data & Misi (Slide 8).
* **Dave (System & Database Architect):** 
  * Metode Pengumpulan Data (Slide 9), DBSDLC (Slide 10), Batasan & Tujuan Sistem (Slide 11-12).
  * Peran Pengguna (Slide 13), Aliran Data & CRUD (Slide 14).
  * Pemetaan 26 Entitas (Slide 15), Relasi Entitas (Slide 16), Skema Logika Top-Down (Slide 17-18), Kamus Data (Slide 24).

---

## 📝 NOTES PER SLIDE

### 📌 Slide 1: Cover (Pembuka)
* **Judul:** Perancangan Database ERP KS FOOD
* **Pembicara:** Rafli (Membuka Presentasi)
* **Poin Penting:** 
  * Sambut dosen dan teman-teman sekelas.
  * Perkenalkan anggota Kelompok 3 (Russell, Rafli, Dave).
  * Sebutkan studi kasus presentasi hari ini: ERP untuk CV Kertasari Sejahtera (KS FOOD).
* **💡 Humoris & Santai Cue:**
  > *"Halo semuanya, selamat pagi/siang. Selamat datang di presentasi Kelompok 3. Hari ini kami mau membahas perancangan database ERP untuk KS FOOD. Tenang saja teman-teman, walaupun judulnya database dan ERP yang terkesan berat dan bikin pusing, presentasi kami hari ini dijamin lebih segar dan membakar semangat dibanding sambal botolan kompetitor. Di sini ada saya Rafli, rekan saya Russell yang nanti akan membedah proses bisnis, dan Dave sang arsitek sistem kita."*

---

### 📌 Slide 2: Profil CV Kertasari Sejahtera (KS FOOD)
* **Pembicara:** Rafli
* **Poin Penting:**
  * KS FOOD adalah industri manufaktur FMCG (Fast-Moving Consumer Goods).
  * Produk utama: Saos Sambal, Saos Tomat, Mayones, dan Aneka Bumbu.
  * Pimpinan: Ibu Grace Indriani.
  * Model bisnis: Hybrid (B2B melayani korporasi besar seperti Mayora & Gokana, dan B2C lewat e-commerce).
* **💡 Humoris & Santai Cue:**
  > *"Mungkin ada yang nanya, FMCG itu apa sih? Singkatnya: produk yang cepat habis dibeli konsumen di minimarket karena kebutuhan sehari-hari. Bukan singkatan dari 'Fast-Moving' karena botol saosnya bisa lari sendiri ya. KS FOOD ini keren banget, mereka memproduksi saos sambal sampai mayones yang biasa kita makan kalau lagi jajan gorengan di pinggir jalan atau di restoran terkenal."*

---

### 📌 Slide 3: Sejarah KS FOOD
* **Pembicara:** Rafli
* **Poin Penting:**
  * Berdiri tahun 1943 oleh Ibu Hana Witjahja (Awalnya memproduksi Kecap Cap Noni secara tradisional).
  * Tahun 1949: Mulai beli pabrik permanen karena permintaan naik.
  * Transisi Manajemen: Generasi kedua (Bapak Herman Witjahja), produksi naik pesat sampai 1.500 botol/hari.
  * Tahun 1993: Mulai merilis varian saos sambal/tomat, dan berhasil dapat sertifikasi Halal MUI & Depkes RI.
* **💡 Humoris & Santai Cue:**
  > *"Sejarah KS FOOD ini dimulai dari tahun 1943. Bayangin, pas jaman penjajahan Jepang, ketika orang-orang lagi pusing mikirin kemerdekaan Indonesia, pendiri KS FOOD, Ibu Hana Witjahja, sudah visioner mikirin gimana caranya makan tahu tempe pakai Kecap Cap Noni biar makin nikmat. Dari alat tradisional, sekarang mereka sudah memproduksi ribuan botol saos per hari. Jadi, saos yang kita teliti ini punya sejarah perjuangan yang panjang!"*
  > *(Transisi ke Russell)*: *"Nah, untuk melihat bagaimana struktur pembagian kerja di pabrik bersejarah ini, silakan Russell untuk melanjutkan."*

---

### 📌 Slide 4: Struktur Organisasi
* **Pembicara:** Russell
* **Poin Penting:**
  * Struktur dipimpin oleh Kepala Pabrik.
  * Terdiri dari 4 divisi utama: Produksi, Quality Control (QC), Umum & Personalia, serta Administrasi.
* **💡 Humoris & Santai Cue:**
  > *"Terima kasih Rafli. Ini dia bagan kerjanya. Semua divisi di sini terstruktur rapi di bawah Kepala Pabrik. Yang paling krusial tentu saja divisi QC dan divisi Produksi—karena kalau resep rahasia saos sambal mereka bocor ke kelompok sebelah, bisa-bisa kelompok sebelah langsung jualan saos sambal mandiri di depan kampus."*

---

### 📌 Slide 5: End-to-End Business Process
* **Pembicara:** Russell
* **Poin Penting:**
  * Alur bisnis dari hulu ke hilir:
    1. Kontrak B2B (Mayora, Gokana) & e-commerce B2C.
    2. Pengadaan (Inbound) bahan baku dari supplier.
    3. Operasional Produksi (cuci, kukus, giling, masak resep rahasia, packaging).
    4. Quality Control (QC): Pengujian mikrobiologi, viskositas, pH, brix.
    5. Logistik Keluar (Outbound) ke distributor.
    6. Layanan pelanggan dan invoicing via Accurate.
* **💡 Humoris & Santai Cue:**
  > *"Di bagian produksi ini ada proses memasak resep rahasia. Kenapa rahasia? Ya kalau saya kasih tahu di sini, nanti bukan presentasi database lagi, tapi acara demo masak MasterChef. Tapi yang jelas, semua proses dari bahan mentah sampai jadi saos botolan ini harus tercatat rapi di database agar tidak ada bahan yang terbuang sia-sia."*

---

### 📌 Slide 6: Current Application / Information System
* **Pembicara:** Russell
* **Poin Penting:**
  * Sistem saat ini masih sangat terpisah (silo):
    * Linktree (untuk mengarahkan pelanggan).
    * Software Accurate (khusus invoicing/PO, tapi sulit sinkronisasi stok real-time).
    * Excel/Sheets (untuk rekap manual).
    * Mesin Absensi terpisah.
    * Catatan Kertas (paling dominan di gudang dan produksi).
* **💡 Humoris & Santai Cue:**
  > *"Sistem yang mereka pakai sekarang itu ibarat hubungan LDR jarak jauh—ada tapi jalan sendiri-sendiri. Buat invoicing pakai Accurate, buat rekap pakai Excel, dan yang paling juara: pakai catatan kertas di lapangan. Kalau kertasnya ketumpahan saos sambal atau hanyut kena angin badai, kelar sudah nasib stock opname gudang hari itu."*

---

### 📌 Slide 7: Problem Statements
* **Pembicara:** Russell
* **Poin Penting:**
  * **Masalah 1: Inventory Record Inaccuracy & Ghost Stock.** Jeda data antara penjualan online (Tokopedia/Shopee) dan Accurate membuat sistem menunjukkan stok ada (padahal fisik kosong), sehingga orderan terpaksa dibatalkan.
  * **Masalah 2: Human Error & Kertas Manual.** Pencatatan ganda pada QC dan produksi pakai kertas menyebabkan tracking batch kadaluwarsa jadi sangat sulit disalin secara manual.
* **💡 Humoris & Santai Cue:**
  > *"Nah, dari situlah kita masuk ke problem utamanya. Yang pertama ada istilah 'Ghost Stock'. Ini bukan stok hantu ya, tapi stok barang gaib. Di sistem e-commerce tulisannya stok ready 100 botol, pas pelanggan check out dan kurir mau ambil, barang fisiknya ternyata udah habis terjual offline. Mirip gebetan pas dichat: kelihatan online tapi pas dikontak gak ada balasan, alias dighosting."*

---

### 📌 Slide 8: Data Isolation & Mission Objectives
* **Pembicara:** Russell
* **Poin Penting:**
  * Silo data Excel menghambat analisis manajemen karena tidak ada dashboard real-time.
  * Persetujuan kredit B2B berjalan lambat.
  * **Misi Kita:** Merancang database terintegrasi dari hulu (pengadaan) ke hilir (distribusi) dengan target: pelacakan batch FEFO (First Expired, First Out) otomatis dan mitigasi ghost stock.
* **💡 Humoris & Santai Cue:**
  > *"Selain itu, manajemen mereka mengalami 'Data Isolation'. Divisi gudang punya datanya sendiri, divisi sales punya data sendiri. Pas rapat mingguan, mereka malah debat data siapa yang paling benar. Oleh karena itu, misi kami di sini adalah menyatukan mereka dalam satu database yang terintegrasi, dengan prinsip FEFO—yang pertama expired harus pertama kali keluar. Jangan sampai saos produksi tahun lalu baru dikirim bulan depan, nanti pelanggannya bisa kepedasan saos basi."*
  > *(Transisi ke Dave)*: *"Untuk menjelaskan metode bagaimana kami merancang solusi ini, silakan rekan saya Dave mengambil alih."*

---

### 📌 Slide 9: Metode Pengumpulan Data & Format Standar
* **Pembicara:** Dave
* **Poin Penting:**
  * **Teknik Pengumpulan Fakta:** 
    1. *Examining Documentation* (Analisis invoice, surat jalan, resep).
    2. *Interviewing* (Wawancara staff gudang & produksi).
    3. *Observing* (Mengamati langsung proses pabrik).
  * **Format Standar:** Penamaan camelCase (ERDish), ketepatan DateTime untuk FEFO, dan Decimal untuk gram/ml konversi resep.
* **💡 Humoris & Santai Cue:**
  > *"Terima kasih Russell. Untuk mengumpulkan data, kami melakukan tiga jurus. Kami membedah dokumen fisik, mewawancarai staf, dan mengamati langsung operasional pabrik. Pas observasi itu kami memperhatikan betul bagaimana detail pembuatan saosnya—tapi tenang, kami tidak sambil nyicipin saos langsung dari drumnya ya. Kami juga menetapkan format penamaan camelCase di database biar seragam, misal kodeBarang, bukan kode_barang_yang_kemarin_hilang_di_gudang."*

---

### 📌 Slide 10: Tahapan Implementasi (DBSDLC)
* **Pembicara:** Dave
* **Poin Penting:**
  * Menggunakan metodologi *Database System Development Life Cycle* (DBSDLC).
  * Tahapannya meliputi: Database Planning, Requirements Collection, Database Design (Conceptual, Logical, Physical), dan App Design.
* **💡 Humoris & Santai Cue:**
  > *"Kami merancang database ini tidak langsung 'sat set' bikin tabel di phpMyAdmin. Kami mengikuti aturan DBSDLC secara sakral. Mulai dari perencanaan, pengumpulan kebutuhan tiap divisi, perancangan skema relasi, sampai pembuatan interface aplikasinya. Jadi terstruktur secara akademis dan profesional."*

---

### 📌 Slide 11: System Objectives & Boundaries
* **Pembicara:** Dave
* **Poin Penting:**
  * **Tujuan Sistem:** Membangun Proprietary E-Commerce & Omnichannel, Single Source of Truth (SSOT) database, otomatisasi pemotongan stok untuk cegah ghost stock, dan auto-invoicing.
* **💡 Humoris & Santai Cue:**
  > *"Tujuan utama sistem ini adalah menciptakan Single Source of Truth—artinya cuma ada satu kebenaran mutlak untuk data stok persediaan. Jadi tidak ada lagi alasan bagian gudang bilang stoknya ada 10, tapi bagian sales bilang stoknya 0. Kebenaran hanya milik database dan Tuhan YME."*

---

### 📌 Slide 12: System Limitations (Di Luar Cakupan)
* **Pembicara:** Dave
* **Poin Penting:**
  * Sistem **TIDAK** mencakup: Outbound Logistics fisik (armada/kurir luar), detail parameter suhu mesin masak, modul payroll/HRM, dan laporan akuntansi General Ledger rinci (debit/kredit/pajak).
* **💡 Humoris & Santai Cue:**
  > *"Perlu kami tegaskan juga batasan sistem ini. Kami tidak mengurusi penggajian karyawan (Payroll) apalagi sampai ngitung uang lemburan mereka. Kami juga tidak mencatat detail parameter suhu masak kompor pabriknya. Jadi kalau saosnya gosong karena koki ketiduran, itu di luar tanggung jawab database kami."*

---

### 📌 Slide 13: Users View and Roles
* **Pembicara:** Dave
* **Poin Penting:**
  * Ada 4 peran dengan tampilan berbeda:
    1. **Pelanggan:** Lihat katalog, B2B portal harga grosir, unggah PO, riwayat invoice.
    2. **Staf Gudang:** Scan QR Code barang masuk/keluar, monitor expired date (FEFO).
    3. **Tim Produksi:** Monitor antrean job order, scan-out bahan baku.
    4. **Pimpinan/Manager:** Dashboard sirkulasi stok dan approval digital.
* **💡 Humoris & Santai Cue:**
  > *"Ada 4 aktor utama yang akan berinteraksi dengan sistem ini. Dan tentunya akses mereka dibatasi sesuai job desk masing-masing. Staf gudang gak bisa iseng nge-approve diskon 90% buat pelanggan e-commerce, dan pelanggan e-commerce gak bisa ngintip data rahasia gaji Kepala Pabrik."*

---

### 📌 Slide 14: Aliran Data & CRUD Analysis
* **Pembicara:** Dave
* **Poin Penting:**
  * Aliran Data: Stok menipis -> Generate PO -> Supplier kirim bahan baku -> Input Batch -> Produksi ambil bahan (potong FEFO) -> Hasil produksi lolos QC dapat QR Code produk baru.
  * CRUD Analysis: Pemetaan Create, Retrieve, Update, dan Delete untuk semua fungsi utama.
* **💡 Humoris & Santai Cue:**
  > *"Aliran datanya berputar secara harmonis. Bahan baku masuk dapat tanda pengenal Batch UID, dimasak, jadi produk jadi, discan keluar pas laku terjual. Kita juga buat tabel analisis CRUD untuk menjamin gak ada operasi database ilegal yang gentayangan tanpa kejelasan status."*

---

### 📌 Slide 15: Pemetaan Konseptual (26 Entitas)
* **Pembicara:** Dave
* **Poin Penting:**
  * Membagi 26 entitas bisnis ke dalam 3 domain utama:
    * **E-Commerce & Transaksi:** User, Customer, Corporate, Retail, Address, Purchase Agreement, Category, Product, Promotion, Order, Order Item, Order Promo, Payment, Payment Method, Shipment, Expedition.
    * **Gudang (WMS) & Pengadaan:** Warehouse, Material, Supplier, Material Batch, Product Batch, Procurement, Procurement Item.
    * **Domain Produksi:** Production Order, Production Material Usage, Production Result.
* **💡 Humoris & Santai Cue:**
  > *"Di tahap konseptual awal, kami memetakan 26 entitas bisnis. Kami kelompokkan jadi tiga wilayah kekuasaan: Transaksi E-Commerce, pergudangan WMS, dan dapur Produksi. Ini adalah fondasi sebelum kita pecah lagi menjadi tabel fisik."*

---

### 📌 Slide 16: Konsep Relasi Antar Entitas
* **Pembicara:** Dave
* **Poin Penting:**
  * Penerapan relasi khusus:
    * *Super-type ke Sub-type (1:1):* `MS_Customer` diturunkan menjadi `MS_Corporate` (B2B) atau `MS_Retail` (B2C) untuk efisiensi atribut.
    * *Pemecahan Many-to-Many:* Menggunakan tabel pivot `TR_Order_Promo` untuk menjembatani relasi Order dan Promotion.
    * *Integrasi Lintas Modul (1:M):* Relasi antara `TR_Production_Result` ke `TR_Product_Batch` (Hasil QC otomatis menambah batch baru di gudang).
* **💡 Humoris & Santai Cue:**
  > *"Di sini kami menggunakan relasi Super-type ke Sub-type untuk Customer B2B dan B2C. Kenapa? Karena data pelanggan korporat itu butuh NPWP dan limit kredit B2B, sedangkan pelanggan e-commerce retail paling cuma butuh alamat pengiriman dan nama panggilan. Dengan begini, database jadi lebih efisien dan gak mubazir kolom."*

---

### 📌 Slide 17 & 18: Top-Down Logical Schema (Part 1 & Part 2)
* **Pembicara:** Dave
* **Poin Penting:**
  * Penjelasan struktur logika 44 tabel hasil ekspansi 26 entitas konseptual.
  * Tunjukkan relasi PK-FK yang mengikat integritas database antar modul:
    * Modul Pengguna & Karyawan (MS_Role, MS_User, MS_Employee).
    * Modul Pelanggan & Kontrak (MS_Customer, MS_Corporate, MS_Purchase_Agreement).
    * Modul Gudang WMS (TR_Product_Batch, TR_Product_Stock_Movement).
    * Modul E-Commerce (TR_Cart, TR_Order, TR_Order_Item, TR_Order_Promo).
    * Modul Pengadaan & Produksi (TR_Procurement, TR_Production_Order, TR_Production_Result).
* **💡 Humoris & Santai Cue:**
  > *"Dari 26 entitas awal, setelah kami normalisasi dan lakukan breakdown logikal, mekar-lah database ini menjadi 44 tabel fisik yang saling bergandengan tangan lewat Primary Key dan Foreign Key. Ini memastikan tidak ada data yatim-piatu (orphan data) yang tidak punya relasi di database kita."*
  > *(Transisi ke Rafli)*: *"Untuk menunjukkan bagaimana kami memvalidasi keakuratan 44 tabel logikal ini dari dokumen fisik asli, pawang database kita, Rafli, akan menunjukkannya."*

---

### 📌 Slide 19, 20, 21, & 22: Bottom-Up Validation (Normalisasi Dokumen Fisik)
* **Pembicara:** Rafli (Database Specialist)
* **Poin Penting:**
  * Validasi Bottom-Up dilakukan untuk memastikan Logical Schema sudah benar dengan menguji 3 dokumen fisik asli KS FOOD dari bentuk UNF (Unnormalized) ke 3NF:
    1. **Pesanan Pembelian (PO):** Menghilangkan repeating groups item barang dan memisahkan tabel `MS_Supplier` untuk menghilangkan *Transitive Dependency*.
    2. **Form Pengambilan Bahan:** Memisahkan atribut aktor pengambil/pemeriksa menjadi referensi ke tabel `MS_Employee`.
    3. **Laporan Hasil Produksi:** Memisahkan nama produk yang memiliki ketergantungan parsial ke tabel master `MS_Product`.
* **💡 Humoris & Santai Cue:**
  > *"Terima kasih Dave. Ini dia bagian favorit para dosen penguji: Normalisasi Bottom-Up. Kami mengambil tiga dokumen kertas riil milik KS FOOD—yaitu kertas PO, form ambil bahan, dan laporan hasil masak. Kami siksa dokumen-dokumen ini dari bentuk UNF (Unnormalized Form) yang berantakan, naik tingkat ke 1NF, 2NF, sampai akhirnya suci dan bersih di 3NF tanpa ada Transitif atau Partial Dependency lagi. Hasil normalisasi dokumen fisik ini ternyata 100% klop dengan rancangan skema logika Top-Down kita!"*

---

### 📌 Slide 23: Logical Entity Relationship Diagram
* **Pembicara:** Rafli
* **Poin Penting:**
  * Tampilkan diagram ERD Logikal dengan 44 tabel terhubung.
  * Tekankan bahwa diagram ini menjamin integritas referensial dan siap ditranslasikan ke SQL fisik.
* **💡 Humoris & Santai Cue:**
  > *"Bisa kita lihat di layar, ini adalah Logical ERD kita yang menghubungkan seluruh 44 tabel tersebut. Relasinya terlihat padat merayap seperti jalanan Jakarta pas jam pulang kantor, tapi dijamin jalurnya jelas, terarah, dan anti-macet data."*

---

### 📌 Slide 24: Kamus Data (Data Dictionary) Lengkap
* **Pembicara:** Dave
* **Poin Penting:**
  * Penjelasan bahwa kamus data lengkap berisi nama kolom, tipe data, status NULL/NOT NULL, default value, dan deskripsi fungsi kolom untuk 44 tabel sudah dilampirkan dalam PDF terpisah.
* **💡 Humoris & Santai Cue:**
  > *"Dan untuk mempermudah developer masa depan membaca database ini, kami lampirkan Kamus Data lengkap 44 tabel. Jadi kalau nanti developer baru bingung arti kolom 'isApproved', mereka gak perlu bersemedi di gunung—cukup buka kamus data ini saja. Sekarang kita kembali ke Rafli untuk melihat implementasi SQL fisik dan Prototype aplikasinya."*

---

### 📌 Slide 25: Implementasi DDL & DML
* **Pembicara:** Rafli
* **Poin Penting:**
  * Penulisan syntax DDL (`CREATE TABLE ms_customer...`) dengan mendefinisikan constraints primary & foreign key secara ketat di MariaDB.
  * Contoh query DML (`INSERT`, `SELECT JOIN` multi-tabel untuk pelacakan PO bahan baku).
* **💡 Humoris & Santai Cue:**
  > *"Terima kasih Dave. Kami juga tunjukkan contoh kode SQL riilnya. Di kiri ada DDL untuk membuat tabel customer beserta constraint foreign key-nya, dan di kanan ada DML untuk query pencarian PO bahan baku. Query ini bisa dijalankan dalam hitungan milidetik, jauh lebih cepat daripada staf gudang jalan kaki nyari kertas PO di laci meja kerja."*

---

### 📌 Slide 26: Keamanan & Kontrol Transaksi (DCL & TCL)
* **Pembicara:** Rafli
* **Poin Penting:**
  * **DCL (Data Control Language):** Membuat user khusus `wms_admin` (Admin Gudang) dan membatasi hak aksesnya (hanya `SELECT, INSERT, UPDATE` pada tabel modul gudang).
  * **TCL (Transaction Control Language):** Menggunakan `START TRANSACTION`, `COMMIT`, dan `ROLLBACK` untuk mengamankan operasi pemotongan stok berantai agar tetap atomik.
* **💡 Humoris & Santai Cue:**
  > *"Untuk urusan keamanan database, kami pakai DCL dan TCL. DCL membatasi agar staf gudang tidak bisa mengedit resep rahasia di tabel produksi. Sedangkan TCL dipakai untuk menjamin jika ada transaksi potong stok tapi koneksi internet tiba-tiba mati di tengah jalan, database akan otomatis melakukan ROLLBACK kembali ke keadaan semula. Mirip hidup kita: kalau semuanya berjalan lancar kita COMMIT, kalau penuh penyesalan ya kita ROLLBACK ke masa lalu."*

---

### 📌 LIVE DEMO: PROTOTYPE APLIKASI NEXT.JS (INTEGRASI DATABASE)
* **Pembicara:** Rafli (Membuka browser ke `http://localhost:3000`)
* **Poin Penting (Hal-hal yang ditunjukkan):**
  1. **Landing Page (`/`):** Tunjukkan website utama KS FOOD yang responsif dan rapi.
  2. **Catalog Page (`/products`):** Tunjukkan daftar produk (seperti Sambal Bawang). Jelaskan bahwa data ini ditarik secara dinamis dari tabel database `ms_product` yang kita buat.
  3. **B2B Portal (`/b2b`):** Tunjukkan antarmuka klien korporat untuk PO dan persetujuan harga grosir (terhubung ke tabel `ms_purchase_agreement`).
  4. **Login Flow (`/auth/login`):** Demonstrasikan autentikasi user (terhubung ke tabel `ms_user` dan `ms_employee`).
  5. **B2C Checkout:** Tunjukkan checkout keranjang belanja. Jelaskan bahwa stok fisik akan otomatis terkunci (mengurangi stok batch di database) untuk menghindari **Ghost Stock** (masalah utama yang dibahas di awal).
* **💡 Humoris & Santai Cue:**
  > *"Nah, agar tidak dikira kelompok kami cuma bikin teori dan coret-coret skema ERD saja di atas kertas, sekarang saya akan mendemonstrasikan prototipe sistem ERP KS FOOD yang sudah kami integrasikan langsung dengan database MariaDB/phpMyAdmin tadi. Aplikasi ini kami bangun menggunakan framework Next.js."*
  > *(Sambil buka route `/products`)*: *"Bisa dilihat di halaman produk ini, semua nama saos dan harga ditarik real-time dari tabel `ms_product`."*
  > *(Sambil buka route `/b2b`)*: *"Ini adalah portal khusus B2B. Jadi kalau Mayora mau mesan saos berton-ton, mereka tinggal upload PO di sini, dan datanya langsung masuk ke tabel `ms_purchase_agreement`."*
  > *(Sambil checkout barang)*: *"Dan yang paling penting: begitu saya klik 'Checkout', database langsung melakukan reservasi stok di tabel `tr_product_batch`. Stok fisik langsung terpotong, dan sistem lain akan langsung tahu. Jadi masalah Ghost Stock atau stok gaib yang tadi Russell keluhkan di awal presentasi langsung sirna seketika!"*

---

### 📌 Slide 27: Physical Entity Relationship Diagram
* **Pembicara:** Rafli
* **Poin Penting:**
  * Tunjukkan Physical ERD yang di-generate dari DBMS phpMyAdmin/MariaDB.
  * Jelaskan bahwa rancangan fisik ini sukses meng-generate 44 tabel yang siap beroperasi secara real-time.
* **💡 Humoris & Santai Cue:**
  > *"Ini adalah penampakan Physical ERD 44 tabel hasil generate dari MariaDB. Database ini sudah siap di-deploy dan siap menampung data operasional KS FOOD secara andal. Nah, sekarang mari kita lihat bagaimana database fisik ini bekerja langsung di aplikasi nyata."*

---

### 📌 Slide 28: Demo Prototype Aplikasi ERP KS FOOD
* **Pembicara:** Rafli
* **Poin Penting:**
  * Tunjukkan QR Code di layar agar teman-teman sekelas dan dosen bisa scan.
  * Sebutkan bahwa aplikasi dideploy di Vercel:
    * E-Commerce UI (B2C): `https://ks-food.vercel.app/`
    * ERP UI (B2B & WMS Admin): `https://ks-food.vercel.app/internal/login`
  * Jelaskan bahwa integrasi data (seperti daftar produk, user, dan pemotongan stok FEFO) berjalan real-time menghubungkan kedua UI ini.
* **💡 Humoris & Santai Cue:**
  > *"Di slide ini, kami menyediakan QR Code yang bisa teman-teman scan langsung pakai HP masing-masing. Ada E-Commerce UI untuk pelanggan ritel di sebelah kiri, dan ERP UI untuk tim internal gudang serta pelanggan korporat di sebelah kanan. Semua sudah online di Vercel. Silakan dicoba klik-klik, keranjang belanjanya sudah sinkron otomatis dengan stok di database gudang kita. Jadi no-tipu-tipu stok gaib lagi!"*

---

### 📌 Slide 29: Sesi Tanya Jawab & Penutup
* **Pembicara:** Rafli (Memimpin Penutup)
* **Poin Penting:**
  * Sampaikan terima kasih kepada dosen dan audiens.
  * Buka sesi tanya jawab (Q&A).
* **💡 Humoris & Santai Cue:**
  > *"Sekian presentasi dari Kelompok 3 tentang perancangan ERP KS FOOD. Sekarang kami buka sesi tanya jawab atau Q&A. Jika ada yang ingin ditanyakan atau ditanggapi, kami persilakan. Tapi tolong pertanyaannya jangan sesulit proses normalisasi 3NF tadi ya, terima kasih banyak!"*
