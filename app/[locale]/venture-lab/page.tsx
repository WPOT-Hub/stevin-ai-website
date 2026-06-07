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

// Unlisted preview-pagina. Niet in nav, footer of sitemap. noindex tot de
// richting is goedgekeurd en de volledige sectie (NL + EN) staat.
export const metadata: Metadata = {
  title: 'Stevin Venture Lab, van AI-idee naar gevalideerde startup',
  description:
    'Stevin Venture Lab brengt developers, product owners, ondernemers en domeinexperts samen om AI-oplossingen te bouwen met een duidelijke route naar marktvalidatie, eerste klanten en funding.',
  robots: { index: false, follow: false },
}

// ── Hero-visual: venture pipeline als 'map' over een teamfoto ──
// Coordinaten in het 440x540 px coordinatenstelsel van de visual-box,
// zodat de SVG-connector en de kaarten exact op dezelfde nodes uitkomen.
const PIPELINE = [
  { x: 40, y: 150, n: '01', label: 'Problem', note: 'signals en klantgesprekken' },
  { x: 150, y: 252, n: '02', label: 'Validation', note: 'klantinterviews, pilotinteresse' },
  { x: 70, y: 354, n: '03', label: 'Build', note: 'prototype naar MVP' },
  { x: 220, y: 452, n: '04', label: 'Traction', note: 'eerste betalende klanten', highlight: true },
]

const STEPS = [
  {
    icon: Target,
    title: 'We starten met het probleem',
    desc: 'Geen oplossing zonder scherpe vraag. We onderzoeken eerst wie het probleem heeft, hoe urgent het is en welke alternatieven er nu bestaan.',
  },
  {
    icon: Compass,
    title: 'We valideren de markt',
    desc: 'Met klantgesprekken, propositie-tests, landingspaginas, sales outreach en eerste pilotinteresse toetsen we of er echte vraag is.',
  },
  {
    icon: FlaskConical,
    title: 'We bouwen wat nodig is',
    desc: 'Soms een prototype, soms een simpele MVP, soms eerst een handmatig proces achter de schermen. Het doel is bewijs, niet perfectie.',
  },
  {
    icon: TrendingUp,
    title: 'We scherpen de GTM aan',
    desc: 'We helpen met positionering, pricing, salesverhaal, doelgroepkeuze, pilotaanpak en de eerste commerciele signalen.',
  },
  {
    icon: Rocket,
    title: 'We bepalen de volgende stap',
    desc: 'Doorgaan, stoppen, aanpassen, bootstrappen of funding voorbereiden. Alleen sterke cases gaan door.',
  },
]

const AUDIENCE = [
  {
    icon: Code2,
    title: 'Voor developers',
    desc: 'Je hebt technische skills en ziet AI-kansen, maar mist commerciele validatie, positionering of toegang tot klanten.',
  },
  {
    icon: Lightbulb,
    title: 'Voor product owners',
    desc: 'Je ziet problemen in de markt of binnen organisaties, maar zoekt een team en structuur om er een startupkans van te maken.',
  },
  {
    icon: Building2,
    title: 'Voor domeinexperts',
    desc: 'Je kent een industrie, proces of doelgroep van binnenuit en wilt onderzoeken of AI daar een schaalbare oplossing kan bieden.',
  },
  {
    icon: Rocket,
    title: 'Voor ondernemers',
    desc: 'Je wilt sneller van idee naar bewijs, zonder maanden te bouwen aan iets waar niemand voor betaalt.',
  },
]

const DOMAINS = [
  'bedrijfsprocessen',
  'marketing en sales',
  'kenniswerk',
  'gezondheid en welzijn',
  'zorgprocessen',
  'mensgerichte productiviteit',
  'interne tooling',
  'nieuwe B2B SaaS-concepten',
]

