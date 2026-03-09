'use client'

import { useState } from 'react'

export default function VoiceOrb() {
  const [active, setActive] = useState(false)

  return (
    <button
      onClick={() => setActive(!active)}
      aria-label="Voice assistant"
      className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full
                  bg-gradient-to-br from-ha-gold to-ha-red
                  shadow-glow-gold animate-pulse-orb
                  hover:scale-110 active:scale-95 transition-transform duration-200
                  flex items-center justify-center text-2xl
                  ${active ? 'ring-4 ring-white ring-offset-2' : ''}`}
    >
      {active ? '🎤' : '🔊'}
    </button>
  )
}
