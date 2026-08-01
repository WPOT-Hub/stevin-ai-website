/**
 * Deterministische related-articles generator voor het volledige Journal.
 *
 * Geen API of credits nodig. De score combineert zeldzame inhoudswoorden,
 * titeloverlap, expliciete topiclabels, categorie en bestemmingskwaliteit.
 * Na de eerste selectie repareert de generator het linknetwerk totdat ieder
 * actief artikel exact drie uitgaande en minimaal één inkomende link heeft.
 *
 * Gebruik: npm run related:generate
 */

import fs from 'node:fs'
import path from 'node:path'
import { articles, type Article } from '../data/articles'

const PAGE_PATH = path.join(process.cwd(), 'app/[locale]/blog/[slug]/page.tsx')
const OUTPUT_PATH = path.join(process.cwd(), 'data/related-articles.json')

const STOPWORDS = new Set([
  'aan', 'als', 'bij', 'dan', 'dat', 'de', 'deze', 'die', 'dit', 'door', 'een', 'en', 'er', 'gaan',
  'gaat', 'geen', 'heeft', 'het', 'hoe', 'hun', 'in', 'is', 'je', 'kan', 'maar', 'meer', 'met',
  'naar', 'niet', 'nog', 'nu', 'of', 'om', 'ook', 'op', 'over', 'te', 'tot', 'uit', 'van', 'voor',
  'waar', 'waarom', 'wat', 'wel', 'wordt', 'worden', 'zijn', 'the', 'and', 'for', 'from', 'into',
  'new', 'that', 'this', 'with', 'your', 'miljoen', 'miljard', 'dollar', 'euro', '2026', '2027',
  '2028', 'lanceert', 'introduceert', 'voegt', 'nieuwe', 'nieuw', 'bedrijven', 'bedrijf',
  'januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september',
  'oktober', 'november', 'december',
])

const TOPIC_PATTERNS: Array<[string, RegExp]> = [
  ['google-ads', /google ads|ai max|performance max|pmax|demand gen|merchant center|campaign groups|target roas|target cpa/i],
  ['measurement', /attribut|increment|marketing mix|\bmmm\b|\bga4\b|google analytics|brand lift|meetdata|meting|uplift|roas/i],
  ['seo', /\bseo\b|organisch|organic|zoekresult|search console|indexe|zero.click|zoekverkeer/i],
  ['ai-search', /chatgpt|perplexity|ai.overview|ai.antwoord|llms\.txt|ai.zichtbaarheid|aeo|generative engine|zoekzichtbaarheid/i],
  ['brand', /merk|brand|creativ|campagne|advertentie|marketing/i],
  ['commerce', /e.?commerce|retail|shopping|shop|winkel|checkout|verkoop/i],
  ['agents', /agent|agentic|autonoom|copilot/i],
  ['security', /security|beveilig|cyber|hack|lek|fraude|prompt.?inject/i],
  ['policy', /ai act|beleid|regelgeving|toezicht|wetgeving|europese unie|overheid/i],
  ['infrastructure', /datacenter|data.center|infrastructuur|chip|semiconductor|geheugen|compute|cloud/i],
  ['robotics', /robot|robotaxi|humano|autonome voertuig|zelfrijd/i],
  ['space', /nasa|spacex|rocket lab|ruimtevaart|satelliet|mars|raket/i],
  ['openai', /openai|chatgpt/i],
  ['anthropic', /anthropic|claude/i],
  ['google', /google|youtube|gemini|waymo/i],
  ['microsoft', /microsoft|copilot|outlook/i],
  ['meta', /meta|instagram|threads/i],
  ['apple', /apple|siri|iphone|ios|mac/i],
  ['amazon', /amazon|alexa|aws/i],
  ['tiktok', /tiktok/i],
  ['mistral', /mistral/i],
  ['finance', /financier|investe|overname|beurs|ipo|waardering|funding|acquisitie/i],
]

