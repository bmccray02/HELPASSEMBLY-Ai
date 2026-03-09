'use client'

import { useState } from 'react'
import Link from 'next/link'

const serviceLinks = [
  { label: 'Furniture Assembly', href: '/services/furniture-assembly' },
  { label: 'TV Mounting',        href: '/services/tv-mounting'        },
  { label: 'IKEA Assembly',      href: '/services/ikea-assembly'      },
  { label: 'Peloton Installation',href: '/services/peloton-installation'},
  { label: 'Robotics & AI',      href: '/services/robotics-and-ai'   },
  { label: 'Outdoor Structures', href: '/services/outdoor-structures' },
]

const locationLinks = [
  { label: 'Buckhead',      href: '/locations/buckhead'      },
  { label: 'Midtown',       href: '/locations/midtown'       },
  { label: 'Decatur',       href: '/locations/decatur'       },
  { label: 'Sandy Springs', href: '/locations/sandy-springs' },
  { label: 'Alpharetta',    href: '/locations/alpharetta'    },
  { label: 'All Locations', href: '/locations'               },
]

const companyLinks = [
  { label: 'About',   href: '/about'   },
  { label: 'Contact', href: '/contact' },
  { label: 'Book Now',href: '/book'    },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="bg-[#111111] text-white py-16 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">

          {/* Brand — spans 2 cols on large */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-display font-bold text-2xl tracking-tight block mb-4">
              HELP ASSEMBLY
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Atlanta&apos;s #1 AI-ready furniture assembly service. Certified technicians,
              same-day service, lifetime warranty.
            </p>
            <div className="flex gap-3">
              {['📞', '✉️', '📍'].map((icon, i) => (
                <a
                  key={i}
                  href={i === 0 ? 'tel:4045550123' : i === 1 ? 'mailto:hello@helpassembly.com' : '/locations'}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#D90429] transition-colors
                             flex items-center justify-center text-sm"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-sm mb-5 text-white/70 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-white/45 text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-display font-bold text-sm mb-5 text-white/70 uppercase tracking-wider">
              Locations
            </h4>
            <ul className="space-y-2.5">
              {locationLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-white/45 text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Company */}
          <div>
            <h4 className="font-display font-bold text-sm mb-5 text-white/70 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5 mb-8">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-white/45 text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-display font-bold text-sm mb-3 text-white/70 uppercase tracking-wider">
              Newsletter
            </h4>
            {subscribed ? (
              <p className="text-green-400 text-sm font-semibold">✓ Subscribed!</p>
            ) : (
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-white/10 border border-white/15
                             text-white placeholder:text-white/25 text-sm focus:outline-none
                             focus:ring-1 focus:ring-[#D90429]"
                />
                <button
                  onClick={() => email && setSubscribed(true)}
                  className="bg-[#D90429] text-white py-2.5 rounded-xl font-semibold text-sm
                             hover:bg-[#b00322] transition-colors active:scale-95"
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">© 2026 Help Assembly Services LLC. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Sitemap'].map((l) => (
              <Link key={l} href="#" className="text-white/30 text-sm hover:text-white transition-colors">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
