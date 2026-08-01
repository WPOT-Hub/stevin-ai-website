/**
 * Deterministische Journal-contentaudit.
 *
 * Doel:
 * - alle actieve artikelen en echte bodytekst inventariseren;
 * - exacte bronduplicaten en waarschijnlijke inhoudsduplicaten rangschikken;
 * - bron-, thin-content- en related-mapping-gaten zichtbaar maken;
 * - een herhaalbaar auditbestand leveren voordat er URL's worden geconsolideerd.
 *
 * Gebruik:
 *   npx tsx scripts/audit-journal-content.ts
 *   npx tsx scripts/audit-journal-content.ts --out docs/audits/journal-content-audit.json
 */

import fs from 'node:fs'
import path from 'node:path'
import { articles } from '../data/articles'
import retiredArticles from '../data/retired-articles.json'

const PAGE_PATH = path.join(process.cwd(), 'app/[locale]/blog/[slug]/page.tsx')
const RELATED_PATH = path.join(process.cwd(), 'data/related-articles.json')

const STOPWORDS = new Set([
  'aan', 'als', 'bij', 'dan', 'dat', 'de', 'deze', 'die', 'dit', 'door', 'een', 'en', 'er', 'het',
  'hoe', 'hun', 'in', 'is', 'je', 'kan', 'maar', 'meer', 'met', 'naar', 'niet', 'nog', 'of', 'om',
  'ook', 'op', 'over', 'te', 'tot', 'uit', 'van', 'voor', 'waar', 'waarom', 'wat', 'wel', 'wordt',
  'worden', 'zijn', 'the', 'and', 'for', 'from', 'into', 'new', 'that', 'this', 'with', 'your',
])

interface DocumentVector {
  slug: string
  titleTokens: string[]
  summaryTokens: string[]
  bodyTokens: string[]
  weightedCounts: Map<string, number>
  bodyShingles: Set<string>
  bodyWordCount: number
}

interface PairScore {
  left: string
  right: string
  leftTitle: string
  rightTitle: string
  combinedScore: number
  titleSimilarity: number
  contentSimilarity: number
  bodyShingleSimilarity: number
  sameCategory: boolean
  sameSourceUrl: boolean
}

function extractBodies(source: string): Map<string, string> {
  const output = new Map<string, string>()
  const pattern = /^  '([^']+)': \(\n    <>\n([\s\S]*?)\n    <\/\>\n  \),/gm
  for (const match of source.matchAll(pattern)) {
    const text = match[2]
      .replace(/<[^>]+>/g, ' ')
      .replace(/\{[^{}]*\}/g, ' ')
      .replace(/&quot;/g, '"')
      .replace(/&apos;|&#39;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim()
    output.set(match[1], text)
  }
  return output
}

function extractBodyMarkup(source: string): Map<string, string> {
  const output = new Map<string, string>()
  const pattern = /^  '([^']+)': \(\n    <>\n([\s\S]*?)\n    <\/>\n  \),/gm
  for (const match of source.matchAll(pattern)) output.set(match[1], match[2])
  return output
}

function tokens(value: string): string[] {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .map((token) => token.replace(/^-+|-+$/g, ''))
    .filter((token) => token.length >= 3 && !STOPWORDS.has(token))
}

function countWeighted(parts: Array<[string[], number]>): Map<string, number> {
  const counts = new Map<string, number>()
  for (const [items, weight] of parts) {
    for (const item of items) counts.set(item, (counts.get(item) ?? 0) + weight)
  }
  return counts
}

function shingles(items: string[], size = 3): Set<string> {
  const result = new Set<string>()
  for (let index = 0; index <= items.length - size; index++) {
    result.add(items.slice(index, index + size).join(' '))
  }
  return result
}

function jaccard(left: Set<string>, right: Set<string>): number {
  if (left.size === 0 || right.size === 0) return 0
  let overlap = 0
  for (const item of left) if (right.has(item)) overlap++
  return overlap / (left.size + right.size - overlap)
}

