import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Section from '@/components/Section'
import Breadcrumbs from '@/components/Breadcrumbs'
import IntegrationGrid from '@/components/IntegrationGrid'
import CTABlock from '@/components/CTABlock'
import { categories } from '@/data/categories'
import { integrations } from '@/data/integrations'
import { getCategoryBySlug, getIntegrationsByCategory } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) return {}
  return {
    title: `${category.name} integraties`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const categoryIntegrations = getIntegrationsByCategory(slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} integraties — Stevin.AI`,
    description: category.description,
    url: `https://stevin.ai/integraties/categorie/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Integraties', href: '/integraties' },
            { label: category.name },
          ]}
        />

        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">
            {category.name}
          </h1>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            {category.intro}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-primary mb-6">
            {categoryIntegrations.length} {category.name.toLowerCase()} integraties
          </h2>
          <IntegrationGrid integrations={categoryIntegrations} />
        </div>

        {/* Related categories */}
        <div className="mt-16 pt-12 border-t border-border">
          <h2 className="text-xl font-bold text-primary mb-6">Andere categorieën</h2>
          <div className="flex flex-wrap gap-3">
            {categories
              .filter((c) => c.slug !== slug)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/integraties/categorie/${cat.slug}`}
                  className="px-4 py-2 text-sm font-medium bg-surface-alt text-muted rounded-lg border border-border hover:text-primary hover:border-accent/30 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
          </div>
        </div>
      </Section>

      <Section bg="surface">
        <CTABlock
          title="Hulp nodig bij het koppelen van je tools?"
          description="We zorgen dat je marketingstack samenwerkt als één systeem. Plan een gesprek en ontdek wat er mogelijk is."
          buttonText="Plan een gesprek"
          buttonHref="/contact"
        />
      </Section>
    </>
  )
}
