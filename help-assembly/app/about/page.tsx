import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "About Help Assembly Services | Atlanta's AI-Ready Assembly Team",
  description:
    "Learn about Help Assembly Services LLC — Atlanta's first AI-ready furniture assembly company. Same-day service, certified technicians, lifetime warranty.",
}

const values = [
  { num: '01', title: 'Precision First',       desc: 'Every piece is assembled with professional-grade tools and a level. We do not cut corners.'  },
  { num: '02', title: 'Respect Your Home',      desc: 'We treat your space like our own. Shoes off, cleanup always included, zero damage guaranteed.' },
  { num: '03', title: 'Radical Transparency',   desc: 'Upfront pricing. Live GPS. No surprise charges. You know exactly what you get.'               },
  { num: '04', title: 'AI-Augmented Speed',     desc: 'Our logistics engine routes the right tech to you faster than any competitor in Atlanta.'     },
]

const stats = [
  { value: '2019',  label: 'Founded'         },
  { value: '50K+',  label: 'Jobs Completed'  },
  { value: '4.9★',  label: 'Average Rating'  },
  { value: '40+',   label: 'Technicians'     },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F0F0F3] pb-32 pt-20">

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-20 px-6">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(197,158,55,0.1) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C59E37] mb-4">Our Story</p>
          <h1 className="font-display font-bold mb-6" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
            Built for{' '}
            <span style={{
              background: 'linear-gradient(135deg, #C59E37 0%, #F2C94C 50%, #D90429 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Atlanta
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Help Assembly Services LLC was born from a simple frustration: Atlanta had world-class
            furniture stores and zero world-class assembly services. We changed that.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 max-w-4xl mx-auto pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="bg-[#F0F0F3] rounded-2xl p-6 text-center
                         shadow-[10px_10px_24px_#D1D1D4,-10px_-10px_24px_#FFFFFF]"
            >
              <div className="font-display font-bold text-3xl text-[#D90429] mb-1">{value}</div>
              <div className="text-gray-500 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="px-6 max-w-4xl mx-auto pb-20">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C59E37] mb-3">What We Stand For</p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl">Our Values</h2>
        </div>
        <div className="space-y-5">
          {values.map((v) => (
            <div
              key={v.num}
              className="bg-[#F0F0F3] rounded-2xl p-8 flex items-start gap-6
                         shadow-[12px_12px_28px_#D1D1D4,-12px_-12px_28px_#FFFFFF]"
            >
              <span className="font-display font-bold text-4xl text-[#D1D1D4] leading-none flex-shrink-0">
                {v.num}
              </span>
              <div>
                <h3 className="font-display font-bold text-xl mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
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
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">Ready to Experience the Difference?</h2>
            <p className="text-white/80 mb-8 text-lg">Same-day service, lifetime warranty.</p>
            <Link
              href="/book"
              className="inline-block bg-white text-[#D90429] font-display font-bold px-10 py-4 rounded-full text-lg
                         hover:bg-gray-100 active:scale-95 transition-all duration-200"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
