import type { Metadata } from 'next'
import Section from '@/components/Section'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Plan een gesprek met Stevin.AI. Ontdek hoe paid media, opvolging, tracking en automation beter op elkaar kunnen aansluiten.',
}

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Stevin.AI',
    url: 'https://stevin.ai',
    areaServed: {
      '@type': 'Country',
      name: 'Netherlands',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      availableLanguage: 'Dutch',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: info */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">
              Plan een gesprek
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              Vertel ons waar je tegenaan loopt of wat je wilt bereiken. We denken graag mee over hoe paid media, opvolging, tracking en automation beter op elkaar kunnen aansluiten.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-alt flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary">Locaties</h3>
                  <p className="text-sm text-muted mt-1">Werkzaam vanuit Amsterdam, Eindhoven en Breda.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-alt flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary">Reactietijd</h3>
                  <p className="text-sm text-muted mt-1">We reageren binnen één werkdag op je bericht.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-alt flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary">Vrijblijvend</h3>
                  <p className="text-sm text-muted mt-1">Elk eerste gesprek is vrijblijvend. Geen verplichtingen, geen verkooppraatje.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 rounded-xl bg-surface border border-border">
              <h3 className="text-base font-bold text-primary mb-2">Waar kunnen we je mee helpen?</h3>
              <ul className="space-y-1.5 text-sm text-muted">
                <li>• Audit van je huidige marketingstack</li>
                <li>• Inrichten of verbeteren van tracking en analytics</li>
                <li>• CRM-koppeling en leadopvolging</li>
                <li>• Paid media beheer en optimalisatie</li>
                <li>• Marketing automation en lead nurturing</li>
                <li>• Dashboards en rapportage</li>
              </ul>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  )
}
