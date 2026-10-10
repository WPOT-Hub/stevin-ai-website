'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { getLeadContext, pushConversionEvent } from '@/lib/tracking'

/**
 * Eigen venster "Plan een kennismaking" (W-535). Koen, 11 okt 01:24: Swoep
 * doet dit veel mooier, en de Cal.com-pagina met zijn naam erbij "klinkt
 * alsof we een eenmanszaakje zijn".
 *
 * Nagekeken hoe Swoep het bouwt (11 okt): een eigen venster met twee
 * tabbladen, en twee eigen serverfuncties: een die vrije slots en bezette
 * blokken teruggeeft, en een die het gekozen slot boekt of de gegevens opslaat.
 * Bescherming met Turnstile en een controle op de herkomst.
 *
 * Dit is de voorkant. De koppeling met de agenda komt via
 * NEXT_PUBLIC_KENNISMAKING_API (GET /beschikbaarheid, POST /boek). Zolang die
 * er niet is, toont het venster een duidelijk gemarkeerde voorbeeldagenda en
 * kan er niet geboekt worden; het tabblad "Laat je gegevens achter" werkt wel,
 * via het bestaande Hub-endpoint.
 *
 * Openen: elk element met data-open-kennismaking op de pagina.
 */

const API = process.env.NEXT_PUBLIC_KENNISMAKING_API?.replace(/\/$/, '') ?? ''
// Cloudflare Turnstile, zoals Swoep (Koen, 11 okt 01:28). De server moet het
// token controleren bij Cloudflare; zonder sitekey wordt er niets getoond.
const TURNSTILE_SITEKEY = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY ?? ''

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      reset: (id?: string) => void
      remove: (id: string) => void
    }
  }
}

function Turnstile({ onToken }: { onToken: (t: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!TURNSTILE_SITEKEY || !ref.current) return
    let id = ''
    const teken = () => {
      if (!window.turnstile || !ref.current || id) return
      id = window.turnstile.render(ref.current, {
        sitekey: TURNSTILE_SITEKEY,
        language: 'nl',
        appearance: 'always',
        callback: onToken,
        'expired-callback': () => onToken(''),
      })
    }
    if (window.turnstile) teken()
    else {
      const bestaand = document.querySelector('script[data-turnstile]')
      const sc = bestaand ?? Object.assign(document.createElement('script'), {
        src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
        async: true,
      })
      sc.setAttribute('data-turnstile', '')
      sc.addEventListener('load', teken)
      if (!bestaand) document.head.appendChild(sc)
    }
    return () => {
      if (id && window.turnstile) window.turnstile.remove(id)
    }
  }, [onToken])
  if (!TURNSTILE_SITEKEY) return null
  return <div ref={ref} className="min-h-[65px]" />
}
const HUB_ENDPOINT = 'https://hub.stevin.ai/api/demo-request'
const DUUR_MIN = 30
const TZ = 'Europe/Amsterdam'
// Koen, 11 okt 01:27 tot 01:30: eerste afspraak 09:00, halfuurblokken zoals
// Swoep. Dinsdag en donderdag zijn zijn salesblokken: daar alleen 09:00 tot
// 10:00. Maandag, woensdag en vrijdag 09:00 tot 17:00 (dezelfde dagen als de
// Hub-regels van W-183 in src/core/crm/afspraakSlots.ts). De echte koppeling
// houdt dezelfde regels aan, minus wat er in de agenda staat.
const VENSTERS: Record<number, [number, number]> = {
  1: [9, 17], // maandag
  2: [9, 10], // dinsdag: salesblok vanaf 10:00
  3: [9, 17], // woensdag
  4: [9, 10], // donderdag: salesblok vanaf 10:00
  5: [9, 17], // vrijdag
}
const DAGEN_PER_SCHERM = 5 // een werkweek

interface Slot {
  start: string
  end: string
}
interface Dag {
  datum: string // YYYY-MM-DD
  slots: Slot[]
  bezet: Slot[]
}

function push(event: string, data: Record<string, unknown> = {}) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer ?? []
  w.dataLayer.push({ event, ...data, page_path: window.location.pathname })
}

