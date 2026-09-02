import type { SiteConfig } from '@/types'

export const site: SiteConfig = {
  name: 'OverKom 360',
  shortName: 'OverKom',
  tagline: 'Votre image. Notre expertise. Votre succès.',
  address: 'Kipé, en face du restaurant Le Bambou, quartier Kipé',
  city: 'Conakry',
  country: 'Guinée',
  phone: '+224 628 83 51 88',
  phoneHref: 'tel:+224628835188',
  whatsapp: 'https://wa.me/224628835188',
  email: 'contact@overkomafrik.com',
  website: 'https://www.overkomafrik.com',
  socials: [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61577342132096',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/overkom360/',
    },
  ],
  credit: {
    label: 'Propulsé par MOKILI',
    href: 'https://mokili.io',
  },
}

export const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#realisations', label: 'Réalisations' },
  { href: '/#partenaires', label: 'Partenaires' },
  { href: '/#equipe', label: 'Équipe' },
  { href: '/#mediatheque', label: 'Médiathèque' },
  { href: '/#apropos', label: 'À propos' },
  { href: '/#contact', label: 'Contact' },
] as const

export function getWhatsAppLink(serviceTitle?: string) {
  let message = "Bonjour OverKom, je souhaite vous parler d'un projet et demander un devis."
  if (serviceTitle) {
    message = `Bonjour OverKom, je suis intéressé(e) par votre service de ${serviceTitle} et je souhaite obtenir un devis.`
  }
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`
}
