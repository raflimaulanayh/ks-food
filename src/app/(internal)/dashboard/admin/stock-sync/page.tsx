'use client'

import { useAuthStore } from '@/stores/use-auth-store'
import { useStockSyncStore, type SyncChannel } from '@/stores/use-stock-sync-store'
import {
  ArrowsClockwise,
  Package,
  CheckCircle,
  WarningCircle,
  XCircle,
  DownloadSimple,
  Clock,
  Spinner,
  Check,
  X,
  Lightning,
  Power
} from '@phosphor-icons/react'
import { format, formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/atoms/ui/dialog'

import { cn } from '@/utils/cn'

const CHANNEL_LABELS: Record<SyncChannel, string> = {
  shopee: 'Shopee',
  tokopedia: 'Tokopedia',
  blibli: 'Blibli',
  website: 'Website'
}

const CHANNEL_COLORS: Record<SyncChannel, string> = {
  shopee: '#EE4D2D',
  tokopedia: '#42B549',
  blibli: '#0095DA',
  website: '#DC2626'
}

export default function StockSyncPage() {
  const user = useAuthStore((s) => s.user)
  const {
    products,
    history,
    isLoading,
    autoSyncEnabled,
    autoSyncInterval,
    lastAutoSync,
    syncProduct,
    syncAll,
    getSyncStatus,
    getLastSyncTime,
    toggleAutoSync,
    setAutoSyncInterval,
    performAutoSync
  } = useStockSyncStore()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [syncingProductId, setSyncingProductId] = useState<string | null>(null)
  const [nextSyncIn, setNextSyncIn] = useState<number>(0) // seconds until next auto-sync

  const isAdmin = user?.role === 'ADMIN'
  const isViewOnly = user?.role === 'WAREHOUSE'

  const syncStatus = getSyncStatus()
  const lastSyncTime = getLastSyncTime()

  // Auto-sync timer
  useEffect(() => {
    if (!autoSyncEnabled || !lastAutoSync) return

    const intervalId = setInterval(() => {
      const now = new Date()
      const lastSync = new Date(lastAutoSync)
      const diffInMinutes = (now.getTime() - lastSync.getTime()) / 1000 / 60

      if (diffInMinutes >= autoSyncInterval) {
        performAutoSync()
        toast.success('Auto-sync completed!', {
          description: `Stock synced automatically at ${format(new Date(), 'HH:mm', { locale: id })}`
        })
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(intervalId)
  }, [autoSyncEnabled, autoSyncInterval, lastAutoSync, performAutoSync])

  // Calculate next sync countdown
  useEffect(() => {
    if (!autoSyncEnabled || !lastAutoSync) {
      setNextSyncIn(0)

      return
    }

    const countdownId = setInterval(() => {
      const now = new Date()
      const lastSync = new Date(lastAutoSync)
      const nextSyncTime = new Date(lastSync.getTime() + autoSyncInterval * 60 * 1000)
      const diffInSeconds = Math.max(0, Math.floor((nextSyncTime.getTime() - now.getTime()) / 1000))
      setNextSyncIn(diffInSeconds)
    }, 1000)

    return () => clearInterval(countdownId)
  }, [autoSyncEnabled, autoSyncInterval, lastAutoSync])

  // Handle toggle auto-sync
  const handleToggleAutoSync = () => {
    const newState = !autoSyncEnabled
    toggleAutoSync(newState)
    toast.success(newState ? 'Auto-sync enabled' : 'Auto-sync disabled')
  }

  // Handle interval change
  const handleIntervalChange = (minutes: number) => {
    setAutoSyncInterval(minutes)
    toast.success(`Auto-sync interval updated to ${minutes} minutes`)
  }

  // Handle single product sync
  const handleSyncProduct = async (productId: string, channel?: SyncChannel) => {
    if (isViewOnly) return

    setSyncingProductId(productId)
    await syncProduct(productId, channel)
    toast.success(`Stock ${channel ? `di ${CHANNEL_LABELS[channel]}` : 'di semua channel'} berhasil disinkronkan!`)
    setSyncingProductId(null)
  }

  // Handle sync all
  const handleSyncAll = async () => {
    if (isViewOnly) return

    setShowConfirmDialog(false)
    await syncAll()
    toast.success('Semua produk berhasil disinkronkan ke semua channel!')
  }

  // Calculate stock difference
  const getStockDiff = (channelStock: number, internalStock: number) => {
    if (channelStock === 0) return null // Product not sold on this channel
    const diff = channelStock - internalStock
    if (diff === 0) return null

    return {
      value: diff,
      color: diff > 0 ? 'text-green-600' : 'text-red-600',
      bgColor: diff > 0 ? 'bg-green-100' : 'bg-red-100',
      label: diff > 0 ? `+${diff}` : `${diff}`
    }
  }

  return (
    <div className="space-y-6 pt-2 pb-10">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Sinkronisasi Stok</h1>
            {isViewOnly && (
              <span className="inline-flex rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                View Only Mode
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Monitor dan sinkronkan stok produk di semua channel penjualan (Shopee, Tokopedia, Blibli, Website)
          </p>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <Button variant="default" onClick={() => setShowConfirmDialog(true)} disabled={isLoading} className="gap-2">
              {isLoading ? <Spinner size={16} className="animate-spin" /> : <ArrowsClockwise size={16} />}
              Sync All
            </Button>
          )}
          <Button variant="outline-red" className="gap-2">
            <DownloadSimple size={16} /> Export
          </Button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase">Total Products</div>
              <div className="mt-1 text-2xl font-bold text-slate-900">{products.length}</div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <Package size={24} className="text-slate-600" weight="duotone" />
            </div>
          </div>
        </Card>

        <Card className="border border-green-200 bg-green-50 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-green-700 uppercase">Synced</div>
              <div className="mt-1 text-2xl font-bold text-green-900">{syncStatus.synced}</div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle size={24} className="text-green-600" weight="duotone" />
            </div>
          </div>
        </Card>

        <Card className="border border-amber-200 bg-amber-50 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-amber-700 uppercase">Out of Sync</div>
              <div className="mt-1 text-2xl font-bold text-amber-900">{syncStatus.outOfSync}</div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <WarningCircle size={24} className="text-amber-600" weight="duotone" />
            </div>
          </div>
        </Card>

        <Card className="border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase">Last Sync</div>
              <div className="mt-1 text-sm font-medium text-slate-900">
                {lastSyncTime ? formatDistanceToNow(lastSyncTime, { addSuffix: true, locale: id }) : '-'}
              </div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <Clock size={24} className="text-slate-600" weight="duotone" />
            </div>
          </div>
        </Card>
      </div>

      {/* AUTO-SYNC SETTINGS (ADMIN ONLY) */}
      {isAdmin && (
        <Card className="overflow-hidden rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-sm">
          <div className="border-b border-blue-100 bg-blue-50/50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Lightning size={20} weight="duotone" className="text-blue-600" />
                  <h2 className="text-lg font-bold text-slate-900">Auto-Sync Settings</h2>
                </div>
                <p className="mt-1 text-xs text-slate-500">Automatic stock synchronization in the background</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold',
                    autoSyncEnabled
                      ? 'border-green-300 bg-green-100 text-green-800'
                      : 'border-slate-300 bg-slate-100 text-slate-600'
                  )}
                >
                  <Power size={14} weight="fill" className={autoSyncEnabled ? 'text-green-600' : 'text-slate-500'} />
                  {autoSyncEnabled ? 'Auto-Sync ON' : 'Auto-Sync OFF'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Enable/Disable Toggle */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600 uppercase">Status</label>
                <Button
                  onClick={handleToggleAutoSync}
                  variant={autoSyncEnabled ? 'default' : 'outline-red'}
                  className="w-full gap-2"
                  size="sm"
                >
                  <Power size={16} weight="fill" />
                  {autoSyncEnabled ? 'Disable Auto-Sync' : 'Enable Auto-Sync'}
                </Button>
              </div>

              {/* Interval Selector */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600 uppercase">Sync Interval</label>
                <select
                  value={autoSyncInterval}
                  onChange={(e) => handleIntervalChange(Number(e.target.value))}
                  disabled={!autoSyncEnabled}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm transition-colors hover:border-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value={5}>Every 5 minutes</option>
                  <option value={15}>Every 15 minutes</option>
                  <option value={30}>Every 30 minutes</option>
                  <option value={60}>Every 1 hour</option>
                </select>
              </div>

              {/* Status Info */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600 uppercase">Status Info</label>
                <div className="space-y-1 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Last Auto-Sync:</span>
                    <span className="font-medium text-slate-900">
                      {lastAutoSync ? formatDistanceToNow(lastAutoSync, { addSuffix: true, locale: id }) : '-'}
                    </span>
                  </div>
                  {autoSyncEnabled && nextSyncIn > 0 && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">Next Sync In:</span>
                      <span className="font-mono font-semibold text-blue-600">
                        {Math.floor(nextSyncIn / 60)}m {nextSyncIn % 60}s
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
              <p className="text-xs text-blue-800">
                <strong>How it works:</strong> When enabled, the system will automatically sync all out-of-sync products
                every {autoSyncInterval} minutes. Manual sync is still available at any time.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* STOCK SYNC TABLE */}
      <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b bg-slate-50/50 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-900">Stock Comparison</h2>
          <p className="mt-1 text-xs text-slate-500">Compare stock across all sales channels</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] text-left text-sm">
            <thead className="border-b bg-slate-50 font-medium text-slate-600">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3 text-center">Internal</th>
                <th className="px-4 py-3 text-center" style={{ color: CHANNEL_COLORS.shopee }}>
                  Shopee
                </th>
                <th className="px-4 py-3 text-center" style={{ color: CHANNEL_COLORS.tokopedia }}>
                  Tokopedia
                </th>
                <th className="px-4 py-3 text-center" style={{ color: CHANNEL_COLORS.blibli }}>
                  Blibli
                </th>
                <th className="px-4 py-3 text-center" style={{ color: CHANNEL_COLORS.website }}>
                  Website
                </th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3">Last Sync</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => {
                const shopeeDiff = getStockDiff(product.stock.shopee, product.stock.internal)
                const tokopediaDiff = getStockDiff(product.stock.tokopedia, product.stock.internal)
                const blibliDiff = getStockDiff(product.stock.blibli, product.stock.internal)
                const websiteDiff = getStockDiff(product.stock.website, product.stock.internal)
                const isSyncing = syncingProductId === product.id

                return (
                  <tr key={product.id} className="group hover:bg-slate-50/80">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{product.name}</div>
                      <div className="mt-0.5 font-mono text-xs text-slate-500">{product.sku}</div>
                    </td>

                    {/* Internal Stock */}
                    <td className="px-4 py-3 text-center">
                      <div className="font-bold text-slate-900">
                        {product.stock.internal} {product.unit}
                      </div>
                      <div className="text-[10px] text-slate-400">Master</div>
                    </td>

                    {/* Shopee Stock */}
                    <td className="px-4 py-3 text-center">
                      {product.stock.shopee === 0 ? (
                        <span className="text-xs text-slate-400">-</span>
                      ) : (
                        <div>
                          <div className="font-semibold text-slate-900">
                            {product.stock.shopee} {product.unit}
                          </div>
                          {shopeeDiff && (
                            <span className={cn('text-[10px] font-bold', shopeeDiff.color)}>{shopeeDiff.label}</span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Tokopedia Stock */}
                    <td className="px-4 py-3 text-center">
                      {product.stock.tokopedia === 0 ? (
                        <span className="text-xs text-slate-400">-</span>
                      ) : (
                        <div>
                          <div className="font-semibold text-slate-900">
                            {product.stock.tokopedia} {product.unit}
                          </div>
                          {tokopediaDiff && (
                            <span className={cn('text-[10px] font-bold', tokopediaDiff.color)}>{tokopediaDiff.label}</span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Blibli Stock */}
                    <td className="px-4 py-3 text-center">
                      {product.stock.blibli === 0 ? (
                        <span className="text-xs text-slate-400">-</span>
                      ) : (
                        <div>
                          <div className="font-semibold text-slate-900">
                            {product.stock.blibli} {product.unit}
                          </div>
                          {blibliDiff && (
                            <span className={cn('text-[10px] font-bold', blibliDiff.color)}>{blibliDiff.label}</span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Website Stock */}
                    <td className="px-4 py-3 text-center">
                      {product.stock.website === 0 ? (
                        <span className="text-xs text-slate-400">-</span>
                      ) : (
                        <div>
                          <div className="font-semibold text-slate-900">
                            {product.stock.website} {product.unit}
                          </div>
                          {websiteDiff && (
                            <span className={cn('text-[10px] font-bold', websiteDiff.color)}>{websiteDiff.label}</span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className={cn(
                          'inline-flex rounded-full border px-2 py-0.5 text-xs font-medium',
                          product.syncStatus === 'synced'
                            ? 'border-green-200 bg-green-50 text-green-700'
                            : product.syncStatus === 'out_of_sync'
                              ? 'border-amber-200 bg-amber-50 text-amber-700'
                              : 'border-red-200 bg-red-50 text-red-700'
                        )}
                      >
                        {product.syncStatus === 'synced'
                          ? 'Synced'
                          : product.syncStatus === 'out_of_sync'
                            ? 'Out of Sync'
                            : 'Error'}
                      </span>
                    </td>

                    {/* Last Sync */}
                    <td className="px-4 py-3">
                      <div className="text-xs text-slate-600">
                        {formatDistanceToNow(product.lastSync, { addSuffix: true, locale: id })}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-center">
                      {isAdmin ? (
                        <Button
                          onClick={() => handleSyncProduct(product.id)}
                          disabled={isSyncing || isLoading}
                          size="sm"
                          variant="outline-red"
                          className="h-7 gap-1.5"
                        >
                          {isSyncing ? (
                            <>
                              <Spinner size={12} className="animate-spin" /> Syncing...
                            </>
                          ) : (
                            <>
                              <ArrowsClockwise size={12} /> Sync
                            </>
                          )}
                        </Button>
                      ) : (
                        <span className="text-xs text-slate-400">-</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* SYNC HISTORY */}
      <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b bg-slate-50/50 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-900">Sync History</h2>
          <p className="mt-1 text-xs text-slate-500">Recent synchronization activities</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b bg-slate-50 font-medium text-slate-600">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3 text-center">Channel</th>
                <th className="px-4 py-3 text-center">Stock Change</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No sync history yet
                  </td>
                </tr>
              ) : (
                history.slice(0, 10).map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 text-xs text-slate-600">
                      {format(item.timestamp, 'dd MMM yyyy, HH:mm', { locale: id })}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">{item.productName}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className="inline-flex rounded-full px-2 py-0.5 text-xs font-semibold text-white"
                        style={{
                          backgroundColor: item.channel === 'all' ? '#64748B' : CHANNEL_COLORS[item.channel as SyncChannel]
                        }}
                      >
                        {item.channel === 'all' ? 'All Channels' : CHANNEL_LABELS[item.channel as SyncChannel]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-xs">
                      {item.productId === 'all' || item.productId === 'auto' ? (
                        <span
                          className={cn(
                            'inline-flex items-center gap-1',
                            item.productId === 'auto' ? 'font-medium text-blue-600' : 'text-slate-500'
                          )}
                        >
                          {item.productId === 'auto' && <Lightning size={12} weight="fill" />}
                          {item.productId === 'auto' ? 'Auto-Sync' : 'Bulk Sync'}
                        </span>
                      ) : (
                        <span className="font-mono">
                          {item.oldStock} → {item.newStock}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={cn(
                          'inline-flex rounded-full border px-2 py-0.5 text-xs font-medium',
                          item.status === 'success'
                            ? 'border-green-200 bg-green-50 text-green-700'
                            : 'border-red-200 bg-red-50 text-red-700'
                        )}
                      >
                        {item.status === 'success' ? 'Success' : 'Failed'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">{item.message}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* SYNC ALL CONFIRMATION DIALOG */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Konfirmasi Sync All Products</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-slate-600">
              Apakah Anda yakin ingin menyinkronkan <span className="font-bold">semua {products.length} produk</span> ke
              semua sales channel (Shopee, Tokopedia, Blibli, Website)?
            </p>
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs text-amber-800">
                <strong>Note:</strong> Proses ini akan memakan waktu beberapa detik. Stok di semua channel akan disesuaikan
                dengan stok internal.
              </p>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline-red" onClick={() => setShowConfirmDialog(false)}>
              <X size={16} /> Batal
            </Button>
            <Button variant="default" onClick={handleSyncAll} className="gap-2">
              <Check size={16} /> Ya, Sync Semua
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
