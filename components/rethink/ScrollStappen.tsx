'use client'

import { useEffect, useRef, useState } from 'react'
import { ChartLine, Plug, Search, Target, Users, Wrench, type LucideIcon } from 'lucide-react'

/**
 * "Van advies naar uitvoering" als scrollverhaal (Koen, 11 okt 01:14: "misschien
 * meer scrollend, dat hij dan steeds dingen toevoegt"; 01:20: "kan dit iets
 * mooier?").
 *
 * Bovenaan het signaal uit het brein, daaronder komt bij elk stuk scrollen een
 * stap-kaart bij, en aan het eind het doel. De server tekent alles zichtbaar
 * (zoekmachines, geen JavaScript); pas in de browser verstoppen de stappen tot
 * je erlangs scrolt. Onder prefers-reduced-motion geen vastzetten en alles
 * direct in beeld.
 */

const ICONEN: LucideIcon[] = [Search, Wrench, Plug, Users, ChartLine]

export default function ScrollStappen({
  eyebrow,
  kop,
  vaststelling,
  stappen,
  doel,
}: {
  eyebrow: string
  kop: string
  vaststelling: string
  stappen: string[]
  doel: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [actief, setActief] = useState(false)
  const [aantal, setAantal] = useState(stappen.length + 1)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setActief(true)
    let raf = 0
    const totaalItems = stappen.length + 1 // de stappen plus het doel
    const meet = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const totaal = r.height - window.innerHeight
      const p = totaal > 0 ? Math.min(1, Math.max(0, -r.top / totaal)) : 1
      // Eerste stap zodra het blok vaststaat, de rest gelijkmatig daarna.
      setAantal(p <= 0.02 ? 0 : Math.min(totaalItems, 1 + Math.floor(p * (totaalItems - 0.5))))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(meet)
    }
    meet()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [stappen.length])

  const doelZichtbaar = aantal > stappen.length

  return (
    <div
      ref={ref}
      className="relative"
      // Een scherm plus ongeveer een derde scherm per kaart om doorheen te scrollen.
      style={actief ? { height: `calc(100svh + ${(stappen.length + 1) * 34}svh)` } : undefined}
    >
      <div className={actief ? 'sticky top-0 flex min-h-[100svh] items-center' : ''}>
        <div className="grid w-full grid-cols-1 gap-8 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <div>
            <p className="mb-4 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent">{eyebrow}</p>
            <h2
              className="m-0 font-display font-extrabold text-primary"
              style={{ fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08', maxWidth: '14ch' }}
            >
              {kop}
            </h2>
            {/* Het signaal, in dezelfde taal als het brein */}
            <div className="mt-7 flex items-start gap-3 rounded-2xl bg-primary px-5 py-4 text-white shadow-[0_12px_40px_rgba(10,22,40,0.18)]">
              <span className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                <span className="su-puls absolute inline-flex h-full w-full rounded-full bg-accent-light opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-light" />
              </span>
              <span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-accent-light">Signaal</span>
                <span className="mt-0.5 block text-[16.5px] font-medium leading-snug">{vaststelling}</span>
              </span>
            </div>
          </div>

          <ol className="relative m-0 list-none space-y-2.5 p-0">
            {stappen.map((s, i) => {
              const zichtbaar = i < aantal
              const nieuwste = actief && i === aantal - 1
              const Icoon = ICONEN[i % ICONEN.length]
              return (
                <li
                  key={s}
                  className={`flex items-center gap-3.5 rounded-2xl border bg-white px-4 py-3 transition-all duration-500 ease-out ${
                    nieuwste
                      ? 'border-accent/50 shadow-[0_10px_30px_rgba(61,142,255,0.16)]'
                      : 'border-border shadow-[0_1px_2px_rgba(10,22,40,0.04)]'
                  }`}
                  style={{
                    opacity: zichtbaar ? 1 : 0,
                    transform: zichtbaar ? 'none' : 'translateY(14px) scale(0.98)',
                  }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icoon size={19} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="flex-1 text-[16px] font-medium leading-snug text-primary">{s}</span>
                  <span className="font-mono text-[12px] font-semibold text-muted/70">{String(i + 1).padStart(2, '0')}</span>
                </li>
              )
            })}
            <li
              className="flex items-center gap-3.5 rounded-2xl border border-[#17803F]/30 bg-[#17803F]/[0.06] px-4 py-3 transition-all duration-500 ease-out"
              style={{
                opacity: doelZichtbaar ? 1 : 0,
                transform: doelZichtbaar ? 'none' : 'translateY(14px) scale(0.98)',
              }}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#17803F]/12 text-[#17803F]">
                <Target size={19} strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="flex-1">
                <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#17803F]">Doel</span>
                <span className="block text-[16px] font-semibold leading-snug text-primary">{doel}</span>
              </span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
