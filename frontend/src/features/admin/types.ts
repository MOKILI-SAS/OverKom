import type { ServiceId } from '@/types'

export type LeadStatus = 'new' | 'contacted' | 'quote_sent' | 'won' | 'lost'

export interface StoredLead {
  id: string
  at: string
  fullName: string
  email: string
  phone: string
  company?: string
  serviceId: ServiceId
  message: string
  source: 'service-card' | 'hero' | 'footer'
  status: LeadStatus
  notes?: string
}

export interface AdminUser {
  role: string
  name: string
}

export interface AdminStats {
  total: number
  thisMonth: number
  byStatus: {
    new: number
    contacted: number
    quote_sent: number
    won: number
    lost: number
  }
  byService: Record<string, number>
}
