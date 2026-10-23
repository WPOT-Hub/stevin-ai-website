'use client'

// W-652: invoer en uitslag van de PHP-lek-check. De meting zelf draait in
// app/api/php-check/route.ts; de regels staan in lib/php-check.ts.
import { useState } from 'react'
import type { PhpUitslag } from '@/lib/php-check'

type Toon = 'goed' | 'actie' | 'neutraal'

function uitleg(u: PhpUitslag): { toon: Toon; kop: string; tekst: string } {
  const v = u.versie
  switch (u.oordeel) {
    case 'gepatcht':
      return {
        toon: 'goed',
        kop: `Je server meldt PHP ${v}: de versie met de update.`,
        tekst:
          'Dat is goed nieuws. Let wel: een update dicht het lek, maar haalt geen inbraak weg die er al was. Twijfel je, laat je bouwer dan nakijken of er sinds 21 oktober iets op je server is veranderd.',
      }
    case 'niet_gepatcht':
      return {
        toon: 'actie',
        kop: `Je server meldt PHP ${v}. De update zit pas in ${u.patchversie}.`,
        tekst:
          'Vraag je hoster of bouwer of de update erop staat. Soms bouwt een hoster de reparatie in zonder dat het versienummer verandert, maar dat moet je dan wel van hem horen.',
      }
    case 'geen_release':
      return {
        toon: 'actie',
        kop: `Je server meldt PHP ${v}. Voor die versie brengt PHP geen nieuwe release meer uit.`,
        tekst:
          'Ook niet tegen dit lek. Er bestaan losse reparaties, maar de echte oplossing is overstappen naar een nieuwere PHP-versie, of naar een site die helemaal geen PHP nodig heeft.',
      }
    case 'versie_verborgen':
      return {
        toon: 'neutraal',
        kop: u.platform ? `Je site draait op ${u.platform}, en dus op PHP.` : 'Je site draait op PHP.',
        tekst:
          'Je server laat de versie niet zien, en dat is op zich netjes. Vraag je hoster welke PHP-versie erop draait en of de update van 21 oktober erop staat.',
      }
    case 'geen_php':
      return {
        toon: 'goed',
        kop: `We zien geen PHP. Je site draait op ${u.platform}.`,
        tekst: 'Dan ligt dit lek bij het platform, niet bij jou. Die werken zulke updates zelf bij.',
      }
    case 'onbereikbaar':
      return {
        toon: 'neutraal',
        kop: 'We kregen geen goed antwoord van je site.',
        tekst:
          'De site reageerde niet of gaf een foutmelding. Mogelijk heeft je hoster hem uit voorzorg offline gehaald. Kijk zelf of je site het doet, en vraag je hoster wat er speelt.',
      }
    default:
      return {
        toon: 'neutraal',
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
          className="flex-1 rounded-lg border border-border bg-white px-4 py-3.5 text-[16px] text-primary outline-none focus:border-[#3D8EFF]"
        />
        <button
          type="submit"
          disabled={bezig}
          className="inline-flex items-center justify-center bg-[#3D8EFF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg disabled:opacity-60"
        >
          {bezig ? 'Bezig met checken' : 'Check mijn website'}
        </button>
      </form>

      <div aria-live="polite">
        {fout && <p className="mt-4 text-[#d23f57]">{fout}</p>}
        {uitslag && u && (
          <div className={`mt-6 rounded-[14px] border-2 ${rand} bg-white p-7`}>
            <p className="text-sm text-muted mb-2">{uitslag.domein}</p>
            <h3 className="font-display font-bold text-primary text-xl mb-3">{u.kop}</h3>
            <p className="text-muted leading-relaxed">{u.tekst}</p>
            <p className="text-xs text-muted/80 mt-5">
              Gemeten van buitenaf op {new Date(uitslag.gemetenOp).toLocaleString('nl-NL')}, op basis van wat je server
              zelf meldt. Er is niets op je site getest of veranderd.
            </p>
            {(u.toon !== 'goed') && (
              <a
                href="#aanbod"
                className="inline-flex mt-6 items-center gap-2 bg-[#3D8EFF] text-[#0A1628] font-display font-bold text-[15px] px-6 py-3 rounded-lg"
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
