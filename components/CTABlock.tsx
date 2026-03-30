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
    <div className={`relative rounded-3xl px-8 py-16 sm:px-16 sm:py-20 text-center overflow-hidden ${light ? 'bg-white border border-border' : 'bg-[#0A1628]'}`}>
      {!light && (
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #3D8EFF 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />
      )}
      <div className="relative">
        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${light ? 'text-primary' : 'text-white'}`}>
          {title}
        </h2>
        <p className={`mt-5 text-lg max-w-xl mx-auto leading-relaxed ${light ? 'text-muted' : 'text-slate-300'}`}>
          {description}
        </p>
        <Link
          href={buttonHref}
          className={`mt-10 group inline-flex items-center px-8 py-4 text-base font-semibold rounded-xl transition-all duration-200 shadow-lg ${
            light
              ? 'text-white bg-accent hover:bg-accent-dark shadow-accent/20'
              : 'text-[#0A1628] bg-white hover:bg-slate-100'
          }`}
        >
          {buttonText}
          <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
