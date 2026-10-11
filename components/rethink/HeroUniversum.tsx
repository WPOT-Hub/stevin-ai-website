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
 */

type Kies = BronId | 'brein' | 'advisor'

// Dezelfde bronnen als de vraagdemo verderop: geen CRM nodig (Koen, 11 okt).
const VRAAG = {
  tekst: 'Resultaten deze week?',
  bronnen: ['website', 'telefonie', 'offertes'] as BronId[],
  signaal: '6 aanvragen, opvolging onbekend',
  uitleg: 'Voorbeeld: bij zes aanvragen staat nergens of iemand heeft teruggebeld.',
}

// Pauzeknop voor alle beweging die vanzelf loopt (WCAG 2.2.2): het brein, de
// logoband en de watermerken. CSS en de lus van het brein lezen het attribuut.
// Een klein icoon in een hoek van het breinvlak, geen tekstknop in de hero.
const BEWEGING_SLEUTEL = 'stevin_beweging'
function zetBewegingAttribuut(uit: boolean) {
  if (uit) document.documentElement.dataset.beweging = 'uit'
  else delete document.documentElement.dataset.beweging
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
    const mq = window.matchMedia('(min-width: 1024px)')
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

  const vraag = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
    setFocus(null)
    setHerinnering(null)
    push('demo_vraag', { demo_vraag: 'hero_resultaten_week', demo_bron: 'hero_klik' })
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFase('advies')
      return
    }
    ;(['bronnen', 'brein', 'signaal', 'advies'] as UniversumFase[]).forEach((f, i) =>
      timers.current.push(window.setTimeout(() => setFase(f), 300 + i * 1100)),
    )
  }

  // demo_node alleen bij kiezen, niet als je dezelfde knop nog eens indrukt
  // om hem uit te zetten.
  const kies = (id: Kies, vanuitBeeld = false) => {
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
    setUitBeeld(true)
    timers.current.forEach((t) => window.clearTimeout(t))
    setFase('rust')
    setFocus(null)
    setHerinnering(i)
    if (i != null) push('demo_node', { demo_node: `herinnering_${String(i + 1).padStart(2, '0')}` })
  }

  const sluit = () => {
    setFocus(null)
    setHerinnering(null)
  }

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

  return (
    <section className="relative -mt-[72px] overflow-hidden bg-primary text-white">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ background: 'radial-gradient(55% 60% at 64% 48%, rgba(61,142,255,0.18) 0%, rgba(10,22,40,0) 70%)' }}
      />
      {/* Desktop: het brein over de hele breedte, middelpunt rechts van de tekst */}
      <div className="absolute inset-0 hidden lg:block">
        {desktop === true && (
          <StevinUniversum
            fase={fase}
            actieveBronnen={fase === 'rust' ? [] : VRAAG.bronnen}
            focus={focus}
            signaal={VRAAG.signaal}
            onKiesHub={(id) => kies(id as Kies, true)}
            onSluit={sluit}
            herinnering={herinnering}
            onKiesHerinnering={kiesHerinneringUitBeeld}
            middenX={0.66}
            middenY={0.5}
            schaal={0.92}
          />
        )}
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[54%] lg:block"
        aria-hidden="true"
        style={{ background: 'linear-gradient(90deg, rgba(10,22,40,0.96) 0%, rgba(10,22,40,0.85) 55%, rgba(10,22,40,0) 100%)' }}
      />

      {/* Volgorde: op mobiel kop, brein, vraag, knop. Op desktop kop, knoppen,
          bediening, met het brein rechts op de achtergrond. De knoppen staan
          twee keer in de DOM (een per schermmaat, de andere op display:none),
          zodat de tabvolgorde altijd gelijk is aan wat je ziet. */}
      <div className="pointer-events-none relative mx-auto flex min-h-[100svh] max-w-[1200px] flex-col justify-center px-6 pb-12 pt-[96px] lg:pb-24 lg:pt-[136px]">
        <div className="pointer-events-auto max-w-[560px]">{kop}</div>

        <div className="pointer-events-auto hidden max-w-[560px] lg:block">{knoppen}</div>

        {/* Mobiel: het brein onder de kop. Het vlak krijgt wat er overblijft
            na kop, zin, vraagknop en knop (samen ongeveer 410px), zodat de knop
            ook op een laag scherm in het eerste beeld staat (Koen: kop, zin,
            brein, vraagknop, knop). Met een vaste minimumhoogte van 360px viel
            de knop op elke telefoon onder de vouw (11 okt). */}
        <div className="pointer-events-auto relative -mx-6 mt-2 h-[clamp(150px,calc(100svh-410px),480px)] lg:hidden">
          {desktop === false && (
            <StevinUniversum
              fase={fase}
              actieveBronnen={fase === 'rust' ? [] : VRAAG.bronnen}
              focus={focus}
              signaal={VRAAG.signaal}
              onKiesHub={(id) => kies(id as Kies, true)}
              onSluit={sluit}
              herinnering={herinnering}
              onKiesHerinnering={kiesHerinneringUitBeeld}
              middenX={0.36}
              middenY={0.5}
              schaal={1.15}
            />
          )}
          {pauzeKnop('bottom-1 right-4 grid')}
        </div>

        {/* Bediening */}
        <div className="pointer-events-auto lg:mt-14 lg:max-w-[560px]">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={vraag}
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
              className="sr-only text-[13.5px] text-white/60 underline-offset-2 hover:text-white hover:underline focus:not-sr-only lg:not-sr-only"
            >
              {lijstOpen ? 'Minder' : 'Of kies een onderdeel'}
            </button>
          </div>
          {/* Open: op desktop zichtbaar, op mobiel alleen zolang de focus erin
              staat. De herinneringen zijn op elke schermmaat alleen zichtbaar
              met focus: er komt niets bij in beeld (11 okt). De wrappers dragen
              sr-only, zodat de marges van de lijsten blijven staan. */}
          <div id="hero-onderdelen" className={lijstOpen ? 'sr-only focus-within:not-sr-only lg:not-sr-only' : 'hidden'}>
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
          {/* Minimumhoogte alleen als de vraag loopt: in rust duwde hij op
              mobiel de knop 80px omlaag. */}
          <p
            ref={uitlegRef}
            aria-live="polite"
            className={`m-0 mt-3 text-[14.5px] leading-snug text-white/70 lg:mt-4 lg:min-h-[44px] ${fase !== 'rust' ? 'min-h-[80px]' : ''}`}
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
                {VRAAG.uitleg}{' '}
                <a href="#hoe-het-werkt" className="font-semibold text-[#9CC6FF] underline-offset-2 hover:underline">
                  Probeer het zelf
                </a>
              </>
            ) : fase !== 'rust' ? (
              'Stevin pakt website, telefoon en offertes erbij...'
            ) : bewegingUit ? null : (
              <span className="hidden lg:inline">Sleep om het brein te draaien.</span>
            )}
          </p>
        </div>

        <div className="pointer-events-auto mt-6 max-w-[560px] lg:hidden">{knoppen}</div>

        {/* Desktop: pauzeknop rechtsonder in het breinvlak */}
        {pauzeKnop('bottom-6 right-6 hidden lg:grid')}
      </div>
    </section>
  )
}
