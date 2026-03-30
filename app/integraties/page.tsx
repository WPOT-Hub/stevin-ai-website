import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/Section'
import IntegrationFilter from '@/components/IntegrationFilter'
import { integrations } from '@/data/integrations'
import { categories } from '@/data/categories'

export const metadata: Metadata = {
  title: 'Integraties voor marketing, leadopvolging en groei',
  description: 'Van advertentiekanalen tot CRM, tracking, CDP, dashboards en automation. Stevin.AI koppelt de tools die je al gebruikt, zodat marketing, opvolging en data beter samenwerken.',
}

export default function IntegratiesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Integraties — Stevin.AI',
    description: 'Overzicht van alle tools en platforms die Stevin.AI koppelt en implementeert.',
    url: 'https://stevin.ai/integraties',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-surface pt-16 sm:pt-24 lg:pt-28 pb-20 sm:pb-28">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #0A1628 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/5 border border-accent/10 mb-8">
              <Image src="/logos/logo-icon.svg" alt="" width={16} height={16} />
              <span className="text-sm font-medium text-accent">{integrations.length}+ tools en platforms</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary leading-[1.1]">
              Integraties voor een{' '}
              <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                werkend systeem
              </span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              Van advertentiekanalen tot CRM, tracking en automation. Wij koppelen de tools die je al gebruikt.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">Categorieën</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
            Ontdek per categorie
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const count = integrations.filter((i) => i.category === cat.slug).length
            return (
              <Link
                key={cat.slug}
                href={`/integraties/${cat.slug}`}
                className="group relative p-7 rounded-2xl bg-surface border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-primary group-hover:text-accent transition-colors">{cat.name}</h3>
                  <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">{count}</span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{cat.description}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  Bekijk tools
                  <svg className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>
      </Section>

      {/* All integrations with filter */}
      <Section bg="surface">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">Alle tools</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
            {integrations.length} integraties
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Zoek direct naar een specifieke tool of platform.
          </p>
        </div>
        <IntegrationFilter integrations={integrations} />
      </Section>

      {/* CTA */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-[#0A1628] px-8 py-20 sm:px-16 sm:py-24 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #3D8EFF 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }} />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Werk je met tools die je hier niet ziet?
              </h2>
              <p className="mt-6 text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
                We werken met elk platform dat een API of koppeling biedt.
              </p>
              <Link
                href="/contact"
                className="mt-10 group inline-flex items-center px-8 py-4 text-base font-semibold text-[#0A1628] bg-white rounded-xl hover:bg-slate-100 transition-all duration-200 shadow-lg"
              >
                Plan een gesprek
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
