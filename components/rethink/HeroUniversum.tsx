'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import StevinUniversum, { HERINNERINGEN } from './StevinUniversum'
import { ADVISOR, BREIN, BRONNEN, METINGEN, type BronId } from './netwerk'
import { pushDataLayerEvent } from '@/lib/datalayer'

/**
 * Hero van richting C: het 3D-brein vult het scherm, de tekst staat ervoor.
 * Bediening in gewone knoppen (toetsenbord, schermlezer), het beeld volgt.
 *
 * Mobiel is het kop, zin, brein, knop (Koen, 11 okt). De lijst met
 * onderdelen en herinneringen is daar alleen voor toetsenbord en schermlezer:
 * onzichtbaar tot hij focus krijgt. Op desktop zijn de herinneringen dat ook.
 *
 * Geen vraag meer in de hero (Koen, 11 okt 20:21: het beantwoorde moment was
 * "erg druk, veel tekst, te onduidelijk"). De vraagdemo verderop laat dat al
 * zien. Het brein toont hier alleen zichzelf: de bronnen, de stromende
 * puntjes, de herinneringen en context om de beurt, en de hartslag. Een
 * bron of herinnering kiezen kan nog, in het beeld of met de knoppenlijst.
 */

export type Kies = BronId | 'brein' | 'advisor'

// Pauzeknop voor alle beweging die vanzelf loopt (WCAG 2.2.2): het brein, de
// logoband en de watermerken. CSS en de lus van het brein lezen het attribuut.
// Een klein icoon in een hoek van het breinvlak, geen tekstknop in de hero.
const BEWEGING_SLEUTEL = 'stevin_beweging'
function zetBewegingAttribuut(uit: boolean) {
  if (uit) document.documentElement.dataset.beweging = 'uit'
  else delete document.documentElement.dataset.beweging
}

// Tekst en brein naast elkaar: vanaf 900px breed in een liggend venster.
// Daaronder, en op een staande tablet, staat alles onder elkaar. Dezelfde
// voorwaarde staat als variant zij in app/globals.css (Koen, 11 okt: rond
// 980 breed hing het brein in een lege vlakte).
const ZIJ = '(min-width: 900px) and (min-aspect-ratio: 1/1)'

// Plek en maat van het brein naast de tekst, uit wat er echt staat. De bol
// heeft straal 240 in eigen eenheden; StevinUniversum rekent met
// k = min(breedte, hoogte) / 620 * schaal.
//   - Even groot als voorheen op een gewoon scherm (0,92 van de hoogte), maar
//     niet groter dan bij 1180px hoogte: op 2560 en 3440 breed werd het brein
//     anders ruim 1000px groot naast een kop van 84px.
//   - Niet breder dan rechts van de tekst past, met ruimte voor Telefonie en
//     zijn label aan de rechterkant (op 1024 viel dat label weg).
//   - Het midden staat een vast deel van de straal rechts van de tekst, zoals
//     op 1440 (daar blijft alles op zijn plek). Op een breed scherm schuift
//     het brein zo mee met de tekst in plaats van naar de rechterrand.
//   - Onder 1280 breed schuift het midden verder naar rechts, tot de hele bol
//     rechts van de tekst staat op 980 (en het brein dus iets kleiner wordt).
//     Anders liepen bronlabels en grote stippen tijdens het draaien onder de
//     kop en de knoppen door: gemeten 11 okt, in 60 seconden ongeveer 36
//     procent van de tijd op 980, 31 op 1024 en 7 op 1180.
function breinNaastTekst(W: number, H: number, rand: number) {
  const R0 = 240
  const deel = 0.72 + 0.4 * Math.min(1, Math.max(0, (1280 - W) / 300))
  const k = Math.max(0.6, Math.min((Math.min(H, 1180) / 620) * 0.92, (W - rand - 95) / ((deel + 1.04) * R0)))
  const cx = rand + deel * R0 * k
  return { middenX: cx / W, schaal: (k * 620) / Math.min(W, H), cx, R: R0 * k }
}

