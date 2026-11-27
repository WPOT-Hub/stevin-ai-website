import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import RethinkCase from '@/components/rethink/RethinkCase'
import { CASE, META } from '@/components/rethink/cases/ecomy-energie'

// De inhoud van deze case staat in components/rethink/cases/ecomy-energie.tsx (W-912).
type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    ...localizedMetadata({
      path: META.path,
      locale,
      title: META.title,
      description: META.description,
      translated: false,
    }),
    robots: { index: true, follow: true },
  }
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <RethinkCase c={CASE} />
}
