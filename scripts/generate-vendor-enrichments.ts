/**
 * Vendor enrichment generator — verrijkt vendor-pages met unieke
 * "Stevin-invalshoek + stack-impact + pitfalls" content per vendor.
 *
 * Doel: 245 vendor-pages met identieke template-structuur worden door
 * Google als thin content gezien. Per-vendor unieke content boven de
 * generieke template haalt elke pagina ruim boven de duplicate-content
 * drempel én geeft long-tail keyword-coverage.
 *
 * Workflow:
 *   1. Leest data/integrations.ts voor vendor-lijst
 *   2. Leest data/vendor-enrichments.json voor wat al gedaan is
 *   3. Per vendor (default batch=5 per run): Claude API call met
 *      vendor-context (name, category, description, useCase, problems)
 *      en Stevin-toonregels
 *   4. Schrijft naar data/vendor-enrichments.json
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... npm run vendor:enrich              # 5 nieuwe
 *   ANTHROPIC_API_KEY=sk-... npm run vendor:enrich -- --count 10
 *   ANTHROPIC_API_KEY=sk-... npm run vendor:enrich -- <slug>    # specifiek
 *
 * Cron-suggestie: dagelijks 5 vendors → 245 vendors klaar in 49 dagen.
 * Of in 25 dagen bij batch van 10. Dat is de programmatic SEO-pijplijn
 * voor de komende kwartaal.
 *
 * Output is bewerkbaar — review na elke batch wenselijk vóór deploy.
 */

import Anthropic from '@anthropic-ai/sdk'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { integrations } from '../data/integrations'
import { categories } from '../data/categories'

interface VendorEnrichment {
  stevinAngle: string
  stackImpact: string
  pitfalls?: string[]
  enrichedAt?: string
}

const ENRICHMENTS_JSON = path.join(__dirname, '..', 'data', 'vendor-enrichments.json')
const MODEL = 'claude-opus-4-7'

const PROMPT_TEMPLATE = `Je bent de redactie van Stevin Journal. Schrijf voor de volgende vendor unieke content voor de vendor-pagina op stevin.ai/integraties/{{SLUG}}. Volg deze regels strikt:

1. Toon: accountant die toevallig kan designen. Direct, neutraal, met cijfers waar mogelijk.
2. NOOIT verboden jargon: "incrementaliteit", "causale data", "attribution gap", "synergistische impact". Wel: "uplift", "oorzaak en gevolg", "meetdata", "false confidence".
3. Géén em-dash voor pauze. Punt of komma.
4. Specifieke getallen waar je ze hebt. Geen vage kwantificeringen ("veel", "een hoop"). Verzin geen cijfers — als je niet zeker bent, weglaten.
5. "Je" en "jouw", informeel-zakelijk Nederlands.
6. Inhoudelijk: schrijf vanuit Stevin's perspectief als consultancy die DEZE vendor in de praktijk bij klanten implementeert. Niet als marketing-praatje, maar als field-observatie.

Output: JSON met exact deze structuur, geen markdown, geen uitleg eromheen:

{
  "stevinAngle": "1-2 alinea's (~120-180 woorden) over hoe Stevin déze vendor anders inzet, interpreteert of waarover Stevin's praktijkervaring afwijkt van de marketing-positionering. Concreet, met getallen of voorbeelden.",
  "stackImpact": "1 alinea (~80-120 woorden) over wat het kiezen van deze vendor concreet betekent voor jouw stack: welke andere tools moet je dan ook hebben, welke koppelingen, welke data-flow. Geen sales-pitch.",
  "pitfalls": [
    "Korte concrete valkuil 1, 1 zin, met de fout en het gevolg",
    "Idem 2",
    "Idem 3 (optioneel)",
    "Idem 4 (optioneel)"
  ]
}

VENDOR-CONTEXT:
- name: {{NAME}}
- slug: {{SLUG}}
- category: {{CATEGORY}}
- shortDescription: {{SHORT_DESCRIPTION}}
- description: {{DESCRIPTION}}
- useCase: {{USE_CASE}}
- howWeUseIt: {{HOW_WE_USE_IT}}
- problemsSolved:
{{PROBLEMS_SOLVED}}`

