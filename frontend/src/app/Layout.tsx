import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { LeadModal } from '@/features/leads/LeadModal'

function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Small timeout to ensure the DOM has rendered the new page's elements
      setTimeout(() => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname, hash])

  return null
}

export function Layout() {
  return (
    <div className="min-h-screen bg-over-night">
      <ScrollToHash />
      <Navbar />
      <Outlet />
      <Footer />
      <LeadModal />
      <WhatsAppButton />
    </div>
  )
}
