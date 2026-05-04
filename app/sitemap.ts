import type { MetadataRoute } from 'next'
import { articles } from '@/data/articles'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stevin.ai'
  const now = new Date().toISOString()

  const staticPages = [
    '/blog',
    ...articles.map((a) => `/blog/${a.slug}`),
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
    '/platform',
    '/diensten',
    '/werkwijze',
    '/multi-market',
    '/seo',
    '/geo',
    '/integraties',
    '/case-studies',
    '/case-studies/e-commerce',
    '/contact',
    '/simon-stevin',
    '/agency-scan',
    '/audit',
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

  const nlEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: (path === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: priorityFor(path),
    alternates: { languages: altLangs(path) },
  }))

  const enEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}/en${path}`,
    lastModified: now,
    changeFrequency: (path === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: Math.max(0.3, priorityFor(path) - 0.1),
    alternates: { languages: altLangs(path) },
  }))

  return [...nlEntries, ...enEntries]
}
