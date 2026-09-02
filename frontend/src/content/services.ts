import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'audiovisuel',
    category: 'Production',
    title: 'Audiovisuel',
    tagline: 'Faire voir la marque à l’écran, avec impact.',
    description:
      'Spots, films institutionnels et reportages pensés pour capter l’attention et rester en tête.',
    deliverables: ['Spots publicitaires', 'Films institutionnels', 'Reportages & clips'],
    icon: 'video',
  },
  {
    id: 'photo',
    category: 'Image',
    title: 'Photographie',
    tagline: 'Des images qui incarnent vraiment votre marque.',
    description:
      'Studio, corporate ou événementiel : une direction photo nette, chaleureuse et utilisable partout.',
    deliverables: ['Studio & corporate', 'Événements', 'Concerts & reportages'],
    icon: 'camera',
  },
  {
    id: 'digital',
    category: 'Croissance',
    title: 'Marketing digital',
    tagline: 'Être visible, suivi, et choisi en ligne.',
    description:
      'Stratégie réseaux, contenu et campagnes pour renforcer votre présence auprès du public guinéen.',
    deliverables: ['Stratégie social media', 'Création de contenu', 'Community & campagnes'],
    icon: 'megaphone',
  },
  {
    id: 'podcast',
    category: 'Audio',
    title: 'Studio podcast',
    tagline: 'Une voix de marque, propre et régulière.',
    description:
      'Enregistrement, montage et livraison multi-formats depuis notre studio intégré.',
    deliverables: ['Enregistrement pro', 'Montage audio', 'Livraison multi-formats'],
    icon: 'mic',
  },
  {
    id: 'strategie',
    category: 'Conseil',
    title: 'Conseil & stratégie',
    tagline: 'Savoir quoi dire, à qui, et pourquoi.',
    description:
      'Positionnement, plan 360° et recommandations créatives pour arrêter de communiquer au hasard.',
    deliverables: ['Brand strategy', 'Plan de communication 360°', 'Audit créatif'],
    icon: 'compass',
  },
  {
    id: 'web',
    category: 'Digital',
    title: 'Web',
    tagline: 'Un site qui convertit, pas une vitrine morte.',
    description:
      'Présence digitale claire : site, landing et parcours pensés pour générer des demandes.',
    deliverables: ['Sites vitrines', 'Landing pages', 'Parcours de conversion'],
    icon: 'globe',
  },
]
