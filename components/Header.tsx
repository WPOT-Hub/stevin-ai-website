'use client'

import { useState, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Pagina's met een lichte hero: daar blijft de header wit, anders staat er
  // witte tekst op een witte achtergrond.
  // Let op bij het toevoegen van een pagina: een DONKERE hero hoort hier NIET
  // in en moet zelf `-mt-[72px]` dragen met 72px extra top-padding, zodat hij
  // onder de transparante header door schuift. Staat een donkere hero hier wel
  // in, dan krijg je een witte glasband bovenop de hero (fout op /integraties,
  // gevonden 25 jul 2026).
  const lightHeroPages = ['/contact']
  const isLightHero = lightHeroPages.some(p => pathname === p || pathname.startsWith(p + '/'))
  // W-535: de korte navigatie van de nieuwe homepage (Zo werkt Stevin,
  // Tarieven, Plan een kennismaking) geldt sinds het snoeien voor de hele
  // Nederlandse site. De reden om dat uit te stellen (interne links naar
  // /diensten, /mkb en /voor-ondernemers) is weg: die pagina's hebben nu een
  // 301. De naam isNieuweHome is gebleven omdat de knopstijl en de
  // data-cta-namen eraan hangen.
  const isNieuweHome = locale === 'nl'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // W-535: de dropdowns Diensten en Voor wie zijn weg. In het Engels bleef er
  // niets van over: /en/diensten, /en/seo, /en/geo en /en/marketing-automation
  // gaan met een 301 naar /en/platform, de Engelse uitbesteed-pagina's en
  // /en/leadopvolging geven 410, en alle doelgroep- en sectorpagina's zijn weg
  // of omgeleid. Het Engelse menu is dus Platform, Tarieven en Contact.
  // Tarieven stond nergens in de navigatie, terwijl daar de drie smaken staan
  // die de hele positionering dragen. Gemeten 17 aug 2026: 15 links in de
  // header, 40 in de footer, en geen enkele naar /tarieven.
  // Klantverhalen hoort hier ook thuis, maar pas als er iets op staat dat een
  // prospect kan nakijken. De echte cijfers komen na 1 september.
  // Werkwijze is er 4 sep 2026 uit (W-042). Die pagina vertelde een tweede,
  // afwijkend verhaal (koppelen, vergelijken, activeren, verbeteren) dat de
  // homepage tegensprak, en had nul zoekvertoningen, dus omgooien kon zonder
  // SEO-risico. De inhoud zit nu in /platform, de URL redirect daarheen.
  // Op de nieuwe homepage: Zo werkt Stevin (/platform) en Tarieven, plus de
  // knop die het kennismakingsvenster opent. Samenwerken komt in het menu
  // zodra die pagina bestaat.
  const navItems = isNieuweHome
    ? [
        { label: 'Zo werkt Stevin', href: '/platform' },
        { label: t('tarieven'), href: '/tarieven' },
      ]
    : [
        { label: t('tarieven'), href: '/tarieven' },
        { label: t('contact'), href: '/contact' },
      ]
  const ctaHref = isNieuweHome ? '/kennismaking' : '/contact'
  const ctaLabel = isNieuweHome ? 'Plan een kennismaking' : t('cta')

  // Dark = transparent header with white logo+text, floats over dark navy hero
  const showDark = !isLightHero && !scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out ${
        scrolled
          ? 'nav-glass bg-white/85 border-border/40 shadow-sm'
          : isLightHero
            ? 'nav-glass bg-white/70 border-border/20'
            : 'bg-white/0 border-white/0'
      }`}
    >
      <div className="mx-auto max-w-[1760px] px-6 sm:px-8 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative" style={{ width: 118, height: 19 }}>
              <span className={`absolute inset-0 transition-opacity duration-500 ${showDark ? 'opacity-100' : 'opacity-0'}`}>
                <Logo variant="mono-white" width={118} height={19} />
              </span>
              <span className={`absolute inset-0 transition-opacity duration-500 ${showDark ? 'opacity-0' : 'opacity-100'}`}>
                <Logo variant="primary" width={118} height={19} />
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden min-w-0 items-center gap-4 lg:flex 2xl:gap-6">
            {!isNieuweHome && (<>
            {/* Platform: gewone link, geen dropdown meer (W-042). De pagina is
                een verhaal geworden; hem in de nav weer opknippen in vier ankers
                werkt daartegen, en die ankers bestonden na de herbouw niet meer. */}
            <Link
              href="/platform"
              className={`flex-none whitespace-nowrap text-[13px] font-medium transition-colors ${
                showDark
                  ? 'text-white/70 hover:text-white'
                  : 'text-slate-600 hover:text-primary'
              }`}
            >
              {t('platform')}
            </Link>

            </>)}

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-none whitespace-nowrap text-[13px] font-medium transition-colors ${
                  showDark
                    ? 'text-white/70 hover:text-white'
                    : 'text-slate-600 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Taalschakelaar alleen op de Engelse pagina's, om terug te kunnen naar
                NL. Koen, 12 okt: zolang de Engelse pagina's de oude zijn, de
                schakelaar weg op de Nederlandse site. */}
            {!isNieuweHome && <LanguageSwitcher dark={showDark} />}

            <Link
              href={ctaHref}
              data-cta={isNieuweHome ? 'header_kennismaking' : undefined}
              data-open-kennismaking={isNieuweHome ? '' : undefined}
              // Een blauw, dat van het logo (#3D8EFF), met witte tekst (Koen,
              // 12 okt: overal wit, ook al haalt wit op dit blauw 3,2:1).
              className={`hidden flex-none items-center whitespace-nowrap rounded-lg px-4 py-2 text-[13px] font-semibold shadow-sm shadow-accent/20 transition-all duration-200 ${isNieuweHome ? 'bg-accent text-white hover:brightness-110 lg:inline-flex' : 'bg-accent text-white hover:bg-accent-dark 2xl:inline-flex'}`}
            >
              {ctaLabel}
            </Link>
          </nav>

          <div className="flex items-center gap-1 lg:hidden">
            {/* Op de nieuwe homepage ook onder lg een knop in beeld: op een
                telefoon valt de heroknop onder de vouw, en daarna volgen twee
                vastgezette scrollstukken (nakijkronde 11 okt, hoog). Zelfde
                venster als de knop op desktop. */}
            {isNieuweHome && (
              <Link
                href="/kennismaking"
                data-cta="header_kennismaking_mobiel"
                data-open-kennismaking=""
                className="whitespace-nowrap rounded-lg bg-accent px-3.5 py-2 text-[13px] font-semibold text-white transition-[filter] hover:brightness-110"
              >
                Kennismaken
              </Link>
            )}
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2.5 transition-colors duration-500 ${showDark ? 'text-white' : 'text-primary'}`}
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border">
          <div className="px-6 py-6 space-y-1">
            {!isNieuweHome && (<>
            {/* Platform: gewone link, geen accordeon meer (W-042). */}
            <Link
              href="/platform"
              className="block w-full text-base font-medium text-primary py-3 border-b border-border/50"
              onClick={() => setMobileOpen(false)}
            >
              {t('platform')}
            </Link>

            </>)}

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-base font-medium text-primary py-3 border-b border-border/50"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Taalschakelaar mobiel: zelfde regel als hierboven. */}
            {!isNieuweHome && (
              <div className="py-3 border-b border-border/50">
                <LanguageSwitcher />
              </div>
            )}

            <div className="pt-4">
              <Link
                href={ctaHref}
                data-cta={isNieuweHome ? 'menu_kennismaking' : undefined}
                data-open-kennismaking={isNieuweHome ? '' : undefined}
                className={`block w-full text-center px-5 py-3.5 text-sm font-semibold rounded-xl transition-colors ${isNieuweHome ? 'bg-accent text-white hover:brightness-110' : 'bg-accent text-white hover:bg-accent-dark'}`}
                onClick={() => setMobileOpen(false)}
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
