import { SectionHeading } from '@/components/SectionHeading'
import { useContentStore } from '@/store/useContentStore'

export function Partners() {
  const partners = useContentStore((s) => s.content.partners)

  return (
    <section id="partenaires" className="section-pad bg-white text-over-ink overflow-hidden">
      <div className="site-wrap">
        <SectionHeading
          invert
          index="03"
          kicker="Partenaires"
          title="Ils nous font confiance."
          subtitle="Marques, institutions et entreprises qui ont choisi OverKom 360."
        />
      </div>

      <div className="relative mt-12 w-full overflow-hidden group">
        {/* Dégradés latéraux pour une entrée/sortie fluide */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32 bg-gradient-to-l from-white to-transparent" />

        {/* Marquee en translation continue sans coupure */}
        <div className="flex w-max animate-marquee group-hover:pause">
          <div className="flex shrink-0 items-center gap-6 pr-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex h-28 w-48 shrink-0 items-center justify-center rounded-card border border-black/5 bg-over-cream/60 p-4 transition duration-300 hover:border-over-yellow hover:bg-white hover:shadow-md"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-16 w-full object-contain grayscale transition duration-300 hover:grayscale-0"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Deuxième boucle identique pour fluidité 100% continue */}
          <div className="flex shrink-0 items-center gap-6 pr-6" aria-hidden="true">
            {partners.map((partner) => (
              <div
                key={`dup-${partner.id}`}
                className="flex h-28 w-48 shrink-0 items-center justify-center rounded-card border border-black/5 bg-over-cream/60 p-4 transition duration-300 hover:border-over-yellow hover:bg-white hover:shadow-md"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-16 w-full object-contain grayscale transition duration-300 hover:grayscale-0"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
