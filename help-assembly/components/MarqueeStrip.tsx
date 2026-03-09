const items = [
  '🔥 John in Buckhead just booked Amazon assembly',
  '⭐ Google 4.9★',
  '📍 Serving Atlanta & 35 mile radius',
  '⚡ Sarah in Midtown booked Peloton installation',
  '🏆 Yelp 5★',
  '🔥 15 people booked today',
  '✅ Lifetime warranty on every job',
  '🤖 AI-Ready technicians certified',
]

export default function MarqueeStrip() {
  const text = items.join('   •   ')

  return (
    <div className="bg-ha-black text-white py-3 overflow-hidden">
      <div className="flex whitespace-nowrap">
        <span className="inline-block animate-marquee pr-8 text-sm font-medium tracking-wide">
          {text}&nbsp;&nbsp;&nbsp;&nbsp;{text}
        </span>
        <span
          className="inline-block animate-marquee pr-8 text-sm font-medium tracking-wide"
          aria-hidden="true"
        >
          {text}&nbsp;&nbsp;&nbsp;&nbsp;{text}
        </span>
      </div>
    </div>
  )
}
