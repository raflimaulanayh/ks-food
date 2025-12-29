import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/atoms/ui/accordion'
import { Container } from '@/components/templates/container'

const faqs = [
  {
    question: 'Bagaimana cara melakukan pemesanan?',
    answer:
      'Anda dapat memilih produk yang diinginkan, menambahkannya ke keranjang, dan melakukan checkout. Kami menerima berbagai metode pembayaran termasuk Bank Transfer, E-Wallet, dan COD.'
  },
  {
    question: 'Apakah tersedia layanan COD (Bayar di Tempat)?',
    answer:
      "Ya! Kami menyediakan layanan COD untuk wilayah tertentu. Pastikan Anda memilih opsi 'Bayar di Tempat' saat checkout."
  },
  {
    question: 'Berapa lama pengiriman akan sampai?',
    answer:
      'Estimasi pengiriman reguler adalah 2-4 hari kerja tergantung lokasi Anda. Kami bekerja sama dengan mitra logistik terpercaya untuk memastikan pesanan Anda sampai dengan aman.'
  },
  {
    question: 'Apakah produk KS Food Halal?',
    answer:
      'Tentu saja! Semua produk KS Food telah bersertifikasi HALAL MUI dan diproduksi dengan standar kebersihan tinggi.'
  },
  {
    question: 'Bagaimana jika pesanan saya rusak atau salah?',
    answer:
      'Jangan khawatir. Hubungi layanan pelanggan kami melalui WhatsApp dengan menyertakan foto/video unboxing, dan kami akan segera membantu proses penggantian atau refund.'
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <Container className="max-w-3xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-primary">Pertanyaan Umum (FAQ)</h1>
        <div className="rounded-xl bg-white p-8 shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-slate-900">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-slate-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </div>
  )
}
