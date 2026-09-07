import { useEffect } from 'react'
import { About } from '@/sections/About'
import { Hero } from '@/sections/Hero'
import { Partners } from '@/sections/Partners'
import { Services } from '@/sections/Services'
import { Team } from '@/sections/Team'
import { useContentStore } from '@/store/useContentStore'

export function HomePage() {
  const fetchContent = useContentStore((s) => s.fetchContent)

  useEffect(() => {
    fetchContent()
  }, [fetchContent])
  return (
    <main>
      <Hero />
      <Services />
      <Partners />
      <Team />
      <About />
    </main>
  )
}
