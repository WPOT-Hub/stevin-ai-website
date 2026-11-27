import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import RethinkCase from '@/components/rethink/RethinkCase'
import { ADVERTENTIE_CASES, advertentieParams } from '@/components/rethink/cases/advertentie'

// W-912: de versie van een klantcase waar de advertenties van de lokale
// campagne op landen. Zelfde inhoud als /case-studies/<case>, met de zin uit
// het advertentiebeeld boven de kop, zonder menu en zonder links naar andere
// pagina's (Header en Footer doen dat zelf op /lp/). Staat op noindex en niet
// in de sitemap; de canonical wijst naar de gewone casepagina.
type Props = { params: Promise<{ locale: string; slug: string; zin: string }> }

// Alleen de combinaties die bestaan; al het andere is een 404. De Engelse
// variant wordt net als bij de andere pagina's meegebouwd, maar /en geeft in
// middleware.ts al een 410 (W-535).
export const dynamicParams = false

export function generateStaticParams() {
  return advertentieParams()
}

function vind(slug: string, zin: string) {
  const a = Object.hasOwn(ADVERTENTIE_CASES, slug) ? ADVERTENTIE_CASES[slug] : null
  const z = a && Object.hasOwn(a.zinnen, zin) ? a.zinnen[zin] : null
  return a && z ? { a, z } : null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, zin } = await params
  const gevonden = vind(slug, zin)
  if (!gevonden) return {}
  return {
    ...localizedMetadata({
      path: gevonden.a.meta.path,
      locale,
      title: gevonden.a.meta.title,
      description: gevonden.a.meta.description,
      translated: false,
    }),
    robots: { index: false, follow: false },
  }
}

export default async function Page({ params }: Props) {
  const { locale, slug, zin } = await params
  const gevonden = vind(slug, zin)
  if (!gevonden) notFound()
  setRequestLocale(locale)
  return <RethinkCase c={gevonden.a.c} advertentie={gevonden.z} />
}
