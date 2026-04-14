'use client'

import { useState, useEffect, useCallback } from 'react'

// ── Scenario data ──

interface FeedLine {
  text: string
  color: 'pink' | 'blue' | 'neon' | 'muted' | 'white'
  prefix?: string
  delay: number // ms after scenario start
  mono?: boolean
}

const SCENARIOS: FeedLine[][] = [
  // Scenario 1: Creative Fatigue Detection (Agency / Creative Bureau)
  [
    { text: 'Scanning 12 ad accounts...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: 'Creative fatigue detected', color: 'pink', prefix: '!', delay: 800 },
    { text: 'Hero Banner Q1 — CTR gedaald met 34%', color: 'pink', delay: 1200 },
    { text: 'CPC gestegen van €0.42 naar €0.68', color: 'pink', delay: 1800 },
    { text: 'Growth Multiplier: 1.8x op Instagram Reels', color: 'blue', prefix: '~', delay: 2600 },
    { text: 'Verschuif €2.400 van Facebook Feed naar Reels', color: 'neon', prefix: '\u2192', delay: 3400 },
    { text: 'Geschatte uplift: +€4.320 ROAS per maand', color: 'neon', prefix: '\u2713', delay: 4200 },
  ],
  // Scenario 2: Artist / Music — Social Pulse
  [
    { text: 'Social pulse scan actief...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: '4.812 comments geanalyseerd in 24u', color: 'muted', prefix: '>', delay: 700, mono: true },
    { text: 'Viral moment gedetecteerd: TikTok duet +340%', color: 'pink', prefix: '!', delay: 1400 },
    { text: 'Sentiment: 92% positief, "obsessed" trending', color: 'blue', prefix: '~', delay: 2100 },
    { text: 'Spotify saves +28% in regio Randstad', color: 'blue', delay: 2700 },
    { text: 'Push geo-targeted ads Randstad + België', color: 'neon', prefix: '\u2192', delay: 3400 },
    { text: 'Momentum window: 48u — campagne klaargezet', color: 'neon', prefix: '\u2713', delay: 4200 },
  ],
  // Scenario 3: Performance Agency — Cross-Channel Attribution
  [
    { text: 'Cross-channel analyse gestart...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: '6 kanalen geëvalueerd voor klant: Moda', color: 'muted', prefix: '>', delay: 700, mono: true },
    { text: 'Google claimt 142 conversies, GA4 ziet er 89', color: 'pink', prefix: '!', delay: 1400 },
    { text: 'Meta attribution gap: 38% overclaim', color: 'pink', delay: 2000 },
    { text: 'Werkelijke incrementele ROAS: 2.4x (niet 4.1x)', color: 'blue', prefix: '~', delay: 2800 },
    { text: 'Schaal TikTok op, dim Google Shopping -20%', color: 'neon', prefix: '\u2192', delay: 3500 },
    { text: 'Projected savings: €6.800/maand bij gelijke omzet', color: 'neon', prefix: '\u2713', delay: 4300 },
  ],
  // Scenario 4: Competitor Intelligence
  [
    { text: 'Competitor scan actief...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: 'Nieuwe campagne gedetecteerd: concurrent A', color: 'blue', prefix: '~', delay: 800 },
    { text: '14 nieuwe creatives in laatste 7 dagen', color: 'blue', delay: 1300 },
    { text: 'Dominant format: UGC video (9/14)', color: 'blue', delay: 1900 },
    { text: 'Share of Search: jullie merk -12%', color: 'pink', prefix: '!', delay: 2700 },
    { text: 'Start UGC-test met bestaand budget', color: 'neon', prefix: '\u2192', delay: 3500 },
    { text: 'Brief gegenereerd en klaar voor review', color: 'neon', prefix: '\u2713', delay: 4300 },
  ],
  // Scenario 5: Budget Optimization (Portfolio)
  [
    { text: 'Portfolio-analyse gestart...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: '8 klantaccounts geanalyseerd', color: 'muted', prefix: '>', delay: 700, mono: true },
    { text: 'Saturatie bereikt: Google Search (klant: Vosso)', color: 'pink', prefix: '!', delay: 1400 },
    { text: 'Elke extra euro levert maar €0.40 op', color: 'pink', delay: 2000 },
    { text: 'TikTok Ads: onbenut potentieel bij 3 klanten', color: 'blue', prefix: '~', delay: 2800 },
    { text: 'Herverdeel €8.200 naar onderverzadigde kanalen', color: 'neon', prefix: '\u2192', delay: 3600 },
    { text: 'Portfolio-uplift: +23% gemiddelde ROAS', color: 'neon', prefix: '\u2713', delay: 4400 },
  ],
  // Scenario 6: Artist — Pre-Save & Release Intelligence
  [
    { text: 'Release monitor actief...', color: 'muted', prefix: '>', delay: 0, mono: true },
    { text: 'Pre-save rate: 12.4% (benchmark: 8%)', color: 'blue', prefix: '~', delay: 800 },
    { text: 'Top regio: België 34%, NL 28%, Duitsland 18%', color: 'blue', delay: 1400 },
    { text: 'Drop-off na dag 3: -45% engagement', color: 'pink', prefix: '!', delay: 2200 },
    { text: 'Retarget pre-savers met behind-the-scenes', color: 'neon', prefix: '\u2192', delay: 3000 },
    { text: 'Playlist pitch brief gegenereerd (12 curators)', color: 'neon', prefix: '\u2192', delay: 3700 },
    { text: 'Verwacht: +180K streams in eerste week', color: 'neon', prefix: '\u2713', delay: 4400 },
  ],
  // Scenario 7: Performance — E-commerce Funnel
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

export default function IntelligenceFeed() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [typingLine, setTypingLine] = useState<number>(-1)
  const [typedChars, setTypedChars] = useState<number>(0)
  const [fading, setFading] = useState(false)

  const scenario = SCENARIOS[scenarioIndex]

  const startScenario = useCallback(() => {
    setVisibleLines(0)
    setTypingLine(-1)
    setTypedChars(0)
    setFading(false)

    // Schedule each line appearance
    scenario.forEach((line, i) => {
      setTimeout(() => {
        setTypingLine(i)
        setTypedChars(0)
      }, line.delay)
    })

    // After last line, wait then fade
    const lastDelay = scenario[scenario.length - 1].delay
    setTimeout(() => {
      setFading(true)
    }, lastDelay + 3000)

    // Switch scenario
    setTimeout(() => {
      setScenarioIndex((prev) => (prev + 1) % SCENARIOS.length)
    }, lastDelay + 3800)
  }, [scenario])

  // Typewriter effect
  useEffect(() => {
    if (typingLine < 0 || typingLine >= scenario.length) return

    const line = scenario[typingLine]
    const fullText = line.text

    if (typedChars >= fullText.length) {
      // Line complete, mark as visible
      setVisibleLines((prev) => Math.max(prev, typingLine + 1))
      return
    }

    // Type speed: faster for muted/mono lines
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
          // Fully visible previous lines
          if (i < visibleLines && i !== typingLine) {
            return (
              <FeedLine key={`${scenarioIndex}-${i}`} line={line} />
            )
          }

          // Currently typing line
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

          // Not yet visible
          return null
        })}
      </div>

      {/* Bottom status bar */}
      <div className="px-4 py-2 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[10px] text-white/15 font-mono">
          {scenarioIndex + 1}/{SCENARIOS.length} scenario&apos;s
        </span>
        <div className="flex gap-1">
          {SCENARIOS.map((_, i) => (
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

function FeedLine({ line }: { line: FeedLine }) {
  return (
    <div className="flex items-start gap-2 animate-fadeIn">
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
