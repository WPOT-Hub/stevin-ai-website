import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import MeetlatRuler from '@/components/MeetlatRuler'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'artiesten' })
  return {
    title: `Stevin voor Artiesten — ${t('h1_line1')} ${t('h1_accent')}`,
    description: t('sub'),
  }
}

const channels = ['Instagram', 'TikTok', 'YouTube', 'SoundCloud', 'Spotify', 'Facebook', 'Website']

export default async function VoorArtiestenPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('artiesten')

  const features = [
    { title: t('feat1_title'), desc: t('feat1_desc') },
    { title: t('feat2_title'), desc: t('feat2_desc') },
    { title: t('feat3_title'), desc: t('feat3_desc') },
  ]

  const capabilities = [
    { title: t('cap1_title'), desc: t('cap1_desc') },
    { title: t('cap2_title'), desc: t('cap2_desc') },
    { title: t('cap3_title'), desc: t('cap3_desc') },
    { title: t('cap4_title'), desc: t('cap4_desc') },
    { title: t('cap5_title'), desc: t('cap5_desc') },
    { title: t('cap6_title'), desc: t('cap6_desc') },
  ]

  const useCases = [t('uc1'), t('uc2'), t('uc3'), t('uc4'), t('uc5')]

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
            style={{ fontSize: 'clamp(52px, 7vw, 108px)', maxWidth: '14ch' }}
          >
            {t('h1_line1')}<br />
            <span className="text-[#5DA3FF]">{t('h1_accent')}</span>
          </h1>
          <p className="text-white/60 leading-[1.55]" style={{ fontSize: '20px', maxWidth: '560px', marginTop: '32px' }}>
            {t('sub')}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow"
            >
              {t('cta_access')}
            </Link>
            <Link
              href="/platform"
              className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/70 border border-white/20 rounded-xl hover:bg-white/5 transition-colors"
            >
              {t('cta_platform')}
            </Link>
          </div>
          <div className="mt-20">
            <MeetlatRuler color="rgba(255,255,255,.35)" />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('intro_eyebrow')}
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-6"
            style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}
          >
            {t('intro_h2_line1')}<br />{t('intro_h2_line2')}
          </h2>
          <p className="text-[17px] text-muted leading-[1.6] max-w-2xl mb-12">
            {t('intro_sub')}
          </p>
          <div className="flex items-center gap-6 sm:gap-10 flex-wrap border-t border-border pt-8">
            {channels.map((ch) => (
              <span key={ch} className="text-xs font-bold text-slate-400 tracking-wide uppercase">{ch}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('features_eyebrow')}
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}
          >
            {t('features_h2')}
          </h2>
          <p className="text-[17px] text-muted mb-16 max-w-xl leading-[1.55]">
            {t('features_sub')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-border">
            {features.map((f, i) => (
              <div key={f.title} className="border-b border-border py-10 md:px-10 md:first:pl-0 md:last:pr-0">
                <p className="font-mono text-[11px] text-muted mb-4">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-[17px] font-display font-bold text-primary mb-3 leading-tight">{f.title}</h3>
                <p className="text-[15px] text-muted leading-[1.6]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities grid */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('caps_eyebrow')}
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-16"
            style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}
          >
            {t('caps_h2')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-border">
            {capabilities.map((c) => (
              <div key={c.title} className="border-b border-r border-border py-8 px-0 sm:px-8 sm:first:pl-0 lg:[&:nth-child(3n)]:border-r-0">
                <h3 className="text-[15px] font-display font-bold text-primary mb-2">{c.title}</h3>
                <p className="text-[14px] text-muted leading-[1.6]">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases + CTA */}
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
                className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-3"
                style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
              >
                {t('cta_h3')}
              </h3>
              <p className="text-white/40 text-sm mb-8">{t('cta_note')}</p>
              <Link
                href="/contact"
                className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow"
              >
                {t('cta_access')}
              </Link>
              <ul className="mt-8 space-y-0 border-t border-white/10">
                {[t('inc1'), t('inc2'), t('inc3'), t('inc4'), t('inc5'), t('inc6')].map((f) => (
                  <li key={f} className="flex items-center gap-3 py-3 border-b border-white/10">
                    <span className="w-1 h-1 rounded-full bg-[#00D4A0] flex-shrink-0" />
                    <span className="text-[14px] text-white/60">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#00D4A0] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6">
            {t('bottom_eyebrow')}
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-6"
            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', maxWidth: '16ch' }}
          >
            {t('bottom_h2')}
          </h2>
          <p className="text-[17px] text-muted mb-10 max-w-lg leading-[1.6]">
            {t('bottom_sub')}
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow"
          >
            {t('bottom_cta')}
          </Link>
        </div>
      </section>
    </main>
  )
}
