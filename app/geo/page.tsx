import type { Metadata } from 'next'
import Section from '@/components/Section'
import SectionHeader from '@/components/SectionHeader'
import CTABlock from '@/components/CTABlock'
import FAQAccordion from '@/components/FAQAccordion'

export const metadata: Metadata = {
  title: 'GEO — Generative Engine Optimisation',
  description: 'Zichtbaar zijn in AI-zoekervaringen. Stevin.AI optimaliseert je content en sitestructuur zodat je gevonden wordt in AI-gegenereerde antwoorden van Google, ChatGPT en andere AI-zoekmachines.',
}

const faqs = [
  {
    question: 'Wat is het verschil tussen SEO en GEO?',
    answer: 'SEO richt zich op posities in traditionele zoekresultaten. GEO richt zich op zichtbaarheid in AI-gegenereerde antwoorden. Bij SEO wil je op pagina 1 staan. Bij GEO wil je dat AI-systemen jouw content citeren als bron. Beide zijn complementair en versterken elkaar.',
  },
  {
    question: 'Is GEO relevant voor mijn bedrijf?',
    answer: 'Als je doelgroep zoekt naar informatie, oplossingen of diensten via Google, ChatGPT, Perplexity of andere AI-tools, dan ja. Steeds meer zoekopdrachten worden beantwoord door AI. Bedrijven die daar niet in verschijnen, verliezen zichtbaarheid aan concurrenten die dat wel doen.',
  },
  {
    question: 'Hoe snel levert GEO-optimalisatie resultaat op?',
    answer: 'Structurele verbeteringen zoals structured data en contentstructuur worden relatief snel opgepikt door AI-systemen. Het opbouwen van autoriteit door content clusters kost meer tijd, vergelijkbaar met SEO. Daarom starten we met de technische basis en bouwen we autoriteit geleidelijk op.',
  },
  {
    question: 'Vervangt GEO de klassieke SEO-aanpak?',
    answer: 'Nee. GEO is een aanvulling op SEO, geen vervanging. Veel van de principes overlappen: goede contentstructuur, autoriteit en technische gezondheid zijn voor beide belangrijk. Wij pakken ze samen aan zodat je op beide fronten zichtbaar bent.',
  },
  {
    question: 'Hoe meten jullie GEO-resultaten?',
    answer: 'We monitoren of en hoe je content wordt geciteerd in AI-antwoorden, welke pagina\'s als bron worden gebruikt en hoe je zichtbaarheid zich ontwikkelt ten opzichte van concurrenten. Daarnaast meten we het directe effect op verkeer en leads via onze tracking-infrastructuur.',
  },
]

