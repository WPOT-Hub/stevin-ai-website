'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * "Van advies naar uitvoering" als scrollverhaal (Koen, 11 okt 01:14: "misschien
 * meer scrollend, dat hij dan steeds dingen toevoegt"; 01:20: "kan dit iets
 * mooier?").
 *
 * Bovenaan het voorbeeld, daaronder komt bij elk stuk scrollen een stap bij, en
 * aan het eind het doel. De server tekent alles zichtbaar (zoekmachines, geen
 * JavaScript); pas in de browser verstoppen de stappen tot je erlangs scrolt.
 * Onder prefers-reduced-motion geen vastzetten en alles direct in beeld.
 *
 * Geen layout shifts bij gewoon scrollen (CLS): in de browser staat elke stap
 * absoluut in een lijst met een vaste hoogte, en wisselen alleen opacity en
 * transform. Elke stap heeft een kleine en een grote versie op elkaar; de
 * hoogtes worden gemeten (opnieuw als de lettertypen binnen zijn en bij elke
 * maatwijziging), en daaruit volgt waar elke stap staat.
 *
 * Smal scherm (onder 900px, een kolom): alleen de huidige stap, op een vaste
 * plek. Twee kolommen vanaf 900px, zoals de hero: op 980 bij 800 stond het
 * blok anders in een smalle kolom links met een leeg vlak ernaast (11 okt).
 * Met de eerdere stappen erboven werd het vastgezette blok ongeveer 700px hoog
 * en viel het doel op een telefoon onder het scherm (11 okt). Op een laag
 * scherm (liggende telefoon) zetten we niets vast en staat alles onder elkaar.
 */

const TUSSEN = 14 // ruimte tussen twee stappen
const EXTRA = 12 // extra ruimte boven de huidige stap
const GROOT = { fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, letterSpacing: '-0.025em' } as const
const KLEIN = { fontSize: '17px', fontWeight: 500, letterSpacing: '0' } as const

interface Maten {
  klein: number[]
  groot: number[]
}

