export const SERVICE_IDS = [
  'audiovisuel',
  'photo',
  'digital',
  'podcast',
  'strategie',
  'web',
  'general',
] as const

export type ServiceId = (typeof SERVICE_IDS)[number]

export interface Service {
  id: Exclude<ServiceId, 'general'>
  category: string
  title: string
  tagline: string
  description: string
  deliverables: string[]
  icon: 'video' | 'camera' | 'megaphone' | 'mic' | 'compass' | 'globe'
}

export interface Project {
  id: string
  title: string
  client: string
  category: Exclude<ServiceId, 'general'>
  year: number
  summary: string
  image?: string
  tags?: string[]
}

export interface Stat {
  id: string
  value: number
  suffix?: string
  label: string
}

export interface Partner {
  id: string
  name: string
  logo: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  photo: string
}

export interface SiteSocial {
  label: string
  href: string
}

export interface SiteConfig {
  name: string
  shortName: string
  tagline: string
  address: string
  city: string
  country: string
  phone: string
  phoneHref: string
  whatsapp: string
  email: string
  website: string
  socials: SiteSocial[]
  credit: {
    label: string
    href: string
  }
}

export type LeadSource = 'service-card' | 'hero' | 'footer'

export interface LeadPayload {
  fullName: string
  email: string
  phone: string
  company?: string
  serviceId: ServiceId
  message: string
  source: LeadSource
  website?: string
}
