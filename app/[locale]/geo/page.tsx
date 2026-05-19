import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Section from '@/components/Section'
import SectionHeader from '@/components/SectionHeader'
import CTABlock from '@/components/CTABlock'
import FAQAccordion from '@/components/FAQAccordion'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'geo' })
  return {
    title: `${t('eyebrow')} — Generative Engine Optimisation`,
    description: t('sub'),
  }
}

export default async function GEOPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('geo')

  const faqs = [
    { question: t('faq1_q'), answer: t('faq1_a') },
    { question: t('faq2_q'), answer: t('faq2_a') },
    { question: t('faq3_q'), answer: t('faq3_a') },
    { question: t('faq4_q'), answer: t('faq4_a') },
    { question: t('faq5_q'), answer: t('faq5_a') },
  ]

  const whyItems = [
    { title: t('why_box1_title'), desc: t('why_box1_desc') },
    { title: t('why_box2_title'), desc: t('why_box2_desc') },
    { title: t('why_box3_title'), desc: t('why_box3_desc') },
    { title: t('why_box4_title'), desc: t('why_box4_desc') },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      {/* Hero */}
      <section className="bg-white pt-12 sm:pt-16 lg:pt-20 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">
              {t('h1')}
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              {t('sub')}
            </p>
          </div>
        </div>
      </section>

      {/* What is GEO */}
      <Section bg="surface" id="wat-is-geo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary">
              {t('what_h2')}
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              {t('what_p1')}
            </p>
            <p className="mt-4 text-base text-muted leading-relaxed">
              {t('what_p2')}
            </p>
          </div>
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">{t('what_box1_h3')}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {t('what_box1_p')}
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">{t('what_box2_h3')}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {t('what_box2_p')}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Why it matters alongside classic SEO */}
      <Section bg="white" id="waarom-geo">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary text-center">
            {t('why_h2')}
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed text-center">
            {t('why_p')}
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyItems.map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-white border border-border">
                <h3 className="text-base font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* How Stevin.AI builds for GEO */}
      <Section bg="surface" id="aanpak">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary">
              {t('how_h2')}
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              {t('how_p')}
            </p>
          </div>
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">{t('how_box1_h3')}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {t('how_box1_p')}
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">{t('how_box2_h3')}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {t('how_box2_p')}
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">{t('how_box3_h3')}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {t('how_box3_p')}
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">{t('how_box4_h3')}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {t('how_box4_p')}
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">{t('how_box5_h3')}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {t('how_box5_p')}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section bg="white" id="faq">
        <SectionHeader
          title={t('faq_title')}
          subtitle={t('faq_subtitle')}
          centered
        />
        <FAQAccordion faqs={faqs} />
      </Section>

      {/* CTA */}
      <Section bg="surface">
        <CTABlock
          title={t('cta_title')}
          description={t('cta_desc')}
          buttonText={t('cta_btn')}
          buttonHref="/contact"
        />
      </Section>
    </>
  )
}
