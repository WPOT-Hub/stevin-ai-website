import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import RethinkBreda from '@/components/rethink/RethinkBreda'

// W-860: de versie van /marketingbureau-breda waar campagnes op landen. Zelfde
// inhoud, zonder menu en zonder links naar andere pagina's. Staat op noindex
// en niet in de sitemap; de canonical wijst naar de gewone pagina.
type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    ...localizedMetadata({
      path: '/marketingbureau-breda',
      locale,
      title: 'Marketingbureau Breda: van klik tot opdracht',
      description:
        'Marketingbureau in Breda dat meedenkt over de hele weg: gevonden worden, aanvragen opvolgen en meten wat een opdracht werd.',
      translated: false,
    }),
    robots: { index: false, follow: false },
  }
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <RethinkBreda advertentie />
}
