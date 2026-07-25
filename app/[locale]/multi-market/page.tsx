import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { localizedMetadata } from '@/lib/seo'
import { Link } from '@/i18n/navigation'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'multiMarket' })
  return localizedMetadata({
    path: '/multi-market',
    locale,
    title: t('meta_title'),
    description: t('meta_description'),
  })
}

export default async function MultiMarketPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('multiMarket')

  const compareRows = [
    { label: t('compare_row1_label'), vendor: t('compare_row1_vendor'), stevin: t('compare_row1_stevin') },
    { label: t('compare_row2_label'), vendor: t('compare_row2_vendor'), stevin: t('compare_row2_stevin') },
    { label: t('compare_row3_label'), vendor: t('compare_row3_vendor'), stevin: t('compare_row3_stevin') },
    { label: t('compare_row4_label'), vendor: t('compare_row4_vendor'), stevin: t('compare_row4_stevin') },
    { label: t('compare_row5_label'), vendor: t('compare_row5_vendor'), stevin: t('compare_row5_stevin') },
  ]

  const getItems = [t('get_1'), t('get_2'), t('get_3'), t('get_4'), t('get_5'), t('get_6'), t('get_7'), t('get_8')]

  const stackGroups: { key: string; items: string[] }[] = [
    {
      key: 'paid',
      items: ['Meta', 'Google', 'LinkedIn', 'TikTok', 'The Trade Desk', 'DV360', 'Amazon Ads', 'Snapchat'],
    },
    {
      key: 'analytics',
      items: ['GA4', 'Adobe Analytics', 'Mixpanel', 'Amplitude', 'ContentSquare', 'Heap', 'Hotjar', 'Microsoft Clarity'],
    },
    {
      key: 'crm',
      items: ['Salesforce', 'HubSpot', 'Marketo', 'Braze', 'Iterable', 'Klaviyo', 'Mailchimp', 'Adobe RT-CDP'],
    },
    {
      key: 'commerce',
      items: ['Shopify', 'Magento', 'BigCommerce', 'commercetools', 'Salesforce Commerce', 'SAP', 'Bloomreach'],
    },
    {
      key: 'data',
      items: ['Snowflake', 'BigQuery', 'Databricks', 'Fivetran', 'Segment', 'mParticle', 'Tealium'],
    },
    {
      key: 'bi',
      items: ['Tableau', 'Power BI', 'Qlik', 'Metabase', 'Looker Studio'],
    },
  ]

  const phases = [
    { label: t('pilot_1_label'), body: t('pilot_1_body') },
    { label: t('pilot_2_label'), body: t('pilot_2_body') },
    { label: t('pilot_3_label'), body: t('pilot_3_body') },
    { label: t('pilot_4_label'), body: t('pilot_4_body') },
  ]

  const faqs = [
    { q: t('faq_1_q'), a: t('faq_1_a') },
    { q: t('faq_2_q'), a: t('faq_2_a') },
    { q: t('faq_3_q'), a: t('faq_3_a') },
    { q: t('faq_4_q'), a: t('faq_4_a') },
    { q: t('faq_5_q'), a: t('faq_5_a') },
    { q: t('faq_6_q'), a: t('faq_6_a') },
  ]

  return (
    <>
      {/* Hero, navy */}
      <section className="bg-primary overflow-hidden -mt-[72px]" style={{ paddingTop: 'calc(96px + 72px)', paddingBottom: '128px' }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('eyebrow')}
          </p>
          <h1
            className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em] mb-6"
            style={{ fontSize: 'clamp(44px, 6.4vw, 96px)', maxWidth: '16ch' }}
          >
            <span className="block">{t('hero_headline_1')}</span>
            <span className="block">{t('hero_headline_2')}</span>
            <span className="block">{t('hero_headline_3').replace('.', '')}<span className="text-accent">.</span></span>
          </h1>
          <p className="text-white/60 leading-[1.5] max-w-[640px]" style={{ fontSize: '19px' }}>
            {t('hero_sub')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 font-display font-bold text-[15px] bg-[#5DA3FF] text-primary rounded-[10px] hover:bg-[#7BB8FF] transition-colors w-fit"
            >
              {t('hero_cta')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
            <p className="text-[14px] italic text-white/55">{t('hero_note')}</p>
          </div>
        </div>
      </section>

      {/* Problem, surface */}
      <section className="bg-surface" style={{ padding: '112px 24px' }}>
        <div className="mx-auto max-w-[1000px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.08em] uppercase mb-[18px] flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('problem_eyebrow')}
          </p>
          <h2 className="font-display font-bold text-primary m-0 mb-8" style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: '1.15', letterSpacing: '-0.02em', maxWidth: '20ch' }}>
            {t('problem_title')}
          </h2>
          <p className="font-display font-bold text-primary text-[22px] leading-[1.4] mb-6" style={{ maxWidth: '40ch' }}>
            {t('problem_lead')}
          </p>
          <p className="text-[#2A3A54] leading-[1.6] mb-6" style={{ fontSize: '18px', maxWidth: '60ch' }}>
            {t('problem_body')}
          </p>
          <p className="text-[#2A3A54] leading-[1.6]" style={{ fontSize: '18px', maxWidth: '60ch' }}>
            {t('problem_close')}
          </p>
        </div>
      </section>

      {/* Solution, white */}
      <section className="bg-white" style={{ padding: '128px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-[72px]">
            <p className="text-accent text-[12px] font-display font-bold tracking-[0.08em] uppercase mb-[18px] flex items-center gap-[14px]">
              <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
              {t('solution_eyebrow')}
            </p>
            <h2 className="font-display font-bold text-primary m-0" style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: '1.15', letterSpacing: '-0.02em', maxWidth: '18ch' }}>
              {t('solution_title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <article className="border border-border rounded-[14px] p-8 bg-white">
              <span className="font-display font-extrabold text-accent leading-none block mb-6" style={{ fontSize: '56px', letterSpacing: '-0.04em' }}>
                {t('solution_1_label')}
              </span>
              <h3 className="font-display font-bold text-primary mb-4" style={{ fontSize: '24px', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
                {t('solution_1_title')}
              </h3>
              <p className="text-[#2A3A54] leading-[1.6] mb-5" style={{ fontSize: '15.5px' }}>
                {t('solution_1_body')}
              </p>
              <p className="font-display font-bold text-primary leading-[1.4]" style={{ fontSize: '15px' }}>
                {t('solution_1_close')}
              </p>
            </article>

            {/* Card 2, with quote block */}
            <article className="border border-border rounded-[14px] p-8 bg-white">
              <span className="font-display font-extrabold text-accent leading-none block mb-6" style={{ fontSize: '56px', letterSpacing: '-0.04em' }}>
                {t('solution_2_label')}
              </span>
              <h3 className="font-display font-bold text-primary mb-4" style={{ fontSize: '24px', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
                {t('solution_2_title')}
              </h3>
              <pre className="bg-primary text-white/90 rounded-[10px] p-4 mb-5 overflow-x-auto whitespace-pre-wrap font-mono text-[12.5px] leading-[1.55] border border-primary">
                <code>&gt; {t('solution_2_quote')}</code>
              </pre>
              <p className="text-[#2A3A54] leading-[1.6]" style={{ fontSize: '15.5px' }}>
                {t('solution_2_body')}
              </p>
            </article>

            {/* Card 3 */}
            <article className="border border-border rounded-[14px] p-8 bg-white">
              <span className="font-display font-extrabold text-accent leading-none block mb-6" style={{ fontSize: '56px', letterSpacing: '-0.04em' }}>
                {t('solution_3_label')}
              </span>
              <h3 className="font-display font-bold text-primary mb-4" style={{ fontSize: '24px', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
                {t('solution_3_title')}
              </h3>
              <div className="text-[#2A3A54] leading-[1.6] mb-5 space-y-3" style={{ fontSize: '15.5px' }}>
                {t('solution_3_body').split('\n\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              <p className="font-display font-bold text-primary leading-[1.4]" style={{ fontSize: '15px' }}>
                {t('solution_3_close')}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Comparison table, surface */}
      <section className="bg-surface" style={{ padding: '128px 24px' }}>
        <div className="mx-auto max-w-[1100px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.08em] uppercase mb-[18px] flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('compare_eyebrow')}
          </p>
          <h2 className="font-display font-bold text-primary m-0 mb-6" style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: '1.15', letterSpacing: '-0.02em', maxWidth: '20ch' }}>
            {t('compare_title')}
          </h2>
          <p className="text-[#2A3A54] leading-[1.6] mb-12" style={{ fontSize: '17px', maxWidth: '60ch' }}>
            {t('compare_intro')}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white border border-border rounded-[10px] overflow-hidden">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="text-left p-5 font-display font-bold text-[14px] tracking-[0.04em] uppercase w-1/4"></th>
                  <th className="text-left p-5 font-display font-bold text-[14px] tracking-[0.02em]">{t('compare_col_vendor')}</th>
                  <th className="text-left p-5 font-display font-bold text-[14px] tracking-[0.02em]">{t('compare_col_stevin')}</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-surface/40'}>
                    <td className="p-5 align-top font-display font-bold text-primary text-[14px] border-t border-border">{row.label}</td>
                    <td className="p-5 align-top text-[#2A3A54] text-[15px] leading-[1.55] border-t border-border">{row.vendor}</td>
                    <td className="p-5 align-top text-primary text-[15px] leading-[1.55] border-t border-border font-medium">{row.stevin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-10 text-[#2A3A54] leading-[1.6] italic" style={{ fontSize: '17px', maxWidth: '60ch' }}>
            {t('compare_close')}
          </p>
        </div>
      </section>

      {/* What you get, white */}
      <section className="bg-white" style={{ padding: '128px 24px' }}>
        <div className="mx-auto max-w-[1000px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.08em] uppercase mb-[18px] flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('get_eyebrow')}
          </p>
          <h2 className="font-display font-bold text-primary m-0 mb-12" style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: '1.15', letterSpacing: '-0.02em', maxWidth: '20ch' }}>
            {t('get_title')}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
            {getItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#2A3A54] leading-[1.55]" style={{ fontSize: '17px' }}>
                <span className="mt-[10px] w-2 h-2 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Connects to your stack, navy */}
      <section className="bg-primary" style={{ padding: '120px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[12px] font-display font-bold tracking-[0.08em] uppercase mb-[18px] flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('connects_eyebrow')}
          </p>
          <h2 className="font-display font-bold text-white m-0 mb-5" style={{ fontSize: 'clamp(26px, 2.8vw, 38px)', lineHeight: '1.2', letterSpacing: '-0.015em', maxWidth: '24ch' }}>
            {t('connects_title')}
          </h2>
          <p className="text-white/60 leading-[1.6] mb-14" style={{ fontSize: '16px', maxWidth: '58ch' }}>
            {t('connects_sub')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-9">
            {stackGroups.map((group) => (
              <div key={group.key}>
                <p className="text-[#5DA3FF] font-display font-bold text-[11px] tracking-[0.1em] uppercase mb-3.5 opacity-80">
                  {t(`connects_group_${group.key}`)}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center bg-white/[0.04] border border-white/10 rounded-md px-2.5 py-1.5 font-display font-medium text-white/85 text-[13px] hover:bg-white/[0.08] hover:border-white/20 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 pt-10 border-t border-white/10">
            <Link
              href="/integraties"
              className="inline-flex items-center gap-2 font-display font-medium text-[#5DA3FF] text-[15px] hover:text-white transition-colors group"
            >
              {t('connects_cta')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Pilot timeline, surface */}
      <section className="bg-surface" style={{ padding: '128px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.08em] uppercase mb-[18px] flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('pilot_eyebrow')}
          </p>
          <h2 className="font-display font-bold text-primary m-0 mb-12" style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: '1.15', letterSpacing: '-0.02em', maxWidth: '18ch' }}>
            {t('pilot_title')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((phase, i) => (
              <article key={phase.label} className="bg-white border border-border rounded-[12px] p-6 relative">
                <span className="font-display font-extrabold text-accent leading-none block mb-4" style={{ fontSize: '40px', letterSpacing: '-0.03em' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-display font-bold text-primary mb-3 text-[15px] tracking-[0.02em] uppercase">
                  {phase.label}
                </p>
                <p className="text-[#2A3A54] leading-[1.55]" style={{ fontSize: '15px' }}>
                  {phase.body}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-10 font-display font-bold text-primary leading-[1.4]" style={{ fontSize: '18px' }}>
            {t('pilot_close')}
          </p>
        </div>
      </section>

      {/* Trust via rigor, white */}
      <section className="bg-white" style={{ padding: '112px 24px' }}>
        <div className="mx-auto max-w-[1100px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.08em] uppercase mb-[18px] flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('proof_eyebrow')}
          </p>
          <h2 className="font-display font-bold text-primary m-0 mb-6" style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: '1.15', letterSpacing: '-0.02em' }}>
            {t('proof_title')}
          </h2>

          <p className="text-[#2A3A54] leading-[1.6] mb-12" style={{ fontSize: '17px', maxWidth: '60ch' }}>
            {t('proof_intro')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-surface/50 border border-border rounded-[12px] p-7"
              >
                <div className="text-accent font-display font-bold text-[14px] mb-3 tracking-[0.04em]">
                  {String(i).padStart(2, '0')}
                </div>
                <h3 className="font-display font-bold text-primary mb-3" style={{ fontSize: '20px', lineHeight: '1.25' }}>
                  {t(`proof_card${i}_title`)}
                </h3>
                <p className="text-[#2A3A54] leading-[1.6]" style={{ fontSize: '15px' }}>
                  {t(`proof_card${i}_body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compensation, surface */}
      <section className="bg-surface" style={{ padding: '128px 24px' }}>
        <div className="mx-auto max-w-[900px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.08em] uppercase mb-[18px] flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('comp_eyebrow')}
          </p>
          <h2 className="font-display font-bold text-primary m-0 mb-10" style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', lineHeight: '1.18', letterSpacing: '-0.02em', maxWidth: '24ch' }}>
            {t('comp_title')}
          </h2>
          <div className="space-y-5 mb-10" style={{ maxWidth: '62ch' }}>
            <p className="text-[#2A3A54] leading-[1.65]" style={{ fontSize: '17px' }}>
              {t('comp_body_1')}
            </p>
            <p className="text-[#2A3A54] leading-[1.65]" style={{ fontSize: '17px' }}>
              {t('comp_body_2')}
            </p>
            <p className="text-[#2A3A54] leading-[1.65]" style={{ fontSize: '17px' }}>
              {t('comp_body_3')}
            </p>
          </div>
          <p className="font-display font-bold text-primary leading-[1.4]" style={{ fontSize: '18px' }}>
            {t('comp_close')}
          </p>
        </div>
      </section>

      {/* Simon Stevin, navy */}
      <section className="bg-primary" style={{ padding: '128px 24px' }}>
        <div className="mx-auto max-w-[900px]">
          <p className="text-[#5DA3FF] text-[12px] font-display font-bold tracking-[0.08em] uppercase mb-[18px] flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('stevin_eyebrow')}
          </p>
          <h2 className="font-display font-bold text-white m-0 mb-10" style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: '1.15', letterSpacing: '-0.02em' }}>
            {t('stevin_title')}
          </h2>
          <p className="text-white/75 leading-[1.65] mb-6" style={{ fontSize: '18px' }}>
            {t('stevin_p1_pre')}<strong className="text-white font-semibold">{t('stevin_p1_name')}</strong>{t('stevin_p1_post')}
          </p>
          <p className="text-white/75 leading-[1.65] mb-6" style={{ fontSize: '18px' }}>
            {t('stevin_p2')}
          </p>
          <p className="text-white/75 leading-[1.65] mb-6" style={{ fontSize: '18px' }}>
            {t('stevin_p3')}
          </p>
          <p className="text-white leading-[1.65] font-display font-bold" style={{ fontSize: '18px' }}>
            {t('stevin_p4')}
          </p>
        </div>
      </section>

      {/* Final CTA, surface */}
      <section className="bg-surface" style={{ padding: '128px 24px' }}>
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="font-display font-extrabold text-primary m-0 mb-8" style={{ fontSize: 'clamp(34px, 4.2vw, 60px)', lineHeight: '1.05', letterSpacing: '-0.03em' }}>
            {t('cta_title')}
          </h2>
          <p className="text-[#2A3A54] leading-[1.5]" style={{ fontSize: '19px' }}>
            {t('cta_body_1')}
          </p>
          <p className="text-[#2A3A54] leading-[1.5] mb-10" style={{ fontSize: '19px' }}>
            {t('cta_body_2')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 font-display font-bold text-[16px] bg-accent text-white rounded-[10px] hover:bg-accent-dark transition-colors"
          >
            {t('cta_button')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
          <p className="mt-6 text-[14px] italic text-muted">{t('cta_note')}</p>
        </div>
      </section>

      {/* FAQ, white */}
      <section className="bg-white" style={{ padding: '128px 24px' }}>
        <div className="mx-auto max-w-[900px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.08em] uppercase mb-[18px] flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('faq_eyebrow')}
          </p>
          <h2 className="font-display font-bold text-primary m-0 mb-12" style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: '1.15', letterSpacing: '-0.02em' }}>
            {t('faq_title')}
          </h2>

          <div className="divide-y divide-border border-t border-b border-border">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-6">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-6 font-display font-bold text-primary text-[18px] leading-[1.4]">
                  <span>{faq.q}</span>
                  <span className="flex-shrink-0 mt-1 text-accent transition-transform group-open:rotate-45" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14"/><path d="M5 12h14"/>
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-[#2A3A54] leading-[1.6]" style={{ fontSize: '16.5px' }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
