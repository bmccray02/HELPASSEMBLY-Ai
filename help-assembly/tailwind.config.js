/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ha-black':   '#111111',
        'ha-red':     '#D90429',
        'ha-gold':    '#C59E37',
        'ha-yellow':  '#F2C94C',
        'ha-surface': '#F0F0F3',
        'ha-light':   '#FFFFFF',
        'ha-muted':   '#D1D1D4',
      },
      fontFamily: {
        display: ['var(--font-grotesk)', 'sans-serif'],
        body:    ['var(--font-inter)',   'sans-serif'],
        accent:  ['var(--font-playfair)', 'serif'],
      },
      boxShadow: {
        'neu-raised':   '20px 20px 60px #D1D1D4, -20px -20px 60px #FFFFFF',
        'neu-pressed':  'inset 5px 5px 10px #D1D1D4, inset -5px -5px 10px #FFFFFF',
        'neu-float':    '30px 30px 80px rgba(209,209,212,0.6), -30px -30px 80px rgba(255,255,255,0.8)',
        'glow-gold':    '0 0 40px rgba(197,158,55,0.4)',
        'glow-red':     '0 0 40px rgba(217,4,41,0.4)',
      },
      animation: {
        'pulse-orb': 'pulseOrb 2s ease-in-out infinite',
        'marquee':   'marquee 40s linear infinite',
        'breathe':   'breathe 8s ease-in-out infinite alternate',
        'float':     'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseOrb: {
          '0%,100%': { transform: 'scale(1)',   opacity: '0.8' },
          '50%':     { transform: 'scale(1.1)', opacity: '1'   },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        breathe: {
          '0%':   { transform: 'scale(1) translate(-10%, -10%)' },
          '100%': { transform: 'scale(1.2) translate(0, 0)'     },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)'  },
          '50%':     { transform: 'translateY(-16px)' },
        },
      },
    },
  },
  plugins: [],
}
