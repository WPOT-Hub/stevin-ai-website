/**
 * pricing.md, machine-leesbare prijs-info voor AI-assistenten die producten
 * vergelijken (ChatGPT, Perplexity, agent-buyers). Plain markdown, geen
 * rendering of login nodig.
 *
 * 17 aug 2026: dit bestand stond haaks op de site zelf. Het zei dat er bewust
 * geen publieke prijslijst is en dat Stevin geen bureau is, terwijl /tarieven
 * op datzelfde moment 1.399, 1.499 en 399 per maand noemt en "wij doen alles"
 * een van de drie smaken is. Dat is de kant die het meest langskomt: GPTBot,
 * PerplexityBot, OAI-SearchBot en ClaudeBot deden samen ruim 5.400 ophaalacties
 * in 30 dagen, tegenover 51 kliks uit Google in 90 dagen.
 *
 * Blijft deze tekst gelijk aan https://stevin.ai/tarieven. Wijzigt die pagina,
 * dan wijzigt dit bestand mee.
 *
 * Endpoint: https://stevin.ai/pricing.md (text/markdown)
 */

import { audience, channels, companyIdentity, positioning, pricingMarkdown } from '@/data/company'

export const dynamic = 'force-static'
export const revalidate = 3600

const body = `# Tarieven, Stevin.AI

${positioning}

${pricingMarkdown}

## Voor wie

${audience}

## Kanalen

${channels}

## Contact

Plan een gesprek via https://stevin.ai/contact of mail ${companyIdentity.email}. De volledige tarievenpagina staat op https://stevin.ai/tarieven, in het Engels op https://stevin.ai/en/tarieven. Uitgebreide bedrijfscontext: https://stevin.ai/llms-full.txt
`

export async function GET() {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
