import type { Metadata } from 'next'
import Link from 'next/link'
import DataRain from '@/components/DataRain'
import { Target, Users, TrendingUp, BarChart3, Zap, Filter } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Stevin voor B2B — Van lead tot klant, volledig gemeten',
  description: 'Stevin verbindt je paid media, website, CRM en opvolging zodat je precies weet welke campagnes klanten opleveren. Gebouwd voor B2B marketing en sales alignment.',
}

const features = [
  {
    title: 'Lead-to-Revenue Tracking',
    desc: 'Zie welke campagnes, kanalen en zoektermen daadwerkelijk klanten opleveren. Niet alleen leads, maar omzet per bron.',
    icon: <TrendingUp className="w-5 h-5 text-accent" />,
  },
  {
    title: 'CRM Integratie',
    desc: 'Leads komen automatisch in je CRM, worden gescoord en verdeeld. Sales weet precies wat een lead heeft gedaan voor het eerste gesprek.',
    icon: <Users className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Bedrijfsherkenning',
    desc: 'Herken welke bedrijven je website bezoeken, zonder cookies. Scoor hun koopintentie en trigger automatisch de juiste opvolging.',
    icon: <Target className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Pipeline Overzicht',
    desc: 'Van eerste klik tot gesloten deal in één dashboard. Zie waar leads vastlopen en waar je funnel lekt.',
    icon: <BarChart3 className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Marketing Automation',
    desc: 'Lead nurturing, scoring en opvolgingsflows die automatisch draaien. Geen lead valt meer tussen wal en schip.',
    icon: <Zap className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Account-Based Inzichten',
    desc: 'Focus op de accounts die ertoe doen. Zie welke bedrijven engaged zijn en stuur je marketing en sales erop aan.',
    icon: <Filter className="w-5 h-5 text-accent" />,
  },
]

const useCases = [
  'Je genereert leads maar weet niet welke campagnes klanten opleveren',
  'Marketing en sales werken met verschillende data en definities',
  'Je CRM is een puinhoop en leads worden te laat of niet opgevolgd',
  'Je optimaliseert op kosten per lead terwijl je zou moeten sturen op klantwaarde',
  'Je wilt account-based marketing maar hebt geen data-infrastructuur',
]

export default function B2BPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-mesh-gradient opacity-50" />
        <DataRain variant="b2b" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6">
            Voor B2B marketing & sales
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Van lead tot klant.<br />
            <span className="text-neon">Volledig gemeten.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Stevin verbindt je paid media, website, CRM en opvolging zodat je precies weet
            welke inspanningen omzet opleveren. Marketing en sales op één lijn.
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
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">De hele funnel, één systeem</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Van awareness tot deal — alles verbonden en meetbaar.
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Het is geen wonder. Het is Stevin.</h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-8">
            Van lead tot klant, elke euro herleidbaar. Plan een gesprek en ontdek hoe Stevin je B2B marketing meetbaar maakt tot op klantniveau.
          </p>
          <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
            Plan een gesprek
          </Link>
        </div>
      </section>
    </main>
  )
}
