'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Services',     href: '/services'  },
  { label: 'Locations',    href: '/locations' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'About',        href: '/about'     },
  { label: 'Contact',      href: '/contact'   },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobile]   = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobile(false) }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.replace('/#', '/'))

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'bg-[#F0F0F3]/90 backdrop-blur-md border-b border-[#D1D1D4] shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="font-display font-bold text-xl tracking-tight text-[#111111] shrink-0">
            HELP ASSEMBLY
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(href)
                    ? 'bg-[#D90429] text-white shadow-[0_4px_12px_rgba(217,4,41,0.25)]'
                    : 'text-[#111111]/70 hover:text-[#111111] hover:bg-white/60'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/book"
              className="hidden sm:inline-block bg-[#D90429] text-white px-5 py-2.5 rounded-full
                         font-semibold text-sm shadow-[6px_6px_16px_rgba(217,4,41,0.2),-2px_-2px_8px_rgba(255,255,255,0.8)]
                         hover:bg-[#b00322] hover:shadow-[0_8px_24px_rgba(217,4,41,0.35)]
                         active:scale-95 transition-all duration-200"
            >
              Book Now
            </Link>
            <button
              onClick={() => setMobile(!mobileOpen)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center
                         shadow-[4px_4px_10px_#D1D1D4,-4px_-4px_10px_#FFFFFF]
                         bg-[#F0F0F3] transition-all active:shadow-[inset_3px_3px_6px_#D1D1D4,inset_-3px_-3px_6px_#FFFFFF]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#D1D1D4] bg-[#F0F0F3] px-6 py-4 flex flex-col gap-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(href)
                    ? 'bg-[#D90429] text-white'
                    : 'text-[#111111]/70 hover:bg-white/60 hover:text-[#111111]'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/book"
              className="mt-2 bg-[#D90429] text-white px-4 py-3 rounded-xl font-semibold text-sm text-center"
            >
              Book Now
            </Link>
          </div>
        )}
      </nav>
    </>
  )
}
