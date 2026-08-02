import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { localizedMetadata } from '@/lib/seo'
import Section from '@/components/Section'
import SectionHeader from '@/components/SectionHeader'
import CTABlock from '@/components/CTABlock'
import FAQAccordion from '@/components/FAQAccordion'
import DeskProof from '@/components/DeskProof'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo' })
  return localizedMetadata({
    path: '/seo',
    locale,
    title: t('meta_title'),
    description: t('sub'),
  })
}

export default async function SEOPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('seo')

  const faqs = [
    { question: t('faq1_q'), answer: t('faq1_a') },
    { question: t('faq2_q'), answer: t('faq2_a') },
    { question: t('faq3_q'), answer: t('faq3_a') },
    { question: t('faq4_q'), answer: t('faq4_a') },
    { question: t('faq5_q'), answer: t('faq5_a') },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-12 sm:pt-16 lg:pt-20 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="h-hero text-primary">
              {t('h1')}
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              {t('sub')}
            </p>
          </div>
        </div>
      </section>

      {/* Technical SEO, content structure, landing pages */}
      <Section bg="surface" id="technisch">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="h-section text-primary">
              {t('tech_h2')}
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              {t('tech_p')}
            </p>
          </div>
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">{t('tech_box1_h3')}</h3>
              <p className="text-sm text-muted leading-relaxed">{t('tech_box1_p')}</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">{t('tech_box2_h3')}</h3>
              <p className="text-sm text-muted leading-relaxed">{t('tech_box2_p')}</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">{t('tech_box3_h3')}</h3>
              <p className="text-sm text-muted leading-relaxed">{t('tech_box3_p')}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Search intent and measurability */}
      <Section bg="white" id="zoekintentie">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="h-section text-primary">
              {t('intent_h2')}
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              {t('intent_p')}
            </p>
          </div>
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">{t('intent_box1_h3')}</h3>
              <p className="text-sm text-muted leading-relaxed">{t('intent_box1_p')}</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">{t('intent_box2_h3')}</h3>
              <p className="text-sm text-muted leading-relaxed">{t('intent_box2_p')}</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">{t('intent_box3_h3')}</h3>
              <p className="text-sm text-muted leading-relaxed">{t('intent_box3_p')}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Connection between SEO, CRO and lead follow-up */}
      <Section bg="surface" id="seo-cro-opvolging">
        <div className="max-w-3xl mx-auto">
          <h2 className="h-section text-primary text-center">
            {t('chain_h2')}
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed text-center">
            {t('chain_p')}
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: t('chain_box1_h3'), desc: t('chain_box1_p') },
              { title: t('chain_box2_h3'), desc: t('chain_box2_p') },
              { title: t('chain_box3_h3'), desc: t('chain_box3_p') },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-white border border-border">
                <h3 className="text-base font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-base text-muted leading-relaxed text-center">
            {t('chain_footer')}
          </p>
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
      {/* Meting die wegzakt raakt ook wat je over organisch kunt zeggen. */}
      <DeskProof locale={locale} toonBrein={false} melding="consent-be" />

    </>
  )
}
