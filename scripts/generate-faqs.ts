/**
 * FAQ generator, extraheert 3-5 FAQs per editorial via Claude API.
 *
 * Workflow:
 *   1. Leest data/articles.ts voor de lijst editorials
 *   2. Per artikel: leest de body-component-JSX uit page.tsx
 *   3. Stuurt naar Claude met een strikte prompt: extract 3-5 FAQs
 *      die het artikel feitelijk beantwoordt, in dezelfde toon
 *   4. Schrijft het resultaat naar data/article-faqs.json
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... npm run faq:generate
 *   ANTHROPIC_API_KEY=sk-... npm run faq:generate -- last-click-is-een-gewoonte
 *   ANTHROPIC_API_KEY=sk-... npm run faq:generate -- --all
 *
 * Defaults:
 *   - Zonder argumenten: alleen slugs die nog géén FAQs hebben (incremental)
 *   - --all: regenerate álles (overschrijft bestaande)
 *   - <slug>: alleen die ene
 *
 * Niet automatisch in CI, dit kost API-tokens. Trigger handmatig na
 * publicatie van nieuwe editorials.
 */

import Anthropic from '@anthropic-ai/sdk'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { articles } from '../data/articles'

interface FAQ {
  question: string
  answer: string
}

const PAGE_TSX = path.join(__dirname, '..', 'app', '[locale]', 'blog', '[slug]', 'page.tsx')
const FAQS_JSON = path.join(__dirname, '..', 'data', 'article-faqs.json')

const MODEL = 'claude-opus-4-7'

const PROMPT_TEMPLATE = `Je bent de redactie van Stevin Journal. Extracteer 3 tot 5 FAQs uit het volgende editorial-artikel. Volg deze regels strikt:

1. Vragen moeten klinken zoals iemand ze écht aan een chatbot stelt: kort, direct, conversational. Geen marketing-vragen.
2. Antwoorden zijn 1 tot 3 zinnen. Feitelijk. Met cijfers/datums waar het artikel die noemt. Met geattribueerde bron ("volgens Gartner", "DHL persbericht 11 nov 2025") waar relevant.
3. Toon: accountant die toevallig kan designen. Neutraal. NOOIT 'incrementaliteit', 'causale data', 'attribution gap' (verboden marketing-jargon). Wel 'uplift', 'oorzaak en gevolg', 'meetdata'.
4. Géén em-dash voor pauze. Gebruik komma of punt.
5. Vraag-stem: gebruik "je" en "jouw" (informeel-zakelijk Nederlands), niet "u".
6. Antwoorden mogen NIET nieuwe claims verzinnen die niet in het artikel staan. Alleen de inhoud van het artikel teruggeven in Q&A-vorm.

Output: alleen een JSON-array. Geen markdown, geen uitleg, geen codeblock. Voorbeeld:

[{"question":"Wat is X?","answer":"X is Y, volgens Z (datum)."}]

Hier is het artikel:

TITEL: {{TITLE}}
DEK: {{DEK}}

BODY (JSX, alleen tekst-content telt):
{{BODY}}`

function readArticleBody(slug: string): string {
  const source = fs.readFileSync(PAGE_TSX, 'utf8')
  // Match function ArticleXBody met body-naam afgeleid van slug
  // We zoeken het stuk tussen function naam met 'Body' en de afsluitende `}` op rij 0 inspringen.
  // Deterministisch: vind comment-anchor "Editie 0XX" of "ArticleXBody"
  // Eerst: zoek naar comment-block met de slug erin (genoemd als "Editie ..., <topic>")
  const componentMap: Record<string, string> = {
    '95-procent-ai-pilots-mislukt': 'ArticleMITBody',
    'autonome-agents-90-dagen': 'ArticleAgentsBody',
    'last-click-is-een-gewoonte': 'ArticleLastClickBody',
  }
  const fnName = componentMap[slug]
  if (!fnName) {
    throw new Error(`Geen body-component bekend voor slug: ${slug}`)
  }
  // Vind functie + body
  const fnRegex = new RegExp(`function ${fnName}\\(\\)\\s*\\{[\\s\\S]*?\\n\\}`, 'm')
  const match = source.match(fnRegex)
  if (!match) {
    throw new Error(`Body-functie ${fnName} niet gevonden in page.tsx`)
  }
  return match[0]
}

