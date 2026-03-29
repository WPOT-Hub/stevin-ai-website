import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeader({ title, subtitle, centered = true, light = false }: SectionHeaderProps) {
  return (
    <div className={cn(centered && 'text-center', 'mb-12 lg:mb-16')}>
      <h2 className={cn(
        'text-3xl sm:text-4xl font-bold tracking-tight',
        light ? 'text-white' : 'text-primary',
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 text-lg max-w-3xl leading-relaxed',
          centered && 'mx-auto',
          light ? 'text-slate-300' : 'text-muted',
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
