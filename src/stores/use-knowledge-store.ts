import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type DocumentCategory = 'SOP' | 'LESSON_LEARNED' | 'GENERAL' | 'CONFIDENTIAL' | 'POLICY' | 'TECHNICAL'

export interface LessonLearnedStructure {
  problem: string
  rootCause: string
  solution: string
  prevention: string
}

export interface KnowledgeDocument {
  id: string
  title: string
  category: DocumentCategory
  content: string
  author: string
  date: string
  allowedRoles: string[]
  images?: string[]
  tags?: string[]
  structuredContent?: LessonLearnedStructure
}

interface KnowledgeStore {
  documents: KnowledgeDocument[]
  addDocument: (doc: Omit<KnowledgeDocument, 'id' | 'date'>) => void
  updateDocument: (id: string, doc: Partial<KnowledgeDocument>) => void
  deleteDocument: (id: string) => void
}

const INITIAL_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: 'DOC-001',
    title: 'SOP Penerimaan Bahan Baku',
    category: 'SOP',
    content:
      'Prosedur standar penerimaan bahan baku dari supplier:\n\n1. Cek surat jalan dan PO\n2. Inspeksi visual kualitas bahan\n3. Timbang dan cocokkan dengan dokumen\n4. Cek suhu (untuk bahan yang memerlukan cold chain)\n5. Catat di sistem dan simpan di gudang sesuai kategori\n\nPenanggung Jawab: Staff Gudang\nEskalasi: Jika ada ketidaksesuaian, hubungi Supervisor Procurement.',
    author: 'Budi Santoso (Warehouse Manager)',
    date: '2024-11-15',
    allowedRoles: ['ALL']
  },
  {
    id: 'DOC-002',
    title: 'Penanganan Saos Terlalu Asin',
    category: 'LESSON_LEARNED',
    content:
      'Root Cause: Sensor timbangan garam error akibat belum dikalibrasi selama 2 minggu.\n\nDampak: Batch #1025 Saos Sambal Bawang ditolak QC karena kadar garam melebihi standar (3.5% vs standar 2.8%).\n\nSolusi Implementasi:\n- Kalibrasi wajib timbangan setiap pagi sebelum shift dimulai\n- Checklist digital di tablet operator\n- Alarm otomatis jika timbangan tidak dikalibrasi >24 jam\n\nHasil: Tidak ada lagi kasus over-salting sejak Desember 2024.',
    author: 'Ratna Sari (QC Lead)',
    date: '2024-12-28',
    allowedRoles: ['QC', 'PIMPINAN']
  },
  {
    id: 'DOC-003',
    title: 'Prosedur Kebersihan Mesin Mixing',
    category: 'SOP',
    content:
      'Standar kebersihan mesin mixer untuk mencegah kontaminasi:\n\nSebelum Produksi:\n1. Bilas dengan air panas (80°C) selama 5 menit\n2. Gunakan detergen food-grade, scrub semua bagian\n3. Bilas hingga bersih, keringkan dengan lap steril\n4. Semprot sanitizer food-safe\n\nSetelah Produksi:\n1. Bersihkan sisa produk segera (jangan tunggu kering)\n2. Cuci dengan prosedur yang sama\n3. Tutupi dengan plastik bersih\n\nVerifikasi: Supervisor wajib sign-off checklist kebersihan.',
    author: 'Dewi Lestari (Production Supervisor)',
    date: '2024-10-20',
    allowedRoles: ['ALL']
  },
  {
    id: 'DOC-004',
    title: 'Standar Suhu Penyimpanan Gudang',
    category: 'SOP',
    content:
      'Panduan suhu penyimpanan bahan baku:\n\nBahan Kering (Gula, Garam, Bumbu):\n- Suhu: 20-25°C\n- Kelembaban: <60%\n- Pallet harus 15cm dari lantai\n\nBahan Segar (Cabai, Bawang):\n- Suhu: 10-15°C (Cold Storage)\n- Rotasi: FIFO strict\n- Max penyimpanan: 7 hari\n\nBahan Kemasan (Botol, Tutup):\n- Suhu: Room temperature\n- Hindari sinar matahari langsung\n\nMonitoring: Dicek 2x sehari (pagi & sore), log suhu dicatat di sistem.',
    author: 'Ahmad Yani (Warehouse Staff)',
    date: '2024-09-10',
    allowedRoles: ['ALL']
  },
  {
    id: 'DOC-005',
    title: 'Solusi Kemasan Bocor (Sealing)',
    category: 'LESSON_LEARNED',
    content:
      'Root Cause: Suhu heater mesin sealer tidak stabil (berkisar 160-180°C, seharusnya konstan 170°C).\n\nDampak: 3% produk Saos Tomat 500ml mengalami bocor saat distribusi, komplain customer meningkat.\n\nInvestigasi:\n- Elemen pemanas heater sudah aus (umur 3 tahun)\n- Thermostat tidak akurat\n\nSolusi:\n- Ganti heater element dengan yang baru\n- Install digital temperature controller dengan alarm\n- Operator cek suhu setiap 30 menit, catat di logbook\n\nHasil: Defect rate turun dari 3% menjadi 0.5% dalam 1 bulan.',
    author: 'Budi Santoso (Maintenance Lead)',
    date: '2024-12-20',
    allowedRoles: ['QC', 'PIMPINAN']
  },
  {
    id: 'DOC-006',
    title: 'Strategi Ekspansi Pasar 2025 (CONFIDENTIAL)',
    category: 'CONFIDENTIAL',
    content:
      'DOKUMEN RAHASIA - HANYA UNTUK MANAJEMEN\n\nTarget Ekspansi:\n1. Buka 5 distributor baru di Jawa Timur\n2. Launch produk premium "Signature Series" Q2 2025\n3. Target revenue: Rp 500M (growth 40%)\n\nInvestasi:\n- Marketing budget: Rp 50M\n- R&D produk baru: Rp 30M\n- Infrastruktur: Rp 100M\n\nRisiko & Mitigasi:\n- Kompetitor pricing war → Fokus pada kualitas premium\n- Supply chain disruption → Diversifikasi supplier\n\nROI Proyeksi: 35% dalam 2 tahun.',
    author: 'Direktur Utama',
    date: '2025-01-01',
    allowedRoles: ['PIMPINAN']
  },
  {
    id: 'DOC-007',
    title: 'Kebijakan PPN 11% & Faktur Pajak',
    category: 'GENERAL',
    content:
      'KEBIJAKAN PERPAJAKAN\\n\\nSesuai UU HPP, tarif PPN adalah 11%. Faktur pajak wajib diterbitkan untuk transaksi B2B di atas Rp 5 Juta.\\n\\nKode Faktur:\\n- 010: Penyerahan umum (B2B)\\n- 020: Penyerahan ke bendahara pemerintah\\n\\nProses:\\n1. System auto-calculate PPN 11% di invoice\\n2. Faktur pajak diterbitkan bersamaan dengan invoice\\n3. Upload ke sistem e-Faktur DJP Online\\n4. Kirim soft copy ke customer max H+7\\n\\nSanksi: Telat upload faktur = denda 1% dari DPP.',
    author: 'Kepala Accounting',
    date: '2025-01-01',
    allowedRoles: ['FINANCE', 'PIMPINAN']
  },
  {
    id: 'DOC-008',
    title: 'SOP Penagihan Piutang (Account Receivable)',
    category: 'SOP',
    content:
      'PROSEDUR PENAGIHAN PIUTANG:\\n\\n1. Kirim Invoice H+1 setelah pengiriman barang (auto dari sistem)\\n2. Reminder H-3 sebelum jatuh tempo (email otomatis)\\n3. Follow-up telepon H+1 jatuh tempo\\n4. Jika telat >7 hari:\\n   - Eskalasi ke Sales Manager\\n   - Stop pengiriman barang (Hold Outbound)\\n   - Kirim surat peringatan resmi\\n\\n5. Jika telat >30 hari:\\n   - Hitung denda keterlambatan 2%/bulan\\n   - Pertimbangkan penagihan legal\\n\\nEskalasi: Finance Manager → Direktur Keuangan',
    author: 'Manager Finance',
    date: '2025-01-01',
    allowedRoles: ['FINANCE', 'PIMPINAN']
  },
  {
    id: 'DOC-009',
    title: 'Panduan Reimbursement Karyawan',
    category: 'SOP',
    content:
      'PROSEDUR KLAIM REIMBURSE:\\n\\nSyarat:\\n- Wajib melampirkan struk/kwitansi ASLI\\n- Max klaim: Rp 500.000/bulan\\n- Kategori: Transport, Konsumsi Client, Office Supplies\\n\\nProses:\\n1. Isi form reimburse (manual/sistem)\\n2. Lampirkan bukti fisik\\n3. Approval atasan langsung\\n4. Submit ke Finance MAX tanggal 25 setiap bulan\\n5. Pencairan gaji periode berikutnya\\n\\nCatatan:\\n- Struk hilang = tidak bisa diklaim\\n- Reimburse >Rp 500rb perlu approval Finance Manager',
    author: 'HR & Finance Team',
    date: '2025-01-01',
    allowedRoles: ['FINANCE', 'HR', 'PIMPINAN']
  },
  {
    id: 'DOC-010',
    title: 'SOP Seleksi Supplier Baru',
    category: 'SOP',
    content:
      'PROSEDUR SELEKSI SUPPLIER:\n\n1. Supplier wajib kirim sampel produk\n   - Minimal 3 sampel untuk testing\n   - Sertifikat BPOM/Halal (jika ada)\n\n2. Cek Legalitas Perusahaan\n   - SIUP/NIB (wajib)\n   - NPWP\n   - Surat Domisili Usaha\n\n3. Tes Lab QC (WAJIB LULUS)\n   - Sample dikirim ke Lab QC\n   - Uji mikrobiologi, kimia, fisik\n   - Kriteria: Min score 80/100\n\n4. Negosiasi Harga & TOP\n   - Benchmark dengan supplier existing\n   - TOP standar: 30 hari setelah invoice\n   - Min order: sesuai kapasitas produksi\n\n5. Trial Order\n   - Order kecil (1-2x kebutuhan produksi)\n   - Evaluasi ketepatan waktu pengiriman\n\n6. Approval Akhir\n   - Manager Procurement → Pimpinan\n   - Kontrak resmi ditandatangani',
    author: 'Manager Procurement',
    date: '2025-01-01',
    allowedRoles: ['PROCUREMENT', 'PIMPINAN', 'QC']
  },
  {
    id: 'DOC-011',
    title: 'Daftar Blacklist Vendor 2024',
    category: 'CONFIDENTIAL',
    content:
      '⚠️ DOKUMEN RAHASIA - PROCUREMENT ONLY\n\nDaftar Supplier yang DILARANG untuk order:\n\n1. CV Maju Mundur\n   - Alasan: Kualitas produk sangat buruk (reject rate 45%)\n   - Periode: Permanent ban sejak Juli 2024\n   - Detail: 3x kirim cabai busuk, bawang tidak fresh\n\n2. PT Plastik Tipis Indonesia\n   - Alasan: Sering telat pengiriman (avg delay 7 hari)\n   - Periode: Ban hingga Maret 2025\n   - Detail: 5 PO terakhir semua telat, pemberian alasan tidak jelas\n\n3. UD Bumbu Tidak Asli\n   - Alasan: Kecurigaan produk palsu/substitusi\n   - Periode: Under investigation\n   - Detail: Lab QC temukan campuran bahan tidak sesuai spec\n\nCATATAN:\n- WAJIB cek list ini sebelum terbitkan PO baru\n- Jika ada supplier mencurigakan, segera lapor Manager\n- Update list setiap Quarter',
    author: 'Manager Procurement',
    date: '2024-12-01',
    allowedRoles: ['PROCUREMENT', 'PIMPINAN']
  },
  {
    id: 'DOC-012',
    title: 'Kebijakan Purchase Order (PO)',
    category: 'POLICY',
    content:
      'KEBIJAKAN LIMIT PURCHASE ORDER:\n\nStruktur Approval:\n\n1. PO ≤ Rp 10 Juta\n   - Approval: Staff Procurement (Langsung terbit)\n   - Tidak perlu eskalasi\n\n2. PO Rp 10 Juta - Rp 50 Juta\n   - Approval: Manager Procurement (Wajib)\n   - Eskalasi: Email/WhatsApp, maks 24 jam\n\n3. PO > Rp 50 Juta\n   - Approval: Pimpinan (Direktur)\n   - Eskalasi: Formal meeting + justifikasi tertulis\n   - Lead time: 3-5 hari kerja\n\nKetentuan Umum:\n- PO wajib mengacu pada harga yang sudah di-approve\n- Untuk urgent procurement, bisa approval lisan (konfirmasi tertulis menyusul)\n- PO tanpa approval yang sesuai = ditolak Finance\n\nSanksi Pelanggaran:\n- Teguran tertulis (warning letter)\n- Procurement staff tidak boleh approve PO sendiri di atas limit',
    author: 'Direktur & Manager Procurement',
    date: '2025-01-01',
    allowedRoles: ['PROCUREMENT', 'FINANCE', 'PIMPINAN']
  },
  {
    id: 'DOC-013',
    title: 'SOP Penerimaan Barang (Inbound)',
    category: 'SOP',
    content:
      'PROSEDUR PENERIMAAN BARANG:\\n\\n1. Cek Surat Jalan dari Driver\\n   - Cocokkan nomor SJ dengan PO\\n   - Verifikasi nama supplier\\n\\n2. Cek Fisik Barang\\n   - Tidak penyok/bocor\\n   - Kemasan tidak rusak\\n   - Jumlah sesuai SJ\\n\\n3. Scan QR Code Batch\\n   - Input ke sistem WMS\\n   - Catat tanggal expired\\n\\n4. Penyimpanan\\n   - Simpan di Rak sesuai zonasi\\n   - Terapkan FIFO/FEFO\\n   - Pisahkan barang rusak di Red Zone',
    author: 'Supervisor Warehouse',
    date: '2025-01-01',
    allowedRoles: ['WAREHOUSE', 'PIMPINAN', 'QC']
  },
  {
    id: 'DOC-014',
    title: 'Aturan FIFO & FEFO',
    category: 'SOP',
    content:
      'SISTEM ROTASI STOK:\\n\\nFIFO (First In First Out):\\n- Barang yang PERTAMA masuk gudang WAJIB keluar duluan\\n- Cek tanggal terima di label kardus\\n\\nFEFO (First Expired First Out):\\n- Prioritaskan barang dengan Expired Date TERDEKAT\\n- Lebih penting dari FIFO untuk produk makanan\\n\\nProsedur:\\n1. Tata barang lama di depan, baru di belakang\\n2. Label tanggal terima WAJIB terlihat\\n3. Jangan menumpuk barang baru di depan barang lama\\n4. Cek expired setiap picking\\n\\nSanksi: Barang expired = kerugian perusahaan + teguran tertulis',
    author: 'Kepala Gudang',
    date: '2025-01-01',
    allowedRoles: ['WAREHOUSE', 'PIMPINAN']
  },
  {
    id: 'DOC-015',
    title: 'Prosedur K3 & Forklift Safety',
    category: 'GENERAL',
    content:
      'KESELAMATAN KERJA GUDANG (K3):\\n\\nAlat Pelindung Diri (APD):\\n- Helm safety WAJIB di area rak tinggi\\n- Sepatu safety (steel toe)\\n- Sarung tangan saat handling kardus\\n\\nAturan Forklift:\\n- Kecepatan maksimal 5 km/jam\\n- Klakson di setiap tikungan\\n- Jangan angkat beban >kapasitas tonase\\n- Maksimal tumpukan pallet: 3 tingkat\\n\\nLarangan:\\n- Naik/turun forklift saat bergerak\\n- Mengangkat orang dengan fork\\n- Parkir forklift di gang utama\\n\\nKecelakaan Kerja: LANGSUNG hubungi Supervisor + HSE Officer',
    author: 'HSE Department',
    date: '2025-01-01',
    allowedRoles: ['WAREHOUSE', 'HR', 'PIMPINAN']
  },
  {
    id: 'DOC-016',
    title: 'Peraturan Perusahaan & Jam Kerja',
    category: 'GENERAL',
    content:
      'PERATURAN KEPEGAWAIAN:\\n\\nJam Kerja:\\n- Senin - Jumat: 08.00 - 17.00 (Istirahat 12.00-13.00)\\n- Sabtu: 08.00 - 14.00\\n\\nKehadiran:\\n- Keterlambatan >15 menit = potong tunjangan kehadiran Rp 50.000\\n- Absen tanpa keterangan = potong 1 hari gaji\\n- Minimal kehadiran 95% untuk bonus tahunan\\n\\nCuti:\\n- Jatah cuti tahunan: 12 hari\\n- Cuti sakit: max 3 hari tanpa surat dokter\\n- Pengajuan cuti min H-7 (kecuali darurat)\\n\\nLembur:\\n- Overtime rate: 1.5x gaji per jam\\n- Max lembur 14 jam/minggu\\n- Wajib approval supervisor',
    author: 'HR Department',
    date: '2025-01-01',
    allowedRoles: ['ALL']
  },
  {
    id: 'DOC-017',
    title: 'Struktur Skala Upah 2025 (CONFIDENTIAL)',
    category: 'CONFIDENTIAL',
    content:
      'STRUKTUR GAJI - DOKUMEN RAHASIA\\n\\nKategori Staff:\\n- Junior Staff: Rp 5.000.000 - 6.000.000\\n- Senior Staff: Rp 6.500.000 - 7.500.000\\n\\nKategori Supervisor:\\n- Supervisor: Rp 8.000.000 - 10.000.000\\n- Senior Supervisor: Rp 10.500.000 - 12.000.000\\n\\nKategori Manager:\\n- Manager: Rp 15.000.000 - 18.000.000\\n- Senior Manager: Rp 20.000.000++\\n\\nTunjangan:\\n- Transport: Rp 500.000/bulan\\n- Makan: Rp 750.000/bulan\\n- Kesehatan: Full BPJS + Asuransi swasta\\n\\nBonus:\\n- THR: 1 bulan gaji\\n- Bonus Tahunan: 1-3 bulan (tergantung kinerja)',
    author: 'Direktur HR',
    date: '2025-01-01',
    allowedRoles: ['HR', 'PIMPINAN']
  },
  {
    id: 'DOC-018',
    title: 'Prosedur Backup Database',
    category: 'TECHNICAL',
    content:
      'AUTO-BACKUP POLICY:\\n\\nSchedule:\\n- Full Backup: Setiap Hari Minggu pukul 02:00 WIB\\n- Increment Backup: Setiap hari pukul 00:00 WIB\\n- Transaction Log: Setiap 1 jam\\n\\nRetention Policy:\\n- Harian: Simpan 7 hari\\n- Mingguan: Simpan 4 minggu\\n- Bulanan: Simpan 12 bulan\\n\\nRestore Test:\\n- Dilakukan setiap tanggal 15 oleh DevOps\\n- Report hasil restore wajib dikirim ke CTO\\n\\nStorage:\\n- Primary: AWS S3 (Jakarta Region)\\n- DR Site: Google Cloud Storage (Singapore Region)',
    author: 'IT Infrastructure Team',
    date: '2025-01-01',
    allowedRoles: ['ADMIN', 'PIMPINAN']
  },
  {
    id: 'DOC-019',
    title: 'Troubleshooting Server Down',
    category: 'TECHNICAL',
    content:
      'EMERGENCY RESPONSE PROTOCOL:\\n\\nAlert Level 1 (High CPU/RAM):\\n- Cek monitoring dashboard (Grafana)\\n- Identifikasi process yang spike\\n- Restart service jika perlu (pm2 restart all)\\n\\nAlert Level 2 (Service Down/502 Bad Gateway):\\n- Cek Nginx status: systemctl status nginx\\n- Cek App logs: pm2 logs --lines 100\\n- Cek Database connection\\n\\nAlert Level 3 (System Total Failure):\\n- Hubungi CTO segera! (WhatsApp Call)\\n- switch ke maintenance page\\n- Restore database from last working backup point\\n- Post mortem analysis setelah sistem up',
    author: 'IT Infrastructure Team',
    date: '2025-01-01',
    allowedRoles: ['ADMIN', 'PIMPINAN']
  },
  {
    id: 'DOC-020',
    title: 'Lesson Learned: Warna Sambal Tidak Konsisten',
    category: 'LESSON_LEARNED',
    content:
      'Kategori: Quality (Kualitas)\nProduk: Sambal Bawang Original\n\n❌ PROBLEM:\nWarna sambal tidak konsisten, kadang terlalu pucat dibanding standar yang seharusnya merah cerah.\n\n💡 SOLUTION:\nPastikan cabai merah yang digunakan memiliki tingkat kematangan yang sama (merah tua). Tambahkan standarisasi visual cabai sebelum proses blending. Implementasi color matching card untuk QC visual.\n\n✓ IMPACT:\nKualitas warna produk menjadi lebih konsisten. Customer complaint terkait warna berkurang hingga 80%. Standardisasi cabai merah membantu tim produksi maintain consistency.\n\nTags: warna, cabai, kualitas, visual-qc',
    author: 'Supervisor A (Tim Produksi)',
    date: '2024-01-15',
    allowedRoles: ['PRODUCTION', 'QC', 'PIMPINAN']
  },
  {
    id: 'DOC-021',
    title: 'Lesson Learned: Waktu Produksi Saus Tomat Terlalu Lama',
    category: 'LESSON_LEARNED',
    content:
      'Kategori: Process (Proses)\nProduk: Saus Tomat Premium\n\n❌ PROBLEM:\nProses pemasakan terlalu lama (60+ menit) menyebabkan overcook dan kehilangan vitamin serta warna segar dari tomat.\n\n💡 SOLUTION:\nOptimalkan suhu pemasakan dari 95°C menjadi 85°C dan tambahkan sedikit tekanan (0.5 bar) untuk mempercepat reducing. Update SOP dengan parameter baru.\n\n✓ IMPACT:\nWaktu produksi turun dari 60 menit menjadi 45 menit (efisiensi 25%). Kualitas nutrisi dan warna tetap terjaga bahkan lebih baik. Throughput harian naik 20%.\n\nTags: efisiensi, suhu, nutrisi, throughput',
    author: 'Supervisor B (Tim Produksi)',
    date: '2024-01-10',
    allowedRoles: ['PRODUCTION', 'QC', 'PIMPINAN']
  },
  {
    id: 'DOC-022',
    title: 'Lesson Learned: Blender Industri Sering Overheat',
    category: 'LESSON_LEARNED',
    content:
      'Kategori: Equipment (Peralatan)\nProduk: Mayonaise Creamy\n\n❌ PROBLEM:\nBlender industri sering overheat saat processing batch besar, menyebabkan downtime dan delay produksi.\n\n💡 SOLUTION:\n1. Batasi kapasitas blending maksimal 70% dari kapasitas total (dari 100kg jadi 70kg per batch)\n2. Tambahkan waktu cooling 5 menit setiap 3 batch\n3. Install temperature sensor dengan auto-shutoff di 75°C\n4. Schedule maintenance preventif setiap minggu\n\n✓ IMPACT:\nEquipment lebih awet, lifecycle increased 40%. Zero downtime akibat overheat sejak implementasi. Produktivitas stabil tanpa interupsi.\n\nTags: blender, maintenance, kapasitas, preventive-maintenance',
    author: 'Teknisi C (Maintenance Team)',
    date: '2024-01-05',
    allowedRoles: ['PRODUCTION', 'PIMPINAN']
  }
]

export const useKnowledgeStore = create<KnowledgeStore>()(
  persist(
    (set) => ({
      documents: INITIAL_DOCUMENTS,

      addDocument: (doc) =>
        set((state) => ({
          documents: [
            ...state.documents,
            {
              ...doc,
              id: `DOC-${Date.now()}`,
              date: new Date().toISOString().split('T')[0]
            }
          ]
        })),

      updateDocument: (id, updates) =>
        set((state) => ({
          documents: state.documents.map((doc) => (doc.id === id ? { ...doc, ...updates } : doc))
        })),

      deleteDocument: (id) =>
        set((state) => ({
          documents: state.documents.filter((doc) => doc.id !== id)
        }))
    }),
    {
      name: 'knowledge-storage'
    }
  )
)
