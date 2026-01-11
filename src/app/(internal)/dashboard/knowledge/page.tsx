'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { DocumentCategory, useKnowledgeStore } from '@/stores/use-knowledge-store'
import { ChatCircleDots, Lightning, Lock, PaperPlaneTilt, Pencil, Plus, Trash } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/atoms/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/atoms/ui/dialog'
import { ImageUpload } from '@/components/molecules/image-upload'
import { RichTextEditor } from '@/components/molecules/rich-text-editor'
import { TagInput } from '@/components/molecules/tag-input'

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
  const [formImages, setFormImages] = useState<string[]>([])
  const [formTags, setFormTags] = useState<string[]>([])

  // Structured content for Lesson Learned
  const [formProblem, setFormProblem] = useState('')
  const [formRootCause, setFormRootCause] = useState('')
  const [formSolution, setFormSolution] = useState('')
  const [formPrevention, setFormPrevention] = useState('')

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
  const userRole = user?.role || 'QC'

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
        setFormImages(doc.images || [])
        setFormTags(doc.tags || [])

        // Populate structured content if it's a Lesson Learned
        if (doc.structuredContent) {
          setFormProblem(doc.structuredContent.problem)
          setFormRootCause(doc.structuredContent.rootCause)
          setFormSolution(doc.structuredContent.solution)
          setFormPrevention(doc.structuredContent.prevention)
        } else {
          setFormProblem('')
          setFormRootCause('')
          setFormSolution('')
          setFormPrevention('')
        }
      }
    } else {
      setEditingDocId(null)
      setFormTitle('')
      setFormCategory('SOP')
      setFormContent('')
      setFormAuthor('')
      setFormImages([])
      setFormTags([])
      setFormProblem('')
      setFormRootCause('')
      setFormSolution('')
      setFormPrevention('')
    }
    setShowFormDialog(true)
  }

  const handleSaveDocument = () => {
    if (!formTitle.trim() || !formAuthor.trim()) {
      toast.error('Mohon lengkapi Judul dan Penulis')

      return
    }

    // Validate based on category
    if (formCategory === 'LESSON_LEARNED') {
      if (!formProblem.trim() || !formSolution.trim()) {
        toast.error('Untuk Lesson Learned, mohon isi minimal Problem dan Solution')

        return
      }
    } else {
      if (!formContent.trim()) {
        toast.error('Mohon isi konten dokumen')

        return
      }
    }

    const documentData = {
      title: formTitle,
      category: formCategory,
      content: formContent,
      author: formAuthor,
      allowedRoles: formCategory === 'CONFIDENTIAL' ? ['PIMPINAN'] : ['ALL'],
      images: formImages.length > 0 ? formImages : undefined,
      tags: formTags.length > 0 ? formTags : undefined,
      structuredContent:
        formCategory === 'LESSON_LEARNED'
          ? {
              problem: formProblem,
              rootCause: formRootCause,
              solution: formSolution,
              prevention: formPrevention
            }
          : undefined
    }

    if (editingDocId) {
      updateDocument(editingDocId, documentData)
      toast.success('Dokumen berhasil diperbarui')
    } else {
      addDocument(documentData)
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
    const searchTerms = input.toLowerCase().trim()

    // Split search into keywords for flexible matching
    const keywords = searchTerms.split(/\s+/).filter((k) => k.length > 2) // Filter out short words like "di", "ke", etc.

    // Search in accessible documents with relevance scoring
    const scoredDocs = accessibleDocs.map((doc) => {
      let score = 0
      const titleLower = doc.title.toLowerCase()
      const contentLower = doc.content.toLowerCase()

      // Exact phrase match gets highest score
      if (titleLower.includes(searchTerms)) {
        score += 100
      }
      if (contentLower.includes(searchTerms)) {
        score += 50
      }

      // Keyword matching - each matching keyword adds to score
      keywords.forEach((keyword) => {
        if (titleLower.includes(keyword)) {
          score += 10
        }
        if (contentLower.includes(keyword)) {
          score += 5
        }

        // Search in tags
        if (doc.tags && doc.tags.some((tag) => tag.includes(keyword))) {
          score += 30
        }

        // Search in structured content
        if (doc.structuredContent) {
          const structuredText =
            `${doc.structuredContent.problem} ${doc.structuredContent.rootCause} ${doc.structuredContent.solution} ${doc.structuredContent.prevention}`.toLowerCase()
          if (structuredText.includes(keyword)) {
            score += 15
          }
        }
      })

      // Boost score for lesson learned if user asks about it
      if (searchTerms.includes('lesson') && doc.category === 'LESSON_LEARNED') {
        score += 20
      }

      return { doc, score }
    })

    // Sort by relevance and get best matches
    const relevantDocs = scoredDocs
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.doc)

    // If found relevant documents, return the most relevant one
    if (relevantDocs.length > 0) {
      const bestMatch = relevantDocs[0]

      // Format response based on document type
      if (bestMatch.structuredContent) {
        // Structured format for Lesson Learned
        return `✅ **${bestMatch.title}**\n\n❌ **Problem:**\n${bestMatch.structuredContent.problem}\n\n💡 **Solution:**\n${bestMatch.structuredContent.solution}\n\n🔍 **Root Cause:**\n${bestMatch.structuredContent.rootCause || 'Tidak disebutkan'}\n\n🛡️ **Prevention:**\n${bestMatch.structuredContent.prevention || 'Tidak disebutkan'}\n\n📌 Lihat dokumen lengkap di list untuk detail selengkapnya!`
      } else {
        // Regular format for other documents
        const cleanContent = bestMatch.content.replace(/\\n/g, '\n').replace(/<[^>]*>/g, '')
        const preview = cleanContent.substring(0, 300)

        return `✅ Saya menemukan dokumen terkait: **${bestMatch.title}**\n\n${preview}...\n\n💡 Lihat dokumen lengkap di list untuk detail selengkapnya!`
      }
    }

    // Fallback to keyword-based responses
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

    // QC & Production keywords
    if (input.includes('asin') || input.includes('garam')) {
      return 'Berdasarkan Lesson Learned, masalah rasa asin biasanya disebabkan sensor timbangan error. Solusinya: Kalibrasi ulang timbangan setiap pagi sebelum shift dimulai.'
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

    return `Maaf, saya tidak menemukan dokumen terkait "${input}". Coba kata kunci seperti: "SOP", "Lesson Learned", "Jam Kerja", "Peraturan", "Warna Sambal", atau topik spesifik lainnya.`
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Format markdown in bot responses
  const formatBotMessage = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line.split(/\*\*(.*?)\*\*/).map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ))
  }

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
    <div className="flex min-h-[calc(100vh-12rem)] flex-col gap-4 lg:h-[calc(100vh-12rem)] lg:flex-row lg:gap-6">
      {/* Left Panel - Document Manager (60%) */}
      <div className="flex min-h-[500px] flex-col lg:w-[60%]">
        <div className="mb-4 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Pustaka Pengetahuan</h1>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">Kelola dokumen SOP dan Lesson Learned</p>
          </div>
          <button
            onClick={() => handleOpenForm()}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 sm:w-auto"
          >
            <Plus size={20} weight="bold" />
            Tambah Data
          </button>
        </div>

        {/* Tabs */}
        <div className="scrollbar-hide mb-4 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('ALL')}
            className={cn(
              'rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors sm:px-4 sm:text-sm',
              activeTab === 'ALL' ? 'bg-primary text-white' : 'border border-primary text-primary hover:bg-red-50'
            )}
          >
            Semua ({accessibleDocs.length})
          </button>
          <button
            onClick={() => setActiveTab('SOP')}
            className={cn(
              'rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors sm:px-4 sm:text-sm',
              activeTab === 'SOP' ? 'bg-primary text-white' : 'border border-primary text-primary hover:bg-red-50'
            )}
          >
            SOP ({accessibleDocs.filter((d) => d.category === 'SOP').length})
          </button>
          <button
            onClick={() => setActiveTab('LESSON_LEARNED')}
            className={cn(
              'rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors sm:px-4 sm:text-sm',
              activeTab === 'LESSON_LEARNED' ? 'bg-primary text-white' : 'border border-primary text-primary hover:bg-red-50'
            )}
          >
            Lesson Learned ({accessibleDocs.filter((d) => d.category === 'LESSON_LEARNED').length})
          </button>
        </div>

        {/* Document List */}
        <div className="flex-1 space-y-2 overflow-hidden overflow-y-auto rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
          {filteredDocs.length === 0 ? (
            <div className="flex h-full items-center justify-center text-slate-500">
              <p>Belum ada dokumen</p>
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="group relative rounded-lg border border-slate-200 bg-slate-50 p-3 transition-all hover:border-primary hover:shadow-md"
              >
                <div className="mb-1.5 flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="truncate text-sm font-semibold text-slate-900">{doc.title}</h3>
                      {doc.category === 'CONFIDENTIAL' && <Lock size={14} weight="fill" className="shrink-0 text-primary" />}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
                      <span className={cn('rounded-full px-1.5 py-0.5 font-semibold', getCategoryBadge(doc.category))}>
                        {getCategoryLabel(doc.category)}
                      </span>
                      <span>•</span>
                      <span className="truncate">{doc.author}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline">
                        {new Date(doc.date).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => handleOpenForm(doc.id)}
                      className="rounded-lg p-1.5 text-blue-600 transition-colors hover:bg-blue-50"
                      title="Edit"
                    >
                      <Pencil size={16} weight="fill" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(doc.id)}
                      className="rounded-lg p-1.5 text-primary transition-colors hover:bg-red-50"
                      title="Hapus"
                    >
                      <Trash size={16} weight="fill" />
                    </button>
                  </div>
                </div>

                {/* Document Content Preview */}
                <p className="line-clamp-2 text-xs text-slate-600">{doc.content}</p>

                {/* Tags Display */}
                {doc.tags && doc.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {doc.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                    {doc.tags.length > 3 && (
                      <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                        +{doc.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Image Thumbnails */}
                {doc.images && doc.images.length > 0 && (
                  <div className="mt-2 flex gap-1">
                    {doc.images.slice(0, 3).map((img, idx) => (
                      <div key={idx} className="h-12 w-12 overflow-hidden rounded border border-slate-200">
                        <img src={img} alt={`${doc.title} ${idx + 1}`} className="h-full w-full object-cover" />
                      </div>
                    ))}
                    {doc.images.length > 3 && (
                      <div className="flex h-12 w-12 items-center justify-center rounded border border-slate-200 bg-slate-100 text-[10px] font-semibold text-slate-600">
                        +{doc.images.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Panel - Chatbot (40%) */}
      <div className="flex min-h-[500px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:w-[40%]">
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
                    'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap',
                    msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-slate-800'
                  )}
                >
                  {msg.role === 'bot' ? formatBotMessage(msg.text) : msg.text}
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
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
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

            {/* Conditional Form Based on Category */}
            {formCategory === 'LESSON_LEARNED' ? (
              <>
                {/* Structured Form for Lesson Learned */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Problem/Masalah <span className="text-secondary">*</span>
                  </label>
                  <textarea
                    value={formProblem}
                    onChange={(e) => setFormProblem(e.target.value)}
                    placeholder="Apa masalah yang terjadi?"
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Root Cause/Penyebab</label>
                  <textarea
                    value={formRootCause}
                    onChange={(e) => setFormRootCause(e.target.value)}
                    placeholder="Apa penyebab utama masalah ini?"
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Solution/Solusi <span className="text-secondary">*</span>
                  </label>
                  <textarea
                    value={formSolution}
                    onChange={(e) => setFormSolution(e.target.value)}
                    placeholder="Bagaimana solusi yang diterapkan?"
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Prevention/Pencegahan</label>
                  <textarea
                    value={formPrevention}
                    onChange={(e) => setFormPrevention(e.target.value)}
                    placeholder="Bagaimana mencegah masalah ini terulang?"
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                </div>
              </>
            ) : (
              <>
                {/* Rich Text Editor for Other Categories */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Konten <span className="text-secondary">*</span>
                  </label>
                  <RichTextEditor
                    value={formContent}
                    onChange={setFormContent}
                    placeholder="Tulis konten dokumen di sini..."
                  />
                </div>
              </>
            )}

            {/* Image Upload - Available for All Categories */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Gambar Pendukung (Opsional)</label>
              <ImageUpload images={formImages} onImagesChange={setFormImages} maxImages={5} />
            </div>

            {/* Tags Input - Available for All Categories */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Tags/Kata Kunci (Opsional)</label>
              <TagInput tags={formTags} onTagsChange={setFormTags} placeholder="Tambah tag untuk memudahkan pencarian..." />
            </div>

            {/* Author Field */}
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
            <Button onClick={() => setShowDeleteDialog(false)} variant="outline-red">
              Batal
            </Button>
            <Button onClick={handleConfirmDelete} variant="default">
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
