import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import FAQAccordion from '@/components/FAQAccordion'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import MeetlatRuler from '@/components/MeetlatRuler'
import TrustBadges from '@/components/TrustBadges'
import { homepageFaqs } from '@/data/faqs'
import { nativeConnectors } from '@/data/connectors'

type Props = { params: Promise<{ locale: string }> }

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('home')
  const tr = await getTranslations('trust')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Stevin',
    description: 'Stevin is de meetlat tussen marketingspend en werkelijk resultaat. Voor ondernemers, merken en bureaus die hun cijfers serieus nemen — zonder black boxes.',
    url: 'https://stevin.ai',
    areaServed: 'NL',
    knowsAbout: ['Online Marketing', 'Marketing Automation', 'SEO', 'Paid Media', 'Analytics', 'Social Media Monitoring', 'Artist Management', 'PR & Communications'],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">

          {/* Eyebrow */}
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('eyebrow')}
          </p>

          {/* H1 */}
          <h1
            className="font-display font-extrabold text-white leading-[1.06] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(36px, 5vw, 76px)', maxWidth: '16ch' }}
          >
            {t('hero_h1')}{' '}
            <span className="text-[#5DA3FF]">{t('hero_h1_accent')}</span>
          </h1>

          {/* Sub */}
          <p
            className="text-white/60 leading-[1.55]"
            style={{ fontSize: '20px', maxWidth: '520px', marginTop: '32px' }}
          >
            {t('hero_sub')}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors"
            >
              {t('cta_demo')}
            </Link>
            <Link
              href="/platform"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-display font-semibold text-[15px] px-7 py-3.5 rounded-lg hover:border-white/40 hover:bg-white/5 transition-colors"
            >
              {t('cta_platform')}
            </Link>
          </div>

          {/* Multi-market teaser */}
          <Link
            href="/multi-market"
            className="inline-flex items-center mt-8 text-[#5DA3FF]/80 hover:text-[#5DA3FF] text-sm font-medium transition-colors"
          >
            {t('multimarket_teaser')}
          </Link>

          {/* Quote */}
          <p className="italic text-white/25 text-sm mt-10">
            &ldquo;{t('quote')}&rdquo; — {t('quote_author')}
          </p>

          {/* Meetlat */}
          <div className="mt-20">
            <MeetlatRuler color="rgba(255,255,255,.35)" />
          </div>
        </div>
      </section>

      {/* ── PATH SELECTOR ── */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">

          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
                <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
                {t('domain_eyebrow')}
              </p>
              <h2
                className="font-display font-extrabold text-primary m-0"
                style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', letterSpacing: '-0.03em', lineHeight: '1.08' }}
              >
                {t('domain_h2')}
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 font-display font-bold text-[15px] bg-neon text-primary rounded-[10px] hover:bg-neon-dark transition-colors neon-glow flex-shrink-0"
            >
              {t('domain_cta')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Marketing */}
            <Link
              href="/marketing"
              className="group rounded-[14px] border border-border bg-white hover:shadow-lg hover:border-accent/30 transition-all duration-200 flex flex-col"
              style={{ padding: '40px 36px 36px' }}
            >
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-6 flex items-center gap-[10px]">
                <span className="inline-block w-5 h-px bg-accent flex-shrink-0" aria-hidden="true" />
                {t('domain_marketing_eyebrow')}
              </p>
              <h3
                className="font-display font-bold text-primary mb-4"
                style={{ fontSize: '28px', lineHeight: '1.1', letterSpacing: '-0.025em' }}
              >
                {t('domain_marketing_h3')}
              </h3>
              <p className="text-muted leading-[1.6] flex-1" style={{ fontSize: '15px' }}>
                {t('domain_marketing_desc')}
              </p>
              <div className="mt-8 pt-5 border-t border-border">
                <span className="font-display font-semibold text-accent text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  {t('domain_marketing_link')}
                  <span className="inline-block group-hover:translate-x-0.5 transition-transform">→</span>
                </span>
              </div>
            </Link>

            {/* Artiesten */}
            <Link
              href="/artiesten"
              className="group rounded-[14px] border border-border bg-white hover:shadow-lg hover:border-pink/30 transition-all duration-200 flex flex-col"
              style={{ padding: '40px 36px 36px' }}
            >
              <p className="text-pink text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-6 flex items-center gap-[10px]">
                <span className="inline-block w-5 h-px bg-pink flex-shrink-0" aria-hidden="true" />
                {t('domain_artists_eyebrow')}
              </p>
              <h3
                className="font-display font-bold text-primary mb-4"
                style={{ fontSize: '28px', lineHeight: '1.1', letterSpacing: '-0.025em' }}
              >
                {t('domain_artists_h3')}
              </h3>
              <p className="text-muted leading-[1.6] flex-1" style={{ fontSize: '15px' }}>
                {t('domain_artists_desc')}
              </p>
              <div className="mt-8 pt-5 border-t border-border">
                <span className="font-display font-semibold text-pink text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  {t('domain_artists_link')}
                  <span className="inline-block group-hover:translate-x-0.5 transition-transform">→</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONNECTOR BAR ── */}
      <div className="bg-white border-y border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-8">
          <p className="text-[11px] font-display font-bold text-muted uppercase tracking-[0.08em] text-center mb-5">
            {t('connectors_label')}
          </p>
          <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap opacity-45">
            {nativeConnectors.map((c) => (
              <span key={c.slug} className="text-[10px] sm:text-xs font-bold text-muted tracking-wide">{c.name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── HET PROBLEEM ── */}
      <section className="bg-white" style={{ padding: '112px 24px 96px' }}>
        <div className="mx-auto max-w-[1200px]">

          <div className="flex justify-between items-end gap-12 mb-16 flex-col lg:flex-row">
            <div>
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
                <span className="inline-block w-6 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
                {t('problem_eyebrow')}
              </p>
              <h2
                className="font-display font-extrabold text-primary m-0"
                style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', letterSpacing: '-0.03em', lineHeight: '1.08', maxWidth: '18ch' }}
              >
                {t('problem_h2')}
              </h2>
            </div>
            <p className="text-muted leading-[1.55] max-w-[280px] lg:text-right" style={{ fontSize: '15px' }}>
              {t('problem_sub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: t('problem1_title'), desc: t('problem1_desc') },
              { title: t('problem2_title'), desc: t('problem2_desc') },
              { title: t('problem3_title'), desc: t('problem3_desc') },
            ].map((item) => (
              <article key={item.title} className="pt-6 border-t border-border">
                <h3
                  className="font-display font-bold text-primary mb-3"
                  style={{ fontSize: '18px', letterSpacing: '-0.01em', lineHeight: '1.2' }}
                >
                  {item.title}
                </h3>
                <p className="text-muted leading-[1.6]" style={{ fontSize: '15px' }}>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── DE ENGINE ── */}
      <section className="bg-primary" style={{ padding: '112px 24px' }}>
        <div className="mx-auto max-w-[1200px]">

          <div className="flex justify-between items-end gap-12 mb-14 flex-col lg:flex-row">
            <div>
              <p className="text-[#5DA3FF] text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
                <span className="inline-block w-6 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
                {t('engine_eyebrow')}
              </p>
              <h2
                className="font-display font-extrabold text-white m-0"
                style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', letterSpacing: '-0.03em', lineHeight: '1.08', maxWidth: '16ch' }}
              >
                {t('engine_h2')}
              </h2>
            </div>
            <Link
              href="/werkwijze"
              className="font-display font-semibold text-[14px] text-white/55 hover:text-white transition-colors flex-shrink-0"
            >
              {t('engine_link')}
            </Link>
          </div>

          <MeetlatRuler color="rgba(255,255,255,.3)" />
          <div className="mt-3 grid grid-cols-4 font-mono text-[11px] text-white/35 tracking-[0.04em]">
            <span>01 / KOPPELEN</span>
            <span>02 / VERGELIJKEN</span>
            <span>03 / ACTIVEREN</span>
            <span>04 / VERBETEREN</span>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: t('step1_num'), title: t('step1_title'), desc: t('step1_desc'), claim: t('step1_claim') },
              { step: t('step2_num'), title: t('step2_title'), desc: t('step2_desc'), claim: t('step2_claim') },
              { step: t('step3_num'), title: t('step3_title'), desc: t('step3_desc'), claim: t('step3_claim') },
              { step: t('step4_num'), title: t('step4_title'), desc: t('step4_desc'), claim: t('step4_claim') },
            ].map((item) => (
              <article key={item.step} className="pt-2">
                <span
                  className="font-display font-extrabold text-accent leading-none"
                  style={{ fontSize: '72px', letterSpacing: '-0.04em' }}
                >
                  {item.step}
                </span>
                <h3
                  className="font-display font-bold text-white mt-4 mb-3"
                  style={{ fontSize: '20px', letterSpacing: '-0.02em' }}
                >
                  {item.title}
                </h3>
                <p className="text-white/55 leading-[1.6] mb-6" style={{ fontSize: '14.5px' }}>
                  {item.desc}
                </p>
                <div className="flex items-center gap-2.5 pt-5 border-t border-white/10">
                  <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                  <p className="font-display font-bold text-accent" style={{ fontSize: '14px', letterSpacing: '-0.01em' }}>
                    {item.claim}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── VOORDELEN 2×2 ── */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12">
            <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
              <span className="inline-block w-6 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
              {t('benefits_eyebrow')}
            </p>
            <h2
              className="font-display font-extrabold text-primary m-0"
              style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', letterSpacing: '-0.03em', lineHeight: '1.08', maxWidth: '18ch' }}
            >
              {t('benefits_h2')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { num: '01', title: t('benefit1_title'), desc: t('benefit1_desc') },
              { num: '02', title: t('benefit2_title'), desc: t('benefit2_desc') },
              { num: '03', title: t('benefit3_title'), desc: t('benefit3_desc') },
              { num: '04', title: t('benefit4_title'), desc: t('benefit4_desc') },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[14px] bg-white border border-border flex flex-col items-center text-center gap-3"
                style={{ padding: '40px 32px' }}
              >
                <span
                  className="font-display font-extrabold text-pink leading-none"
                  style={{ fontSize: '48px', letterSpacing: '-0.04em' }}
                >
                  {item.num}
                </span>
                <h3
                  className="font-display font-bold text-primary"
                  style={{ fontSize: '18px', letterSpacing: '-0.02em', lineHeight: '1.2' }}
                >
                  {item.title}
                </h3>
                <p className="text-muted leading-[1.6]" style={{ fontSize: '14.5px' }}>
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── VERTROUWEN ── */}
      <section className="bg-primary" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <p className="text-[#5DA3FF] text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center justify-center gap-[14px]">
              <span className="inline-block w-6 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
              {t('security_eyebrow')}
            </p>
            <h2
              className="font-display font-extrabold text-white m-0"
              style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', letterSpacing: '-0.03em', lineHeight: '1.08' }}
            >
              {tr('heading')}
            </h2>
            <p className="text-white/55 leading-[1.55] mt-5 mx-auto" style={{ fontSize: '17px', maxWidth: '440px' }}>
              {tr('subheading')}
            </p>
          </div>

          <TrustBadges className="mb-14 justify-center" />

          <p
            className="text-center text-white/35 leading-[1.6]"
            style={{ fontSize: '14px', maxWidth: '600px', margin: '0 auto' }}
          >
            {tr('copy')}
          </p>

          {/* 3 trust pillars */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: tr('pillar1_title'), desc: tr('pillar1_desc') },
              { title: tr('pillar2_title'), desc: tr('pillar2_desc') },
              { title: tr('pillar3_title'), desc: tr('pillar3_desc') },
            ].map((pillar) => (
              <article key={pillar.title} className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-2 h-2 rounded-full bg-neon flex-shrink-0" aria-hidden="true" />
                  <h3
                    className="font-display font-bold text-white"
                    style={{ fontSize: '16px', letterSpacing: '-0.01em' }}
                  >
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-white/50 leading-[1.6]" style={{ fontSize: '14.5px' }}>
                  {pillar.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTAAT ── */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
                <span className="inline-block w-6 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
                {t('result_eyebrow')}
              </p>
              <h2
                className="font-display font-extrabold text-primary"
                style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', letterSpacing: '-0.03em', lineHeight: '1.08' }}
              >
                {t('result_h2')}
              </h2>
              <p className="text-muted leading-[1.6] mt-6" style={{ fontSize: '16px' }}>
                {t('result_desc')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-[14px] border border-border bg-white p-8">
                <p
                  className="font-display font-extrabold text-neon"
                  style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: '1' }}
                >
                  {t('stat1_value')}
                </p>
                <p className="text-muted mt-3 leading-[1.4]" style={{ fontSize: '13px' }}>{t('stat1_label')}</p>
              </div>
              <div className="rounded-[14px] border border-border bg-white p-8">
                <p
                  className="font-display font-extrabold text-accent"
                  style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: '1' }}
                >
                  {t('stat2_value')}
                </p>
                <p className="text-muted mt-3 leading-[1.4]" style={{ fontSize: '13px' }}>{t('stat2_label')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-between items-end gap-12 mb-12 flex-col lg:flex-row">
            <div>
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
                <span className="inline-block w-6 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
                {t('faq_eyebrow')}
              </p>
              <h2
                className="font-display font-extrabold text-primary m-0"
                style={{ fontSize: 'clamp(28px, 3vw, 44px)', letterSpacing: '-0.03em', lineHeight: '1.1' }}
              >
                {t('faq_h2')}
              </h2>
            </div>
          </div>
          <FAQAccordion faqs={homepageFaqs} />
        </div>
      </section>

      {/* ── CLOSING ── */}
      <section className="bg-primary" style={{ padding: '112px 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-neon text-[14px] font-display font-bold tracking-[0.14em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-neon flex-shrink-0" aria-hidden="true" />
            {t('closing_eyebrow')}
          </p>
          <div className="flex items-end justify-between gap-12 flex-col lg:flex-row">
            <h2
              className="font-display font-extrabold text-white m-0"
              style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: '1.02', letterSpacing: '-0.032em', maxWidth: '14ch' }}
            >
              {t('closing_h2_line1')}<br />
              {t('closing_h2_line2')}
            </h2>
            <div className="flex flex-col items-start lg:items-end gap-5">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 font-display font-bold text-[15px] bg-neon text-primary rounded-[10px] hover:bg-neon-dark transition-colors neon-glow"
              >
                {t('closing_cta')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
              <div className="flex gap-6 flex-wrap">
                <Link href="/marketing" className="font-display font-semibold text-sm text-white/45 hover:text-white transition-colors">{t('closing_link_marketing')}</Link>
                <Link href="/artiesten" className="font-display font-semibold text-sm text-white/45 hover:text-white transition-colors">{t('closing_link_artists')}</Link>
              </div>
            </div>
          </div>

          <div
            className="mt-20 flex justify-between flex-wrap gap-4 pt-7"
            style={{ borderTop: '1px solid rgba(255,255,255,.1)' }}
          >
            <p className="italic text-[13px]" style={{ color: 'rgba(255,255,255,.35)' }}>
              &ldquo;{t('quote')}&rdquo; — {t('quote_author')}
            </p>
            <p
              className="font-display text-[12px] font-medium tracking-[0.06em] uppercase"
              style={{ color: 'rgba(255,255,255,.3)' }}
            >
              stevin.ai
            </p>
          </div>
        </div>
      </section>

      <StickyMobileCTA />
    </>
  )
}
