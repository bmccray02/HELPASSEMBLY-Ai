import Link from 'next/link'

const stats = [
  { value: '4.9', label: '★ Rating' },
  { value: '50K+', label: 'Customers' },
  { value: '2hr', label: 'Avg Response' },
  { value: 'Lifetime', label: 'Warranty' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden
                 bg-gradient-to-br from-ha-black via-[#1a0008] to-ha-red"
    >
      {/* Animated background orb */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[150%] h-[150%] -top-1/4 -left-1/4 animate-breathe"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(197,158,55,0.25) 0%, transparent 55%)',
          }}
        />
        <div
          className="absolute w-[100%] h-[100%] top-1/4 right-0 animate-float"
          style={{
            background:
              'radial-gradient(circle at 70% 60%, rgba(217,4,41,0.15) 0%, transparent 50%)',
            animationDelay: '2s',
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-32 pt-40">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20
                        rounded-full px-4 py-2 text-white/80 text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Atlanta&apos;s First AI-Ready Assembly Force
        </div>

        <h1
          className="font-display font-bold leading-[1.0] mb-6"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
        >
          <span className="text-gradient-hero">Atlanta&apos;s First</span>
          <br />
          <span className="text-white">AI-Ready</span>
          <br />
          <span className="text-gradient-hero">Assembly Force</span>
        </h1>

        <p className="text-white/70 text-lg lg:text-xl max-w-2xl mb-12 leading-relaxed">
          Certified technicians. Same-day service. Robotics deployment.
          <br />
          <span className="text-ha-yellow font-semibold">Guaranteed.</span>
        </p>

        <div className="flex flex-wrap gap-4 mb-16">
          <Link
            href="#ai-quote"
            className="bg-ha-red text-white px-8 py-4 rounded-full font-semibold text-lg
                       hover:bg-[#b00322] hover:shadow-glow-red transition-all duration-300
                       active:scale-95"
          >
            Get AI Quote
          </Link>
          <Link
            href="#how-it-works"
            className="bg-white/10 backdrop-blur-sm border border-white/30 text-white
                       px-8 py-4 rounded-full font-semibold text-lg
                       hover:bg-white/20 transition-all duration-300 active:scale-95"
          >
            Book by Voice
          </Link>
        </div>

        <div className="flex flex-wrap gap-10 lg:gap-16">
          {stats.map((s) => (
            <div key={s.label} className="text-white">
              <div className="font-display font-bold text-3xl lg:text-4xl text-ha-yellow">
                {s.value}
              </div>
              <div className="text-white/60 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
