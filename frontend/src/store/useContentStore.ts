import { create } from 'zustand'
import { site as defaultSite } from '@/content/site'
import { services as defaultServices } from '@/content/services'
import { team as defaultTeam } from '@/content/team'
import { projects as defaultProjects } from '@/content/projects'
import { partners as defaultPartners } from '@/content/partners'
import type { Service, TeamMember, Project, Partner, PortfolioItem } from '@/types'

export interface HeroConfig {
  headline: string
  subheadline: string
}

export const defaultPortfolio: PortfolioItem[] = [
  // VIDEOS
  { id: 'port-v1', title: 'Vidéo OverKom 1', category: 'video', mediaUrl: 'https://www.facebook.com/share/r/1cQ7tckg73/?mibextid=wwXIfr' },
  { id: 'port-v2', title: 'Vidéo OverKom 2', category: 'video', mediaUrl: 'https://www.facebook.com/share/r/1CC8XnsRcf/?mibextid=wwXIfr' },
  { id: 'port-v3', title: 'Vidéo OverKom 3', category: 'video', mediaUrl: 'https://www.facebook.com/share/v/1Dx7Kjxiyt/?mibextid=wwXIfr' },
  { id: 'port-v4', title: 'Vidéo OverKom 4', category: 'video', mediaUrl: 'https://www.facebook.com/share/v/1Bvo4UCtwn/?mibextid=wwXIfr' },

  // GRAPHISME
  { id: 'port-g1', title: 'Affiche BSIC', category: 'graphisme', mediaUrl: '/portfolio/graphisme/BSIC 21.jpg.jpeg' },
  { id: 'port-g2', title: 'Création Graphique', category: 'graphisme', mediaUrl: '/portfolio/graphisme/IMG_7847.JPG.jpeg' },
  { id: 'port-g3', title: 'Création Graphique', category: 'graphisme', mediaUrl: '/portfolio/graphisme/IMG_7848.JPG.jpeg' },
  { id: 'port-g4', title: 'Création Graphique', category: 'graphisme', mediaUrl: '/portfolio/graphisme/IMG_7850.JPG.jpeg' },
  { id: 'port-g5', title: 'Création Graphique', category: 'graphisme', mediaUrl: '/portfolio/graphisme/IMG_7851.JPG.jpeg' },
  { id: 'port-g6', title: 'Création Graphique', category: 'graphisme', mediaUrl: '/portfolio/graphisme/IMG_7852.JPG.jpeg' },
  { id: 'port-g7', title: 'Création Graphique', category: 'graphisme', mediaUrl: '/portfolio/graphisme/IMG_7853.JPG.jpeg' },
  { id: 'port-g8', title: 'Création Graphique', category: 'graphisme', mediaUrl: '/portfolio/graphisme/IMG_7854.JPG.jpeg' },
  { id: 'port-g9', title: 'Création Graphique', category: 'graphisme', mediaUrl: '/portfolio/graphisme/IMG_7855.JPG.jpeg' },
  { id: 'port-g10', title: 'Création Graphique', category: 'graphisme', mediaUrl: '/portfolio/graphisme/IMG_7856.JPG.jpeg' },
  { id: 'port-g11', title: 'Création Graphique', category: 'graphisme', mediaUrl: '/portfolio/graphisme/IMG_7857.JPG.jpeg' },
  { id: 'port-g12', title: 'Création Graphique', category: 'graphisme', mediaUrl: '/portfolio/graphisme/IMG_7858.JPG.jpeg' },

  // PHOTOSHOOT
  { id: 'port-p1', title: 'Shooting Studio', category: 'photoshoot', mediaUrl: '/portfolio/photoshoot/DSC02373 copie.jpg.jpeg' },
  { id: 'port-p2', title: 'Tournage Équipe', category: 'photoshoot', mediaUrl: '/portfolio/photoshoot/DSC055453832.jpg.jpeg' },
  { id: 'port-p3', title: 'Couverture Événementielle', category: 'photoshoot', mediaUrl: '/portfolio/photoshoot/DSC06778 copie 1.jpg.jpeg' },
  { id: 'port-p4', title: 'Shooting Terrain', category: 'photoshoot', mediaUrl: '/portfolio/photoshoot/DSC097041.jpg.jpeg' },
  { id: 'port-p5', title: 'Direction Artistique', category: 'photoshoot', mediaUrl: '/portfolio/photoshoot/DSC_3677 copie.jpg.jpeg' },
  { id: 'port-p6', title: 'Direction Artistique', category: 'photoshoot', mediaUrl: '/portfolio/photoshoot/DSC_3684 copie.jpg.jpeg' },
  { id: 'port-p7', title: 'Studio Podcast', category: 'photoshoot', mediaUrl: '/portfolio/photoshoot/DSC_8051 copie.jpg.jpeg' },
  { id: 'port-p8', title: 'Studio Podcast', category: 'photoshoot', mediaUrl: '/portfolio/photoshoot/DSC_8059 copie.jpg.jpeg' },
  { id: 'port-p9', title: 'Studio Podcast', category: 'photoshoot', mediaUrl: '/portfolio/photoshoot/DSC_8077 copie.jpg.jpeg' },
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
  portfolio: PortfolioItem[]
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
  
  // Portfolio CRUD
  addPortfolioItem: (item: PortfolioItem) => void
  updatePortfolioItem: (id: string, updates: Partial<PortfolioItem>) => void
  deletePortfolioItem: (id: string) => void
}

const LOCAL_STORAGE_KEY = 'overkom_cms_content_v2'

const initialContent: CmsContent = {
  site: defaultSite,
  hero: defaultHero,
  services: defaultServices,
  projects: defaultProjects,
  team: defaultTeam,
  partners: defaultPartners,
  portfolio: defaultPortfolio,
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

  // Portfolio
  addPortfolioItem: (item) => {
    set((state) => ({
      content: {
        ...state.content,
        portfolio: [item, ...state.content.portfolio],
      },
    }))
  },
  updatePortfolioItem: (id, updates) => {
    set((state) => ({
      content: {
        ...state.content,
        portfolio: state.content.portfolio.map((item) => (item.id === id ? { ...item, ...updates } : item)),
      },
    }))
  },
  deletePortfolioItem: (id) => {
    set((state) => ({
      content: {
        ...state.content,
        portfolio: state.content.portfolio.filter((item) => item.id !== id),
      },
    }))
  },
}))
