import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContentStore } from '@/store/useContentStore'
import { Image, Video, Camera } from 'lucide-react'
import type { PortfolioCategory, PortfolioItem } from '@/types'

export function PortfolioPage() {
  const { content } = useContentStore()
  const portfolio = content.portfolio || []
  
  const [activeTab, setActiveTab] = useState<PortfolioCategory>('graphisme')

  const filteredItems = portfolio.filter((item) => item.category === activeTab)

  const tabs: { id: PortfolioCategory; label: string; icon: React.FC<any> }[] = [
    { id: 'graphisme', label: 'Graphisme', icon: Image },
    { id: 'photoshoot', label: 'Photoshoot', icon: Camera },
    { id: 'video', label: 'Vidéo Shoot', icon: Video },
  ]

  // Fonction pour extraire et rendre le iframe proprement
  const renderVideoPlayer = (item: PortfolioItem) => {
    // Si c'est déjà un code Iframe
    if (item.mediaUrl.includes('<iframe')) {
      return (
        <div 
          className="w-full h-full flex items-center justify-center bg-black rounded-btn overflow-hidden"
          dangerouslySetInnerHTML={{ __html: item.mediaUrl }} 
        />
      )
    }

    // Si c'est un lien Facebook normal (embed direct via plugin facebook)
    if (item.mediaUrl.includes('facebook.com') || item.mediaUrl.includes('fb.watch')) {
       // Convertir lien de partage facebook direct vers Iframe si possible, sinon utiliser tel quel
       const embedUrl = item.mediaUrl.includes('plugins/video.php') 
          ? item.mediaUrl 
          : `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(item.mediaUrl)}&show_text=false&width=auto`

       return (
        <iframe 
          src={embedUrl}
          className="w-full h-full min-h-[300px] border-none overflow-hidden rounded-btn bg-black"
          scrolling="no" 
          frameBorder="0" 
          allowFullScreen={true} 
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
        />
       )
    }

    // Youtube court
    if (item.mediaUrl.includes('youtu.be/') || item.mediaUrl.includes('youtube.com/watch')) {
      let videoId = ''
      if (item.mediaUrl.includes('youtu.be/')) videoId = item.mediaUrl.split('youtu.be/')[1]?.split('?')[0] || ''
      else videoId = item.mediaUrl.split('v=')[1]?.split('&')[0] || ''

      return (
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}`}
          className="w-full h-full min-h-[300px] border-none rounded-btn"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )
    }

    // Fallback vidéo html classique
    return (
      <video src={item.mediaUrl} controls className="w-full h-full min-h-[300px] object-contain bg-black rounded-btn" />
    )
  }

  return (
    <main className="flex-1 flex flex-col font-sans">
      {/* HEADER PORTFOLIO */}
      <section className="pt-32 pb-12 px-5 bg-gradient-to-b from-black to-over-night text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold"
          >
            Notre <span className="text-over-yellow italic">Portfolio</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 md:text-lg max-w-2xl mx-auto"
          >
            Découvrez nos réalisations en design graphique, séances photos professionnelles et productions vidéo.
          </motion.p>
        </div>
      </section>

      {/* TABS */}
      <section className="px-5 pb-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4 border-b border-white/10 pb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-btn font-display font-bold text-sm md:text-base transition-all duration-300 ${
                  isActive 
                    ? 'bg-over-yellow text-over-night shadow-lg scale-105' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </section>

      {/* GRID */}
      <section className="px-5 pb-24 flex-1">
        <div className="max-w-7xl mx-auto min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.length === 0 ? (
                <div className="col-span-full py-20 text-center text-gray-500">
                  <p>Aucun élément disponible dans cette catégorie pour le moment.</p>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div key={item.id} className="group flex flex-col gap-3">
                    <div className="relative aspect-video w-full overflow-hidden rounded-card bg-over-charcoal border border-white/5 shadow-md group-hover:border-over-yellow/30 transition-colors">
                      {item.category === 'video' ? (
                        renderVideoPlayer(item)
                      ) : (
                        <img 
                          src={item.mediaUrl} 
                          alt={item.title} 
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg px-1">{item.title}</h3>
                  </div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}
