import { GeneralLayout } from '@/components/templates/general-layout'

export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <GeneralLayout>{children}</GeneralLayout>
}
