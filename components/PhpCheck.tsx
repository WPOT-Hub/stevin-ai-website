'use client'

// W-652: invoer en uitslag van de PHP-lekcheck. De meting zelf draait in
// app/api/php-check/route.ts; de regels staan in lib/php-check.ts.
import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import type { PhpUitslag } from '@/lib/php-check'

type Toon = 'goed' | 'actie' | 'neutraal'

const REDEN: Record<string, string> = {
  dns: 'We vonden geen adres voor deze naam. Klopt de spelling?',
  te_traag: 'Je site antwoordde niet binnen negen seconden.',
  geen_verbinding: 'We kregen geen verbinding met je site.',
  te_veel_omleidingen: 'Je site stuurde ons te vaak door naar een ander adres.',
  serverfout: 'Je site gaf een foutmelding van de server.',
  ongeldig_adres: 'Je site stuurde ons door naar een ongeldig adres.',
}

function uitleg(u: PhpUitslag): { toon: Toon; kop: string; tekst: string; php: boolean } {
  const v = u.versie
  switch (u.oordeel) {
    case 'gepatcht':
      return {
        toon: 'goed',
        php: true,
        kop: `Je server meldt PHP ${v}: de versie met de update van 21 oktober.`,
        tekst:
          'Dat is goed nieuws. Twee dingen nog. Op 23 oktober meldde PHP een derde lek dat ook in deze versie zit, al werkt het alleen bij een ongebruikelijke instelling; vraag je hoster om session.upload_progress.enabled op 0 te zetten tot de volgende release. En een update haalt geen inbraak weg die er al was.',
      }
    case 'niet_gepatcht':
      return {
        toon: 'actie',
        php: true,
        kop: `Je server meldt PHP ${v}. De update zit pas in ${u.patchversie}.`,
        tekst:
          'Vraag je hoster of bouwer of de update erop staat. Soms bouwt een hoster de reparatie in zonder dat het versienummer verandert, maar dat moet je dan wel van hem horen. Vraag ook of session.upload_progress.enabled op 0 staat, vanwege het lek van 23 oktober.',
      }
    case 'geen_release':
      return {
        toon: 'actie',
        php: true,
        kop: `Je server meldt PHP ${v}. Voor die versie brengt PHP geen nieuwe release meer uit.`,
        tekst:
          'Ook niet tegen dit lek. Er bestaan losse reparaties, maar de echte oplossing is overstappen naar een nieuwere PHP-versie, of naar een site die helemaal geen PHP nodig heeft.',
      }
    case 'versie_verborgen':
      if (u.distributie)
        return {
          toon: 'neutraal',
          php: true,
          kop: `Je server meldt PHP ${v}, een versie van je Linux-distributie.`,
          tekst:
            'Zulke versies krijgen de reparatie vaak zonder hoger versienummer. Vraag je hoster of de beveiligingsupdate van 21 oktober erop staat, en of session.upload_progress.enabled op 0 staat.',
        }
      return {
        toon: 'neutraal',
        php: true,
        kop: u.platform ? `We zien kenmerken van ${u.platform}, en dus van PHP.` : 'We zien kenmerken van PHP.',
        tekst:
          'Je server laat het versienummer niet zien. Vraag je hoster welke PHP-versie erop draait, of de update van 21 oktober erop staat en of session.upload_progress.enabled op 0 staat.',
      }
    case 'geen_php':
      return {
        toon: 'goed',
        php: false,
        kop: `We zien geen PHP. Je site draait op ${u.platform}.`,
        tekst:
          'Dat platform draait geen PHP-server voor je site. Heb je daarnaast een eigen server, bijvoorbeeld voor een blog of een webshop, laat die dan wel nakijken.',
      }
    case 'geblokkeerd':
      return {
        toon: 'neutraal',
        php: false,
        kop: 'Je site liet onze check niet binnen.',
        tekst: `We kregen status ${u.status} terug, vaak van een beveiligingsfilter. Daardoor kunnen we niets zeggen over PHP. Vraag het je hoster of bouwer.`,
      }
    case 'onbereikbaar':
      return {
        toon: 'neutraal',
        php: false,
        kop: 'We kregen geen goed antwoord van je site.',
        tekst: `${REDEN[u.reden || ''] || ''} Dat kan aan je site liggen, maar ook aan onze check. Kijk zelf of je site het doet, en vraag het anders je hoster.`.trim(),
      }
    default:
      return {
        toon: 'neutraal',
        php: false,
        kop: 'We zien geen PHP-versie en geen bekend platform.',
        tekst:
          'Dat betekent niet dat er geen PHP draait. Veel servers houden dat voor zich. Vraag het voor de zekerheid even na bij je hoster of bouwer.',
      }
  }
}

