'use client'

/**
 * Stap-voor-stap-animatie van een whois-opzoeking, nagebouwd in eigen opmaak.
 *
 * Bewust geen schermopname: een GIF weegt zwaar, is korrelig op een telefoon,
 * kleurt niet mee in donkere modus en verandert niet mee als SIDN of ICANN hun
 * site verft. Deze versie is scherp op elk scherm, weegt niets en laat precies
 * het veld oplichten waar het om gaat.
 *
 * De schermen zijn nagetekend naar echte opzoekingen op 10 september 2026:
 * nu.nl via sidn.nl/whois en apple.com via lookup.icann.org.
 */

import { useCallback, useEffect, useRef, useState } from 'react'

type Stap = { bij: React.ReactNode; scherm: React.ReactNode }
type Set = { url: string; zoekterm: string; les: React.ReactNode; stappen: Stap[] }

const Rij = ({ k, v, licht }: { k: string; v: React.ReactNode; licht?: boolean }) => (
  <tr className={licht ? 'dca-licht' : undefined}>
    <td className="dca-k">{k}</td>
    <td className="dca-v">{v}</td>
  </tr>
)

const SETS: Record<'nl' | 'com', Set> = {
  nl: {
    url: 'sidn.nl/whois',
    zoekterm: 'nu.nl',
    les: (
      <>
        <b>Kijk bij Houder.</b> Staat daar je eigen bedrijfsnaam, dan zijn de eigendomspapieren van jou.
        Staat er een ander, dan niet. Bij nu.nl klopt het: de houder en het beheercontact horen allebei
        bij het bedrijf zelf.
      </>
    ),
    stappen: [
      {
        bij: 'Typ je eigen domein in het zoekveld.',
        scherm: <div className="dca-zoek"><div className="dca-veld"><span className="dca-typ" /><span className="dca-caret" /></div><span className="dca-knop">Zoeken</span></div>,
      },
      {
        bij: <>Al geregistreerd, logisch. Klik op <b>toon mij de gegevens</b>.</>,
        scherm: (
          <div className="dca-melding">
            <p className="dca-dom"><b>nu.nl</b> is al geregistreerd</p>
            <p className="dca-sub">Kies een alternatieve domeinnaam</p>
            <span className="dca-knop dca-spook">Toon mij de gegevens.</span>
          </div>
        ),
      },
      {
        bij: 'Deze stap komt altijd. Zonder dat vinkje krijg je niets te zien.',
        scherm: (
          <div className="dca-modal">
            <div className="dca-modalkop">Nog een ding.</div>
            <div className="dca-modallijf">
              <p>Ga akkoord met onze voorwaarden om de domeinnaamgegevens te tonen.</p>
              <span className="dca-vink"><span className="dca-vak" /> Ik ga akkoord met de voorwaarden</span>
              <span className="dca-knop">Toon gegevens</span>
            </div>
          </div>
        ),
      },
      {
        bij: <>De regel die telt is <b>Houder</b>. De rest is bijzaak.</>,
        scherm: (
          <table className="dca-tabel">
            <tbody>
              <Rij k="Domeinnaam" v="nu.nl" />
              <Rij k="Status" v="actief" />
              <Rij k="Houder" v="DPG Media Group nv" licht />
              <Rij k="Administratief contactpersoon" v="dns@dpgmedia.be" />
              <Rij k="Registrar" v="Registrar.eu, Rotterdam" />
            </tbody>
          </table>
        ),
      },
    ],
  },
  com: {
    url: 'lookup.icann.org',
    zoekterm: 'apple.com',
    les: (
      <>
        <b>Bij een .com zie je de eigenaar meestal niet.</b> Die is afgeschermd, en dat is de privacyregel
        en niet een fout. Dan is de whois niet je antwoord en is de echte test of jij zelf kunt inloggen bij
        de registrar. Wat je wel ziet is het slot: apple.com staat op transfer prohibited.
      </>
    ),
    stappen: [
      {
        bij: 'Typ je domein bij de opzoekdienst van ICANN.',
        scherm: <div className="dca-zoek"><div className="dca-veld"><span className="dca-typ" /><span className="dca-caret" /></div><span className="dca-knop">Lookup</span></div>,
      },
      {
        bij: 'Geen naam, alleen een melding dat het is afgeschermd.',
        scherm: (
          <table className="dca-tabel">
            <tbody>
              <Rij k="Name" v="APPLE.COM" />
              <Rij k="Registrant / Organization" v={<span className="dca-redact">The RDAP server redacted the value</span>} licht />
              <Rij k="Registrant e-mail" v={<span className="dca-redact">apple.com-registrant@anonymised.email</span>} />
              <Rij k="Country" v="US" />
            </tbody>
          </table>
        ),
      },
      {
        bij: 'Wat je wel ziet: waar het domein staat en sinds wanneer.',
        scherm: (
          <table className="dca-tabel">
            <tbody>
              <Rij k="Registrar" v="NOM-IQ Ltd dba Com Laude" />
              <Rij k="Created" v="19 februari 1987" />
              <Rij k="Registry Expiration" v="20 februari 2027" />
              <Rij k="Nameservers" v="A.NS.APPLE.COM en drie andere" />
            </tbody>
          </table>
        ),
      },
      {
        bij: <>En het slot. Zes keer <b>prohibited</b>: er kan niets gebeuren zonder dat Apple het zelf openzet.</>,
        scherm: (
          <table className="dca-tabel">
            <tbody>
              <Rij
                k="Domain Status"
                licht
                v={
                  <>
                    {['clientTransferProhibited', 'clientUpdateProhibited', 'clientDeleteProhibited',
                      'serverTransferProhibited', 'serverUpdateProhibited', 'serverDeleteProhibited'].map((s) => (
                      <span className="dca-slot" key={s}>{s}</span>
                    ))}
                  </>
                }
              />
            </tbody>
          </table>
        ),
      },
    ],
  },
}

