import type { Metadata } from 'next'
import Link from 'next/link'
import DataRain from '@/components/DataRain'
import { TrendingUp, Filter, BarChart3, MessageCircle, Zap, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Stevin voor Influencers — Van bereik naar bewijs',
  description: 'Stevin geeft influencers en creators grip op hun data. Cross-channel analytics, brand deal onderbouwing en community intelligence in één platform.',
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

export default function InfluencersPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-mesh-gradient opacity-50" />
        <DataRain variant="influencer" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink/10 border border-pink/20 text-pink text-sm font-semibold mb-6">
            Voor influencers & creators
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Van bereik<br />
            <span className="text-neon">naar bewijs.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Stop met screenshots en losse statistieken. Stevin geeft je grip op je totale bereik,
            onderbouwt je waarde richting merken en laat zien welke content echt impact heeft.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
              Vraag toegang aan
            </Link>
            <Link href="/platform" className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/80 border border-white/20 rounded-xl hover:bg-white/5 transition-colors">
              Bekijk het platform
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Wat Stevin voor jou doet</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Alles wat je nodig hebt om je merk professioneel te onderbouwen.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-white p-8 hover:shadow-lg hover:border-accent/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Klaar om je data te ownen?</h2>
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
