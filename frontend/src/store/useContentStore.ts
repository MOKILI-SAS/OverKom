import { create } from 'zustand'
import { site as defaultSite } from '@/content/site'
import { services as defaultServices } from '@/content/services'
import { team as defaultTeam } from '@/content/team'
import { projects as defaultProjects } from '@/content/projects'
import { partners as defaultPartners } from '@/content/partners'
import type { Service, TeamMember, Project, Partner } from '@/types'

export interface HeroConfig {
  headline: string
  subheadline: string
}

export interface MediathequeItem {
  id: string
  title: string
  image: string
}

export const defaultMediatheque: MediathequeItem[] = [
  { id: 'shoot1', title: 'Tournage Équipe OverKom', image: '/images/shoot/DSC055453832.jpg.jpeg' },
  { id: 'shoot2', title: 'Production Audiovisuelle Terrain', image: '/images/shoot/DSC055483834.jpg.jpeg' },
  { id: 'shoot3', title: 'Couverture Événementielle', image: '/images/shoot/DSC055513835.jpg.jpeg' },
  { id: 'shoot4', title: 'Shooting Studio & Direction Artistique', image: '/images/shoot/DSC02373 copie.jpg.jpeg' },
  { id: 'shoot5', title: 'Studio Podcast & Micro', image: '/images/shoot/DSC02379.jpg.jpeg' },
]

export const defaultHero: HeroConfig = {
  headline: 'Votre image. Notre expertise. Votre succès.',
  subheadline: 'Agence de communication 360° basée à Conakry — Conseil, Audiovisuel, Digital, Studio Podcast & Web.',
}

export interface CmsContent {
  site: typeof defaultSite
  hero: HeroConfig
  services: Service[]
  projects: Project[]
  team: TeamMember[]
  partners: Partner[]
  mediatheque: MediathequeItem[]
}

interface ContentStoreState {
  content: CmsContent
  isLoaded: boolean
  isSaving: boolean
  error: string | null
  fetchContent: () => Promise<void>
  saveContent: (token: string) => Promise<boolean>
  resetToDefaults: () => void
  
  // Specific updater helpers
  updateSite: (siteUpdates: Partial<typeof defaultSite>) => void
  updateHero: (heroUpdates: Partial<HeroConfig>) => void
  
  // Services CRUD
  addService: (service: Service) => void
  updateService: (id: string, updates: Partial<Service>) => void
  deleteService: (id: string) => void
  
  // Projects CRUD
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  
  // Team CRUD
  addTeamMember: (member: TeamMember) => void
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void
  deleteTeamMember: (id: string) => void
  
  // Partners CRUD
  addPartner: (partner: Partner) => void
  updatePartner: (id: string, updates: Partial<Partner>) => void
  deletePartner: (id: string) => void
  
  // Mediatheque CRUD
  addMediathequeItem: (item: MediathequeItem) => void
  updateMediathequeItem: (id: string, updates: Partial<MediathequeItem>) => void
  deleteMediathequeItem: (id: string) => void
}

const LOCAL_STORAGE_KEY = 'overkom_cms_content_v1'

const initialContent: CmsContent = {
  site: defaultSite,
  hero: defaultHero,
  services: defaultServices,
  projects: defaultProjects,
  team: defaultTeam,
  partners: defaultPartners,
  mediatheque: defaultMediatheque,
}

function loadInitialFromStorage(): CmsContent {
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      return { ...initialContent, ...parsed }
    }
  } catch (e) {
    console.warn('Failed to load local CMS cache', e)
  }
  return initialContent
}

