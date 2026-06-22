import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import Breadcrumbs from '@/components/Breadcrumbs'
import CTABlock from '@/components/CTABlock'
import FAQAccordion from '@/components/FAQAccordion'
import { products, getProductBySlug, getRelatedProducts, getProductHero, getProductSeo } from '@/data/products'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  const seo = getProductSeo(slug)
  const title = seo?.title || `${product.name}${product.acronym ? ` (${product.acronym})` : ''}`
  const description = product.tagline.slice(0, 155)
  const canonical = `https://stevin.ai/producten/${slug}`
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

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product.relatedSlugs)
  const hero = getProductHero(slug)
  const faqs = [...(product.faqs ?? []), ...(getProductSeo(slug)?.faqs ?? [])]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    alternateName: product.acronym,
    description: product.description,
    applicationCategory: 'BusinessApplication',
    url: `https://stevin.ai/producten/${slug}`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://stevin.ai/' },
      { '@type': 'ListItem', position: 2, name: 'Producten', item: 'https://stevin.ai/producten' },
      { '@type': 'ListItem', position: 3, name: product.name, item: `https://stevin.ai/producten/${slug}` },
    ],
  }
  const faqLd =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }
      : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      <Section>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Producten', href: '/producten' },
            { label: product.name },
          ]}
        />

        {hero && (
          <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden mb-12 bg-primary">
            <Image
              src={hero}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/85 to-[#0A1628]/30" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 sm:px-12 max-w-2xl">
                {product.acronym && (
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-3">
                    {product.acronym}
                  </span>
                )}
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{product.name}</h1>
                <p className="mt-4 text-lg text-white/85 leading-relaxed">{product.tagline}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {!hero && (
              <>
                {product.acronym && (
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-3">
                    {product.acronym}
                  </span>
                )}
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">{product.name}</h1>
                <p className="mt-5 text-lg text-muted leading-relaxed">{product.tagline}</p>
              </>
            )}

            <p className="text-muted leading-relaxed">{product.description}</p>

            <div className="mt-10 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-primary mb-3">Voor wie</h2>
                <p className="text-muted leading-relaxed">{product.whoFor}</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary mb-3">Hoe het werkt</h2>
                <p className="text-muted leading-relaxed">{product.howItWorks}</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary mb-3">Wat het oplost</h2>
                <ul className="space-y-2.5">
                  {product.problemsSolved.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <svg className="flex-shrink-0 w-5 h-5 text-accent mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-muted">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {product.inPractice && (
                <div className="p-6 rounded-xl bg-surface border border-border">
                  <h2 className="text-base font-bold text-primary mb-2">In de praktijk</h2>
                  <p className="text-muted leading-relaxed">{product.inPractice}</p>
                </div>
              )}
              {product.results && product.results.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-primary mb-2">Resultaten</h2>
                  <p className="text-sm text-muted mb-4">
                    Cijfers uit eerder eigen bureauwerk, het fundament onder Stevin. Anoniem.
                  </p>
                  <ul className="space-y-3">
                    {product.results.map((r) => (
                      <li
                        key={r}
                        className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border"
                      >
                        <span className="text-accent font-bold mt-0.5">↗</span>
                        <span className="text-primary font-medium leading-relaxed">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {faqs.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-primary mb-4">Veelgestelde vragen</h2>
                  <FAQAccordion faqs={faqs} />
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="p-6 rounded-xl bg-surface border border-border">
                <h3 className="text-base font-bold text-primary mb-2">{product.name} in actie zien</h3>
                <p className="text-sm text-muted mb-4">Plan een korte demo, dan laten we het op jouw situatie zien.</p>
                <Link
                  href="/contact"
                  className="block w-full text-center px-5 py-3 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent-dark transition-colors"
                >
                  Plan een demo
                </Link>
              </div>

              {related.length > 0 && (
                <div className="p-6 rounded-xl bg-surface border border-border">
                  <h3 className="text-base font-bold text-primary mb-4">Past hierbij</h3>
                  <div className="space-y-2.5">
                    {related.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/producten/${rel.slug}`}
                        className="block p-2.5 rounded-lg hover:bg-white transition-colors"
                      >
                        <span className="text-sm font-medium text-primary">{rel.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-6 rounded-xl bg-surface border border-border">
                <h3 className="text-base font-bold text-primary mb-2">Alle producten</h3>
                <Link href="/producten" className="text-sm text-accent hover:text-accent-dark transition-colors">
                  Bekijk de hele Stevin-suite
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section bg="surface">
        <CTABlock
          title={`Benieuwd wat ${product.name} voor jou doet?`}
          description="Plan een korte demo, dan laten we het op jouw situatie zien."
          buttonText="Plan een demo"
          buttonHref="/contact"
        />
      </Section>
    </>
  )
}
