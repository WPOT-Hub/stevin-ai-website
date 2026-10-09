import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import StevinBrainVisual from '@/components/StevinBrainVisual'
import KlantLogos from '@/components/KlantLogos'
import BrainEdgeStrip from '@/components/BrainEdgeStrip'
import HeroHeadline from '@/components/HeroHeadline'

type Props = { params: Promise<{ locale: string }> }

// W-524, 9 okt 2026: korter (579 woorden in plaats van ongeveer 2.100) en
// volgens D-086: wij verkopen onderhoud, niet "de basis". Tekst, bron per
// bewering en wat er van de vorige versie af ging staan in Stevin-Hub,
// docs/research/HOME_STEVIN_AI_TEKST_2026-10-09.md. De vorige versie (met de
// citatenpool, de checks, de Desk-opname, het geheugen en de FAQ) staat in de
// git-geschiedenis van dit bestand.
//
// Copy blijft inline per taal, zelfde patroon als eerder. De kop zelf staat in
// components/HeroHeadline.tsx, met de koptest.
const COPY = {
  nl: {
    hero_sub_1: 'We schrijven op wat je marketing in een gewone week hoort op te leveren, en we zien het als dat niet meer gebeurt. ',
    hero_sub_bold: 'Alles staat op jouw naam.',
    hero_sub_2: ' Je kijkt zelf mee, en stop je, dan neem je alles mee.',
    cta_primary: 'Start de diagnose',
    cta_micro: 'Binnen twee weken weet je wat er klopt en wat niet. Het rapport mag je houden.',

    herken_eyebrow: 'Herken je dit?',
    herken_h2: 'Wat we elke week horen.',
    // Letterlijk uit gesprekken, sector wel en naam nooit. Het rapportje-citaat
    // stond eerder als "Twee ondernemers" in de lopende tekst; de functie
    // "Eigenaar, handelsbedrijf" hoorde bij een ander citaat.
    quotes: [
      { q: 'Op een maand tijd had ik voor bijna 1100 euro leads en ik heb er geen een.', a: 'Installatiebedrijf' },
      { q: 'Daar krijgen we inderdaad een rapportje van achteraf.', a: 'Ondernemer' },
      { q: 'Dat zijn allemaal aparte systemen met bepaalde toegangen. Maar er zit nergens een link of een centraal geheugen.', a: 'Marketingverantwoordelijke, internationaal merk' },
    ],
    herken_bron: 'Uit echte gesprekken, zonder naam.',

    register_eyebrow: 'Kijk het zelf na',
    register_h2: 'Wie betaalt jouw advertenties?',
    register_body: 'Google zet openbaar online wie er voor een advertentie betaalt. Bij 4.610 bedrijven in Nederland en België staat daar een ander dan het bedrijf zelf. Zoek je bedrijf op in het advertentieregister van Google. Staat er een andere naam dan de jouwe? Vraag dan wie de facturen van Google krijgt.',
    register_zelf: 'Naar het register van Google',
    register_cta: 'Wij zoeken het voor je op',
    register_stat: '4.610',
    register_stat_label: 'bedrijven in Nederland en België waar een ander als betaler staat',
    register_bron: 'Bron: eigen onderzoek op het openbare advertentieregister van Google, stand 12 september 2026.',

    doen_eyebrow: 'Wat we doen',
    doen_h2: 'Stevin zorgt dat je marketing blijft werken. Op jouw naam.',
    doen: [
      { n: '01', t: 'We leggen vast wat er hoort te gebeuren.', d: 'Hoeveel telefoontjes een gewone week oplevert. Welke aanvragen iets opleveren en welke niet. Welke campagne klanten moet brengen en welke vooral je naam bekend maakt, en hoe je ziet of dat lukt. Dat staat in geen enkel systeem. Daarom doen we het in de eerste weken samen met jou.' },
      { n: '02', t: 'We blijven kijken of het nog klopt.', d: 'We kijken of er binnenkomt wat er binnen hoort te komen, ook als alles op groen staat.' },
      { n: '03', t: 'We verdienen niets aan je advertentiegeld.', d: 'Google zal je niet snel aanraden om minder bij Google uit te geven, en Meta niet bij Meta. Wij krijgen geen percentage van je advertentiebudget. Levert een campagne geen klanten op, dan zeggen we dat, ook als Google of Meta iets anders laten zien.' },
    ],
    founder_quote: 'Twintig jaar zat ik aan de andere kant van de factuur. Ik weet hoe uren en mediamarges werken, want ik heb er zelf aan verdiend. Daarom is Stevin andersom gebouwd.',
    founder_role: 'Oprichter van Stevin',

    // Punt 02 had een tweede zin ("komt er op een dinsdag niets binnen, dan zien
    // wij dat"). Eruit op 9 okt (W-524): de Pulse-scan vergelijkt alleen
    // platformconversies met de vorige periode, meldt in het Portal en niet bij
    // Simon, en zag de daling hieronder niet. Terug zodra dat wel klopt.
    // Cijfers: GA4 van de klant in metrics_analytics, 41, 29, 11, 2, 1 van april
    // tot augustus 2026 bij 3.016 en 4.596 sessies. Het klantsysteem telde in
    // dezelfde periode wel aanvragen (W-121 in Stevin-Hub).
    bewijs_eyebrow: 'Uit de praktijk',
    bewijs_h2: 'Zo gaat het als niemand kijkt.',
    bewijs_body: 'Bij een installatiebedrijf liep de meting op de website terug van 41 aanvragen in april naar 1 in augustus, terwijl er juist meer bezoekers kwamen. In hun eigen klantsysteem kwamen de aanvragen gewoon binnen. De meting was kapotgegaan.',
    bewijs_kern: 'Een systeem meldt alleen wat er is. Dat er iets ontbreekt, zie je pas als je weet wat er had moeten zijn.',
    bewijs_van: { v: '41', l: 'april' },
    bewijs_naar: { v: '1', l: 'augustus' },
    bewijs_label: 'aanvragen geteld op de website',
    bewijs_bron: 'Uit onze eigen klantcijfers, zonder naam.',

    werk_eyebrow: 'Wie het werk doet',
    werk_h2: 'Wie het werk doet, kies je zelf.',
    werk_body: 'Je eigen mensen, je huidige bureau of wij. Wij blijven degene die nakijkt of het klopt. Doen wij het, dan zie je ook wat wij doen. Wil je het zelf leren, dan draaien we mee tot het staat, meestal zes tot twaalf maanden. Stoppen kan altijd, met alles wat van jou is.',
    werk_link: 'Bekijk de tarieven',

    slot_eyebrow: 'De volgende stap',
    slot_h2: 'Hoeveel klanten heeft je marketing vorige week opgeleverd?',
    slot_body: 'Weet je dat niet precies? Daar beginnen we. In de diagnose kijken we in je eigen accounts wat er binnenkomt, wat het kost en op wiens naam het staat. Binnen twee weken heb je het zwart op wit.',
    slot_tweede_vraag: 'Liever eerst even bellen?',
    slot_tweede_link: 'Plan een kennismaking',
  },
  en: {
    hero_sub_1: 'We write down what your marketing should bring in during a normal week, and we see it when that stops happening. ',
    hero_sub_bold: 'Everything is in your name.',
    hero_sub_2: ' You can always look along, and if you stop, you take everything with you.',
    cta_primary: 'Start the diagnosis',
    cta_micro: 'Within two weeks you know what is right and what is not. You keep the report.',

    herken_eyebrow: 'Sound familiar?',
    herken_h2: 'What we hear every week.',
    quotes: [
      { q: 'In one month I bought nearly 1,100 euro of leads. I got not a single job out of it.', a: 'Installation company' },
      { q: 'We do get a little report afterwards, yes.', a: 'Business owner' },
      { q: 'Those are all separate systems with their own logins. But there is no link anywhere, no central memory.', a: 'Marketing lead, international brand' },
    ],
    herken_bron: 'From real conversations, names removed.',

    register_eyebrow: 'Check it yourself',
    register_h2: 'Who pays for your ads?',
    register_body: 'Google publishes who pays for each ad. For 4,610 companies in the Netherlands and Belgium, someone other than the company itself is listed. Look up your company in Google\'s ad register. Is a different name listed? Then ask who receives the invoices from Google.',
    register_zelf: 'Go to Google\'s register',
    register_cta: 'We will look it up for you',
    register_stat: '4,610',
    register_stat_label: 'companies in the Netherlands and Belgium where someone else is listed as the payer',
    register_bron: 'Source: our own research on Google\'s public ad register, as of 12 September 2026.',

    doen_eyebrow: 'What we do',
    doen_h2: 'Stevin keeps your marketing working. In your name.',
    doen: [
      { n: '01', t: 'We write down what should happen.', d: 'How many calls a normal week brings in. Which enquiries are worth something and which are not. Which campaign should bring in customers and which mainly makes your name known, and how you can tell whether that works. No system holds this. So we do it with you in the first weeks.' },
      { n: '02', t: 'We keep checking that it still holds.', d: 'We check whether what should come in actually comes in, even when everything shows green.' },
      { n: '03', t: 'We earn nothing from your ad spend.', d: 'Google will rarely advise you to spend less on Google, and Meta will not on Meta. We take no percentage of your ad budget. If a campaign brings in no customers, we say so, even when Google or Meta show something else.' },
    ],
    founder_quote: 'For twenty years I sat on the other side of the invoice. I know how hours and media margins work, because I earned from them myself. That is why Stevin is built the other way around.',
    founder_role: 'Founder of Stevin',

    bewijs_eyebrow: 'In practice',
    bewijs_h2: 'What happens when nobody is watching.',
    bewijs_body: 'At an installation company, the website measurement dropped from 41 enquiries in April to 1 in August, while visitor numbers actually went up. In their own customer system the enquiries kept coming in. The measurement had broken.',
    bewijs_kern: 'A system only reports what is there. You only see what is missing when you know what should have been there.',
    bewijs_van: { v: '41', l: 'April' },
    bewijs_naar: { v: '1', l: 'August' },
    bewijs_label: 'enquiries counted on the website',
    bewijs_bron: 'From our own client figures, names removed.',

    werk_eyebrow: 'Who does the work',
    werk_h2: 'You choose who does the work.',
    werk_body: 'Your own people, your current agency, or us. We stay the ones who check that it is right. If we do the work, you see what we do too. Want to do it yourself later? Then we run alongside until it is in place, usually six to twelve months. You can always stop, and take everything that is yours.',
    werk_link: 'See pricing',

    slot_eyebrow: 'The next step',
    slot_h2: 'How many customers did your marketing bring in last week?',
    slot_body: 'Not sure? That is where we start. In the diagnosis we look in your own accounts at what comes in, what it costs and whose name it is in. Within two weeks you have it in writing.',
    slot_tweede_vraag: 'Rather talk first?',
    slot_tweede_link: 'Book an introduction call',
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
// Ladder-waarden, zie docs/TYPOGRAFIE.md.
const h2Style = { fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08', fontWeight: 800 } as const

const REGISTER_URL = 'https://adstransparency.google.com/?region=NL'

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = locale === 'en' ? COPY.en : COPY.nl

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        {/* W-462: de visual hangt aan hetzelfde kader als de header (1760px),
            zodat hij op een ultrawide niet rechts van het menu belandt. Het
            kader zelf laat kliks door naar de knop. */}
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden w-full max-w-[1760px] -translate-x-1/2 lg:block"
          aria-hidden="true"
        >
          <div
            className="pointer-events-auto absolute inset-y-0 right-0 flex items-center justify-end overflow-hidden"
            style={{
              maskImage: 'linear-gradient(90deg, transparent 0%, black 26%)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 26%)',
            }}
          >
            <div className="w-[52vw] max-w-[600px] translate-x-[4%] min-[1760px]:translate-x-0">
              <StevinBrainVisual aspect="3:4" brand={false} claim="" ariaLabel="" locale={locale} />
            </div>
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

            <HeroHeadline locale={locale} />

            <p
              className="text-white/60 leading-[1.55]"
              style={{ fontSize: '19px', maxWidth: '540px', marginTop: '32px' }}
            >
              {c.hero_sub_1}
              <strong className="text-white/85 font-semibold">{c.hero_sub_bold}</strong>
              {c.hero_sub_2}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors"
            >
              {c.cta_primary}
            </Link>
          </div>

          <p className="text-white/45 text-[13.5px] mt-5">{c.cta_micro}</p>
        </div>
      </section>

      <KlantLogos locale={locale} />

      {/* ── HERKEN JE DIT ── */}
      <section className="bg-white" style={{ padding: '112px 24px 96px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrowLight}>{dashLight}{c.herken_eyebrow}</p>
          <h2 className="font-display font-extrabold text-primary m-0 mb-14" style={{ ...h2Style, maxWidth: '20ch' }}>
            {c.herken_h2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-[14px] overflow-hidden">
            {c.quotes.map((item) => (
              <figure key={item.q} className="bg-white p-8 lg:p-9 m-0 flex flex-col justify-between gap-6 min-h-[200px]">
                <blockquote className="m-0 font-display font-semibold text-primary leading-[1.4]" style={{ fontSize: '17px', letterSpacing: '-0.01em' }}>
                  &ldquo;{item.q}&rdquo;
                </blockquote>
                <figcaption className="text-muted text-[13px]">{item.a}</figcaption>
              </figure>
            ))}
          </div>
          <p className="text-muted text-[13px] mt-6 mb-0">{c.herken_bron}</p>
        </div>
      </section>

      {/* ── KIJK HET ZELF NA ── */}
      <section id="kijk-zelf-mee" className="bg-surface scroll-mt-24" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
            <div>
              <p className={eyebrowLight}>{dashLight}{c.register_eyebrow}</p>
              <h2 className="font-display font-extrabold text-primary m-0" style={{ ...h2Style, maxWidth: '18ch' }}>
                {c.register_h2}
              </h2>
              <p className="text-muted leading-[1.65]" style={{ fontSize: '17px', maxWidth: '56ch', marginTop: '20px' }}>
                {c.register_body}
              </p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3" style={{ marginTop: '26px' }}>
                <Link href="/contact" className="font-display font-semibold text-accent inline-flex items-center gap-2" style={{ fontSize: '15px' }}>
                  {c.register_cta} &rarr;
                </Link>
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-semibold text-muted hover:text-primary transition-colors inline-flex items-center gap-2"
                  style={{ fontSize: '15px' }}
                >
                  {c.register_zelf} &#8599;
                </a>
              </div>
            </div>
            <div className="rounded-[14px] bg-white border border-border p-8 lg:p-10">
              <p className="font-display font-extrabold text-primary m-0" style={{ fontSize: 'clamp(52px, 6vw, 80px)', letterSpacing: '-0.04em', lineHeight: '1' }}>
                {c.register_stat}
              </p>
              <p className="text-muted mt-4 mb-0 leading-[1.5]" style={{ fontSize: '15px', maxWidth: '34ch' }}>{c.register_stat_label}</p>
            </div>
          </div>
          <p className="text-muted text-[12.5px] mt-8 mb-0">{c.register_bron}</p>
        </div>
      </section>

      {/* ── WAT WE DOEN ── */}
      <section id="hoe-het-werkt" className="bg-primary scroll-mt-24" style={{ padding: '112px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrowDark}>{dashDark}{c.doen_eyebrow}</p>
          <h2 className="font-display font-extrabold text-white m-0 mb-10" style={{ ...h2Style, maxWidth: '20ch' }}>
            {c.doen_h2}
          </h2>

          <div className="max-w-[860px]">
            {c.doen.map((item, i) => (
              <article
                key={item.n}
                className={`grid grid-cols-[56px_1fr] gap-6 py-9 ${i > 0 ? 'border-t border-white/10' : ''}`}
              >
                <span className="font-display font-extrabold text-accent leading-none pt-1" style={{ fontSize: '26px', letterSpacing: '-0.02em' }}>
                  {item.n}
                </span>
                <div>
                  <h3 className="font-display font-bold text-white mb-2.5" style={{ fontSize: '21px', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                    {item.t}
                  </h3>
                  <p className="text-white/60 leading-[1.6] m-0" style={{ fontSize: '16px', maxWidth: '60ch' }}>
                    {item.d}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-[auto_1fr] items-start gap-6 max-w-[760px] mt-12 pt-10 border-t border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/oprichter.png"
              alt={c.founder_role}
              width={80}
              height={80}
              loading="lazy"
              decoding="async"
              className="w-20 h-20 flex-shrink-0"
            />
            <figure className="m-0">
              <blockquote className="m-0 font-display font-semibold text-white leading-[1.45]" style={{ fontSize: '18px', letterSpacing: '-0.01em' }}>
                &ldquo;{c.founder_quote}&rdquo;
              </blockquote>
              <figcaption className="text-white/45 text-[13px] mt-3">{c.founder_role}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── UIT DE PRAKTIJK ── */}
      <section className="bg-white" style={{ padding: '112px 24px 96px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
            <div>
              <p className={eyebrowLight}>{dashLight}{c.bewijs_eyebrow}</p>
              <h2 className="font-display font-extrabold text-primary m-0" style={{ ...h2Style, maxWidth: '18ch' }}>
                {c.bewijs_h2}
              </h2>
              <p className="text-muted leading-[1.65]" style={{ fontSize: '17px', maxWidth: '56ch', marginTop: '20px' }}>
                {c.bewijs_body}
              </p>
              <p className="text-primary font-display font-semibold leading-[1.45]" style={{ fontSize: '18px', maxWidth: '48ch', marginTop: '20px' }}>
                {c.bewijs_kern}
              </p>
            </div>
            <figure className="m-0 rounded-[14px] bg-surface border border-border p-8 lg:p-10">
              <div className="flex items-end gap-8">
                {[c.bewijs_van, c.bewijs_naar].map((stap, i) => (
                  <div key={stap.l}>
                    <p
                      className={`font-display font-extrabold m-0 ${i === 0 ? 'text-primary' : 'text-[#d23f57]'}`}
                      style={{ fontSize: 'clamp(52px, 6vw, 80px)', letterSpacing: '-0.04em', lineHeight: '1' }}
                    >
                      {stap.v}
                    </p>
                    <p className="text-muted text-[13px] mt-2 mb-0 uppercase tracking-[0.08em] font-display font-semibold">{stap.l}</p>
                  </div>
                ))}
              </div>
              <figcaption className="text-muted mt-5 leading-[1.5]" style={{ fontSize: '15px' }}>{c.bewijs_label}</figcaption>
            </figure>
          </div>
          <p className="text-muted text-[12.5px] mt-8 mb-0">{c.bewijs_bron}</p>
        </div>
      </section>

      {/* ── WIE HET WERK DOET ── */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrowLight}>{dashLight}{c.werk_eyebrow}</p>
          <h2 className="font-display font-extrabold text-primary m-0" style={{ ...h2Style, maxWidth: '20ch' }}>
            {c.werk_h2}
          </h2>
          <p className="text-muted leading-[1.65]" style={{ fontSize: '17px', maxWidth: '60ch', marginTop: '20px' }}>
            {c.werk_body}
          </p>
          <p style={{ marginTop: '22px' }} className="mb-0">
            <Link href="/tarieven" className="font-display font-semibold text-accent inline-flex items-center gap-2" style={{ fontSize: '15px' }}>
              {c.werk_link} &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* ── SLOT ── */}
      <section className="bg-primary" style={{ padding: '112px 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[14px] font-display font-bold tracking-[0.14em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-[#5DA3FF] flex-shrink-0" aria-hidden="true" />
            {c.slot_eyebrow}
          </p>
          <div className="flex items-end justify-between gap-12 flex-col lg:flex-row">
            <h2
              className="font-display font-extrabold text-white m-0"
              style={{ fontSize: 'clamp(30px, 3.4vw, 48px)', lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: 800, maxWidth: '18ch' }}
            >
              {c.slot_h2}
            </h2>
            <div className="flex flex-col items-start lg:items-end gap-5">
              <p className="text-white/60 leading-[1.6] m-0 lg:text-right" style={{ fontSize: '16px', maxWidth: '400px' }}>
                {c.slot_body}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors"
              >
                {c.cta_primary}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
              <p className="text-white/50 text-[14px] m-0">
                {c.slot_tweede_vraag}{' '}
                <Link href="/kennismaking" className="text-[#5DA3FF] font-display font-semibold hover:text-[#7BB8FF] transition-colors">
                  {c.slot_tweede_link}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <StickyMobileCTA locale={locale} />
    </>
  )
}
