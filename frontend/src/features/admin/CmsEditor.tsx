import { useState } from 'react'
import { Plus, Trash2, Edit2, Save, RefreshCw, CheckCircle, Image, User, Briefcase, Globe, Layers } from 'lucide-react'
import { useContentStore, type MediathequeItem } from '@/store/useContentStore'
import { useAdminStore } from '@/features/admin/useAdminStore'
import type { Service, TeamMember, Project, Partner } from '@/types'

export function CmsEditor() {
  const token = useAdminStore((s) => s.token)
  const {
    content,
    isSaving,
    error,
    saveContent,
    resetToDefaults,
    updateSite,
    updateHero,
    addService,
    updateService,
    deleteService,
    addProject,
    updateProject,
    deleteProject,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    addPartner,
    updatePartner,
    deletePartner,
    addMediathequeItem,
    updateMediathequeItem,
    deleteMediathequeItem,
  } = useContentStore()

  const [activeTab, setActiveTab] = useState<'hero' | 'services' | 'projects' | 'team' | 'partners' | 'mediatheque'>('hero')
  const [saveSuccess, setSaveSaving] = useState(false)

  // Editing modals & forms state
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null)
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [editingMedia, setEditingMedia] = useState<MediathequeItem | null>(null)

  const handleSaveAll = async () => {
    if (!token) return
    const ok = await saveContent(token)
    if (ok) {
      setSaveSaving(true)
      setTimeout(() => setSaveSaving(false), 3000)
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Global Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-card bg-over-charcoal/80 p-5 border border-white/10">
        <div>
          <h2 className="text-xl font-bold font-display text-white">Gestion du Contenu de la Landing Page</h2>
          <p className="text-sm text-gray-400">Modifiez, ajoutez ou supprimez les éléments visibles sur le site en direct.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaults}
            type="button"
            className="flex items-center gap-2 rounded-btn border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-white/10"
          >
            <RefreshCw className="h-4 w-4" /> Réinitialiser
          </button>
          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            type="button"
            className="flex items-center gap-2 rounded-btn bg-over-yellow px-5 py-2.5 text-xs font-bold text-over-night hover:bg-yellow-400 transition"
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" /> Enregistrement...
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle className="h-4 w-4 text-emerald-900" /> Publié avec succès !
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Enregistrer & Publier
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-card border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          {error}
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {[
          { id: 'hero', label: 'Hero & Infos', icon: Globe },
          { id: 'services', label: 'Services', icon: Layers },
          { id: 'projects', label: 'Réalisations', icon: Briefcase },
          { id: 'team', label: 'Équipe', icon: User },
          { id: 'partners', label: 'Partenaires', icon: Image },
          { id: 'mediatheque', label: 'Médiathèque', icon: Image },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 rounded-btn px-4 py-2 text-xs font-bold transition ${
                activeTab === tab.id
                  ? 'bg-over-yellow text-over-night shadow-md'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <Icon className="h-4 w-4" /> {tab.label}
            </button>
          )
        })}
      </div>

      {/* TAB 1: HERO & INFOS GENERALES */}
      {activeTab === 'hero' && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-card bg-over-charcoal/60 p-6 border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-lg text-over-yellow">Textes d'Accroche (Hero)</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Titre Principal</label>
              <input
                type="text"
                value={content.hero.headline}
                onChange={(e) => updateHero({ headline: e.target.value })}
                className="w-full rounded-btn bg-black/40 border border-white/10 px-3 py-2 text-sm text-white focus:border-over-yellow focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Sous-titre / Description</label>
              <textarea
                rows={3}
                value={content.hero.subheadline}
                onChange={(e) => updateHero({ subheadline: e.target.value })}
                className="w-full rounded-btn bg-black/40 border border-white/10 px-3 py-2 text-sm text-white focus:border-over-yellow focus:outline-none"
              />
            </div>
          </div>

          <div className="rounded-card bg-over-charcoal/60 p-6 border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-lg text-over-yellow">Coordonnées Agence</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Téléphone Principal</label>
              <input
                type="text"
                value={content.site.phone}
                onChange={(e) => updateSite({ phone: e.target.value })}
                className="w-full rounded-btn bg-black/40 border border-white/10 px-3 py-2 text-sm text-white focus:border-over-yellow focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Lien WhatsApp (Lien direct sans message)</label>
              <input
                type="text"
                value={content.site.whatsapp}
                onChange={(e) => updateSite({ whatsapp: e.target.value })}
                className="w-full rounded-btn bg-black/40 border border-white/10 px-3 py-2 text-sm text-white focus:border-over-yellow focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Email de Contact</label>
              <input
                type="email"
                value={content.site.email}
                onChange={(e) => updateSite({ email: e.target.value })}
                className="w-full rounded-btn bg-black/40 border border-white/10 px-3 py-2 text-sm text-white focus:border-over-yellow focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Adresse Physiquement Affichée</label>
              <input
                type="text"
                value={content.site.address}
                onChange={(e) => updateSite({ address: e.target.value })}
                className="w-full rounded-btn bg-black/40 border border-white/10 px-3 py-2 text-sm text-white focus:border-over-yellow focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SERVICES */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-lg text-white">Services / Pôles d'Expertise ({content.services.length})</h3>
            <button
              onClick={() =>
                setEditingService({
                  id: 'audiovisuel',
                  title: 'Nouveau Service',
                  category: 'Expertise',
                  tagline: 'Accroche courte',
                  description: 'Description du service...',
                  deliverables: ['Livrable 1', 'Livrable 2'],
                  icon: 'video',
                })
              }
              type="button"
              className="flex items-center gap-2 rounded-btn bg-over-yellow px-4 py-2 text-xs font-bold text-over-night hover:bg-yellow-400"
            >
              <Plus className="h-4 w-4" /> Ajouter un Service
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {content.services.map((srv) => (
              <div key={srv.id} className="rounded-card bg-over-charcoal/60 p-5 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase bg-white/10 text-over-yellow px-2 py-0.5 rounded">
                      {srv.category}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-white text-base">{srv.title}</h4>
                  <p className="text-xs text-over-yellow mt-1 italic">{srv.tagline}</p>
                  <p className="text-xs text-gray-300 mt-2 line-clamp-3">{srv.description}</p>
                </div>
                <div className="flex gap-2 mt-4 pt-3 border-t border-white/10">
                  <button
                    onClick={() => setEditingService(srv)}
                    type="button"
                    className="flex-1 flex items-center justify-center gap-1 rounded bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20"
                  >
                    <Edit2 className="h-3.5 w-3.5" /> Modifier
                  </button>
                  <button
                    onClick={() => deleteService(srv.id)}
                    type="button"
                    className="flex items-center justify-center rounded bg-rose-500/20 px-3 py-1.5 text-xs text-rose-300 hover:bg-rose-500/30"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-lg text-white">Réalisations & Projets ({content.projects.length})</h3>
            <button
              onClick={() =>
                setEditingProject({
                  id: `proj-${Date.now()}`,
                  title: 'Nouveau Projet',
                  client: 'Nom du Client',
                  category: 'audiovisuel',
                  year: new Date().getFullYear(),
                  summary: 'Résumé de la réalisation...',
                  image: '/images/shoot/DSC055453832.jpg.jpeg',
                  tags: ['Campagne 360°'],
                })
              }
              type="button"
              className="flex items-center gap-2 rounded-btn bg-over-yellow px-4 py-2 text-xs font-bold text-over-night hover:bg-yellow-400"
            >
              <Plus className="h-4 w-4" /> Ajouter une Réalisation
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {content.projects.map((proj) => (
              <div key={proj.id} className="rounded-card bg-over-charcoal/60 p-4 border border-white/10 flex gap-4">
                <img src={proj.image} alt={proj.title} className="h-24 w-24 object-cover rounded-btn bg-black/50 shrink-0" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-over-yellow">{proj.client} • {proj.year}</span>
                    <h4 className="font-display font-bold text-white text-sm line-clamp-1">{proj.title}</h4>
                    <p className="text-xs text-gray-300 line-clamp-2 mt-1">{proj.summary}</p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setEditingProject(proj)}
                      type="button"
                      className="flex items-center gap-1 rounded bg-white/10 px-2.5 py-1 text-xs text-white hover:bg-white/20"
                    >
                      <Edit2 className="h-3 w-3" /> Éditer
                    </button>
                    <button
                      onClick={() => deleteProject(proj.id)}
                      type="button"
                      className="flex items-center rounded bg-rose-500/20 px-2 py-1 text-xs text-rose-300 hover:bg-rose-500/30"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: TEAM */}
      {activeTab === 'team' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-lg text-white">Membres de l'Équipe ({content.team.length})</h3>
            <button
              onClick={() =>
                setEditingTeam({
                  id: `team-${Date.now()}`,
                  name: 'Nom Prénom',
                  role: 'Poste / Rôle',
                  photo: '/images/shoot/DSC02373 copie.jpg.jpeg',
                })
              }
              type="button"
              className="flex items-center gap-2 rounded-btn bg-over-yellow px-4 py-2 text-xs font-bold text-over-night hover:bg-yellow-400"
            >
              <Plus className="h-4 w-4" /> Ajouter un Membre
            </button>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {content.team.map((member) => (
              <div key={member.id} className="rounded-card bg-over-charcoal/60 p-3 border border-white/10 text-center flex flex-col justify-between">
                <div>
                  <img src={member.photo} alt={member.name} className="h-28 w-full object-cover rounded-btn bg-black/50 mb-2" />
                  <h4 className="font-display font-bold text-white text-sm line-clamp-1">{member.name}</h4>
                  <p className="text-xs text-over-yellow">{member.role}</p>
                </div>
                <div className="flex gap-1 mt-3">
                  <button
                    onClick={() => setEditingTeam(member)}
                    type="button"
                    className="flex-1 rounded bg-white/10 py-1 text-xs text-white hover:bg-white/20"
                  >
                    Éditer
                  </button>
                  <button
                    onClick={() => deleteTeamMember(member.id)}
                    type="button"
                    className="rounded bg-rose-500/20 px-2 py-1 text-xs text-rose-300 hover:bg-rose-500/30"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PARTNERS */}
      {activeTab === 'partners' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-lg text-white">Partenaires ({content.partners.length})</h3>
            <button
              onClick={() =>
                setEditingPartner({
                  id: `partner-${Date.now()}`,
                  name: 'Nouveau Partenaire',
                  logo: '/images/shoot/DSC055453832.jpg.jpeg',
                })
              }
              type="button"
              className="flex items-center gap-2 rounded-btn bg-over-yellow px-4 py-2 text-xs font-bold text-over-night hover:bg-yellow-400"
            >
              <Plus className="h-4 w-4" /> Ajouter un Partenaire
            </button>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {content.partners.map((partner) => (
              <div key={partner.id} className="rounded-card bg-over-charcoal/60 p-3 border border-white/10 text-center flex flex-col justify-between">
                <div>
                  <div className="h-16 w-full bg-white/5 rounded-btn flex items-center justify-center p-2 mb-2">
                    <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <h4 className="font-display font-bold text-white text-xs line-clamp-1">{partner.name}</h4>
                </div>
                <div className="flex gap-1 mt-3">
                  <button
                    onClick={() => setEditingPartner(partner)}
                    type="button"
                    className="flex-1 rounded bg-white/10 py-1 text-xs text-white hover:bg-white/20"
                  >
                    Éditer
                  </button>
                  <button
                    onClick={() => deletePartner(partner.id)}
                    type="button"
                    className="rounded bg-rose-500/20 px-2 py-1 text-xs text-rose-300 hover:bg-rose-500/30"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: MEDIATHEQUE */}
      {activeTab === 'mediatheque' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-lg text-white">Photos Médiathèque / Terrain ({content.mediatheque.length})</h3>
            <button
              onClick={() =>
                setEditingMedia({
                  id: `media-${Date.now()}`,
                  title: 'Nouveau Shoot',
                  image: '/images/shoot/DSC055453832.jpg.jpeg',
                })
              }
              type="button"
              className="flex items-center gap-2 rounded-btn bg-over-yellow px-4 py-2 text-xs font-bold text-over-night hover:bg-yellow-400"
            >
              <Plus className="h-4 w-4" /> Ajouter une Photo
            </button>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {content.mediatheque.map((item) => (
              <div key={item.id} className="rounded-card bg-over-charcoal/60 p-3 border border-white/10 text-center flex flex-col justify-between">
                <div>
                  <img src={item.image} alt={item.title} className="h-28 w-full object-cover rounded-btn bg-black/50 mb-2" />
                  <h4 className="font-display font-bold text-white text-xs line-clamp-1">{item.title}</h4>
                </div>
                <div className="flex gap-1 mt-3">
                  <button
                    onClick={() => setEditingMedia(item)}
                    type="button"
                    className="flex-1 rounded bg-white/10 py-1 text-xs text-white hover:bg-white/20"
                  >
                    Éditer
                  </button>
                  <button
                    onClick={() => deleteMediathequeItem(item.id)}
                    type="button"
                    className="rounded bg-rose-500/20 px-2 py-1 text-xs text-rose-300 hover:bg-rose-500/30"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDIT MODAL: SERVICE */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-lg rounded-card bg-over-charcoal p-6 border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-lg text-white">Éditer le Service</h3>
            <input
              type="text"
              placeholder="Titre"
              value={editingService.title}
              onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
              className="w-full rounded bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
            />
            <input
              type="text"
              placeholder="Catégorie"
              value={editingService.category}
              onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
              className="w-full rounded bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
            />
            <input
              type="text"
              placeholder="Accroche (Tagline)"
              value={editingService.tagline}
              onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
              className="w-full rounded bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
            />
            <textarea
              placeholder="Description"
              rows={3}
              value={editingService.description}
              onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
              className="w-full rounded bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setEditingService(null)} className="rounded px-4 py-2 text-xs text-gray-300 bg-white/10">Annuler</button>
              <button
                onClick={() => {
                  const exists = content.services.some((s) => s.id === editingService.id)
                  if (exists) updateService(editingService.id, editingService)
                  else addService(editingService)
                  setEditingService(null)
                }}
                className="rounded px-4 py-2 text-xs font-bold text-over-night bg-over-yellow"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL: PROJECT */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-lg rounded-card bg-over-charcoal p-6 border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-lg text-white">Éditer la Réalisation</h3>
            <input
              type="text"
              placeholder="Titre du Projet"
              value={editingProject.title}
              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
              className="w-full rounded bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
            />
            <input
              type="text"
              placeholder="Nom du Client"
              value={editingProject.client}
              onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
              className="w-full rounded bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
            />
            <input
              type="text"
              placeholder="URL de l'image"
              value={editingProject.image}
              onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
              className="w-full rounded bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
            />
            <textarea
              placeholder="Résumé"
              rows={2}
              value={editingProject.summary}
              onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
              className="w-full rounded bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setEditingProject(null)} className="rounded px-4 py-2 text-xs text-gray-300 bg-white/10">Annuler</button>
              <button
                onClick={() => {
                  const exists = content.projects.some((p) => p.id === editingProject.id)
                  if (exists) updateProject(editingProject.id, editingProject)
                  else addProject(editingProject)
                  setEditingProject(null)
                }}
                className="rounded px-4 py-2 text-xs font-bold text-over-night bg-over-yellow"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL: TEAM */}
      {editingTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-lg rounded-card bg-over-charcoal p-6 border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-lg text-white">Éditer le Membre de l'Équipe</h3>
            <input
              type="text"
              placeholder="Nom complet"
              value={editingTeam.name}
              onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
              className="w-full rounded bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
            />
            <input
              type="text"
              placeholder="Rôle / Poste"
              value={editingTeam.role}
              onChange={(e) => setEditingTeam({ ...editingTeam, role: e.target.value })}
              className="w-full rounded bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
            />
            <input
              type="text"
              placeholder="URL de la photo"
              value={editingTeam.photo}
              onChange={(e) => setEditingTeam({ ...editingTeam, photo: e.target.value })}
              className="w-full rounded bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setEditingTeam(null)} className="rounded px-4 py-2 text-xs text-gray-300 bg-white/10">Annuler</button>
              <button
                onClick={() => {
                  const exists = content.team.some((m) => m.id === editingTeam.id)
                  if (exists) updateTeamMember(editingTeam.id, editingTeam)
                  else addTeamMember(editingTeam)
                  setEditingTeam(null)
                }}
                className="rounded px-4 py-2 text-xs font-bold text-over-night bg-over-yellow"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL: PARTNER */}
      {editingPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-lg rounded-card bg-over-charcoal p-6 border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-lg text-white">Éditer le Partenaire</h3>
            <input
              type="text"
              placeholder="Nom du Partenaire"
              value={editingPartner.name}
              onChange={(e) => setEditingPartner({ ...editingPartner, name: e.target.value })}
              className="w-full rounded bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
            />
            <input
              type="text"
              placeholder="URL du Logo"
              value={editingPartner.logo}
              onChange={(e) => setEditingPartner({ ...editingPartner, logo: e.target.value })}
              className="w-full rounded bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setEditingPartner(null)} className="rounded px-4 py-2 text-xs text-gray-300 bg-white/10">Annuler</button>
              <button
                onClick={() => {
                  const exists = content.partners.some((pt) => pt.id === editingPartner.id)
                  if (exists) updatePartner(editingPartner.id, editingPartner)
                  else addPartner(editingPartner)
                  setEditingPartner(null)
                }}
                className="rounded px-4 py-2 text-xs font-bold text-over-night bg-over-yellow"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL: MEDIATHEQUE */}
      {editingMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-lg rounded-card bg-over-charcoal p-6 border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-lg text-white">Éditer la Photo Médiathèque</h3>
            <input
              type="text"
              placeholder="Titre de la photo"
              value={editingMedia.title}
              onChange={(e) => setEditingMedia({ ...editingMedia, title: e.target.value })}
              className="w-full rounded bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
            />
            <input
              type="text"
              placeholder="URL de l'image"
              value={editingMedia.image}
              onChange={(e) => setEditingMedia({ ...editingMedia, image: e.target.value })}
              className="w-full rounded bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setEditingMedia(null)} className="rounded px-4 py-2 text-xs text-gray-300 bg-white/10">Annuler</button>
              <button
                onClick={() => {
                  const exists = content.mediatheque.some((item) => item.id === editingMedia.id)
                  if (exists) updateMediathequeItem(editingMedia.id, editingMedia)
                  else addMediathequeItem(editingMedia)
                  setEditingMedia(null)
                }}
                className="rounded px-4 py-2 text-xs font-bold text-over-night bg-over-yellow"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
