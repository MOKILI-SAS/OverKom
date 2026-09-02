import { useEffect, useState } from 'react'
import {
  ArrowDownToLine,
  CheckCircle,
  Clock,
  ExternalLink,
  Eye,
  Filter,
  Inbox,
  LogOut,
  MessageCircle,
  Phone,
  RefreshCw,
  Search,
  Sparkles,
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { services } from '@/content/services'
import { exportLeadsToCsv } from '@/features/admin/admin.api'
import { LeadDetailsDrawer } from '@/features/admin/LeadDetailsDrawer'
import type { LeadStatus } from '@/features/admin/types'
import { useAdminStore } from '@/features/admin/useAdminStore'
import { CmsEditor } from '@/features/admin/CmsEditor'

const statusBadges: Record<LeadStatus, { label: string; class: string }> = {
  new: { label: 'Nouveau', class: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  contacted: { label: 'Contacté', class: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  quote_sent: { label: 'Devis envoyé', class: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
  won: { label: 'Gagné', class: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  lost: { label: 'Perdu', class: 'bg-rose-500/15 text-rose-400 border-rose-500/30' },
}

export function AdminDashboardPage() {
  const leads = useAdminStore((s) => s.leads)
  const isLoading = useAdminStore((s) => s.isLoading)
  const user = useAdminStore((s) => s.user)
  const loadLeads = useAdminStore((s) => s.loadLeads)
  const loadStats = useAdminStore((s) => s.loadStats)
  const updateStatus = useAdminStore((s) => s.updateStatus)
  const logout = useAdminStore((s) => s.logout)
  const selectedLead = useAdminStore((s) => s.selectedLead)
  const setSelectedLead = useAdminStore((s) => s.setSelectedLead)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [serviceFilter, setServiceFilter] = useState<string>('all')
  const [activeSection, setActiveSection] = useState<'leads' | 'cms'>('leads')

  useEffect(() => {
    loadLeads()
    loadStats()
  }, [loadLeads, loadStats])

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.fullName.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.toLowerCase().includes(search.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(search.toLowerCase())) ||
      lead.message.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    const matchesService = serviceFilter === 'all' || lead.serviceId === serviceFilter

    return matchesSearch && matchesStatus && matchesService
  })

  const newLeadsCount = leads.filter((l) => l.status === 'new').length
  const wonLeadsCount = leads.filter((l) => l.status === 'won').length
  const inProgressCount = leads.filter((l) => l.status === 'contacted' || l.status === 'quote_sent').length

  return (
    <div className="min-h-screen bg-over-night text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-over-night/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
              <Logo className="h-7 w-auto text-white" />
              <ExternalLink className="h-3.5 w-3.5 text-over-muted group-hover:text-over-yellow transition" />
            </a>
            <span className="hidden sm:inline-block rounded-full bg-over-yellow/20 px-2.5 py-0.5 text-xs font-bold text-over-yellow border border-over-yellow/30">
              Admin Suite
            </span>
          </div>

          {/* Section Switcher Tabs */}
          <div className="flex rounded-xl bg-black/40 p-1 border border-white/10">
            <button
              onClick={() => setActiveSection('leads')}
              type="button"
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                activeSection === 'leads' ? 'bg-over-yellow text-over-night' : 'text-gray-400 hover:text-white'
              }`}
            >
              CRM Demandes ({leads.length})
            </button>
            <button
              onClick={() => setActiveSection('cms')}
              type="button"
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                activeSection === 'cms' ? 'bg-over-yellow text-over-night' : 'text-gray-400 hover:text-white'
              }`}
            >
              CMS Landing Page
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                loadLeads()
                loadStats()
              }}
              disabled={isLoading}
              className="flex items-center gap-1.5 rounded-xl bg-over-charcoal px-3 py-1.5 text-xs font-semibold text-white/80 border border-white/10 hover:bg-white/10 hover:text-white transition"
              title="Rafraîchir les données"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin text-over-yellow' : ''}`} />
              <span className="hidden sm:inline">Actualiser</span>
            </button>

            <button
              type="button"
              onClick={() => exportLeadsToCsv(leads)}
              disabled={leads.length === 0}
              className="flex items-center gap-1.5 rounded-xl bg-over-charcoal px-3 py-1.5 text-xs font-semibold text-white/80 border border-white/10 hover:border-over-yellow/40 hover:text-over-yellow transition"
            >
              <ArrowDownToLine className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Exporter CSV</span>
            </button>

            <div className="h-4 w-px bg-white/15 mx-1" />

            <div className="flex items-center gap-2 text-xs text-white/70">
              <span className="hidden md:inline font-medium">{user?.name ?? 'Admin'}</span>
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-1.5 rounded-xl bg-rose-500/15 px-3 py-1.5 text-xs font-semibold text-rose-400 border border-rose-500/20 hover:bg-rose-500/25 transition"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {activeSection === 'cms' ? (
          <CmsEditor />
        ) : (
          <>
            {/* KPI Metrics */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
          <div className="rounded-2xl border border-white/10 bg-over-charcoal p-5 shadow-sm">
            <div className="flex items-center justify-between text-over-muted">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Leads</span>
              <Inbox className="h-4 w-4 text-over-yellow" />
            </div>
            <p className="mt-3 font-display text-3xl font-bold">{leads.length}</p>
            <p className="mt-1 text-xs text-over-muted">Depuis le lancement</p>
          </div>

          <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5 shadow-sm">
            <div className="flex items-center justify-between text-blue-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Nouveaux</span>
              <Sparkles className="h-4 w-4" />
            </div>
            <p className="mt-3 font-display text-3xl font-bold text-blue-400">{newLeadsCount}</p>
            <p className="mt-1 text-xs text-blue-300/80">À contacter rapidement</p>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 shadow-sm">
            <div className="flex items-center justify-between text-amber-400">
              <span className="text-xs font-semibold uppercase tracking-wider">En cours</span>
              <Clock className="h-4 w-4" />
            </div>
            <p className="mt-3 font-display text-3xl font-bold text-amber-400">{inProgressCount}</p>
            <p className="mt-1 text-xs text-amber-300/80">Devis & échanges</p>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 shadow-sm">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Gagnés / Signés</span>
              <CheckCircle className="h-4 w-4" />
            </div>
            <p className="mt-3 font-display text-3xl font-bold text-emerald-400">{wonLeadsCount}</p>
            <p className="mt-1 text-xs text-emerald-300/80">Contrats validés</p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-over-charcoal p-4 sm:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-over-muted" />
              <input
                type="text"
                placeholder="Rechercher par nom, email, téléphone, entreprise, mot-clé..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl bg-black/40 py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 border border-white/10 focus:border-over-yellow focus:outline-none transition"
              />
            </div>

            {/* Selectors */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Service Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5 text-over-muted" />
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="rounded-xl bg-black/40 px-3 py-2 text-xs font-semibold text-white/90 border border-white/10 focus:border-over-yellow focus:outline-none"
                >
                  <option value="all">Tous les services</option>
                  <option value="general">Demande générale</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl bg-black/40 px-3 py-2 text-xs font-semibold text-white/90 border border-white/10 focus:border-over-yellow focus:outline-none"
              >
                <option value="all">Tous les statuts</option>
                <option value="new">Nouveaux</option>
                <option value="contacted">Contactés</option>
                <option value="quote_sent">Devis envoyés</option>
                <option value="won">Gagnés</option>
                <option value="lost">Perdus</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-over-charcoal shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-white/80">
              <thead className="border-b border-white/10 bg-black/30 text-xs font-semibold uppercase tracking-wider text-over-muted">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Client / Entreprise</th>
                  <th className="px-6 py-4">Service demandé</th>
                  <th className="px-6 py-4">Contact direct</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-over-muted">
                      <Inbox className="mx-auto h-8 w-8 text-white/20 mb-2" />
                      Aucune demande ne correspond à vos critères.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const serviceTitle =
                      lead.serviceId === 'general'
                        ? 'Devis 360°'
                        : services.find((s) => s.id === lead.serviceId)?.title ?? lead.serviceId

                    const formattedPhone = lead.phone.replace(/\s+/g, '')
                    const whatsappUrl = `https://wa.me/${formattedPhone.replace('+', '')}?text=${encodeURIComponent(
                      `Bonjour ${lead.fullName}, je vous contacte suite à votre demande pour OverKom 360.`,
                    )}`

                    return (
                      <tr key={lead.id} className="hover:bg-white/[0.02] transition">
                        <td className="whitespace-nowrap px-6 py-4 text-xs text-over-muted">
                          {new Date(lead.at).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                          <span className="block text-[10px] text-white/40">
                            {new Date(lead.at).toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-semibold text-white">{lead.fullName}</div>
                          {lead.company && <div className="text-xs text-over-muted">{lead.company}</div>}
                        </td>

                        <td className="px-6 py-4">
                          <span className="inline-block rounded-lg bg-white/5 px-2.5 py-1 text-xs font-semibold text-over-yellow border border-white/10">
                            {serviceTitle}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${lead.phone}`}
                              className="rounded-lg bg-black/40 p-2 text-white/70 hover:text-over-yellow hover:bg-black/60 transition"
                              title={`Appeler ${lead.phone}`}
                            >
                              <Phone className="h-3.5 w-3.5" />
                            </a>
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg bg-[#25D366]/20 p-2 text-[#25D366] hover:bg-[#25D366]/30 transition"
                              title="Ouvrir WhatsApp"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                            </a>
                            <span className="text-xs text-over-muted">{lead.phone}</span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <select
                            value={lead.status}
                            onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                            className={`rounded-lg px-2.5 py-1 text-xs font-bold border transition cursor-pointer ${
                              statusBadges[lead.status].class
                            } bg-transparent focus:outline-none`}
                          >
                            <option value="new" className="bg-over-night text-white">
                              Nouveau
                            </option>
                            <option value="contacted" className="bg-over-night text-white">
                              Contacté
                            </option>
                            <option value="quote_sent" className="bg-over-night text-white">
                              Devis envoyé
                            </option>
                            <option value="won" className="bg-over-night text-white">
                              Gagné
                            </option>
                            <option value="lost" className="bg-over-night text-white">
                              Perdu
                            </option>
                          </select>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedLead(lead)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-over-yellow/15 px-3 py-1.5 text-xs font-bold text-over-yellow border border-over-yellow/20 hover:bg-over-yellow/25 transition"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>Détails</span>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        </>
        )}
      </main>

      {/* Slide-over Drawer for Lead Details */}
      {selectedLead && (
        <LeadDetailsDrawer lead={selectedLead} onClose={() => setSelectedLead(null)} />
      )}
    </div>
  )
}
