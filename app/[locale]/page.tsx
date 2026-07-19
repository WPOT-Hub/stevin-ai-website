import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import FAQAccordion from '@/components/FAQAccordion'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import MarketingMemoryDemo from '@/components/MarketingMemoryDemo'
import StevinBrainVisual from '@/components/StevinBrainVisual'
import BrainEdgeStrip from '@/components/BrainEdgeStrip'
import HeroHeadline from '@/components/HeroHeadline'
import { editorials } from '@/data/articles'

type Props = { params: Promise<{ locale: string }> }

// Homepage-copy voor de positionering van 19 jul 2026 (docs/research/
// website-positionering-2026-07 in Stevin-Hub). Inline per taal, zelfde
// patroon als eerdere iteraties: makkelijk itereren zonder de brede
// marketing-i18n te raken.
const COPY = {
  nl: {
    eyebrow: 'Voor bedrijven die betalen voor marketing',
    hero_sub_1: 'Stevin zet je marketing goed en let er dag en nacht op. En alles blijft van jou: ',
    hero_sub_bold: 'je accounts, je data, je kennis.',
    cta_primary: 'Start de diagnose',
    cta_secondary: 'Kijk zelf mee',
    cta_micro: 'Eerst de diagnose op jouw eigen data. Daarna pas een voorstel.',
    chips: ['1.598+ gescande adverteerders', 'Signalen, dag en nacht'],
    connectors_label: 'Leest mee op al je kanalen',

    herken_eyebrow: 'Herken je dit?',
    herken_h2: 'Zes zinnen die wij elke week horen.',
    quotes: [
      { q: 'Elke maand een factuur van het bureau. Maar wat ze nou precies gedaan hebben? Geen idee.', a: 'Eigenaar, handelsbedrijf' },
      { q: '1.100 euro aan gekochte leads. Nul opdrachten.', a: 'Installatiebedrijf' },
      { q: 'Het rapport staat vol marketingpraat. Ik wil gewoon weten waar mijn geld heengaat.', a: 'Directeur, retail' },
      { q: 'Onze marketeer is weg. Alles zat in zijn hoofd.', a: 'Evenementenbedrijf' },
      { q: 'Wij starten soms nog te veel in het donker aan een campagne.', a: 'Creatief directeur, reclamebureau' },
      { q: 'De mediapartner heeft zijn eigen winkel, en wij de onze.', a: 'Creatief directeur, reclamebureau' },
    ],
    herken_close: 'Dit zijn geen uitzonderingen. Zo werkt de markt, zolang niemand meekijkt. Zelfs bureaus zeggen het zelf.',
    herken_bron: 'Uit echte diagnosegesprekken, geanonimiseerd.',

    checks_eyebrow: 'Kijk zelf mee',
    checks_h2: 'Vertrouw ons niet op ons woord.',
    checks_sub: 'Je kunt vandaag zelf controleren hoe jouw marketing ervoor staat. Drie checks. De meeste ondernemers hebben ze nog nooit gedaan, omdat bijna niemand weet dat het kan.',
    checks: [
      { t: 'Wie betaalt jouw advertenties?', d: 'Google zet het gewoon openbaar online. Zoek je bedrijf op in het transparantieregister.', r: 'Staat daar een andere naam dan de jouwe?' },
      { t: 'Wist je dat je advertentie-account een logboek heeft?', d: 'Elke wijziging staat erin, met datum en gebruiker. Open het en kijk wat er de afgelopen 90 dagen echt is gedaan.', r: 'De meeste eigenaren hebben het nog nooit geopend.' },
      { t: 'Klopt je meting?', d: 'Tel je aanvragen van vorige maand. Staat hetzelfde aantal in je dashboard?', r: 'Vaak niet. En dan stuurt iedereen op de verkeerde cijfers.' },
    ],
    fig_label: 'fig. 01',
    fig_title: 'logboek van een advertentie-account',
    fig_before: 'Voor: 12 maanden onder een bureau',
    fig_after: 'Na: een maand onder Stevin',
    fig_before_ticks: ['JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEC'],
    fig_after_ticks: ['W1', 'W2', 'W3', 'W4'],
    fig_caption: 'Geanonimiseerd voorbeeld uit een echte diagnose. Elke wijziging die wij doen staat in ditzelfde logboek, en jij kijkt altijd mee.',
    checks_cta: 'Wij lopen deze checks met je door',

    how_eyebrow: 'Hoe het werkt',
    how_h2: 'Eerst bewijzen, dan pas beheren.',
    how_link: 'Bekijk de volledige werkwijze',
    steps: [
      {
        num: '01', kop: 'Diagnose', t: 'Zwart op wit waar je staat',
        d: 'We beginnen niet met een contract, maar met jouw data. Je ziet zwart op wit wat er goed staat en wat niet. Vrijblijvend, en je houdt het rapport.',
        b: ['Meting: telt je dashboard echte aanvragen?', 'Accounts: staat alles op jouw naam?', 'Advertenties: wie staat er als betaler geregistreerd?'],
      },
      {
        num: '02', kop: 'Goed zetten', t: 'De basis waar elk bureau ooit "geen tijd" voor had',
        d: 'Voordat er ook maar een euro extra naar campagnes gaat, staat het fundament.',
        b: ['Accounts op jouw naam, toegang geregeld', 'Meting gerepareerd: elke aanvraag telt', 'Campagnes opgeruimd, verspilling eruit'],
      },
      {
        num: '03', kop: 'Erop letten', t: 'Signalen dag en nacht. Ook op ons eigen werk',
        d: 'Elk besluit wordt vastgelegd, en jij kijkt altijd mee in hetzelfde logboek.',
        b: ['Hittebericht op vrijdag? Campagne voor gekoelde zalen staat maandag klaar', 'Concurrent start iets nieuws? Jij hoort het eerst', 'Meting valt uit? Wij zien het dezelfde dag'],
      },
      {
        num: '04', kop: 'Alles blijft van jou', t: 'Stoppen kan altijd. Zonder iets kwijt te raken',
        d: 'Wij bouwen je exit in vanaf dag een. Daarom durven we het ook te zeggen.',
        b: ['Volledige toegang en exporteerbare data', 'Een overdraagbaar dossier met elk besluit', 'Kennis die bij je bedrijf blijft, wie er ook vertrekt'],
      },
    ],

    demo_eyebrow: 'Je marketinggeheugen',
    demo_h2: 'Typ "zomer". Kijk wat er gebeurt.',
    demo_lede: 'Alles wat er ooit gebeurde in jouw marketing blijft vindbaar. En bruikbaar.',

    who_eyebrow: 'Voor wie',
    who: [
      {
        k: 'Voor ondernemers', t: 'Je wilt er geen omkijken naar hebben, maar wel grip.',
        d: 'Wij regelen het, en jij kunt altijd controleren of het klopt. Wij bouwen je exit in vanaf dag een: je zit nergens aan vast.',
        link: 'Zo werkt managed', href: '/diensten', img: '/images/voor-ondernemers.jpg', alt: 'Team van een Stevin-klant tijdens een overleg',
      },
      {
        k: 'Voor marketingteams', t: 'Je team houdt de regie. Stevin houdt het overzicht.',
        d: 'Sneller dan je bureau, elk besluit vastgelegd, inzicht tot op de marge. En vertrekt er iemand, dan vertrekt de kennis niet mee.',
        link: 'Zo werkt het voor teams', href: '/marketing', img: '/images/voor-teams.jpg', alt: 'Marketingteam in overleg',
      },
    ],

    name_eyebrow: 'Waarom Stevin',
    name_h2: 'Vernoemd naar de ingenieur die alles goed zette.',
    name_cards: [
      { g: 'S', t: 'Simon Stevin', d: 'De ingenieur uit Brugge die wiskunde naar gewone taal bracht.' },
      { g: '■', t: 'Goed gezet', d: 'Alles gemeten, alles vastgelegd, alles controleerbaar. Vakwerk in plaats van verkooppraatjes.' },
      { g: '↓', t: 'Van jou', d: 'Kennis hoort bij de eigenaar. Jouw accounts, jouw data, jouw marketing-brein, wat er ook wisselt.' },
    ],
    name_link: 'Het hele verhaal achter de naam',
    founder_quote: 'Twintig jaar zat ik aan de andere kant van de factuur. Ik weet hoe uren en mediamarges werken, want ik heb er zelf aan verdiend. Daarom is Stevin andersom gebouwd.',
    founder_role: 'Oprichter van Stevin',
    founder_foto: 'foto volgt',

    research_eyebrow: 'Ons onderzoek',
    research_h2: 'Wij wijzen je op wat er al die tijd te zien was.',
    research_chip: 'Teller loopt door',
    research_stats: [
      { v: '1.598', l: 'Nederlandse adverteerders met een ander bedrijf als geregistreerde betaler, volgens het openbare transparantieregister van Google' },
      { v: '600+', l: 'concurrent-advertenties in beeld via Radar, doorlopend gevolgd' },
    ],
    research_bron: 'Bron: doorlopend Stevin-onderzoek, stand juli 2026. Wat dit wel en niet bewijst leggen we uit in de methode.',
    research_body: 'En dit is alleen nog maar Google. Meta, LinkedIn en TikTok tellen we hierna mee. Dit onderzoek loopt elke week door, en alles wat we vinden publiceren we met methode en al. Zo bouwen we het bewijs dat de markt anders kan.',
    research_link: 'Naar het onderzoek',

    price_eyebrow: 'Tarieven',
    price_value: 'Vanaf 399',
    price_period: 'per maand',
    price_body: 'Alles laten beheren kan ook, op maat en altijd na de diagnose. Geen verborgen marges op je mediabudget, geen instaptarief dat stiekem verdubbelt. En stoppen kan altijd, met alles wat van jou is.',

    faq_eyebrow: 'Veelgestelde vragen',
    faq_h2: 'Wat iedereen eerst wil weten.',
    faqs: [
      { question: 'Wie is eigenaar van mijn accounts en data?', answer: 'Jij. Altijd. Accounts staan op naam van jouw bedrijf, data is exporteerbaar en elk besluit staat in een dossier dat van jou is.' },
      { question: 'Wat gebeurt er als ik stop?', answer: 'Dan houd je alles: accounts, data, kennis en het volledige dossier. De overdracht zit er vanaf dag een in, dus stoppen kost je niets. Behalve ons.' },
      { question: 'Doen jullie ook de uitvoering, of alleen software?', answer: 'Allebei. De meeste klanten kiezen managed: wij richten in en beheren actief, het systeem let er dag en nacht op. Jij kunt altijd meekijken en controleren.' },
      { question: 'Kan dit naast mijn huidige bureau?', answer: 'Ja. De diagnose is juist een goede tweede blik: staat het goed, dan weet je dat nu zeker. Staat het niet goed, dan heb je iets om te bespreken.' },
      { question: 'Wat kost het?', answer: 'Vanaf 399 per maand. Alles laten beheren kan ook, op maat na de diagnose. Je weet vooraf precies wat je krijgt en wat het kost.' },
      { question: 'Wat doen jullie met AI, en is dat veilig?', answer: 'AI leest mee en signaleert, mensen beslissen. Koppelingen zijn read-only, data staat in de EU, en niets gaat de deur uit zonder dat een mens ernaar keek.' },
    ],

    closing_eyebrow: 'De volgende stap',
    closing_l1: 'Wij regelen het nu goed.',
    closing_l2: 'Alles blijft van jou.',
    closing_body: 'Start de diagnose. Binnen twee weken zie je zwart op wit hoe je marketing ervoor staat. Op jouw eigen cijfers.',
    closing_micro: 'We nemen een beperkt aantal nieuwe klanten per maand aan, omdat elke start met een volledige inrichting begint.',
  },
  en: {
    eyebrow: 'For companies that pay for marketing',
    hero_sub_1: 'Stevin sets your marketing up right and watches it day and night. And everything stays yours: ',
    hero_sub_bold: 'your accounts, your data, your knowledge.',
    cta_primary: 'Start the diagnosis',
    cta_secondary: 'See for yourself',
    cta_micro: 'First the diagnosis, on your own data. Only then a proposal.',
    chips: ['1,598+ advertisers scanned', 'Signals, day and night'],
    connectors_label: 'Reads along on all your channels',

    herken_eyebrow: 'Sound familiar?',
    herken_h2: 'Six sentences we hear every week.',
    quotes: [
      { q: 'An agency invoice every month. But what exactly did they do? No idea.', a: 'Owner, trading company' },
      { q: '1,100 euros on purchased leads. Zero jobs.', a: 'Installation company' },
      { q: 'The report is full of marketing talk. I just want to know where my money goes.', a: 'Director, retail' },
      { q: 'Our marketer left. Everything was in his head.', a: 'Events company' },
      { q: 'We still start too many campaigns in the dark.', a: 'Creative director, ad agency' },
      { q: 'The media partner runs their own shop, and we run ours.', a: 'Creative director, ad agency' },
    ],
    herken_close: 'These are not exceptions. This is how the market works, as long as nobody is watching. Even agencies say it themselves.',
    herken_bron: 'From real diagnosis conversations, anonymised.',

    checks_eyebrow: 'See for yourself',
    checks_h2: 'Do not take our word for it.',
    checks_sub: 'You can check the state of your marketing yourself, today. Three checks. Most business owners have never done them, because almost nobody knows they exist.',
    checks: [
      { t: 'Who pays for your ads?', d: 'Google publishes it openly. Look up your company in the transparency register.', r: 'Is there a name that is not yours?' },
      { t: 'Did you know your ad account keeps a change log?', d: 'Every change is in there, with date and user. Open it and see what actually happened in the past 90 days.', r: 'Most owners have never opened it.' },
      { t: 'Is your measurement right?', d: 'Count last month’s enquiries. Does your dashboard show the same number?', r: 'Often it does not. And then everyone steers on the wrong numbers.' },
    ],
    fig_label: 'fig. 01',
    fig_title: 'change log of an ad account',
    fig_before: 'Before: 12 months under an agency',
    fig_after: 'After: one month under Stevin',
    fig_before_ticks: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    fig_after_ticks: ['W1', 'W2', 'W3', 'W4'],
    fig_caption: 'Anonymised example from a real diagnosis. Every change we make lands in this same log, and you always look along.',
    checks_cta: 'We will walk these checks through with you',

    how_eyebrow: 'How it works',
    how_h2: 'Prove it first, then manage it.',
    how_link: 'See the full approach',
    steps: [
      {
        num: '01', kop: 'Diagnosis', t: 'Where you stand, in black and white',
        d: 'We do not start with a contract, we start with your data. You see in black and white what is right and what is not. No strings attached, and you keep the report.',
        b: ['Measurement: does your dashboard count real enquiries?', 'Accounts: is everything in your name?', 'Ads: who is registered as the payer?'],
      },
      {
        num: '02', kop: 'Set it right', t: 'The foundation every agency never had time for',
        d: 'Before a single extra euro goes to campaigns, the foundation is in place.',
        b: ['Accounts in your name, access arranged', 'Measurement repaired: every enquiry counts', 'Campaigns cleaned up, waste removed'],
      },
      {
        num: '03', kop: 'Watch it', t: 'Signals day and night. On our own work too',
        d: 'Every decision is recorded, and you always look along in the same log.',
        b: ['Heat warning on Friday? The campaign for cooled venues is ready Monday', 'Competitor launches something new? You hear it first', 'Measurement breaks? We see it the same day'],
      },
      {
        num: '04', kop: 'Everything stays yours', t: 'You can always stop. Without losing anything',
        d: 'We build in your exit from day one. That is why we dare to say it.',
        b: ['Full access and exportable data', 'A transferable file with every decision', 'Knowledge that stays with your company, whoever leaves'],
      },
    ],

    demo_eyebrow: 'Your marketing memory',
    demo_h2: 'Type "summer". Watch what happens.',
    demo_lede: 'Everything that ever happened in your marketing stays findable. And usable.',

    who_eyebrow: 'Who it is for',
    who: [
      {
        k: 'For business owners', t: 'You want it off your plate, but with grip.',
        d: 'We handle it, and you can always check that it is right. We build in your exit from day one: you are never locked in.',
        link: 'How managed works', href: '/diensten', img: '/images/voor-ondernemers.jpg', alt: 'Team at a Stevin client during a meeting',
      },
      {
        k: 'For marketing teams', t: 'Your team keeps the lead. Stevin keeps the overview.',
        d: 'Faster than your agency, every decision recorded, insight down to the margin. And when someone leaves, the knowledge does not leave with them.',
        link: 'How it works for teams', href: '/marketing', img: '/images/voor-teams.jpg', alt: 'Marketing team in a meeting',
      },
    ],

    name_eyebrow: 'Why Stevin',
    name_h2: 'Named after the engineer who set things right.',
    name_cards: [
      { g: 'S', t: 'Simon Stevin', d: 'The engineer from Bruges who brought mathematics into plain language.' },
      { g: '■', t: 'Set right', d: 'Everything measured, everything recorded, everything verifiable. Craftsmanship instead of sales talk.' },
      { g: '↓', t: 'Yours', d: 'Knowledge belongs to the owner. Your accounts, your data, your marketing brain, whoever comes or goes.' },
    ],
    name_link: 'The full story behind the name',
    founder_quote: 'For twenty years I sat on the other side of the invoice. I know how hours and media margins work, because I earned from them myself. That is why Stevin is built the other way around.',
    founder_role: 'Founder of Stevin',
    founder_foto: 'photo to follow',

    research_eyebrow: 'Our research',
    research_h2: 'We point you to what was there to see all along.',
    research_chip: 'Counter keeps running',
    research_stats: [
      { v: '1,598', l: 'Dutch advertisers with a different company as the registered payer, according to Google’s public transparency register' },
      { v: '600+', l: 'competitor ads in view via Radar, tracked continuously' },
    ],
    research_bron: 'Source: ongoing Stevin research, as of July 2026. What this does and does not prove is explained in the method.',
    research_body: 'And this is only Google. Meta, LinkedIn and TikTok are counted next. This research runs every week, and everything we find is published, method included. That is how we build the proof that this market can work differently.',
    research_link: 'To the research',

    price_eyebrow: 'Pricing',
    price_value: 'From 399',
    price_period: 'per month',
    price_body: 'Full management is available too, tailored and always after the diagnosis. No hidden margins on your media budget, no entry price that quietly doubles. And you can always stop, with everything that is yours.',

    faq_eyebrow: 'Frequently asked questions',
    faq_h2: 'What everyone wants to know first.',
    faqs: [
      { question: 'Who owns my accounts and data?', answer: 'You do. Always. Accounts are in your company’s name, data is exportable and every decision sits in a file that belongs to you.' },
      { question: 'What happens if I stop?', answer: 'You keep everything: accounts, data, knowledge and the full file. The handover is built in from day one, so stopping costs you nothing. Except us.' },
      { question: 'Do you do the work, or is it software only?', answer: 'Both. Most clients choose managed: we set up and actively manage, the system watches day and night. You can always look along and verify.' },
      { question: 'Can this run alongside my current agency?', answer: 'Yes. The diagnosis is a good second opinion: if things are right, you now know for sure. If they are not, you have something to discuss.' },
      { question: 'What does it cost?', answer: 'From 399 per month. Full management is available too, tailored after the diagnosis. You know exactly what you get and what it costs, upfront.' },
      { question: 'What do you do with AI, and is it safe?', answer: 'AI reads along and signals, people decide. Connections are read-only, data stays in the EU, and nothing leaves the door without a human looking at it.' },
    ],

    closing_eyebrow: 'The next step',
    closing_l1: 'We set it right now.',
    closing_l2: 'Everything stays yours.',
    closing_body: 'Start the diagnosis. Within two weeks you see in black and white where your marketing stands. On your own numbers.',
    closing_micro: 'We take on a limited number of new clients per month, because every start begins with a full setup.',
  },
} as const

