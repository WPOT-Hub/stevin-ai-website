import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import SeoLandingPage from '@/components/SeoLandingPage'
import { getSeoLandingPage } from '@/data/seo-landing-pages'
import RethinkLeadopvolging from '@/components/rethink/RethinkLeadopvolging'

// NL-only SEO-landingspagina (docs/SEO_PAGE_STRUCTURES_2026-07-05.md).
// Content leeft in data/seo-landing-pages.ts; canonical naar NL.
const page = getSeoLandingPage('leadopvolging')!

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return localizedMetadata({
    path: '/leadopvolging',
    locale,
    title: page.metaTitle,
    description: page.metaDescription,
    translated: false,
  })
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  // W-535: de Nederlandse pagina is de nieuwe in de stijl van de homepage.
  // Titel, metabeschrijving en H1 komen nog uit de data en zijn ongewijzigd.
  // /en houdt voorlopig de oude (net als de homepage en /tarieven).
  if (locale !== 'en') return <RethinkLeadopvolging kop={page.h1} accent={page.h1Accent} />
  return <SeoLandingPage page={page} />
}
