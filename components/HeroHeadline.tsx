'use client'

import { useEffect, useState } from 'react'

/**
 * H1 met kop-varianten voor de homepage-test (doc 12/16, onderzoek jul 2026):
 * C = groei (winst-frame, DEFAULT per Koen 19 jul), A = factuur (herkenning,
 * tevens vaste ads-opener), B = transparantie (ads-hook).
 * De zwevende switcher is een review-instrument en verschijnt alleen op
 * preview-hosts (new.stevin.ai, *.vercel.app, localhost); productie toont
 * altijd de default of de ?kop= querystring.
 */

type Variant = 'a' | 'b' | 'c'

const H1: Record<'nl' | 'en', Record<Variant, { line: string; accent: string }>> = {
  nl: {
    a: { line: 'Elke maand een marketingfactuur.', accent: 'Geen idee wat ze ervoor gedaan hebben.' },
    b: { line: 'Google weet wie de eigenaar is van jouw data.', accent: 'Jij ook?' },
    c: { line: 'Marketing die elke maand beter wordt.', accent: 'En alles blijft van jou.' },
  },
  en: {
    a: { line: 'A marketing invoice every month.', accent: 'No idea what they did for it.' },
    b: { line: 'Google knows who owns your data.', accent: 'Do you?' },
    c: { line: 'Marketing that gets better every month.', accent: 'And everything stays yours.' },
  },
}

const LABELS: Record<Variant, string> = { a: 'A factuur', b: 'B transparantie', c: 'C groei' }

export default function HeroHeadline({ locale }: { locale: string }) {
  const [variant, setVariant] = useState<Variant>('c')
  const [showSwitch, setShowSwitch] = useState(false)

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('kop')
    if (q === 'a' || q === 'b' || q === 'c') setVariant(q)
    const h = window.location.hostname
    if (h === 'localhost' || h.startsWith('new.') || h.endsWith('.vercel.app')) setShowSwitch(true)
  }, [])

  const c = H1[locale === 'en' ? 'en' : 'nl'][variant]

  return (
    <>
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
          {(['a', 'b', 'c'] as Variant[]).map((v) => (
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
