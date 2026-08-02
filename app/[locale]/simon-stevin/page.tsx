import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { localizedMetadata } from '@/lib/seo'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import FAQAccordion from '@/components/FAQAccordion'

type Props = { params: Promise<{ locale: string }> }

// Copy inline en per taal, zodat de over-Stevin/origin-pagina zelfstandig
// NL en EN serveert zonder de grote message-bestanden te raken.
const COPY = {
  nl: {
    metaTitle: 'De naam Stevin, vernoemd naar Simon Stevin',
    metaDesc:
      'Stevin dankt zijn naam aan oorsprong, ambitie en geschiedenis. Een idee uit Belgie, gebouwd in Breda, vernoemd naar wetenschapper Simon Stevin.',
    eyebrow: 'De naam Stevin',
    h1: 'Een idee uit Belgie, gebouwd in Breda.',
    portraitAlt: 'Portret van Simon Stevin',
    portraitCaption: 'Simon Stevin, 1548 tot 1620, wetenschapper uit de Lage Landen.',
    introSub:
      'Stevin dankt zijn naam aan een combinatie van oorsprong, ambitie en geschiedenis. Het eerste idee ontstond in Belgie, bij mijn eigen bureau, op zoek naar een slimmere manier om processen, systemen en data met elkaar te verbinden.',
    origin1:
      'Als oprichter was ik op zoek naar een slimme manier om processen binnen ons eigen bureau beter te organiseren. We werkten met verschillende systemen, veel informatie en steeds meer data, maar er ontbrak een laag die alles met elkaar verbond en actief meedacht.',
    origin2:
      'Wat begon als een interne oplossing, werd de basis van Stevin. De verdere ontwikkeling vond plaats vanuit Breda, waar het platform werd uitgebouwd tot een bredere AI-oplossing voor bedrijven.',
    namesakeH: 'Vernoemd naar Simon Stevin',
    namesake1:
      'De naam verwijst naar Simon Stevin, een van de belangrijkste wetenschappers uit de Lage Landen. Hij werd geboren in Brugge, Belgie, en groeide uit tot een invloedrijke denker in Nederland. Zijn werk stond bekend om het praktisch toepasbaar maken van kennis. Hij maakte zelfs het rekenen met kommagetallen en het boekhouden bruikbaar voor de praktijk, en gaf zo abstracte wiskunde een plek in het dagelijks werk.',
    quote: 'Wonder en is gheen wonder.',
    quoteAttr: 'Simon Stevin, 1586',
    bridge:
      'Die gedachte past precies bij wat wij met Stevin willen bereiken. Net zoals Simon Stevin wetenschap toegankelijk maakte voor de praktijk, maken wij data, systemen en informatie bruikbaar voor dagelijkse bedrijfsbeslissingen. Niet door alles te vervangen, maar door bestaande kennis slimmer met elkaar te verbinden.',
    statement: 'Stevin is de AI-werklaag boven je bedrijf.',
    ziet: ['Het ziet wat er speelt.', 'Het ziet wat ontbreekt.', 'Het ziet wat nu moet gebeuren.'],
    problem:
      'Elk bedrijf werkt met systemen die naast elkaar bestaan. Mail, WhatsApp, agenda, CRM, boekhouding, planning, offertes en projectdata. De informatie is er vaak wel. Alleen komt die te laat bij de juiste persoon. Daar ontstaan fouten, vertragingen en gemiste kansen.',
    solution:
      'Stevin legt een slimme laag over de systemen die je al gebruikt. We vervangen niets. We koppelen wat er al staat. Stevin begrijpt de context, herkent signalen en stelt acties voor voordat kleine problemen groot worden.',
    trustH: 'Jij houdt controle',
    trust:
      'Een actie met impact gaat langs een mens. Elk advies toont waar het op gebaseerd is. Alles wordt gelogd. Zo kan AI meewerken zonder dat je grip verliest.',
    broadening:
      'We zijn begonnen in marketing. Daar kennen we de praktijk en daar ligt het eerste bewijs. Maar Stevin is niet alleen marketing. Dezelfde motor is gemaakt om net zo goed te werken voor bouw, techniek, installatie, onderhoud en finance. Overal waar informatie verspreid zit, beslissingen blijven liggen en opvolging beter kan.',
    close1: 'Stevin verbindt data, context en actie.',
    close2:
      'Van campagne tot bouwplaats. Van aanvraag tot offerte. Van planning tot factuur. Van signaal tot uitvoering.',
    payoff: 'Kennis die werkt.',
    cta: 'Plan een kennismaking',
    footer: 'Simon Stevin, 1548 tot 1620.',
    faqH: 'Veelgestelde vragen',
    faqs: [
      {
        question: 'Wie was Simon Stevin?',
        answer:
          'Simon Stevin (1548 tot 1620) was een Vlaams-Nederlandse wiskundige, natuurkundige en ingenieur, geboren in Brugge. Hij stond bekend om het praktisch toepasbaar maken van kennis: hij maakte het rekenen met kommagetallen en het dubbel boekhouden bruikbaar voor het dagelijks werk.',
      },
      {
        question: 'Waarom heet het platform Stevin?',
        answer:
          'Net zoals Simon Stevin wetenschap toegankelijk maakte voor de praktijk, maakt het platform Stevin data, systemen en informatie bruikbaar voor dagelijkse bedrijfsbeslissingen. Niet door alles te vervangen, maar door bestaande kennis slimmer met elkaar te verbinden.',
      },
      {
        question: 'Waar komt Stevin vandaan?',
        answer:
          'Het eerste idee ontstond in Belgie, bij het eigen bureau van de oprichter, op zoek naar een slimmere manier om processen, systemen en data te verbinden. De verdere ontwikkeling vond plaats vanuit Breda, waar het platform werd uitgebouwd tot een bredere AI-oplossing voor bedrijven.',
      },
    ],
  },
  en: {
    metaTitle: 'The name Stevin, named after Simon Stevin',
    metaDesc:
      'Stevin combines origin, ambition and history. An idea from Belgium, built in Breda, named after scientist Simon Stevin.',
    eyebrow: 'The name Stevin',
    h1: 'An idea from Belgium, built in Breda.',
    portraitAlt: 'Portrait of Simon Stevin',
    portraitCaption: 'Simon Stevin, 1548 to 1620, scientist from the Low Countries.',
    introSub:
      'The name Stevin combines origin, ambition and history. The first idea was born in Belgium, at my own agency, while looking for a smarter way to connect processes, systems and data.',
    origin1:
      'As a founder, I was looking for a smart way to better organise the processes inside our own agency. We worked with different systems, a lot of information and ever more data, but a layer was missing that tied everything together and actively thought along.',
    origin2:
      'What started as an internal solution became the foundation of Stevin. The platform was further developed from Breda and grew into a broader AI solution for businesses.',
    namesakeH: 'Named after Simon Stevin',
    namesake1:
      'The name refers to Simon Stevin, one of the most important scientists of the Low Countries. He was born in Bruges, Belgium, and became an influential thinker in the Netherlands. His work was known for making knowledge practical. He even made decimal arithmetic and bookkeeping usable in everyday practice, giving abstract mathematics a place in daily work.',
    quote: 'Wonder en is gheen wonder.',
    quoteAttr: 'Simon Stevin, 1586',
    bridge:
      'That idea fits exactly what we want to achieve with Stevin. Just as Simon Stevin made science accessible for practice, we make data, systems and information usable for everyday business decisions. Not by replacing everything, but by connecting existing knowledge more intelligently.',
    statement: 'Stevin is the AI work layer on top of your business.',
    ziet: ['It sees what is going on.', 'It sees what is missing.', 'It sees what needs to happen now.'],
    problem:
      'Every business runs on systems that sit side by side. Email, WhatsApp, calendar, CRM, accounting, planning, quotes and project data. The information is usually there. It just reaches the right person too late. That is where mistakes, delays and missed chances begin.',
    solution:
      'Stevin adds a smart layer over the systems you already use. We replace nothing. We connect what is already there. Stevin understands the context, recognises signals and proposes actions before small problems become big ones.',
    trustH: 'You stay in control',
    trust:
      'Any action with impact passes by a human. Every recommendation shows what it is based on. Everything is logged. That way AI can do the work without you losing your grip.',
    broadening:
      'We started in marketing. That is where we know the practice and where the first proof lies. But Stevin is not only marketing. The same engine is built to work just as well for construction, engineering, installation, maintenance and finance. Anywhere information is scattered, decisions get stuck and follow-up can be better.',
    close1: 'Stevin connects data, context and action.',
    close2:
      'From campaign to construction site. From request to quote. From planning to invoice. From signal to execution.',
    payoff: 'Knowledge that works.',
    cta: 'Plan an introduction',
    footer: 'Simon Stevin, 1548 to 1620.',
    faqH: 'Frequently asked questions',
    faqs: [
      {
        question: 'Who was Simon Stevin?',
        answer:
          'Simon Stevin (1548 to 1620) was a Flemish-Dutch mathematician, physicist and engineer, born in Bruges. He was known for making knowledge practical: he made decimal arithmetic and double-entry bookkeeping usable in everyday work.',
      },
      {
        question: 'Why is the platform named Stevin?',
        answer:
          'Just as Simon Stevin made science accessible for practice, the Stevin platform makes data, systems and information usable for everyday business decisions. Not by replacing everything, but by connecting existing knowledge more intelligently.',
      },
      {
        question: 'Where does Stevin come from?',
        answer:
          'The first idea was born in Belgium, at the founder’s own agency, while looking for a smarter way to connect processes, systems and data. The platform was further developed from Breda into a broader AI solution for businesses.',
      },
    ],
  },
} as const

