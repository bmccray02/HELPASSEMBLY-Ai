const reviews = [
  { text: 'The AI matched me with Marcus who had my exact IKEA bed experience. Done in 45 minutes!', author: 'Sarah M., Buckhead', tilt: '-rotate-1' },
  { text: "Booked by saying 'Peloton tomorrow' to the voice assistant. Technician arrived at 9am sharp.", author: 'James R., Midtown', tilt: 'rotate-2' },
  { text: 'Our office robot vacuum ecosystem was set up perfectly. Trained our team too!', author: 'Jennifer P., Decatur', tilt: '-rotate-2' },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <h2 className="font-display text-4xl lg:text-5xl font-bold mb-16 text-center">
          Customer Love
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className={`neu-raised bg-ha-surface rounded-2xl p-8 max-w-sm
                          ${r.tilt} hover:!rotate-0 hover:neu-float hover:-translate-y-2
                          transition-all duration-300`}
            >
              <div className="text-ha-gold text-xl mb-4">★★★★★</div>
              <p className="text-gray-700 leading-relaxed mb-6 italic">&ldquo;{r.text}&rdquo;</p>
              <p className="font-semibold text-sm text-ha-black">— {r.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
