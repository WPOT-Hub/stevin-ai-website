import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import WaitlistForm from './WaitlistForm'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'wachtlijst' })
  return {
    title: t('h1'),
    description: t('sub'),
    robots: 'noindex',
  }
}

export default async function WaitlistPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('wachtlijst')

  return (
    <>
      {/* HERO */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 80px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('hero_eyebrow')}
          </p>

          <h1
            className="font-display font-extrabold text-white leading-[1.06] tracking-[-0.03em]"
            style={{ fontWeight: 700, fontSize: 'clamp(40px, 4.6vw, 64px)', maxWidth: '16ch' }}
          >
            {t('hero_h1')}{' '}
            <span className="text-[#5DA3FF]">{t('hero_h1_accent')}</span>
          </h1>

          <p
            className="text-white/60 leading-[1.55] mt-8"
            style={{ fontSize: '19px', maxWidth: '560px' }}
          >
            {t('hero_sub')}
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="bg-surface" style={{ padding: '80px 24px 120px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-6 flex items-center gap-[14px]">
                <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
                {t('form_eyebrow')}
              </p>
              <h2
                className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-4"
                style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)' }}
              >
                {t('form_h2')}
              </h2>
              <p className="text-muted text-[16px] leading-relaxed mt-4">
                {t('form_sub')}
              </p>

              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-[13px] text-muted">
                  {t('email_fallback_label')}{' '}
                  <a href="mailto:info@stevin.ai" className="text-accent hover:underline font-medium">
                    info@stevin.ai
                  </a>
                </p>
              </div>
            </div>

            <div>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
