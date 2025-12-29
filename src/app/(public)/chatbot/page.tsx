'use client'

import { PaperPlaneRight, Robot, User, ArrowLeft } from '@phosphor-icons/react'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

import { Container } from '@/components/templates/container'

type Message = {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Halo! Selamat datang di KS Food Assistant. Ada yang bisa saya bantu hari ini? 😊',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputText.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMsg])
    setInputText('')
    setIsTyping(true)

    // Simulate Bot Response
    setTimeout(() => {
      let botResponse = 'Maaf, saya belum mengerti pertanyaan itu. Bisa hubungi admin kami via WhatsApp ya!'

      const lowerText = userMsg.text.toLowerCase()
      if (lowerText.includes('halo') || lowerText.includes('hi')) {
        botResponse = 'Halo juga! Mau cari produk apa nih?'
      } else if (lowerText.includes('harga') || lowerText.includes('price')) {
        botResponse = 'Untuk harga bisa dilihat langsung di halaman Produk kami ya kak. Ada banyak promo menarik!'
      } else if (lowerText.includes('alamat') || lowerText.includes('lokasi')) {
        botResponse = 'Kami berlokasi di Jakarta Selatan. Pengiriman ke seluruh Indonesia lho!'
      } else if (lowerText.includes('bayar') || lowerText.includes('payment')) {
        botResponse = 'Kami menerima transfer bank, e-wallet, dan juga COD (Bayar di Tempat).'
      } else if (lowerText.includes('terima kasih') || lowerText.includes('makasih')) {
        botResponse = 'Sama-sama! Senang bisa membantu. 😄'
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex h-[75vh] flex-col bg-slate-50">
      {/* Header */}
      <div className="border-b bg-white px-4 py-3 shadow">
        <Container className="flex items-center gap-4">
          <Link href="/" className="-ml-2 rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Robot size={24} weight="fill" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900">KS Food Assistant</h1>
            <p className="flex items-center gap-1 text-xs text-green-600">
              <span className="block h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
              Online
            </p>
          </div>
        </Container>
      </div>

      {/* Chat Area */}
      <div className="relative flex-1 overflow-hidden">
        <Container className="h-full">
          <div ref={scrollRef} className="custom-scrollbar h-full space-y-6 overflow-y-auto scroll-smooth px-4 py-10">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`flex max-w-[80%] gap-3 md:max-w-[60%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      msg.sender === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {msg.sender === 'user' ? <User size={16} weight="fill" /> : <Robot size={16} weight="fill" />}
                  </div>

                  <div
                    className={`rounded-2xl px-4 py-3 shadow-sm ${
                      msg.sender === 'user'
                        ? 'rounded-tr-none bg-primary text-white'
                        : 'rounded-tl-none border border-slate-100 bg-white text-slate-800'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`mt-1 text-[10px] opacity-70 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%] gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Robot size={16} weight="fill" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-none border border-slate-100 bg-white px-4 py-4 shadow-sm">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0.2s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200 bg-white/70 px-4 py-4 pt-2 backdrop-blur-sm">
        <Container>
          {/* Quick Questions */}
          <div className="custom-scrollbar my-3 flex gap-2 overflow-x-auto pb-1">
            {[
              'Produk Best Seller? 🏆',
              'Gimana Cara Pesan? 🛒',
              'Info Pengiriman 🚚',
              'Lokasi Toko 📍',
              'Metode Pembayaran 💳'
            ].map((q) => (
              <button
                key={q}
                onClick={() => {
                  const userMsg: Message = {
                    id: Date.now().toString(),
                    text: q,
                    sender: 'user',
                    timestamp: new Date()
                  }
                  setMessages((prev) => [...prev, userMsg])
                  setIsTyping(true)

                  // Trigger existing logic
                  setTimeout(() => {
                    let botResponse = 'Maaf, saya belum mengerti pertanyaan itu. Bisa hubungi admin kami via WhatsApp ya!'
                    const lowerText = q.toLowerCase()

                    if (lowerText.includes('best seller')) {
                      botResponse = 'Produk Best Seller kami adalah Sambal Bawang dan Saus Tomat Premium! Wajib coba kak. 🔥'
                    } else if (lowerText.includes('cara pesan')) {
                      botResponse =
                        'Gampang banget! Pilih produk -> Masukkan Keranjang -> Checkout. Jangan lupa login dulu ya.'
                    } else if (lowerText.includes('pengiriman')) {
                      botResponse = 'Kami mengirim ke seluruh Indonesia dengan packing aman. Estimasi 2-4 hari kerja.'
                    } else if (lowerText.includes('lokasi')) {
                      botResponse = 'Store kami ada di Bandung, Jawa Barat. Tapi online store buka 24 jam!'
                    } else if (lowerText.includes('pembayaran')) {
                      botResponse = 'Bisa via Transfer Bank, E-Wallet (GoPay/OVO/Dana), atau Bayar di Tempat (COD).'
                    }

                    const botMsg: Message = {
                      id: (Date.now() + 1).toString(),
                      text: botResponse,
                      sender: 'bot',
                      timestamp: new Date()
                    }
                    setMessages((prev) => [...prev, botMsg])
                    setIsTyping(false)
                  }, 1000)
                }}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-slate-600 transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
              >
                {q}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className="relative flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tulis pesan Anda..."
              className="w-full rounded-full border border-slate-300 bg-slate-50 px-5 py-3 pr-12 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="absolute top-1.5 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <PaperPlaneRight size={18} weight="fill" />
            </button>
          </form>
          <p className="mt-2 text-center text-[10px] text-slate-400">AI Assistant bisa salah. Cek informasi penting.</p>
        </Container>
      </div>
    </div>
  )
}
