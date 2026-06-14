import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import Breadcrumbs from '@/components/Breadcrumbs'
import SectionHeader from '@/components/SectionHeader'
import IntegrationGrid from '@/components/IntegrationGrid'
import CTABlock from '@/components/CTABlock'
import FAQAccordion from '@/components/FAQAccordion'
import IntegrationGlyph from '@/components/IntegrationGlyph'
import { categories } from '@/data/categories'
import { NOINDEX_INTEGRATION_CATEGORIES, isIndexableIntegration } from '@/data/integrations'
import { integrations } from '@/data/integrations'
import { getVendorEnrichment } from '@/data/vendor-enrichments'
import { getIntegrationBySlug, getCategoryBySlug, getIntegrationsByCategory, getRelatedIntegrations } from '@/lib/utils'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const categoryParams = categories.map((cat) => ({ slug: cat.slug }))
  const integrationParams = integrations.map((i) => ({ slug: i.slug }))
  return [...categoryParams, ...integrationParams]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  // Categorie-hub pagina
  const category = getCategoryBySlug(slug)
  if (category) {
    const count = getIntegrationsByCategory(slug).length
    const title = `${category.name} integraties${count > 0 ? ` (${count} platforms)` : ''}`
    const description = (category.description ?? '').slice(0, 155)
    const canonical = `https://stevin.ai/integraties/${slug}`
    return {
      title,
      description,
      alternates: { canonical },
      ...(NOINDEX_INTEGRATION_CATEGORIES.has(slug) ? { robots: { index: false, follow: true } } : {}),
      openGraph: {
        type: 'website',
        title,
        description,
        url: canonical,
        images: [{ url: 'https://stevin.ai/og-image.png', width: 1200, height: 630, alt: title }],
      },
      twitter: { card: 'summary_large_image', title, description },
    }
  }

  // Vendor-detail pagina
  const integration = getIntegrationBySlug(slug)
  if (integration) {
    const title = `${integration.name} koppeling, Stevin.AI integratie`
    const description = integration.shortDescription.slice(0, 155)
    const canonical = `https://stevin.ai/integraties/${slug}`
    return {
      title,
      description,
      alternates: { canonical },
      ...(isIndexableIntegration(integration) ? {} : { robots: { index: false, follow: true } }),
      openGraph: {
        type: 'website',
        title,
        description,
        url: canonical,
        images: [{ url: 'https://stevin.ai/og-image.png', width: 1200, height: 630, alt: title }],
      },
      twitter: { card: 'summary_large_image', title, description },
    }
  }

  return {}
}

