import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Service Locations — Atlanta Metro Area',
  description:
    'Help Assembly Services LLC covers all of metro Atlanta. Find same-day furniture assembly and TV mounting in Buckhead, Midtown, Decatur, Sandy Springs, Alpharetta, and more.',
}

const locations = [
  { slug: 'buckhead',      name: 'Buckhead',      zip: '30305' },
  { slug: 'midtown',       name: 'Midtown',        zip: '30308' },
  { slug: 'decatur',       name: 'Decatur',        zip: '30030' },
  { slug: 'sandy-springs', name: 'Sandy Springs',  zip: '30328' },
  { slug: 'alpharetta',    name: 'Alpharetta',     zip: '30009' },
  { slug: 'marietta',      name: 'Marietta',       zip: '30060' },
  { slug: 'roswell',       name: 'Roswell',        zip: '30075' },
  { slug: 'johns-creek',   name: 'Johns Creek',    zip: '30097' },
  { slug: 'smyrna',        name: 'Smyrna',         zip: '30080' },
  { slug: 'dunwoody',      name: 'Dunwoody',       zip: '30338' },
  { slug: 'peachtree-city',name: 'Peachtree City', zip: '30269' },
  { slug: 'cumming',       name: 'Cumming',        zip: '30040' },
]

export default function LocationsPage() {
  return (
    <main className="min-h-screen bg-[#F0F0F3] pb-32 pt-20">

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-16 px-6 text-center">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(197,158,55,0.1) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#F0F0F3] rounded-full px-4 py-2 mb-6
                          shadow-[6px_6px_16px_#D1D1D4,-6px_-6px_16px_#FFFFFF]">
            <MapPin className="w-4 h-4 text-[#D90429]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C59E37]">
              35-Mile Radius · Atlanta, GA
            </span>
          </div>
          <h1 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Our Service Areas
          </h1>
          <p className="text-gray-500 text-lg">
            Same-day assembly coverage across the entire Atlanta metro. If your zip is within 35 miles
            of downtown, we come to you.
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="group bg-[#F0F0F3] rounded-2xl p-6
                         shadow-[10px_10px_24px_#D1D1D4,-10px_-10px_24px_#FFFFFF]
                         hover:shadow-[16px_16px_36px_rgba(209,209,212,0.6),-16px_-16px_36px_rgba(255,255,255,0.8)]
                         hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin className="w-4 h-4 text-[#D90429]" />
                    <span className="text-xs text-gray-400">{loc.zip}</span>
                  </div>
                  <h2 className="font-display font-bold text-lg group-hover:text-[#D90429] transition-colors">
                    {loc.name}
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">Atlanta Metro, GA</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#D90429] mt-1 flex-shrink-0
                                       group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          ))}
        </div>

        {/* Not listed note */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm">
            Don&apos;t see your city?{' '}
            <a href="tel:4045550123" className="text-[#D90429] font-semibold hover:underline">
              Call (404) 555-0123
            </a>{' '}
            — we likely cover your area.
          </p>
        </div>
      </section>
    </main>
  )
}
