import { AboutHero, CompanyMilestones, CompanyStory, OurValues, VisionMission } from '@/components/organisms/about'
import { Certifications } from '@/components/organisms/home/certifications/certifications'
import { CtaSplit } from '@/components/organisms/home/cta-split'

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyStory />
      <CompanyMilestones />
      <VisionMission />
      <OurValues />
      <Certifications />
      <CtaSplit />
    </>
  )
}
