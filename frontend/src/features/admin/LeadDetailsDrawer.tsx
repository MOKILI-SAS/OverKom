import { useState } from 'react'
import {
  Building,
  Calendar,
  CheckCircle2,
  FileText,
  Mail,
  MessageCircle,
  Phone,
  Save,
  Trash2,
  User,
  X,
} from 'lucide-react'
import { services } from '@/content/services'
import type { LeadStatus, StoredLead } from './types'
import { useAdminStore } from './useAdminStore'

interface Props {
  lead: StoredLead | null
  onClose: () => void
}

const statusOptions: { value: LeadStatus; label: string; color: string }[] = [
  { value: 'new', label: 'Nouveau', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { value: 'contacted', label: 'Contacté', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { value: 'quote_sent', label: 'Devis envoyé', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  { value: 'won', label: 'Gagné (Signé)', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  { value: 'lost', label: 'Perdu / Archivé', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
]

export function LeadDetailsDrawer({ lead, onClose }: Props) {
  const updateStatus = useAdminStore((s) => s.updateStatus)
  const deleteLead = useAdminStore((s) => s.deleteLead)

  const [notes, setNotes] = useState(lead?.notes ?? '')
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  if (!lead) return null

  const serviceTitle =
    lead.serviceId === 'general'
      ? 'Demande générale / Devis 360°'
      : services.find((s) => s.id === lead.serviceId)?.title ?? lead.serviceId

  const formattedPhone = lead.phone.replace(/\s+/g, '')
  const whatsappUrl = `https://wa.me/${formattedPhone.replace('+', '')}?text=${encodeURIComponent(
    `Bonjour ${lead.fullName}, je vous contacte suite à votre demande de devis pour ${serviceTitle} auprès d'OverKom 360.`,
  )}`

  const handleSaveNotes = async () => {
    setIsSaving(true)
    await updateStatus(lead.id, lead.status, notes)
    setIsSaving(false)
  }

  const handleDelete = async () => {
    if (window.confirm(`Confirmez-vous la suppression de la demande de ${lead.fullName} ?`)) {
      setIsDeleting(true)
      await deleteLead(lead.id)
      setIsDeleting(false)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity">
      <div className="relative flex h-full w-full max-w-xl flex-col bg-over-night border-l border-white/10 p-6 sm:p-8 overflow-y-auto text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-5">
          <div>
            <span className="inline-block rounded-full bg-over-yellow/20 px-3 py-1 font-display text-xs font-bold text-over-yellow border border-over-yellow/30">
              {serviceTitle}
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold">{lead.fullName}</h2>
            <div className="mt-1 flex items-center gap-2 text-xs text-over-muted">
              <Calendar className="h-3.5 w-3.5" />
              <span>{new Date(lead.at).toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' })}</span>
              <span>·</span>
              <span>Source: {lead.source}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-white/60 hover:bg-white/10 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Contact Actions */}
        <div className="my-6 grid grid-cols-3 gap-3">
          <a
            href={`tel:${lead.phone}`}
            className="flex flex-col items-center justify-center rounded-xl bg-over-charcoal p-3 text-center border border-white/5 hover:border-over-yellow/50 transition group"
          >
            <Phone className="h-5 w-5 text-over-yellow group-hover:scale-110 transition" />
            <span className="mt-1.5 text-xs font-semibold text-white/90">Appeler</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center rounded-xl bg-[#25D366]/15 p-3 text-center border border-[#25D366]/30 hover:bg-[#25D366]/25 transition group"
          >
            <MessageCircle className="h-5 w-5 text-[#25D366] group-hover:scale-110 transition" />
            <span className="mt-1.5 text-xs font-semibold text-[#25D366]">WhatsApp</span>
          </a>

          <a
            href={`mailto:${lead.email}?subject=Votre%20demande%20OverKom%20360%20-%20${encodeURIComponent(serviceTitle)}`}
            className="flex flex-col items-center justify-center rounded-xl bg-over-charcoal p-3 text-center border border-white/5 hover:border-over-yellow/50 transition group"
          >
            <Mail className="h-5 w-5 text-over-yellow group-hover:scale-110 transition" />
            <span className="mt-1.5 text-xs font-semibold text-white/90">Email</span>
          </a>
        </div>

        {/* Status Pipeline Selector */}
        <div className="mb-6 rounded-2xl bg-over-charcoal p-4 border border-white/5">
          <label className="text-xs font-semibold uppercase tracking-wider text-over-muted">
            Statut du Prospect
          </label>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {statusOptions.map((opt) => {
              const active = lead.status === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateStatus(lead.id, opt.value, notes)}
                  className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold border transition ${
                    active ? `${opt.color} ring-2 ring-over-yellow/50` : 'bg-black/20 text-white/60 border-white/5 hover:bg-white/5'
                  }`}
                >
                  {active && <CheckCircle2 className="h-3.5 w-3.5" />}
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Client Details */}
        <div className="mb-6 space-y-3 rounded-2xl bg-over-charcoal p-5 border border-white/5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-over-yellow">Coordonnées</h3>
          
          <div className="flex items-center gap-3 text-sm">
            <User className="h-4 w-4 text-over-muted shrink-0" />
            <span className="text-white/80">{lead.fullName}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-over-muted shrink-0" />
            <a href={`mailto:${lead.email}`} className="text-white/80 hover:text-over-yellow transition underline">
              {lead.email}
            </a>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-over-muted shrink-0" />
            <a href={`tel:${lead.phone}`} className="text-white/80 hover:text-over-yellow transition">
              {lead.phone}
            </a>
          </div>

          {lead.company && (
            <div className="flex items-center gap-3 text-sm">
              <Building className="h-4 w-4 text-over-muted shrink-0" />
              <span className="text-white/80">{lead.company}</span>
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className="mb-6 rounded-2xl bg-over-charcoal p-5 border border-white/5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-over-yellow">
            <FileText className="h-4 w-4" />
            <span>Brief / Message du client</span>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-white/90 bg-black/30 p-4 rounded-xl border border-white/5">
            {lead.message}
          </p>
        </div>

        {/* Internal Notes */}
        <div className="mb-8 rounded-2xl bg-over-charcoal p-5 border border-white/5">
          <div className="flex items-center justify-between">
            <label htmlFor="admin-notes" className="text-xs font-bold uppercase tracking-wider text-over-yellow">
              Notes internes & Suivi
            </label>
            <button
              type="button"
              onClick={handleSaveNotes}
              disabled={isSaving}
              className="flex items-center gap-1.5 text-xs font-semibold text-over-yellow hover:underline"
            >
              <Save className="h-3.5 w-3.5" />
              {isSaving ? 'Enregistrement...' : 'Enregistrer la note'}
            </button>
          </div>
          <textarea
            id="admin-notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ajoutez des notes internes : date du rappel, montant devis estimé, interlocuteur..."
            className="mt-3 w-full rounded-xl bg-black/40 p-3 text-sm text-white border border-white/10 focus:border-over-yellow focus:outline-none"
          />
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 rounded-xl bg-rose-500/10 px-4 py-2.5 text-xs font-semibold text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition"
          >
            <Trash2 className="h-4 w-4" />
            {isDeleting ? 'Suppression...' : 'Supprimer le lead'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-white/10 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}
