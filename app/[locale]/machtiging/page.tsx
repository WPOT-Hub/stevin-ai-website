import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

// W-477: hier komt een klant terecht na de eerste betaling via Mollie (redirectUrl
// in Stevin-company finance/factuur/incasso.py). Die betaling legt ook de
// machtiging voor de maandelijkse incasso vast. Niet in de sitemap en niet in de
// index: de pagina heeft alleen betekenis direct na het betalen.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return { title: locale === 'en' ? 'Payment received' : 'Betaling ontvangen', robots: 'noindex, nofollow' }
}

const TEKST = {
  nl: {
    kop: 'Dank je, we verwerken je betaling',
    alinea: 'Zodra je betaling rond is, staat ook je machtiging: vanaf de volgende maand schrijven we het maandbedrag automatisch af. Je krijgt elke maand eerst de factuur, met de datum waarop we afschrijven.',
    vraag: 'Een vraag? Mail',
    knop: 'Naar stevin.ai',
  },
  en: {
    kop: 'Thank you, we are processing your payment',
    alinea: 'Once your payment is complete, your mandate is also in place: from next month we collect the monthly fee automatically. Each month you first receive the invoice, with the date of collection.',
    vraag: 'A question? Email',
    knop: 'Go to stevin.ai',
  },
} as const

export default async function MachtigingPage({ params }: Props) {
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
