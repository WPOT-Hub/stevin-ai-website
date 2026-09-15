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
  /** Bewijsregels uit de scan, letterlijk. Het echte bewijs is het visuele middelpunt. */
  bewijs?: string[]
  bron_url?: string | null
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
  /** W-135: marketing of ai, met de twee antwoorden zodra ze er zijn. */
  variant?: 'marketing' | 'ai'
  antwoorden?: { gebruik: string; belang: string } | null
  /** Server-side meting: gezien, niet_gezien (fase B klaar, niets gezien), onbekend. */
  serverside?: 'gezien' | 'niet_gezien' | 'onbekend'
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
  /** bureau alleen uit onze eigen classificatie, groep bij een vastgestelde groepsrelatie, anders onbekend. */
  relatie?: 'bureau' | 'groep' | 'onbekend'
  register_url: string | null
  gecontroleerd_op: string
}
function dossierUit(u: Uitkomst): Dossier | null {
  if (u.dossier) return u.dossier
  const f = (u.bevindingen ?? (u.bevinding ? [u.bevinding] : [])).find((x) => x.code === 'ADVERTISING_FUNDER_MISMATCH')
  if (!f) return null
  const m = f.tekst.match(/staan (?:(\d+) )?advertenties op naam van (.+?) Als betaler staat daar (.+?) bij\./)
  if (!m) return null
  return { bedrijf: m[2].trim(), advertenties: m[1] ? Number(m[1]) : null, betaler: m[3].trim(), relatie: 'onbekend', register_url: null, gecontroleerd_op: new Date().toISOString().slice(0, 10) }
}
function datumLang(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
}

/**
 * Geel is de markeerstift: een waargenomen feit, een naam, een waarde. Rood is
 * de correctie: een breuk of een ontbrekende koppeling. Koen, 15 sep 12:14.
 */
const FEITEN_REGEX = new RegExp(
  [
    // Namen van meet- en advertentieplatformen, zoals wij ze schrijven.
    '(?:Google Tag Manager|Google Analytics 4|Google Analytics|Google Ads-meting|Google Ads|Meta-pixel|Meta Pixel|LinkedIn Insight|LinkedIn|Microsoft Advertising|Microsoft Clarity|Microsoft|TikTok|Pinterest|Hotjar|Clarity|Cookiebot|OneTrust|Usercentrics|CookieYes)',
    // Een getal telt alleen mee met zijn eenheid erachter, en nooit midden in
    // een woord of een cookienaam. Koen, 15 sep 2026: de markeerstift hakte
    // CMSSESSIDb70c47685f94 in stukken, wat eruitzag als een fout van ons.
    '(?<![A-Za-z0-9_])\\d+(?:[.,]\\d+)?\\s?(?:advertenties|reviews|seconden|seconde|minuten|procent|%|op 100)(?![A-Za-z0-9_])',
    // Een maand met een jaartal: "maart 2022".
    '(?:januari|februari|maart|april|mei|juni|juli|augustus|september|oktober|november|december)\\s\\d{4}',
  ].join('|'),
  'g',
)
function Markeer({ tekst }: { tekst: string }) {
  const delen: React.ReactNode[] = []
  let laatste = 0
  for (const m of tekst.matchAll(FEITEN_REGEX)) {
    const i = m.index ?? 0
    if (i > laatste) delen.push(tekst.slice(laatste, i))
    delen.push(<mark key={i} className="bg-[#ffe86b] px-0.5 text-[var(--color-primary)]">{m[0]}</mark>)
    laatste = i + m[0].length
  }
  if (laatste < tekst.length) delen.push(tekst.slice(laatste))
  return <>{delen}</>
}

type Fase = 'invoer' | 'vragen' | 'bezig' | 'klaar'

/**
 * De AI-meetproef (W-135, Koen 15 sep 12:40): dezelfde motor, een ander
 * verhaal. Twee vragen voordat de meting start; zijn antwoorden in zijn woorden
 * naast wat wij zagen. Geen modelcall zolang een antwoord ontbreekt.
 */
type AiGebruik = 'nee' | 'test' | 'ja'
type AiBelang = 'beperkt' | 'belangrijk' | 'zeer'
const GEBRUIK_OPTIES: [AiGebruik, string][] = [['nee', 'Nee, nog niet'], ['test', 'We testen ermee'], ['ja', 'Ja, in meerdere processen']]
const BELANG_OPTIES: [AiBelang, string][] = [['beperkt', 'Beperkt'], ['belangrijk', 'Belangrijk'], ['zeer', 'Zeer belangrijk']]
const GEBRUIK_TEKST: Record<string, string> = { nee: 'Jullie werken nog niet met AI.', test: 'Jullie testen met AI.', ja: 'Jullie werken al met AI in meerdere processen.' }
const BELANG_TEKST: Record<string, string> = { beperkt: 'AI wordt beperkt belangrijk.', belangrijk: 'AI wordt belangrijk.', zeer: 'AI wordt zeer belangrijk.' }

