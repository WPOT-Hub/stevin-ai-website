import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import MeetlatRuler from '@/components/MeetlatRuler'
import { Newspaper, TrendingUp, MessageCircle, BarChart3, Filter, Zap } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pr_bureaus' })
  return {
    title: `Stevin ${t('eyebrow')} — ${t('h1')}`,
    description: t('sub'),
  }
}

const features = [
  {
    title: 'Media Monitoring',
    desc: 'Volg vermeldingen van je klanten in online media, social, blogs en forums. Gefilterd, gecategoriseerd en klaar voor actie.',
    icon: <Newspaper className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Mention-volume Tracking',
    desc: 'Volg vermeldingsvolume van je klant over tijd. Piek na een persbericht? Plotselinge stilte? Zie verschuivingen voordat ze een probleem worden.',
    icon: <MessageCircle className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Campagne-impact Meting',
    desc: 'Toon het effect van je PR-inspanningen met data. Van persbericht tot merkperceptie — onderbouw je waarde.',
    icon: <TrendingUp className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Concurrentie Monitoring',
    desc: 'Volg wat er over de concurrenten van je klant gezegd wordt. Spot kansen en dreigingen voordat ze mainstream zijn.',
    icon: <BarChart3 className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Social Listening',
    desc: 'Alle social kanalen van je klant in één overzicht. Filter de ruis en rapporteer alleen wat ertoe doet.',
    icon: <Filter className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Geautomatiseerde Rapportages',
    desc: 'Wekelijkse en maandelijkse PR-rapportages die zichzelf schrijven. Per klant, in jouw tone of voice.',
    icon: <Zap className="w-5 h-5 text-accent" />,
  },
]

const useCases = [
  'Je besteedt uren per week aan het handmatig clippings verzamelen',
  'Je klanten vragen om bewijs dat PR bijdraagt aan merkperceptie',
  'Je hebt geen structureel overzicht van online media-aandacht',
  'Je wilt crisismanagement proactief aanpakken, niet reactief',
  'Je rapportages kosten te veel tijd en missen diepgang',
]

export default async function PRBureausPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('pr_bureaus')

  return (
    <main>
      {/* Hero */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
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
              Plan een gesprek
            </Link>
            <Link href="/platform" className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/70 border border-white/20 rounded-xl hover:bg-white/5 transition-colors">
              Bekijk het platform
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            HET PLATFORM
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}
          >
            Alles voor PR-professionals
          </h2>
          <p className="text-[17px] text-muted mb-16 max-w-xl leading-[1.55]">
            Van media monitoring tot geautomatiseerde rapportages.
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
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">Herkenbaar?</h2>
            <ul className="space-y-4">
              {useCases.map((uc) => (
                <li key={uc} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-border">
                  <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
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
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-4">Het is geen wonder. Het is <span className="text-[#5DA3FF]">Stevin</span>.</h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-8">
            Van clipping-diensten naar meetbare impact. Plan een gesprek en ontdek hoe Stevin je PR-werkzaamheden versterkt met harde data.
          </p>
          <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
            Plan een gesprek
          </Link>
        </div>
      </section>
    </main>
  )
}
