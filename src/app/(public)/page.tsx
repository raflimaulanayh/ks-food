import { Certifications } from '@/components/organisms/home/certifications/certifications'
import { CtaSplit } from '@/components/organisms/home/cta-split'
import { HeroSection } from '@/components/organisms/home/hero-section'
import { LatestArticles } from '@/components/organisms/home/latest-articles/latest-articles'
import { ProductHighlights } from '@/components/organisms/home/product-highlights'
import { Testimonials } from '@/components/organisms/home/testimonial'
import { TrustedBy } from '@/components/organisms/home/trusted-by'
import { ValueProposition } from '@/components/organisms/home/value-proposition'

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedBy />
      <ProductHighlights />
      <ValueProposition />
      <Certifications />
      <LatestArticles />
      <Testimonials />
      <CtaSplit />
    </>
  )
}
