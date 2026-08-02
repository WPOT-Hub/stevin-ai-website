import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import DeskProof from '@/components/DeskProof'
import TemplateSlider from '@/components/TemplateSlider'
import { TEMPLATES, FEATURED } from '@/data/templates'
import { ArrowUpRight } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'websites' })
  return {
    title: t('h1'),
    description: t('sub'),
    robots: { index: false, follow: false },
  }
}

const Eyebrow = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <p className={`${light ? 'text-[#5DA3FF]' : 'text-[#5DA3FF]'} text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]`}>
    <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
    {children}
  </p>
)

export default async function WebsitesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('websites')

  const problems = [t('problem_1'), t('problem_2'), t('problem_3'), t('problem_4')]
  const gets = [t('get_1'), t('get_2'), t('get_3'), t('get_4')]

  return (
    <main>
      {/* Hero */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow light>{t('eyebrow')}</Eyebrow>
          <h1 className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em]" style={{ fontWeight: 700, fontSize: 'clamp(40px, 4.6vw, 64px)', maxWidth: '15ch' }}>
            {t('h1')}
          </h1>
          <p className="text-white/60 leading-[1.55]" style={{ fontSize: '20px', maxWidth: '620px', marginTop: '32px' }}>
            {t('sub')}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
            <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
              {t('cta_primary')}
            </Link>
            <Link href="/werkwijze" className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/70 border border-white/20 rounded-xl hover:bg-white/5 transition-colors">
              {t('cta_secondary')}
            </Link>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow>{t('problem_eyebrow')}</Eyebrow>
          <h2 className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-12" style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)', maxWidth: '20ch' }}>
            {t('problem_intro')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-border">
            {problems.map((p, i) => (
              <div key={p} className="border-b border-border py-10 lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <p className="font-mono text-[11px] text-muted mb-4">{String(i + 1).padStart(2, '0')}</p>
                <p className="text-[16px] font-display font-bold text-primary leading-snug">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow>{t('get_eyebrow')}</Eyebrow>
          <h2 className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-16" style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)' }}>
            {t('get_h2')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-border">
            {gets.map((g, i) => (
              <div key={g} className="border-b border-border py-10 md:px-10 md:[&:nth-child(odd)]:pl-0 md:[&:nth-child(even)]:pr-0">
                <p className="font-mono text-[11px] text-muted mb-4">{String(i + 1).padStart(2, '0')}</p>
                <p className="text-[17px] text-primary leading-[1.55] max-w-md">{g}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates showcase */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow>{t('templates_eyebrow')}</Eyebrow>
          <h2 className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-4" style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)' }}>
            {t('templates_h2')}
          </h2>
          <p className="text-[17px] text-muted mb-14 max-w-2xl leading-[1.55]">{t('templates_sub')}</p>

          <div className="mx-auto max-w-[980px]">
            <TemplateSlider items={FEATURED} viewLabel={t('templates_view')} />
          </div>

          <div className="mt-28">
            <h3 className="font-display font-extrabold text-primary leading-tight mb-2" style={{ fontSize: 'clamp(24px, 2.6vw, 34px)' }}>
              {t('templates_all_h')}
            </h3>
            <p className="text-[16px] text-muted mb-12 max-w-xl leading-[1.55]">{t('templates_all_sub')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
              {TEMPLATES.map((tpl) => (
                <a key={tpl.url} href={tpl.url} target="_blank" rel="noopener" className="group flex items-start justify-between gap-4 bg-white p-7 transition-colors hover:bg-surface">
                  <div>
                    <p className="font-display text-[18px] font-bold text-primary leading-tight">{tpl.name}</p>
                    <p className="mt-1 text-[14px] text-muted">{tpl.type}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-muted transition-colors group-hover:text-[#5DA3FF]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ready to grow + CTA */}
      <section className="bg-primary" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow light>{t('grow_eyebrow')}</Eyebrow>
          <h2 className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-10 max-w-[18ch]" style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)' }}>
            {t('grow_h2')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 max-w-4xl">
            <p className="text-white/65 leading-[1.65] text-[17px]">{t('grow_1')}</p>
            <p className="text-white/65 leading-[1.65] text-[17px]">{t('grow_2')}</p>
          </div>
          <div className="mt-12">
            <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
              {t('grow_cta')}
            </Link>
          </div>
        </div>
      </section>
      {/* Cookiebanner en consent-flow zitten op de website zelf. */}
      <DeskProof locale={locale} toonBrein={false} melding="consent-be" />

    </main>
  )
}
