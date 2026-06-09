import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import Breadcrumbs from '@/components/Breadcrumbs'
import { alternatives } from '@/data/alternatives'

export const metadata: Metadata = {
  title: 'Alternatieven voor marketing-data-tools',
  description:
    'Op zoek naar een alternatief voor je rapportage- of datatool? Stevin is de intelligentie-laag boven je stack, niet zomaar nog een dashboard.',
  alternates: { canonical: 'https://stevin.ai/alternatief' },
}

export default function AlternativesHub() {
  return (
    <Section>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Alternatieven' },
        ]}
      />

      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">
          Alternatieven
        </h1>
        <p className="mt-6 text-lg text-muted leading-relaxed">
          De meeste marketing-tools verplaatsen je data naar een dashboard. Stevin is de laag
          erboven die je vertelt wat er speelt en wat je nu moet doen, voordat je maandrapportage
          klaar is. Zoek je een alternatief voor een van deze tools, dan lees je hier het verschil.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        {alternatives.map((a) => (
          <Link
            key={a.slug}
            href={`/alternatief/${a.slug}`}
            className="block p-6 rounded-xl bg-surface-alt border border-border hover:border-accent transition-colors"
          >
            <div className="text-xs font-mono uppercase tracking-wider text-accent mb-2">
              {a.toolName} alternatief
            </div>
            <h2 className="text-xl font-bold text-primary mb-2">{a.title}</h2>
            <p className="text-sm text-muted leading-relaxed">{a.dek}</p>
          </Link>
        ))}
      </div>
    </Section>
  )
}
