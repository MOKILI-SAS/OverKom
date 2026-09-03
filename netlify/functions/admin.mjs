const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'overkom2026'
const ADMIN_TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'overkom_secret_token_key_2026'

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
}

// In-memory demo leads for serverless instances (or connects to external DB in production)
let inMemoryLeads = [
  {
    id: 'lead-101',
    at: '2026-08-30T14:22:00.000Z',
    status: 'new',
    fullName: 'Ibrahima Diallo',
    email: 'i.diallo@bauxit-guinee.com',
    phone: '+224622114455',
    company: 'Société Minière de Boké',
    serviceId: 'audiovisuel',
    source: 'service-card',
    message: "Bonjour OverKom, nous souhaitons réaliser un film d'entreprise institutionnel de 3 minutes sur nos installations portuaires à Kamsar avec prises de vue par drone.",
  },
  {
    id: 'lead-102',
    at: '2026-08-31T09:15:00.000Z',
    status: 'contacted',
    fullName: 'Aissatou Camara',
    email: 'aissatou@kreatyva-events.com',
    phone: '+224664889900',
    company: 'Kreatyva Agency',
    serviceId: 'strategie',
    source: 'hero',
    message: 'Bonjour, nous aimerions refondre notre identité de marque et notre stratégie de contenu social media pour la saison 2026-2027. Quel est votre délai pour un premier atelier de cadrage ?',
  },
  {
    id: 'lead-103',
    at: '2026-08-31T17:40:00.000Z',
    status: 'quote_sent',
    fullName: 'Mamoudou Conde',
    email: 'mconde@hotel-riviera.gn',
    phone: '+224655332211',
    company: 'Riviera Conakry Hotel',
    serviceId: 'photo',
    source: 'footer',
    message: 'Nous recherchons un photographe professionnel et une équipe de tournage pour notre nouvelle carte de restaurant gastronomique et nos suites VIP.',
  },
]

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers }
  }

  const path = event.path || ''

  // 1. Login endpoint
  if (event.httpMethod === 'POST' && (path.endsWith('/login') || path.endsWith('/auth/login'))) {
    let body = {}
    try {
      body = JSON.parse(event.body || '{}')
    } catch {}

    const email = body.email || ''
    const password = body.password || ''
    const validEmail = !email || email.toLowerCase().trim() === 'admin@overkom.com'
    const validPassword = password === ADMIN_PASSWORD

    if (validEmail && validPassword) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          ok: true,
          token: ADMIN_TOKEN_SECRET,
          user: { role: 'admin', name: 'Administrateur OverKom', email: 'admin@overkom.com' },
        }),
      }
    }
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ ok: false, message: 'Identifiants incorrects.' }),
    }
  }

  // Check auth header for protected routes
  const authHeader = event.headers.authorization || event.headers.Authorization
  if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.substring(7) !== ADMIN_TOKEN_SECRET) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ ok: false, message: 'Accès non autorisé.' }),
    }
  }

  // 2. Stats endpoint
  if (event.httpMethod === 'GET' && path.endsWith('/stats')) {
    const byStatus = {
      new: inMemoryLeads.filter((l) => l.status === 'new').length,
      contacted: inMemoryLeads.filter((l) => l.status === 'contacted').length,
      quote_sent: inMemoryLeads.filter((l) => l.status === 'quote_sent').length,
      won: inMemoryLeads.filter((l) => l.status === 'won').length,
      lost: inMemoryLeads.filter((l) => l.status === 'lost').length,
    }
    const byService = {}
    for (const l of inMemoryLeads) {
      byService[l.serviceId] = (byService[l.serviceId] || 0) + 1
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        stats: {
          total: inMemoryLeads.length,
          thisMonth: inMemoryLeads.length,
          byStatus,
          byService,
        },
      }),
    }
  }

  // 3. GET /leads endpoint
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, leads: inMemoryLeads }),
    }
  }

  // 4. PATCH /leads/:id
  if (event.httpMethod === 'PATCH') {
    const id = path.split('/').pop()
    let updates = {}
    try {
      updates = JSON.parse(event.body || '{}')
    } catch {}

    const index = inMemoryLeads.findIndex((l) => l.id === id)
    if (index !== -1) {
      inMemoryLeads[index] = { ...inMemoryLeads[index], ...updates }
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true, lead: inMemoryLeads[index] }),
      }
    }
    return { statusCode: 404, headers, body: JSON.stringify({ ok: false, message: 'Lead not found' }) }
  }

  // 5. DELETE /leads/:id
  if (event.httpMethod === 'DELETE' && path.includes('/leads/')) {
    const id = path.split('/').pop()
    inMemoryLeads = inMemoryLeads.filter((l) => l.id !== id)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, message: 'Prospect supprimé.' }),
    }
  }

  // 6. PUT /content
  if (event.httpMethod === 'PUT' && path.endsWith('/content')) {
    // In serverless mode, we just return ok so the frontend handles it via localStorage
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, message: 'Contenu sauvegardé localement.' }),
    }
  }

  return { statusCode: 405, headers, body: JSON.stringify({ ok: false, message: 'Méthode non supportée' }) }
}
