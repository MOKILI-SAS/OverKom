import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { LeadModal } from '@/features/leads/LeadModal'

export function Layout() {
  return (
    <div className="min-h-screen bg-over-night">
      <Navbar />
      <Outlet />
      <Footer />
      <LeadModal />
      <WhatsAppButton />
    </div>
  )
}
