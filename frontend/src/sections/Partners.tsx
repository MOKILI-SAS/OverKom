import { SectionHeading } from '@/components/SectionHeading'
import { useContentStore } from '@/store/useContentStore'

export function Partners() {
  const partners = useContentStore((s) => s.content.partners)
  return (
    <section id="partenaires" className="section-pad bg-white text-over-ink">
      <div className="site-wrap">
        <SectionHeading
          invert
          index="03"
          kicker="Partenaires"
          title="Ils nous font confiance."
          subtitle="Marques, institutions et entreprises qui ont choisi OverKom 360."
        />
      <div className="relative mt-12 flex overflow-x-hidden group">
        <div className="animate-marquee flex whitespace-nowrap group-hover:pause gap-4">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex h-28 w-48 shrink-0 items-center justify-center rounded-card border border-black/5 bg-over-cream/60 px-4 transition hover:border-over-yellow hover:bg-white"
            >
              {partner.logo.endsWith('.pdf') ? (
                <iframe
                  src={partner.logo}
                  title={partner.name}
                  className="max-h-16 w-full object-contain pointer-events-none"
                  scrolling="no"
                  style={{ overflow: 'hidden' }}
                />
              ) : (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-16 w-full object-contain grayscale transition hover:grayscale-0"
                />
              )}
            </div>
          ))}
        </div>
        <div className="animate-marquee flex whitespace-nowrap absolute top-0 group-hover:pause gap-4" style={{ left: '100%', paddingLeft: '1rem' }}>
          {partners.map((partner) => (
            <div
              key={`dup-${partner.id}`}
              className="flex h-28 w-48 shrink-0 items-center justify-center rounded-card border border-black/5 bg-over-cream/60 px-4 transition hover:border-over-yellow hover:bg-white"
            >
              {partner.logo.endsWith('.pdf') ? (
                <iframe
                  src={partner.logo}
                  title={partner.name}
                  className="max-h-16 w-full object-contain pointer-events-none"
                  scrolling="no"
                  style={{ overflow: 'hidden' }}
                />
              ) : (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-16 w-full object-contain grayscale transition hover:grayscale-0"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}
