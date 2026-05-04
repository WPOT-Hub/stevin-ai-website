/**
 * Stevin Journal — articles index.
 * Match: Claude Design article.html
 *
 * Body wordt gerendered als JSX in /blog/[slug]/page.tsx (switch op slug).
 * Voor schaalbaarheid kan dit later naar MDX verplaatsen.
 */
export interface Article {
  slug: string
  edition: string // e.g. "014"
  category: string // e.g. "Onderzoek", "Methode", "Attribution"
  title: string
  dek: string // korte deck-paragraaf onder H1
  publishedAt: string // ISO YYYY-MM-DD
  readMinutes: number
  author: { name: string; role: string }
  posterStyle: 'solid' | 'gradient' | 'surface'
  posterTag: string // bv. "ONDERZOEK"
  posterTopic: string // bv. "95% van AI-pilots mislukt"
}

export const articles: Article[] = [
  {
    slug: '95-procent-ai-pilots-mislukt',
    edition: '014',
    category: 'Onderzoek',
    title:
      '95% van de AI-pilots in marketing mislukt. We lazen het MIT-rapport zo dat jij het niet hoeft.',
    dek:
      'Niet de modellen falen, maar de meetstructuur eronder. Een nuchtere lezing van wat er écht mis gaat tussen pilot, productie en P&L. Plus: vier vragen die je je vendor móét stellen voor je tekent.',
    publishedAt: '2026-05-02',
    readMinutes: 14,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'gradient',
    posterTag: 'ONDERZOEK',
    posterTopic: '95% van AI-pilots mislukt.',
  },
  {
    slug: 'autonome-agents-90-dagen',
    edition: '013',
    category: 'AI & Agents',
    title: 'Wat autonome agents écht doen, gemeten over 90 dagen.',
    dek:
      'Drie maanden agents in productie, 27 klanten. We meten output, kwaliteit en wat er fout ging. Geen hype, alleen log-data.',
    publishedAt: '2026-04-22',
    readMinutes: 11,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'gradient',
    posterTag: 'AI & AGENTS',
    posterTopic: 'Autonome agents in logistiek.',
  },
  {
    slug: 'last-click-is-een-gewoonte',
    edition: '012',
    category: 'Methode',
    title: 'Last-click is geen attributiemodel. Het is een gewoonte.',
    dek:
      'Waarom de meeste teams nog steeds naar last-click rapportages kijken terwijl ze weten dat het niet klopt. En wat je doet ipv "MMM kost te veel".',
    publishedAt: '2026-04-15',
    readMinutes: 8,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'surface',
    posterTag: 'METHODE',
    posterTopic: 'Last-click is een gewoonte.',
  },
  {
    slug: 'mmm-is-een-hypothese',
    edition: '011',
    category: 'Attribution',
    title: 'Een MMM-model is een hypothese, geen rapport.',
    dek:
      'Wat een Marketing Mix Model in feite zegt en wat consultants ervan maken. Plus: wanneer een MMM nuttig is en wanneer hij gewoon false confidence creëert.',
    publishedAt: '2026-04-08',
    readMinutes: 9,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'solid',
    posterTag: 'ATTRIBUTION',
    posterTopic: 'MMM is geen rapport.',
  },
]

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug)
}

export function getRelatedArticles(currentSlug: string, count = 3) {
  return articles.filter((a) => a.slug !== currentSlug).slice(0, count)
}
