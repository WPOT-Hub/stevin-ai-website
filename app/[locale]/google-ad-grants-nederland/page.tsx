import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import ContactForm from '@/components/ContactForm'
import FAQAccordion from '@/components/FAQAccordion'

type Props = { params: Promise<{ locale: string }> }

export const metadata: Metadata = {
  title: 'Google Ad Grants aanvragen voor stichtingen en verenigingen | Stevin',
  description:
    'Check of je stichting, vereniging, ANBI of SBBI in aanmerking komt voor Google Ad Grants. Stevin helpt je aanvraag en campagnes voorbereiden.',
  alternates: { canonical: 'https://stevin.ai/google-ad-grants-nederland' },
}

const faqs = [
  {
    question: 'Komen verenigingen ook in aanmerking?',
    answer:
      'Ja, verenigingen kunnen in aanmerking komen als ze non-profit zijn en voldoen aan de voorwaarden van Google for Nonprofits. De exacte beoordeling hangt af van registratie, status, missie en website. Niet elke vereniging komt automatisch in aanmerking.',
  },
  {
    question: 'Heb je ANBI- of SBBI-status nodig?',
    answer:
      'ANBI- of SBBI-status helpt bij de beoordeling en wordt vaak genoemd als belangrijke voorwaarde in Nederland. Stichtingen en verenigingen zonder die status kunnen soms ook kwalificeren, mits ze als non-profit geregistreerd zijn en aan de overige eisen voldoen.',
  },
  {
    question: 'Kan Stevin de aanvraag namens ons doen?',
    answer:
      'Stevin kan je aanvraag voorbereiden en je stap voor stap begeleiden. Met expliciete toestemming kunnen we onderdelen namens je organisatie uitvoeren. De organisatie blijft eigenaar van Google for Nonprofits, Google Ads en alle data.',
  },
  {
    question: 'Kunnen we het budget ook gebruiken voor display of YouTube?',
    answer:
      'Nee. Google Ad Grants is bedoeld voor zoekadvertenties op Google Search. Voor display, YouTube of andere kanalen heb je een apart betaald advertentieaccount nodig.',
  },
  {
    question: 'Hoeveel advertentiebudget krijg je via Google Ad Grants?',
    answer:
      'In aanmerking komende non-profits kunnen tot 10.000 USD per maand aan zoekadvertentiebudget ontvangen. Het budget moet actief beheerd worden, anders pauzeert Google het account.',
  },
  {
    question: 'Heeft Microsoft Ads (Bing) een vergelijkbaar programma?',
    answer:
      'Nee. Microsoft Ads (Bing) heeft geen gratis advertentiebudget-programma voor non-profits in Nederland. Microsoft for Nonprofits geeft wel korting of gratis Office 365, Azure en Teams, maar geen Bing-zoekadvertenties. Bing-traffic in NL is ongeveer 3-5%, dus het ontbreken van een equivalent is meestal geen groot gemis.',
  },
  {
    question: 'Zijn er ook advertentie-credits via Meta of TikTok voor stichtingen en verenigingen?',
    answer:
      'Meta for Nonprofits geeft non-profits makkelijker verificatie en soms ad-credits bij speciale campagnes, maar geen vast doorlopend budget. TikTok Ads for Good draait in beperkt aantal landen, niet structureel in NL. Voor advertentiebudget op schaal blijft Google Ad Grants veruit de grootste kans.',
  },
]

