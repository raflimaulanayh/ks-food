'use client'

import { useRouter } from 'next/navigation'
import { TbFaceIdError } from 'react-icons/tb'
import { useNetworkState } from 'react-use'

import { Button } from '@/components/atoms/ui/button'
import { Container } from '@/components/templates/container'
import { GeneralLayout } from '@/components/templates/general-layout'

const MAX_RETRY = 3

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const network = useNetworkState()
  const router = useRouter()

  const getRetryCount = () => {
    if (typeof window === 'undefined') return 0
    const stored = sessionStorage.getItem('error-retry-count')

    return stored ? Number(stored) : 0
  }

  const retryCount = getRetryCount()

  const handleReset = () => {
    const currentCount = getRetryCount()

    if (currentCount + 1 >= MAX_RETRY) {
      sessionStorage.removeItem('error-retry-count')
      router.push('/')
    } else {
      sessionStorage.setItem('error-retry-count', (currentCount + 1).toString())
      router.refresh()
    }

    setTimeout(() => {
      reset()
    }, 2000)
  }

  return (
    <GeneralLayout className="grid min-h-screen place-items-center bg-white py-16 lg:py-40">
      <Container className="flex max-w-3xl! flex-col items-center gap-6 text-center lg:gap-8">
        <header className="flex flex-col items-center gap-y-3 lg:gap-y-5">
          <TbFaceIdError size={200} className="h-28 w-64 text-secondary" />
          <h1 className="text-xl font-semibold tracking-tight text-balance text-slate-900 sm:text-4xl">Terjadi Kesalahan</h1>
          {!network.online ? (
            <p className="text-sm font-medium text-pretty text-slate-600 sm:text-base">
              We apologize, an unexpected error has occurred in the system. Please try again in a few moments or contact our
              support service if you need further assistance.
            </p>
          ) : (
            <p className="text-sm text-pretty text-slate-600 sm:text-base">
              We apologize for the unexpected error in the system. Please try again in a few moments or contact our support
              service if you need further assistance.
            </p>
          )}

          {process.env.NODE_ENV === 'development' && (
            <details className="mb-6">
              <summary className="cursor-pointer text-sm text-slate-600 transition-colors hover:text-foreground">
                Detail Error (Development)
              </summary>
              <pre className="mt-2 overflow-auto rounded bg-slate-100 p-3 text-xs text-wrap text-slate-600 hover:bg-slate-200 hover:text-slate-800">
                {error.message}
              </pre>
            </details>
          )}
        </header>

        <div className="flex items-center justify-center gap-4">
          <Button variant="secondary" onClick={handleReset} size="lg">
            {retryCount + 1 >= MAX_RETRY ? 'Back' : 'Try Again'}
          </Button>
          <Button size="lg" url="mailto:info@ksfood.id" variant="outline-red" external>
            Contact Support
          </Button>
        </div>
      </Container>
    </GeneralLayout>
  )
}
