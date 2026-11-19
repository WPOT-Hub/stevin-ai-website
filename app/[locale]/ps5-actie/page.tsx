import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import ContactForm from '@/components/ContactForm'
import Image from 'next/image'
import { Knop, Punten, Vragen, h2Stijl, tekst, type Vraag } from '@/components/rethink/RethinkBlokken'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

// W-861: elk vak krijgt in de advertentie een eigen link (?vak=dakdekker of ?vak=installateur).
// Alleen waarden uit deze lijst tellen; al het andere wordt genegeerd, zodat niemand
// via de link eigen tekst op de pagina kan zetten.
const VAKKEN: Record<string, { enkelvoud: string; meervoud: string }> = {
  dakdekker: { enkelvoud: 'dakdekker', meervoud: 'dakdekkers' },
  installateur: { enkelvoud: 'installateur', meervoud: 'installateurs' },
}

// W-861 (19 nov 2026): de PS5-actie. De eerste vijf nieuwe klanten die tot en met
// 31 december 2026 starten met een jaarcontract en een volledig opstarttraject
// krijgen een PS5 Digital Edition met GTA VI cadeau. Opzet naar het voorbeeld
// van de KPN-actie (haak op de game, console als cadeau, contract als
// voorwaarde), met de voorwaarden zichtbaar op de pagina zelf.
//
// Bewust zo:
//  - Het woord "gratis" staat er niet. Er hangt een jaarcontract aan en de
//    console wordt doorberekend bij opzeggen binnen drie maanden. De Nederlandse
//    Reclame Code noemt "gratis" onder alle omstandigheden misleidend als er
//    toch kosten in rekening worden gebracht, ook als die elders staan; de
//    ACM-pagina "iets gratis noemen" zegt hetzelfde over abonnementen.
//  - Geen bedragen en geen drempel op de pagina. De doorberekening staat vooraf
//    in de offerte.
//  - Op pauze achter een code (19 nov, Koen: 1500), zie middleware.ts en
//    lib/ps5Toegang.ts. Daarom ook geen Open Graph-beeld meer en staan de
//    beelden in private/ps5-actie en niet in public.
//  - Beeld: de afbeelding die Koen zelf aanleverde (private/ps5-actie), met PS5-,
//    GTA- en Rockstar-logo's en een gemaakte hoes. Koen koos dit bewust, 19 nov,
//    nadat het merken- en misleidingsrisico was uitgelegd. Zie de PR-beschrijving.
//  - noindex en niet in de sitemap, zoals /black-friday: dit is een bestemming
//    voor onze eigen lijsten, geen zoekpagina (REGEL 8).
//  - Alleen Nederlands.

const URL = 'https://stevin.ai/ps5-actie'
const TITEL = 'Een PS5 met GTA VI cadeau als je nu klant wordt bij Stevin.AI'
const OMSCHRIJVING =
  'De eerste vijf nieuwe klanten per vak tot en met 31 december 2026 die starten met een jaarcontract en een volledig opstarttraject kiezen zelf een cadeau binnen een vast budget van Stevin.AI, bijvoorbeeld een PS5 Digital Edition met tegoed voor GTA VI. De voorwaarden staan op deze pagina.'

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: { canonical: URL },
  robots: { index: false, follow: true },
  openGraph: {
    title: TITEL,
    description: OMSCHRIJVING,
    url: URL,
    type: 'website',
    siteName: 'Stevin.AI',
    locale: 'nl_NL',
  },
  twitter: { card: 'summary_large_image', title: TITEL, description: OMSCHRIJVING },
}

const label = 'm-0 mb-5 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent'

// W-861: wat hier staat is bewust "in aanbouw" genoemd. Nagekeken in Stevin-Hub (19 nov 2026):
// de 076-lijn van Stevin zelf herkent bellers en legt gesprekken vast, maar de route per klant
// (nummer naar klant) en het appje bij een gemiste oproep met de naam van de beller bestaan nog
// niet voor klanten. Pas "in aanbouw" weg als dat live is en in system_health groen staat.
const DAK = [
  { t: 'Gemiste oproep, meteen een appje', d: 'Je neemt niet op en de beller krijgt direct bericht. Jij belt terug als het uitkomt.' },
  { t: 'Je weet wie het was', d: 'Het nummer wordt herkend. Het gesprek staat daarna bij die klant, met wat er besproken is.' },
  { t: 'Een aanvraag blijft niet liggen', d: 'Wie een aanvraag doet, krijgt snel een bericht en een herinnering, zodat jij niet hoeft na te jagen.' },
]

