'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const contactInfo = [
  { Icon: Phone, label: 'Phone',   value: '(404) 555-0123',         href: 'tel:4045550123'              },
  { Icon: Mail,  label: 'Email',   value: 'hello@helpassembly.com', href: 'mailto:hello@helpassembly.com'},
  { Icon: MapPin,label: 'Service Area', value: 'Atlanta Metro, 35-mile radius', href: '/locations'     },
  { Icon: Clock, label: 'Hours',   value: 'Mon–Fri 7am–8pm · Sat 8am–6pm · Sun 9am–5pm', href: null   },
]

export default function ContactPage() {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')
  const [sent,    setSent]    = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <main className="min-h-screen bg-[#F0F0F3] pb-32 pt-20">

      {/* Hero */}
      <section className="pt-16 pb-16 px-6 text-center max-w-3xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#C59E37] mb-4">Get In Touch</p>
        <h1 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
          Contact Us
        </h1>
        <p className="text-gray-500 text-lg">
          Questions? Ready to book? We respond within 15 minutes during business hours.
        </p>
      </section>

      <section className="px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact info */}
          <div className="flex flex-col gap-5">
            {contactInfo.map(({ Icon, label, value, href }) => (
              <div
                key={label}
                className="bg-[#F0F0F3] rounded-2xl p-6 flex items-start gap-5
                           shadow-[10px_10px_24px_#D1D1D4,-10px_-10px_24px_#FFFFFF]"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                                shadow-[4px_4px_10px_#D1D1D4,-4px_-4px_10px_#FFFFFF] bg-[#F0F0F3]">
                  <Icon className="w-5 h-5 text-[#C59E37]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="font-semibold text-[#111111] hover:text-[#D90429] transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="font-semibold text-[#111111] text-sm">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Message form */}
          <div className="bg-[#F0F0F3] rounded-3xl p-8
                          shadow-[16px_16px_40px_#D1D1D4,-16px_-16px_40px_#FFFFFF]">
            {sent ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✉️</div>
                <h3 className="font-display font-bold text-xl mb-2">Message sent!</h3>
                <p className="text-gray-500 text-sm">We&apos;ll get back to you within 15 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-display font-bold text-xl mb-6">Send a Message</h3>

                {[
                  { label: 'Name',    type: 'text',  value: name,    setter: setName,    placeholder: 'Jane Smith'            },
                  { label: 'Email',   type: 'email', value: email,   setter: setEmail,   placeholder: 'jane@example.com'      },
                ].map(({ label, type, value, setter, placeholder }) => (
                  <div key={label}>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#C59E37] mb-2">
                      {label}
                    </label>
                    <input
                      type={type}
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      placeholder={placeholder}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#F0F0F3] border-0 text-[#111111] text-sm
                                 shadow-[inset_4px_4px_8px_#D1D1D4,inset_-4px_-4px_8px_#FFFFFF]
                                 focus:outline-none focus:ring-2 focus:ring-[#D90429]/30"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#C59E37] mb-2">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#F0F0F3] border-0 text-[#111111] text-sm resize-none
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
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
