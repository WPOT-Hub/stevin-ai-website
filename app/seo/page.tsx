import type { Metadata } from 'next'
import Section from '@/components/Section'
import SectionHeader from '@/components/SectionHeader'
import CTABlock from '@/components/CTABlock'
import FAQAccordion from '@/components/FAQAccordion'

export const metadata: Metadata = {
  title: 'SEO',
  description: 'SEO als onderdeel van een werkend marketingsysteem. Geen losstaande SEO-dienst, maar zoekzichtbaarheid die samenwerkt met paid, CRM, tracking en conversie-optimalisatie.',
}

const faqs = [
  {
    question: 'Leveren jullie SEO als losse dienst?',
    answer: 'Nee. SEO is bij ons altijd onderdeel van een breder marketingsysteem. Losse SEO zonder aansluiting op je landingspagina\'s, CRM en opvolging levert verkeer op dat nergens naartoe gaat. Wij zorgen dat zoekverkeer daadwerkelijk bijdraagt aan leads en omzet.',
  },
  {
    question: 'Hoe lang duurt het voordat SEO resultaat oplevert?',
    answer: 'Technische verbeteringen en structuuroptimalisaties zijn direct merkbaar voor zoekmachines. Organische groei in posities en verkeer zie je doorgaans binnen drie tot zes maanden. Daarom combineren we SEO altijd met kanalen die op korte termijn resultaat leveren, zoals paid media.',
  },
  {
    question: 'Hoe meten jullie het resultaat van SEO?',
    answer: 'We kijken niet alleen naar posities en verkeer, maar naar wat dat verkeer oplevert: leads, aanvragen, klanten. Via onze tracking- en CRM-integratie zien we precies welke organische zoektermen en pagina\'s bijdragen aan je pipeline.',
  },
  {
    question: 'Wat is het verschil met een SEO-bureau?',
    answer: 'Een SEO-bureau optimaliseert je vindbaarheid, maar heeft geen grip op wat er daarna gebeurt. Wij bouwen de hele keten: van zoekresultaat tot landingspagina, van formulier tot CRM, van lead tot opvolging. Dat maakt SEO meetbaar tot op klantniveau.',
  },
  {
    question: 'Werkt SEO samen met jullie paid media aanpak?',
    answer: 'Ja. We gebruiken data uit paid campagnes om te bepalen welke zoektermen organisch het meest waardevol zijn. Andersom gebruiken we organische data om paid campagnes scherper in te richten. Zo versterken beide kanalen elkaar.',
  },
]

export default function SEOPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-12 sm:pt-16 lg:pt-20 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">
              SEO als onderdeel van een werkend marketingsysteem
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              SEO is geen losstaand kanaal. Het werkt pas als het samenhangt met je landingspagina&apos;s, je tracking, je CRM en je opvolging. Wij bouwen zoekzichtbaarheid die aansluit op de rest van je marketing &mdash; zodat organisch verkeer niet alleen binnenkomt, maar ook converteert.
            </p>
          </div>
        </div>
      </section>

      {/* Technical SEO, content structure, landing pages */}
      <Section bg="surface" id="technisch">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary">
              Technische basis, contentstructuur en landingspagina&apos;s
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Goede SEO begint bij een technisch gezonde website. Snelle laadtijden, correcte indexering, gestructureerde data en een logische sitestructuur. Daarbovenop bouwen we content die aansluit op wat je doelgroep zoekt &mdash; niet op volume, maar op relevantie.
            </p>
          </div>
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">Technische SEO</h3>
              <p className="text-sm text-muted leading-relaxed">
                Core Web Vitals, crawlbaarheid, indexatiebeheer, canonical tags, hreflang, structured data en sitemap-optimalisatie. De basis die ervoor zorgt dat zoekmachines je site correct lezen en waarderen.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">Contentstructuur</h3>
              <p className="text-sm text-muted leading-relaxed">
                Pillar pages, topic clusters en interne linkstructuur die zoekmachines laten zien waar je autoriteit ligt. Geen losse blogposts, maar een samenhangende structuur die je domeinautoriteit opbouwt.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">Landingspagina&apos;s</h3>
              <p className="text-sm text-muted leading-relaxed">
                SEO-geoptimaliseerde landingspagina&apos;s die niet alleen ranken, maar ook converteren. Met duidelijke proposities, sterke CTA&apos;s en aansluiting op je CRM voor directe leadverwerking.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Search intent and measurability */}
      <Section bg="white" id="zoekintentie">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary">
              Zoekintentie en meetbaarheid
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Niet elk zoekwoord is even waardevol. Wij richten ons op zoektermen met commerciele intentie &mdash; waar mensen actief op zoek zijn naar een oplossing. En we meten niet alleen verkeer, maar wat dat verkeer oplevert.
            </p>
          </div>
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">Intentie-gedreven keyword research</h3>
              <p className="text-sm text-muted leading-relaxed">
                We segmenteren zoektermen op intentie: informatief, vergelijkend en transactioneel. Je content en pagina&apos;s sluiten aan op waar de zoeker zich bevindt in het beslisproces.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">Van klik tot klant</h3>
              <p className="text-sm text-muted leading-relaxed">
                Via tracking en CRM-integratie meten we de volledige funnel: van organische klik tot lead, van lead tot klant. Zo weet je precies welke pagina&apos;s en zoektermen omzet opleveren.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">Data als basis voor beslissingen</h3>
              <p className="text-sm text-muted leading-relaxed">
                Geen maandelijkse rapportages met alleen posities en verkeersaantallen. We rapporteren op wat ertoe doet: leads, pipeline-waarde en klantwaarde per kanaal en per zoekterm.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Connection between SEO, CRO and lead follow-up */}
      <Section bg="surface" id="seo-cro-opvolging">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary text-center">
            SEO, conversie-optimalisatie en leadopvolging als geheel
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed text-center">
            Verkeer zonder conversie is verspilling. Conversie zonder opvolging is gemiste omzet. Wij verbinden deze drie schakels zodat organisch verkeer daadwerkelijk bijdraagt aan groei.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: 'SEO',
                desc: 'Relevante bezoekers aantrekken via zoekmachines. De juiste mensen op het juiste moment naar de juiste pagina.',
              },
              {
                title: 'CRO',
                desc: 'Bezoekers omzetten naar leads. Pagina-indeling, formulieren, proposities en social proof die conversie verhogen.',
              },
              {
                title: 'Leadopvolging',
                desc: 'Leads automatisch verwerken in je CRM. Scoring, segmentatie en opvolgingsflows zodat sales de juiste leads op het juiste moment spreekt.',
              },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-white border border-border">
                <h3 className="text-base font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-base text-muted leading-relaxed text-center">
            Deze drie werken bij ons als een keten. SEO-data stuurt CRO-prioriteiten. CRO-resultaten voeden de leadopvolging. En leadkwaliteit stuurt weer bij welke zoektermen en pagina&apos;s we prioriteren.
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section bg="white" id="faq">
        <SectionHeader
          title="Veelgestelde vragen over onze SEO-aanpak"
          subtitle="Hoe SEO werkt binnen een marketingsysteem en wat je kunt verwachten."
          centered
        />
        <FAQAccordion faqs={faqs} />
      </Section>

      {/* CTA */}
      <Section bg="surface">
        <CTABlock
          title="Wil je dat je organisch verkeer ook echt oplevert?"
          description="Plan een gesprek en we laten zien hoe SEO binnen jouw marketingsysteem meer leads en klanten kan opleveren."
          buttonText="Plan een gesprek"
          buttonHref="/contact"
        />
      </Section>
    </>
  )
}
