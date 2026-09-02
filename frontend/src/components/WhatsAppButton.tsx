import { MessageCircle } from 'lucide-react'
import { site } from '@/content/site'

export function WhatsAppButton() {
  const whatsappUrl = `${site.whatsapp}?text=${encodeURIComponent(
    'Bonjour OverKom 360, je souhaite échanger avec vous concernant un projet pour mon entreprise.',
  )}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition duration-300 hover:scale-110 hover:shadow-[#25D366]/40 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50 group"
    >
      <MessageCircle className="h-7 w-7 transition-transform group-hover:scale-110" />
      <span className="sr-only">Contactez-nous sur WhatsApp</span>
      <span className="absolute right-16 hidden whitespace-nowrap rounded-lg bg-over-charcoal px-3 py-1.5 text-xs font-semibold text-white shadow-lg border border-white/10 group-hover:block">
        WhatsApp Direct
      </span>
    </a>
  )
}