// Voorbeeldagenda: de komende tien werkdagen volgens VENSTERS,
// met een paar vaste bezette blokken. Alleen zolang er geen echte koppeling is.
function voorbeeldAgenda(): Dag[] {
  const dagen: Dag[] = []
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  let n = 0
  while (dagen.length < 10 && n < 40) {
    d.setDate(d.getDate() + 1)
    n++
    const wd = d.getDay()
    const venster = VENSTERS[wd]
    if (!venster) continue
    // Lokale datum, niet toISOString: die rekent naar UTC en schuift in de
    // zomer een dag terug (gezien 11 okt: "zo 11" in plaats van "ma 12").
    const datum = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const slots: Slot[] = []
    const bezet: Slot[] = []
    for (let m = venster[0] * 60; m < venster[1] * 60; m += DUUR_MIN) {
      const s = new Date(`${datum}T00:00:00`)
      s.setMinutes(m)
      const e = new Date(s.getTime() + DUUR_MIN * 60000)
      const blok = { start: s.toISOString(), end: e.toISOString() }
      // Vaste "bezette" momenten zodat het rooster er echt uitziet.
      const druk = (m / 30 + dagen.length * 3) % 7 === 0 || (m >= 12 * 60 && m < 13 * 60 && wd % 2 === 0)
      ;(druk ? bezet : slots).push(blok)
    }
    dagen.push({ datum, slots, bezet })
  }
  return dagen
}

const fmtTijd = (iso: string) =>
  new Intl.DateTimeFormat('nl-NL', { timeZone: TZ, hour: '2-digit', minute: '2-digit' }).format(new Date(iso))
const fmtDagKort = (datum: string) =>
  new Intl.DateTimeFormat('nl-NL', { timeZone: TZ, weekday: 'short', day: 'numeric' }).format(new Date(`${datum}T12:00:00`))
const fmtDagLang = (iso: string) =>
  new Intl.DateTimeFormat('nl-NL', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(iso))

