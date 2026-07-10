import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import FAQAccordion from '@/components/FAQAccordion'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import SignalFlowDemo from '@/components/SignalFlowDemo'
import StevinBrainVisual from '@/components/StevinBrainVisual'
import TrustBadges from '@/components/TrustBadges'
import { getHomepageFaqs, type FAQ } from '@/data/faqs'
import { editorials } from '@/data/articles'

type Props = { params: Promise<{ locale: string }> }

// Capability-sectie, uitgelijnd met de hero-belofte (je eigen marketing-brein).
// Inline copy per taal zodat dit los staat van de marketing-i18n en makkelijk
// te itereren is.
const CAPABILITIES = {
  nl: {
    eyebrow: 'EEN LAAG OVER JE MARKETING EN SALES',
    h2: 'Wat het brein voor je doet.',
    cards: [
      { t: 'Jouw data, een geheugen', d: 'Campagnes, creatives, resultaten en klantsignalen komen samen in een brein dat van jou blijft. Data ownership, geen los eiland per platform.', href: '/data-verrijking' },
      { t: 'Onthoudt wat werkte', d: 'Stevin bewaart per seizoen, kanaal en hook wat het opleverde. Je volgende briefing begint niet bij nul, maar bij wat vorig jaar bewezen werkte.', href: null },
      { t: 'Human in the loop', d: 'Elke actie met impact gaat eerst langs een mens, met de bron erbij. AI die meewerkt zonder dat je grip verliest.', href: null },
    ],
  },
  en: {
    eyebrow: 'ONE LAYER OVER YOUR MARKETING AND SALES',
    h2: 'What the brain does for you.',
    cards: [
      { t: 'Your data, one memory', d: 'Campaigns, creatives, results and customer signals come together in a brain that stays yours. Data ownership, no separate island per platform.', href: '/data-verrijking' },
      { t: 'Remembers what worked', d: 'Stevin keeps track of what every season, channel and hook delivered. Your next briefing does not start from zero, it starts from what was proven to work last year.', href: null },
      { t: 'Human in the loop', d: 'Every action with impact passes a person first, with the source attached. AI that works alongside you, without you losing control.', href: null },
    ],
  },
} as const

