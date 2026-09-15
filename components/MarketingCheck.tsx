'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ExternalLink, Globe } from 'lucide-react'

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
  categorie: string
  ernst: 'issue' | 'opportunity' | 'observation'
  zekerheid: number
  soort_uitspraak: 'observed' | 'absent_in_html' | 'unknown'
  titel: string
  tekst: string
  bewijs: string[]
  vervolgstap: string
  fase: 'a' | 'b'
  /** De vraag van de ondernemer die deze bevinding beantwoordt. Vervangt de ernst-label. */
  ondernemersvraag: string | null
  /** Openbare bron om dit zelf na te kijken. Wordt een link, nooit een kale regel. */
  bron_url: string | null
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
          naam: cNaam, email: cEmail, telefoon: cTel, bericht: cBericht,
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
                    Dank, we hebben je gegevens
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">
                    We nemen contact met je op om dit samen door te lopen. Wil je niet wachten, plan dan zelf een moment.
                  </p>
                  <button
                    onClick={naarGesprek}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 text-[15px] font-semibold text-[var(--color-primary)] transition-colors hover:border-[var(--color-accent)]"
                  >
                    Plan een kennismaking van twintig minuten
                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <form onSubmit={stuurContact} className="mt-8 rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-7">
                  <h2 className="font-display text-[clamp(20px,4.5vw,24px)] font-extrabold leading-[1.15] text-[var(--color-primary)]">
                    {variant === 'wachten' ? 'Wil je de uitkomst besproken hebben?' : 'Zullen we dit samen nakijken?'}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">
                    {variant === 'wachten'
                      ? 'De agent is nog bezig. Laat alvast je nummer achter, dan bellen we je met wat hij vond en lopen we het samen door.'
                      : 'Deze check kijkt van buitenaf. Wat er in je advertentie- en meetaccounts gebeurt, zien we hier niet. Laat je nummer achter, dan bellen we je en lopen we het samen door.'}
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <input
                      value={cNaam} onChange={(e) => setCNaam(e.target.value)}
                      placeholder="Je naam" autoComplete="name" required
                      className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3.5 text-[16px] text-[var(--color-primary)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
                    />
                    <input
                      value={cTel} onChange={(e) => setCTel(e.target.value)}
                      placeholder="Telefoonnummer" type="tel" autoComplete="tel"
                      className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3.5 text-[16px] text-[var(--color-primary)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
                    />
                  </div>
                  <input
                    value={cEmail} onChange={(e) => setCEmail(e.target.value)}
                    placeholder="Mailadres" type="email" autoComplete="email" required
                    className="mt-3 w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3.5 text-[16px] text-[var(--color-primary)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
                  />
                  <textarea
                    value={cBericht} onChange={(e) => setCBericht(e.target.value)}
                    placeholder="Iets wat we moeten weten? (niet verplicht)" rows={2}
                    className="mt-3 w-full resize-none rounded-xl border border-[var(--color-border)] bg-white px-4 py-3.5 text-[16px] text-[var(--color-primary)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
                  />
                  {cFout && <p className="mt-3 text-[14px] text-[var(--color-pink)]">{cFout}</p>}
                  <button
                    type="submit" disabled={cStatus === 'bezig'}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-4 text-[17px] font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-60"
                  >
                    {cStatus === 'bezig' ? 'Een moment' : 'Bel me hierover'}
                    {cStatus !== 'bezig' && <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />}
                  </button>
                  <p className="mt-3 text-center text-[13px] leading-relaxed text-[var(--color-muted)]">
                    We gebruiken je gegevens alleen om over deze scan contact met je op te nemen.{' '}
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

          {/* Alle bevindingen, niet alleen de kop. De eerste krijgt het accent en
              het label uit de verdieping; de rest staat er in dezelfde vorm
              onder, zodat je in een oogopslag ziet hoeveel er ligt. */}
          {lijst.map((f, i) => (
            <div key={f.code} className={`overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_1px_2px_rgba(10,22,40,0.04),0_8px_24px_-12px_rgba(10,22,40,0.12)] ${i > 0 ? 'mt-4' : ''}`}>
              <div className={`border-l-4 p-5 sm:p-7 ${i === 0 ? 'border-[var(--color-accent)]' : 'border-[var(--color-border)]'}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  {/* Zijn vraag boven onze bevinding. "Hier valt winst te halen" suggereerde
                      een gevonden fout, ook waar we alleen een controlepunt hebben. */}
                  <p className={`text-[12px] font-bold uppercase tracking-[0.08em] ${i === 0 ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'}`}>
                    {f.ondernemersvraag || (f.ernst === 'issue' ? 'Dit valt op' : 'Dit zagen we')}
                  </p>
                  {i === 0 && uitVerdieping && (
                    <span className="rounded-full bg-[var(--color-surface-alt)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--color-muted)]">
                      Uit de verdieping
                    </span>
                  )}
                </div>
                <h2 className="mt-3 font-display text-[clamp(22px,5vw,28px)] font-extrabold leading-[1.15] tracking-[-0.01em] text-[var(--color-primary)]">
                  {f.titel}
                </h2>
                <p className="mt-3 text-[16px] leading-relaxed text-[var(--color-muted)]">{f.tekst}</p>

                {/* Geen "wat we zagen"-lijst meer. Koen, 15 sep 02:00: bij alle drie de
                    bevindingen herhaalde die lijst letterlijk de zin erboven, en bij zijn
                    eigen contactroutes vertelde hij een ondernemer wat hij zelf op zijn
                    site heeft gezet. Dat leest als een tagscanner, niet als iemand die
                    iets doorheeft. De feiten staan in de tekst; wie het wil narekenen
                    krijgt de bron. Het bewijs blijft in de database, voor onze briefing. */}
                {f.bron_url && (
                  <a
                    href={f.bron_url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-[14px] font-semibold text-[var(--color-primary)] transition-colors hover:border-[var(--color-accent)]"
                  >
                    Kijk het zelf na bij de bron
                    <ExternalLink className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  </a>
                )}

                {f.vervolgstap && (
                  <div className="mt-5 rounded-xl bg-[var(--color-surface)] p-4 sm:p-5">
                    <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                      Wat je zelf kunt doen
                    </p>
                    <p className="mt-2 flex items-start gap-2.5 text-[15px] leading-relaxed text-[var(--color-primary)]">
                      <ArrowRight className="mt-[3px] h-4 w-4 flex-shrink-0 text-[var(--color-accent)]" strokeWidth={2.5} aria-hidden="true" />
                      <span>{f.vervolgstap}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}

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
              {contactBlok('klaar')}
            </>
          )}
        </>
      )}
    </div>
  )
}
