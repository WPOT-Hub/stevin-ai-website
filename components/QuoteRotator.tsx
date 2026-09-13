'use client'

import { useEffect, useRef, useState } from 'react'

// W-078, 13 sep 2026. Koen: "die 4 dat er af en toe een om gaat, we hebben veel
// uitspraken". Vier vakken blijven staan, de pool is groter. Om de zoveel
// seconden gaat een willekeurig vak om naar een citaat dat nu niet in beeld
// staat. De eerste vier van de pool staan in de server-render, dus zonder
// JavaScript (en voor zoekmachines) is dit gewoon het oude raster. Bij
// prefers-reduced-motion en bij een pool van vier of minder draait er niets.
export type Quote = { q: string; a: string }

const INTERVAL_MS = 7000
const FADE_MS = 450

export default function QuoteRotator({ quotes }: { quotes: readonly Quote[] }) {
  const [slots, setSlots] = useState<number[]>([0, 1, 2, 3].filter((i) => i < quotes.length))
  const [fading, setFading] = useState<number | null>(null)
  const slotsRef = useRef(slots)
  slotsRef.current = slots

  useEffect(() => {
    if (quotes.length <= 4) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let fadeTimer: ReturnType<typeof setTimeout> | undefined
    const tick = setInterval(() => {
      const current = slotsRef.current
      const slot = Math.floor(Math.random() * current.length)
      const candidates = quotes.map((_, i) => i).filter((i) => !current.includes(i))
      if (candidates.length === 0) return
      const next = candidates[Math.floor(Math.random() * candidates.length)]
      setFading(slot)
      fadeTimer = setTimeout(() => {
        setSlots((prev) => prev.map((v, i) => (i === slot ? next : v)))
        setFading(null)
      }, FADE_MS)
    }, INTERVAL_MS)

    return () => {
      clearInterval(tick)
      if (fadeTimer) clearTimeout(fadeTimer)
    }
  }, [quotes])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-[14px] overflow-hidden">
      {slots.map((qi, slot) => {
        const item = quotes[qi]
        return (
          <figure
            key={slot}
            aria-live="off"
            className="bg-white p-8 lg:p-9 m-0 flex flex-col justify-between gap-6 min-h-[200px]"
            style={{ opacity: fading === slot ? 0 : 1, transition: `opacity ${FADE_MS}ms ease` }}
          >
            <blockquote className="m-0 font-display font-semibold text-primary leading-[1.4]" style={{ fontSize: '17px', letterSpacing: '-0.01em' }}>
              &ldquo;{item.q}&rdquo;
            </blockquote>
            <figcaption className="text-muted text-[13px]">{item.a}</figcaption>
          </figure>
        )
      })}
    </div>
  )
}
