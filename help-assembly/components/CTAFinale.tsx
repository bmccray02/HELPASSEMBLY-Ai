import Link from 'next/link'

export default function CTAFinale() {
  return (
    <section
      id="cta-finale"
      className="min-h-[80vh] flex items-center justify-center text-center text-white px-6"
      style={{ background: 'linear-gradient(45deg, #C59E37, #D90429)' }}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display font-bold mb-8 leading-tight"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
        >
          Ready to Experience the Future of Assembly?
        </h2>

        <div className="text-2xl mb-10 animate-pulse">⏳ Same-day slots filling fast</div>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Link
            href="#ai-quote"
            className="bg-white text-ha-red font-display font-bold text-lg px-10 py-5
                       rounded-full hover:bg-gray-100 transition-colors active:scale-95"
          >
            Get Your AI Quote Now
          </Link>
          <a
            href="tel:4045550123"
            className="border-2 border-white text-white font-display font-bold text-lg px-10 py-5
                       rounded-full hover:bg-white/10 transition-colors active:scale-95"
          >
            Call (404) 555-0123
          </a>
        </div>

        <p className="text-white/80 text-lg">👥 27 people booked today</p>
      </div>
    </section>
  )
}