/** Wat wij zagen, in een regel, voor naast zijn eigen woorden. */
const AI_ZAGEN: Record<string, string> = {
  CONSENT_MEASUREMENT_BEFORE_INTERACTION: 'De meetlaag op jullie website wacht niet op toestemming.',
  MEASUREMENT_NOTHING_AFTER_CONSENT: 'De meetlaag op jullie website geeft na toestemming niets door.',
  ADVERTISING_FUNDER_MISMATCH: 'Jullie advertenties worden door een andere partij betaald; welke aanvraag daaruit komt, is niet zichtbaar.',
  ADVERTISING_ACTIVE_CONVERSION_UNKNOWN: 'Jullie adverteren, maar of een aanvraag daaruit geteld wordt, is niet te zien.',
  CONVERSION_LEADPATHS_UNVERIFIED: 'Jullie site krijgt aanvragen, maar of ze als aanvraag geteld worden is niet te zien.',
  CONVERSION_LEADPATHS_UNCOUNTED: 'Jullie site krijgt aanvragen, maar of ze geteld worden is niet te zien.',
  PROFIEL_REVIEWS_STILGEVALLEN: 'Jullie Google-profiel staat stil; dat is wat een klant als eerste ziet.',
  PROFIEL_WEINIG_REVIEWS: 'Jullie Google-profiel heeft bijna geen reviews.',
  SITE_TRAAG_OP_TELEFOON: 'Jullie site is traag op de telefoon, waar de meeste aanvragen vandaan komen.',
  MAIL_DOMEIN_ONBESCHERMD: 'Mail uit jullie naam is niet beschermd.',
}
/**
 * Geel is een waargenomen aanwijzing, rood een vastgesteld probleem. Geen
 * bronnaam, geen tag, geen link voor de keuze (Koen, 15 sep 14:26); dat is
 * voor de uitgebreide scan.
 */
const AI_MARK: Record<string, { geel: string; rood: string }> = {
  CONSENT_MEASUREMENT_BEFORE_INTERACTION: { geel: 'Meting voor toestemming vastgesteld', rood: 'Meting wacht niet op toestemming' },
  MEASUREMENT_NOTHING_AFTER_CONSENT: { geel: 'Toestemming gegeven, geen meting gezien', rood: 'Na toestemming wordt niets gemeten' },
  ADVERTISING_FUNDER_MISMATCH: { geel: 'Betaling door een andere partij vastgesteld', rood: 'Geen koppeling tussen advertentie en aanvraag zichtbaar' },
  ADVERTISING_ACTIVE_CONVERSION_UNKNOWN: { geel: 'Lopende advertenties vastgesteld', rood: 'Geen koppeling tussen advertentie en aanvraag zichtbaar' },
  CONVERSION_LEADPATHS_UNVERIFIED: { geel: 'Meerdere contactroutes vastgesteld', rood: 'Geen koppeling tussen aanvraag en advertentie zichtbaar' },
  CONVERSION_LEADPATHS_UNCOUNTED: { geel: 'Meerdere contactroutes vastgesteld', rood: 'Aanvragen worden niet geteld' },
  PROFIEL_REVIEWS_STILGEVALLEN: { geel: 'Google-profiel gevonden', rood: 'Geen recente review' },
  PROFIEL_WEINIG_REVIEWS: { geel: 'Google-profiel gevonden', rood: 'Te weinig reviews' },
  SITE_TRAAG_OP_TELEFOON: { geel: 'Laadtijd op telefoon gemeten', rood: 'Site laadt te traag op de telefoon' },
  MAIL_DOMEIN_ONBESCHERMD: { geel: 'Maildomein gecontroleerd', rood: 'Mail uit jullie naam is niet beschermd' },
}

/** De klap: wat AI wel en niet kan met deze meetlaag, in zijn eigen situatie. */
function aiKlap(a: { gebruik: string; belang: string }): [string, string] {
  if (a.gebruik === 'ja') return ['Jullie werken al met AI.', 'Maar kunnen jullie website en marketingdata betrouwbaar aangeven wat een aanvraag is?']
  if (a.belang === 'beperkt') return ['Ook zonder AI geldt dit.', 'Wie niet weet welke signalen zijn site doorgeeft, stuurt op aannames.']
  return ['AI maakt een verkeerd ingestelde meetlaag niet betrouwbaar.', 'Het kan alleen sneller gaan sturen op de signalen die je doorgeeft.']
}

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

