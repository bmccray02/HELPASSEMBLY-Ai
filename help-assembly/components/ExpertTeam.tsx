const teams = [
  { name: 'Amazon Assembly', count: 12, rating: '4.9', jobs: '15,234', status: 'Available now', statusColor: 'bg-green-400' },
  { name: 'IKEA Assembly',   count: 18, rating: '4.9', jobs: '28,456', status: 'Today only',    statusColor: 'bg-yellow-400' },
  { name: 'Wayfair Decor',   count: 8,  rating: '5.0', jobs: '8,932',  status: 'Available now', statusColor: 'bg-green-400' },
  { name: 'Peloton',         count: 6,  rating: '4.9', jobs: '5,678',  status: 'Book ahead',    statusColor: 'bg-red-400'   },
  { name: 'Robotics & AI',   count: 4,  rating: '5.0', jobs: '2,341',  status: 'Available now', statusColor: 'bg-green-400' },
]

export default function ExpertTeam() {
  return (
    <section id="technicians" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-display text-4xl lg:text-5xl font-bold">Service Specializations</h2>
          <a href="#ai-quote" className="text-ha-red font-semibold text-sm hover:underline hidden md:block">
            Book a technician →
          </a>
        </div>

        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4">
          {teams.map((team) => (
            <div
              key={team.name}
              className="min-w-[280px] neu-raised bg-ha-surface rounded-2xl p-6
                         hover:neu-float hover:-translate-y-1 transition-all duration-300
                         cursor-pointer group"
            >
              <h3 className="font-display font-bold text-xl mb-3 group-hover:text-ha-red transition-colors">
                {team.name}
              </h3>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-ha-gold">★</span>
                <span className="font-bold">{team.rating}</span>
                <span className="text-gray-400 text-sm">· {team.count} technicians</span>
              </div>

              <p className="text-gray-400 text-sm mb-4">{team.jobs} jobs completed</p>

              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${team.statusColor} inline-block`} />
                <span className="text-sm font-medium">{team.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
