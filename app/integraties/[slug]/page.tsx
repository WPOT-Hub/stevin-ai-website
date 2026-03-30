import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Section from '@/components/Section'
import Breadcrumbs from '@/components/Breadcrumbs'
import SectionHeader from '@/components/SectionHeader'
import IntegrationGrid from '@/components/IntegrationGrid'
import CTABlock from '@/components/CTABlock'
import FAQAccordion from '@/components/FAQAccordion'
import { categories } from '@/data/categories'
import { integrations } from '@/data/integrations'
import { getIntegrationBySlug, getCategoryBySlug, getIntegrationsByCategory, getRelatedIntegrations } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categoryParams = categories.map((cat) => ({ slug: cat.slug }))
  const integrationParams = integrations.map((i) => ({ slug: i.slug }))
  return [...categoryParams, ...integrationParams]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  // Check category first
  const category = getCategoryBySlug(slug)
  if (category) {
    return {
      title: `${category.name} integraties`,
      description: category.description,
    }
  }

  // Then check integration
  const integration = getIntegrationBySlug(slug)
  if (integration) {
    return {
      title: `${integration.name} integratie`,
      description: integration.shortDescription,
    }
  }

  return {}
}

/* ───────── Category page ───────── */
function CategoryView({ slug }: { slug: string }) {
  const category = getCategoryBySlug(slug)!
  const categoryIntegrations = getIntegrationsByCategory(slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} integraties — Stevin.AI`,
    description: category.description,
    url: `https://stevin.ai/integraties/${slug}`,
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
                  href={`/integraties/${cat.slug}`}
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

/* ───────── Integration detail page ───────── */
function IntegrationView({ slug }: { slug: string }) {
  const integration = getIntegrationBySlug(slug)!
  const category = getCategoryBySlug(integration.category)
  const relatedIntegrations = getRelatedIntegrations(integration.relatedSlugs)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: integration.name,
    description: integration.description,
    applicationCategory: 'BusinessApplication',
    url: `https://stevin.ai/integraties/${slug}`,
  }

  const faqJsonLd = integration.faqs && integration.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: integration.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Section>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Integraties', href: '/integraties' },
            ...(category ? [{ label: category.name, href: `/integraties/${category.slug}` }] : []),
            { label: integration.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-surface-alt flex items-center justify-center">
                <span className="text-2xl font-bold text-accent">{integration.name.charAt(0)}</span>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
                  {integration.name}
                </h1>
                {category && (
                  <Link
                    href={`/integraties/${category.slug}`}
                    className="text-sm text-accent hover:text-accent-dark transition-colors"
                  >
                    {category.name}
                  </Link>
                )}
              </div>
            </div>

            <p className="text-lg text-muted leading-relaxed mb-8">
              {integration.description}
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-primary mb-3">Waar zetten we {integration.name} voor in?</h2>
                <p className="text-muted leading-relaxed">{integration.useCase}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-primary mb-3">Hoe Stevin.AI met {integration.name} werkt</h2>
                <p className="text-muted leading-relaxed">{integration.howWeUseIt}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-primary mb-3">Welke problemen lost dit op?</h2>
                <ul className="space-y-2.5">
                  {integration.problemsSolved.map((problem) => (
                    <li key={problem} className="flex items-start gap-3">
                      <svg className="flex-shrink-0 w-5 h-5 text-accent mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-muted">{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {integration.faqs && integration.faqs.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-primary mb-4">Veelgestelde vragen over {integration.name}</h2>
                  <FAQAccordion faqs={integration.faqs} />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* CTA card */}
              <div className="p-6 rounded-xl bg-surface border border-border">
                <h3 className="text-base font-bold text-primary mb-2">
                  {integration.name} koppelen?
                </h3>
                <p className="text-sm text-muted mb-4">
                  We helpen je {integration.name} te integreren in je marketingstack.
                </p>
                <Link
                  href="/contact"
                  className="block w-full text-center px-5 py-3 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent-dark transition-colors"
                >
                  Plan een gesprek
                </Link>
              </div>

              {/* Related integrations */}
              {relatedIntegrations.length > 0 && (
                <div className="p-6 rounded-xl bg-surface border border-border">
                  <h3 className="text-base font-bold text-primary mb-4">Gerelateerde integraties</h3>
                  <div className="space-y-2.5">
                    {relatedIntegrations.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/integraties/${rel.slug}`}
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white transition-colors"
                      >
                        <span className="w-8 h-8 rounded bg-white flex items-center justify-center text-xs font-bold text-accent border border-border flex-shrink-0">
                          {rel.name.charAt(0)}
                        </span>
                        <span className="text-sm font-medium text-primary">{rel.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Category link */}
              {category && (
                <div className="p-6 rounded-xl bg-surface border border-border">
                  <h3 className="text-base font-bold text-primary mb-2">Categorie</h3>
                  <Link
                    href={`/integraties/${category.slug}`}
                    className="text-sm text-accent hover:text-accent-dark transition-colors"
                  >
                    Bekijk alle {category.name.toLowerCase()} integraties →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section bg="surface">
        <CTABlock
          title={`${integration.name} koppelen aan je marketingstack?`}
          description="Plan een gesprek en ontdek hoe we je tools laten samenwerken voor betere resultaten."
          buttonText="Plan een gesprek"
          buttonHref="/contact"
        />
      </Section>
    </>
  )
}

/* ───────── Main page component ───────── */
export default async function IntegrationOrCategoryPage({ params }: Props) {
  const { slug } = await params

  // Check category first
  if (getCategoryBySlug(slug)) {
    return <CategoryView slug={slug} />
  }

  // Then check integration
  if (getIntegrationBySlug(slug)) {
    return <IntegrationView slug={slug} />
  }

  notFound()
}
