import type { MetadataRoute } from 'next'
import { articles } from '@/data/articles'
import { categories } from '@/data/categories'
import { integrations } from '@/data/integrations'
import { comparisons } from '@/data/comparisons'
import { glossary } from '@/data/glossary'
import { alternatives } from '@/data/alternatives'
import { isPublishableArticle } from './[locale]/blog/[slug]/page'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stevin.ai'

  const staticPages = [
    '/blog',
    '',
    '/marketing',
    '/artiesten',
    '/influencers',
    '/promotoren',
    '/merken',
    '/pr-bureaus',
    '/b2b',
    '/creatieve-bureaus',
    '/mediabureaus',
    '/e-commerce',
    '/healthcare-marketing',
    '/retail',
    '/voor-agencies',
    '/google-ad-grants-belgie',
    '/google-ad-grants-nederland',
    '/non-profit-marketing-belgie',
    '/non-profit-marketing-nederland',
    // /voor-dealers, /voor-verhuur, /voor-musea — uit sitemap tot vendor-claims gechecked zijn (noindex op pages)
    '/platform',
    '/diensten',
    '/werkwijze',
    '/multi-market',
    '/seo',
    '/geo',
    '/integraties',
    // Categorie-hub pagina's (22 stuks)
    ...categories.map((c) => `/integraties/${c.slug}`),
    // Vendor-detail pagina's (245 stuks)
    ...integrations.map((i) => `/integraties/${i.slug}`),
    // Comparison pages (programmatic SEO playbook "X vs Y")
    '/vergelijken',
    ...comparisons.map((c) => `/vergelijken/${c.slug}`),
    // Alternatief-pages (programmatic SEO + GEO playbook "[tool] alternatief")
    '/alternatief',
    ...alternatives.map((a) => `/alternatief/${a.slug}`),
    // Woordenboek (programmatic SEO playbook "wat is X")
    '/woordenboek',
    ...glossary.map((t) => `/woordenboek/${t.slug}`),
    '/ai-agents',
    '/data-verrijking',
    '/case-studies',
    '/case-studies/e-commerce',
    '/contact',
    '/simon-stevin',
    // /agency-scan en /audit weggelaten — hebben noindex
    // /llms.txt weggelaten — is geen HTML-pagina
  ]

  const priorityFor = (path: string) => {
    if (path === '') return 1
    if (path === '/marketing' || path === '/artiesten' || path === '/platform') return 0.9
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

  return [...nlEntries, ...enEntries, ...blogEntries]
}
