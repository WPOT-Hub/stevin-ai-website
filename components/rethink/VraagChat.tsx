'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CornerDownLeft, Search } from 'lucide-react'
import { pushDataLayerEvent } from '@/lib/datalayer'

/**
 * De vraagdemo in de stijl van de Desk (W-535, richting C).
 *
 * Koen, 11 okt: "we zijn alles aan het vertellen", "gaan mensen echt klikken
 * daarop?", geen logo in een rondje als avatar, "probeer een beetje
 * Desk-achtig te houden". Dus het Vraag-paneel uit de Desk, met de
 * Desk-tokens, en per aanvraag dezelfde keuze als de terugkoppelmail van
 * W-123: geen CRM nodig. Alles is voorbeeldgegevens.
 *
 * Scrollend ingevuld (Koen, 11 okt: "moet dit niet al scrollende worden
 * ingevuld?"), zoals ScrollStappen: terwijl het paneel binnenkomt typt de
 * vraag zich (tekens volgen het scrollen), daarna staat het paneel vast en
 * komt er per stuk scrollen iets bij: de weekcijfers een voor een, de twee
 * aanvragen, de antwoorden (Ja bij de warmtepomp, Weet ik nog niet bij de
 * dakkapel) en als laatste de slotregel. Terugscrollen draait het terug.
 *
 * Zelf klikken blijft kunnen: een gekozen antwoord wint van de scrollstand
 * voor die aanvraag. De knop Vraag speelt de demo op tijd af en daarna volgt
 * hij het scrollen niet meer; de antwoorden wachten dan op de bezoeker.
 *
 * De server tekent de eindstand, alles zichtbaar (zoekmachines, geen
 * JavaScript). Onder reduced motion, met Beweging uit (data-beweging="uit" op
 * html) en op een laag scherm (liggende telefoon) zetten we niets vast en
 * blijft die eindstand staan. Zichtbaar worden gaat alleen via opacity en
 * transform; de plek voor de slotregel is gereserveerd. Zo groeit het paneel
 * niet terwijl het vaststaat. Past de kop niet mee op het scherm (360 bij
 * 740, 375 bij 667), dan staat alleen het paneel vast en scrolt de kop weg.
 *
 * Meting: demo_gezien bij de start (de vraag begint te typen en het paneel
 * staat na 600 ms nog in beeld, of zonder vastzetten zodra het paneel in beeld
 * is); demo_vraag bij een klik op Vraag;
 * demo_uitkomst alleen bij een echte klik op een antwoord; demo_afgerond met
 * demo_bron "scroll" (slotregel bereikt door te scrollen) of "klik" (beide
 * aanvragen zelf beantwoord), elk een keer per paginabezoek.
 */

type Uitkomst = 'ja' | 'nee' | 'nog_niet'

const VRAAG = 'Resultaten deze week?'
const L = VRAAG.length

// Twee, niet meer: less is more (Koen, 11 okt). `scroll` is het antwoord dat
// het scrollen invult.
const AANVRAGEN: { id: string; wat: string; wanneer: string; scroll: Uitkomst }[] = [
  { id: 'a1', wat: 'Warmtepomp', wanneer: 'ma, website', scroll: 'ja' },
  { id: 'a2', wat: 'Dakkapel', wanneer: 'di, telefoon', scroll: 'nog_niet' },
]

const WEEK = [
  ['38', 'Aanvragen'],
  ['24', 'Telefoontjes'],
  ['12', 'Offertes'],
  ['4', 'Opdrachten'],
]

// Randen van de cijfertegels. Smal scherm twee bij twee: met vier naast
// elkaar vielen "Telefoontjes" en "Opdrachten" op 360 en 375 buiten hun vakje.
const TEGELRAND = ['', 'border-l', 'border-t sm:border-l sm:border-t-0', 'border-l border-t sm:border-t-0']

