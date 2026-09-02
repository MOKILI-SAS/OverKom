import areeba from '@/assets/partners/areeba.jpeg'
import banqueIslamique from '@/assets/partners/banque-islamique.png'
import cciag from '@/assets/partners/cciag.png'
import chambreAgriculture from '@/assets/partners/chambre-agriculture.jpeg'
import foretDor from '@/assets/partners/foret-dor.jpeg'
import totalEnergies from '@/assets/partners/total-energies.png'
import bsic from '@/assets/partners/bsic.pdf'
import type { Partner } from '@/types'

export const partners: Partner[] = [
  { id: 'areeba', name: 'Areeba', logo: areeba },
  { id: 'banque-islamique', name: 'Banque Islamique', logo: banqueIslamique },
  { id: 'cciag', name: 'Chambre de Commerce, d’Industrie et d’Artisanat de Guinée', logo: cciag },
  { id: 'cna', name: 'Chambre Nationale d’Agriculture', logo: chambreAgriculture },
  { id: 'foret-dor', name: 'Forêt d’Or', logo: foretDor },
  { id: 'total', name: 'TotalEnergies', logo: totalEnergies },
  { id: 'bsic', name: 'BSIC', logo: bsic },
]
