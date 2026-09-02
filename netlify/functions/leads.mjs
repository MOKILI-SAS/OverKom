const SERVICE_IDS = new Set([
  'audiovisuel',
  'photo',
  'digital',
  'podcast',
  'strategie',
  'web',
  'general',
])

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ ok: false, message: 'Méthode non autorisée' }) }
  }

  let payload
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, message: 'JSON invalide' }) }
  }

  if (typeof payload.website === 'string' && payload.website.trim().length > 0) {
    return { statusCode: 204, headers }
  }

  const errors = {}
  const fullName = String(payload.fullName ?? '').trim()
  const email = String(payload.email ?? '').trim()
  const phone = String(payload.phone ?? '').trim()
  const message = String(payload.message ?? '').trim()
  const serviceId = String(payload.serviceId ?? '')
  const source = String(payload.source ?? '')

  if (fullName.length < 2 || fullName.length > 80) errors.fullName = 'Nom invalide'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'E-mail invalide'
  if (!/^[+0-9\s.-]{8,20}$/.test(phone)) errors.phone = 'Téléphone invalide'
  if (message.length < 10 || message.length > 1000) errors.message = 'Message invalide'
  if (!SERVICE_IDS.has(serviceId)) errors.serviceId = 'Service invalide'
  if (!['service-card', 'hero', 'footer'].includes(source)) errors.source = 'Source invalide'

  if (Object.keys(errors).length > 0) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, errors }) }
  }

  console.log(
    JSON.stringify({
      at: new Date().toISOString(),
      fullName,
      email,
      phone,
      company: payload.company || undefined,
      serviceId,
      message,
      source,
    }),
  )

  return { statusCode: 201, headers, body: JSON.stringify({ ok: true }) }
}
