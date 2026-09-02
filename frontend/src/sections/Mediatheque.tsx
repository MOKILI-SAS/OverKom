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
      <div className="relative mt-12 flex overflow-x-hidden group">
        <div className="animate-marquee flex whitespace-nowrap group-hover:pause">
          {mediatheque.map((item) => (
            <div key={item.id} className="mx-4 h-64 md:h-80 lg:h-96 w-auto shrink-0 overflow-hidden rounded-xl">
              <img src={item.image} alt={item.title} className="h-full w-auto object-cover" />
            </div>
          ))}
        </div>
        <div className="animate-marquee flex whitespace-nowrap absolute top-0 group-hover:pause" style={{ left: '100%' }}>
          {mediatheque.map((item) => (
            <div key={`dup-${item.id}`} className="mx-4 h-64 md:h-80 lg:h-96 w-auto shrink-0 overflow-hidden rounded-xl">
              <img src={item.image} alt={item.title} className="h-full w-auto object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
