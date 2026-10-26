import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import ContactForm from '@/components/ContactForm'
import NodeWatermerk from '@/components/rethink/NodeWatermerk'
import { Knop, Punten, Vragen, h2Stijl, tekst, type Vraag } from '@/components/rethink/RethinkBlokken'

type Props = { params: Promise<{ locale: string }> }

// W-663 (24 tot 26 okt 2026): het Black Friday-aanbod, besloten als D-110 op
// 26 okt. Wie tot en met 30 november tekent voor een jaar met Stevin.AI als
// bureau krijgt de nieuwe website erbij.
//
// Bewust noindex en niet in de sitemap: dit is de bestemming voor onze eigen
// lijsten (CRM, bellijst, LinkedIn, Journal), geen zoekpagina. Keyword Planner
// gaf op 24 okt 2026 voor "black friday marketingbureau" geen volume en de
// SERP toont tips voor webshops; een dienstpagina op zo'n term verliest (REGEL 8).
//
// Opmaak: de bouwstenen van de nieuwe pagina's (RethinkBlokken, zoals
// /php-lek-check sinds W-670), label zonder streepje, knoppen bg-accent met
// witte tekst (W-668). Prijzen en voorwaarden komen uit D-110 en
// docs/VOORSTEL_W663_BLACK_FRIDAY_WEBSITE.md in Stevin-Hub; verandert daar
// iets, dan hier ook, en in het aanbodblok op /php-lek-check.
// Alleen Nederlands: de Engelse site geeft sinds W-535 een 410.
//
// Na 30 november: de actie van beide pagina's halen en de omleiding
// /blackfriday herzien (CRM-taak van 1 december).

const URL = 'https://stevin.ai/black-friday'
const TITEL = 'Black Friday bij Stevin.AI: een jaar bureau, de website erbij'
const OMSCHRIJVING =
  'Teken tot en met 30 november 2026 voor een jaar met Stevin.AI als jouw bureau, en wij bouwen je nieuwe website erbij. Op je eigen domein, op jouw naam, met de meting erin. Vijf plekken.'

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
    images: ['https://stevin.ai/opengraph-image'],
  },
  twitter: { card: 'summary_large_image', title: TITEL, description: OMSCHRIJVING, images: ['https://stevin.ai/opengraph-image'] },
}

const label = 'm-0 mb-5 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent'

const KRIJG_JE = [
  {
    t: "Een nieuwe website, tot vijf pagina's",
    d: 'Bijvoorbeeld home, diensten, over, contact en een pagina naar keuze. Gebouwd voor de telefoon, snel, op je eigen domein.',
  },
  {
    t: 'De meting erin',
    d: 'GA4, server-side meting en conversies die kloppen. Je ziet vanaf de eerste dag wat je advertenties opleveren.',
  },
  {
    t: 'Een formulier dat in je CRM landt',
    d: 'Elke aanvraag komt bij jou binnen, in je eigen CRM. Geen aanvragen meer die in een mailbox blijven liggen.',
  },
  {
    t: 'Teksten in overleg',
    d: 'Jij levert de input, wij schrijven, jij keurt goed. Een correctieronde zit erin.',
  },
  {
    t: 'Op jouw naam',
    d: 'Domein, hosting en accounts zijn van jou. Stap je ooit over, dan neem je alles mee.',
  },
  {
    t: 'Het eerste jaar hosting erbij',
    d: 'Hosting en onderhoud zijn het eerste jaar inbegrepen. Daarna 29 euro per maand, plus 15 euro per maand als de server-side meting doorloopt.',
  },
]

const STAPPEN = [
  {
    t: '1. Plan een kennismaking, zodat je uiterlijk 30 november kunt tekenen',
    d: 'We kijken naar je cijfers en je huidige site, en zeggen eerlijk of het past. Een half uur, geen verplichting.',
  },
  {
    t: '2. Je tekent voor een jaar',
    d: 'Wij worden jouw bureau voor 1.399 euro per maand bij jaarbetaling. De opstart blijft maatwerk, met de prijs vooraf.',
  },
  {
    t: '3. Wij bouwen de site',
    d: 'Binnen zes weken nadat je teksten en beelden hebt aangeleverd staat hij. Daarna beginnen we met het werk uit je overeenkomst: de meting, de accounts en de campagnes.',
  },
]

