'use client'

import { ArrowLeft, Copy, Download, Code, Info, Database, Gear } from '@phosphor-icons/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { Badge } from '@/components/atoms/ui/badge'
import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'

// Mock data - in real app, this would come from API based on log ID
const mockLogData = {
  id: 'LOG-2026-01-02-14352',
  timestamp: '2026-01-02 14:35:22',
  level: 'SUCCESS',
  module: 'USER',
  message: "User 'Budi Santoso' created successfully",
  user: 'Rafli Maulana',
  userId: '18.0.0.2',
  ip: '10.0.0.12',
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  method: 'POST',
  endpoint: '/api/users/create',
  statusCode: 201,
  responseTime: '145ms',
  requestBody: {
    name: 'Budi Santoso',
    email: 'budi.santoso@ksfood.id',
    role: 'PROCUREMENT',
    department: 'Procurement',
    phone: '081234567890'
  },
  responseBody: {
    success: true,
    message: 'User created successfully',
    data: {
      id: 'USR-2026-001',
      name: 'Budi Santoso',
      email: 'budi.santoso@ksfood.id',
      role: 'PROCUREMENT',
      createdAt: '2026-01-02T14:35:22.000Z'
    }
  },
  metadata: {
    sessionId: 'sess_abc123xyz',
    requestId: 'req_def456uvw',
    correlationId: 'corr_ghi789rst',
    environment: 'production',
    version: '1.0.0'
  }
}

