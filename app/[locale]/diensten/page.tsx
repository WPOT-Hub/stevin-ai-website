import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { localizedMetadata } from '@/lib/seo'
import { Link } from '@/i18n/navigation'
import MeetlatRuler from '@/components/MeetlatRuler'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'diensten' })
  return localizedMetadata({
    path: '/diensten',
    locale,
    title: `${t('eyebrow')}, Stevin`,
    description: t('sub'),
  })
}

export default async function DienstenPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('diensten')

  const tracks = [
    {
      number: t('track1_num'),
      featured: false,
      meta: t('track1_meta'),
      title: t('track1_title'),
      body: t('track1_body'),
    },
    {
      number: t('track2_num'),
      featured: true,
      meta: t('track2_meta'),
      title: t('track2_title'),
      body: t('track2_body'),
    },
    {
      number: t('track3_num'),
      featured: false,
      meta: t('track3_meta'),
      title: t('track3_title'),
      body: t('track3_body'),
    },
  ]

  // Service-schema bundel: 1 ProfessionalService entity + per-track Service.
  // Helpt Google + LLMs Stevin classificeren als marketing-service-provider
  // ipv blog/news-site.
  const servicesLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': 'https://stevin.ai/diensten#professional-service',
        name: 'Stevin, marketing-meetbaarheid voor MKB',
        provider: { '@id': 'https://stevin.ai/#organization' },
        areaServed: [
          { '@type': 'Country', name: 'Netherlands' },
          { '@type': 'Country', name: 'Belgium' },
        ],
        serviceType: 'Marketing measurement and optimization',
        url: 'https://stevin.ai/diensten',
      },
      ...tracks.map((track, i) => ({
        '@type': 'Service',
        '@id': `https://stevin.ai/diensten#track-${i + 1}`,
        name: track.title,
        description: track.body,
        provider: { '@id': 'https://stevin.ai/#organization' },
        serviceType: track.meta,
        areaServed: { '@type': 'Country', name: 'Netherlands' },
      })),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesLd) }}
      />
      {/* ── Hero ── */}
      <section className="bg-primary -mt-[72px] overflow-hidden" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          {/* Eyebrow */}
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('eyebrow')}
          </p>

          <h1
            className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em]"
            style={{ fontSize: 'clamp(52px, 7vw, 108px)', maxWidth: '14ch' }}
          >
            {t('h1_line1')}<br />
            <span className="text-[#5DA3FF]">{t('h1_line2')}</span>
          </h1>

          <p className="text-white/60 leading-[1.55] max-w-[560px] mt-8" style={{ fontSize: '20px' }}>
            {t('sub')}
          </p>

          <div className="mt-16">
            <MeetlatRuler color="rgba(255,255,255,.35)" />
          </div>
        </div>
      </section>

      {/* ── Tracks, surface ── */}
      <section className="bg-surface" style={{ padding: '112px 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">

          {/* Section head */}
          <div className="flex items-baseline justify-between flex-wrap gap-5 mb-14">
            <div>
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
                <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
                {t('tracks_eyebrow')}
              </p>
              <h2
                className="font-display font-extrabold text-primary m-0"
                style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', letterSpacing: '-0.03em', lineHeight: '1.08', maxWidth: '720px' }}
              >
                {t('tracks_h2')}
              </h2>
            </div>
            <p className="text-muted text-[15px] leading-[1.6] max-w-[300px]">
              {t('tracks_sub')}
            </p>
          </div>

          {/* Track cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tracks.map((track) => (
              <article
                key={track.number}
                className={`rounded-[14px] flex flex-col transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5
                  ${track.featured
                    ? 'bg-primary text-white border border-primary shadow-md hover:shadow-lg'
                    : 'bg-white text-primary border border-border shadow-sm hover:shadow-lg'
                  }`}
                style={{ padding: '40px 32px 36px', minHeight: '420px' }}
              >
                {/* Head */}
                <div className="flex items-baseline justify-between mb-14">
                  <span
                    className="font-display font-bold leading-none"
                    style={{ fontSize: '48px', letterSpacing: '-0.04em', color: track.featured ? '#5DA3FF' : '#0A1628' }}
                  >
                    {track.number}
                  </span>
                  <span
                    className="font-display text-[11px] font-semibold tracking-[0.08em] uppercase"
                    style={{ color: track.featured ? 'rgba(255,255,255,.55)' : '#5A6B82' }}
                  >
                    {track.meta}
                  </span>
                </div>

                <h3
                  className="font-display font-bold mb-[18px]"
                  style={{
                    fontSize: '30px', lineHeight: '1.1', letterSpacing: '-0.025em',
                    color: track.featured ? '#fff' : '#0A1628',
                  }}
                >
                  {track.title}
                </h3>

                <p
                  className="text-base leading-relaxed mb-8"
                  style={{ color: track.featured ? 'rgba(255,255,255,.8)' : '#5A6B82' }}
                >
                  {track.body}
                </p>

                {/* CTA */}
                <div
                  className="mt-auto pt-5 border-t"
                  style={{ borderColor: track.featured ? 'rgba(255,255,255,.12)' : '#E1E7EF' }}
                >
                  <Link
                    href="/contact"
                    className="font-display text-sm font-semibold tracking-[-0.005em] inline-flex items-center gap-2 group transition-colors duration-200"
                    style={{ color: track.featured ? '#5DA3FF' : '#3D8EFF' }}
                  >
                    {t('track_cta')}{' '}
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing, navy ── */}
      <section className="bg-primary" style={{ padding: '128px 24px 144px' }}>
        <div className="mx-auto max-w-[1200px]">

          {/* Eyebrow */}
          <p className="text-neon text-[14px] font-display font-bold tracking-[0.14em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-neon flex-shrink-0" aria-hidden="true" />
            {t('closing_eyebrow')}
          </p>

          <h2
            className="font-display font-extrabold text-white mb-11"
            style={{ fontSize: 'clamp(40px, 5vw, 72px)', letterSpacing: '-0.032em', lineHeight: '1.05', maxWidth: '880px' }}
          >
            {t('closing_h2')}
          </h2>

          <div className="flex gap-3 flex-wrap items-center">
            <Link
              href="/contact"
              className="inline-flex font-display font-bold text-base bg-neon text-primary rounded-[10px] hover:bg-neon-dark transition-colors"
              style={{ padding: '16px 26px', letterSpacing: '-0.005em' }}
            >
              {t('closing_cta1')}
            </Link>
            <Link
              href="/platform"
              className="inline-flex font-display font-semibold text-base text-white border rounded-[10px] hover:bg-white/5 transition-colors"
              style={{ padding: '16px 22px', letterSpacing: '-0.005em', borderColor: 'rgba(255,255,255,.25)' }}
            >
              {t('closing_cta2')}
            </Link>
          </div>

          {/* Foot */}
          <div
            className="mt-24 flex justify-between flex-wrap gap-4 pt-7"
            style={{ borderTop: '1px solid rgba(255,255,255,.12)' }}
          >
            <p className="italic text-[13px]" style={{ color: 'rgba(255,255,255,.5)' }}>
              &ldquo;Wonder en is gheen wonder.&rdquo; Simon Stevin, 1586
            </p>
            <p
              className="font-display text-[12px] font-medium tracking-[0.06em] uppercase"
              style={{ color: 'rgba(255,255,255,.4)' }}
            >
              stevin.ai / diensten
            </p>
          </div>

        </div>
      </section>
    </>
  )
}
