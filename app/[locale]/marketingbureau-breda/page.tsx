import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import RethinkBreda from '@/components/rethink/RethinkBreda'
import { TELEFOON } from '@/lib/telefoon'

// W-860: het kantoor in Breda als lokaal bedrijf, naast de Organization uit
// SiteJsonLd. Zelfde naam, adres en nummer (NAP, D-037). Geen coordinaten en
// geen openingstijden: die zijn niet nagekeken en horen dan niet in het schema.
const lokaalBedrijf = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://stevin.ai/marketingbureau-breda#kantoor',
  name: 'Stevin.AI',
  description:
    'Marketingbureau in Breda voor online marketing, meting, koppelingen en automatisering met AI.',
  url: 'https://stevin.ai/marketingbureau-breda',
  image: 'https://stevin.ai/og-image.png',
  telephone: TELEFOON.e164,
  parentOrganization: { '@id': 'https://stevin.ai/#organization' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Claudius Prinsenlaan 12',
    postalCode: '4811 DK',
    addressLocality: 'Breda',
    addressRegion: 'Noord-Brabant',
    addressCountry: 'NL',
  },
  areaServed: [
    { '@type': 'City', name: 'Breda' },
    { '@type': 'AdministrativeArea', name: 'West-Brabant' },
  ],
}

// W-860: alleen Nederlands. /en canonicalt naar de Nederlandse pagina.
type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return localizedMetadata({
    path: '/marketingbureau-breda',
    locale,
    title: 'Marketingbureau Breda: van klik tot opdracht',
    description:
      'Marketingbureau in Breda dat meedenkt over de hele weg: gevonden worden, aanvragen opvolgen en meten wat een opdracht werd. Met koppelingen, automatisering en AI.',
    translated: false,
  })
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lokaalBedrijf) }} />
      <RethinkBreda />
    </>
  )
}