/** Onze eigen domeinen, met of zonder www. */
const EIGEN_SITE = /^(www\.)?stevin\.(ai|io|nl)$/

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
  /** De breuk, in rood: alleen een aantoonbaar probleem of een ontbrekende koppeling. */
  rood: string
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
    rood: 'Laadt voor toestemming',
  },
  MEASUREMENT_NOTHING_AFTER_CONSENT: {
    label: 'Aandacht voor je meetketen',
    kop: 'Ook na toestemming meet je site niets.',
    gevolg: 'Van iedereen die op je site komt, weet je dan niets. Ook niet hoeveel er een aanvraag doen.',
    keten: ['Cookiebanner', 'Toestemming', 'Meting', 'Aanvraag'], kapot: 1, woord: 'niets gemeten',
    punten: [['Cookiebanner', 'Geaccepteerd'], ['Meting', 'Geen enkele'], ['Gevolg', 'Geen cijfers over je bezoekers']],
    herstel: 'Wij koppelen de meting aan de toestemming zodat ze weer aangaat, en tellen daarna wat er binnenkomt.',
    vraag: 'Kun jij zien hoeveel bezoekers je site vorige week had?',
    rood: 'Geen meting na toestemming',
  },
  ADVERTISING_FUNDER_MISMATCH: {
    label: 'Aandacht voor je advertenties',
    kop: 'Je betaalt voor advertenties, maar kunt niet zelfstandig zien welke aanvragen ze opleveren.',
    gevolg: 'Je stuurt dan op vertrouwen, niet op bewijs. En bij een wissel van bureau gaat de historie niet vanzelf mee.',
    keten: ['Advertentie', 'Klik', 'Website', 'Aanvraag'], kapot: 2, woord: 'niet zelf te zien',
    punten: [['Advertenties', 'Op jouw naam'], ['Betaler', 'Een andere partij'], ['Gevolg', 'Opbrengst niet zelf te controleren']],
    herstel: 'Wij zetten een onafhankelijke meting tussen je advertenties, je website en je aanvragen, op jouw naam. Je ziet daarna welke advertentie een aanvraag opleverde, wie er ook aan de knoppen zit.',
    vraag: 'Kun jij vandaag zelf zien welke advertentie een echte aanvraag heeft opgeleverd?',
    rood: 'Geen koppeling met een aanvraag zichtbaar',
  },
  ADVERTISING_ACTIVE_CONVERSION_UNKNOWN: {
    label: 'Aandacht voor je advertenties',
    kop: 'Je adverteert, maar of een aanvraag daaruit geteld wordt, is niet te zien.',
    gevolg: 'Google stuurt je budget dan op een deel van de werkelijkheid.',
    keten: ['Advertentie', 'Klik', 'Website', 'Aanvraag'], kapot: 2, woord: 'niet geteld',
    punten: [['Advertenties', 'In het register van Google'], ['Contact', 'Formulier of telefoon'], ['Gevolg', 'Telt Google de aanvraag mee?']],
    herstel: 'Wij koppelen elke aanvraag, formulier en telefoontje, aan de advertentie die hem opleverde. Google krijgt daarna de goede informatie om op te sturen.',
    vraag: 'Kun jij vandaag zelf zien welke advertentie een echte aanvraag heeft opgeleverd?',
    rood: 'Geen koppeling met een aanvraag zichtbaar',
  },
  CONVERSION_LEADPATHS_UNVERIFIED: {
    label: 'Aandacht voor je aanvragen',
    kop: 'Je site krijgt aanvragen binnen, maar of ze geteld worden weet niemand.',
    gevolg: 'Aan het eind van de maand weet je dan niet wat je site en je advertenties hebben opgeleverd.',
    keten: ['Bezoeker', 'Website', 'Aanvraag', 'Jij'], kapot: 2, woord: 'niet geteld',
    punten: [['Contactroutes', 'Formulier, telefoon, mail'], ['Advertentiemeting', 'Aanwezig'], ['Gevolg', 'Aanvragen niet herleid']],
    herstel: 'Wij tellen elke aanvraag, ook het telefoontje, en koppelen hem aan waar hij vandaan kwam. Je weet daarna per maand wat je site oplevert.',
    vraag: 'Weet jij hoeveel aanvragen je site vorige maand opleverde?',
    rood: 'Geen koppeling tussen aanvraag en advertentie zichtbaar',
  },
  CONVERSION_LEADPATHS_UNCOUNTED: {
    label: 'Aandacht voor je aanvragen',
    kop: 'Je site krijgt aanvragen binnen, maar of ze geteld worden weet niemand.',
    gevolg: 'Aan het eind van de maand weet je dan niet wat je site heeft opgeleverd.',
    keten: ['Bezoeker', 'Website', 'Aanvraag', 'Jij'], kapot: 2, woord: 'niet geteld',
    punten: [['Contactroutes', 'Formulier, telefoon, mail'], ['Meting', 'Aanwezig'], ['Gevolg', 'Alleen bezoek geteld']],
    herstel: 'Wij tellen elke aanvraag, ook het telefoontje, en koppelen hem aan waar hij vandaan kwam. Je weet daarna per maand wat je site oplevert.',
    vraag: 'Weet jij hoeveel aanvragen je site vorige maand opleverde?',
    rood: 'Aanvragen worden niet geteld',
  },
  PROFIEL_REVIEWS_STILGEVALLEN: {
    label: 'Aandacht voor je reputatie',
    kop: 'Wie je naam googelt, ziet een profiel dat stil staat.',
    gevolg: 'Een nieuwe klant leest dat als een bedrijf dat stil staat, nog voor hij je site ziet.',
    keten: ['Zoeken', 'Google-profiel', 'Website', 'Aanvraag'], kapot: 1, woord: 'klant haakt af',
    punten: [['Google-profiel', 'Gevonden'], ['Laatste review', 'Lang geleden'], ['Gevolg', 'Klant kiest een ander']],
    herstel: 'Wij zetten een vaste routine op voor reviews en antwoorden, en meten of je profiel weer aanvragen oplevert.',
    vraag: 'Weet jij wanneer je laatste Google-review binnenkwam?',
    rood: 'Geen recente review',
  },
  PROFIEL_WEINIG_REVIEWS: {
    label: 'Aandacht voor je reputatie',
    kop: 'Wie je naam googelt, ziet bijna geen reviews.',
    gevolg: 'Een nieuwe klant kiest dan voor wie er wel heeft.',
    keten: ['Zoeken', 'Google-profiel', 'Website', 'Aanvraag'], kapot: 1, woord: 'klant haakt af',
    punten: [['Google-profiel', 'Gevonden'], ['Reviews', 'Te weinig'], ['Gevolg', 'Klant kiest een ander']],
    herstel: 'Wij zetten een vaste routine op voor reviews en antwoorden, en meten of je profiel weer aanvragen oplevert.',
    vraag: 'Weet jij wanneer je laatste Google-review binnenkwam?',
    rood: 'Te weinig reviews',
  },
  SITE_TRAAG_OP_TELEFOON: {
    label: 'Aandacht voor je website',
    kop: 'Je site is traag op de telefoon, en daar komen de meeste aanvragen vandaan.',
    gevolg: 'Wie moet wachten, belt de volgende.',
    keten: ['Zoeken', 'Klik', 'Website', 'Aanvraag'], kapot: 1, woord: 'laadt traag',
    punten: [['Snelheid op telefoon', 'Onder de maat'], ['Laden', 'Meer dan vier seconden'], ['Gevolg', 'Bezoekers haken af']],
    herstel: 'Wij laten meten wat je site traag maakt, zorgen dat het wordt opgelost en meten daarna of er meer aanvragen binnenkomen.',
    vraag: 'Heb jij je eigen site weleens op een telefoon buiten je wifi geopend?',
    rood: 'Laadt te traag op de telefoon',
  },
  MAIL_DOMEIN_ONBESCHERMD: {
    label: 'Aandacht voor je mail',
    kop: 'Mail uit jouw naam kan door iedereen verstuurd worden.',
    gevolg: 'Je eigen mail komt daardoor vaker in spam, en je antwoord op een aanvraag ook.',
    keten: ['Aanvraag', 'Jouw antwoord', 'Inbox klant', 'Opdracht'], kapot: 1, woord: 'in spam',
    punten: [['Mailbeveiliging', 'Ontbreekt'], ['Formulier', 'Aanwezig'], ['Gevolg', 'Antwoorden komen niet aan']],
    herstel: 'Wij zetten de beveiliging van je maildomein goed en controleren daarna of je mail aankomt.',
    vraag: 'Komt jouw mail weleens in spam bij klanten?',
    rood: 'Geen bescherming op je maildomein',
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
    rood: 'Niet te controleren van buitenaf',
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

export default function MarketingCheck({ variant = 'marketing' }: { variant?: 'marketing' | 'ai' } = {}) {
  const [domein, setDomein] = useState('')
  const [fase, setFase] = useState<Fase>('invoer')
  const [uitkomst, setUitkomst] = useState<Uitkomst | null>(null)
  const [fout, setFout] = useState<string | null>(null)
  /** Koen, 15 sep 14:57: wie stevin.ai invoert krijgt een knipoog, geen scan. */
  const [eigenSite, setEigenSite] = useState(false)
  const [kaart, setKaart] = useState(0)
  const [seconden, setSeconden] = useState(0)
  /** Wat er echt klaar is aan de serverkant. De stappenlijst leest hieruit. */
  const [aGereed, setAGereed] = useState(false)
  /** Token van de scan zodra fase A terug is; het contactblok tijdens het wachten hangt eraan. */
  const [scanToken, setScanToken] = useState<string | null>(null)
  /** W-135: de twee antwoorden van de AI-meetproef, voor de meting start. */
  const [aiGebruik, setAiGebruik] = useState<AiGebruik | null>(null)
  const [aiBelang, setAiBelang] = useState<AiBelang | null>(null)
  const [aiFout, setAiFout] = useState<string | null>(null)
  /**
   * Wat hij wil, en pas daarna zijn gegevens. Koen, 15 sep 11:37: "daarna niet
   * meteen hard verkopen". Twee even grote keuzes: de scan rustig nalezen, of
   * hem samen doornemen. De Hub kent allebei (contact.ts: wens meting of gesprek).
   */
  const [wens, setWens] = useState<'meting' | 'gesprek' | null>(null)
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
    // Onze eigen site (stevin.ai, stevin.io, stevin.nl): een knipoog, geen scan.
    // Geldt voor elke scan die dit component gebruikt; de Hub weigert hem ook.
    setEigenSite(false)
    setFout(null)
    if (EIGEN_SITE.test(kaalDomein(domein))) {
      setEigenSite(true)
      return
    }
    setFase('bezig')
    setUitkomst(null)
    setScanToken(null)
    setWens(null)
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
          variant,
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

      if (variant === 'ai' && !data.antwoorden && !data.meetprobleem) {
        // Eerst de twee vragen; de browsermeting en het model wachten daarop.
        // Kregen we de site niet te zien, dan zeggen we dat meteen en stellen
        // we geen vragen: de voorcontrole is precies daarvoor.
        setUitkomst(data)
        setFase('vragen')
        return
      }
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

  /** W-135: beide antwoorden binnen, dan pas de echte meting. */
  async function stuurAntwoorden(gebruik: AiGebruik, belang: AiBelang) {
    if (!scanToken) return
    setAiFout(null)
    startTijd.current = Date.now()
    setFase('bezig')
    try {
      const res = await fetch(`${hub.current}/result/${scanToken}/antwoorden`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ai_gebruik: gebruik, ai_belang: belang, session_token: params.current.s }),
      })
      const data = (await res.json()) as Uitkomst & { ok: boolean; error?: string }
      if (!res.ok || !data?.ok) {
        setAiFout(data?.error || 'Dat lukte niet. Probeer het nog eens.')
        setFase('vragen')
        return
      }
      setBStatus(data.deep_scan ?? 'skipped')
      setVStatus(data.verdieping ?? 'skipped')
      if (data.verdieping === 'running' || data.deep_scan === 'queued') {
        pollTotKlaar(data.token, data)
      } else {
        toon(data, false)
      }
    } catch {
      setAiFout('Dat lukte niet. Controleer je verbinding en probeer het nog eens.')
      setFase('vragen')
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
          wens: wens ?? 'gesprek',
          naam: cNaam, email: cEmail, telefoon: cTel,
          bericht: cBericht || (uitkomst?.bevinding ? `Uit de scan: ${diagnoseVan(uitkomst.bevinding).label.toLowerCase()}` : ''),
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
    // Bij "stuur mij de scan" is een nummer niet nodig; bij een gesprek wel.
    const wilMeting = variant === 'klaar' && wens === 'meting'
    return cStatus === 'klaar' ? (
                <div className="mt-8 rounded-2xl border border-[var(--color-accent)] bg-white p-5 sm:p-7">
                  <p className="font-display text-[20px] font-extrabold text-[var(--color-primary)]">
                    {wens === 'meting' ? 'Dank, hij komt eraan' : 'Dank, we bellen je'}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">
                    {wens === 'meting'
                      ? 'De volledige uitkomst komt in je mail. Wil je hem liever samen doornemen, plan dan een moment.'
                      : 'We nemen de uitkomst met je door. Wil je niet wachten, plan dan zelf een moment.'}
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
                    {variant === 'wachten' ? 'De agent is nog bezig' : wilMeting ? 'De uitgebreide scan' : 'Een kennismaking'}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">
                    {variant === 'wachten'
                      ? 'Wil je straks meteen weten wat er moet worden aangepast? Laat alvast je nummer achter.'
                      : wilMeting
                        ? 'Je krijgt de volledige uitkomst in je mail. Rustig nalezen, geen verplichting.'
                        : 'We bellen je om de uitkomst vrijblijvend samen door te nemen.'}
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <input
                      value={cNaam} onChange={(e) => setCNaam(e.target.value)}
                      placeholder="Je naam" autoComplete="name" required
                      className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3.5 text-[16px] text-[var(--color-primary)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
                    />
                    {!wilMeting && (
                    <input
                      value={cTel} onChange={(e) => setCTel(e.target.value)}
                      placeholder="Telefoonnummer" type="tel" autoComplete="tel" required
                      className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3.5 text-[16px] text-[var(--color-primary)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
                    />
                    )}
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
                    {cStatus === 'bezig' ? 'Een moment' : wilMeting ? 'Stuur mij de uitgebreide scan' : 'Plan een kennismaking'}
                    {cStatus !== 'bezig' && <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />}
                  </button>
                  <p className="mt-3 text-center text-[13px] leading-relaxed text-[var(--color-muted)]">
                    {wilMeting
                      ? 'We gebruiken je gegevens alleen om je de scan te sturen. '
                      : 'We gebruiken je gegevens alleen om je hierover te bellen. '}
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
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">
            {variant === 'ai' ? 'AI-Ready Scan' : 'Marketing Scan'}
          </p>
          <h1 className="mt-3 font-display text-[clamp(30px,7vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-[var(--color-primary)]">
            {variant === 'ai' ? <>Eerst meten.<br />Dan met AI bouwen.</> : 'Laat een Stevin Agent je marketing scannen'}
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-[var(--color-muted)]">
            {variant === 'ai'
              ? 'Jullie willen met AI werken. Kan jullie meetlaag dat dragen? Vul je bedrijfswebsite in; wij meten van buitenaf welke signalen je site doorgeeft. Geen naam, geen e-mailadres.'
              : 'Vul je bedrijfswebsite in. We lezen je site, kijken in de advertentieregisters en zeggen wat we van buitenaf kunnen zien. Geen naam, geen e-mailadres. Reken op een minuut.'}
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
              Scan mijn marketing
            </button>
          </form>

          {eigenSite && (
            <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-7">
              <p className="font-display text-[clamp(20px,4.5vw,24px)] font-extrabold leading-[1.2] text-[var(--color-primary)]">
                Deze website is van Stevin.
              </p>
              <p className="mt-3 text-[16px] leading-relaxed text-[var(--color-primary)]">
                De proef op de som doen we liever bij iemand anders.
              </p>
              <p className="mt-2 text-[16px] font-semibold leading-relaxed">
                <mark className="bg-[var(--color-accent)] px-1 text-white">We bewaren onze tokens graag voor jouw marketing.</mark>
              </p>
            </div>
          )}

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

      {fase === 'vragen' && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_1px_2px_rgba(10,22,40,0.04),0_8px_24px_-12px_rgba(10,22,40,0.12)] sm:p-8">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">We zetten je scan klaar</p>
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">Tijdens de voorbereiding stellen we twee korte vragen.</p>

          <p className="mt-7 font-display text-[clamp(19px,4.5vw,23px)] font-bold leading-[1.25] text-[var(--color-primary)]">Werken jullie al met AI binnen de organisatie?</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {GEBRUIK_OPTIES.map(([w, label]) => (
              <button key={w} type="button" onClick={() => setAiGebruik(w)}
                className={`rounded-xl border px-3 py-3.5 text-[15px] font-semibold transition-colors ${aiGebruik === w ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white' : 'border-[var(--color-border)] bg-white text-[var(--color-primary)] hover:border-[var(--color-primary)]'}`}>
                {label}
              </button>
            ))}
          </div>

          <p className="mt-7 font-display text-[clamp(19px,4.5vw,23px)] font-bold leading-[1.25] text-[var(--color-primary)]">Hoe belangrijk denk je dat AI wordt voor jullie werk?</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {BELANG_OPTIES.map(([w, label]) => (
              <button key={w} type="button" onClick={() => setAiBelang(w)}
                className={`rounded-xl border px-3 py-3.5 text-[15px] font-semibold transition-colors ${aiBelang === w ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white' : 'border-[var(--color-border)] bg-white text-[var(--color-primary)] hover:border-[var(--color-primary)]'}`}>
                {label}
              </button>
            ))}
          </div>

          {aiFout && <p className="mt-4 text-[14px] text-[var(--color-pink)]">{aiFout}</p>}
          <button type="button" disabled={!aiGebruik || !aiBelang}
            onClick={() => { if (aiGebruik && aiBelang) void stuurAntwoorden(aiGebruik, aiBelang) }}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-4 text-[17px] font-semibold text-white transition-colors hover:bg-[var(--color-primary-light)] disabled:opacity-40">
            Start de meting
            <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
          </button>
        </div>
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

          {/* Het dossier (Koen, 15 sep 12:14): een onverwacht inzicht, het bewijs,
              de spanning, Stevin, en dan de keuze. Geel markeert feiten, rood
              markeert een breuk. De betaler is nooit automatisch een bureau: dat
              zegt alleen onze eigen classificatie (dossier.relatie). */}
          {b && (() => {
            const d = diagnoseVan(b)
            const dos = dossierUit(uitkomst)
            const rel = dos?.relatie ?? 'onbekend'
            const bedrijf = dos ? dos.bedrijf : ''
            const bewijs = b.bewijs && b.bewijs.length > 0 ? b.bewijs : null
            return (
              <article className="border-t border-[var(--color-primary)] pt-5">
                {variant === 'ai' && uitkomst.antwoorden ? (
                  <>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                      AI-Ready Scan <span className="font-normal normal-case tracking-normal">&middot; De proef op de som</span>
                    </p>

                    {/* Beide antwoorden, in zijn woorden, naast wat wij zien. */}
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-10">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">Jullie zeggen</p>
                        <p className="mt-2 font-display text-[clamp(20px,4.6vw,26px)] font-bold leading-[1.25] text-[var(--color-primary)]">
                          {BELANG_TEKST[uitkomst.antwoorden.belang]}<br />{GEBRUIK_TEKST[uitkomst.antwoorden.gebruik]}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">Wij zien</p>
                        <p className="mt-2 font-display text-[clamp(20px,4.6vw,26px)] font-bold leading-[1.25] text-[var(--color-primary)]">
                          {AI_ZAGEN[b.code] ?? b.titel}
                        </p>
                      </div>
                    </div>

                    {/* Geel: waargenomen aanwijzing. Rood: vastgesteld probleem. Geen bron, geen tag. */}
                    <div className="mt-8 border-t border-[var(--color-border)] pt-4">
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">Wat de buitenmeting vaststelde</p>
                      <p className="mt-3 text-[16px] leading-relaxed text-[var(--color-primary)]">
                        <mark className="bg-[#ffe86b] px-0.5">{(AI_MARK[b.code] ?? { geel: 'Aanwijzing van buitenaf vastgesteld' }).geel}</mark>
                      </p>
                      <p className="mt-2 text-[17px] font-semibold leading-snug text-[#d23f57]">
                        {(AI_MARK[b.code] ?? { rood: d.rood }).rood}
                      </p>
                    </div>

                    {/* De klap. */}
                    <div className="mt-10 border-t border-[var(--color-primary)] pt-6">
                      <p className="font-display text-[clamp(22px,5.2vw,30px)] font-extrabold leading-[1.25] tracking-[-0.015em] text-[var(--color-primary)]">
                        AI repareert een verkeerde meetlaag niet.
                      </p>
                      <p className="mt-3 max-w-[40ch] text-[17px] leading-relaxed text-[var(--color-primary)]">Het gebruikt de signalen die je doorgeeft.</p>
                      <p className="mt-5 font-mono text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">Eerst de meetlaag. Dan het model.</p>
                    </div>

                    {/* Stevin. */}
                    <div className="mt-10 border-t-2 border-[var(--color-primary)] pt-6">
                      <p className="font-display text-[19px] font-bold leading-snug text-[var(--color-primary)]">
                        Stevin bouwt het marketingbrein van jouw bedrijf.
                      </p>
                      <p className="mt-3 max-w-[54ch] text-[16px] leading-relaxed text-[var(--color-primary)]">
                        De eerste stap is zorgen dat het betrouwbare signalen krijgt.
                      </p>
                      {/* Koen, 15 sep 14:44: wat je ook met AI gaat doen en met wie, dit moet goed
                          staan. Gemarkeerd als met een rode stift, geen rode letters. */}
                      <p className="mt-3 max-w-[54ch] text-[16px] font-semibold leading-relaxed text-[var(--color-primary)]">
                        Wat je ook met AI gaat doen, en welke partij ermee gaat werken: <mark className="bg-[#d23f57] px-1 text-white">dit moet goed staan.</mark>
                      </p>
                    </div>
                  </>
                ) : (
                <>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  De proef op de som
                </p>

                {/* Geen neutraal feit als eerste zin. */}
                <h2 className="mt-6 font-display text-[clamp(23px,5.4vw,32px)] font-extrabold leading-[1.25] tracking-[-0.015em] text-[var(--color-primary)]">
                  {dos
                    ? rel === 'bureau'
                      ? <>Je kunt morgen van bureau wisselen.<br />Maar kun je je marketingkennis meenemen?</>
                      : rel === 'groep'
                        ? <>De advertenties staan op naam van jouw bedrijf.<br />De betaling loopt via een andere maatschappij binnen de groep.</>
                        : <>Jouw advertenties. Betaald door een andere partij.<br />Zie jij zelf wat ze opleveren?</>
                    : d.kop}
                </h2>

                {/* Het bewijs: echte bronfragmenten, geel op de feiten. */}
                <div className="mt-10 border-t border-[var(--color-border)] pt-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">Wat de bron laat zien</p>
                  {dos ? (
                    <div className="mt-4 space-y-2 text-[16px] leading-relaxed text-[var(--color-primary)]">
                      <p>Bij <mark className="bg-[#ffe86b] px-0.5">{bedrijf}</mark> staan <mark className="bg-[#ffe86b] px-0.5">{dos.advertenties ?? 'meerdere'} advertenties</mark> op naam.</p>
                      <p><mark className="bg-[#ffe86b] px-0.5 font-semibold">{dos.betaler}</mark> staat als betaler vermeld.</p>
                      <p className="text-[var(--color-muted)]">
                        {rel === 'bureau'
                          ? 'Een extern bureau, volgens onze eigen registratie.'
                          : rel === 'groep'
                            ? 'Dat kan een normale groepsstructuur zijn.'
                            : 'Van buitenaf kunnen we niet vaststellen welke relatie deze partij met jouw bedrijf heeft.'}
                      </p>
                    </div>
                  ) : bewijs ? (
                    <ul className="mt-4 space-y-1.5 text-[15.5px] leading-relaxed text-[var(--color-primary)]">
                      {bewijs.slice(0, 4).map((regel) => (
                        <li key={regel} className="border-l-2 border-[var(--color-border)] pl-3"><Markeer tekst={regel} /></li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-[16px] leading-relaxed text-[var(--color-primary)]"><Markeer tekst={kort(b.tekst, 2)} /></p>
                  )}
                  <p className="mt-4 font-mono text-[11.5px] text-[var(--color-muted)]">
                    {dos ? 'Advertentieregister van Google' : 'Eigen meting van buitenaf'}, {dos ? datumLang(dos.gecontroleerd_op) : datumVandaag()}
                    {(dos?.register_url || b.bron_url) && (
                      <>
                        {' '}
                        <a href={dos?.register_url || b.bron_url || '#'} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--color-primary)]">bron</a>
                      </>
                    )}
                  </p>
                </div>

                {/* De breuk, in rood. Alleen wat er echt ontbreekt. */}
                <div className="mt-8 border-t border-[var(--color-border)] pt-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">Wat daar ontbreekt</p>
                  <p className="mt-3 text-[17px] font-semibold leading-snug text-[#d23f57]">
                    {dos ? 'Geen koppeling met een aanvraag zichtbaar' : d.rood}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">
                    {dos
                      ? 'Dat vertelt ons wie betaalt. Niet welke advertenties aanvragen opleveren.'
                      : 'Van buitenaf zien we niet hoe dit doorwerkt in je aanvragen. Als je dit zelf ook niet kunt controleren, stuur je op gevoel.'}
                  </p>
                </div>

                {/* De spanning: de vraag die hij zichzelf gaat stellen. */}
                <p className="mt-10 max-w-[32ch] font-display text-[clamp(21px,4.8vw,28px)] font-bold leading-[1.3] tracking-[-0.01em] text-[var(--color-primary)]">
                  {dos
                    ? rel === 'groep'
                      ? 'Kun jij binnen je eigen organisatie zelf zien welke advertenties aanvragen opleveren?'
                      : rel === 'bureau'
                        ? 'Een bureau kan je advertenties beheren. Maar kun jij zelf aantonen wat ze opleveren?'
                        : 'Als je morgen wilt weten welke advertentie een aanvraag heeft opgeleverd, waar kijk je dan?'
                    : d.vraag}
                </p>

                {/* Stevin, in donkerblauw. */}
                <div className="mt-10 border-t-2 border-[var(--color-primary)] pt-6">
                  <p className="font-display text-[19px] font-bold leading-snug text-[var(--color-primary)]">
                    Stevin zorgt dat jij dit antwoord zelf kunt geven.
                  </p>
                  <p className="mt-3 max-w-[54ch] text-[16px] leading-relaxed text-[var(--color-primary)]">
                    {rel === 'groep' && dos
                      ? 'Stevin maakt die meetketen controleerbaar voor de mensen die op de marketinguitkomst moeten sturen.'
                      : 'Stevin bouwt het marketingbrein van jouw bedrijf. Wij verbinden advertenties, meting en aanvragen, zodat de kennis over wat werkt niet buiten je bedrijf blijft hangen.'}
                  </p>
                </div>

                </>
                )}

                {/* Twee keuzes; kennismaking is de hoofdactie. */}
                {!wens && (
                  <div className="mt-10">
                    <p className="text-[15px] leading-relaxed text-[var(--color-muted)]">
                      {variant === 'ai'
                        ? 'Dit is een uitkomst uit de AI-Ready Scan. Wil je de uitgebreide scan ontvangen, of zullen we vrijblijvend kennismaken?'
                        : 'Dit is een van de signalen uit je scan. Wil je de uitgebreide scan eerst zelf ontvangen, of zullen we de uitkomst vrijblijvend samen doornemen?'}
                    </p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => { setWens('gesprek'); setTimeout(() => belRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50) }}
                        className="flex-1 bg-[var(--color-primary)] px-5 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--color-primary-light)]"
                      >
                        Plan een kennismaking
                      </button>
                      <button
                        type="button"
                        onClick={() => { setWens('meting'); setTimeout(() => belRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50) }}
                        className="flex-1 border border-[var(--color-border)] px-5 py-4 text-[15px] font-semibold text-[var(--color-primary)] transition-colors hover:border-[var(--color-primary)]"
                      >
                        Stuur mij de uitgebreide scan
                      </button>
                    </div>
                  </div>
                )}
                <div ref={belRef}>{wens && contactBlok('klaar')}</div>
              </article>
            )
          })()}

          {/* De derde route (Koen, 15 sep 14:53): geen bevinding, maar wel veel
              marketing. Geen rode conclusie en geen kanaallijst; wel de vraag die
              ertoe doet en de groene Stevin-pitch. Groen betekent hier niet "alles
              is goed" maar "hier voegt Stevin waarde toe". Bij weinig zicht en
              weinig kanalen blijft het een eerlijk "te weinig voor een oordeel",
              ook zonder ruwe namen. */}
          {!b && !uitkomst.meetprobleem && (() => {
            const veel = (uitkomst.ook_gezien?.length ?? 0) >= 2
            return (
              <article className="border-t border-[var(--color-primary)] pt-5">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  {variant === 'ai' ? <>AI-Ready Scan <span className="font-normal normal-case tracking-normal">&middot; De proef op de som</span></> : 'De proef op de som'}
                </p>

                {variant === 'ai' && uitkomst.antwoorden && (
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-10">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">Jullie zeggen</p>
                      <p className="mt-2 font-display text-[clamp(20px,4.6vw,26px)] font-bold leading-[1.25] text-[var(--color-primary)]">
                        {BELANG_TEKST[uitkomst.antwoorden.belang]}<br />{GEBRUIK_TEKST[uitkomst.antwoorden.gebruik]}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">Wij zien</p>
                      <p className="mt-2 font-display text-[clamp(20px,4.6vw,26px)] font-bold leading-[1.25] text-[var(--color-primary)]">
                        {veel ? 'Meerdere advertentie- en meetkanalen zichtbaar.' : 'Van buitenaf te weinig om iets over jullie meetlaag te zeggen.'}
                      </p>
                    </div>
                  </div>
                )}

                <h2 className={`font-display text-[clamp(23px,5.4vw,32px)] font-extrabold leading-[1.25] tracking-[-0.015em] text-[var(--color-primary)] ${variant === 'ai' && uitkomst.antwoorden ? 'mt-10' : 'mt-6'}`}>
                  {veel ? <>Veel marketingdata.<br />Geen betrouwbare uitkomst.</> : <>Van buitenaf zien we te weinig<br />voor een oordeel.</>}
                </h2>
                <p className="mt-4 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  Geen fout vastgesteld. Wel te weinig zicht voor een betrouwbaar oordeel.
                </p>

                <div className="mt-8 border-t border-[var(--color-border)] pt-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">Wat de buitenmeting vaststelde</p>
                  {veel ? (
                    <>
                      <p className="mt-3 text-[16px] leading-relaxed text-[var(--color-primary)]">
                        <mark className="bg-[#ffe86b] px-0.5">Meerdere advertentie- en meetkanalen zichtbaar.</mark>
                      </p>
                      <p className="mt-3 max-w-[54ch] text-[16px] leading-relaxed text-[var(--color-primary)]">
                        Van buitenaf kunnen we niet vaststellen of de meting klopt, welke campagnes aanvragen opleveren en waar data wegvalt.
                      </p>
                    </>
                  ) : (
                    <p className="mt-3 max-w-[54ch] text-[16px] leading-relaxed text-[var(--color-primary)]">
                      In wat de site ons liet zien stond te weinig om iets over je marketing te zeggen. Dat betekent niet dat je niets meet: veel sites laden hun meting pas na toestemming of via een eigen meetpad. Of je aanvragen goed geteld worden, zien we pas met toegang tot je eigen account.
                    </p>
                  )}
                </div>

                {/* De pitch. Groen: hier voegt Stevin waarde toe. */}
                <div className="mt-10 border-t-2 border-[var(--color-primary)] pt-6">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">Hier begint Stevin</p>
                  <p className="mt-3 max-w-[54ch] text-[16px] leading-relaxed text-[var(--color-primary)]">
                    Een losse scan laat zien wat er aan de buitenkant gebeurt. Stevin blijft daarna over je kanalen meekijken.
                  </p>
                  <p className="mt-3 max-w-[54ch] text-[16px] leading-relaxed text-[var(--color-primary)]">
                    We verbinden advertenties, meting, aanvragen en CRM. Zo zie je niet alleen wat er staat, maar ook wanneer de uitkomst afwijkt.
                  </p>
                  <p className="mt-4 text-[17px] font-semibold leading-snug text-[var(--color-primary)]">
                    <mark className="bg-[#1f9d55] px-1 text-white">Stevin kan dit doorlopend voor je bewaken.</mark>
                  </p>
                </div>

                {!wens && (
                  <div className="mt-10">
                    <p className="text-[15px] leading-relaxed text-[var(--color-muted)]">
                      Dit is waar de buitenmeting stopt. Wil je de uitgebreide scan ontvangen, of zullen we kennismaken met wat Stevin hierna voor je kan doen?
                    </p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => { setWens('gesprek'); setTimeout(() => belRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50) }}
                        className="flex-1 bg-[var(--color-primary)] px-5 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--color-primary-light)]"
                      >
                        Plan een kennismaking
                      </button>
                      <button
                        type="button"
                        onClick={() => { setWens('meting'); setTimeout(() => belRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50) }}
                        className="flex-1 border border-[var(--color-border)] px-5 py-4 text-[15px] font-semibold text-[var(--color-primary)] transition-colors hover:border-[var(--color-primary)]"
                      >
                        Stuur mij de uitgebreide scan
                      </button>
                    </div>
                  </div>
                )}
                <div ref={belRef}>{wens && contactBlok('klaar')}</div>
              </article>
            )
          })()}

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
              {/* Het contactblok zit in het artikel, na de keuze. */}
            </>
          )}
        </>
      )}
    </div>
  )
}