export default function DomeinCheckAnimatie() {
  const [welke, setWelke] = useState<'nl' | 'com'>('nl')
  const [stap, setStap] = useState(0)
  const [getypt, setGetypt] = useState('')
  const [staatStil, setStaatStil] = useState(false)
  const rustig = useRef(false)

  const set = SETS[welke]
  const aantal = set.stappen.length

  useEffect(() => {
    rustig.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Doorlopen, tenzij de lezer stilstaat of minder beweging wil.
  useEffect(() => {
    if (staatStil || rustig.current) return
    const t = setTimeout(() => setStap((s) => (s + 1) % aantal), 3200)
    return () => clearTimeout(t)
  }, [stap, welke, staatStil, aantal])

  // Letter voor letter typen in stap 1.
  useEffect(() => {
    if (stap !== 0) return
    if (rustig.current) { setGetypt(set.zoekterm); return }
    setGetypt('')
    let i = 0
    const t = setInterval(() => {
      i += 1
      setGetypt(set.zoekterm.slice(0, i))
      if (i >= set.zoekterm.length) clearInterval(t)
    }, 105)
    return () => clearInterval(t)
  }, [stap, welke, set.zoekterm])

  const wissel = useCallback((n: 'nl' | 'com') => { setWelke(n); setStap(0) }, [])

  return (
    <figure className="dca">
      <div className="dca-tabs" role="tablist" aria-label="Kies een extensie">
        {(['nl', 'com'] as const).map((n) => (
          <button
            key={n}
            type="button"
            role="tab"
            aria-selected={welke === n}
            className="dca-tab"
            onClick={() => wissel(n)}
          >
            {n === 'nl' ? '.nl bij SIDN' : '.com bij ICANN'}
          </button>
        ))}
      </div>

      <div
        className="dca-venster"
        onMouseEnter={() => setStaatStil(true)}
        onMouseLeave={() => setStaatStil(false)}
      >
        <div className="dca-balk">
          <span className="dca-bol" /><span className="dca-bol" /><span className="dca-bol" />
          <span className="dca-url">{set.url}</span>
        </div>

        <div className="dca-scherm">
          <div className="dca-stap" key={`${welke}-${stap}`}>
            {stap === 0 ? (
              <div className="dca-zoek">
                <div className="dca-veld">{getypt}<span className="dca-caret" /></div>
                <span className="dca-knop">{welke === 'nl' ? 'Zoeken' : 'Lookup'}</span>
              </div>
            ) : (
              set.stappen[stap].scherm
            )}
          </div>
        </div>

        <div className="dca-onder">
          <div className="dca-bij">{set.stappen[stap].bij}</div>
          <div className="dca-stippen">
            {set.stappen.map((_, i) => (
              <button
                key={i}
                type="button"
                className="dca-stip"
                aria-current={i === stap}
                aria-label={`Stap ${i + 1} van ${aantal}`}
                onClick={() => setStap(i)}
              />
            ))}
          </div>
        </div>
      </div>

      <figcaption className="dca-les">{set.les}</figcaption>
    </figure>
  )
}
