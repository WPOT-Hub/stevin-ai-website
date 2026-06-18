import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { localizedMetadata } from '@/lib/seo'
import { Link } from '@/i18n/navigation'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'case_studies' })
  return localizedMetadata({
    path: '/case-studies',
    locale,
    title: `${t('h1')}, Stevin`,
    description: t('sub'),
  })
}

export default async function CaseStudiesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('case_studies')

  const caseStudies = [
    {
      slug: 'e-commerce',
      industry: t('cs1_industry'),
      title: t('cs1_title'),
      subtitle: t('cs1_subtitle'),
      metric: t('cs1_metric'),
      metricLabel: t('cs1_metric_label'),
    },
  ]

  return (
    <main>
      {/* Hero */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 80px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('eyebrow')}
          </p>
          <h1
            className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em]"
            style={{ fontSize: 'clamp(40px, 5vw, 80px)' }}
          >
            {t('h1')}
          </h1>
          <p className="text-white/60 leading-[1.55]" style={{ fontSize: '20px', maxWidth: '540px', marginTop: '24px' }}>
            {t('sub')}
          </p>
        </div>
      </section>

      {/* Cases grid */}
      <section className="bg-white" style={{ padding: '80px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-0 border-t border-border">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group border-b border-border py-10 flex flex-col sm:flex-row sm:items-center gap-6 hover:bg-surface transition-colors px-2"
              >
                <div className="flex-1">
                  <span className="text-[#5DA3FF] text-[12px] font-display font-bold tracking-[0.08em] uppercase mb-4 block">
                    {cs.industry}
                  </span>
                  <h2 className="text-[19px] font-display font-bold text-primary mb-2 leading-tight group-hover:text-[#5DA3FF] transition-colors">
                    {cs.title}
                  </h2>
                  <p className="text-[15px] text-muted leading-[1.6]">{cs.subtitle}</p>
                </div>
                <div className="flex-shrink-0">
                  <p className="text-4xl font-display font-extrabold text-[#5DA3FF]">{cs.metric}</p>
                  <p className="text-sm text-muted">{cs.metricLabel}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 border-t border-border pt-10">
            <p className="text-muted mb-4 text-[15px]">{t('more_soon')}</p>
            <Link
              href="/contact"
              className="inline-flex px-6 py-3 text-sm font-semibold text-white bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow"
            >
              {t('be_next')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
