import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import MarketingCheck from '@/components/MarketingCheck'

type Props = { params: Promise<{ locale: string }> }

// W-135: de AI-Ready Scan, dezelfde scanmotor als /marketing-check met een
// ander verhaal: eerst meten, dan met AI bouwen. Noindex zolang hij achter de
// codepoort staat (middleware, MARKETING_CHECK_TOEGANGSCODE).
export const metadata: Metadata = {
  title: 'Stevin AI-Ready Scan',
  description: 'Jullie willen met AI werken. Kan jullie meetlaag dat dragen? Eerst meten, dan met AI bouwen.',
  robots: 'noindex, nofollow',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'Stevin.AI',
    title: 'Stevin AI-Ready Scan: eerst meten, dan met AI bouwen',
    description: 'Jullie willen met AI werken. Kan jullie meetlaag dat dragen? Vul je bedrijfswebsite in; wij meten van buitenaf welke signalen je site doorgeeft.',
    url: 'https://stevin.ai/ai-ready-scan',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Stevin AI-Ready Scan: eerst meten, dan met AI bouwen' }],
  },
  twitter: { card: 'summary_large_image', title: 'Stevin AI-Ready Scan: eerst meten, dan met AI bouwen', description: 'Jullie willen met AI werken. Kan jullie meetlaag dat dragen? Vul je bedrijfswebsite in; wij meten van buitenaf welke signalen je site doorgeeft.', images: ['/opengraph-image'] },
}

export default async function AiReadyScanPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <main className="min-h-screen bg-[var(--color-surface)]">
      <MarketingCheck variant="ai" />
    </main>
  )
}
