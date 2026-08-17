import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import StevinBrainVisual from '@/components/StevinBrainVisual'
import DeskProof from '@/components/DeskProof'
import { localizedMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

// De tarievenpagina. Was tot 28 jul 2026 een voorbeeld op /preview-tarieven
// met noindex; nu de echte pagina waar "Vanaf 399" op de homepage naartoe
// wijst. Model na D-019 (28 jul 2026), tweede versie na Koens correctie van
// 18:36:
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
// Wat hier nog NIET staat, bewust: wat een losse fix kost. Dat bedrag is niet
// gezet, en "prijs vooraf" is wel waar. Zodra het er is hoort het in de derde
// kaart. Dat geldt voor beide talen.
//
// Tweetalig sinds 17 aug 2026. Tot die dag stond hier alleen Nederlands, ook op
// /en: het menu zei "Pricing" en daaronder stond een volledig Nederlandse
// prijspagina, op precies de pagina waar de homepage naartoe wijst. De EN-kolom
// is copy, geen vertaling: zelfde bedragen, zelfde drie smaken, zelfde
// twee-wekenbelofte, maar geschreven zoals het in het Engels gezegd wordt.
// Sindsdien staat /tarieven ook in translatedPages in app/sitemap.ts.

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale !== 'en'
  return localizedMetadata({
    path: '/tarieven',
    locale,
    title: isNl ? 'Tarieven' : 'Pricing',
    description: isNl
      ? 'Iedereen begint met de diagnose. Daarna kies je: wij draaien het, wij draaien het en dragen over, of je doet het zelf met Stevin erbij. Vanaf 399 per maand.'
      : 'Everyone starts with the diagnosis. Then you choose: we run it, we run it and hand it over, or you do it yourself with Stevin alongside. From 399 euros per month.',
  })
}

// Een expliciet type in plaats van losse objecten, zodat NL en EN niet uit
// elkaar kunnen lopen: vergeet je een veld in een van de twee, dan valt de
// build om in plaats van dat er een Nederlandse zin op de Engelse pagina
// blijft staan. Dat was precies de fout die deze pagina had.
type Keuze = {
  nr: string
  label: string
  titel: string
  prijs: string
  prijsPer: string
  prijsSub: string
  body: string
  punten: string[]
  accent?: boolean
  badge?: string
}

type TarievenCopy = {
  eyebrow: string
  h2: string
  intro: string
  startLabel: string
  startTitel: string
  startBody: string
  keuzeLabel: string
  keuzes: Keuze[]
  keuzeMicro: string
  keuzeGrens: string
  breinEyebrow: string
  breinH2: string
  breinBody: string
  breinOnder: string
  breinPunten: { t: string; d: string }[]
  slot: string
  cta: string
  micro: string
}

