'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Logo from './Logo'
import { ConsentSettingsButton } from './ConsentBanner'
import TrustBadges from './TrustBadges'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  const tNav = useTranslations('nav')

  // W-535 (12 okt 2026): na het snoeien bleef van de kolommen Diensten en
  // Integraties in het Engels niets over (/en/google-ads-uitbesteden,
  // /en/leadopvolging en /en/integraties geven 410, de rest heeft een 301), en
  // van Bedrijf alleen wat hieronder staat. Deze lange footer staat alleen nog
  // op /en; de Nederlandse site heeft overal de korte footer hieronder.
  const footerLinks = {
    bedrijf: [
      { label: t('platform'), href: '/platform' },
      { label: tNav('tarieven'), href: '/tarieven' },
      { label: t('bedrijf_simon'), href: '/simon-stevin' },
      { label: t('journal'), href: '/blog' },
      { label: t('bedrijf_contact'), href: '/contact' },
    ],
    // Juridisch. Deze pagina's bestonden al maar waren alleen bereikbaar als je
    // de URL kende. Voor "ter hand stellen" bij het sluiten van een overeenkomst
    // (art. 6:233 sub b en 6:234 BW) en voor de clickwrap in het klantportaal is
    // dat te mager: ze horen sitewide vindbaar te zijn.
    juridisch: [
      { label: t('legal_terms'), href: '/terms' },
      { label: t('legal_dpa'), href: '/dpa' },
      { label: t('legal_privacy'), href: '/privacy' },
      { label: t('legal_nda'), href: '/nda' },
    ],
  }

  // W-535, 12 okt 2026: sinds het snoeien heeft de hele Nederlandse site deze
  // korte footer, niet alleen de homepage. Wat hieronder over "de rest van de
  // site" staat, is daarmee voorbij.
  //
  // W-535: op de nieuwe Nederlandse homepage een korte footer. Koen, 10 okt
  // 23:26: "we gaan heel veel pagina's snoeien, of verbergen op zijn minst".
  // De pagina's blijven bestaan en staan in de sitemap; de rest van de site
  // houdt deze volledige footer tot de snoeironde. Op / blijven de links die
  // moeten blijven (vindbaarheidstoets 11 okt, A3): de twee uitbesteed-pagina's
  // zijn de enige commerciele zoektermen waar ons soort pagina bij de SERP
  // past, en via Journal en Integraties blijven blog en integratiepagina's
  // bereikbaar. Plan een kennismaking opent hetzelfde venster als de header,
  // met /kennismaking als terugval zonder JS. usePathname geeft het pad zonder
  // taal, dus ook op /en is dat '/': vandaar de taal erbij.
  if (locale === 'nl') {
    const hoofd: { label: string; href: string; cta?: string }[] = [
      { label: t('svc_ads_uitbesteden'), href: '/google-ads-uitbesteden' },
      { label: t('svc_social_uitbesteden'), href: '/social-media-uitbesteden' },
      // W-535: Leadopvolging, Marketing intelligence, Aizy vs Stevin.AI en
      // Simon Stevin blijven en staan in de sitemap, maar na het snoeien linkte
      // geen andere pagina er nog heen (de lange footer is weg). Zonder deze
      // regels zouden ze los in de sitemap hangen.
      { label: 'Leadopvolging', href: '/leadopvolging' },
      { label: 'Marketing intelligence', href: '/marketing-intelligence' },
      { label: 'Zo werkt Stevin', href: '/platform' },
      { label: 'Tarieven', href: '/tarieven' },
      { label: t('journal'), href: '/blog' },
      { label: t('bedrijf_integraties'), href: '/integraties' },
      { label: t('bedrijf_simon'), href: '/simon-stevin' },
      { label: t('bedrijf_contact'), href: '/contact' },
      { label: 'Plan een kennismaking', href: '/kennismaking', cta: 'footer_kennismaking' },
    ]
    return (
      <footer className="bg-[#0A1628] text-white">
        <div className="mx-auto max-w-[1200px] px-6 py-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <Link href="/" className="inline-block">
                <Logo variant="mono-white" width={120} height={19} />
              </Link>
              {/* De korte belofte uit D-086 (verkoopsynthese 11 okt). "Op jouw
                  naam." eraf op 14 okt (Koen: "je legt het er zo dik op"): de
                  footer zette het op elke pagina. Het staat waar het uitgelegd
                  wordt, op /platform en /google-ads-uitbesteden. */}
              <p className="mt-4 max-w-[320px] text-balance text-[14px] leading-relaxed text-slate-400">
                Stevin.AI zorgt dat je marketing blijft werken.
              </p>
            </div>
            <nav aria-label="Footer">
              <ul className="m-0 grid list-none grid-cols-2 gap-x-10 gap-y-3 p-0 text-[15px]">
                {hoofd.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      data-cta={l.cta}
                      data-open-kennismaking={l.cta ? '' : undefined}
                      className="text-slate-300 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-[13px] text-slate-400">
            {footerLinks.juridisch.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-slate-300">
                {l.label}
              </Link>
            ))}
            <ConsentSettingsButton />
          </div>
          {/* Artikel 3:15d BW: naam, KVK- en btw-nummer staan op elke pagina,
              ook in de korte footer. */}
          <p className="m-0 mt-4 text-[12px] text-slate-500">{t('company_details')}</p>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-[#0A1628] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        {/* Op mobiel twee kolommen naast elkaar. Onder elkaar was de footer
            2.355px, bijna drie schermen, en daarmee het grootste blok van de
            hele site. Niets verbergen, alleen anders neerzetten. */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 lg:gap-12">
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

          {/* Bedrijf */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">
              {t('bedrijf_heading')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.bedrijf.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200 [overflow-wrap:anywhere]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Juridisch */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">
              {t('juridisch_heading')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.juridisch.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200 [overflow-wrap:anywhere]">
                    {link.label}
                  </Link>
                </li>
              ))}
              {/* Cookie-instellingen hoort inhoudelijk bij dit rijtje en stond
                  los onderin. */}
              <li>
                <ConsentSettingsButton />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Stevin.AI, {t('copyright')}
          </p>
          <div className="flex items-center gap-4">
            {/* Artikel 3:15d BW: naam, KVK- en btw-nummer horen op een zakelijke
                site makkelijk, rechtstreeks en permanent vindbaar te zijn. De
                onderbalk staat op elke pagina, dus daar. */}
            <p className="text-xs text-slate-500">
              {t('company_details')}
            </p>
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
