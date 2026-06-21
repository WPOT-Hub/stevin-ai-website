import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { localizedMetadata } from '@/lib/seo'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import CTABlock from '@/components/CTABlock'
import FAQAccordion from '@/components/FAQAccordion'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'mkb' })
  return localizedMetadata({
    path: '/mkb',
    locale,
    title: t('meta_title'),
    description: t('meta_desc'),
  })
}

export default async function MkbPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('mkb')

  const pains = [
    { title: t('pain1_title'), desc: t('pain1_desc') },
    { title: t('pain2_title'), desc: t('pain2_desc') },
    { title: t('pain3_title'), desc: t('pain3_desc') },
  ]
  const steps = [
    { title: t('step1_title'), desc: t('step1_desc') },
    { title: t('step2_title'), desc: t('step2_desc') },
    { title: t('step3_title'), desc: t('step3_desc') },
  ]
  const products = [
    { title: t('prod1_title'), desc: t('prod1_desc') },
    { title: t('prod2_title'), desc: t('prod2_desc') },
    { title: t('prod3_title'), desc: t('prod3_desc') },
  ]
  const faqs = [
    { question: t('faq1_q'), answer: t('faq1_a') },
    { question: t('faq2_q'), answer: t('faq2_a') },
    { question: t('faq3_q'), answer: t('faq3_a') },
  ]

  return (
    <main>
      {/* Hero */}
      <Section bg="primary" className="pt-28 sm:pt-32">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">
            {t('hero_eyebrow')}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {t('hero_h1')} <span className="text-accent">{t('hero_h1_accent')}</span>
          </h1>
          <p className="mt-6 text-lg text-white/80 leading-relaxed">{t('hero_sub')}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            {t('cta')}
          </Link>
        </div>
      </Section>

      {/* Pains */}
      <Section>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary max-w-2xl">
          {t('pains_h2')}
        </h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pains.map((p) => (
            <div key={p.title} className="p-6 rounded-xl bg-surface border border-border">
              <h3 className="text-base font-bold text-primary mb-2">{p.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section bg="surface">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">{t('how_h2')}</h2>
          <p className="mt-4 text-muted leading-relaxed">{t('how_sub')}</p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="p-6 rounded-xl bg-white border border-border">
              <span className="text-sm font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-base font-bold text-primary mt-2 mb-2">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Products */}
      <Section>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">{t('prod_h2')}</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.title} className="p-6 rounded-xl border border-border">
              <h3 className="text-base font-bold text-primary mb-2">{p.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Proof */}
      <Section bg="surface">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">{t('proof_h2')}</h2>
          <p className="mt-4 text-muted leading-relaxed">{t('proof_desc')}</p>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary mb-8">{t('faq_h2')}</h2>
        <div className="max-w-3xl">
          <FAQAccordion faqs={faqs} />
        </div>
      </Section>

      {/* Closing CTA */}
      <Section bg="surface">
        <CTABlock title={t('cta_h2')} description={t('cta_desc')} buttonText={t('cta')} buttonHref="/contact" />
      </Section>
    </main>
  )
}
