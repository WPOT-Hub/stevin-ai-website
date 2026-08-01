/**
 * Productie-audit voor iedere stevin.ai-release.
 *
 * - Alle sitemap-URL's: HTTP 200, self-canonical, indexeerbaar, parsebare JSON-LD.
 * - Nieuwe URL's: title, description, H1, OG, sitemap en crawlbare interne link.
 * - Journal: Article + Breadcrumb schema, zichtbare bron en interne Journal-link.
 * - Robots: sitemap plus expliciete toegang voor zoek- en AI-crawlers.
 * - Nieuwe URL's: na succesvolle audit aanmelden via IndexNow.
 *
 * Gebruik:
 *   npm run verify:production
 *   PREVIOUS_SITEMAP_FILE=/tmp/sitemap-before.xml npm run verify:production -- --all
 */

import fs from 'node:fs'

const BASIS = (process.env.VERIFY_BASE_URL || 'https://stevin.ai').replace(/\/$/, '')
const PREVIOUS_SITEMAP_FILE = process.env.PREVIOUS_SITEMAP_FILE || ''
const ALL = process.argv.includes('--all')
const CONCURRENCY = 12
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'f8320e5bf8a4f23276040719d8a9548f'

interface PageAudit {
  url: string
  errors: string[]
  warnings: string[]
  internalLinks: string[]
}

function urlsFromSitemap(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim())
}

function normalizedPath(value: string): string {
  try {
    return new URL(value).pathname.replace(/\/$/, '') || '/'
  } catch {
    return value.replace(/\/$/, '') || '/'
  }
}

function attr(html: string, tag: string, name: string, value: string, wanted: string): string | null {
  const tags = html.match(new RegExp(`<${tag}\\b[^>]*>`, 'gi')) ?? []
  for (const candidate of tags) {
    const marker = candidate.match(new RegExp(`${name}=["']([^"']+)["']`, 'i'))?.[1]
    if (marker?.toLowerCase() !== value.toLowerCase()) continue
    return candidate.match(new RegExp(`${wanted}=["']([^"']+)["']`, 'i'))?.[1] ?? null
  }
  return null
}

function jsonLdBlocks(html: string): unknown[] {
  const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  return scripts.map((match) => JSON.parse(match[1]))
}

function schemaTypes(blocks: unknown[]): Set<string> {
  const types = new Set<string>()
  const visit = (value: unknown) => {
    if (!value || typeof value !== 'object') return
    if (Array.isArray(value)) return value.forEach(visit)
    const row = value as Record<string, unknown>
    if (typeof row['@type'] === 'string') types.add(row['@type'])
    if (Array.isArray(row['@graph'])) row['@graph'].forEach(visit)
  }
  blocks.forEach(visit)
  return types
}

async function auditPage(url: string, strictTechnical: boolean, strictNewContent: boolean): Promise<PageAudit> {
  const errors: string[] = []
  const warnings: string[] = []
  const internalLinks: string[] = []
  let html = ''
  try {
    const response = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Stevin-Release-Audit/1.0' } })
    if (!response.ok) errors.push(`HTTP ${response.status}`)
    html = await response.text()
  } catch (error) {
    return { url, errors: [`ophalen mislukt: ${(error as Error).message}`], warnings, internalLinks }
  }

  const canonical = attr(html, 'link', 'rel', 'canonical', 'href')
  if (!canonical) errors.push('canonical ontbreekt')
  else if (normalizedPath(canonical) !== normalizedPath(url)) errors.push(`canonical wijst naar ${canonical}`)

  const robots = attr(html, 'meta', 'name', 'robots', 'content') || ''
  if (/\bnoindex\b/i.test(robots)) errors.push('URL staat in sitemap maar heeft noindex')

  let blocks: unknown[] = []
  try {
    blocks = jsonLdBlocks(html)
  } catch (error) {
    errors.push(`ongeldige JSON-LD: ${(error as Error).message}`)
  }

  if (strictTechnical) {
    const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim()
    const description = attr(html, 'meta', 'name', 'description', 'content')
    const h1Count = (html.match(/<h1\b/gi) ?? []).length
    if (!title) errors.push('title ontbreekt')
    if (!description) errors.push('meta description ontbreekt')
    if (h1Count !== 1) errors.push(`verwacht precies 1 H1, vond ${h1Count}`)
    if (!attr(html, 'meta', 'property', 'og:title', 'content')) errors.push('og:title ontbreekt')
    if (!attr(html, 'meta', 'property', 'og:description', 'content')) errors.push('og:description ontbreekt')
    if (!attr(html, 'meta', 'property', 'og:image', 'content')) errors.push('og:image ontbreekt')

    const internalHrefs = [...html.matchAll(/<a\b[^>]+href=["']([^"']+)["']/gi)]
      .map((match) => match[1])
      .filter((href) => href.startsWith('/') || href.startsWith(BASIS))
    if (internalHrefs.length === 0) errors.push('geen crawlbare interne link gevonden')
  }

  for (const match of html.matchAll(/<a\b[^>]+href=["']([^"']+)["']/gi)) {
    const href = match[1]
    if (!href.startsWith('/') && !href.startsWith(BASIS)) continue
    try {
      internalLinks.push(normalizedPath(new URL(href, BASIS).toString()))
    } catch {
      // Ongeldige hrefs vallen buiten de linkgraaf; de pagina-audit blijft doorlopen.
    }
  }

  if (normalizedPath(url).startsWith('/blog/')) {
    const types = schemaTypes(blocks)
    if (!types.has('Article')) errors.push('Article-schema ontbreekt')
    if (!types.has('BreadcrumbList')) errors.push('Breadcrumb-schema ontbreekt')
    if (!/<a\b[^>]+href=["']https?:\/\//i.test(html)) {
      const message = 'geen zichtbare externe bronlink gevonden'
      if (strictNewContent) errors.push(message)
      else warnings.push(message)
    }
    const journalLinks = [...html.matchAll(/<a\b[^>]+href=["']([^"']+)["']/gi)]
      .map((match) => match[1])
      .filter((href) => /\/blog\//.test(href) && normalizedPath(href) !== normalizedPath(url))
    if (journalLinks.length === 0) errors.push('geen gerelateerde interne Journal-link gevonden')
  }
  return { url, errors, warnings, internalLinks: [...new Set(internalLinks)] }
}

async function mapConcurrent<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const output = new Array<R>(items.length)
  let cursor = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const index = cursor++
      if (index >= items.length) return
      output[index] = await fn(items[index])
    }
  })
  await Promise.all(workers)
  return output
}

