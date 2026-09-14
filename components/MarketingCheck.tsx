'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, ExternalLink, Globe } from 'lucide-react'

const HUB = 'https://hub.stevin.ai/api/marketing-check'
const CAL = 'https://cal.com/koen-hoogenboom/kennismaking'
/** De Stevin-hartslag. Bestaand asset uit brand/, nooit nagetekend. */
const HEARTBEAT = '/logos/stevin-heartbeat.gif'

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
  meetprobleem: string | null
  bevinding: Bevinding | null
  geen_bevinding_tekst: string | null
  ook_gezien: string[]
}

/**
 * De stappen zijn gekoppeld aan wat er echt gebeurt, niet aan een timer.
 * We schuiven pas door als de vorige stap aantoonbaar klaar is; de laatste
 * stap blijft staan tot het antwoord er is.
 */
const STAPPEN = ['Website opzoeken', 'Pagina ophalen', 'Marketingtechniek herkennen', 'Bevinding kiezen']

/**
 * Wachttijd tijdens de verdieping: pollen met oplopende tussenpozen, in
 * totaal zo'n twee en een halve minuut. Daarna laten we het scherm zoals het
 * is; de uitkomst staat dan wel in de database maar niet meer op dit scherm.
 */
const POLL_SECONDEN = [4, 4, 6, 6, 8, 10, 10, 15, 15, 20, 20, 20, 20]