const OPSTART = [
  {
    t: 'Een nieuwe website',
    d: 'Gebouwd voor de telefoon, snel, op je eigen domein en met de meting erin.',
  },
  {
    t: 'Je eerste campagne',
    d: 'Een campagne die wij voor je inrichten, met de meting erin zodat je ziet wat een aanvraag oplevert.',
  },
  {
    t: 'Je telefoon ingericht',
    d: 'Zodat je telefoontjes niet in het niets verdwijnen en je kunt zien wat je marketing je aan gesprekken oplevert.',
  },
  {
    t: 'De meting',
    d: 'Server-side meting en conversies die kloppen, zodat je vanaf de eerste dag ziet wat het oplevert.',
  },
]

const STAPPEN = [
  {
    t: '1. Plan een kennismaking',
    d: 'We kijken naar je cijfers en je huidige situatie, en zeggen eerlijk of het past. Een half uur, geen verplichting.',
  },
  {
    t: '2. Je tekent voor een jaar met een opstarttraject',
    d: 'In je offerte staat wat er in je opstarttraject zit, wat het kost en wat de console kost als je binnen drie maanden opzegt. Je weet alles voordat je tekent.',
  },
  {
    t: '3. Je kiest je cadeau, wij bestellen het',
    d: 'Jij kiest wat je wilt, binnen het budget. Zodra het opstarttraject is betaald bestellen wij het. Intussen gaan we aan de slag met je opstart.',
  },
]

const VOORWAARDEN = [
  'De actie geldt per vak voor de eerste vijf nieuwe klanten die tot en met 31 december 2026 tekenen voor een jaarcontract met Stevin.AI als bureau, inclusief een volledig opstarttraject. Dus vijf dakdekkers en vijf installateurs, niet vijf in totaal. Op volgorde van tekenen. Is het vijfde cadeau in jouw vak toegezegd, dan sluit de actie voor dat vak, ook als het nog geen 31 december is.',
  'Een volledig opstarttraject betekent dat het in je offerte vooraf is afgesproken en bestaat uit meerdere onderdelen, bijvoorbeeld een nieuwe website, een campagne, het inrichten van je telefoon en de meting. Welke onderdelen en wat ze kosten, staat in je offerte.',
  'Je kiest zelf je cadeau, binnen een vast budget van Stevin.AI. Wij denken aan een PlayStation 5 Digital Edition (Slim) met PlayStation Store-tegoed om GTA VI te kopen. Games zijn op PlayStation niet los cadeau te doen en de Digital Edition heeft geen schijfstation, dus het tegoed komt op jouw eigen PlayStation-account. Daarvoor heb je zo\'n account nodig.',
  'Wij bestellen het cadeau nadat je het opstarttraject hebt betaald. De levertijd hangt af van de voorraad. Bij de bestelling melden we je wanneer je de console verwacht.',
  'Zeg je je jaarcontract binnen drie maanden nadat je bent gestart op, dan berekenen we de console aan je door. Het bedrag staat vooraf in je offerte.',
  'Dit is een actie voor bedrijven in Nederland en Vlaanderen die nieuw zijn bij Stevin.AI. Het cadeau is niet in te ruilen voor korting of geld en is niet over te dragen.',
  'Stevin.AI is niet verbonden aan Sony of Rockstar Games en wordt niet door hen gesponsord. Alle merknamen zijn van hun eigenaren.',
]

