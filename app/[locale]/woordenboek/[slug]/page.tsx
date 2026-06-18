import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import Breadcrumbs from '@/components/Breadcrumbs'
import { glossary, getGlossaryTerm } from '@/data/glossary'
import { getArticle } from '@/data/articles'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  return glossary.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const term = getGlossaryTerm(slug)
  if (!term) return {}

  const title = `${term.term}: Stevin Woordenboek`
  const canonical = `https://stevin.ai/woordenboek/${slug}`
  const ogImage = `https://stevin.ai/og-image.png`
  return {
    title,
    description: term.shortDefinition.slice(0, 155),
    alternates: { canonical },
    openGraph: {
      type: 'article',
      title,
      description: term.shortDefinition,
      url: canonical,
      publishedTime: term.publishedAt,
      modifiedTime: term.updatedAt ?? term.publishedAt,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: term.shortDefinition,
      images: [ogImage],
    },
  }
}

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params
  const term = getGlossaryTerm(slug)
  if (!term) notFound()

  // DefinedTerm schema voor woordenboek-termen, Schema.org's primaire
  // type voor terminologie. Helpt LLM-citation en Google's Knowledge
  // Graph om Stevin's definitie te indexeren.
  const definedTermLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.shortDefinition,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Stevin Woordenboek',
      url: 'https://stevin.ai/woordenboek',
    },
    url: `https://stevin.ai/woordenboek/${slug}`,
  }

  // Article schema bovendien, voor de uitgebreide content (definitie +
  // voorbeeld + Stevin-perspectief + FAQ-achtige structuur).
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: term.term,
    description: term.shortDefinition,
    image: 'https://stevin.ai/og-image.png',
    datePublished: term.publishedAt,
    dateModified: term.updatedAt ?? term.publishedAt,
    author: { '@type': 'Organization', name: 'Stevin' },
    publisher: {
      '@type': 'Organization',
      name: 'Stevin',
      logo: { '@type': 'ImageObject', url: 'https://stevin.ai/icon.png' },
    },
    mainEntityOfPage: `https://stevin.ai/woordenboek/${slug}`,
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://stevin.ai/' },
      { '@type': 'ListItem', position: 2, name: 'Woordenboek', item: 'https://stevin.ai/woordenboek' },
      { '@type': 'ListItem', position: 3, name: term.term, item: `https://stevin.ai/woordenboek/${slug}` },
    ],
  }

  const relatedArticles = (term.relatedArticles ?? [])
    .map((s) => getArticle(s))
    .filter((a): a is NonNullable<ReturnType<typeof getArticle>> => Boolean(a))

  const relatedTerms = (term.relatedTerms ?? [])
    .map((s) => glossary.find((t) => t.slug === s))
    .filter((t): t is typeof glossary[number] => Boolean(t))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Section>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Woordenboek', href: '/woordenboek' },
            { label: term.term },
          ]}
        />

        <div className="max-w-3xl mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-accent mb-3">
            {term.category}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">{term.term}</h1>
          <p className="mt-6 text-lg text-muted leading-relaxed">{term.shortDefinition}</p>
        </div>

        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">Definitie</h2>
          <p className="text-muted leading-relaxed whitespace-pre-line">{term.fullDefinition}</p>
        </div>

        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">Concreet voorbeeld</h2>
          <p className="text-muted leading-relaxed whitespace-pre-line">{term.example}</p>
        </div>

        <div className="max-w-3xl mb-12 p-8 rounded-xl bg-primary text-white">
          <div className="text-xs font-mono uppercase tracking-wider text-accent mb-3">
            Stevin in de praktijk
          </div>
          <p className="text-base leading-relaxed whitespace-pre-line m-0">{term.stevinView}</p>
        </div>

        {relatedArticles.length > 0 && (
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl font-bold text-primary mb-4">Meer hierover in het Journal</h2>
            <ul className="space-y-3">
              {relatedArticles.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/blog/${a.slug}`}
                    className="text-accent hover:text-accent-dark text-base"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {relatedTerms.length > 0 && (
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl font-bold text-primary mb-4">Verwante termen</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTerms.map((t) => (
                <Link
                  key={t.slug}
                  href={`/woordenboek/${t.slug}`}
                  className="inline-block px-4 py-2 rounded-full bg-surface-alt border border-border text-sm text-primary hover:border-accent transition-colors"
                >
                  {t.term}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  )
}
