import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Case Studies — Stevin',
  description: 'Ontdek hoe bedrijven hun marketing transformeren met het Stevin platform.',
}

const caseStudies = [
  {
    slug: 'e-commerce',
    industry: 'E-commerce',
    title: 'Van losse campagnes naar een geIntegreerd marketing systeem',
    subtitle: 'Hoe een snelgroeiend e-commerce bedrijf 42% meer leads genereerde en 8 uur per week bespaarde',
    metric: '+42%',
    metricLabel: 'meer leads',
  },
]

export default function CaseStudiesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-mesh-gradient opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Case Studies</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Echte resultaten van echte bedrijven. Ontdek hoe het Stevin platform marketing transformeert.
          </p>
        </div>
      </section>

      {/* Cases grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="grid grid-cols-1 gap-8">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group rounded-2xl border border-border bg-white p-8 sm:p-10 hover:shadow-xl hover:border-accent/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="flex-1">
                    <span className="inline-flex px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
                      {cs.industry}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                      {cs.title}
                    </h2>
                    <p className="text-muted">{cs.subtitle}</p>
                  </div>
                  <div className="text-center sm:text-right flex-shrink-0">
                    <p className="text-4xl font-bold text-accent">{cs.metric}</p>
                    <p className="text-sm text-muted">{cs.metricLabel}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-muted mb-4">Meer case studies volgen binnenkort.</p>
            <Link href="/contact" className="inline-flex px-6 py-3 text-sm font-semibold text-white bg-accent rounded-xl hover:bg-accent-dark transition-colors">
              Wil je de volgende zijn?
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