const DOORVERWIJZEN = [
  'Iedereen kan een adverteerder aanbrengen. Je krijgt per adverteerder die je aanbrengt en die klant wordt een tegoed.',
  'De adverteerder moet nieuw zijn bij Stevin.AI. Je meldt hem aan voordat hij tekent, via info@stevin.ai. Wij bevestigen de aanmelding. Meld je hem pas aan nadat hij getekend heeft, dan telt hij niet mee.',
  'Wij kopen het tegoed nadat de adverteerder zijn jaarcontract heeft getekend en zijn opstarttraject heeft betaald.',
  'Zegt de adverteerder zijn contract binnen drie maanden na de start op, dan vervalt het tegoed. Heb je het al ontvangen, dan berekenen we het aan je door.',
  'Het tegoed is niet in te ruilen voor geld of korting. Je krijgt het op je eigen PlayStation-account.',
]

const VRAGEN: Vraag[] = [
  {
    v: 'Waarom staat er geen "gratis" bij?',
    a: 'Omdat het niet gratis is. Je tekent voor een jaar en je betaalt je opstarttraject. Zeg je binnen drie maanden op, dan berekenen we de console door. Dat noemen wij liever een cadeau met voorwaarden, en die staan hierboven.',
  },
  {
    v: 'Waarom doen jullie dit?',
    a: 'Een nieuwe klant brengt in de eerste weken veel werk mee: website, campagne, telefoon, meting. Dit is onze manier om je te bedanken, en jij kiest zelf wat je er het leukst aan vindt. En het houdt de instroom beperkt: vijf plekken per vak, omdat we alles zelf inrichten.',
  },
  {
    v: 'Wat is een volledig opstarttraject?',
    a: 'Een traject van meerdere onderdelen waarmee je goed van start gaat, bijvoorbeeld een nieuwe website, een campagne, je telefoon ingericht en de meting. We bespreken in de kennismaking wat bij jou past en zetten het in je offerte.',
  },
  {
    v: 'Wanneer krijg ik de console?',
    a: 'We bestellen hem nadat je het opstarttraject hebt betaald. Bij de bestelling zeggen we je wanneer hij binnen is.',
  },
  {
    v: 'Wat gebeurt er als ik binnen drie maanden opzeg?',
    a: 'Dan berekenen we de console aan je door. Het bedrag staat in je offerte, dus je weet het voordat je tekent.',
  },
  {
    v: 'Hoe weet ik of er nog een plek is?',
    a: 'Plan een kennismaking of mail naar info@stevin.ai. We zeggen meteen hoeveel plekken er nog zijn.',
  },
]

