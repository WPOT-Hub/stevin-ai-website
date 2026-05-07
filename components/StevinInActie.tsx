'use client'

/**
 * StevinInActie — push-flow signaal-kaarten voor homepage.
 *
 * Anti-Swoep statement: niet "vraag → antwoord", maar "signaal → diagnose → advies".
 * Stevin schreeuwt op tijd, je hoeft niets te vragen.
 *
 * Canon: één accent (blauw), geen categorische kleur, mono labels uppercase,
 * navy-card op surface-achtergrond, géén shadows, radius 12px.
 */

import { useEffect, useState } from 'react'

type Trend = readonly number[]

type SignalCard = {
  id: string
  channel: string
  timestamp: string
  signaal: { kpi: string; delta: string; trend: Trend; trendDirection: 'up' | 'down' }
  diagnose: { headline: string; detail: string }
  advies: string
}

const CARDS: SignalCard[] = [
  {
    id: 'creative-wear-out',
    channel: 'META · PROSPECTING',
    timestamp: 'maandag 09:14',
    signaal: {
      kpi: 'CPA',
      delta: '+42%',
      trend: [22, 24, 23, 25, 28, 33, 38, 44],
      trendDirection: 'up',
    },
    diagnose: {
      headline: 'Creative wear-out.',
      detail:
        '"Summer Sale"-video is in 4 dagen opgebrand. Frequency 5,3 · thumbstop-ratio van 31% naar 12%.',
    },
    advies:
      'Pauzeer deze video. Roteer naar B-versies (andere hook) uit de asset-library.',
  },
  {
    id: 'budget-burn',
    channel: 'GOOGLE ADS · PMAX',
    timestamp: 'woensdag 14:30',
    signaal: {
      kpi: 'budget burn',
      delta: '+60%',
      trend: [12, 18, 25, 35, 48, 60, 72, 84],
      trendDirection: 'up',
    },
    diagnose: {
      headline: 'CPC-spike door concurrentie.',
      detail:
        'Categorie "Zomerschoenen": concurrent biedt agressief sinds 11:00. ROAS daalt van 4,2 naar 2,8.',
    },
    advies:
      'Verlaag target-ROAS tijdelijk of sluit categorie 48 uur uit om budget te beschermen.',
  },
  {
    id: 'tracking-error',
    channel: 'GA4 · IOS',
    timestamp: 'vrijdag 08:15',
    signaal: {
      kpi: 'conversies iOS',
      delta: '−85%',
      trend: [88, 90, 92, 89, 87, 22, 18, 14],
      trendDirection: 'down',
    },
    diagnose: {
      headline: 'GTM-container faalt na deploy.',
      detail:
        'Tag-firing rate iOS van 94% naar 9% sinds website-update gisteravond 22:40. Ad-spend loopt door.',
    },
    advies:
      'Pauzeer alle retargeting tot dev de GTM-container heeft gefixt. Check Tag Assistant op iOS-Safari.',
  },
  {
    id: 'lead-quality',
    channel: 'LINKEDIN · HUBSPOT',
    timestamp: 'dinsdag 16:45',
    signaal: {
      kpi: 'MQL-ratio',
      delta: '−68%',
      trend: [32, 30, 29, 25, 18, 12, 8, 4],
      trendDirection: 'down',
    },
    diagnose: {
      headline: 'Brede targeting trekt junior-leads.',
      detail:
        'Lead-volume +31% maar 64% nieuwe leads heeft job-title "Student" of "Intern" in HubSpot.',
    },
    advies:
      'Voeg "Student" en "Intern" toe aan negatieve targeting in LinkedIn Campaign Manager.',
  },
]

// ── Mini sparkline (no library) ────────────────────────────────────────
function Sparkline({
  values,
  direction,
}: {
  values: Trend
  direction: 'up' | 'down'
}) {
  const w = 120
  const h = 36
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const stepX = w / (values.length - 1)
  const points = values
    .map((v, i) => `${i * stepX},${h - ((v - min) / range) * h}`)
    .join(' ')

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="flex-shrink-0"
      aria-hidden="true"
    >
      <polyline
        fill="none"
        stroke="#5DA3FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      {/* End-dot */}
      <circle
        cx={(values.length - 1) * stepX}
        cy={h - ((values[values.length - 1] - min) / range) * h}
        r="2.5"
        fill="#5DA3FF"
      />
    </svg>
  )
}

