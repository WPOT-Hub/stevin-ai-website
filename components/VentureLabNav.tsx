'use client'

import { Link, usePathname } from '@/i18n/navigation'

const ITEMS = [
  { href: '/venture-lab', nl: 'Overzicht', en: 'Overview' },
  { href: '/venture-lab/founders', nl: 'Voor founders', en: 'For founders' },
  { href: '/venture-lab/bedrijven', nl: 'Voor bedrijven', en: 'For companies' },
  { href: '/venture-lab/programma', nl: 'Programma', en: 'Programme' },
  { href: '/venture-lab/apply', nl: 'Aanmelden', en: 'Apply' },
]

export default function VentureLabNav({ locale }: { locale: string }) {
  const pathname = usePathname()
  const en = locale === 'en'
  return (
    <nav className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Stevin Venture Lab">
      {ITEMS.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={`text-[13px] font-display font-semibold tracking-[0.01em] transition-colors ${
              active ? 'text-white' : 'text-white/45 hover:text-white/80'
            }`}
          >
            {en ? item.en : item.nl}
          </Link>
        )
      })}
    </nav>
  )
}
