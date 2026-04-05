import type { Metadata } from 'next'
import Link from 'next/link'
import { Tag, Users, Plug, Zap, TrendingUp, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Voor Agencies — Stevin',
  description: 'Gebruik Stevin als technologiepartner voor je bureau. White-label dashboard, multi-client beheer, dedicated connectors en volume korting.',
}

const features = [
  {
    title: 'White-label Dashboard',
    desc: 'Stevin Desk met je eigen branding. Je klanten zien jouw bureau, niet Stevin.',
    icon: <Tag className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Multi-client Beheer',
    desc: 'Beheer al je klanten vanuit één omgeving. Gescheiden data, gedeeld overzicht.',
    icon: <Users className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Dedicated Connectors',
    desc: 'Elke klant krijgt eigen connector-koppelingen. 14 native platformen beschikbaar.',
    icon: <Plug className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Prioriteit Support',
    desc: 'Dedicated account manager, snellere response times en gezamenlijke onboarding.',
    icon: <Zap className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Volume Korting',
    desc: 'Hoe meer klanten je meebrengt, hoe voordeliger het wordt. Schaalvoordeel ingebouwd.',
    icon: <TrendingUp className="w-5 h-5 text-accent" />,
  },
  {
    title: 'AI-rapporten per Klant',
    desc: 'Automatische wekelijkse rapportages per klant. Klaar om door te sturen of te presenteren.',
    icon: <Sparkles className="w-5 h-5 text-accent" />,
  },
]

const useCases = [
  'Je wilt campagnebeheer opschalen zonder extra FTE',
  'Je zoekt een technologiepartner, geen concurrent',
  'Je klanten vragen om betere rapportages en dashboards',
  'Je wilt automation en CRM aanbieden als extra dienst',
  'Je hebt meerdere klanten op dezelfde platformen',
]

export default function VoorAgenciesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-mesh-gradient opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6">
            Voor bureaus
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Schaal jouw bureau met<br />
            <span className="text-neon">Stevin als partner</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Geen concurrent, maar een technologiepartner. Gebruik ons platform om meer klanten te bedienen,
            betere resultaten te leveren en je marge te vergroten.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
              Plan een kennismaking
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
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Wat je krijgt als Agency Partner</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Alles wat je nodig hebt om je bureau op te schalen met AI-gedreven marketing.
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
              <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">Agency Partner</p>
              <p className="text-4xl font-bold text-neon mb-2">Op aanvraag</p>
              <p className="text-white/50 text-sm mb-8">Prijs afhankelijk van aantal klanten en scope</p>
              <Link
                href="/contact"
                className="block w-full text-center py-3.5 rounded-xl text-sm font-semibold bg-neon text-[#0A1628] hover:bg-neon-dark transition-colors neon-glow"
              >
                Neem contact op
              </Link>
              <ul className="mt-8 space-y-2.5">
                {['White-label dashboard', 'Multi-client beheer', 'Dedicated connectors', 'Prioriteit support', 'Volume korting', 'Eigen branding'].map((f) => (
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Laten we kennismaken</h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-8">
            Plan een vrijblijvend gesprek en ontdek hoe Stevin jouw bureau kan versterken.
          </p>
          <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
            Plan een kennismaking
          </Link>
        </div>
      </section>
    </main>
  )
}
