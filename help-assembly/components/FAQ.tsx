'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'How much does furniture assembly cost in Atlanta?',
    a: 'Our Atlanta furniture assembly services start at $79 for basic items. IKEA assembly averages $89–$149, Peloton installation is $149, and robotics deployment starts at $129.',
  },
  {
    q: 'Do you offer same-day furniture assembly in Atlanta?',
    a: 'Yes! Book before 2 PM for same-day service anywhere in the Atlanta metro area including Buckhead, Midtown, Decatur, Sandy Springs, and Alpharetta.',
  },
  {
    q: 'What areas in Atlanta do you service?',
    a: 'We cover all of metro Atlanta within a 35-mile radius of downtown, including Buckhead, Midtown, Decatur, Sandy Springs, Alpharetta, Marietta, Roswell, and Johns Creek.',
  },
  {
    q: 'Are your technicians AI-certified?',
    a: "Absolutely. We're Atlanta's first AI-ready assembly service. All technicians complete AI-assisted training and can deploy smart home robotics.",
  },
  {
    q: 'What is the lifetime warranty?',
    a: 'Every job comes with our lifetime workmanship warranty. If something we assembled fails due to our work, we fix it free — forever.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`neu-raised bg-ha-surface rounded-2xl overflow-hidden transition-all duration-300
                  ${open ? 'shadow-lg' : ''}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-semibold text-ha-black pr-4">{q}</span>
        <span
          className={`text-ha-red font-bold text-xl flex-shrink-0 transition-transform duration-300
                      ${open ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>

      {open && (
        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-ha-muted/50 pt-4">
          {a}
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-ha-surface">
      <div className="max-w-3xl mx-auto px-6 lg:px-16">
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-center mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Can&apos;t find your answer?{' '}
          <a href="tel:4045550123" className="text-ha-red font-semibold hover:underline">
            Call us at (404) 555-0123
          </a>
        </p>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Ask anything… e.g. 'How much for IKEA?'"
            className="w-full px-6 py-4 rounded-full border border-ha-muted bg-white text-sm
                       focus:outline-none focus:ring-2 focus:ring-ha-red/50 shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
