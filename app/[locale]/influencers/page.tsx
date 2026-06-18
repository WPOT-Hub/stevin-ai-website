import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { localizedMetadata } from '@/lib/seo'
import { Link } from '@/i18n/navigation'
import MeetlatRuler from '@/components/MeetlatRuler'
import { TrendingUp, Filter, BarChart3, MessageCircle, Zap, Users } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'influencers' })
  return localizedMetadata({
    path: '/influencers',
    locale,
    title: `Stevin ${t('eyebrow')}, ${t('h1')}`,
    description: t('sub'),
  })
}

const featureIcons = [
  <BarChart3 key="1" className="w-5 h-5 text-accent" />,
  <TrendingUp key="2" className="w-5 h-5 text-accent" />,
  <MessageCircle key="3" className="w-5 h-5 text-accent" />,
  <Filter key="4" className="w-5 h-5 text-accent" />,
  <Zap key="5" className="w-5 h-5 text-accent" />,
  <Users key="6" className="w-5 h-5 text-accent" />,
]

export default async function InfluencersPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('influencers')

  const features = [
    { title: t('feat1_title'), desc: t('feat1_desc'), icon: featureIcons[0] },
    { title: t('feat2_title'), desc: t('feat2_desc'), icon: featureIcons[1] },
    { title: t('feat3_title'), desc: t('feat3_desc'), icon: featureIcons[2] },
    { title: t('feat4_title'), desc: t('feat4_desc'), icon: featureIcons[3] },
    { title: t('feat5_title'), desc: t('feat5_desc'), icon: featureIcons[4] },
    { title: t('feat6_title'), desc: t('feat6_desc'), icon: featureIcons[5] },
  ]

  const useCases = [
    t('uc1'),
    t('uc2'),
    t('uc3'),
    t('uc4'),
    t('uc5'),
  ]

  return (
    <main>
      {/* Hero */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#F4216A] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#F4216A] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('eyebrow')}
          </p>
          <h1
            className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em]"
            style={{ fontSize: 'clamp(52px, 7vw, 108px)', maxWidth: '16ch' }}>
            {t('h1')}
          </h1>
          <p className="text-white/60 leading-[1.55]" style={{ fontSize: '20px', maxWidth: '560px', marginTop: '32px' }}>
            {t('sub')}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
            <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
              {t('cta_primary')}
            </Link>
            <Link href="/platform" className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/70 border border-white/20 rounded-xl hover:bg-white/5 transition-colors">
              {t('cta_secondary')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-border">
            {features.map((f, i) => (
              <div key={f.title} className="border-b border-border py-10 lg:px-10 lg:first:pl-0 lg:[&:nth-child(3n)]:pr-0 lg:[&:nth-child(3n+1)]:pl-0">
                <p className="font-mono text-[11px] text-muted mb-4">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-[17px] font-display font-bold text-primary mb-3 leading-tight">{f.title}</h3>
                <p className="text-[15px] text-muted leading-[1.6]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">{t('usecases_h2')}</h2>
            <ul className="space-y-4">
              {useCases.map((uc) => (
                <li key={uc} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-border">
                  <svg className="w-5 h-5 text-pink flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-muted">{uc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-4">{t('cta_eyebrow')}</h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-8">
            {t('cta_sub')}
          </p>
          <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
            {t('cta_btn')}
          </Link>
        </div>
      </section>
    </main>
  )
}
