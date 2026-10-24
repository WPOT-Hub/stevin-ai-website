import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import ContactForm from '@/components/ContactForm'
import FAQAccordion from '@/components/FAQAccordion'

type Props = { params: Promise<{ locale: string }> }

// W-663 (24 okt 2026): het Black Friday-aanbod. Wie voor 30 november tekent
// voor een jaar bureautarief krijgt de nieuwe website erbij.
//
// Bewust noindex en niet in de sitemap: dit is de bestemming voor onze eigen
// lijsten (CRM, bellijst, LinkedIn, Journal), geen zoekpagina. Keyword Planner
// gaf op 24 okt 2026 voor "black friday marketingbureau" geen volume en de
// SERP toont tips voor webshops; een dienstpagina op zo'n term verliest (REGEL 8).
//
// Prijzen en voorwaarden komen uit docs/VOORSTEL_W663_BLACK_FRIDAY_WEBSITE.md
// in Stevin-Hub (D-110, concept). Verandert Koen daar iets, dan hier ook.
// Alleen Nederlands: de Engelse site geeft sinds W-535 een 410.

const DEADLINE = '30 november 2026'

export const metadata: Metadata = {
  title: 'Black Friday bij Stevin.AI: een jaar bureau, de website erbij',
  description:
    'Teken voor 30 november 2026 voor een jaar Stevin.AI en wij bouwen je nieuwe website erbij. Op je eigen domein, op jouw naam, met de meting erin. Vijf plekken.',
  alternates: { canonical: 'https://stevin.ai/black-friday' },
  robots: { index: false, follow: true },
}

const krijgJe = [
  {
    title: "Een nieuwe website, tot vijf pagina's",
    desc: 'Home, diensten, over, contact en een pagina naar keuze. Gebouwd voor de telefoon, snel, op je eigen domein.',
  },
  {
    title: 'De meting erin',
    desc: 'GA4, server-side meting en conversies die kloppen. Je ziet vanaf de eerste dag wat elke euro oplevert.',
  },
  {
    title: 'Een formulier dat in je CRM landt',
    desc: 'Elke aanvraag komt bij jou binnen, met de bron erbij. Geen aanvragen meer die in een mailbox blijven liggen.',
  },
  {
    title: 'Teksten in overleg',
    desc: 'Jij levert de input, wij schrijven, jij keurt goed. Een correctieronde zit erin.',
  },
  {
    title: 'Op jouw naam',
    desc: 'Domein, hosting en accounts staan van jou. Stap je ooit over, dan neem je alles mee.',
  },
  {
    title: 'Het eerste jaar hosting erbij',
    desc: 'Hosting en onderhoud zijn het eerste jaar inbegrepen. Daarna 29 euro per maand, zoals voor al onze sites.',
  },
]

const stappen = [
  {
    title: 'Plan een gesprek voor 30 november',
    desc: 'We kijken naar je cijfers en je huidige site, en zeggen eerlijk of het past. Een halfuur, geen verplichting.',
  },
  {
    title: 'Je tekent voor een jaar',
    desc: 'Het bureautarief van 1.399 euro per maand bij jaarbetaling. De opstart blijft maatwerk, met de prijs vooraf.',
  },
  {
    title: 'Wij bouwen, daarna adverteren we',
    desc: 'Binnen zes weken na jouw teksten en beelden staat de site. Dan zetten we de campagnes erop.',
  },
]

const voorwaarden = [
  'Voor nieuwe klanten in Nederland en Vlaanderen die uiterlijk 30 november 2026 tekenen voor het bureautarief van 1.399 euro per maand bij jaarbetaling, exclusief btw. De opstart blijft maatwerk, met de prijs vooraf.',
  "De website: tot vijf pagina's, op je eigen domein, met de meting en een contactformulier dat in je CRM landt. Een correctieronde. Oplevering binnen zes weken nadat je teksten en beelden hebt aangeleverd.",
  "Niet inbegrepen: een webshop, een boekingssysteem, maatwerkkoppelingen, meer dan vijf pagina's, fotografie en vertalingen. Dat offreren we apart, met de prijs vooraf.",
  'Hosting en onderhoud zijn het eerste jaar inbegrepen. Daarna 29 euro per maand, plus 15 euro per maand als de server-side meting doorloopt.',
  'Vijf plekken, op volgorde van tekenen. Het traject start uiterlijk 31 januari 2027.',
  "Wat zo'n site anders kost: 1.000 tot 2.500 euro, afhankelijk van de omvang. De aanbieding is niet in te ruilen voor korting.",
]

