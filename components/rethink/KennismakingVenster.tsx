'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { getLeadContext, pushConversionEvent, rememberInteraction } from '@/lib/tracking'
import { pushDataLayerEvent } from '@/lib/datalayer'

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
 * er niet is, toont het venster een voorbeeldagenda, sinds de verkoopsynthese
 * van 11 okt zonder gele markering: bij het gekozen moment staat een grijze
 * regel "We mailen je of dit moment kan.", de knop heet "Vraag dit moment
 * aan" en de bevestiging zegt dat het een aanvraag is.
 *
 * Kies je daarin een moment, dan gaat dat als aanvraag naar het bestaande
 * Hub-endpoint (zelfde weg als "Laat je gegevens achter"), met het moment in
 * het bericht, en mailen we zelf of het moment kan. Zo gaan ingevulde gegevens
 * nooit verloren (11 okt). De Hub stuurt meteen zijn gewone ontvangstmail
 * (lead.ts, zonder het moment); de tekst na versturen zegt dat ook.
 *
 * Nooit een aanvraag kwijt (besluit Koen, 11 okt 09:17, zoals Swoep en een
 * stap verder). De browser houdt niets tegen op het vinkje tegen robots: het
 * formulier gaat altijd weg, met het token of leeg, en de server beslist (een
 * aanvraag zonder geldig vinkje wordt daar gemarkeerd en bewaard, zonder
 * uitnodiging). Is de controle nog bezig, dan wachten we eerst kort op het
 * token (tot TOKEN_WACHT_MS), zodat een snelle mens niet als verdacht
 * binnenkomt; daarna gaat het formulier hoe dan ook weg.
 *
 * Wat er terugkomt, lezen we volgens het antwoordcontract bovenaan
 * src/routes/kennismaking.ts in de Hub: eerst ingepland, dan ok met bewaard,
 * dan 409, dan veld, anders een fout met de melding. Nooit alleen res.ok. Is
 * er bij /boek niets bewaard (storing, 403, 413, 415, 429, 5xx, of geen
 * verbinding), dan gaat dezelfde aanvraag met het moment nog via het
 * Hub-endpoint van "Laat je gegevens achter". Lukt ook dat niet, dan toont het
 * venster de melding en de knop "Laat je gegevens achter". Bij elke melding
 * blijven de ingevulde velden staan, ook als je een ander moment kiest of van
 * tabblad wisselt.
 *
 * Openen: elk element met data-open-kennismaking op de pagina.
 *
 * Toegankelijkheid: zolang het venster open is, krijgt alles ernaast inert
 * (op elk niveau van body tot het venster: header, de rest van main, footer).
 * Zo blijft Tab en Shift+Tab in het venster (WCAG 2.4.3), zonder extra
 * knoppen. Na elke stap gaat de focus naar iets zinnigs in het venster, nooit
 * naar body.
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

// Een token is maar een keer geldig: de ouder reset het widget na elke
// verzending via widgetRef, en een nieuw widget erft nooit een oud token.
// Het script laadt zodra het formulier verschijnt, niet al bij het openen van
// het venster. Eerder pas bij de eerste focus: wie met automatisch invullen
// meteen verstuurde, kreeg een melding over een vinkje dat er nog niet was.
//
// Lukt de controle niet (script geblokkeerd, netwerk, een hostnaam die niet
// in het widget staat), dan is er geen token en gaat het formulier zonder weg.
// Geen melding meer en geen uitweg naar de mail: de server bewaart de
// aanvraag en markeert hem (11 okt 09:17).
function Turnstile({
  onToken,
  onMislukt,
  widgetRef,
  actiefRef,
}: {
  onToken: (t: string) => void
  onMislukt: () => void
  widgetRef: React.RefObject<string>
  // Staat er een widget op het scherm (ook als het script nog laadt)?
  actiefRef: React.RefObject<boolean>
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!TURNSTILE_SITEKEY || !ref.current) return
    let id = ''
    let weg = false
    actiefRef.current = true
    const mislukt = () => {
      if (!weg) onMislukt()
    }
    const teken = () => {
      if (weg || !window.turnstile || !ref.current || id) return
      try {
        id = window.turnstile.render(ref.current, {
          sitekey: TURNSTILE_SITEKEY,
          language: 'nl',
          // Alleen zichtbaar als Cloudflare een handeling vraagt; anders ziet de
          // bezoeker niets (CRO-synthese 11 okt, A3).
          appearance: 'interaction-only',
          callback: (t: string) => onToken(t),
          'expired-callback': () => onToken(''),
          // Met een error-callback gooit Turnstile zelf geen fout; true zegt
          // dat hij is afgehandeld (Cloudflare, Client-side errors). Turnstile
          // probeert het daarna zelf opnieuw.
          // Het formulier wacht dan niet meer op een token.
          'error-callback': () => {
            mislukt()
            return true
          },
        })
      } catch {
        mislukt()
        return
      }
      widgetRef.current = id
    }
    let sc: Element | null = null
    if (window.turnstile) teken()
    else {
      const bestaand = document.querySelector('script[data-turnstile]')
      sc = bestaand ?? Object.assign(document.createElement('script'), {
        src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
        async: true,
      })
      sc.setAttribute('data-turnstile', '')
      sc.addEventListener('load', teken)
      // Script geblokkeerd of geen netwerk: niet wachten op een token.
      sc.addEventListener('error', mislukt)
      if (!bestaand) document.head.appendChild(sc)
    }
    return () => {
      weg = true
      sc?.removeEventListener('load', teken)
      sc?.removeEventListener('error', mislukt)
      actiefRef.current = false
      if (id && window.turnstile) window.turnstile.remove(id)
      widgetRef.current = ''
      onToken('')
    }
  }, [onToken, onMislukt, widgetRef, actiefRef])
  if (!TURNSTILE_SITEKEY) return null
  return <div ref={ref} />
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
  // Via de helper, zodat de parameters niet meegaan met latere events (W-346).
  pushDataLayerEvent(event, { ...data, page_path: window.location.pathname })
}

