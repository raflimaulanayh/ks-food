'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { DocumentCategory, useKnowledgeStore } from '@/stores/use-knowledge-store'
import { ChatCircleDots, Lightning, Lock, PaperPlaneTilt, Pencil, Plus, Trash } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/atoms/ui/dialog'

import { cn } from '@/utils/cn'

type TabFilter = 'ALL' | DocumentCategory

interface ChatMessage {
  id: string
  role: 'user' | 'bot'
  text: string
}

export default function KnowledgePage() {
  const { documents, addDocument, updateDocument, deleteDocument } = useKnowledgeStore()

  const [activeTab, setActiveTab] = useState<TabFilter>('ALL')
  const [showFormDialog, setShowFormDialog] = useState(false)
  const [editingDocId, setEditingDocId] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deletingDocId, setDeletingDocId] = useState<string | null>(null)

  // Form state
  const [formTitle, setFormTitle] = useState('')
  const [formCategory, setFormCategory] = useState<DocumentCategory>('SOP')
  const [formContent, setFormContent] = useState('')
  const [formAuthor, setFormAuthor] = useState('')

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'bot',
      text: 'Halo! Saya KS-Bot, asisten virtual Knowledge Base. Tanya saya tentang "SOP", "Asin", atau "Bocor".'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const user = useAuthStore((s) => s.user)
  const userRole = user?.role || 'QC_LAB'

  // Filter documents based on user role
  const accessibleDocs = documents.filter((doc) => {
    if (!doc.allowedRoles) return true // Backwards compatibility
    if (doc.allowedRoles.includes('ALL')) return true

    return doc.allowedRoles.includes(userRole)
  })

  const filteredDocs = accessibleDocs.filter((doc) => activeTab === 'ALL' || doc.category === activeTab)

  const handleOpenForm = (docId?: string) => {
    if (docId) {
      const doc = documents.find((d) => d.id === docId)
      if (doc) {
        setEditingDocId(docId)
        setFormTitle(doc.title)
        setFormCategory(doc.category)
        setFormContent(doc.content)
        setFormAuthor(doc.author)
      }
    } else {
      setEditingDocId(null)
      setFormTitle('')
      setFormCategory('SOP')
      setFormContent('')
      setFormAuthor('')
    }
    setShowFormDialog(true)
  }

  const handleSaveDocument = () => {
    if (!formTitle.trim() || !formContent.trim() || !formAuthor.trim()) {
      toast.error('Mohon lengkapi semua field')

      return
    }

    if (editingDocId) {
      updateDocument(editingDocId, {
        title: formTitle,
        category: formCategory,
        content: formContent,
        author: formAuthor,
        allowedRoles: formCategory === 'CONFIDENTIAL' ? ['PIMPINAN'] : ['ALL']
      })
      toast.success('Dokumen berhasil diperbarui')
    } else {
      addDocument({
        title: formTitle,
        category: formCategory,
        content: formContent,
        author: formAuthor,
        allowedRoles: formCategory === 'CONFIDENTIAL' ? ['PIMPINAN'] : ['ALL']
      })
      toast.success('Dokumen berhasil ditambahkan')
    }

    setShowFormDialog(false)
  }

  const handleDeleteClick = (docId: string) => {
    setDeletingDocId(docId)
    setShowDeleteDialog(true)
  }

  const handleConfirmDelete = () => {
    if (deletingDocId) {
      deleteDocument(deletingDocId)
      toast.success('Dokumen berhasil dihapus')
      setShowDeleteDialog(false)
      setDeletingDocId(null)
    }
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputMessage
    }
    setMessages((prev) => [...prev, userMsg])
    setInputMessage('')
    setIsTyping(true)

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage.toLowerCase())
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: botResponse
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (input: string): string => {
    // HR keywords
    if (input.includes('gaji') || input.includes('payroll')) {
      return 'Payroll dibayarkan setiap tanggal 28. Cek tab Payroll di menu Data Karyawan untuk generate slip gaji.'
    }
    if (input.includes('cuti') || input.includes('izin')) {
      return 'Jatah cuti tahunan 12 hari. Wajib pengajuan minimal H-7 (kecuali darurat). Max cuti sakit 3 hari tanpa surat dokter.'
    }

    // Warehouse keywords
    if (input.includes('inbound') || input.includes('terima')) {
      return 'SOP Inbound: Cek fisik barang, cocokkan Surat Jalan, lalu Scan QR Code. Pastikan barang rusak dipisahkan di area Red Zone.'
    }
    if (input.includes('fifo') || input.includes('expired')) {
      return 'Gunakan prinsip FEFO: Barang yang mau expired duluan WAJIB keluar duluan. Cek tanggal di label kardus dan tata barang lama di depan.'
    }
    if (input.includes('forklift') || input.includes('safety') || input.includes('k3')) {
      return 'Safety First! Gunakan helm/sepatu safety. Klakson di setiap tikungan. Maksimal tumpukan pallet adalah 3 tingkat. Kecepatan maks 5 km/jam.'
    }

    // Finance keywords
    if (input.includes('ppn') || input.includes('pajak')) {
      return 'Tarif PPN saat ini adalah 11%. Pastikan faktur pajak diterbitkan untuk customer B2B. Lihat dokumen "Kebijakan PPN 11%" untuk detail lengkap.'
    }
    if (input.includes('tagih') || input.includes('piutang')) {
      return 'SOP Penagihan: Kirim reminder H-3 sebelum jatuh tempo. Jika telat >1 minggu, hubungi Sales Manager dan hold pengiriman barang.'
    }
    if (input.includes('reimburse') || input.includes('klaim')) {
      return 'Klaim reimburse maksimal tanggal 25 setiap bulan. Wajib lampirkan struk fisik. Max Rp 500.000/bulan.'
    }

    // Procurement keywords
    if (input.includes('supplier') || input.includes('vendor')) {
      return 'SOP Seleksi Supplier: Wajib kirim sampel & lolos uji QC Lab. Cek dokumen "Daftar Blacklist Vendor 2024" sebelum order ke supplier baru!'
    }
    if (input.includes('po') || input.includes('order') || input.includes('purchase')) {
      return 'Limit PO Staff Procurement: Rp 10 Juta (langsung terbit). Di atas itu wajib approval Manager (10-50 Juta) atau Pimpinan (>50 Juta). Lihat dokumen "Kebijakan Purchase Order".'
    }
    if (input.includes('bayar') || input.includes('top') || input.includes('payment')) {
      return 'Standar Term of Payment (TOP) kita adalah 30 hari setelah invoice diterima. Untuk supplier baru, bisa nego TOP saat proses seleksi.'
    }

    // QC keywords
    if (input.includes('asin') || input.includes('garam')) {
      return 'Berdasarkan Lesson Learned #2, masalah rasa asin biasanya disebabkan sensor timbangan error. Solusinya: Kalibrasi ulang timbangan setiap pagi sebelum shift dimulai.'
    }
    if (input.includes('sop') || input.includes('prosedur')) {
      return 'Berikut SOP yang tersedia: Penerimaan Bahan Baku, Kebersihan Mesin, dan Suhu Gudang. Mana yang ingin Anda baca?'
    }
    if (input.includes('bocor') || input.includes('sealing') || input.includes('kemasan')) {
      return 'Masalah kebocoran kemasan (Sealing) biasanya karena suhu heater kurang stabil. Cek dokumen "Solusi Kemasan Bocor" untuk detailnya.'
    }
    if (input.includes('mesin') || input.includes('mixing')) {
      return 'Untuk prosedur kebersihan mesin mixing, ada SOP lengkap di dokumen #3. Intinya: bilas air panas, detergen food-grade, lalu sanitizer.'
    }
    if (input.includes('gudang') || input.includes('suhu')) {
      return 'Standar suhu penyimpanan gudang: Bahan kering 20-25°C, Bahan segar 10-15°C (cold storage). Lihat SOP #4 untuk detail.'
    }

    return 'Maaf, saya hanya bot prototype. Coba kata kunci: "SOP", "Asin", "Bocor", "Mesin", atau "Gudang".'
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const getCategoryBadge = (category: DocumentCategory) => {
    switch (category) {
      case 'SOP':
        return 'bg-blue-100 text-blue-700'
      case 'LESSON_LEARNED':
        return 'bg-orange-100 text-orange-700'
      case 'GENERAL':
        return 'bg-purple-100 text-purple-700'
      case 'CONFIDENTIAL':
        return 'bg-red-100 text-red-700'
      case 'POLICY':
        return 'bg-emerald-100 text-emerald-700'
      case 'TECHNICAL':
        return 'bg-slate-100 text-slate-700'
    }
  }

  const getCategoryLabel = (category: DocumentCategory) => {
    switch (category) {
      case 'SOP':
        return 'SOP'
      case 'LESSON_LEARNED':
        return 'Lesson Learned'
      case 'GENERAL':
        return 'General'
      case 'CONFIDENTIAL':
        return 'Confidential'
      case 'POLICY':
        return 'Policy'
      case 'TECHNICAL':
        return 'Technical'
    }
  }

  return (
    <div className="flex h-[calc(100vh-12rem)] gap-6">
      {/* Left Panel - Document Manager (60%) */}
      <div className="flex w-[60%] flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Pustaka Pengetahuan</h1>
            <p className="mt-1 text-sm text-slate-500">Kelola dokumen SOP dan Lesson Learned</p>
          </div>
          <button
            onClick={() => handleOpenForm()}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            <Plus size={20} weight="bold" />
            Tambah Data
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setActiveTab('ALL')}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
              activeTab === 'ALL' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            )}
          >
            Semua ({accessibleDocs.length})
          </button>
          <button
            onClick={() => setActiveTab('SOP')}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
              activeTab === 'SOP' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            )}
          >
            SOP ({accessibleDocs.filter((d) => d.category === 'SOP').length})
          </button>
          <button
            onClick={() => setActiveTab('LESSON_LEARNED')}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
              activeTab === 'LESSON_LEARNED' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            )}
          >
            Lesson Learned ({accessibleDocs.filter((d) => d.category === 'LESSON_LEARNED').length})
          </button>
        </div>

        {/* Document List */}
        <div className="flex-1 space-y-3 overflow-y-auto rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          {filteredDocs.length === 0 ? (
            <div className="flex h-full items-center justify-center text-slate-500">
              <p>Belum ada dokumen</p>
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="group relative rounded-lg border border-slate-200 bg-slate-50 p-4 transition-all hover:border-primary hover:shadow-md"
              >
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{doc.title}</h3>
                      {doc.category === 'CONFIDENTIAL' && <Lock size={16} weight="fill" className="text-primary" />}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <span className={cn('rounded-full px-2 py-0.5 font-semibold', getCategoryBadge(doc.category))}>
                        {getCategoryLabel(doc.category)}
                      </span>
                      <span>•</span>
                      <span>{doc.author}</span>
                      <span>•</span>
                      <span>{new Date(doc.date).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</span>
                    </div>
                  </div>

                  <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => handleOpenForm(doc.id)}
                      className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                      title="Edit"
                    >
                      <Pencil size={18} weight="fill" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(doc.id)}
                      className="rounded-lg p-2 text-secondary transition-colors hover:bg-red-50"
                      title="Hapus"
                    >
                      <Trash size={18} weight="fill" />
                    </button>
                  </div>
                </div>
                <p className="line-clamp-2 text-sm text-slate-600">{doc.content}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Panel - Chatbot (40%) */}
      <div className="flex w-[40%] flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
        {/* Chat Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 bg-gradient-to-r from-primary to-red-700 px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <ChatCircleDots size={24} weight="fill" className="text-white" />
          </div>
          <div className="flex-1 text-white">
            <h3 className="font-bold">KS-Bot</h3>
            <p className="text-xs opacity-90">Asisten Knowledge Base</p>
          </div>
          <Lightning size={20} weight="fill" className="text-yellow-300" />
        </div>

        {/* Messages Area */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm',
                    msg.role === 'user' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-800'
                  )}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="rounded-2xl bg-slate-100 px-4 py-2.5">
                <div className="flex gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tanya sesuatu..."
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="rounded-lg bg-primary p-2.5 text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              <PaperPlaneTilt size={20} weight="fill" />
            </button>
          </div>
        </div>
      </div>

      {/* Form Dialog */}
      <Dialog open={showFormDialog} onOpenChange={setShowFormDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingDocId ? 'Edit Dokumen' : 'Tambah Dokumen Baru'}</DialogTitle>
            <DialogDescription>
              {editingDocId ? 'Perbarui informasi dokumen' : 'Masukkan informasi dokumen knowledge base'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Judul Dokumen <span className="text-secondary">*</span>
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Contoh: SOP Penerimaan Bahan Baku"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Kategori <span className="text-secondary">*</span>
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as DocumentCategory)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option value="SOP">SOP (Prosedur Standar)</option>
                <option value="LESSON_LEARNED">Lesson Learned (Pembelajaran QC)</option>
                <option value="GENERAL">General (Umum)</option>
                {userRole === 'PIMPINAN' && <option value="CONFIDENTIAL">Confidential (Rahasia - Hanya Pimpinan)</option>}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Konten <span className="text-secondary">*</span>
              </label>
              <textarea
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                placeholder="Tulis konten dokumen di sini..."
                rows={8}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Penulis/Author <span className="text-secondary">*</span>
              </label>
              <input
                type="text"
                value={formAuthor}
                onChange={(e) => setFormAuthor(e.target.value)}
                placeholder="Contoh: Budi Santoso (Manager)"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={() => setShowFormDialog(false)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              onClick={handleSaveDocument}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              {editingDocId ? 'Simpan Perubahan' : 'Tambah Dokumen'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus dokumen ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setShowDeleteDialog(false)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              onClick={handleConfirmDelete}
              className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Hapus
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
