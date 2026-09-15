import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import MarketingCheck from '@/components/MarketingCheck'

type Props = { params: Promise<{ locale: string }> }

export const metadata: Metadata = {
  title: 'Marketing Check, Stevin.AI',
  description: 'Vul je bedrijfswebsite in en zie binnen een paar seconden wat wij zien.',
  // Noindex: dit is de bestemming van QR-codes en placement-links, geen
  // pagina die we in zoekresultaten willen hebben.
  robots: 'noindex, nofollow',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'Stevin.AI',
    title: 'Marketing Check: laat een Stevin Agent je marketing checken',
    description: 'Vul je bedrijfswebsite in. We lezen je site, kijken in de advertentieregisters en zeggen wat we van buitenaf kunnen zien. Geen naam, geen e-mailadres.',
    url: 'https://stevin.ai/marketing-check',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Marketing Check: laat een Stevin Agent je marketing checken' }],
  },
  twitter: { card: 'summary_large_image', title: 'Marketing Check: laat een Stevin Agent je marketing checken', description: 'Vul je bedrijfswebsite in. We lezen je site, kijken in de advertentieregisters en zeggen wat we van buitenaf kunnen zien. Geen naam, geen e-mailadres.', images: ['/opengraph-image'] },
}

export default async function MarketingCheckPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <main className="min-h-screen bg-[var(--color-surface)]">
      <MarketingCheck />
    </main>
  )
}
