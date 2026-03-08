import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Star, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCityName(slug: string) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>
}): Promise<Metadata> {
  const { location } = await params
  const city = formatCityName(location)
  return {
    title: `Same-Day Furniture Assembly & TV Mounting in ${city}, GA`,
    description: `Need furniture assembly or TV mounting in ${city}? Help Assembly Services LLC offers premium, same-day installation with live GPS tracking. Get an instant quote.`,
  }
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  { slug: 'furniture-assembly', title: 'Furniture Assembly', desc: 'Wayfair, IKEA, Amazon, West Elm — all brands and sizes.' },
  { slug: 'tv-mounting',        title: 'TV Mounting',        desc: 'Laser-level precision. Wire concealment available.' },
  { slug: 'outdoor-structures', title: 'Outdoor Structures', desc: 'Gazebos, pergolas, and playsets built safely.' },
  { slug: 'fitness-equipment',  title: 'Fitness Equipment',  desc: 'Treadmills, ellipticals, and home gyms.' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function LocationPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params
  const city = formatCityName(location)

  return (
    <main className="min-h-screen bg-[#F0F0F3] pb-32 pt-20">

      {/* SEO / LLM data block */}
      <div className="sr-only" aria-hidden="true">
        Service Area: {city}, Georgia. Provider: Help Assembly Services LLC.
        Services in {city}: Furniture Assembly, TV Mounting, Gazebo Installation, Fitness Equipment Assembly.
        Availability: Same-Day Dispatch with AI-routed technicians and live GPS tracking to {city}.
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-16 pb-24 px-6">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(197,158,55,0.12) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#F0F0F3] rounded-full px-4 py-2 mb-8
                          shadow-[6px_6px_16px_#D1D1D4,-6px_-6px_16px_#FFFFFF]">
            <MapPin className="w-4 h-4 text-[#D90429]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C59E37]">
              Serving {city}, GA
            </span>
          </div>

          <h1 className="font-display font-bold leading-tight mb-6" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
            Assembly Services in{' '}
            <span style={{
              background: 'linear-gradient(135deg, #C59E37 0%, #F2C94C 50%, #D90429 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {city}
            </span>
          </h1>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            From IKEA builds to TV mounting, our expert technicians are dispatched daily
            to {city} for same-day service.
          </p>

          <Link
            href="/book"
            className="inline-block px-10 py-4 rounded-full bg-[#D90429] text-white font-bold text-lg
                       shadow-[8px_8px_20px_rgba(217,4,41,0.25),-4px_-4px_12px_rgba(255,255,255,0.8)]
                       hover:bg-[#b00322] hover:shadow-[0_12px_32px_rgba(217,4,41,0.35)]
                       hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Get an Instant Quote for {city}
          </Link>
        </div>
      </section>

      {/* ── Value Props ── */}
      <section className="pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { Icon: Zap,    title: `Fast ${city} Dispatch`,  desc: `Our logistics engine routes the closest available technician to your ${city} address instantly.` },
            { Icon: Shield, title: 'Trusted & Insured',      desc: `Every project in ${city} is fully insured and backed by our satisfaction guarantee.` },
            { Icon: Star,   title: '5-Star Local Service',   desc: 'Join hundreds of satisfied homeowners across the Atlanta metro who trust our expertise.' },
          ].map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="bg-[#F0F0F3] rounded-2xl p-8 flex flex-col gap-4
                         shadow-[12px_12px_28px_#D1D1D4,-12px_-12px_28px_#FFFFFF]
                         hover:shadow-[18px_18px_40px_rgba(209,209,212,0.6),-18px_-18px_40px_rgba(255,255,255,0.8)]
                         hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center
                              shadow-[4px_4px_10px_#D1D1D4,-4px_-4px_10px_#FFFFFF] bg-[#F0F0F3]">
                <Icon className="w-6 h-6 text-[#C59E37]" />
              </div>
              <h3 className="font-display font-bold text-xl">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Local Services ── */}
      <section className="py-8 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C59E37] mb-3">What We Do</p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl">
            What we install in <span className="text-[#D90429]">{city}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc) => (
            <Link
              key={svc.slug}
              href={`/services/${svc.slug}`}
              className="group bg-[#F0F0F3] rounded-2xl p-8 flex items-start gap-5
                         shadow-[12px_12px_28px_#D1D1D4,-12px_-12px_28px_#FFFFFF]
                         hover:shadow-[18px_18px_40px_rgba(209,209,212,0.6),-18px_-18px_40px_rgba(255,255,255,0.8)]
                         hover:-translate-y-1 transition-all duration-300"
            >
              <span className="mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                               shadow-[3px_3px_8px_#D1D1D4,-3px_-3px_8px_#FFFFFF] bg-[#F0F0F3]">
                <CheckCircle className="w-4 h-4 text-[#D90429]" />
              </span>
              <div className="flex-1">
                <h3 className="font-display font-bold text-xl mb-1 group-hover:text-[#D90429] transition-colors">
                  {svc.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{svc.desc}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#D90429] flex-shrink-0 self-center
                                     group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="px-6 max-w-4xl mx-auto">
        <div
          className="rounded-3xl p-10 lg:p-16 text-center text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #C59E37 0%, #D90429 100%)' }}
        >
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <div className="relative z-10">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
              Ready for Same-Day Service in {city}?
            </h2>
            <p className="text-white/80 mb-8 text-lg">Slots fill fast. Book your spot now.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/book"
                className="bg-white text-[#D90429] font-display font-bold px-8 py-4 rounded-full text-lg
                           hover:bg-gray-100 active:scale-95 transition-all duration-200"
              >
                Get Your AI Quote
              </Link>
              <a
                href="tel:4045550123"
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-full text-lg
                           hover:bg-white/10 active:scale-95 transition-all duration-200"
              >
                Call (404) 555-0123
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