const COPY: Record<'nl' | 'en', TarievenCopy> = {
  nl: {
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
    // Beheer start op 1.399 (Koen, 29 jul). Dat is het VOCA-niveau: 399
    // abonnement bij jaarbetaling plus 1.000 beheer. Bij maandbetaling wordt het
    // 1.499, want dan is het abonnement 499. Dat is geen korting maar hetzelfde
    // verschil dat ook op de derde kaart staat.
    //
    // Het Boersma-voorstel stond op 798 (399 + 399), maar dat ging eruit als
    // Founding Partner en is dus geen ondergrens die je publiek moet noemen.
    // Het abonnement staat vast, het beheer schaalt mee met het werk.
    //
    // De opstart krijgt bewust GEEN bedrag. Hij liep van 1.000 (VOCA) tot 3.200
    // (Boersma vol tarief, verstuurd met 50% Founding Partner-korting), en een
    // "vanaf 1.000" ankert iemand dan op de bodem van een band die drie keer zo
    // breed is. Dat is precies de verrassing waar deze positionering tegen is.
    //
    // Optie 1 en 2 kosten hetzelfde. Het verschil is waar je uitkomt, en dat is
    // precies wat een bureau nooit als keuze aanbiedt.
    keuzes: [
      {
        nr: '01',
        label: 'Voor wie er niet naar om wil kijken',
        titel: 'Wij doen alles',
        prijs: 'vanaf 1.399',
        prijsPer: 'per maand',
        prijsSub: 'bij jaarbetaling, 1.499 per maand bij maandbetaling. Doorlopend, en de opstart is maatwerk.',
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
        label: 'Voor wie het straks zelf wil doen',
        titel: 'Wij starten je op',
        // Geen jaartarief hier, en dat is geen slordigheid. Je kunt geen jaar
        // vooruit vragen voor iets dat na zes maanden klaar kan zijn. De
        // tijdelijke fase is dus per maand; pas als het blijvend wordt (kaart 1
        // of 3) mag er een jaarprijs tegenover staan.
        prijs: 'vanaf 1.499',
        prijsPer: 'per maand',
        prijsSub: 'geen jaartarief, want dit is tijdelijk. Meestal zes tot twaalf maanden, daarna 399.',
        body:
          'Wij zetten het goed en draaien mee tot het staat. Wat we doen en waarom komt in een dossier dat van jou is, zodat je eigen mensen meeleren. Daarna ga je over op het abonnement.',
        punten: [
          'Alles uit de eerste optie',
          'Overdracht zit erin vanaf dag een',
          'Je eigen mensen leren mee',
          'Daarna 399 per maand, met pay per fix erbij',
        ],
        accent: true,
        badge: 'Meest gekozen',
      },
      {
        nr: '03',
        label: 'Voor wie het werk elders belegt',
        titel: 'Je doet het zelf, met Stevin',
        prijs: '399',
        prijsPer: 'per maand',
        prijsSub: 'bij jaarbetaling, 499 per maand bij maandbetaling',
        // De bedoelde mechaniek is: signaal, actie, meteen het bedrag erbij, en
        // dat gaat van een tegoed af. Dat is NIET gebouwd, dus staat het hier ook
        // niet. Zodra het in het product zichtbaar is mag het terug, want dan is
        // het de sterkste zin van deze kaart. Zelfde regel als bij de scan: niets
        // beweren wat je niet kunt laten zien.
        body:
          'Stevin kijkt mee op al je kanalen, ziet wat er misgaat en zet de oplossing klaar. Uitvoeren doet je eigen team, een freelancer of een ander bureau. Wil je een klus toch door ons laten doen, dan spreken we de prijs af voordat we beginnen.',
        punten: [
          'Signalen dag en nacht, met de reden erbij',
          'Acties klaargezet, jij kiest wie ze uitvoert',
          'Pay per fix: los een klus door ons, prijs vooraf',
          'Alsnog door ons laten draaien kan altijd',
        ],
      },
    ],
    keuzeMicro:
      'Per maand kosten de eerste twee opties hetzelfde. Alleen de doorlopende optie heeft een jaartarief. Daar komt het verschil van honderd euro vandaan: je gaat niet vooruitbetalen voor iets dat we samen willen beeindigen.',
    // Zonder grens is 399 een onbeperkt abonnement op paid, owned, je winkel en
    // je merk, en dat is niet vol te houden. De grens schaalt mee met hoe groot
    // de klant is, niet met zijn mediabudget. Dat laatste is precies wat Aizy
    // doet (850 tot 2.000 spend, 1.850 daarboven) en waar Stevin tegenover staat.
    keuzeGrens:
      'Alle tarieven gelden voor een bedrijf met een merk en een winkel. Meer vestigingen, merken of webshops kosten meer. Meer mediabudget betekent niet automatisch een hogere prijs.',

    breinEyebrow: 'Wat er onder blijft liggen',
    breinH2: 'Wie er ook werkt, plugt in op hetzelfde brein.',
    breinBody:
      'Een nieuw bureau kost normaal een maand of drie inwerken, en de helft van wat je vorige partij wist komt nooit meer boven. Bij Stevin staat het vast: wat er geprobeerd is, wat werkte, wat niet en waarom. Een freelancer, je eigen team of een volgend bureau leest zich in, in plaats van dat jij het opnieuw gaat vertellen.',
    breinOnder: 'Het geheugen van een klant, zoals het in de Desk staat. Sleep gerust aan de knopen.',
    breinPunten: [
      { t: 'Geen lange briefings meer', d: 'De context staat er al. Iemand die maandag begint, weet maandag wat er speelt.' },
      { t: 'Geen campagnes die iemand vergeet', d: 'Wat er loopt en waarom staat vast, ook als de persoon die het bedacht er niet meer is.' },
      { t: 'Wisselen zonder opnieuw beginnen', d: 'Je vervangt wie het werk doet, niet wat er bekend is.' },
    ],

    slot: 'Stevin ziet wat er misgaat, legt uit waarom, en zet de oplossing klaar. Wie hem uitvoert, kies je zelf.',
    cta: 'Start de diagnose',
    micro:
      'Stoppen kan altijd, met alles wat van jou is: accounts, data, kennis en het volledige dossier.',
  },

  // De Engelse kolom. Zelfde bedragen, zelfde drie smaken, zelfde
  // twee-wekenbelofte. De duizendtallen krijgen hier een komma in plaats van
  // een punt (1,399 leest in het Engels als duizend-driehonderd, 1.399 als
  // ruim een euro) en het euroteken staat erbij, want zonder valuta leest een
  // Engelstalige lezer een prijs als dollars.
  //
  // De opstart blijft ook hier zonder bedrag, om dezelfde reden als hierboven:
  // de band is te breed om een ondergrens te noemen. En wat een losse fix kost
  // staat er ook in het Engels niet, want dat bedrag is nog steeds niet gezet.
  en: {
    eyebrow: 'Pricing',
    h2: 'You choose who does the work. Your marketing brain stays yours.',
    intro:
      'Everyone starts in the same place: working out what your marketing brain needs before it can run. What happens after that is a choice, and you can reverse that choice later without losing anything.',

    startLabel: 'This is where it starts, always',
    startTitel: 'The diagnosis',
    startBody:
      'A marketing brain only works once it knows the right things, and that is more than your ads: your findability, your shop, your mail and your brand count too. We check whether the measurement holds up, and whether anyone wrote down what worked and what did not. You get the list of what has to happen, on your own numbers, within two weeks.',

    keuzeLabel: 'Then you choose',
    keuzes: [
      {
        nr: '01',
        label: 'For owners who would rather not deal with it',
        titel: 'We do everything',
        prijs: 'from €1,399',
        prijsPer: 'per month',
        prijsSub: 'on annual billing, €1,499 per month on monthly billing. Ongoing, and the setup is quoted per case.',
        body:
          'Some owners want nothing to do with it, and that is a fine answer. We set things up, steer them and clean them up. For as long as you want, even if that runs into years.',
        punten: [
          'Full setup and active management',
          'Every decision recorded with the reason',
          'No margin on your media budget',
          'You can still take it over yourself, at any time',
        ],
      },
      {
        nr: '02',
        label: 'For owners who want to run it themselves later',
        titel: 'We get you started',
        prijs: 'from €1,499',
        prijsPer: 'per month',
        prijsSub: 'no annual rate, because this is temporary. Usually six to twelve months, then €399.',
        body:
          'We set it up properly and run it with you until it holds. What we do and why goes into a file that belongs to you, so your own people learn as it happens. After that you move to the subscription.',
        punten: [
          'Everything from the first option',
          'Handover is built in from day one',
          'Your own people learn along the way',
          'Then €399 per month, with pay per fix on top',
        ],
        accent: true,
        badge: 'Most chosen',
      },
      {
        nr: '03',
        label: 'For owners who place the work elsewhere',
        titel: 'You do it yourself, with Stevin',
        prijs: '€399',
        prijsPer: 'per month',
        prijsSub: 'on annual billing, €499 per month on monthly billing',
        body:
          'Stevin watches all your channels, spots what goes wrong and puts the fix ready. Your own team, a freelancer or another agency carries it out. If you do want a job done by us, we agree the price before we start.',
        punten: [
          'Signals day and night, with the reason',
          'Actions ready to go, you pick who runs them',
          'Pay per fix: hand us one job, price upfront',
          'You can still hand it to us, at any time',
        ],
      },
    ],
    keuzeMicro:
      'Per month the first two options cost the same. Only the ongoing option has an annual rate. That is where the hundred euro difference comes from: you do not pay ahead for something we both want to end.',
    keuzeGrens:
      'All rates apply to one company with one brand and one shop. More locations, brands or webshops cost more. A bigger media budget does not automatically mean a higher price.',

    breinEyebrow: 'What stays underneath',
    breinH2: 'Whoever does the work plugs into the same brain.',
    breinBody:
      'A new agency normally takes three months to get up to speed, and half of what your last one knew never surfaces again. With Stevin it is written down: what was tried, what worked, what did not and why. A freelancer, your own team or the next agency reads up, instead of you telling the whole story again.',
    breinOnder: 'A single client memory, the way it sits in the Desk. Feel free to drag the nodes around.',
    breinPunten: [
      { t: 'No more long briefings', d: 'The context is already there. Someone who starts on Monday knows on Monday what is going on.' },
      { t: 'No campaigns that get forgotten', d: 'What runs and why is on record, even after the person who thought of it has left.' },
      { t: 'Switch without starting over', d: 'You replace who does the work, not what is known.' },
    ],

    slot: 'Stevin sees what goes wrong, explains why, and puts the fix ready. You choose who carries it out.',
    cta: 'Start the diagnosis',
    micro:
      'You can stop at any time, with everything that is yours: accounts, data, knowledge and the full file.',
  },
}

