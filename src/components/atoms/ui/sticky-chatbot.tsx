'use client'

import { cn } from '@/shared/utils'
import { ChatCircleDots } from '@phosphor-icons/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const StickyChatbot = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 100px
      setShow(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Link
      href="/chatbot"
      className={cn(
        'fixed right-6 bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-20 opacity-0'
      )}
      aria-label="Open AI Assistant"
    >
      <ChatCircleDots weight="fill" className="size-8" />

      {/* Pulse Effect */}
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-20"></span>

      {/* Badge Notification */}
      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
        1
      </span>
    </Link>
  )
}
