import { SectionHeading } from '@/components/SectionHeading'
import { useContentStore } from '@/store/useContentStore'

export function Team() {
  const team = useContentStore((s) => s.content.team)

  return (
    <section id="equipe" className="section-pad bg-over-night overflow-hidden">
      <div className="site-wrap">
        <SectionHeading
          index="04"
          kicker="Équipe"
          title="Les visages derrière le 360°."
          subtitle="Création, production, stratégie — une équipe dédiée, basée à Conakry."
        />
      </div>

      <div className="relative mt-12 w-full overflow-hidden group">
        {/* Dégradés latéraux pour adoucir le défilement */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32 bg-gradient-to-r from-over-night to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32 bg-gradient-to-l from-over-night to-transparent" />

        {/* Marquee en continu sans à-coups */}
        <div className="flex w-max animate-marquee group-hover:pause">
          <div className="flex shrink-0 items-center gap-6 pr-6">
            {team.map((member) => (
              <article key={member.id} className="group/card w-48 md:w-56 shrink-0">
                <div className="aspect-[3/4] overflow-hidden rounded-card bg-over-charcoal border border-white/10 shadow-lg">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition duration-500 group-hover/card:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-3 font-display text-base font-bold md:text-lg whitespace-normal text-white">{member.name}</h3>
                <p className="text-sm text-over-yellow whitespace-normal">{member.role}</p>
              </article>
            ))}
          </div>

          {/* Deuxième boucle pour fluidité 100% infinie */}
          <div className="flex shrink-0 items-center gap-6 pr-6" aria-hidden="true">
            {team.map((member) => (
              <article key={`dup-${member.id}`} className="group/card w-48 md:w-56 shrink-0">
                <div className="aspect-[3/4] overflow-hidden rounded-card bg-over-charcoal border border-white/10 shadow-lg">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition duration-500 group-hover/card:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-3 font-display text-base font-bold md:text-lg whitespace-normal text-white">{member.name}</h3>
                <p className="text-sm text-over-yellow whitespace-normal">{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