const VOORWAARDEN = [
  'Voor nieuwe klanten in Nederland en Vlaanderen die uiterlijk 30 november 2026 tekenen voor een jaar met Stevin.AI als bureau: 1.399 euro per maand bij jaarbetaling. De opstart blijft maatwerk, met de prijs vooraf.',
  "De website: tot vijf pagina's, op je eigen domein, met de meting en een contactformulier dat in je CRM landt. Een correctieronde. Oplevering binnen zes weken nadat je teksten en beelden hebt aangeleverd.",
  "Niet inbegrepen: een webshop, een boekingssysteem, maatwerkkoppelingen, meer dan vijf pagina's, fotografie en vertalingen. Dat offreren we apart, met de prijs vooraf.",
  'Hosting en onderhoud zijn het eerste jaar inbegrepen. Daarna 29 euro per maand, plus 15 euro per maand als de server-side meting doorloopt.',
  'Vijf plekken, op volgorde van tekenen. Het traject start uiterlijk 31 januari 2027.',
  "Wat zo'n site anders kost: 1.000 tot 2.500 euro, afhankelijk van de omvang. De aanbieding is niet in te ruilen voor korting.",
  'Alle bedragen zijn exclusief btw.',
]

const VRAGEN: Vraag[] = [
  {
    v: 'Waarom geven jullie een website weg?',
    a: 'Omdat elk traject bij ons toch met de basis begint: de meting, de accounts en de pagina waar je advertenties naartoe leiden. Een site die we zelf bouwen kunnen we vanaf de eerste dag meten. Dat scheelt ons het ombouwen van een site van een ander, en jou een losse opdracht.',
  },
  {
    v: 'Ik heb al een website. Wat dan?',
    a: 'Dan kijken we in het eerste gesprek of hij meet wat hij moet meten en of hij snel genoeg is. Is hij goed, dan hoef je hem niet te vervangen. De aanbieding is niet in te ruilen voor korting.',
  },
  {
    v: 'Wat kost de opstart?',
    a: 'Dat hangt af van de staat van je accounts en je meting, en daarom is het maatwerk. Je hoort de prijs voordat je tekent.',
  },
  {
    v: 'Wat gebeurt er na dat jaar?',
    a: 'De site is van jou, op je eigen domein. Je kunt bij ons blijven voor hosting en onderhoud (29 euro per maand, plus 15 euro als de server-side meting doorloopt), of je neemt hem mee. Of je daarna met ons als bureau doorgaat, spreken we af in je overeenkomst.',
  },
  {
    v: 'Kan ik ook per maand betalen?',
    a: 'Per maand betalen kan altijd, voor 1.499 euro per maand. De website hoort bij de jaarbetaling.',
  },
  {
    v: 'Geldt dit ook in België?',
    a: 'Ja, voor bedrijven in Vlaanderen net zo goed als in Nederland. De prijzen zijn exclusief btw.',
  },
  {
    v: 'Hoe weet ik of er nog een plek is?',
    a: 'Plan een kennismaking of mail naar info@stevin.ai. We zeggen meteen hoeveel plekken er nog zijn. Vijf is het aantal dat we in december en januari zelf kunnen bouwen, en daar houden we ons aan.',
  },
]

