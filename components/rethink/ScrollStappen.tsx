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

          {/* De stappen als nodes op een draad van het signaal naar het doel
              (Koen, 11 okt 01:38: losse kaarten zagen er te simpel uit). */}
          <ol className="relative m-0 list-none space-y-7 p-0 pl-16">
            <span aria-hidden="true" className="absolute bottom-5 left-[19px] top-5 w-0.5 rounded-full bg-border" />
            <span
              aria-hidden="true"
              className="absolute left-[19px] top-5 w-0.5 rounded-full bg-gradient-to-b from-accent to-[#1D63D8] transition-[height] duration-700 ease-out"
              style={{
                height: `calc((100% - 40px) * ${Math.max(0, Math.min(1, (aantal - 1) / stappen.length))})`,
              }}
            />
            {stappen.map((s, i) => {
              const zichtbaar = i < aantal
              const nieuwste = actief && i === aantal - 1
              const Icoon = ICONEN[i % ICONEN.length]
              return (
                <li
                  key={s}
                  className="relative flex min-h-10 items-center"
                >
                  <span
                    className={`absolute -left-16 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border transition-colors duration-500 ${
                      zichtbaar ? 'border-accent bg-accent text-white' : 'border-border bg-white text-muted/40'
                    }`}
                  >
                    {nieuwste && <span aria-hidden="true" className="su-puls absolute -inset-1.5 rounded-full bg-accent/20" />}
                    <Icoon size={18} strokeWidth={2} aria-hidden="true" className="relative" />
                  </span>
                  <span
                    className="text-[17px] font-semibold leading-snug text-primary transition-all duration-500 ease-out"
                    style={{ opacity: zichtbaar ? 1 : 0, transform: zichtbaar ? 'none' : 'translateX(8px)' }}
                  >
                    {s}
                  </span>
                </li>
              )
            })}
            <li
              className="relative flex min-h-10 items-center"
            >
              <span
                className={`absolute -left-16 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border transition-colors duration-500 ${
                  doelZichtbaar ? 'border-[#17803F] bg-[#17803F] text-white' : 'border-border bg-white text-muted/40'
                }`}
              >
                {doelZichtbaar && actief && <span aria-hidden="true" className="su-puls absolute -inset-1.5 rounded-full bg-[#17803F]/20" />}
                <Target size={18} strokeWidth={2} aria-hidden="true" className="relative" />
              </span>
              <span
                className="transition-all duration-500 ease-out"
                style={{ opacity: doelZichtbaar ? 1 : 0, transform: doelZichtbaar ? 'none' : 'translateX(8px)' }}
              >
                <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#17803F]">Doel</span>
                <span className="block text-[17px] font-semibold leading-snug text-primary">{doel}</span>
              </span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
