const steps = [
  { num: '01', title: 'Snap & Send',        desc: 'Take photos or describe by voice. AI analyzes instantly.', tilt: '-rotate-2', delay: '0ms' },
  { num: '02', title: 'AI Matches Your Tech',desc: 'Perfect certified technician for your exact items.',       tilt: 'rotate-1',  delay: '100ms' },
  { num: '03', title: 'Track & Relax',       desc: 'Real-time GPS tracking and live chat with your tech.',     tilt: '-rotate-1', delay: '200ms' },
  { num: '04', title: 'Perfect Finish',      desc: 'Cleanup included. 100% satisfaction guaranteed.',          tilt: 'rotate-2',  delay: '300ms' },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 lg:py-32 bg-[#e5e5e9]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-center mb-16">
          How It Works
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className={`relative bg-ha-surface rounded-2xl p-8 max-w-[260px] w-full
                          neu-raised ${step.tilt}
                          hover:neu-float hover:!rotate-0 hover:-translate-y-2
                          transition-all duration-300`}
              style={{ transitionDelay: step.delay }}
            >
              {/* Dashed border accent */}
              <div
                className="absolute inset-[-8px] rounded-2xl border-2 border-dashed border-ha-gold/30 pointer-events-none"
              />

              <span className="font-display font-bold text-5xl text-ha-gold leading-none block mb-4">
                {step.num}
              </span>
              <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
