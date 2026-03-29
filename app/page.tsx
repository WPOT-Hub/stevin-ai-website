import Link from 'next/link'
import Section from '@/components/Section'
import SectionHeader from '@/components/SectionHeader'
import ProofChips from '@/components/ProofChips'
import ServiceCard from '@/components/ServiceCard'
import StepCard from '@/components/StepCard'
import ResultCard from '@/components/ResultCard'
import FAQAccordion from '@/components/FAQAccordion'
import CTABlock from '@/components/CTABlock'
import IntegrationGrid from '@/components/IntegrationGrid'
import { services } from '@/data/services'
import { homepageFaqs } from '@/data/faqs'
import { integrations } from '@/data/integrations'
import { categories } from '@/data/categories'

const solutionSteps = [
  {
    title: 'Aantrekken',
    description: 'We zetten de juiste kanalen in om je doelgroep te bereiken. Google Ads, Meta, LinkedIn en meer — afgestemd op waar je klanten zich bevinden.',
  },
  {
    title: 'Vastleggen',
    description: 'We zorgen dat verkeer converteert. Met sterke landingspagina\'s, slimme formulieren en tracking die elke conversie vastlegt.',
  },
  {
    title: 'Opvolgen',
    description: 'Leads worden automatisch verwerkt, gescoord en opgevolgd. Via automation, CRM en notificaties — zodat geen enkele kans wordt gemist.',
  },
  {
    title: 'Verbeteren',
    description: 'We analyseren wat werkt en wat niet. Data uit alle kanalen komt samen in heldere dashboards. Zo optimaliseren we continu op echte resultaten.',
  },
]

const results = [
  { icon: '⚡', text: 'Sneller inzicht in prestaties door gecentraliseerde data en heldere dashboards' },
  { icon: '🔗', text: 'Betere aansluiting tussen advertenties, website, CRM en opvolging' },
  { icon: '💰', text: 'Minder verspilling in budget en handwerk door slimme automations' },
  { icon: '🏃', text: 'Hogere snelheid tussen een nieuwe lead en het eerste contactmoment' },
  { icon: '📈', text: 'Meer grip op rendement door te meten wat echt klanten oplevert' },
]

const werkwijzeSteps = [
  { title: 'Analyse', description: 'We brengen je huidige situatie in kaart. Wat werkt, wat niet, en waar liggen de grootste kansen.' },
  { title: 'Inrichten', description: 'We richten je marketingstack in: tracking, koppelingen, automations en dashboards.' },
  { title: 'Activeren', description: 'Campagnes gaan live, flows starten en leads worden automatisch verwerkt.' },
  { title: 'Verbeteren', description: 'We optimaliseren continu op basis van echte data en resultaten.' },
]

