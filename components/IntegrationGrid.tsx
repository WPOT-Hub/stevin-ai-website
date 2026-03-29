import Link from 'next/link'
import type { Integration } from '@/data/integrations'

interface IntegrationGridProps {
  integrations: Integration[]
  showCategory?: boolean
}

export default function IntegrationGrid({ integrations, showCategory = false }: IntegrationGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {integrations.map((integration) => (
        <Link
          key={integration.slug}
          href={`/integraties/${integration.slug}`}
          className="group flex flex-col items-center p-5 rounded-xl border border-border bg-white hover:border-accent/30 hover:shadow-md transition-all duration-200 text-center"
        >
          <div className="w-12 h-12 rounded-lg bg-surface-alt flex items-center justify-center mb-3 group-hover:bg-accent/10 transition-colors">
            <span className="text-lg font-bold text-accent">
              {integration.name.charAt(0)}
            </span>
          </div>
          <span className="text-sm font-medium text-primary leading-tight">{integration.name}</span>
          {showCategory && (
            <span className="text-xs text-muted mt-1">{integration.category.replace('-', ' & ').replace(/\b\w/g, c => c.toUpperCase())}</span>
          )}
        </Link>
      ))}
    </div>
  )
}
