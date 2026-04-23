import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import MeetlatRuler from '@/components/MeetlatRuler'
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
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            VOOR CREATIEVE BUREAUS
          </p>
          <h1
            className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em]"
            style={{ fontSize: 'clamp(52px, 7vw, 108px)', maxWidth: '16ch' }}>
            Het gevoel klopte.<br />
            <span className="text-[#5DA3FF]">Nu zie je waarom.</span>
          </h1>
          <p className="text-white/60 leading-[1.55]" style={{ fontSize: '20px', maxWidth: '560px', marginTop: '32px' }}>
            Creatie leeft van intuïtie. Maar een sterk concept wordt nog sterker als je weet wélke hook, welk format en welke kleur écht raakte. Stevin koppelt campagneperformance terug naar je team — zodat de volgende briefing geen gok is.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
            <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
              Plan een gesprek
            </Link>
            <Link href="/platform" className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/70 border border-white/20 rounded-xl hover:bg-white/5 transition-colors">
              Bekijk het platform
            </Link>
          </div>
          <div className="mt-20">
            <MeetlatRuler color="rgba(255,255,255,.35)" />
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            DE REALITEIT
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-16"
            style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}
          >
            Herkenbaar?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {painPoints.map((p) => (
              <div key={p.title} className="py-10 md:py-0 md:px-10 first:pl-0 last:pr-0">
                <h3 className="text-[17px] font-display font-bold text-primary mb-4 leading-tight">{p.title}</h3>
                <p className="text-[15px] text-muted leading-[1.6]">{p.desc}</p>
              </div>
            ))}
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
            Alles wat je nodig hebt
          </h2>
          <p className="text-[17px] text-muted mb-16 max-w-xl leading-[1.55]">
              Stevin verbindt creatieve output met performance-data en levert de inzichten die je team nodig heeft.
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

      {/* Audience segments */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            VOOR ELK TYPE TEAM
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}
          >
            Voor elk type creatief team
          </h2>
          <p className="text-[17px] text-muted mb-0 max-w-xl leading-[1.55]">Het platform is hetzelfde. De toepassing verschilt.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border mt-16">
            {audiences.map((a) => (
              <div key={a.title} className="py-10 md:py-0 md:px-10 first:pl-0 last:pr-0">
                <h3 className="text-[17px] font-display font-bold text-primary mb-4">{a.title}</h3>
                <p className="text-[15px] text-muted leading-[1.6] mb-4">{a.desc}</p>
                {a.link && (
                  <Link href={a.link} className="text-sm font-semibold text-[#5DA3FF] hover:underline">
                    {a.linkText} &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases + CTA */}
      <section className="bg-primary" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
                <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
                VOOR JOU ALS
              </p>
              <h2
                className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-10"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                Stevin is voor jou als
              </h2>
              <ul className="space-y-0 border-t border-white/10">
                {useCases.map((uc) => (
                  <li key={uc} className="flex items-start gap-4 py-5 border-b border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5DA3FF] flex-shrink-0 mt-[9px]" />
                    <span className="text-[15px] text-white/70 leading-[1.6]">{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pt-[140px]">
              <p className="text-[#00D4A0] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6">
                Het is geen wonder. Het is Stevin.
              </p>
              <h3
                className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-6"
                style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
              >
                Zie wat je betaalt.<br />Zie wat het oplevert.
              </h3>
              <p className="text-white/50 mb-8 leading-[1.6] text-[15px]">
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
