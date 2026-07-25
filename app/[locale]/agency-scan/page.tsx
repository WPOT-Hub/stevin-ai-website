import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import ContactForm from '@/components/ContactForm'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'agency_scan' })
  return {
    title: `${t('h1')}, Stevin.AI`,
    description: t('sub'),
    robots: 'noindex, nofollow',
  }
}

export default async function AgencyScanPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('agency_scan')

  const BLIND_SPOTS = [
    { icon: '🕵️', label: t('blind1_label'), body: t('blind1_body') },
    { icon: '🤖', label: t('blind2_label'), body: t('blind2_body') },
    { icon: '📉', label: t('blind3_label'), body: t('blind3_body') },
  ]

  const HOW_IT_WORKS = [
    { number: t('step1_num'), title: t('step1_title'), body: t('step1_body') },
    { number: t('step2_num'), title: t('step2_title'), body: t('step2_body') },
    { number: t('step3_num'), title: t('step3_title'), body: t('step3_body') },
  ]

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 80px' }}>
        <div className="mx-auto max-w-[1200px]">

          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('hero_eyebrow')}
          </p>

          <h1
            className="font-display font-extrabold text-white leading-[1.06] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)', maxWidth: '18ch' }}
          >
            {t('hero_h1')}{' '}
            <span className="text-[#5DA3FF]">{t('hero_h1_accent')}</span>
          </h1>

          <p
            className="text-white/60 leading-[1.55] mt-8"
            style={{ fontSize: '19px', maxWidth: '520px' }}
          >
            {t('hero_sub')}
          </p>

          <div className="mt-10">
            <a
              href="#scan"
              className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors"
            >
              {t('hero_cta')}
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTIE 1: DE PIJN ── */}
      <section className="bg-surface" style={{ padding: '80px 24px' }}>
        <div className="mx-auto max-w-[1200px]">

          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-10 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            {t('pain_eyebrow')}
          </p>

          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-6"
            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', maxWidth: '20ch' }}
          >
            {t('pain_h2')}
          </h2>

          <p className="text-muted leading-[1.6] mb-4" style={{ fontSize: '17px', maxWidth: '640px' }}>
            {t('pain_p1')}
          </p>

          <p className="text-muted leading-[1.6] mb-12" style={{ fontSize: '17px', maxWidth: '640px' }}>
            {t('pain_p2')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLIND_SPOTS.map((spot) => (
              <div key={spot.label} className="bg-white rounded-xl p-8 border border-border">
                <span className="text-2xl block mb-4">{spot.icon}</span>
                <h3 className="font-display font-bold text-primary text-[17px] mb-3 leading-snug">
                  {spot.label}
                </h3>
                <p className="text-muted text-[15px] leading-relaxed">{spot.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTIE 2: DE OPLOSSING ── */}
      <section className="bg-white" style={{ padding: '80px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <div>
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-6 flex items-center gap-[14px]">
                <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
                {t('how_eyebrow')}
              </p>

              <h2
                className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-6"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                {t('how_h2')}{' '}
                <span className="text-accent">{t('how_h2_accent')}</span>
              </h2>

              <p className="text-muted leading-[1.6] mb-10" style={{ fontSize: '17px' }}>
                {t('how_p')}
              </p>

              <div className="space-y-4">
                {HOW_IT_WORKS.map((step) => (
                  <div key={step.number} className="flex gap-6 items-start">
                    <span className="font-mono text-[11px] text-accent font-bold tracking-widest mt-1 flex-shrink-0">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-primary text-[16px] mb-1 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-muted text-[15px] leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signal card */}
            <div className="bg-[#0A1628] rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#F4216A] animate-pulse" />
                <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">Live · Stevin</span>
              </div>
              {[
                {
                  label: 'CRITICAL',
                  color: '#F4216A',
                  title: '[FAKE CONVERSION] Meta optimaliseert op soft events',
                  body: 'Pixel: 229 conversies · GA4: 32. De €660 spend traint het algoritme op bouncers, niet op klanten.',
                },
                {
                  label: 'HIGH',
                  color: '#F5A623',
                  title: '[BUDGET WASTE] Brand-term kannibalisatie gedetecteerd',
                  body: '€2.140 spend op merknaam-campagne. 78% van dit verkeer zou organisch binnenkomen.',
                },
                {
                  label: 'HIGH',
                  color: '#5DA3FF',
                  title: '[MARKUP] Media-spend vs. facturatie mismatch',
                  body: 'Werkelijke Google-spend: €3.200. Gefactureerd: €4.100. Verschil: €900 (28%).',
                },
              ].map((signal) => (
                <div key={signal.title} className="bg-white/5 rounded-lg p-4 border border-white/[0.08]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                      style={{ color: signal.color, backgroundColor: `${signal.color}20` }}
                    >
                      {signal.label}
                    </span>
                  </div>
                  <p className="text-white text-[13px] font-semibold leading-snug mb-1">{signal.title}</p>
                  <p className="text-white/45 text-[12px] leading-relaxed">{signal.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTIE 3: CTA SELF-SERVICE ── */}
      <section id="scan" className="bg-surface" style={{ padding: '80px 24px 120px' }}>
        <div className="mx-auto max-w-[1200px]">

          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-10 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            {t('dare_eyebrow')}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            <div>
              <h2
                className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-6"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                {t('dare_h2')}
              </h2>

              <p className="text-muted text-[17px] leading-[1.6] mb-4">
                {t('dare_p1')}
              </p>

              <p className="text-muted text-[17px] leading-[1.6] mb-10">
                {t('dare_p2')}
              </p>

              <div className="pt-8 border-t border-border">
                <p className="text-[13px] text-muted">
                  {t('direct_email')}{' '}
                  <a href="mailto:info@stevin.ai" className="text-accent hover:underline font-medium">
                    info@stevin.ai
                  </a>
                </p>
                <p className="text-[12px] text-muted/60 mt-3 italic">
                  {t('confidential')}
                </p>
              </div>
            </div>

            <div>
              <ContactForm
                nextUrl="https://stevin.ai/agency-scan?verzonden=1"
                subject="Agency Scan aanvraag via stevin.ai/agency-scan"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
