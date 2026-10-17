import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

type Props = { params: Promise<{ locale: string }> }

// W-480: de boekingslink die we in mails en appjes sturen (BOEKINGSLINK in de
// Hub, src/core/crm/autoOpvolging.ts). Bestaat omdat de link naar cal.com in
// WhatsApp de preview van Cal.com zelf gaf; deze pagina heeft een eigen
// preview (opengraph-image.tsx hiernaast) en zet de agenda in de pagina.
// Niet in de sitemap en niet in de index: je komt hier via een link die we
// zelf sturen, niet via Google.

const TEKST = {
  nl: {
    titel: 'Kennismaken met Stevin.AI',
    omschrijving: 'Kies een moment dat jou uitkomt. Vrijblijvend, we kijken samen naar je cijfers.',
    kop: 'Plan een kennismaking',
    alinea: 'Kies een moment dat jou uitkomt. Vrijblijvend: we kijken samen naar je cijfers en wat je kunt meten.',
    knop: 'Kies een moment',
  },
  en: {
    titel: 'Meet Stevin.AI',
    omschrijving: 'Pick a time that suits you. No strings attached, we look at your numbers together.',
    kop: 'Book an introduction',
    alinea: 'Pick a time that suits you. No strings attached: we look at your numbers together and at what you can measure.',
    knop: 'Pick a time',
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = locale === 'en' ? TEKST.en : TEKST.nl
  const url = locale === 'en' ? 'https://stevin.ai/en/kennismaking' : 'https://stevin.ai/kennismaking'
  return {
    title: { absolute: t.titel },
    description: t.omschrijving,
    robots: 'noindex, follow',
    openGraph: {
      type: 'website',
      siteName: 'Stevin.AI',
      locale: locale === 'en' ? 'en_US' : 'nl_NL',
      url,
      title: t.titel,
      description: t.omschrijving,
    },
    twitter: { card: 'summary_large_image', title: t.titel, description: t.omschrijving },
  }
}

export default async function KennismakingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = locale === 'en' ? TEKST.en : TEKST.nl
  return (
    <main className="bg-[var(--color-primary)] px-5 pb-20 pt-28 md:pt-36">
      <div className="mx-auto w-full max-w-[1040px]">
        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">Stevin.AI</p>
        <h1 className="mt-3 font-display text-[30px] font-extrabold leading-tight text-white md:text-[40px]">{t.kop}</h1>
        <p className="mt-3 max-w-[620px] text-[16px] leading-relaxed text-slate-300">{t.alinea}</p>
        {/* 17 okt 2026: geen Cal.com meer in de pagina. Het eigen
            kennismakingsvenster opent hier meteen (KennismakingLader in de
            layout); deze knop opent het opnieuw na sluiten. Zonder JavaScript
            gaat de knop naar de Cal.com-boeking. */}
        <Link
          href="/kennismaking"
          data-open-kennismaking=""
          data-cta="pagina_kennismaking_knop"
          className="mt-8 inline-flex rounded-lg bg-accent px-6 py-3 text-[15px] font-semibold text-white transition-[filter] hover:brightness-110"
        >
          {t.knop}
        </Link>
        <noscript>
          <p className="mt-4 text-[14px] text-slate-300">
            <a className="underline" href="https://cal.com/koen-hoogenboom/kennismaking">Open de agenda</a>
          </p>
        </noscript>
      </div>
    </main>
  )
}
