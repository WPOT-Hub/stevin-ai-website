'use client'

/**
 * StevinInActie: push-flow signaal-kaarten voor homepage.
 *
 * Anti-Swoep statement: niet "vraag → antwoord", maar "signaal → diagnose → advies".
 * Stevin schreeuwt op tijd, je hoeft niets te vragen.
 *
 * Canon: een accent (blauw), geen categorische kleur, mono labels uppercase,
 * navy-card op surface-achtergrond, geen shadows, radius 12px.
 */

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

type Trend = readonly number[]

type SignalCard = {
  id: string
  channel: string
  timestamp: string
  signaal: { kpi: string; delta: string; trend: Trend; trendDirection: 'up' | 'down' }
  diagnose: { headline: string; detail: string }
  advies: string
}

// ── Copy per locale ────────────────────────────────────────────────────
type Locale = 'nl' | 'en'

const HEADING_COPY: Record<Locale, {
  eyebrow: string
  h2Line1: string
  h2Line2: string
  sub: string
  labelSignal: string
  labelDiagnose: string
  labelAdvice: string
  outcome: { label: string; body: string }[]
}> = {
  nl: {
    eyebrow: 'Stevin in actie',
    h2Line1: 'Van afwijking naar advies.',
    h2Line2: 'Voordat jij het ziet.',
    sub: "Een chat-tool wacht tot jij vraagt. Stevin schreeuwt op tijd. 24/7 monitoring over je paid en owned media, met diagnose en concrete actie, voor de reguliere rapportage 't oppikt.",
    labelSignal: 'Signaal',
    labelDiagnose: 'Diagnose',
    labelAdvice: 'Advies',
    outcome: [
      {
        label: '24/7 monitoring',
        body: 'Geen dashboard om te openen. Stevin scant continu en tikt je zodra er ergens budget wordt verspild.',
      },
      {
        label: 'Diagnose met bewijs',
        body: 'Niet alleen "ROAS daalt", maar waarom. Frequency, thumbstop, GTM-firing, concurrent-bod. Stevin koppelt symptoom aan oorzaak.',
      },
      {
        label: 'Beslissingen wegnemen',
        body: 'Niet meer overleggen wat een grafiek betekent. Stevin levert het advies erbij, jij keurt goed of past aan.',
      },
    ],
  },
  en: {
    eyebrow: 'Stevin in action',
    h2Line1: 'From deviation to advice.',
    h2Line2: 'Before you see it.',
    sub: 'A chat tool waits for you to ask. Stevin shouts on time. 24/7 monitoring across your paid and owned media, with diagnosis and concrete action, before regular reporting catches it.',
    labelSignal: 'Signal',
    labelDiagnose: 'Diagnosis',
    labelAdvice: 'Action',
    outcome: [
      {
        label: '24/7 monitoring',
        body: 'No dashboard to open. Stevin scans continuously and taps you the moment something leaks.',
      },
      {
        label: 'Diagnosis with evidence',
        body: 'Not just "ROAS is dropping", but why. Frequency, thumbstop, GTM-firing, competitor bidding. Stevin links symptom to cause.',
      },
      {
        label: 'Removing decisions',
        body: "No more debating what a graph means. Stevin delivers the advice with it: you approve or adjust.",
      },
    ],
  },
}

