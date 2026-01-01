'use client'

import { CUSTOMER_USERS, INTERNAL_USERS } from '@/data/mock-admin'
import { PencilSimple, Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/atoms/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState('internal')

  const handleEdit = (id: string, type: 'internal' | 'customer') => {
    toast.info(`Edit ${type} user: ${id}`)
  }

  const handleDelete = (id: string, type: 'internal' | 'customer') => {
    toast.success(`User ${id} deleted`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manajemen Pengguna</h1>
        <p className="mt-1 text-sm text-slate-500">Kelola akses staf internal dan pelanggan</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="internal">Staf Internal</TabsTrigger>
          <TabsTrigger value="customer">Pelanggan</TabsTrigger>
        </TabsList>

        {/* Internal Staff Tab */}
        <TabsContent value="internal" className="mt-6">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-600 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-600 uppercase">Nama</th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-600 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-600 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-600 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-600 uppercase">
                      Join Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-slate-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {INTERNAL_USERS.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-slate-900">{user.id}</td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600">{user.email}</td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600">{user.joinDate}</td>
                      <td className="px-6 py-4 text-right text-sm whitespace-nowrap">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(user.id, 'internal')}
                            className="h-8 w-8 p-0"
                          >
                            <PencilSimple className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(user.id, 'internal')}
                            className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Customer Tab */}
        <TabsContent value="customer" className="mt-6">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-600 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-600 uppercase">Nama</th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-600 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-600 uppercase">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-600 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-600 uppercase">
                      Join Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-slate-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {CUSTOMER_USERS.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-slate-900">{user.id}</td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600">{user.email}</td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600">{user.company}</td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600">{user.joinDate}</td>
                      <td className="px-6 py-4 text-right text-sm whitespace-nowrap">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(user.id, 'customer')}
                            className="h-8 w-8 p-0"
                          >
                            <PencilSimple className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(user.id, 'customer')}
                            className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