export default async function BlackFridayPage({ params }: Props) {
  const { locale } = await params
  if (locale !== 'nl') notFound()
  setRequestLocale(locale)

  return (
    <main className="-mt-[72px] bg-white">
      {/* Kop, donker zoals de hero's van de nieuwe pagina's. */}
      <section className="relative overflow-hidden bg-primary px-6 pb-24 pt-[184px] text-white sm:pt-[200px]">
        <NodeWatermerk seed={63} thema="donker" />
        <div className="relative mx-auto max-w-[1152px]">
          <p className={label}>Black Friday 2026, tot en met 30 november</p>
          <h1
            className="m-0 max-w-[20ch] text-balance font-display font-extrabold text-white"
            style={{ ...h2Stijl, fontSize: 'clamp(34px, 4.4vw, 60px)' }}
          >
            Een jaar Stevin.AI, en je nieuwe website <span className="text-accent">krijg je erbij.</span>
          </h1>
          <p className="m-0 mt-6 max-w-[640px] text-[18px] leading-[1.55] text-white/75">
            Teken tot en met 30 november voor een jaar met Stevin.AI als jouw bureau, dan bouwen wij de website waar je
            advertenties naartoe leiden. Op je eigen domein, op jouw naam, met de meting erin. Vijf plekken, want we bouwen
            elke site zelf, in december en januari.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Knop cta="black_friday_hero_gesprek" licht />
            <a
              href="#voorwaarden"
              data-cta="black_friday_hero_voorwaarden"
              className="text-[15px] font-semibold text-white/80 underline underline-offset-4 transition-colors hover:text-white"
            >
              Lees de voorwaarden
            </a>
          </div>
          <p className="m-0 mt-6 text-sm text-white/70">
            Voor bedrijven in Nederland en Vlaanderen. Wij worden jouw bureau voor 1.399 euro per maand bij jaarbetaling,
            exclusief btw.
          </p>
        </div>
      </section>

      {/* Waarom een website */}
      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            De basis die we toch nodig hebben, nu door ons gebouwd.
          </h2>
          <div className={`mt-8 flex max-w-[680px] flex-col gap-5 ${tekst}`}>
            <p className="m-0">
              Advertenties sturen mensen naar een pagina. Is die pagina traag, onduidelijk of niet te meten, dan betaal je
              voor klikken die niets opleveren. Daarom begint elk traject bij ons met de basis: de meting, de accounts en de
              koppeling met je CRM.
            </p>
            <p className="m-0">
              Meestal zetten we die basis neer op een site die iemand anders heeft gebouwd. Teken je voor een jaar, dan bouwen we hem
              zelf, zonder bouwkosten. Een site die wij bouwen, kunnen we vanaf de eerste dag meten.
            </p>
          </div>
        </div>
      </section>

      {/* Wat je krijgt */}
      <section className="bg-surface px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Een site die van jou is, en die meet.
          </h2>
          <Punten items={KRIJG_JE} kolommen={3} />
        </div>
      </section>

      {/* Zo werkt het */}
      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Zo werkt het, in drie stappen.
          </h2>
          <Punten items={STAPPEN} kolommen={3} />
        </div>
      </section>

      {/* Voorwaarden */}
      <section id="voorwaarden" className="scroll-mt-24 bg-surface px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
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

      {/* Gesprek en formulier */}
      <section id="gesprek" className="scroll-mt-24 px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[900px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Past het bij jouw bedrijf?
          </h2>
          <p className={`m-0 mt-6 max-w-[680px] ${tekst}`}>
            Plan een kennismaking, of laat je gegevens achter. We zeggen meteen hoeveel plekken er nog zijn
            en of je huidige site vervangen moet worden.
          </p>
          <div className="mt-8">
            <Knop cta="black_friday_gesprek_knop" />
          </div>
          <div className="mt-10">
            <ContactForm
              subject="Black Friday 2026: website erbij"
              keuzeLabel="Waar ben je naar op zoek?"
              bedrijfEnTelefoonVerplicht
              keuzes={[
                'Ik wil weten of er nog een plek is',
                'Ik wil een nieuwe site en een jaar met Stevin.AI',
                'Ik heb al een site en wil weten of die goed genoeg is',
                'Ik wil meer klanten uit mijn advertenties',
                'Iets anders',
              ]}
              messageLabel="Toelichting (mag leeg blijven)"
              messagePlaceholder="Bijvoorbeeld het adres van je huidige site, of wat je zoekt."
            />
          </div>
          <p className="m-0 mt-6 text-sm text-muted">
            Liever eerst lezen hoe we werken?{' '}
            <Link href="/tarieven" className="underline" data-cta="black_friday_tarieven">
              Bekijk de tarieven
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Geen FAQPage-schema: de pagina staat op noindex. */}
      <Vragen kop="Wat mensen ons hierover vragen" vragen={VRAGEN} schema={false} />
    </main>
  )
}