const CARDS_BY_LOCALE: Record<Locale, SignalCard[]> = {
  nl: [
    {
      id: 'creative-wear-out',
      channel: 'META · PROSPECTING',
      timestamp: 'maandag 09:14',
      signaal: { kpi: 'CPA', delta: '+42%', trend: [22, 24, 23, 25, 28, 33, 38, 44], trendDirection: 'up' },
      diagnose: {
        headline: 'Creative wear-out.',
        detail: '"Summer Sale"-video is in 4 dagen opgebrand. Frequency 5,3 · thumbstop-ratio van 31% naar 12%.',
      },
      advies: 'Pauzeer deze video. Roteer naar B-versies (andere hook) uit de asset-library.',
    },
    {
      id: 'budget-burn',
      channel: 'GOOGLE ADS · PMAX',
      timestamp: 'woensdag 14:30',
      signaal: { kpi: 'budget burn', delta: '+60%', trend: [12, 18, 25, 35, 48, 60, 72, 84], trendDirection: 'up' },
      diagnose: {
        headline: 'CPC-spike door concurrentie.',
        detail: 'Categorie "Zomerschoenen": concurrent biedt agressief sinds 11:00. ROAS daalt van 4,2 naar 2,8.',
      },
      advies: 'Verlaag target-ROAS tijdelijk of sluit categorie 48 uur uit om budget te beschermen.',
    },
    {
      id: 'tracking-error',
      channel: 'GA4 · IOS',
      timestamp: 'vrijdag 08:15',
      signaal: { kpi: 'conversies iOS', delta: '−85%', trend: [88, 90, 92, 89, 87, 22, 18, 14], trendDirection: 'down' },
      diagnose: {
        headline: 'GTM-container faalt na deploy.',
        detail: 'Tag-firing rate iOS van 94% naar 9% sinds website-update gisteravond 22:40. Ad-spend loopt door.',
      },
      advies: 'Pauzeer alle retargeting tot dev de GTM-container heeft gefixt. Check Tag Assistant op iOS-Safari.',
    },
    {
      id: 'lead-quality',
      channel: 'LINKEDIN · HUBSPOT',
      timestamp: 'dinsdag 16:45',
      signaal: { kpi: 'MQL-ratio', delta: '−68%', trend: [32, 30, 29, 25, 18, 12, 8, 4], trendDirection: 'down' },
      diagnose: {
        headline: 'Brede targeting trekt junior-leads.',
        detail: 'Lead-volume +31% maar 64% nieuwe leads heeft job-title "Student" of "Intern" in HubSpot.',
      },
      advies: 'Voeg "Student" en "Intern" toe aan negatieve targeting in LinkedIn Campaign Manager.',
    },
  ],
  en: [
    {
      id: 'creative-wear-out',
      channel: 'META · PROSPECTING',
      timestamp: 'Monday 09:14',
      signaal: { kpi: 'CPA', delta: '+42%', trend: [22, 24, 23, 25, 28, 33, 38, 44], trendDirection: 'up' },
      diagnose: {
        headline: 'Creative wear-out.',
        detail: '"Summer Sale" video burned out in 4 days. Frequency 5.3 · thumbstop ratio dropped from 31% to 12%.',
      },
      advies: 'Pause this video. Rotate to B-versions (different hook) from the asset library.',
    },
    {
      id: 'budget-burn',
      channel: 'GOOGLE ADS · PMAX',
      timestamp: 'Wednesday 14:30',
      signaal: { kpi: 'budget burn', delta: '+60%', trend: [12, 18, 25, 35, 48, 60, 72, 84], trendDirection: 'up' },
      diagnose: {
        headline: 'CPC spike from competitor pressure.',
        detail: '"Summer shoes" category: competitor bidding aggressively since 11:00. ROAS dropping from 4.2 to 2.8.',
      },
      advies: 'Lower target ROAS temporarily or exclude category for 48 hours to protect budget.',
    },
    {
      id: 'tracking-error',
      channel: 'GA4 · IOS',
      timestamp: 'Friday 08:15',
      signaal: { kpi: 'iOS conversions', delta: '−85%', trend: [88, 90, 92, 89, 87, 22, 18, 14], trendDirection: 'down' },
      diagnose: {
        headline: 'GTM container failing after deploy.',
        detail: 'Tag-firing rate iOS from 94% to 9% since last night\'s 22:40 site update. Ad spend keeps running.',
      },
      advies: 'Pause all retargeting until dev fixes the GTM container. Check Tag Assistant on iOS Safari.',
    },
    {
      id: 'lead-quality',
      channel: 'LINKEDIN · HUBSPOT',
      timestamp: 'Tuesday 16:45',
      signaal: { kpi: 'MQL ratio', delta: '−68%', trend: [32, 30, 29, 25, 18, 12, 8, 4], trendDirection: 'down' },
      diagnose: {
        headline: 'Broad targeting pulling junior leads.',
        detail: 'Lead volume +31% but 64% of new leads have job title "Student" or "Intern" in HubSpot.',
      },
      advies: 'Add "Student" and "Intern" to negative targeting in LinkedIn Campaign Manager.',
    },
  ],
}