const faqs = [
  {
    question: 'Waarom geven jullie een website weg?',
    answer:
      'Omdat elk traject bij ons toch met de basis begint: de meting, de accounts en de pagina waar je advertenties naartoe sturen. Een site die we zelf bouwen kunnen we vanaf de eerste dag meten. Dat scheelt ons werk aan het ombouwen van een site van een ander, en jou een losse opdracht.',
  },
  {
    question: 'Ik heb al een website. Wat dan?',
    answer:
      'Dan kijken we in het eerste gesprek of hij meet wat hij moet meten en of hij snel genoeg is. Is hij goed, dan hoef je hem niet te vervangen. De aanbieding is dan niet om te ruilen voor korting; de uren gaan naar de site of nergens heen.',
  },
  {
    question: 'Wat kost de opstart?',
    answer:
      'Dat hangt af van de staat van je accounts en je meting, en daarom is het maatwerk. Je hoort de prijs voordat je tekent, en hij verandert daarna niet.',
  },
  {
    question: 'Wat gebeurt er na dat jaar?',
    answer:
      'De site is van jou, op je eigen domein. Je kunt bij ons blijven voor hosting en onderhoud (29 euro per maand), of je neemt hem mee. Het bureautarief loopt door zolang jij dat wilt, en opzeggen kan per jaar.',
  },
  {
    question: 'Kan ik ook per maand betalen?',
    answer:
      'Per maand betalen kan altijd, voor 1.499 euro per maand. De website hoort bij de jaarbetaling, omdat we hem bouwen voordat de campagnes beginnen.',
  },
  {
    question: 'Geldt dit ook in Belgie?',
    answer: 'Ja, voor bedrijven in Vlaanderen net zo goed als in Nederland. De prijzen zijn exclusief btw.',
  },
  {
    question: 'Hoe weet ik of er nog een plek is?',
    answer:
      'Plan een gesprek of mail ons. We zeggen meteen hoeveel plekken er nog zijn. Vijf is het aantal dat we in december en januari zelf kunnen bouwen, en daar houden we ons aan.',
  },
]

