import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import MarketingCheck from '@/components/MarketingCheck'

type Props = { params: Promise<{ locale: string }> }

// W-135: de AI-meetproef, dezelfde scanmotor als /marketing-check met een
// ander verhaal: eerst meten, dan met AI bouwen. Noindex zolang hij achter de
// codepoort staat (middleware, MARKETING_CHECK_TOEGANGSCODE).
export const metadata: Metadata = {
  title: 'De Stevin AI-meetproef',
  description: 'Jullie willen met AI werken. Kan jullie meetlaag dat dragen? Eerst meten, dan met AI bouwen.',
  robots: 'noindex, nofollow',
}

export default async function AiMeetproefPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <main className="min-h-screen bg-[var(--color-surface)]">
      <MarketingCheck variant="ai" />
    </main>
  )
}
