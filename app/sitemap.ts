import type { MetadataRoute } from 'next'
import { articles } from '@/data/articles'
import { categories } from '@/data/categories'
import { integrations, isIndexableIntegration, isIndexableIntegrationCategory } from '@/data/integrations'
import { comparisons } from '@/data/comparisons'
import { glossary } from '@/data/glossary'
import { alternatives } from '@/data/alternatives'
import { products } from '@/data/products'
import { seoLandingPages } from '@/data/seo-landing-pages'
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

  // Echt vertaald via messages/en.json, /en canonicalt naar zichzelf.
  // Geverifieerd tegen productie op 26 juli 2026.
  const translatedPages = [
    '',
    '/google-ads-uitbesteden',
    '/social-media-uitbesteden',
    '/voor-ondernemers',
    '/voor-marketingteams',
    '/controle',
    '/mkb',
    '/retail',
    // Verticals nu geindexeerd (besluit 4 jul): eigen belofte + data-spine per sector
    '/voor-musea',
    '/voor-dealers',
    '/platform',
    '/diensten',
    '/werkwijze',
    '/multi-market',
    '/marketing-automation',
    '/seo',
    '/geo',
    '/integraties',
    '/case-studies',
    '/contact',
    '/simon-stevin',
  ]

  // NL-only: /en serveert hier dezelfde Nederlandse tekst en canonicalt naar
  // de NL-URL. Alleen de NL-entry, en ook geen en-hreflang.
  const nlOnlyPages = [
    '/blog',
    // Tarieven. Stond tot 28 jul 2026 als voorbeeld op /preview-tarieven met
    // noindex; er was dus geen prijspagina terwijl de homepage wel een bedrag
    // noemde. NL-only zolang de Engelse copy niet apart is nagelopen.
    '/tarieven',
    '/google-ad-grants-belgie',
    '/google-ad-grants-nederland',
    // Deze gaf even een 308 naar een niet-bestaande pagina, doordat de
    // :locale-parameter in next.config.ts elk padstuk matchte. Dat is gefixt,
    // de pagina bestaat gewoon.
    // Productpagina's (de Stevin-suite)
    '/producten',
    ...products.map((p) => `/producten/${p.slug}`),
    // Categorie-hub pagina's, alleen de indexeerbare (zie NOINDEX_INTEGRATION_CATEGORIES)
    ...categories.filter((c) => isIndexableIntegrationCategory(c.slug)).map((c) => `/integraties/${c.slug}`),
    // Vendor-detail pagina's, alleen de indexeerbare (off-topic categorieen eruit)
    ...integrations.filter(isIndexableIntegration).map((i) => `/integraties/${i.slug}`),
    // Comparison pages (programmatic SEO playbook "X vs Y")
    '/vergelijken',
    ...comparisons.map((c) => `/vergelijken/${c.slug}`),
    // Alternatief-pages (programmatic SEO + GEO playbook "[tool] alternatief")
    '/alternatief',
    ...alternatives.map((a) => `/alternatief/${a.slug}`),
    // Woordenboek (programmatic SEO playbook "wat is X")
    '/woordenboek',
    ...glossary.map((t) => `/woordenboek/${t.slug}`),
    // /agency-scan en /audit weggelaten, hebben noindex
    // /llms.txt weggelaten, is geen HTML-pagina
  ]

  const priorityFor = (path: string) => {
    if (path === '') return 1
    if (path === '/google-ads-uitbesteden' || path === '/social-media-uitbesteden' || path === '/voor-ondernemers' || path === '/voor-marketingteams' || path === '/platform') return 0.9
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
    lastModified: a.publishedAt,
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

  // SEO-landingspagina's: NL-only content, canonical naar NL, dus geen /en-entry
  // (zelfde regel als blogposts: geen duplicate-signaal, geen crawl-verspilling).
  const landingEntries: MetadataRoute.Sitemap = seoLandingPages.map((p) => ({
    url: `${baseUrl}/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    alternates: { languages: { 'nl-NL': `${baseUrl}/${p.slug}`, 'x-default': `${baseUrl}/${p.slug}` } },
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

  return [...nlEntries, ...enEntries, ...nlOnlyEntries, ...landingEntries, ...blogEntries, ...standaloneEnEntries]
}
