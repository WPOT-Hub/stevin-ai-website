import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Image from 'next/image'
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

        <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden mb-12 bg-primary">
          <Image
            src="/producten/blue-figures.jpg"
            alt="De Stevin-suite"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/85 to-[#0A1628]/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 sm:px-12 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">De Stevin-suite</h1>
              <p className="mt-5 text-lg text-white/85 leading-relaxed">
                Stevin is een AI-laag over je hele bedrijf, van dynamische campagnes en content tot signalen,
                opvolging en uplift-meting. Je begint waar het pijn doet en bouwt van daaruit verder.
              </p>
            </div>
          </div>
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
