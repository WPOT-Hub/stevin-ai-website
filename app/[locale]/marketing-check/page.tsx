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