// Rekenen met kale datums (YYYY-MM-DD) in UTC, zodat de tijdzone van de
// bezoeker nergens meetelt.
const plusDagen = (datum: string, n: number) => {
  const d = new Date(`${datum}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}
const weekdag = (datum: string) => new Date(`${datum}T00:00:00Z`).getUTCDay()
const maandagVan = (datum: string) => plusDagen(datum, -((weekdag(datum) + 6) % 7))

// Vandaag en de UTC-afstand van een dag, in Nederlandse tijd. Per dag, zodat
// ook de dagen rond de overgang naar wintertijd (25 okt) goed gaan.
const vandaagInNederland = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
function nederlandseAfstand(datum: string): string {
  const naam =
    new Intl.DateTimeFormat('en-US', { timeZone: TZ, timeZoneName: 'shortOffset' })
      .formatToParts(new Date(`${datum}T12:00:00Z`))
      .find((p) => p.type === 'timeZoneName')?.value ?? ''
  const m = /GMT([+-])(\d{1,2})(?::(\d{2}))?/.exec(naam)
  return m ? `${m[1]}${m[2].padStart(2, '0')}:${m[3] ?? '00'}` : '+01:00'
}

// Voorbeeldagenda: tien werkdagen volgens VENSTERS, in Nederlandse tijd. Alleen
// zolang er geen echte koppeling is. Geen verzonnen bezette blokken meer: een
// agenda die drukker lijkt dan hij is, is verzonnen drukte (CRO-synthese 11
// okt, A3; corpus kern-01).
// Begint pas op de tweede werkdag na vandaag: een gekozen moment is dan een
// aanvraag, en we beloven binnen een werkdag te mailen of het kan. Met de
// eerstvolgende werkdag erbij (zondagavond kiest iemand maandag 09:00) kwam
// dat bericht pas na het moment (11 okt).
function voorbeeldAgenda(): Dag[] {
  const dagen: Dag[] = []
  const vandaag = vandaagInNederland()
  let eersteOvergeslagen = false
  for (let n = 1; dagen.length < 10 && n < 40; n++) {
    const datum = plusDagen(vandaag, n)
    const wd = weekdag(datum)
    const venster = VENSTERS[wd]
    if (!venster) continue
    if (!eersteOvergeslagen) {
      eersteOvergeslagen = true
      continue
    }
    const afstand = nederlandseAfstand(datum)
    const slots: Slot[] = []
    const bezet: Slot[] = []
    for (let m = venster[0] * 60; m < venster[1] * 60; m += DUUR_MIN) {
      const uur = `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
      const s = new Date(`${datum}T${uur}:00${afstand}`)
      const e = new Date(s.getTime() + DUUR_MIN * 60000)
      slots.push({ start: s.toISOString(), end: e.toISOString() })
    }
    dagen.push({ datum, slots, bezet })
  }
  return dagen
}

const fmtTijd = (iso: string) =>
  new Intl.DateTimeFormat('nl-NL', { timeZone: TZ, hour: '2-digit', minute: '2-digit' }).format(new Date(iso))
const fmtDagKort = (datum: string) =>
  new Intl.DateTimeFormat('nl-NL', { timeZone: TZ, weekday: 'short', day: 'numeric' }).format(new Date(`${datum}T12:00:00Z`))
const fmtDagLang = (iso: string) =>
  new Intl.DateTimeFormat('nl-NL', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(iso))
