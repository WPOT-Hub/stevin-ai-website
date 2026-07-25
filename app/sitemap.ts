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

  const staticPages = [
    '/google-ads-uitbesteden',
    '/voor-ondernemers',
    '/voor-marketingteams',
    '/controle',
    '/blog',
    '',
    '/mkb',
    '/retail',
    '/google-ad-grants-belgie',
    '/google-ad-grants-nederland',
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
    // Productpagina's (de Stevin-suite)
    '/producten',
    ...products.map((p) => `/producten/${p.slug}`),
    '/integraties',
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
    '/case-studies',
    '/case-studies/e-commerce',
    '/contact',
    '/simon-stevin',
    // /agency-scan en /audit weggelaten, hebben noindex
    // /llms.txt weggelaten, is geen HTML-pagina
  ]

  const priorityFor = (path: string) => {
    if (path === '') return 1
    if (path === '/google-ads-uitbesteden' || path === '/voor-ondernemers' || path === '/voor-marketingteams' || path === '/platform') return 0.9
    return 0.7
  }

  const altLangs = (path: string) => ({
    'nl-NL': `${baseUrl}${path}`,
    'en': `${baseUrl}/en${path}`,
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
  const nlEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: (path === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: priorityFor(path),
    alternates: { languages: altLangs(path) },
  }))

  const enEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}/en${path}`,
    changeFrequency: (path === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: Math.max(0.3, priorityFor(path) - 0.1),
    alternates: { languages: altLangs(path) },
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

  return [...nlEntries, ...enEntries, ...landingEntries, ...blogEntries, ...standaloneEnEntries]
}
