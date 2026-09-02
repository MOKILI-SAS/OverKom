import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  index: string
  kicker: string
  title: string
  subtitle?: string
  invert?: boolean
}

export function SectionHeading({ index, kicker, title, subtitle, invert }: SectionHeadingProps) {
  return (
    <div className="mb-12 max-w-2xl">
      <p
        className={cn(
          'mb-3 font-display text-xs font-semibold uppercase tracking-[0.22em]',
          invert ? 'text-over-ink/50' : 'text-over-yellow',
        )}
      >
        {index} — {kicker}
      </p>
      <h2
        className={cn(
          'font-display text-3xl font-bold leading-tight md:text-5xl',
          invert ? 'text-over-ink' : 'text-white',
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={cn('mt-4 text-base md:text-lg', invert ? 'text-over-ink/70' : 'text-over-muted')}>
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
