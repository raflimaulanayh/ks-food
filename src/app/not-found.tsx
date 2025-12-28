'use client'

import { TbError404 } from 'react-icons/tb'

import { Button } from '@/components/atoms/ui/button'
import { Container } from '@/components/templates/container'
import { GeneralLayout } from '@/components/templates/general-layout'

export default function NotFound() {
  return (
    <GeneralLayout className="grid min-h-[90vh] place-items-center bg-white py-16 lg:py-40">
      <Container className="flex max-w-3xl! flex-col items-center gap-6 text-center lg:gap-8">
        <header className="flex flex-col items-center gap-y-3 lg:gap-y-5">
          <TbError404 size={200} className="h-28 w-64 text-secondary" />
          <h1 className="text-xl font-semibold tracking-tight text-balance text-slate-900 sm:text-4xl">
            Sorry, Page Not Found
          </h1>
          <p className="text-sm text-pretty text-slate-600 sm:text-base">
            The page you are looking for is not available or has been moved. Please return to the main page or contact our
            support team for further assistance.
          </p>
        </header>

        <div className="flex items-center justify-center gap-4">
          <Button variant="secondary" size="lg" url="/">
            Back to Home
          </Button>
          <Button size="lg" url="mailto:info@ksfood.id" external variant="outline-red">
            Contact Support
          </Button>
        </div>
      </Container>
    </GeneralLayout>
  )
}
