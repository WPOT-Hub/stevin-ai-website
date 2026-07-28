import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

type Props = { params: Promise<{ locale: string }> }

// VOORBEELDPAGINA, niet gelinkt en op noindex. Hier staat de tariefsectie zoals
// die eruit zou zien na D-019 (28 jul 2026), tweede versie na Koens correctie
// van 18:36:
//
//   - De diagnose is geen keuze en dus geen prijskaart. Daar begint iedereen.
//   - "Wij draaien het" is geen tijdelijke fase maar een blijvende optie. Uit de
//     gesprekken: er zijn ondernemers die er domweg niet naar om willen kijken.
//   - De uitkomst is niet "je hebt ons niet meer nodig", want dat wil niet
//     iedereen. De uitkomst is dat het brein van hen is en dat een freelancer,
//     een eigen team of een volgend bureau erop inplugt.
//
// Dat laatste is het echte verkoopargument en het sluit aan op de quote die al
// in de herken-sectie van de homepage staat: "Onze marketeer is weg. Alles zat
// in zijn hoofd."
//
// Zodra dit akkoord is verhuist het naar de PRIJS-sectie in app/[locale]/page.tsx
// en kan deze map weg.

export const metadata: Metadata = {
  title: 'Voorbeeld tarieven',
  robots: { index: false, follow: false },
}

