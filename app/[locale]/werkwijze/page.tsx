import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import MeetlatRuler from '@/components/MeetlatRuler'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'werkwijze' })
  return {
    title: `${t('eyebrow')} — Stevin`,
    description: t('sub'),
  }
}

const phaseIcons = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" className="w-5 h-5">
      <path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"/>
      <path d="m2 22 3-3"/><path d="M7.5 13.5 10 11"/><path d="M10.5 16.5 13 14"/>
      <path d="m18 3-4 4h6l-4 4"/>
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" className="w-5 h-5">
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
      <path d="M7 21h10"/><path d="M12 3v18"/>
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" className="w-5 h-5">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" className="w-5 h-5">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
      <path d="M21 3v5h-5"/>
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
      <path d="M3 21v-5h5"/>
    </svg>
  ),
]

export default async function WerkwijzePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('werkwijze')

  const phases = [
    {
      number: '01',
      title: t('phase1_title'),
      body: <>{t('phase1_body_intro')} <strong className="text-primary font-semibold">{t('phase1_body_strong')}</strong>{t('phase1_body_rest')}</>,
      claim: t('phase1_claim'),
      icon: phaseIcons[0],
    },
    {
      number: '02',
      title: t('phase2_title'),
      body: <><strong className="text-primary font-semibold">{t('phase2_body_strong')}</strong>{t('phase2_body_rest')}</>,
      claim: t('phase2_claim'),
      icon: phaseIcons[1],
    },
    {
      number: '03',
      title: t('phase3_title'),
      body: <>{t('phase3_body_intro')} <strong className="text-primary font-semibold">{t('phase3_body_strong')}</strong>{t('phase3_body_rest')}</>,
      claim: t('phase3_claim'),
      icon: phaseIcons[2],
    },
    {
      number: '04',
      title: t('phase4_title'),
      body: <>{t('phase4_body_intro')} <strong className="text-primary font-semibold">{t('phase4_body_strong')}</strong>{t('phase4_body_rest')}</>,
      claim: t('phase4_claim'),
      icon: phaseIcons[3],
    },
  ]

  const phaseLabels = [
    `01 / ${t('phase1_title').toUpperCase()}`,
    `02 / ${t('phase2_title').toUpperCase()}`,
    `03 / ${t('phase3_title').toUpperCase()}`,
    `04 / ${t('phase4_title').toUpperCase()}`,
  ]

  return (
    <>
      {/* ── Hero — navy ── */}
      <section className="bg-primary overflow-hidden -mt-[72px]" style={{ paddingTop: 'calc(96px + 72px)', paddingBottom: '128px' }}>
        <div className="mx-auto max-w-[1200px] px-6">

          {/* 2-col grid: left = eyebrow + H1 + sub | right = side-quote */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-20 items-end">
            <div>
              {/* Eyebrow */}
              <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
                <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
                {t('eyebrow')}
              </p>

              {/* H1 */}
              <h1
                className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em] mb-6"
                style={{ fontSize: 'clamp(44px, 6.4vw, 96px)', maxWidth: '16ch' }}
              >
                <span className="linebreak">{t('h1_line1')}</span>
                <span className="linebreak">{t('h1_line2')}</span>
                <span className="linebreak">{t('h1_line3').replace('.', '')}<span className="text-accent">.</span></span>
              </h1>

              <p className="text-white/60 leading-[1.5] max-w-[520px]" style={{ fontSize: '19px' }}>
                {t('sub')}
              </p>
            </div>

            {/* Side-quote */}
            <aside className="text-white/55 text-[13px] text-right leading-[1.7] pb-[10px] hidden lg:block">
              <span className="block italic text-white/85 leading-[1.45] mb-2" style={{ fontSize: '15px', maxWidth: '260px', marginLeft: 'auto' }}>
                &ldquo;{t('side_quote')}&rdquo;
              </span>
              {t('side_quote_author')}
            </aside>
          </div>

          {/* Meetlat-ruler + labels */}
          <div className="mt-24 text-white/55">
            <MeetlatRuler color="rgba(255,255,255,.55)" />
            <div className="mt-3.5 flex justify-between font-mono text-[11px] text-white/45 tracking-[0.04em]">
              <span>{t('ruler_label0')}</span>
              <span>01</span>
              <span>02</span>
              <span>03</span>
              <span>{t('ruler_label4')}</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── Phases — surface ── */}
      <section className="bg-surface" style={{ padding: '128px 24px 96px' }}>
        <div className="mx-auto max-w-[1200px]">

          {/* Section head */}
          <div className="flex justify-between items-end gap-12 mb-[72px] flex-col lg:flex-row">
            <div>
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.08em] uppercase mb-[18px] flex items-center gap-[14px]">
                <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
                {t('phases_eyebrow')}
              </p>
              <h2
                className="font-display font-bold text-primary m-0"
                style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: '1.2', maxWidth: '18ch' }}
              >
                {t('phases_h2')}
              </h2>
            </div>
            <p className="text-muted text-[15px] leading-[1.55] max-w-[280px] lg:text-right">
              {t('phases_sub')}
            </p>
          </div>

          {/* Ruler + fase-labels */}
          <MeetlatRuler color="#0A1628" />
          <div className="mt-3 grid grid-cols-4 font-mono text-[11px] text-muted tracking-[0.04em]">
            {phaseLabels.map((l) => <span key={l}>{l}</span>)}
          </div>

          {/* 4-col phase grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {phases.map((phase) => (
              <article key={phase.number} className="relative pt-2 pr-1">
                {/* Head: number + icon */}
                <div className="flex items-baseline justify-between mb-6">
                  <span
                    className="font-display font-extrabold text-accent leading-none"
                    style={{ fontSize: '72px', letterSpacing: '-0.04em' }}
                  >
                    {phase.number}
                  </span>
                  <div className="w-11 h-11 rounded-[10px] border border-border bg-white flex items-center justify-center text-primary shadow-[0_1px_2px_rgba(10,22,40,.06)]">
                    {phase.icon}
                  </div>
                </div>

                <h3
                  className="font-display font-bold text-primary mb-3.5"
                  style={{ fontSize: '26px', lineHeight: '1.15', letterSpacing: '-0.02em' }}
                >
                  {phase.title}
                </h3>

                <p className="text-[#2A3A54] leading-[1.6] mb-6" style={{ fontSize: '15.5px', maxWidth: '28ch' }}>
                  {phase.body}
                </p>

                {/* Claim met bolletje + border-top */}
                <div className="flex items-center gap-2.5 pt-5 border-t border-border" style={{ maxWidth: '28ch' }}>
                  <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                  <p className="font-display font-bold text-accent text-[15px] leading-[1.4] tracking-[-0.01em]">
                    {phase.claim}
                  </p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ── Closing — navy ── */}
      <section className="bg-primary" style={{ padding: '112px 24px' }}>
        <div className="mx-auto max-w-[1200px] flex items-center justify-between gap-12 flex-col lg:flex-row">
          <h3
            className="font-display font-extrabold text-white m-0"
            style={{ fontSize: 'clamp(34px, 4.2vw, 60px)', lineHeight: '1.02', letterSpacing: '-0.03em', maxWidth: '14ch' }}
          >
            {t('closing_h3_line1')}<br />
            {t('closing_h3_line2').replace('Stevin', '')} <span className="text-accent">Stevin</span>.
          </h3>
          <div className="flex flex-col items-start lg:items-end gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 font-display font-bold text-[15px] bg-neon text-primary rounded-[10px] hover:bg-neon-dark transition-colors neon-glow"
            >
              {t('closing_cta')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
            <p className="text-[14px] italic text-white/55">
              &ldquo;{t('closing_quote')}&rdquo; — {t('closing_quote_author')}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
