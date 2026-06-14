import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import Breadcrumbs from '@/components/Breadcrumbs'
import { comparisons } from '@/data/comparisons'
import ItemListJsonLd from '@/components/ItemListJsonLd'

export const metadata: Metadata = {
  title: 'Tool-vergelijkingen, welke past bij jouw stack?',
  description:
    'Stevin&apos;s praktijk-vergelijkingen tussen marketing-tools. Geen feature-tabellen, wel concrete keuze-overwegingen vanuit veld-ervaring.',
  alternates: { canonical: 'https://stevin.ai/vergelijken' },
}

export default function ComparisonsHub() {
  return (
    <Section>
      <ItemListJsonLd
        items={comparisons.map((c) => ({ path: `/vergelijken/${c.slug}`, name: c.title }))}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Vergelijken' },
        ]}
      />

      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">
          Tool-vergelijkingen
        </h1>
        <p className="mt-6 text-lg text-muted leading-relaxed">
          Welke tool past bij jouw situatie? Geen feature-tabellen die alleen verwarren, maar
          praktische keuze-overwegingen vanuit wat we bij klanten zien werken en wat sneuvelt.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        {comparisons.map((c) => (
          <Link
            key={c.slug}
            href={`/vergelijken/${c.slug}`}
            className="block p-6 rounded-xl bg-surface-alt border border-border hover:border-accent transition-colors"
          >
            <div className="text-xs font-mono uppercase tracking-wider text-accent mb-2">
              {c.nameA} vs {c.nameB}
            </div>
            <h2 className="text-xl font-bold text-primary mb-2">{c.title}</h2>
            <p className="text-sm text-muted leading-relaxed">{c.dek}</p>
          </Link>
        ))}
      </div>
    </Section>
  )
}
