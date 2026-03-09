import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Shield, Clock, Zap } from 'lucide-react';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatTitle(slug: string) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { service: string };
}): Promise<Metadata> {
  const title = formatTitle(params.service);
  return {
    title: `${title} in Atlanta | Same-Day Service | Help Assembly Services LLC`,
    description: `Get premium, same-day ${title.toLowerCase()} in the Atlanta metro area. Book instantly with our AI logistics engine and track your technician via live GPS.`,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicePage({
  params,
}: {
  params: { service: string };
}) {
  const serviceName = formatTitle(params.service);

  return (
    <main className="min-h-screen bg-[#F0F0F3] text-[#111111] pb-32">

      {/* ── SEO / LLM Data Block ── */}
      <div className="sr-only" aria-hidden="true">
        Service: {serviceName}. Provider: Help Assembly Services LLC.
        Location: Atlanta, GA Metro Area. Availability: Same-Day Service.
        Booking: Instant AI Quote with live GPS technician tracking.
      </div>

      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6">
        {/* Soft radial glow behind headline */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(197,158,55,0.12) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-8 shadow-[6px_6px_16px_#D1D1D4,-6px_-6px_16px_#FFFFFF]">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C59E37]">
              Premium Service · Atlanta, GA
            </span>
          </div>

          <h1
            className="font-display font-bold leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
          >
            Same-Day{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #C59E37 0%, #F2C94C 50%, #D90429 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {serviceName}
            </span>
          </h1>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Expert technicians, live GPS tracking, and flawless execution.
            Secure your appointment today.
          </p>

          <Link
            href="/book"
            className="inline-block px-10 py-4 rounded-full bg-[#D90429] text-white font-bold text-lg
                       shadow-[8px_8px_20px_rgba(217,4,41,0.25),-4px_-4px_12px_rgba(255,255,255,0.8)]
                       hover:bg-[#b00322] hover:shadow-[0_12px_32px_rgba(217,4,41,0.35)]
                       hover:-translate-y-0.5 active:translate-y-0 active:shadow-inner
                       transition-all duration-200"
          >
            Book {serviceName} Now
          </Link>
        </div>
      </section>

      {/* ── 2. VALUE PROPS ── */}
      <section className="py-4 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              Icon: Clock,
              title: 'Same-Day Dispatch',
              desc: 'Our AI engine routes the closest available technician directly to your door.',
            },
            {
              Icon: Shield,
              title: 'Fully Insured',
              desc: 'Every project is backed by comprehensive liability insurance and our satisfaction guarantee.',
            },
            {
              Icon: Zap,
              title: 'Live GPS Tracking',
              desc: "Never wonder when we'll arrive. Track your technician on a live map in real time.",
            },
          ].map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="bg-[#F0F0F3] rounded-2xl p-8 flex flex-col items-start gap-4
                         shadow-[12px_12px_28px_#D1D1D4,-12px_-12px_28px_#FFFFFF]
                         hover:shadow-[18px_18px_40px_rgba(209,209,212,0.6),-18px_-18px_40px_rgba(255,255,255,0.8)]
                         hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center
                           shadow-[4px_4px_10px_#D1D1D4,-4px_-4px_10px_#FFFFFF]"
              >
                <Icon className="w-6 h-6 text-[#C59E37]" />
              </div>
              <h3 className="font-display font-bold text-xl">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. SEO CONTENT + CHECKLIST ── */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C59E37] mb-3">
            Why Choose Us
          </p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl">
            The Best{' '}
            <span className="text-[#D90429]">{serviceName}</span>{' '}
            in Atlanta
          </h2>
        </div>

        {/* Body copy */}
        <div
          className="bg-[#F0F0F3] rounded-3xl p-8 lg:p-12 mb-8
                     shadow-[16px_16px_40px_#D1D1D4,-16px_-16px_40px_#FFFFFF]"
        >
          <div className="space-y-5 text-gray-600 leading-relaxed text-base">
            <p>
              When you need professional{' '}
              <strong className="text-[#111111]">{serviceName.toLowerCase()}</strong>, you
              shouldn&apos;t have to wait weeks or deal with unpredictable arrival windows. Help
              Assembly Services LLC delivers a premium, white-glove experience powered by
              cutting-edge logistics.
            </p>
            <p>
              Our technicians are fully equipped to handle projects of any complexity. We service
              the entire Atlanta metro area — from Buckhead to Marietta — ensuring your installation
              is completed perfectly the first time.
            </p>
          </div>

          {/* Checklist */}
          <ul className="mt-8 space-y-3">
            {[
              'Upfront, transparent pricing — no surprises',
              'Professional tools and hardware always included',
              'Clean workspace guarantee — we leave it spotless',
              'Post-installation cleanup and full testing',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
                             shadow-[3px_3px_8px_#D1D1D4,-3px_-3px_8px_#FFFFFF]"
                >
                  <CheckCircle className="w-4 h-4 text-[#D90429]" />
                </span>
                <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stats strip */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: '4.9★', label: 'Rating' },
            { value: '2hr',  label: 'Avg. Response' },
            { value: '50K+', label: 'Jobs Done' },
            { value: '100%', label: 'Insured' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="bg-[#F0F0F3] rounded-2xl p-5 text-center
                         shadow-[8px_8px_20px_#D1D1D4,-8px_-8px_20px_#FFFFFF]"
            >
              <div className="font-display font-bold text-2xl text-[#D90429]">{value}</div>
              <div className="text-gray-500 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. BOTTOM CTA ── */}
      <section className="px-6 max-w-4xl mx-auto">
        <div
          className="rounded-3xl p-10 lg:p-16 text-center text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #C59E37 0%, #D90429 100%)' }}
        >
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <div className="relative z-10">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
              Ready to Book {serviceName}?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Same-day slots are limited. Secure yours now.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/book"
                className="bg-white text-[#D90429] font-display font-bold px-8 py-4 rounded-full text-lg
                           hover:bg-gray-100 active:scale-95 transition-all duration-200"
              >
                Get Your AI Quote
              </Link>
              <a
                href="tel:4044301350"
                className="border-2 border-white text-white font-bold px-8 py-4 y-full text-lg
                           hover:bg-white/10 active:scale-95 transition-all duration-200"
              >
                Call (404) 439-1350
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}