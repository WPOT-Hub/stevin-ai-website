import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import VentureLabForm from '@/components/VentureLabForm'
import VentureLabNav from '@/components/VentureLabNav'
import {
  Target,
  FlaskConical,
  TrendingUp,
  Rocket,
  Code2,
  Compass,
  Building2,
  Lightbulb,
} from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

// Hero-visual geometrie (440x540 px), niet-talig. Tekst komt uit COPY.
const GEO = [
  { x: 40, y: 150, n: '01' },
  { x: 150, y: 252, n: '02' },
  { x: 70, y: 354, n: '03' },
  { x: 220, y: 452, n: '04', highlight: true },
]
const STEP_ICONS = [Target, Compass, FlaskConical, TrendingUp, Rocket]
const AUD_ICONS = [Code2, Lightbulb, Building2, Rocket]

const COPY = {
  nl: {
    metaTitle: 'Stevin Venture Lab, van AI-idee naar gevalideerde startup',
    metaDesc:
      'Stevin Venture Lab brengt developers, product owners, ondernemers en domeinexperts samen om AI-oplossingen te bouwen met een duidelijke route naar marktvalidatie, eerste klanten en funding.',
    heroH1a: 'Van AI-idee naar ',
    heroH1b: 'gevalideerde startup.',
    heroSub:
      'Stevin Venture Lab brengt builders, product owners en domeinexperts samen om AI-oplossingen te valideren, bouwen en naar de eerste klanten te brengen.',
    ctaInteresse: 'Meld je interesse',
    ctaProgramma: 'Bekijk het programma',
    pipelineLabel: 'Venture pipeline',
    signals: ['klantinterview', 'pilotinteresse', 'warm intro'],
    pipeline: [
      { label: 'Problem', note: 'signals en klantgesprekken' },
      { label: 'Validation', note: 'klantinterviews, pilotinteresse' },
      { label: 'Build', note: 'prototype naar MVP' },
      { label: 'Traction', note: 'eerste betalende klanten' },
    ],
    waaromEyebrow: 'Waarom dit bestaat',
    waaromH2: 'De techniek werkt. De markt ontbreekt.',
    waaromP: [
      'Veel AI-ideeen blijven hangen in demos, losse tools of interne experimenten. De techniek werkt, maar de markt ontbreekt.',
      'Wie is de koper? Welk probleem is urgent genoeg? Wat is de juiste propositie? Hoe kom je aan pilotklanten? En wanneer is een idee sterk genoeg om funding op te halen?',
      'Stevin Venture Lab helpt teams om deze vragen snel en scherp te beantwoorden. We combineren product, AI, marketing, sales en marktvalidatie in een praktisch programma.',
    ],
    bouwenEyebrow: 'Wat we bouwen',
    bouwenH2: 'AI-oplossingen met duidelijke zakelijke of maatschappelijke waarde.',
    bouwenSub: 'We zoeken geen losse prompts of gimmicks. We zoeken problemen waar AI echt iets kan versnellen, versimpelen of verbeteren.',
    domains: ['bedrijfsprocessen', 'marketing en sales', 'kenniswerk', 'gezondheid en welzijn', 'zorgprocessen', 'mensgerichte productiviteit', 'interne tooling', 'nieuwe B2B SaaS-concepten'],
    hoeEyebrow: 'Hoe het werkt',
    hoeH2: 'Elke fase levert meer bewijs op.',
    steps: [
      { title: 'We starten met het probleem', desc: 'Geen oplossing zonder scherpe vraag. We onderzoeken eerst wie het probleem heeft, hoe urgent het is en welke alternatieven er nu bestaan.' },
      { title: 'We valideren de markt', desc: 'Met klantgesprekken, propositie-tests, landingspaginas, sales outreach en eerste pilotinteresse toetsen we of er echte vraag is.' },
      { title: 'We bouwen wat nodig is', desc: 'Soms een prototype, soms een simpele MVP, soms eerst een handmatig proces achter de schermen. Het doel is bewijs, niet perfectie.' },
      { title: 'We scherpen de GTM aan', desc: 'We helpen met positionering, pricing, salesverhaal, doelgroepkeuze, pilotaanpak en de eerste commerciele signalen.' },
      { title: 'We bepalen de volgende stap', desc: 'Doorgaan, stoppen, aanpassen, bootstrappen of funding voorbereiden. Alleen sterke cases gaan door.' },
    ],
    voorEyebrow: 'Voor wie',
    voorH2: 'Een team dat elkaar aanvult.',
    audience: [
      { title: 'Voor developers', desc: 'Je hebt technische skills en ziet AI-kansen, maar mist commerciele validatie, positionering of toegang tot klanten.' },
      { title: 'Voor product owners', desc: 'Je ziet problemen in de markt of binnen organisaties, maar zoekt een team en structuur om er een startupkans van te maken.' },
      { title: 'Voor domeinexperts', desc: 'Je kent een industrie, proces of doelgroep van binnenuit en wilt onderzoeken of AI daar een schaalbare oplossing kan bieden.' },
      { title: 'Voor ondernemers', desc: 'Je wilt sneller van idee naar bewijs, zonder maanden te bouwen aan iets waar niemand voor betaalt.' },
    ],
    stevinEyebrow: 'Waarom Stevin',
    stevinH2: 'Een werkend product is niet genoeg.',
    stevinP1: 'Stevin brengt marketing en sales kennis in waar veel AI-teams tekortkomen. Je hebt een scherpe koper nodig, een duidelijk probleem, een overtuigende propositie en een route naar de eerste klanten.',
    stevinP2: 'Daar zit onze kracht.',
    stevinP3: 'We helpen niet alleen met bouwen, maar vooral met bewijzen dat er markt is.',
    ctaH2: 'Heb je een AI-idee, een marktprobleem of een team dat wil bouwen?',
    ctaSub: 'Meld je interesse voor Stevin Venture Lab. Vertel ons wie je bent, welk probleem je ziet en wat je zoekt.',
  },
  en: {
    metaTitle: 'Stevin Venture Lab, from AI idea to validated startup',
    metaDesc:
      'Stevin Venture Lab brings developers, product owners, entrepreneurs and domain experts together to build AI solutions with a clear route to market validation, first customers and funding.',
    heroH1a: 'From AI idea to ',
    heroH1b: 'a validated startup.',
    heroSub:
      'Stevin Venture Lab brings builders, product owners and domain experts together to validate, build and bring AI solutions to their first customers.',
    ctaInteresse: 'Register your interest',
    ctaProgramma: 'See the programme',
    pipelineLabel: 'Venture pipeline',
    signals: ['customer interview', 'pilot interest', 'warm intro'],
    pipeline: [
      { label: 'Problem', note: 'signals and customer talks' },
      { label: 'Validation', note: 'customer interviews, pilot interest' },
      { label: 'Build', note: 'prototype to MVP' },
      { label: 'Traction', note: 'first paying customers' },
    ],
    waaromEyebrow: 'Why this exists',
    waaromH2: 'The tech works. The market is missing.',
    waaromP: [
      'Many AI ideas get stuck in demos, loose tools or internal experiments. The tech works, but the market is missing.',
      'Who is the buyer? Which problem is urgent enough? What is the right proposition? How do you get pilot customers? And when is an idea strong enough to raise funding?',
      'Stevin Venture Lab helps teams answer these questions fast and sharply. We combine product, AI, marketing, sales and market validation in a practical programme.',
    ],
    bouwenEyebrow: 'What we build',
    bouwenH2: 'AI solutions with clear business or social value.',
    bouwenSub: 'We are not after loose prompts or gimmicks. We look for problems where AI can genuinely speed up, simplify or improve something.',
    domains: ['business processes', 'marketing and sales', 'knowledge work', 'health and wellbeing', 'care processes', 'human-centred productivity', 'internal tooling', 'new B2B SaaS concepts'],
    hoeEyebrow: 'How it works',
    hoeH2: 'Every phase produces more proof.',
    steps: [
      { title: 'We start with the problem', desc: 'No solution without a sharp question. We first research who has the problem, how urgent it is and which alternatives exist today.' },
      { title: 'We validate the market', desc: 'With customer conversations, proposition tests, landing pages, sales outreach and first pilot interest we test whether there is real demand.' },
      { title: 'We build what is needed', desc: 'Sometimes a prototype, sometimes a simple MVP, sometimes a manual process behind the scenes first. The goal is proof, not perfection.' },
      { title: 'We sharpen the GTM', desc: 'We help with positioning, pricing, sales story, audience choice, pilot approach and the first commercial signals.' },
      { title: 'We decide the next step', desc: 'Continue, stop, adjust, bootstrap or prepare funding. Only strong cases move on.' },
    ],
    voorEyebrow: 'Who it is for',
    voorH2: 'A team that complements each other.',
    audience: [
      { title: 'For developers', desc: 'You have technical skills and see AI opportunities, but lack commercial validation, positioning or access to customers.' },
      { title: 'For product owners', desc: 'You see problems in the market or inside organisations, but need a team and structure to turn it into a startup opportunity.' },
      { title: 'For domain experts', desc: 'You know an industry, process or audience from the inside and want to explore whether AI can offer a scalable solution there.' },
      { title: 'For entrepreneurs', desc: 'You want to go from idea to proof faster, without building for months on something nobody pays for.' },
    ],
    stevinEyebrow: 'Why Stevin',
    stevinH2: 'A working product is not enough.',
    stevinP1: 'Stevin brings the marketing and sales knowledge many AI teams lack. You need a sharp buyer, a clear problem, a convincing proposition and a route to the first customers.',
    stevinP2: 'That is where our strength lies.',
    stevinP3: 'We help not only with building, but above all with proving there is a market.',
    ctaH2: 'Do you have an AI idea, a market problem or a team that wants to build?',
    ctaSub: 'Register your interest in Stevin Venture Lab. Tell us who you are, what problem you see and what you are looking for.',
  },
} as const