// Alleen de eerste letter een hoofdletter ("Dinsdag 13 oktober"), niet elk
// woord zoals CSS capitalize doet.
const metHoofdletter = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
// Het pad zonder taalvoorvoegsel, zoals ContactForm het als source meegeeft.
const padZonderTaal = () => window.location.pathname.replace(/^\/(nl|en)(?=\/|$)/, '') || '/'
const FOUT_VELDEN = 'Vul je naam en een geldig e-mailadres in.'
// Foutmeldingen per veld (CRO-synthese 11 okt, A3).
const FOUT_NAAM = 'Vul je naam in.'
const FOUT_EMAIL_LEEG = 'Vul je e-mailadres in.'
const FOUT_EMAIL = 'Dit e-mailadres klopt niet. Bijvoorbeeld: naam@bedrijf.nl'
// Zo lang wacht het formulier hoogstens op het vinkje tegen robots als dat nog
// bezig is. Daarna gaat het zonder token weg (de server markeert het dan).
const TOKEN_WACHT_MS = 10_000
const WACHT_OP_CONTROLE = 'Even geduld, we controleren nog of je geen robot bent.'
const AGENDA_LAADT_NIET = 'De agenda laadt nu niet. Laat je gegevens achter, dan nemen we contact op.'
// Meldingen bij een antwoord van de server (Koen, 11 okt 09:17). Bij elk van
// deze blijven de ingevulde velden staan.
const FOUT_VERGEVEN = 'Dit moment is net vergeven. Kies een andere tijd.'
const FOUT_VERSTUREN = 'Versturen lukte niet. Probeer het nog een keer, of mail naar info@stevin.ai.'
// Klaarscherm als de aanvraag binnen is maar het moment niet in de agenda
// staat (202). De Hub stuurt de zin mee; deze twee zijn de terugval, gelijk
// aan binnenTekst in core/crm/kennismaking.ts. Bellen kan alleen met een
// telefoonnummer, zonder mailen we.
const NIET_VAST_BELLEN = 'Je aanvraag is binnen, maar het moment staat nog niet vast. We bellen je binnen een werkdag.'
const NIET_VAST_MAILEN = 'Je aanvraag is binnen, maar het moment staat nog niet vast. We mailen je binnen een werkdag.'

// Vier zichtbare velden: naam en e-mail verplicht, bedrijf en telefoon niet;
// het bericht achter een knop (CRO-synthese 11 okt, A3). De Hub eist alleen
// naam en e-mail.
type Veldnaam = 'naam' | 'email' | 'bedrijf' | 'telefoon' | 'vraag'
type Waarden = Record<Veldnaam, string>
const LEEG: Waarden = { naam: '', email: '', bedrijf: '', telefoon: '', vraag: '' }
// Het veld dat de server noemt bij een 400, op naam van ons invulveld.
const SERVERVELD: Record<string, Veldnaam> = {
  naam: 'naam',
  email: 'email',
  bedrijf: 'bedrijf',
  telefoon: 'telefoon',
  vraag: 'vraag',
}

// Wat een antwoord betekent, in de volgorde van het antwoordcontract in de
// Hub (src/routes/kennismaking.ts): ingepland, dan ok met bewaard, dan 409,
// dan veld, anders fout. Nooit alleen op res.ok: een 202 is bewaard, geen
// boeking. fout betekent: niets bewaard, of geen antwoord dat de browser mag
// lezen (geen verbinding, een 403 zonder CORS-kop).
type Uitkomst =
  | { soort: 'ingepland' }
  | { soort: 'binnen'; melding: string }
  | { soort: 'vergeven'; melding: string }
  | { soort: 'veld'; veld: string; melding: string }
  | { soort: 'fout'; melding: string }
