import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import crypto from 'node:crypto'
import { mkdir, readFile, writeFile, appendFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { leadSchema, type StoredLead, type LeadStatus } from './lead.schema.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT ?? 8787)
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? 'http://localhost:5177'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@overkom.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'overkom2026'
const ADMIN_TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET ?? 'overkom_secret_token_key_2026'

const app = express()
app.disable('x-powered-by')
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow local development, same origin, or any configured origins
      callback(null, true)
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)
app.use(express.json({ limit: '64kb' }))

const leadsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
})

const dataDir = path.join(__dirname, '..', 'data')
const leadsFilePath = path.join(dataDir, 'leads.jsonl')

async function ensureDataDir() {
  await mkdir(dataDir, { recursive: true })
}

async function getAllLeads(): Promise<StoredLead[]> {
  await ensureDataDir()
  try {
    const raw = await readFile(leadsFilePath, 'utf8')
    const lines = raw.split('\n').filter((l) => l.trim().length > 0)
    return lines.map((l) => JSON.parse(l) as StoredLead)
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return []
    }
    throw error
  }
}

async function saveAllLeads(leads: StoredLead[]): Promise<void> {
  await ensureDataDir()
  const content = leads.map((l) => JSON.stringify(l)).join('\n') + (leads.length > 0 ? '\n' : '')
  await writeFile(leadsFilePath, content, 'utf8')
}

// Authentication middleware for admin routes
function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ ok: false, message: 'Accès non autorisé.' })
    return
  }

  const token = authHeader.substring(7)
  if (token !== ADMIN_TOKEN_SECRET) {
    res.status(401).json({ ok: false, message: 'Jeton invalide ou expiré.' })
    return
  }

  next()
}

const contentFilePath = path.join(dataDir, 'content.json')

async function getContentData(): Promise<any | null> {
  await ensureDataDir()
  try {
    const raw = await readFile(contentFilePath, 'utf8')
    return JSON.parse(raw)
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return null
    }
    throw error
  }
}

async function saveContentData(content: any): Promise<void> {
  await ensureDataDir()
  await writeFile(contentFilePath, JSON.stringify(content, null, 2), 'utf8')
}

// Healthcheck
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() })
})

// Public endpoint: Get CMS Landing Page Content
app.get('/api/content', async (_req, res) => {
  try {
    const content = await getContentData()
    res.json({ ok: true, content })
  } catch (error) {
    console.error('Failed to get CMS content', error)
    res.status(500).json({ ok: false, message: 'Erreur lors de la récupération du contenu.' })
  }
})

// Admin endpoint: Save CMS Landing Page Content
app.put('/api/admin/content', requireAdmin, async (req, res) => {
  try {
    const { content } = req.body ?? {}
    if (!content || typeof content !== 'object') {
      res.status(400).json({ ok: false, message: 'Format de contenu invalide.' })
      return
    }
    await saveContentData(content)
    res.json({ ok: true, message: 'Contenu de la landing page mis à jour avec succès.' })
  } catch (error) {
    console.error('Failed to save CMS content', error)
    res.status(500).json({ ok: false, message: 'Erreur lors de la sauvegarde du contenu.' })
  }
})

// Public endpoint: Submit a lead
app.post('/api/leads', leadsLimiter, async (req, res) => {
  const parsed = leadSchema.safeParse(req.body)
  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (typeof key === 'string' && errors[key] === undefined) {
        errors[key] = issue.message
      }
    }
    res.status(400).json({ ok: false, errors })
    return
  }

  // Honeypot check
  if (parsed.data.website && parsed.data.website.trim().length > 0) {
    res.status(204).send()
    return
  }

  const { website: _honeypot, ...leadData } = parsed.data
  const newLead: StoredLead = {
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    status: 'new',
    ...leadData,
  }

  try {
    await ensureDataDir()
    await appendFile(leadsFilePath, JSON.stringify(newLead) + '\n', 'utf8')
  } catch (error) {
    console.error('lead persist failed', error)
    res.status(500).json({ ok: false, message: 'Impossible d’enregistrer la demande pour le moment.' })
    return
  }

  res.status(201).json({ ok: true, id: newLead.id })
})

