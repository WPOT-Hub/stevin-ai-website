import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import ContactForm from '@/components/ContactForm'
import FAQAccordion from '@/components/FAQAccordion'

type Props = { params: Promise<{ locale: string }> }

export const metadata: Metadata = {
  title: 'Non-profit marketing voor stichtingen en verenigingen | Stevin',
  description:
    'Stevin koppelt jullie marketing-data en signaleert wat werkt, wat fades en waar donateurs vandaan komen. Voor stichtingen, verenigingen, ANBI\'s, musea en goede doelen in Nederland.',
  alternates: { canonical: 'https://stevin.ai/non-profit-marketing-nederland' },
}

const faqs = [
  {
    question: 'Wat is het verschil met een gewoon dashboard?',
    answer:
      'Een dashboard wacht tot jij het opent. Stevin tikt jullie. Het platform leest 24/7 mee in alle marketing-data en stuurt een signaal zodra een campagne ingezakt is, een creative niet meer pakt, of een donor-flow ergens stilvalt. Met de oorzaak en de volgende actie erbij. Geen rapport om door te ploegen, gewoon een actie.',
  },
  {
    question: 'Werkt dit ook zonder Google Ad Grants?',
    answer:
      'Ja. Stevin werkt naast Google Ad Grants ook met Meta, TikTok, e-mail-tools, donatieplatformen, ticketing-systemen en jullie eigen website-data. Voor stichtingen die geen Grant hebben, is dit een manier om uit beperkt eigen budget meer te halen.',
  },
  {
    question: 'Hoeveel marketing-data hebben we nodig om dit zinvol te laten werken?',
    answer:
      'Niet veel. Een werkende GA4-meting, een of twee actieve advertentie-accounts en een e-mail-tool zijn al genoeg om binnen twee weken zinvolle signalen te krijgen. Stevin leert wat normaal is voor jullie organisatie en signaleert pas als iets afwijkt.',
  },
  {
    question: 'Is donor-data veilig?',
    answer:
      'Alle data blijft binnen de EU. Stevin draait op Europese servers en verwerkt persoonsgegevens niet. Donor-data wordt geanonimiseerd bij ingest. AI-verwerking via Mistral en Anthropic, geen overdracht buiten de EU. Volledig AVG-compliant.',
  },
  {
    question: 'Wat kost dit voor een stichting of vereniging?',
    answer:
      'Vaste maandprijzen, afgestemd op het aantal kanalen en koppelingen. Geen marge op jullie media-budget. Voor non-profits maken we een aangepast voorstel, plan een gesprek voor de details.',
  },
  {
    question: 'Welke advertentie-credits zijn er voor non-profits in Nederland?',
    answer:
      'Google Ad Grants is veruit het grootste programma: tot 10.000 USD per maand aan gratis Search-advertenties voor in aanmerking komende non-profits. Microsoft Ads (Bing) heeft geen vergelijkbaar gratis programma in NL. Meta for Nonprofits biedt makkelijker verificatie en soms ad-credits bij campagnes. TikTok Ads for Good draait in beperkt aantal landen, niet structureel in NL. Voor non-profit-advertentiebudget op schaal is en blijft Google de grootste kans.',
  },
  {
    question: 'Helpt Stevin ook bij Google Ad Grants?',
    answer:
      'Ja. We hebben aparte begeleidings-pagina\'s voor de aanvraag en inrichting: bekijk /google-ad-grants-nederland. Stevin helpt bij eligibility-check, website-scan, aanvraag-voorbereiding bij Google for Nonprofits en Goodstack, en daarna bij campagne-structuur en regels-bewaking om het account actief te houden.',
  },
]