export default async function GoogleAdGrantsNederlandPage({ params }: Props) {
  const { locale } = await params
  if (locale !== 'nl') notFound()
  setRequestLocale(locale)

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://stevin.ai' },
      { '@type': 'ListItem', position: 2, name: 'Google Ad Grants Nederland', item: 'https://stevin.ai/google-ad-grants-nederland' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />

      {/* HERO */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 96px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            GOOGLE AD GRANTS · NEDERLAND
          </p>

          <h1
            className="font-display font-extrabold text-white leading-[1.06] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(36px, 5vw, 68px)', maxWidth: '18ch' }}
          >
            Google Ad Grants aanvragen voor je <span className="text-[#5DA3FF]">stichting of vereniging</span>
          </h1>

          <p className="text-white/70 leading-[1.55] mt-8" style={{ fontSize: '20px', maxWidth: '640px' }}>
            Veel non-profits kunnen tot 10.000 USD per maand aan gratis zoekadvertentiebudget aanvragen via Google Ad Grants. Stevin checkt je status, scant je website en zet je aanvraag klaar.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="#check"
              className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors"
            >
              Check mijn organisatie
            </a>
            <a
              href="#aanvraag"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-display font-semibold text-[15px] px-7 py-3.5 rounded-lg hover:border-white/40 hover:bg-white/5 transition-colors"
            >
              Start de aanvraagcheck
            </a>
          </div>

          <p className="text-white/40 text-sm mt-8">
            Voor stichtingen, verenigingen, ANBI&apos;s, SBBI&apos;s, musea en goede doelen.
          </p>
        </div>
      </section>

      {/* PROBLEEM */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[900px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            HET PROBLEEM
          </p>
          <h2
            className="font-display font-extrabold text-primary mb-8"
            style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', letterSpacing: '-0.02em', lineHeight: '1.1' }}
          >
            Veel non-profits laten Google Ad Grants liggen.
          </h2>
          <div className="space-y-4 text-muted text-lg leading-relaxed">
            <p>De ene organisatie kent het programma niet. De andere weet niet of ze in aanmerking komt. En als de aanvraag eenmaal loopt, struikelen de meesten over de website-eisen of de validatie via Goodstack.</p>
            <p>Ook na goedkeuring blijft veel budget liggen. Google Grants werkt anders dan een gewone Google Ads-account. Je hebt scherpe zoekwoorden, conversietracking en actief beheer nodig om het budget echt te benutten.</p>
            <p>Je hoeft het niet alleen uit te zoeken.</p>
          </div>
        </div>
      </section>

      {/* WAT STEVIN DOET */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            WAT STEVIN DOET
          </p>
          <h2
            className="font-display font-extrabold text-primary mb-12"
            style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', letterSpacing: '-0.02em', lineHeight: '1.1' }}
          >
            Van eligibility-check tot eerste resultaten.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Check of je in aanmerking komt', desc: 'We toetsen je rechtsvorm, ANBI- of SBBI-status, missie en website tegen Google\'s voorwaarden.' },
              { title: 'Scan je website', desc: 'HTTPS, missiepagina, donatiepagina, privacy en broken links. Je krijgt een lijst met wat er nog ontbreekt.' },
              { title: 'Bereid je aanvraag voor', desc: 'We bundelen de gegevens, toetsen ze tegen de eisen en zetten ze klaar voor indiening bij Google for Nonprofits en Goodstack.' },
              { title: 'Stel eerste campagnes op', desc: 'Campagnestructuur, zoekwoorden en conversiedoelen die passen bij je missie. Klaar voor activatie zodra de Grant is goedgekeurd.' },
              { title: 'Bewaak de regels', desc: 'Google Grants stelt eisen aan CTR, kwaliteit en activiteit. Stevin signaleert wanneer je account dreigt te worden gepauzeerd.' },
              { title: 'Vertaal data naar acties', desc: 'Geen losse rapportage. Stevin zegt wat te optimaliseren en waarom, op basis van je werkelijke campagne-data.' },
            ].map((b) => (
              <div key={b.title} className="rounded-[14px] border border-border p-7 hover:shadow-lg transition-shadow">
                <h3 className="font-display font-bold text-primary text-lg mb-3">{b.title}</h3>
                <p className="text-muted leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section id="check" className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[900px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            KOMT JOUW ORGANISATIE IN AANMERKING?
          </p>
          <h2
            className="font-display font-extrabold text-primary mb-8"
            style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', letterSpacing: '-0.02em', lineHeight: '1.1' }}
          >
            Wat Google verwacht.
          </h2>

          <p className="text-muted leading-relaxed mb-8 text-lg">
            Stichtingen en verenigingen kunnen in aanmerking komen als ze als non-profit geregistreerd zijn en voldoen aan de voorwaarden van Google for Nonprofits. ANBI- of SBBI-status helpt bij de beoordeling.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display font-bold text-primary mb-3">Vaak geschikt</h3>
              <ul className="space-y-2 text-muted">
                <li>• Non-profit stichting</li>
                <li>• Non-profit vereniging</li>
                <li>• Organisatie met ANBI-status</li>
                <li>• Organisatie met SBBI-status</li>
                <li>• Kerkgenootschappen en zelfstandige onderdelen</li>
                <li>• Musea en culturele instellingen</li>
                <li>• Gezondheidsfondsen en goede doelen</li>
              </ul>
            </div>
            <div>
              <h3 className="font-display font-bold text-primary mb-3">Meestal uitgesloten</h3>
              <ul className="space-y-2 text-muted">
                <li>• Overheidsorganisaties</li>
                <li>• Ziekenhuizen en zorginstellingen</li>
                <li>• Scholen, universiteiten en academische instellingen</li>
              </ul>
              <p className="text-sm text-muted/80 mt-4">Liefdadige stichtingen die aan zorg of onderwijs verbonden zijn, kunnen soms wel in aanmerking komen. Daar is een handmatige beoordeling voor nodig.</p>
            </div>
          </div>

          <div className="mt-12 p-7 rounded-[14px] bg-white border border-border">
            <h3 className="font-display font-bold text-primary mb-3">Wat je website nodig heeft</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 text-muted text-sm">
              <li>• Veilig via HTTPS</li>
              <li>• Duidelijke missiepagina</li>
              <li>• Niet primair commercieel</li>
              <li>• Werkende navigatie zonder broken links</li>
              <li>• Contactgegevens zichtbaar</li>
              <li>• Privacybeleid aanwezig</li>
            </ul>
          </div>
        </div>
      </section>

      {/* AANVRAAG */}
      <section id="aanvraag" className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[900px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            VRAAG EEN GRATIS CHECK AAN
          </p>
          <h2
            className="font-display font-extrabold text-primary mb-6"
            style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', letterSpacing: '-0.02em', lineHeight: '1.1' }}
          >
            Laat Stevin je aanvraag voorbereiden.
          </h2>
          <p className="text-muted leading-relaxed mb-8 text-lg">
            Vul je gegevens in. Wij doen een eerste eligibility-check en sturen je terug wat je organisatie nodig heeft om kansrijk te zijn. Geen verplichting, geen kosten.
          </p>
          <div className="rounded-[14px] border border-border bg-surface p-8">
            <ContactForm subject="Google Ad Grants check: Nederland" />
          </div>
          <p className="text-sm text-muted/80 mt-6">
            Je organisatie blijft altijd zelf eigenaar van de aanvraag, Google for Nonprofits en Google Ads. Stevin bereidt voor en begeleidt; jullie houden de controle.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[900px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            VEELGESTELDE VRAGEN
          </p>
          <h2
            className="font-display font-extrabold text-primary mb-10"
            style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', letterSpacing: '-0.02em', lineHeight: '1.1' }}
          >
            Wat je moet weten over Google Ad Grants.
          </h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>
    </>
  )
}
