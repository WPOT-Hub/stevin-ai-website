'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'

interface Package {
  name: string
  desc: string
  features: string[]
  popular: boolean
}

interface Category {
  id: string
  label: string
  packages: Package[]
}

const categories: Category[] = [
  {
    id: 'paid',
    label: 'Paid Ads',
    packages: [
      {
        name: 'Starter',
        desc: 'Voor eerste campagnes',
        features: [
          'Google & Meta',
          'Dedicated specialist',
          '2 koppelingen inbegrepen',
          'Maandelijkse rapportage',
        ],
        popular: false,
      },
      {
        name: 'Professional',
        desc: 'Voor serieuze groei',
        features: [
          'Alle kanalen (Google, Meta, TikTok, LinkedIn)',
          'Dedicated specialist',
          '3 koppelingen inbegrepen',
          'Conversietracking setup',
          'AI-gedreven optimalisatie',
        ],
        popular: true,
      },
      {
        name: 'Enterprise',
        desc: 'Voor maximale schaal',
        features: [
          'Alle kanalen + programmatic',
          'Dedicated specialist',
          '5+ koppelingen inbegrepen',
          'Geavanceerde attributie',
          'Custom dashboards',
          '24/7 monitoring',
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
        desc: 'Voor basisvindbaarheid',
        features: [
          'Focus op 1 categorie',
          'Technische SEO check',
          'AI-zoekoptimalisatie',
          'Kwartaalrapportage',
        ],
        popular: false,
      },
      {
        name: 'Professional',
        desc: 'Voor structurele groei',
        features: [
          'Meerdere categorieen',
          'LLM & GEO optimalisatie',
          'Content strategie',
          'Maandelijkse rapportage',
        ],
        popular: true,
      },
      {
        name: 'Enterprise',
        desc: 'Voor marktdominantie',
        features: [
          'Volledige cluster aanpak',
          'Topical authority',
          'Concurrentie analyse',
          'Dashboard met AI-inzichten',
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
        desc: 'Voor eerste flows',
        features: [
          'Lead notificaties',
          'Basis e-mail flows',
          'CRM koppeling',
        ],
        popular: false,
      },
      {
        name: 'Professional',
        desc: 'Voor volledige opvolging',
        features: [
          'Lead scoring',
          'Geavanceerde flows',
          'Multi-channel automation',
          'WhatsApp & SMS',
        ],
        popular: true,
      },
      {
        name: 'Enterprise',
        desc: 'Voor maximale conversie',
        features: [
          'Custom integraties',
          'Predictive lead scoring',
          'Revenue attribution',
          'Dedicated automation specialist',
        ],
        popular: false,
      },
    ],
  },
  {
    id: 'agency',
    label: 'Agency',
    packages: [
      {
        name: 'Agency Partner',
        desc: 'Schaal jouw bureau met Stevin als technologiepartner',
        features: [
          'Intelligence-laag onder je dienst',
          'Multi-client beheer',
          'Dedicated connectors per klant',
          'Prioriteit support & onboarding',
          'Gezamenlijke rapportages',
          'Volume korting bij meerdere klanten',
          'Jouw bureau blijft het gezicht',
          'Dedicated account manager',
        ],
        popular: true,
      },
    ],
  },
]

export default function PricingTabs() {
  const [activeTab, setActiveTab] = useState('paid')
  const activeCat = categories.find((c) => c.id === activeTab)!
  const isSingleCard = activeCat.packages.length === 1

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center bg-surface rounded-xl p-1.5 border border-border flex-wrap justify-center gap-1">
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
      <div className={`max-w-5xl mx-auto ${
        isSingleCard
          ? 'flex justify-center'
          : 'grid grid-cols-1 md:grid-cols-3 gap-6'
      }`}>
        {activeCat.packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`relative p-8 rounded-2xl border transition-all ${
              isSingleCard ? 'max-w-lg w-full' : ''
            } ${
              pkg.popular
                ? 'bg-[#0A1628] border-accent/30 shadow-xl shadow-accent/10 md:scale-[1.03]'
                : 'bg-white border-border hover:border-accent/20 hover:shadow-lg'
            }`}
          >
            {pkg.popular && !isSingleCard && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-white text-xs font-bold whitespace-nowrap">
                Meest gekozen
              </div>
            )}
            {isSingleCard && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-white text-xs font-bold whitespace-nowrap">
                Voor bureaus
              </div>
            )}
            <h3 className={`text-lg font-bold mb-1 ${pkg.popular ? 'text-white' : 'text-primary'}`}>
              {isSingleCard ? pkg.name : `${activeCat.label} ${pkg.name}`}
            </h3>
            <p className={`text-sm mb-5 ${pkg.popular ? 'text-slate-400' : 'text-muted'}`}>{pkg.desc}</p>
            <div className="mb-6">
              <span className={`text-2xl font-bold ${pkg.popular ? 'text-white/90' : 'text-primary'}`}>
                Op maat
              </span>
              <span className={`text-sm ml-2 ${pkg.popular ? 'text-slate-400' : 'text-muted'}`}>voorstel na gesprek</span>
            </div>
            <Link
              href="/contact"
              className={`block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200 mb-6 ${
                pkg.popular
                  ? 'bg-neon text-[#0A1628] hover:bg-neon-dark neon-glow'
                  : 'bg-surface text-primary border border-border hover:border-accent/30 hover:shadow-md'
              }`}
            >
              Plan een gesprek
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

      {/* Bottom note */}
      <p className="text-center text-sm text-muted mt-8 max-w-lg mx-auto">
        Geen marge op je mediabudget. Vaste maandprijs afgestemd op jouw situatie.
        Combineer meerdere diensten voor een totaalaanpak.
      </p>
    </div>
  )
}
