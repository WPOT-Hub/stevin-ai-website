import type { Metadata } from 'next'
import Link from 'next/link'
import { Radio, TrendingUp, MessageCircle, Headphones, BarChart3, Filter } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Stevin voor Artiesten — Filter het signaal uit de ruis',
  description: 'Stevin centraliseert je social kanalen, filtert de ruis en levert concrete actiepunten. Van cross-channel momentum tot fan-engagement.',
}

const features = [
  {
    title: 'Het 03:00 AM Command Center',
    desc: 'Je stapt \'s nachts de booth uit. Je wilt geen complexe dashboards, je wilt weten: hebben we gewonnen? Stevin toont je op je mobiel in één oogopslag de vibe, het sentiment en de belangrijkste fan-interacties van vanavond.',
    icon: <Headphones className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Cross-Channel Momentum',
    desc: 'Stevin ziet dat een specifieke track organisch ontploft op SoundCloud of TikTok, nog voordat het in je Spotify-cijfers zit. De Advisor geeft direct een seintje om Meta-Ad budget of merch-promo in te zetten op het juiste moment, in de juiste regio.',
    icon: <TrendingUp className="w-5 h-5 text-accent" />,
  },
  {
    title: 'De Fan-Bridge Filter',
    desc: 'Jouw AI-filter knipt de 95% emoji-ruis weg. Je ziet alleen de verjaardagen, vragen over merchandise en track-ID smeekbedes. Stevin genereert bullet-points voor je antwoord, zodat jij in je eigen woorden in 2 seconden authentiek reageert.',
    icon: <Filter className="w-5 h-5 text-accent" />,
  },
]

const capabilities = [
  { title: 'Deep Social Listening', desc: 'Organische signalen van al je kanalen gecentraliseerd. Weet wat er over je gezegd wordt, overal.' },
  { title: 'Momentum Detectie', desc: 'De AI herkent wanneer een track, video of post viraal gaat en stuurt je direct een actieplan.' },
  { title: 'Owned vs. Rented Audience', desc: 'Zie hoeveel van je bereik van jou is (nieuwsbrief, website) versus gehuurd (TikTok, Instagram).' },
  { title: 'Sentiment Analyse', desc: 'Weet of de buzz positief, neutraal of negatief is. Grijp in voordat een brandje zich verspreidt.' },
  { title: 'Geo-Hype Tracking', desc: 'Zie in welke steden en landen je het hardst groeit. Stuur je booking en merch erop aan.' },
  { title: 'AI Advisor Cards', desc: 'Geen rapporten van 30 pagina\'s. Concrete kaarten met één actie per signaal.' },
]

const useCases = [
  'Je team is uren kwijt aan het filteren van comments en DM\'s',
  'Je weet niet welke content écht impact heeft op je streams',
  'Je mist kansen omdat je te laat reageert op momentum',
  'Je merch-sales lopen achter terwijl je engagement hoog is',
  'Je hebt geen overzicht over je prestaties per regio',
]

export default function VoorArtiestenPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-mesh-gradient opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6">
            Voor artiesten & influencers
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Het Signaal<br />
            <span className="text-neon">in de Ruis.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Stop met het doorspitten van duizenden comments. Stevin is het AI Operating System dat
            social chaos filtert en omzet in momentum, fan loyalty en merch sales.
            Gebouwd voor artiesten op wereldtournee.
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

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Jouw Digitale Backstage</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
              Al je kanalen. Eén cockpit.
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              Je leeft op TikTok, Instagram, YouTube en SoundCloud. De data is versnipperd en je team
              is uren kwijt aan het managen van reacties. Stevin centraliseert jouw ecosysteem.
              Geen irrelevante grafieken, maar keiharde actiepunten.
            </p>
          </div>

          {/* Channel bar */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
              {['Instagram', 'TikTok', 'YouTube', 'SoundCloud', 'Spotify', 'Facebook', 'Website'].map((ch) => (
                <span key={ch} className="text-xs font-bold text-slate-400 tracking-wide uppercase">{ch}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Features — 3 cards */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Wat Stevin voor jou doet</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Drie pijlers die van social chaos een gestroomlijnd systeem maken.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* Capabilities grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Onder de motorkap</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">De technologie achter het signaal</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {capabilities.map((c) => (
              <div key={c.title} className="p-6 rounded-2xl bg-surface border border-border hover:shadow-md hover:border-accent/20 transition-all">
                <h3 className="text-sm font-bold text-primary mb-1.5">{c.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases + pricing */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Voor jou als dit herkenbaar is</h2>
              <ul className="space-y-4">
                {useCases.map((uc) => (
                  <li key={uc} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-muted">{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-[#0A1628] border border-accent/20 p-8 sm:p-10">
              <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">Voor Artiesten</p>
              <p className="text-4xl font-bold text-neon mb-2">Op aanvraag</p>
              <p className="text-white/50 text-sm mb-8">Prijs afhankelijk van scope en aantal kanalen</p>
              <Link
                href="/contact"
                className="block w-full text-center py-3.5 rounded-xl text-sm font-semibold bg-neon text-[#0A1628] hover:bg-neon-dark transition-colors neon-glow"
              >
                Vraag toegang aan
              </Link>
              <ul className="mt-8 space-y-2.5">
                {['Cross-channel monitoring', 'AI Advisor met momentum-detectie', 'Fan-engagement filtering', 'Sentiment analyse', 'Geo-hype tracking', 'Merch & ticket conversie-inzichten'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <svg className="w-4 h-4 text-neon flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Klaar om de ruis te muten?</h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-8">
            Koppel je kanalen en zie direct wat je de afgelopen maanden hebt gemist.
          </p>
          <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
            Neem contact op
          </Link>
        </div>
      </section>
    </main>
  )
}
