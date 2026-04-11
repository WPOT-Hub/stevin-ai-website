import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Case Study: E-commerce — Stevin',
  description: 'Hoe een snelgroeiend e-commerce bedrijf 42% meer leads genereerde en 8 uur per week bespaarde met het Stevin platform.',
}

const results = [
  { metric: '+42%', label: 'Meer leads binnen 3 maanden' },
  { metric: '-35%', label: 'Lagere kosten per acquisitie' },
  { metric: '8 uur', label: 'Per week bespaard op rapportage' },
  { metric: '24/7', label: 'Automatische monitoring' },
]

const challenges = [
  'Campagnes op Meta, Google en TikTok draaiden los van elkaar — geen totaaloverzicht',
  'Leads kwamen binnen maar werden niet automatisch opgevolgd',
  'Handmatige rapportages kostten het team uren per week',
  'Platformstoringen werden te laat opgemerkt, waardoor budget verloren ging',
  'Geen inzicht in welke campagnes daadwerkelijk klanten opleverden',
]

const approach = [
  { step: 'Connectoren', desc: '8 native connectors aangesloten: Meta Ads, Google Ads, TikTok Ads, GA4, GTM, Shopify, Klaviyo en Mailchimp.' },
  { step: 'CRM & Pipeline', desc: 'CRM ingericht met automatische leadverwerking, lead scoring en pipeline management.' },
  { step: 'Monitoring', desc: 'Nachtelijke health checks geconfigureerd voor alle connectors, tracking en budgetten.' },
  { step: 'AI Reports', desc: 'Wekelijkse AI-rapporten met performance summaries, anomalie-alerts en optimalisatie-adviezen.' },
  { step: 'Automation', desc: 'E-mail flows, lead nurturing en trigger-based messaging via Klaviyo gekoppeld aan CRM.' },
  { step: 'Pulse', desc: 'Sovereign lead generation geactiveerd voor aanvullende B2B leadgeneratie via de webshop.' },
]

export default function EcommerceCaseStudy() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-mesh-gradient opacity-50" />
        <div className="relative mx-auto max-w-4xl px-6 sm:px-8 text-center">
          <Link href="/case-studies" className="inline-flex items-center gap-1 text-white/50 text-sm hover:text-white/80 transition-colors mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Alle case studies
          </Link>
          <span className="inline-flex px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-6">
            E-commerce
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Van losse campagnes naar een geIntegreerd marketing systeem
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Hoe een snelgroeiend Nederlands e-commerce bedrijf hun volledige marketingstack
            transformeerde met het Stevin platform.
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-white border-b border-border">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((r) => (
              <div key={r.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-accent">{r.metric}</p>
                <p className="text-sm text-muted mt-1">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* De klant */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <h2 className="text-2xl font-bold text-primary mb-4">De klant</h2>
          <p className="text-muted leading-relaxed">
            Een snelgroeiend Nederlands e-commerce bedrijf met een breed productassortiment
            en meerdere online verkoopkanalen. Het bedrijf adverteert actief op Meta, Google en TikTok
            en verwerkt honderden leads per maand via hun webshop en landingspagina&apos;s.
          </p>
        </div>
      </section>

      {/* De uitdaging */}
      <section className="py-16 bg-surface">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <h2 className="text-2xl font-bold text-primary mb-6">De uitdaging</h2>
          <ul className="space-y-4">
            {challenges.map((c, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="text-muted">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* De aanpak */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <h2 className="text-2xl font-bold text-primary mb-6">De aanpak</h2>
          <div className="space-y-6">
            {approach.map((a, i) => (
              <div key={a.step} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent text-sm font-bold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-primary">{a.step}</h3>
                  <p className="text-sm text-muted mt-1">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 bg-surface">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 text-center">
          <blockquote className="text-xl sm:text-2xl font-medium text-primary italic leading-relaxed">
            &ldquo;We hadden nooit verwacht dat we zoveel tijd zouden besparen. Het dashboard geeft ons
            in één oogopslag inzicht in alles — van campagneprestaties tot CRM-pipeline.&rdquo;
          </blockquote>
          <p className="text-muted mt-4">— Marketing Manager</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Vergelijkbare resultaten voor jouw bedrijf?</h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-8">
            Plan een gesprek en ontdek wat Stevin voor jou kan betekenen.
          </p>
          <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
            Plan een gesprek
          </Link>
        </div>
      </section>
    </main>
  )
}
