import type { Metadata } from 'next'
import Section from '@/components/Section'
import CTABlock from '@/components/CTABlock'

export const metadata: Metadata = {
  title: 'Werkwijze',
  description: 'Hoe Stevin.AI werkt: van analyse tot continu verbeteren. Een gestructureerde aanpak in vier fasen die je marketing meetbaar en schaalbaar maakt.',
}

const phases = [
  {
    number: 1,
    title: 'Analyse',
    subtitle: 'Begrijpen wat er speelt',
    description: 'We starten met een grondige analyse van je huidige situatie. Geen aannames, maar feiten.',
    details: [
      'Audit van je huidige campagnes, tracking en conversieflow',
      'Analyse van je CRM-inrichting en leadopvolging',
      'Beoordeling van je marketingstack en koppelingen',
      'Identificatie van quick wins en structurele verbeteringen',
      'Meetplan en KPI-framework opstellen',
    ],
    outcome: 'Een helder beeld van waar je staat, wat werkt, wat niet, en een concreet plan voor de volgende stappen.',
  },
  {
    number: 2,
    title: 'Inrichten',
    subtitle: 'De basis op orde brengen',
    description: 'We richten je marketingstack in zodat alles samenwerkt. Tracking, koppelingen, automations en dashboards.',
    details: [
      'Implementatie van tracking (GA4, GTM, Consent Mode)',
      'CRM-inrichting en koppeling met leadbronnen',
      'Opzetten van marketing automation en lead scoring',
      'Landingspagina-optimalisatie',
      'Dashboard-bouw voor rapportage en inzicht',
    ],
    outcome: 'Een werkende marketingstack waarin advertenties, website, CRM en opvolging op elkaar zijn aangesloten.',
  },
  {
    number: 3,
    title: 'Activeren',
    subtitle: 'Live gaan en resultaat genereren',
    description: 'Campagnes gaan live, flows starten en leads worden automatisch verwerkt en opgevolgd.',
    details: [
      'Lancering van campagnes op de juiste kanalen',
      'Activering van automation en opvolgingsflows',
      'Monitoring van conversies en datakwaliteit',
      'Eerste optimalisatieronde op basis van live data',
      'Afstemming met je salesteam over leadkwaliteit',
    ],
    outcome: 'Je marketingsysteem draait. Leads komen binnen, worden opgevolgd en je hebt real-time inzicht in prestaties.',
  },
  {
    number: 4,
    title: 'Verbeteren',
    subtitle: 'Continu optimaliseren op resultaat',
    description: 'We analyseren wat werkt en sturen bij. Niet op gevoel, maar op data.',
    details: [
      'Wekelijkse en maandelijkse performance reviews',
      'Campagne-optimalisatie op basis van klantwaarde',
      'A/B-testen van landingspagina\'s en advertenties',
      'Verfijning van lead scoring en segmentatie',
      'Uitbreiding naar nieuwe kanalen en doelgroepen',
    ],
    outcome: 'Een marketingsysteem dat continu beter wordt en steeds meer rendement oplevert.',
  },
]

export default function WerkwijzePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-12 sm:pt-16 lg:pt-20 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">
              Onze werkwijze
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              Een gestructureerde aanpak in vier fasen. Van analyse tot continu verbeteren. Elke fase bouwt voort op de vorige, zodat je marketing stap voor stap beter wordt.
            </p>
          </div>
        </div>
      </section>

      {/* Phases */}
      {phases.map((phase, index) => (
        <Section key={phase.number} bg={index % 2 === 0 ? 'surface' : 'white'}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Phase indicator */}
            <div className="lg:col-span-2">
              <div className="flex lg:flex-col items-center lg:items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-accent text-white flex items-center justify-center text-xl font-bold">
                  {phase.number}
                </div>
                <div className="lg:hidden">
                  <h2 className="text-2xl font-bold text-primary">{phase.title}</h2>
                  <p className="text-sm text-muted">{phase.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-10">
              <div className="hidden lg:block mb-4">
                <h2 className="text-3xl font-bold text-primary">{phase.title}</h2>
                <p className="text-lg text-muted mt-1">{phase.subtitle}</p>
              </div>
              <p className="text-lg text-muted leading-relaxed mb-6">
                {phase.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-white border border-border">
                  <h3 className="text-base font-bold text-primary mb-4">Wat we doen</h3>
                  <ul className="space-y-2.5">
                    {phase.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5 text-sm text-muted">
                        <svg className="flex-shrink-0 w-4 h-4 text-accent mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 rounded-xl bg-accent/5 border border-accent/10">
                  <h3 className="text-base font-bold text-primary mb-3">Resultaat van deze fase</h3>
                  <p className="text-sm text-muted leading-relaxed">{phase.outcome}</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* Principles */}
      <Section bg="primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Principes die in elke fase terugkomen
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'Transparantie', desc: 'Je weet altijd wat we doen, waarom, en wat het oplevert. Geen verborgen kosten of onduidelijke rapportages.' },
              { title: 'Data-gedreven', desc: 'Elke beslissing is gebaseerd op data. Geen aannames, geen buikgevoel. We meten, analyseren en optimaliseren.' },
              { title: 'Resultaatgericht', desc: 'We sturen op wat ertoe doet: klanten en omzet. Niet op vanity metrics of tussenliggende cijfers.' },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-white/5 border border-white/10 text-left">
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section bg="surface">
        <CTABlock
          title="Klaar om te beginnen?"
          description="Plan een gesprek en we starten met een analyse van je huidige situatie. Binnen twee tot vier weken zijn de eerste verbeteringen live."
          buttonText="Plan een gesprek"
          buttonHref="/contact"
        />
      </Section>
    </>
  )
}
