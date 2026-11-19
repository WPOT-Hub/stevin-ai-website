import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import RethinkBreda from '@/components/rethink/RethinkBreda'

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
  return <RethinkBreda />
}
