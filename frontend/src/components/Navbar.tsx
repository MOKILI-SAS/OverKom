import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { navLinks, site, getWhatsAppLink } from '@/content/site'
import { cn } from '@/lib/cn'
import { useUiStore } from '@/store/useUiStore'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const mobileNavOpen = useUiStore((s) => s.mobileNavOpen)
  const setMobileNavOpen = useUiStore((s) => s.setMobileNavOpen)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || mobileNavOpen ? 'bg-over-night/90 shadow-lg backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <div className="site-wrap flex h-[6rem] items-center justify-between gap-4">
        <Link to="/" className="shrink-0" onClick={() => setMobileNavOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-sm font-medium text-white/80 transition hover:text-over-yellow"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={site.phoneHref} className="text-sm text-white/70 hover:text-over-yellow">
            {site.phone}
          </a>
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="over-btn !py-2.5 !text-xs">
            Demander un devis
          </a>
        </div>

        <button
          type="button"
          className="btn btn-ghost btn-circle text-white lg:hidden"
          aria-label={mobileNavOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          {mobileNavOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileNavOpen ? (
        <div className="border-t border-white/10 bg-over-night px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-lg text-white"
                onClick={() => setMobileNavOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <NavLink to="/mentions-legales" className="text-sm text-over-muted" onClick={() => setMobileNavOpen(false)}>
              Mentions légales
            </NavLink>
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="over-btn mt-2">
              Demander un devis
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