export default async function VentureLabPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero-mesh-gradient -mt-[72px] overflow-hidden">
        <div
          className="mx-auto max-w-[1200px]"
          style={{ padding: 'calc(96px + 56px) 24px 110px' }}
        >
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
                style={{ fontSize: 'clamp(40px, 5.4vw, 78px)', maxWidth: '15ch' }}
              >
                Van AI-idee naar <span className="text-[#5DA3FF]">gevalideerde startup.</span>
              </h1>
              <p
                className="text-white/60 leading-[1.6]"
                style={{ fontSize: '19px', maxWidth: '540px', marginTop: '30px' }}
              >
                Stevin Venture Lab brengt builders, product owners en domeinexperts samen om
                AI-oplossingen te valideren, bouwen en naar de eerste klanten te brengen.
              </p>
              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  href="#interesse"
                  className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors"
                >
                  Meld je interesse
                </Link>
                <Link
                  href="/venture-lab/programma"
                  className="inline-flex items-center gap-2 border border-white/20 text-white font-display font-semibold text-[15px] px-7 py-3.5 rounded-lg hover:border-white/40 hover:bg-white/5 transition-colors"
                >
                  Bekijk het programma
                </Link>
              </div>
            </div>

            {/* Right: venture-pipeline ('map') op teamfoto */}
            <div className="relative hidden lg:block" aria-hidden="true">
              <div
                className="absolute -inset-8 rounded-[48px] opacity-70 blur-3xl"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 70% at 60% 35%, rgba(61,142,255,0.32) 0%, transparent 70%)',
                }}
              />
              <div className="relative h-[540px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
                {/* teamfoto als basislaag (rechtenvrij, Pexels) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/venture/hero-team.jpg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* navy duotone + subtiele accent-tint */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(155deg, rgba(10,22,40,0.74) 0%, rgba(10,22,40,0.88) 52%, rgba(10,22,40,0.97) 100%)',
                  }}
                />
                <div
                  className="absolute inset-0 mix-blend-overlay opacity-35"
                  style={{ background: 'linear-gradient(160deg, #3D8EFF 0%, transparent 62%)' }}
                />

                {/* label */}
                <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4A0]" />
                  <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-white/55">
                    Venture pipeline
                  </span>
                </div>

                {/* losse signals die binnenkomen */}
                <div className="absolute top-[60px] right-5 z-20 flex flex-col items-end gap-2">
                  {['klantinterview', 'pilotinteresse', 'warm intro'].map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/[0.07] backdrop-blur-sm px-3 py-1 font-mono text-[11px] text-white/60"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* connector-pad door de vier fases */}
                <svg className="absolute inset-0 z-10" width="440" height="540" viewBox="0 0 440 540" fill="none">
                  <path
                    d="M40 150 L150 252 L70 354 L220 452"
                    stroke="url(#vlpath)"
                    strokeWidth="1.5"
                    strokeDasharray="3 5"
                    opacity="0.55"
                  />
                  {PIPELINE.map((p) => (
                    <circle
                      key={p.label}
                      cx={p.x}
                      cy={p.y}
                      r="3.5"
                      fill={p.highlight ? '#00D4A0' : '#5DA3FF'}
                    />
                  ))}
                  <defs>
                    <linearGradient id="vlpath" x1="0" y1="0" x2="440" y2="540" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#5DA3FF" />
                      <stop offset="1" stopColor="#00D4A0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* fase-kaarten */}
                {PIPELINE.map((p) => (
                  <div
                    key={p.label}
                    className={`absolute z-20 w-[188px] rounded-xl border px-3.5 py-2.5 backdrop-blur-md ${
                      p.highlight
                        ? 'border-[#00D4A0]/40 bg-[#00D4A0]/[0.08]'
                        : 'border-white/15 bg-[#0A1628]/55'
                    }`}
                    style={{ left: p.x + 12, top: p.y, transform: 'translateY(-50%)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-[10px] ${p.highlight ? 'text-[#00D4A0]' : 'text-[#5DA3FF]'}`}
                      >
                        {p.n}
                      </span>
                      <span className="font-display text-[14px] font-bold leading-tight text-white">
                        {p.label}
                      </span>
                      {p.highlight && <span className="ml-auto text-[12px] text-[#00D4A0]">&#9650;</span>}
                    </div>
                    <p className="mt-0.5 text-[11.5px] leading-snug text-white/50">{p.note}</p>
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
                Waarom dit bestaat
              </p>
              <h2
                className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em]"
                style={{ fontSize: 'clamp(30px, 3.6vw, 48px)' }}
              >
                De techniek werkt. De markt ontbreekt.
              </h2>
            </div>
            <div className="space-y-5 text-[17px] text-muted leading-[1.65] max-w-xl lg:pt-2">
              <p>
                Veel AI-ideeen blijven hangen in demos, losse tools of interne experimenten. De
                techniek werkt, maar de markt ontbreekt.
              </p>
              <p>
                Wie is de koper? Welk probleem is urgent genoeg? Wat is de juiste propositie? Hoe kom
                je aan pilotklanten? En wanneer is een idee sterk genoeg om funding op te halen?
              </p>
              <p>
                Stevin Venture Lab helpt teams om deze vragen snel en scherp te beantwoorden. We
                combineren product, AI, marketing, sales en marktvalidatie in een praktisch
                programma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WAT WE BOUWEN ── */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-accent text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            Wat we bouwen
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.1] tracking-[-0.025em] mb-4"
            style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', maxWidth: '20ch' }}
          >
            AI-oplossingen met duidelijke zakelijke of maatschappelijke waarde.
          </h2>
          <p className="text-[17px] text-muted leading-[1.6] max-w-xl mb-12">
            We zoeken geen losse prompts of gimmicks. We zoeken problemen waar AI echt iets kan
            versnellen, versimpelen of verbeteren.
          </p>
          <div className="flex flex-wrap gap-3">
            {DOMAINS.map((d) => (
              <span
                key={d}
                className="inline-flex items-center rounded-full border border-border bg-surface px-5 py-2.5 text-[15px] font-medium text-primary"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOE HET WERKT (programma) ── */}
      <section id="programma" className="bg-surface scroll-mt-24" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-accent text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            Hoe het werkt
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.1] tracking-[-0.025em] mb-16"
            style={{ fontSize: 'clamp(28px, 3.4vw, 48px)' }}
          >
            Elke fase levert meer bewijs op.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-border">
            {STEPS.map((s, i) => {
              const Icon = s.icon
              return (
                <div
                  key={s.title}
                  className="border-b border-border py-10 lg:px-10 lg:first:pl-0 lg:[&:nth-child(3n)]:pr-0 lg:[&:nth-child(3n+1)]:pl-0"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <Icon className="w-5 h-5 text-accent" />
                    <span className="font-mono text-[11px] text-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-[18px] font-display font-bold text-primary mb-3 leading-tight">
                    {s.title}
                  </h3>
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
            Voor wie
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.1] tracking-[-0.025em] mb-16"
            style={{ fontSize: 'clamp(28px, 3.4vw, 48px)' }}
          >
            Een team dat elkaar aanvult.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {AUDIENCE.map((a) => {
              const Icon = a.icon
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
                Waarom Stevin
              </p>
              <h2
                className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em]"
                style={{ fontSize: 'clamp(30px, 3.6vw, 50px)', maxWidth: '16ch' }}
              >
                Een werkend product is niet genoeg.
              </h2>
            </div>
            <div className="space-y-5 text-[17px] text-white/60 leading-[1.65] max-w-xl">
              <p>
                Stevin brengt marketing en sales kennis in waar veel AI-teams tekortkomen. Je hebt
                een scherpe koper nodig, een duidelijk probleem, een overtuigende propositie en een
                route naar de eerste klanten.
              </p>
              <p className="text-white font-medium">Daar zit onze kracht.</p>
              <p>
                We helpen niet alleen met bouwen, maar vooral met bewijzen dat er markt is.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERESSE / INTAKE-FORMULIER ── */}
      <section id="interesse" className="bg-surface scroll-mt-24" style={{ padding: '110px 24px' }}>
        <div className="mx-auto max-w-[760px]">
          <div className="text-center mb-12">
            <h2
              className="font-display font-extrabold text-primary leading-[1.1] tracking-[-0.025em] mb-5"
              style={{ fontSize: 'clamp(28px, 3.6vw, 48px)' }}
            >
              Heb je een AI-idee, een marktprobleem of een team dat wil bouwen?
            </h2>
            <p className="text-[18px] text-muted leading-[1.6] max-w-xl mx-auto">
              Meld je interesse voor Stevin Venture Lab. Vertel ons wie je bent, welk probleem je
              ziet en wat je zoekt.
            </p>
          </div>
          <VentureLabForm />
        </div>
      </section>
    </main>
  )
}