function buildPrompt(vendor: typeof integrations[number]): string {
  const cat = categories.find((c) => c.slug === vendor.category)
  return PROMPT_TEMPLATE.replace(/{{SLUG}}/g, vendor.slug)
    .replace('{{NAME}}', vendor.name)
    .replace('{{CATEGORY}}', cat?.name ?? vendor.category)
    .replace('{{SHORT_DESCRIPTION}}', vendor.shortDescription)
    .replace('{{DESCRIPTION}}', vendor.description)
    .replace('{{USE_CASE}}', vendor.useCase)
    .replace('{{HOW_WE_USE_IT}}', vendor.howWeUseIt)
    .replace('{{PROBLEMS_SOLVED}}', vendor.problemsSolved.map((p) => `  - ${p}`).join('\n'))
}

async function generateForVendor(client: Anthropic, slug: string): Promise<VendorEnrichment> {
  const vendor = integrations.find((v) => v.slug === slug)
  if (!vendor) throw new Error(`Vendor ${slug} niet gevonden`)

  const prompt = buildPrompt(vendor)
  console.log(`  → Claude API call (${prompt.length} chars input)...`)

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 1500,
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
    throw new Error(`Output is geen geldige JSON. Ruw:\n${cleaned.slice(0, 300)}`)
  }
  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error('Output is geen object')
  }
  const obj = parsed as Record<string, unknown>
  if (typeof obj.stevinAngle !== 'string' || obj.stevinAngle.length < 100) {
    throw new Error(`stevinAngle ontbreekt of te kort (${typeof obj.stevinAngle === 'string' ? obj.stevinAngle.length : 'n/a'} chars)`)
  }
  if (typeof obj.stackImpact !== 'string' || obj.stackImpact.length < 50) {
    throw new Error(`stackImpact ontbreekt of te kort`)
  }
  const enrichment: VendorEnrichment = {
    stevinAngle: obj.stevinAngle,
    stackImpact: obj.stackImpact,
    enrichedAt: new Date().toISOString().slice(0, 10),
  }
  if (Array.isArray(obj.pitfalls)) {
    const pitfalls = obj.pitfalls.filter((p): p is string => typeof p === 'string').slice(0, 4)
    if (pitfalls.length > 0) enrichment.pitfalls = pitfalls
  }
  return enrichment
}

async function main(): Promise<void> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY niet gezet')
    process.exit(1)
  }
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const args = process.argv.slice(2)
  const countArg = args.findIndex((a) => a === '--count')
  const batchSize = countArg >= 0 ? parseInt(args[countArg + 1], 10) || 5 : 5
  const slugArgs = args.filter((a) => !a.startsWith('--') && !/^\d+$/.test(a))

  const existing: Record<string, VendorEnrichment> = JSON.parse(
    fs.readFileSync(ENRICHMENTS_JSON, 'utf8'),
  )

  const allSlugs = integrations.map((v) => v.slug)
  let targets: string[]
  if (slugArgs.length > 0) {
    targets = slugArgs
  } else {
    // Pak de eerste N vendors die nog geen enrichment hebben
    targets = allSlugs.filter((s) => !existing[s] || !existing[s].stevinAngle).slice(0, batchSize)
  }

  if (targets.length === 0) {
    console.log('[Vendor enrich] Niets te doen. Alle vendors hebben enrichment.')
    return
  }
  console.log(`[Vendor enrich] Targets (${targets.length}): ${targets.join(', ')}`)

  for (const slug of targets) {
    console.log(`\n[Vendor enrich] ${slug}`)
    try {
      const enrichment = await generateForVendor(client, slug)
      existing[slug] = enrichment
      console.log(`  ✓ stevinAngle (${enrichment.stevinAngle.length} chars), stackImpact (${enrichment.stackImpact.length} chars), ${enrichment.pitfalls?.length ?? 0} pitfalls`)
    } catch (err: any) {
      console.error(`  ✗ ${slug}: ${err.message}`)
    }
  }

  // Schrijven (alfabetisch gesorteerd voor stabiele diffs)
  const sorted: Record<string, VendorEnrichment> = {}
  for (const k of Object.keys(existing).sort()) sorted[k] = existing[k]
  fs.writeFileSync(ENRICHMENTS_JSON, JSON.stringify(sorted, null, 2) + '\n')

  const totalEnriched = Object.values(existing).filter((e) => e.stevinAngle).length
  console.log(`\n[Vendor enrich] ✓ ${ENRICHMENTS_JSON} bijgewerkt`)
  console.log(`[Vendor enrich]   Totaal verrijkt: ${totalEnriched} / ${integrations.length} vendors (${Math.round((totalEnriched / integrations.length) * 100)}%)`)
}

main().catch((err) => {
  console.error('[Vendor enrich] fatal:', err)
  process.exit(1)
})
