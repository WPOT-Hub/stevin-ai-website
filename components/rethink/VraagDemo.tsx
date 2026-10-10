'use client'

import { useEffect, useRef, useState } from 'react'
import StevinNetwerk from './StevinNetwerk'
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
 * Het punt van de demo: een ontbrekende registratie in het CRM is geen bewijs
 * dat niemand heeft gebeld. De bezoeker legt vier opvolgingen vast, het aantal
 * te controleren aanvragen gaat van zes naar twee, het advies verandert, en de
 * weekresultaten blijven gelijk. Er kwamen geen klanten bij; alleen het beeld
 * klopt nu.
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
    bronnen: ['website', 'telefonie', 'crm', 'offertes', 'verkoop'],
    signaal: 'opvolging onbekend',
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
    signaal: 'eerst de opvolging',
  },
]

const WEEK = [
  { label: 'Contactaanvragen', waarde: 38 },
  { label: 'Telefoontjes', waarde: 24 },
  { label: 'Offertes', waarde: 12 },
  { label: 'Nieuwe klanten', waarde: 4 },
]

interface Aanvraag {
  id: string
  wat: string
  kanaal: string
  /** Wat het team weet maar nog niet in het CRM staat. Leeg = niets bekend. */
  bekend: string | null
}

const AANVRAGEN: Aanvraag[] = [
  { id: 'a1', wat: 'Warmtepomp', kanaal: 'website, maandag', bekend: 'Ruud heeft dinsdag gebeld' },
  { id: 'a2', wat: 'Dakkapel', kanaal: 'telefoon, maandag', bekend: 'Afspraak staat in de agenda' },
  { id: 'a3', wat: 'Badkamer', kanaal: 'website, dinsdag', bekend: 'Teruggebeld, klant denkt na' },
  { id: 'a4', wat: 'Zonnepanelen', kanaal: 'website, woensdag', bekend: 'Mail gestuurd met planning' },
  { id: 'a5', wat: 'Airco', kanaal: 'telefoon, donderdag', bekend: null },
  { id: 'a6', wat: 'Kozijnen', kanaal: 'website, vrijdag', bekend: null },
]

const FASEN: Fase[] = ['bronnen', 'brein', 'signaal', 'advies']

function push(event: string, data: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer ?? []
  w.dataLayer.push({ event, ...data, page_path: window.location.pathname })
}

export default function VraagDemo({ thema = 'licht' }: { thema?: 'licht' | 'donker' }) {
  const [vraag, setVraag] = useState<Vraag | null>(null)
  const [fase, setFase] = useState<Fase>('rust')
  const [vastgelegd, setVastgelegd] = useState<string[]>([])
  const timers = useRef<number[]>([])
  const afgerondGemeld = useRef(false)

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])

  const stel = (v: Vraag) => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
    setVraag(v)
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

  const legVast = (id: string) => {
    if (vastgelegd.includes(id)) return
    const nieuw = [...vastgelegd, id]
    setVastgelegd(nieuw)
    push('demo_opvolging_vastgelegd', { demo_aantal_vastgelegd: nieuw.length })
    if (nieuw.length === 4 && !afgerondGemeld.current) {
      afgerondGemeld.current = true
      push('demo_afgerond', { demo_vraag: 'resultaten_week' })
    }
  }

  const open = AANVRAGEN.length - vastgelegd.length
  const klaar = fase === 'advies'
  const donker = thema === 'donker'

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
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
                  ? 'border-accent bg-accent text-white'
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
              Kies een vraag. Rechts zie je welke informatie Stevin erbij pakt.
            </p>
          )}

          {vraag?.id === 'resultaten_week' && (
            <AntwoordWeek fase={fase} open={open} vastgelegd={vastgelegd} legVast={legVast} donker={donker} />
          )}
          {vraag?.id === 'welke_campagne' && <AntwoordCampagne klaar={klaar} donker={donker} />}
          {vraag?.id === 'meer_budget' && <AntwoordBudget klaar={klaar} donker={donker} open={open} />}
        </div>
      </div>

      {/* ── Rechts: het netwerk dat meebeweegt ── */}
      <div className="lg:sticky lg:top-28">
        <StevinNetwerk
          fase={vraag ? fase : 'rust'}
          actieveBronnen={vraag?.bronnen ?? []}
          signaal={vraag?.id === 'resultaten_week' ? `${open} aanvragen open` : vraag?.signaal}
          thema={thema}
          mobielRoute={false}
          label="Welke informatie Stevin bij deze vraag gebruikt"
        />
      </div>
    </div>
  )
}

