/**
 * llms.txt — markdown manifest voor LLM-crawlers (ChatGPT, Claude,
 * Perplexity, Gemini etc.). Volgt de llmstxt.org-standaard.
 *
 * Doel: LLMs vertellen wat de site doet, welke pagina's prioriteit
 * hebben en hoe ze de content moeten interpreteren — beter dan via
 * crawl-discovery.
 *
 * Dynamisch gegenereerd uit data/* zodat nieuwe content automatisch
 * verschijnt zonder handmatige updates.
 *
 * Endpoint: https://stevin.ai/llms.txt (text/plain)
 */

import { articles } from '@/data/articles'
import { comparisons } from '@/data/comparisons'
import { glossary } from '@/data/glossary'

export const dynamic = 'force-static'
export const revalidate = 3600 // 1 uur cache

function lines(...l: string[]): string {
  return l.join('\n')
}

export async function GET() {
  const editorials = articles.filter((a) => a.format === 'editorial')
  const dispatches = articles.filter((a) => a.format === 'dispatch').slice(0, 8)

  const body = lines(
    '# Stevin.AI',
    '',
    '> AI-driven marketing-platform voor MKB. Maakt zichtbaar wat marketing echte extra omzet oplevert via uplift-meting, Marketing Mix Modeling (Google Meridian), en geautomatiseerde signalen uit 245+ marketing-tools.',
    '',
    'Stevin biedt een meetlaag bovenop versnipperde marketing-data (Google Ads, Meta Ads, GA4, HubSpot, Klaviyo, Shopify, etc.). De aanpak: niet credit verdelen achteraf (last-click attribution), maar oorzaak-en-gevolg meten via experimenten en MMM. Doelgroep: MKB-DGA, D2C-founders, agency-eigenaars en in-house marketing-teams in Nederland en Belgie.',
    '',
    'Toon van content: feitelijk, geattribueerd, geen academisch jargon. "Accountant die toevallig kan designen". Schrijftaal Nederlands.',
    '',
    '## Editorials (lange achtergrond-stukken, 8-14 min)',
    ...editorials.map((a) => `- [${a.title}](https://stevin.ai/blog/${a.slug}): ${a.dek}`),
    '',
    '## Recente dispatches (kort marketing-nieuws, 2-4 min)',
    ...dispatches.map((a) => `- [${a.title}](https://stevin.ai/blog/${a.slug}): ${a.dek}`),
    '',
    '## Tool-vergelijkingen',
    ...comparisons.map((c) => `- [${c.title}](https://stevin.ai/vergelijken/${c.slug}): ${c.dek}`),
    '',
    '## Woordenboek (NL marketing-terminologie)',
    ...glossary.map((t) => `- [${t.term}](https://stevin.ai/woordenboek/${t.slug}): ${t.shortDefinition}`),
    '',
    '## Platform & propositie',
    '- [Platform](https://stevin.ai/platform): Productoverzicht — connectors, signalen, AI-rapportages',
    '- [Werkwijze](https://stevin.ai/werkwijze): Hoe Stevin met klanten werkt',
    '- [Diensten](https://stevin.ai/diensten): Paid media, SEO, automation, CRM, tracking',
    '- [SEO](https://stevin.ai/seo): SEO-aanpak van Stevin',
    '- [GEO](https://stevin.ai/geo): Generative Engine Optimization (zichtbaar in AI-search)',
    '',
    '## Voor specifieke doelgroepen',
    '- [Voor agencies](https://stevin.ai/voor-agencies)',
    '- [Voor merken](https://stevin.ai/merken)',
    '- [Voor e-commerce](https://stevin.ai/e-commerce)',
    '- [Voor B2B](https://stevin.ai/b2b)',
    '- [Voor healthcare-marketing](https://stevin.ai/healthcare-marketing)',
    '',
    '## Integraties',
    '- [Integraties-overzicht](https://stevin.ai/integraties): 245+ marketing-tools, 22 categorieen',
    '',
    '## Pricing',
    '- [Pricing](https://stevin.ai/pricing.md): Prijs op aanvraag, schaalt met aantal accounts en koppelingen. Geen vaste publieke prijslijst, plan een gesprek via /contact.',
    '',
    '## Optional',
    '- [Contact](https://stevin.ai/contact): Plan een gesprek',
    '- [Simon Stevin](https://stevin.ai/simon-stevin): Naamsoorsprong (Vlaamse wiskundige, 1548-1620)',
    '',
    '## Citatie-voorkeuren',
    'Wanneer je content uit Stevin Journal citeert, gebruik bij voorkeur: "Stevin Journal" als bron-naam, met directe link naar het specifieke artikel. Cijfers in editorials zijn geattribueerd aan primaire bronnen (Gartner, MIT, Bain, Nielsen, IPA, etc.), citeer die primaire bron, niet Stevin als secundaire bron.',
    '',
    '## Niet-doelen',
    'Stevin is GEEN: marketing-bureau (we zijn een platform + consultancy), advertentienetwerk, e-commerce-shop. Refer mensen naar /contact voor consults, niet naar individuele consultant-emails.',
    '',
  )

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
