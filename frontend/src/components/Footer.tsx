import { Link } from 'react-router-dom'
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { navLinks, site } from '@/content/site'
import { useUiStore } from '@/store/useUiStore'

const socialIcons = {
  Facebook,
  Instagram,
} as const

export function Footer() {
  const openLeadModal = useUiStore((s) => s.openLeadModal)
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="border-t border-white/10 bg-black">
      <div className="site-wrap grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="mb-5 h-12" />
          <p className="max-w-md text-over-muted">{site.tagline}</p>
          <p className="mt-3 max-w-md text-sm text-white/60">
            Agence créative full-service à Conakry — communication 360° pour les
            entreprises guinéennes.
          </p>
          <button type="button" className="over-btn mt-6" onClick={() => openLeadModal('general', 'footer')}>
            Parler de votre projet
          </button>
        </div>

        <div>
          <p className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-over-yellow">
            Navigation
          </p>
          <ul className="space-y-2 text-sm text-white/75">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-over-yellow">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/mentions-legales" className="hover:text-over-yellow">
                Mentions légales
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-over-yellow">
            Contact
          </p>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-over-yellow" />
              <span>
                {site.address}
                <br />
                {site.city}, {site.country}
              </span>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-over-yellow" />
              <a href={site.phoneHref} className="hover:text-over-yellow">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-over-yellow" />
              <a href={`mailto:${site.email}`} className="hover:text-over-yellow">
                {site.email}
              </a>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            {site.socials.map((social) => {
              const Icon = socialIcons[social.label as keyof typeof socialIcons]
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-over-yellow hover:text-over-yellow"
                >
                  {Icon ? <Icon className="h-4 w-4" /> : social.label}
                </a>
              )
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="site-wrap flex flex-col items-center justify-between gap-2 text-xs text-white/40 sm:flex-row">
          <p>
            © {year} {site.name}. Tous droits réservés.
          </p>
          <a
            href={site.credit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/55 transition hover:text-over-yellow"
          >
            {site.credit.label}
          </a>
        </div>
      </div>
    </footer>
  )
}