// Stand van de demo als een getal: 0 tot L is het aantal getypte tekens,
// daarboven komt per stap een bij.
//   L+1 Website, telefoon en offertes erbij pakken
//   L+2 tot L+5 de vier cijfertegels
//   L+6 en L+7 de twee aanvragen
//   L+8 Ja bij de warmtepomp, L+9 Weet ik nog niet bij de dakkapel
//   L+10 de slotregel
const VOL = L + 10

// Zo lang staat het paneel vast: 45svh, onder lg 35svh (Koen 11 okt 20:15: "dit duurt te lang die scrol"), zodat de knop
// eronder op een telefoon eerder in beeld komt (CRO-synthese 11 okt, A6). De
// stand is een verhouding van deze hoogte, dus het verloop blijft gelijk.
// W-568 (Koen, 17 okt 2026, iPhone): "loopt niet lekker als je snel scrolt.
// Typen is klaar dan gelijk bam resultaten." Het paneel staat niet meer vast
// en de stappen volgen het scrollen niet meer. Het typen volgt nog wel het
// binnenkomen; zodra de vraag staat, verschijnt alles in een keer. Geen
// vastgezette scrollruimte meer, dus ook niets dat bij snel vegen hapert.
const VAST_SCROLL = 'h-0'
const AANLOOP = 0.45 // het typen loopt over dit deel van de schermhoogte
const KOPBALK = 64 // vaste kopbalk van de site (Header, h-16)

// Het vastgezette deel staat (deels) in beeld, onder de kopbalk.
const inBeeld = (r: DOMRect) => r.top < window.innerHeight && r.bottom > KOPBALK

const RAND = '#d6dde8'
const SCHADUW = '0 20px 60px rgba(31, 41, 51, 0.06)'

function push(event: string, data: Record<string, unknown> = {}) {
  // Via de helper, zodat de parameters niet meegaan met latere events (W-346).
  pushDataLayerEvent(event, { ...data, page_path: window.location.pathname })
}

function slotTekst(opdrachten: number, nogNiet: number) {
  // In een stem, en elk antwoord eindigt bij wat wij doen (verkoopsynthese
  // 11 okt). Na een Ja stond hier dat we het aan Google en Meta doorgeven
  // (Koen, 11 okt 09:27). W-677: die terugkoppeling bestaat nog niet als
  // functie (W-126), dus het blijft bij wat ons team met het antwoord doet.
  return [
    opdrachten > 0
      ? 'Mooi. Daar sturen wij je campagnes op bij.'
      : nogNiet === 0
        ? 'Genoteerd. Dat nemen we mee in je campagnes.'
        : '',
    nogNiet > 0 ? 'Wat je nog niet weet, vragen we over twee weken nog een keer.' : '',
  ]
    .filter(Boolean)
    .join(' ')
}
const LANGSTE_SLOT = slotTekst(1, 1)

function Label({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <p className={`m-0 mb-2 text-[10.5px] font-semibold uppercase tracking-[2px] ${accent ? 'text-primary' : 'text-[#6b7280]'}`}>
      {children}
    </p>
  )
}

const OVERGANG = 'transition-[opacity,transform] duration-[400ms] ease-out motion-reduce:transition-none'
const zicht = (aan: boolean, y = 6) => ({ opacity: aan ? 1 : 0, transform: aan ? 'none' : `translateY(${y}px)` })

function Kaart({ children, zichtbaar }: { children: React.ReactNode; zichtbaar: boolean }) {
  return (
    <div className={`rounded-[12px] border bg-white p-3.5 ${OVERGANG}`} style={{ borderColor: RAND, ...zicht(zichtbaar) }} inert={!zichtbaar}>
      {children}
    </div>
  )
}

type Modus = 'server' | 'stil' | 'scroll'

