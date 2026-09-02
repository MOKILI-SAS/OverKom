import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { SectionHeading } from '@/components/SectionHeading'
import { stats } from '@/content/stats'
import { fadeUp, stagger } from '@/lib/motion'
import { useContentStore } from '@/store/useContentStore'

function CountUp({ value, suffix, start }: { value: number; suffix?: string; start: boolean }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!start) return
    const duration = 1100
    const t0 = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, value])

  return (
    <span>
      {n}
      {suffix ?? ''}
    </span>
  )
}

export function Projects() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const projects = useContentStore((s) => s.content.projects)
  const services = useContentStore((s) => s.content.services)

  return (
    <section id="realisations" className="section-pad bg-over-cream text-over-ink">
      <div className="site-wrap">
        <SectionHeading
          invert
          index="02"
          kicker="Réalisations"
          title="Des marques qui nous ont déjà fait confiance."
          subtitle="Structures accompagnées en Guinée — institutions, mines, sport et commerces."
        />

        <div ref={ref} className="mb-14 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="rounded-card bg-white p-5 shadow-sm">
              <p className="font-display text-4xl font-extrabold text-over-ink">
                {reduce ? (
                  <>
                    {stat.value}
                    {stat.suffix ?? ''}
                  </>
                ) : (
                  <CountUp value={stat.value} suffix={stat.suffix} start={inView} />
                )}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-over-ink/55">{stat.label}</p>
            </div>
          ))}
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={stagger}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project) => {
            const category = services.find((s) => s.id === project.category)?.title
            return (
              <motion.article
                key={project.id}
                variants={fadeUp}
                className="group overflow-hidden rounded-card border border-black/5 bg-white shadow-sm transition duration-300 hover:shadow-xl"
              >
                {project.image && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-over-charcoal">
                    <img
                      src={project.image}
                      alt={`${project.client} - ${project.title}`}
                      className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 rounded-full bg-over-yellow px-3 py-1 font-display text-xs font-bold text-over-ink">
                      {category} · {project.year}
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-display text-2xl font-bold text-over-ink group-hover:text-amber-800 transition">
                    {project.client}
                  </h3>
                  <p className="mt-1 font-medium text-sm text-over-ink/90">{project.title}</p>
                  <p className="mt-2 text-sm text-over-ink/70 leading-relaxed">{project.summary}</p>
                  {project.tags && project.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg bg-over-cream px-2.5 py-1 text-xs font-medium text-over-ink/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
