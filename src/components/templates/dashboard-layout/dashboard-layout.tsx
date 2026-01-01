'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, useState } from 'react'

import { useIsHydrated } from '@/hooks/useIsHydrated'
import { useSplashStore } from '@/hooks/useSplashStore'

import { InternalNavbar } from '@/components/organisms/navbar/internal-navbar'
import { Sidebar } from '@/components/organisms/sidebar'
import { Container } from '@/components/templates/container'

import { cn } from '@/utils/cn'

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
}

export const DashboardLayout = ({ children, className }: DashboardLayoutProps) => {
  const isDone = useSplashStore((s) => s.isDone)
  const isHydrated = useIsHydrated()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (!isDone || !isHydrated) return null

  return (
    <Fragment>
      <div className="flex h-screen w-full overflow-hidden bg-slate-50">
        {/* Sidebar - Desktop */}
        <Sidebar className="hidden md:flex" />

        {/* Sidebar - Mobile Drawer */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                onClick={() => setIsSidebarOpen(false)}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 z-50 h-full w-64 md:hidden"
              >
                <Sidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <InternalNavbar onMenuClick={() => setIsSidebarOpen(true)} />
          <main className={cn('scrollbar-hide flex-1 overflow-y-auto py-6 pb-20', className)}>
            <Container>{children}</Container>
          </main>
        </div>
      </div>
    </Fragment>
  )
}
