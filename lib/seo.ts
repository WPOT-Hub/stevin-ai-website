import type { Metadata } from 'next'

// Centrale SEO-regel voor pagina-metadata. Elke nieuwe pagina hoort dit te
// gebruiken in generateMetadata, zodat canonical, hreflang, OpenGraph en
// Twitter-cards automatisch consistent zijn en geen nieuwe pagina de basis mist.
//
// Gebruik:
//   export async function generateMetadata({ params }) {
//     const { locale } = await params
//     return localizedMetadata({ path: '/platform', locale, title, description })
//   }
//
// translated:
//   true (default)  -> pagina heeft echte NL en EN content (messages/en.json).
//                      Self-canonical per taal + hreflang naar beide.
//   false           -> NL-only content (bijv. data-gedreven long-tail die nog
//                      niet vertaald is). Canonical altijd naar NL, geen losse
//                      EN-indexatie, voorkomt duplicate-signaal.

export const SITE_URL = 'https://stevin.ai'

interface LocalizedMetadataOpts {
  path: string // locale-agnostisch, bijv. '/platform' of '' voor home
  locale: string
  title: string
  description: string
  translated?: boolean
  image?: string
}

export function localizedMetadata(opts: LocalizedMetadataOpts): Metadata {
  const { path, locale, title, description } = opts
  const translated = opts.translated !== false
  const isEn = locale === 'en'

  const nlUrl = `${SITE_URL}${path}`
  const enUrl = `${SITE_URL}/en${path}`
  const canonical = translated ? (isEn ? enUrl : nlUrl) : nlUrl

  const languages: Record<string, string> = translated
    ? { 'nl-NL': nlUrl, en: enUrl, 'x-default': nlUrl }
    : { 'nl-NL': nlUrl, 'x-default': nlUrl }

  const defaultImage = `${SITE_URL}${isEn ? '/en' : ''}/opengraph-image`
  const image = opts.image
    ? opts.image.startsWith('http')
      ? opts.image
      : `${SITE_URL}${opts.image}`
    : defaultImage

  return {
    title,
    description,
    // types: RSS-feedlink meenemen, anders overschrijft deze alternates de
    // sitewide alternates.types uit de layout en verdwijnt de feed-link uit
    // de head op elke pagina die deze helper gebruikt.
    alternates: {
      canonical,
      languages,
      types: { 'application/rss+xml': `${SITE_URL}/feed.xml` },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: 'Stevin.AI',
      locale: isEn ? 'en_GB' : 'nl_NL',
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
