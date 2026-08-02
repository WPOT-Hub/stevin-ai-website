import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { localizedMetadata } from '@/lib/seo'
import { Link } from '@/i18n/navigation'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'case_studies' })
  return localizedMetadata({
    path: '/case-studies/e-commerce',
    locale,
    title: `Case Study: E-commerce, Stevin`,
    description: t('sub'),
  })
}

export default async function EcommerceCaseStudy({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('case_studies')

  const results = [
    { metric: t('result1_metric'), label: t('result1_label') },
    { metric: t('result2_metric'), label: t('result2_label') },
    { metric: t('result3_metric'), label: t('result3_label') },
    { metric: t('result4_metric'), label: t('result4_label') },
  ]

  const challenges = [t('ch1'), t('ch2'), t('ch3'), t('ch4'), t('ch5')]

  const approach = [
    { step: t('ap1_step'), desc: t('ap1_desc') },
    { step: t('ap2_step'), desc: t('ap2_desc') },
    { step: t('ap3_step'), desc: t('ap3_desc') },
    { step: t('ap4_step'), desc: t('ap4_desc') },
    { step: t('ap5_step'), desc: t('ap5_desc') },
    { step: t('ap6_step'), desc: t('ap6_desc') },
  ]

  return (
    <main>
      {/* Hero */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 80px' }}>
        <div className="mx-auto max-w-[1200px]">
          <Link href="/case-studies" className="inline-flex items-center gap-1 text-white/40 text-sm hover:text-white/70 transition-colors mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('back_link')}
          </Link>
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('ecomm_eyebrow')}
          </p>
          <h1
            className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em]"
            style={{ fontWeight: 700, fontSize: 'clamp(40px, 4.6vw, 64px)', maxWidth: '18ch' }}
          >
            {t('ecomm_h1')}
          </h1>
          <p className="text-white/60 leading-[1.55]" style={{ fontSize: '18px', maxWidth: '560px', marginTop: '24px' }}>
            {t('ecomm_sub')}
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-white border-b border-border">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((r) => (
              <div key={r.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-accent">{r.metric}</p>
                <p className="text-sm text-muted mt-1">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* De klant */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <h2 className="h-section text-primary mb-4">{t('client_h2')}</h2>
          <p className="text-muted leading-relaxed">
            {t('client_p')}
          </p>
        </div>
      </section>

      {/* De uitdaging */}
      <section className="py-16 bg-surface">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <h2 className="h-section text-primary mb-6">{t('challenge_h2')}</h2>
          <ul className="space-y-4">
            {challenges.map((c, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="text-muted">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* De aanpak */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <h2 className="h-section text-primary mb-6">{t('approach_h2')}</h2>
          <div className="space-y-6">
            {approach.map((a, i) => (
              <div key={a.step} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent text-sm font-bold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-primary">{a.step}</h3>
                  <p className="text-sm text-muted mt-1">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 bg-surface">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 text-center">
          <blockquote className="text-xl sm:text-2xl font-medium text-primary italic leading-relaxed">
            &ldquo;{t('quote')}&rdquo;
          </blockquote>
          <p className="text-muted mt-4">{t('quote_author')}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <h2 className="h-section text-white mb-4">{t('cta_h2')}</h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-8">
            {t('cta_sub')}
          </p>
          <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-[#5DA3FF] text-primary rounded-xl hover:bg-[#7BB8FF] transition-colors">
            {t('cta_btn')}
          </Link>
        </div>
      </section>
    </main>
  )
}
