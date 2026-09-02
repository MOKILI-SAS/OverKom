import { z } from 'zod'

export const SERVICE_IDS = [
  'audiovisuel',
  'photo',
  'digital',
  'podcast',
  'strategie',
  'web',
  'general',
] as const

export const LEAD_STATUSES = ['new', 'contacted', 'quote_sent', 'won', 'lost'] as const
export type LeadStatus = (typeof LEAD_STATUSES)[number]

export const leadSchema = z
  .object({
    fullName: z.string().trim().min(2).max(80),
    email: z.string().trim().email(),
    phone: z
      .string()
      .trim()
      .min(8)
      .max(20)
      .regex(/^[+0-9\s.-]+$/),
    company: z.string().trim().max(80).optional(),
    serviceId: z.enum(SERVICE_IDS),
    message: z.string().trim().min(10).max(1000),
    source: z.enum(['service-card', 'hero', 'footer']),
    website: z.string().optional(),
  })
  .strip()

export type LeadInput = z.infer<typeof leadSchema>

export interface StoredLead {
  id: string
  at: string
  fullName: string
  email: string
  phone: string
  company?: string
  serviceId: (typeof SERVICE_IDS)[number]
  message: string
  source: 'service-card' | 'hero' | 'footer'
  status: LeadStatus
  notes?: string
}
