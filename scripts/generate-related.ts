/**
 * Related-articles generator, kiest per editorial 3 meest-relevante
 * andere artikelen via Claude API, op basis van title + dek + category.
 *
 * Output gaat naar data/related-articles.json. Wordt gelezen door
 * getRelatedArticles() in data/articles.ts.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... npm run related:generate
 *   ANTHROPIC_API_KEY=sk-... npm run related:generate -- --all
 *   ANTHROPIC_API_KEY=sk-... npm run related:generate -- last-click-is-een-gewoonte
 *
 * Defaults:
 *   - Zonder argumenten: alleen artikelen die nog géén related-mapping hebben
 *   - --all: regenerate álles
 *   - <slug>: alleen die ene
 *
 * Niet automatisch in CI: kost API-tokens, je wil de output reviewen.
 */

import Anthropic from '@anthropic-ai/sdk'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { articles } from '../data/articles'

const RELATED_JSON = path.join(__dirname, '..', 'data', 'related-articles.json')
const MODEL = 'claude-opus-4-7'

const PROMPT_TEMPLATE = `Je bent de redactie van Stevin Journal. Kies voor het hieronder gegeven CURRENT-artikel exact 3 meest-relevante andere artikelen uit de lijst CANDIDATES.

Relevantie betekent: zelfde topic-cluster, complementaire invalshoek, of expliciete tematische overlap. NIET op datum, NIET op format. Bij twijfel: kies een artikel dat een lezer van CURRENT logischerwijs daarna óók wil lezen.

Output: alleen een JSON-array van 3 slug-strings. Geen markdown, geen uitleg.

Voorbeeld output:
["mmm-is-een-hypothese", "95-procent-ai-pilots-mislukt", "autonome-agents-90-dagen"]

CURRENT:
- slug: {{CURRENT_SLUG}}
- titel: {{CURRENT_TITLE}}
- dek: {{CURRENT_DEK}}
- categorie: {{CURRENT_CATEGORY}}
- format: {{CURRENT_FORMAT}}

CANDIDATES (kies hier 3 uit):
{{CANDIDATES}}`

function formatCandidates(currentSlug: string): string {
  return articles
    .filter((a) => a.slug !== currentSlug)
    .map(
      (a) =>
        `- slug: ${a.slug} | format: ${a.format} | categorie: ${a.category} | titel: ${a.title} | dek: ${a.dek}`,
    )
    .join('\n')
}

async function pickRelatedForArticle(client: Anthropic, slug: string): Promise<string[]> {
  const article = articles.find((a) => a.slug === slug)
  if (!article) throw new Error(`Article ${slug} niet gevonden in articles.ts`)

  const prompt = PROMPT_TEMPLATE.replace('{{CURRENT_SLUG}}', article.slug)
    .replace('{{CURRENT_TITLE}}', article.title)
    .replace('{{CURRENT_DEK}}', article.dek)
    .replace('{{CURRENT_CATEGORY}}', article.category)
    .replace('{{CURRENT_FORMAT}}', article.format)
    .replace('{{CANDIDATES}}', formatCandidates(slug))

  console.log(`  → Claude API call (${prompt.length} chars input)...`)
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = res.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim()

  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim()

  let parsed: unknown
  try {
    parsed = JSON.parse(cleaned)
  } catch {
    throw new Error(`Claude output is geen geldige JSON. Ruw:\n${cleaned.slice(0, 200)}`)
  }
  if (!Array.isArray(parsed)) throw new Error(`Output is geen array`)

  const slugs = parsed.filter((s): s is string => typeof s === 'string')
  // Validate: alle slugs moeten bestaan en zijn niet currentSlug
  const validSlugs = slugs.filter((s) => articles.find((a) => a.slug === s) && s !== slug)
  if (validSlugs.length < 3) {
    console.warn(`  ⚠ Verwacht 3 valid slugs, kreeg ${validSlugs.length}, toch opnemen`)
  }
  return validSlugs.slice(0, 3)
}

async function main(): Promise<void> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY niet gezet')
    process.exit(1)
  }
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const args = process.argv.slice(2)
  const all = args.includes('--all')
  const slugArgs = args.filter((a) => !a.startsWith('--'))

  const existing: Record<string, string[]> = JSON.parse(fs.readFileSync(RELATED_JSON, 'utf8'))

  const allSlugs = articles.map((a) => a.slug)
  let targets: string[]
  if (slugArgs.length > 0) targets = slugArgs
  else if (all) targets = allSlugs
  else targets = allSlugs.filter((s) => !existing[s] || existing[s].length === 0)

  if (targets.length === 0) {
    console.log('[Related generator] Niets te doen. Gebruik --all om te regenereren.')
    return
  }
  console.log(`[Related generator] Targets: ${targets.length}`)

  for (const slug of targets) {
    console.log(`\n[Related generator] ${slug}`)
    try {
      const picks = await pickRelatedForArticle(client, slug)
      existing[slug] = picks
      console.log(`  ✓ ${picks.length} picks: ${picks.join(', ')}`)
    } catch (err: any) {
      console.error(`  ✗ ${slug}: ${err.message}`)
    }
  }

  // Schrijven (gesorteerd voor stabiele diffs)
  const sorted: Record<string, string[]> = {}
  for (const k of Object.keys(existing).sort()) sorted[k] = existing[k]
  fs.writeFileSync(RELATED_JSON, JSON.stringify(sorted, null, 2) + '\n')
  console.log(`\n[Related generator] ✓ ${RELATED_JSON} bijgewerkt`)
}

main().catch((err) => {
  console.error('[Related generator] fatal:', err)
  process.exit(1)
})
