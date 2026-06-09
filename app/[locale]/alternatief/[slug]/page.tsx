import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import Breadcrumbs from '@/components/Breadcrumbs'
import CTABlock from '@/components/CTABlock'
import FAQAccordion from '@/components/FAQAccordion'
import { alternatives, getAlternative } from '@/data/alternatives'
import { getIntegrationBySlug } from '@/lib/utils'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  return alternatives.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const alt = getAlternative(slug)
  if (!alt) return {}

  const canonical = `https://stevin.ai/alternatief/${slug}`
  const ogImage = `https://stevin.ai/og-image.png`
  return {
    title: alt.title,
    description: alt.dek,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      title: alt.title,
      description: alt.dek,
      url: canonical,
      publishedTime: alt.publishedAt,
      modifiedTime: alt.updatedAt ?? alt.publishedAt,
      images: [{ url: ogImage, width: 1200, height: 630, alt: alt.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: alt.title,
      description: alt.dek,
      images: [ogImage],
    },
  }
}

export default async function AlternativePage({ params }: Props) {
  const { slug } = await params
  const alt = getAlternative(slug)
  if (!alt) notFound()

  const integration = alt.toolSlug ? getIntegrationBySlug(alt.toolSlug) : undefined

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: alt.title,
    description: alt.dek,
    image: 'https://stevin.ai/og-image.png',
    datePublished: alt.publishedAt,
    dateModified: alt.updatedAt ?? alt.publishedAt,
    author: { '@type': 'Organization', name: 'Stevin' },
    publisher: {
      '@type': 'Organization',
      name: 'Stevin',
      logo: { '@type': 'ImageObject', url: 'https://stevin.ai/icon.svg' },
    },
    mainEntityOfPage: `https://stevin.ai/alternatief/${slug}`,
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://stevin.ai/' },
      { '@type': 'ListItem', position: 2, name: 'Alternatieven', item: 'https://stevin.ai/alternatief' },
      { '@type': 'ListItem', position: 3, name: `${alt.toolName} alternatief`, item: `https://stevin.ai/alternatief/${slug}` },
    ],
  }

  const faqLd = alt.faqs && alt.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: alt.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}

      <Section>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Alternatieven', href: '/alternatief' },
            { label: `${alt.toolName} alternatief` },
          ]}
        />

        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">{alt.title}</h1>
          <p className="mt-6 text-lg text-muted leading-relaxed">{alt.dek}</p>
        </div>

        {/* TL;DR box */}
        <div className="max-w-3xl mb-16 p-6 rounded-xl bg-surface-alt border border-border">
          <div className="text-xs font-mono uppercase tracking-wider text-accent mb-2">TL;DR</div>
          <p className="text-base text-primary leading-relaxed m-0">{alt.tldr}</p>
        </div>

        {/* Wat is [tool] */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-2xl font-bold text-primary mb-4">Wat is {alt.toolName}?</h2>
          <p className="text-muted leading-relaxed whitespace-pre-line">{alt.whatIs}</p>
          {integration && (
            <Link
              href={`/integraties/${alt.toolSlug}`}
              className="inline-block mt-4 text-sm text-accent hover:text-accent-dark"
            >
              Lees meer over {integration.name} &rarr;
            </Link>
          )}
        </div>

        {/* Waarom een alternatief */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-2xl font-bold text-primary mb-4">Waarom een alternatief voor {alt.toolName} zoeken?</h2>
          <p className="text-muted leading-relaxed whitespace-pre-line">{alt.whySwitch}</p>
        </div>

        {/* Stevin als alternatief (dark box) */}
        <div className="max-w-3xl mb-16 p-8 rounded-xl bg-primary text-white">
          <div className="text-xs font-mono uppercase tracking-wider text-accent mb-3">Stevin als alternatief</div>
          <p className="text-base leading-relaxed whitespace-pre-line m-0">{alt.stevinAngle}</p>
        </div>

        {/* Voor wie */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-2xl font-bold text-primary mb-4">Voor wie is Stevin het betere alternatief?</h2>
          <p className="text-muted leading-relaxed whitespace-pre-line">{alt.forWhom}</p>
        </div>

        {/* FAQs */}
        {alt.faqs && alt.faqs.length > 0 && (
          <div className="max-w-3xl mb-16">
            <h2 className="text-2xl font-bold text-primary mb-6">Veelgestelde vragen</h2>
            <FAQAccordion faqs={alt.faqs} />
          </div>
        )}

        <CTABlock
          title={`Stevin uitproberen als alternatief voor ${alt.toolName}?`}
          description="Plan een gesprek. We kijken samen naar je stack en wat Stevin erbovenop laat zien. Geen verkoop-gesprek, gewoon praktisch advies."
          buttonText="Plan een gesprek"
          buttonHref="/contact"
        />
      </Section>
    </>
  )
}
