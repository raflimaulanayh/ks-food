'use client'

import { MagnifyingGlass, X, Barcode } from '@phosphor-icons/react'
import { Html5Qrcode } from 'html5-qrcode'
import { useEffect, useRef, useState } from 'react'

interface BarcodeScannerProps {
  onScan: (sku: string) => void
  onClose: () => void
}

export function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [manualInput, setManualInput] = useState('')
  const scannerRef = useRef<Html5Qrcode | null>(null)

  useEffect(() => {
    return () => {
      // Cleanup scanner on unmount
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop()
      }
    }
  }, [])

  const startScanning = async () => {
    try {
      // Set scanning state first to render the element
      setIsScanning(true)

      // Wait for DOM to update
      await new Promise((resolve) => setTimeout(resolve, 100))

      const scanner = new Html5Qrcode('qr-reader')
      scannerRef.current = scanner

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          // Successfully scanned
          onScan(decodedText)
          scanner.stop()
          onClose()
        },
        () => {
          // Scan error (ignore, will keep trying)
        }
      )
    } catch (err) {
      console.error('Scanner error:', err)
      setIsScanning(false)
      alert('Tidak bisa mengakses kamera. Gunakan input manual.')
    }
  }

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      onScan(manualInput.trim())
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Scan Barcode/QR Code</h3>
          <button
            onClick={() => {
              if (scannerRef.current?.isScanning) {
                scannerRef.current.stop()
              }
              onClose()
            }}
            className="rounded-lg p-1 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {!isScanning ? (
          <div className="space-y-4">
            <button
              onClick={startScanning}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-white hover:bg-red-700"
            >
              <Barcode size={20} weight="bold" />
              Mulai Scan Kamera
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-slate-500">atau</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Input Manual SKU/Barcode</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleManualSubmit()}
                  placeholder="Contoh: RM-FLR-001"
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none"
                />
                <button
                  onClick={handleManualSubmit}
                  className="rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-red-700"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div id="qr-reader" className="overflow-hidden rounded-lg"></div>
            <p className="text-center text-sm text-slate-600">Arahkan kamera ke barcode/QR code</p>
            <button
              onClick={() => {
                if (scannerRef.current) {
                  scannerRef.current.stop()
                  setIsScanning(false)
                }
              }}
              className="w-full rounded-lg border border-slate-300 py-2 font-medium text-slate-700 hover:bg-slate-50"
            >
              Batal
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
