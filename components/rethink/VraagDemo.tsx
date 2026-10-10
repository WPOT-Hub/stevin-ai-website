'use client'

import { useEffect, useRef, useState } from 'react'
import StevinNetwerk from './StevinNetwerk'
import StevinUniversum from './StevinUniversum'
import type { BronId, Fase } from './netwerk'

/**
 * "Stel een vraag aan Stevin" (W-535, briefing 10 okt 2026, sectie 3).
 *
 * Alles hierin is VOORBEELDDATA en staat zo gemarkeerd op het scherm. Het
 * laat zien hoe het werkt als website, telefonie, CRM en offertes gekoppeld
 * zijn. Let op: telefonie en offertes zijn bij geen enkele klant gekoppeld
 * (audit 10 okt); dat is inrichting of maatwerk, geen bestaande koppeling.
 * De tekst rond de demo zegt dat ook.
 *
 * Het punt van de demo (Koen, 11 okt 01:46): geen CRM nodig. Net als de
 * terugkoppelmail van W-123 (src/core/aanvragen/mail.ts in de Hub) kies je per
 * aanvraag "Ja, opdracht", "Nee" of "Weet ik nog niet". Het aantal aanvragen
 * zonder uitkomst gaat van zes naar twee, het advies verandert mee, de
 * weekcijfers blijven gelijk.
 */

type VraagId = 'resultaten_week' | 'welke_campagne' | 'meer_budget'

interface Vraag {
  id: VraagId
  tekst: string
  bronnen: BronId[]
  signaal: string
}

const VRAGEN: Vraag[] = [
  {
    id: 'resultaten_week',
    tekst: 'Resultaten deze week?',
    bronnen: ['website', 'telefonie', 'offertes', 'verkoop'],
    signaal: 'uitkomst onbekend',
  },
  {
    id: 'welke_campagne',
    tekst: 'Welke campagne levert klanten op?',
    bronnen: ['campagnes', 'website', 'crm', 'offertes', 'verkoop'],
    signaal: 'aantal is niet kwaliteit',
  },
  {
    id: 'meer_budget',
    tekst: 'Moet ik meer budget uitgeven?',
    bronnen: ['doelen', 'campagnes', 'crm', 'verkoop', 'markt'],
    signaal: 'eerst de uitkomsten',
  },
]

const WEEK = [
  { label: 'Contactaanvragen', waarde: 38 },
  { label: 'Telefoontjes', waarde: 24 },
  { label: 'Offertes', waarde: 12 },
  { label: 'Nieuwe klanten', waarde: 4 },
]

type Uitkomst = 'ja' | 'nee' | 'nog_niet'

interface Aanvraag {
  id: string
  wat: string
  kanaal: string
}

const AANVRAGEN: Aanvraag[] = [
  { id: 'a1', wat: 'Warmtepomp', kanaal: 'maandag, website' },
  { id: 'a2', wat: 'Dakkapel', kanaal: 'maandag, telefoon' },
  { id: 'a3', wat: 'Badkamer', kanaal: 'dinsdag, website' },
  { id: 'a4', wat: 'Zonnepanelen', kanaal: 'woensdag, website' },
  { id: 'a5', wat: 'Airco', kanaal: 'donderdag, telefoon' },
  { id: 'a6', wat: 'Kozijnen', kanaal: 'vrijdag, website' },
]

const FASEN: Fase[] = ['bronnen', 'brein', 'signaal', 'advies']

function push(event: string, data: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer ?? []
  w.dataLayer.push({ event, ...data, page_path: window.location.pathname })
}

