import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import Breadcrumbs from '@/components/Breadcrumbs'
import { glossary, type GlossaryTerm } from '@/data/glossary'

export const metadata: Metadata = {
  title: 'Marketingtermen in gewoon Nederlands',
  description:
    'Heldere uitleg van marketing-termen die je in dashboards, presentaties en gesprekken tegenkomt. Geen academisch jargon, wel praktijkvoorbeelden.',
  alternates: { canonical: 'https://stevin.ai/woordenboek' },
}

const CATEGORY_LABELS: Record<GlossaryTerm['category'], string> = {
  meetbaarheid: 'Meetbaarheid',
  platforms: 'Platforms',
  methodiek: 'Methodiek',
  ai: 'AI & Agents',
  attributie: 'Attributie',
}

export default function GlossaryHub() {
  // Group terms by category
  const byCategory: Record<GlossaryTerm['category'], GlossaryTerm[]> = {
    meetbaarheid: [],
    platforms: [],
    methodiek: [],
    ai: [],
    attributie: [],
  }
  for (const term of glossary) byCategory[term.category].push(term)

  return (
    <Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DefinedTermSet',
            '@id': 'https://stevin.ai/woordenboek/#termset',
            name: 'Stevin Woordenboek',
            url: 'https://stevin.ai/woordenboek',
            hasDefinedTerm: glossary.map((term) => ({
              '@type': 'DefinedTerm',
              '@id': `https://stevin.ai/woordenboek/${term.slug}#term`,
              name: term.term,
              description: term.shortDefinition,
              url: `https://stevin.ai/woordenboek/${term.slug}`,
            })),
          }),
        }}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Woordenboek' },
        ]}
      />

      <div className="max-w-3xl mb-12">
        <h1 className="h-hero text-primary">
          Stevin Woordenboek
        </h1>
        <p className="mt-6 text-lg text-muted leading-relaxed">
          Marketing-termen in MKB-Nederlands. Geen academisch jargon, wel praktijkvoorbeelden.
          Wat je in dashboards, presentaties en bureau-gesprekken tegenkomt, uitgelegd zoals een
          accountant het zou doen, niet zoals een professor.
        </p>
      </div>

      <div className="space-y-12 max-w-5xl">
        {(Object.keys(byCategory) as GlossaryTerm['category'][]).map((cat) => {
          const terms = byCategory[cat]
          if (terms.length === 0) return null
          return (
            <div key={cat}>
              <h2 className="h-section text-primary mb-6">{CATEGORY_LABELS[cat]}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {terms.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/woordenboek/${t.slug}`}
                    className="block p-5 rounded-xl bg-surface-alt border border-border hover:border-accent transition-colors"
                  >
                    <div className="text-base font-bold text-primary mb-2">{t.term}</div>
                    <p className="text-sm text-muted leading-relaxed line-clamp-3">
                      {t.shortDefinition}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
