'use client'

import { useEffect, useState } from 'react'

/**
 * H1 met kop-varianten voor de homepage-test (doc 12/16, onderzoek jul 2026).
 * Rotatie-pool per Koen 19 jul (avond): C groei, B transparantie, D brein.
 * Vaste toewijzing per bezoeker via localStorage (geen per-pageview-rotatie,
 * anders wordt de meting troebel); de gekozen variant gaat als event naar de
 * dataLayer zodat GA4 per kop kan meten. A factuur draait niet mee in de
 * rotatie: dat is de vaste ads/outreach-opener, wel bereikbaar via ?kop=a.
 * De zwevende switcher verschijnt alleen op preview-hosts.
 */

type Variant = 'a' | 'b' | 'c' | 'd'

const ROTATION: Variant[] = ['c', 'b', 'd']
const STORAGE_KEY = 'stevin_kop_variant'

const H1: Record<'nl' | 'en', Record<Variant, { eyebrow: string; line: string; accent: string }>> = {
  nl: {
    a: { eyebrow: 'Voor bedrijven die betalen voor marketing', line: 'Elke maand een marketingfactuur.', accent: 'Geen idee wat ze ervoor gedaan hebben.' },
    b: { eyebrow: 'Kijk zelf mee, het staat er gewoon', line: 'Google weet wie de eigenaar is van jouw data.', accent: 'Jij ook?' },
    c: { eyebrow: 'Groeien met grip', line: 'Marketing die elke maand beter wordt.', accent: 'En alles blijft van jou.' },
    d: { eyebrow: 'De AI-laag over je marketing en sales', line: 'Je eigen data.', accent: 'Je eigen marketing-brein.' },
  },
  en: {
    a: { eyebrow: 'For companies that pay for marketing', line: 'A marketing invoice every month.', accent: 'No idea what they did for it.' },
    b: { eyebrow: 'See for yourself, it is right there', line: 'Google knows who owns your data.', accent: 'Do you?' },
    c: { eyebrow: 'Growth with grip', line: 'Marketing that gets better every month.', accent: 'And everything stays yours.' },
    d: { eyebrow: 'The AI layer over your marketing and sales', line: 'Your own data.', accent: 'Your own marketing brain.' },
  },
}

const LABELS: Record<Variant, string> = { a: 'A factuur', b: 'B transparantie', c: 'C groei', d: 'D brein' }

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

function isVariant(v: string | null): v is Variant {
  return v === 'a' || v === 'b' || v === 'c' || v === 'd'
}

export default function HeroHeadline({ locale }: { locale: string }) {
  const [variant, setVariant] = useState<Variant>('c')
  const [showSwitch, setShowSwitch] = useState(false)

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('kop')
    let resolved: Variant
    if (isVariant(q)) {
      resolved = q
    } else {
      let stored: string | null = null
      try { stored = localStorage.getItem(STORAGE_KEY) } catch { /* private mode */ }
      if (isVariant(stored) && ROTATION.includes(stored)) {
        resolved = stored
      } else {
        resolved = ROTATION[Math.floor(Math.random() * ROTATION.length)]
        try { localStorage.setItem(STORAGE_KEY, resolved) } catch { /* private mode */ }
      }
    }
    setVariant(resolved)
    window.dataLayer?.push({ event: 'kop_variant', kop_variant: resolved })

    const h = window.location.hostname
    if (h === 'localhost' || h.startsWith('new.') || h.endsWith('.vercel.app')) setShowSwitch(true)
  }, [])

  const c = H1[locale === 'en' ? 'en' : 'nl'][variant]

  return (
    <>
      <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
        <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
        {c.eyebrow}
      </p>
      <h1
        className="font-display font-extrabold text-white leading-[1.06] tracking-[-0.03em]"
        style={{ fontSize: 'clamp(34px, 4.6vw, 68px)', maxWidth: '18ch' }}
      >
        {c.line} <span className="text-[#5DA3FF]">{c.accent}</span>
      </h1>

      {showSwitch && (
        <div
          className="fixed bottom-4 left-4 z-50 flex items-center gap-1.5 bg-white rounded-full border border-border shadow-lg px-2.5 py-1.5"
          role="group"
          aria-label="Kop-variant (alleen preview)"
        >
          <span className="text-[10px] font-display font-bold uppercase tracking-[0.1em] text-muted px-1">Kop</span>
          {(['a', 'b', 'c', 'd'] as Variant[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVariant(v)}
              className={`text-[12px] font-display font-semibold rounded-full px-3 py-1.5 transition-colors ${
                variant === v ? 'bg-primary text-white' : 'text-primary border border-border hover:border-primary/40'
              }`}
            >
              {LABELS[v]}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