async function submitIndexNow(urls: string[]): Promise<void> {
  if (urls.length === 0 || BASIS !== 'https://stevin.ai') return
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: 'stevin.ai',
      key: INDEXNOW_KEY,
      keyLocation: `https://stevin.ai/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  })
  if (response.status !== 200 && response.status !== 202) {
    throw new Error(`IndexNow HTTP ${response.status}: ${(await response.text()).slice(0, 200)}`)
  }
  console.log(`IndexNow accepteerde ${urls.length} nieuwe URL(s) (HTTP ${response.status}).`)
}

async function main(): Promise<void> {
  const [robotsResponse, sitemapResponse] = await Promise.all([
    fetch(`${BASIS}/robots.txt`),
    fetch(`${BASIS}/sitemap.xml`),
  ])
  if (!robotsResponse.ok) throw new Error(`robots.txt HTTP ${robotsResponse.status}`)
  if (!sitemapResponse.ok) throw new Error(`sitemap.xml HTTP ${sitemapResponse.status}`)
  const [robots, sitemapXml] = await Promise.all([robotsResponse.text(), sitemapResponse.text()])

  const globalErrors: string[] = []
  if (!robots.includes(`${BASIS}/sitemap.xml`)) globalErrors.push('robots.txt noemt de sitemap niet')
  for (const crawler of ['Googlebot', 'OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'PerplexityBot']) {
    if (crawler !== 'Googlebot' && !robots.includes(crawler)) globalErrors.push(`robots.txt noemt ${crawler} niet expliciet`)
  }

  const sitemapUrls = urlsFromSitemap(sitemapXml)
  if (sitemapUrls.length === 0) globalErrors.push('sitemap bevat geen URL\'s')
  const previousXml = PREVIOUS_SITEMAP_FILE && fs.existsSync(PREVIOUS_SITEMAP_FILE)
    ? fs.readFileSync(PREVIOUS_SITEMAP_FILE, 'utf8')
    : ''
  const hasPreviousSitemap = previousXml.length > 0
  const previous = new Set(urlsFromSitemap(previousXml))
  const newUrls = hasPreviousSitemap ? sitemapUrls.filter((url) => !previous.has(url)) : []

  const targets = ALL
    ? sitemapUrls
    : [...new Set([`${BASIS}/`, `${BASIS}/blog`, ...sitemapUrls.filter((url) => /\/blog\//.test(url)).slice(0, 5), ...newUrls])]
  const strictNewContent = new Set(newUrls)
  console.log(`Productie-audit: ${targets.length}/${sitemapUrls.length} sitemap-URL's; ${newUrls.length} nieuw.`)

  const audits = await mapConcurrent(targets, CONCURRENCY, (url) =>
    auditPage(url, ALL || strictNewContent.has(url), strictNewContent.has(url)))
  const incomingPaths = new Set(audits.flatMap((audit) => audit.internalLinks))
  const orphanWarnings: string[] = []
  const orphanErrors: string[] = []
  if (ALL) {
    for (const url of sitemapUrls) {
      if (normalizedPath(url) === '/') continue
      if (incomingPaths.has(normalizedPath(url))) continue
      const message = `${url}: geen inkomende crawlbare interne link gevonden binnen de sitemap-set`
      if (strictNewContent.has(url)) orphanErrors.push(message)
      else orphanWarnings.push(message)
    }
  }
  const errors = audits.flatMap((audit) => audit.errors.map((message) => `${audit.url}: ${message}`))
  const warnings = audits.flatMap((audit) => audit.warnings.map((message) => `${audit.url}: ${message}`))

  for (const warning of [...warnings, ...orphanWarnings].slice(0, 50)) console.warn(`WAARSCHUWING ${warning}`)
  for (const error of [...globalErrors, ...errors, ...orphanErrors].slice(0, 100)) console.error(`FOUT ${error}`)
  if (globalErrors.length + errors.length + orphanErrors.length > 0) {
    throw new Error(`${globalErrors.length + errors.length + orphanErrors.length} productiecontrole(s) mislukt`)
  }

  await submitIndexNow(newUrls)
  console.log(`Productie-audit geslaagd: ${targets.length} URL's, ${warnings.length + orphanWarnings.length} waarschuwing(en).`)
}

main().catch((error) => {
  console.error(`Release-audit mislukt: ${(error as Error).message}`)
  process.exit(1)
})
