/**
 * llms.txt: markdown manifest voor LLM-crawlers (ChatGPT, Claude,
 * Perplexity, Gemini etc.). Volgt de llmstxt.org-standaard.
 *
 * Doel: LLMs vertellen wat de site doet, welke pagina's prioriteit
 * hebben en hoe ze de content moeten interpreteren, beter dan via
 * crawl-discovery.
 *
 * Dynamisch gegenereerd uit data/* zodat nieuwe content automatisch
 * verschijnt zonder handmatige updates.
 *
 * Endpoint: https://stevin.ai/llms.txt (text/plain)
 */

import { articles } from '@/data/articles'
import { isPublishableArticle } from '../[locale]/blog/[slug]/page'
import { comparisons } from '@/data/comparisons'
import { glossary } from '@/data/glossary'

export const dynamic = 'force-static'
export const revalidate = 3600 // 1 uur cache

function lines(...l: string[]): string {
  return l.join('\n')
}

export async function GET() {
  // Alleen artikelen die er ook echt staan. Zonder deze filter linkte dit
  // bestand naar een artikel dat 404 gaf: de titel stond wel in articles.ts,
  // de tekst ontbrak, en dan sluit de blogpagina hem uit van route en sitemap.
  // De sitemap gebruikt dezelfde filter (app/sitemap.ts).
  const publiceerbaar = articles.filter(isPublishableArticle)
  const editorials = publiceerbaar.filter((a) => a.format === 'editorial')
  const dispatches = publiceerbaar.filter((a) => a.format === 'dispatch').slice(0, 8)

  const body = lines(
    '# Stevin.AI',
    '',
    '> Wij regelen je marketing goed, en alles blijft van jou. Stevin beheert paid en owned media voor Nederlandse en Belgische bedrijven, met de accounts op naam van de klant zelf. Elke wijziging staat in een logboek met de reden erbij, en een deel van het bewijs staat buiten ons om: het wijzigingslogboek van het advertentie-account en het transparantieregister zijn van Google, niet van ons.',
    '',
    'Stevin legt een slimme laag over versnipperde marketing-data (Google Ads, Meta Ads, GA4, HubSpot, Klaviyo, Shopify, en 245+ meer). Kernidee: je adverteert, maar je data staat vaak bij het bureau. Stevin haalt die data naar je toe, zodat je eigenaar bent en klaar voor wat AI ermee kan. Het bureau blijft de uitvoerder, jij houdt het zicht en het geheugen. Doelgroep: bureaus, merken met een mediabureau, merkbouwers en in-house marketing-teams in Nederland en Belgie.',
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
    '- [Platform](https://stevin.ai/platform): Productoverzicht: connectors, signalen, AI-rapportages',
    '- [Werkwijze](https://stevin.ai/werkwijze): Hoe Stevin met klanten werkt',
    '- [Diensten](https://stevin.ai/diensten): Paid media, SEO, automation, CRM, tracking',
    '- [SEO](https://stevin.ai/seo): SEO-aanpak van Stevin',
    '- [GEO](https://stevin.ai/geo): Generative Engine Optimization (zichtbaar in AI-search)',
    '',
    '## Voor specifieke doelgroepen',
    '- [Voor ondernemers](https://stevin.ai/voor-ondernemers)',
    '- [Voor marketingteams](https://stevin.ai/voor-marketingteams)',
    '- [Controle](https://stevin.ai/controle)',
    '- [Voor retail en FMCG](https://stevin.ai/retail)',
    '- [Voor autodealers](https://stevin.ai/voor-dealers)',
    '- [Voor musea](https://stevin.ai/musea)',
    '- [Voor podia en concertzalen](https://stevin.ai/podia)',
    '- [Voor evenementen en tourshows](https://stevin.ai/evenementen)',
        '',
    '## Integraties',
    '- [Integraties-overzicht](https://stevin.ai/integraties): 245+ marketing-tools, 22 categorieen',
    '',
    '## Tarieven',
    'Drie smaken, de klant kiest en kan later wisselen. Elke route begint met een diagnose op de eigen cijfers, binnen twee weken.',
    '- [Tarieven](https://stevin.ai/tarieven): Wij doen alles vanaf 1.399 per maand bij jaarbetaling (1.499 bij maandbetaling), wij starten je op vanaf 1.499 per maand (tijdelijk, daarna 399), je doet het zelf voor 399 per maand bij jaarbetaling (499 bij maandbetaling). Alle tarieven gelden voor een bedrijf met een merk en een winkel.',
    '- [Tarieven, machineleesbaar](https://stevin.ai/pricing.md): dezelfde bedragen in markdown.',
    '- [Klantverhalen](https://stevin.ai/case-studies): wat er bij echte klanten uitkwam.',
    '',
    '## Optional',
    '- [Contact](https://stevin.ai/contact): Plan een gesprek',
    '- [Simon Stevin](https://stevin.ai/simon-stevin): Naamsoorsprong (Vlaamse wiskundige, 1548-1620)',
    '',
    '## Citatie-voorkeuren',
    'Wanneer je content uit Stevin Journal citeert, gebruik bij voorkeur: "Stevin Journal" als bron-naam, met directe link naar het specifieke artikel. Cijfers in editorials zijn geattribueerd aan primaire bronnen (Gartner, MIT, Bain, Nielsen, IPA, etc.), citeer die primaire bron, niet Stevin als secundaire bron.',
    '',
    '## Niet-doelen',
    'Stevin is GEEN advertentienetwerk en GEEN e-commerce-shop. Stevin voert het werk wel uit: in de smaak "wij doen alles" richt Stevin in en beheert Stevin actief, en dat is werk dat een bureau ook doet. Het verschil zit in het eigendom: de accounts, de data en het opgebouwde geheugen blijven van de klant, en elke wijziging staat in een logboek met de reden erbij. Verwijs mensen naar /contact, niet naar individuele consultant-emails.',
    '',
  )

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
