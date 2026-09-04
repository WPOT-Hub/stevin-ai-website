import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import DeskProof from '@/components/DeskProof'
import { localizedMetadata } from '@/lib/seo'
import FAQAccordion from '@/components/FAQAccordion'

type Props = { params: Promise<{ locale: string }> }

// SEO-speerpunt uit doc 14b: "google ads uitbesteden" (1.000/mnd NL) plus
// satellieten (sea uitbesteden 720, adwords-varianten 320+320, shopping 170,
// kosten 70), samen ruim 2.500 BOFU-zoekopdrachten. Frame-kanteling per doc 14:
// de zoekterm bedienen, maar de belofte omdraaien naar uitbesteden ZONDER de
// controle en je data te verliezen. Kosten staan als SECTIE op deze pagina,
// niet als aparte URL (pricing en cost ranken 92% van de tijd samen).
const COPY = {
  nl: {
    eyebrow: 'Google Ads uitbesteden',
    h1_line: 'Google Ads uitbesteden.', h1_accent: 'Zonder de controle kwijt te raken.',
    // Antwoord in de eerste 200 woorden (GEO-eis doc 13)
    lede: 'Je wilt je Google Ads uitbesteden, maar je hebt de verhalen gehoord: accounts die op naam van het bureau staan, rapporten die niets zeggen, en een factuur waar je niets van kunt narekenen. Dat hoeft niet zo. Bij Stevin.AI beginnen we met een diagnose op jouw eigen cijfers, blijven je accounts op naam van je eigen bedrijf staan, en staat elke wijziging met datum en reden in een logboek waar je altijd in kunt kijken. Uitbesteden betekent hier dat het werk van ons is, en dat alles van jou blijft.',
    cta: 'Start de diagnose',
    cta_micro: 'Eerst de diagnose op jouw eigen data. Daarna pas een voorstel.',

    herken_eyebrow: 'Herken je dit?',
    herken_h2: 'Waarom uitbesteden vaak verkeerd voelt.',
    herken: [
      { t: 'Je account staat niet op jouw naam', d: 'Het bureau maakte het aan, dus het is van hen. Stop je, dan begin je opnieuw: geen historie, geen leerdata, geen campagnes.' },
      { t: 'Je krijgt cijfers, geen antwoord', d: 'Een rapport vol vertoningen en klikken. Maar hoeveel aanvragen er echt bij zijn gekomen weet niemand precies.' },
      { t: 'Je weet niet wat er gedaan is', d: 'De factuur komt elke maand. Wat er die maand in je account veranderd is, staat nergens.' },
      { t: 'Er zit een marge op je mediabudget', d: 'Je betaalt 2.000 euro aan advertenties, maar hoeveel daarvan Google bereikt kun je niet zien. Google publiceert wel wie er als betaler geregistreerd staat.' },
    ],
    herken_close: 'Dit zijn geen uitzonderingen. Zo werkt de markt, zolang niemand meekijkt.',

    how_eyebrow: 'Hoe wij het doen',
    how_h2: 'Eerst kijken, dan pas beheren.',
    steps: [
      { num: '01', t: 'Diagnose op je eigen account', d: 'We kijken naar wat er nu staat: telt je meting echte aanvragen, staan de accounts op jouw naam, wie staat er als betaler geregistreerd, en waar gaat budget naartoe zonder resultaat. Zwart op wit binnen twee weken, en je houdt het rapport ook als je niet verder gaat.' },
      { num: '02', t: 'Fundament goed zetten', d: 'Accounts op naam van jouw bedrijf, toegang geregeld, meting gerepareerd zodat elke aanvraag telt, en de campagnes opgeruimd. Dit gebeurt voordat er een euro extra naar advertenties gaat.' },
      { num: '03', t: 'Actief beheren, dag en nacht bekeken', d: 'Wij doen het werk: zoektermen, biedingen, advertenties, landingspaginas. Daarbovenop kijken signalen mee, ook op ons eigen werk. Valt je meting uit, dan zien wij dat dezelfde dag.' },
      { num: '04', t: 'Alles blijft van jou', d: 'Je accounts, je data, je kennis, en een dossier met elk besluit en de reden erbij. Stoppen kan altijd zonder dat je iets kwijtraakt. Wij bouwen die exit in vanaf dag een.' },
    ],

    table_eyebrow: 'Wat er verandert',
    table_h2: 'Uitbesteden zoals het hoort.',
    rows: [
      { t: 'Eigenaarschap', before: 'Het account staat op naam van het bureau.', after: 'Het account staat op naam van jouw bedrijf. Altijd.' },
      { t: 'Inzicht', before: 'Een maandrapport dat je moet vertrouwen.', after: 'Een logboek met elke wijziging, met datum en reden.' },
      { t: 'Meting', before: 'Het dashboard telt kliks en formulierstarts.', after: 'De meting telt echte aanvragen, gecontroleerd.' },
      { t: 'Mediabudget', before: 'Onbekend welk deel Google bereikt.', after: 'Geen marge op je mediabudget. Na te rekenen in het transparantieregister.' },
      { t: 'Opzeggen', before: 'Je begint bij een nieuw bureau weer bij nul.', after: 'Je neemt accounts, data en kennis mee.' },
    ],
    before_label: 'Bij veel bureaus', after_label: 'Bij Stevin.AI',

    kosten_eyebrow: 'Wat het kost',
    kosten_h2: 'Google Ads uitbesteden: de kosten.',
    kosten_body: 'Uitbesteden begint bij 1.399 euro per maand bij jaarbetaling, 1.499 bij maandbetaling. Wil je het op termijn zelf doen, dan draaien we mee tot het staat, meestal zes tot twaalf maanden, en daarna ga je over op 399 per maand. Wil je er juist nooit naar omkijken, dan blijft het doorlopend. Wat er nooit gebeurt: een percentage over je mediabudget, een marge die je niet kunt narekenen, of een instaptarief dat na drie maanden stilletjes verdubbelt.',
    kosten_punten: [
      'Vanaf 1.399 per maand, of 399 als je het zelf gaat doen',
      'Je mediabudget gaat volledig naar Google, wij pakken er niets van af',
      'De diagnose is vrijblijvend en je houdt het rapport',
      'Geen langlopend contract, opzeggen kan altijd',
    ],
    kosten_noot: 'Je advertentiebudget staat hier los van: dat betaal je rechtstreeks aan Google, vanaf je eigen account op je eigen naam.',

    faq_h2: 'Wat ondernemers ons vragen.',
    faqs: [
      { question: 'Wat kost het om Google Ads uit te besteden?', answer: 'Uitbesteden begint bij 1.399 euro per maand bij jaarbetaling. Ga je het op termijn zelf doen, dan zakt dat naar 399 zodra het staat, meestal na zes tot twaalf maanden. Daarbovenop komt je advertentiebudget, dat je rechtstreeks aan Google betaalt vanaf je eigen account. Wij pakken geen marge op je mediabudget. Wat je precies nodig hebt bepalen we na de diagnose, niet ervoor.' },
      { question: 'Blijft mijn Google Ads-account van mij?', answer: 'Ja. Het account staat op naam van jouw bedrijf, jij houdt beheerdersrechten, en je kunt de data exporteren. Als je stopt neem je de historie en de opgebouwde leerdata mee. Vraag dit bij elke partij expliciet na en laat het op papier zetten.' },
      { question: 'Hoe weet ik of mijn huidige bureau het goed doet?', answer: 'Drie dingen kun je vandaag zelf controleren. Open de wijzigingsgeschiedenis van je account en kijk wat er de afgelopen 90 dagen is gedaan. Zoek je bedrijf op in het openbare transparantieregister van Google en kijk wie er als betaler staat. En tel je aanvragen van vorige maand, en vergelijk dat met je dashboard.' },
      { question: 'Kan de diagnose naast mijn huidige bureau?', answer: 'Ja, en dat is vaak juist verstandig. Het is een tweede blik op je eigen cijfers. Staat het goed, dan weet je dat nu zeker. Staat het niet goed, dan heb je iets concreets om te bespreken.' },
      { question: 'Doen jullie ook SEA, Shopping en Microsoft Ads?', answer: 'Ja. Google Ads is meestal het zwaartepunt, maar Shopping, YouTube, Microsoft Ads en de sociale kanalen horen bij hetzelfde werk. Wat er zinvol is volgt uit de diagnose, niet uit een standaardpakket.' },
      { question: 'Hoe snel gaat het van start?', answer: 'De diagnose levert binnen twee weken een uitkomst op. Daarna gaat het fundament eerst goed staan voordat er extra budget naar campagnes gaat. Hoe lang dat duurt hangt af van wat er te repareren valt, en dat weet je na de diagnose.' },
      { question: 'Verlies ik controle als AI meekijkt?', answer: 'Nee, je krijgt er controle bij. Het platform verandert uit zichzelf niets, en beheren we je campagnes, dan gaat elk voorstel langs een mens voordat er iets verandert, en alles wat er gebeurt staat in een logboek waar jij altijd in kunt kijken.' },
    ],

    closing_l1: 'Uitbesteden hoeft geen overdracht te zijn.',
    closing_body: 'Start met de diagnose op je eigen account. Binnen twee weken weet je zwart op wit waar je staat, ook als je daarna niets met ons doet.',
  },
  en: {
    eyebrow: 'Outsourcing Google Ads',
    h1_line: 'Outsource Google Ads.', h1_accent: 'Without losing control.',
    lede: 'You want to outsource your Google Ads, but you have heard the stories: accounts registered in the agency name, reports that say nothing, and an invoice you cannot verify. It does not have to be that way. At Stevin.AI we start with a diagnosis on your own numbers, your accounts stay in your company name, and every change is logged with a date and a reason you can always look up. Outsourcing here means the work is ours and everything stays yours.',
    cta: 'Start the diagnosis',
    cta_micro: 'First the diagnosis, on your own data. Only then a proposal.',

    herken_eyebrow: 'Sound familiar?',
    herken_h2: 'Why outsourcing often feels wrong.',
    herken: [
      { t: 'Your account is not in your name', d: 'The agency created it, so they own it. If you leave, you start over: no history, no learning data, no campaigns.' },
      { t: 'You get numbers, not answers', d: 'A report full of impressions and clicks. But nobody knows exactly how many real enquiries came in.' },
      { t: 'You do not know what was done', d: 'The invoice arrives every month. What changed in your account that month is written down nowhere.' },
      { t: 'There is a margin on your media budget', d: 'You pay 2,000 euros for ads, but you cannot see how much of that reaches Google. Google does publish who is registered as the payer.' },
    ],
    herken_close: 'These are not exceptions. This is how the market works, as long as nobody is watching.',

    how_eyebrow: 'How we do it',
    how_h2: 'Look first, manage second.',
    steps: [
      { num: '01', t: 'Diagnosis on your own account', d: 'We look at what is there now: does your measurement count real enquiries, are the accounts in your name, who is registered as the payer, and where does budget go without result. In black and white within two weeks, and you keep the report even if you do not continue.' },
      { num: '02', t: 'Get the foundation right', d: 'Accounts in your company name, access arranged, measurement repaired so every enquiry counts, campaigns cleaned up. This happens before a single extra euro goes to ads.' },
      { num: '03', t: 'Active management, watched day and night', d: 'We do the work: search terms, bids, ads, landing pages. On top of that, signals watch along, including on our own work. If your measurement breaks, we see it the same day.' },
      { num: '04', t: 'Everything stays yours', d: 'Your accounts, your data, your knowledge, and a file with every decision and its reason. You can always stop without losing anything. We build that exit in from day one.' },
    ],

    table_eyebrow: 'What changes',
    table_h2: 'Outsourcing done properly.',
    rows: [
      { t: 'Ownership', before: 'The account is in the agency name.', after: 'The account is in your company name. Always.' },
      { t: 'Insight', before: 'A monthly report you have to trust.', after: 'A log with every change, with date and reason.' },
      { t: 'Measurement', before: 'The dashboard counts clicks and form starts.', after: 'Measurement counts real enquiries, verified.' },
      { t: 'Media budget', before: 'Unknown what share reaches Google.', after: 'No margin on your media budget. Verifiable in the transparency register.' },
      { t: 'Cancelling', before: 'At a new agency you start from zero again.', after: 'You take accounts, data and knowledge with you.' },
    ],
    before_label: 'At many agencies', after_label: 'At Stevin.AI',

    kosten_eyebrow: 'What it costs',
    kosten_h2: 'Outsourcing Google Ads: the costs.',
    kosten_body: 'Outsourcing starts at 1,399 euros per month on annual billing, 1,499 monthly. If you want to run it yourself later, we work alongside you until it stands, usually six to twelve months, and then you move to 399 per month. If you would rather never think about it, it simply continues. What never happens: a percentage of your media budget, a margin you cannot verify, or an entry price that quietly doubles after three months.',
    kosten_punten: [
      'From 1,399 per month, or 399 if you run it yourself',
      'Your media budget goes entirely to Google, we take none of it',
      'The diagnosis is free of obligation and you keep the report',
      'No long-term contract, you can always cancel',
    ],
    kosten_noot: 'Your ad budget is separate: you pay that directly to Google, from your own account in your own name.',

    faq_h2: 'What business owners ask us.',
    faqs: [
      { question: 'What does it cost to outsource Google Ads?', answer: 'Outsourcing starts at 1,399 euros per month on annual billing. If you take it over yourself later, that drops to 399 once it stands, usually after six to twelve months. On top of that comes your ad budget, which you pay directly to Google from your own account. We take no margin on your media budget. What you actually need is determined after the diagnosis, not before.' },
      { question: 'Does my Google Ads account stay mine?', answer: 'Yes. The account is in your company name, you keep admin rights, and you can export the data. If you leave you take the history and the accumulated learning data with you. Ask any party this explicitly and have it put in writing.' },
      { question: 'How do I know if my current agency is doing a good job?', answer: 'Three things you can check yourself today. Open your account change history and see what happened in the past 90 days. Look up your company in Google’s public transparency register and check who is listed as the payer. And count last month’s enquiries and compare that with your dashboard.' },
      { question: 'Can the diagnosis run alongside my current agency?', answer: 'Yes, and it is often sensible. It is a second opinion on your own numbers. If things are right, you now know for sure. If not, you have something concrete to discuss.' },
      { question: 'Do you also handle SEA, Shopping and Microsoft Ads?', answer: 'Yes. Google Ads is usually the centre of gravity, but Shopping, YouTube, Microsoft Ads and the social channels are part of the same work. What makes sense follows from the diagnosis, not from a standard package.' },
      { question: 'How quickly does it start?', answer: 'The diagnosis delivers an outcome within two weeks. After that the foundation is set right before extra budget goes to campaigns. How long that takes depends on what needs repairing, and you will know that after the diagnosis.' },
      { question: 'Do I lose control when AI reads along?', answer: 'No, you gain control. The platform changes nothing on its own, and if we manage your campaigns, every proposal passes a person before anything changes, and everything that happens sits in a log you can always open.' },
    ],

    closing_l1: 'Outsourcing does not have to mean handing over.',
    closing_body: 'Start with the diagnosis on your own account. Within two weeks you know in black and white where you stand, even if you do nothing with us afterwards.',
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale !== 'en'
  return localizedMetadata({
    path: '/google-ads-uitbesteden',
    locale,
    title: isNl
      ? 'Google Ads uitbesteden, alles blijft van jou'
      : 'Outsource Google Ads without losing your data and control',
    description: isNl
      ? 'Vanaf 399 per maand, accounts op je eigen naam, elke wijziging in een logboek en geen marge op je mediabudget.'
      : 'Outsource Google Ads from 399 per month, with accounts in your own name, every change logged and no margin on your media budget. First a diagnosis on your own numbers.',
  })
}

const h2Style = { fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' } as const
const eyebrowLight = 'text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]'
const dashLight = <span className="inline-block w-6 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />

export default async function GoogleAdsUitbestedenPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = locale === 'en' ? COPY.en : COPY.nl

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: c.faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 112px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {c.eyebrow}
          </p>
          <h1 className="font-display font-extrabold text-white leading-[1.06] tracking-[-0.03em]" style={{ fontWeight: 700, fontSize: 'clamp(40px, 4.6vw, 64px)', maxWidth: '20ch' }}>
            {c.h1_line} <span className="text-[#5DA3FF]">{c.h1_accent}</span>
          </h1>
          <p className="text-white/60 leading-[1.6]" style={{ fontSize: '17px', maxWidth: '620px', marginTop: '28px' }}>
            {c.lede}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-9">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors">
              {c.cta}
            </Link>
            <p className="text-white/45 text-[13.5px] m-0">{c.cta_micro}</p>
          </div>
        </div>
      </section>

      {/* Herkenning */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrowLight}>{dashLight}{c.herken_eyebrow}</p>
          <h2 className="font-display font-extrabold text-primary m-0 mb-12" style={{ ...h2Style, maxWidth: '20ch' }}>{c.herken_h2}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-[14px] overflow-hidden">
            {c.herken.map((item, i) => (
              <div key={item.t} className="bg-white p-8 lg:p-9">
                <p className="font-mono text-[11px] text-muted mb-4">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display font-bold text-primary mb-3" style={{ fontSize: '18px', letterSpacing: '-0.01em', lineHeight: '1.25' }}>{item.t}</h3>
                <p className="text-muted leading-[1.6] m-0" style={{ fontSize: '14.5px' }}>{item.d}</p>
              </div>
            ))}
          </div>
          <p className="text-primary font-display font-semibold mt-8 m-0" style={{ fontSize: '16px', maxWidth: '620px' }}>{c.herken_close}</p>
        </div>
      </section>

      {/* Hoe wij het doen */}
      <section className="bg-primary" style={{ padding: '112px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {c.how_eyebrow}
          </p>
          <h2 className="font-display font-extrabold text-white m-0 mb-12" style={{ ...h2Style, maxWidth: '18ch' }}>{c.how_h2}</h2>
          <div className="max-w-[860px]">
            {c.steps.map((item, i) => (
              <article key={item.num} className={`grid grid-cols-[56px_1fr] gap-6 py-9 ${i > 0 ? 'border-t border-white/10' : ''}`}>
                <span className="font-display font-extrabold text-accent leading-none pt-1" style={{ fontSize: '26px', letterSpacing: '-0.02em' }}>{item.num}</span>
                <div>
                  <h3 className="font-display font-bold text-white mb-2.5" style={{ fontSize: '21px', letterSpacing: '-0.02em', lineHeight: '1.2' }}>{item.t}</h3>
                  <p className="text-white/55 leading-[1.6] m-0" style={{ fontSize: '15px', maxWidth: '58ch' }}>{item.d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Voor/na */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1000px]">
          <p className={eyebrowLight}>{dashLight}{c.table_eyebrow}</p>
          <h2 className="font-display font-extrabold text-primary m-0 mb-12" style={{ ...h2Style, maxWidth: '20ch' }}>{c.table_h2}</h2>
          <div className="rounded-[14px] border border-border overflow-hidden bg-white">
            <div className="grid grid-cols-[0.7fr_1fr_1fr] border-b border-border">
              <div className="p-3 sm:p-4" aria-hidden="true" />
              <div className="p-3 sm:p-4 font-display font-bold uppercase tracking-wide text-muted" style={{ fontSize: '12px' }}>{c.before_label}</div>
              <div className="p-3 sm:p-4 font-display font-bold uppercase tracking-wide text-accent" style={{ fontSize: '12px', backgroundColor: 'rgba(93,163,255,0.06)' }}>{c.after_label}</div>
            </div>
            {c.rows.map((row, i, arr) => (
              <div key={row.t} className={`grid grid-cols-[0.7fr_1fr_1fr] ${i < arr.length - 1 ? 'border-b border-border' : ''}`}>
                <div className="p-3 sm:p-4 font-display font-semibold text-primary" style={{ fontSize: '14px' }}>{row.t}</div>
                <div className="p-3 sm:p-4 text-muted leading-[1.5]" style={{ fontSize: '13.5px' }}>{row.before}</div>
                <div className="p-3 sm:p-4 text-primary leading-[1.5]" style={{ fontSize: '13.5px', backgroundColor: 'rgba(93,163,255,0.06)' }}>{row.after}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kosten (bedient ook "google ads uitbesteden kosten") */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1000px]">
          <p className={eyebrowLight}>{dashLight}{c.kosten_eyebrow}</p>
          <h2 className="font-display font-extrabold text-primary m-0 mb-6" style={{ ...h2Style, maxWidth: '20ch' }}>{c.kosten_h2}</h2>
          <p className="text-muted leading-[1.65] mb-8" style={{ fontSize: '16px', maxWidth: '620px' }}>{c.kosten_body}</p>
          <ul className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 mb-8">
            {c.kosten_punten.map((p) => (
              <li key={p} className="flex items-start gap-3 text-primary" style={{ fontSize: '15px', lineHeight: '1.5' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-[7px]" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <p className="text-muted text-[14px] leading-[1.6] m-0 pt-6 border-t border-border" style={{ maxWidth: '620px' }}>{c.kosten_noot}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1000px]">
          <h2 className="font-display font-extrabold text-primary m-0 mb-10" style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' }}>
            {c.faq_h2}
          </h2>
          <FAQAccordion faqs={[...c.faqs]} />
        </div>
      </section>

      {/* Slot */}
      <section className="bg-primary" style={{ padding: '96px 24px 112px' }}>
        <div className="mx-auto max-w-[1200px] flex items-end justify-between gap-12 flex-col lg:flex-row">
          <h2 className="font-display font-extrabold text-white m-0" style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)', lineHeight: '1.08', letterSpacing: '-0.03em', maxWidth: '18ch' }}>
            {c.closing_l1}
          </h2>
          <div className="flex flex-col items-start lg:items-end gap-5">
            <p className="text-white/55 leading-[1.6] m-0 lg:text-right" style={{ fontSize: '15px', maxWidth: '380px' }}>{c.closing_body}</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors">
              {c.cta}
            </Link>
          </div>
        </div>
      </section>
      {/* Consent-verlies raakt je Google-meting; het advies gaat over modeled conversions. */}
      <DeskProof locale={locale} toonBrein={false} melding="consent-be" />

    </>
  )
}
