import type { Metadata } from 'next'
import Link from 'next/link'
import MeetlatRuler from '@/components/MeetlatRuler'
import { Calendar, TrendingUp, MapPin, BarChart3, Users, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Stevin voor Promotoren — Scan de markt. Boek slimmer.',
  description: 'Stevin helpt promotoren en event marketeers de markt te scannen, concurrerende events te monitoren en campagnes per regio te optimaliseren.',
}

const features = [
  {
    title: 'Markt Scanning',
    desc: 'Zie welke concurrerende events met vergelijkbare doelgroepen gepland staan. Voorkom dat je artiest het opneemt tegen een wereldster op dezelfde avond.',
    icon: <MapPin className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Fanbase Overlap Analyse',
    desc: 'Begrijp hoe de fanbase van jouw artiest overlapt met andere acts. Bepaal of een line-up elkaar versterkt of kannibaliseert.',
    icon: <Users className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Regionale Hype Tracking',
    desc: 'Zie in welke steden en regio\'s de buzz het sterkst is. Stuur je venue-keuze, ticketprijzen en marketingbudget erop aan.',
    icon: <TrendingUp className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Campagne Optimalisatie',
    desc: 'Beheer campagnes over Meta, Google en TikTok vanuit één systeem. Realtime ROAS per event, per regio, per kanaal.',
    icon: <BarChart3 className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Ticketverkoop Monitoring',
    desc: 'Koppel je ticketplatform en zie realtime hoe de verkoop loopt. Grijp in voordat het te laat is met gerichte campagnes.',
    icon: <Calendar className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Post-Event Analyse',
    desc: 'Na het event: volledige breakdown van campagneprestaties, social buzz en ROI. Leer van elk event voor de volgende.',
    icon: <Zap className="w-5 h-5 text-accent" />,
  },
]

const useCases = [
  'Je boekt een venue zonder te checken wat er die week nog meer speelt',
  'Je mist signalen over welke regio\'s het meest ontvankelijk zijn',
  'Je campagnebudget is verspreid over te veel kanalen zonder overzicht',
  'Je weet pas na het event of de marketing heeft gewerkt',
  'Je wilt data-gedreven beslissingen nemen over line-ups en venues',
]

export default function PromotorenPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-primary" style={{ padding: '96px 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            VOOR PROMOTOREN & EVENT MARKETING
          </p>
          <h1
            className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em]"
            style={{ fontSize: 'clamp(52px, 7vw, 108px)', maxWidth: '16ch' }}>
            Scan de markt.<br />
            <span className="text-[#5DA3FF]">Boek slimmer.</span>
          </h1>
          <p className="text-white/60 leading-[1.55]" style={{ fontSize: '20px', maxWidth: '560px', marginTop: '32px' }}>
            Voordat je AFAS Live of de Dome boekt, wil je weten of jouw artiest het moet opnemen tegen
            een act met dezelfde fanbase. Stevin scant de markt en geeft je de data om slimmer te plannen.
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
            Van booking tot after-movie
          </h2>
          <p className="text-[17px] text-muted mb-16 max-w-xl leading-[1.55]">
            Data-gedreven event marketing in elke fase.
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
            Booking op bewijs, niet op buikgevoel. Plan een gesprek en ontdek hoe Stevin je helpt de juiste events op het juiste moment te plannen.
          </p>
          <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
            Plan een gesprek
          </Link>
        </div>
      </section>
    </main>
  )
}