const FOUTEN: Record<string, string> = {
  ongeldig_domein: 'Dat lijkt geen websiteadres. Vul iets in als jouwbedrijf.nl.',
  geweigerd: 'Dit adres kunnen we niet controleren.',
  te_vaak: 'Je hebt de check nu vaak gebruikt. Probeer het over een paar minuten opnieuw.',
}

export default function PhpCheck() {
  const [domein, setDomein] = useState('')
  const [bezig, setBezig] = useState(false)
  const [uitslag, setUitslag] = useState<PhpUitslag | null>(null)
  const [fout, setFout] = useState<string | null>(null)

  async function check(e: React.FormEvent) {
    e.preventDefault()
    if (!domein.trim() || bezig) return
    setBezig(true)
    setFout(null)
    setUitslag(null)
    try {
      const res = await fetch('/api/php-check', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ domein }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.fout) setFout(FOUTEN[data?.fout] || 'De check lukte niet. Probeer het zo nog eens.')
      else setUitslag(data as PhpUitslag)
    } catch {
      setFout('De check lukte niet. Probeer het zo nog eens.')
    } finally {
      setBezig(false)
    }
  }

  const u = uitslag ? uitleg(uitslag) : null
  const rand = u?.toon === 'actie' ? 'border-[#d23f57]' : u?.toon === 'goed' ? 'border-[#1f9d55]' : 'border-border'

  return (
    <div>
      <form onSubmit={check} className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="php-domein" className="sr-only">
          Je websiteadres
        </label>
        <input
          id="php-domein"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="jouwbedrijf.nl"
          value={domein}
          onChange={(e) => setDomein(e.target.value)}
          className="flex-1 rounded-lg border border-border bg-white px-4 py-3.5 text-[16px] text-primary outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={bezig}
          className="inline-flex items-center justify-center bg-accent text-white font-display font-bold text-[15px] px-7 py-3.5 rounded-lg transition-[filter] hover:brightness-110 disabled:opacity-60"
        >
          {bezig ? 'Bezig met checken' : 'Check mijn website'}
        </button>
      </form>

      <div aria-live="polite">
        {fout && <p className="mt-4 text-[#d23f57]">{fout}</p>}
        {uitslag && u && (
          <div className={`mt-6 rounded-[14px] border-2 ${rand} bg-white p-7`}>
            <p className="text-sm text-muted mb-2">
              {uitslag.domein}
              {uitslag.eindhost ? `, doorgestuurd naar ${uitslag.eindhost}` : ''}
            </p>
            <h3 className="font-display font-bold text-primary text-xl mb-3">{u.kop}</h3>
            <p className="text-muted leading-relaxed">{u.tekst}</p>
            <p className="text-xs text-muted/80 mt-5">
              Gemeten van buitenaf op {new Date(uitslag.gemetenOp).toLocaleString('nl-NL')}, op basis van wat je server
              zelf meldt. We hebben niets aangevallen of veranderd.
            </p>
            {u.php && (
              <p className="mt-4 text-sm">
                <Link href="/blog/derde-php-lek-controleer-je-website" className="font-semibold text-primary underline decoration-accent underline-offset-4">
                  Lees wat er sinds 21 oktober speelt
                </Link>
              </p>
            )}
            {u.php && u.toon !== 'goed' && (
              <a
                href="#aanbod"
                className="inline-flex mt-6 items-center gap-2 bg-accent text-white font-display font-bold text-[15px] px-6 py-3 rounded-lg transition-[filter] hover:brightness-110"
              >
                Liever een site zonder PHP?
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
