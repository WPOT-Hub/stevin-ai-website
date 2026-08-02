import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import Breadcrumbs from '@/components/Breadcrumbs'
import CTABlock from '@/components/CTABlock'
import FAQAccordion from '@/components/FAQAccordion'
import { comparisons, getComparison } from '@/data/comparisons'
import { getIntegrationBySlug } from '@/lib/utils'
import { metaOmschrijving } from '@/lib/seo'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const comparison = getComparison(slug)
  if (!comparison) return {}

  const canonical = `https://stevin.ai/vergelijken/${slug}`
  const ogImage = `https://stevin.ai${locale === 'en' ? '/en' : ''}/opengraph-image`
  return {
    title: comparison.title,
    description: metaOmschrijving(comparison.dek),
    alternates: { canonical },
    openGraph: {
      type: 'article',
      title: comparison.title,
      description: metaOmschrijving(comparison.dek),
      url: canonical,
      publishedTime: comparison.publishedAt,
      modifiedTime: comparison.updatedAt ?? comparison.publishedAt,
      images: [{ url: ogImage, width: 1200, height: 630, alt: comparison.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: comparison.title,
      description: metaOmschrijving(comparison.dek),
      images: [ogImage],
    },
  }
}

export default async function ComparisonPage({ params }: Props) {
  const { locale, slug } = await params
  const comparison = getComparison(slug)
  if (!comparison) notFound()

  const integrationA = getIntegrationBySlug(comparison.slugA)
  const integrationB = getIntegrationBySlug(comparison.slugB)
  const image = `https://stevin.ai${locale === 'en' ? '/en' : ''}/opengraph-image`

  // Article schema voor de comparison-page (Article ipv Product, want
  // we vergelijken redactioneel, geen review-rating).
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: comparison.title,
    description: metaOmschrijving(comparison.dek),
    image,
    datePublished: comparison.publishedAt,
    dateModified: comparison.updatedAt ?? comparison.publishedAt,
    author: { '@type': 'Organization', name: 'Stevin' },
    publisher: {
      '@type': 'Organization',
      name: 'Stevin',
      logo: { '@type': 'ImageObject', url: 'https://stevin.ai/icon.png' },
    },
    mainEntityOfPage: `https://stevin.ai/vergelijken/${slug}`,
  }

  // BreadcrumbList JSON-LD voor site-hierarchy (helpt LLM-context + Google).
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://stevin.ai/' },
      { '@type': 'ListItem', position: 2, name: 'Vergelijken', item: 'https://stevin.ai/vergelijken' },
      { '@type': 'ListItem', position: 3, name: `${comparison.nameA} vs ${comparison.nameB}`, item: `https://stevin.ai/vergelijken/${slug}` },
    ],
  }

  // FAQPage JSON-LD voor LLM-citation + Google rich-result kandidaat.
  const faqLd = comparison.faqs && comparison.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: comparison.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <Section>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Vergelijken', href: '/vergelijken' },
            { label: `${comparison.nameA} vs ${comparison.nameB}` },
          ]}
        />

        <div className="max-w-3xl mb-12">
          <h1 className="h-hero text-primary">
            {comparison.title}
          </h1>
          <p className="mt-6 text-lg text-muted leading-relaxed">{comparison.dek}</p>
        </div>

        {/* TL;DR box */}
        <div className="max-w-3xl mb-16 p-6 rounded-xl bg-surface-alt border border-border">
          <div className="text-xs font-mono uppercase tracking-wider text-accent mb-2">TL;DR</div>
          <p className="text-base text-primary leading-relaxed m-0">{comparison.tldr}</p>
        </div>

        {/* Twee-kolom: wanneer kies je A | wanneer kies je B */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mb-16">
          <div>
            <h2 className="h-section text-primary mb-4">
              Wanneer kies je {comparison.nameA}
            </h2>
            <p className="text-muted leading-relaxed whitespace-pre-line">{comparison.whenA}</p>
            {integrationA && (
              <Link
                href={`/integraties/${comparison.slugA}`}
                className="inline-block mt-4 text-sm text-accent hover:text-accent-dark"
              >
                Lees meer over {integrationA.name} →
              </Link>
            )}
          </div>
          <div>
            <h2 className="h-section text-primary mb-4">
              Wanneer kies je {comparison.nameB}
            </h2>
            <p className="text-muted leading-relaxed whitespace-pre-line">{comparison.whenB}</p>
            {integrationB && (
              <Link
                href={`/integraties/${comparison.slugB}`}
                className="inline-block mt-4 text-sm text-accent hover:text-accent-dark"
              >
                Lees meer over {integrationB.name} →
              </Link>
            )}
          </div>
        </div>

        {/* Kosten-vergelijking */}
        <div className="max-w-3xl mb-16">
          <h2 className="h-section text-primary mb-4">Kosten</h2>
          <p className="text-muted leading-relaxed whitespace-pre-line">{comparison.costs}</p>
        </div>

        {/* Stevin's praktijk-perspectief */}
        <div className="max-w-3xl mb-16 p-8 rounded-xl bg-primary text-white">
          <div className="text-xs font-mono uppercase tracking-wider text-accent mb-3">Stevin in de praktijk</div>
          <p className="text-base leading-relaxed whitespace-pre-line m-0">
            {comparison.stevinView}
          </p>
        </div>

        {/* FAQs */}
        {comparison.faqs && comparison.faqs.length > 0 && (
          <div className="max-w-3xl mb-16">
            <h2 className="h-section text-primary mb-6">Veelgestelde vragen</h2>
            <FAQAccordion faqs={comparison.faqs} />
          </div>
        )}

        <CTABlock
          title="Twijfel je nog tussen beide?"
          description="Onze consultants vergelijken graag voor jouw specifieke situatie. Geen verkoop-gesprek, gewoon praktisch advies."
          buttonText="Plan een gesprek"
          buttonHref="/contact"
        />
      </Section>
    </>
  )
}
