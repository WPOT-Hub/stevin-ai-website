'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'

export default function LanguageSwitcher({ dark }: { dark?: boolean }) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  // W-535: van deze Nederlandse pagina's is de Engelse versie weg (410, zie
  // data/gone-urls.json). Wie daar op EN klikt, gaat naar de Engelse homepage.
  // Bewust een korte lijst hier en niet de hele JSON: dit is een
  // client-component en die lijst telt ruim duizend paden.
  const geenEngels = ['/google-ads-uitbesteden', '/social-media-uitbesteden', '/leadopvolging', '/integraties']

  const switchLocale = (newLocale: string) => {
    const doel = newLocale === 'en' && geenEngels.includes(pathname) ? '/' : pathname
    router.replace(doel, { locale: newLocale })
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
