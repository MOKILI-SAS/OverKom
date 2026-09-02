import { create } from 'zustand'
import {
  deleteLead as apiDeleteLead,
  fetchAdminLeads,
  fetchAdminStats,
  loginAdmin,
  updateLead as apiUpdateLead,
} from './admin.api'
import type { AdminStats, AdminUser, LeadStatus, StoredLead } from './types'

interface AdminState {
  token: string | null
  user: AdminUser | null
  isAuthenticated: boolean
  leads: StoredLead[]
  stats: AdminStats | null
  isLoading: boolean
  error: string | null
  selectedLead: StoredLead | null
  
  // Actions
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loadLeads: () => Promise<void>
  loadStats: () => Promise<void>
  updateStatus: (id: string, status: LeadStatus, notes?: string) => Promise<void>
  deleteLead: (id: string) => Promise<void>
  setSelectedLead: (lead: StoredLead | null) => void
  clearError: () => void
}

const STORAGE_KEY = 'overkom_admin_token'
const USER_KEY = 'overkom_admin_user'

export const useAdminStore = create<AdminState>((set, get) => {
  const savedToken = localStorage.getItem(STORAGE_KEY)
  const savedUser = localStorage.getItem(USER_KEY)

  return {
    token: savedToken,
    user: savedUser ? JSON.parse(savedUser) : null,
    isAuthenticated: Boolean(savedToken),
    leads: [],
    stats: null,
    isLoading: false,
    error: null,
    selectedLead: null,

    login: async (email: string, password: string) => {
      set({ isLoading: true, error: null })
      try {
        const { token, user } = await loginAdmin(email, password)
        localStorage.setItem(STORAGE_KEY, token)
        localStorage.setItem(USER_KEY, JSON.stringify(user))
        set({ token, user, isAuthenticated: true, isLoading: false })
        await get().loadLeads()
        await get().loadStats()
      } catch (err: any) {
        set({ error: err.message || 'Échec de connexion.', isLoading: false })
        throw err
      }
    },

    logout: () => {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(USER_KEY)
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        leads: [],
        stats: null,
        selectedLead: null,
      })
    },

    loadLeads: async () => {
      const { token } = get()
      if (!token) return
      set({ isLoading: true, error: null })
      try {
        const leads = await fetchAdminLeads(token)
        set({ leads, isLoading: false })
      } catch (err: any) {
        set({ error: err.message, isLoading: false })
      }
    },

    loadStats: async () => {
      const { token } = get()
      if (!token) return
      try {
        const stats = await fetchAdminStats(token)
        set({ stats })
      } catch (err: any) {
        console.error('loadStats error', err)
      }
    },

    updateStatus: async (id: string, status: LeadStatus, notes?: string) => {
      const { token, leads, selectedLead } = get()
      if (!token) return
      try {
        const updated = await apiUpdateLead(token, id, { status, notes })
        set({
          leads: leads.map((l) => (l.id === id ? updated : l)),
          selectedLead: selectedLead?.id === id ? updated : selectedLead,
        })
        await get().loadStats()
      } catch (err: any) {
        set({ error: err.message })
      }
    },

    deleteLead: async (id: string) => {
      const { token, leads, selectedLead } = get()
      if (!token) return
      try {
        await apiDeleteLead(token, id)
        set({
          leads: leads.filter((l) => l.id !== id),
          selectedLead: selectedLead?.id === id ? null : selectedLead,
        })
        await get().loadStats()
      } catch (err: any) {
        set({ error: err.message })
      }
    },

    setSelectedLead: (lead) => set({ selectedLead: lead }),
    clearError: () => set({ error: null }),
  }
})
