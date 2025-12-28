'use client'

import { HeadsetIcon } from '@phosphor-icons/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MdArrowRight } from 'react-icons/md'

import { cn } from '@/utils/cn'

export const StickyChatbot = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      const footerElement = document.querySelector('footer')
      const windowHeight = window.innerHeight
      const documentHeight = document.body.scrollHeight

      if (footerElement) {
        const footerOffset = footerElement.offsetTop
        const scrollPosition = offset + windowHeight

        setShow(scrollPosition < documentHeight - 100 && offset > 1 && scrollPosition < footerOffset)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Link
      tabIndex={0}
      aria-label="Sticky Chatbot Button"
      href="/chatbot"
      className={cn(
        show ? 'right-4 lg:right-9' : '-right-full',
        'fixed bottom-4 z-40 flex items-center gap-2 transition-all duration-1000 ease-in-out hover:scale-90 hover:opacity-90 lg:bottom-7'
      )}
    >
      <div className="relative hidden rounded-full bg-teal-100 px-2.5 py-1 text-sm font-medium text-teal-700 lg:block">
        <span>Live Chat</span>
        <MdArrowRight size={35} className="absolute -top-[3px] -right-4 text-teal-100" />
      </div>

      <div className="relative rounded-full bg-teal-300/20 p-4">
        <div className="absolute inline-flex h-[52px] w-[52px] animate-ping rounded-full bg-teal-500" />
        <div className="relative z-10 rounded-full border-teal-600 bg-secondary p-2 text-white shadow-sm">
          <HeadsetIcon size={37} className="h-9 w-9" />
        </div>
      </div>
    </Link>
  )
}
