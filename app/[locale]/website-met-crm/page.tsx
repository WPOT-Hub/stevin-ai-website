import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import SeoLandingPage from '@/components/SeoLandingPage'
import { getSeoLandingPage } from '@/data/seo-landing-pages'

// NL-only SEO-landingspagina (docs/SEO_PAGE_STRUCTURES_2026-07-05.md).
// Content leeft in data/seo-landing-pages.ts; canonical naar NL.
const page = getSeoLandingPage('website-met-crm')!

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return localizedMetadata({
    path: '/website-met-crm',
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
