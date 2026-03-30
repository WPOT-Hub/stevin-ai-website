'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

const navItems = [
  { label: 'Diensten', href: '/diensten' },
  { label: 'Werkwijze', href: '/werkwijze' },
  { label: 'Integraties', href: '/integraties' },
  { label: 'SEO', href: '/seo' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // On homepage: transparent on top, white on scroll. Other pages: always white-ish.
  const showDark = isHome && !scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-sm'
          : isHome
            ? 'bg-transparent'
            : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Logo variant={showDark ? 'mono-white' : 'primary'} width={140} height={23} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[15px] font-medium transition-colors ${
                  showDark
                    ? 'text-white/70 hover:text-white'
                    : 'text-slate-600 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent-dark transition-all duration-200 shadow-sm shadow-accent/20"
            >
              Plan een gesprek
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 ${showDark ? 'text-white' : 'text-primary'}`}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="px-6 py-6 space-y-1">
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
            <div className="pt-4">
              <Link
                href="/contact"
                className="block w-full text-center px-5 py-3.5 text-sm font-semibold text-white bg-accent rounded-xl hover:bg-accent-dark transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Plan een gesprek
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
