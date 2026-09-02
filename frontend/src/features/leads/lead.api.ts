import type { LeadPayload } from '@/types'

interface LeadSuccess {
  ok: true
}

interface LeadFailure {
  ok: false
  message: string
  errors?: Record<string, string>
}

export type LeadResponse = LeadSuccess | LeadFailure

const API_URL = import.meta.env.VITE_API_URL ?? ''

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), 12_000)

  try {
    const response = await fetch(`${API_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    if (response.status === 204) {
      return { ok: true }
    }

    const data = (await response.json().catch(() => null)) as
      | { ok?: boolean; message?: string; errors?: Record<string, string> }
      | null

    if (!response.ok) {
      return {
        ok: false,
        message: data?.message ?? 'La demande n’a pas pu être envoyée.',
        errors: data?.errors,
      }
    }

    return { ok: true }
  } catch {
    return {
      ok: false,
      message: 'Réseau indisponible. Réessayez ou écrivez-nous sur WhatsApp.',
    }
  } finally {
    window.clearTimeout(timer)
  }
}
