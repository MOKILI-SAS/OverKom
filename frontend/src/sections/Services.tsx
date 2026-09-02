import { motion, useReducedMotion } from 'framer-motion'
import { SectionHeading } from '@/components/SectionHeading'
import { ServiceIcon } from '@/components/ServiceIcon'
import { getWhatsAppLink } from '@/content/site'
import { fadeUp, stagger } from '@/lib/motion'
import { useContentStore } from '@/store/useContentStore'

export function Services() {
  const reduce = useReducedMotion()
  const services = useContentStore((s) => s.content.services)

  return (
    <section id="services" className="section-pad bg-over-charcoal">
      <div className="site-wrap">
        <SectionHeading
          index="01"
          kicker="Le Hub"
          title="Six expertises. Un seul partenaire."
          subtitle="Chaque carte dit clairement à quoi ça sert. Demandez le service en un clic."
        />
        <motion.div
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          variants={stagger}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {services.map((service) => (
            <motion.article
              key={service.id}
              variants={fadeUp}
              className="over-card flex flex-col p-6 transition hover:border-over-yellow/40"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-over-yellow text-over-ink">
                <ServiceIcon name={service.icon} className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-over-yellow">
                {service.category}
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold">{service.title}</h3>
              <p className="mt-2 text-sm text-white/75">{service.tagline}</p>
              <ul className="mt-4 flex-1 space-y-1.5 text-sm text-over-muted">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-over-yellow">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={getWhatsAppLink(service.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="over-btn mt-6 w-full"
              >
                Demander ce service
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
