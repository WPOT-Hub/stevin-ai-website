import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

// W-473: hier komt een klant terecht nadat hij een offerte of opdrachtbevestiging
// bij Signhost heeft getekend (ReturnUrl in de Hub), in plaats van op de
// reclamepagina van Entrust. Niet in de sitemap en niet in de index: deze pagina
// heeft alleen betekenis direct na het tekenen.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return { title: locale === 'en' ? 'Signed' : 'Getekend', robots: 'noindex, nofollow' }
}

const TEKST = {
  nl: {
    kop: 'Dank je, je handtekening is binnen',
    alinea: 'We hebben je getekende document ontvangen. Je krijgt een kopie per mail en we nemen contact met je op over de eerste stap.',
    vraag: 'Een vraag? Mail',
    knop: 'Naar stevin.ai',
  },
  en: {
    kop: 'Thank you, we have your signature',
    alinea: 'We have received your signed document. You will get a copy by email, and we will be in touch about the first step.',
    vraag: 'A question? Email',
    knop: 'Go to stevin.ai',
  },
} as const

export default async function GetekendPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = locale === 'en' ? TEKST.en : TEKST.nl
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-primary)] px-5">
      <div className="w-full max-w-[440px] text-center">
        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">Stevin.AI</p>
        <h1 className="mt-3 font-display text-[26px] font-extrabold leading-tight text-white">{t.kop}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{t.alinea}</p>
        <p className="mt-3 text-[14px] text-slate-400">
          {t.vraag}{' '}
          <a href="mailto:sales@stevin.ai" className="text-white underline underline-offset-2">sales@stevin.ai</a>
        </p>
        <a
          href={locale === 'en' ? '/en' : '/'}
          className="mt-7 inline-block rounded-xl bg-[var(--color-accent)] px-6 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)]"
        >
          {t.knop}
        </a>
      </div>
    </main>
  )
}