export default function ViewRawLogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const logId = searchParams.get('id')
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  // In real app, fetch log data based on logId
  const logData = mockLogData

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'SUCCESS':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'WARNING':
        return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'ERROR':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'CRITICAL':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'INFO':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(section)
    toast.success(`${section} disalin ke clipboard`)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  const downloadJSON = () => {
    const dataStr = JSON.stringify(logData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `log-${logData.id}.json`
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Log berhasil diunduh sebagai JSON')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <Button variant="outline-red" onClick={() => router.back()} className="gap-2" size="sm">
              <ArrowLeft size={16} weight="bold" />
              <span className="hidden sm:inline">Kembali</span>
            </Button>
            <div>
              <h1 className="font-bold text-slate-900 md:text-lg">Raw Log Details</h1>
              <p className="text-xs text-slate-500 md:text-sm">ID: {logData.id}</p>
            </div>
          </div>
          <Button onClick={downloadJSON} className="gap-2" size="sm" variant="default">
            <Download size={16} weight="bold" />
            Download JSON
          </Button>
        </div>

        {/* Log Summary Card */}
        <Card className="p-4 md:p-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase md:text-xs">Timestamp</p>
              <p className="mt-1 font-mono text-xs font-medium text-slate-900 md:text-sm">{logData.timestamp}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase md:text-xs">Level</p>
              <Badge variant="outline" className={`mt-1 border text-xs ${getLevelBadge(logData.level)}`}>
                {logData.level}
              </Badge>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase md:text-xs">Module</p>
              <Badge variant="outline" className="mt-1 border-slate-200 bg-slate-100 text-xs text-slate-700">
                {logData.module}
              </Badge>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase md:text-xs">Status Code</p>
              <p className="mt-1 font-mono text-xs font-medium text-slate-900 md:text-sm">{logData.statusCode}</p>
            </div>
          </div>
        </Card>

        {/* Message */}
        <Card className="p-4 md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase md:text-sm">Message</h3>
              <p className="mt-2 text-sm text-slate-900 md:text-base">{logData.message}</p>
            </div>
            <Button
              variant="outline-red"
              size="sm"
              onClick={() => copyToClipboard(logData.message, 'Message')}
              className="gap-2 self-start"
            >
              <Copy size={14} />
              {copiedSection === 'Message' ? 'Tersalin!' : 'Salin'}
            </Button>
          </div>
        </Card>

        {/* Tabs for Different Sections */}
        <Tabs defaultValue="request" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="request" className="gap-1 text-xs md:gap-2 md:text-sm">
              <Info size={16} className="hidden md:block" />
              Request
            </TabsTrigger>
            <TabsTrigger value="response" className="gap-1 text-xs md:gap-2 md:text-sm">
              <Database size={16} className="hidden md:block" />
              Response
            </TabsTrigger>
            <TabsTrigger value="metadata" className="gap-1 text-xs md:gap-2 md:text-sm">
              <Gear size={16} className="hidden md:block" />
              Metadata
            </TabsTrigger>
            <TabsTrigger value="json" className="gap-1 text-xs md:gap-2 md:text-sm">
              <Code size={16} className="hidden md:block" />
              Full JSON
            </TabsTrigger>
          </TabsList>

          {/* Request Tab */}
          <TabsContent value="request" className="space-y-4">
            {/* Request Details */}
            <Card className="p-4 md:p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase md:text-sm">
                    Request Details
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <div>
                        <p className="text-xs font-medium text-slate-500">Method</p>
                        <Badge variant="outline" className="mt-1 border-blue-200 bg-blue-50 text-xs text-blue-700">
                          {logData.method}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500">Endpoint</p>
                        <p className="mt-1 font-mono text-xs break-all text-slate-900 md:text-sm">{logData.endpoint}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500">User</p>
                        <p className="mt-1 text-xs text-slate-900 md:text-sm">{logData.user}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500">IP Address</p>
                        <p className="mt-1 font-mono text-xs text-slate-900 md:text-sm">{logData.ip}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-xs font-medium text-slate-500">User Agent</p>
                        <p className="mt-1 font-mono text-[10px] break-all text-slate-700 md:text-xs">{logData.userAgent}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline-red"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(
                      JSON.stringify(
                        {
                          method: logData.method,
                          endpoint: logData.endpoint,
                          user: logData.user,
                          ip: logData.ip,
                          userAgent: logData.userAgent
                        },
                        null,
                        2
                      ),
                      'Request Details'
                    )
                  }
                  className="gap-2 self-start"
                >
                  <Copy size={14} />
                  {copiedSection === 'Request Details' ? 'Tersalin!' : 'Salin'}
                </Button>
              </div>
            </Card>

            {/* Request Body */}
            <Card className="p-4 md:p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="flex-1 overflow-hidden">
                  <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase md:text-sm">Request Body</h3>
                  <div className="mt-4 overflow-x-auto rounded-lg bg-slate-900">
                    <pre className="p-3 text-[10px] text-slate-100 md:p-4 md:text-xs">
                      {JSON.stringify(logData.requestBody, null, 2)}
                    </pre>
                  </div>
                </div>
                <Button
                  variant="outline-red"
                  size="sm"
                  onClick={() => copyToClipboard(JSON.stringify(logData.requestBody, null, 2), 'Request Body')}
                  className="gap-2 self-start"
                >
                  <Copy size={14} />
                  {copiedSection === 'Request Body' ? 'Tersalin!' : 'Salin'}
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Response Tab */}
          <TabsContent value="response" className="space-y-4">
            <Card className="p-4 md:p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="flex-1 overflow-hidden">
                  <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase md:text-sm">Response Body</h3>
                  <div className="mt-4 overflow-x-auto rounded-lg bg-slate-900">
                    <pre className="p-3 text-[10px] text-slate-100 md:p-4 md:text-xs">
                      {JSON.stringify(logData.responseBody, null, 2)}
                    </pre>
                  </div>
                </div>
                <Button
                  variant="outline-red"
                  size="sm"
                  onClick={() => copyToClipboard(JSON.stringify(logData.responseBody, null, 2), 'Response Body')}
                  className="gap-2 self-start"
                >
                  <Copy size={14} />
                  {copiedSection === 'Response Body' ? 'Tersalin!' : 'Salin'}
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Metadata Tab */}
          <TabsContent value="metadata" className="space-y-4">
            <Card className="p-4 md:p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase md:text-sm">Metadata</h3>
                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <p className="text-xs font-medium text-slate-500">Session ID</p>
                      <p className="mt-1 font-mono text-xs break-all text-slate-900 md:text-sm">
                        {logData.metadata.sessionId}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500">Request ID</p>
                      <p className="mt-1 font-mono text-xs break-all text-slate-900 md:text-sm">
                        {logData.metadata.requestId}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500">Correlation ID</p>
                      <p className="mt-1 font-mono text-xs break-all text-slate-900 md:text-sm">
                        {logData.metadata.correlationId}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500">Environment</p>
                      <Badge variant="outline" className="mt-1 border-green-200 bg-green-50 text-xs text-green-700">
                        {logData.metadata.environment}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500">Version</p>
                      <p className="mt-1 font-mono text-xs text-slate-900 md:text-sm">{logData.metadata.version}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500">Response Time</p>
                      <p className="mt-1 font-mono text-xs text-slate-900 md:text-sm">{logData.responseTime}</p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline-red"
                  size="sm"
                  onClick={() => copyToClipboard(JSON.stringify(logData.metadata, null, 2), 'Metadata')}
                  className="gap-2 self-start"
                >
                  <Copy size={14} />
                  {copiedSection === 'Metadata' ? 'Tersalin!' : 'Salin'}
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Full JSON Tab */}
          <TabsContent value="json" className="space-y-4">
            <Card className="p-4 md:p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="flex-1 overflow-hidden">
                  <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase md:text-sm">Complete JSON</h3>
                  <div className="mt-4 max-h-[60vh] overflow-auto rounded-lg bg-slate-900">
                    <pre className="p-3 text-[10px] text-slate-100 md:p-4 md:text-xs">
                      {JSON.stringify(logData, null, 2)}
                    </pre>
                  </div>
                </div>
                <Button
                  variant="outline-red"
                  size="sm"
                  onClick={() => copyToClipboard(JSON.stringify(logData, null, 2), 'Complete JSON')}
                  className="gap-2 self-start"
                >
                  <Copy size={14} />
                  {copiedSection === 'Complete JSON' ? 'Tersalin!' : 'Salin'}
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
