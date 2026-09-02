import { X } from 'lucide-react'
import { LeadForm } from '@/features/leads/LeadForm'
import { services } from '@/content/services'
import { useUiStore } from '@/store/useUiStore'

export function LeadModal() {
  const activeServiceId = useUiStore((s) => s.activeServiceId)
  const leadSource = useUiStore((s) => s.leadSource)
  const closeLeadModal = useUiStore((s) => s.closeLeadModal)

  if (!activeServiceId) return null

  const serviceTitle =
    activeServiceId === 'general'
      ? 'Demander un devis'
      : services.find((s) => s.id === activeServiceId)?.title ?? 'Demander un service'

  return (
    <dialog className="modal modal-open">
      <div className="modal-box relative max-w-lg bg-over-night text-white">
        <button
          type="button"
          className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3"
          aria-label="Fermer"
          onClick={closeLeadModal}
        >
          <X className="h-4 w-4" />
        </button>
        <h3 className="mb-1 font-display text-2xl font-bold">{serviceTitle}</h3>
        <p className="mb-6 text-sm text-over-muted">
          Expliquez-nous le besoin. Nous répondons sous 24 heures.
        </p>
        <LeadForm serviceId={activeServiceId} source={leadSource} onClose={closeLeadModal} />
      </div>
      <button type="button" className="modal-backdrop bg-black/70" aria-label="Fermer" onClick={closeLeadModal} />
    </dialog>
  )
}
