import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/Section'
import SectionHeader from '@/components/SectionHeader'
import IntegrationFilter from '@/components/IntegrationFilter'
import CTABlock from '@/components/CTABlock'
import { integrations } from '@/data/integrations'
import { categories } from '@/data/categories'

export const metadata: Metadata = {
  title: 'Integraties voor marketing, leadopvolging en groei',
  description: 'Van advertentiekanalen tot CRM, tracking, CDP, dashboards en automation. Stevin.AI koppelt de tools die je al gebruikt, zodat marketing, opvolging en data beter samenwerken.',
}

export default function IntegratiesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Integraties — Stevin.AI',
    description: 'Overzicht van alle tools en platforms die Stevin.AI koppelt en implementeert.',
    url: 'https://stevin.ai/integraties',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-white pt-12 sm:pt-16 lg:pt-20 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">
              Integraties voor marketing, leadopvolging en groei
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              Van advertentiekanalen tot CRM, tracking, CDP, dashboards en automation. Stevin.AI koppelt de tools die je al gebruikt, zodat marketing, opvolging en data beter samenwerken.
            </p>
          </div>
        </div>
      </section>

      {/* Categories overview */}
      <Section bg="surface">
        <SectionHeader
          title="Categorieën"
          subtitle="Ontdek integraties per categorie of zoek direct naar een specifieke tool."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {categories.map((cat) => {
            const count = integrations.filter((i) => i.category === cat.slug).length
            return (
              <Link
                key={cat.slug}
                href={`/integraties/categorie/${cat.slug}`}
                className="group p-6 rounded-xl bg-white border border-border hover:border-accent/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-primary group-hover:text-accent transition-colors">{cat.name}</h3>
                  <span className="text-xs font-medium text-muted bg-surface-alt px-2.5 py-1 rounded-full">{count} tools</span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{cat.description}</p>
              </Link>
            )
          })}
        </div>
      </Section>

      {/* All integrations with filter */}
      <Section>
        <SectionHeader
          title="Alle integraties"
          subtitle={`${integrations.length} tools en platforms die we koppelen en implementeren.`}
        />
        <IntegrationFilter integrations={integrations} />
      </Section>

      {/* CTA */}
      <Section bg="surface">
        <CTABlock
          title="Werk je met tools die je hier niet ziet?"
          description="We werken met vrijwel elk platform dat een API of koppeling biedt. Neem contact op en we bekijken samen wat mogelijk is."
          buttonText="Plan een gesprek"
          buttonHref="/contact"
        />
      </Section>
    </>
  )
}