export default function VraagDemo({
  thema = 'licht',
  drieD = false,
  zonderNetwerk = false,
}: {
  thema?: 'licht' | 'donker'
  drieD?: boolean
  /** Alleen het gesprek, smal en gecentreerd (richting C: het 3D-brein staat al in de hero). */
  zonderNetwerk?: boolean
}) {
  const [vraag, setVraag] = useState<Vraag | null>(null)
  const [fase, setFase] = useState<Fase>('rust')
  const [uitkomsten, setUitkomsten] = useState<Record<string, Uitkomst>>({})
  const timers = useRef<number[]>([])
  const afgerondGemeld = useRef(false)
  const gestartGemeld = useRef(false)
  const lijstRef = useRef<HTMLUListElement>(null)
  const adviesRef = useRef<HTMLDivElement>(null)

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])

  const stel = (v: Vraag) => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
    setVraag(v)
    // demo_start een keer per bezoek aan de demo, demo_vraag bij elke keuze.
    // Zo staat demo_afgerond tegenover starts, niet tegenover klikken.
    if (!gestartGemeld.current) {
      gestartGemeld.current = true
      push('demo_start', { demo_vraag: v.id })
    }
    push('demo_vraag', { demo_vraag: v.id })
    const stil = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (stil) {
      setFase('advies')
      return
    }
    FASEN.forEach((f, i) => {
      timers.current.push(window.setTimeout(() => setFase(f), i * 750))
    })
  }

  const kiesUitkomst = (id: string, u: Uitkomst) => {
    const nieuw = { ...uitkomsten, [id]: u }
    setUitkomsten(nieuw)
    push('demo_uitkomst', { demo_uitkomst: u })
    const beantwoord = Object.values(nieuw).filter((x) => x !== 'nog_niet').length
    if (beantwoord >= 4 && !afgerondGemeld.current) {
      afgerondGemeld.current = true
      push('demo_afgerond', { demo_vraag: 'resultaten_week' })
    }
  }

  const open = AANVRAGEN.filter((a) => !uitkomsten[a.id] || uitkomsten[a.id] === 'nog_niet').length
  const klaar = fase === 'advies'
  const donker = thema === 'donker'

  return (
    <div
      className={
        zonderNetwerk
          ? 'mx-auto grid max-w-[720px] grid-cols-1'
          : 'grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start'
      }
    >
      {/* ── Links: het gesprek ── */}
      <div
        className={`rounded-[20px] border p-5 sm:p-7 ${donker ? 'border-white/12 bg-white/5' : 'border-border bg-white shadow-[0_10px_40px_rgba(10,22,40,0.07)]'}`}
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className={`m-0 text-[13px] font-semibold ${donker ? 'text-white/70' : 'text-muted'}`}>Vraag het Stevin</p>
          <span className="rounded-full bg-[#FFF4DB] px-2.5 py-1 text-[11.5px] font-semibold text-[#8A5A00]">
            Voorbeeldgegevens
          </span>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Kies een vraag">
          {VRAGEN.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => stel(v)}
              aria-pressed={vraag?.id === v.id}
              className={[
                'rounded-full border px-4 py-2 text-[14.5px] font-medium transition-colors',
                vraag?.id === v.id
                  ? 'border-[#1D63D8] bg-[#1D63D8] text-white'
                  : donker
                    ? 'border-white/20 text-white hover:border-accent-light'
                    : 'border-border bg-surface text-primary hover:border-accent',
              ].join(' ')}
            >
              {v.tekst}
            </button>
          ))}
        </div>

        <div aria-live="polite" className="mt-6 min-h-[120px]">
          {!vraag && (
            <p className={`m-0 text-[15px] ${donker ? 'text-white/60' : 'text-muted'}`}>
              {zonderNetwerk ? 'Kies een vraag.' : 'Kies een vraag. Rechts zie je welke informatie Stevin erbij pakt.'}
            </p>
          )}

          {vraag?.id === 'resultaten_week' && (
            <AntwoordWeek
              fase={fase}
              open={open}
              uitkomsten={uitkomsten}
              kiesUitkomst={kiesUitkomst}
              donker={donker}
              lijstRef={lijstRef}
              adviesRef={adviesRef}
            />
          )}
          {vraag?.id === 'welke_campagne' && <AntwoordCampagne klaar={klaar} donker={donker} />}
          {vraag?.id === 'meer_budget' && <AntwoordBudget klaar={klaar} donker={donker} />}
        </div>
      </div>

      {/* ── Rechts: het netwerk dat meebeweegt ── */}
      {/* Op mobiel boven het gesprek, anders zie je de bronnen niet oplichten. */}
      <div className={zonderNetwerk ? 'hidden' : 'order-first lg:sticky lg:top-28 lg:order-none'}>
        {drieD ? (
          // Richting C: hetzelfde 3D-brein als in de hero.
          <div className="relative h-[340px] overflow-hidden rounded-[20px] bg-primary sm:h-[420px] lg:h-[560px]">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{ background: 'radial-gradient(60% 60% at 50% 50%, rgba(61,142,255,0.16) 0%, rgba(10,22,40,0) 70%)' }}
            />
            <StevinUniversum
              fase={vraag ? (fase as 'rust' | 'bronnen' | 'brein' | 'signaal' | 'advies') : 'rust'}
              actieveBronnen={vraag?.bronnen ?? []}
              signaal={vraag?.id === 'resultaten_week' ? `${open} zonder uitkomst` : vraag?.signaal}
              middenX={0.42}
              middenY={0.5}
              schaal={0.95}
            />
          </div>
        ) : (
          <StevinNetwerk
            fase={vraag ? fase : 'rust'}
            actieveBronnen={vraag?.bronnen ?? []}
            signaal={vraag?.id === 'resultaten_week' ? `${open} zonder uitkomst` : vraag?.signaal}
            thema={thema}
            mobielRoute={false}
            label="Welke informatie Stevin bij deze vraag gebruikt"
          />
        )}
      </div>
    </div>
  )
}