const PREFERRED_PAIRS = [
  ['lecun-ami-labs-jepa-tegen-llms', 'lecun-miljard-tegen-het-taalmodel'],
  ['amazon-alexa-wordt-shopping-agent-en-advertentieplatform', 'alexa-agentic-ads-veranderen-de-regels-van-conversational-marketing'],
  ['europa-verspeelt-ai-kansen-door-een-kaart-te-spelen', 'europa-moet-asml-inzetten-als-strategische-onderhandelingskaart'],
  ['nieuwe-ecommerce-tools-mei-2026', 'nieuwe-ecommerce-tools-juni-2026'],
  ['google-demand-gen-integratie-commerce-media', 'google-breidt-demand-gen-uit-met-youtube-creator-tools'],
  ['klanten-vragen-naar-chatgpt-zichtbaarheid', 'zichtbaar-in-ai-antwoorden-aeo-geo'],
  ['tiktok-shop-lanceert-in-nederland-op-15-juni', 'wat-not-doet-wel-en-shoped-niet'],
  ['tiktok-shop-lanceert-in-nederland-op-15-juni', 'nieuwe-ecommerce-tools-juni-2026'],
  ['barclays-koopt-gohenry-voor-180-miljoen', 'informer-money-genomineerd-voor-best-fintech-startup-belgie'],
  ['barclays-koopt-gohenry-voor-180-miljoen', 'flutter-verlaat-london-stock-exchange'],
  ['kleding-en-accessoires-om-facial-recognition-te-misleiden', 'meta-gezichtsherkenning-ai-brillen'],
  ['kleding-en-accessoires-om-facial-recognition-te-misleiden', 'ai-leeftijdsschatting-asielzoekers-bias-onbetrouwbaar'],
  ['magnetic-networking-evolutie-personal-branding', 'branding-versus-marketing-wat-is-het-verschil'],
  ['magnetic-networking-evolutie-personal-branding', 'klantmerk-en-werkgeversmerk-moeten-hetzelfde-verhaal-vertellen'],
  ['ai-in-accountancy-evolutie-in-plaats-van-revolutie', 'autoboeker-haalt-12-miljoen-in-voor-ai-platform-accountants'],
  ['politieke-targeting-en-visuele-aandacht-eye-tracking', 'meta-voert-ai-disclosure-optie-in-en-breidt-creatieve-testmogelijkheden-uit'],
  ['deezer-lanceert-fan-remix-functie-met-artiestentoestemming', 'deezer-lanceert-ai-muziekdetector-voor-andere-streamingdiensten'],
  ['deezer-lanceert-fan-remix-functie-met-artiestentoestemming', 'spotify-ai-muziek-verificatie'],
  ['tno-biobuilt-centrum-versnelt-opschaling-biobased-materialen', 'watercongestie-nodigt-uit-tot-verplichte-waterbesparing'],
  ['tno-biobuilt-centrum-versnelt-opschaling-biobased-materialen', 'turbine-unit-stroom-uit-kanalen'],
  ['informer-money-genomineerd-voor-best-fintech-startup-belgie', 'afm-beboet-bunq-trage-fraudeafhandeling'],
  ['watercongestie-nodigt-uit-tot-verplichte-waterbesparing', 'netbeheerders-investeren-meer-in-netcongestie-met-verschillen-tussen-bedrijven'],
  ['ai-leeftijdsschatting-asielzoekers-bias-onbetrouwbaar', 'politieke-targeting-en-visuele-aandacht-eye-tracking'],
  ['uk-civil-service-ai-influencer-aan-stellen', 'karamo-brown-ai-wellness-app-ke'],
  ['eu-sap-maintenance-fee-bargaining-chip', 'erp-gebruikers-kiezen-voor-headless-oplossingen'],
] as const

interface Document {
  article: Article
  weighted: Map<string, number>
  titleTokens: Set<string>
  topics: Set<string>
}

