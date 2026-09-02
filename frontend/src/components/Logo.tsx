import logo from '@/assets/brand/logo-blanc.png'
import { cn } from '@/lib/cn'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <img
      src={logo}
      alt="OverKom 360"
      className={cn('h-16 w-auto object-contain object-left mix-blend-screen md:h-20', className)}
    />
  )
}
