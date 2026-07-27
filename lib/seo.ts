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

/**
 * Kapt een omschrijving af op een lengte die Google niet zelf afkapt.
 *
 * Deks van artikelen en vergelijkingen zijn geschreven om te lezen, niet om in
 * een zoekresultaat te passen: op 27 juli 2026 waren ze tot 316 tekens lang,
 * over 325 blogpagina's. Google toont er ongeveer 155 van en breekt de rest
 * middenin een woord af.
 *
 * Liever op een zinseinde stoppen dan op een woordgrens, want een halve zin
 * leest als een fout. Geen beletselteken: Google zet er zelf al een.
 */
export function metaOmschrijving(tekst: string, max = 155): string {
  const t = (tekst ?? '').replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t

  const kort = t.slice(0, max)
  const zinEinde = Math.max(kort.lastIndexOf('. '), kort.lastIndexOf('! '), kort.lastIndexOf('? '))
  if (zinEinde > max * 0.45) return kort.slice(0, zinEinde + 1)

  const woordGrens = kort.lastIndexOf(' ')
  return kort.slice(0, woordGrens > 0 ? woordGrens : max).replace(/[,;:.]$/, '')
}
