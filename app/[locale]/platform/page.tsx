import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { localizedMetadata } from '@/lib/seo'
import { Link } from '@/i18n/navigation'
import DeskProof from '@/components/DeskProof'
import { nativeConnectors } from '@/data/connectors'
import HairlineRule from '@/components/HairlineRule'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'platform' })
  return localizedMetadata({
    path: '/platform',
    locale,
    // "operatie" was de oude formulering. Koen heeft die op 4 juli 2026 al
    // vervangen door "marketing en sales" (commit 3a5752e), maar deze titel is
    // toen blijven staan. Geen nieuwe positioneringskeuze, alleen het doortrekken
    // van een keuze die al gemaakt was.
    title: 'Het platform: je marketing en sales in een beeld',
    description: t('sub'),
  })
}

export default async function PlatformPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('platform')

  const features = [
    { label: '01', title: t('feat1_title'), desc: t('feat1_desc') },
    { label: '02', title: t('feat2_title'), desc: t('feat2_desc') },
    { label: '03', title: t('feat3_title'), desc: t('feat3_desc') },
    { label: '04', title: t('feat4_title'), desc: t('feat4_desc') },
    { label: '05', title: t('feat5_title'), desc: t('feat5_desc') },
    { label: '06', title: t('feat6_title'), desc: t('feat6_desc') },
  ]

  const extras = [
    { title: t('extra1_title'), desc: t('extra1_desc') },
    { title: t('extra2_title'), desc: t('extra2_desc') },
    { title: t('extra3_title'), desc: t('extra3_desc') },
    { title: t('extra4_title'), desc: t('extra4_desc') },
    { title: t('extra5_title'), desc: t('extra5_desc') },
    { title: t('extra6_title'), desc: t('extra6_desc') },
    { title: t('extra7_title'), desc: t('extra7_desc') },
  ]

  const monitoringChecks = [
    t('monitor1'), t('monitor2'), t('monitor3'), t('monitor4'),
    t('monitor5'), t('monitor6'), t('monitor7'), t('monitor8'),
  ]

  const leadGenItems = [
    t('leadgen_item1'), t('leadgen_item2'), t('leadgen_item3'),
    t('leadgen_item4'), t('leadgen_item5'),
  ]

  const reportItems = [
    t('report1'), t('report2'), t('report3'), t('report4'), t('report5'),
  ]

  return (
    <main>
      {/* SoftwareApplication: dit is de pagina die LLMs gebruiken om te bepalen
          WAT Stevin is. Verwijst naar de sitewide #organization-node. offers
          weggelaten zolang pricing niet publiek is (voorkomt incomplete-offer). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            '@id': 'https://stevin.ai/#software',
            name: 'Stevin',
            applicationCategory: 'BusinessApplication',
            applicationSubCategory: 'Marketing Intelligence',
            operatingSystem: 'Web',
            url: 'https://stevin.ai/platform',
            description: t('sub'),
            publisher: { '@id': 'https://stevin.ai/#organization' },
          }),
        }}
      />
      {/* Hero */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('eyebrow')}
          </p>
          <h1
            className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em]"
            style={{ fontWeight: 700, fontSize: 'clamp(40px, 4.6vw, 64px)', maxWidth: '16ch' }}
          >
            {t('h1')}<br />
            <span className="text-[#5DA3FF]">{t('h1_sub')}</span>
          </h1>
          <p className="text-white/60 leading-[1.55]" style={{ fontSize: '20px', maxWidth: '580px', marginTop: '32px' }}>
            {t('sub')}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex px-8 py-3.5 text-sm font-semibold bg-[#5DA3FF] text-primary rounded-xl hover:bg-[#7BB8FF] transition-colors"
            >
              {t('cta_demo')}
            </Link>
            <Link
              href="#connectors"
              className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/70 border border-white/20 rounded-xl hover:bg-white/5 transition-colors"
            >
              {t('cta_integraties')}
            </Link>
          </div>
          <div className="mt-20">
            <HairlineRule color="rgba(255,255,255,.35)" />
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('features_eyebrow')}
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-4"
            style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)' }}
          >
            {t('features_h2')}
          </h2>
          <p className="text-[17px] text-muted mb-16 max-w-xl leading-[1.55]">
            {t('features_sub')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-border">
            {features.map((f) => (
              <div
                key={f.title}
                className="border-b border-border py-10 lg:px-10 lg:first:pl-0 lg:[&:nth-child(3n)]:pr-0 lg:[&:nth-child(3n+1)]:pl-0"
              >
                <p className="font-mono text-[11px] text-muted mb-4">{f.label}</p>
                <h3 className="text-[17px] font-display font-bold text-primary mb-3 leading-tight">{f.title}</h3>
                <p className="text-[15px] text-muted leading-[1.6]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zo ziet dat eruit: het platform zelf. Deze pagina had 355 regels tekst
          over het platform zonder een enkel beeld ervan. */}
      <DeskProof locale={locale} />

      {/* Native Connectors */}
      <section id="connectors" className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('connectors_eyebrow')}
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-4"
            style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)' }}
          >
            {t('connectors_h2')}
          </h2>
          <p className="text-[17px] text-muted mb-12 max-w-xl leading-[1.55]">
            {t('connectors_sub')}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {nativeConnectors.map((c) => (
              <div key={c.slug} className="rounded-xl bg-white border border-border p-4 text-center hover:border-[#5DA3FF]/30 transition-colors">
                <p className="text-sm font-semibold text-primary">{c.name}</p>
                <p className="text-[11px] text-muted mt-1 leading-snug">
                  {c.category === 'advertising' ? 'Advertising' : c.category === 'analytics' ? 'Analytics' : c.category === 'ecommerce' ? 'E-commerce' : 'E-mail'}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted mt-8 border-t border-border pt-8">
            {t('connectors_more')}{' '}
            <Link href="/integraties" className="text-[#5DA3FF] hover:underline">{t('connectors_more_link')}</Link>
            {t('connectors_more_rest')}{' '}
            <Link href="/contact" className="text-[#5DA3FF] hover:underline">{t('connectors_contact')}</Link>
            {t('connectors_contact_rest')}
          </p>
        </div>
      </section>

      {/* Lead Generation */}
      <section id="lead-generation" className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
                <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
                {t('leadgen_eyebrow')}
              </p>
              <h2
                className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-6"
                style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)' }}
              >
                {t('leadgen_h2')}
              </h2>
              <p className="text-[15px] text-muted leading-[1.6] mb-8">
                {t('leadgen_sub')}
              </p>
              <ul className="space-y-0 border-t border-border">
                {leadGenItems.map((item) => (
                  <li key={item} className="flex items-center gap-4 py-4 border-b border-border">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5DA3FF] flex-shrink-0" />
                    <span className="text-[15px] text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pt-[120px] space-y-4">
              {[t('leadgen_step1'), t('leadgen_step2'), t('leadgen_step3'), t('leadgen_step4')].map((step, i) => (
                <div key={step} className="flex items-center gap-4 border-t border-border pt-4">
                  <span className="font-mono text-[11px] text-muted w-6">0{i + 1}</span>
                  <span className="text-[15px] font-display font-bold text-primary">{step}</span>
                  {i < 3 && <span className="ml-auto text-muted">↓</span>}
                </div>
              ))}
              <p className="text-[13px] text-muted pt-2">{t('leadgen_pipeline')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 Monitoring */}
      <section id="monitoring" className="bg-primary" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('monitoring_eyebrow')}
          </p>
          <h2
            className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-4"
            style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)' }}
          >
            {t('monitoring_h2')}
          </h2>
          <p className="text-[17px] text-white/50 mb-16 max-w-xl leading-[1.55]">
            {t('monitoring_sub')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/10">
            {monitoringChecks.map((check) => (
              <div key={check} className="border-b border-r border-white/10 py-8 px-6 last:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00D4A0] mb-4" />
                <p className="text-[15px] text-white/80 font-medium leading-tight">{check}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Reports */}
      <section id="ai-reports" className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
                <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
                {t('reports_eyebrow')}
              </p>
              <h2
                className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-6"
                style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)' }}
              >
                {t('reports_h2')}
              </h2>
              <p className="text-[15px] text-muted leading-[1.6] mb-8">
                {t('reports_sub')}
              </p>
              <ul className="space-y-0 border-t border-border">
                {reportItems.map((item) => (
                  <li key={item} className="flex items-center gap-4 py-4 border-b border-border">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5DA3FF] flex-shrink-0" />
                    <span className="text-[15px] text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pt-[120px]">
              <div className="border-t border-border pt-10 space-y-8">
                <div>
                  <p className="font-mono text-[11px] text-muted mb-2">{t('briefing_label')}</p>
                  <p className="text-[15px] text-muted leading-[1.7] italic">
                    &ldquo;{t('briefing_quote')}&rdquo;
                  </p>
                </div>
                <div className="border-t border-border pt-8">
                  <p className="text-[13px] text-muted">{t('briefing_caption')}</p>
                  <Link href="/ai-briefing" className="inline-flex mt-4 text-[13px] font-semibold text-accent hover:text-accent-dark transition-colors">
                    Hoe de AI-briefing werkt &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More capabilities */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('extras_eyebrow')}
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-4"
            style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)' }}
          >
            {t('extras_h2')}
          </h2>
          <p className="text-[17px] text-muted mb-16 max-w-xl leading-[1.55]">{t('extras_sub')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-border">
            {extras.map((e) => (
              <div key={e.title} className="border-b border-r border-border py-8 px-6 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0">
                <h3 className="text-[15px] font-display font-bold text-primary mb-2">{e.title}</h3>
                <p className="text-[14px] text-muted leading-[1.6]">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary" style={{ padding: '112px 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#00D4A0] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6">
            {t('cta_eyebrow')}
          </p>
          <h2
            className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-6"
            style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)', maxWidth: '16ch' }}
          >
            {t('cta_h2')}
          </h2>
          <p className="text-white/50 mb-10 leading-[1.6] text-[17px] max-w-lg">
            {t('cta_sub')}
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-3.5 text-sm font-semibold bg-[#5DA3FF] text-primary rounded-xl hover:bg-[#7BB8FF] transition-colors"
          >
            {t('cta_demo')}
          </Link>
        </div>
      </section>
    </main>
  )
}
