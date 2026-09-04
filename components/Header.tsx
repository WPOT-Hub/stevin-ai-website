'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const t = useTranslations('nav')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dienstenOpen, setDienstenOpen] = useState(false)
  const [platformOpen, setPlatformOpen] = useState(false)
  const [voorWieOpen, setVoorWieOpen] = useState(false)
  const [mobileDienstenOpen, setMobileDienstenOpen] = useState(false)
  const [mobilePlatformOpen, setMobilePlatformOpen] = useState(false)
  const [mobileVoorWieOpen, setMobileVoorWieOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Pagina's met een lichte hero: daar blijft de header wit, anders staat er
  // witte tekst op een witte achtergrond.
  // Let op bij het toevoegen van een pagina: een DONKERE hero hoort hier NIET
  // in en moet zelf `-mt-[72px]` dragen met 72px extra top-padding, zodat hij
  // onder de transparante header door schuift. Staat een donkere hero hier wel
  // in, dan krijg je een witte glasband bovenop de hero (fout op /integraties,
  // gevonden 25 jul 2026).
  const lightHeroPages = ['/seo', '/geo', '/contact']
  const isLightHero = lightHeroPages.some(p => pathname === p || pathname.startsWith(p + '/'))
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const platformDropdownRef = useRef<HTMLDivElement>(null)
  const voorWieDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDienstenOpen(false)
      }
      if (platformDropdownRef.current && !platformDropdownRef.current.contains(e.target as Node)) {
        setPlatformOpen(false)
      }
      if (voorWieDropdownRef.current && !voorWieDropdownRef.current.contains(e.target as Node)) {
        setVoorWieOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const dienstenItems = [
    { label: t('diensten_overview'), href: '/diensten' },
    { label: t('diensten_paid'), href: '/diensten#paid-media' },
    { label: t('diensten_seo'), href: '/seo' },
    { label: t('diensten_geo'), href: '/geo' },
    { label: t('diensten_automation'), href: '/marketing-automation' },
    { label: t('diensten_crm'), href: '/diensten#crm-leadopvolging' },
    { label: t('diensten_tracking'), href: '/diensten#tracking-inzicht' },
  ]

  // 4 sep 2026 (W-042): de dropdown wees naar vier ankers die na de herbouw van
  // /platform niet meer bestaan, waaronder #lead-generation. Dat anker hoorde
  // bij de claim "van anoniem websitebezoek naar gekwalificeerde pipeline",
  // en die is weggehaald omdat er geen bezoeker-identificatie in de code zit.
  // De pagina vertelt nu een verhaal in plaats van een featurelijst, dus een
  // dropdown die dat weer opknipt werkt tegen. Een link.
  const platformItems: { label: string; href: string }[] = []

  const voorWieItems = [
    { label: t('voor_ondernemers'), href: '/voor-ondernemers' },
    { label: t('voor_teams'), href: '/voor-marketingteams' },
    { label: t('voor_retail'), href: '/retail' },
    { label: t('voor_fmcg'), href: '/fmcg' },
    { label: t('voor_dealers'), href: '/voor-dealers' },
    { label: t('voor_musea'), href: '/musea' },
    { label: t('voor_podia'), href: '/podia' },
    { label: t('voor_evenementen'), href: '/evenementen' },
    { label: t('voor_mkb'), href: '/mkb' },
  ]

  // Tarieven stond nergens in de navigatie, terwijl daar de drie smaken staan
  // die de hele positionering dragen. Gemeten 17 aug 2026: 15 links in de
  // header, 40 in de footer, en geen enkele naar /tarieven.
  // Klantverhalen hoort hier ook thuis, maar pas als er iets op staat dat een
  // prospect kan nakijken. De echte cijfers komen na 1 september.
  // Werkwijze is er 4 sep 2026 uit (W-042). Die pagina vertelde een tweede,
  // afwijkend verhaal (koppelen, vergelijken, activeren, verbeteren) dat de
  // homepage tegensprak, en had nul zoekvertoningen, dus omgooien kon zonder
  // SEO-risico. De inhoud zit nu in /platform, de URL redirect daarheen.
  const navItems = [
    { label: t('controle'), href: '/controle' },
    { label: t('tarieven'), href: '/tarieven' },
    { label: t('contact'), href: '/contact' },
  ]

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
            {/* Diensten dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDienstenOpen(!dienstenOpen)}
                className={`flex flex-none items-center gap-1 whitespace-nowrap text-[13px] font-medium transition-colors ${
                  showDark
                    ? 'text-white/70 hover:text-white'
                    : 'text-slate-600 hover:text-primary'
                }`}
              >
                {t('diensten')}
                <svg className={`w-3.5 h-3.5 transition-transform ${dienstenOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Altijd in de DOM (crawlbaar), zichtbaarheid via CSS. */}
              <div
                className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl border border-border shadow-lg py-2 transition-opacity ${
                  dienstenOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
                }`}
              >
                  {dienstenItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-slate-600 hover:text-primary hover:bg-surface transition-colors"
                      onClick={() => setDienstenOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
              </div>
            </div>

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

            {/* Voor wie dropdown */}
            <div ref={voorWieDropdownRef} className="relative">
              <button
                onClick={() => setVoorWieOpen(!voorWieOpen)}
                className={`flex flex-none items-center gap-1 whitespace-nowrap text-[13px] font-medium transition-colors ${
                  showDark
                    ? 'text-white/70 hover:text-white'
                    : 'text-slate-600 hover:text-primary'
                }`}
              >
                {t('voor_wie')}
                <svg className={`w-3.5 h-3.5 transition-transform ${voorWieOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Altijd in de DOM (crawlbaar), zichtbaarheid via CSS. */}
              <div
                className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl border border-border shadow-lg py-2 transition-opacity ${
                  voorWieOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
                }`}
              >
                  {voorWieItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-slate-600 hover:text-primary hover:bg-surface transition-colors"
                      onClick={() => setVoorWieOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
              </div>
            </div>

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

            {/* Language switcher */}
            <LanguageSwitcher dark={showDark} />

            <Link
              href="/contact"
              className="hidden flex-none items-center whitespace-nowrap rounded-lg bg-accent px-4 py-2 text-[13px] font-semibold text-white shadow-sm shadow-accent/20 transition-all duration-200 hover:bg-accent-dark 2xl:inline-flex"
            >
              {t('cta')}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2.5 transition-colors duration-500 ${showDark ? 'text-white' : 'text-primary'}`}
            aria-label="Menu"
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

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border">
          <div className="px-6 py-6 space-y-1">
            {/* Diensten accordion */}
            <button
              onClick={() => setMobileDienstenOpen(!mobileDienstenOpen)}
              className="flex items-center justify-between w-full text-base font-medium text-primary py-3 border-b border-border/50"
            >
              {t('diensten')}
              <svg className={`w-4 h-4 transition-transform ${mobileDienstenOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileDienstenOpen && (
              <div className="pl-4 space-y-0">
                {dienstenItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm text-slate-600 py-2.5 border-b border-border/30"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Platform: gewone link, geen accordeon meer (W-042). */}
            <Link
              href="/platform"
              className="block w-full text-base font-medium text-primary py-3 border-b border-border/50"
              onClick={() => setMobileOpen(false)}
            >
              {t('platform')}
            </Link>

            {/* Voor wie accordion */}
            <button
              onClick={() => setMobileVoorWieOpen(!mobileVoorWieOpen)}
              className="flex items-center justify-between w-full text-base font-medium text-primary py-3 border-b border-border/50"
            >
              {t('voor_wie')}
              <svg className={`w-4 h-4 transition-transform ${mobileVoorWieOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileVoorWieOpen && (
              <div className="pl-4 space-y-0">
                {voorWieItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm text-slate-600 py-2.5 border-b border-border/30"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

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

            {/* Language switcher in mobile */}
            <div className="py-3 border-b border-border/50">
              <LanguageSwitcher />
            </div>

            <div className="pt-4">
              <Link
                href="/contact"
                className="block w-full text-center px-5 py-3.5 text-sm font-semibold text-white bg-accent rounded-xl hover:bg-accent-dark transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t('cta')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