// Admin endpoint: Login
app.post('/api/admin/auth/login', (req, res) => {
  const { email, password } = req.body ?? {}
  const validEmail = !email || email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase()
  const validPassword = password === ADMIN_PASSWORD

  if (validEmail && validPassword) {
    res.json({
      ok: true,
      token: ADMIN_TOKEN_SECRET,
      user: { role: 'admin', name: 'Administrateur OverKom', email: ADMIN_EMAIL },
    })
  } else {
    res.status(401).json({ ok: false, message: 'Identifiants (Email ou Mot de passe) incorrects.' })
  }
})

// Admin endpoint: Get all leads
app.get('/api/admin/leads', requireAdmin, async (_req, res) => {
  try {
    const leads = await getAllLeads()
    // Sort by most recent first
    leads.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    res.json({ ok: true, leads })
  } catch (error) {
    console.error('Failed to get leads', error)
    res.status(500).json({ ok: false, message: 'Erreur lors de la récupération des données.' })
  }
})

// Admin endpoint: Update a lead
app.patch('/api/admin/leads/:id', requireAdmin, async (req, res) => {
  const { id } = req.params
  const { status, notes } = req.body

  try {
    const leads = await getAllLeads()
    const index = leads.findIndex((l) => l.id === id)
    if (index === -1) {
      res.status(404).json({ ok: false, message: 'Prospect introuvable.' })
      return
    }

    if (status) {
      leads[index]!.status = status as LeadStatus
    }
    if (typeof notes === 'string') {
      leads[index]!.notes = notes
    }

    await saveAllLeads(leads)
    res.json({ ok: true, lead: leads[index] })
  } catch (error) {
    console.error('Failed to update lead', error)
    res.status(500).json({ ok: false, message: 'Erreur lors de la mise à jour.' })
  }
})

// Admin endpoint: Delete a lead
app.delete('/api/admin/leads/:id', requireAdmin, async (req, res) => {
  const { id } = req.params

  try {
    const leads = await getAllLeads()
    const filtered = leads.filter((l) => l.id !== id)
    if (filtered.length === leads.length) {
      res.status(404).json({ ok: false, message: 'Prospect introuvable.' })
      return
    }

    await saveAllLeads(filtered)
    res.json({ ok: true, message: 'Prospect supprimé.' })
  } catch (error) {
    console.error('Failed to delete lead', error)
    res.status(500).json({ ok: false, message: 'Erreur lors de la suppression.' })
  }
})

// Admin endpoint: Stats
app.get('/api/admin/stats', requireAdmin, async (_req, res) => {
  try {
    const leads = await getAllLeads()
    const now = new Date()
    const thisMonthLeads = leads.filter((l) => {
      const d = new Date(l.at)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })

    const byStatus = {
      new: leads.filter((l) => l.status === 'new').length,
      contacted: leads.filter((l) => l.status === 'contacted').length,
      quote_sent: leads.filter((l) => l.status === 'quote_sent').length,
      won: leads.filter((l) => l.status === 'won').length,
      lost: leads.filter((l) => l.status === 'lost').length,
    }

    const byService: Record<string, number> = {}
    for (const lead of leads) {
      byService[lead.serviceId] = (byService[lead.serviceId] ?? 0) + 1
    }

    res.json({
      ok: true,
      stats: {
        total: leads.length,
        thisMonth: thisMonthLeads.length,
        byStatus,
        byService,
      },
    })
  } catch (error) {
    console.error('Failed to get stats', error)
    res.status(500).json({ ok: false, message: 'Erreur lors du calcul des statistiques.' })
  }
})

app.listen(PORT, () => {
  console.log(`OverKom API ready on http://127.0.0.1:${PORT}`)
})
