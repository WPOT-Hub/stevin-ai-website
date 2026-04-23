import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import MeetlatRuler from '@/components/MeetlatRuler'
import { TrendingUp, Filter, BarChart3, MessageCircle, Zap, Users } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'influencers' })
  return {
    title: `Stevin ${t('eyebrow')} — ${t('h1')}`,
    description: t('sub'),
  }
}

const features = [
  {
    title: 'Cross-Channel Analytics',
    desc: 'Instagram, TikTok, YouTube, X en meer in één overzicht. Geen losse dashboards, maar een totaalbeeld van je bereik en engagement.',
    icon: <BarChart3 className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Brand Deal Onderbouwing',
    desc: 'Laat merken zien wat je waard bent met harde data. Engagement rates, audience demographics en groeitrends — klaar om te delen.',
    icon: <TrendingUp className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Community Intelligence',
    desc: 'Weet wat er speelt in je community. Welke content resoneert, welke onderwerpen trending zijn en waar je volgers over praten.',
    icon: <MessageCircle className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Content Performance',
    desc: 'Zie welke posts, reels en video\'s echt impact hebben. Niet alleen likes, maar doorvertaling naar groei, saves en shares.',
    icon: <Filter className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Momentum Detectie',
    desc: 'Stevin ziet wanneer content organisch versnelt — gebaseerd op cross-channel data, niet op gevoel. Je krijgt direct een seintje zodat je het moment pakt voordat het voorbij is.',
    icon: <Zap className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Audience Inzichten',
    desc: 'Begrijp wie je volgers zijn. Demografie, locatie, actieve tijdstippen en overlap met andere creators.',
    icon: <Users className="w-5 h-5 text-accent" />,
  },
]

const useCases = [
  'Je hebt 50K+ volgers maar geen grip op je totale bereik',
  'Merken vragen om mediakit-data die je handmatig bij elkaar schraapt',
  'Je weet niet welke content echt zorgt voor groei',
  'Je mist momentum omdat je het te laat ziet',
  'Je wilt professioneler overkomen naar brands en agencies',
]

export default async function InfluencersPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('influencers')

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
              Vraag toegang aan
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
            Wat Stevin voor jou doet
          </h2>
          <p className="text-[17px] text-muted mb-16 max-w-xl leading-[1.55]">
            Alles wat je nodig hebt om je merk professioneel te onderbouwen.
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
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-4">Het is geen wonder. Het is <span className="text-[#5DA3FF]">Stevin</span>.</h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-8">
            Koppel je kanalen en zie binnen een week wat je de afgelopen maanden hebt gemist.
          </p>
          <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
            Vraag toegang aan
          </Link>
        </div>
      </section>
    </main>
  )
}
