'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

const serviceOptions = [
  'Furniture Assembly',
  'TV Mounting',
  'IKEA Assembly',
  'Peloton Installation',
  'Fitness Equipment',
  'Outdoor Structures',
  'Robotics & AI Devices',
  'Office Furniture',
  'Other',
]

const urgencyOptions = [
  { label: 'Flexible (any day)', multiplier: 1.0 },
  { label: 'This week',          multiplier: 1.0 },
  { label: 'Tomorrow',           multiplier: 1.1 },
  { label: 'Today',              multiplier: 1.2 },
  { label: 'Right now!',         multiplier: 1.35 },
]

const basePrices: Record<string, [number, number]> = {
  'Furniture Assembly':    [79, 149],
  'TV Mounting':           [99, 179],
  'IKEA Assembly':         [79, 149],
  'Peloton Installation':  [149, 199],
  'Fitness Equipment':     [129, 249],
  'Outdoor Structures':    [149, 399],
  'Robotics & AI Devices': [129, 299],
  'Office Furniture':      [89, 199],
  'Other':                 [79, 199],
}

export default function BookPage() {
  const [service,  setService]  = useState('')
  const [items,    setItems]    = useState('')
  const [urgency,  setUrgency]  = useState(1)
  const [name,     setName]     = useState('')
  const [phone,    setPhone]    = useState('')
  const [zip,      setZip]      = useState('')
  const [submitted, setSubmitted] = useState(false)

  const base = basePrices[service] ?? [79, 199]
  const mult = urgencyOptions[urgency].multiplier
  const low  = Math.round(base[0] * mult)
  const high = Math.round(base[1] * mult)
  const hasEstimate = !!service

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#F0F0F3] flex items-center justify-center px-6 pt-20">
        <div className="bg-[#F0F0F3] rounded-3xl p-12 text-center max-w-md w-full
                        shadow-[20px_20px_60px_#D1D1D4,-20px_-20px_60px_#FFFFFF]">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="font-display font-bold text-2xl mb-3">You&apos;re all set, {name}!</h2>
          <p className="text-gray-500 mb-2">
            We received your request for <strong>{service}</strong>.
          </p>
          <p className="text-gray-500 text-sm">
            Expect a confirmation call to <strong>{phone}</strong> within 15 minutes.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F0F0F3] pb-32 pt-20">

      {/* Hero */}
      <section className="pt-16 pb-12 px-6 text-center max-w-3xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#C59E37] mb-4">Instant AI Quote</p>
        <h1 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
          Book Your{' '}
          <span style={{
            background: 'linear-gradient(135deg, #C59E37 0%, #F2C94C 50%, #D90429 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Assembly
          </span>
        </h1>
        <p className="text-gray-500 text-lg">Fill in a few details and get your instant price estimate.</p>
      </section>

      {/* Form */}
      <section className="px-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="bg-[#F0F0F3] rounded-3xl p-8 lg:p-10 space-y-6
                          shadow-[20px_20px_60px_#D1D1D4,-20px_-20px_60px_#FFFFFF]">

            {/* Service */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-[#C59E37] mb-2">
                Service Type
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-[#F0F0F3] border-0 text-[#111111] text-sm
                           shadow-[inset_4px_4px_8px_#D1D1D4,inset_-4px_-4px_8px_#FFFFFF]
                           focus:outline-none focus:ring-2 focus:ring-[#D90429]/30"
              >
                <option value="">Select a service…</option>
                {serviceOptions.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-[#C59E37] mb-2">
                Describe Your Items
              </label>
              <textarea
                value={items}
                onChange={(e) => setItems(e.target.value)}
                placeholder="e.g. IKEA KALLAX 4x4 shelf, 1 queen bed frame, 2 nightstands…"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-[#F0F0F3] border-0 text-[#111111] text-sm resize-none
                           shadow-[inset_4px_4px_8px_#D1D1D4,inset_-4px_-4px_8px_#FFFFFF]
                           focus:outline-none focus:ring-2 focus:ring-[#D90429]/30"
              />
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-[#C59E37] mb-3">
                Urgency: <span className="normal-case text-[#111111] font-bold">{urgencyOptions[urgency].label}</span>
              </label>
              <input
                type="range"
                min={0}
                max={4}
                value={urgency}
                onChange={(e) => setUrgency(Number(e.target.value))}
                className="w-full accent-[#D90429]"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>Flexible</span>
                <span>Right Now</span>
              </div>
            </div>

            {/* Price estimate */}
            {hasEstimate && (
              <div className="bg-[#F0F0F3] rounded-2xl p-6 text-center
                              shadow-[inset_5px_5px_12px_#D1D1D4,inset_-5px_-5px_12px_#FFFFFF]">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Estimated Price</p>
                <p className="font-display font-bold text-4xl text-[#D90429]">
                  ${low} – ${high}
                </p>
                <p className="text-xs text-gray-400 mt-1">Final quote confirmed on arrival</p>
              </div>
            )}

            {/* Contact info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#C59E37] mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#F0F0F3] border-0 text-[#111111] text-sm
                             shadow-[inset_4px_4px_8px_#D1D1D4,inset_-4px_-4px_8px_#FFFFFF]
                             focus:outline-none focus:ring-2 focus:ring-[#D90429]/30"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#C59E37] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(404) 000-0000"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#F0F0F3] border-0 text-[#111111] text-sm
                             shadow-[inset_4px_4px_8px_#D1D1D4,inset_-4px_-4px_8px_#FFFFFF]
                             focus:outline-none focus:ring-2 focus:ring-[#D90429]/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-[#C59E37] mb-2">
                Zip Code
              </label>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="30305"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#F0F0F3] border-0 text-[#111111] text-sm
                           shadow-[inset_4px_4px_8px_#D1D1D4,inset_-4px_-4px_8px_#FFFFFF]
                           focus:outline-none focus:ring-2 focus:ring-[#D90429]/30"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#D90429] text-white font-display font-bold text-lg
                         shadow-[8px_8px_20px_rgba(217,4,41,0.25),-4px_-4px_12px_rgba(255,255,255,0.8)]
                         hover:bg-[#b00322] hover:shadow-[0_12px_32px_rgba(217,4,41,0.35)]
                         active:scale-[0.99] transition-all duration-200"
            >
              Confirm Booking
            </button>

            <p className="text-center text-xs text-gray-400">
              No payment now. A technician will confirm your appointment within 15 minutes.
            </p>
          </div>
        </form>
      </section>
    </main>
  )
}