function pick(locale: string) {
  return locale === 'en' ? COPY.en : COPY.nl
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const c = pick(locale)
  return localizedMetadata({
    path: '/simon-stevin',
    locale,
    title: c.metaTitle,
    description: c.metaDesc,
  })
}

export default async function SimonStevinPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = pick(locale)
  const isEn = locale === 'en'

  // Entity-schema: koppelt het merk Stevin aan de historische persoon Simon
  // Stevin (Wikipedia nl+en + Wikidata Q23696), zodat Google en LLMs de
  // naamsoorsprong als 1 herkenbare entiteit zien. Person -> AboutPage ->
  // #organization. FAQPage matcht de zichtbare FAQ onderaan de pagina.
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://stevin.ai/simon-stevin#person',
        name: 'Simon Stevin',
        birthDate: '1548',
        deathDate: '1620',
        birthPlace: { '@type': 'Place', name: 'Brugge' },
        description: isEn
          ? 'Flemish-Dutch mathematician, physicist and engineer (1548 to 1620), known for making decimal fractions and double-entry bookkeeping usable in everyday practice.'
          : 'Vlaams-Nederlandse wiskundige, natuurkundige en ingenieur (1548 tot 1620), bekend om het praktisch bruikbaar maken van kommagetallen en dubbel boekhouden.',
        sameAs: [
          'https://en.wikipedia.org/wiki/Simon_Stevin',
          'https://nl.wikipedia.org/wiki/Simon_Stevin',
          'https://www.wikidata.org/wiki/Q23696',
        ],
      },
      {
        '@type': 'AboutPage',
        '@id': 'https://stevin.ai/simon-stevin#webpage',
        url: 'https://stevin.ai/simon-stevin',
        name: c.metaTitle,
        description: c.metaDesc,
        inLanguage: isEn ? 'en' : 'nl-NL',
        mainEntity: { '@id': 'https://stevin.ai/simon-stevin#person' },
        about: [
          { '@id': 'https://stevin.ai/simon-stevin#person' },
          { '@id': 'https://stevin.ai/#organization' },
        ],
        isPartOf: { '@id': 'https://stevin.ai/#website' },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://stevin.ai/simon-stevin#faq',
        mainEntity: c.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* ── SECTIE 1: NAVY HERO ── */}
      <section className="bg-primary" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1120px]">
          <p className="text-white/55 font-display font-semibold text-[12px] tracking-[0.08em] uppercase mb-6">
            {c.eyebrow}
          </p>
          <h1
            className="font-display font-extrabold text-white leading-[1.05] tracking-[-0.03em] text-wrap-balance"
            style={{ fontWeight: 700, fontSize: 'clamp(40px, 4.6vw, 64px)', maxWidth: '900px', marginBottom: '72px' }}
          >
            {c.h1}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <figure className="lg:col-span-5 m-0">
              <div
                className="overflow-hidden"
                style={{
                  aspectRatio: '3 / 4',
                  maxWidth: '380px',
                  width: '100%',
                  background: 'linear-gradient(180deg, #0D1B30 0%, #08121F 100%)',
                  border: '1px solid rgba(255,255,255,.12)',
                }}
              >
                <Image
                  src="/simon-stevin-lineart.png"
                  alt={c.portraitAlt}
                  width={380}
                  height={507}
                  className="w-full h-full object-cover block"
                  style={{ filter: 'grayscale(1) contrast(1.02)', opacity: 0.92 }}
                  priority
                />
              </div>
              <figcaption
                className="font-body font-medium text-white/55 uppercase leading-[1.5]"
                style={{ fontSize: '11px', letterSpacing: '0.08em', maxWidth: '380px', marginTop: '16px' }}
              >
                {c.portraitCaption}
              </figcaption>
            </figure>

            <p
              className="lg:col-span-6 lg:col-start-7 font-body text-white/78 leading-[1.55] text-wrap-pretty"
              style={{ fontSize: '20px', maxWidth: '520px' }}
            >
              {c.introSub}
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTIE 2: ORIGIN + NAAMGEVER (wit) ── */}
      <section className="bg-white" style={{ paddingTop: '128px', paddingBottom: '40px' }}>
        <div className="mx-auto max-w-[680px] px-6 space-y-7">
          <p className="font-body text-[#2A3A54] leading-[1.7] text-wrap-pretty" style={{ fontSize: '18px' }}>
            {c.origin1}
          </p>
          <p className="font-body text-[#2A3A54] leading-[1.7] text-wrap-pretty" style={{ fontSize: '18px' }}>
            {c.origin2}
          </p>
          <h2
            className="font-display font-extrabold text-primary tracking-[-0.02em]"
            style={{ fontWeight: 600, fontSize: 'clamp(28px, 2.6vw, 34px)', paddingTop: '24px' }}
          >
            {c.namesakeH}
          </h2>
          <p className="font-body text-[#2A3A54] leading-[1.7] text-wrap-pretty" style={{ fontSize: '18px' }}>
            {c.namesake1}
          </p>
        </div>

        {/* Full-bleed quote */}
        <div className="text-center" style={{ background: '#F7F9FC', padding: '112px 24px', margin: '72px 0' }}>
          <blockquote
            className="font-display font-semibold italic text-primary text-wrap-balance mx-auto"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              maxWidth: '780px',
              marginBottom: '32px',
            }}
          >
            &ldquo;{c.quote}&rdquo;
          </blockquote>
          <p className="font-body italic text-muted" style={{ fontSize: '14px' }}>
            {c.quoteAttr}
          </p>
        </div>

        <div className="mx-auto max-w-[680px] px-6">
          <p className="font-body text-[#2A3A54] leading-[1.7] text-wrap-pretty" style={{ fontSize: '18px' }}>
            {c.bridge}
          </p>
        </div>
      </section>

      {/* ── SECTIE 3: WAT STEVIN IS (positionering) ── */}
      <section className="bg-surface" style={{ paddingTop: '112px', paddingBottom: '112px' }}>
        <div className="mx-auto max-w-[820px] px-6 text-center">
          <h2
            className="font-display font-extrabold text-primary tracking-[-0.03em] text-wrap-balance mx-auto"
            style={{ fontWeight: 600, fontSize: 'clamp(28px, 2.6vw, 34px)', lineHeight: '1.15', maxWidth: '640px' }}
          >
            {c.statement}
          </h2>
          <div className="mt-10 flex flex-col items-center gap-2.5">
            {c.ziet.map((line) => (
              <p
                key={line}
                className="font-display font-semibold text-accent"
                style={{ fontSize: 'clamp(18px, 2.2vw, 24px)' }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-[680px] px-6 mt-16 space-y-7">
          <p className="font-body text-[#2A3A54] leading-[1.7] text-wrap-pretty" style={{ fontSize: '18px' }}>
            {c.problem}
          </p>
          <p className="font-body text-[#2A3A54] leading-[1.7] text-wrap-pretty" style={{ fontSize: '18px' }}>
            {c.solution}
          </p>
          <h3
            className="font-display font-bold text-primary tracking-[-0.01em]"
            style={{ fontSize: 'clamp(20px, 2.4vw, 26px)', paddingTop: '16px' }}
          >
            {c.trustH}
          </h3>
          <p className="font-body text-[#2A3A54] leading-[1.7] text-wrap-pretty" style={{ fontSize: '18px' }}>
            {c.trust}
          </p>
          <p className="font-body text-[#2A3A54] leading-[1.7] text-wrap-pretty" style={{ fontSize: '18px' }}>
            {c.broadening}
          </p>
        </div>

        <div className="mx-auto max-w-3xl px-6" style={{ marginTop: '80px' }}>
          <h2
            className="font-display font-extrabold text-primary tracking-[-0.02em] text-center"
            style={{ fontWeight: 600, fontSize: 'clamp(28px, 2.6vw, 34px)', marginBottom: '40px' }}
          >
            {c.faqH}
          </h2>
          <FAQAccordion faqs={c.faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
        </div>
      </section>

      {/* ── SECTIE 4: NAVY CLOSE ── */}
      <section className="bg-primary text-center" style={{ padding: '112px 24px' }}>
        <div className="mx-auto max-w-[880px]">
          <p
            className="font-display font-bold text-white/90 text-wrap-balance mx-auto"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: '1.3', maxWidth: '640px', marginBottom: '20px' }}
          >
            {c.close1}
          </p>
          <p
            className="font-body text-white/55 text-wrap-pretty mx-auto"
            style={{ fontSize: '17px', lineHeight: '1.7', maxWidth: '560px', marginBottom: '40px' }}
          >
            {c.close2}
          </p>
          <p
            className="font-display font-extrabold text-white tracking-[-0.03em]"
            style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: '1.05', marginBottom: '48px' }}
          >
            {c.payoff}
          </p>
          <Link
            href="/contact"
            className="inline-block font-display font-bold text-white rounded-[10px] transition-colors hover:bg-accent-dark"
            style={{ background: '#3D8EFF', fontSize: '16px', padding: '18px 28px' }}
          >
            {c.cta}
          </Link>
          <p
            className="font-body italic"
            style={{ fontSize: '12px', color: 'rgba(255,255,255,.5)', letterSpacing: '0.02em', marginTop: '32px' }}
          >
            {c.footer}
          </p>
        </div>
      </section>
    </>
  )
}
