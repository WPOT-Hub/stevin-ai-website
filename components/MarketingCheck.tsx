'use client'

import { useEffect, useRef, useState } from 'react'

const HUB = 'https://hub.stevin.ai/api/marketing-check'
const CAL = 'https://cal.com/koen-hoogenboom/kennismaking'

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
}

interface Uitkomst {
  token: string
  status: string
  deep_scan: string
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

export default function MarketingCheck() {
  const [domein, setDomein] = useState('')
  const [bezig, setBezig] = useState(false)
  const [stap, setStap] = useState(0)
  const [uitkomst, setUitkomst] = useState<Uitkomst | null>(null)
  const [fout, setFout] = useState<string | null>(null)
  const params = useRef<{ p: string | null; s: string | null }>({ p: null, s: null })
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    params.current = { p: q.get('p'), s: q.get('s') }
    return () => {
      if (pollTimer.current) clearTimeout(pollTimer.current)
    }
  }, [])

  // Fase B draait op een aparte machine en is later klaar dan de bezoeker.
  // We halen het resultaat een paar keer op; blijft het uit, dan verandert er
  // gewoon niets aan het scherm.
  function pollVoorVerdieping(token: string, pogingen = 0) {
    if (pogingen > 8) return
    pollTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`${HUB}/result/${token}`)
        if (res.ok) {
          const data = await res.json()
          if (data?.ok) {
            setUitkomst(data)
            if (data.deep_scan === 'done' || data.deep_scan === 'failed') return
          }
        }
      } catch {
        /* verdieping is optioneel, een mislukte poll mag niets breken */
      }
      pollVoorVerdieping(token, pogingen + 1)
    }, 5000)
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
      if (data.deep_scan === 'queued') pollVoorVerdieping(data.token)

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

  return (
    <div className="mx-auto w-full max-w-[680px] px-5 py-10 sm:py-16">
      {!uitkomst && (
        <>
          <h1 className="font-display text-[clamp(30px,7vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-[var(--color-primary)]">
            Laat een Stevin Agent je marketing checken
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-[var(--color-muted)]">
            Vul je bedrijfswebsite in. Binnen een paar seconden zie je wat wij zien.
            Geen naam, geen e-mailadres.
          </p>

          <form onSubmit={start} className="mt-8">
            <label htmlFor="domein" className="block text-[14px] font-semibold text-[var(--color-primary)]">
              Je bedrijfswebsite
            </label>
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
              className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-4 text-[17px] text-[var(--color-primary)] outline-none focus:border-[var(--color-accent)] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={bezig || !domein.trim()}
              className="mt-3 w-full rounded-xl bg-[var(--color-accent)] px-5 py-4 text-[17px] font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50"
            >
              {bezig ? 'Bezig met checken' : 'Check mijn marketing'}
            </button>
          </form>

          {bezig && (
            <ol className="mt-8 space-y-2">
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
          {uitkomst.meetprobleem && (
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <h2 className="font-display text-[20px] font-bold text-[var(--color-primary)]">
                We konden deze site niet doorlichten
              </h2>
              <p className="mt-2 text-[16px] leading-relaxed text-[var(--color-muted)]">{uitkomst.meetprobleem}</p>
            </div>
          )}

          {b && (
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-7">
              <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-accent)]">
                {b.ernst === 'issue' ? 'Dit valt op' : b.ernst === 'opportunity' ? 'Hier valt winst te halen' : 'Dit zagen we'}
              </p>
              <h2 className="mt-3 font-display text-[clamp(22px,5vw,28px)] font-extrabold leading-[1.15] tracking-[-0.01em] text-[var(--color-primary)]">
                {b.titel}
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-[var(--color-muted)]">{b.tekst}</p>

              {b.bewijs.length > 0 && (
                <ul className="mt-5 space-y-1.5 border-t border-[var(--color-border)] pt-5">
                  {b.bewijs.map((e) => (
                    <li key={e} className="text-[14px] leading-relaxed text-[var(--color-muted)]">
                      {e}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {!b && !uitkomst.meetprobleem && uitkomst.geen_bevinding_tekst && (
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-7">
              <h2 className="font-display text-[clamp(22px,5vw,28px)] font-extrabold leading-[1.15] text-[var(--color-primary)]">
                Niets geks gevonden
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-[var(--color-muted)]">
                {uitkomst.geen_bevinding_tekst}
              </p>
            </div>
          )}

          {uitkomst.ook_gezien.length > 0 && (
            <div className="mt-5">
              <p className="text-[13px] font-semibold text-[var(--color-primary)]">Dit zagen we ook</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {uitkomst.ook_gezien.map((n) => (
                  <span
                    key={n}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-[13px] text-[var(--color-muted)]"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          )}

          {uitkomst.deep_scan === 'queued' && (
            <p className="mt-5 text-[14px] text-[var(--color-muted)]">
              We kijken op de achtergrond nog mee met het echte verkeer op je site. Blijf even hangen, dan vullen we dit aan.
            </p>
          )}

          <button
            onClick={naarGesprek}
            className="mt-8 w-full rounded-xl bg-[var(--color-accent)] px-5 py-4 text-[17px] font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)]"
          >
            Plan een vrijblijvend gesprek
          </button>
          <p className="mt-3 text-center text-[13px] text-[var(--color-muted)]">
            Twintig minuten, we lopen samen door wat hier staat.
          </p>
        </>
      )}
    </div>
  )
}
