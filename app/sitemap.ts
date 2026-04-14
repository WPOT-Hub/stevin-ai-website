import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stevin.ai'
  const now = new Date().toISOString()

  const staticPages = [
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
    '/seo',
    '/geo',
    '/integraties',
    '/case-studies',
    '/case-studies/e-commerce',
    '/contact',
  ]

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.startsWith('/marketing') || path.startsWith('/artiesten') ? 0.9 : 0.7,
  }))
}