const pick = (l: string) => (l === 'en' ? COPY.en : COPY.nl)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const c = pick(locale)
  return { title: c.metaTitle, description: c.metaDesc, robots: { index: false, follow: false } }
}

export default async function VentureLabPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = pick(locale)

  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero-mesh-gradient -mt-[72px] overflow-hidden">
        <div className="mx-auto max-w-[1200px]" style={{ padding: 'calc(96px + 56px) 24px 110px' }}>
          <VentureLabNav locale={locale} />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-16 items-center">
            {/* Left: copy */}
            <div>
              <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
                <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
                Stevin Venture Lab
              </p>
              <h1
                className="font-display font-extrabold text-white leading-[1.04] tracking-[-0.03em]"
                style={{ fontWeight: 700, fontSize: 'clamp(40px, 4.6vw, 64px)', maxWidth: '15ch' }}
              >
                {c.heroH1a}<span className="text-[#5DA3FF]">{c.heroH1b}</span>
              </h1>
              <p className="text-white/60 leading-[1.6]" style={{ fontSize: '19px', maxWidth: '540px', marginTop: '30px' }}>
                {c.heroSub}
              </p>
              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  href="#interesse"
                  className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors"
                >
                  {c.ctaInteresse}
                </Link>
                <Link
                  href="/venture-lab/programma"
                  className="inline-flex items-center gap-2 border border-white/20 text-white font-display font-semibold text-[15px] px-7 py-3.5 rounded-lg hover:border-white/40 hover:bg-white/5 transition-colors"
                >
                  {c.ctaProgramma}
                </Link>
              </div>
            </div>

            {/* Right: venture-pipeline ('map') op teamfoto */}
            <div className="relative hidden lg:block" aria-hidden="true">
              <div
                className="absolute -inset-8 rounded-[48px] opacity-70 blur-3xl"
                style={{ background: 'radial-gradient(ellipse 70% 70% at 60% 35%, rgba(61,142,255,0.32) 0%, transparent 70%)' }}
              />
              <div className="relative h-[540px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/venture/hero-team.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(155deg, rgba(10,22,40,0.74) 0%, rgba(10,22,40,0.88) 52%, rgba(10,22,40,0.97) 100%)' }}
                />
                <div
                  className="absolute inset-0 mix-blend-overlay opacity-35"
                  style={{ background: 'linear-gradient(160deg, #3D8EFF 0%, transparent 62%)' }}
                />

                <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4A0]" />
                  <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-white/55">{c.pipelineLabel}</span>
                </div>

                <div className="absolute top-[60px] right-5 z-20 flex flex-col items-end gap-2">
                  {c.signals.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 bg-white/[0.07] backdrop-blur-sm px-3 py-1 font-mono text-[11px] text-white/60">
                      {s}
                    </span>
                  ))}
                </div>

                <svg className="absolute inset-0 z-10" width="440" height="540" viewBox="0 0 440 540" fill="none">
                  <path d="M40 150 L150 252 L70 354 L220 452" stroke="url(#vlpath)" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.55" />
                  {GEO.map((p) => (
                    <circle key={p.n} cx={p.x} cy={p.y} r="3.5" fill={p.highlight ? '#00D4A0' : '#5DA3FF'} />
                  ))}
                  <defs>
                    <linearGradient id="vlpath" x1="0" y1="0" x2="440" y2="540" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#5DA3FF" />
                      <stop offset="1" stopColor="#00D4A0" />
                    </linearGradient>
                  </defs>
                </svg>

                {GEO.map((p, i) => (
                  <div
                    key={p.n}
                    className={`absolute z-20 w-[188px] rounded-xl border px-3.5 py-2.5 backdrop-blur-md ${
                      p.highlight ? 'border-[#00D4A0]/40 bg-[#00D4A0]/[0.08]' : 'border-white/15 bg-[#0A1628]/55'
                    }`}
                    style={{ left: p.x + 12, top: p.y, transform: 'translateY(-50%)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-[10px] ${p.highlight ? 'text-[#00D4A0]' : 'text-[#5DA3FF]'}`}>{p.n}</span>
                      <span className="font-display text-[14px] font-bold leading-tight text-white">{c.pipeline[i].label}</span>
                      {p.highlight && <span className="ml-auto text-[12px] text-[#00D4A0]">&#9650;</span>}
                    </div>
                    <p className="mt-0.5 text-[11.5px] leading-snug text-white/50">{c.pipeline[i].note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WAAROM DIT BESTAAT ── */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1fr] gap-12 lg:gap-20">
            <div>
              <p className="text-accent text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6 flex items-center gap-[14px]">
                <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
                {c.waaromEyebrow}
              </p>
              <h2 className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em]" style={{ fontWeight: 600, fontSize: 'clamp(28px, 2.6vw, 34px)' }}>
                {c.waaromH2}
              </h2>
            </div>
            <div className="space-y-5 text-[17px] text-muted leading-[1.65] max-w-xl lg:pt-2">
              {c.waaromP.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WAT WE BOUWEN ── */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-accent text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            {c.bouwenEyebrow}
          </p>
          <h2 className="font-display font-extrabold text-primary leading-[1.1] tracking-[-0.025em] mb-4" style={{ fontWeight: 600, fontSize: 'clamp(28px, 2.6vw, 34px)', maxWidth: '20ch' }}>
            {c.bouwenH2}
          </h2>
          <p className="text-[17px] text-muted leading-[1.6] max-w-xl mb-12">{c.bouwenSub}</p>
          <div className="flex flex-wrap gap-3">
            {c.domains.map((d) => (
              <span key={d} className="inline-flex items-center rounded-full border border-border bg-surface px-5 py-2.5 text-[15px] font-medium text-primary">
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOE HET WERKT ── */}
      <section id="programma" className="bg-surface scroll-mt-24" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-accent text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            {c.hoeEyebrow}
          </p>
          <h2 className="font-display font-extrabold text-primary leading-[1.1] tracking-[-0.025em] mb-16" style={{ fontWeight: 600, fontSize: 'clamp(28px, 2.6vw, 34px)' }}>
            {c.hoeH2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-border">
            {c.steps.map((s, i) => {
              const Icon = STEP_ICONS[i]
              return (
                <div key={s.title} className="border-b border-border py-10 lg:px-10 lg:first:pl-0 lg:[&:nth-child(3n)]:pr-0 lg:[&:nth-child(3n+1)]:pl-0">
                  <div className="flex items-center gap-3 mb-5">
                    <Icon className="w-5 h-5 text-accent" />
                    <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-[18px] font-display font-bold text-primary mb-3 leading-tight">{s.title}</h3>
                  <p className="text-[15px] text-muted leading-[1.6]">{s.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── VOOR WIE ── */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-accent text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            {c.voorEyebrow}
          </p>
          <h2 className="font-display font-extrabold text-primary leading-[1.1] tracking-[-0.025em] mb-16" style={{ fontWeight: 600, fontSize: 'clamp(28px, 2.6vw, 34px)' }}>
            {c.voorH2}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {c.audience.map((a, i) => {
              const Icon = AUD_ICONS[i]
              return (
                <div key={a.title} className="bg-white p-8 lg:p-10">
                  <Icon className="w-6 h-6 text-accent mb-5" />
                  <h3 className="text-[19px] font-display font-bold text-primary mb-3">{a.title}</h3>
                  <p className="text-[15px] text-muted leading-[1.65]">{a.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── WAAROM STEVIN ── */}
      <section className="bg-primary" style={{ padding: '110px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1fr] gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6 flex items-center gap-[14px]">
                <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
                {c.stevinEyebrow}
              </p>
              <h2 className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em]" style={{ fontWeight: 600, fontSize: 'clamp(28px, 2.6vw, 34px)', maxWidth: '16ch' }}>
                {c.stevinH2}
              </h2>
            </div>
            <div className="space-y-5 text-[17px] text-white/60 leading-[1.65] max-w-xl">
              <p>{c.stevinP1}</p>
              <p className="text-white font-medium">{c.stevinP2}</p>
              <p>{c.stevinP3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERESSE / INTAKE-FORMULIER ── */}
      <section id="interesse" className="bg-surface scroll-mt-24" style={{ padding: '110px 24px' }}>
        <div className="mx-auto max-w-[760px]">
          <div className="text-center mb-12">
            <h2 className="font-display font-extrabold text-primary leading-[1.1] tracking-[-0.025em] mb-5" style={{ fontWeight: 600, fontSize: 'clamp(28px, 2.6vw, 34px)' }}>
              {c.ctaH2}
            </h2>
            <p className="text-[18px] text-muted leading-[1.6] max-w-xl mx-auto">{c.ctaSub}</p>
          </div>
          <VentureLabForm locale={locale} />
        </div>
      </section>
    </main>
  )
}
