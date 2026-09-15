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
  /** De registerfeiten uit de Hub, zie dossierVan in src/routes/marketingCheck.ts. */
  dossier?: Dossier | null
}

/**
 * Het dossier: de harde feiten uit het openbare advertentieregister. Koen,
 * 15 sep 11:17: "Maak geen scanpagina. Maak een persoonlijk Stevin-dossier.
 * Gebruik het echte bewijs uit de scan als visueel middelpunt." De Hub
 * stuurt ze mee als `dossier`; zolang die uitrol er niet is, lezen we ze uit
 * de tekst van de bevinding, die uit een vast sjabloon komt (markupSignal.ts).
 */
interface Dossier {
  bedrijf: string
  advertenties: number | null
  betaler: string
  register_url: string | null
  gecontroleerd_op: string
}
function dossierUit(u: Uitkomst): Dossier | null {
  if (u.dossier) return u.dossier
  const f = (u.bevindingen ?? (u.bevinding ? [u.bevinding] : [])).find((x) => x.code === 'ADVERTISING_FUNDER_MISMATCH')
  if (!f) return null
  const m = f.tekst.match(/staan (?:(\d+) )?advertenties op naam van (.+?) Als betaler staat daar (.+?) bij\./)
  if (!m) return null
  return { bedrijf: m[2].trim(), advertenties: m[1] ? Number(m[1]) : null, betaler: m[3].trim(), register_url: null, gecontroleerd_op: new Date().toISOString().slice(0, 10) }
}
function datumLang(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
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

/**
 * Geen meetketen met pijlen en geen ja/nee/weet-ik-niet meer. Koen, 15 sep
 * 11:17: "ronde SaaS-kaarten, rode en blauwe randjes, generieke pijlen, de
 * quiz: eruit. De vorm moet zeggen: Stevin heeft mijn situatie onderzocht en
 * laat precies zien waar ik controle verlies." Het bewijs draagt de pagina.
 */

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
  /** Hij drukte op "Laat Stevin mij bellen"; dan pas naam en nummer. */
  const [wilBellen, setWilBellen] = useState(false)
  const belRef = useRef<HTMLDivElement>(null)
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
    setWilBellen(false)
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
          bericht: cBericht || (uitkomst?.bevinding ? `Wil gebeld worden over: ${diagnoseVan(uitkomst.bevinding).label.toLowerCase()}` : ''),
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
                    We laten zien wat er ontbreekt en hoe we dit voor je herstellen. Wil je niet wachten, plan dan zelf een moment.
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
                    {variant === 'wachten' ? 'De agent is nog bezig' : 'Laat Stevin je bellen'}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">
                    {variant === 'wachten'
                      ? 'Wil je straks meteen weten wat er moet worden aangepast? Laat alvast je nummer achter.'
                      : 'We laten zien wat er ontbreekt en hoe we dit voor je herstellen.'}
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
                    {cStatus === 'bezig' ? 'Een moment' : 'Laat Stevin mij bellen'}
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
            <span>Stevin-dossier · van buitenaf bekeken op {datumVandaag()}</span>
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

          {/* Het dossier. Koen, 15 sep 11:17: probleem, gat, gevolg, oplossing,
              in die volgorde, met het echte bewijs als middelpunt. Geen kaarten,
              geen randjes, geen pijlen, geen quiz. Eerst de feiten, dan de pijn
              in drie regels, dan een donkere strook met wat Stevin doet en een
              knop. */}
          {b && (() => {
            const d = diagnoseVan(b)
            const dos = dossierUit(uitkomst)
            const feiten: [string, string][] = dos
              ? [
                  [dos.advertenties != null ? String(dos.advertenties) : 'Advertenties', dos.advertenties != null ? `advertenties op naam van ${dos.bedrijf}` : `op naam van ${dos.bedrijf}`],
                  [dos.betaler.toUpperCase(), 'staat als betaler vermeld'],
                  ['?', 'aanvragen niet zelfstandig herleidbaar'],
                ]
              : d.punten.map(([label, waarde]) => [waarde, label.toLowerCase()] as [string, string])
            const kop = dos
              ? (dos.advertenties != null ? `${dos.advertenties} advertenties op jouw naam.` : 'Advertenties op jouw naam.')
              : d.kop
            const kop2 = dos ? 'Jij kunt niet zien welke aanvraag eruit komt.' : null
            return (
              <div className="border-t-2 border-[var(--color-primary)] pt-6">
                <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                  {dos ? 'De proef op de som' : d.label}
                </p>
                <h2 className="mt-3 font-display text-[clamp(28px,7vw,44px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-[var(--color-primary)]">
                  {kop}
                  {kop2 && <><br />{kop2}</>}
                </h2>

                {/* Drie feiten, groot. Geen kaarten: een lijn erboven en de cijfers zelf. */}
                <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
                  {feiten.map(([groot, klein], i) => (
                    <div key={i} className="border-t border-[var(--color-border)] pt-4">
                      <p className={`font-display font-extrabold leading-none tracking-[-0.03em] text-[var(--color-primary)] ${/^[0-9?]+$/.test(groot) ? 'text-[clamp(40px,10vw,56px)]' : 'text-[clamp(22px,5vw,28px)] leading-tight'}`}>{groot}</p>
                      <p className="mt-3 text-[15px] leading-snug text-[var(--color-muted)]">{klein}</p>
                    </div>
                  ))}
                </div>

                {/* De uitsnede uit het register. Echte velden, geen decoratie: adverteerder,
                    betaler met markering, aantal, en de link naar de bron. Een
                    schermafdruk van het register zelf maakt de mini nog niet; tot die
                    tijd zijn dit de velden zoals ze daar staan. */}
                {dos && (
                  <figure className="mt-10 border border-[var(--color-primary)]/20 bg-white">
                    <figcaption className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] sm:px-5">
                      <span>Advertentieregister van Google</span>
                      <span className="hidden sm:inline">Openbaar</span>
                    </figcaption>
                    <dl className="divide-y divide-[var(--color-border)] font-mono text-[13.5px] sm:text-[14px]">
                      {([
                        ['Adverteerder', dos.bedrijf, false],
                        ['Betaler', dos.betaler, true],
                        ['Advertenties', dos.advertenties != null ? String(dos.advertenties) : 'in het register', false],
                        ['Regio', 'Nederland', false],
                      ] as [string, string, boolean][]).map(([k, v, mark]) => (
                        <div key={k} className={`grid grid-cols-[120px_1fr] gap-3 px-4 py-3 sm:grid-cols-[160px_1fr] sm:px-5 ${mark ? 'bg-[#fff3c4]' : ''}`}>
                          <dt className="text-[var(--color-muted)]">{k}</dt>
                          <dd className={`text-[var(--color-primary)] ${mark ? 'font-bold' : ''}`}>{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-border)] px-4 py-2.5 text-[12.5px] text-[var(--color-muted)] sm:px-5">
                      <span>Gecontroleerd op {datumLang(dos.gecontroleerd_op)}.</span>
                      {dos.register_url && (
                        <a href={dos.register_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--color-primary)] underline underline-offset-2">
                          Bekijk het zelf in het register
                        </a>
                      )}
                    </div>
                  </figure>
                )}

                {/* De pijn, in drie regels. Koen: "Je hebt de rekening. Je hebt de
                    advertenties. Je hebt niet zelfstandig de uitkomst." */}
                <div className="mt-12 border-l-2 border-[var(--color-primary)] pl-5">
                  {dos ? (
                    <p className="font-display text-[clamp(20px,4.6vw,26px)] font-bold leading-[1.3] text-[var(--color-primary)]">
                      Je hebt de rekening.<br />Je hebt de advertenties.<br />Je hebt niet zelfstandig de uitkomst.
                    </p>
                  ) : (
                    <p className="font-display text-[clamp(20px,4.6vw,26px)] font-bold leading-[1.3] text-[var(--color-primary)]">{d.gevolg}</p>
                  )}
                  {!dos && <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-muted)]">{kort(b.tekst, 1)}</p>}
                </div>

                {/* Stevin als oplossing: een donkere strook, een zin, een knop. */}
                <div className="mt-12 bg-[var(--color-primary)] px-6 py-8 text-white sm:px-9 sm:py-10">
                  <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-light)]">
                    {dos ? 'Stevin brengt de uitkomst terug naar jou' : 'Wat Stevin herstelt'}
                  </p>
                  <p className="mt-4 font-display text-[clamp(19px,4.4vw,24px)] font-bold leading-[1.3]">
                    {dos
                      ? 'Wij zorgen dat je zelf kunt zien welke advertentie een aanvraag oplevert. Op jouw accounts. Met jouw meetgegevens. Zonder afhankelijk te zijn van een bureau.'
                      : d.herstel}
                  </p>
                  {!wilBellen && (
                    <>
                      <button
                        type="button"
                        onClick={() => { setWilBellen(true); setTimeout(() => belRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50) }}
                        className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-[var(--color-accent)] px-5 py-4 text-[16px] font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)] sm:w-auto"
                      >
                        {dos ? 'Laat Stevin mij bellen over mijn advertentieaccount' : 'Laat Stevin mij bellen'}
                        <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
                      </button>
                      <p className="mt-3 text-[13px] text-white/60">We laten zien wat er ontbreekt en hoe we dit kunnen herstellen.</p>
                    </>
                  )}
                </div>
                <div ref={belRef}>{wilBellen && contactBlok('klaar')}</div>
              </div>
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
              {!b && contactBlok('klaar')}
            </>
          )}
        </>
      )}
    </div>
  )
}
