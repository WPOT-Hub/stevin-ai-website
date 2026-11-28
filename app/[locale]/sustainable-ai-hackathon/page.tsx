import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import RethinkHackathon from '@/components/rethink/RethinkHackathon'

// W-916: de gewonnen Sustainable AI Hackathon (Utrecht, 25 aug 2026). Inhoud en
// bronnen staan in components/rethink/RethinkHackathon.tsx. Alleen Nederlands.
type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return localizedMetadata({
    path: '/sustainable-ai-hackathon',
    locale,
    title: 'Sustainable AI Hackathon gewonnen met 80.000 tokens',
    description:
      'Koen Hoogenboom van Stevin.AI won met zijn team de Sustainable AI Hackathon in Utrecht: werkende software in drie en een half uur, met 80.000 tokens.',
    translated: false,
  })
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <RethinkHackathon />
}
