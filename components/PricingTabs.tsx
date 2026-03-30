'use client'

import { useState } from 'react'
import Link from 'next/link'

const categories = [
  {
    id: 'paid',
    label: 'Paid Ads',
    packages: [
      {
        name: 'Starter',
        price: '950',
        desc: 'Voor eerste campagnes',
        features: [
          'Google & Meta campagnes',
          '< €3.000 adspend p/m',
          '2 koppelingen inbegrepen',
          'Maandelijkse optimalisatie',
          'Rapportage & dashboard',
        ],
        popular: false,
      },
      {
        name: 'Professional',
        price: '1.650',
        desc: 'Voor serieuze groei',
        features: [
          'Google, Meta & TikTok',
          '< €8.000 adspend p/m',
          '3 koppelingen inbegrepen',
          'Wekelijkse optimalisatie',
          'Conversietracking setup',
          'A/B testing',
        ],
        popular: true,
      },
      {
        name: 'Enterprise',
        price: '2.450',
        desc: 'Voor maximale schaal',
        features: [
          'Alle kanalen incl. LinkedIn',
          '< €25.000 adspend p/m',
          '5 koppelingen inbegrepen',
          'Dedicated specialist',
          'Geavanceerde attributie',
          'Custom dashboards',
          'Wekelijkse call',
        ],
        popular: false,
      },
    ],
  },
  {
    id: 'seo',
    label: 'SEO & GEO',
    packages: [
      {
        name: 'Starter',
        price: '950',
        desc: 'Voor basisvindbaarheid',
        features: [
          'Technische SEO audit',
          'Focus op 1 categorie',
          '2 koppelingen inbegrepen',
          'AI-zoekoptimalisatie',
          'Basis linkbuilding',
          'Kwartaalrapportage',
        ],
        popular: false,
      },
      {
        name: 'Professional',
        price: '1.450',
        desc: 'Voor structurele groei',
        features: [
          'Alles uit Starter',
          'Meerdere categorieën',
          '3 koppelingen inbegrepen',
          'LLM & GEO optimalisatie',
          'Content strategie',
          'Maandelijkse rapportage',
          'Authority building',
        ],
        popular: true,
      },
      {
        name: 'Enterprise',
        price: '2.250',
        desc: 'Voor marktdominantie',
        features: [
          'Alles uit Professional',
          'Volledige cluster aanpak',
          '5 koppelingen inbegrepen',
          'Topical authority',
          'Concurrentie analyse',
          'PR & linkbuilding',
          'Dashboard met AI-inzichten',
          'Wekelijkse call',
        ],
        popular: false,
      },
    ],
  },
  {
    id: 'automation',
    label: 'Automation',
    packages: [
      {
        name: 'Starter',
        price: '750',
        desc: 'Voor eerste flows',
        features: [
          'Lead notificaties',
          'Basis e-mail flows',
          '2 koppelingen inbegrepen',
          'CRM koppeling',
          'Formulier integratie',
        ],
        popular: false,
      },
      {
        name: 'Professional',
        price: '1.350',
        desc: 'Voor volledige opvolging',
        features: [
          'Alles uit Starter',
          '3 koppelingen inbegrepen',
          'Lead scoring',
          'Geavanceerde flows',
          'Multi-channel automation',
          'Pipeline management',
          'Maandelijkse optimalisatie',
        ],
        popular: true,
      },
      {
        name: 'Enterprise',
        price: '1.950',
        desc: 'Voor maximale conversie',
        features: [
          'Alles uit Professional',
          '5 koppelingen inbegrepen',
          'Custom integraties',
          'Predictive lead scoring',
          'Revenue attribution',
          'Dedicated support',
          'Wekelijkse call',
        ],
        popular: false,
      },
    ],
  },
]

export default function PricingTabs() {
  const [activeTab, setActiveTab] = useState('paid')
  const activeCat = categories.find((c) => c.id === activeTab)!

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center bg-surface rounded-xl p-1.5 border border-border">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 sm:px-7 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === cat.id
                  ? 'bg-[#0A1628] text-white shadow-md'
                  : 'text-muted hover:text-primary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {activeCat.packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`relative p-8 rounded-2xl border transition-all ${
              pkg.popular
                ? 'bg-[#0A1628] border-accent/30 shadow-xl shadow-accent/10 md:scale-[1.03]'
                : 'bg-white border-border hover:border-accent/20 hover:shadow-lg'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-white text-xs font-bold whitespace-nowrap">
                Meest gekozen
              </div>
            )}
            <h3 className={`text-lg font-bold mb-1 ${pkg.popular ? 'text-white' : 'text-primary'}`}>
              {activeCat.label} {pkg.name}
            </h3>
            <p className={`text-sm mb-5 ${pkg.popular ? 'text-slate-400' : 'text-muted'}`}>{pkg.desc}</p>
            <div className="mb-6">
              <span className={`text-4xl font-bold ${pkg.popular ? 'text-white' : 'text-primary'}`}>
                €{pkg.price}
              </span>
              <span className={`text-sm ml-1 ${pkg.popular ? 'text-slate-400' : 'text-muted'}`}>p/m</span>
            </div>
            <Link
              href="/contact"
              className={`block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200 mb-6 ${
                pkg.popular
                  ? 'bg-neon text-[#0A1628] hover:bg-neon-dark neon-glow'
                  : 'bg-surface text-primary border border-border hover:border-accent/30 hover:shadow-md'
              }`}
            >
              Start vandaag
            </Link>
            <ul className="space-y-2.5">
              {pkg.features.map((feature) => (
                <li
                  key={feature}
                  className={`flex items-start gap-2.5 text-sm ${
                    pkg.popular ? 'text-slate-300' : 'text-muted'
                  }`}
                >
                  <svg
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pkg.popular ? 'text-neon' : 'text-accent'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
