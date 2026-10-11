'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import StevinUniversum, { HERINNERINGEN, type UniversumFase } from './StevinUniversum'
import { ADVISOR, BREIN, BRONNEN, type BronId } from './netwerk'

/**
 * Hero van richting C: het 3D-brein vult het scherm, de tekst staat ervoor.
 * Bediening in gewone knoppen (toetsenbord, schermlezer), het beeld volgt.
 *
 * Mobiel blijft kop, zin, brein, vraagknop, knop (Koen, 11 okt). De lijst met
 * onderdelen en herinneringen is daar alleen voor toetsenbord en schermlezer:
 * onzichtbaar tot hij focus krijgt. Op desktop zijn de herinneringen dat ook.
 *
 * Ongeveer anderhalve seconde na het laden speelt de vraag een keer vanzelf af
 * (verkoopsynthese 11 okt), zodat je zonder klikken ziet wat Stevin doet. Niet
 * onder reduced motion of Beweging uit, en niet als je al zelf iets koos.
 */

type Kies = BronId | 'brein' | 'advisor'

// Dezelfde bronnen als de vraagdemo verderop: geen CRM nodig (Koen, 11 okt).
// Het antwoord in het brein is dezelfde week als in de demo (38 aanvragen,
// 4 opdrachten), met de opdrachten in accent (verkoopsynthese 11 okt).
const VRAAG = {
  tekst: 'Resultaten deze week?',
  bronnen: ['website', 'telefonie', 'offertes'] as BronId[],
  antwoord: { label: 'DEZE WEEK', tekst: '38 aanvragen,', accent: '4 opdrachten' },
  uitleg: 'Voorbeeld: installatiebedrijf.',
}

// Pauzeknop voor alle beweging die vanzelf loopt (WCAG 2.2.2): het brein, de
// logoband en de watermerken. CSS en de lus van het brein lezen het attribuut.
// Een klein icoon in een hoek van het breinvlak, geen tekstknop in de hero.
const BEWEGING_SLEUTEL = 'stevin_beweging'
function zetBewegingAttribuut(uit: boolean) {
  if (uit) document.documentElement.dataset.beweging = 'uit'
  else delete document.documentElement.dataset.beweging
}

// Zo lang na het laden speelt de vraag vanzelf af (ms), en zo lang blijft het
// antwoord daarna staan. Dan draait het brein weer en lichten de herinneringen
// om de beurt op; anders stond het beeld na vijf seconden voor iedereen stil.
// Wie zelf op de vraag klikt, houdt het antwoord.
const AUTO_NA = 1500
const AUTO_ANTWOORD = 8000

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
function breinNaastTekst(W: number, H: number, rand: number) {
  const R0 = 240
  const k = Math.max(0.6, Math.min((Math.min(H, 1180) / 620) * 0.92, (W - rand - 95) / (1.76 * R0)))
  const cx = rand + 0.72 * R0 * k
  return { middenX: cx / W, schaal: (k * 620) / Math.min(W, H), cx, R: R0 * k }
}

function push(event: string, data: Record<string, unknown>) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer ?? []
  w.dataLayer.push({ event, ...data, page_path: window.location.pathname })
}

