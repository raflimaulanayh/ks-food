import { DashboardLayout } from '@/components/templates/dashboard-layout'

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
