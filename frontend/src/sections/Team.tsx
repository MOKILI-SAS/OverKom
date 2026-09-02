import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/SectionHeading'
import { fadeUp } from '@/lib/motion'
import { useContentStore } from '@/store/useContentStore'

export function Team() {
  const team = useContentStore((s) => s.content.team)

  return (
    <section id="equipe" className="section-pad bg-over-night">
      <div className="site-wrap">
        <SectionHeading
          index="04"
          kicker="Équipe"
          title="Les visages derrière le 360°."
          subtitle="Création, production, stratégie — une équipe dédiée, basée à Conakry."
        />
        <div className="relative mt-12 flex overflow-x-hidden group">
          <div className="animate-marquee flex whitespace-nowrap group-hover:pause gap-4">
            {team.map((member) => (
              <motion.article key={member.id} variants={fadeUp} className="group w-48 md:w-56 shrink-0">
                <div className="aspect-[3/4] overflow-hidden rounded-card bg-over-charcoal">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-3 font-display text-base font-bold md:text-lg whitespace-normal">{member.name}</h3>
                <p className="text-sm text-over-yellow whitespace-normal">{member.role}</p>
              </motion.article>
            ))}
          </div>
          <div className="animate-marquee flex whitespace-nowrap absolute top-0 group-hover:pause gap-4" style={{ left: '100%', paddingLeft: '1rem' }}>
            {team.map((member) => (
              <motion.article key={`dup-${member.id}`} variants={fadeUp} className="group w-48 md:w-56 shrink-0">
                <div className="aspect-[3/4] overflow-hidden rounded-card bg-over-charcoal">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-3 font-display text-base font-bold md:text-lg whitespace-normal">{member.name}</h3>
                <p className="text-sm text-over-yellow whitespace-normal">{member.role}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
