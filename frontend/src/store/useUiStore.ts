import { create } from 'zustand'
import type { LeadSource, ServiceId } from '@/types'

interface UiState {
  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
  activeServiceId: ServiceId | null
  leadSource: LeadSource
  openLeadModal: (serviceId: ServiceId, source?: LeadSource) => void
  closeLeadModal: () => void
}

export const useUiStore = create<UiState>((set) => ({
  mobileNavOpen: false,
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  activeServiceId: null,
  leadSource: 'hero',
  openLeadModal: (serviceId, source = 'service-card') =>
    set({
      activeServiceId: serviceId,
      leadSource: source,
      mobileNavOpen: false,
    }),
  closeLeadModal: () => set({ activeServiceId: null }),
}))
