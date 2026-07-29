'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Logo from './Logo'
import { ConsentSettingsButton } from './ConsentBanner'
import TrustBadges from './TrustBadges'

export default function Footer() {
  const t = useTranslations('footer')

  const footerLinks = {
    diensten: [
      { label: t('svc_paid'), href: '/diensten#paid-media' },
      { label: t('svc_ads_uitbesteden'), href: '/google-ads-uitbesteden' },
      { label: t('svc_social_uitbesteden'), href: '/social-media-uitbesteden' },
      { label: t('svc_landing'), href: '/diensten#landing-pages-cro' },
      { label: t('svc_automation'), href: '/marketing-automation' },
      { label: t('svc_crm'), href: '/diensten#crm-leadopvolging' },
      { label: t('svc_tracking'), href: '/diensten#tracking-inzicht' },
      // NL-only SEO-landingspagina's (data/seo-landing-pages.ts), sitewide
      // interne links voor discovery
      { label: 'Marketing intelligence', href: '/marketing-intelligence' },
      { label: 'Leadopvolging', href: '/leadopvolging' },
      { label: 'Marketing voor bureaus', href: '/marketing-voor-bureaus' },
      { label: 'Lead generatie', href: '/lead-generatie' },
      { label: 'Website met CRM', href: '/website-met-crm' },
      { label: 'Google Ads en GA4', href: '/google-ads-ga4' },
      { label: 'First-party data', href: '/first-party-data' },
      { label: 'AI-briefing', href: '/ai-briefing' },
    ],
    bedrijf: [
      { label: t('bedrijf_werkwijze'), href: '/werkwijze' },
      { label: t('bedrijf_simon'), href: '/simon-stevin' },
      { label: t('bedrijf_multimarket'), href: '/multi-market' },
      { label: t('bedrijf_integraties'), href: '/integraties' },
      { label: t('bedrijf_seo'), href: '/seo' },
      { label: t('bedrijf_geo'), href: '/geo' },
      { label: t('voor_ondernemers'), href: '/voor-ondernemers' },
      { label: t('voor_teams'), href: '/voor-marketingteams' },
      { label: t('controle'), href: '/controle' },
      { label: t('platform'), href: '/platform' },
      { label: t('producten'), href: '/producten' },
      { label: t('cases'), href: '/case-studies' },
      { label: t('journal'), href: '/blog' },
      { label: t('vergelijken'), href: '/vergelijken' },
      { label: t('alternatief'), href: '/alternatief' },
      { label: t('woordenboek'), href: '/woordenboek' },
      { label: 'Google Ad Grants (BE)', href: '/google-ad-grants-belgie' },
      { label: 'Google Ad Grants (NL)', href: '/google-ad-grants-nederland' },
      { label: t('bedrijf_contact'), href: '/contact' },
    ],
    integraties: [
      { label: t('int_advertising'), href: '/integraties/advertising' },
      { label: t('int_analytics'), href: '/integraties/analytics-tracking' },
      { label: t('int_crm'), href: '/integraties/crm-sales' },
      { label: t('int_email'), href: '/integraties/email-automation' },
      { label: t('int_cms'), href: '/integraties/cms-ecommerce' },
      { label: t('int_creative'), href: '/integraties/creative-intelligence' },
      { label: t('int_dam'), href: '/integraties/dam-creative-ops' },
      { label: t('int_feed'), href: '/integraties/feed-management' },
      { label: t('int_mmm'), href: '/integraties/mmm-attribution' },
      { label: t('int_all'), href: '/integraties' },
    ],
  }

  return (
    <footer className="bg-[#0A1628] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        {/* Op mobiel twee kolommen naast elkaar. Onder elkaar was de footer
            2.355px, bijna drie schermen, en daarmee het grootste blok van de
            hele site. Niets verbergen, alleen anders neerzetten. */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Logo variant="mono-white" width={130} height={21} />
            </Link>
            <p className="mt-5 text-sm text-slate-400 leading-relaxed">
              {t('tagline')}
            </p>
            <p className="mt-5 text-xs text-slate-500">
              {t('location')}
            </p>
            <TrustBadges className="mt-7 justify-start gap-2" small />
          </div>

          {/* Diensten */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">
              {t('diensten_heading')}
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
              {t('bedrijf_heading')}
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
              {t('integraties_heading')}
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
            &copy; {new Date().getFullYear()} Stevin.AI, {t('copyright')}
          </p>
          <div className="flex items-center gap-4">
            <ConsentSettingsButton />
            <span className="text-xs text-slate-600">|</span>
            <p className="text-xs text-slate-500">
              {t('cities')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
