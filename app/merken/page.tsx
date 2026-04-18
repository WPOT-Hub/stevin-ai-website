import type { Metadata } from 'next'
import Link from 'next/link'
import DataRain from '@/components/DataRain'
import { Eye, Shield, TrendingUp, MessageCircle, BarChart3, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Stevin voor Merken — Merk-causaliteit meten',
  description: 'Stevin geeft merken en brand managers grip op branded search, media-mentions en campagne-impact. Van awareness tot conversie — herleidbaar.',
}

const features = [
  {
    title: 'Merk-mentions in kaart',
    desc: 'Waar en hoe vaak wordt je merk genoemd? Social, reviews, forums en nieuws — gecentraliseerd en gefilterd op relevantie. Feitelijk, niet gevoelig.',
    icon: <Eye className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Branded Search Trends',
    desc: 'Stijgt de vraag naar jouw merk? Volg branded search volume en direct traffic over tijd. De echte meetlat voor awareness-investering.',
    icon: <MessageCircle className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Campagne-causaliteit',
    desc: 'Meet het effect van awareness-campagnes op branded traffic, direct visits en conversie. Van top-funnel naar bottom — herleidbaar, niet vermoed.',
    icon: <TrendingUp className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Concurrentie Analyse',
    desc: 'Volg je concurrenten op social, paid en organisch. Zie waar ze investeren, wat werkt en waar jij kansen laat liggen.',
    icon: <BarChart3 className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Merkbescherming',
    desc: 'Automatische alerts bij merkgerelateerde vermeldingen die actie vereisen. Van negatieve reviews tot ongeautoriseerd gebruik.',
    icon: <Shield className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Content Intelligence',
    desc: 'Begrijp welke content resoneert met je doelgroep. Trends, onderwerpen en formats die je merk versterken.',
    icon: <Zap className="w-5 h-5 text-accent" />,
  },
]

const useCases = [
  'Je hebt geen realtime overzicht van hoe je merk wordt waargenomen',
  'Je campagnes meten bereik maar niet het effect op merkperceptie',
  'Je wilt concurrenten monitoren maar hebt geen structureel systeem',
  'Je PR-team en marketingteam werken met verschillende data',
  'Je wilt brandingcampagnes onderbouwen met harde data',
]

export default function MerkenPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-mesh-gradient opacity-50" />
        <DataRain variant="merk" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6">
            Voor merken & brand managers
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Merk-waarde is<br />
            <span className="text-neon">geen gevoel.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Meet je merk met de enige getallen die eerlijk zijn: branded search volume, direct traffic
            en campagne-causaliteit. Geen "sentiment scores", wel herleidbare impact.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
              Plan een gesprek
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
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Grip op je merk</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Van monitoring tot actie — alles wat je nodig hebt voor data-gedreven brand management.
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Klaar voor brand intelligence?</h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-8">
            Plan een gesprek en ontdek hoe Stevin je merk monitort, analyseert en beschermt.
          </p>
          <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
            Plan een gesprek
          </Link>
        </div>
      </section>
    </main>
  )
}
