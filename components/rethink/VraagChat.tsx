'use client'

import { useEffect, useRef, useState } from 'react'
import { CornerDownLeft, Search } from 'lucide-react'

/**
 * De vraagdemo in de stijl van de Desk (W-535, richting C).
 *
 * Koen, 11 okt: "we zijn alles aan het vertellen", "moet misschien ook anders
 * kunnen", "gaan mensen echt klikken daarop?", en 01:53: geen logo in een
 * rondje als avatar, "probeer een beetje Desk-achtig te houden".
 *
 * Dus: het Vraag-paneel uit de Desk (src/app/dashboard/ask-stevin in
 * Stevin-Desk), met de Desk-tokens (paneel wit, rand #d6dde8, hoek 14, zachte
 * schaduw, cijfers in mono). De vraag typt zichzelf zodra het paneel in beeld
 * komt; daarna antwoordkaarten. Per aanvraag dezelfde keuze als de
 * terugkoppelmail van W-123: geen CRM nodig. Alles is voorbeeldgegevens.
 */

type Uitkomst = 'ja' | 'nee' | 'nog_niet'

const VRAAG = 'Resultaten deze week?'

// Twee, niet meer: less is more (Koen, 11 okt).
const AANVRAGEN = [
  { id: 'a1', wat: 'Warmtepomp', wanneer: 'ma, website' },
  { id: 'a2', wat: 'Dakkapel', wanneer: 'di, telefoon' },
]

const WEEK = [
  ['38', 'Aanvragen'],
  ['24', 'Telefoontjes'],
  ['12', 'Offertes'],
  ['4', 'Nieuwe klanten'],
]

const RAND = '#d6dde8'
const SCHADUW = '0 20px 60px rgba(31, 41, 51, 0.06)'

function push(event: string, data: Record<string, unknown> = {}) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer ?? []
  w.dataLayer.push({ event, ...data, page_path: window.location.pathname })
}

function Label({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <p className={`m-0 mb-2 text-[10.5px] font-semibold uppercase tracking-[2px] ${accent ? 'text-[#1D63D8]' : 'text-[#6b7280]'}`}>
      {children}
    </p>
  )
}

function Kaart({ children }: { children: React.ReactNode }) {
  return (
    <div className="vd-in rounded-[12px] border bg-white p-3.5" style={{ borderColor: RAND }}>
      {children}
    </div>
  )
}