// Homepage self-canonical + hreflang. De layout zet titel/description/OG al,
// maar geen canonical of taalkoppeling. De belangrijkste URL van de site hoort
// die expliciet te dragen. types (RSS) hier meenemen, anders overschrijft deze
// alternates de feed-link uit de layout.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  const nlUrl = 'https://stevin.ai'
  const enUrl = 'https://stevin.ai/en'
  return {
    alternates: {
      canonical: isEn ? enUrl : nlUrl,
      languages: { 'nl-NL': nlUrl, en: enUrl, 'x-default': nlUrl },
      types: { 'application/rss+xml': 'https://stevin.ai/feed.xml' },
    },
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('home')
  const tr = await getTranslations('trust')
  const homepageFaqs = getHomepageFaqs(locale)
  const cap = locale === 'en' ? CAPABILITIES.en : CAPABILITIES.nl

  // Organization + WebSite JSON-LD staan nu sitewide via components/SiteJsonLd.tsx
  // (in de gedeelde layout), zodat de #organization-referenties op alle long-tail
  // pagina's resolveren. Hier op de homepage houden we alleen de FAQPage over.

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: homepageFaqs.map((faq: FAQ) => ({
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

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        {/* Hero-visual: het Stevin Brain als sfeer-constellatie, transparant en
            kaderloos, rechts inzwevend in het navy (ongeveer 3:4). Vervangt de
            oude VR-render. Alleen op groot scherm; mobiel blijft rustig navy. */}
        <div
          className="absolute inset-y-0 right-0 z-20 hidden lg:flex items-center justify-end overflow-hidden"
          aria-hidden="true"
          style={{
            // Zachte fade aan de linkerrand zodat het brein in het navy oplost
            // (masker i.p.v. overlay, zodat de nodes klikbaar en sleepbaar zijn).
            maskImage: 'linear-gradient(90deg, transparent 0%, black 26%)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 26%)',
          }}
        >
          <div className="w-[52vw] max-w-[600px] translate-x-[4%]">
            <StevinBrainVisual aspect="3:4" brand={false} claim="" ariaLabel="" locale={locale} />
          </div>
        </div>
        {/* Navy fade: links opaak zodat de koptekst leesbaar blijft, naar rechts
            transparant zodat het brein inzweeft zonder harde rand. */}
        <div
          className="absolute inset-0 z-0"
          aria-hidden="true"
          style={{ background: 'linear-gradient(90deg, #0A1628 0%, #0A1628 30%, rgba(10,22,40,0.6) 56%, rgba(10,22,40,0) 84%)' }}
        />
        <div
          className="absolute inset-0 z-0"
          aria-hidden="true"
          style={{ background: 'linear-gradient(180deg, rgba(10,22,40,0.3) 0%, rgba(10,22,40,0) 35%, rgba(10,22,40,0.5) 100%)' }}
        />
        <div className="relative z-10 mx-auto max-w-[1200px]">

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
            <a
              href="#hoe-het-werkt"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-display font-semibold text-[15px] px-7 py-3.5 rounded-lg hover:border-white/40 hover:bg-white/5 transition-colors"
            >
              {t('cta_platform')}
            </a>
          </div>

          {/* Proof boven de vouw (geanonimiseerd) */}
          <div className="flex flex-wrap gap-2.5 mt-9">
            {[t('proof_1'), t('proof_2'), t('proof_3')].map((p) => (
              <span
                key={p}
                className="text-[12px] text-white/70 border border-white/15 rounded-full px-3.5 py-1.5 leading-none"
              >
                {p}
              </span>
            ))}
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
            &ldquo;{t('quote')}&rdquo; &middot; {t('quote_author')}
          </p>

        </div>
      </section>

      {/* ── CAPABILITIES (werklaag, breed) ── */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            {cap.eyebrow}
          </p>
          <h2
            className="font-display font-extrabold text-primary m-0 mb-14"
            style={{ fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08', maxWidth: '20ch' }}
          >
            {cap.h2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-[14px] overflow-hidden">
            {cap.cards.map((c, i) => {
              const inner = (
                <>
                  <p className="font-mono text-[11px] text-muted mb-5">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-display font-bold text-primary mb-3 flex items-center gap-2" style={{ fontSize: '20px', letterSpacing: '-0.01em' }}>
                    {c.t}
                    {c.href && (
                      <span className="text-accent transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                    )}
                  </h3>
                  <p className="text-muted leading-[1.6]" style={{ fontSize: '15px' }}>{c.d}</p>
                </>
              )
              return c.href ? (
                <Link key={c.t} href={c.href} className="group bg-white p-8 lg:p-10 block transition-colors hover:bg-surface">
                  {inner}
                </Link>
              ) : (
                <div key={c.t} className="bg-white p-8 lg:p-10">{inner}</div>
              )
            })}
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

          {/* Intro die het hele-bedrijf-verhaal vervangt, marketing-eerst */}
          <p className="text-muted leading-[1.6] mb-12" style={{ fontSize: '17px', maxWidth: '620px' }}>
            {t('domain_intro')}
          </p>

          {/* Drie marketing-segmenten */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { h: t('domain_c1_h3'), d: t('domain_c1_desc'), href: '/marketing' },
              { h: t('domain_c2_h3'), d: t('domain_c2_desc'), href: '/marketing' },
              { h: t('domain_c3_h3'), d: t('domain_c3_desc'), href: '/merken' },
            ].map((c) => (
              <Link
                key={c.h}
                href={c.href}
                className="group block rounded-[14px] border border-border bg-white hover:shadow-lg hover:border-accent/30 transition-all duration-200"
                style={{ padding: '40px 36px 36px' }}
              >
                <h3
                  className="font-display font-bold text-primary mb-4"
                  style={{ fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: '1.12', letterSpacing: '-0.02em' }}
                >
                  {c.h}
                </h3>
                <p className="text-muted leading-[1.6]" style={{ fontSize: '15px' }}>
                  {c.d}
                </p>
                <div className="mt-7 pt-5 border-t border-border">
                  <span className="font-display font-semibold text-accent text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    {t('domain_card_link')}
                    <span className="inline-block group-hover:translate-x-0.5 transition-transform">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Vakman-spoor bewust secundair: een regel, geen kaart */}
          <div className="mt-8 text-center">
            <Link href="/mkb" className="text-sm text-muted hover:text-accent transition-colors inline-flex items-center gap-1.5">
              {t('domain_vakman_linktext')}
              <span aria-hidden="true">→</span>
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
          <div className="flex items-center justify-center gap-7 sm:gap-10 flex-wrap">
            {[
              { s: 'google-ads', n: 'Google Ads' },
              { s: 'meta', n: 'Meta' },
              { s: 'instagram', n: 'Instagram' },
              { s: 'tiktok', n: 'TikTok' },
              { s: 'youtube', n: 'YouTube' },
              { s: 'linkedin', n: 'LinkedIn' },
              { s: 'google-analytics', n: 'Google Analytics' },
            ].map((l) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={l.s}
                src={`/logos/tools/${l.s}.svg`}
                alt={l.n}
                style={{ height: '26px', width: 'auto', opacity: 0.5 }}
              />
            ))}
            <Link href="/integraties" className="text-[13px] font-display font-semibold text-accent hover:opacity-80 transition-opacity">
              en 245+ andere &rarr;
            </Link>
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

      {/* ── DE OUDE MANIER VS STEVIN ── */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-12">
            <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
              <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
              {t('compare_eyebrow')}
            </p>
            <h2
              className="font-display font-extrabold text-primary m-0 mb-4"
              style={{ fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08', maxWidth: '20ch' }}
            >
              {t('compare_h2')}
            </h2>
            <p className="text-muted leading-[1.6]" style={{ fontSize: '16px', maxWidth: '540px' }}>{t('compare_sub')}</p>
          </div>

          <div className="rounded-[14px] border border-border overflow-hidden bg-white">
            <div className="grid grid-cols-[0.9fr_1fr_1fr] border-b border-border">
              <div className="p-3 sm:p-4" aria-hidden="true" />
              <div className="p-3 sm:p-4 font-display font-bold uppercase tracking-wide text-muted" style={{ fontSize: '12px' }}>{t('compare_col_old')}</div>
              <div className="p-3 sm:p-4 font-display font-bold uppercase tracking-wide text-accent" style={{ fontSize: '12px', backgroundColor: 'rgba(93,163,255,0.06)' }}>{t('compare_col_stevin')}</div>
            </div>
            {[
              { l: t('compare_r1_label'), o: t('compare_r1_old'), n: t('compare_r1_new') },
              { l: t('compare_r2_label'), o: t('compare_r2_old'), n: t('compare_r2_new') },
              { l: t('compare_r3_label'), o: t('compare_r3_old'), n: t('compare_r3_new') },
              { l: t('compare_r4_label'), o: t('compare_r4_old'), n: t('compare_r4_new') },
              { l: t('compare_r5_label'), o: t('compare_r5_old'), n: t('compare_r5_new') },
            ].map((row, i, arr) => (
              <div key={row.l} className={`grid grid-cols-[0.9fr_1fr_1fr] ${i < arr.length - 1 ? 'border-b border-border' : ''}`}>
                <div className="p-3 sm:p-4 font-display font-semibold text-primary" style={{ fontSize: '14px' }}>{row.l}</div>
                <div className="p-3 sm:p-4 text-muted leading-[1.45]" style={{ fontSize: '13.5px' }}>{row.o}</div>
                <div className="p-3 sm:p-4 text-primary leading-[1.45]" style={{ fontSize: '13.5px', backgroundColor: 'rgba(93,163,255,0.06)' }}>{row.n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DE ENGINE ── */}
      <section id="hoe-het-werkt" className="bg-primary scroll-mt-24" style={{ padding: '112px 24px' }}>
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

          <SignalFlowDemo />

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  className="font-display font-extrabold text-accent leading-none"
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
              {[
                { value: t('case1_value'), label: t('case1_label') },
                { value: t('case2_value'), label: t('case2_label') },
                { value: t('case3_value'), label: t('case3_label') },
                { value: t('case4_value'), label: t('case4_label') },
              ].map((c, i) => (
                <div key={i} className="rounded-[14px] border border-border bg-white p-8">
                  <p
                    className="font-display font-extrabold text-accent"
                    style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.04em', lineHeight: '1' }}
                  >
                    {c.value}
                  </p>
                  <p className="text-muted mt-3 leading-[1.45]" style={{ fontSize: '13px' }}>{c.label}</p>
                </div>
              ))}
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

      {/* ── JOURNAL FEATURED ── */}
      {(() => {
        const featured = editorials()[0]
        if (!featured) return null
        const bgStyle =
          featured.posterStyle === 'gradient'
            ? 'linear-gradient(135deg, var(--navy) 0%, #1a2f52 100%)'
            : featured.posterStyle === 'surface'
            ? 'var(--surface-alt, #E8EFF7)'
            : 'var(--navy)'
        const txtColor = featured.posterStyle === 'surface' ? 'var(--navy)' : '#fff'
        const tagBg = featured.posterStyle === 'surface' ? 'var(--navy)' : 'rgba(255,255,255,0.94)'
        const tagColor = featured.posterStyle === 'surface' ? '#fff' : 'var(--navy)'
        return (
          <section className="bg-[var(--surface)]" style={{ padding: '96px 24px' }}>
            <div className="mx-auto max-w-[1200px]">
              <p
                className="font-display font-bold tracking-[0.12em] uppercase mb-10 flex items-center gap-[14px]"
                style={{ fontSize: '11px', color: 'var(--muted)' }}
              >
                <span className="inline-block w-6 h-px bg-muted opacity-60 flex-shrink-0" aria-hidden="true" />
                UIT HET JOURNAL
              </p>
              <Link
                href={`/blog/${featured.slug}`}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 no-underline text-inherit group items-center"
              >
                <div
                  className="overflow-hidden w-full h-full flex flex-col justify-between"
                  style={{
                    background: bgStyle,
                    color: txtColor,
                    borderRadius: '14px',
                    aspectRatio: '4 / 3',
                    padding: 'clamp(28px, 5vw, 44px)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      background: tagBg,
                      color: tagColor,
                      padding: '6px 10px',
                      borderRadius: '4px',
                      alignSelf: 'flex-start',
                    }}
                  >
                    {featured.posterTag}
                  </span>
                  <span
                    className="font-display font-extrabold"
                    style={{
                      fontSize: 'clamp(26px, 3vw, 38px)',
                      lineHeight: '1.05',
                      letterSpacing: '-0.025em',
                      maxWidth: '14ch',
                    }}
                  >
                    {featured.posterTopic}
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '11px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      marginBottom: '14px',
                    }}
                  >
                    Editie {featured.edition} · {featured.category} · {featured.readMinutes} min
                  </p>
                  <h2
                    className="font-display font-bold text-[var(--navy)] m-0 group-hover:text-[var(--accent)] transition-colors"
                    style={{
                      fontSize: 'clamp(28px, 3vw, 42px)',
                      lineHeight: '1.08',
                      letterSpacing: '-0.025em',
                      marginBottom: '20px',
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '17px',
                      lineHeight: '1.55',
                      color: 'var(--muted)',
                      marginBottom: '28px',
                    }}
                  >
                    {featured.dek}
                  </p>
                  <span
                    className="font-display font-semibold text-[var(--accent)] inline-flex items-center gap-2"
                    style={{ fontSize: '15px' }}
                  >
                    Lees editie {featured.edition} →
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )
      })()}

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
            </div>
          </div>

          <div
            className="mt-20 flex justify-between flex-wrap gap-4 pt-7"
            style={{ borderTop: '1px solid rgba(255,255,255,.1)' }}
          >
            <p className="italic text-[13px]" style={{ color: 'rgba(255,255,255,.35)' }}>
              &ldquo;{t('quote')}&rdquo; &middot; {t('quote_author')}
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