export default function KennismakingVenster() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<'moment' | 'gegevens'>('moment')
  const [dagen, setDagen] = useState<Dag[] | null>(null)
  const [voorbeeld, setVoorbeeld] = useState(false)
  const [week, setWeek] = useState(0)
  const [mobDag, setMobDag] = useState(0)
  const [gekozen, setGekozen] = useState<Slot | null>(null)
  const [stap, setStap] = useState<'kies' | 'gegevens' | 'klaar'>('kies')
  const [bezig, setBezig] = useState(false)
  const [fout, setFout] = useState('')
  const [token, setToken] = useState('')
  const zetToken = useCallback((t: string) => setToken(t), [])
  const dialoogRef = useRef<HTMLDivElement>(null)
  const vorigeFocus = useRef<HTMLElement | null>(null)

  const laad = useCallback(async () => {
    setDagen(null)
    if (!API) {
      setVoorbeeld(true)
      setDagen(voorbeeldAgenda())
      return
    }
    try {
      const res = await fetch(`${API}/beschikbaarheid`, { credentials: 'omit' })
      if (!res.ok) throw new Error(String(res.status))
      const json = (await res.json()) as { dagen: Dag[] }
      setVoorbeeld(false)
      setDagen(json.dagen)
    } catch {
      setFout('De agenda laadt nu niet. Laat je gegevens achter, dan bellen we je.')
      setTab('gegevens')
      setDagen([])
    }
  }, [])

  // Openen via data-open-kennismaking, sluiten met Esc.
  useEffect(() => {
    const klik = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.('[data-open-kennismaking]')
      if (!el) return
      // In de capture-fase en met stopPropagation: anders navigeert de
      // Next-link eerst naar /kennismaking (de terugvaloptie zonder JS).
      e.preventDefault()
      e.stopPropagation()
      vorigeFocus.current = document.activeElement as HTMLElement
      setOpen(true)
      push('kennismaking_open', { bron: el.getAttribute('data-cta') ?? '' })
    }
    document.addEventListener('click', klik, true)
    return () => document.removeEventListener('click', klik, true)
  }, [])

  useEffect(() => {
    if (!open) return
    if (!dagen) void laad()
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    window.setTimeout(() => dialoogRef.current?.focus(), 30)
    return () => {
      window.removeEventListener('keydown', esc)
      document.body.style.overflow = ''
      vorigeFocus.current?.focus?.()
    }
  }, [open, dagen, laad])

  const weken = useMemo(() => {
    const w: Dag[][] = []
    for (let i = 0; i < (dagen?.length ?? 0); i += DAGEN_PER_SCHERM) w.push(dagen!.slice(i, i + DAGEN_PER_SCHERM))
    return w
  }, [dagen])

  const kies = (s: Slot) => {
    setGekozen(s)
    setStap('gegevens')
    setFout('')
    push('kennismaking_slot_gekozen')
  }

  const verstuur = async (e: React.FormEvent<HTMLFormElement>, modus: 'boek' | 'gegevens') => {
    e.preventDefault()
    if (bezig) return
    const data = new FormData(e.currentTarget)
    const naam = `${String(data.get('voornaam') ?? '').trim()} ${String(data.get('achternaam') ?? '').trim()}`.trim()
    const email = String(data.get('email') ?? '').trim()
    const bedrijf = String(data.get('bedrijf') ?? '').trim()
    const telefoon = String(data.get('telefoon') ?? '').trim()
    const vraag = String(data.get('vraag') ?? '').trim()
    const honey = String(data.get('_honey') ?? '')
    if (!naam || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFout('Vul je naam en een geldig e-mailadres in.')
      return
    }
    if (TURNSTILE_SITEKEY && !token) {
      setFout('Vink eerst aan dat je geen robot bent.')
      return
    }
    if (modus === 'boek' && voorbeeld) {
      setFout('Dit is nog een voorbeeldagenda. Boeken kan zodra de agenda gekoppeld is.')
      return
    }
    setBezig(true)
    setFout('')
    try {
      if (modus === 'boek' && gekozen) {
        const res = await fetch(`${API}/boek`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'omit',
          body: JSON.stringify({ start: gekozen.start, naam, email, bedrijf, telefoon, vraag, _honey: honey, turnstile: token, context: getLeadContext() }),
        })
        if (res.status === 409) {
          setFout('Dit moment is net vergeven. Kies een ander moment.')
          setStap('kies')
          void laad()
          return
        }
        if (!res.ok) throw new Error(String(res.status))
        void pushConversionEvent('meeting_booked', { email }, { event_slug: 'kennismaking', bron: 'eigen_agenda' })
      } else {
        const res = await fetch(HUB_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: naam,
            email,
            company: bedrijf,
            phone: telefoon,
            message: vraag,
            source: 'kennismaking_venster',
            _honey: honey,
            turnstile: token,
            context: getLeadContext(),
          }),
        })
        if (!res.ok) throw new Error(String(res.status))
        void pushConversionEvent('generate_lead', { email }, { bron: 'kennismaking_venster' })
      }
      setStap('klaar')
    } catch {
      setFout('Versturen lukte niet. Probeer het nog een keer, of mail naar koen@stevin.ai.')
    } finally {
      setBezig(false)
    }
  }

  if (!open) return null

  const veld =
    'w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-[15px] text-primary outline-none transition-colors focus:border-accent'

  const label = 'mb-1.5 block font-mono text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#2A3A54]'
  const formulier = (modus: 'boek' | 'gegevens') => (
    <form onSubmit={(e) => verstuur(e, modus)} className="grid gap-4" noValidate>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="block">
        <span className={label}>Bedrijf</span>
        <input name="bedrijf" placeholder="Naam van je bedrijf" autoComplete="organization" className={veld} maxLength={160} />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className={label}>Voornaam</span>
          <input name="voornaam" required placeholder="Voornaam" autoComplete="given-name" className={veld} maxLength={80} />
        </label>
        <label className="block">
          <span className={label}>Achternaam</span>
          <input name="achternaam" placeholder="Achternaam" autoComplete="family-name" className={veld} maxLength={80} />
        </label>
      </div>
      <label className="block">
        <span className={label}>E-mail</span>
        <input name="email" required type="email" placeholder="naam@bedrijf.nl" autoComplete="email" className={veld} maxLength={200} />
      </label>
      <label className="block">
        <span className={label}>Telefoon</span>
        <input name="telefoon" type="tel" placeholder="06 12345678" autoComplete="tel" className={veld} maxLength={40} />
      </label>
      <label className="block">
        <span className={label}>Bericht (mag leeg)</span>
        <textarea
          name="vraag"
          rows={3}
          placeholder="Waar wil je het over hebben?"
          className={`${veld} resize-none`}
          maxLength={2000}
        />
      </label>
      <Turnstile onToken={zetToken} />
      {fout && <p className="m-0 text-[14px] text-[#B42B43]">{fout}</p>}
      <button
        type="submit"
        disabled={bezig}
        className="rounded-xl bg-accent px-5 py-3.5 font-display text-[15.5px] font-bold text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
      >
        {bezig ? 'Even geduld...' : modus === 'boek' ? 'Bevestig de afspraak' : 'Verstuur'}
      </button>
      <p className="m-0 text-[13px] leading-relaxed text-muted">
        Als je verstuurt, bewaren we je gegevens om contact met je op te nemen. Lees de{' '}
        <a href="/privacy" className="underline underline-offset-2 hover:text-primary">
          privacyverklaring
        </a>
        .
      </p>
    </form>
  )

  const huidigeWeek = weken[week] ?? []
  const mobDagen = dagen ?? []

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[#0A1628]/55 backdrop-blur-sm sm:items-center sm:p-6" onClick={() => setOpen(false)}>
      <div
        ref={dialoogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="kennismaking-titel"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92svh] w-full max-w-[880px] overflow-y-auto rounded-t-[24px] bg-white p-5 shadow-[0_30px_80px_rgba(10,22,40,0.35)] outline-none sm:rounded-[24px] sm:p-8"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Sluiten"
          className="absolute right-4 top-4 rounded-full p-2 text-muted transition-colors hover:bg-surface hover:text-primary"
        >
          <X size={20} />
        </button>

        <h2 id="kennismaking-titel" className="m-0 pr-10 font-display text-[24px] font-extrabold text-primary sm:text-[28px]">
          Plan een kennismaking
        </h2>
        <p className="m-0 mt-1.5 text-[15px] text-muted">
          {DUUR_MIN} minuten, online. We kijken samen naar je cijfers en je hoort eerlijk of we iets voor je kunnen doen.
        </p>

        {stap === 'klaar' ? (
          <div className="mt-8 rounded-2xl bg-surface p-6 text-center">
            <p className="m-0 font-display text-[20px] font-bold text-primary">
              {tab === 'moment' && gekozen ? 'De afspraak staat.' : 'Dank je, we nemen contact op.'}
            </p>
            <p className="m-0 mt-2 text-[15px] text-muted">
              {tab === 'moment' && gekozen
                ? `${fmtDagLang(gekozen.start)} om ${fmtTijd(gekozen.start)}. De uitnodiging staat in je mail.`
                : 'Meestal bellen of mailen we binnen een werkdag.'}
            </p>
          </div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-2 rounded-xl bg-surface p-1" role="tablist">
              {(
                [
                  ['moment', 'Kies een moment'],
                  ['gegevens', 'Laat je gegevens achter'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  onClick={() => {
                    setTab(id)
                    setFout('')
                  }}
                  className={`rounded-lg py-2.5 text-[14.5px] font-semibold transition-colors ${tab === id ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-primary'}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {tab === 'gegevens' && <div className="mt-6">{formulier('gegevens')}</div>}

            {tab === 'moment' && stap === 'gegevens' && gekozen && (
              <div className="mt-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-accent/30 bg-accent/[0.06] px-4 py-3">
                  <span className="text-[15px] font-semibold capitalize text-primary">
                    {fmtDagLang(gekozen.start)}, {fmtTijd(gekozen.start)} tot {fmtTijd(gekozen.end)}
                  </span>
                  <button type="button" onClick={() => setStap('kies')} className="text-[14px] font-semibold text-[#1D63D8] hover:underline">
                    Ander moment
                  </button>
                </div>
                {formulier('boek')}
              </div>
            )}

            {tab === 'moment' && stap === 'kies' && (
              <div className="mt-5">
                {voorbeeld && (
                  <p className="m-0 mb-3 rounded-lg bg-[#FFF4DB] px-3 py-2 text-[13px] font-medium text-[#8A5A00]">
                    Voorbeeldagenda: nog niet gekoppeld aan de echte agenda.
                  </p>
                )}
                <p className="m-0 mb-3 text-[13px] text-muted">Tijden in Nederlandse tijd</p>
                {!dagen ? (
                  <p className="m-0 py-10 text-center text-[15px] text-muted">Agenda laden...</p>
                ) : (
                  <>
                    {/* Desktop: een werkweek naast elkaar */}
                    <div className="hidden sm:block">
                      <div className="mb-3 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setWeek((w) => Math.max(0, w - 1))}
                          disabled={week === 0}
                          aria-label="Vorige week"
                          className="rounded-lg border border-border p-2 disabled:opacity-30"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <span className="font-display text-[16px] font-bold text-primary">
                          {huidigeWeek[0] && `${fmtDagKort(huidigeWeek[0].datum)} tot ${fmtDagKort(huidigeWeek[huidigeWeek.length - 1].datum)}`}
                        </span>
                        <button
                          type="button"
                          onClick={() => setWeek((w) => Math.min(weken.length - 1, w + 1))}
                          disabled={week >= weken.length - 1}
                          aria-label="Volgende week"
                          className="rounded-lg border border-border p-2 disabled:opacity-30"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                      <div className="grid max-h-[46svh] grid-cols-5 gap-2 overflow-y-auto pr-1">
                        {huidigeWeek.map((d) => {
                          const alles = [...d.slots.map((s) => ({ ...s, vrij: true })), ...d.bezet.map((s) => ({ ...s, vrij: false }))].sort(
                            (a, b) => a.start.localeCompare(b.start),
                          )
                          return (
                            <div key={d.datum}>
                              <p className="sticky top-0 m-0 bg-white pb-2 text-center text-[13.5px] font-semibold capitalize text-primary">
                                {fmtDagKort(d.datum)}
                              </p>
                              <div className="grid gap-1.5">
                                {alles.map((s) =>
                                  s.vrij ? (
                                    <button
                                      key={s.start}
                                      type="button"
                                      onClick={() => kies(s)}
                                      className="rounded-lg border-2 border-[#1D63D8]/70 py-2 text-[13.5px] font-semibold tabular-nums text-[#1D63D8] transition-colors hover:bg-[#1D63D8] hover:text-white"
                                    >
                                      {fmtTijd(s.start)} tot {fmtTijd(s.end)}
                                    </button>
                                  ) : (
                                    <span
                                      key={s.start}
                                      aria-hidden="true"
                                      className="kv-bezet block h-[38px] rounded-lg"
                                    />
                                  ),
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Mobiel: eerst een dag kiezen, dan een tijd (zoals Swoep) */}
                    <div className="sm:hidden">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setMobDag((i) => Math.max(0, i - 1))}
                          disabled={mobDag === 0}
                          aria-label="Vorige dag"
                          className="shrink-0 rounded-xl border border-border p-2.5 disabled:opacity-30"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <div className="flex flex-1 gap-2 overflow-x-auto [scrollbar-width:none]">
                          {mobDagen.map((d, i) => (
                            <button
                              key={d.datum}
                              type="button"
                              onClick={() => setMobDag(i)}
                              aria-pressed={mobDag === i}
                              className={`shrink-0 rounded-xl border px-3.5 py-2.5 text-[14px] font-semibold capitalize ${mobDag === i ? 'border-[#1D63D8] bg-[#1D63D8]/10 text-[#1D63D8]' : 'border-border text-primary'} ${d.slots.length === 0 ? 'opacity-40' : ''}`}
                            >
                              {fmtDagKort(d.datum)}
                            </button>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => setMobDag((i) => Math.min(mobDagen.length - 1, i + 1))}
                          disabled={mobDag >= mobDagen.length - 1}
                          aria-label="Volgende dag"
                          className="shrink-0 rounded-xl border border-border p-2.5 disabled:opacity-30"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                      <div className="mt-4 grid gap-2.5">
                        {(mobDagen[mobDag]?.slots ?? []).map((s) => (
                          <button
                            key={s.start}
                            type="button"
                            onClick={() => kies(s)}
                            className="rounded-xl border-2 border-[#1D63D8]/70 py-3 text-[16px] font-semibold tabular-nums text-[#1D63D8] active:bg-[#1D63D8] active:text-white"
                          >
                            {fmtTijd(s.start)} tot {fmtTijd(s.end)}
                          </button>
                        ))}
                        {(mobDagen[mobDag]?.slots.length ?? 0) === 0 && (
                          <p className="m-0 py-4 text-center text-[14px] text-muted">Deze dag is vol.</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