const capabilities = [
  { title: 'SEO en AI-search vindbaarheid', desc: 'Word gevonden in Google en in AI-zoekresultaten van ChatGPT, Perplexity en Google AI Overviews. Stevin volgt jullie posities en signaleert kansen op zoekwoorden waar jullie missie sterk staat.' },
  { title: 'Social listening', desc: 'Mentions, sentiment en piek-momenten over al jullie kanalen. Een ambassadeur die jullie viraal noemt, een lokale krant die schrijft, een lotgenoot die jullie tagt: Stevin ziet het.' },
  { title: 'Marktsentiment en PR-haakjes', desc: 'Welke onderwerpen leven nu rond jullie missie? Stevin volgt Google Trends, social-discussies en nieuwsverhalen en signaleert wanneer een topic momentum krijgt waar jullie op kunnen inhaken.' },
  { title: 'Automation voor fondswerving', desc: 'Donor-journeys, abandoned-donatie-flows, herinneringen voor terugkerende donateurs. Concept-flows die jullie team alleen nog hoeft goed te keuren.' },
  { title: 'Campagne-monitoring', desc: 'Paid, owned, e-mail en donatieplatform in een blik. Stevin tikt zodra een campagne inzakt, niet drie weken later in de rapportage.' },
  { title: 'Creative wear-out detection', desc: 'Donor-fatigue is sluipend. Stevin detecteert wanneer een ad zijn werk niet meer doet en stelt een variant of pauze voor, zodat hetzelfde budget langer impact maakt.' },
  { title: 'Briefing naar campagne-concept', desc: 'Een verhaal of campagne-idee binnen? Stevin vertaalt jullie briefing naar een campagne-structuur met zoekwoorden, doelgroepen en eerste creative-richtingen voor het team.' },
  { title: 'Peer en concurrent-tracking', desc: 'Hoe doen vergelijkbare organisaties het? Stevin volgt openbare campagnes en mentions van peer-organisaties zodat jullie zien wat werkt in het veld.' },
  { title: 'Data naar acties', desc: 'Geen losse rapportage. Concept-taken in jullie projectmanagement-tool zodra er iets opvalt, met de oorzaak en het advies erbij.' },
]

