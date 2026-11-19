import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import ContactForm from '@/components/ContactForm'
import Image from 'next/image'
import NodeWatermerk from '@/components/rethink/NodeWatermerk'
import { Knop, Punten, Vragen, h2Stijl, tekst, type Vraag } from '@/components/rethink/RethinkBlokken'

type Props = { params: Promise<{ locale: string }> }

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
//  - Beeld: de afbeelding die Koen zelf aanleverde (public/ps5-actie), met PS5-,
//    GTA- en Rockstar-logo's en een gemaakte hoes. Koen koos dit bewust, 19 nov,
//    nadat het merken- en misleidingsrisico was uitgelegd. Zie de PR-beschrijving.
//  - noindex en niet in de sitemap, zoals /black-friday: dit is een bestemming
//    voor onze eigen lijsten, geen zoekpagina (REGEL 8).
//  - Alleen Nederlands.

const URL = 'https://stevin.ai/ps5-actie'
const TITEL = 'Een PS5 met GTA VI cadeau als je nu klant wordt bij Stevin.AI'
const OMSCHRIJVING =
  'De eerste vijf nieuwe klanten tot en met 31 december 2026 die starten met een jaarcontract en een volledig opstarttraject kiezen zelf een cadeau binnen een vast budget van Stevin.AI, bijvoorbeeld een PS5 Digital Edition met tegoed voor GTA VI. De voorwaarden staan op deze pagina.'

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
    images: ['https://stevin.ai/og/ps5-actie.jpg'],
  },
  twitter: { card: 'summary_large_image', title: TITEL, description: OMSCHRIJVING, images: ['https://stevin.ai/og/ps5-actie.jpg'] },
}

const label = 'm-0 mb-5 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent'

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
  'De actie geldt voor de eerste vijf nieuwe klanten die tot en met 31 december 2026 tekenen voor een jaarcontract met Stevin.AI als bureau, inclusief een volledig opstarttraject. Op volgorde van tekenen. Is het vijfde cadeau toegezegd, dan sluit de actie, ook als het nog geen 31 december is.',
  'Een volledig opstarttraject betekent dat het in je offerte vooraf is afgesproken en bestaat uit meerdere onderdelen, bijvoorbeeld een nieuwe website, een campagne, het inrichten van je telefoon en de meting. Welke onderdelen en wat ze kosten, staat in je offerte.',
  'Je kiest zelf je cadeau, binnen een vast budget van Stevin.AI. Wij denken aan een PlayStation 5 Digital Edition (Slim) met PlayStation Store-tegoed om GTA VI te kopen. Games zijn op PlayStation niet los cadeau te doen en de Digital Edition heeft geen schijfstation, dus het tegoed komt op jouw eigen PlayStation-account. Daarvoor heb je zo\'n account nodig.',
  'Wij bestellen het cadeau nadat je het opstarttraject hebt betaald. De levertijd hangt af van de voorraad. Bij de bestelling melden we je wanneer je de console verwacht.',
  'Zeg je je jaarcontract binnen drie maanden nadat je bent gestart op, dan berekenen we de console aan je door. Het bedrag staat vooraf in je offerte.',
  'Dit is een actie voor bedrijven in Nederland en Vlaanderen die nieuw zijn bij Stevin.AI. Het cadeau is niet in te ruilen voor korting of geld en is niet over te dragen.',
  'Stevin.AI is niet verbonden aan Sony of Rockstar Games en wordt niet door hen gesponsord. Alle merknamen zijn van hun eigenaren.',
]