async function stuur(url: string, body: Record<string, unknown>): Promise<Uitkomst> {
  let status = 0
  let a: Record<string, unknown> = {}
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'omit',
      body: JSON.stringify(body),
    })
    status = res.status
    try {
      const j: unknown = await res.json()
      if (j && typeof j === 'object' && !Array.isArray(j)) a = j as Record<string, unknown>
    } catch {
      /* geen JSON, bijvoorbeeld een foutpagina van de proxy */
    }
  } catch {
    return { soort: 'fout', melding: '' }
  }
  const tekst = (v: unknown) => (typeof v === 'string' ? v.trim().slice(0, 300) : '')
  const melding = tekst(a.melding) || tekst(a.error)
  const tweeHonderd = status >= 200 && status < 300
  if (tweeHonderd && a.ok === true && a.ingepland === true) return { soort: 'ingepland' }
  // /boek zegt ok en bewaard; het endpoint van "Laat je gegevens achter"
  // (/api/demo-request) alleen ok, en bewaart bij een 2xx altijd.
  if (tweeHonderd && a.ok !== false && a.bewaard !== false) return { soort: 'binnen', melding }
  if (status === 409) return { soort: 'vergeven', melding }
  const veld = tekst(a.veld)
  if (status === 400 && veld) {
    // Een moment dat niet (meer) in de agenda staat: zelfde weg als 409.
    if (veld === 'start') return { soort: 'vergeven', melding }
    return { soort: 'veld', veld, melding }
  }
  return { soort: 'fout', melding }
}

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
  // Het token in een ref, zodat een verzending die erop wacht het ziet zodra
  // het er is. widgetMislukt: script geblokkeerd of fout, dan niet wachten.
  const tokenRef = useRef('')
  const tokenWachters = useRef<((t: string) => void)[]>([])
  const widgetMislukt = useRef(false)
  const widgetActief = useRef(false)
  const [wachtOpControle, setWachtOpControle] = useState(false)
  // Na een fout zonder bewaarde aanvraag: de knop "Laat je gegevens achter".
  const [terugval, setTerugval] = useState(false)
  const widgetId = useRef('')
  const zetToken = useCallback((t: string) => {
    tokenRef.current = t
    if (!t) return
    widgetMislukt.current = false
    const wachters = tokenWachters.current
    tokenWachters.current = []
    wachters.forEach((w) => w(t))
  }, [])
  const markeerMislukt = useCallback(() => {
    widgetMislukt.current = true
    const wachters = tokenWachters.current
    tokenWachters.current = []
    wachters.forEach((w) => w(''))
  }, [])
  // Het token als het er is; anders hoogstens ms wachten, of meteen leeg als er
  // geen widget is of het mislukte.
  const wachtOpToken = (ms: number) =>
    new Promise<string>((klaar) => {
      if (tokenRef.current) return klaar(tokenRef.current)
      if (!TURNSTILE_SITEKEY || widgetMislukt.current || !widgetActief.current) return klaar('')
      const wachter = (t: string) => {
        window.clearTimeout(timer)
        klaar(t)
      }
      const timer = window.setTimeout(() => {
        tokenWachters.current = tokenWachters.current.filter((w) => w !== wachter)
        klaar('')
      }, ms)
      tokenWachters.current.push(wachter)
    })
  // De ingevulde velden staan hier en niet in het formulier zelf, zodat ze
  // blijven staan als je een ander moment kiest of van tabblad wisselt.
  const [waarden, setWaarden] = useState<Waarden>(LEEG)
  const [foutVelden, setFoutVelden] = useState<Veldnaam[]>([])
  // Eerste focus in het formulier: form_start (een keer per venster).
  const [formGestart, setFormGestart] = useState(false)
  // Hoe het afliep: een afspraak, een aangevraagd moment (voorbeeldagenda),
  // binnen maar niet in de agenda, of alleen gegevens.
  const [klaar, setKlaar] = useState<'geboekt' | 'aangevraagd' | 'nietVast' | 'gegevens'>('gegevens')
  const [metTelefoon, setMetTelefoon] = useState(false)
  const [berichtOpen, setBerichtOpen] = useState(false)
  // De zin van de Hub bij een 202 (bewaard, niet ingepland).
  const [klaarMelding, setKlaarMelding] = useState('')
  const overlayRef = useRef<HTMLDivElement>(null)
  const dialoogRef = useRef<HTMLDivElement>(null)
  const vorigeFocus = useRef<HTMLElement | null>(null)
  const gekozenRegelRef = useRef<HTMLSpanElement>(null)
  const klaarKopRef = useRef<HTMLParagraphElement>(null)
  const focusNa = useRef<'gekozen' | 'slot' | 'klaar' | null>(null)
  const laadt = useRef(false)

  const laad = useCallback(async () => {
    if (laadt.current) return
    laadt.current = true
    setDagen(null)
    try {
      if (!API) {
        setVoorbeeld(true)
        setDagen(voorbeeldAgenda())
        return
      }
      const res = await fetch(`${API}/beschikbaarheid`, { credentials: 'omit' })
      const json = (await res.json().catch(() => null)) as { ok?: boolean; dagen?: Dag[]; melding?: string } | null
      if (!res.ok || !json || !Array.isArray(json.dagen)) {
        // De Hub stuurt bij 403, 429, 500 en 503 een zin voor de bezoeker mee.
        throw new Error(typeof json?.melding === 'string' ? json.melding.slice(0, 300) : '')
      }
      setVoorbeeld(false)
      setDagen(json.dagen)
    } catch (e) {
      setFout((e instanceof Error && e.message) || AGENDA_LAADT_NIET)
      setTab('gegevens')
      setDagen([])
    } finally {
      laadt.current = false
    }
  }, [])

  // Openen via data-open-kennismaking. Alleen preventDefault, geen
  // stopPropagation: de Next-link slaat zijn navigatie naar /kennismaking (de
  // terugval zonder JS) dan over, en de klik bereikt de rest van de pagina nog
  // wel (cta_click, het mobiele menu dat dichtgaat). Cmd-, Ctrl-, Shift- en
  // Alt-klik blijven gewoon een link.
  useEffect(() => {
    const klik = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const el = (e.target as Element | null)?.closest?.('[data-open-kennismaking]')
      if (!el) return
      e.preventDefault()
      vorigeFocus.current = document.activeElement as HTMLElement
      setOpen(true)
      push('kennismaking_open', { bron: el.getAttribute('data-cta') ?? '' })
    }
    document.addEventListener('click', klik, true)
    return () => document.removeEventListener('click', klik, true)
  }, [])

  // Open en dicht: Esc, scroll op slot, alles achter het venster inert, focus
  // heen en terug. Alleen op open, zodat de opruimstap alleen bij echt sluiten
  // draait (en de focus niet midden in een invulveld wegspringt).
  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    const inert: HTMLElement[] = []
    let node: Element | null = overlayRef.current
    while (node && node !== document.body && node.parentElement) {
      for (const el of Array.from(node.parentElement.children)) {
        if (el === node || !(el instanceof HTMLElement) || el.inert) continue
        if (['SCRIPT', 'STYLE', 'LINK', 'NOSCRIPT', 'TEMPLATE'].includes(el.tagName)) continue
        el.inert = true
        inert.push(el)
      }
      node = node.parentElement
    }
    const t = window.setTimeout(() => dialoogRef.current?.focus(), 30)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', esc)
      document.body.style.overflow = ''
      inert.forEach((el) => {
        el.inert = false
      })
      vorigeFocus.current?.focus?.()
    }
  }, [open])

  // De agenda laden bij openen, nooit twee keer tegelijk (laadt).
  useEffect(() => {
    if (open && !dagen) void laad()
  }, [open, dagen, laad])

  // Focus na een stap: de gekozen tijd, de bevestiging, of terug naar de tijd
  // die je eerder koos. Valt die weg, dan het venster zelf.
  useEffect(() => {
    const doel = focusNa.current
    if (!doel) return
    focusNa.current = null
    if (doel === 'gekozen') gekozenRegelRef.current?.focus()
    else if (doel === 'klaar') klaarKopRef.current?.focus()
    else {
      const knoppen = gekozen
        ? Array.from(dialoogRef.current?.querySelectorAll<HTMLElement>(`[data-slot="${gekozen.start}"]`) ?? [])
        : []
      ;(knoppen.find((k) => k.offsetParent !== null) ?? dialoogRef.current)?.focus()
    }
  }, [stap, dagen, gekozen])

  // Weken per kalenderweek (maandag tot en met vrijdag), met een lege kolom
  // voor een werkdag zonder tijden (verleden, feestdag).
  const weken = useMemo(() => {
    const perWeek = new Map<string, Map<string, Dag>>()
    for (const d of dagen ?? []) {
      const ma = maandagVan(d.datum)
      if (!perWeek.has(ma)) perWeek.set(ma, new Map())
      perWeek.get(ma)!.set(d.datum, d)
    }
    return [...perWeek.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([ma, week]) =>
        Array.from({ length: DAGEN_PER_SCHERM }, (_, i) => {
          const datum = plusDagen(ma, i)
          return { datum, dag: week.get(datum) ?? null }
        }),
      )
  }, [dagen])

  const kies = (s: Slot) => {
    focusNa.current = 'gekozen'
    setGekozen(s)
    setStap('gegevens')
    setFout('')
    setTerugval(false)
    push('kennismaking_slot_gekozen')
  }

  const formStart = () => {
    if (formGestart) return
    setFormGestart(true)
    rememberInteraction('form_start', {
      label: 'kennismaking_venster',
      page_path: window.location.pathname,
      placement: 'kennismaking_venster',
    })
    push('form_start', { form: 'kennismaking_venster' })
  }

  const verstuur = async (e: React.FormEvent<HTMLFormElement>, modus: 'boek' | 'gegevens') => {
    e.preventDefault()
    if (bezig) return
    const honey = String(new FormData(e.currentTarget).get('_honey') ?? '')
    const naam = waarden.naam.trim()
    const email = waarden.email.trim()
    const bedrijf = waarden.bedrijf.trim()
    const telefoon = waarden.telefoon.trim()
    const vraag = waarden.vraag.trim()
    const ontbreekt: Veldnaam[] = []
    const meldingen: string[] = []
    if (!naam) {
      ontbreekt.push('naam')
      meldingen.push(FOUT_NAAM)
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      ontbreekt.push('email')
      meldingen.push(email ? FOUT_EMAIL : FOUT_EMAIL_LEEG)
    }
    if (ontbreekt.length) {
      setFoutVelden(ontbreekt)
      setFout(meldingen.join(' '))
      // De focus naar het eerste veld dat niet klopt.
      e.currentTarget.querySelector<HTMLInputElement>(`[name="${ontbreekt[0]}"]`)?.focus()
      return
    }
    const moment = modus === 'boek' && gekozen ? gekozen : null
    setBezig(true)
    setFout('')
    setTerugval(false)
    setFoutVelden([])
    // Is het vinkje tegen robots nog bezig, dan eerst kort wachten. Daarna gaat
    // het formulier altijd weg, met het token of leeg (Koen, 11 okt 09:17): de
    // server beslist.
    let token = tokenRef.current
    if (!token && TURNSTILE_SITEKEY && !widgetMislukt.current && widgetActief.current) {
      setWachtOpControle(true)
      token = await wachtOpToken(TOKEN_WACHT_MS)
      setWachtOpControle(false)
    }
    // Het moment staat leesbaar in het bericht (de Hub bewaart en mailt alleen
    // het bericht) en als apart veld voor de latere koppeling.
    const viaGegevens = () =>
      stuur(HUB_ENDPOINT, {
        name: naam,
        email,
        company: bedrijf,
        phone: telefoon,
        message: moment
          ? `Gevraagd moment voor een kennismaking: ${metHoofdletter(fmtDagLang(moment.start))} om ${fmtTijd(moment.start)} (Nederlandse tijd, ${DUUR_MIN} minuten).${vraag ? `\n\n${vraag}` : ''}`
          : vraag,
        ...(moment ? { gevraagd_moment: moment.start } : {}),
        source: 'kennismaking_venster',
        _honey: honey,
        turnstile: token,
        context: getLeadContext(),
      })
    try {
      let uit: Uitkomst
      // Hoe een gelukte verzending heet: de echte agenda, of het moment als
      // aanvraag (voorbeeldagenda, of boeken lukte niet), of alleen gegevens.
      let gelukt: 'nietVast' | 'aangevraagd' | 'gegevens'
      if (moment && !voorbeeld) {
        uit = await stuur(`${API}/boek`, {
          start: moment.start, naam, email, bedrijf, telefoon, vraag, _honey: honey, turnstile: token, context: getLeadContext(),
        })
        gelukt = 'nietVast'
        // Niets bewaard (storing, 403, 413, 415, 429, 5xx) of geen antwoord:
        // dezelfde aanvraag nog via het Hub-endpoint van "Laat je gegevens
        // achter", met het moment erin. Lukt dat, dan is het een aanvraag.
        if (uit.soort === 'fout') {
          const melding = uit.melding
          uit = await viaGegevens()
          if (uit.soort === 'binnen') gelukt = 'aangevraagd'
          else if (uit.soort === 'fout') uit = { soort: 'fout', melding: melding || uit.melding }
        }
      } else {
        uit = await viaGegevens()
        gelukt = moment ? 'aangevraagd' : 'gegevens'
      }
      switch (uit.soort) {
        case 'ingepland':
          // Eigen slug, zodat eigen agenda en Cal.com in GA4 uit elkaar te houden zijn.
          void pushConversionEvent('meeting_booked', { email }, { event_slug: 'kennismaking_eigen', form: 'kennismaking_venster' })
          setKlaar('geboekt')
          break
        case 'binnen':
          // Dezelfde parameters als ContactForm (form, source): die stuurt GTM
          // door. lead_soort onderscheidt een aangevraagd moment (ook als het
          // niet in de agenda kwam) van alleen gegevens; een echte boeking is
          // meeting_booked hierboven.
          void pushConversionEvent(
            'generate_lead',
            { email },
            { form: 'kennismaking_venster', source: padZonderTaal(), lead_soort: moment ? 'moment_aangevraagd' : 'gegevens' },
          )
          setMetTelefoon(Boolean(telefoon))
          setKlaarMelding(gelukt === 'nietVast' ? uit.melding : '')
          setKlaar(gelukt)
          break
        case 'vergeven':
          setFout(uit.melding || FOUT_VERGEVEN)
          if (moment) {
            focusNa.current = 'slot'
            setStap('kies')
            void laad()
          }
          return
        case 'veld': {
          const veld = Object.prototype.hasOwnProperty.call(SERVERVELD, uit.veld) ? SERVERVELD[uit.veld] : undefined
          setFoutVelden(veld ? [veld] : [])
          setFout(uit.melding || FOUT_VELDEN)
          return
        }
        default:
          // Niets bewaard, ook niet via de terugval. De velden blijven staan;
          // vanaf het tabblad met het moment kan het nog als gegevens.
          setFout(uit.melding || FOUT_VERSTUREN)
          setTerugval(modus === 'boek')
          return
      }
      focusNa.current = 'klaar'
      setStap('klaar')
    } finally {
      setBezig(false)
      // Een Turnstile-token is na een poging gebruikt: wissen en opnieuw laten aanvinken.
      tokenRef.current = ''
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.reset(widgetId.current)
        } catch {
          /* widget al weg (venster dicht) */
        }
      }
    }
  }

  if (!open) return null

  const veld =
    // 16px: kleiner zoomt iOS in bij het invullen (CRO-synthese 11 okt, A3).
    'w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-[16px] text-primary outline-none transition-colors focus:border-accent aria-[invalid=true]:border-[#B42B43]'

  const label = 'mb-1.5 block font-mono text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#2A3A54]'
  // Een gecontroleerd veld: de waarde staat in waarden, en bij een fout in
  // dat veld wijst het naar de melding.
  const invoer = (naam: Veldnaam) => ({
    name: naam,
    value: waarden[naam],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const v = e.target.value
      setWaarden((w) => ({ ...w, [naam]: v }))
    },
    ...(foutVelden.includes(naam) ? { 'aria-invalid': true, 'aria-describedby': 'kennismaking-fout' } : {}),
  })
  const foutRegel = fout ? (
    <div className="grid justify-items-start gap-2">
      <p id="kennismaking-fout" role="alert" className="m-0 text-[14px] text-[#B42B43]">
        {fout}
      </p>
      {terugval && (
        <button
          type="button"
          onClick={() => {
            setTab('gegevens')
            setFout('')
            setTerugval(false)
          }}
          className="text-[14px] font-semibold text-primary underline decoration-accent underline-offset-2"
        >
          Laat je gegevens achter
        </button>
      )}
    </div>
  ) : null
  const wachtRegel = wachtOpControle ? (
    <p role="status" className="m-0 text-[14px] text-muted">
      {WACHT_OP_CONTROLE}
    </p>
  ) : null
  const formulier = (modus: 'boek' | 'gegevens') => (
    <form onSubmit={(e) => verstuur(e, modus)} onFocusCapture={formStart} className="grid gap-4" noValidate>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="block">
        <span className={label}>Naam (verplicht)</span>
        <input {...invoer('naam')} required placeholder="Voor- en achternaam" autoComplete="name" className={veld} maxLength={160} />
      </label>
      <label className="block">
        <span className={label}>E-mail (verplicht)</span>
        <input
          {...invoer('email')}
          required
          type="email"
          inputMode="email"
          placeholder="naam@bedrijf.nl"
          autoComplete="email"
          className={veld}
          maxLength={200}
        />
      </label>
      <label className="block">
        <span className={label}>Bedrijf (niet verplicht)</span>
        <input {...invoer('bedrijf')} placeholder="Naam van je bedrijf" autoComplete="organization" className={veld} maxLength={160} />
      </label>
      <label className="block">
        <span className={label}>Telefoon (niet verplicht)</span>
        <input
          {...invoer('telefoon')}
          type="tel"
          placeholder="06 12345678"
          autoComplete="tel"
          className={veld}
          maxLength={40}
          aria-describedby={foutVelden.includes('telefoon') ? 'kennismaking-fout' : 'kennismaking-tel-hulp'}
        />
        <span id="kennismaking-tel-hulp" className="mt-1.5 block text-[13px] text-muted">
          Liever gebeld? Zet je nummer erbij.
        </span>
      </label>
      {berichtOpen || waarden.vraag ? (
        <label className="block">
          <span className={label}>Bericht (niet verplicht)</span>
          <textarea
            {...invoer('vraag')}
            rows={3}
            placeholder="Waar wil je het over hebben?"
            className={`${veld} resize-none`}
            maxLength={2000}
          />
        </label>
      ) : (
        <button
          type="button"
          onClick={() => setBerichtOpen(true)}
          className="justify-self-start text-[14px] font-semibold text-primary underline decoration-accent underline-offset-2"
        >
          Wil je alvast iets kwijt?
        </button>
      )}
      <Turnstile onToken={zetToken} onMislukt={markeerMislukt} widgetRef={widgetId} actiefRef={widgetActief} />
      {wachtRegel}
      {foutRegel}
      {/* Logoblauw met witte tekst (Koen 12 okt: een blauw, dat van het logo, en overal wit op de knoppen). */}
      <button
        type="submit"
        disabled={bezig}
        className="rounded-xl bg-accent px-5 py-3.5 font-display text-[15.5px] font-bold text-white transition-[filter] hover:brightness-110 disabled:opacity-60"
      >
        {bezig ? 'Even geduld...' : modus === 'gegevens' ? 'Verstuur' : voorbeeld ? 'Vraag dit moment aan' : 'Bevestig de afspraak'}
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
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-[#0A1628]/55 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={() => setOpen(false)}
    >
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
          {DUUR_MIN} minuten, online. Je zit nergens aan vast.
        </p>

        {stap === 'klaar' ? (
          <div role="status" className="mt-8 rounded-2xl bg-surface p-6 text-center">
            <p ref={klaarKopRef} tabIndex={-1} className="m-0 font-display text-[20px] font-bold text-primary outline-none">
              {klaar === 'geboekt'
                ? 'De afspraak staat.'
                : klaar === 'aangevraagd'
                  ? 'Je moment is aangevraagd.'
                  : 'Dank je, we nemen contact op.'}
            </p>
            <p className="m-0 mt-2 text-[15px] text-muted">
              {klaar === 'geboekt' && gekozen
                ? `${metHoofdletter(fmtDagLang(gekozen.start))} om ${fmtTijd(gekozen.start)}. De uitnodiging staat in je mail.`
                : klaar === 'aangevraagd' && gekozen
                  ? `${metHoofdletter(fmtDagLang(gekozen.start))} om ${fmtTijd(gekozen.start)}. Je krijgt meteen een mail dat je aanvraag binnen is. Binnen een werkdag hoor je of dit moment kan.`
                  : klaar === 'nietVast'
                    ? klaarMelding || (metTelefoon ? NIET_VAST_BELLEN : NIET_VAST_MAILEN)
                    : metTelefoon
                      ? 'We bellen je binnen een werkdag.'
                      : 'We mailen je binnen een werkdag.'}
            </p>
          </div>
        ) : (
          <>
            {/* Twee knoppen met aria-pressed, geen tab-rollen zonder tabpaneel. */}
            <div className="mt-6 grid grid-cols-2 rounded-xl bg-surface p-1">
              {(
                [
                  ['moment', 'Kies een moment'],
                  ['gegevens', 'Laat je gegevens achter'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={tab === id}
                  onClick={() => {
                    setTab(id)
                    setFout('')
                    setTerugval(false)
                    setFoutVelden([])
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
                {/* Gewone grijze regel, geen geel vlak (verkoopsynthese 11 okt).
                    Zolang de agenda niet gekoppeld is, is het een aanvraag. */}
                {voorbeeld && <p className="m-0 mb-3 text-[13.5px] text-muted">We mailen je of dit moment kan.</p>}
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-accent/30 bg-accent/[0.06] px-4 py-3">
                  <span ref={gekozenRegelRef} tabIndex={-1} className="text-[15px] font-semibold text-primary outline-none">
                    {metHoofdletter(fmtDagLang(gekozen.start))}, {fmtTijd(gekozen.start)} tot {fmtTijd(gekozen.end)}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      focusNa.current = 'slot'
                      setStap('kies')
                    }}
                    className="text-[14px] font-semibold text-primary underline decoration-accent"
                  >
                    Ander moment
                  </button>
                </div>
                {formulier('boek')}
              </div>
            )}

            {tab === 'moment' && stap === 'kies' && (
              <div className="mt-5">
                {/* Na "net vergeven" staat de melding hier, boven de agenda;
                    het formulier is dan niet in beeld. */}
                {foutRegel && <div className="mb-3">{foutRegel}</div>}
                <p className="m-0 mb-3 text-[13px] text-muted">Nederlandse tijd</p>
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
                          {huidigeWeek[0] &&
                            `${metHoofdletter(fmtDagKort(huidigeWeek[0].datum))} tot ${fmtDagKort(huidigeWeek[huidigeWeek.length - 1].datum)}`}
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
                        {huidigeWeek.map(({ datum, dag: d }) => {
                          const alles = d
                            ? [...d.slots.map((s) => ({ ...s, vrij: true })), ...d.bezet.map((s) => ({ ...s, vrij: false }))].sort((a, b) =>
                                a.start.localeCompare(b.start),
                              )
                            : []
                          return (
                            <div key={datum}>
                              <p
                                className={`sticky top-0 m-0 bg-white pb-2 text-center text-[13.5px] font-semibold capitalize text-primary ${d ? '' : 'opacity-40'}`}
                              >
                                {fmtDagKort(datum)}
                              </p>
                              <div className="grid gap-1.5">
                                {alles.map((s) =>
                                  s.vrij ? (
                                    <button
                                      key={s.start}
                                      type="button"
                                      data-slot={s.start}
                                      onClick={() => kies(s)}
                                      className="rounded-lg border-2 border-accent py-2 text-[13.5px] font-semibold tabular-nums text-primary transition-colors hover:bg-accent hover:text-white"
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
                              className={`shrink-0 rounded-xl border px-3.5 py-2.5 text-[14px] font-semibold capitalize ${mobDag === i ? 'border-accent bg-accent/10 text-primary' : 'border-border text-primary'} ${d.slots.length === 0 ? 'opacity-40' : ''}`}
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
                            data-slot={s.start}
                            onClick={() => kies(s)}
                            className="rounded-xl border-2 border-accent py-3 text-[16px] font-semibold tabular-nums text-primary active:bg-accent active:text-white"
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
