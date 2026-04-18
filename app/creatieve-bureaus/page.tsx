import type { Metadata } from 'next'
import Link from 'next/link'
import DataRain from '@/components/DataRain'
import { Palette, Eye, FileText, Plug, ShieldCheck, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Stevin voor Creatieve Bureaus — Data-gedreven Creatie',
  description: 'Van creative decisions op gevoel naar data-gedreven creatie. Stevin koppelt campagneperformance aan je creatieve proces en levert actionable briefings. Voor creatieve bureaus, design studios en content agencies.',
}

const painPoints = [
  {
    title: 'Je werk wordt doodgegooid met budget',
    desc: 'Een sterke creative verliest zijn kracht als hij te lang of te vaak wordt ingezet. Maar zonder data weet niemand wanneer het tijd is voor vernieuwing — tot de resultaten kelderen.',
  },
  {
    title: 'Geen feedback loop naar creatie',
    desc: 'Mediaresultaten landen bij het mediateam, niet bij de creatieven. De mensen die het verschil maken zien nooit welke visuals, copy of formats het beste presteren.',
  },
  {
    title: 'Rapportages in plaats van concepten',
    desc: 'Je team besteedt uren aan het bouwen van rapporten die niemand leest. Tijd die naar creatieve concepten en strategisch denken moet gaan.',
  },
]

const features = [
  {
    title: 'Creatieve Verzadigingsdetectie',
    desc: 'Stevin detecteert exact wanneer een creatieve hook zijn kracht verliest. Je weet het voordat de resultaten dalen — zodat je op tijd vernieuwt in plaats van reageert.',
    icon: <Eye className="w-5 h-5 text-accent" />,
  },
  {
    title: '220+ Integraties',
    desc: 'Native koppelingen met Meta, Google, TikTok, LinkedIn, Shopify, Klaviyo en meer. Geen middleware, geen vertraging.',
    icon: <Plug className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Performance-to-Creative Feedback',
    desc: 'Niet "ad set 3 werkt beter" maar "ads met een probleemstelling als hook en warme kleurtonen converteren 34% beter in deze doelgroep."',
    icon: <BarChart3 className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Automated Creative Briefings',
    desc: 'Data-gedreven briefings die je team direct kan oppakken. Welke hook, welk format, welke visuele richting — onderbouwd met performance data, niet spreadsheets.',
    icon: <FileText className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Hook- en Format-Inzichten',
    desc: 'Welke openingszin, welk format en welke visuele richting presteren in deze doelgroep? Stevin leest de historie en legt het patroon bloot — niet gevoel, wel bewijs.',
    icon: <ShieldCheck className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Executive Briefings, geen PDF-dumps',
    desc: 'Drie zinnen naar je klant in plaats van 40 pagina\'s. "Je nieuwe visuele stijl werkt. Vermoeidheid nog niet zichtbaar. Opschalen."',
    icon: <Palette className="w-5 h-5 text-accent" />,
  },
]

const audiences = [
  {
    title: 'Creatieve Bureaus',
    desc: 'Onderbouw je concepten met data. Laat klanten zien waarom je creatieve keuzes werken en versterk je positie als strategisch partner.',
    link: null,
    linkText: null,
  },
  {
    title: 'Design Studios',
    desc: 'Van visual identity tot campagne-assets — weet welke ontwerpkeuzes converteren en welke alleen maar mooi zijn.',
    link: null,
    linkText: null,
  },
  {
    title: 'Content Agencies',
    desc: 'Verbind contentcreatie met performance. Zie welke formats, lengtes en hooks het beste werken per kanaal en doelgroep.',
    link: null,
    linkText: null,
  },
]

const useCases = [
  'Je wilt weten wanneer je creative zijn kracht verliest — voordat de resultaten dalen',
  'Je mist een feedback loop tussen media en creatie',
  'Je besteedt meer tijd aan rapportages dan aan concepten',
  'Je wilt je klant in 3 zinnen de status geven, niet in een 40 pagina PDF',
  'Je wilt pre-testen welke concepten het beste gaan presteren',
  'Je wilt je positioneren als strategisch creatief partner, niet als productie-unit',
]

export default function CreatieveBureausPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-mesh-gradient opacity-50" />
        <DataRain variant="creatief" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            VOOR CREATIEVE BUREAUS
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Het gevoel klopte.<br />
            <span className="text-[#5DA3FF]">Nu zie je waarom.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Creatie leeft van intuïtie. Maar een sterk concept wordt nog sterker als je weet wélke hook, welk format en welke kleur écht raakte. Stevin koppelt campagneperformance terug naar je team — zodat de volgende briefing geen gok is.
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
              Stevin verbindt creatieve output met performance-data en levert de inzichten die je team nodig heeft.
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
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Voor elk type creatief team</h2>
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
              <h3 className="text-2xl font-display font-extrabold text-white mb-4">Het is geen wonder. Het is <span className="text-[#5DA3FF]">Stevin</span>.</h3>
              <p className="text-white/50 mb-8 leading-relaxed">
                Creatie op bewijs bouwen. Plan een gesprek en we laten zien hoe Stevin jouw creatieve proces versterkt met data.
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
