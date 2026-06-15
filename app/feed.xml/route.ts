/**
 * feed.xml, RSS 2.0 feed van het Stevin Journal. Een extra discovery-kanaal
 * naast de sitemap: feed-readers, aggregators en sommige indexers pakken nieuwe
 * artikelen hierlangs sneller op. Dynamisch uit data/articles, alleen
 * publiceerbare artikelen (body aanwezig), nieuwste eerst.
 *
 * Gelinkt in de <head> via app/[locale]/layout.tsx (alternates.types).
 * Endpoint: https://stevin.ai/feed.xml
 */

import { articles } from '@/data/articles'
import { isPublishableArticle } from '@/app/[locale]/blog/[slug]/page'

export const dynamic = 'force-static'
export const revalidate = 3600

const SITE = 'https://stevin.ai'

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const published = articles
    .filter(isPublishableArticle)
    .slice()
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 50)

  const items = published
    .map((a) => {
      const url = `${SITE}/blog/${a.slug}`
      const pubDate = new Date(a.publishedAt).toUTCString()
      const desc = a.dek || ''
      return [
        '    <item>',
        `      <title>${esc(a.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${esc(desc)}</description>`,
        '    </item>',
      ].join('\n')
    })
    .join('\n')

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    '    <title>Stevin Journal</title>',
    `    <link>${SITE}/blog</link>`,
    '    <description>Wat we lezen, meten en uitschrijven over marketing, meetbaarheid en AI. Van Stevin, de AI-laag over je operatie.</description>',
    '    <language>nl-NL</language>',
    `    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />`,
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
