import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'simon_stevin' })
  return {
    title: `${t('eyebrow')}, ${t('h1')}`,
    description: t('sub'),
  }
}

export default async function SimonStevinPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('simon_stevin')
  return (
    <>
      {/* ── SECTIE 1 — NAVY HERO ── */}
      <section className="bg-primary" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1120px]">

          {/* Eyebrow */}
          <p className="text-white/55 font-display font-semibold text-[12px] tracking-[0.08em] uppercase mb-6">
            {t('hero_eyebrow')}
          </p>

          {/* H1 — vol-breed, boven de grid */}
          <h1
            className="font-display font-extrabold text-white leading-[1.05] tracking-[-0.03em] text-wrap-balance"
            style={{ fontSize: 'clamp(44px, 6vw, 104px)', maxWidth: '900px', marginBottom: '72px' }}
          >
            {t('hero_h1')}
          </h1>

          {/* Grid: portret links + sub-tekst rechts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Portrait */}
            <figure className="lg:col-span-5 m-0">
              <div
                className="overflow-hidden"
                style={{
                  aspectRatio: '3 / 4',
                  maxWidth: '380px',
                  width: '100%',
                  background: 'linear-gradient(180deg, #0D1B30 0%, #08121F 100%)',
                  border: '1px solid rgba(255,255,255,.12)',
                }}
              >
                <Image
                  src="/simon-stevin-lineart.png"
                  alt={t('portrait_alt')}
                  width={380}
                  height={507}
                  className="w-full h-full object-cover block"
                  style={{ filter: 'grayscale(1) contrast(1.02)', opacity: 0.92 }}
                  priority
                />
              </div>
              <figcaption
                className="font-body font-medium text-white/55 uppercase leading-[1.5]"
                style={{ fontSize: '11px', letterSpacing: '0.08em', maxWidth: '380px', marginTop: '16px' }}
              >
                {t('portrait_caption')}
              </figcaption>
            </figure>

            {/* Sub-tekst */}
            <p
              className="lg:col-span-6 lg:col-start-7 font-body text-white/78 leading-[1.55] text-wrap-pretty"
              style={{ fontSize: '20px', maxWidth: '520px' }}
            >
              {t('intro_sub')}
            </p>
          </div>

        </div>
      </section>

      {/* ── SECTIE 2 — BODY (wit) ── */}
      <section className="bg-white" style={{ paddingTop: '128px', paddingBottom: '96px' }}>
        {/* Eerste paragraaf binnen leeskolom */}
        <div className="mx-auto max-w-[680px] px-6">
          <p className="font-body text-[#2A3A54] leading-[1.7] text-wrap-pretty mb-0" style={{ fontSize: '18px' }}>
            {t('body_p1')}
          </p>
        </div>

        {/* Full-bleed quote — breekt uit de leeskolom */}
        <div
          className="text-center"
          style={{
            background: '#F7F9FC',
            padding: '112px 24px',
            margin: '96px 0',
          }}
        >
          <blockquote
            className="font-display font-semibold italic text-primary text-wrap-balance mx-auto"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              maxWidth: '780px',
              marginBottom: '32px',
            }}
          >
            &ldquo;Wonder en is gheen wonder.&rdquo;
          </blockquote>
          <p className="font-body italic text-muted" style={{ fontSize: '14px' }}>
            — Simon Stevin, 1586
          </p>
        </div>

        {/* Rest van de body-paragrafen */}
        <div className="mx-auto max-w-[680px] px-6 space-y-7">
          <p className="font-body text-[#2A3A54] leading-[1.7] text-wrap-pretty" style={{ fontSize: '18px' }}>
            {t('body_p2')}
          </p>
          <p className="font-body text-[#2A3A54] leading-[1.7] text-wrap-pretty" style={{ fontSize: '18px' }}>
            {t('body_p3')}
          </p>
          <p className="font-body text-[#2A3A54] leading-[1.7] text-wrap-pretty" style={{ fontSize: '18px' }}>
            {t('body_p4')}
          </p>
        </div>
      </section>

      {/* ── SECTIE 3 — NAVY CLOSE ── */}
      <section className="bg-primary text-center" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[880px]">
          <p
            className="font-display font-bold text-white text-wrap-balance"
            style={{
              fontSize: 'clamp(28px, 3.2vw, 40px)',
              lineHeight: '1.2',
              letterSpacing: '-0.03em',
              marginBottom: '40px',
            }}
          >
            {t('closing_p')}
          </p>
          <Link
            href="/contact"
            className="inline-block font-display font-bold text-white rounded-[10px] transition-colors hover:bg-accent-dark"
            style={{ background: '#3D8EFF', fontSize: '16px', padding: '18px 28px' }}
          >
            {t('closing_cta')}
          </Link>
          <p
            className="font-body italic"
            style={{ fontSize: '12px', color: 'rgba(255,255,255,.5)', letterSpacing: '0.02em', marginTop: '32px' }}
          >
            {t('closing_footer')}
          </p>
        </div>
      </section>
    </>
  )
}
