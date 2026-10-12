import type { MetadataRoute } from 'next'
import { articles } from '@/data/articles'
import { isPublishableArticle } from './[locale]/blog/[slug]/page'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stevin.ai'

  // DE REGEL (26 jul 2026): een URL hoort alleen in de sitemap als hij naar
  // zichzelf canonicalt. Stond een pagina er wel in maar wees zijn canonical
  // ergens anders heen, dan vraag je Google om te crawlen en zeg je daarna dat
  // hij het resultaat moet weggooien. Dat kostte 284 van de 901 sitemap-URLs,
  // op een domein waar Google zichtbaar op crawlbudget beknibbelt: twee
  // landingspagina's van 6 juli waren op 26 juli nog nooit gecrawld.
  //
  // Vandaar twee lijsten. Alleen wat echt vertaald is krijgt een /en-entry.
  // Nieuwe pagina toevoegen: staat de Engelse versie op /en met een canonical
  // naar zichzelf, dan hier; serveert /en Nederlandse tekst of canonicalt hij
  // naar NL, dan in nlOnlyPages. `npm run check:sitemap` toetst dat live.

  // W-535 (12 okt 2026): gesnoeid van 723 naar ongeveer 45 URL's. Alleen wat
  // blijft en indexeerbaar is staat hier; omleidingen (data/redirects.json) en
  // weggehaalde pagina's (data/gone-urls.json) horen er nooit in. Proces- en
  // campagnepagina's met noindex ook niet, net als de juridische pagina's.

  // Echt vertaald via messages/en.json, /en canonicalt naar zichzelf.
  const translatedPages = [
    '',
    '/platform',
    '/tarieven',
    '/contact',
    '/simon-stevin',
  ]

  // NL-only: canonical naar de NL-URL, geen /en-entry en geen en-hreflang.
  // De drie uitbesteed-pagina's en /integraties hadden een Engelse versie; die
  // geeft sinds W-535 een 410 (geen signaal, geen Engelse klant).
  const nlOnlyPages = [
    '/google-ads-uitbesteden',
    '/social-media-uitbesteden',
    '/leadopvolging',
    '/marketing-intelligence',
    '/integraties',
    '/blog',
    // Vergelijkingen staan op noindex tot ze herschreven zijn (W-535, 12 okt).
  ]

  const priorityFor = (path: string) => {
    if (path === '') return 1
    if (path === '/google-ads-uitbesteden' || path === '/social-media-uitbesteden' || path === '/platform' || path === '/tarieven') return 0.9
    return 0.7
  }

  const altLangs = (path: string) => ({
    'nl-NL': `${baseUrl}${path}`,
    'en': `${baseUrl}/en${path}`,
    'x-default': `${baseUrl}${path}`,
  })

  // NL-only pagina's mogen geen en-hreflang adverteren: dat wijst naar een URL
  // die terugcanonicalt naar deze pagina, en dat is hetzelfde rondje.
  const nlAlleen = (path: string) => ({
    'nl-NL': `${baseUrl}${path}`,
    'x-default': `${baseUrl}${path}`,
  })

  // Blog posts: gebruik de echte publishedAt datum.
  // Alleen de NL-URL in de sitemap. De /en/blog/<slug> variant toont vandaag
  // nog dezelfde NL-tekst (echte EN-vertaling komt via de Hub journal-pipeline)
  // en hoort dus niet als aparte indexeerbare URL in de sitemap: dat is een
  // duplicate-signaal en verspilt crawl-budget. Google adviseert expliciet
  // "reduce duplicate content". Zodra er per artikel een echte EN-vertaling is,
  // voeg je hier de /en/blog/<slug> entry met een eigen hreflang-paar weer toe.
  // Body-loze dispatches niet in de sitemap (thin content, Google-richtlijn).
  const blogEntries: MetadataRoute.Sitemap = articles.filter(isPublishableArticle).map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    // W-535: een herschreven stuk meldt zijn bijwerkdatum, net als dateModified in de JSON-LD.
    lastModified: a.updatedAt ?? a.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    alternates: { languages: { 'nl-NL': `${baseUrl}/blog/${a.slug}`, 'x-default': `${baseUrl}/blog/${a.slug}` } },
  }))

  // Statische pagina's: geen lastModified (voorkomt dat crawlers het veld negeren)
  const nlEntries: MetadataRoute.Sitemap = translatedPages.map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: (path === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: priorityFor(path),
    alternates: { languages: altLangs(path) },
  }))

  const enEntries: MetadataRoute.Sitemap = translatedPages.map((path) => ({
    url: `${baseUrl}/en${path}`,
    changeFrequency: (path === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: Math.max(0.3, priorityFor(path) - 0.1),
    alternates: { languages: altLangs(path) },
  }))

  const nlOnlyEntries: MetadataRoute.Sitemap = nlOnlyPages.map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: 'monthly' as const,
    priority: priorityFor(path),
    alternates: { languages: nlAlleen(path) },
  }))

  // Standalone EN outreach-editorial (bewust GEEN journal-item: het Journal is
  // NL-only). Alleen de /en-URL is canoniek en indexeerbaar; de prefix-loze
  // NL-variant canonicalt naar /en en hoort dus niet in de sitemap.
  const standaloneEnEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en/who-owns-your-advertising-data`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/who-owns-your-advertising-data`,
          'x-default': `${baseUrl}/en/who-owns-your-advertising-data`,
        },
      },
    },
  ]

  return [...nlEntries, ...enEntries, ...nlOnlyEntries, ...blogEntries, ...standaloneEnEntries]
}
