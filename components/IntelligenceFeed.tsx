'use client'

import { useState, useEffect, useCallback } from 'react'

// ── Types ──

interface FeedLine {
  text: string
  color: 'pink' | 'blue' | 'neon' | 'muted' | 'white'
  prefix?: string
  delay: number
  mono?: boolean
}

export type FeedVariant = 'all' | 'marketing' | 'artist'

// ── Scenario pools ──

const MARKETING_SCENARIOS: FeedLine[][] = [
  // Creative Fatigue Detection
  [
    { text: 'Scanning 12 ad accounts...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: 'Creative fatigue detected', color: 'pink', prefix: '!', delay: 800 },
    { text: 'Hero Banner Q1 — CTR gedaald met 34%', color: 'pink', delay: 1200 },
    { text: 'CPC gestegen van €0.42 naar €0.68', color: 'pink', delay: 1800 },
    { text: 'Growth Multiplier: 1.8x op Instagram Reels', color: 'blue', prefix: '~', delay: 2600 },
    { text: 'Verschuif €2.400 van Facebook Feed naar Reels', color: 'neon', prefix: '\u2192', delay: 3400 },
    { text: 'Geschatte uplift: +€4.320 ROAS per maand', color: 'neon', prefix: '\u2713', delay: 4200 },
  ],
  // Cross-Channel Attribution
  [
    { text: 'Cross-channel analyse gestart...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: '6 kanalen geëvalueerd voor klant: Moda', color: 'muted', prefix: '>', delay: 700, mono: true },
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
    { text: 'Push geo-targeted ads Randstad + België', color: 'neon', prefix: '\u2192', delay: 3400 },
    { text: 'Momentum window: 48u — campagne klaargezet', color: 'neon', prefix: '\u2713', delay: 4200 },
  ],
  // Release Intelligence
  [
    { text: 'Release monitor actief...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: 'Pre-save rate: 12.4% (benchmark: 8%)', color: 'blue', prefix: '~', delay: 800 },
    { text: 'Top regio: België 34%, NL 28%, Duitsland 18%', color: 'blue', delay: 1400 },
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

const SCENARIO_MAP: Record<FeedVariant, FeedLine[][]> = {
  all: ALL_SCENARIOS,
  marketing: MARKETING_SCENARIOS,
  artist: ARTIST_SCENARIOS,
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
}

export default function IntelligenceFeed({ variant = 'all' }: IntelligenceFeedProps) {
  const scenarios = SCENARIO_MAP[variant]
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [typingLine, setTypingLine] = useState<number>(-1)
  const [typedChars, setTypedChars] = useState<number>(0)
  const [fading, setFading] = useState(false)

  const scenario = scenarios[scenarioIndex]

  const startScenario = useCallback(() => {
    setVisibleLines(0)
    setTypingLine(-1)
    setTypedChars(0)
    setFading(false)

    scenario.forEach((line, i) => {
      setTimeout(() => {
        setTypingLine(i)
        setTypedChars(0)
      }, line.delay)
    })

    const lastDelay = scenario[scenario.length - 1].delay
    setTimeout(() => {
      setFading(true)
    }, lastDelay + 3000)

    setTimeout(() => {
      setScenarioIndex((prev) => (prev + 1) % scenarios.length)
    }, lastDelay + 3800)
  }, [scenario, scenarios.length])

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
  }, [scenarioIndex, startScenario])

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
