import { Link } from '@/i18n/navigation'
import IntegrationGlyph from '@/components/IntegrationGlyph'
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
          <span className="mb-3 transition-transform duration-200 group-hover:scale-[1.03]">
            <IntegrationGlyph size="sm" />
          </span>
          <span className="text-sm font-medium text-primary leading-tight">{integration.name}</span>
          {showCategory && (
            <span className="text-xs text-muted mt-1">{integration.category.replace('-', ' & ').replace(/\b\w/g, c => c.toUpperCase())}</span>
          )}
        </Link>
      ))}
    </div>
  )
}