export default async function PreviewTarieven({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = locale === 'en' ? COPY.en : COPY.nl

  return (
    <main className="bg-white">
      <section style={{ padding: '112px 24px 48px' }}>
        <div className="mx-auto max-w-[780px] text-center">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-6 flex items-center justify-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            {c.eyebrow}
          </p>
          <h1
            className="font-display font-extrabold text-primary m-0"
            style={{ fontWeight: 700, fontSize: 'clamp(34px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08', textWrap: 'balance' }}
          >
            {c.h2}
          </h1>
          <p
            className="text-muted leading-[1.65] mx-auto"
            style={{ fontSize: '17px', maxWidth: '54ch', marginTop: '24px' }}
          >
            {c.intro}
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
                {c.startLabel}
              </p>
              <p
                className="font-display font-extrabold text-primary m-0"
                style={{ fontSize: '26px', letterSpacing: '-0.02em', lineHeight: '1.15' }}
              >
                {c.startTitel}
              </p>
            </div>
            <p className="text-muted m-0" style={{ fontSize: '15px', lineHeight: '1.65' }}>
              {c.startBody}
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
            {c.keuzeLabel}
          </p>

          <div className="grid gap-6 md:grid-cols-3 items-stretch">
            {c.keuzes.map((s) => (
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
            {c.keuzeMicro}
          </p>
          <p className="text-center text-muted mx-auto" style={{ fontSize: '13px', maxWidth: '56ch', marginTop: '12px', lineHeight: '1.6', opacity: 0.75 }}>
            {c.keuzeGrens}
          </p>
        </div>
      </section>

      {/* Het echte onderscheid. Niet wie het werk doet, maar dat de kennis blijft
          liggen als die persoon wisselt. */}
      {/* Het scherm zelf, zonder brein-blok: het brein staat hieronder in de
          band die de claim maakt. */}
      <DeskProof locale={locale} toonBrein={false} />

      <section className="bg-[#0A1628] text-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[980px]">
          <div className="max-w-[640px]">
            <p
              className="font-display font-bold m-0 mb-5 flex items-center gap-[14px]"
              style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5DA3FF' }}
            >
              <span className="inline-block w-6 h-px flex-shrink-0" style={{ background: '#5DA3FF', opacity: 0.6 }} aria-hidden="true" />
              {c.breinEyebrow}
            </p>
            <h2
              className="font-display font-extrabold m-0"
              style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08', textWrap: 'balance' }}
            >
              {c.breinH2}
            </h2>
            <p className="text-slate-300 leading-[1.7]" style={{ fontSize: '16px', marginTop: '22px' }}>
              {c.breinBody}
            </p>
          </div>

          {/* De claim stond hier alleen als tekst. Een netwerkkaart waar je zelf
              aan kunt trekken laat het zien; een zin erover niet. De donkere
              variant, want deze band is al navy. */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ marginTop: '44px', border: '1px solid rgba(255,255,255,0.10)' }}
          >
            <StevinBrainVisual aspect="21:9" brand={false} claim="" ariaLabel="" locale={locale} />
          </div>
          <p className="text-slate-400" style={{ fontSize: '13px', marginTop: '16px' }}>
            {c.breinOnder}
          </p>

          <div className="grid gap-8 md:grid-cols-3" style={{ marginTop: '52px' }}>
            {c.breinPunten.map((p) => (
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
            {c.slot}
          </p>
          <div className="mt-9">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-white font-display font-bold text-[15px] px-8 py-3.5 rounded-lg hover:bg-accent-dark transition-colors"
            >
              {c.cta}
            </Link>
          </div>
          <p className="text-muted mx-auto" style={{ fontSize: '14px', maxWidth: '52ch', marginTop: '20px', lineHeight: '1.6' }}>
            {c.micro}
          </p>
        </div>
      </section>
    </main>
  )
}
