import poster from '@/assets/hero/poster.jpg'
import { SectionHeading } from '@/components/SectionHeading'
import { about } from '@/content/about'

export function About() {
  return (
    <section id="apropos" className="section-pad bg-over-cream text-over-ink">
      <div className="site-wrap grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading index="05" kicker={about.kicker} title={about.title} invert />
          <p className="text-base leading-relaxed text-over-ink/75">{about.intro}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-card bg-white p-5">
              <h3 className="font-display text-lg font-bold">{about.mission.title}</h3>
              <p className="mt-2 text-sm text-over-ink/70">{about.mission.body}</p>
            </div>
            <div className="rounded-card bg-over-night p-5 text-white">
              <h3 className="font-display text-lg font-bold text-over-yellow">{about.vision.title}</h3>
              <p className="mt-2 text-sm text-white/75">{about.vision.body}</p>
            </div>
          </div>
          <ul className="mt-8 space-y-4">
            {about.pillars.map((pillar) => (
              <li key={pillar.title} className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-over-yellow" />
                <div>
                  <p className="font-display font-semibold">{pillar.title}</p>
                  <p className="text-sm text-over-ink/65">{pillar.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="absolute -left-4 -top-4 h-24 w-24 rounded-card bg-over-yellow" />
          <img
            src={poster}
            alt="L’équipe OverKom 360"
            className="relative z-10 aspect-[4/5] w-full rounded-card object-cover object-center shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}
