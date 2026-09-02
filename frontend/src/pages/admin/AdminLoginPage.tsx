import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { useAdminStore } from '@/features/admin/useAdminStore'

export function AdminLoginPage() {
  const [email, setEmail] = useState('admin@overkom.com')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const login = useAdminStore((s) => s.login)
  const isLoading = useAdminStore((s) => s.isLoading)
  const error = useAdminStore((s) => s.error)
  const clearError = useAdminStore((s) => s.clearError)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return

    try {
      await login(email.trim(), password)
      navigate('/admin')
    } catch {
      // Error handled in store
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-over-night px-4 py-12 text-white">
      {/* Background radial glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-over-yellow/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back link */}
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-over-muted hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au site public
        </a>

        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-over-charcoal/90 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center text-center">
            <Logo className="h-10 w-auto text-white" />
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-over-yellow/15 px-3 py-1 text-xs font-bold text-over-yellow border border-over-yellow/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              Espace Administration
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">Accès Dashboard</h1>
            <p className="mt-1 text-sm text-over-muted">
              Connectez-vous pour consulter et gérer la plateforme.
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-xl bg-rose-500/15 border border-rose-500/30 p-3.5 text-xs text-rose-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-semibold uppercase tracking-wider text-over-muted mb-2">
                Adresse e-mail
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-over-muted">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    if (error) clearError()
                    setEmail(e.target.value)
                  }}
                  placeholder="admin@overkom.com"
                  autoFocus
                  required
                  className="w-full rounded-xl bg-black/40 py-3 pl-10 pr-4 text-sm text-white placeholder-white/25 border border-white/10 focus:border-over-yellow focus:outline-none focus:ring-1 focus:ring-over-yellow transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-pass" className="block text-xs font-semibold uppercase tracking-wider text-over-muted mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-over-muted">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="admin-pass"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    if (error) clearError()
                    setPassword(e.target.value)
                  }}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl bg-black/40 py-3 pl-10 pr-10 text-sm text-white placeholder-white/25 border border-white/10 focus:border-over-yellow focus:outline-none focus:ring-1 focus:ring-over-yellow transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-over-muted hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="over-btn w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-over-muted/70">
            Protocole sécurisé OverKom 360 · MOKILI Engine
          </div>
        </div>
      </div>
    </div>
  )
}