export default function VraagChat({ kop }: { kop?: React.ReactNode }) {
  const [modus, setModus] = useState<Modus>('server')
  const [stand, setStand] = useState(VOL)
  const [gekozen, setGekozen] = useState<Record<string, Uitkomst>>({})
  const [speelt, setSpeelt] = useState(false)
  const [hoogte, setHoogte] = useState(0)
  // Past de kop met het paneel samen op het scherm, dan staat hij mee vast.
  // Anders (smalle of lage telefoon) staat alleen het paneel vast en scrolt de
  // kop gewoon weg, in plaats van half onder de kopbalk te blijven hangen.
  const [kopVast, setKopVast] = useState(true)

  const buitenRef = useRef<HTMLDivElement>(null)
  const vastRef = useRef<HTMLDivElement>(null)
  const kopRef = useRef<HTMLDivElement>(null)
  const paneelRef = useRef<HTMLDivElement>(null)
  const ruimteRef = useRef<HTMLDivElement>(null)
  const modusRef = useRef<Modus>('server')
  const zelf = useRef(false) // na een klik op Vraag volgt de demo het scrollen niet meer
  const timers = useRef<number[]>([])
  const gezien = useRef(false)
  const gezienTimer = useRef(0)
  const standRef = useRef(VOL)
  const zagBegin = useRef(false) // een stand voor het eind gezien: geen meting na een herstelde scrollpositie
  const afgerond = useRef({ scroll: false, klik: false })

  const wis = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }
  useEffect(
    () => () => {
      wis()
      window.clearTimeout(gezienTimer.current)
    },
    [],
  )

  // Scrollen of stil. Beweging uit kan ook later aan- of uitgaan (knop in de hero).
  useLayoutEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce), (max-height: 499px)')
    const html = document.documentElement
    const zet = () => {
      // Zonder overflow: clip blijft de sectie een scrollvlak en staat er niets vast.
      const kanVast = typeof CSS !== 'undefined' && CSS.supports('overflow', 'clip')
      const m: Modus = mq.matches || html.dataset.beweging === 'uit' || !kanVast ? 'stil' : 'scroll'
      modusRef.current = m
      setModus(m)
      if (m === 'stil' && !zelf.current) {
        wis()
        setSpeelt(false)
        setStand(VOL)
      }
    }
    zet()
    mq.addEventListener('change', zet)
    const mo = new MutationObserver(zet)
    mo.observe(html, { attributes: true, attributeFilter: ['data-beweging'] })
    return () => {
      mq.removeEventListener('change', zet)
      mo.disconnect()
    }
  }, [])

  // Hoogte van het vastgezette deel, voor zijn plek op het scherm, en of de
  // kop mee vast kan. Het scherm meten we zoals de CSS het ziet (100svh).
  useLayoutEffect(() => {
    if (modus !== 'scroll') return
    const vast = vastRef.current
    const paneel = paneelRef.current
    if (!vast || !paneel) return
    const peil = document.createElement('div')
    peil.style.cssText = 'position:fixed;top:0;left:0;width:0;height:100svh;visibility:hidden;pointer-events:none'
    document.body.appendChild(peil)
    const meet = () => {
      const kopHoogte = kopRef.current?.offsetHeight ?? 0
      setKopVast(kopHoogte + paneel.offsetHeight <= peil.offsetHeight - KOPBALK)
      setHoogte(vast.offsetHeight)
    }
    meet()
    const ro = new ResizeObserver(meet)
    for (const el of [vast, paneel, kopRef.current]) if (el) ro.observe(el)
    window.addEventListener('resize', meet)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', meet)
      peil.remove()
    }
  }, [modus, kopVast])

  // Scrollvoortgang naar een stand. Eerst het typen, terwijl het paneel
  // binnenkomt; daarna, als het vaststaat, de stappen.
  useLayoutEffect(() => {
    if (modus !== 'scroll') return
    let raf = 0
    const meet = () => {
      raf = 0
      const buiten = buitenRef.current
      const vast = vastRef.current
      const ruimte = ruimteRef.current
      if (!buiten || !vast || !ruimte || zelf.current) return
      const plek = parseFloat(getComputedStyle(vast).top) || 0
      const r = buiten.getBoundingClientRect()
      // Waar het vastgezette deel zou staan zonder vastzetten: vlak boven de
      // ruimte eronder (die schuift gewoon mee). Werkt met en zonder de kop erin.
      const boven = ruimte.getBoundingClientRect().top - vast.offsetHeight
      let s: number
      if (boven > plek) {
        const aanloop = window.innerHeight * AANLOOP
        const f = Math.min(1, Math.max(0, (plek + aanloop - boven) / aanloop))
        s = Math.round(f * L)
      } else {
        // Vraag getypt: meteen de volledige uitkomst (W-568).
        s = VOL
      }
      standRef.current = s
      setStand(s)

      // Meting. Pas na een stand voor het eind, zodat een herstelde
      // scrollpositie onder de demo niets meet. demo_gezien pas als het paneel
      // na 600 ms nog in beeld is: de site scrolt zacht, dus een sprong via
      // een link schuift in een flits langs de demo. demo_afgerond alleen na
      // demo_gezien.
      if (s < VOL) zagBegin.current = true
      if (!inBeeld(r) || !zagBegin.current) return
      if (s > 0 && !gezien.current && !gezienTimer.current) {
        gezienTimer.current = window.setTimeout(() => {
          gezienTimer.current = 0
          const nu = buitenRef.current?.getBoundingClientRect()
          if (gezien.current || !nu || !inBeeld(nu) || zelf.current) return
          gezien.current = true
          push('demo_gezien', { demo_vraag: 'resultaten_week' })
          // Al aan het eind terwijl de meting wachtte.
          if (standRef.current >= VOL && !afgerond.current.scroll) {
            afgerond.current.scroll = true
            push('demo_afgerond', { demo_vraag: 'resultaten_week', demo_bron: 'scroll' })
          }
        }, 600)
      }
      if (s >= VOL && gezien.current && !afgerond.current.scroll) {
        afgerond.current.scroll = true
        push('demo_afgerond', { demo_vraag: 'resultaten_week', demo_bron: 'scroll' })
      }
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
  }, [modus, hoogte])

  // Zonder vastzetten: demo_gezien zodra het paneel in beeld is.
  useEffect(() => {
    if (modus !== 'stil' || gezien.current) return
    const el = vastRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !gezien.current) {
          gezien.current = true
          push('demo_gezien', { demo_vraag: 'resultaten_week' })
          io.disconnect()
        }
      },
      { threshold: 0.45 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [modus])

  // Klik op Vraag: op tijd afspelen tot de twee aanvragen er staan. Daarna
  // wachten de antwoorden op de bezoeker.
  const vraag = () => {
    if (speelt) return
    wis()
    zelf.current = true
    setGekozen({})
    push('demo_vraag', { demo_vraag: 'resultaten_week', demo_bron: 'klik' })
    if (modusRef.current !== 'scroll') {
      setStand(L + 7)
      return
    }
    setSpeelt(true)
    setStand(0)
    const later = (ms: number, f: () => void) => timers.current.push(window.setTimeout(f, ms))
    for (let i = 1; i <= L; i++) later(40 * i, () => setStand(i))
    const t0 = L * 40 + 250
    later(t0, () => setStand(L + 1))
    // Cijfertegels na elkaar, 120 ms ertussen.
    for (let i = 0; i < 4; i++) later(t0 + 700 + i * 120, () => setStand(L + 2 + i))
    const t1 = t0 + 700 + 4 * 120 + 200
    later(t1, () => setStand(L + 6))
    later(t1 + 150, () => {
      setStand(L + 7)
      setSpeelt(false)
    })
  }

  const kies = (id: string, u: Uitkomst) => {
    const nieuw = { ...gekozen, [id]: u }
    setGekozen(nieuw)
    push('demo_uitkomst', { demo_uitkomst: u, demo_bron: 'klik' })
    if (!afgerond.current.klik && AANVRAGEN.every((a) => nieuw[a.id])) {
      afgerond.current.klik = true
      push('demo_afgerond', { demo_vraag: 'resultaten_week', demo_bron: 'klik' })
    }
  }

  // Wat er bij deze stand te zien is.
  const k = Math.max(0, stand - L)
  const getypt = VRAAG.slice(0, Math.min(stand, L))
  const typt = stand > 0 && stand < L
  const pakken = k === 1
  const tegels = Math.min(4, Math.max(0, k - 1))
  const rijen = Math.min(2, Math.max(0, k - 5))
  const uitkomst = (i: number): Uitkomst | undefined =>
    gekozen[AANVRAGEN[i].id] ?? (k >= 8 + i ? AANVRAGEN[i].scroll : undefined)
  const alle = AANVRAGEN.map((_, i) => uitkomst(i)).filter(Boolean)
  const opdrachten = alle.filter((x) => x === 'ja').length
  const nogNiet = alle.filter((x) => x === 'nog_niet').length
  const klaar = alle.length === AANVRAGEN.length
  const zelfGekozen = Object.keys(gekozen).length > 0
  // Bij scrollen als laatste; na een eigen klik meteen na een Ja, anders als
  // beide zijn ingevuld.
  const slot = rijen > 0 && (k >= 10 || (zelfGekozen && (opdrachten > 0 || klaar)))

  const vast = modus === 'scroll'
  // Midden in het scherm onder de kopbalk; past het niet, dan met de onderkant
  // op de onderkant van het scherm, zodat wat erbij komt in beeld blijft.
  const vastStijl = vast
    ? { top: `min(calc(${KOPBALK}px + (100svh - ${KOPBALK}px - ${hoogte}px) / 2), calc(100svh - ${hoogte}px))` }
    : undefined

  // De kop met de ruimte eronder; staat in of boven het vastgezette deel.
  const kopBlok = kop ? (
    <div ref={kopRef} className="pb-10">
      {kop}
    </div>
  ) : null

  return (
    <div ref={buitenRef} className="relative">
      {vast && !kopVast && kopBlok}
      <div ref={vastRef} className={vast ? 'sticky z-[1]' : undefined} style={vastStijl}>
        {(!vast || kopVast) && kopBlok}
        <div
          ref={paneelRef}
          className="mx-auto max-w-[640px] rounded-[14px] border bg-white p-4 sm:px-[18px] sm:py-4"
          style={{ borderColor: RAND, boxShadow: SCHADUW }}
        >
          {/* Gewone paneeltitel in plaats van de gele badge (verkoopsynthese 11 okt). */}
          <p className="m-0 mb-3 text-[13px] font-semibold text-[#1f2933]">Voorbeeld: installatiebedrijf</p>

          {/* Invoer zoals in de Desk */}
          <div className="flex items-center gap-2 rounded-[10px] border bg-[#f7f8fa] p-1.5" style={{ borderColor: RAND }}>
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-accent/10 text-accent">
              <Search size={15} aria-hidden="true" />
            </span>
            <span className="min-h-[22px] flex-1 truncate text-[14.5px] text-[#1f2933]">
              {getypt || <span className="text-[#6b7280]">Stel een vraag over je marketing</span>}
              {typt && <span className="vc-cursor ml-px inline-block h-[15px] w-px translate-y-[2px] bg-[#1f2933]" />}
            </span>
            <button
              type="button"
              onClick={vraag}
              disabled={speelt}
              className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-[12px] font-medium text-white transition-opacity disabled:opacity-60"
            >
              {/* Op een telefoon alleen Vraag, zonder het Enter-teken: anders
                  viel de getypte vraag op 360 weg achter puntjes. */}
              <span>
                Vraag{k >= 2 && <span className="hidden sm:inline"> opnieuw</span>}
              </span>
              <CornerDownLeft size={12} aria-hidden="true" className="hidden sm:block" />
            </button>
          </div>

          <div className="relative mt-3 space-y-2.5" aria-live="polite">
            {pakken && (
              <p className="absolute inset-x-0 top-0 m-0 flex items-center gap-2 px-1 pt-1 text-[12.5px] text-[#6b7280]">
                <span className="vc-stip h-1.5 w-1.5 rounded-full bg-[#3D8EFF]" />
                Website, telefoon en offertes erbij pakken
              </p>
            )}
            <Kaart zichtbaar={tegels > 0}>
              <Label>Deze week</Label>
              <div className="grid grid-cols-2 overflow-hidden rounded-[10px] border sm:grid-cols-4" style={{ borderColor: RAND }}>
                {WEEK.map(([n, l], i) => (
                  <div
                    key={l}
                    className={`min-w-0 border-[#d6dde8] px-2.5 py-2 ${TEGELRAND[i]} ${OVERGANG}`}
                    style={zicht(i < tegels, 4)}
                  >
                    {/* De opdrachten in accent, zoals het antwoord in de hero. */}
                    <div
                      className={`font-mono text-[19px] font-semibold tabular-nums leading-none ${i === WEEK.length - 1 ? 'text-accent font-bold' : 'text-[#0a0a0a]'}`}
                    >
                      {n}
                    </div>
                    <div className="mt-1 text-[11px] leading-tight text-[#6b7280]">{l}</div>
                  </div>
                ))}
              </div>
            </Kaart>
            <Kaart zichtbaar={rijen > 0}>
              <Label accent>Uitkomst onbekend</Label>
              <p className="m-0 text-[14px] leading-snug text-[#1f2933]">Werd het een opdracht?</p>
              <div className="mt-2.5 space-y-2">
                {AANVRAGEN.map((a, ai) => {
                  const u = uitkomst(ai)
                  const zichtbaar = ai < rijen
                  return (
                    <div
                      key={a.id}
                      className={`flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 ${OVERGANG}`}
                      style={zicht(zichtbaar, 4)}
                      inert={!zichtbaar}
                    >
                      <span className="text-[13.5px] text-[#1f2933]">
                        <strong className="font-semibold">{a.wat}</strong>{' '}
                        <span className="font-mono text-[11.5px] text-[#6b7280]">{a.wanneer}</span>
                      </span>
                      {/* Segmentknop zoals in de Desk */}
                      <span
                        className="inline-flex overflow-hidden rounded-full border text-[12px]"
                        style={{ borderColor: RAND }}
                        role="group"
                        aria-label={`Uitkomst ${a.wat}`}
                      >
                        {(
                          [
                            ['ja', 'Ja'],
                            ['nee', 'Nee'],
                            ['nog_niet', 'Weet ik nog niet'],
                          ] as const
                        ).map(([w, l], i) => (
                          <button
                            key={w}
                            type="button"
                            onClick={() => kies(a.id, w)}
                            aria-pressed={u === w}
                            className={`px-3 py-1 font-medium transition-colors duration-300 ${u === w ? 'bg-accent text-white' : 'text-[#1f2933] hover:bg-[#f7f8fa]'}`}
                            style={{ borderLeft: i ? `1px solid ${RAND}` : undefined }}
                          >
                            {l}
                          </button>
                        ))}
                      </span>
                    </div>
                  )
                })}
              </div>
              {/* Vaste plek voor de langste slotregel, zodat de kaart niet groeit
                  als de regel verschijnt of van lengte wisselt. */}
              <div
                className={`mt-3 grid border-t pt-2.5 text-[13px] ${OVERGANG}`}
                style={{ borderColor: RAND, ...zicht(slot, 4) }}
                aria-hidden={!slot}
              >
                <p className="invisible col-start-1 row-start-1 m-0" aria-hidden="true">
                  {LANGSTE_SLOT}
                </p>
                <p className="col-start-1 row-start-1 m-0 text-[#6b7280]">{slotTekst(opdrachten, nogNiet)}</p>
              </div>
            </Kaart>
          </div>
        </div>
      </div>
      {/* Hierlangs scrolt de bezoeker terwijl het paneel vaststaat. */}
      {vast && <div ref={ruimteRef} aria-hidden="true" className={VAST_SCROLL} />}
    </div>
  )
}