async function generateFaqsForSlug(client: Anthropic, slug: string): Promise<FAQ[]> {
  const article = articles.find((a) => a.slug === slug)
  if (!article) throw new Error(`Article ${slug} niet gevonden in articles.ts`)
  const body = readArticleBody(slug)

  const prompt = PROMPT_TEMPLATE.replace('{{TITLE}}', article.title)
    .replace('{{DEK}}', article.dek)
    .replace('{{BODY}}', body)

  console.log(`  → Claude API call (${prompt.length} chars input)...`)
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = res.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim()

  // Strip optional markdown fences (sommige modellen voegen die toch toe)
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim()

  let parsed: unknown
  try {
    parsed = JSON.parse(cleaned)
  } catch (e) {
    throw new Error(`Claude output is geen geldige JSON. Ruwe output:\n${cleaned.slice(0, 400)}`)
  }
  if (!Array.isArray(parsed)) {
    throw new Error(`Claude output is geen array. Ruw type: ${typeof parsed}`)
  }
  const faqs: FAQ[] = []
  for (const item of parsed) {
    if (
      typeof item === 'object' &&
      item !== null &&
      'question' in item &&
      'answer' in item &&
      typeof (item as FAQ).question === 'string' &&
      typeof (item as FAQ).answer === 'string'
    ) {
      faqs.push({ question: (item as FAQ).question, answer: (item as FAQ).answer })
    }
  }
  if (faqs.length < 3 || faqs.length > 5) {
    console.warn(`  ⚠ Verwacht 3-5 FAQs, kreeg ${faqs.length}, opname toch`)
  }
  return faqs
}

async function main(): Promise<void> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY niet gezet')
    process.exit(1)
  }
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  // Argumenten parsen
  const args = process.argv.slice(2)
  const all = args.includes('--all')
  const slugArgs = args.filter((a) => !a.startsWith('--'))

  // Bestaande FAQs lezen
  const existing: Record<string, FAQ[]> = JSON.parse(fs.readFileSync(FAQS_JSON, 'utf8'))

  // Welke slugs verwerken?
  const componentMap: Record<string, string> = {
    '95-procent-ai-pilots-mislukt': 'ArticleMITBody',
    'autonome-agents-90-dagen': 'ArticleAgentsBody',
    'last-click-is-een-gewoonte': 'ArticleLastClickBody',
  }
  const knownSlugs = Object.keys(componentMap)
  let targets: string[]
  if (slugArgs.length > 0) {
    targets = slugArgs
  } else if (all) {
    targets = knownSlugs
  } else {
    // Incremental: alleen slugs zonder bestaande FAQs
    targets = knownSlugs.filter((s) => !existing[s] || existing[s].length === 0)
  }

  if (targets.length === 0) {
    console.log('[FAQ generator] Niets te doen. Alle bekende editorials hebben al FAQs.')
    console.log('              Gebruik --all om te regenereren.')
    return
  }

  console.log(`[FAQ generator] Targets: ${targets.join(', ')}`)

  for (const slug of targets) {
    console.log(`\n[FAQ generator] ${slug}`)
    try {
      const faqs = await generateFaqsForSlug(client, slug)
      existing[slug] = faqs
      console.log(`  ✓ ${faqs.length} FAQs geëxtraheerd`)
      faqs.forEach((f, i) => console.log(`    ${i + 1}. ${f.question}`))
    } catch (err: any) {
      console.error(`  ✗ ${slug}: ${err.message}`)
    }
  }

  // Schrijven (gesorteerd voor stabiele diffs)
  const sorted: Record<string, FAQ[]> = {}
  for (const k of Object.keys(existing).sort()) sorted[k] = existing[k]
  fs.writeFileSync(FAQS_JSON, JSON.stringify(sorted, null, 2) + '\n')
  console.log(`\n[FAQ generator] ✓ ${FAQS_JSON} bijgewerkt`)
}

main().catch((err) => {
  console.error('[FAQ generator] fatal:', err)
  process.exit(1)
})