// Zelfde canonical/hreflang als voorheen; extra: preview-deploys (Vercel
// preview env) mogen nooit geindexeerd worden, productie wel.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  const nlUrl = 'https://stevin.ai'
  const enUrl = 'https://stevin.ai/en'
  return {
    alternates: {
      canonical: isEn ? enUrl : nlUrl,
      languages: { 'nl-NL': nlUrl, en: enUrl, 'x-default': nlUrl },
      types: { 'application/rss+xml': 'https://stevin.ai/feed.xml' },
    },
    ...(process.env.VERCEL_ENV !== 'production' ? { robots: { index: false, follow: false } } : {}),
  }
}

const eyebrowLight = 'text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]'
const eyebrowDark = 'text-[#5DA3FF] text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]'
const dashLight = <span className="inline-block w-6 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
const dashDark = <span className="inline-block w-6 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
const h2Style = { fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' } as const

export default async function HomePage({ params }: Props) {
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
            mainEntity: c.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        <div
          className="absolute inset-y-0 right-0 z-20 hidden lg:flex items-center justify-end overflow-hidden"
          aria-hidden="true"
          style={{
            maskImage: 'linear-gradient(90deg, transparent 0%, black 26%)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 26%)',
          }}
        >
          <div className="w-[52vw] max-w-[600px] translate-x-[4%]">
            <StevinBrainVisual aspect="3:4" brand={false} claim="" ariaLabel="" locale={locale} />
          </div>
        </div>
        <div
          className="absolute inset-0 z-0"
          aria-hidden="true"
          style={{ background: 'linear-gradient(90deg, #0A1628 0%, #0A1628 30%, rgba(10,22,40,0.6) 56%, rgba(10,22,40,0) 84%)' }}
        />
        <div
          className="absolute inset-0 z-0"
          aria-hidden="true"
          style={{ background: 'linear-gradient(180deg, rgba(10,22,40,0.3) 0%, rgba(10,22,40,0) 35%, rgba(10,22,40,0.5) 100%)' }}
        />
        <div className="relative z-10 mx-auto max-w-[1200px]">

          <div className="relative">
            <div
              className="absolute inset-y-0 right-0 z-0 flex lg:hidden items-stretch justify-end overflow-hidden pointer-events-none w-[30vw] max-w-[132px]"
              aria-hidden="true"
              style={{
                maskImage:
                  'linear-gradient(90deg, transparent 0%, black 58%), linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(90deg, transparent 0%, black 58%), linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)',
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in',
              }}
            >
              <BrainEdgeStrip className="w-full h-full" />
            </div>

            {/* Eyebrow */}
            <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
              <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
              {c.eyebrow}
            </p>

            {/* H1 met kop-varianten (A default; ?kop=b/c; switcher alleen op preview) */}
            <HeroHeadline locale={locale} />

            {/* Sub */}
            <p
              className="text-white/60 leading-[1.55]"
              style={{ fontSize: '19px', maxWidth: '520px', marginTop: '32px' }}
            >
              {c.hero_sub_1}
              <strong className="text-white/85 font-semibold">{c.hero_sub_bold}</strong>
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors"
            >
              {c.cta_primary}
            </Link>
            <a
              href="#kijk-zelf-mee"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-display font-semibold text-[15px] px-7 py-3.5 rounded-lg hover:border-white/40 hover:bg-white/5 transition-colors"
            >
              {c.cta_secondary}
            </a>
          </div>

          {/* Microcopy: diagnose-eerst */}
          <p className="text-white/45 text-[13.5px] mt-5">{c.cta_micro}</p>

          {/* Proof chips */}
          <div className="flex flex-wrap gap-2.5 mt-8">
            {c.chips.map((p) => (
              <span
                key={p}
                className="text-[12px] text-white/70 border border-white/15 rounded-full px-3.5 py-1.5 leading-none"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── KANALEN ── */}
      <div className="bg-white border-y border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-8">
          <p className="text-[11px] font-display font-bold text-muted uppercase tracking-[0.08em] text-center mb-5">
            {c.connectors_label}
          </p>
          <div className="flex items-center justify-center gap-7 sm:gap-10 flex-wrap">
            {[
              { s: 'google-ads', n: 'Google Ads' },
              { s: 'meta', n: 'Meta' },
              { s: 'instagram', n: 'Instagram' },
              { s: 'tiktok', n: 'TikTok' },
              { s: 'youtube', n: 'YouTube' },
              { s: 'linkedin', n: 'LinkedIn' },
              { s: 'google-analytics', n: 'Google Analytics' },
            ].map((l) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={l.s}
                src={`/logos/tools/${l.s}.svg`}
                alt={l.n}
                style={{ height: '26px', width: 'auto', opacity: 0.5 }}
              />
            ))}
            <Link href="/integraties" className="text-[13px] font-display font-semibold text-accent hover:opacity-80 transition-opacity">
              en 245+ andere &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* ── HERKEN JE DIT ── */}
      <section className="bg-white" style={{ padding: '112px 24px 96px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrowLight}>{dashLight}{c.herken_eyebrow}</p>
          <h2 className="font-display font-extrabold text-primary m-0 mb-14" style={{ ...h2Style, maxWidth: '20ch' }}>
            {c.herken_h2}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-[14px] overflow-hidden">
            {c.quotes.map((item) => (
              <figure key={item.q} className="bg-white p-8 lg:p-9 m-0 flex flex-col justify-between gap-6">
                <blockquote className="m-0 font-display font-semibold text-primary leading-[1.4]" style={{ fontSize: '17px', letterSpacing: '-0.01em' }}>
                  &ldquo;{item.q}&rdquo;
                </blockquote>
                <figcaption className="text-muted text-[13px]">{item.a}</figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3">
            <p className="text-primary font-display font-semibold m-0" style={{ fontSize: '16px', maxWidth: '620px' }}>
              {c.herken_close}
            </p>
            <p className="text-muted text-[13px] m-0">{c.herken_bron}</p>
          </div>
        </div>
      </section>

      {/* ── KIJK ZELF MEE ── */}
      <section id="kijk-zelf-mee" className="bg-surface scroll-mt-24" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-between items-end gap-12 mb-14 flex-col lg:flex-row">
            <div>
              <p className={eyebrowLight}>{dashLight}{c.checks_eyebrow}</p>
              <h2 className="font-display font-extrabold text-primary m-0" style={{ ...h2Style, maxWidth: '18ch' }}>
                {c.checks_h2}
              </h2>
            </div>
            <p className="text-muted leading-[1.55] max-w-[340px]" style={{ fontSize: '15px' }}>
              {c.checks_sub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {c.checks.map((item, i) => (
              <article key={item.t} className="rounded-[14px] bg-white border border-border p-8">
                <p className="font-mono text-[11px] text-muted mb-5">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display font-bold text-primary mb-3" style={{ fontSize: '19px', letterSpacing: '-0.01em', lineHeight: '1.25' }}>
                  {item.t}
                </h3>
                <p className="text-muted leading-[1.6] mb-5" style={{ fontSize: '14.5px' }}>{item.d}</p>
                <p className="text-primary font-display font-semibold pt-4 border-t border-border" style={{ fontSize: '14px' }}>
                  {item.r}
                </p>
              </article>
            ))}
          </div>

          {/* fig. 01: logboek voor/na */}
          <div className="rounded-[14px] bg-white border border-border p-8 lg:p-10">
            <p className="font-mono text-[11px] text-muted uppercase tracking-[0.1em] mb-8">
              {c.fig_label} &middot; {c.fig_title}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                { label: c.fig_before, ticks: c.fig_before_ticks, bars: [10, 4, 0, 7, 0, 4], dim: true },
                { label: c.fig_after, ticks: c.fig_after_ticks, bars: [34, 26, 38, 30], dim: false },
              ].map((chart) => (
                <div key={chart.label}>
                  <p className="font-display font-semibold text-primary text-[14px] mb-5">{chart.label}</p>
                  <div className="flex items-end gap-3" style={{ height: '64px' }}>
                    {chart.bars.map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-2">
                        <div
                          className="w-full rounded-t-[3px]"
                          style={{
                            height: `${Math.max(h, 2)}px`,
                            backgroundColor: chart.dim ? 'var(--color-border)' : 'var(--color-accent-light)',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-2">
                    {chart.ticks.map((tick) => (
                      <span key={tick} className="flex-1 text-center font-mono text-[10px] text-muted">{tick}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-muted text-[13px] leading-[1.55] mt-8 m-0" style={{ maxWidth: '560px' }}>
              {c.fig_caption}
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/contact"
              className="font-display font-semibold text-accent text-[15px] inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              {c.checks_cta} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOE HET WERKT ── */}
      <section id="hoe-het-werkt" className="bg-primary scroll-mt-24" style={{ padding: '112px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-between items-end gap-12 mb-14 flex-col lg:flex-row">
            <div>
              <p className={eyebrowDark}>{dashDark}{c.how_eyebrow}</p>
              <h2 className="font-display font-extrabold text-white m-0" style={{ ...h2Style, maxWidth: '18ch' }}>
                {c.how_h2}
              </h2>
            </div>
            <Link
              href="/werkwijze"
              className="font-display font-semibold text-[14px] text-white/55 hover:text-white transition-colors flex-shrink-0"
            >
              {c.how_link} &rarr;
            </Link>
          </div>

          <div className="max-w-[860px]">
            {c.steps.map((item, i) => (
              <article
                key={item.num}
                className={`grid grid-cols-[56px_1fr] gap-6 py-9 ${i > 0 ? 'border-t border-white/10' : ''}`}
              >
                <span className="font-display font-extrabold text-accent leading-none pt-1" style={{ fontSize: '26px', letterSpacing: '-0.02em' }}>
                  {item.num}
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40 mb-2.5 m-0">{item.kop}</p>
                  <h3 className="font-display font-bold text-white mb-2.5" style={{ fontSize: '21px', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                    {item.t}
                  </h3>
                  <p className="text-white/55 leading-[1.6] m-0" style={{ fontSize: '15px', maxWidth: '58ch' }}>
                    {item.d}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO: marketinggeheugen ── */}
      <section className="bg-white" style={{ padding: '112px 24px 96px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrowLight}>{dashLight}{c.demo_eyebrow}</p>
          <h2 className="font-display font-extrabold text-primary m-0 mb-4" style={{ ...h2Style, maxWidth: '20ch' }}>
            {c.demo_h2}
          </h2>
          <p className="text-muted leading-[1.6] mb-14" style={{ fontSize: '16px', maxWidth: '540px' }}>
            {c.demo_lede}
          </p>
          <MarketingMemoryDemo locale={locale} />
        </div>
      </section>

      {/* ── VOOR WIE ── */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrowLight}>{dashLight}{c.who_eyebrow}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {c.who.map((card) => (
              <article key={card.k} className="rounded-[14px] bg-white border border-border overflow-hidden flex flex-col">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.img}
                  alt={card.alt}
                  className="w-full border-b border-border"
                  style={{ aspectRatio: '2.26 / 1', objectFit: 'cover' }}
                />
                <div className="p-8 lg:p-10 flex flex-col flex-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted mb-4">{card.k}</p>
                  <h3 className="font-display font-bold text-primary mb-4" style={{ fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: '1.15', letterSpacing: '-0.02em' }}>
                    {card.t}
                  </h3>
                  <p className="text-muted leading-[1.6] mb-8" style={{ fontSize: '15px' }}>{card.d}</p>
                  <div className="mt-auto pt-5 border-t border-border">
                    <Link href={card.href} className="font-display font-semibold text-accent text-sm inline-flex items-center gap-2 hover:gap-3 transition-all">
                      {card.link} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── NAAMVERHAAL ── */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrowLight}>{dashLight}{c.name_eyebrow}</p>
          <h2 className="font-display font-extrabold text-primary m-0 mb-14" style={{ ...h2Style, maxWidth: '22ch' }}>
            {c.name_h2}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-[14px] overflow-hidden mb-14">
            {c.name_cards.map((card) => (
              <div key={card.t} className="bg-white p-8 lg:p-10">
                <span
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full font-display font-bold text-[18px] mb-6"
                  style={{ background: 'rgba(93,163,255,0.12)', color: 'var(--color-primary)' }}
                  aria-hidden="true"
                >
                  {card.g}
                </span>
                <h3 className="font-display font-bold text-primary mb-3" style={{ fontSize: '19px', letterSpacing: '-0.01em' }}>{card.t}</h3>
                <p className="text-muted leading-[1.6] m-0" style={{ fontSize: '14.5px' }}>{card.d}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[auto_1fr] items-start gap-6 max-w-[760px]">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center border border-border flex-shrink-0"
              style={{ background: 'var(--color-surface)' }}
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted text-center leading-tight">{c.founder_foto}</span>
            </div>
            <figure className="m-0">
              <blockquote className="m-0 font-display font-semibold text-primary leading-[1.45]" style={{ fontSize: '18px', letterSpacing: '-0.01em' }}>
                &ldquo;{c.founder_quote}&rdquo;
              </blockquote>
              <figcaption className="text-muted text-[13px] mt-3">{c.founder_role}</figcaption>
            </figure>
          </div>

          <div className="mt-10">
            <Link href="/simon-stevin" className="font-display font-semibold text-accent text-[15px] inline-flex items-center gap-2 hover:gap-3 transition-all">
              {c.name_link} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── ONDERZOEK ── */}
      <section className="bg-primary" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrowDark}>{dashDark}{c.research_eyebrow}</p>
          <h2 className="font-display font-extrabold text-white m-0 mb-12" style={{ ...h2Style, maxWidth: '20ch' }}>
            {c.research_h2}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {c.research_stats.map((stat, i) => (
              <div key={stat.v} className="rounded-[14px] border border-white/12 p-8 lg:p-10" style={{ background: 'rgba(255,255,255,0.04)' }}>
                {i === 0 && (
                  <span className="inline-flex items-center gap-2 text-[11px] font-display font-semibold text-[#5DA3FF] border border-[#5DA3FF]/30 rounded-full px-3 py-1 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5DA3FF] flex-shrink-0" aria-hidden="true" />
                    {c.research_chip}
                  </span>
                )}
                <p className="font-display font-extrabold text-white" style={{ fontSize: 'clamp(44px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: '1' }}>
                  {stat.v}
                </p>
                <p className="text-white/55 mt-4 leading-[1.55] m-0" style={{ fontSize: '14px', maxWidth: '420px' }}>{stat.l}</p>
              </div>
            ))}
          </div>

          <p className="text-white/35 text-[12.5px] mb-8 m-0">{c.research_bron}</p>
          <p className="text-white/65 leading-[1.6] m-0" style={{ fontSize: '16px', maxWidth: '640px' }}>{c.research_body}</p>

          <div className="mt-8">
            <Link href="/who-owns-your-advertising-data" className="font-display font-semibold text-[#5DA3FF] text-[15px] inline-flex items-center gap-2 hover:gap-3 transition-all">
              {c.research_link} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── JOURNAL FEATURED ── */}
      {(() => {
        const featured = editorials()[0]
        if (!featured) return null
        const bgStyle =
          featured.posterStyle === 'gradient'
            ? 'linear-gradient(135deg, var(--navy) 0%, #1a2f52 100%)'
            : featured.posterStyle === 'surface'
            ? 'var(--surface-alt, #E8EFF7)'
            : 'var(--navy)'
        const txtColor = featured.posterStyle === 'surface' ? 'var(--navy)' : '#fff'
        const tagBg = featured.posterStyle === 'surface' ? 'var(--navy)' : 'rgba(255,255,255,0.94)'
        const tagColor = featured.posterStyle === 'surface' ? '#fff' : 'var(--navy)'
        return (
          <section className="bg-[var(--surface)]" style={{ padding: '96px 24px' }}>
            <div className="mx-auto max-w-[1200px]">
              <p
                className="font-display font-bold tracking-[0.12em] uppercase mb-10 flex items-center gap-[14px]"
                style={{ fontSize: '11px', color: 'var(--muted)' }}
              >
                <span className="inline-block w-6 h-px bg-muted opacity-60 flex-shrink-0" aria-hidden="true" />
                UIT HET JOURNAL
              </p>
              <Link
                href={`/blog/${featured.slug}`}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 no-underline text-inherit group items-center"
              >
                <div
                  className="overflow-hidden w-full h-full flex flex-col justify-between"
                  style={{
                    background: bgStyle,
                    color: txtColor,
                    borderRadius: '14px',
                    aspectRatio: '4 / 3',
                    padding: 'clamp(28px, 5vw, 44px)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      background: tagBg,
                      color: tagColor,
                      padding: '6px 10px',
                      borderRadius: '4px',
                      alignSelf: 'flex-start',
                    }}
                  >
                    {featured.posterTag}
                  </span>
                  <span
                    className="font-display font-extrabold"
                    style={{
                      fontSize: 'clamp(26px, 3vw, 38px)',
                      lineHeight: '1.05',
                      letterSpacing: '-0.025em',
                      maxWidth: '14ch',
                    }}
                  >
                    {featured.posterTopic}
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '11px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      marginBottom: '14px',
                    }}
                  >
                    Editie {featured.edition} · {featured.category} · {featured.readMinutes} min
                  </p>
                  <h2
                    className="font-display font-bold text-[var(--navy)] m-0 group-hover:text-[var(--accent)] transition-colors"
                    style={{
                      fontSize: 'clamp(28px, 3vw, 42px)',
                      lineHeight: '1.08',
                      letterSpacing: '-0.025em',
                      marginBottom: '20px',
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '17px',
                      lineHeight: '1.55',
                      color: 'var(--muted)',
                      marginBottom: '28px',
                    }}
                  >
                    {featured.dek}
                  </p>
                  <span
                    className="font-display font-semibold text-[var(--accent)] inline-flex items-center gap-2"
                    style={{ fontSize: '15px' }}
                  >
                    Lees editie {featured.edition} →
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )
      })()}

      {/* ── PRIJS ── */}
      <section className="bg-white" style={{ padding: '112px 24px' }}>
        <div className="mx-auto max-w-[680px] text-center">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-6 flex items-center justify-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            {c.price_eyebrow}
          </p>
          <p className="font-display font-extrabold text-primary m-0" style={{ fontSize: 'clamp(44px, 5vw, 68px)', letterSpacing: '-0.04em', lineHeight: '1' }}>
            {c.price_value}
            <span className="text-muted font-semibold align-baseline" style={{ fontSize: '18px', letterSpacing: '0', marginLeft: '12px' }}>
              {c.price_period}
            </span>
          </p>
          <p className="text-muted leading-[1.65] mx-auto" style={{ fontSize: '16px', maxWidth: '46ch', marginTop: '24px' }}>
            {c.price_body}
          </p>
          <div className="mt-9">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-white font-display font-bold text-[15px] px-8 py-3.5 rounded-lg hover:bg-accent-dark transition-colors"
            >
              {c.cta_primary}
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-between items-end gap-12 mb-12 flex-col lg:flex-row">
            <div>
              <p className={eyebrowLight}>{dashLight}{c.faq_eyebrow}</p>
              <h2 className="font-display font-extrabold text-primary m-0" style={{ fontSize: 'clamp(28px, 3vw, 44px)', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
                {c.faq_h2}
              </h2>
            </div>
          </div>
          <FAQAccordion faqs={[...c.faqs]} />
        </div>
      </section>

      {/* ── SLOT ── */}
      <section className="bg-primary" style={{ padding: '112px 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[14px] font-display font-bold tracking-[0.14em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-[#5DA3FF] flex-shrink-0" aria-hidden="true" />
            {c.closing_eyebrow}
          </p>
          <div className="flex items-end justify-between gap-12 flex-col lg:flex-row">
            <h2
              className="font-display font-extrabold text-white m-0"
              style={{ fontSize: 'clamp(38px, 4.6vw, 68px)', lineHeight: '1.04', letterSpacing: '-0.032em', maxWidth: '15ch' }}
            >
              {c.closing_l1}<br />
              <span className="text-[#5DA3FF]">{c.closing_l2}</span>
            </h2>
            <div className="flex flex-col items-start lg:items-end gap-5">
              <p className="text-white/55 leading-[1.6] m-0 lg:text-right" style={{ fontSize: '16px', maxWidth: '380px' }}>
                {c.closing_body}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors"
              >
                {c.cta_primary}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>

          <div
            className="mt-20 flex justify-between flex-wrap gap-4 pt-7"
            style={{ borderTop: '1px solid rgba(255,255,255,.1)' }}
          >
            <p className="text-[13px] m-0" style={{ color: 'rgba(255,255,255,.4)' }}>
              {c.closing_micro}
            </p>
            <p
              className="font-display text-[12px] font-medium tracking-[0.06em] uppercase m-0"
              style={{ color: 'rgba(255,255,255,.3)' }}
            >
              stevin.ai
            </p>
          </div>
        </div>
      </section>

      <StickyMobileCTA />
    </>
  )
}
