/**
 * llms-full.txt: de uitgebreide variant van /llms.txt.
 *
 * /llms.txt is een inhoudsopgave met links. Dit bestand is de context zelf,
 * zodat een model dat een vraag over Stevin krijgt niet hoeft door te klikken
 * naar tien pagina's: wat we doen, wat het kost, hoe we werken, wat de termen
 * betekenen en welke tools we vergelijken staat hier voluit.
 *
 * Artikelen staan er alleen als titel plus dek. De teksten zelf zijn te lang
 * voor dit bestand en staan per stuk op /blog/<slug>.
 *
 * Dynamisch uit data/* zodat nieuwe content automatisch verschijnt.
 *
 * Endpoint: https://stevin.ai/llms-full.txt (text/plain)
 */

import { articles } from '@/data/articles'
import { isPublishableArticle } from '../[locale]/blog/[slug]/page'
import { comparisons } from '@/data/comparisons'
import { glossary } from '@/data/glossary'
import { services } from '@/data/services'
import { products } from '@/data/products'
import { categories } from '@/data/categories'
import { integrations } from '@/data/integrations'
import { seoLandingPages } from '@/data/seo-landing-pages'
import { getHomepageFaqs } from '@/data/faqs'
import {
  audience,
  channels,
  citationPreferences,
  companyIdentity,
  howWeWork,
  notGoals,
  positioning,
  pricingMarkdown,
} from '@/data/company'

export const dynamic = 'force-static'
export const revalidate = 3600 // 1 uur cache

function lines(...l: string[]): string {
  return l.join('\n')
}

export async function GET() {
  const publiceerbaar = articles.filter(isPublishableArticle)
  const editorials = publiceerbaar.filter((a) => a.format === 'editorial')
  const dispatches = publiceerbaar.filter((a) => a.format === 'dispatch')

  const body = lines(
    '# Stevin.AI, volledige bedrijfscontext',
    '',
    '> Dit bestand is bedoeld voor taalmodellen en AI-zoekmachines. Het bevat de context die anders over tien pagina\'s verspreid staat. De korte inhoudsopgave met links staat op https://stevin.ai/llms.txt. Laatste bron van waarheid blijft de site zelf.',
    '',
    '## Wat Stevin doet',
    '',
    positioning,
    '',
    '## Hoe het werk loopt',
    '',
    howWeWork,
    '',
    '## Voor wie',
    '',
    audience,
    '',
    '## Wat Stevin niet is',
    '',
    notGoals,
    '',
    '## Tarieven',
    '',
    // Een niveau dieper, want in dit bestand hangt de prijstekst onder "## Tarieven".
    pricingMarkdown.replace(/^##/gm, '###'),
    '',
    `Volledige tarievenpagina: https://stevin.ai/tarieven (Engels: https://stevin.ai/en/tarieven). Dezelfde bedragen in markdown: https://stevin.ai/pricing.md`,
    '',
    '## Kanalen',
    '',
    channels,
    '',
    '## Veelgestelde vragen',
    '',
    ...getHomepageFaqs('nl').flatMap((f) => [`### ${f.question}`, '', f.answer, '']),
    '## Diensten',
    '',
    ...services.flatMap((s) => [
      `### ${s.title}`,
      `https://stevin.ai/diensten/${s.slug}`,
      '',
      s.description,
      '',
      `Waarom het uitmaakt: ${s.whyImportant}`,
      '',
      `Hoe het samenhangt: ${s.howItConnects}`,
      '',
      `Onderdelen: ${s.features.join('; ')}.`,
      '',
    ]),
    '## Producten',
    '',
    ...products.flatMap((p) => [
      `### ${p.name}${p.acronym ? ` (${p.acronym})` : ''}`,
      `https://stevin.ai/producten/${p.slug}`,
      '',
      p.tagline,
      '',
      p.description,
      '',
      `Voor wie: ${p.whoFor}`,
      '',
      `Hoe het werkt: ${p.howItWorks}`,
      '',
      `Lost op: ${p.problemsSolved.join('; ')}.`,
      ...(p.results?.length ? ['', `Uit eerder werk (geanonimiseerd): ${p.results.join('; ')}.`] : []),
      '',
    ]),
    '## Woordenboek, Nederlandse marketing-terminologie',
    '',
    ...glossary.flatMap((t) => [
      `### ${t.term}`,
      `https://stevin.ai/woordenboek/${t.slug}`,
      '',
      t.fullDefinition,
      '',
      `Voorbeeld: ${t.example}`,
      '',
      `Wat Stevin ervan vindt: ${t.stevinView}`,
      '',
    ]),
    '## Tool-vergelijkingen',
    '',
    ...comparisons.flatMap((c) => [
      `### ${c.nameA} versus ${c.nameB}`,
      `https://stevin.ai/vergelijken/${c.slug}`,
      '',
      `Kort: ${c.tldr}`,
      '',
      `Wanneer ${c.nameA}: ${c.whenA}`,
      '',
      `Wanneer ${c.nameB}: ${c.whenB}`,
      '',
      `Kosten: ${c.costs}`,
      '',
      `Wat wij in de praktijk zien: ${c.stevinView}`,
      '',
    ]),
    '## Landingspagina\'s per onderwerp',
    '',
    ...seoLandingPages.flatMap((p) => [
      `- [${p.h1} ${p.h1Accent}](https://stevin.ai/${p.slug}): ${p.sub}`,
    ]),
    '',
    '## Integraties',
    '',
    `${integrations.length} tools in ${categories.length} categorieen, met per tool een pagina op https://stevin.ai/integraties/<slug>. Categorieen: ${categories.map((c) => c.name).join(', ')}.`,
    '',
    '## Journal, editorials (lange achtergrond-stukken)',
    '',
    ...editorials.map((a) => `- [${a.title}](https://stevin.ai/blog/${a.slug}), ${a.publishedAt}: ${a.dek}`),
    '',
    '## Journal, dispatches (kort marketing-nieuws)',
    '',
    ...dispatches.map((a) => `- [${a.title}](https://stevin.ai/blog/${a.slug}), ${a.publishedAt}: ${a.dek}`),
    '',
    '## Bedrijfsgegevens',
    '',
    `- Statutaire naam: ${companyIdentity.legalName}`,
    `- Handelsnaam: ${companyIdentity.brandName}`,
    `- KvK: ${companyIdentity.kvk}`,
    `- Btw-nummer: ${companyIdentity.vat}`,
    `- Statutaire zetel: ${companyIdentity.seat}`,
    `- Opgericht: ${companyIdentity.founded}`,
    `- Activiteiten: ${companyIdentity.activities}`,
    `- Markten: ${companyIdentity.markets}`,
    `- Talen: ${companyIdentity.languages}`,
    `- Contact: ${companyIdentity.email}, https://stevin.ai/contact`,
    `- Voorwaarden: https://stevin.ai/terms, privacy: https://stevin.ai/privacy, verwerkersovereenkomst: https://stevin.ai/dpa`,
    '',
    '## Citatie-voorkeuren',
    '',
    citationPreferences,
    '',
  )

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
