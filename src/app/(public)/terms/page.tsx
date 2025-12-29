import { Container } from '@/components/templates/container'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <Container className="max-w-4xl rounded-xl bg-white p-10 shadow-sm">
        <h1 className="mb-8 text-3xl font-bold text-primary">Syarat & Ketentuan</h1>

        <div className="prose prose-slate max-w-none">
          <h3>1. Pendahuluan</h3>
          <p>
            Selamat datang di KS Food. Dengan mengakses situs web ini, Anda setuju untuk terikat oleh syarat dan ketentuan
            berikut. Harap baca dengan saksama sebelum melakukan transaksi.
          </p>

          <h3>2. Pemesanan Produk</h3>
          <p>
            Semua pesanan tergantung pada ketersediaan produk. Kami berhak untuk menolak atau membatalkan pesanan kapan saja
            dengan alasan tertentu, termasuk namun tidak terbatas pada kesalahan harga atau stok kosong.
          </p>

          <h3>3. Pembayaran</h3>
          <p>
            Kami menerima pembayaran melalui Transfer Bank, E-Wallet, dan COD. Pembayaran harus diselesaikan sesuai dengan
            instruksi yang diberikan saat checkout. Untuk metode transfer manual, konfirmasi pembayaran wajib dilakukan.
          </p>

          <h3>4. Pengiriman</h3>
          <p>
            Biaya pengiriman dihitung berdasarkan berat dan lokasi tujuan. Kami tidak bertanggung jawab atas keterlambatan
            yang disebabkan oleh pihak ekspedisi.
          </p>

          <h3>5. Kebijakan Pengembalian</h3>
          <p>
            Barang yang sudah dibeli tidak dapat dikembalikan kecuali terdapat cacat produksi atau kesalahan pengiriman dari
            pihak kami. Komplain maksimal 1x24 jam setelah barang diterima dengan bukti unboxing.
          </p>

          <h3>6. Hak Cipta</h3>
          <p>
            Seluruh konten dalam website ini, termasuk logo, gambar, dan teks adalah hak milik KS Food dan dilindungi oleh
            undang-undang hak cipta.
          </p>

          <p className="mt-8 text-sm text-slate-500">
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </Container>
    </div>
  )
}
