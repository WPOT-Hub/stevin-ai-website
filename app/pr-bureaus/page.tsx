import type { Metadata } from 'next'
import Link from 'next/link'
import DataRain from '@/components/DataRain'
import { Newspaper, TrendingUp, MessageCircle, BarChart3, Filter, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Stevin voor PR-bureaus — Media intelligence in één platform',
  description: 'Stevin helpt PR-bureaus en communicatieadviseurs met media monitoring, mention-tracking en campagne-impact meting. Alles gecentraliseerd, herleidbaar.',
}

const features = [
  {
    title: 'Media Monitoring',
    desc: 'Volg vermeldingen van je klanten in online media, social, blogs en forums. Gefilterd, gecategoriseerd en klaar voor actie.',
    icon: <Newspaper className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Mention-volume Tracking',
    desc: 'Volg vermeldingsvolume van je klant over tijd. Piek na een persbericht? Plotselinge stilte? Zie verschuivingen voordat ze een probleem worden.',
    icon: <MessageCircle className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Campagne-impact Meting',
    desc: 'Toon het effect van je PR-inspanningen met data. Van persbericht tot merkperceptie — onderbouw je waarde.',
    icon: <TrendingUp className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Concurrentie Monitoring',
    desc: 'Volg wat er over de concurrenten van je klant gezegd wordt. Spot kansen en dreigingen voordat ze mainstream zijn.',
    icon: <BarChart3 className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Social Listening',
    desc: 'Alle social kanalen van je klant in één overzicht. Filter de ruis en rapporteer alleen wat ertoe doet.',
    icon: <Filter className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Geautomatiseerde Rapportages',
    desc: 'Wekelijkse en maandelijkse PR-rapportages die zichzelf schrijven. Per klant, in jouw tone of voice.',
    icon: <Zap className="w-5 h-5 text-accent" />,
  },
]

const useCases = [
  'Je besteedt uren per week aan het handmatig clippings verzamelen',
  'Je klanten vragen om bewijs dat PR bijdraagt aan merkperceptie',
  'Je hebt geen structureel overzicht van online media-aandacht',
  'Je wilt crisismanagement proactief aanpakken, niet reactief',
  'Je rapportages kosten te veel tijd en missen diepgang',
]

export default function PRBureausPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-mesh-gradient opacity-50" />
        <DataRain variant="pr" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6">
            Voor PR-bureaus & communicatie
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Media intelligence<br />
            <span className="text-neon">in één platform.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Stop met handmatig clippings verzamelen. Stevin monitort, analyseert en rapporteert
            over je klanten — zodat jij je kunt focussen op strategie en relaties.
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
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Alles voor PR-professionals</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Van media monitoring tot geautomatiseerde rapportages.
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Klaar voor betere PR-intelligence?</h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-8">
            Plan een gesprek en ontdek hoe Stevin je PR-werkzaamheden versterkt met data.
          </p>
          <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
            Plan een gesprek
          </Link>
        </div>
      </section>
    </main>
  )
}
