import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import { stats } from '@/content/stats'
import { fadeUp, stagger } from '@/lib/motion'
import { getWhatsAppLink } from '@/content/site'

import { useContentStore } from '@/store/useContentStore'

export function Hero() {
  const reduce = useReducedMotion()
  const hero = useContentStore((s) => s.content.hero)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback: re-ensure muted and play
        if (videoRef.current) {
          videoRef.current.muted = true
          videoRef.current.play().catch(() => {})
        }
      })
    }
  }, [])

  return (
    <section id="accueil" className="relative isolate min-h-screen overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover object-center bg-black"
      >
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-over-night via-over-night/65 to-black/40" />

      <div className="site-wrap relative z-10 flex min-h-screen flex-col justify-end pb-14 pt-28 md:pb-20">
        <motion.div
          className="max-w-3xl"
          variants={stagger}
          initial={reduce ? false : 'hidden'}
          animate="show"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.28em] text-over-yellow"
          >
            Studio créatif · Conakry
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-3xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl text-white"
          >
            {hero.headline}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base text-white/80 md:text-lg">
            {hero.subheadline}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="over-btn">
              Demander un devis
            </a>
            <a href="/#services" className="over-btn-ghost">
              Voir nos services
              <ArrowDownRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id}>
              <p className="font-display text-3xl font-bold text-over-yellow md:text-4xl">
                {stat.value}
                {stat.suffix ?? ''}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/65">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
