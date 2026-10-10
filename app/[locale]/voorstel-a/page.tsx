import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import RethinkHome from '@/components/rethink/RethinkHome'

type Props = { params: Promise<{ locale: string }> }

// VOORSTEL nieuwe homepage, richting A (W-535). Niet gelinkt, niet in de
// sitemap, noindex. Verhuist naar app/[locale]/page.tsx na Koens akkoord.

export const metadata: Metadata = {
  title: 'Voorstel homepage, richting A',
  robots: { index: false, follow: false },
}

export default async function VoorstelPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <RethinkHome richting="a" />
}