function Kaart({
  kop,
  children,
  donker,
  accent,
  kaartRef,
}: {
  kop: string
  children: React.ReactNode
  donker: boolean
  accent?: boolean
  kaartRef?: React.Ref<HTMLDivElement>
}) {
  return (
    <div
      ref={kaartRef}
      tabIndex={kaartRef ? -1 : undefined}
      className={[
        'vd-in mt-4 rounded-2xl border p-4',
        accent
          ? 'border-accent/40 bg-accent/[0.06]'
          : donker
            ? 'border-white/12 bg-white/[0.03]'
            : 'border-border bg-surface',
      ].join(' ')}
    >
      <p className={`m-0 mb-2 text-[12px] font-bold uppercase tracking-[0.1em] ${accent ? 'text-[#1D63D8]' : donker ? 'text-white/55' : 'text-muted'}`}>
        {kop}
      </p>
      <div className={`text-[15px] leading-[1.55] ${donker ? 'text-white/85' : 'text-primary'}`}>{children}</div>
    </div>
  )
}

function AntwoordWeek({
  fase,
  open,
  uitkomsten,
  kiesUitkomst,
  donker,
  lijstRef,
  adviesRef,
}: {
  fase: Fase
  open: number
  uitkomsten: Record<string, Uitkomst>
  kiesUitkomst: (id: string, u: Uitkomst) => void
  donker: boolean
  lijstRef: React.Ref<HTMLUListElement>
  adviesRef: React.Ref<HTMLDivElement>
}) {
  const toonSignaal = fase === 'signaal' || fase === 'advies'
  const toonAdvies = fase === 'advies'
  const telwoord = ['geen', 'een', 'twee', 'drie', 'vier', 'vijf', 'zes'][open] ?? String(open)

  return (
    <>
      <Kaart kop="Deze week" donker={donker}>
        <dl className="m-0 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {WEEK.map((r) => (
            <div key={r.label}>
              <dt className={`text-[12.5px] ${donker ? 'text-white/60' : 'text-muted'}`}>{r.label}</dt>
              <dd className="m-0 font-display text-[28px] font-extrabold tabular-nums leading-tight">{r.waarde}</dd>
            </div>
          ))}
        </dl>
      </Kaart>

      {toonSignaal && (
        <Kaart kop="Wat valt op" donker={donker}>
          <p className="m-0">
            Van <strong className="tabular-nums">{telwoord}</strong> {open === 1 ? 'aanvraag' : 'aanvragen'} weet je nog niet wat
            {open === 1 ? ' hij opleverde' : ' ze opleverden'}. Werd het een opdracht?
          </p>
          <ul ref={lijstRef} className="m-0 mt-3 list-none space-y-2 p-0">
            {AANVRAGEN.map((a) => {
              const u = uitkomsten[a.id]
              const knop = (waarde: Uitkomst, label: string, hoofd = false) => (
                <button
                  type="button"
                  onClick={() => kiesUitkomst(a.id, waarde)}
                  aria-pressed={u === waarde}
                  className={`rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors ${
                    u === waarde
                      ? 'bg-[#1D63D8] text-white'
                      : hoofd
                        ? 'border border-[#1D63D8] text-[#1D63D8] hover:bg-[#1D63D8] hover:text-white'
                        : donker
                          ? 'border border-white/25 text-white/85'
                          : 'border border-border text-primary hover:border-primary'
                  }`}
                >
                  {label}
                </button>
              )
              return (
                <li key={a.id} className={`rounded-xl border px-3 py-2.5 text-[14px] ${donker ? 'border-white/10' : 'border-border bg-white'}`}>
                  <p className="m-0">
                    <strong className="font-semibold">{a.wat}</strong>{' '}
                    <span className={donker ? 'text-white/55' : 'text-muted'}>({a.kanaal})</span>
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label={`Uitkomst ${a.wat}`}>
                    {knop('ja', 'Ja, opdracht', true)}
                    {knop('nee', 'Nee')}
                    {knop('nog_niet', 'Weet ik nog niet')}
                  </div>
                  {u === 'nog_niet' && (
                    <p className={`m-0 mt-1.5 text-[12.5px] ${donker ? 'text-white/55' : 'text-muted'}`}>We vragen het volgende week opnieuw.</p>
                  )}
                </li>
              )
            })}
          </ul>
        </Kaart>
      )}

      {toonAdvies && (
        <Kaart kop="Advisor" donker={donker} accent kaartRef={adviesRef}>
          {open === 6 && (
            <p className="m-0">
              Laat per aanvraag weten wat het werd. Dan zie je welke campagnes opdrachten opleveren, en niet alleen aanvragen. Het
              is een klik per aanvraag.
            </p>
          )}
          {open < 6 && open > 2 && <p className="m-0">Nog {telwoord} aanvragen zonder uitkomst.</p>}
          {open <= 2 && (
            <p className="m-0">
              Van de {AANVRAGEN.length - open} die je invulde, {Object.values(uitkomsten).filter((x) => x === 'ja').length === 1 ? 'werd er een' : `werden er ${Object.values(uitkomsten).filter((x) => x === 'ja').length}`}{' '}
              een opdracht. Naar de rest vragen we volgende week opnieuw.{' '}
              <span className={donker ? 'text-white/60' : 'text-muted'}>
                De cijfers van deze week blijven gelijk. Je weet nu alleen wat ze waard waren.
              </span>
            </p>
          )}
        </Kaart>
      )}
    </>
  )
}