function cosine(
  left: Map<string, number>,
  right: Map<string, number>,
  idf: Map<string, number>,
): number {
  let dot = 0
  let leftNorm = 0
  let rightNorm = 0
  for (const [term, count] of left) {
    const value = count * (idf.get(term) ?? 1)
    leftNorm += value * value
    const rightCount = right.get(term)
    if (rightCount) dot += value * rightCount * (idf.get(term) ?? 1)
  }
  for (const [term, count] of right) {
    const value = count * (idf.get(term) ?? 1)
    rightNorm += value * value
  }
  if (leftNorm === 0 || rightNorm === 0) return 0
  return dot / Math.sqrt(leftNorm * rightNorm)
}

function normalizeSource(value: string | undefined): string {
  if (!value) return ''
  try {
    const url = new URL(value)
    // A publisher homepage identifies a publication, not the underlying story.
    // Treating two homepage URLs as the same source creates false duplicates.
    if (url.pathname === '/' || url.pathname === '') return ''
    url.hash = ''
    for (const key of [...url.searchParams.keys()]) {
      if (key.startsWith('utm_')) url.searchParams.delete(key)
    }
    return url.toString().replace(/\/$/, '')
  } catch {
    return value.trim().replace(/\/$/, '')
  }
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000
}

function main(): void {
  const pageSource = fs.readFileSync(PAGE_PATH, 'utf8')
  const bodies = extractBodies(pageSource)
  const bodyMarkup = extractBodyMarkup(pageSource)
  const related = JSON.parse(fs.readFileSync(RELATED_PATH, 'utf8')) as Record<string, string[]>
  const publishableArticles = articles.filter((article) => article.format !== 'dispatch' || bodies.has(article.slug))
  const dormantDispatches = articles.filter((article) => article.format === 'dispatch' && !bodies.has(article.slug))

  const documents: DocumentVector[] = publishableArticles.map((article) => {
    const titleTokens = tokens(article.title)
    const summaryTokens = tokens(article.dek)
    const bodyTokens = tokens(bodies.get(article.slug) ?? '')
    return {
      slug: article.slug,
      titleTokens,
      summaryTokens,
      bodyTokens,
      weightedCounts: countWeighted([
        [titleTokens, 5],
        [summaryTokens, 3],
        [bodyTokens, 1],
      ]),
      bodyShingles: shingles(bodyTokens),
      bodyWordCount: (bodies.get(article.slug) ?? '').split(/\s+/).filter(Boolean).length,
    }
  })

  const documentFrequency = new Map<string, number>()
  for (const document of documents) {
    for (const term of document.weightedCounts.keys()) {
      documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1)
    }
  }
  const idf = new Map(
    [...documentFrequency].map(([term, frequency]) => [
      term,
      Math.log((documents.length + 1) / (frequency + 1)) + 1,
    ]),
  )

  const articleBySlug = new Map(publishableArticles.map((article) => [article.slug, article]))
  const pairScores: PairScore[] = []
  for (let leftIndex = 0; leftIndex < documents.length; leftIndex++) {
    for (let rightIndex = leftIndex + 1; rightIndex < documents.length; rightIndex++) {
      const left = documents[leftIndex]
      const right = documents[rightIndex]
      const leftArticle = articleBySlug.get(left.slug)!
      const rightArticle = articleBySlug.get(right.slug)!
      const titleSimilarity = jaccard(new Set(left.titleTokens), new Set(right.titleTokens))
      const contentSimilarity = cosine(left.weightedCounts, right.weightedCounts, idf)
      const bodyShingleSimilarity = jaccard(left.bodyShingles, right.bodyShingles)
      const sameCategory = leftArticle.category === rightArticle.category
      const leftSource = normalizeSource(leftArticle.source?.url)
      const rightSource = normalizeSource(rightArticle.source?.url)
      const sameSourceUrl = Boolean(
        leftSource &&
        rightSource &&
        leftSource === rightSource,
      )
      const combinedScore =
        titleSimilarity * 0.45 +
        contentSimilarity * 0.4 +
        bodyShingleSimilarity * 0.1 +
        (sameCategory ? 0.025 : 0) +
        (sameSourceUrl ? 0.5 : 0)
      if (
        sameSourceUrl ||
        titleSimilarity >= 0.2 ||
        contentSimilarity >= 0.32 ||
        bodyShingleSimilarity >= 0.08 ||
        combinedScore >= 0.2
      ) {
        pairScores.push({
          left: left.slug,
          right: right.slug,
          leftTitle: leftArticle.title,
          rightTitle: rightArticle.title,
          combinedScore: round(combinedScore),
          titleSimilarity: round(titleSimilarity),
          contentSimilarity: round(contentSimilarity),
          bodyShingleSimilarity: round(bodyShingleSimilarity),
          sameCategory,
          sameSourceUrl,
        })
      }
    }
  }
  pairScores.sort((left, right) => right.combinedScore - left.combinedScore)

  const existingSlugs = new Set(publishableArticles.map((article) => article.slug))
  const invalidRelated = Object.entries(related).flatMap(([slug, targets]) =>
    targets
      .filter((target) => target === slug || !existingSlugs.has(target))
      .map((target) => ({ slug, target })),
  )
  const incoming = new Map<string, number>()
  for (const targets of Object.values(related)) {
    for (const target of targets) incoming.set(target, (incoming.get(target) ?? 0) + 1)
  }

  const report = {
    generatedAt: new Date().toISOString(),
    inventory: {
      activeRecords: articles.length,
      publishable: publishableArticles.length,
      dispatches: publishableArticles.filter((article) => article.format === 'dispatch').length,
      editorials: publishableArticles.filter((article) => article.format === 'editorial').length,
      consolidations: retiredArticles.length,
      dormantWithoutBody: dormantDispatches.length,
      dispatchesWithThreeH2: publishableArticles.filter((article) => {
        if (article.format !== 'dispatch') return false
        return (bodyMarkup.get(article.slug)?.match(/<h2[>\s]/g) ?? []).length >= 3
      }).length,
      withExplicitRelatedMapping: publishableArticles.filter((article) => (related[article.slug] ?? []).length >= 3).length,
      withoutIncomingExplicitLink: publishableArticles.filter((article) => !incoming.has(article.slug)).length,
      invalidRelated,
    },
    dormantDispatches: dormantDispatches.map((article) => ({ slug: article.slug, title: article.title })),
    sourceGaps: publishableArticles
      .filter((article) => !article.source || !normalizeSource(article.source.url))
      .map((article) => ({ slug: article.slug, title: article.title, format: article.format })),
    thinBodies: documents
      .filter((document) => document.bodyWordCount > 0 && document.bodyWordCount < 120)
      .map((document) => ({
        slug: document.slug,
        title: articleBySlug.get(document.slug)!.title,
        words: document.bodyWordCount,
      }))
      .sort((left, right) => left.words - right.words),
    possibleDuplicatePairs: pairScores.slice(0, 250),
  }

  const outputArgIndex = process.argv.indexOf('--out')
  if (outputArgIndex >= 0 && process.argv[outputArgIndex + 1]) {
    const outputPath = path.resolve(process.argv[outputArgIndex + 1])
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`)
    console.log(`Journal-audit geschreven: ${outputPath}`)
  }
  if (process.argv.includes('--check')) {
    const failures: string[] = []
    if (report.inventory.withExplicitRelatedMapping !== report.inventory.publishable) {
      failures.push('niet-ieder-publiceerbaar-artikel-heeft-drie-related-links')
    }
    if (report.inventory.withoutIncomingExplicitLink > 0) failures.push('artikelen-zonder-inkomende-related-link')
    if (report.inventory.invalidRelated.length > 0) failures.push('ongeldige-related-doelen')
    const liveSlugs = new Set(publishableArticles.map((article) => article.slug))
    if (retiredArticles.some((article) => !liveSlugs.has(article.to))) failures.push('redirect-zonder-live-doel')
    if (failures.length > 0) throw new Error(`Journal-netwerkcheck faalde: ${failures.join(', ')}`)
    console.log(`Journal-netwerkcheck: ${report.inventory.publishable} artikelen, 3 uitgaande links per artikel, volledige inkomende dekking.`)
  } else if (outputArgIndex < 0) {
    console.log(JSON.stringify(report, null, 2))
  }
}

main()
