import Link from 'next/link'

interface CTABlockProps {
  title: string
  description: string
  buttonText?: string
  buttonHref?: string
  light?: boolean
}

export default function CTABlock({
  title,
  description,
  buttonText = 'Plan een gesprek',
  buttonHref = '/contact',
  light = false,
}: CTABlockProps) {
  return (
    <div className={`rounded-2xl px-8 py-12 sm:px-12 sm:py-16 text-center ${light ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
        {title}
      </h2>
      <p className={`mt-4 text-lg max-w-2xl mx-auto leading-relaxed ${light ? 'text-muted' : 'text-slate-300'}`}>
        {description}
      </p>
      <Link
        href={buttonHref}
        className="mt-8 inline-flex items-center px-8 py-3.5 text-base font-semibold rounded-lg transition-colors bg-accent text-white hover:bg-accent-dark"
      >
        {buttonText}
      </Link>
    </div>
  )
}
