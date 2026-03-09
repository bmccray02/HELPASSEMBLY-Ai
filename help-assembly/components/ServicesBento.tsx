'use client'

import { useState } from 'react'

const services = [
  { id: 'amazon', label: 'Amazon Assembly', price: '$89+', badge: 'Most Popular', badgeColor: 'bg-ha-red text-white', features: ['Same-day available', 'All tools included', 'Packaging removal'], large: true },
  { id: 'ikea',   label: 'IKEA Certified',  price: '$79+', badge: 'Certified',    badgeColor: 'bg-ha-gold text-black', features: ['PAX specialists', 'Spare hardware'] },
  { id: 'wayfair',label: 'Wayfair Decor',   price: '$99+', badge: 'Premium',      badgeColor: 'bg-ha-gold text-black', features: ['White-glove care', 'Decor placement'] },
  { id: 'peloton',label: 'Peloton Certified',price:'$149+',badge: 'Certified',    badgeColor: 'bg-ha-red text-white',  features: ['Bike & Tread', 'Calibration included'] },
  { id: 'robots', label: 'Robotics & AI',   price: '$129+',badge: 'AI-Ready',     badgeColor: 'bg-ha-gold text-black', features: ['Smart home setup', 'Staff training'] },
]

export default function ServicesBento() {
  const [service, setService] = useState('Amazon Assembly')
  const [count, setCount] = useState('')
  const [zip, setZip] = useState('')
  const [quote, setQuote] = useState<string | null>(null)

  const handleQuote = () => {
    setQuote('$89 – $149')
  }

  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <h2 className="font-display text-4xl lg:text-5xl font-bold mb-12">Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {/* Large featured card */}
          <div
            className="lg:col-span-2 lg:row-span-2 neu-raised bg-ha-surface rounded-2xl p-8
                       hover:neu-float hover:-translate-y-1 transition-all duration-300"
          >
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${services[0].badgeColor}`}>
              {services[0].badge}
            </span>
            <h3 className="font-display text-3xl font-bold mb-2">{services[0].label}</h3>
            <p className="text-ha-red font-bold text-2xl mb-4">{services[0].price}</p>
            <ul className="space-y-2 mb-6">
              {services[0].features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-500 font-bold">✓</span> {f}
                </li>
              ))}
            </ul>
            <a href="#ai-quote" className="text-ha-red font-semibold text-sm hover:underline">
              Learn more →
            </a>
          </div>

          {/* Regular service cards */}
          {services.slice(1).map((svc) => (
            <div
              key={svc.id}
              className="neu-raised bg-ha-surface rounded-2xl p-6
                         hover:neu-float hover:-translate-y-1 hover:rotate-1
                         transition-all duration-300"
            >
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${svc.badgeColor}`}>
                {svc.badge}
              </span>
              <h3 className="font-display text-xl font-bold mb-1">{svc.label}</h3>
              <p className="text-ha-gold font-bold text-xl mb-3">{svc.price}</p>
              <ul className="space-y-1">
                {svc.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Quick quote widget — full width */}
          <div
            className="md:col-span-2 lg:col-span-4 neu-raised bg-ha-surface rounded-2xl p-6
                       flex flex-col lg:flex-row items-start lg:items-center gap-6"
          >
            <div className="flex-shrink-0">
              <h4 className="font-display font-bold text-lg">Quick Quote</h4>
              <p className="text-gray-500 text-sm">Instant price estimate</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-ha-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ha-red"
              >
                {services.map((s) => <option key={s.id}>{s.label}</option>)}
              </select>
              <input
                type="number"
                placeholder="Item count"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-ha-muted bg-white text-sm w-32 focus:outline-none focus:ring-2 focus:ring-ha-red"
              />
              <input
                type="text"
                placeholder="Zip code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-ha-muted bg-white text-sm w-32 focus:outline-none focus:ring-2 focus:ring-ha-red"
              />
              <button
                onClick={handleQuote}
                className="bg-ha-red text-white px-6 py-2.5 rounded-xl font-semibold text-sm
                           hover:bg-[#b00322] hover:shadow-glow-red transition-all duration-200 active:scale-95"
              >
                Get Price
              </button>
              {quote && (
                <div className="font-display font-bold text-xl text-ha-red animate-pulse">
                  {quote}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
