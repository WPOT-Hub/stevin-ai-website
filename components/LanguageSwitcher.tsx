'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'

export default function LanguageSwitcher({ dark }: { dark?: boolean }) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  const baseClass = `text-[13px] font-semibold transition-colors`
  const activeClass = dark ? 'text-white' : 'text-primary'
  const inactiveClass = dark ? 'text-white/40 hover:text-white/70' : 'text-muted hover:text-primary'
  const dividerClass = dark ? 'text-white/20' : 'text-border'

  return (
    <div className="flex items-center gap-1.5">
      {/* Actieve taal is uitgeschakeld: klikken op de huidige taal deed een
          replace naar dezelfde pagina en registreerde als dead click in Clarity. */}
      <button
        onClick={() => switchLocale('nl')}
        disabled={locale === 'nl'}
        className={`${baseClass} ${locale === 'nl' ? `${activeClass} cursor-default` : `${inactiveClass} cursor-pointer`}`}
        aria-label="Nederlands"
        aria-current={locale === 'nl' ? 'true' : undefined}
      >
        NL
      </button>
      <span className={`text-[11px] ${dividerClass}`} aria-hidden="true">|</span>
      <button
        onClick={() => switchLocale('en')}
        disabled={locale === 'en'}
        className={`${baseClass} ${locale === 'en' ? `${activeClass} cursor-default` : `${inactiveClass} cursor-pointer`}`}
        aria-label="English"
        aria-current={locale === 'en' ? 'true' : undefined}
      >
        EN
      </button>
    </div>
  )
}
