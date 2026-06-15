'use client'

import { useState, useEffect } from 'react'

/**
 * Ambient background layer, floating data lines that drift upward
 * through the hero at very low opacity. Per-page variant shows
 * contextually relevant data fragments.
 *
 * Renders only on client to avoid hydration mismatch.
 * Pure CSS animations after mount, no JS animation loop.
 */

export type DataRainVariant =
  | 'mixed'
  | 'marketing'
  | 'artist'
  | 'agency'
  | 'promotor'
  | 'mediabureau'
  | 'merk'
  | 'retail'
  | 'pr'
  | 'creatief'
  | 'influencer'
  | 'ecommerce'
  | 'b2b'
  | 'healthcare'

// ── Data pools per variant ──

const LINES: Record<DataRainVariant, string[]> = {
  marketing: [
    'CTR gedaald met 34%',
    'Growth Multiplier: 1.8x',
    'Verschuif €2.400 naar Reels',
    'Creative fatigue detected',
    'ROAS 3.2x → 2.1x',
    'CPC €0.42 → €0.68',
    'Competitor scan actief',
    '14 nieuwe creatives gedetecteerd',
    'Share of Search -12%',
    'Portfolio-uplift +23%',
    'Budget herverdelen: €8.200',
    'Kanaalsaturatie bereikt',
    'Attribution gap: 38%',
    'Cross-channel analyse...',
    'A/B test: +18% CVR',
    'Projected savings: €6.800/m',
    'Executive briefing klaar',
    '12 accounts gescand',
    'Anomalie gedetecteerd',
    'Actieplan gegenereerd',
  ],
  artist: [
    'Viral moment: TikTok +340%',
    'Sentiment: 92% positief',
    'Spotify saves +28%',
    'Pre-save rate: 12.4%',
    'Momentum window: 48u',
    '4.812 comments gescand',
    'Geo-hype: Antwerpen +180%',
    'Playlist pitch: 12 curators',
    '+180K streams verwacht',
    'Fan-bridge filter actief',
    '95% ruis weggefilterd',
    'Booking agent genotificeerd',
    'Track-ID requests: 12',
    'SoundCloud reposts +240%',
    'Merch sales +34% Rotterdam',
    'Behind-the-scenes: 89% views',
    'Instagram Reels: 2.1M reach',
    'YouTube shorts trending #18',
    'Drop-off dag 3: -45%',
    'Retarget pre-savers actief',
  ],
  agency: [
    '12 klantaccounts gescand',
    'Klant Vosso: ROAS 3.8x',
    'Non-billable uren: -62%',
    'Rapportage: 3 min per klant',
    'Creative fatigue: 4 klanten',
    'Portfolio GM: 2.1x gemiddeld',
    'Wekelijks klantrapport verstuurd',
    'Klant onboarding: 24u',
    'Anomalie klant Revier: CPC +45%',
    'Budget alert: klant Apex',
    'Executive briefing: 3 zinnen',
    'Competitor scan: 6 markten',
    'Pitch deck gegenereerd',
    'Churn risico: klant Moda laag',
    'Upsell kans: klant Noor hoog',
    'Weekly digest verstuurd',
    'Attribution gap: klant Veld 28%',
    'Share of Search rapport klaar',
    'Strategisch advies gegenereerd',
    '245+ integraties actief',
  ],
  promotor: [
    'Ticketverkoop +18% vs forecast',
    'Instagram reach: 2.4M in 48u',
    'Lineup announcement: +340% engagement',
    'Early bird uitverkocht in 3u',
    'Competitor event scan actief',
    'Weer forecast: 23°C, geen regen',
    'Merch pre-orders: 1.240 stuks',
    'Spotify streams headliner +45%',
    'TikTok buzz: #festivalname trending',
    'Lookalike audience: 890K match',
    'Retargeting pool: 124K bezoekers',
    'CPA ticketverkoop: €4.20',
    'Geo-targeting: Randstad +28%',
    'Aftermovie views: 890K in 24u',
    'Newsletter open rate: 42%',
    'Cashless spending: €34 p.p.',
    'Social mentions: 12.400 in 7d',
    'Lineup sentiment: 88% positief',
    'VIP upgrade rate: 12%',
    'Podiumtijden geoptimaliseerd',
  ],
  mediabureau: [
    'Cross-channel ROAS: 3.2x',
    'Attribution gap: Meta 38%',
    'Google overclaim: 42 conversies',
    'Incrementele ROAS: 2.4x',
    'Budget allocatie geoptimaliseerd',
    'DV360 frequency cap bereikt',
    'Programmatic waste: -€4.200',
    'Viewability: 72% (target: 70%)',
    'Brand safety violations: 0',
    'Cross-device tracking actief',
    'Kanaalsaturatie: Search bereikt',
    'Marginale opbrengst: €0.40',
    'TikTok CPM: €3.80 vs €6.20',
    'LinkedIn CPC: €8.40 vs benchmark €12',
    'Media mix model updated',
    'Reach & frequency rapport klaar',
    'Flighting schema geoptimaliseerd',
    'GRP equivalent: 340 punten',
    'SOV vs SOM: gap -8%',
    'Campagne pacing: 94% on track',
  ],
  merk: [
    'Share of Search: +4.2% MoM',
    'Brand sentiment: 78% positief',
    'Competitor X: nieuwe campagne',
    'Merkbekendheid: 34% → 38%',
    'NPS score: +12 vs vorig kwartaal',
    'Social mentions: 8.400 in 7d',
    'Branded zoekvolume +22%',
    'Category entry points: 6 actief',
    'Mental availability score: 7.2',
    'Physical availability: 89%',
    'Earned media waarde: €42K',
    'Influencer ROI: 3.8x',
    'Brand lift study: +18% recall',
    'Concurrentiepositie: #2 → #1',
    'Customer lifetime value: €340',
    'Churn rate gedaald: 8% → 5.4%',
    'Rebranding impact: +12% voorkeur',
    'Packaging test: A wint met 23%',
    'Sponsoring ROI: 2.1x',
    'PR waarde: €28K afgelopen maand',
  ],
  retail: [
    'Share of Search: +6% vs concurrent',
    'Omnichannel CVR: 4.2%',
    'BOPIS conversie: +28%',
    'Winkelbezoek attributie actief',
    'Assortiment scan: 2.400 SKUs',
    'Prijs-elasticiteit berekend',
    'Seizoenspatroon gedetecteerd',
    'Voorraad alert: 12 producten',
    'Google Shopping ROAS: 5.8x',
    'Lokale campagne: +34% footfall',
    'Loyalty programma: 42% actief',
    'Basket size: €48 → €56',
    'Retourpercentage: 12% → 8%',
    'Click & Collect: +45%',
    'Category manager rapport klaar',
    'Marktaandeel: 18.4% (+1.2%)',
    'Flyer vs digital: digital wint',
    'Conversiepad: 2.3 touchpoints',
    'Seizoenscampagne ROI: 4.1x',
    'Store performance ranking klaar',
  ],
  pr: [
    'Mediamonitoring: 340 mentions',
    'Sentiment shift gedetecteerd',
    'Tier 1 plaatsing: NRC, FD',
    'Share of Voice: 24% (+3%)',
    'Crisis alert: negatief artikel',
    'Journalistenlijst: 48 matches',
    'Persbericht pick-up rate: 34%',
    'AVE waarde: €86K afgelopen week',
    'Thought leadership score: 7.8',
    'Spokesperson coverage: +22%',
    'Competitor PR scan actief',
    'Social listening: trending topic',
    'Influencer sentiment: 92% pos',
    'Mediabereik: 4.2M afgelopen maand',
    'Backlink profiel: +18 domains',
    'Podcast mentions: 6 afleveringen',
    'Event coverage: 12 media aanwezig',
    'Embargo tracking actief',
    'Reputatiescore: 8.1/10',
    'Stakeholder rapport verstuurd',
  ],
  creatief: [
    'Creative fatigue: Banner Q1',
    'CTR verval: -34% in 14 dagen',
    'Concept A vs B: A wint +22%',
    'UGC outperformt branded 2.3x',
    'Video completion rate: 68%',
    'Hook rate eerste 3 sec: 42%',
    'Color palette test: warm wint',
    'Copy variant "Ontdek" +18% CTR',
    'Carousel engagement: slide 3 piek',
    'Audience resonantie: 25-34 sterkst',
    'Format mix: Reels > Stories > Feed',
    'Creatieve brief gegenereerd',
    'Moodboard data: top 5 trends',
    'Ad recall lift: +28%',
    'Thumb-stop rate: 3.2%',
    'Asset library: 340 actief',
    'Wear-out prediction: 8 dagen',
    'Competitor creative scan klaar',
    'Best performing: behind-the-scenes',
    'Design sprint data rapport klaar',
  ],
  influencer: [
    'Engagement rate: 4.8% (top 5%)',
    'Branded content ROI: 3.2x',
    'Audience overlap check: 12%',
    'Fake follower scan: 2.1% bots',
    'Best posting time: di 19:00',
    'Story views: 34K gemiddeld',
    'Swipe-up rate: 8.2%',
    'Brand deal waarde: €2.400',
    'Audience demographics match: 89%',
    'Content pillar analyse klaar',
    'Collab performance: +45% reach',
    'Affiliate sales: €8.200/maand',
    'TikTok algorithm boost actief',
    'Cross-platform reach: 1.2M',
    'Media kit data bijgewerkt',
    'Campaign proof of performance klaar',
    'Sentiment op branded posts: 94%',
    'Competitor influencer scan actief',
    'Owned vs rented: 28% / 72%',
    'Community growth: +2.4K/week',
  ],
  ecommerce: [
    'Server-side tracking actief',
    'Checkout abandonment: 72%',
    'CLV cohort Q1: €340 gemiddeld',
    'ROAS Shopify: 4.8x',
    'DPA fatigue na dag 5',
    'Retargeting pool: 42K users',
    'Add-to-cart rate: +12%',
    'Upsell revenue: €4.200/maand',
    'Consent mode: 89% match rate',
    'GA4 vs pixel gap: 18%',
    'Email flow revenue: €12K/maand',
    'Abandoned cart recovery: 8.4%',
    'Product feed: 2.400 SKUs actief',
    'Dynamic pricing alert: concurrent',
    'Seizoenstrend gedetecteerd',
    'Mobile CVR: 2.1% (desktop 4.8%)',
    'First-party data: 124K profielen',
    'Loyalty repeat rate: 34%',
    'Shipping threshold test: +€6 AOV',
    'Review score impact: +0.4 → +18% CVR',
  ],
  b2b: [
    'MQL → SQL conversie: 24%',
    'Pipeline waarde: €840K',
    'Lead score >80: 12 nieuwe leads',
    'LinkedIn Ads CPL: €42',
    'Content download: whitepaper +34%',
    'Demo requests: +28% MoM',
    'Account-based targeting actief',
    'Decision maker bereikt: 68%',
    'Sales cycle: 45 → 32 dagen',
    'CRM sync: 340 contacten updated',
    'Webinar attendance: 34%',
    'Intent data: 8 accounts actief',
    'Nurture flow: 42% open rate',
    'Case study views: +56%',
    'Competitor vergelijking gescand',
    'Proposal gegenereerd: klant Nexus',
    'Churn risico: account Vera laag',
    'Upsell kans: account Flux hoog',
    'ROI rapport Q1 verstuurd',
    'Attribution: first touch vs multi',
  ],
  healthcare: [
    'HCP bereik: 2.400 artsen',
    'Compliant ad review: goedgekeurd',
    'Medical congress tracking actief',
    'KOL engagement: +18%',
    'Patient journey mapping klaar',
    'Consent rate: 92% (GDPR ok)',
    'Referral tracking: 34 verwijzingen',
    'Therapeutic area SOV: 28%',
    'Clinical trial awareness: +22%',
    'Formularium plaatsing: positief',
    'Disease awareness campagne: 1.2M',
    'Rep-triggered email: 42% open',
    'Medical education ROI: 3.4x',
    'Adverse event monitoring actief',
    'Patient support programma: 89%',
    'Multichannel engagement score: 7.2',
    'Sample request tracking: +28%',
    'Congress ROI: €12 per HCP contact',
    'Specialist targeting: 94% match',
    'Compliance audit: 0 violations',
  ],
  mixed: [], // filled below
}

