import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import MeetlatRuler from '@/components/MeetlatRuler'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'marketingAutomation' })
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  }
}

export default async function MarketingAutomationPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('marketingAutomation')

  const painPoints = [
    { title: t('pain1_title'), desc: t('pain1_desc') },
    { title: t('pain2_title'), desc: t('pain2_desc') },
    { title: t('pain3_title'), desc: t('pain3_desc') },
  ]

  const flowSteps = [
    { title: t('flow1_title'), desc: t('flow1_desc') },
    { title: t('flow2_title'), desc: t('flow2_desc') },
    { title: t('flow3_title'), desc: t('flow3_desc') },
    { title: t('flow4_title'), desc: t('flow4_desc') },
  ]

  const useCases = [
    t('uc1'), t('uc2'), t('uc3'), t('uc4'), t('uc5'), t('uc6'),
  ]

  return (
    <main>
      {/* Hero */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('eyebrow')}
          </p>
          <h1
            className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em]"
            style={{ fontSize: 'clamp(48px, 6.5vw, 96px)', maxWidth: '18ch' }}
          >
            {t('hero_h1')}<br />
            <span className="text-[#5DA3FF]">{t('hero_h1_accent')}</span>
          </h1>
          <p className="text-white/60 leading-[1.55]" style={{ fontSize: '20px', maxWidth: '620px', marginTop: '32px' }}>
            {t('sub')}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow"
            >
              {t('cta_primary')}
            </Link>
            <Link
              href="/diensten"
              className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/70 border border-white/20 rounded-xl hover:bg-white/5 transition-colors"
            >
              {t('cta_secondary')}
            </Link>
          </div>
          <div className="mt-20">
            <MeetlatRuler color="rgba(255,255,255,.35)" />
          </div>
        </div>
      </section>

      {/* Pain */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('pain_eyebrow')}
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-16"
            style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}
          >
            {t('pain_h2')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {painPoints.map((p) => (
              <div key={p.title} className="py-10 md:py-0 md:px-10 first:pl-0 last:pr-0">
                <h3 className="text-[17px] font-display font-bold text-primary mb-4 leading-tight">{p.title}</h3>
                <p className="text-[15px] text-muted leading-[1.6]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How — eigen verhaal */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('how_eyebrow')}
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-6"
            style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}
          >
            {t('how_h2')}
          </h2>
          <p className="text-[17px] text-muted mb-16 max-w-[700px] leading-[1.55]">
            {t('how_sub')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {flowSteps.map((s, i) => (
              <div key={s.title} className="bg-surface p-8">
                <p className="font-mono text-[11px] text-muted mb-4">0{i + 1}</p>
                <h3 className="text-[17px] font-display font-bold text-primary mb-3 leading-tight">{s.title}</h3>
                <p className="text-[14px] text-muted leading-[1.6]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-primary" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
                <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
                {t('usecases_eyebrow')}
              </p>
              <h2
                className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-10"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                {t('usecases_h2')}
              </h2>
              <ul className="space-y-0 border-t border-white/10">
                {useCases.map((uc) => (
                  <li key={uc} className="flex items-start gap-4 py-5 border-b border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5DA3FF] flex-shrink-0 mt-[9px]" />
                    <span className="text-[15px] text-white/70 leading-[1.6]">{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pt-[140px]">
              <p className="text-[#00D4A0] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6">
                {t('cta_eyebrow')}
              </p>
              <h3
                className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-6"
                style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
              >
                {t('cta_h3')}
              </h3>
              <p className="text-white/50 mb-8 leading-[1.6] text-[15px]">
                {t('cta_sub')}
              </p>
              <Link
                href="/contact"
                className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow"
              >
                {t('cta_btn')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