function AntwoordCampagne({ klaar, donker }: { klaar: boolean; donker: boolean }) {
  return (
    <>
      <Kaart kop="Laatste vier weken" donker={donker}>
        <table className="w-full border-collapse text-left text-[14.5px] tabular-nums">
          <thead>
            <tr className={donker ? 'text-white/55' : 'text-muted'}>
              <th className="pb-1 font-medium">Campagne</th>
              <th className="pb-1 font-medium">Aanvragen</th>
              <th className="pb-1 font-medium">Offertes</th>
              <th className="pb-1 font-medium">Klanten</th>
            </tr>
          </thead>
          <tbody className="font-semibold">
            <tr>
              <td className="py-1">Campagne A</td>
              <td>21</td>
              <td>4</td>
              <td>1</td>
            </tr>
            <tr>
              <td className="py-1">Campagne B</td>
              <td>9</td>
              <td>6</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </Kaart>
      {klaar && (
        <Kaart kop="Advisor" donker={donker} accent>
          <p className="m-0">
            Op aantallen wint A, op klanten B. Schuif nog geen budget: vier weken is kort. Kijk eerst met verkoop waarom de
            aanvragen uit A zo weinig offertes worden.
          </p>
        </Kaart>
      )}
    </>
  )
}

function AntwoordBudget({ klaar, donker }: { klaar: boolean; donker: boolean }) {
  return (
    <>
      <Kaart kop="Wat Stevin ziet" donker={donker}>
        <p className="m-0">
          Er komen aanvragen binnen. Maar van zes weet je nog niet of het een opdracht werd.
        </p>
      </Kaart>
      {klaar && (
        <Kaart kop="Advisor" donker={donker} accent>
          <p className="m-0">
            Nu nog niet. Zolang je niet weet welke aanvragen opdrachten worden, weet je ook niet wat extra budget oplevert. Eerst de uitkomsten, dan praten we over budget.
          </p>
        </Kaart>
      )}
    </>
  )
}
