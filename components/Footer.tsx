'use client'

import Link from 'next/link'
import Logo from './Logo'
import { ConsentSettingsButton } from './ConsentBanner'

const footerLinks = {
  diensten: [
    { label: 'Paid Media', href: '/diensten#paid-media' },
    { label: 'Landing Pages & CRO', href: '/diensten#landing-pages-cro' },
    { label: 'Marketing Automation', href: '/diensten#marketing-automation' },
    { label: 'CRM & Leadopvolging', href: '/diensten#crm-leadopvolging' },
    { label: 'Tracking & Inzicht', href: '/diensten#tracking-inzicht' },
  ],
  bedrijf: [
    { label: 'Werkwijze', href: '/werkwijze' },
    { label: 'Integraties', href: '/integraties' },
    { label: 'SEO', href: '/seo' },
    { label: 'GEO', href: '/geo' },
    { label: 'Contact', href: '/contact' },
  ],
  integraties: [
    { label: 'Advertising', href: '/integraties/advertising' },
    { label: 'Analytics & Tracking', href: '/integraties/analytics-tracking' },
    { label: 'CRM & Sales', href: '/integraties/crm-sales' },
    { label: 'Email & Automation', href: '/integraties/email-automation' },
    { label: 'CMS & Ecommerce', href: '/integraties/cms-ecommerce' },
    { label: 'CDP & Data', href: '/integraties/cdp-data-warehousing' },
    { label: 'Consent & Tagging', href: '/integraties/consent-tagging' },
    { label: 'Reporting', href: '/integraties/reporting-dashboards' },
    { label: 'ATS & Recruitment', href: '/integraties/ats-recruitment' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <Logo variant="mono-white" width={130} height={21} />
            </Link>
            <p className="mt-5 text-sm text-slate-400 leading-relaxed">
              Marketing met AI waar het versnelt. Onze kennis maakt het verschil. Van klik tot klant.
            </p>
            <p className="mt-5 text-xs text-slate-500">
              Werkzaam vanuit Amsterdam, Eindhoven en Breda.
            </p>
          </div>

          {/* Diensten */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">
              Diensten
            </h4>
            <ul className="space-y-3">
              {footerLinks.diensten.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bedrijf */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">
              Bedrijf
            </h4>
            <ul className="space-y-3">
              {footerLinks.bedrijf.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Integraties */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">
              Integraties
            </h4>
            <ul className="space-y-3">
              {footerLinks.integraties.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Stevin.AI — Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-4">
            <ConsentSettingsButton />
            <span className="text-xs text-slate-600">|</span>
            <p className="text-xs text-slate-500">
              Amsterdam &middot; Eindhoven &middot; Breda
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