// Mixed = marketing + artist combined
LINES.mixed = [...LINES.marketing, ...LINES.artist]

// ── Column generator ──

const COLUMN_COUNT = 6

interface Column {
  lines: string[]
  x: number
  speed: number
  opacity: number
  delay: number
}

function generateColumns(variant: DataRainVariant): Column[] {
  const pool = LINES[variant] || LINES.mixed
  const columns: Column[] = []
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  const linesPerCol = Math.floor(shuffled.length / COLUMN_COUNT)

  for (let i = 0; i < COLUMN_COUNT; i++) {
    const lines = shuffled.slice(i * linesPerCol, (i + 1) * linesPerCol)
    columns.push({
      lines: [...lines, ...lines], // duplicate for seamless loop
      x: 8 + (i * (84 / (COLUMN_COUNT - 1))),
      speed: 60 + Math.random() * 40,
      opacity: 0.08 + Math.random() * 0.06,
      delay: -(Math.random() * 30),
    })
  }

  return columns
}

// ── Component ──

interface DataRainProps {
  variant?: DataRainVariant
}

export default function DataRain({ variant = 'mixed' }: DataRainProps) {
  const [columns, setColumns] = useState<Column[] | null>(null)

  useEffect(() => {
    setColumns(generateColumns(variant))
  }, [variant])

  if (!columns) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {columns.map((col, ci) => (
        <div
          key={ci}
          className="absolute animate-float-up"
          style={{
            left: `${col.x}%`,
            animationDuration: `${col.speed}s`,
            animationDelay: `${col.delay}s`,
            opacity: col.opacity,
          }}
        >
          <div className="flex flex-col gap-6 whitespace-nowrap">
            {col.lines.map((line, li) => (
              <span key={li} className="block text-xs font-mono text-white tracking-wide">
                {line}
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* Fade edges */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0A1628] to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A1628] to-transparent z-10" />
    </div>
  )
}
