import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { localizedMetadata } from '@/lib/seo'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import FAQAccordion from '@/components/FAQAccordion'
import { Clootcrans, CLOOTCRANS_VIEWBOX } from '@/components/blog/PosterWatermark'
import { StevinOntwerp, type Ontwerp } from '@/components/stevin/StevinOntwerpen'

type Props = { params: Promise<{ locale: string }> }

// Copy inline en per taal, zodat de over-Stevin/origin-pagina zelfstandig
// NL en EN serveert zonder de grote message-bestanden te raken.
const COPY = {
  nl: {
    metaTitle: 'De naam Stevin, vernoemd naar Simon Stevin',
    metaDesc:
      'Waarom Stevin.AI is vernoemd naar Simon Stevin, de Vlaams-Nederlandse wiskundige van De Thiende, de clootcrans en de zeilwagen.',
    eyebrow: 'De naam Stevin',
    h1: 'Een idee uit Belgie, gebouwd in Breda.',
    portraitAlt: 'Portret van Simon Stevin',
    portraitCaption: 'Simon Stevin, 1548 tot 1620, wetenschapper uit de Lage Landen.',
    introSub:
      'Het eerste idee ontstond bij mijn eigen bureau in Belgie. We kwamen klanten tegen waar drie bureaus na elkaar aan de meting hadden gezeten, elk met een eigen tag erbij. Wat overbleef was dubbel gemeten verkeer in GA4 en niemand die nog kon zeggen welk getal klopte. Daar begon dit.',
    origin1:
      'Ik zocht geen nieuw systeem. Alles was er al: campagnedata, CRM, agenda, offertes, projectinformatie. Wat ontbrak was een laag eroverheen die het aan elkaar knoopte en op tijd iets zei. De juiste informatie kwam bijna altijd te laat bij de juiste persoon.',
    origin2:
      'Wat begon als een interne oplossing, werd de basis van Stevin. De verdere ontwikkeling vond plaats vanuit Breda, waar het platform werd uitgebouwd tot wat het nu is: de laag die elke dag meekijkt op je marketing en onthoudt wat er gebeurde.',
    namesakeH: 'Vernoemd naar Simon Stevin',
    namesake1:
      'De naam verwijst naar Simon Stevin, een van de belangrijkste wetenschappers uit de Lage Landen. Hij werd geboren in Brugge, in Vlaanderen, en maakte zijn naam in de Republiek, in Leiden en Den Haag. Zijn werk ging over kennis bruikbaar maken. In De Thiende uit 1585 legde hij uit hoe je met decimale breuken kon rekenen in het dagelijks werk. Hij schreef het niet voor wiskundigen, maar voor sterrenkijkers, landmeters, tapijtmeters, wijnroeiers, muntmeesters en kooplieden.',
    quote: 'Wonder en is gheen wonder.',
    quoteAttr: 'Simon Stevin, 1586',
    bridge:
      'Die gedachte past precies bij wat wij met Stevin willen bereiken. Net zoals Simon Stevin wetenschap toegankelijk maakte voor de praktijk, maken wij data, systemen en informatie bruikbaar voor dagelijkse bedrijfsbeslissingen. Niet door alles te vervangen, maar door bestaande kennis slimmer met elkaar te verbinden.',
    // W-078, 13 sep 2026: deze pagina zei "de AI-werklaag boven je bedrijf, van
    // campagne tot bouwplaats". Dat is een ander bedrijf dan de homepage verkoopt.
    // Terug naar wat het is: marketing.
    statement: 'Stevin kijkt mee op je marketing en onthoudt wat er gebeurde.',
    ziet: ['Het brengt bij elkaar wat verspreid staat.', 'Het merkt op wat ontbreekt.', 'Het stelt de volgende stap voor.'],
    problem:
      'Je marketing zit in systemen die naast elkaar bestaan: advertentieaccounts, analytics, je webshop, je aanvragen. De informatie is er vaak wel. Alleen ziet niemand hem op tijd. Daar ontstaan verspild budget en gemiste aanvragen.',
    solution:
      'Stevin legt een laag over de systemen die je al gebruikt. We vervangen niets: we lezen wat er al staat. Het platform krijgt twee dingen mee, jouw eigen cijfers en wat er buiten je bedrijf gebeurt, en signaleert op basis daarvan een volgende stap. Voorstellen dus, geen besluiten.',
    trustH: 'Jij houdt controle',
    trust:
      'Stevin stuurt niets naar buiten zonder dat een mens het heeft gezien. Geen mail, geen bericht, geen wijziging bij een klant. Ophalen, samenvatten en signaleren doet het zelf, want daar valt niets mee stuk. Bij elk advies staat op welke cijfers het rust, en wat het platform doet wordt vastgelegd.',
    broadening:
      'We zijn begonnen in marketing, omdat we het daar zelf twintig jaar hebben gedaan. Dat is ook de reden dat we de AI eromheen durfden te bouwen: je moet weten hoe het werk werkt om te zien wanneer een model ernaast zit. En om diezelfde reden zijn we voorzichtig met andere vakgebieden. Dat informatie verspreid zit is overal zo, maar wat die informatie betekent en wat een fout kost verschilt per vak. Dat leren we pas als we er echt in zitten.',
    voorbeeldH: 'Een voorbeeld',
    voorbeeld1:
      'Elke nacht haalt Stevin op wat er buiten je bedrijf gebeurt. Schoolvakanties in Nederland en Belgie, en in Duitsland per deelstaat, alle zestien. Het weer afgezet tegen het tienjarig gemiddelde voor die dag, per land, met neerslag en zonuren erbij.',
    voorbeeld2:
      'Wordt het over drie weken uitzonderlijk warm in het gebied waar je adverteert, dan is dat geen weetje. Dan is dat een reden om een campagne naar voren te halen, of juist niet. Je krijgt het als signaal, met de cijfers eronder. Wat je ermee doet, beslis jij.',
    krachtenH: 'Zichtbaar maken hoe krachten samen werken',
    krachten1: 'Simon Stevin maakte zichtbaar hoe krachten samen werken.',
    krachten2:
      'Met Stevin.AI maken wij zichtbaar hoe marketing, data en opvolging samen werken. Zodat je begrijpt wat er gebeurt en waarop je beslissingen baseert.',
    krachtenBijschrift:
      'De clootcrans, 1586. Over twee hellingen hangt een gesloten snoer van even zware bollen, op gelijke afstand. Op de lange, flauwe helling liggen er twee keer zo veel. Toch trekt die kant niet harder, want per bol is de kracht langs de helling kleiner. Het deel dat eronder hangt trekt naar beide kanten even hard en valt tegen elkaar weg. Zou het snoer uit zichzelf gaan draaien, dan draaide het eeuwig door, en dat kan niet.',
    werkEyebrow: 'Simon Stevin in de Republiek',
    werkH: 'Van Brugge naar Den Haag',
    werkIntro:
      'Stevin werd in 1548 geboren in Brugge, toen nog Habsburgse Nederlanden. In 1581 trok hij naar het noorden, naar Leiden. Daar schreef hij zich in 1583 in aan de universiteit die Willem van Oranje acht jaar eerder had gesticht, en leerde hij diens zoon Maurits kennen. Later werd hij leraar en adviseur van Maurits, die na de moord op zijn vader stadhouder was geworden. Op diens verzoek zette Stevin in 1600 in Leiden een opleiding voor ingenieurs op, en vanaf 1604 was hij kwartiermeester van het Staatse leger. Hij stierf in 1620 in Den Haag.',
    ontwerpen: [
      { naam: 'thiende', titel: 'De Thiende, 1585', tekst: 'Stevin liet zien hoe je met tienden, honderdsten en duizendsten rekent, voor kooplieden, landmeters en wijnroeiers. Een komma gebruikte hij nog niet: achter elk cijfer stond een getal in een cirkeltje dat de plaats aangaf.' },
      { naam: 'hydrostatischeParadox', titel: 'De hydrostatische paradox, 1586', tekst: 'Hoe hard water op de bodem drukt, hangt alleen af van hoe hoog het staat. Niet van de vorm van het vat en niet van hoeveel water erin zit. Stevin liet het zien lang voor Pascal, aan wie het meestal wordt toegeschreven.' },
      { naam: 'vestingbouw', titel: 'De vestingbouw, 1594', tekst: 'In De Sterctenbouwing schreef Stevin in het Nederlands hoe je een vesting bouwt: een regelmatige zeshoek met op elke hoek een bastion, zo gelegd dat elke muur vanaf een andere te verdedigen is.' },
      { naam: 'havenvinding', titel: 'De havenvinding, 1599', tekst: 'Op zee kon je je breedte meten, maar je lengte niet. Stevin combineerde de breedte met hoeveel het kompas afweek van het noorden. Samen wezen die een plek aan, zodat schepen een haven of elkaar terugvonden.' },
      { naam: 'zeilwagen', titel: 'De zeilwagen, rond 1600', tekst: 'Een wagen op vier wielen met twee zeilen. Stevin reed er met prins Maurits en zijn gasten mee over het strand, van Scheveningen naar Petten in zo\'n twee uur. Sneller dan een paard.' },
    ] as { naam: Ontwerp; titel: string; tekst: string }[],
    close1: 'Stevin verbindt data, context en actie.',
    close2:
      'Van advertentie tot aanvraag. Van meting tot besluit. Van signaal tot uitvoering.',
    payoff: 'Kennis die werkt.',
    cta: 'Start de diagnose',
    footer: 'Simon Stevin, 1548 tot 1620.',
    faqH: 'Veelgestelde vragen',
    faqs: [
      {
        question: 'Wie was Simon Stevin?',
        answer:
          'Simon Stevin (1548 tot 1620) was een Vlaams-Nederlandse wiskundige, natuurkundige en ingenieur, geboren in Brugge. Hij stond bekend om het praktisch toepasbaar maken van kennis: hij maakte het rekenen met kommagetallen en het dubbel boekhouden bruikbaar voor het dagelijks werk. Vanaf 1581 woonde en werkte hij in de Noordelijke Nederlanden, in Leiden en Den Haag, onder meer als leraar en adviseur van prins Maurits.',
      },
      {
        question: 'Waarom heet het platform Stevin?',
        answer:
          'Net zoals Simon Stevin wetenschap toegankelijk maakte voor de praktijk, maakt het platform Stevin data, systemen en informatie bruikbaar voor dagelijkse bedrijfsbeslissingen. Niet door alles te vervangen, maar door bestaande kennis slimmer met elkaar te verbinden.',
      },
      {
        question: 'Waar komt Stevin vandaan?',
        answer:
          'Het eerste idee ontstond in Belgie, bij het eigen bureau van de oprichter, bij klanten waar drie bureaus na elkaar aan de meting hadden gezeten. De verdere ontwikkeling vond plaats vanuit Breda, waar het platform werd uitgebouwd tot de laag die nu op de marketing van klanten meekijkt.',
      },
    ],
  },
  en: {
    metaTitle: 'The name Stevin, named after Simon Stevin',
    metaDesc:
      'Why Stevin.AI is named after Simon Stevin, the Flemish-Dutch mathematician behind De Thiende, the wreath of spheres and the sailing chariot.',
    eyebrow: 'The name Stevin',
    h1: 'An idea from Belgium, built in Breda.',
    portraitAlt: 'Portrait of Simon Stevin',
    portraitCaption: 'Simon Stevin, 1548 to 1620, scientist from the Low Countries.',
    introSub:
      'The first idea came from my own agency in Belgium. We kept meeting clients where three agencies in a row had worked on the measurement, each adding a tag of their own. What was left was double-counted traffic in GA4 and nobody who could still say which number was right. That is where this started.',
    origin1:
      'I was not looking for a new system. Everything was already there: campaign data, CRM, calendar, quotes, project information. What was missing was a layer on top that tied it together and spoke up in time. The right information nearly always reached the right person too late.',
    origin2:
      'What started as an internal solution became the foundation of Stevin. The platform was further developed from Breda into what it is now: the layer that watches your marketing every day and remembers what happened.',
    namesakeH: 'Named after Simon Stevin',
    namesake1:
      'The name refers to Simon Stevin, one of the most important scientists of the Low Countries. He was born in Bruges, in Flanders, and made his name in the Dutch Republic, in Leiden and The Hague. His work was about making knowledge usable. In De Thiende of 1585 he explained how to calculate with decimal fractions in everyday work. He did not write it for mathematicians but for astronomers, surveyors, cloth measurers, wine gaugers, mint masters and merchants.',
    quote: 'Wonder en is gheen wonder.',
    quoteAttr: 'Simon Stevin, 1586',
    bridge:
      'That idea fits exactly what we want to achieve with Stevin. Just as Simon Stevin made science accessible for practice, we make data, systems and information usable for everyday business decisions. Not by replacing everything, but by connecting existing knowledge more intelligently.',
    statement: 'Stevin watches your marketing and remembers what happened.',
    ziet: ['It brings together what sits apart.', 'It notices what is missing.', 'It proposes the next step.'],
    problem:
      'Your marketing sits in systems that live side by side: ad accounts, analytics, your shop, your enquiries. The information is usually there. Nobody sees it in time. That is where wasted budget and missed enquiries begin.',
    solution:
      'Stevin adds a layer over the systems you already use. We replace nothing: we read what is already there. The platform gets two things, your own numbers and what is happening outside your company, and flags a next step on that basis. Proposals, not decisions.',
    trustH: 'You stay in control',
    trust:
      'Stevin sends nothing out without a person having seen it. No email, no message, no change at a client. Collecting, summarising and flagging it does on its own, because nothing breaks there. Every recommendation states which numbers it rests on, and what the platform does is recorded.',
    broadening:
      'We started in marketing because we did the work ourselves for twenty years. That is also why we dared to build the AI around it: you have to know how the work works to see when a model is wrong. And for that same reason we are careful about other fields. Information sitting scattered is true everywhere, but what that information means and what a mistake costs differs per trade. We only learn that once we are properly in it.',
    voorbeeldH: 'An example',
    voorbeeld1:
      'Every night Stevin collects what is happening outside your company. School holidays in the Netherlands and Belgium, and in Germany per federal state, all sixteen. The weather measured against the ten-year average for that day, per country, with rainfall and hours of sun.',
    voorbeeld2:
      'If it turns unusually warm in three weeks in the area where you advertise, that is not a piece of trivia. It is a reason to bring a campaign forward, or to hold it back. You get it as a signal, with the numbers underneath. What you do with it is your call.',
    krachtenH: 'Making visible how forces work together',
    krachten1: 'Simon Stevin made visible how forces work together.',
    krachten2:
      'With Stevin.AI we make visible how marketing, data and follow-up work together. So you understand what is happening, and what you are basing your decisions on.',
    krachtenBijschrift:
      'The wreath of spheres, 1586. A closed string of equally heavy spheres hangs over two slopes, evenly spaced. The long, shallow slope carries twice as many. Even so it does not pull harder, because the force along the slope is smaller per sphere. The part hanging underneath pulls equally to both sides and cancels out. If the string started turning on its own it would turn forever, which cannot be.',
    werkEyebrow: 'Simon Stevin in the Republic',
    werkH: 'From Bruges to The Hague',
    werkIntro:
      'Stevin was born in Bruges in 1548, then part of the Habsburg Netherlands. In 1581 he moved north to Leiden. There, in 1583, he enrolled at the university William of Orange had founded eight years earlier, and met William\'s son Maurice. He later became tutor and adviser to Maurice, who had become stadtholder after his father\'s murder. At Maurice\'s request Stevin set up a course for engineers in Leiden in 1600, and from 1604 he was quartermaster of the States Army. He died in The Hague in 1620.',
    ontwerpen: [
      { naam: 'thiende', titel: 'De Thiende (The Tenth), 1585', tekst: 'Stevin showed how to calculate with tenths, hundredths and thousandths, for merchants, surveyors and wine gaugers. He did not use a decimal point yet: after each digit he put a number in a small circle to mark its place.' },
      { naam: 'hydrostatischeParadox', titel: 'The hydrostatic paradox, 1586', tekst: 'How hard water presses on the bottom depends only on how high it stands. Not on the shape of the vessel, and not on how much water is in it. Stevin showed this long before Pascal, who usually gets the credit.' },
      { naam: 'vestingbouw', titel: 'Fortification, 1594', tekst: 'In De Sterctenbouwing Stevin explained, in Dutch, how to build a fortress: a regular hexagon with a bastion on every corner, laid out so that every wall can be defended from another.' },
      { naam: 'havenvinding', titel: 'Haven finding, 1599', tekst: 'At sea you could measure your latitude, but not your longitude. Stevin combined latitude with how far the compass deviated from north. Together they pointed to one place, so ships could find a harbour or each other.' },
      { naam: 'zeilwagen', titel: 'The sailing chariot, around 1600', tekst: 'A wagon on four wheels with two sails. Stevin drove it along the beach with Prince Maurice and his guests, from Scheveningen to Petten in about two hours. Faster than a horse.' },
    ] as { naam: Ontwerp; titel: string; tekst: string }[],
    close1: 'Stevin connects data, context and action.',
    close2:
      'From ad to enquiry. From measurement to decision. From signal to execution.',
    payoff: 'Knowledge that works.',
    cta: 'Start the diagnosis',
    footer: 'Simon Stevin, 1548 to 1620.',
    faqH: 'Frequently asked questions',
    faqs: [
      {
        question: 'Who was Simon Stevin?',
        answer:
          'Simon Stevin (1548 to 1620) was a Flemish-Dutch mathematician, physicist and engineer, born in Bruges. He was known for making knowledge practical: he made decimal arithmetic and double-entry bookkeeping usable in everyday work. From 1581 he lived and worked in the northern Netherlands, in Leiden and The Hague, among other things as tutor and adviser to Prince Maurice.',
      },
      {
        question: 'Why is the platform named Stevin?',
        answer:
          'Just as Simon Stevin made science accessible for practice, the Stevin platform makes data, systems and information usable for everyday business decisions. Not by replacing everything, but by connecting existing knowledge more intelligently.',
      },
      {
        question: 'Where does Stevin come from?',
        answer:
          'The first idea was born in Belgium, at the founder’s own agency, with clients where three agencies in a row had worked on the measurement. The platform was further developed from Breda into the layer that now watches the marketing of clients.',
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
            style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)', paddingTop: '24px' }}
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
            style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)', lineHeight: '1.08', maxWidth: '640px' }}
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

          <div style={{ marginTop: '56px', paddingTop: '40px', borderTop: '1px solid var(--border)' }}>
            <p
              className="font-display font-bold text-[#0A1628] tracking-[-0.01em]"
              style={{ fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '18px' }}
            >
              {c.voorbeeldH}
            </p>
            <p className="font-body text-[#2A3A54] leading-[1.7] text-wrap-pretty" style={{ fontSize: '18px', marginBottom: '18px' }}>
              {c.voorbeeld1}
            </p>
            <p className="font-body text-[#2A3A54] leading-[1.7] text-wrap-pretty" style={{ fontSize: '18px' }}>
              {c.voorbeeld2}
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTIE: KRACHTEN SAMEN (wit, met de clootcrans) ── */}
      <section className="bg-white" style={{ padding: '112px 24px' }}>
        <div className="mx-auto max-w-[1120px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <figure className="lg:col-span-5 m-0">
              <svg
                viewBox={CLOOTCRANS_VIEWBOX}
                role="img"
                aria-label={c.krachtenH}
                style={{ width: '100%', maxWidth: '340px', height: 'auto', opacity: 0.62 }}
              >
                <Clootcrans kleur="var(--navy)" strook={1.5} />
              </svg>
            </figure>

            <div className="lg:col-span-6 lg:col-start-7">
              <p
                className="font-display font-extrabold text-[#0A1628] tracking-[-0.02em] text-wrap-balance"
                style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.15, marginBottom: '24px' }}
              >
                {c.krachten1}
              </p>
              <p
                className="font-body text-[#2A3A54] leading-[1.7] text-wrap-pretty"
                style={{ fontSize: '19px', maxWidth: '520px', marginBottom: '28px' }}
              >
                {c.krachten2}
              </p>
              <p
                className="font-body text-[#5A6B85] leading-[1.6]"
                style={{ fontSize: '13px', maxWidth: '520px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}
              >
                {c.krachtenBijschrift}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTIE: STEVIN IN DE REPUBLIEK (W-461: geschiedenis en zijn andere ontwerpen) ── */}
      <section className="bg-white" style={{ padding: '0 24px 112px' }}>
        <div className="mx-auto max-w-[1120px]">
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '72px' }}>
            <p
              className="font-display font-bold uppercase text-[#3C8EFF]"
              style={{ fontSize: '13px', letterSpacing: '0.12em', marginBottom: '12px' }}
            >
              {c.werkEyebrow}
            </p>
            <h2
              className="font-display font-extrabold text-[#0A1628] tracking-[-0.02em] text-wrap-balance"
              style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.15, marginBottom: '20px' }}
            >
              {c.werkH}
            </h2>
            <p
              className="font-body text-[#2A3A54] leading-[1.7] text-wrap-pretty"
              style={{ fontSize: '18px', maxWidth: '760px', marginBottom: '40px' }}
            >
              {c.werkIntro}
            </p>
          </div>
          {c.ontwerpen.map((o) => (
            <div
              key={o.naam}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              style={{ padding: '36px 0', borderTop: '1px solid var(--border)' }}
            >
              <figure className="lg:col-span-5 m-0" style={{ maxWidth: '360px', opacity: 0.62 }}>
                <StevinOntwerp naam={o.naam} label={o.titel} kleur="var(--navy)" />
              </figure>
              <div className="lg:col-span-6 lg:col-start-7">
                <h3
                  className="font-display font-bold text-[#0A1628]"
                  style={{ fontSize: '22px', lineHeight: 1.25, marginBottom: '10px' }}
                >
                  {o.titel}
                </h3>
                <p className="font-body text-[#2A3A54] leading-[1.7] text-wrap-pretty" style={{ fontSize: '17px', maxWidth: '520px' }}>
                  {o.tekst}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTIE: VEELGESTELDE VRAGEN ── */}
      <section className="bg-surface" style={{ paddingTop: '96px', paddingBottom: '112px' }}>
        <div className="mx-auto max-w-3xl px-6">
          <h2
            className="font-display font-extrabold text-primary tracking-[-0.02em] text-center"
            style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)', marginBottom: '40px' }}
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
