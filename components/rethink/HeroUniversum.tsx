'use client'

import { useEffect, useRef, useState } from 'react'
import StevinUniversum, { type UniversumFase } from './StevinUniversum'
import { ADVISOR, BREIN, BRONNEN, type BronId } from './netwerk'

/**
 * Hero van richting C: het 3D-brein vult het scherm, de tekst staat ervoor.
 * Bediening in gewone knoppen (toetsenbord, schermlezer), het beeld volgt.
 */

type Kies = BronId | 'brein' | 'advisor'

const VRAAG = {
  tekst: 'Resultaten deze week?',
  bronnen: ['website', 'telefonie', 'crm', 'offertes', 'verkoop'] as BronId[],
  signaal: '6 aanvragen zonder opvolging',
  uitleg:
    'Voorbeeld: met website, telefoon, CRM en offertes gekoppeld ziet Stevin dat bij zes aanvragen niet vastligt of iemand heeft gebeld.',
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
  // Gekozen in het beeld zelf: dan staat de uitleg al op het kaartje bij de
  // node en hoeft hij niet nog een keer onder de knop.
  const [uitBeeld, setUitBeeld] = useState(false)
  const timers = useRef<number[]>([])
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])

  const vraag = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
    setFocus(null)
    push('demo_vraag', { demo_vraag: 'hero_resultaten_week' })
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFase('advies')
      return
    }
    ;(['bronnen', 'brein', 'signaal', 'advies'] as UniversumFase[]).forEach((f, i) =>
      timers.current.push(window.setTimeout(() => setFase(f), 300 + i * 1100)),
    )
  }

  const kies = (id: Kies, vanuitBeeld = false) => {
    setUitBeeld(vanuitBeeld)
    timers.current.forEach((t) => window.clearTimeout(t))
    setFase('rust')
    setFocus((f) => (f === id ? null : id))
    push('demo_node', { demo_node: id })
  }

  const alle = [...BRONNEN, BREIN, ADVISOR]
  const gekozen = alle.find((n) => n.id === focus)

  return (
    <section className="relative -mt-[72px] overflow-hidden bg-primary text-white">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ background: 'radial-gradient(55% 60% at 64% 48%, rgba(61,142,255,0.18) 0%, rgba(10,22,40,0) 70%)' }}
      />
      {/* Desktop: het brein over de hele breedte, middelpunt rechts van de tekst */}
      <div className="absolute inset-0 hidden lg:block">
        <StevinUniversum
          fase={fase}
          actieveBronnen={fase === 'rust' ? [] : VRAAG.bronnen}
          focus={focus}
          signaal={VRAAG.signaal}
          onKiesHub={(id) => kies(id as Kies, true)}
          middenX={0.66}
          middenY={0.5}
          schaal={0.92}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[54%] lg:block"
        aria-hidden="true"
        style={{ background: 'linear-gradient(90deg, rgba(10,22,40,0.96) 0%, rgba(10,22,40,0.85) 55%, rgba(10,22,40,0) 100%)' }}
      />

      {/* Volgorde: op mobiel kop, brein, vraag, knop. Op desktop kop, knoppen,
          bediening, met het brein rechts op de achtergrond. */}
      <div className="pointer-events-none relative mx-auto flex min-h-[100svh] max-w-[1200px] flex-col justify-center px-6 pb-12 pt-[112px] lg:pb-24 lg:pt-[136px]">
        <div className="pointer-events-auto order-1 max-w-[560px]">{kop}</div>

        <div className="pointer-events-auto order-4 mt-6 max-w-[560px] lg:order-2 lg:mt-0">{knoppen}</div>

        {/* Mobiel: het brein groot onder de kop */}
        <div className="pointer-events-auto relative order-2 -mx-6 mt-2 h-[min(56svh,480px)] min-h-[360px] lg:hidden">
          <StevinUniversum
            fase={fase}
            actieveBronnen={fase === 'rust' ? [] : VRAAG.bronnen}
            focus={focus}
            signaal={VRAAG.signaal}
          onKiesHub={(id) => kies(id as Kies, true)}
            middenX={0.36}
            middenY={0.5}
            schaal={1.15}
          />
        </div>

        {/* Bediening */}
        <div className="pointer-events-auto order-3 lg:mt-14 lg:max-w-[560px]">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={vraag}
              className="rounded-full border border-[#5DA3FF] bg-[#5DA3FF]/15 px-4 py-2 text-[14.5px] font-semibold text-white transition-colors hover:bg-[#5DA3FF] hover:text-primary"
            >
              {VRAAG.tekst}
            </button>
            <button
              type="button"
              onClick={() => setLijstOpen((o) => !o)}
              aria-expanded={lijstOpen}
              aria-controls="hero-onderdelen"
              className="hidden text-[13.5px] text-white/60 underline-offset-2 hover:text-white hover:underline lg:inline"
            >
              {lijstOpen ? 'Minder' : 'Of kies een onderdeel'}
            </button>
          </div>
          <ul
            id="hero-onderdelen"
            className={`m-0 mt-3 list-none flex-wrap gap-1.5 p-0 ${lijstOpen ? 'hidden lg:flex' : 'hidden'}`}
          >
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
          <p aria-live="polite" className="m-0 mt-3 text-[14.5px] leading-snug text-white/70 lg:mt-4 lg:min-h-[44px]">
            {gekozen && !uitBeeld ? (
              <>
                <strong className="font-semibold text-white">{gekozen.label}.</strong> {gekozen.uitleg}
              </>
            ) : fase === 'advies' ? (
              <>
                {VRAAG.uitleg}{' '}
                <a href="#hoe-het-werkt" className="font-semibold text-[#9CC6FF] underline-offset-2 hover:underline">
                  Probeer het zelf
                </a>
              </>
            ) : fase !== 'rust' ? (
              'Stevin pakt website, telefoon, CRM, offertes en verkoop erbij...'
            ) : (
              <span className="hidden lg:inline">Sleep om het brein te draaien.</span>
            )}
          </p>
        </div>
      </div>
    </section>
  )
}
