import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { SITE_URL, localizedMetadata } from '@/lib/seo'
import RethinkHackathon, { HACKATHON_FOTO } from '@/components/rethink/RethinkHackathon'

// W-916: de gewonnen Sustainable AI Hackathon (Utrecht, 25 aug 2026). Inhoud en
// bronnen staan in components/rethink/RethinkHackathon.tsx. Alleen Nederlands.
type Props = { params: Promise<{ locale: string }> }

const PAD = '/sustainable-ai-hackathon'
const TITEL = 'Koen Hoogenboom wint Sustainable AI Hackathon met 80.000 tokens'
const OMSCHRIJVING =
  'Koen Hoogenboom van Stevin.AI won met zijn team de Sustainable AI Hackathon in Utrecht: werkende software in drie en een half uur, met 80.000 tokens.'
const FOTO_URL = `${SITE_URL}${HACKATHON_FOTO.src}`

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const meta = localizedMetadata({ path: PAD, locale, title: TITEL, description: OMSCHRIJVING, translated: false })
  // De helper zet een og:image van 1200x630; deze foto is 1280x960. Daarom hier
  // de echte maten, zodat een gedeelde link en Google dezelfde foto zien.
  const beeld = { url: FOTO_URL, width: HACKATHON_FOTO.breed, height: HACKATHON_FOTO.hoog, alt: HACKATHON_FOTO.alt }
  return {
    ...meta,
    openGraph: { ...meta.openGraph, images: [beeld] },
    twitter: { ...meta.twitter, images: [FOTO_URL] },
  }
}

// Google noemt primaryImageOfPage als voorkeurssignaal voor het beeld van de
// pagina. Bewust geen creator, creditText of license: wie de foto maakte en
// onder welke voorwaarden staat nergens vast, dus dat vullen we niet in.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}${PAD}#webpage`,
  url: `${SITE_URL}${PAD}`,
  name: TITEL,
  description: OMSCHRIJVING,
  inLanguage: 'nl-NL',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    contentUrl: FOTO_URL,
    url: FOTO_URL,
    width: HACKATHON_FOTO.breed,
    height: HACKATHON_FOTO.hoog,
    caption: HACKATHON_FOTO.bijschrift,
  },
  about: {
    '@type': 'Person',
    name: 'Koen Hoogenboom',
    jobTitle: 'Oprichter',
    worksFor: { '@id': `${SITE_URL}/#organization` },
    image: FOTO_URL,
  },
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      {/* JSON.stringify van een constante uit dit bestand, geen invoer van buiten. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RethinkHackathon />
    </>
  )
}
