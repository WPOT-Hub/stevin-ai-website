/**
 * IndexNow submitter, pingt Bing/Yandex/Seznam dat URLs zijn vernieuwd.
 *
 * IndexNow is het enige legitieme push-protocol voor instant indexering
 * dat door Google's concurrenten ondersteund wordt. Google's Indexing API
 * is alleen voor JobPosting/BroadcastEvent, niet voor blog-content. Voor
 * Google blijven we afhankelijk van crawl + sitemap-discovery.
 *
 * Endpoint: https://api.indexnow.org/indexnow (forwards naar alle deelnemers)
 *
 * Usage:
 *   npx tsx scripts/indexnow.ts                 # submit alle blog-URLs
 *   npx tsx scripts/indexnow.ts <url1> <url2>   # submit specifieke URLs
 *
 * Per-deploy automatisering: voeg toe aan Vercel post-deploy hook of
 * roep aan vanuit GitHub Action na merge naar main.
 */

import { articles } from '../data/articles'
import { categories } from '../data/categories'
import { integrations } from '../data/integrations'
import { comparisons } from '../data/comparisons'
import { glossary } from '../data/glossary'

const HOST = 'stevin.ai'
const KEY = 'f8320e5bf8a4f23276040719d8a9548f'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

async function submitToIndexNow(urls: string[]): Promise<void> {
  if (urls.length === 0) {
    console.log('[IndexNow] geen URLs om te submitten')
    return
  }

  // IndexNow accepteert max 10.000 URLs per request, ruim voldoende.
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }

  console.log(`[IndexNow] submitten ${urls.length} URL(s)...`)
  for (const u of urls) console.log(`  - ${u}`)

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })

  // 200 = OK, 202 = accepted, 422 = invalid (key mismatch), 429 = rate limit
  if (res.status === 200 || res.status === 202) {
    console.log(`[IndexNow] ✓ status ${res.status}: submission geaccepteerd`)
  } else {
    const text = await res.text().catch(() => '')
    console.error(`[IndexNow] ✗ status ${res.status}: ${text || '(geen body)'}`)
    process.exit(1)
  }
}

function buildAllBlogUrls(): string[] {
  const baseUrl = `https://${HOST}`
  return articles.map((a) => `${baseUrl}/blog/${a.slug}`)
}

function buildAllIntegrationUrls(): string[] {
  const baseUrl = `https://${HOST}`
  return [
    ...categories.map((c) => `${baseUrl}/integraties/${c.slug}`),
    ...integrations.map((i) => `${baseUrl}/integraties/${i.slug}`),
  ]
}

function buildAllComparisonUrls(): string[] {
  const baseUrl = `https://${HOST}`
  return [
    `${baseUrl}/vergelijken`,
    ...comparisons.map((c) => `${baseUrl}/vergelijken/${c.slug}`),
  ]
}

function buildAllGlossaryUrls(): string[] {
  const baseUrl = `https://${HOST}`
  return [
    `${baseUrl}/woordenboek`,
    ...glossary.map((t) => `${baseUrl}/woordenboek/${t.slug}`),
  ]
}

function buildAllUrls(): string[] {
  return [
    ...buildAllBlogUrls(),
    ...buildAllIntegrationUrls(),
    ...buildAllComparisonUrls(),
    ...buildAllGlossaryUrls(),
  ]
}

const main = async () => {
  const args = process.argv.slice(2)
  let urls: string[]
  if (args.length === 0) {
    urls = buildAllBlogUrls()
  } else if (args[0] === '--all') {
    urls = buildAllUrls()
  } else if (args[0] === '--integrations') {
    urls = buildAllIntegrationUrls()
  } else if (args[0] === '--comparisons') {
    urls = buildAllComparisonUrls()
  } else if (args[0] === '--glossary') {
    urls = buildAllGlossaryUrls()
  } else {
    urls = args
  }
  await submitToIndexNow(urls)
}

main().catch((err) => {
  console.error('[IndexNow] fatal:', err)
  process.exit(1)
})
