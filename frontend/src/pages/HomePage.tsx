import { useEffect } from 'react'
import { About } from '@/sections/About'
import { Hero } from '@/sections/Hero'
import { Partners } from '@/sections/Partners'
import { Projects } from '@/sections/Projects'
import { Services } from '@/sections/Services'
import { Team } from '@/sections/Team'
import { Mediatheque } from '@/sections/Mediatheque'
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
      <Projects />
      <Partners />
      <Team />
      <Mediatheque />
      <About />
    </main>
  )
}
