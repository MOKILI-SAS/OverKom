import { Camera, Compass, Globe, Megaphone, Mic, Video } from 'lucide-react'
import type { Service } from '@/types'

const icons = {
  video: Video,
  camera: Camera,
  megaphone: Megaphone,
  mic: Mic,
  compass: Compass,
  globe: Globe,
} as const

interface ServiceIconProps {
  name: Service['icon']
  className?: string
}

export function ServiceIcon({ name, className }: ServiceIconProps) {
  const Icon = icons[name]
  return <Icon className={className} />
}
