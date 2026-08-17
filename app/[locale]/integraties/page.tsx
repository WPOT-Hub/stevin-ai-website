import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { localizedMetadata, SITE_URL } from '@/lib/seo'
import { Link } from '@/i18n/navigation'
import IntegrationFilter from '@/components/IntegrationFilter'
import { integrations } from '@/data/integrations'
import { categories, categoryName } from '@/data/categories'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'integraties' })
  return localizedMetadata({
    path: '/integraties',
    locale,
    title: t('meta_title'),
    description: t('sub'),
  })
}

export default async function IntegratiesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('integraties')

  // De vijf lagen staan als losse sleutels in messages/*.json in plaats van als
  // hardcoded array: bij de redesign was deze sectie Nederlandse copy in de
  // component, waardoor /en er Nederlands bleef renderen.
  const stackLayers = [1, 2, 3, 4, 5].map((n) => ({
    num: `0${n}`,
    title: t(`layer${n}_title`),
    body: t(`layer${n}_body`),
  }))

  const heroRows: [string, string, string][] = [
    ['Google Ads', t('hero_card_spend'), '82%'],
    ['GA4', t('hero_card_events'), '64%'],
    ['HubSpot', t('hero_card_deals'), '48%'],
    ['Exact', t('hero_card_revenue'), '58%'],
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('jsonld_name'),
    description: t('jsonld_desc'),
    // Moet gelijk zijn aan de canonical die localizedMetadata zet, anders
    // wijst de structured data naar een andere URL dan de pagina zelf.
    url: `${SITE_URL}${locale === 'en' ? '/en' : ''}/integraties`,
    inLanguage: locale === 'en' ? 'en' : 'nl',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative -mt-[72px] overflow-hidden bg-primary pb-20 pt-[152px] text-white sm:pb-24 sm:pt-[168px] lg:pb-28 lg:pt-[184px]">
        <div className="pointer-events-none absolute -bottom-40 left-[36%] right-[-10%] h-64 bg-[radial-gradient(ellipse_at_center,rgba(61,142,255,0.18),transparent_64%)]" />
        <div className="relative mx-auto grid max-w-7xl items-end gap-12 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-8">
          <div>
            <p className="mb-7 inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.12em] text-white/60 before:h-px before:w-7 before:bg-current">
              {t('hero_eyebrow')}
            </p>
            <h1 className="max-w-4xl text-[clamp(3.25rem,7vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-white">
              {t('hero_h1')}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-[1.55] text-white/75 sm:text-xl">
              {t('hero_sub')}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#lagen" className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-[#3C8EFF] px-5 text-sm font-extrabold text-white transition-colors hover:bg-[#2B7AEE]">
                {t('hero_cta_layers')}
              </a>
              <a href="#koppelingen" className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-white/20 px-5 text-sm font-extrabold text-white transition-colors hover:bg-white/5">
                {t('hero_cta_search')}
              </a>
            </div>
          </div>

          <div className="rounded-[14px] border border-white/15 bg-white/[0.055] p-6 backdrop-blur">
            <h2 className="mb-5 text-xl font-extrabold leading-[1.15] tracking-[-0.02em] text-white">
              {t('hero_card_h2')}
            </h2>
            {heroRows.map(([name, label, width], index) => (
              <div key={name} className={`grid min-h-11 grid-cols-[108px_1fr_auto] items-center gap-4 text-sm text-white/75 ${index > 0 ? 'border-t border-white/10' : ''}`}>
                <strong className="font-extrabold text-white">{name}</strong>
                <span className="relative h-0.5 bg-white/15">
                  <span className="absolute -inset-y-1 left-0 rounded-full bg-white" style={{ width }} />
                </span>
                <span className="text-xs font-extrabold text-[#5DA3FF]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lagen" className="bg-[#F7F8FA] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.12em] text-[#3C8EFF] before:h-px before:w-7 before:bg-current">
                {t('stack_eyebrow')}
              </p>
              <h2 className="max-w-3xl text-[clamp(2.125rem,4.2vw,3.625rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#0A0A0A]">
                {t('stack_h2')}
              </h2>
            </div>
            <p className="max-w-sm text-base leading-[1.55] text-[#6B7280]">
              {t('stack_intro')}
            </p>
          </div>

          <div className="max-w-[860px]">
            {stackLayers.map((layer, index) => (
              <article
                key={layer.num}
                className={`grid grid-cols-[56px_1fr] gap-6 py-8 ${index > 0 ? 'border-t border-[#D9E0EB]' : ''}`}
              >
                <span className="pt-0.5 text-[26px] font-extrabold leading-none tracking-[-0.02em] text-[#3C8EFF]">
                  {layer.num}
                </span>
                <div>
                  <h3 className="mb-2 text-[21px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[#1F2933]">
                    {layer.title}
                  </h3>
                  <p className="m-0 max-w-[58ch] text-[15px] leading-[1.6] text-[#6B7280]">
                    {layer.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7F8FA] pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[14px] border border-[#D9E0EB] bg-white px-5 py-4">
            <div className="grid gap-4 lg:grid-cols-[160px_1fr] lg:items-start">
              <p className="m-0 text-xs font-extrabold uppercase tracking-[0.12em] text-[#3C8EFF]">
                {t('categories_eyebrow')}
              </p>
              <nav className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label={t('categories_aria')}>
                {categories.map((category) => {
                  const count = integrations.filter((integration) => integration.category === category.slug).length
                  if (count === 0) return null

                  return (
                    <Link
                      key={category.slug}
                      href={`/integraties/${category.slug}`}
                      className="group flex items-baseline justify-between gap-3 border-b border-[#E8EDF4] pb-2 text-sm"
                    >
                      <span className="font-bold text-[#1F2933] transition-colors group-hover:text-[#3C8EFF]">
                        {categoryName(category, locale)}
                      </span>
                      <span className="font-mono text-xs text-[#8A94A3]">{count}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section id="koppelingen" className="bg-[#F7F8FA] pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <IntegrationFilter integrations={integrations} locale={locale} />
        </div>
      </section>

      <section className="bg-[#0A1628] py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-end gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <p className="mb-4 inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.12em] text-[#3C8EFF] before:h-px before:w-7 before:bg-current">
              {t('missing_eyebrow')}
            </p>
            <h2 className="max-w-3xl text-[clamp(2.125rem,4.2vw,3.625rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-white">
              {t('missing_h2')}
            </h2>
            <p className="mt-5 max-w-xl text-[17px] leading-[1.55] text-white/65">
              {t('missing_body')}
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-[#3C8EFF] px-5 text-sm font-extrabold text-white transition-colors hover:bg-[#2B7AEE]"
          >
            {t('missing_cta')}
          </Link>
        </div>
      </section>
    </>
  )
}
