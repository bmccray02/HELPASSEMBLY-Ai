import type { Metadata } from 'next'
import { Inter, Space_Grotesk, Playfair_Display } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import Navbar from '@/components/Navbar'
import VoiceOrb from '@/components/VoiceOrb'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk', weight: ['500', '700'], display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', weight: ['700'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://helpassembly.com'),
  title: {
    default: "Help Assembly Services | Atlanta's #1 AI-Ready Furniture Assembly",
    template: '%s | Help Assembly Services',
  },
  description: "Atlanta's first AI-ready furniture assembly service. Certified technicians for Amazon, IKEA, Wayfair, Peloton & robotics. Same-day service, lifetime warranty.",
  keywords: 'furniture assembly Atlanta, AI-ready technicians, same-day assembly, IKEA assembly Atlanta, Amazon assembly, Peloton installation, robotics deployment',
  robots: { index: true, follow: true },
  openGraph: {
    title: "Atlanta's #1 AI-Ready Furniture Assembly Service",
    description: 'Same-day assembly by certified AI-ready technicians. Book by voice. Lifetime warranty.',
    type: 'website',
    url: 'https://helpassembly.com',
    locale: 'en_US',
    siteName: 'Help Assembly Services',
  },
  twitter: { card: 'summary_large_image', title: "Atlanta's First AI-Ready Assembly Service", description: 'Book furniture assembly by voice. Same-day service guaranteed.' },
  alternates: { canonical: 'https://helpassembly.com' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${playfair.variable}`}>
      <body>
        <Navbar />
        <VoiceOrb />
        {children}
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