// ── Single card ────────────────────────────────────────────────────────
function Card({ card, animationDelay }: { card: SignalCard; animationDelay: number }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), animationDelay)
    return () => clearTimeout(t)
  }, [animationDelay])

  return (
    <article
      className="rounded-[12px] border border-white/10 bg-[#0F1D34] p-7 transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Top — channel + timestamp */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-[10px] tracking-[0.12em] text-[#A3ABB8]">
          {card.channel}
        </span>
        <span className="font-mono text-[10px] tracking-[0.08em] text-[#6A7587]">
          {card.timestamp}
        </span>
      </div>

      {/* Signaal row */}
      <div className="mb-6">
        <p className="font-mono text-[10px] tracking-[0.16em] text-[#5DA3FF] uppercase mb-2">
          Signaal
        </p>
        <div className="flex items-end justify-between gap-4">
          <div className="flex items-baseline gap-3 min-w-0">
            <span
              className="font-display font-semibold text-white text-[28px] leading-none whitespace-nowrap"
              style={{ letterSpacing: '-0.02em' }}
            >
              {card.signaal.delta}
            </span>
            <span className="text-[#A3ABB8] text-[14px] truncate">
              {card.signaal.kpi}
            </span>
          </div>
          <Sparkline values={card.signaal.trend} direction={card.signaal.trendDirection} />
        </div>
      </div>

      {/* Diagnose */}
      <div className="mb-6">
        <p className="font-mono text-[10px] tracking-[0.16em] text-[#5DA3FF] uppercase mb-2">
          Diagnose
        </p>
        <p className="text-white text-[15px] font-medium leading-snug mb-1">
          {card.diagnose.headline}
        </p>
        <p className="text-[#A3ABB8] text-[13px] leading-relaxed">
          {card.diagnose.detail}
        </p>
      </div>

      {/* Advies — accent border-left, géén linker streep op de hele card maar wél hier
         als visuele "actie"-marker (kleine uitzondering binnen card) */}
      <div className="border-t border-white/8 pt-5">
        <p className="font-mono text-[10px] tracking-[0.16em] text-[#5DA3FF] uppercase mb-2">
          Advies
        </p>
        <p className="text-white text-[14px] leading-relaxed">{card.advies}</p>
      </div>
    </article>
  )
}

// ── Section ────────────────────────────────────────────────────────────
export default function StevinInActie() {
  return (
    <section
      className="bg-[#0A1628] text-white"
      style={{ padding: '112px 24px' }}
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Heading */}
        <div className="mb-16 max-w-[720px]">
          <p className="text-[#5DA3FF] text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            Stevin in actie
          </p>
          <h2
            className="font-display font-extrabold text-white m-0 mb-6"
            style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', letterSpacing: '-0.03em', lineHeight: '1.08' }}
          >
            Een chat-tool wacht tot jij vraagt. Stevin schreeuwt op tijd.
          </h2>
          <p className="text-[#A3ABB8] text-[17px] leading-[1.6] max-w-[640px]">
            Geen zoekbalk, geen dashboard om elke ochtend te openen. Stevin scant 24/7 je
            paid en owned media en tikt je zodra er omzet, marge of merkwaarde weglekt —
            mét diagnose en concrete actie.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CARDS.map((card, i) => (
            <Card key={card.id} card={card} animationDelay={i * 180} />
          ))}
        </div>

        {/* Closing line */}
        <p className="mt-14 text-[#6A7587] text-[13px] font-mono tracking-[0.04em] max-w-[720px]">
          Voorbeelden uit echte klant-flows. Diagnose en advies komen van Stevin's
          Causality Engine — niet uit een dashboard, niet op aanvraag.
        </p>
      </div>
    </section>
  )
}