function extractBodies(source: string): Map<string, string> {
  const bodies = new Map<string, string>()
  const pattern = /^  '([^']+)': \(\n    <>\n([\s\S]*?)\n    <\/>\n  \),/gm
  for (const match of source.matchAll(pattern)) {
    bodies.set(match[1], match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
  }
  return bodies
}

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .map((token) => token.replace(/^-+|-+$/g, ''))
    .filter((token) => token.length >= 3 && !STOPWORDS.has(token))
}

function addTokens(target: Map<string, number>, values: string[], weight: number): void {
  for (const value of values) target.set(value, (target.get(value) ?? 0) + weight)
}

function jaccard(left: Set<string>, right: Set<string>): number {
  if (!left.size || !right.size) return 0
  let shared = 0
  for (const value of left) if (right.has(value)) shared++
  return shared / (left.size + right.size - shared)
}

function cosine(left: Map<string, number>, right: Map<string, number>, idf: Map<string, number>): number {
  let dot = 0
  let leftNorm = 0
  let rightNorm = 0
  for (const [term, count] of left) {
    const weighted = count * (idf.get(term) ?? 1)
    leftNorm += weighted * weighted
    const other = right.get(term)
    if (other) dot += weighted * other * (idf.get(term) ?? 1)
  }
  for (const [term, count] of right) {
    const weighted = count * (idf.get(term) ?? 1)
    rightNorm += weighted * weighted
  }
  return leftNorm && rightNorm ? dot / Math.sqrt(leftNorm * rightNorm) : 0
}

function hasRealSource(article: Article): boolean {
  if (!article.source?.url) return false
  try {
    const url = new URL(article.source.url)
    return url.hostname !== 'stevin.ai' && url.pathname !== '/'
  } catch {
    return false
  }
}

function pairKey(left: string, right: string): string {
  return [left, right].sort().join('|')
}

