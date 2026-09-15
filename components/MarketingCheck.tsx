'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Globe } from 'lucide-react'

const HUB_LIVE = 'https://hub.stevin.ai/api/marketing-check'
const CAL = 'https://cal.com/koen-hoogenboom/kennismaking'
/** De Stevin-hartslag: het blauwe merk op transparant, voor lichte vlakken. Bestaand asset, nooit nagetekend; de variant zonder -white staat op een navy tegel. */
const HEARTBEAT = '/logos/stevin-heartbeat-white.gif'

/**
 * Welke Hub dit scherm aanspreekt. Op localhost mag je met ?hub=... naar een
 * lokale Hub wijzen (src/scripts/marketing-check-local.ts), zodat je het
 * scherm tegen nieuwe routecode kunt draaien zonder uit te rollen. Buiten
 * localhost wordt die parameter genegeerd.
 */
function hubUrl(): string {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    const eigen = new URLSearchParams(window.location.search).get('hub')
    if (eigen && /^https?:\/\/localhost(:\d+)?\//.test(eigen)) return eigen.replace(/\/$/, '')
  }
  return process.env.NEXT_PUBLIC_MARKETING_CHECK_HUB || HUB_LIVE
}

interface Bevinding {
  code: string
  /** advertenties, meting, aanvragen, reputatie, site */
  gebied: Gebied
  categorie: string
  ernst: 'issue' | 'opportunity' | 'observation'
  titel: string
  tekst: string
  /** De vraag van de ondernemer die deze bevinding beantwoordt. */
  ondernemersvraag: string | null
}

type Gebied = 'advertenties' | 'meting' | 'aanvragen' | 'reputatie' | 'site'
type GebiedStatus = 'aandacht' | 'niets_gevonden' | 'niet_gezien'
interface ScorecardRegel {
  gebied: Gebied
  label: string
  status: GebiedStatus
  titel: string | null
}

interface Uitkomst {
  token: string
  status: string
  deep_scan: string
  /** W-134 fase 2: skipped, running, done, failed. */
  verdieping?: string
  /** Waar de getoonde bevinding vandaan komt. */
  bevinding_bron?: 'scan' | 'verdieping' | null
  /** Tellers van de lopende verdieping, uit de Hub. */
  voortgang?: {
    stap: 'lezen' | 'advertenties' | 'bronnen' | 'afwegen' | 'toetsen'
    paginas_gelezen: number
    tekens_gelezen: number
    tokens_geschat: number
    tokens_in?: number
    tokens_uit?: number
    bronnen_klaar?: string[]
  } | null
  meetprobleem: string | null
  bevinding: Bevinding | null
  /**
   * Alles wat de scan vond, in volgorde van wat de eigenaar het meest aangaat.
   * Koen, 15 sep: "geef gewoon alle bevindingen." De eerste is `bevinding`.
   */
  bevindingen?: Bevinding[]
  geen_bevinding_tekst: string | null
  ook_gezien: string[]
  /** Per gebied een woord. Koen, 15 sep: scorecards in plaats van tekst. */
  scorecard?: ScorecardRegel[]
}

type Fase = 'invoer' | 'bezig' | 'klaar'

/**
 * Wachttijd tijdens de verdieping: pollen met oplopende tussenpozen, in
 * totaal zo'n twee en een halve minuut. Daarna tonen we wat we hebben (de
 * eerste scan) en zeggen we dat de verdieping nog loopt.
 */
const POLL_SECONDEN = [4, 4, 6, 6, 8, 10, 10, 15, 15, 20, 20, 20, 20]

/** Nooit een uitkomst laten flitsen: minstens dit aantal seconden werk in beeld. */
const MIN_WACHT_MS = 4000

/**
 * Wat er te lezen valt terwijl de scan loopt. Het motto staat op onze eigen
 * /simon-stevin-pagina; de andere regels komen uit de Dialectike ofte
 * Bewysconst (1585), aangedragen door Koen op 14 sep 2026 met de
 * wetenschappelijke uitgave als bron. Er bestaan geen betrouwbare lijsten met
 * tientallen losse oneliners van Stevin; veel online citaten zijn verzinsels.
 * Hier komt niets bij dat niet op die twee bronnen terug te voeren is.
 */
const STEVIN_KAARTEN: Array<{ kop: string; bron: string; brug: string }> = [
  {
    kop: 'Wonder en is gheen wonder.',
    bron: 'Simon Stevin, 1586',
    brug: 'We zoeken uit wat er werkelijk gebeurt.',
  },
  {
    kop: 'Ten is niet al waer, dat schijnt bevvesen te sijne.',
    bron: 'Dialectike ofte Bewysconst, 1585',
    brug: 'Een cijfer is nog geen bewijs.',
  },
  {
    kop: "Van T'mach, tot Het is, en duecht het vervolgh niet.",
    bron: 'Dialectike ofte Bewysconst, 1585',
    brug: 'Dat een meting kan, betekent niet dat hij gebeurt.',
  },
  {
    kop: 'Ten is niet al valsch, datmen niet bewijsen en can.',
    bron: 'Dialectike ofte Bewysconst, 1585',
    brug: 'Wat we van buitenaf niet zien, is daarmee niet weg.',
  },
  {
    kop: 'Spiegheling en daet.',
    bron: 'Simon Stevin',
    brug: 'Eerst begrijpen, dan verbeteren.',
  },
]

