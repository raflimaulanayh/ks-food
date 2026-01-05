'use client'

import { Camera, XCircle } from '@phosphor-icons/react'
import { Html5Qrcode } from 'html5-qrcode'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/atoms/ui/button'

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void
  onScanError?: (error: string) => void
  autoStart?: boolean
}

export function QRScanner({ onScanSuccess, onScanError, autoStart = false }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const qrCodeRegionId = 'qr-reader'

  const startScanner = async () => {
    try {
      setError(null)
      setIsScanning(true)

      const html5QrCode = new Html5Qrcode(qrCodeRegionId)
      scannerRef.current = html5QrCode

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      }

      await html5QrCode.start(
        { facingMode: 'environment' }, // Use back camera
        config,
        (decodedText) => {
          onScanSuccess(decodedText)
          stopScanner()
        },
        (errorMessage) => {
          // Ignore continuous scan errors
          console.log('Scan error:', errorMessage)
        }
      )
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to start camera'
      setError(errorMsg)
      setIsScanning(false)
      onScanError?.(errorMsg)
    }
  }

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        // Check if scanner is actually running before stopping
        const state = await scannerRef.current.getState()
        if (state === 2 || state === 3) {
          // 2 = SCANNING, 3 = PAUSED
          await scannerRef.current.stop()
        }
        scannerRef.current.clear()
        scannerRef.current = null
      } catch (err) {
        // Silently handle if scanner is already stopped
        const errorMsg = err instanceof Error ? err.message : String(err)
        if (!errorMsg.includes('not running')) {
          console.error('Error stopping scanner:', err)
        }
      }
    }
    setIsScanning(false)
  }

  // Auto-start on mount if enabled
  useEffect(() => {
    if (autoStart) {
      startScanner()
    }

    return () => {
      stopScanner()
    }
  }, [autoStart])

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Camera Container - Fullscreen */}
      <div
        id={qrCodeRegionId}
        className="h-full w-full"
        style={{
          position: 'absolute',
          inset: 0
        }}
      />

      {/* Custom CSS to fix duplicate camera */}
      <style jsx global>{`
        #qr-reader {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
        }
        #qr-reader video {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
        #qr-reader__dashboard_section {
          display: none !important;
        }
        #qr-reader__dashboard_section_csr {
          display: none !important;
        }
        #qr-reader__scan_region {
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
        }
      `}</style>

      {/* Error Message - Overlay */}
      {error && (
        <div className="absolute inset-x-4 top-1/2 z-10 -translate-y-1/2 rounded-lg border border-red-200 bg-red-50/95 p-4 text-center backdrop-blur-sm">
          <XCircle size={24} className="mx-auto mb-2 text-red-600" weight="fill" />
          <p className="text-sm font-semibold text-red-700">{error}</p>
          <p className="mt-1 text-xs text-red-600">Gunakan input manual di bawah</p>
        </div>
      )}

      {/* Manual Start Button (if not auto-started) */}
      {!isScanning && !error && !autoStart && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <Button onClick={startScanner} className="h-14 gap-2 bg-white px-8 text-slate-900 hover:bg-white/90">
            <Camera size={20} weight="bold" />
            <span className="text-base font-semibold">Aktifkan Kamera</span>
          </Button>
        </div>
      )}
    </div>
  )
}