function push(event: string, data: Record<string, unknown>) {
  // Via de helper, zodat de parameters niet meegaan met latere events (W-346).
  pushDataLayerEvent(event, { ...data, page_path: window.location.pathname })
}

// Na "Wat we doen:" gaat de zin verder met een kleine letter, behalve als hij
// met een merknaam begint ("Meta rond Prinsenbeek ...").
const naDubbelePunt = (zin: string) =>
  /^(Meta|Google|ChatGPT|YouTube)\b/.test(zin) ? zin : zin.charAt(0).toLowerCase() + zin.slice(1)

// start: de bron die bij het openen al gekozen is, zodat elke pagina zijn eigen
// keten laat zien (Koen, 12 okt 07:48: "verander je ook overal de nodes? pas ze
// wel aan per pagina"). Zonder start is het de homepage: niets gekozen.
export default function HeroUniversum({
  kop,
  knoppen,
  start,
}: {
  kop: React.ReactNode
  knoppen: React.ReactNode
  start?: Kies | { herinnering: string }
}) {
  // Een herinnering (Context, Resultaat, Afspraak, Doel) als start: op label.
  const startHerinnering =
    start && typeof start === 'object' ? HERINNERINGEN.findIndex((h) => h.kort === start.herinnering) : -1
  const [focus, setFocus] = useState<Kies | null>(start && typeof start === 'string' ? start : null)
  const [lijstOpen, setLijstOpen] = useState(false)
  // Herinnering gekozen via de knoppenlijst (index in HERINNERINGEN).
  const [herinnering, setHerinnering] = useState<number | null>(startHerinnering >= 0 ? startHerinnering : null)
  // Gekozen in het beeld zelf: dan staat de uitleg al op het kaartje bij de
  // node en hoeft hij niet nog een keer onder de knop.
  const [uitBeeld, setUitBeeld] = useState(false)
  // De statusregel onder de bediening. Na een keuze met een knop schuift hij in
  // beeld als hij net onder de rand of onder de cookiebanner valt (die zet
  // scroll-padding-bottom zolang hij openstaat).
  const uitlegRef = useRef<HTMLParagraphElement>(null)
  const toonUitleg = () => window.requestAnimationFrame(() => uitlegRef.current?.scrollIntoView({ block: 'nearest' }))

  // Een instantie van het brein, alleen in de browser: op desktop in het vlak
  // achter de tekst, op mobiel onder de kop. Beide vlakken hebben een vaste
  // maat, dus er verschuift niets als het brein na het laden verschijnt.
  const [desktop, setDesktop] = useState<boolean | null>(null)
  useEffect(() => {
    const mq = window.matchMedia(ZIJ)
    const zet = () => setDesktop(mq.matches)
    zet()
    mq.addEventListener('change', zet)
    return () => mq.removeEventListener('change', zet)
  }, [])

  const [bewegingUit, setBewegingUit] = useState(false)
  useEffect(() => {
    try {
      if (window.localStorage.getItem(BEWEGING_SLEUTEL) === 'uit') {
        zetBewegingAttribuut(true)
        setBewegingUit(true)
      }
    } catch {
      /* opslag geblokkeerd: dan staat beweging gewoon aan */
    }
  }, [])
  const wisselBeweging = () => {
    const uit = !bewegingUit
    setBewegingUit(uit)
    zetBewegingAttribuut(uit)
    try {
      window.localStorage.setItem(BEWEGING_SLEUTEL, uit ? 'uit' : 'aan')
    } catch {
      /* opslag geblokkeerd: de keuze geldt dan alleen voor deze pagina */
    }
  }

  // demo_node alleen bij kiezen, niet als je dezelfde knop nog eens indrukt
  // om hem uit te zetten.
  const kies = (id: Kies, vanuitBeeld = false) => {
    const aan = focus !== id
    setUitBeeld(vanuitBeeld)
    setHerinnering(null)
    setFocus(aan ? id : null)
    if (aan) push('demo_node', { demo_node: id })
    // Een bron met een keten opent zijn kaartje in het beeld (dat schuift zelf
    // in beeld); de statusregel hieronder blijft dan leeg.
    if (!vanuitBeeld && !(id in METINGEN)) toonUitleg()
  }

  const kiesHerinnering = (i: number) => {
    const aan = herinnering !== i
    setUitBeeld(false)
    setFocus(null)
    setHerinnering(aan ? i : null)
    if (aan) push('demo_node', { demo_node: `herinnering_${String(i + 1).padStart(2, '0')}` })
    toonUitleg()
  }

  // Een herinnering aangetikt in het beeld: de knoppen en de statusregel lopen
  // mee (anders bleef een eerder gekozen knop ingedrukt en noemde de regel nog
  // de oude). De uitleg staat dan op het kaartje bij de node.
  const kiesHerinneringUitBeeld = (i: number | null) => {
    setUitBeeld(true)
    setFocus(null)
    setHerinnering(i)
    if (i != null) push('demo_node', { demo_node: `herinnering_${String(i + 1).padStart(2, '0')}` })
  }

  const sluit = () => {
    setFocus(null)
    setHerinnering(null)
  }

  // Waar de tekst van de hero ophoudt (naast elkaar): rechts daarvan mag een
  // wisselend herinneringslabel staan, links ervan niet. Daaruit volgen ook
  // plek en maat van het brein.
  const tekstRef = useRef<HTMLDivElement>(null)
  const sectieRef = useRef<HTMLElement>(null)
  const [tekstRand, setTekstRand] = useState(0)
  const [vlakMaat, setVlakMaat] = useState<{ w: number; h: number } | null>(null)
  useEffect(() => {
    const sectie = sectieRef.current
    if (!sectie) return
    const meet = () => {
      const t = tekstRef.current?.getBoundingClientRect()
      const s = sectie.getBoundingClientRect()
      setTekstRand(t ? Math.round(t.right - s.left + 16) : 0)
      setVlakMaat((v) => (v && v.w === Math.round(s.width) && v.h === Math.round(s.height) ? v : { w: Math.round(s.width), h: Math.round(s.height) }))
    }
    meet()
    const ro = new ResizeObserver(meet)
    ro.observe(sectie)
    return () => ro.disconnect()
  }, [])

  const alle = [...BRONNEN, BREIN, ADVISOR]
  const gekozen = alle.find((n) => n.id === focus)
  const gekozenHerinnering = herinnering != null ? HERINNERINGEN[herinnering] : null

  const pauzeKnop = (plek: string) => (
    <button
      type="button"
      onClick={wisselBeweging}
      aria-label={bewegingUit ? 'Beweging aan' : 'Beweging uit'}
      title={bewegingUit ? 'Beweging aan' : 'Beweging uit'}
      className={`pointer-events-auto absolute h-8 w-8 place-items-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white focus-visible:text-white ${plek}`}
    >
      {bewegingUit ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
    </button>
  )

  // Naast elkaar: plek en maat van het brein, en daarop de gloed erachter en
  // het donkere verloop over de tekst. Voor de eerste meting de oude waarden.
  const naast = vlakMaat && tekstRand > 0 ? breinNaastTekst(vlakMaat.w, vlakMaat.h, tekstRand) : null
  const gloed = (plek: string) =>
    `radial-gradient(${plek}, rgba(61,142,255,0.18) 0%, rgba(10,22,40,0) 70%)`

  return (
    <section ref={sectieRef} className="relative -mt-[72px] overflow-hidden bg-primary text-white">
      {/* Gloed achter het brein: naast elkaar op het brein zelf, onder elkaar
          midden achter het vlak. */}
      <div
        className="pointer-events-none absolute inset-0 hidden zij:block"
        aria-hidden="true"
        style={{
          background: gloed(naast ? `${Math.round(2.5 * naast.R)}px ${Math.round(1.7 * naast.R)}px at ${Math.round(naast.cx)}px 48%` : '55% 60% at 64% 48%'),
        }}
      />
      <div className="pointer-events-none absolute inset-0 zij:hidden" aria-hidden="true" style={{ background: gloed('80% 42% at 50% 58%') }} />
      {/* Naast elkaar: het brein over de hele breedte, middelpunt rechts van de tekst */}
      <div className="absolute inset-0 hidden zij:block">
        {desktop === true && (
          <StevinUniversum
            focus={focus}
            onKiesHub={(id) => kies(id as Kies, true)}
            onSluit={sluit}
            herinnering={herinnering}
            onKiesHerinnering={kiesHerinneringUitBeeld}
            middenX={naast?.middenX ?? 0.66}
            middenY={0.5}
            schaal={naast?.schaal ?? 0.92}
            vrijBoven={80}
            vrijLinks={tekstRand}
          />
        )}
      </div>
      {/* Verloop over de tekst, tot net voorbij de tekstkolom (op een breed
          scherm anders tot ver in het brein). */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[54%] zij:block"
        aria-hidden="true"
        style={{
          width: tekstRand > 0 ? `${tekstRand + 60}px` : undefined,
          background: 'linear-gradient(90deg, rgba(10,22,40,0.96) 0%, rgba(10,22,40,0.85) 55%, rgba(10,22,40,0) 100%)',
        }}
      />

      {/* Volgorde onder elkaar: kop, brein, knop. Naast elkaar: kop,
          knoppen, bediening, met het brein rechts op de achtergrond. De knoppen
          staan twee keer in de DOM (een per opbouw, de andere op
          display:none), zodat de tabvolgorde altijd gelijk is aan wat je ziet.
          Op een staande tablet staat alles op een as in het midden, met het
          brein groot en de knoppen direct eronder. */}
      <div className="pointer-events-none relative mx-auto flex min-h-[100svh] max-w-[1200px] flex-col justify-center px-6 pb-12 pt-[96px] tablet:items-center tablet:text-center zij:pb-24 zij:pt-[136px]">
        <div ref={tekstRef} className="pointer-events-auto max-w-[560px] tablet:max-w-[620px] zij:max-w-[min(560px,44vw)]">
          {kop}
        </div>

        <div className="pointer-events-auto hidden zij:block zij:max-w-[min(560px,44vw)]">{knoppen}</div>

        {/* Onder elkaar: het brein groot onder de kop, zoals Koen vastlegde: het
            eerste scherm is kop plus beeld. Op een telefoon mag de knop onder
            de vouw (11 okt). Het brein staat in het midden; de Advisor staat
            rechts ervan, dus niet helemaal. Op een staande tablet is het vlak
            hoger. */}
        <div
          className="pointer-events-auto relative -mx-6 mt-2 h-[min(56svh,480px)] self-stretch tablet:mt-4 tablet:h-[min(58svh,78vw,620px)] zij:hidden"
        >
          {desktop === false && (
            <StevinUniversum
              focus={focus}
              onKiesHub={(id) => kies(id as Kies, true)}
              onSluit={sluit}
              herinnering={herinnering}
              onKiesHerinnering={kiesHerinneringUitBeeld}
              middenX={vlakMaat && vlakMaat.w >= 640 ? 0.47 : 0.44}
              middenY={0.5}
              schaal={vlakMaat && vlakMaat.w >= 640 ? 1.02 : 1.25}
            />
          )}
          {pauzeKnop('bottom-1 right-4 grid')}
        </div>

        {/* Bediening */}
        <div className="pointer-events-auto zij:mt-12 zij:max-w-[min(560px,44vw)]">
          <div className="flex flex-wrap items-center gap-2 tablet:justify-center">
            {/* Mobiel alleen zichtbaar met toetsenbordfocus (sr-only tot focus). */}
            <button
              type="button"
              onClick={() => setLijstOpen((o) => !o)}
              aria-expanded={lijstOpen}
              aria-controls="hero-onderdelen"
              className="sr-only text-[13.5px] text-white/60 underline-offset-2 hover:text-white hover:underline focus:not-sr-only zij:not-sr-only"
            >
              {lijstOpen ? 'Minder' : 'Kies een onderdeel'}
            </button>
          </div>
          {/* Open: op desktop zichtbaar, op mobiel alleen zolang de focus erin
              staat. De herinneringen zijn op elke schermmaat alleen zichtbaar
              met focus: er komt niets bij in beeld (11 okt). De wrappers dragen
              sr-only, zodat de marges van de lijsten blijven staan. */}
          <div id="hero-onderdelen" className={lijstOpen ? 'sr-only focus-within:not-sr-only zij:not-sr-only' : 'hidden'}>
            <ul className="m-0 mt-3 flex list-none flex-wrap gap-1.5 p-0">
              {alle.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => kies(n.id as Kies)}
                    aria-pressed={focus === n.id}
                    className={`rounded-full border px-2.5 py-1 text-[13px] transition-colors ${
                      focus === n.id
                        ? 'border-white bg-white text-primary'
                        : 'border-white/20 text-white/75 hover:border-white/60 hover:text-white'
                    }`}
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
            <div role="group" aria-labelledby="hero-herinneringen" className="sr-only focus-within:not-sr-only">
              <p id="hero-herinneringen" className="m-0 mt-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/55">
                Wat Stevin onthoudt en wat er speelt (voorbeeld)
              </p>
              <ul className="m-0 mt-2 flex list-none flex-wrap gap-1.5 p-0">
                {HERINNERINGEN.map((h, i) => (
                  <li key={h.kort}>
                    <button
                      type="button"
                      onClick={() => kiesHerinnering(i)}
                      aria-pressed={herinnering === i}
                      className={`rounded-full border px-2.5 py-1 text-[13px] transition-colors ${
                        herinnering === i
                          ? 'border-white bg-white text-primary'
                          : 'border-white/20 text-white/75 hover:border-white/60 hover:text-white'
                      }`}
                    >
                      {h.kort}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Naast elkaar altijd twee regels hoog: de hero staat verticaal in
              het midden, en dan springt de kop niet als hier tekst verschijnt.
              Onder elkaar staat hier meestal niets (de uitleg staat dan op het
              kaartje in het beeld), en dan neemt de regel geen ruimte. */}
          <p
            ref={uitlegRef}
            aria-live="polite"
            className="m-0 text-[14.5px] leading-snug text-white/70 [&:not(:empty)]:mt-3 zij:mt-3 zij:min-h-[44px]"
          >
            {gekozen && !uitBeeld && !(gekozen.id in METINGEN) ? (
              <>
                <strong className="font-semibold text-white">{gekozen.label}.</strong> {gekozen.uitleg}
              </>
            ) : gekozenHerinnering && !uitBeeld ? (
              <>
                <strong className="font-semibold text-white">{gekozenHerinnering.kort}</strong> (voorbeeld
                {gekozenHerinnering.wanneer ? `, ${gekozenHerinnering.wanneer}` : ''}). {gekozenHerinnering.uitleg}
                {gekozenHerinnering.actie && (
                  <> Wat we doen: {naDubbelePunt(gekozenHerinnering.actie)}</>
                )}
              </>
            ) : bewegingUit ? null : (
              <span className="hidden zij:inline">Sleep om te draaien.</span>
            )}
          </p>
        </div>

        <div className="pointer-events-auto mt-6 max-w-[560px] zij:hidden">{knoppen}</div>

        {/* Naast elkaar: pauzeknop rechtsonder in het breinvlak */}
        {pauzeKnop('bottom-6 right-6 hidden zij:grid')}
      </div>
    </section>
  )
}