/**
 * Wat er te lezen valt terwijl de verdieping loopt. Het motto staat op onze
 * eigen /simon-stevin-pagina; de andere regels komen uit de Dialectike ofte
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

export default function MarketingCheck() {
  const [domein, setDomein] = useState('')
  const [bezig, setBezig] = useState(false)
  const [stap, setStap] = useState(0)
  const [uitkomst, setUitkomst] = useState<Uitkomst | null>(null)
  const [fout, setFout] = useState<string | null>(null)
  const [kaart, setKaart] = useState(0)
  const params = useRef<{ p: string | null; s: string | null }>({ p: null, s: null })
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    params.current = { p: q.get('p'), s: q.get('s') }
    return () => {
      if (pollTimer.current) clearTimeout(pollTimer.current)
    }
  }, [])

  const verdiepingLoopt = uitkomst?.verdieping === 'running' || uitkomst?.deep_scan === 'queued'

  // De Stevin-kaarten wisselen alleen zolang er echt gewacht wordt.
  useEffect(() => {
    if (!verdiepingLoopt) return
    const t = setInterval(() => setKaart((k) => (k + 1) % STEVIN_KAARTEN.length), 8000)
    return () => clearInterval(t)
  }, [verdiepingLoopt])

  // De verdieping en fase B draaien na het eerste antwoord door. We halen het
  // resultaat op tot ze klaar zijn of tot de tussenpozen op zijn.
  function pollVoorVerdieping(token: string, poging = 0) {
    if (poging >= POLL_SECONDEN.length) return
    pollTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`${HUB}/result/${token}`)
        if (res.ok) {
          const data = (await res.json()) as Uitkomst & { ok: boolean }
          if (data?.ok) {
            setUitkomst(data)
            const klaar =
              data.verdieping !== 'running' && data.deep_scan !== 'queued' && data.deep_scan !== 'running'
            if (klaar) return
          }
        }
      } catch {
        /* verdieping is optioneel, een mislukte poll mag niets breken */
      }
      pollVoorVerdieping(token, poging + 1)
    }, POLL_SECONDEN[poging] * 1000)
  }

  async function start(e: React.FormEvent) {
    e.preventDefault()
    if (bezig || !domein.trim()) return
    setBezig(true)
    setFout(null)
    setUitkomst(null)
    setStap(1)

    // De stappen lopen mee zolang het verzoek loopt, maar blijven hangen op de
    // laatste tot er echt een antwoord is. Geen nep-voortgang die doorloopt.
    const tik = setInterval(() => setStap((s) => (s < STAPPEN.length ? s + 1 : s)), 900)

    try {
      const res = await fetch(HUB, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: domein.trim(),
          placement_slug: params.current.p,
          session_token: params.current.s,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data?.ok) {
        setFout(data?.error || 'Er ging iets mis. Probeer het zo nog eens.')
        return
      }
      setUitkomst(data)
      if (data.verdieping === 'running' || data.deep_scan === 'queued') pollVoorVerdieping(data.token)

      fetch(`${HUB}/result/${data.token}/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'finding_viewed', session_token: params.current.s }),
      }).catch(() => undefined)
    } catch {
      setFout('We konden de scan niet starten. Controleer je verbinding en probeer het nog eens.')
    } finally {
      clearInterval(tik)
      setStap(STAPPEN.length)
      setBezig(false)
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
      fetch(`${HUB}/result/${uitkomst.token}/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'meeting_clicked', session_token: params.current.s }),
        keepalive: true,
      }).catch(() => undefined)
    }
    window.location.href = `${CAL}?${q.toString()}`
  }

  const b = uitkomst?.bevinding
  const uitVerdieping = uitkomst?.bevinding_bron === 'verdieping'

  return (
    <div className="mx-auto w-full max-w-[680px] px-5 py-10 sm:py-16">
      {!uitkomst && (
        <>
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">Marketing Check</p>
          <h1 className="mt-3 font-display text-[clamp(30px,7vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-[var(--color-primary)]">
            Laat een Stevin Agent je marketing checken
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-[var(--color-muted)]">
            Vul je bedrijfswebsite in en je ziet wat wij van buitenaf kunnen zien.
            Geen naam, geen e-mailadres.
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
                disabled={bezig}
                className="w-full rounded-xl border border-[var(--color-border)] bg-white py-4 pl-12 pr-4 text-[17px] text-[var(--color-primary)] outline-none transition-colors focus:border-[var(--color-accent)] disabled:opacity-60"
              />
            </div>
            <button
              type="submit"
              disabled={bezig || !domein.trim()}
              className="mt-3 w-full rounded-xl bg-[var(--color-accent)] px-5 py-4 text-[17px] font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50"
            >
              {bezig ? 'Bezig met checken' : 'Check mijn marketing'}
            </button>
          </form>

          {bezig && (
            <div className="mt-8 flex items-start gap-5 rounded-2xl border border-[var(--color-border)] bg-white p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HEARTBEAT} alt="" width={56} height={56} className="h-14 w-14 flex-shrink-0" aria-hidden="true" />
              <ol className="space-y-2 pt-1">
                {STAPPEN.map((s, i) => (
                  <li
                    key={s}
                    className={`flex items-center gap-3 text-[15px] ${i < stap ? 'text-[var(--color-primary)]' : 'text-[var(--color-muted)] opacity-50'}`}
                  >
                    <span
                      className={`inline-block h-2 w-2 flex-shrink-0 rounded-full ${i < stap ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'}`}
                      aria-hidden="true"
                    />
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {fout && (
            <p className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-3 text-[15px] text-[var(--color-primary)]">
              {fout}
            </p>
          )}
        </>
      )}

      {uitkomst && (
        <>
          <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[var(--color-muted)]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-3 py-1 font-semibold text-[var(--color-primary)]">
              <Globe className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              {domein.trim().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '')}
            </span>
            <span>Van buitenaf bekeken op {datumVandaag()}</span>
          </div>

          {uitkomst.meetprobleem && (
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7">
              <h2 className="font-display text-[20px] font-bold text-[var(--color-primary)]">
                We konden deze site niet doorlichten
              </h2>
              <p className="mt-2 text-[16px] leading-relaxed text-[var(--color-muted)]">{uitkomst.meetprobleem}</p>
            </div>
          )}

          {b && (
            <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_1px_2px_rgba(10,22,40,0.04),0_8px_24px_-12px_rgba(10,22,40,0.12)]">
              <div className="border-l-4 border-[var(--color-accent)] p-5 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  {/* Zijn vraag boven onze bevinding. "Hier valt winst te halen" suggereerde
                      een gevonden fout, ook waar we alleen een controlepunt hebben. */}
                  <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-accent)]">
                    {b.ondernemersvraag || (b.ernst === 'issue' ? 'Dit valt op' : 'Dit zagen we')}
                  </p>
                  {uitVerdieping && (
                    <span className="rounded-full bg-[var(--color-surface-alt)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--color-muted)]">
                      Bijgewerkt na de verdieping
                    </span>
                  )}
                </div>
                <h2 className="mt-3 font-display text-[clamp(22px,5vw,28px)] font-extrabold leading-[1.15] tracking-[-0.01em] text-[var(--color-primary)]">
                  {b.titel}
                </h2>
                <p className="mt-3 text-[16px] leading-relaxed text-[var(--color-muted)]">{b.tekst}</p>

                {b.bewijs.length > 0 && (
                  <div className="mt-5 border-t border-[var(--color-border)] pt-5">
                    <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-muted)]">Wat we zagen</p>
                    <ul className="mt-2 space-y-2">
                      {b.bewijs.map((e) => (
                        <li key={e} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[var(--color-primary)]">
                          <Check className="mt-[3px] h-4 w-4 flex-shrink-0 text-[var(--color-accent)]" strokeWidth={2.5} aria-hidden="true" />
                          <span>{e}</span>
                        </li>
                      ))}
                    </ul>
                    {/* Koen, 14 sep: "klanten weten toch niet waar ze moeten zoeken." Dus
                        geen verwijzing naar een register, maar een link die er meteen staat. */}
                    {b.bron_url && (
                      <a
                        href={b.bron_url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-[14px] font-semibold text-[var(--color-primary)] transition-colors hover:border-[var(--color-accent)]"
                      >
                        Kijk het zelf na bij de bron
                        <ExternalLink className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}

                {b.vervolgstap && (
                  <div className="mt-5 rounded-xl bg-[var(--color-surface)] p-4 sm:p-5">
                    <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                      Wat je zelf kunt doen
                    </p>
                    <p className="mt-2 flex items-start gap-2.5 text-[15px] leading-relaxed text-[var(--color-primary)]">
                      <ArrowRight className="mt-[3px] h-4 w-4 flex-shrink-0 text-[var(--color-accent)]" strokeWidth={2.5} aria-hidden="true" />
                      <span>{b.vervolgstap}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

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

          {verdiepingLoopt && (
            <div className="mt-5 rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-6">
              <div className="flex items-start gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={HEARTBEAT} alt="" width={48} height={48} className="h-12 w-12 flex-shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-[var(--color-primary)]" aria-live="polite">
                    We lezen nu je site verder en zoeken je advertenties op.
                  </p>
                  <p className="mt-1 text-[14px] leading-relaxed text-[var(--color-muted)]">
                    Dit duurt tot een minuut. Vinden we iets dat er meer toe doet dan wat hierboven staat, dan wisselt de bevinding vanzelf.
                  </p>
                </div>
              </div>
              <div key={kaart} className="mt-5 border-t border-[var(--color-border)] pt-5 animate-[fadein_600ms_ease-out]">
                <p className="font-display text-[16px] font-bold leading-snug text-[var(--color-primary)]">
                  &ldquo;{STEVIN_KAARTEN[kaart].kop}&rdquo;
                </p>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                  {STEVIN_KAARTEN[kaart].bron}
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-muted)]">{STEVIN_KAARTEN[kaart].brug}</p>
              </div>
              <style jsx>{`
                @keyframes fadein {
                  from { opacity: 0; transform: translateY(4px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>
            </div>
          )}

          {!verdiepingLoopt && uitkomst.verdieping === 'done' && !uitVerdieping && b && (
            <p className="mt-4 text-[13px] text-[var(--color-muted)]">
              De verdieping vond geen sterkere aanleiding dan wat hier staat.
            </p>
          )}
          {!verdiepingLoopt && uitkomst.verdieping === 'failed' && (
            <p className="mt-4 text-[13px] text-[var(--color-muted)]">
              De verdieping is niet gelukt. Wat hier staat komt uit de eerste scan.
            </p>
          )}

          {uitkomst.ook_gezien.length > 0 && (
            <div className="mt-6">
              <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-muted)]">Dit zagen we ook</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {uitkomst.ook_gezien.map((n) => (
                  <span
                    key={n}
                    className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-[13px] text-[var(--color-muted)]"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={naarGesprek}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-4 text-[17px] font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)]"
          >
            Plan een kennismaking van twintig minuten
            <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
          </button>
          <p className="mt-3 text-center text-[13px] leading-relaxed text-[var(--color-muted)]">
            Deze check kijkt van buitenaf; we hebben nog niet onder de motorkap kunnen kijken.
            We lopen samen door wat hier staat, en daarna kunnen we dieper in je situatie duiken.
          </p>
        </>
      )}
    </div>
  )
}