export default function VraagChat() {
  const [getypt, setGetypt] = useState('')
  const [stap, setStap] = useState(0) // 0 leeg, 1 typen, 2 denken, 3 cijfers, 4 uitkomsten
  const [uitkomsten, setUitkomsten] = useState<Record<string, Uitkomst>>({})
  const stapRef = useRef(0)
  const timers = useRef<number[]>([])
  const gemeld = useRef(false)
  const paneelRef = useRef<HTMLDivElement>(null)
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])

  // Koen, 01:49: "gaan mensen echt klikken daarop?" Waarschijnlijk weinig.
  // Daarom speelt het zichzelf af zodra het in beeld komt; klikken is een
  // extra. De meting onderscheidt vanzelf en zelf (demo_bron).
  const start = (bron: 'auto' | 'klik') => {
    if (stapRef.current > 0) return
    stapRef.current = 1
    push('demo_vraag', { demo_vraag: 'resultaten_week', demo_bron: bron })
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGetypt(VRAAG)
      setStap(4)
      return
    }
    setStap(1)
    VRAAG.split('').forEach((_, i) =>
      timers.current.push(window.setTimeout(() => setGetypt(VRAAG.slice(0, i + 1)), 40 * i)),
    )
    const t0 = VRAAG.length * 40 + 250
    timers.current.push(window.setTimeout(() => setStap(2), t0))
    timers.current.push(window.setTimeout(() => setStap(3), t0 + 700))
    timers.current.push(window.setTimeout(() => setStap(4), t0 + 1500))
  }

  useEffect(() => {
    const el = paneelRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          start('auto')
          io.disconnect()
        }
      },
      { threshold: 0.45 },
    )
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const kies = (id: string, u: Uitkomst) => {
    const nieuw = { ...uitkomsten, [id]: u }
    setUitkomsten(nieuw)
    push('demo_uitkomst', { demo_uitkomst: u, demo_bron: 'klik' })
    if (!gemeld.current && AANVRAGEN.every((a) => nieuw[a.id])) {
      gemeld.current = true
      push('demo_afgerond', { demo_vraag: 'resultaten_week' })
    }
  }

  const alle = AANVRAGEN.map((a) => uitkomsten[a.id]).filter(Boolean)
  const opdrachten = alle.filter((x) => x === 'ja').length
  const nogNiet = alle.filter((x) => x === 'nog_niet').length
  const klaar = alle.length === AANVRAGEN.length

  return (
    <div
      ref={paneelRef}
      className="mx-auto max-w-[640px] rounded-[14px] border bg-white p-4 sm:px-[18px] sm:py-4"
      style={{ borderColor: RAND, boxShadow: SCHADUW }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#6b7280]">Vraag het Stevin</span>
        <span className="rounded-full bg-[#FFF4DB] px-2 py-0.5 text-[10.5px] font-semibold text-[#8A5A00]">Voorbeeld</span>
      </div>

      {/* Invoer zoals in de Desk */}
      <div className="flex items-center gap-2 rounded-[10px] border bg-[#f7f8fa] p-1.5" style={{ borderColor: RAND }}>
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[#3c8eff]/10 text-[#1D63D8]">
          <Search size={15} aria-hidden="true" />
        </span>
        <span className="min-h-[22px] flex-1 truncate text-[14.5px] text-[#1f2933]">
          {getypt || <span className="text-[#8190a3]">Stel een vraag over je marketing</span>}
          {stap === 1 && <span className="vc-cursor ml-px inline-block h-[15px] w-px translate-y-[2px] bg-[#1f2933]" />}
        </span>
        <button
          type="button"
          onClick={() => start('klik')}
          disabled={stap > 0}
          className="inline-flex items-center gap-1.5 rounded-md bg-[#3c8eff] px-3 py-1.5 text-[12px] font-medium text-white transition-opacity disabled:opacity-60"
        >
          Vraag <CornerDownLeft size={12} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-3 space-y-2.5" aria-live="polite">
        {stap === 2 && (
          <p className="m-0 flex items-center gap-2 px-1 text-[12.5px] text-[#6b7280]">
            <span className="vc-stip h-1.5 w-1.5 rounded-full bg-[#3c8eff]" />
            Website, telefoon en offertes erbij pakken
          </p>
        )}
        {stap >= 3 && (
          <Kaart>
            <Label>Deze week</Label>
            <div className="grid grid-cols-4 overflow-hidden rounded-[10px] border" style={{ borderColor: RAND }}>
              {WEEK.map(([n, l], i) => (
                <div key={l} className="px-2.5 py-2" style={{ borderLeft: i ? `1px solid ${RAND}` : undefined }}>
                  <div className="font-mono text-[19px] font-semibold tabular-nums leading-none text-[#0a0a0a]">{n}</div>
                  <div className="mt-1 text-[11px] leading-tight text-[#6b7280]">{l}</div>
                </div>
              ))}
            </div>
          </Kaart>
        )}
        {stap >= 4 && (
          <Kaart>
            <Label accent>Uitkomst onbekend</Label>
            <p className="m-0 text-[14px] leading-snug text-[#1f2933]">Werd het een opdracht?</p>
            <div className="mt-2.5 space-y-2">
              {AANVRAGEN.map((a) => {
                const u = uitkomsten[a.id]
                return (
                  <div key={a.id} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
                    <span className="text-[13.5px] text-[#1f2933]">
                      <strong className="font-semibold">{a.wat}</strong>{' '}
                      <span className="font-mono text-[11.5px] text-[#8190a3]">{a.wanneer}</span>
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
                          className={`px-3 py-1 font-medium transition-colors ${u === w ? 'bg-[#1D63D8] text-white' : 'text-[#1f2933] hover:bg-[#f7f8fa]'}`}
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
            {klaar && (
              <p className="vd-in m-0 mt-3 border-t pt-2.5 text-[13px] text-[#6b7280]" style={{ borderColor: RAND }}>
                {opdrachten === 0 ? 'Geen opdracht.' : opdrachten === 1 ? 'Een opdracht.' : 'Twee opdrachten.'}{' '}
                {nogNiet > 0 ? 'Wat je nog niet weet, vraag ik volgende week opnieuw.' : 'Genoteerd.'}
              </p>
            )}
          </Kaart>
        )}
      </div>
    </div>
  )
}
