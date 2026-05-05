/**
 * JSON-LD validator — runt in CI, faalt de build als een gepubliceerd
 * artikel een onvolledig/ongeldig Article-schema oplevert.
 *
 * Wat we checken (Schema.org Article required + recommended velden):
 *  - @context, @type
 *  - headline (max 110 chars per Google guidelines)
 *  - description
 *  - image (URL string of array)
 *  - datePublished (ISO 8601)
 *  - dateModified (ISO 8601)
 *  - author (Person of Organization met name)
 *  - publisher (Organization met name + logo)
 *  - mainEntityOfPage
 *
 * Bouwt het schema-object in JS (zonder Next runtime) door de logica
 * uit app/[locale]/blog/[slug]/page.tsx te dupliceren — als beide ooit
 * uit sync raken, faalt de check en weet je het.
 *
 * Usage:
 *   npx tsx scripts/validate-jsonld.ts
 *
 * Exit code 0 = alles ok, 1 = minstens één artikel heeft een issue.
 */

import { articles } from '../data/articles'
import { articleFaqs } from '../data/faqs'

interface ArticleSchema {
  '@context': string
  '@type': string
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified: string
  author: { '@type': string; name: string; jobTitle?: string }
  publisher: { '@type': string; name: string; logo: { '@type': string; url: string } }
  mainEntityOfPage: string
}

function buildSchema(article: typeof articles[number]): ArticleSchema {
  const isPersonAuthor =
    article.author.name !== 'Stevin Journal' && article.author.name !== 'Stevin'
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.dek,
    image: `https://stevin.ai/blog/${article.slug}/opengraph-image`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: isPersonAuthor
      ? { '@type': 'Person', name: article.author.name, jobTitle: article.author.role }
      : { '@type': 'Organization', name: 'Stevin' },
    publisher: {
      '@type': 'Organization',
      name: 'Stevin',
      logo: { '@type': 'ImageObject', url: 'https://stevin.ai/icon.svg' },
    },
    mainEntityOfPage: `https://stevin.ai/blog/${article.slug}`,
  }
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/

function validate(schema: ArticleSchema, slug: string): string[] {
  const errors: string[] = []
  if (schema['@context'] !== 'https://schema.org') errors.push('missing @context')
  if (schema['@type'] !== 'Article') errors.push('missing/wrong @type')
  if (!schema.headline) errors.push('missing headline')
  // Google wil headline ≤ 110 chars voor rich results
  if (schema.headline.length > 110)
    errors.push(`headline too long (${schema.headline.length} > 110 chars)`)
  if (!schema.description) errors.push('missing description')
  if (!schema.image || !schema.image.startsWith('https://'))
    errors.push('missing/invalid image URL')
  if (!ISO_DATE.test(schema.datePublished))
    errors.push(`datePublished not ISO 8601: ${schema.datePublished}`)
  if (!ISO_DATE.test(schema.dateModified))
    errors.push(`dateModified not ISO 8601: ${schema.dateModified}`)
  if (!schema.author?.name) errors.push('missing author.name')
  if (!schema.publisher?.name) errors.push('missing publisher.name')
  if (!schema.publisher?.logo?.url?.startsWith('https://'))
    errors.push('missing/invalid publisher.logo.url')
  if (!schema.mainEntityOfPage?.startsWith('https://'))
    errors.push('missing/invalid mainEntityOfPage')
  return errors.map((e) => `  • ${e}`)
}

function validateFaqs(slug: string): string[] {
  const list = articleFaqs[slug]
  if (!list || list.length === 0) return [] // Geen FAQs is OK, optioneel
  const errors: string[] = []
  if (list.length < 2) errors.push(`FAQPage heeft maar ${list.length} item — minimum 2 voor schema`)
  if (list.length > 10) errors.push(`FAQPage heeft ${list.length} items — keep onder 10 voor relevantie`)
  for (let i = 0; i < list.length; i++) {
    const f = list[i]
    if (!f.question || f.question.length < 8)
      errors.push(`FAQ #${i + 1}: question te kort/leeg`)
    if (!f.answer || f.answer.length < 20)
      errors.push(`FAQ #${i + 1}: answer te kort (<20 chars)`)
    if (f.answer && f.answer.length > 500)
      errors.push(`FAQ #${i + 1}: answer te lang (${f.answer.length}>500 chars) — wordt niet door Google getoond`)
  }
  return errors.map((e) => `  • ${e}`)
}

const main = () => {
  console.log(`[JSON-LD] valideer ${articles.length} artikel-schemas + FAQs...`)
  let totalErrors = 0
  for (const article of articles) {
    const schema = buildSchema(article)
    const errors = validate(schema, article.slug)
    const faqErrors = validateFaqs(article.slug)
    const all = [...errors, ...faqErrors]
    if (all.length > 0) {
      totalErrors += all.length
      console.error(`✗ ${article.slug} (editie ${article.edition})`)
      for (const e of all) console.error(e)
    }
  }
  if (totalErrors === 0) {
    console.log(`[JSON-LD] ✓ alle ${articles.length} artikelen valide (incl. ${Object.keys(articleFaqs).length} FAQ-schemas)`)
    process.exit(0)
  } else {
    console.error(`[JSON-LD] ✗ ${totalErrors} issue(s) gevonden`)
    process.exit(1)
  }
}

main()
