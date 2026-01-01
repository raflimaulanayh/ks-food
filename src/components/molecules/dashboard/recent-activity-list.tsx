'use client'

import { ActivityLog } from '@/data/mock-dashboard'
import { CheckCircle, Info, Warning } from '@phosphor-icons/react'

interface RecentActivityListProps {
  activities: ActivityLog[]
  title?: string
}

export const RecentActivityList = ({ activities, title = 'Recent Activity' }: RecentActivityListProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-4">
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      </div>
      <div className="divide-y divide-slate-100">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-slate-50">
            <div className="mt-1 shrink-0">
              {activity.type === 'alert' && <Warning size={20} weight="fill" className="text-red-500" />}
              {activity.type === 'info' && <Info size={20} weight="fill" className="text-blue-500" />}
              {activity.type === 'success' && <CheckCircle size={20} weight="fill" className="text-green-500" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">{activity.message}</p>
              <p className="mt-1 text-xs text-slate-500">{activity.time}</p>
            </div>
          </div>
        ))}
        {activities.length === 0 && <div className="p-6 text-center text-sm text-slate-500">No recent activity.</div>}
      </div>
    </div>
  )
}
