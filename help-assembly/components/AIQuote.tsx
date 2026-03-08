'use client'

import { useState } from 'react'

const urgencyLabels = ['Flexible', 'This Week', 'Tomorrow', 'Today', 'Right Now!']

const priceRanges: Record<string, string> = {
  Amazon:  '$89 – $149',
  IKEA:    '$79 – $149',
  Wayfair: '$99 – $199',
  Peloton: '$149 – $199',
  Robotics:'$129 – $299',
}

export default function AIQuote() {
  const [serviceType, setServiceType] = useState('Amazon')
  const [description, setDescription] = useState('')
  const [urgency, setUrgency] = useState(2)
  const [quote, setQuote] = useState<string | null>(null)

  const handleGetQuote = () => {
    setQuote(priceRanges[serviceType])
  }

  return (
    <section
      id="ai-quote"
      className="py-24 lg:py-32"
      style={{ background: 'linear-gradient(135deg, #C59E37 0%, #D90429 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div className="text-white">
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
              AI-Powered Quote
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Upload a photo or describe your items. Our ML engine estimates price instantly.
            </p>

            {/* Drop zone */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
              <div
                className="border-2 border-dashed border-white/60 rounded-xl
                           p-16 text-center text-white/70 text-sm cursor-pointer
                           hover:bg-white/10 transition-colors"
              >
                <div className="text-4xl mb-3">📸</div>
                <p className="font-medium">Drag & drop photos here</p>
                <p className="mt-1 text-xs text-white/50">or tap to select from your device</p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-8">
            <h3 className="text-white font-display font-bold text-xl mb-6">Get Your Estimate</h3>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-white/70 text-xs font-medium uppercase tracking-wider block mb-1.5">
                  Service Type
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/90 text-ha-black font-medium text-sm focus:outline-none"
                >
                  {Object.keys(priceRanges).map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-white/70 text-xs font-medium uppercase tracking-wider block mb-1.5">
                  Describe Your Items
                </label>
                <input
                  type="text"
                  placeholder="e.g. IKEA KALLAX 4x4 shelf..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/90 text-ha-black text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-white/70 text-xs font-medium uppercase tracking-wider block mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  defaultValue="Atlanta, GA (auto-detected)"
                  className="w-full px-4 py-3 rounded-xl bg-white/90 text-ha-black text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-white/70 text-xs font-medium uppercase tracking-wider block mb-2">
                  Urgency: <span className="text-white font-semibold">{urgencyLabels[urgency]}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={4}
                  value={urgency}
                  onChange={(e) => setUrgency(Number(e.target.value))}
                  className="w-full accent-white"
                />
              </div>

              {/* Price display */}
              <div className="text-center py-2">
                {quote ? (
                  <div className="font-display font-bold text-4xl text-white animate-pulse">
                    {quote}
                  </div>
                ) : (
                  <div className="font-display font-bold text-4xl text-white/40">
                    $__ – $___
                  </div>
                )}
              </div>

              <button
                onClick={handleGetQuote}
                className="w-full py-4 rounded-xl bg-white text-ha-red font-display font-bold text-lg
                           hover:bg-gray-100 transition-colors active:scale-95"
              >
                Get This Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