export default function HomePage() {
  // Get a sample of integrations per category for the preview
  const integrationsByCategory = categories.map((cat) => ({
    category: cat,
    items: integrations.filter((i) => i.category === cat.slug),
  }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Stevin.AI',
    description: 'Marketing met AI waar het versnelt. Onze kennis maakt het verschil. Van klik tot klant.',
    url: 'https://stevin.ai',
    areaServed: 'NL',
    knowsAbout: ['Online Marketing', 'Marketing Automation', 'CRM', 'Paid Media', 'Analytics'],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative bg-white pt-12 sm:pt-16 lg:pt-24 pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary leading-tight max-w-4xl mx-auto">
            Marketing met AI waar het versnelt.{' '}
            <span className="text-accent">Onze kennis maakt het verschil.</span>
          </h1>
          <p className="mt-6 text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Meer leads. Betere opvolging. Minder waste.
          </p>
          <div className="mt-4 space-y-1">
            <p className="text-base text-muted">
              Geen marge op je mediabudget.
            </p>
            <p className="text-base text-muted">
              De techniek zorgt dat alles klopt. Van klik tot klant.
            </p>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 text-base font-semibold text-white bg-accent rounded-xl hover:bg-accent-dark transition-colors"
            >
              Plan een gesprek
            </Link>
            <Link
              href="/werkwijze"
              className="inline-flex items-center px-8 py-3.5 text-base font-semibold text-primary bg-surface-alt rounded-xl border border-border hover:bg-surface transition-colors"
            >
              Bekijk hoe het werkt
            </Link>
          </div>
          <ProofChips />
        </div>
      </section>

      {/* ===== PROBLEEM ===== */}
      <Section bg="surface">
        <SectionHeader
          title="Herkenbaar?"
          subtitle="De meeste bedrijven laten geld liggen in hun marketing. Niet door slechte campagnes, maar door slechte afstemming."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { icon: '🎯', text: 'Sturen op klikken in plaats van op klanten. Je optimaliseert op verkeer, maar weet niet wat het oplevert.' },
            { icon: '🔌', text: 'Campagnes, website, CRM en opvolging sluiten niet op elkaar aan. Elke tool werkt los.' },
            { icon: '⏱️', text: 'Leads worden niet snel of goed genoeg opgevolgd. Elke minuut vertraging kost conversie.' },
            { icon: '📉', text: 'Budget lekt weg door slechte afstemming en gebrek aan inzicht. Je ziet niet waar het fout gaat.' },
          ].map((item) => (
            <div key={item.text} className="flex items-start gap-4 p-6 rounded-xl bg-white border border-border">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <p className="text-sm text-primary leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== OPLOSSING ===== */}
      <Section>
        <SectionHeader
          title="Van klik tot klant in vier stappen"
          subtitle="We pakken niet één onderdeel aan, maar de hele route. AI versnelt. Kennis bepaalt. Techniek verbindt."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutionSteps.map((step, index) => (
            <StepCard key={step.title} number={index + 1} title={step.title} description={step.description} />
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
          {[
            { label: 'AI versnelt', icon: '⚡' },
            { label: 'Kennis bepaalt', icon: '🧠' },
            { label: 'Techniek verbindt', icon: '🔗' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-alt border border-border">
              <span>{item.icon}</span>
              <span className="font-medium text-primary">{item.label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== DIENSTEN ===== */}
      <Section bg="surface">
        <SectionHeader
          title="Wat we doen"
          subtitle="Vijf disciplines die samen één systeem vormen. Van het aantrekken van verkeer tot het opvolgen van leads."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              title={service.title}
              description={service.shortDescription}
              icon={service.icon}
              href={`/diensten#${service.slug}`}
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/diensten"
            className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
          >
            Bekijk alle diensten
            <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </Section>

      {/* ===== AI + KENNIS ===== */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
            AI waar het versnelt. Kennis waar het verschil wordt gemaakt.
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            Wij gebruiken AI om analyse, signalering, scoring en optimalisatie te versnellen. Strategie, creatie, kanaalkeuzes en commerciële afwegingen blijven mensenwerk. Zo combineer je snelheid met grip.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <div className="p-6 rounded-xl bg-surface border border-border">
              <h3 className="text-base font-bold text-primary mb-3">AI versnelt</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Data-analyse en patroonherkenning</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Lead scoring en signalering</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Campagne-optimalisatie</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Rapportage en anomaliedetectie</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-surface border border-border">
              <h3 className="text-base font-bold text-primary mb-3">Kennis bepaalt</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Strategie en positionering</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Kanaalkeuzes en budgetverdeling</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Creatieve richting</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Commerciële afwegingen</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ===== TRANSPARANTIE ===== */}
      <Section bg="primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Geen marge op je mediabudget.
          </h2>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            Veel bureaus verdienen een percentage op je ad spend. Dat geeft verkeerde prikkels: hoe meer je uitgeeft, hoe meer zij verdienen — ongeacht het resultaat.
          </p>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            Stevin.AI verdient aan werk, kennis, techniek en optimalisatie. Niet aan een verborgen marge op je mediabudget. Zo werken we altijd in jouw belang.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Transparant model', desc: 'Je weet precies waarvoor je betaalt.' },
              { label: 'Geen verkeerde prikkels', desc: 'We verdienen niet meer als je meer uitgeeft.' },
              { label: 'Jouw belang eerst', desc: 'Optimaliseren op resultaat, niet op spend.' },
            ].map((item) => (
              <div key={item.label} className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-base font-bold text-white mb-2">{item.label}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===== TECHNIEK ===== */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
            De techniek zorgt dat alles klopt. Van klik tot klant.
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            Advertenties, tracking, website, formulieren, CRM en opvolging moeten samenwerken als één systeem. Losse tools zorgen voor ruis en verspilling.
          </p>
          <p className="mt-4 text-lg text-muted leading-relaxed">
            Stevin.AI verbindt je stack zodat je beter kunt sturen op resultaat. Geen losse eilandjes, maar een werkend geheel.
          </p>
        </div>
      </Section>

      {/* ===== INTEGRATIES PREVIEW ===== */}
      <Section bg="surface">
        <SectionHeader
          title="Integraties voor een werkend marketingsysteem"
          subtitle="Van advertentiekanalen tot CRM, tracking, CDP, dashboards en automation. We koppelen de tools die je al gebruikt."
        />
        <div className="space-y-12">
          {integrationsByCategory.map(({ category, items }) => (
            <div key={category.slug}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-primary">{category.name}</h3>
                <Link
                  href={`/integraties/categorie/${category.slug}`}
                  className="text-sm font-medium text-accent hover:text-accent-dark transition-colors"
                >
                  Bekijk alle →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {items.map((integration) => (
                  <Link
                    key={integration.slug}
                    href={`/integraties/${integration.slug}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white border border-border hover:border-accent/30 hover:shadow-sm transition-all text-sm font-medium text-primary"
                  >
                    <span className="w-8 h-8 rounded bg-surface-alt flex items-center justify-center text-xs font-bold text-accent flex-shrink-0">
                      {integration.name.charAt(0)}
                    </span>
                    <span className="truncate">{integration.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/integraties"
            className="inline-flex items-center px-8 py-3.5 text-base font-semibold text-white bg-accent rounded-xl hover:bg-accent-dark transition-colors"
          >
            Bekijk alle integraties
          </Link>
        </div>
      </Section>

      {/* ===== RESULTATEN ===== */}
      <Section>
        <SectionHeader
          title="Wat het oplevert"
          subtitle="Geen nep-statistieken. Wel concrete verbeteringen die je merkt in je dagelijkse marketing."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {results.map((result) => (
            <ResultCard key={result.text} icon={result.icon} text={result.text} />
          ))}
        </div>
      </Section>

      {/* ===== WERKWIJZE PREVIEW ===== */}
      <Section bg="surface">
        <SectionHeader
          title="Hoe we werken"
          subtitle="Een gestructureerde aanpak in vier fasen. Van analyse tot continu verbeteren."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {werkwijzeSteps.map((step, index) => (
            <StepCard key={step.title} number={index + 1} title={step.title} description={step.description} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/werkwijze"
            className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
          >
            Lees meer over onze werkwijze
            <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </Section>

      {/* ===== FAQ ===== */}
      <Section>
        <SectionHeader
          title="Veelgestelde vragen"
        />
        <FAQAccordion faqs={homepageFaqs} />
      </Section>

      {/* ===== FINAL CTA ===== */}
      <Section bg="surface">
        <CTABlock
          title="Klaar om minder waste uit je marketing te halen?"
          description="Plan een gesprek en ontdek hoe paid media, opvolging, tracking en automation beter op elkaar kunnen aansluiten."
          buttonText="Plan een gesprek"
          buttonHref="/contact"
        />
      </Section>
    </>
  )
}