const VRAGEN: Vraag[] = [
  {
    v: 'Waarom staat er geen "gratis" bij?',
    a: 'Omdat het niet gratis is. Je tekent voor een jaar en je betaalt je opstarttraject. Zeg je binnen drie maanden op, dan berekenen we de console door. Dat noemen wij liever een cadeau met voorwaarden, en die staan hierboven.',
  },
  {
    v: 'Waarom doen jullie dit?',
    a: 'Een nieuwe klant brengt in de eerste weken veel werk mee: website, campagne, telefoon, meting. Dit is onze manier om je te bedanken, en jij kiest zelf wat je er het leukst aan vindt. En het houdt de instroom beperkt: vijf plekken, omdat we alles zelf inrichten.',
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

export default async function Ps5ActiePage({ params }: Props) {
  const { locale } = await params
  if (locale !== 'nl') notFound()
  setRequestLocale(locale)

  return (
    <main className="-mt-[72px] bg-white">
      {/* Kop, donker zoals de hero's van de nieuwe pagina's. */}
      <section className="relative overflow-hidden bg-primary px-6 pb-24 pt-[184px] text-white sm:pt-[200px]">
        <NodeWatermerk seed={861} thema="donker" />
        <div className="relative mx-auto grid max-w-[1152px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className={label}>Actie tot en met 31 december 2026, vijf plekken</p>
            <h1
              className="m-0 max-w-[24ch] text-balance font-display font-extrabold text-white"
              style={{ ...h2Stijl, fontSize: 'clamp(28px, 3.4vw, 46px)' }}
            >
              Ben jij of is jouw bedrijf op zoek naar een nieuw bureau? En wil je iemand blij maken met een PS5 inclusief GTA VI?{' '}
              <span className="text-accent">It&apos;s your lucky day.</span>
            </h1>
            <p className="m-0 mt-5 max-w-[600px] font-display text-[20px] font-bold leading-[1.35] text-white">
              Net als GTA 6 leggen wij een nieuwe lat. Niet in gaming, maar in marketing en sales.
            </p>
            <p className="m-0 mt-6 max-w-[600px] text-[18px] leading-[1.55] text-white/75">
              Start nu met Stevin.AI als jouw bureau, met een jaarcontract en een volledig opstarttraject, bijvoorbeeld een
              nieuwe website, een campagne, je telefoon ingericht en de meting. De eerste vijf nieuwe klanten kiezen zelf hun
              cadeau, binnen een vast budget van Stevin.AI. Bijvoorbeeld een PS5 Digital Edition met tegoed voor GTA VI.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Knop cta="ps5_actie_hero_gesprek" licht />
              <a
                href="#voorwaarden"
                data-cta="ps5_actie_hero_voorwaarden"
                className="text-[15px] font-semibold text-white/80 underline underline-offset-4 transition-colors hover:text-white"
              >
                Lees de voorwaarden
              </a>
            </div>
            <p className="m-0 mt-6 max-w-[600px] text-sm text-white/70">
              Voor nieuwe zakelijke klanten, op volgorde van tekenen. Wij bestellen het cadeau nadat je het opstarttraject
              hebt betaald. Zeg je binnen drie maanden op, dan berekenen we de console door. Alle voorwaarden staan hieronder.
            </p>
          </div>
          <figure className="m-0 mx-auto w-full max-w-[560px]">
            <Image
              src="/ps5-actie/ps5-gta-zonsondergang.webp"
              alt="Een witte PS5 met controller en een GTA VI-spelhoes voor een stad bij zonsondergang"
              width={620}
              height={400}
              priority
              sizes="(min-width: 1024px) 480px, 100vw"
              className="h-auto w-full rounded-2xl"
            />
            <figcaption className="mt-3 text-sm text-white/70">
              Sfeerbeeld. Het cadeau is bijvoorbeeld een PS5 Digital Edition met tegoed voor GTA VI.
            </figcaption>
          </figure>
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

      {/* Doorverwijzen: concept, voorwaarden nog niet door Koen vastgelegd (W-861). */}
      <section id="doorverwijzen" className="scroll-mt-24 bg-surface px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Breng een ondernemer mee, en speel samen.
          </h2>
          <div className={`mt-8 flex max-w-[680px] flex-col gap-5 ${tekst}`}>
            <p className="m-0">
              Ken je een ondernemer die een bureau zoekt dat stuurt op winst? Stuur hem naar ons. Hij krijgt een campagne waar we
              op winst sturen, jij krijgt PlayStation Store-tegoed voor GTA VI. Dan kun je samen met je maat spelen.
            </p>
            <p className="m-0">
              Het tegoed koopt Stevin.AI nadat de ondernemer die je aanbracht zijn jaarcontract heeft getekend en zijn
              opstarttraject heeft betaald. Je meldt hem aan bij ons voordat hij tekent, via info@stevin.ai.
            </p>
          </div>
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
              subject="PS5-actie 2026"
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
