import type { Metadata } from 'next'
import Link from 'next/link'
import { Brain, BarChart3, Plug, Radio, Moon, Sparkles, Search, Flame, TrendingUp, Megaphone, Users, Zap, Volume2, Shield, Wrench, Mail, Smartphone, DollarSign, Activity } from 'lucide-react'
import { nativeConnectors } from '@/data/connectors'

export const metadata: Metadata = {
  title: 'Platform — Stevin',
  description: 'Stevin Hub en Stevin Desk: het AI-gedreven marketing platform met 170+ integraties, 24/7 monitoring, social listening en AI-rapporten.',
}

const features = [
  {
    title: 'Stevin Hub',
    desc: 'De motor achter alles. 170+ integraties, AI-analyses, social listening en 24/7 monitoring. Alles draait automatisch op de achtergrond.',
    icon: <Brain className="w-5 h-5 text-accent" />,
    color: 'from-blue-500/10 to-indigo-500/10 border-blue-500/20',
  },
  {
    title: 'Stevin Desk',
    desc: 'Jouw cockpit. Eén dashboard voor campagneprestaties, CRM-pipeline, AI-adviezen, content en rapportages.',
    icon: <BarChart3 className="w-5 h-5 text-accent" />,
    color: 'from-purple-500/10 to-pink-500/10 border-purple-500/20',
  },
  {
    title: '170+ Integraties',
    desc: 'Van ads en analytics tot streaming, social, ticketing en finance. Directe koppelingen met alle grote platformen.',
    icon: <Plug className="w-5 h-5 text-accent" />,
    color: 'from-green-500/10 to-emerald-500/10 border-green-500/20',
  },
  {
    title: 'Lead Generation',
    desc: 'Van anoniem websitebezoek naar gekwalificeerde pipeline — volledig geautomatiseerd, 100% EU-compliant, zonder cookies.',
    icon: <Radio className="w-5 h-5 text-accent" />,
    color: 'from-orange-500/10 to-red-500/10 border-orange-500/20',
  },
  {
    title: '24/7 Monitoring',
    desc: 'Elke nacht worden je campagnes, tracking, connectors en budgetten automatisch gecontroleerd. Problemen worden direct gemeld of gerepareerd.',
    icon: <Moon className="w-5 h-5 text-accent" />,
    color: 'from-slate-500/10 to-zinc-500/10 border-slate-500/20',
  },
  {
    title: 'AI Reports & Alerts',
    desc: 'AI analyseert je data en genereert wekelijkse rapporten, anomalie-alerts en optimalisatie-adviezen. Geen handmatige rapportages meer.',
    icon: <Sparkles className="w-5 h-5 text-accent" />,
    color: 'from-yellow-500/10 to-amber-500/10 border-yellow-500/20',
  },
]

const extras = [
  { title: 'Social Listening', desc: 'Market intelligence uit meerdere bronnen, uitgewerkt tot bruikbare inzichten en content.', icon: <Search className="w-5 h-5 text-accent" /> },
  { title: 'Content Curation', desc: 'De belangrijkste trends automatisch gefilterd, alleen relevante inzichten passeren.', icon: <Flame className="w-5 h-5 text-accent" /> },
  { title: 'Brand & Performance', desc: 'Campagneprestaties gekoppeld aan merkdata — van awareness tot conversie in één overzicht.', icon: <TrendingUp className="w-5 h-5 text-accent" /> },
  { title: 'Multi-channel Publishing', desc: 'Content generatie en publicatie over meerdere kanalen vanuit één plek.', icon: <Megaphone className="w-5 h-5 text-accent" /> },
  { title: 'CRM & Pipeline', desc: 'Contacten, deals, e-mail tracking en opvolging — alles in één systeem.', icon: <Users className="w-5 h-5 text-accent" /> },
  { title: 'Automation', desc: 'E-mail flows, lead scoring, nurturing en trigger-based messaging volledig geautomatiseerd.', icon: <Zap className="w-5 h-5 text-accent" /> },
]

