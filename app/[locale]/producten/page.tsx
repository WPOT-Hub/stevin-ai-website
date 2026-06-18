import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import Breadcrumbs from '@/components/Breadcrumbs'
import CTABlock from '@/components/CTABlock'
import { products } from '@/data/products'

interface Props {
  params: Promise<{ locale: string }>
}

export function generateMetadata(): Metadata {
  const title = 'Producten, de Stevin-suite'
  const description =
    'De producten van Stevin: van dynamische campagnes en content tot signalen, opvolging en uplift-meting. Een AI-laag over je hele bedrijf.'
  const canonical = 'https://stevin.ai/producten'
  return {
    title,
    description,
    alternates: { canonical },
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

export default async function ProductenPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Stevin producten',
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `https://stevin.ai/producten/${p.slug}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <Section>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Producten' }]} />

        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">De Stevin-suite</h1>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            Stevin is een AI-laag over je hele bedrijf. Hieronder de losse producten, van dynamische campagnes
            en content tot signalen, opvolging en uplift-meting. Je begint waar het pijn doet en bouwt van
            daaruit verder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/producten/${p.slug}`}
              className="group p-6 rounded-xl bg-surface border border-border hover:border-accent/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">{p.name}</h2>
                {p.acronym && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">{p.acronym}</span>
                )}
              </div>
              <p className="text-sm text-muted leading-relaxed">{p.tagline}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section bg="surface">
        <CTABlock
          title="Benieuwd wat Stevin voor jou doet?"
          description="Plan een korte demo, dan laten we het op jouw situatie zien."
          buttonText="Plan een demo"
          buttonHref="/contact"
        />
      </Section>
    </>
  )
}
