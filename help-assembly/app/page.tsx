import Hero          from '@/components/Hero'
import MarqueeStrip  from '@/components/MarqueeStrip'
import ServicesBento from '@/components/ServicesBento'
import HowItWorks    from '@/components/HowItWorks'
import ExpertTeam    from '@/components/ExpertTeam'
import AIQuote       from '@/components/AIQuote'
import Testimonials  from '@/components/Testimonials'
import FAQ           from '@/components/FAQ'
import CTAFinale     from '@/components/CTAFinale'
import StructuredData from '@/components/StructuredData'

export default function Home() {
  return (
    <>
      <StructuredData />
      <main>
        <Hero />
        <MarqueeStrip />
        <ServicesBento />
        <HowItWorks />
        <ExpertTeam />
        <AIQuote />
        <Testimonials />
        <FAQ />
        <CTAFinale />
      </main>
    </>
  )
}