export default function GEOPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-12 sm:pt-16 lg:pt-20 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">
              GEO &mdash; Zichtbaarheid in AI-zoekervaringen
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              Zoekmachines veranderen. Google geeft AI-gegenereerde antwoorden. ChatGPT, Perplexity en andere tools beantwoorden vragen direct. Als je content niet wordt opgepikt door die systemen, verlies je zichtbaarheid. GEO zorgt ervoor dat je gevonden blijft &mdash; ook in de nieuwe zoekervaring.
            </p>
          </div>
        </div>
      </section>

      {/* What is GEO */}
      <Section bg="surface" id="wat-is-geo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary">
              Wat is Generative Engine Optimisation?
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              GEO is het optimaliseren van je content en sitestructuur zodat AI-systemen je informatie kunnen vinden, begrijpen en citeren. Waar SEO draait om posities in zoekresultaten, draait GEO om aanwezig zijn in de antwoorden die AI genereert.
            </p>
            <p className="mt-4 text-base text-muted leading-relaxed">
              AI-zoekmachines werken anders dan traditionele zoekmachines. Ze lezen je content, beoordelen je autoriteit en besluiten of jouw informatie betrouwbaar genoeg is om te citeren. Dat vereist een andere aanpak dan alleen ranken op zoekwoorden.
            </p>
          </div>
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">Traditionele zoekmachines</h3>
              <p className="text-sm text-muted leading-relaxed">
                Tonen een lijst met links. De gebruiker klikt door en leest je pagina. Succes = hoge positie en hoge doorklikratio.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">AI-zoekervaringen</h3>
              <p className="text-sm text-muted leading-relaxed">
                Genereren een direct antwoord op basis van meerdere bronnen. De gebruiker leest het antwoord zonder altijd door te klikken. Succes = geciteerd worden als betrouwbare bron.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Why it matters alongside classic SEO */}
      <Section bg="white" id="waarom-geo">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary text-center">
            Waarom GEO naast klassieke SEO nodig is
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed text-center">
            Klassieke SEO blijft belangrijk, maar het is niet meer genoeg. Een groeiend deel van zoekopdrachten wordt beantwoord door AI zonder dat de gebruiker doorklikt. Als je daar niet zichtbaar bent, mis je een steeds groter deel van je potentiele doelgroep.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: 'AI Overviews in Google',
                desc: 'Google toont steeds vaker AI-gegenereerde samenvattingen bovenaan de zoekresultaten. Content die daar niet in verschijnt, wordt minder zichtbaar, ongeacht je organische positie.',
              },
              {
                title: 'Direct antwoord via ChatGPT en Perplexity',
                desc: 'Steeds meer mensen zoeken via AI-tools in plaats van Google. Deze tools citeren bronnen, maar alleen als je content goed gestructureerd en betrouwbaar is.',
              },
              {
                title: 'Minder doorklikken',
                desc: 'Gebruikers krijgen hun antwoord zonder je site te bezoeken. Je moet dus al in het antwoord zichtbaar zijn als merk en als bron, niet alleen in de zoekresultaten eronder.',
              },
              {
                title: 'Concurrentievoordeel',
                desc: 'De meeste bedrijven optimaliseren nog alleen voor klassieke SEO. Wie nu investeert in GEO, bouwt een voorsprong op die moeilijk in te halen is.',
              },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-white border border-border">
                <h3 className="text-base font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* How Stevin.AI builds for GEO */}
      <Section bg="surface" id="aanpak">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary">
              Hoe wij je content en sitestructuur optimaliseren voor AI
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              GEO is geen truc of snelle fix. Het vereist een structurele aanpak van je content, je technische setup en je autoriteit. Wij bouwen dat in vijf lagen op.
            </p>
          </div>
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">Heldere, citeerbare antwoorden</h3>
              <p className="text-sm text-muted leading-relaxed">
                Content die direct antwoord geeft op vragen van je doelgroep. Geen vaag verhaal, maar concrete informatie die AI-systemen kunnen extraheren en citeren.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">Logische interne linkstructuur</h3>
              <p className="text-sm text-muted leading-relaxed">
                Een sitestructuur die AI-systemen helpt begrijpen hoe je content samenhangt. Duidelijke hierarchie, contextuele links en navigatie die de relatie tussen onderwerpen expliciet maakt.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">Structured data en schema markup</h3>
              <p className="text-sm text-muted leading-relaxed">
                Technische markup die AI-systemen helpt je content te classificeren: FAQ-schema, organisatie-informatie, product- en dienstbeschrijvingen in een formaat dat machines direct kunnen verwerken.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">Autoriteit door content clusters</h3>
              <p className="text-sm text-muted leading-relaxed">
                Diepgaande content rond je kernonderwerpen, georganiseerd in clusters. AI-systemen beoordelen niet alleen individuele pagina&apos;s, maar je totale autoriteit op een onderwerp. Clusters bouwen die autoriteit op.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">Consistente merkpresentatie</h3>
              <p className="text-sm text-muted leading-relaxed">
                Je merknaam, je expertise en je propositie consistent terugbrengen in je content. Zodat AI-systemen je herkennen als autoriteit en je merk noemen in hun antwoorden.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section bg="white" id="faq">
        <SectionHeader
          title="Veelgestelde vragen over GEO"
          subtitle="Wat Generative Engine Optimisation inhoudt en hoe het zich verhoudt tot SEO."
          centered
        />
        <FAQAccordion faqs={faqs} />
      </Section>

      {/* CTA */}
      <Section bg="surface">
        <CTABlock
          title="Zichtbaar blijven in de nieuwe zoekervaring?"
          description="Plan een gesprek en we laten zien hoe je content en sitestructuur geoptimaliseerd kunnen worden voor AI-zoekmachines."
          buttonText="Plan een gesprek"
          buttonHref="/contact"
        />
      </Section>
    </>
  )
}
