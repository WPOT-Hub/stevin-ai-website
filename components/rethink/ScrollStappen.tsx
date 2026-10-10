'use client'

import { useEffect, useRef, useState } from 'react'


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
  const items = [...stappen, doel]
  const huidig = Math.min(items.length - 1, Math.max(0, aantal - 1))

  // Typografie in plaats van een tijdlijn-component (Koen, 11 okt 01:40: de
  // blauwe cirkels met iconen waren "cheap"). Donker vlak; de huidige stap
  // groot in wit met een dun nummer, eerdere stappen klein en gedimd erboven,
  // een haarlijn met kleine lichtpuntjes als nodes.
  return (
    <div
      ref={ref}
      className="relative"
      style={actief ? { height: `calc(100svh + ${items.length * 34}svh)` } : undefined}
    >
      <div className={actief ? 'sticky top-0 flex min-h-[100svh] items-center' : ''}>
        <div className="grid w-full grid-cols-1 gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          <div>
            <p className="mb-4 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent-light">{eyebrow}</p>
            <h2
              className="m-0 font-display font-extrabold text-white"
              style={{ fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08', maxWidth: '14ch' }}
            >
              {kop}
            </h2>
            <p className="m-0 mt-6 flex items-start gap-3 text-[16px] leading-snug text-white/70">
              <span className="relative mt-1.5 flex h-2 w-2 shrink-0" aria-hidden="true">
                <span className="su-puls absolute inline-flex h-full w-full rounded-full bg-accent-light" />
              </span>
              <span>
                <span className="mr-2 text-[11px] font-bold uppercase tracking-[0.12em] text-accent-light">Signaal</span>
                {vaststelling}
              </span>
            </p>
          </div>

          <ol className="relative m-0 list-none p-0 pl-8">
            {/* Haarlijn met lichtpuntjes */}
            <span aria-hidden="true" className="absolute bottom-2 left-[3px] top-2 w-px bg-white/12" />
            <span
              aria-hidden="true"
              className="absolute left-[3px] top-2 w-px bg-accent-light transition-[height] duration-700 ease-out"
              style={{ height: `calc((100% - 16px) * ${actief ? huidig / Math.max(1, items.length - 1) : 1})` }}
            />
            {items.map((tekst, i) => {
              const isDoel = i === items.length - 1
              const zichtbaar = !actief || i < aantal || (isDoel && doelZichtbaar)
              const isHuidig = actief ? i === huidig && zichtbaar : isDoel
              const kleur = isDoel ? '#5FD39A' : '#5DA3FF'
              return (
                <li
                  key={tekst}
                  className="relative transition-all duration-500 ease-out"
                  style={{
                    opacity: zichtbaar ? (isHuidig ? 1 : 0.38) : 0,
                    transform: zichtbaar ? 'none' : 'translateY(12px)',
                    marginTop: i === 0 ? 0 : isHuidig ? 26 : 14,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-8 top-[0.55em] h-[7px] w-[7px] rounded-full transition-all duration-500"
                    style={{
                      background: zichtbaar ? kleur : 'rgba(255,255,255,0.2)',
                      boxShadow: isHuidig ? `0 0 0 5px ${kleur}22, 0 0 18px ${kleur}` : 'none',
                    }}
                  />
                  {isHuidig && (
                    <span className="mb-2 block font-mono text-[12px] tracking-[0.14em] text-white/45">
                      {isDoel ? 'DOEL' : `${String(i + 1).padStart(2, '0')} / ${String(stappen.length).padStart(2, '0')}`}
                    </span>
                  )}
                  <span
                    className="block font-display leading-[1.15] text-white transition-all duration-500"
                    style={{
                      fontSize: isHuidig ? 'clamp(26px, 3vw, 40px)' : '17px',
                      fontWeight: isHuidig ? 800 : 500,
                      letterSpacing: isHuidig ? '-0.025em' : '0',
                      color: isHuidig && isDoel ? '#9BE3BC' : undefined,
                    }}
                  >
                    {tekst}
                  </span>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}
