import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'All Assembly Services in Atlanta',
  description:
    'Browse all furniture assembly, TV mounting, fitness equipment, and outdoor structure services available same-day in Atlanta, GA.',
}

const services = [
  {
    slug: 'furniture-assembly',
    title: 'Furniture Assembly',
    desc: 'Wayfair, IKEA, Amazon, West Elm — beds, dressers, dining sets, and everything in between.',
    price: '$79+',
    badge: 'Most Popular',
    badgeColor: 'bg-[#D90429] text-white',
  },
  {
    slug: 'tv-mounting',
    title: 'TV Mounting',
    desc: 'Laser-level precision on drywall, brick, or concrete. Wire concealment available.',
    price: '$99+',
    badge: 'Same-Day',
    badgeColor: 'bg-[#C59E37] text-black',
  },
  {
    slug: 'ikea-assembly',
    title: 'IKEA Assembly',
    desc: 'PAX wardrobe specialists. We bring spare hardware so nothing stops us.',
    price: '$79+',
    badge: 'Certified',
    badgeColor: 'bg-[#C59E37] text-black',
  },
  {
    slug: 'peloton-installation',
    title: 'Peloton Installation',
    desc: 'Bike, Tread, and Row assembled and calibrated. Ready to ride on arrival.',
    price: '$149+',
    badge: 'Certified',
    badgeColor: 'bg-[#D90429] text-white',
  },
  {
    slug: 'fitness-equipment',
    title: 'Fitness Equipment',
    desc: 'Treadmills, ellipticals, and full home gyms assembled exactly where you need them.',
    price: '$129+',
    badge: null,
    badgeColor: '',
  },
  {
    slug: 'outdoor-structures',
    title: 'Outdoor Structures',
    desc: 'Gazebos, pergolas, and playsets built safely and securely in your backyard.',
    price: '$149+',
    badge: null,
    badgeColor: '',
  },
  {
    slug: 'robotics-and-ai',
    title: 'Robotics & AI Devices',
    desc: 'Smart home robots, vacuum ecosystems, and AI devices deployed and integrated.',
    price: '$129+',
    badge: 'AI-Ready',
    badgeColor: 'bg-[#C59E37] text-black',
  },
  {
    slug: 'office-furniture',
    title: 'Office Furniture',
    desc: 'Standing desks, ergonomic chairs, shelving, and full office buildouts.',
    price: '$89+',
    badge: null,
    badgeColor: '',
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#F0F0F3] pb-32 pt-20">

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-16 px-6 text-center">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(197,158,55,0.1) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C59E37] mb-4">
            Atlanta Metro Area
          </p>
          <h1 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            All Assembly Services
          </h1>
          <p className="text-gray-500 text-lg">
            Same-day availability across all services. Certified technicians, lifetime workmanship warranty.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((svc) => (
            <Link
              key={svc.slug}
              href={`/services/${svc.slug}`}
              className="group bg-[#F0F0F3] rounded-2xl p-6
                         shadow-[12px_12px_28px_#D1D1D4,-12px_-12px_28px_#FFFFFF]
                         hover:shadow-[18px_18px_40px_rgba(209,209,212,0.6),-18px_-18px_40px_rgba(255,255,255,0.8)]
                         hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {svc.badge && (
                <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full mb-4 ${svc.badgeColor}`}>
                  {svc.badge}
                </span>
              )}
              {!svc.badge && <div className="h-7 mb-4" />}

              <h2 className="font-display font-bold text-xl mb-2 group-hover:text-[#D90429] transition-colors">
                {svc.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{svc.desc}</p>

              <div className="flex items-center justify-between mt-auto">
                <span className="font-display font-bold text-lg text-[#D90429]">{svc.price}</span>
                <span className="text-[#D90429] group-hover:translate-x-1 transition-transform duration-200">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 max-w-4xl mx-auto mt-20">
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
              Not Sure What You Need?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Describe your items and our AI will quote you instantly.
            </p>
            <Link
              href="/book"
              className="inline-block bg-white text-[#D90429] font-display font-bold px-10 py-4 rounded-full text-lg
                         hover:bg-gray-100 active:scale-95 transition-all duration-200"
            >
              Get an AI Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
