'use client'

import type { StockItem } from '@/stores/use-stock-store'
import { Printer } from '@phosphor-icons/react'
import QRCode from 'qrcode'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/atoms/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/atoms/ui/dialog'

interface QRCodePrintModalProps {
  items: StockItem[]
  onClose: () => void
}

export function QRCodePrintModal({ items, onClose }: QRCodePrintModalProps) {
  const [qrCodes, setQrCodes] = useState<{ [key: string]: string }>({})
  const printRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Generate QR codes for all items
    const generateQRCodes = async () => {
      const codes: { [key: string]: string } = {}
      for (const item of items) {
        try {
          const qrDataUrl = await QRCode.toDataURL(item.sku, {
            width: 200,
            margin: 1,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          })
          codes[item.id] = qrDataUrl
        } catch (err) {
          console.error('QR generation error:', err)
        }
      }
      setQrCodes(codes)
    }

    generateQRCodes()
  }, [items])

  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl print:hidden">
          <DialogHeader>
            <DialogTitle>
              Preview Label QR Code ({items.length} item{items.length > 1 ? 's' : ''})
            </DialogTitle>
            <DialogDescription>
              Preview label sebelum print. Pastikan semua QR code sudah ter-generate dengan benar.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {items.map((item) => (
                <div key={item.id} className="rounded-lg border border-slate-300 bg-white p-3 text-center">
                  {qrCodes[item.id] ? (
                    <img src={qrCodes[item.id]} alt={item.sku} className="mx-auto mb-2 h-32 w-32" />
                  ) : (
                    <div className="mx-auto mb-2 flex h-32 w-32 items-center justify-center bg-slate-100 text-xs text-slate-500">
                      Loading...
                    </div>
                  )}
                  <div className="text-xs font-bold text-slate-900">{item.sku}</div>
                  <div className="text-xs text-slate-600">{item.name}</div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button onClick={onClose} variant="outline-red">
              Batal
            </Button>
            <Button onClick={handlePrint} variant="default">
              <Printer size={18} weight="bold" />
              Print Label
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Print Layout - Only visible when printing */}
      <div ref={printRef} className="hidden print:block">
        <style>{`
          @media print {
            @page {
              size: A4;
              margin: 10mm;
            }
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
          }
        `}</style>

        <div className="grid grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex break-inside-avoid flex-col items-center justify-center border-2 border-dashed border-slate-300 p-4"
              style={{ pageBreakInside: 'avoid' }}
            >
              {qrCodes[item.id] && (
                <img src={qrCodes[item.id]} alt={item.sku} className="mb-2" style={{ width: '150px', height: '150px' }} />
              )}
              <div className="text-center">
                <div className="mb-1 font-mono text-sm font-bold">{item.sku}</div>
                <div className="text-xs font-medium">{item.name}</div>
                <div className="mt-1 text-xs text-slate-600">
                  {item.category} | {item.unit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
