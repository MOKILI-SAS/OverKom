import { SectionHeading } from '@/components/SectionHeading'
import { useContentStore } from '@/store/useContentStore'

export function Mediatheque() {
  const mediatheque = useContentStore((s) => s.content.mediatheque)

  return (
    <section id="mediatheque" className="py-24 bg-over-ink text-white overflow-hidden">
      <div className="site-wrap">
        <SectionHeading
          index="05"
          kicker="Médiathèque"
          title="L'envers du décor."
          subtitle="Découvrez nos équipes en action sur le terrain."
        />
      </div>

      <div className="relative mt-12 w-full overflow-hidden group">
        {/* Dégradés latéraux pour fondu élégant */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32 bg-gradient-to-r from-over-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32 bg-gradient-to-l from-over-ink to-transparent" />

        {/* Marquee en continu sans coupure ni saut */}
        <div className="flex w-max animate-marquee group-hover:pause">
          <div className="flex shrink-0 items-center gap-6 pr-6">
            {mediatheque.map((item) => (
              <div
                key={item.id}
                className="group/item relative h-64 md:h-80 lg:h-96 w-auto shrink-0 overflow-hidden rounded-card border border-white/10 shadow-xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-auto object-cover transition duration-700 group-hover/item:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover/item:opacity-100 flex items-end p-5">
                  <p className="font-display text-sm font-semibold text-white drop-shadow-md">{item.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Deuxième boucle identique pour fluidité 100% infinie */}
          <div className="flex shrink-0 items-center gap-6 pr-6" aria-hidden="true">
            {mediatheque.map((item) => (
              <div
                key={`dup-${item.id}`}
                className="group/item relative h-64 md:h-80 lg:h-96 w-auto shrink-0 overflow-hidden rounded-card border border-white/10 shadow-xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-auto object-cover transition duration-700 group-hover/item:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover/item:opacity-100 flex items-end p-5">
                  <p className="font-display text-sm font-semibold text-white drop-shadow-md">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