export default function HeroUniversum({ kop, knoppen }: { kop: React.ReactNode; knoppen: React.ReactNode }) {
  const [fase, setFase] = useState<UniversumFase>('rust')
  const [focus, setFocus] = useState<Kies | null>(null)
  const [lijstOpen, setLijstOpen] = useState(false)
  // Herinnering gekozen via de knoppenlijst (index in HERINNERINGEN).
  const [herinnering, setHerinnering] = useState<number | null>(null)
  // Gekozen in het beeld zelf: dan staat de uitleg al op het kaartje bij de
  // node en hoeft hij niet nog een keer onder de knop.
  const [uitBeeld, setUitBeeld] = useState(false)
  const timers = useRef<number[]>([])
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])
  // Speelt de vraag nog vanzelf af? Na een eigen keuze of klik niet meer.
  const autoKlaar = useRef(false)
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
    autoKlaar.current = true
    const uit = !bewegingUit
    setBewegingUit(uit)
    zetBewegingAttribuut(uit)
    try {
      window.localStorage.setItem(BEWEGING_SLEUTEL, uit ? 'uit' : 'aan')
    } catch {
      /* opslag geblokkeerd: de keuze geldt dan alleen voor deze pagina */
    }
  }

  const vraag = (bron: 'hero_klik' | 'hero_auto' = 'hero_klik') => {
    autoKlaar.current = true
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
    setFocus(null)
    setHerinnering(null)
    push('demo_vraag', { demo_vraag: 'hero_resultaten_week', demo_bron: bron })
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFase('advies')
      return
    }
    ;(['bronnen', 'brein', 'signaal', 'advies'] as UniversumFase[]).forEach((f, i) =>
      timers.current.push(window.setTimeout(() => setFase(f), 300 + i * 1100)),
    )
    if (bron === 'hero_auto') timers.current.push(window.setTimeout(() => setFase('rust'), 300 + 3 * 1100 + AUTO_ANTWOORD))
  }

  // demo_node alleen bij kiezen, niet als je dezelfde knop nog eens indrukt
  // om hem uit te zetten.
  const kies = (id: Kies, vanuitBeeld = false) => {
    autoKlaar.current = true
    const aan = focus !== id
    setUitBeeld(vanuitBeeld)
    timers.current.forEach((t) => window.clearTimeout(t))
    setFase('rust')
    setHerinnering(null)
    setFocus(aan ? id : null)
    if (aan) push('demo_node', { demo_node: id })
    if (!vanuitBeeld) toonUitleg()
  }

  const kiesHerinnering = (i: number) => {
    autoKlaar.current = true
    const aan = herinnering !== i
    setUitBeeld(false)
    timers.current.forEach((t) => window.clearTimeout(t))
    setFase('rust')
    setFocus(null)
    setHerinnering(aan ? i : null)
    if (aan) push('demo_node', { demo_node: `herinnering_${String(i + 1).padStart(2, '0')}` })
    toonUitleg()
  }

  // Een herinnering aangetikt in het beeld: de knoppen en de statusregel lopen
  // mee (anders bleef een eerder gekozen knop ingedrukt en noemde de regel nog
  // de oude). De uitleg staat dan op het kaartje bij de node.
  const kiesHerinneringUitBeeld = (i: number | null) => {
    autoKlaar.current = true
    setUitBeeld(true)
    timers.current.forEach((t) => window.clearTimeout(t))
    setFase('rust')
    setFocus(null)
    setHerinnering(i)
    if (i != null) push('demo_node', { demo_node: `herinnering_${String(i + 1).padStart(2, '0')}` })
  }

  const sluit = () => {
    autoKlaar.current = true
    setFocus(null)
    setHerinnering(null)
  }

  // De vraag speelt een keer vanzelf af, AUTO_NA na het laden, als de tab
  // zichtbaar is en het brein nog grotendeels in beeld staat. Wie al
  // weggescrold is, ziet hem niet; dan ook niet afspelen en niet meten. Ligt
  // de cookiebanner er nog over (op een telefoon bijna het hele brein), dan
  // wacht hij tot die dicht is.
  const vraagRef = useRef(vraag)
  vraagRef.current = vraag
  const vlakDesktop = useRef<HTMLDivElement>(null)
  const vlakMobiel = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const html = document.documentElement
    let timer = 0
    let wacht: MutationObserver | null = null
    const deelInBeeld = (metBanner: boolean) => {
      const vlak = window.matchMedia(ZIJ).matches ? vlakDesktop.current : vlakMobiel.current
      const r = vlak?.getBoundingClientRect()
      if (!r || r.height === 0) return 0
      const onder = window.innerHeight - (metBanner ? parseFloat(html.style.scrollPaddingBottom) || 0 : 0)
      return (Math.min(r.bottom, onder) - Math.max(r.top, 0)) / r.height
    }
    const speel = () => {
      timer = 0
      if (autoKlaar.current) return
      const stil = window.matchMedia('(prefers-reduced-motion: reduce)').matches || html.dataset.beweging === 'uit'
      if (stil || deelInBeeld(false) < 0.5) {
        autoKlaar.current = true
        return
      }
      if (deelInBeeld(true) < 0.5) {
        if (!wacht) {
          wacht = new MutationObserver(() => {
            if (!html.style.scrollPaddingBottom && !timer) timer = window.setTimeout(speel, 600)
          })
          wacht.observe(html, { attributes: true, attributeFilter: ['style'] })
        }
        return
      }
      wacht?.disconnect()
      vraagRef.current('hero_auto')
    }
    const start = () => {
      if (document.visibilityState !== 'visible' || timer || autoKlaar.current) return
      timer = window.setTimeout(speel, AUTO_NA)
    }
    start()
    document.addEventListener('visibilitychange', start)
    return () => {
      document.removeEventListener('visibilitychange', start)
      wacht?.disconnect()
      if (timer) window.clearTimeout(timer)
    }
  }, [])

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
      <div ref={vlakDesktop} className="absolute inset-0 hidden zij:block">
        {desktop === true && (
          <StevinUniversum
            fase={fase}
            actieveBronnen={fase === 'rust' ? [] : VRAAG.bronnen}
            focus={focus}
            antwoord={VRAAG.antwoord}
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

      {/* Volgorde onder elkaar: kop, brein, vraag, knop. Naast elkaar: kop,
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
            eerste scherm is kop plus beeld. Op een telefoon mogen de vraagknop
            en de knop onder de vouw (11 okt); het brein staat daar iets links
            van het midden, zodat bij de vraag de Advisor en Telefonie rechts
            nog in beeld staan. Op een staande tablet is het vlak hoger en het
            brein bijna in het midden. */}
        <div
          ref={vlakMobiel}
          className="pointer-events-auto relative -mx-6 mt-2 h-[min(56svh,480px)] self-stretch tablet:mt-4 tablet:h-[min(58svh,78vw,620px)] zij:hidden"
        >
          {desktop === false && (
            <StevinUniversum
              fase={fase}
              actieveBronnen={fase === 'rust' ? [] : VRAAG.bronnen}
              focus={focus}
              antwoord={VRAAG.antwoord}
              onKiesHub={(id) => kies(id as Kies, true)}
              onSluit={sluit}
              herinnering={herinnering}
              onKiesHerinnering={kiesHerinneringUitBeeld}
              middenX={vlakMaat && vlakMaat.w >= 640 ? 0.46 : 0.4}
              middenY={0.5}
              schaal={vlakMaat && vlakMaat.w >= 640 ? 1.02 : 1.25}
            />
          )}
          {pauzeKnop('bottom-1 right-4 grid')}
        </div>

        {/* Bediening */}
        <div className="pointer-events-auto zij:mt-14 zij:max-w-[min(560px,44vw)]">
          <div className="flex flex-wrap items-center gap-2 tablet:justify-center">
            <button
              type="button"
              onClick={() => vraag()}
              className="rounded-full border border-[#5DA3FF] bg-[#5DA3FF]/15 px-4 py-2 text-[14.5px] font-semibold text-white transition-colors hover:bg-[#5DA3FF] hover:text-primary"
            >
              {VRAAG.tekst}
            </button>
            {/* Mobiel alleen zichtbaar met toetsenbordfocus (sr-only tot focus). */}
            <button
              type="button"
              onClick={() => setLijstOpen((o) => !o)}
              aria-expanded={lijstOpen}
              aria-controls="hero-onderdelen"
              className="sr-only text-[13.5px] text-white/60 underline-offset-2 hover:text-white hover:underline focus:not-sr-only zij:not-sr-only"
            >
              {lijstOpen ? 'Minder' : 'Of kies een onderdeel'}
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
                Wat Stevin onthoudt (voorbeeld)
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
          {/* Altijd een regel hoog: de vraag speelt vanzelf af, en dan mag
              de knop eronder niet verspringen. */}
          <p
            ref={uitlegRef}
            aria-live="polite"
            className="m-0 mt-3 min-h-[20px] text-[14.5px] leading-snug text-white/70 zij:mt-4 zij:min-h-[44px]"
          >
            {gekozen && !uitBeeld ? (
              <>
                <strong className="font-semibold text-white">{gekozen.label}.</strong> {gekozen.uitleg}
              </>
            ) : gekozenHerinnering && !uitBeeld ? (
              <>
                <strong className="font-semibold text-white">{gekozenHerinnering.kort}</strong> (voorbeeld,{' '}
                {gekozenHerinnering.wanneer}). {gekozenHerinnering.uitleg}
              </>
            ) : fase === 'advies' ? (
              <>
                {/* Het antwoord staat in het beeld (aria-hidden); hier ook voor
                    een schermlezer. */}
                <span className="sr-only">
                  Deze week: {VRAAG.antwoord.tekst} {VRAAG.antwoord.accent}.{' '}
                </span>
                {VRAAG.uitleg}
              </>
            ) : fase !== 'rust' ? null : bewegingUit ? null : (
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