export default async function BlackFridayPage({ params }: Props) {
  const { locale } = await params
  if (locale !== 'nl') notFound()
  setRequestLocale(locale)

  return (
    <>
      {/* HERO */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 96px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#3D8EFF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#3D8EFF] opacity-60 flex-shrink-0" aria-hidden="true" />
            BLACK FRIDAY 2026 · TOT EN MET {DEADLINE.toUpperCase()}
          </p>

          <h1
            className="font-display font-extrabold text-white leading-[1.06] tracking-[-0.03em]"
            style={{ fontWeight: 700, fontSize: 'clamp(40px, 4.6vw, 64px)', maxWidth: '18ch' }}
          >
            Een jaar Stevin.AI, en je nieuwe website <span className="text-[#3D8EFF]">krijg je erbij.</span>
          </h1>

          <p className="text-white/70 leading-[1.55] mt-8" style={{ fontSize: '20px', maxWidth: '640px' }}>
            Teken voor {DEADLINE} voor een jaar bureautarief, en wij bouwen de website waarop we gaan adverteren. Op je
            eigen domein, op jouw naam, met de meting erin. Vijf plekken, want we bouwen ze zelf in december en januari.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/kennismaking"
              data-open-kennismaking=""
              data-cta="black_friday_hero_gesprek"
              className="inline-flex items-center gap-2 bg-[#3D8EFF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:brightness-110 transition-[filter]"
            >
              Plan een gesprek
            </Link>
            <a
              href="#voorwaarden"
              data-cta="black_friday_hero_voorwaarden"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-display font-semibold text-[15px] px-7 py-3.5 rounded-lg hover:border-white/40 hover:bg-white/5 transition-colors"
            >
              Lees de voorwaarden
            </a>
          </div>

          <p className="text-white/40 text-sm mt-8">
            Voor bedrijven in Nederland en Vlaanderen. Bureautarief 1.399 euro per maand bij jaarbetaling, exclusief btw.
          </p>
        </div>
      </section>

      {/* WAAROM */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[900px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            WAAROM EEN WEBSITE
          </p>
          <h2
            className="font-display font-extrabold text-primary mb-8"
            style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' }}
          >
            Dit is geen korting. Dit is de basis, door ons gebouwd.
          </h2>
          <div className="space-y-4 text-muted text-lg leading-relaxed">
            <p>
              Advertenties sturen mensen naar een pagina. Is die pagina traag, onduidelijk of niet te meten, dan betaal
              je voor klikken die nergens heen gaan. Daarom begint elk traject bij ons met de basis: de meting, de
              accounts en de koppeling met je CRM.
            </p>
            <p>
              Meestal zetten we die basis neer op een site die iemand anders heeft gebouwd. Bij een jaar bouwen we hem
              zelf, zonder bouwkosten. Een site die wij bouwen, kunnen we vanaf de eerste dag meten.
            </p>
          </div>
        </div>
      </section>

      {/* WAT JE KRIJGT */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            WAT JE KRIJGT
          </p>
          <h2
            className="font-display font-extrabold text-primary mb-12"
            style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' }}
          >
            Een site die van jou is, en die meet.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {krijgJe.map((b) => (
              <div key={b.title} className="rounded-[14px] border border-border p-7 hover:shadow-lg transition-shadow">
                <h3 className="h-sub font-display text-primary mb-3">{b.title}</h3>
                <p className="text-muted leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZO WERKT HET */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[900px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            ZO WERKT HET
          </p>
          <h2
            className="font-display font-extrabold text-primary mb-10"
            style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' }}
          >
            Drie stappen, en in januari staat hij.
          </h2>
          <ol className="space-y-6">
            {stappen.map((s, i) => (
              <li key={s.title} className="flex gap-5 rounded-[14px] bg-white border border-border p-7">
                <span
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white font-display font-bold flex items-center justify-center"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display font-bold text-primary mb-2">{s.title}</h3>
                  <p className="text-muted leading-relaxed">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* VOORWAARDEN */}
      <section id="voorwaarden" className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[900px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            DE VOORWAARDEN, ZONDER KLEINE LETTERS
          </p>
          <h2
            className="font-display font-extrabold text-primary mb-8"
            style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' }}
          >
            Wat er precies geldt.
          </h2>
          <ul className="space-y-4">
            {voorwaarden.map((v) => (
              <li key={v} className="flex gap-4 text-muted leading-relaxed">
                <span className="mt-[10px] inline-block w-2 h-2 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GESPREK */}
      <section id="gesprek" className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[900px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            PLAN EEN GESPREK
          </p>
          <h2
            className="font-display font-extrabold text-primary mb-6"
            style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' }}
          >
            Kijk of het voor jou uitkomt.
          </h2>
          <p className="text-muted leading-relaxed mb-8 text-lg">
            Kies een moment in de agenda, of stel je vraag hieronder. We zeggen meteen hoeveel plekken er nog zijn en
            of je huidige site vervangen moet worden.
          </p>
          <div className="flex flex-wrap gap-4 mb-10">
            <Link
              href="/kennismaking"
              data-open-kennismaking=""
              data-cta="black_friday_gesprek_knop"
              className="inline-flex items-center gap-2 bg-primary text-white font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:brightness-110 transition-[filter]"
            >
              Kies een moment
            </Link>
          </div>
          <div className="rounded-[14px] border border-border bg-white p-8">
            <ContactForm subject="Black Friday 2026: website erbij" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[900px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            VEELGESTELDE VRAGEN
          </p>
          <h2
            className="font-display font-extrabold text-primary mb-10"
            style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' }}
          >
            Wat mensen ons hierover vragen.
          </h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>
    </>
  )
}
