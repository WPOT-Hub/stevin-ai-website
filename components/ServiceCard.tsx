import Link from 'next/link'

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  href?: string
}

export default function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
  const content = (
    <div className="group relative rounded-2xl border border-border bg-white p-8 hover:border-accent/30 hover:shadow-lg transition-all duration-200">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{description}</p>
      {href && (
        <span className="mt-4 inline-flex items-center text-sm font-medium text-accent group-hover:text-accent-dark transition-colors">
          Meer over {title.toLowerCase()}
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      )}
    </div>
  )

  if (href) {
    return <Link href={href} className="block">{content}</Link>
  }
  return content
}
