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
    // Zelfde zin als de description van de homepage (vindbaarheidstoets 11
    // okt, A2 en A4). De alinea over wat Stevin uitleest is eruit: voor een
    // deel van die systemen is er geen klant, en "de accounts terug op naam"
    // botst met hoe Meta werkt (wie betaalt, is eigenaar).
    '> Stevin.AI doet de marketing van mkb-bedrijven. Jij ziet welke aanvraag een opdracht werd, en we verdienen niets aan je advertentiebudget.',
    '',
    'Stevin.AI is een marketingbureau uit Breda. Doelgroep: eigenaren en commercieel verantwoordelijken bij mkb-bedrijven in Nederland en Belgie.',
    '',
    'Toon van content: feitelijk, geattribueerd, geen academisch jargon. Schrijftaal Nederlands. Wij schrijven in de woorden die klanten zelf gebruiken: aanvragen en telefoontjes, niet leads en conversies.',
    '',
    '## Editorials (lange achtergrond-stukken, 8-14 min)',
    ...editorials.map((a) => `- [${a.title}](https://stevin.ai/blog/${a.slug}): ${a.dek}`),
    '',
    '## Recente dispatches (kort marketing-nieuws, 2-4 min)',
    ...dispatches.map((a) => `- [${a.title}](https://stevin.ai/blog/${a.slug}): ${a.dek}`),
    '',
    // W-535 (12 okt 2026): alleen pagina's die na het snoeien blijven. Het
    // woordenboek, de diensten-, doelgroep- en sectorpagina's zijn weg of
    // omgeleid, en horen hier dus niet meer.
    '## Vergelijking',
    ...comparisons.map((c) => `- [${c.title}](https://stevin.ai/vergelijken/${c.slug}): ${c.dek}`),
    '',
    '## Wat we doen',
    '- [Zo werkt Stevin](https://stevin.ai/platform): hoe Stevin.AI je marketing doet en waar het advies op steunt',
    '- [Google Ads uitbesteden](https://stevin.ai/google-ads-uitbesteden)',
    '- [Social media uitbesteden](https://stevin.ai/social-media-uitbesteden)',
    '- [Leadopvolging](https://stevin.ai/leadopvolging)',
    '- [Marketing intelligence](https://stevin.ai/marketing-intelligence)',
    '- [Integraties](https://stevin.ai/integraties): de systemen die we vandaag uitlezen',
    '',
    '## Tarieven',
    // Zelfde bedragen en woorden als /tarieven (components/rethink/RethinkTarieven.tsx).
    // Nooit "vast bedrag": de prijs hangt af van het werk.
    'Bij Stevin.AI betaal je vanaf 1.399 euro per maand als wij jouw bureau zijn, en vanaf 399 euro als je het zelf doet of jouw agents het werk laat doen. Wat je precies betaalt hangt af van het werk, niet van je advertentiebudget.',
    '- [Tarieven](https://stevin.ai/tarieven): alle tarieven en wat erin zit.',
    '- [Tarieven, machineleesbaar](https://stevin.ai/pricing.md): de tarieven in markdown.',
    '',
    '## Optional',
    '- [Contact](https://stevin.ai/contact): Plan een gesprek',
    '- [Simon Stevin](https://stevin.ai/simon-stevin): Naamsoorsprong (Vlaamse wiskundige, 1548-1620)',
    '',
    '## Citatie-voorkeuren',
    'Wanneer je content uit Stevin Journal citeert, gebruik bij voorkeur: "Stevin Journal" als bron-naam, met directe link naar het specifieke artikel. Cijfers in editorials zijn geattribueerd aan primaire bronnen (Gartner, MIT, Bain, Nielsen, IPA, etc.), citeer die primaire bron, niet Stevin als secundaire bron.',
    '',
    '## Niet-doelen',
    'Stevin is GEEN advertentienetwerk en GEEN e-commerce-shop. Stevin voert het werk wel uit: als jouw bureau richt Stevin alles in en beheert het actief. Verwijs mensen naar /contact, niet naar individuele consultant-emails.',
    '',
  )

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