const COPY = {
  eyebrow: 'Tarieven',
  h2: 'Wie het werk doet, kies je zelf. Je marketing-brein blijft van jou.',
  intro:
    'Iedereen begint op dezelfde plek: uitzoeken wat er nodig is om je marketing-brein te laten werken. Wat daarna gebeurt is een keuze, en die keuze kun je later omdraaien zonder dat je iets kwijtraakt.',

  // Niet openen met het betaler-signaal. Dat is een koude gespreksopener voor
  // iemand die Stevin nog niet kent; wie hier leest is al binnen en wil weten
  // wat er moet gebeuren, niet wat er toevallig te zien is in een register.
  startLabel: 'Hier begint het, altijd',
  startTitel: 'De diagnose',
  // Niet enumereren tot je erbij neervalt. Noem het principe (meer dan paid) en
  // geef er vier voorbeelden bij, dan kan de lezer zelf invullen wat er nog
  // meer bij hoort. De connectors dekken het: Shopify, WooCommerce, Search
  // Console, Bedrijfsprofiel, Klaviyo, Mailchimp, Merchant Center en de rest.
  startBody:
    'Een marketing-brein werkt pas als het de juiste dingen weet, en dat is meer dan je advertenties: ook je vindbaarheid, je winkel, je mail en je merk. Klopt wat er gemeten wordt, en staat ergens vast wat werkte en wat niet. Je krijgt de lijst van wat daarvoor moet gebeuren, op je eigen cijfers, binnen twee weken.',

  keuzeLabel: 'Daarna kies je',
  // De prijzen komen uit de twee verstuurde voorstellen (Boersma 20 jul, VOCA
  // 13 jul): abonnement 499, of 399 bij jaarbetaling, en beheer vanaf 399
  // (Boersma) tot 1.000 (VOCA). Het abonnement staat vast, het beheer schaalt
  // mee met het werk. Vandaar "vanaf 798" in plaats van "op maat".
  //
  // Optie 1 en 2 kosten hetzelfde. Het verschil is waar je uitkomt, en dat is
  // precies wat een bureau nooit als keuze aanbiedt.
  keuzes: [
    {
      nr: '01',
      label: 'Voor wie er niet naar om wil kijken',
      titel: 'Wij draaien het, punt',
      prijs: 'vanaf 798',
      prijsPer: 'per maand',
      prijsSub: 'doorlopend. Opstart vanaf 1.000 eenmalig.',
      body:
        'Sommige ondernemers willen er niets van weten, en dat is een prima antwoord. Wij richten in, sturen bij en ruimen op. Zolang je wilt, ook als dat jaren is.',
      punten: [
        'Volledige inrichting en actief beheer',
        'Elk besluit vastgelegd met de reden erbij',
        'Geen marge op je mediabudget',
        'Alsnog zelf overnemen kan altijd',
      ],
    },
    {
      nr: '02',
      // Een looptijd is geen doelgroep. Aizy kwalificeert zijn kaarten op
      // mediabudget, waardoor je binnen twee seconden weet waar je hoort. Dat
      // werkt, dus benoem hier de persoon en zet de looptijd eronder.
      label: 'Voor wie het straks zelf wil kunnen',
      titel: 'Wij draaien het, en dragen over',
      prijs: 'vanaf 798',
      prijsPer: 'per maand',
      prijsSub: 'zes tot twaalf maanden, daarna 399',
      body:
        'Wij draaien het, en werken er ondertussen naartoe dat jij het kunt. Wat we doen en waarom komt in een dossier dat van jou is. Aan het eind schakel je over naar het abonnement en raak je niets kwijt.',
      punten: [
        'Alles uit de eerste optie',
        'Overdracht zit erin vanaf dag een',
        'Je eigen mensen leren mee',
        'Daarna 399 per maand, zonder opnieuw beginnen',
      ],
      accent: true,
      badge: 'Meest gekozen',
    },
    {
      nr: '03',
      label: 'Voor wie het werk elders belegt',
      titel: 'Je doet het zelf',
      prijs: '399',
      prijsPer: 'per maand',
      prijsSub: 'bij jaarbetaling, 499 per maand bij maandbetaling',
      // De bedoelde mechaniek is: signaal, actie, meteen het bedrag erbij, en
      // dat gaat van een tegoed af. Dat is NIET gebouwd, dus staat het hier ook
      // niet. Zodra het in het product zichtbaar is mag het terug, want dan is
      // het de sterkste zin van deze kaart. Zelfde regel als bij de scan: niets
      // beweren wat je niet kunt laten zien.
      body:
        'Stevin kijkt mee op al je kanalen, ziet wat er misgaat en zet de oplossing klaar. Uitvoeren doet je eigen team, een freelancer of een ander bureau. Wil je het door ons laten doen, dan spreken we de prijs af voordat we beginnen.',
      punten: [
        'Signalen dag en nacht, met de reden erbij',
        'Acties klaargezet, jij kiest wie ze uitvoert',
        'Door ons uitgevoerd: prijs vooraf, geen abonnement erop',
        'Alsnog door ons laten draaien kan altijd',
      ],
    },
  ],
  keuzeMicro:
    'De eerste twee kosten hetzelfde. Het verschil zit in waar je uitkomt, en je mag onderweg nog van gedachten veranderen.',
  // Zonder grens is 399 een onbeperkt abonnement op paid, owned, je winkel en
  // je merk, en dat is niet vol te houden. De grens schaalt mee met hoe groot
  // de klant is, niet met zijn mediabudget. Dat laatste is precies wat Aizy
  // doet (850 tot 2.000 spend, 1.850 daarboven) en waar Stevin tegenover staat.
  keuzeGrens:
    'Alle tarieven gelden voor een bedrijf met een merk en een winkel. Meer vestigingen, merken of webshops kost meer. Nooit meer omdat je mediabudget groeit.',

  breinEyebrow: 'Wat er onder blijft liggen',
  breinH2: 'Wie er ook werkt, plugt in op hetzelfde brein.',
  breinBody:
    'Een nieuw bureau kost normaal een maand of drie inwerken, en de helft van wat je vorige partij wist komt nooit meer boven. Bij Stevin staat het vast: wat er geprobeerd is, wat werkte, wat niet en waarom. Een freelancer, je eigen team of een volgend bureau leest zich in, in plaats van dat jij het opnieuw gaat vertellen.',
  breinPunten: [
    { t: 'Geen lange briefings meer', d: 'De context staat er al. Iemand die maandag begint, weet maandag wat er speelt.' },
    { t: 'Geen campagnes die iemand vergeet', d: 'Wat er loopt en waarom staat vast, ook als de persoon die het bedacht er niet meer is.' },
    { t: 'Wisselen zonder opnieuw beginnen', d: 'Je vervangt wie het werk doet, niet wat er bekend is.' },
  ],

  slot: 'Stevin ziet wat er misgaat, legt uit waarom, en zet de oplossing klaar. Wie hem uitvoert, kies je zelf.',
  cta: 'Start de diagnose',
  micro:
    'Stoppen kan altijd, met alles wat van jou is: accounts, data, kennis en het volledige dossier.',
}