function datumVandaag(): string {
  return new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
}

function tijdRegel(sec: number): string {
  if (sec < 60) return `${sec} s`
  const m = Math.floor(sec / 60)
  const r = sec % 60
  return r === 0 ? `${m} min` : `${m} min ${r} s`
}

function kTokens(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace('.', ',')}k` : String(n)
}

function kaalDomein(s: string): string {
  return s.trim().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '')
}

/**
 * De diagnose per soort bevinding (Koen, 15 sep 10:18 en 10:46, na twee
 * lezingen door ChatGPT): een grote pijn, de meetketen met het kruis op de
 * schakel die kapot is, drie bewijspunten, en wat Stevin herstelt. Alles in
 * een oogopslag onder elkaar; de bezoeker hoeft de conclusie niet zelf te
 * bouwen. De feiten uit de Hub blijven de feiten; niets hier beweert meer dan
 * de bevinding zelf.
 */
interface Diagnose {
  label: string
  kop: string
  gevolg: string
  keten: string[]
  /** Index van de schakel die kapot is: tussen keten[kapot] en keten[kapot + 1]. */
  kapot: number
  woord: string
  punten: [string, string][]
  herstel: string
  vraag: string
}
const DIAGNOSE: Record<string, Diagnose> = {
  CONSENT_MEASUREMENT_BEFORE_INTERACTION: {
    label: 'Aandacht voor je meetketen',
    kop: 'Je cookiebanner vraagt toestemming. Je meting wacht daar niet op.',
    gevolg: 'Je cijfers veranderen dan met de knop waarop een bezoeker klikt. Je hebt geen vaste meetlat voor je marketing.',
    keten: ['Cookiebanner', 'Toestemming', 'Meting', 'Aanvraag'], kapot: 1, woord: 'meting loopt al',
    punten: [['Cookiebanner', 'Aanwezig'], ['Meting', 'Laadt voor de klik'], ['Gevolg', 'Aanvragen niet betrouwbaar te herleiden']],
    herstel: 'Wij brengen cookiebanner, toestemming, tags en conversiemeting weer op een lijn. Je ziet daarna welke marketing contact oplevert en waar je meting hapert.',
    vraag: 'Weet jij wat er op je site al meet voordat iemand op de banner klikt?',
  },
  MEASUREMENT_NOTHING_AFTER_CONSENT: {
    label: 'Aandacht voor je meetketen',
    kop: 'Ook na toestemming meet je site niets.',
    gevolg: 'Van iedereen die op je site komt, weet je dan niets. Ook niet hoeveel er een aanvraag doen.',
    keten: ['Cookiebanner', 'Toestemming', 'Meting', 'Aanvraag'], kapot: 1, woord: 'niets gemeten',
    punten: [['Cookiebanner', 'Geaccepteerd'], ['Meting', 'Geen enkele'], ['Gevolg', 'Geen cijfers over je bezoekers']],
    herstel: 'Wij koppelen de meting aan de toestemming zodat ze weer aangaat, en tellen daarna wat er binnenkomt.',
    vraag: 'Kun jij zien hoeveel bezoekers je site vorige week had?',
  },
  ADVERTISING_FUNDER_MISMATCH: {
    label: 'Aandacht voor je advertenties',
    kop: 'Je betaalt voor advertenties, maar kunt niet zelfstandig zien welke aanvragen ze opleveren.',
    gevolg: 'Je stuurt dan op vertrouwen, niet op bewijs. En bij een wissel van bureau gaat de historie niet vanzelf mee.',
    keten: ['Advertentie', 'Klik', 'Website', 'Aanvraag'], kapot: 2, woord: 'niet zelf te zien',
    punten: [['Advertenties', 'Op jouw naam'], ['Betaler', 'Een andere partij'], ['Gevolg', 'Opbrengst niet zelf te controleren']],
    herstel: 'Wij zetten een onafhankelijke meting tussen je advertenties, je website en je aanvragen, op jouw naam. Je ziet daarna welke advertentie een aanvraag opleverde, wie er ook aan de knoppen zit.',
    vraag: 'Kun jij vandaag zelf zien welke advertentie een echte aanvraag heeft opgeleverd?',
  },
  ADVERTISING_ACTIVE_CONVERSION_UNKNOWN: {
    label: 'Aandacht voor je advertenties',
    kop: 'Je adverteert, maar of een aanvraag daaruit geteld wordt, is niet te zien.',
    gevolg: 'Google stuurt je budget dan op een deel van de werkelijkheid.',
    keten: ['Advertentie', 'Klik', 'Website', 'Aanvraag'], kapot: 2, woord: 'niet geteld',
    punten: [['Advertenties', 'In het register van Google'], ['Contact', 'Formulier of telefoon'], ['Gevolg', 'Telt Google de aanvraag mee?']],
    herstel: 'Wij koppelen elke aanvraag, formulier en telefoontje, aan de advertentie die hem opleverde. Google krijgt daarna de goede informatie om op te sturen.',
    vraag: 'Kun jij vandaag zelf zien welke advertentie een echte aanvraag heeft opgeleverd?',
  },
  CONVERSION_LEADPATHS_UNVERIFIED: {
    label: 'Aandacht voor je aanvragen',
    kop: 'Je site krijgt aanvragen binnen, maar of ze geteld worden weet niemand.',
    gevolg: 'Aan het eind van de maand weet je dan niet wat je site en je advertenties hebben opgeleverd.',
    keten: ['Bezoeker', 'Website', 'Aanvraag', 'Jij'], kapot: 2, woord: 'niet geteld',
    punten: [['Contactroutes', 'Formulier, telefoon, mail'], ['Advertentiemeting', 'Aanwezig'], ['Gevolg', 'Aanvragen niet herleid']],
    herstel: 'Wij tellen elke aanvraag, ook het telefoontje, en koppelen hem aan waar hij vandaan kwam. Je weet daarna per maand wat je site oplevert.',
    vraag: 'Weet jij hoeveel aanvragen je site vorige maand opleverde?',
  },
  CONVERSION_LEADPATHS_UNCOUNTED: {
    label: 'Aandacht voor je aanvragen',
    kop: 'Je site krijgt aanvragen binnen, maar of ze geteld worden weet niemand.',
    gevolg: 'Aan het eind van de maand weet je dan niet wat je site heeft opgeleverd.',
    keten: ['Bezoeker', 'Website', 'Aanvraag', 'Jij'], kapot: 2, woord: 'niet geteld',
    punten: [['Contactroutes', 'Formulier, telefoon, mail'], ['Meting', 'Aanwezig'], ['Gevolg', 'Alleen bezoek geteld']],
    herstel: 'Wij tellen elke aanvraag, ook het telefoontje, en koppelen hem aan waar hij vandaan kwam. Je weet daarna per maand wat je site oplevert.',
    vraag: 'Weet jij hoeveel aanvragen je site vorige maand opleverde?',
  },
  PROFIEL_REVIEWS_STILGEVALLEN: {
    label: 'Aandacht voor je reputatie',
    kop: 'Wie je naam googelt, ziet een profiel dat stil staat.',
    gevolg: 'Een nieuwe klant leest dat als een bedrijf dat stil staat, nog voor hij je site ziet.',
    keten: ['Zoeken', 'Google-profiel', 'Website', 'Aanvraag'], kapot: 1, woord: 'klant haakt af',
    punten: [['Google-profiel', 'Gevonden'], ['Laatste review', 'Lang geleden'], ['Gevolg', 'Klant kiest een ander']],
    herstel: 'Wij zetten een vaste routine op voor reviews en antwoorden, en meten of je profiel weer aanvragen oplevert.',
    vraag: 'Weet jij wanneer je laatste Google-review binnenkwam?',
  },
  PROFIEL_WEINIG_REVIEWS: {
    label: 'Aandacht voor je reputatie',
    kop: 'Wie je naam googelt, ziet bijna geen reviews.',
    gevolg: 'Een nieuwe klant kiest dan voor wie er wel heeft.',
    keten: ['Zoeken', 'Google-profiel', 'Website', 'Aanvraag'], kapot: 1, woord: 'klant haakt af',
    punten: [['Google-profiel', 'Gevonden'], ['Reviews', 'Te weinig'], ['Gevolg', 'Klant kiest een ander']],
    herstel: 'Wij zetten een vaste routine op voor reviews en antwoorden, en meten of je profiel weer aanvragen oplevert.',
    vraag: 'Weet jij wanneer je laatste Google-review binnenkwam?',
  },
  SITE_TRAAG_OP_TELEFOON: {
    label: 'Aandacht voor je website',
    kop: 'Je site is traag op de telefoon, en daar komen de meeste aanvragen vandaan.',
    gevolg: 'Wie moet wachten, belt de volgende.',
    keten: ['Zoeken', 'Klik', 'Website', 'Aanvraag'], kapot: 1, woord: 'laadt traag',
    punten: [['Snelheid op telefoon', 'Onder de maat'], ['Laden', 'Meer dan vier seconden'], ['Gevolg', 'Bezoekers haken af']],
    herstel: 'Wij laten meten wat je site traag maakt, zorgen dat het wordt opgelost en meten daarna of er meer aanvragen binnenkomen.',
    vraag: 'Heb jij je eigen site weleens op een telefoon buiten je wifi geopend?',
  },
  MAIL_DOMEIN_ONBESCHERMD: {
    label: 'Aandacht voor je mail',
    kop: 'Mail uit jouw naam kan door iedereen verstuurd worden.',
    gevolg: 'Je eigen mail komt daardoor vaker in spam, en je antwoord op een aanvraag ook.',
    keten: ['Aanvraag', 'Jouw antwoord', 'Inbox klant', 'Opdracht'], kapot: 1, woord: 'in spam',
    punten: [['Mailbeveiliging', 'Ontbreekt'], ['Formulier', 'Aanwezig'], ['Gevolg', 'Antwoorden komen niet aan']],
    herstel: 'Wij zetten de beveiliging van je maildomein goed en controleren daarna of je mail aankomt.',
    vraag: 'Komt jouw mail weleens in spam bij klanten?',
  },
}
function diagnoseVan(f: Bevinding): Diagnose {
  return DIAGNOSE[f.code] ?? {
    label: 'Aandacht',
    kop: f.titel,
    gevolg: 'Zolang dat zo is, stuur je op gevoel in plaats van op bewijs.',
    keten: ['Google', 'Je website', 'Aanvragen', 'Jij'], kapot: 1, woord: 'niet te zien',
    punten: [],
    herstel: 'Wij richten een onafhankelijke meetlaag in tussen je advertenties, je website en je aanvragen. Je ziet daarna welke marketing contact oplevert en waar je meting hapert.',
    vraag: 'Kun jij vandaag zelf narekenen wat je marketing oplevert?',
  }
}

type Antwoord = 'ja' | 'nee' | 'weet_niet'

/** De meetketen: de schakels van deze bevinding, met het kruis op de kapotte. */
function Keten({ keten, kapot, woord }: { keten: string[]; kapot: number; woord: string }) {
  return (
    <div className="mt-5 rounded-xl bg-[var(--color-surface)] px-3 pb-6 pt-9 sm:px-5" aria-label={`Meetketen: tussen ${keten[kapot]} en ${keten[kapot + 1]} ${woord}`}>
      <div className="flex items-center">
        {keten.map((naam, i) => (
          <div key={naam} className="contents">
            <div className={`rounded-lg border px-2 py-2 text-center text-[11px] font-bold leading-tight sm:px-3 sm:text-[13px] ${i === kapot || i === kapot + 1 ? 'border-[var(--color-primary)] bg-white text-[var(--color-primary)]' : 'border-[var(--color-border)] bg-white text-[var(--color-muted)]'}`}>
              {naam}
            </div>
            {i < keten.length - 1 && (
              <div className="relative flex min-w-[18px] flex-1 items-center justify-center sm:min-w-[28px]">
                {i === kapot ? (
                  <>
                    <svg className="h-[2px] w-full" aria-hidden="true">
                      <line x1="0" y1="1" x2="100%" y2="1" stroke="#d23f57" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>
                    <span className="absolute -top-[28px] flex h-6 w-6 items-center justify-center rounded-full bg-[#d23f57] text-[13px] font-black text-white" aria-hidden="true">&#x2715;</span>
                    <span className="absolute top-[10px] whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.06em] text-[#d23f57] sm:text-[11px]">{woord}</span>
                  </>
                ) : (
                  <svg className="h-[2px] w-full" aria-hidden="true">
                    <line x1="0" y1="1" x2="100%" y2="1" stroke="var(--color-border)" strokeWidth="2" />
                  </svg>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Hooguit twee zinnen op het scherm. Koen, 15 sep 10:13: "weer kei veel
 * tekst". De kop is de haak; de eerste twee zinnen zijn het feit. De rest van
 * de tekst blijft in de API en de database voor de volledige meting.
 * Afkortingen met punten (B.V., N.V., o.a., bijv.) tellen niet als zinseinde.
 */
function kort(tekst: string, maxZinnen = 2): string {
  const beschermd = tekst.replace(/\b([A-Za-z]\.){2,}/g, (m) => m.replace(/\./g, '\u0000'))
  const zinnen = beschermd.split(/(?<=[.!?])\s+(?=[A-Z0-9"\u201c])/).map((z) => z.replace(/\u0000/g, '.'))
  if (zinnen.length <= maxZinnen) return tekst
  return zinnen.slice(0, maxZinnen).join(' ')
}

export default function MarketingCheck() {
  const [domein, setDomein] = useState('')
  const [fase, setFase] = useState<Fase>('invoer')
  const [uitkomst, setUitkomst] = useState<Uitkomst | null>(null)
  const [fout, setFout] = useState<string | null>(null)
  const [kaart, setKaart] = useState(0)
  const [seconden, setSeconden] = useState(0)
  /** Wat er echt klaar is aan de serverkant. De stappenlijst leest hieruit. */
  const [aGereed, setAGereed] = useState(false)
  /** Token van de scan zodra fase A terug is; het contactblok tijdens het wachten hangt eraan. */
  const [scanToken, setScanToken] = useState<string | null>(null)
  /** Zijn antwoord op de diagnosevraag; daarna pas naam en nummer. */
  const [antwoord, setAntwoord] = useState<Antwoord | null>(null)
  /** Fase B (de mini in een echte browser): queued, running, done, skipped. */
  const [bStatus, setBStatus] = useState<string>('skipped')
  const [vStatus, setVStatus] = useState<string>('skipped')
  const [verdiepingLiepNog, setVerdiepingLiepNog] = useState(false)
  const [tokens, setTokens] = useState(0)
  const [voortgang, setVoortgang] = useState<NonNullable<Uitkomst['voortgang']> | null>(null)
  // Het contactblok onder de uitkomst: hier wordt een scan een lead.
  const [cNaam, setCNaam] = useState('')
  const [cEmail, setCEmail] = useState('')
  const [cTel, setCTel] = useState('')
  const [cBericht, setCBericht] = useState('')
  const [cStatus, setCStatus] = useState<'invoer' | 'bezig' | 'klaar'>('invoer')
  const [cFout, setCFout] = useState<string | null>(null)

  const params = useRef<{ p: string | null; s: string | null }>({ p: null, s: null })
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startTijd = useRef(0)
  const hub = useRef(HUB_LIVE)

  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    params.current = { p: q.get('p'), s: q.get('s') }
    hub.current = hubUrl()
    return () => {
      if (pollTimer.current) clearTimeout(pollTimer.current)
    }
  }, [])

  // Kaarten en klok lopen alleen zolang er echt gewerkt wordt.
  useEffect(() => {
    if (fase !== 'bezig') return
    const kaartTimer = setInterval(() => setKaart((k) => (k + 1) % STEVIN_KAARTEN.length), 8000)
    const klok = setInterval(() => setSeconden(Math.round((Date.now() - startTijd.current) / 1000)), 1000)
    return () => {
      clearInterval(kaartTimer)
      clearInterval(klok)
    }
  }, [fase])

  /**
   * De uitkomst pas tonen als het werk klaar is. Niet omdat wachten leuk is,
   * maar omdat een antwoord na drie seconden niets waard voelt en het ook niet
   * is: de verdieping is dan nog bezig. Koen, 14 sep: "het antwoord komt veel
   * te snel."
   */
  function toon(data: Uitkomst, liepNog: boolean) {
    const rest = Math.max(0, MIN_WACHT_MS - (Date.now() - startTijd.current))
    setTimeout(() => {
      setVerdiepingLiepNog(liepNog)
      setUitkomst(data)
      setFase('klaar')
    }, rest)
  }

  function pollTotKlaar(token: string, laatste: Uitkomst, poging = 0) {
    if (poging >= POLL_SECONDEN.length) {
      // De verdieping doet er langer over dan wij willen wachten. Toon wat we
      // hebben en zeg dat erbij; de uitkomst staat straks wel in de database.
      toon(laatste, true)
      return
    }
    pollTimer.current = setTimeout(async () => {
      let data: Uitkomst | null = null
      try {
        const res = await fetch(`${hub.current}/result/${token}`)
        if (res.ok) {
          const body = (await res.json()) as Uitkomst & { ok: boolean }
          if (body?.ok) data = body
        }
      } catch {
        /* een gemiste poll is geen fout, we proberen het gewoon nog eens */
      }
      const huidig = data ?? laatste
      const status = huidig.verdieping ?? 'skipped'
      setVStatus(status)
      setBStatus(huidig.deep_scan ?? 'skipped')
      const v = huidig.voortgang
      if (v) {
        setVoortgang(v)
        setTokens(v.tokens_in != null ? v.tokens_in + (v.tokens_uit ?? 0) : v.tokens_geschat)
      }
      const klaar = status !== 'running' && huidig.deep_scan !== 'queued' && huidig.deep_scan !== 'running'
      if (klaar) {
        toon(huidig, false)
        return
      }
      pollTotKlaar(token, huidig, poging + 1)
    }, POLL_SECONDEN[poging] * 1000)
  }

  async function start(e: React.FormEvent) {
    e.preventDefault()
    if (fase === 'bezig' || !domein.trim()) return
    setFase('bezig')
    setFout(null)
    setUitkomst(null)
    setScanToken(null)
    setAntwoord(null)
    setBStatus('skipped')
    setAGereed(false)
    setVStatus('skipped')
    setVerdiepingLiepNog(false)
    setSeconden(0)
    setKaart(0)
    setTokens(0)
    setVoortgang(null)
    startTijd.current = Date.now()

    try {
      const res = await fetch(hub.current, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: domein.trim(),
          placement_slug: params.current.p,
          session_token: params.current.s,
        }),
      })
      const data = (await res.json()) as Uitkomst & { ok: boolean; error?: string }
      if (!res.ok || !data?.ok) {
        setFout(data?.error || 'Er ging iets mis. Probeer het zo nog eens.')
        setFase('invoer')
        return
      }
      setAGereed(true)
      setScanToken(data.token)
      setBStatus(data.deep_scan ?? 'skipped')
      setVStatus(data.verdieping ?? 'skipped')

      fetch(`${hub.current}/result/${data.token}/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'finding_viewed', session_token: params.current.s }),
      }).catch(() => undefined)

      if (data.verdieping === 'running' || data.deep_scan === 'queued') {
        pollTotKlaar(data.token, data)
      } else {
        toon(data, false)
      }
    } catch {
      setFout('We konden de scan niet starten. Controleer je verbinding en probeer het nog eens.')
      setFase('invoer')
    }
  }

  function naarGesprek() {
    const q = new URLSearchParams({
      utm_source: 'marketing-check',
      utm_medium: params.current.p ? 'placement' : 'direct',
      utm_campaign: params.current.p || 'marketing-check',
    })
    if (uitkomst?.token) q.set('scan', uitkomst.token)

    if (uitkomst?.token) {
      // Server-side vastleggen voordat we wegsturen: de attributie mag niet
      // afhangen van wat Cal.com in zijn metadata doorgeeft.
      fetch(`${hub.current}/result/${uitkomst.token}/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'meeting_clicked', session_token: params.current.s }),
        keepalive: true,
      }).catch(() => undefined)
    }
    window.location.href = `${CAL}?${q.toString()}`
  }

  async function stuurContact(e: React.FormEvent) {
    e.preventDefault()
    const token = uitkomst?.token ?? scanToken
    if (!token || cStatus === 'bezig') return
    setCStatus('bezig')
    setCFout(null)
    try {
      const res = await fetch(`${hub.current}/result/${token}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wens: 'gesprek',
          naam: cNaam, email: cEmail, telefoon: cTel,
          bericht: antwoord && uitkomst?.bevinding
            ? `Antwoord op "${diagnoseVan(uitkomst.bevinding).vraag}": ${antwoord === 'ja' ? 'ja' : antwoord === 'nee' ? 'nee' : 'weet ik niet'}`
            : cBericht,
          session_token: params.current.s,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data?.ok) {
        setCFout(data?.error || 'Dat lukte niet. Probeer het nog eens.')
        setCStatus('invoer')
        return
      }
      setCStatus('klaar')
    } catch {
      setCFout('Dat lukte niet. Controleer je verbinding en probeer het nog eens.')
      setCStatus('invoer')
    }
  }

  const b = uitkomst?.bevinding
  // De hele lijst als de Hub hem meestuurt, anders de ene bevinding. Zo blijft
  // dit scherm werken tegen een Hub die nog niet is bijgewerkt.
  const lijst: Bevinding[] = uitkomst?.bevindingen?.length ? uitkomst.bevindingen : b ? [b] : []
  const uitVerdieping = uitkomst?.bevinding_bron === 'verdieping'
  const vGereed = aGereed && vStatus !== 'running'

  /**
   * Een regel, gekoppeld aan wat er echt gebeurt: eerst de site ophalen en het
   * register nakijken (het antwoord op de scan), dan de verdieping, dan kiezen.
   * Niets loopt op een timer.
   */
  /**
   * Wat de agent nu doet, in zijn woorden, met de echte tellers uit de Hub.
   * Koen, 15 sep: "dit wel iets aandikken". Aangedikt met wat er gebeurt,
   * niet met wat er niet gebeurt: elke regel hier komt uit een echte stap.
   */
  const BRONNAAM: Record<string, string> = {
    wayback: 'webarchief', mail: 'mailbeveiliging', pagespeed: 'snelheid', bedrijfsprofiel: 'Google-profiel',
  }
  const stap = voortgang?.stap
  const paginas = voortgang?.paginas_gelezen ?? 0
  // Koen, 15 sep: "mag je best aangeven dat we iets dieper graven". De mini
  // opent de site in een echte browser en klikt de cookiebanner weg; dat is
  // precies wat een tagscanner niet doet, dus dat mag de bezoeker lezen.
  const bInBrowser = bStatus === 'queued' || bStatus === 'running'
  const statusRegel = !aGereed
    ? 'Website ophalen'
    : !stap && bInBrowser
      ? 'Agent opent je site in een echte browser'
    : vGereed
      ? 'Bevinding kiezen'
      : stap === 'lezen'
        ? `Agent leest je site${paginas ? ` · ${paginas} pagina's` : ''}`
        : stap === 'advertenties'
          ? 'Agent zoekt je advertenties op'
          : stap === 'bronnen'
            ? 'Agent kijkt buiten je site'
            : stap === 'afwegen'
              ? 'Agent weegt de aanknopingspunten'
              : stap === 'toetsen'
                ? 'Agent toetst het bewijs'
                : 'Agent aan het werk'
  const bronnenKlaar = (voortgang?.bronnen_klaar ?? []).map((b) => BRONNAAM[b] ?? b)

  /**
   * Het contactblok, op twee plekken: tijdens het wachten (Koen, 15 sep: "in de
   * tussentijd kunnen ze alvast hun gegevens achterlaten") en onder de uitkomst.
   * Zelfde formulier, zelfde state; alleen de kop en de eerste zin verschillen.
   */
  function contactBlok(variant: 'wachten' | 'klaar') {
    return cStatus === 'klaar' ? (
                <div className="mt-8 rounded-2xl border border-[var(--color-accent)] bg-white p-5 sm:p-7">
                  <p className="font-display text-[20px] font-extrabold text-[var(--color-primary)]">
                    Dank, we bellen je
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">
                    We laten je zien wat er moet worden aangepast. Wil je niet wachten, plan dan zelf een moment.
                  </p>
                  <button
                    onClick={naarGesprek}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)]"
                  >
                    Plan zelf een moment
                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <form onSubmit={stuurContact} className="mt-8 rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-7">
                  <h2 className="font-display text-[clamp(20px,4.5vw,24px)] font-extrabold leading-[1.15] text-[var(--color-primary)]">
                    {variant === 'wachten' ? 'De agent is nog bezig' : 'Plan je herstelgesprek'}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">
                    {variant === 'wachten'
                      ? 'Wil je straks meteen weten wat er moet worden aangepast? Laat alvast je nummer achter.'
                      : 'We bellen je en laten zien wat er moet worden aangepast.'}
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <input
                      value={cNaam} onChange={(e) => setCNaam(e.target.value)}
                      placeholder="Je naam" autoComplete="name" required
                      className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3.5 text-[16px] text-[var(--color-primary)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
                    />
                    <input
                      value={cTel} onChange={(e) => setCTel(e.target.value)}
                      placeholder="Telefoonnummer" type="tel" autoComplete="tel" required
                      className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3.5 text-[16px] text-[var(--color-primary)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
                    />
                  </div>
                  <input
                    value={cEmail} onChange={(e) => setCEmail(e.target.value)}
                    placeholder="Mailadres" type="email" autoComplete="email" required
                    className="mt-3 w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3.5 text-[16px] text-[var(--color-primary)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
                  />
                  {cFout && <p className="mt-3 text-[14px] text-[var(--color-pink)]">{cFout}</p>}
                  <button
                    type="submit" disabled={cStatus === 'bezig'}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-4 text-[17px] font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-60"
                  >
                    {cStatus === 'bezig' ? 'Een moment' : 'Plan mijn herstelgesprek'}
                    {cStatus !== 'bezig' && <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />}
                  </button>
                  <p className="mt-3 text-center text-[13px] leading-relaxed text-[var(--color-muted)]">
                    We gebruiken je gegevens alleen om je hierover te bellen.{' '}
                    <button type="button" onClick={naarGesprek} className="font-semibold text-[var(--color-primary)] underline underline-offset-2">
                      Liever zelf een moment plannen
                    </button>
                  </p>
                </form>
              )
  }


  return (
    <div className="mx-auto w-full max-w-[680px] px-5 py-10 sm:py-16">
      {fase === 'invoer' && (
        <>
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">Marketing Check</p>
          <h1 className="mt-3 font-display text-[clamp(30px,7vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-[var(--color-primary)]">
            Laat een Stevin Agent je marketing checken
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-[var(--color-muted)]">
            Vul je bedrijfswebsite in. We lezen je site, kijken in de advertentieregisters en zeggen wat
            we van buitenaf kunnen zien. Geen naam, geen e-mailadres. Reken op een minuut.
          </p>

          <form onSubmit={start} className="mt-8">
            <label htmlFor="domein" className="block text-[14px] font-semibold text-[var(--color-primary)]">
              Je bedrijfswebsite
            </label>
            <div className="relative mt-2">
              <Globe
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-muted)]"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <input
                id="domein"
                name="domein"
                type="text"
                inputMode="url"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="go"
                placeholder="jouwbedrijf.nl"
                value={domein}
                onChange={(e) => setDomein(e.target.value)}
                className="w-full rounded-xl border border-[var(--color-border)] bg-white py-4 pl-12 pr-4 text-[17px] text-[var(--color-primary)] outline-none transition-colors focus:border-[var(--color-accent)]"
              />
            </div>
            <button
              type="submit"
              disabled={!domein.trim()}
              className="mt-3 w-full rounded-xl bg-[var(--color-accent)] px-5 py-4 text-[17px] font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50"
            >
              Check mijn marketing
            </button>
          </form>

          {fout && (
            <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-3">
              <p className="text-[15px] text-[var(--color-primary)]">{fout}</p>
              {/* Een foutmelding die een gesprek noemt hoort een knop te hebben. */}
              <button onClick={naarGesprek} className="mt-2 text-[14px] font-semibold text-[var(--color-primary)] underline underline-offset-2">
                Of plan meteen een kennismaking van twintig minuten
              </button>
            </div>
          )}
        </>
      )}

      {fase === 'bezig' && (
        <div className="flex flex-col items-center rounded-2xl border border-[var(--color-border)] bg-white px-6 py-12 text-center shadow-[0_1px_2px_rgba(10,22,40,0.04),0_8px_24px_-12px_rgba(10,22,40,0.12)] sm:px-10">
          {/* Rustig. Wat wij precies nalopen boeit de bezoeker niet; dat hij ziet
              dat er echt gewerkt wordt wel. Koen, 14 sep: "veel leuker om de
              heartbeat en wat quotes te tonen". */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HEARTBEAT} alt="" width={96} height={96} className="h-24 w-24" aria-hidden="true" />
          <p className="mt-5 text-[15px] text-[var(--color-muted)]" aria-live="polite">
            <span className="font-semibold text-[var(--color-primary)]">{statusRegel}</span>
            <span className="mx-2 opacity-50">&middot;</span>
            {tijdRegel(seconden)}
            {tokens > 0 && (
              <>
                <span className="mx-2 opacity-50">&middot;</span>
                {kTokens(tokens)} tokens
              </>
            )}
          </p>
          {bronnenKlaar.length > 0 && (
            <p className="mt-2 text-[13px] text-[var(--color-muted)]">
              Gelezen: {bronnenKlaar.join(' · ')}
            </p>
          )}

          <div key={kaart} className="mt-12 max-w-[520px] animate-[fadein_700ms_ease-out]">
            <p className="font-display text-[clamp(20px,4vw,26px)] font-bold leading-snug text-[var(--color-primary)]">
              &ldquo;{STEVIN_KAARTEN[kaart].kop}&rdquo;
            </p>
            <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
              {STEVIN_KAARTEN[kaart].bron}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)]">{STEVIN_KAARTEN[kaart].brug}</p>
          </div>
          <style jsx>{`
            @keyframes fadein {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}

      {/* Wie wacht kan alvast zijn nummer achterlaten: de scan is het excuus, het
          nummer het doel. Pas zodra fase A klaar is, want het endpoint hangt aan
          het token van de scan. */}
      {fase === 'bezig' && scanToken && (
        <div className="text-left">{contactBlok('wachten')}</div>
      )}

      {fase === 'klaar' && uitkomst && (
        <>
          <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[var(--color-muted)]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-3 py-1 font-semibold text-[var(--color-primary)]">
              <Globe className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              {kaalDomein(domein)}
            </span>
            <span>Van buitenaf bekeken op {datumVandaag()}</span>
          </div>

          {uitkomst.meetprobleem && (
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-7">
              <h2 className="font-display text-[clamp(22px,5vw,28px)] font-extrabold leading-[1.15] text-[var(--color-primary)]">
                Deze site kregen we niet te zien
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-[var(--color-muted)]">{uitkomst.meetprobleem}</p>
              {/* Geen boekingsknop onder een mislukte scan. Een andere site proberen
                  is de logische stap; wie toch wil praten vindt de link eronder. */}
              <button
                onClick={() => { setUitkomst(null); setScanToken(null); setFase('invoer'); setDomein('') }}
                className="mt-6 w-full rounded-xl bg-[var(--color-primary)] px-5 py-4 text-[16px] font-semibold text-white transition-colors hover:bg-[var(--color-primary-light)]"
              >
                Probeer een andere site
              </button>
            </div>
          )}

          {/* Een pijn per scan, in een oogopslag: oorzaak, meetketen met het kruis,
              drie bewijspunten, gevolg. Dan wat Stevin herstelt, dan de vraag,
              dan pas het nummer. Koen, 15 sep 10:46. */}
          {b && (() => {
            const d = diagnoseVan(b)
            return (
              <>
                <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_1px_2px_rgba(10,22,40,0.04),0_8px_24px_-12px_rgba(10,22,40,0.12)]">
                  <div className="border-l-4 border-[#d23f57] p-5 sm:p-7">
                    <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#d23f57]">{d.label}</p>
                    <h2 className="mt-2 font-display text-[clamp(22px,5vw,30px)] font-extrabold leading-[1.15] tracking-[-0.01em] text-[var(--color-primary)]">
                      {d.kop}
                    </h2>
                    <p className="mt-3 text-[16px] font-semibold leading-snug text-[var(--color-primary)]">{d.gevolg}</p>

                    <Keten keten={d.keten} kapot={d.kapot} woord={d.woord} />

                    {d.punten.length > 0 && (
                      <div className="mt-4 grid gap-2 sm:grid-cols-3">
                        {d.punten.map(([label, waarde], i) => (
                          <div key={label} className={`rounded-lg border px-3 py-2.5 ${i === d.punten.length - 1 ? 'border-[#d23f57]/40 bg-[#d23f57]/5' : 'border-[var(--color-border)] bg-white'}`}>
                            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-muted)]">{label}</p>
                            <p className={`mt-0.5 text-[14px] font-semibold leading-snug ${i === d.punten.length - 1 ? 'text-[#d23f57]' : 'text-[var(--color-primary)]'}`}>{waarde}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="mt-4 text-[13px] leading-relaxed text-[var(--color-muted)]">{kort(b.tekst, 1)}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-[var(--color-accent)] bg-white p-5 sm:p-7">
                  <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-accent)]">Dit kan Stevin voor je herstellen</p>
                  <p className="mt-2 text-[16px] leading-relaxed text-[var(--color-primary)]">{d.herstel}</p>
                </div>

                <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-7">
                  <p className="font-display text-[clamp(18px,4.5vw,22px)] font-extrabold leading-[1.2] text-[var(--color-primary)]">{d.vraag}</p>
                  {!antwoord ? (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {([['ja', 'Ja'], ['nee', 'Nee'], ['weet_niet', 'Weet ik niet']] as [Antwoord, string][]).map(([w, label]) => (
                        <button
                          key={w} type="button" onClick={() => setAntwoord(w)}
                          className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-3.5 text-[15px] font-semibold text-[var(--color-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-primary)]">
                      {antwoord === 'ja'
                        ? 'Mooi, dan ben je verder dan de meeste. De vraag is dan of het klopt wat je ziet, en dat is precies wat een herstelgesprek nakijkt.'
                        : 'Dan heb je zojuist je blinde vlek gevonden. Stevin kan die voor je herstellen.'}
                    </p>
                  )}
                </div>
              </>
            )
          })()}

          {!b && !uitkomst.meetprobleem && uitkomst.geen_bevinding_tekst && (
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-7">
              <h2 className="font-display text-[clamp(22px,5vw,28px)] font-extrabold leading-[1.15] text-[var(--color-primary)]">
                Van buitenaf zien we te weinig voor een oordeel
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-[var(--color-muted)]">
                {uitkomst.geen_bevinding_tekst}
              </p>
            </div>
          )}

          {verdiepingLiepNog && (
            <p className="mt-4 text-[13px] text-[var(--color-muted)]">
              De verdieping loopt nog. Wat hier staat komt uit de eerste scan.
            </p>
          )}
          {!verdiepingLiepNog && uitkomst.verdieping === 'failed' && (
            <p className="mt-4 text-[13px] text-[var(--color-muted)]">
              De verdieping is niet gelukt. Wat hier staat komt uit de eerste scan.
            </p>
          )}

          {/* "Dit zagen we ook" (de taginventaris uit fase A) staat niet meer op het
              scherm. Koen, 14 sep: de meeste klanten boeit het niet wat we nalopen.
              Het blijft in de database staan, voor ons. */}

          {uitkomst.meetprobleem ? (
            <p className="mt-6 text-center text-[13px] text-[var(--color-muted)]">
              Liever meteen praten?{' '}
              <button onClick={naarGesprek} className="font-semibold text-[var(--color-primary)] underline underline-offset-2">
                Plan een kennismaking van twintig minuten
              </button>
            </p>
          ) : (
            <>
              {/* Het punt waarop een scan een lead wordt. Wie zijn nummer laat
                  staan, wordt gebeld; wie meteen wil, plant zelf. Zonder dit
                  blok kenden we alleen het domein en hielden dertig scans per
                  dag nul namen over. */}
              {(antwoord || !b) && contactBlok('klaar')}
            </>
          )}
        </>
      )}
    </div>
  )
}