export default function PlatformPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-mesh-gradient opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">Het Platform</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Stevin Hub + Stevin Desk
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Eén platform dat je volledige marketingstack verbindt, bewaakt en optimaliseert.
            Van campagnedata tot klantpipeline — aangedreven door AI, 24/7 actief.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
              Plan een demo
            </Link>
            <Link href="#connectors" className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/80 border border-white/20 rounded-xl hover:bg-white/5 transition-colors">
              Bekijk connectors
            </Link>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Alles wat je nodig hebt</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Stevin vervangt losse tools door één geintegreerd systeem. Elk onderdeel versterkt de rest.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className={`rounded-2xl border bg-gradient-to-br ${f.color} p-8 hover:shadow-lg transition-shadow`}>
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

      {/* Native Connectors */}
      <section id="connectors" className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">170+ Integraties</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Directe, real-time koppelingen met de platformen die ertoe doen. Geen third-party middleware, geen vertraging.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {nativeConnectors.map((c) => (
              <div key={c.slug} className="rounded-xl bg-white border border-border p-4 text-center hover:shadow-md hover:border-accent/30 transition-all">
                <p className="text-sm font-semibold text-primary">{c.name}</p>
                <p className="text-[11px] text-muted mt-1 leading-snug">{c.category === 'advertising' ? 'Advertising' : c.category === 'analytics' ? 'Analytics' : c.category === 'ecommerce' ? 'E-commerce' : 'E-mail'}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted mt-8">
            Daarnaast ondersteunen we <Link href="/integraties" className="text-accent hover:underline">100+ andere tools</Link> via koppelingen.
            Mis je een platform? <Link href="/contact" className="text-accent hover:underline">Laat het ons weten</Link> — we kunnen met vrijwel alles connecten.
          </p>
        </div>
      </section>

      {/* Lead Generation */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-3">Lead Generation</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">Van bezoeker naar klant</h2>
              <p className="text-muted leading-relaxed mb-6">
                Stevin herkent bedrijven die je website bezoeken, scoort hun koopintentie
                en triggert automatisch de juiste opvolging — van CRM-contact tot retargeting.
                Volledig EU-compliant, zonder cookies of third-party tracking.
              </p>
              <ul className="space-y-3">
                {['100% AVG / GDPR compliant', 'Bedrijfsherkenning zonder cookies', 'AI-gedreven intent scoring', 'Automatische CRM-verrijking', 'Retargeting audiences aanmaken'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-accent/5 to-purple-500/5 border border-accent/20 p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Radio className="w-8 h-8 text-accent" />
              </div>
              <p className="text-lg font-bold text-primary">Bezoeker → Bedrijf → Intent → Actie</p>
              <p className="text-sm text-muted mt-2">Volledig geautomatiseerde pipeline</p>
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 Monitoring */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center mb-12">
            <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">24/7 Monitoring</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Je campagnes slapen nooit</h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Elke nacht controleren we automatisch al je systemen. Problemen worden direct gerepareerd of gemeld.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { check: 'Alle advertentiekanalen', icon: <Volume2 className="w-5 h-5 text-neon" /> },
              { check: 'Connector status', icon: <Plug className="w-5 h-5 text-neon" /> },
              { check: 'Budget & spend controle', icon: <DollarSign className="w-5 h-5 text-neon" /> },
              { check: 'Tracking & conversies', icon: <TrendingUp className="w-5 h-5 text-neon" /> },
              { check: 'CRM pipeline gezondheid', icon: <Users className="w-5 h-5 text-neon" /> },
              { check: 'Content & social feeds', icon: <Smartphone className="w-5 h-5 text-neon" /> },
              { check: 'E-mail deliverability', icon: <Mail className="w-5 h-5 text-neon" /> },
              { check: 'Automatisch herstel', icon: <Wrench className="w-5 h-5 text-neon" /> },
            ].map((item) => (
              <div key={item.check} className="rounded-xl bg-white/5 border border-white/10 p-5">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center mb-2">
                  {item.icon}
                </div>
                <p className="text-sm text-white/80 font-medium">{item.check}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Reports */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-2xl bg-gradient-to-br from-yellow-500/5 to-amber-500/5 border border-yellow-500/20 p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-yellow-500" />
              </div>
              <p className="text-lg font-bold text-primary">AI-gedreven Inzichten</p>
              <p className="text-sm text-muted mt-2">Automatische analyses en aanbevelingen</p>
            </div>
            <div>
              <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-3">AI Reports</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">Rapporten die zichzelf schrijven</h2>
              <p className="text-muted leading-relaxed mb-6">
                Stevin analyseert je campagnedata met AI en genereert wekelijkse rapporten,
                anomalie-alerts en optimalisatie-adviezen. Volledig automatisch, EU-gehost.
              </p>
              <ul className="space-y-3">
                {['Wekelijkse performance summaries', 'Real-time anomalie detectie', 'Concrete optimalisatie-adviezen', 'Automatische alerts bij afwijkingen', 'Content suggesties uit market intelligence'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* More capabilities */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">En nog meer</h2>
            <p className="text-muted">Het platform groeit continu. Dit is wat er verder in zit.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {extras.map((e) => (
              <div key={e.title} className="flex items-start gap-4 rounded-xl bg-white border border-border p-6">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  {e.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary">{e.title}</h3>
                  <p className="text-sm text-muted mt-1">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Klaar om het platform te zien?</h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-8">
            Plan een demo en ontdek hoe Stevin je marketing transformeert.
          </p>
          <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
            Plan een demo
          </Link>
        </div>
      </section>
    </main>
  )
}