export default async function Ps5ActiePage({ params, searchParams }: Props) {
  const { locale } = await params
  const { vak: vakParam } = await searchParams
  const vak = typeof vakParam === 'string' && Object.hasOwn(VAKKEN, vakParam) ? VAKKEN[vakParam] : null
  if (locale !== 'nl') notFound()
  setRequestLocale(locale)

  return (
    <main className="-mt-[72px] bg-white">
      {/* Kop in de stijl van de advertenties: blauw, rustig, vijf plekken per vak, PS5 met GTA VI en de gele sticker. */}
      <section className="relative overflow-hidden px-6 pb-20 pt-[150px] text-white sm:pt-[170px]" style={{ background: '#3D8EFF' }}>
        <div className="relative mx-auto grid max-w-[1152px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1
              className="m-0 text-balance font-display font-extrabold text-white"
              style={{ fontSize: 'clamp(38px, 5.2vw, 68px)', lineHeight: 1.02, letterSpacing: '-0.02em' }}
            >
              {vak ? (
                <>
                  Wij zoeken
                  <br />5 {vak.meervoud}.
                </>
              ) : (
                <>
                  Wij zoeken
                  <br />5 klanten per vak.
                </>
              )}
            </h1>
            <ol className="m-0 mt-7 flex max-w-[560px] list-none gap-2.5 p-0 sm:gap-3.5" aria-label="Vijf plekken">
              {[1, 2, 3, 4, 5].map((n) => (
                <li
                  key={n}
                  className="relative flex aspect-[1.3/1] flex-1 items-center justify-center rounded-2xl font-display text-[26px] font-extrabold sm:text-[34px]"
                  style={{ border: '3px dashed rgba(255,255,255,.85)', background: 'rgba(255,255,255,.1)' }}
                >
                  {n === 1 && vak ? (
                    <>
                      <span className="sr-only">Plek 1 is bezet</span>
                      <Image
                        src="/api/ps5-beeld/ps5-haal.webp"
                        unoptimized
                        alt=""
                        width={200}
                        height={280}
                        className="absolute left-1/2 top-1/2 h-[135%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2"
                      />
                    </>
                  ) : (
                    n
                  )}
                </li>
              ))}
            </ol>
            <p
              className="m-0 mt-5 inline-block rounded-[14px] px-5 py-3 font-display text-[18px] font-extrabold text-white sm:text-[22px]"
              style={{ background: '#0A1628' }}
            >
              Wij regelen je nieuwe klussen.
            </p>
            <p className="m-0 mt-7 max-w-[560px] text-[17px] font-semibold leading-[1.5] text-white">
              Word nu klant bij Stevin.AI en kies een PS5 Digital Edition met tegoed voor GTA VI als welkomstcadeau, bij een jaarcontract met volledig opstarttraject. Voor de eerste vijf nieuwe klanten per vak, tot 31 december.
            </p>
            <div className="mt-8">
              <a
                href="/kennismaking"
                data-cta="ps5_actie_hero_gesprek"
                data-open-kennismaking=""
                className="inline-flex items-center rounded-lg px-7 py-3.5 font-display text-[15px] font-bold text-white transition-[filter] hover:brightness-125"
                style={{ background: '#0A1628' }}
              >
                Plan een kennismaking
              </a>
            </div>
          </div>
          <figure className="relative m-0 mx-auto w-full max-w-[560px]">
            <Image
              src="/api/ps5-beeld/ps5-scene.webp"
              unoptimized
              alt="Een witte PS5 met controller en een GTA VI-spelhoes"
              width={1042}
              height={817}
              priority
              className="h-auto w-full"
            />
            <span
              className="absolute bottom-[4%] right-[2%] rounded-2xl px-4 py-2 font-display text-[16px] font-extrabold sm:text-[22px]"
              style={{ background: '#FFD400', color: '#0A1628', transform: 'rotate(-5deg)', boxShadow: '0 8px 22px rgba(10,22,40,.18)' }}
            >
              WELKOMSTCADEAU
            </span>
          </figure>
        </div>
        <p className="relative m-0 mx-auto mt-10 max-w-[1152px] text-[14px] text-white/90">
          PS5 bij jaarcontract. GTA6 via PlayStation Store-tegoed. T/m 31 december 2026.
        </p>
      </section>

      {/* Op het dak: wat Stevin voor een vakman regelt. Eerlijk als "in aanbouw" gemarkeerd. */}
      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 24 }}>
        <div className="mx-auto max-w-[1152px]">
          <p className={label}>In aanbouw</p>
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Je staat op het dak en je klant belt.
          </h2>
          <div className={`mt-8 flex max-w-[680px] flex-col gap-5 ${tekst}`}>
            <p className="m-0">
              Je kunt niet opnemen. Het systeem herkent wie er belt en stuurt meteen een appje: &ldquo;Dag Jan, ik sta even
              met mijn handen vol op het dak. Kan ik je straks even bellen?&rdquo;
            </p>
            <p className="m-0">
              Zo blijft een klant niet in de wacht staan, en bel jij terug op een moment dat het past. Dit bouwen we nu. Een
              deel draait al bij Stevin zelf, voor klanten is het nog niet aan. Wat je krijgt en wanneer, staat in je offerte.
            </p>
          </div>
          <Punten items={DAK} kolommen={3} />
        </div>
      </section>

      {/* Wat het opstarttraject is */}
      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Eerst goed van start, dan pas de rest.
          </h2>
          <div className={`mt-8 flex max-w-[680px] flex-col gap-5 ${tekst}`}>
            <p className="m-0">
              Bij ons begint elk traject met de basis: een pagina waar je advertenties naartoe leiden, een campagne die
              erop stuurt, een telefoon die je kunt meten en cijfers die kloppen. Wij zijn een marketing- en salesbureau uit
              Breda dat meedenkt over de hele weg, en dat stuurt op winst in plaats van op losse aanvragen.
            </p>
            <p className="m-0">
              Dat noemen we het opstarttraject. Wat erin zit, spreken we samen af, en het staat met de prijs in je offerte.
            </p>
          </div>
          <Punten items={OPSTART} kolommen={2} />
        </div>
      </section>

      {/* Zo werkt het */}
      <section className="bg-surface px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Zo werkt het, in drie stappen.
          </h2>
          <Punten items={STAPPEN} kolommen={3} />
        </div>
      </section>

      {/* Voorwaarden */}
      <section id="voorwaarden" className="scroll-mt-24 px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1152px]">
          <p className={label}>Zonder kleine lettertjes</p>
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Wat er precies geldt.
          </h2>
          <ul className={`m-0 mt-8 max-w-[760px] list-none space-y-4 p-0 ${tekst}`}>
            {VOORWAARDEN.map((v) => (
              <li key={v} className="flex gap-4">
                <span className="mt-[11px] inline-block h-2 w-2 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Doorverwijzen: de voorwaarden zijn een voorstel van Claude, Koen beslist (W-861). */}
      <section id="doorverwijzen" className="scroll-mt-24 bg-surface px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Breng een adverteerder mee, en speel samen.
          </h2>
          <div className={`mt-8 flex max-w-[680px] flex-col gap-5 ${tekst}`}>
            <p className="m-0">
              Wij hebben geen dure salesmensen. Wij geven liever een bonus aan jou. Zo houden wij meer tijd over voor
              wat we echt leuk vinden: werk dat voor onze klanten op winst stuurt.
            </p>
            <p className="m-0">
              Ken je een adverteerder die een bureau zoekt dat op winst stuurt? Stuur hem naar ons. Wordt hij klant, dan krijgt
              hij de PS5 met GTA VI. Jij krijgt GTA VI als PlayStation Store-tegoed. Dan kun je samen met je maat spelen.
            </p>
            <p className="m-0">
              Het tegoed koopt Stevin.AI nadat de adverteerder die je aanbracht zijn jaarcontract heeft getekend en zijn
              opstarttraject heeft betaald. Je meldt hem aan bij ons voordat hij tekent, via info@stevin.ai.
            </p>
          </div>
          <h3 className="m-0 mt-12 font-display text-[20px] font-bold text-primary">Voorwaarden voor doorverwijzen</h3>
          <ul className={`m-0 mt-6 max-w-[760px] list-none space-y-4 p-0 ${tekst}`}>
            {DOORVERWIJZEN.map((v) => (
              <li key={v} className="flex gap-4">
                <span className="mt-[11px] inline-block h-2 w-2 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gesprek en formulier */}
      <section id="gesprek" className="scroll-mt-24 px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[900px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Past het bij jouw bedrijf?
          </h2>
          <p className={`m-0 mt-6 max-w-[680px] ${tekst}`}>
            Plan een kennismaking, of laat je gegevens achter. We zeggen meteen hoeveel plekken er nog zijn en wat een
            opstarttraject voor jou zou inhouden.
          </p>
          <div className="mt-8">
            <Knop cta="ps5_actie_gesprek_knop" />
          </div>
          <div className="mt-10">
            <ContactForm
              subject={vak ? `PS5-actie 2026 (${vak.enkelvoud})` : 'PS5-actie 2026'}
              keuzeLabel="Waar ben je naar op zoek?"
              bedrijfEnTelefoonVerplicht
              keuzes={[
                'Ik wil weten of er nog een plek is',
                'Ik wil starten met een jaarcontract en een opstarttraject',
                'Ik wil eerst weten wat een opstarttraject voor mij inhoudt',
                'Iets anders',
              ]}
              messageLabel="Toelichting (mag leeg blijven)"
              messagePlaceholder="Bijvoorbeeld wat je zoekt, of het adres van je huidige site."
            />
          </div>
        </div>
      </section>

      {/* Geen FAQPage-schema: de pagina staat op noindex. */}
      <Vragen kop="Wat mensen ons hierover vragen" vragen={VRAGEN} schema={false} />
    </main>
  )
}
