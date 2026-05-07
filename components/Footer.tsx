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
      { label: t('svc_landing'), href: '/diensten#landing-pages-cro' },
      { label: t('svc_automation'), href: '/marketing-automation' },
      { label: t('svc_crm'), href: '/diensten#crm-leadopvolging' },
      { label: t('svc_tracking'), href: '/diensten#tracking-inzicht' },
    ],
    bedrijf: [
      { label: t('bedrijf_werkwijze'), href: '/werkwijze' },
      { label: t('bedrijf_simon'), href: '/simon-stevin' },
      { label: t('bedrijf_multimarket'), href: '/multi-market' },
      { label: t('bedrijf_integraties'), href: '/integraties' },
      { label: t('bedrijf_seo'), href: '/seo' },
      { label: t('bedrijf_geo'), href: '/geo' },
      { label: t('bedrijf_agencies'), href: '/voor-agencies' },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
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
            &copy; {new Date().getFullYear()} Stevin.AI — {t('copyright')}
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