export default function ScrollStappen({
  eyebrow,
  kop,
  vaststelling,
  stappen,
  doel,
  naschrift,
}: {
  eyebrow: string
  kop: string
  vaststelling: string
  stappen: string[]
  doel: string
  /** Een zin bij het blok. Staat in het vastgezette deel,
   * zodat hij met de stappen meeschuift: desktop in de linkerkolom onder het
   * voorbeeld, smal scherm onder de lijst. Na het vastgezette deel dreef hij
   * los onder een leeg vlak en oogde hij als een zesde blok (11 okt). */
  naschrift?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const lijstRef = useRef<HTMLOListElement>(null)
  const kleinRefs = useRef<(HTMLSpanElement | null)[]>([])
  const grootRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [actief, setActief] = useState(false)
  // Smal scherm: alleen de huidige stap (zie de uitleg bovenaan).
  const [compact, setCompact] = useState(false)
  const [aantal, setAantal] = useState(stappen.length + 1)
  const [maten, setMaten] = useState<Maten | null>(null)
  const items = [...stappen, doel]

  useEffect(() => {
    const stil = window.matchMedia('(prefers-reduced-motion: reduce), (max-height: 499px)')
    const smal = window.matchMedia('(max-width: 899.98px)')
    const zet = () => {
      setActief(!stil.matches)
      setCompact(smal.matches)
    }
    zet()
    stil.addEventListener('change', zet)
    smal.addEventListener('change', zet)
    return () => {
      stil.removeEventListener('change', zet)
      smal.removeEventListener('change', zet)
    }
  }, [])

  // Hoogtes meten zodra het scrollverhaal actief is. Opnieuw als de
  // lettertypen binnen zijn (een later geladen lettertype loopt anders af en
  // gaf overlap) en bij elke maatwijziging van de lijst of een stap. Alleen
  // bij echt andere maten een nieuwe stand, anders zou het zetten van de
  // lijsthoogte de meting steeds opnieuw starten.
  useLayoutEffect(() => {
    if (!actief) return
    let vorige = ''
    let weg = false
    const meet = () => {
      if (weg) return
      const nieuw = {
        klein: kleinRefs.current.slice(0, items.length).map((el) => el?.offsetHeight ?? 0),
        groot: grootRefs.current.slice(0, items.length).map((el) => el?.offsetHeight ?? 0),
      }
      const sleutel = `${nieuw.klein.join(',')}|${nieuw.groot.join(',')}`
      if (sleutel === vorige) return
      vorige = sleutel
      setMaten(nieuw)
    }
    meet()
    void document.fonts?.ready.then(meet)
    const ro = new ResizeObserver(meet)
    for (const el of [lijstRef.current, ...kleinRefs.current, ...grootRefs.current]) if (el) ro.observe(el)
    return () => {
      weg = true
      ro.disconnect()
    }
  }, [actief, items.length])

  // Voortgang pas meten als het blok zijn scrollhoogte heeft (na actief), en
  // over het stuk waarin het vastgezette deel echt vaststaat: de hoogte van
  // het blok min die van het vastgezette deel, niet min de schermhoogte.
  useEffect(() => {
    if (!actief) return
    let raf = 0
    const totaalItems = stappen.length + 1 // de stappen plus het doel
    const meet = () => {
      raf = 0
      const el = ref.current
      const vast = stickyRef.current
      if (!el || !vast) return
      const r = el.getBoundingClientRect()
      const totaal = r.height - Math.max(vast.offsetHeight, window.innerHeight)
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
  }, [actief, stappen.length])

  const doelZichtbaar = aantal > stappen.length
  const huidig = Math.min(items.length - 1, Math.max(0, aantal - 1))

  // Plek van elke stap: eerdere klein onder elkaar, de huidige groot eronder,
  // latere (nog onzichtbaar) net onder de huidige. De lijst krijgt de grootste
  // hoogte die ooit nodig is, zodat er nooit iets verschuift. Compact: elke
  // stap op dezelfde plek, de vorige schuift weg naar boven, de volgende komt
  // van onder.
  const geanimeerd = actief && maten !== null
  const boven = (h: number) => {
    if (compact) return 0
    let y = 0
    for (let j = 0; j < h; j++) y += (maten?.klein[j] ?? 0) + TUSSEN
    return y + (h > 0 ? EXTRA : 0)
  }
  const lijstHoogte = geanimeerd ? Math.max(...items.map((_, h) => boven(h) + (maten?.groot[h] ?? 0))) : undefined
  const plek = (i: number) => {
    if (compact) return i < huidig ? -14 : i > huidig ? 14 : 0
    if (i <= huidig) return i === huidig ? boven(huidig) : boven(i) - (i > 0 ? EXTRA : 0)
    return boven(huidig) + 12
  }

  // Typografie in plaats van een tijdlijn-component (Koen, 11 okt 01:40: de
  // blauwe cirkels met iconen waren "cheap"). Donker vlak; de huidige stap
  // groot in wit met een dun nummer, eerdere stappen klein en gedimd erboven,
  // een haarlijn met kleine lichtpuntjes als nodes.
  return (
    <div
      ref={ref}
      className="relative"
      // Per stap 34svh scrollen; op een smal scherm 20svh, zodat de knop eronder
      // eerder in beeld komt (CRO-synthese 11 okt, A6). De voortgang is een
      // verhouding van de hoogte, dus het verloop blijft gelijk.
      style={actief ? { height: `calc(100svh + ${items.length * (compact ? 20 : 34)}svh)` } : undefined}
    >
      <div ref={stickyRef} className={actief ? 'sticky top-0 flex min-h-[100svh] items-center' : ''}>
        <div className="grid w-full grid-cols-1 gap-10 py-8 tussen:grid-cols-[0.8fr_1.2fr] tussen:items-center tussen:gap-20 tussen:py-16">
          <div>
            <p className="mb-4 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent">{eyebrow}</p>
            <h2
              className="m-0 font-display font-extrabold text-white"
              style={{ fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08', maxWidth: '14ch' }}
            >
              {kop}
            </h2>
            <p className="m-0 mt-6 flex items-start gap-3 text-[16px] leading-snug text-white/70">
              <span className="relative mt-1.5 flex h-2 w-2 shrink-0" aria-hidden="true">
                <span className="su-puls absolute inline-flex h-full w-full rounded-full bg-accent" />
              </span>
              {/* Geen badge Voorbeeld meer: de aanleiding begint met "Stel". */}
              <span>{vaststelling}</span>
            </p>
            {naschrift && <p className="m-0 mt-8 hidden max-w-[36ch] text-[17px] leading-[1.55] text-white/75 tussen:block">{naschrift}</p>}
          </div>

          <ol ref={lijstRef} className="relative m-0 list-none p-0 pl-8" style={{ height: lijstHoogte }}>
            {/* Haarlijn met lichtpuntjes; de voortgang groeit met scaleY. */}
            <span aria-hidden="true" className="absolute bottom-2 left-[3px] top-2 w-px bg-white/12" />
            <span
              aria-hidden="true"
              className="absolute bottom-2 left-[3px] top-2 w-px origin-top bg-accent transition-transform duration-700 ease-out"
              style={{
                transform: `scaleY(${
                  compact && actief
                    ? Math.min(1, aantal / items.length)
                    : geanimeerd && lijstHoogte
                    ? Math.min(1, Math.max(0, (plek(huidig) + 8) / lijstHoogte))
                    : actief
                      ? huidig / Math.max(1, items.length - 1)
                      : 1
                })`,
              }}
            />
            {items.map((tekst, i) => {
              const isDoel = i === items.length - 1
              const zichtbaar = !actief || i < aantal || (isDoel && doelZichtbaar)
              const isHuidig = actief ? i === huidig && zichtbaar : isDoel
              const kleur = isDoel ? '#5FD39A' : '#3D8EFF'
              // Eerdere stappen gedimd, maar leesbaar (0,6: ongeveer 8:1 op
              // navy); compact helemaal weg. Zonder animatie staat alles op vol.
              const opacity = !zichtbaar ? 0 : isHuidig || !actief ? 1 : compact ? 0 : 0.6
              const label = isDoel ? 'DOEL' : `${String(i + 1).padStart(2, '0')} / ${String(stappen.length).padStart(2, '0')}`
              const stip = (
                <span
                  aria-hidden="true"
                  className="absolute -left-8 top-[0.55em] h-[7px] w-[7px] rounded-full transition-[background-color,box-shadow] duration-500"
                  style={{
                    background: zichtbaar ? kleur : 'rgba(255,255,255,0.2)',
                    boxShadow: isHuidig ? `0 0 0 5px ${kleur}22, 0 0 18px ${kleur}` : 'none',
                  }}
                />
              )

              if (!actief) {
                // Server en zonder animatie: gewone opmaak, alles in beeld.
                return (
                  <li key={tekst} className="relative" style={{ marginTop: i === 0 ? 0 : isHuidig ? TUSSEN + EXTRA : TUSSEN }}>
                    {stip}
                    {isHuidig && <span className="mb-2 block font-mono text-[12px] tracking-[0.14em] text-white/55">{label}</span>}
                    <span
                      className="block font-display leading-[1.15] text-white"
                      style={{ ...(isHuidig ? GROOT : KLEIN), color: isHuidig && isDoel ? '#9BE3BC' : undefined }}
                    >
                      {tekst}
                    </span>
                  </li>
                )
              }

              return (
                <li
                  key={tekst}
                  className="absolute left-8 right-0 top-0 transition-[opacity,transform] duration-500 ease-out"
                  style={{ opacity, transform: `translateY(${plek(i) + (zichtbaar || i > huidig ? 0 : 12)}px)` }}
                >
                  {stip}
                  {/* Klein: wat een schermlezer leest. */}
                  <span
                    ref={(el) => {
                      kleinRefs.current[i] = el
                    }}
                    className="block font-display leading-[1.15] text-white transition-opacity duration-500"
                    style={{ ...KLEIN, opacity: isHuidig ? 0 : 1 }}
                  >
                    {tekst}
                  </span>
                  {/* Groot: dezelfde tekst, over de kleine heen. */}
                  <span
                    ref={(el) => {
                      grootRefs.current[i] = el
                    }}
                    aria-hidden="true"
                    className="absolute left-0 right-0 top-0 block transition-opacity duration-500"
                    style={{ opacity: isHuidig ? 1 : 0 }}
                  >
                    <span className="mb-2 block font-mono text-[12px] tracking-[0.14em] text-white/55">{label}</span>
                    <span
                      className="block font-display leading-[1.15] text-white"
                      style={{ ...GROOT, color: isDoel ? '#9BE3BC' : undefined }}
                    >
                      {tekst}
                    </span>
                  </span>
                </li>
              )
            })}
          </ol>
          {/* Smal scherm: dezelfde zin onder de lijst (vanaf 900px staat hij links). */}
          {naschrift && <p className="m-0 -mt-4 text-[16px] leading-[1.55] text-white/75 tussen:hidden">{naschrift}</p>}
        </div>
      </div>
    </div>
  )
}
