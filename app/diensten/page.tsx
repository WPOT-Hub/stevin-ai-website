import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/Section'
import CTABlock from '@/components/CTABlock'
import { services } from '@/data/services'

export const metadata: Metadata = {
  title: 'Diensten',
  description: 'Van paid media tot CRM-inrichting en tracking: Stevin.AI bouwt een marketingsysteem dat samenwerkt. Geen losse diensten, maar een werkend geheel.',
}

export default function DienstenPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-12 sm:pt-16 lg:pt-20 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">
              Diensten die samen één systeem vormen
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              Stevin.AI levert geen losse diensten. We bouwen een marketingsysteem waarin paid media, landingspagina&apos;s, automation, CRM en tracking samenwerken. Elk onderdeel versterkt het andere.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      {services.map((service, index) => (
        <Section key={service.slug} id={service.slug} bg={index % 2 === 0 ? 'surface' : 'white'}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-4xl mb-4">{service.icon}</div>
              <h2 className="text-3xl font-bold tracking-tight text-primary">
                {service.title}
              </h2>
              <p className="mt-4 text-lg text-muted leading-relaxed">
                {service.description}
              </p>
            </div>
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-white border border-border">
                <h3 className="text-base font-bold text-primary mb-2">Waarom dit belangrijk is</h3>
                <p className="text-sm text-muted leading-relaxed">{service.whyImportant}</p>
              </div>
              <div className="p-6 rounded-xl bg-white border border-border">
                <h3 className="text-base font-bold text-primary mb-2">Hoe het samenhangt</h3>
                <p className="text-sm text-muted leading-relaxed">{service.howItConnects}</p>
              </div>
              <div className="p-6 rounded-xl bg-white border border-border">
                <h3 className="text-base font-bold text-primary mb-3">Wat we doen</h3>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
                      <svg className="flex-shrink-0 w-4 h-4 text-accent mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* System overview */}
      <Section bg="primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Alles werkt samen
          </h2>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            Paid media genereert verkeer. Landingspagina&apos;s converteren bezoekers. Automation volgt leads op. CRM beheert de pipeline. Tracking meet wat werkt. Samen vormen ze één systeem dat je marketing meetbaar en schaalbaar maakt.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {services.map((service) => (
              <span
                key={service.slug}
                className="px-4 py-2 text-sm font-medium bg-white/10 text-white rounded-lg border border-white/10"
              >
                {service.title}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section bg="surface">
        <CTABlock
          title="Benieuwd hoe dit er voor jouw bedrijf uitziet?"
          description="Plan een gesprek en we laten zien welke onderdelen het meeste impact hebben voor jouw situatie."
          buttonText="Plan een gesprek"
          buttonHref="/contact"
        />
      </Section>
    </>
  )
}