function main(): void {
  const bodies = extractBodies(fs.readFileSync(PAGE_PATH, 'utf8'))
  const preferred = new Set(PREFERRED_PAIRS.map(([left, right]) => pairKey(left, right)))
  const publishableArticles = articles.filter((article) => article.format !== 'dispatch' || bodies.has(article.slug))
  const documents: Document[] = publishableArticles.map((article) => {
    const fullText = `${article.title} ${article.dek} ${bodies.get(article.slug) ?? ''}`
    const title = tokenize(article.title)
    const dek = tokenize(article.dek)
    const body = tokenize(bodies.get(article.slug) ?? '')
    const weighted = new Map<string, number>()
    addTokens(weighted, title, 6)
    addTokens(weighted, dek, 3)
    addTokens(weighted, body, 1)
    return {
      article,
      weighted,
      titleTokens: new Set(title),
      topics: new Set(TOPIC_PATTERNS.filter(([, pattern]) => pattern.test(fullText)).map(([topic]) => topic)),
    }
  })

  const frequency = new Map<string, number>()
  for (const document of documents) {
    for (const term of document.weighted.keys()) frequency.set(term, (frequency.get(term) ?? 0) + 1)
  }
  const idf = new Map([...frequency].map(([term, count]) => [term, Math.log((documents.length + 1) / (count + 1)) + 1]))

  const scoreCache = new Map<string, number>()
  const score = (left: Document, right: Document): number => {
    const key = `${left.article.slug}>${right.article.slug}`
    const cached = scoreCache.get(key)
    if (cached !== undefined) return cached
    const semantic = cosine(left.weighted, right.weighted, idf)
    const title = jaccard(left.titleTokens, right.titleTokens)
    const topics = jaccard(left.topics, right.topics)
    const category = left.article.category === right.article.category ? 0.035 : 0
    const destinationQuality = Math.min(right.article.readMinutes, 10) * 0.003 + (hasRealSource(right.article) ? 0.018 : 0)
    const preferredBoost = preferred.has(pairKey(left.article.slug, right.article.slug)) ? 0.6 : 0
    const value = semantic * 0.58 + title * 0.22 + topics * 0.28 + category + destinationQuality + preferredBoost
    scoreCache.set(key, value)
    return value
  }

  const documentBySlug = new Map(documents.map((document) => [document.article.slug, document]))
  const rankedBySlug = new Map<string, string[]>()
  for (const document of documents) {
    rankedBySlug.set(
      document.article.slug,
      documents
        .filter((candidate) => candidate.article.slug !== document.article.slug)
        .sort((left, right) => {
          const delta = score(document, right) - score(document, left)
          return delta || left.article.slug.localeCompare(right.article.slug)
        })
        .map((candidate) => candidate.article.slug),
    )
  }

  const mapping = new Map<string, string[]>(
    documents.map((document) => [document.article.slug, rankedBySlug.get(document.article.slug)!.slice(0, 3)]),
  )
  const incoming = new Map(documents.map((document) => [document.article.slug, 0]))
  for (const targets of mapping.values()) for (const target of targets) incoming.set(target, incoming.get(target)! + 1)
  const repairs: Array<{ source: string; removed: string; target: string }> = []

  // Geef elk artikel een crawlbaar inkomend pad. Vervang alleen een link naar
  // een artikel dat daarnaast nog minimaal één andere inkomende link behoudt.
  for (const target of documents.map((document) => document.article.slug).filter((slug) => incoming.get(slug) === 0)) {
    const targetDocument = documentBySlug.get(target)!
    const sourceCandidates = documents
      .filter((document) => document.article.slug !== target && !mapping.get(document.article.slug)!.includes(target))
      .sort((left, right) => score(right, targetDocument) - score(left, targetDocument))

    let repaired = false
    for (const source of sourceCandidates) {
      const current = mapping.get(source.article.slug)!
      const replaceable = current
        .map((slug, index) => ({ slug, index, value: score(source, documentBySlug.get(slug)!) }))
        .filter(({ slug }) => incoming.get(slug)! > 1)
        .sort((left, right) => left.value - right.value)[0]
      if (!replaceable) continue
      current[replaceable.index] = target
      incoming.set(replaceable.slug, incoming.get(replaceable.slug)! - 1)
      incoming.set(target, 1)
      repairs.push({ source: source.article.slug, removed: replaceable.slug, target })
      repaired = true
      break
    }
    if (!repaired) throw new Error(`Kon geen inkomende related-link maken voor ${target}`)
  }

  const output: Record<string, string[]> = {}
  for (const slug of [...mapping.keys()].sort()) output[slug] = mapping.get(slug)!
  const invalid = Object.entries(output).filter(([slug, targets]) =>
    targets.length !== 3 || new Set(targets).size !== 3 || targets.includes(slug) || targets.some((target) => !documentBySlug.has(target)),
  )
  const withoutIncoming = [...incoming].filter(([, count]) => count === 0)
  if (invalid.length || withoutIncoming.length) {
    throw new Error(`Related-validatie faalde: ${invalid.length} ongeldige mappings, ${withoutIncoming.length} zonder inkomende link`)
  }

  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`)
  const weakest = documents
    .map((document) => {
      const targets = output[document.article.slug]
      return {
        slug: document.article.slug,
        weakestScore: Math.min(...targets.map((target) => score(document, documentBySlug.get(target)!))),
      }
    })
    .sort((left, right) => left.weakestScore - right.weakestScore)
    .slice(0, 10)
  console.log(`[Related generator] ${publishableArticles.length} publiceerbare artikelen, ${publishableArticles.length * 3} links, 100% uitgaand en inkomend gedekt.`)
  console.log(`[Related generator] ${repairs.length} inkomende links gerepareerd.`)
  console.log(`[Related generator] Laagste clusters ter redactionele controle: ${weakest.map(({ slug }) => slug).join(', ')}`)
  console.log(`[Related generator] Geschreven: ${OUTPUT_PATH}`)
}

main()
