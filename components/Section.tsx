import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  bg?: 'white' | 'surface' | 'primary'
}

export default function Section({ children, className, id, bg = 'white' }: SectionProps) {
  const bgClasses = {
    white: 'bg-white',
    surface: 'bg-surface',
    primary: 'bg-primary text-white',
  }

  return (
    <section id={id} className={cn(bgClasses[bg], 'py-20 sm:py-28 lg:py-32', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