export const useContentStore = create<ContentStoreState>((set, get) => ({
  content: loadInitialFromStorage(),
  isLoaded: false,
  isSaving: false,
  error: null,

  fetchContent: async () => {
    try {
      const res = await fetch('/api/content')
      if (res.ok) {
        const data = await res.json()
        if (data.ok && data.content) {
          const merged: CmsContent = {
            ...initialContent,
            ...data.content,
          }
          set({ content: merged, isLoaded: true })
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged))
          return
        }
      }
    } catch (e) {
      console.warn('Backend API offline or unreachable, using local storage cache', e)
    }
    set({ isLoaded: true })
  },

  saveContent: async (token: string) => {
    set({ isSaving: true, error: null })
    const currentContent = get().content
    
    // Save to local storage
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentContent))
    } catch (e) {
      console.warn('Failed to write local storage', e)
    }

    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: currentContent }),
      })

      const data = await res.json()
      if (res.ok && data.ok) {
        set({ isSaving: false })
        return true
      } else {
        set({ isSaving: false, error: data.message || 'Erreur lors de la sauvegarde.' })
        return false
      }
    } catch (e: any) {
      console.error('Failed to sync content with server', e)
      set({ isSaving: false, error: 'Impossible de joindre le serveur. Sauvegardé en local.' })
      return true
    }
  },

  resetToDefaults: () => {
    set({ content: initialContent })
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  },

  updateSite: (siteUpdates) => {
    set((state) => ({
      content: {
        ...state.content,
        site: { ...state.content.site, ...siteUpdates },
      },
    }))
  },

  updateHero: (heroUpdates) => {
    set((state) => ({
      content: {
        ...state.content,
        hero: { ...state.content.hero, ...heroUpdates },
      },
    }))
  },

  // Services
  addService: (service) => {
    set((state) => ({
      content: {
        ...state.content,
        services: [...state.content.services, service],
      },
    }))
  },
  updateService: (id, updates) => {
    set((state) => ({
      content: {
        ...state.content,
        services: state.content.services.map((s) => (s.id === id ? { ...s, ...updates } : s)),
      },
    }))
  },
  deleteService: (id) => {
    set((state) => ({
      content: {
        ...state.content,
        services: state.content.services.filter((s) => s.id !== id),
      },
    }))
  },

  // Projects
  addProject: (project) => {
    set((state) => ({
      content: {
        ...state.content,
        projects: [project, ...state.content.projects],
      },
    }))
  },
  updateProject: (id, updates) => {
    set((state) => ({
      content: {
        ...state.content,
        projects: state.content.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      },
    }))
  },
  deleteProject: (id) => {
    set((state) => ({
      content: {
        ...state.content,
        projects: state.content.projects.filter((p) => p.id !== id),
      },
    }))
  },

  // Team
  addTeamMember: (member) => {
    set((state) => ({
      content: {
        ...state.content,
        team: [...state.content.team, member],
      },
    }))
  },
  updateTeamMember: (id, updates) => {
    set((state) => ({
      content: {
        ...state.content,
        team: state.content.team.map((m) => (m.id === id ? { ...m, ...updates } : m)),
      },
    }))
  },
  deleteTeamMember: (id) => {
    set((state) => ({
      content: {
        ...state.content,
        team: state.content.team.filter((m) => m.id !== id),
      },
    }))
  },

  // Partners
  addPartner: (partner) => {
    set((state) => ({
      content: {
        ...state.content,
        partners: [...state.content.partners, partner],
      },
    }))
  },
  updatePartner: (id, updates) => {
    set((state) => ({
      content: {
        ...state.content,
        partners: state.content.partners.map((pt) => (pt.id === id ? { ...pt, ...updates } : pt)),
      },
    }))
  },
  deletePartner: (id) => {
    set((state) => ({
      content: {
        ...state.content,
        partners: state.content.partners.filter((pt) => pt.id !== id),
      },
    }))
  },

  // Mediatheque
  addMediathequeItem: (item) => {
    set((state) => ({
      content: {
        ...state.content,
        mediatheque: [item, ...state.content.mediatheque],
      },
    }))
  },
  updateMediathequeItem: (id, updates) => {
    set((state) => ({
      content: {
        ...state.content,
        mediatheque: state.content.mediatheque.map((item) => (item.id === id ? { ...item, ...updates } : item)),
      },
    }))
  },
  deleteMediathequeItem: (id) => {
    set((state) => ({
      content: {
        ...state.content,
        mediatheque: state.content.mediatheque.filter((item) => item.id !== id),
      },
    }))
  },
}))