export default async function NonProfitNederlandPage({ params }: Props) {
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
      { '@type': 'ListItem', position: 2, name: 'Non-profit marketing Nederland', item: 'https://stevin.ai/non-profit-marketing-nederland' },
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
            NON-PROFIT MARKETING · NEDERLAND
          </p>

          <h1
            className="font-display font-extrabold text-white leading-[1.06] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(36px, 5vw, 68px)', maxWidth: '20ch' }}
          >
            Meer impact uit het budget dat je <span className="text-[#5DA3FF]">al hebt</span>
          </h1>

          <p className="text-white/70 leading-[1.55] mt-8" style={{ fontSize: '20px', maxWidth: '640px' }}>
            Stevin koppelt jullie marketing- en SEO-data, volgt marktsentiment en PR-haakjes, en signaleert wat werkt en waar donateurs of bezoekers vandaan komen. Voor reguliere rapportage het oppikt.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="#aanvraag"
              className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors"
            >
              Vraag een gratis check aan
            </a>
            <a
              href="#wat"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-display font-semibold text-[15px] px-7 py-3.5 rounded-lg hover:border-white/40 hover:bg-white/5 transition-colors"
            >
              Bekijk wat Stevin doet
            </a>
          </div>

          <p className="text-white/40 text-sm mt-8">
            Voor stichtingen, verenigingen, ANBI&apos;s, SBBI&apos;s, musea, culturele instellingen en goede doelen.
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
            Veel non-profits werken met versnipperde marketing-data.
          </h2>
          <div className="space-y-4 text-muted text-lg leading-relaxed">
            <p>De donatie- of ticketdata zit ergens. De Mailchimp-cijfers ergens anders. Meta en Google zitten weer ergens los. En als er een campagne loopt, is er nauwelijks tijd om handmatig te checken of de creatives nog werken, of een lokaal nieuws-onderwerp momentum bouwt waar je op kan inhaken.</p>
            <p>Daardoor blijft veel impact liggen. Donateurs zien vier weken dezelfde Facebook-ad. De abandoned-donatie-flow blijft in concept-fase. Een mooie peer-mention op Instagram blijft ongezien. En de maandrapportage komt drie weken nadat de schade al is gebeurd.</p>
            <p>Je hoeft het niet alleen uit te zoeken.</p>
          </div>
        </div>
      </section>

      {/* WAT STEVIN DOET */}
      <section id="wat" className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            WAT STEVIN DOET
          </p>
          <h2
            className="font-display font-extrabold text-primary mb-12"
            style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', letterSpacing: '-0.02em', lineHeight: '1.1' }}
          >
            Een intelligentie-laag boven jullie hele marketing-stack.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((b) => (
              <div key={b.title} className="rounded-[14px] border border-border p-7 hover:shadow-lg transition-shadow">
                <h3 className="font-display font-bold text-primary text-lg mb-3">{b.title}</h3>
                <p className="text-muted leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPE ORGANISATIE */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1100px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            TOEGESPITST OP JOUW ORGANISATIE
          </p>
          <h2
            className="font-display font-extrabold text-primary mb-8"
            style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', letterSpacing: '-0.02em', lineHeight: '1.1' }}
          >
            Goed doel of museum: andere klemtonen, zelfde tool.
          </h2>
          <p className="text-muted leading-relaxed mb-10 text-lg">
            De onderliggende capabilities zijn dezelfde. Welke we voor jullie zwaarder aanzetten, hangt af van wat jullie organisatie doet.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[14px] bg-white border border-border p-7">
              <h3 className="font-display font-bold text-primary mb-3">Goede doelen en fondsenwerving</h3>
              <p className="text-muted leading-relaxed mb-4">
                Donor-journeys, campagne-pieken (oktober, kerst), peer- en lotgenoten-mentions, abandoned-donatie flows, retentie van terugkerende donateurs. Stevin tikt zodra een donor-flow stilvalt of een ad fade-out begint.
              </p>
              <p className="text-sm text-muted/80">
                Voor: gezondheidsfondsen, ontwikkelingssamenwerking, dieren- en natuurorganisaties, sociale doelen.
              </p>
            </div>
            <div className="rounded-[14px] bg-white border border-border p-7">
              <h3 className="font-display font-bold text-primary mb-3">Musea en culturele instellingen</h3>
              <p className="text-muted leading-relaxed mb-4">
                Bezoekers-flows, ticket-verkoop, programma-promotie per tentoonstelling, school-uitstap-targeting, partnerships en sponsoring. Stevin volgt zoekvraag rond locatie en programma en signaleert pieken die je live kan benutten.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                Plus: alerts wanneer ticket-resellers of derde partijen op jullie merknaam adverteren in Google. Stevin detecteert brand-bidding door externe partijen zodat jullie geen marge verliezen aan tussenhandel.
              </p>
              <p className="text-sm text-muted/80">
                Voor: musea, theaters, festivals, erfgoed-organisaties, kunsteducatie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VOOR WIE */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[900px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            VOOR WIE
          </p>
          <h2
            className="font-display font-extrabold text-primary mb-8"
            style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', letterSpacing: '-0.02em', lineHeight: '1.1' }}
          >
            Past bij organisaties met een team van 5 tot 50 mensen.
          </h2>

          <p className="text-muted leading-relaxed mb-8 text-lg">
            Stevin werkt het best als jullie minstens twee actieve marketing-kanalen hebben (advertenties, e-mail, social, website-content) en een team dat nu te weinig handen heeft om alles handmatig te volgen.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display font-bold text-primary mb-3">Werkt goed voor</h3>
              <ul className="space-y-2 text-muted">
                <li>• Stichtingen met actieve fondswerving</li>
                <li>• Verenigingen met groeiende ledenbasis</li>
                <li>• Organisaties met ANBI- of SBBI-status</li>
                <li>• Musea en culturele instellingen</li>
                <li>• Gezondheidsfondsen</li>
                <li>• Goede doelen met campagne-pieken (oktober, kerst)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-display font-bold text-primary mb-3">Past minder goed bij</h3>
              <ul className="space-y-2 text-muted">
                <li>• Organisaties zonder digitale marketing-activiteit</li>
                <li>• Eenmans-stichtingen zonder team</li>
                <li>• Overheidsinstellingen</li>
              </ul>
              <p className="text-sm text-muted/80 mt-4">Twijfel je of jullie organisatie past? Plan een korte call, dan kijken we samen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AANVRAAG */}
      <section id="aanvraag" className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[900px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            VRAAG EEN GRATIS CHECK AAN
          </p>
          <h2
            className="font-display font-extrabold text-primary mb-6"
            style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', letterSpacing: '-0.02em', lineHeight: '1.1' }}
          >
            Laat zien hoeveel je nu mist.
          </h2>
          <p className="text-muted leading-relaxed mb-8 text-lg">
            Vul je gegevens in. We doen een korte scan van jullie huidige marketing-stack en sturen terug waar de meeste impact valt te halen. Geen verplichting, geen kosten.
          </p>
          <div className="rounded-[14px] border border-border bg-white p-8">
            <ContactForm subject="Non-profit marketing check: Nederland" />
          </div>
          <p className="text-sm text-muted/80 mt-6">
            Stevin werkt read-only op jullie marketing-data. Geen schrijfrechten op ad-accounts, GA4 of e-mail. Concept-taken landen in jullie projectmanagement-tool, jullie team beslist wat ermee gebeurt.
          </p>
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
            style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', letterSpacing: '-0.02em', lineHeight: '1.1' }}
          >
            Wat je moet weten voor je begint.
          </h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>
    </>
  )
}
