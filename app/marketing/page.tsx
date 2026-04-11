import type { Metadata } from 'next'
import Link from 'next/link'
import { BarChart3, Target, Users, Zap, RefreshCw, Calendar, TrendingUp, Filter, Plug } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Stevin voor Marketing — Agencies, Inhouse Teams & Promotoren',
  description: 'Grip op ROAS, minder verspilling en slimmere campagnes. Stevin centraliseert al je marketingdata, analyseert 24/7 en levert concrete actiepunten.',
}

const painPoints = [
  {
    title: 'Data verspreid over 10+ tools',
    desc: 'Google Ads, Meta, Analytics, CRM, e-mail — je besteedt uren aan het bij elkaar brengen van data die automatisch had moeten samenkomen.',
  },
  {
    title: 'Rapportages kosten te veel tijd',
    desc: 'Elke week dezelfde exports, dezelfde spreadsheets, dezelfde presentaties. Tijd die naar strategie en optimalisatie moet gaan.',
  },
  {
    title: 'Je reageert te laat op problemen',
    desc: 'Een budget dat overloopt, een campagne die stilvalt, een conversie die keldert. Je ziet het pas als het al te laat is.',
  },
]

const features = [
  {
    title: 'Centraal Dashboard',
    desc: 'Al je kanalen, klanten en campagnes in één overzicht. Van ROAS tot pipeline — geen tabbladen meer.',
    icon: <BarChart3 className="w-5 h-5 text-accent" />,
  },
  {
    title: '170+ Integraties',
    desc: 'Native koppelingen met Meta, Google, TikTok, LinkedIn, Shopify, Klaviyo en meer. Geen middleware, geen vertraging.',
    icon: <Plug className="w-5 h-5 text-accent" />,
  },
  {
    title: 'AI-gedreven Analyses',
    desc: 'Onze AI scant 24/7 op afwijkingen en kansen. Van een plotselinge daling in conversie tot onbenut budget.',
    icon: <Target className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Concrete Actiepunten',
    desc: 'Geen passieve grafieken. Stevin vertelt je wat je nu moet doen en waarom — in jouw tone of voice.',
    icon: <Zap className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Automatische Rapportages',
    desc: 'Wekelijkse rapporten die zichzelf schrijven. Per klant, per kanaal, klaar om te presenteren.',
    icon: <RefreshCw className="w-5 h-5 text-accent" />,
  },
  {
    title: '24/7 Monitoring',
    desc: 'Budgetten, tracking, connectors en campagnes worden continu gecontroleerd. Problemen worden direct gemeld.',
    icon: <Filter className="w-5 h-5 text-accent" />,
  },
]

const audiences = [
  {
    title: 'Agencies',
    desc: 'Beheer meerdere klanten vanuit één systeem. White-label dashboard, multi-client overzicht en automatische rapportages per klant.',
    link: '/voor-agencies',
    linkText: 'Meer over het Agency Partner programma',
  },
  {
    title: 'Inhouse Teams',
    desc: 'Verbind je volledige marketingstack — van ads tot CRM. Minder tijd aan data verzamelen, meer tijd aan strategie.',
    link: null,
    linkText: null,
  },
  {
    title: 'Promotoren & Event Marketing',
    desc: 'Scan de markt voordat je boekt. Zie welke concurrerende events met vergelijkbare doelgroepen gepland staan en optimaliseer je campagnes per regio.',
    link: null,
    linkText: null,
  },
]

const useCases = [
  'Je besteedt meer dan 5 uur per week aan rapportages',
  'Je mist kansen omdat je data te laat ziet',
  'Je beheert meerdere ad-accounts of klanten tegelijk',
  'Je wilt grip op ROAS maar ziet het totaalplaatje niet',
  'Je team groeit maar je tooling schaalt niet mee',
  'Je plant events en wilt weten waar de markt ruimte biedt',
]

export default function MarketingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-mesh-gradient opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6">
            Voor marketing
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Grip op je data.<br />
            <span className="text-neon">Focus op resultaat.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Of je nu een bureau runt, een inhouse team aanstuurt of events plant — Stevin centraliseert
            je data, analyseert 24/7 en levert concrete actiepunten. Minder ruis, meer resultaat.
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

      {/* Pain points */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Herkenbaar?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {painPoints.map((p) => (
              <div key={p.title} className="p-6 rounded-2xl bg-surface border border-border">
                <h3 className="text-sm font-bold text-primary mb-2">{p.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Het platform</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Alles wat je nodig hebt</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Stevin vervangt losse tools door één systeem dat meegroeit met je ambities.
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

      {/* Audience segments */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Voor elk type marketingteam</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Het platform is hetzelfde. De toepassing verschilt.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {audiences.map((a) => (
              <div key={a.title} className="p-8 rounded-2xl border border-border bg-surface">
                <h3 className="text-lg font-bold text-primary mb-3">{a.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">{a.desc}</p>
                {a.link && (
                  <Link href={a.link} className="text-sm font-semibold text-accent hover:underline">
                    {a.linkText} &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases + CTA */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Stevin is voor jou als</h2>
              <ul className="space-y-4">
                {useCases.map((uc) => (
                  <li key={uc} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white/70">{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-white mb-4">Klaar om te beginnen?</h3>
              <p className="text-white/50 mb-8 leading-relaxed">
                Plan een gesprek en we laten zien hoe Stevin jouw marketingdata omzet in resultaat. Geen verplichtingen.
              </p>
              <Link
                href="/contact"
                className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow"
              >
                Plan een gesprek
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