/* ───────── Category page ───────── */
async function CategoryView({ slug, locale }: { slug: string; locale: string }) {
  const category = getCategoryBySlug(slug)!
  const categoryIntegrations = getIntegrationsByCategory(slug)
  const t = await getTranslations({ locale, namespace: 'integraties' })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} integraties, Stevin.AI`,
    description: category.description,
    url: `https://stevin.ai/integraties/${slug}`,
  }

  // BreadcrumbList JSON-LD — visible breadcrumbs zonder schema laat zoekmachines
  // de hierarchie missen. Plus voor LLM-citation: structuur "waar in de site".
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://stevin.ai/' },
      { '@type': 'ListItem', position: 2, name: 'Integraties', item: 'https://stevin.ai/integraties' },
      { '@type': 'ListItem', position: 3, name: category.name, item: `https://stevin.ai/integraties/${slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
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
          <h2 className="text-xl font-bold text-primary mb-6">{t('other_categories')}</h2>
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
          title={t('connect_cta_title')}
          description={t('connect_cta_desc')}
          buttonText={t('connect_cta_btn')}
          buttonHref="/contact"
        />
      </Section>
    </>
  )
}

/* ───────── Integration detail page ───────── */
async function IntegrationView({ slug, locale }: { slug: string; locale: string }) {
  const integration = getIntegrationBySlug(slug)!
  const category = getCategoryBySlug(integration.category)
  const relatedIntegrations = getRelatedIntegrations(integration.relatedSlugs)
  const t = await getTranslations({ locale, namespace: 'integraties' })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: integration.name,
    description: integration.description,
    applicationCategory: 'BusinessApplication',
    url: `https://stevin.ai/integraties/${slug}`,
  }

  // BreadcrumbList JSON-LD — geeft zoekmachines de site-hierarchie van
  // home → integraties → categorie → vendor (4 niveaus).
  const breadcrumbItems: Array<{ '@type': 'ListItem'; position: number; name: string; item: string }> = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://stevin.ai/' },
    { '@type': 'ListItem', position: 2, name: 'Integraties', item: 'https://stevin.ai/integraties' },
  ]
  if (category) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: category.name,
      item: `https://stevin.ai/integraties/${category.slug}`,
    })
  }
  breadcrumbItems.push({
    '@type': 'ListItem',
    position: breadcrumbItems.length + 1,
    name: integration.name,
    item: `https://stevin.ai/integraties/${slug}`,
  })
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
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
              <IntegrationGlyph />
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

            {(() => {
              const enrichment = getVendorEnrichment(slug)
              if (!enrichment) return null
              return (
                <div className="space-y-6 mb-10 pb-10 border-b border-border">
                  <div>
                    <h2 className="text-xl font-bold text-primary mb-3">Wat Stevin uit {integration.name} haalt</h2>
                    <p className="text-muted leading-relaxed">{enrichment.stevinAngle}</p>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary mb-3">Waar je het naast legt</h2>
                    <p className="text-muted leading-relaxed">{enrichment.stackImpact}</p>
                  </div>
                  {enrichment.pitfalls && enrichment.pitfalls.length > 0 && (
                    <div>
                      <h2 className="text-xl font-bold text-primary mb-3">Veelgemaakte fouten</h2>
                      <ul className="space-y-2.5">
                        {enrichment.pitfalls.map((p, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted leading-relaxed">
                            <span className="text-accent mt-1 flex-shrink-0">→</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })()}

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-primary mb-3">{t('use_case_heading', { name: integration.name })}</h2>
                <p className="text-muted leading-relaxed">{integration.useCase}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-primary mb-3">{t('how_we_use_heading', { name: integration.name })}</h2>
                <p className="text-muted leading-relaxed">{integration.howWeUseIt}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-primary mb-3">{t('problems_heading')}</h2>
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
                  <h2 className="text-xl font-bold text-primary mb-4">{t('faqs_heading', { name: integration.name })}</h2>
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
                  {t('sidebar_cta_heading', { name: integration.name })}
                </h3>
                <p className="text-sm text-muted mb-4">
                  {t('sidebar_cta_desc', { name: integration.name })}
                </p>
                <Link
                  href="/contact"
                  className="block w-full text-center px-5 py-3 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent-dark transition-colors"
                >
                  {t('sidebar_cta_btn')}
                </Link>
              </div>

              {/* Related integrations */}
              {relatedIntegrations.length > 0 && (
                <div className="p-6 rounded-xl bg-surface border border-border">
                  <h3 className="text-base font-bold text-primary mb-4">{t('sidebar_related_heading')}</h3>
                  <div className="space-y-2.5">
                    {relatedIntegrations.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/integraties/${rel.slug}`}
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white transition-colors"
                      >
                        <IntegrationGlyph size="sm" />
                        <span className="text-sm font-medium text-primary">{rel.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Category link */}
              {category && (
                <div className="p-6 rounded-xl bg-surface border border-border">
                  <h3 className="text-base font-bold text-primary mb-2">{t('sidebar_category_heading')}</h3>
                  <Link
                    href={`/integraties/${category.slug}`}
                    className="text-sm text-accent hover:text-accent-dark transition-colors"
                  >
                    {t('sidebar_category_link', { name: category.name.toLowerCase() })}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section bg="surface">
        <CTABlock
          title={t('detail_cta_title', { name: integration.name })}
          description={t('detail_cta_desc')}
          buttonText={t('detail_cta_btn')}
          buttonHref="/contact"
        />
      </Section>
    </>
  )
}

/* ───────── Main page component ───────── */
export default async function IntegrationOrCategoryPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  // Check category first
  if (getCategoryBySlug(slug)) {
    return <CategoryView slug={slug} locale={locale} />
  }

  // Then check integration
  if (getIntegrationBySlug(slug)) {
    return <IntegrationView slug={slug} locale={locale} />
  }

  notFound()
}
