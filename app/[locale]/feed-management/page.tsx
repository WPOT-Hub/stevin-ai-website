import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import SeoLandingPage from '@/components/SeoLandingPage'
import { getSeoLandingPage } from '@/data/seo-landing-pages'

const page = getSeoLandingPage('feed-management')!

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return localizedMetadata({
    path: '/feed-management',
    locale,
    title: page.metaTitle,
    description: page.metaDescription,
    translated: false,
  })
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <SeoLandingPage page={page} />
}
