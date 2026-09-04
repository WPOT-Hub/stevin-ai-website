'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

// ── Types ──

interface FeedLine {
  text: string
  color: 'pink' | 'blue' | 'neon' | 'muted' | 'white'
  prefix?: string
  delay: number
  mono?: boolean
}

export type FeedVariant = 'all' | 'marketing' | 'artist' | 'fmcg' | 'retail'

// ── Scenario pools ──

const MARKETING_SCENARIOS: FeedLine[][] = [
  // Creative Fatigue Detection
  [
    { text: 'Scanning 12 ad accounts...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: 'Creative fatigue detected', color: 'pink', prefix: '!', delay: 800 },
    { text: 'Hero Banner Q1: CTR gedaald met 34%', color: 'pink', delay: 1200 },
    { text: 'CPC gestegen van €0.42 naar €0.68', color: 'pink', delay: 1800 },
    { text: 'Growth Multiplier: 1.8x op Instagram Reels', color: 'blue', prefix: '~', delay: 2600 },
    { text: 'Verschuif €2.400 van Facebook Feed naar Reels', color: 'neon', prefix: '\u2192', delay: 3400 },
    { text: 'Geschatte uplift: +€4.320 ROAS per maand', color: 'neon', prefix: '\u2713', delay: 4200 },
  ],
  // Cross-Channel Attribution
  [
    { text: 'Cross-channel analyse gestart...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: '6 kanalen geevalueerd voor klant: Moda', color: 'muted', prefix: '>', delay: 700, mono: true },
    { text: 'Google claimt 142 conversies, GA4 ziet er 89', color: 'pink', prefix: '!', delay: 1400 },
    { text: 'Meta overclaimt: 38% meer dan GA4 ziet', color: 'pink', delay: 2000 },
    { text: 'Werkelijke uplift-ROAS: 2.4x (niet 4.1x)', color: 'blue', prefix: '~', delay: 2800 },
    { text: 'Schaal TikTok op, dim Google Shopping -20%', color: 'neon', prefix: '\u2192', delay: 3500 },
    { text: 'Projected savings: €6.800/maand bij gelijke omzet', color: 'neon', prefix: '\u2713', delay: 4300 },
  ],
  // Competitor Intelligence
  [
    { text: 'Competitor scan actief...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: 'Nieuwe campagne gedetecteerd: concurrent A', color: 'blue', prefix: '~', delay: 800 },
    { text: '14 nieuwe creatives in laatste 7 dagen', color: 'blue', delay: 1300 },
    { text: 'Dominant format: UGC video (9/14)', color: 'blue', delay: 1900 },
    { text: 'Share of Search: jullie merk -12%', color: 'pink', prefix: '!', delay: 2700 },
    { text: 'Start UGC-test met bestaand budget', color: 'neon', prefix: '\u2192', delay: 3500 },
    { text: 'Brief gegenereerd en klaar voor review', color: 'neon', prefix: '\u2713', delay: 4300 },
  ],
  // Budget Optimization
  [
    { text: 'Portfolio-analyse gestart...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: '8 klantaccounts geanalyseerd', color: 'muted', prefix: '>', delay: 700, mono: true },
    { text: 'Saturatie bereikt: Google Search (klant: Vosso)', color: 'pink', prefix: '!', delay: 1400 },
    { text: 'Elke extra euro levert maar €0.40 op', color: 'pink', delay: 2000 },
    { text: 'TikTok Ads: onbenut potentieel bij 3 klanten', color: 'blue', prefix: '~', delay: 2800 },
    { text: 'Herverdeel €8.200 naar onderverzadigde kanalen', color: 'neon', prefix: '\u2192', delay: 3600 },
    { text: 'Portfolio-uplift: +23% gemiddelde ROAS', color: 'neon', prefix: '\u2713', delay: 4400 },
  ],
  // E-commerce Funnel
  [
    { text: 'Funnel-analyse draait...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: 'Checkout abandonment: 72% (benchmark: 65%)', color: 'pink', prefix: '!', delay: 800 },
    { text: 'Piekmoment drop-off: stap 3 (verzendkosten)', color: 'pink', delay: 1400 },
    { text: 'A/B test "gratis verzending >€50": +18% CVR', color: 'blue', prefix: '~', delay: 2200 },
    { text: 'DPA retargeting vertoont ad fatigue na dag 5', color: 'pink', prefix: '!', delay: 2900 },
    { text: 'Roteer DPA creatives, activeer abandon flow', color: 'neon', prefix: '\u2192', delay: 3600 },
    { text: 'Geschatte extra omzet: €14.200/maand', color: 'neon', prefix: '\u2713', delay: 4300 },
  ],
]

const ARTIST_SCENARIOS: FeedLine[][] = [
  // Social Pulse
  [
    { text: 'Social pulse scan actief...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: '4.812 comments geanalyseerd in 24u', color: 'muted', prefix: '>', delay: 700, mono: true },
    { text: 'Viral moment gedetecteerd: TikTok duet +340%', color: 'pink', prefix: '!', delay: 1400 },
    { text: 'Sentiment: 92% positief, "obsessed" trending', color: 'blue', prefix: '~', delay: 2100 },
    { text: 'Spotify saves +28% in regio Randstad', color: 'blue', delay: 2700 },
    { text: 'Push geo-targeted ads Randstad + Belgie', color: 'neon', prefix: '\u2192', delay: 3400 },
    { text: 'Momentum window: 48u, campagne klaargezet', color: 'neon', prefix: '\u2713', delay: 4200 },
  ],
  // Release Intelligence
  [
    { text: 'Release monitor actief...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: 'Pre-save rate: 12.4% (benchmark: 8%)', color: 'blue', prefix: '~', delay: 800 },
    { text: 'Top regio: Belgie 34%, NL 28%, Duitsland 18%', color: 'blue', delay: 1400 },
    { text: 'Drop-off na dag 3: -45% engagement', color: 'pink', prefix: '!', delay: 2200 },
    { text: 'Retarget pre-savers met behind-the-scenes', color: 'neon', prefix: '\u2192', delay: 3000 },
    { text: 'Playlist pitch brief gegenereerd (12 curators)', color: 'neon', prefix: '\u2192', delay: 3700 },
    { text: 'Verwacht: +180K streams in eerste week', color: 'neon', prefix: '\u2713', delay: 4400 },
  ],
  // Fan Engagement Filter
  [
    { text: 'Fan-bridge filter actief...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: '2.340 DM\'s en comments gescand', color: 'muted', prefix: '>', delay: 700, mono: true },
    { text: '95% emoji-ruis weggefilterd', color: 'blue', prefix: '~', delay: 1300 },
    { text: '12 track-ID requests gedetecteerd', color: 'blue', delay: 1900 },
    { text: '3 merch-vragen, 1 booking request', color: 'blue', delay: 2500 },
    { text: 'Concept-replies gegenereerd in jouw tone of voice', color: 'neon', prefix: '\u2192', delay: 3200 },
    { text: 'Antwoordtijd: van 4 uur naar 30 seconden', color: 'neon', prefix: '\u2713', delay: 4000 },
  ],
  // Geo-Hype Detection
  [
    { text: 'Geo-hype analyse draait...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: 'Luistercijfers per regio opgehaald', color: 'muted', prefix: '>', delay: 700, mono: true },
    { text: 'Onverwachte piek: Antwerpen +180% in 48u', color: 'pink', prefix: '!', delay: 1400 },
    { text: 'Bron: lokale playlist placement + radio spin', color: 'blue', prefix: '~', delay: 2100 },
    { text: 'Instagram engagement Antwerpen: 3.2x gemiddeld', color: 'blue', delay: 2700 },
    { text: 'Plan pop-up show Antwerpen, push merch campagne', color: 'neon', prefix: '\u2192', delay: 3400 },
    { text: 'Booking agent genotificeerd met data-brief', color: 'neon', prefix: '\u2713', delay: 4200 },
  ],
]

// Homepage mixes both
const ALL_SCENARIOS = [...MARKETING_SCENARIOS.slice(0, 3), ...ARTIST_SCENARIOS.slice(0, 2), ...MARKETING_SCENARIOS.slice(3)]


// FMCG-scenario's, geschreven 4 sep 2026 voor /fmcg.
// BEWUST GEEN verzonnen eurobedragen, anders dan de oudere scenario's hierboven.
// Die pagina staat of valt met controleerbaarheid, en scenario 1 is letterlijk
// de scan die op 4 sep gedraaid heeft (docs/research/vindbaarheidsscans/).
// Ook bewust geen regel die suggereert dat we retailerportalen koppelen: twee
// secties lager op die pagina staat expliciet dat we dat niet doen.
const FMCG_SCENARIOS: FeedLine[][] = [
  [
    { text: 'AI-zichtbaarheid, categorie supermarkt...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: '7 koopvragen, geen merknaam erin', color: 'muted', prefix: '>', delay: 1000, mono: true },
    { text: 'Eigen site als bron: 0 van 7', color: 'pink', prefix: '!', delay: 2000 },
    { text: 'Wel geciteerd: ah.nl, jumbo.com', color: 'pink', delay: 3000 },
    { text: 'De retailer geeft het antwoord', color: 'blue', prefix: '~', delay: 4000 },
    { text: 'Bouw op de vragen die zij stellen', color: 'neon', prefix: '\u2192', delay: 5000 },
    { text: 'Nulmeting vast, over 90 dagen opnieuw', color: 'neon', prefix: '\u2713', delay: 6000 },
  ],
  [
    { text: 'Zoekvraag: categorie versus merk...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: 'Categorievolume loopt 3 weken op', color: 'blue', prefix: '~', delay: 1000 },
    { text: 'Jouw merkvolume blijft vlak', color: 'pink', prefix: '!', delay: 2000 },
    { text: '2 concurrenten nieuw in het register', color: 'pink', delay: 3000 },
    { text: 'Zij bieden op categorie, niet op merk', color: 'blue', prefix: '~', delay: 4000 },
    { text: 'Meelopen met de piek, niet erna', color: 'neon', prefix: '\u2192', delay: 5000 },
    { text: 'Besluit en reden vastgelegd', color: 'neon', prefix: '\u2713', delay: 6000 },
  ],
  [
    { text: 'Kwartaalcijfers samenvoegen...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: '7 rapportages van de klant', color: 'muted', prefix: '>', delay: 1000, mono: true },
    { text: '7 verschillende attributievensters', color: 'pink', prefix: '!', delay: 2000 },
    { text: 'Optellen geeft een leeg getal', color: 'pink', delay: 3000 },
    { text: 'Omgerekend naar een definitie', color: 'blue', prefix: '~', delay: 4000 },
    { text: 'Verschil per retailer, met de reden', color: 'neon', prefix: '\u2192', delay: 5000 },
    { text: 'Definitie blijft, ook na ons', color: 'neon', prefix: '\u2713', delay: 6000 },
  ],
]

// Retail-scenario's, geschreven 4 sep 2026 voor /retail. Zelfde regel als bij
// FMCG: geen verzonnen eurobedragen en geen regel die suggereert dat we
// kassadata of retailmedia-portalen koppelen, want de pagina zelf zegt twee
// secties lager dat we dat niet doen. Scenario 1 is de scan die op 4 sep echt
// gedraaid heeft (docs/research/vindbaarheidsscans/blokker-nl-2026-09-04.json).
const RETAIL_SCENARIOS: FeedLine[][] = [
  [
    { text: 'AI-zichtbaarheid, winkelketen huishoud...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: '13 koopvragen, 12 zonder merknaam', color: 'muted', prefix: '>', delay: 1000, mono: true },
    { text: 'Eigen site als bron: 0 van 13', color: 'pink', prefix: '!', delay: 2000 },
    { text: 'Wel geciteerd: vier kleine kookwinkels', color: 'pink', delay: 3000 },
    { text: 'Zelfs de vraag over eigen acties: foldersites', color: 'blue', prefix: '~', delay: 4000 },
    { text: 'Bouw op de vragen die kopers stellen', color: 'neon', prefix: '\u2192', delay: 5000 },
    { text: 'Nulmeting vast, over 90 dagen opnieuw', color: 'neon', prefix: '\u2713', delay: 6000 },
  ],
  [
    { text: 'Zoekvraag per regio vergeleken...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: 'Categorievraag stijgt in twee regio\'s', color: 'blue', prefix: '~', delay: 1000 },
    { text: 'Budget staat landelijk gelijk verdeeld', color: 'pink', prefix: '!', delay: 2000 },
    { text: 'Vestigingen daar draaien onder bereik', color: 'pink', delay: 3000 },
    { text: 'Verschuif naar waar de vraag beweegt', color: 'neon', prefix: '\u2192', delay: 4000 },
    { text: 'Eerst een vestiging, dan pas breder', color: 'neon', prefix: '\u2192', delay: 5000 },
    { text: 'Besluit en reden vastgelegd', color: 'neon', prefix: '\u2713', delay: 6000 },
  ],
  [
    { text: 'Actieweek nagerekend, webshop...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: 'Omzet in de actieweek: fors omhoog', color: 'blue', prefix: '~', delay: 1000 },
    { text: 'Grotendeels terugkerende kopers', color: 'pink', prefix: '!', delay: 2000 },
    { text: 'Week erna zakt de omzet onder normaal', color: 'pink', delay: 3000 },
    { text: 'Marge erbij gezet, niet alleen omzet', color: 'blue', prefix: '~', delay: 4000 },
    { text: 'Volgende keer een niet-prijsactie ernaast', color: 'neon', prefix: '\u2192', delay: 5000 },
    { text: 'Vastgelegd, inclusief wat niet werkte', color: 'neon', prefix: '\u2713', delay: 6000 },
  ],
]

// Engelse pools. De feed stond op /en in het Nederlands (gemeld 4 sep 2026).
// Alleen fmcg en retail zijn echt vertaald, want alleen die twee varianten
// staan op een pagina; de rest valt terug op de Nederlandse pool zolang hij
// nergens gebruikt wordt. Zet je zo'n variant wel op een pagina, vertaal hem
// dan hier eerst.
const FMCG_SCENARIOS_EN: FeedLine[][] = [
  [
    { text: 'AI visibility, supermarket category...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: '7 buying questions, no brand name in them', color: 'muted', prefix: '>', delay: 1000, mono: true },
    { text: 'Own site as a source: 0 of 7', color: 'pink', prefix: '!', delay: 2000 },
    { text: 'Cited instead: ah.nl, jumbo.com', color: 'pink', delay: 3000 },
    { text: 'The retailer gives the answer', color: 'blue', prefix: '~', delay: 4000 },
    { text: 'Build on the questions they ask', color: 'neon', prefix: '\u2192', delay: 5000 },
    { text: 'Baseline fixed, repeat in 90 days', color: 'neon', prefix: '\u2713', delay: 6000 },
  ],
  [
    { text: 'Search demand: category versus brand...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: 'Category volume rising for 3 weeks', color: 'blue', prefix: '~', delay: 1000 },
    { text: 'Your brand volume stays flat', color: 'pink', prefix: '!', delay: 2000 },
    { text: '2 competitors new in the ad register', color: 'pink', delay: 3000 },
    { text: 'They bid on category, not on brand', color: 'blue', prefix: '~', delay: 4000 },
    { text: 'Ride the peak, not the week after', color: 'neon', prefix: '\u2192', delay: 5000 },
    { text: 'Decision and reason recorded', color: 'neon', prefix: '\u2713', delay: 6000 },
  ],
  [
    { text: 'Merging quarterly numbers...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: '7 reports from the client', color: 'muted', prefix: '>', delay: 1000, mono: true },
    { text: '7 different attribution windows', color: 'pink', prefix: '!', delay: 2000 },
    { text: 'Adding them up gives an empty number', color: 'pink', delay: 3000 },
    { text: 'Converted to one definition', color: 'blue', prefix: '~', delay: 4000 },
    { text: 'Difference per retailer, with the reason', color: 'neon', prefix: '\u2192', delay: 5000 },
    { text: 'The definition stays, also after us', color: 'neon', prefix: '\u2713', delay: 6000 },
  ],
]

const RETAIL_SCENARIOS_EN: FeedLine[][] = [
  [
    { text: 'AI visibility, household goods chain...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: '13 buying questions, 12 without the name', color: 'muted', prefix: '>', delay: 1000, mono: true },
    { text: 'Own site as a source: 0 of 13', color: 'pink', prefix: '!', delay: 2000 },
    { text: 'Cited instead: four small cookware shops', color: 'pink', delay: 3000 },
    { text: 'Even its own promotions: leaflet sites', color: 'blue', prefix: '~', delay: 4000 },
    { text: 'Build on the questions buyers ask', color: 'neon', prefix: '\u2192', delay: 5000 },
    { text: 'Baseline fixed, repeat in 90 days', color: 'neon', prefix: '\u2713', delay: 6000 },
  ],
  [
    { text: 'Search demand compared by region...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: 'Category demand rising in two regions', color: 'blue', prefix: '~', delay: 1000 },
    { text: 'Budget is spread evenly nationwide', color: 'pink', prefix: '!', delay: 2000 },
    { text: 'Stores there run below their reach', color: 'pink', delay: 3000 },
    { text: 'Shift to where demand is moving', color: 'neon', prefix: '\u2192', delay: 4000 },
    { text: 'One store first, then wider', color: 'neon', prefix: '\u2192', delay: 5000 },
    { text: 'Decision and reason recorded', color: 'neon', prefix: '\u2713', delay: 6000 },
  ],
  [
    { text: 'Promotion week recalculated, webshop...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: 'Revenue in the promotion week: well up', color: 'blue', prefix: '~', delay: 1000 },
    { text: 'Largely returning buyers', color: 'pink', prefix: '!', delay: 2000 },
    { text: 'Week after drops below normal', color: 'pink', delay: 3000 },
    { text: 'Margin added, not revenue alone', color: 'blue', prefix: '~', delay: 4000 },
    { text: 'Next time a non-price promotion beside it', color: 'neon', prefix: '\u2192', delay: 5000 },
    { text: 'Recorded, including what did not work', color: 'neon', prefix: '\u2713', delay: 6000 },
  ],
]

const SCENARIO_MAP: Record<FeedVariant, FeedLine[][]> = {
  all: ALL_SCENARIOS,
  marketing: MARKETING_SCENARIOS,
  artist: ARTIST_SCENARIOS,
  fmcg: FMCG_SCENARIOS,
  retail: RETAIL_SCENARIOS,
}

const SCENARIO_MAP_EN: Record<FeedVariant, FeedLine[][]> = {
  all: ALL_SCENARIOS,
  marketing: MARKETING_SCENARIOS,
  artist: ARTIST_SCENARIOS,
  fmcg: FMCG_SCENARIOS_EN,
  retail: RETAIL_SCENARIOS_EN,
}

// ── Color mapping ──

const COLOR_MAP = {
  pink: 'text-[#F4216A]',
  blue: 'text-[#3D8EFF]',
  neon: 'text-[#00D4A0]',
  muted: 'text-white/40',
  white: 'text-white/70',
}

const PREFIX_COLOR_MAP = {
  pink: 'text-[#F4216A]/60',
  blue: 'text-[#3D8EFF]/60',
  neon: 'text-[#00D4A0]/60',
  muted: 'text-white/25',
  white: 'text-white/40',
}

// ── Component ──

interface IntelligenceFeedProps {
  variant?: FeedVariant
  locale?: string
}

export default function IntelligenceFeed({ variant = 'all', locale = 'nl' }: IntelligenceFeedProps) {
  const scenarios = locale === 'en' ? SCENARIO_MAP_EN[variant] : SCENARIO_MAP[variant]
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [typingLine, setTypingLine] = useState<number>(-1)
  const [typedChars, setTypedChars] = useState<number>(0)
  const [fading, setFading] = useState(false)

  const scenario = scenarios[scenarioIndex]

  // De timers werden nooit opgeruimd: bij een scenariowissel of een remount
  // bleven de oude lopen en zetten ze de typeteller van het nieuwe scenario op
  // nul. Opgeruimd op 4 sep 2026. Let op bij het testen: in een tab die niet
  // vooraan staat knijpt de browser setTimeout af tot een per seconde, en dan
  // lijkt de feed stuk terwijl er niets aan de hand is.
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  const startScenario = useCallback(() => {
    clearTimers()
    setVisibleLines(0)
    setTypingLine(-1)
    setTypedChars(0)
    setFading(false)

    scenario.forEach((line, i) => {
      timersRef.current.push(
        setTimeout(() => {
          setTypingLine(i)
          setTypedChars(0)
        }, line.delay),
      )
    })

    const lastDelay = scenario[scenario.length - 1].delay
    timersRef.current.push(
      setTimeout(() => {
        setFading(true)
      }, lastDelay + 3000),
    )

    timersRef.current.push(
      setTimeout(() => {
        setScenarioIndex((prev) => (prev + 1) % scenarios.length)
      }, lastDelay + 3800),
    )
  }, [scenario, scenarios.length, clearTimers])

  // Typewriter effect
  useEffect(() => {
    if (typingLine < 0 || typingLine >= scenario.length) return

    const line = scenario[typingLine]
    const fullText = line.text

    if (typedChars >= fullText.length) {
      setVisibleLines((prev) => Math.max(prev, typingLine + 1))
      return
    }

    const speed = line.mono ? 15 : 25
    const timer = setTimeout(() => {
      setTypedChars((prev) => prev + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [typingLine, typedChars, scenario])

  // Start/restart scenario cycle
  useEffect(() => {
    startScenario()
    return clearTimers
  }, [scenarioIndex, startScenario, clearTimers])

  return (
    <div
      className={`
        relative w-full max-w-lg mx-auto mt-8 lg:mt-0
        rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm
        overflow-hidden transition-opacity duration-700
        ${fading ? 'opacity-0' : 'opacity-100'}
      `}
    >
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#F4216A]/60" />
          <div className="w-2 h-2 rounded-full bg-[#FFB800]/60" />
          <div className="w-2 h-2 rounded-full bg-[#00D4A0]/60" />
        </div>
        <span className="text-[10px] font-medium text-white/20 ml-2 tracking-wide uppercase">Stevin Intelligence Feed</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4A0] animate-pulse" />
          <span className="text-[10px] text-white/25">Live</span>
        </div>
      </div>

      {/* Feed content */}
      <div className="px-4 py-4 space-y-2 min-h-[220px] sm:min-h-[240px] font-mono text-[12px] sm:text-[13px] leading-relaxed">
        {scenario.map((line, i) => {
          if (i < visibleLines && i !== typingLine) {
            return <FeedLineEl key={`${scenarioIndex}-${i}`} line={line} />
          }

          if (i === typingLine) {
            const partialText = line.text.slice(0, typedChars)
            return (
              <div key={`${scenarioIndex}-${i}`} className="flex items-start gap-2">
                {line.prefix && (
                  <span className={`flex-shrink-0 ${PREFIX_COLOR_MAP[line.color]}`}>
                    {line.prefix}
                  </span>
                )}
                <span className={`${COLOR_MAP[line.color]} ${line.mono ? 'opacity-60' : ''}`}>
                  {partialText}
                  <span className="inline-block w-[6px] h-[14px] bg-white/40 ml-[1px] animate-blink align-text-bottom" />
                </span>
              </div>
            )
          }

          return null
        })}
      </div>

      {/* Bottom status bar */}
      <div className="px-4 py-2 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[10px] text-white/15 font-mono">
          {scenarioIndex + 1}/{scenarios.length}
        </span>
        <div className="flex gap-1">
          {scenarios.map((_, i) => (
            <div
              key={i}
              className={`w-4 h-1 rounded-full transition-colors duration-300 ${
                i === scenarioIndex ? 'bg-[#3D8EFF]/60' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Sub-component ──

function FeedLineEl({ line }: { line: FeedLine }) {
  return (
    <div className="flex items-start gap-2">
      {line.prefix && (
        <span className={`flex-shrink-0 ${PREFIX_COLOR_MAP[line.color]}`}>
          {line.prefix}
        </span>
      )}
      <span className={`${COLOR_MAP[line.color]} ${line.mono ? 'opacity-60' : ''}`}>
        {line.text}
      </span>
    </div>
  )
}