export default async function PreviewTarieven({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="bg-white">
      <div
        className="bg-[#0A1628] text-white text-center"
        style={{ padding: '10px 24px', fontSize: '13px', letterSpacing: '0.04em' }}
      >
        Voorbeeld, staat niet online en is niet gelinkt
      </div>

      <section style={{ padding: '112px 24px 48px' }}>
        <div className="mx-auto max-w-[780px] text-center">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-6 flex items-center justify-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            {COPY.eyebrow}
          </p>
          <h2
            className="font-display font-extrabold text-primary m-0"
            style={{ fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.035em', lineHeight: '1.08', textWrap: 'balance' }}
          >
            {COPY.h2}
          </h2>
          <p
            className="text-muted leading-[1.65] mx-auto"
            style={{ fontSize: '17px', maxWidth: '54ch', marginTop: '24px' }}
          >
            {COPY.intro}
          </p>
        </div>
      </section>

      {/* De diagnose is geen tier maar de voordeur, dus geen prijskaart naast de
          andere maar een band erboven. */}
      <section style={{ padding: '0 24px 44px' }}>
        <div className="mx-auto max-w-[980px]">
          <div className="rounded-2xl border border-border bg-surface flex flex-col md:flex-row gap-6 md:gap-10 md:items-center" style={{ padding: '32px 36px' }}>
            <div className="md:w-[38%] flex-shrink-0">
              <p
                className="text-accent font-display font-bold m-0 mb-2"
                style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                {COPY.startLabel}
              </p>
              <p
                className="font-display font-extrabold text-primary m-0"
                style={{ fontSize: '26px', letterSpacing: '-0.02em', lineHeight: '1.15' }}
              >
                {COPY.startTitel}
              </p>
            </div>
            <p className="text-muted m-0" style={{ fontSize: '15px', lineHeight: '1.65' }}>
              {COPY.startBody}
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 40px' }}>
        <div className="mx-auto max-w-[1140px]">
          <p
            className="text-muted font-display font-bold text-center m-0 mb-7"
            style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            {COPY.keuzeLabel}
          </p>

          <div className="grid gap-6 md:grid-cols-3 items-stretch">
            {COPY.keuzes.map((s) => (
              <div
                key={s.nr}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  s.accent
                    ? 'bg-[#0A1628] border-accent/30 shadow-xl shadow-accent/10'
                    : 'bg-white border-border'
                }`}
              >
                {s.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-white text-xs font-bold whitespace-nowrap">
                    {s.badge}
                  </div>
                )}

                <p
                  className={`font-display font-semibold m-0 mb-5 ${s.accent ? 'text-slate-400' : 'text-muted'}`}
                  style={{ fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase' }}
                >
                  {s.label}
                </p>

                <h3
                  className={`font-display font-extrabold m-0 mb-4 ${s.accent ? 'text-white' : 'text-primary'}`}
                  // Ruimte voor twee regels, ook als de titel er maar een nodig
                  // heeft. Anders staan de bedragen op verschillende hoogtes en
                  // valt er niets meer te vergelijken.
                  style={{ fontSize: '24px', letterSpacing: '-0.025em', lineHeight: '1.2', minHeight: '58px' }}
                >
                  {s.titel}
                </h3>

                <div className="mb-5">
                  {/* Zonder bedrag ("Op maat") mag dit niet dezelfde grootte en
                      gewicht krijgen als de titel erboven, anders leest de kaart
                      als twee koppen onder elkaar. */}
                  <span
                    className={
                      s.prijsPer
                        ? `font-display font-extrabold ${s.accent ? 'text-white' : 'text-primary'}`
                        : `font-display font-semibold ${s.accent ? 'text-[#5DA3FF]' : 'text-accent'}`
                    }
                    style={{
                      // "vanaf 798" is bijna twee keer zo breed als "399" en
                      // loopt op drie kolommen anders uit de kaart.
                      fontSize: s.prijsPer ? (s.prijs.length > 5 ? '30px' : '40px') : '18px',
                      letterSpacing: s.prijsPer ? '-0.03em' : '-0.01em',
                      lineHeight: '1',
                    }}
                  >
                    {s.prijs}
                  </span>
                  {s.prijsPer && (
                    <span
                      className={`font-semibold ${s.accent ? 'text-slate-400' : 'text-muted'}`}
                      style={{ fontSize: '15px', marginLeft: '10px' }}
                    >
                      {s.prijsPer}
                    </span>
                  )}
                  <p
                    className={`m-0 ${s.accent ? 'text-slate-400' : 'text-muted'}`}
                    style={{ fontSize: '13px', marginTop: '8px' }}
                  >
                    {s.prijsSub}
                  </p>
                </div>

                <p
                  className={`leading-[1.65] ${s.accent ? 'text-slate-300' : 'text-muted'}`}
                  style={{ fontSize: '15px', marginBottom: '24px' }}
                >
                  {s.body}
                </p>

                <ul className="space-y-2.5">
                  {s.punten.map((p) => (
                    <li
                      key={p}
                      className={`flex items-start gap-2.5 ${s.accent ? 'text-slate-300' : 'text-muted'}`}
                      style={{ fontSize: '14px', lineHeight: '1.5' }}
                    >
                      <svg
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${s.accent ? 'text-[#5DA3FF]' : 'text-accent'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-muted mx-auto" style={{ fontSize: '14px', maxWidth: '48ch', marginTop: '24px', lineHeight: '1.6' }}>
            {COPY.keuzeMicro}
          </p>
          <p className="text-center text-muted mx-auto" style={{ fontSize: '13px', maxWidth: '56ch', marginTop: '12px', lineHeight: '1.6', opacity: 0.75 }}>
            {COPY.keuzeGrens}
          </p>
        </div>
      </section>

      {/* Het echte onderscheid. Niet wie het werk doet, maar dat de kennis blijft
          liggen als die persoon wisselt. */}
      <section className="bg-[#0A1628] text-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[980px]">
          <div className="max-w-[640px]">
            <p
              className="font-display font-bold m-0 mb-5 flex items-center gap-[14px]"
              style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5DA3FF' }}
            >
              <span className="inline-block w-6 h-px flex-shrink-0" style={{ background: '#5DA3FF', opacity: 0.6 }} aria-hidden="true" />
              {COPY.breinEyebrow}
            </p>
            <h2
              className="font-display font-extrabold m-0"
              style={{ fontSize: 'clamp(26px, 3vw, 40px)', letterSpacing: '-0.03em', lineHeight: '1.12', textWrap: 'balance' }}
            >
              {COPY.breinH2}
            </h2>
            <p className="text-slate-300 leading-[1.7]" style={{ fontSize: '16px', marginTop: '22px' }}>
              {COPY.breinBody}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3" style={{ marginTop: '52px' }}>
            {COPY.breinPunten.map((p) => (
              <div key={p.t}>
                <div className="w-8 h-px mb-4" style={{ background: '#5DA3FF' }} aria-hidden="true" />
                <p className="font-display font-bold text-white m-0 mb-2" style={{ fontSize: '16px', letterSpacing: '-0.01em' }}>
                  {p.t}
                </p>
                <p className="text-slate-400 m-0" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[720px] text-center">
          <p
            className="font-display font-extrabold text-primary m-0"
            style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', letterSpacing: '-0.03em', lineHeight: '1.3', textWrap: 'balance' }}
          >
            {COPY.slot}
          </p>
          <div className="mt-9">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-white font-display font-bold text-[15px] px-8 py-3.5 rounded-lg hover:bg-accent-dark transition-colors"
            >
              {COPY.cta}
            </Link>
          </div>
          <p className="text-muted mx-auto" style={{ fontSize: '14px', maxWidth: '52ch', marginTop: '20px', lineHeight: '1.6' }}>
            {COPY.micro}
          </p>
        </div>
      </section>
    </main>
  )
}