// ── Mini sparkline (no library) ────────────────────────────────────────
function Sparkline({ values }: { values: Trend }) {
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
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="flex-shrink-0" aria-hidden="true">
      <polyline
        fill="none"
        stroke="#5DA3FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
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
function Card({
  card,
  labels,
  animationDelay,
}: {
  card: SignalCard
  labels: { signal: string; diagnose: string; advice: string }
  animationDelay: number
}) {
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
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-[10px] tracking-[0.12em] text-[#A3ABB8]">{card.channel}</span>
        <span className="font-mono text-[10px] tracking-[0.08em] text-[#6A7587]">{card.timestamp}</span>
      </div>

      <div className="mb-6">
        <p className="font-mono text-[10px] tracking-[0.16em] text-[#5DA3FF] uppercase mb-2">{labels.signal}</p>
        <div className="flex items-end justify-between gap-4">
          <div className="flex items-baseline gap-3 min-w-0">
            <span
              className="font-display font-semibold text-white text-[28px] leading-none whitespace-nowrap"
              style={{ letterSpacing: '-0.02em' }}
            >
              {card.signaal.delta}
            </span>
            <span className="text-[#A3ABB8] text-[14px] truncate">{card.signaal.kpi}</span>
          </div>
          <Sparkline values={card.signaal.trend} />
        </div>
      </div>

      <div className="mb-6">
        <p className="font-mono text-[10px] tracking-[0.16em] text-[#5DA3FF] uppercase mb-2">{labels.diagnose}</p>
        <p className="text-white text-[15px] font-medium leading-snug mb-1">{card.diagnose.headline}</p>
        <p className="text-[#A3ABB8] text-[13px] leading-relaxed">{card.diagnose.detail}</p>
      </div>

      <div className="border-t border-white/8 pt-5">
        <p className="font-mono text-[10px] tracking-[0.16em] text-[#5DA3FF] uppercase mb-2">{labels.advice}</p>
        <p className="text-white text-[14px] leading-relaxed">{card.advies}</p>
      </div>
    </article>
  )
}

// ── Section ────────────────────────────────────────────────────────────
export default function StevinInActie() {
  const rawLocale = useLocale()
  const locale: Locale = rawLocale === 'en' ? 'en' : 'nl'
  const copy = HEADING_COPY[locale]
  const cards = CARDS_BY_LOCALE[locale]
  const labels = { signal: copy.labelSignal, diagnose: copy.labelDiagnose, advice: copy.labelAdvice }

  return (
    <section className="bg-[#0A1628] text-white" style={{ padding: '112px 24px' }}>
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 max-w-[760px]">
          <p className="text-[#5DA3FF] text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {copy.eyebrow}
          </p>
          <h2
            className="font-display font-extrabold text-white m-0 mb-6"
            style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', letterSpacing: '-0.03em', lineHeight: '1.08' }}
          >
            {copy.h2Line1}
            <br />
            {copy.h2Line2}
          </h2>
          <p className="text-[#A3ABB8] text-[17px] leading-[1.6] max-w-[660px]">{copy.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <Card key={card.id} card={card} labels={labels} animationDelay={i * 180} />
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[960px]">
          {copy.outcome.map((o) => (
            <div key={o.label}>
              <p className="font-mono text-[10px] tracking-[0.16em] text-[#5DA3FF] uppercase mb-2">{o.label}</p>
              <p className="text-white text-[15px] leading-snug">{o.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