function Kaart({
  kop,
  children,
  donker,
  accent,
}: {
  kop: string
  children: React.ReactNode
  donker: boolean
  accent?: boolean
}) {
  return (
    <div
      className={[
        'vd-in mt-4 rounded-2xl border p-4',
        accent
          ? 'border-accent/40 bg-accent/[0.06]'
          : donker
            ? 'border-white/12 bg-white/[0.03]'
            : 'border-border bg-surface',
      ].join(' ')}
    >
      <p className={`m-0 mb-2 text-[12px] font-bold uppercase tracking-[0.1em] ${accent ? 'text-accent' : donker ? 'text-white/55' : 'text-muted'}`}>
        {kop}
      </p>
      <div className={`text-[15px] leading-[1.55] ${donker ? 'text-white/85' : 'text-primary'}`}>{children}</div>
    </div>
  )
}

function AntwoordWeek({
  fase,
  open,
  vastgelegd,
  legVast,
  donker,
}: {
  fase: Fase
  open: number
  vastgelegd: string[]
  legVast: (id: string) => void
  donker: boolean
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
          {vastgelegd.length < 4 ? (
            <p className="m-0">
              Bij <strong className="tabular-nums">{telwoord}</strong> {open === 1 ? 'aanvraag staat' : 'aanvragen staat'} geen
              opvolging in het CRM. Dat zegt nog niet dat niemand heeft gebeld. Het staat alleen nergens.
            </p>
          ) : (
            <p className="m-0">
              Nog bij <strong className="tabular-nums">{telwoord}</strong> aanvragen staat geen opvolging in het CRM, en daar weet
              ook niemand van een gesprek.
            </p>
          )}
          <ul className="m-0 mt-3 list-none space-y-2 p-0">
            {AANVRAGEN.map((a) => {
              const isVast = vastgelegd.includes(a.id)
              return (
                <li
                  key={a.id}
                  className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border px-3 py-2 text-[14px] ${donker ? 'border-white/10' : 'border-border bg-white'}`}
                >
                  <span>
                    <strong className="font-semibold">{a.wat}</strong>{' '}
                    <span className={donker ? 'text-white/55' : 'text-muted'}>({a.kanaal})</span>
                    <br />
                    <span className={`text-[13px] ${a.bekend ? (donker ? 'text-white/70' : 'text-[#2A3A54]') : 'text-[#d23f57]'}`}>
                      {a.bekend ?? 'Niemand weet of hier contact is geweest'}
                    </span>
                  </span>
                  {a.bekend &&
                    (isVast ? (
                      <span className="text-[13px] font-semibold text-[#1f9d55]">Vastgelegd</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => legVast(a.id)}
                        className="rounded-lg border border-accent px-3 py-1.5 text-[13px] font-semibold text-accent hover:bg-accent hover:text-white"
                      >
                        Leg vast
                      </button>
                    ))}
                </li>
              )
            })}
          </ul>
        </Kaart>
      )}

      {toonAdvies && (
        <Kaart kop="Advisor" donker={donker} accent>
          {open === 6 && (
            <p className="m-0">
              Kijk bij deze zes na of iemand contact heeft gehad, en leg het vast. Wat dan nog openstaat, geef je vandaag aan
              een collega.
            </p>
          )}
          {open < 6 && open > 2 && (
            <p className="m-0">
              Nog {telwoord} aanvragen zonder vastgelegde opvolging. Ga door met de rest.
            </p>
          )}
          {open === 2 && (
            <p className="m-0">
              Vier aanvragen zijn opgevolgd, dat staat nu vast. Bij twee weet niemand iets: geef de airco en de kozijnen vandaag
              aan een collega die belt.{' '}
              <span className={donker ? 'text-white/60' : 'text-muted'}>
                De cijfers van deze week blijven gelijk. Er kwamen geen klanten bij, alleen het beeld klopt nu.
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

function AntwoordBudget({ klaar, donker, open }: { klaar: boolean; donker: boolean; open: number }) {
  return (
    <>
      <Kaart kop="Wat Stevin ziet" donker={donker}>
        <p className="m-0">
          De campagnes leveren genoeg aanvragen op. Maar bij <strong className="tabular-nums">{open}</strong> aanvragen weet
          niemand wat ermee gebeurd is.
        </p>
      </Kaart>
      {klaar && (
        <Kaart kop="Advisor" donker={donker} accent>
          <p className="m-0">
            Nu nog niet. Zolang je niet weet wat er met de aanvragen gebeurt, weet je ook niet wat extra budget oplevert. Eerst
            de opvolging op orde, dan praten we over budget.
          </p>
        </Kaart>
      )}
    </>
  )
}
