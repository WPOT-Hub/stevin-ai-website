/**
 * Stevin Journal — articles index.
 *
 * Twee formats:
 * - 'editorial' — lange stukken (8-14 min) met Stevin-mening, drop-cap,
 *   callouts, takeaways. Match: Claude Design article.html.
 * - 'dispatch' — korte updates (2-4 min) in nu.nl/tweakers-stijl. Externe
 *   gebeurtenis + 1 paragraaf Stevin-duiding ("Wat dit betekent voor jou").
 *   Schrijf-regels: zie /docs/WRITING.md.
 */
export type ArticleFormat = 'editorial' | 'dispatch'

export interface Article {
  slug: string
  format: ArticleFormat
  edition: string
  category: string
  title: string
  dek: string
  publishedAt: string
  /** Optioneel — als afwezig valt JSON-LD dateModified terug op publishedAt */
  updatedAt?: string
  readMinutes: number
  author: { name: string; role: string }
  posterStyle: 'solid' | 'gradient' | 'surface'
  posterTag: string
  posterTopic: string
  /** Voor dispatches: external source URL + naam */
  source?: { url: string; name: string }
}

export const articles: Article[] = [
  /* ─── DISPATCHES ─── */
  {
    slug: 'spotify-ai-muziek-verificatie',
    format: 'dispatch',
    edition: '018',
    category: 'Platform',
    title: 'Spotify voert verificatiesysteem in tegen AI-muziek.',
    dek:
      'Spotify werkt aan een verplichte verificatie voor uploads. Labels en distributeurs moeten gaan aantonen dat de uitvoerder in een track een echte persoon is.',
    publishedAt: '2026-05-04',
    readMinutes: 2,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'solid',
    posterTag: 'PLATFORM',
    posterTopic: 'Spotify zet AI-muziek op slot.',
    source: {
      url:
        'https://www.nu.nl/tweakers/6394396/spotify-voert-verificatiesysteem-in-tegen-ai-muziek.html',
      name: 'NU.nl',
    },
  },
  {
    slug: 'oscars-ai-acteerprestaties-niet-toegestaan',
    format: 'dispatch',
    edition: '017',
    category: 'Beleid',
    title: 'Acteerprestaties met AI komen niet in aanmerking voor een Oscar.',
    dek:
      'De Academy heeft expliciet bevestigd dat performances die met generatieve AI tot stand komen, uitgesloten zijn van de Oscar-categorieën voor acteren.',
    publishedAt: '2026-05-03',
    readMinutes: 2,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'gradient',
    posterTag: 'BELEID',
    posterTopic: 'Oscar sluit AI-acteren uit.',
    source: {
      url:
        'https://www.nu.nl/oscars/6394453/acteerprestaties-gecreeerd-met-ai-komen-niet-in-aanmerking-voor-oscar.html',
      name: 'NU.nl',
    },
  },
  {
    slug: 'us-defense-ai-deals-zonder-anthropic',
    format: 'dispatch',
    edition: '016',
    category: 'Overheid',
    title: "Defensie VS sluit deals met acht techreuzen voor 'AI-first leger', zonder Anthropic.",
    dek:
      'Het Amerikaanse ministerie van Defensie kondigt overeenkomsten aan met SpaceX, OpenAI, Google, Nvidia, Reflection, Microsoft, AWS en Oracle. Anthropic ontbreekt opvallend.',
    publishedAt: '2026-05-02',
    readMinutes: 3,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'gradient',
    posterTag: 'OVERHEID',
    posterTopic: 'Pentagon kiest acht. Anthropic niet.',
    source: {
      url:
        'https://tweakers.net/nieuws/247426/defensie-vs-wil-ai-first-leger-door-deals-met-acht-techreuzen-zonder-anthropic.html',
      name: 'Tweakers',
    },
  },
  {
    slug: 'certe-mijnadviseur-chatgpt-koppeling',
    format: 'dispatch',
    edition: '015',
    category: 'Distributie',
    title: 'Certe koppelt ChatGPT-gebruikers aan financieel adviseurs via AI-app.',
    dek:
      'De Nederlandse verzekeringsorganisatie Certe lanceert MijnAdviseur, een ChatGPT-applicatie die verzekeringsvragen routeert naar aangesloten adviseurs in plaats van direct prijs te vergelijken.',
    publishedAt: '2026-04-29',
    readMinutes: 2,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'surface',
    posterTag: 'DISTRIBUTIE',
    posterTopic: 'ChatGPT als adviseur-funnel.',
    source: {
      url:
        'https://www.emerce.nl/wire/certe-koppelt-chatgptgebruikers-financieel-adviseurs-aiapp-mijnadviseur',
      name: 'Emerce',
    },
  },

  /* ─── EDITORIALS ─── */
  {
    slug: '95-procent-ai-pilots-mislukt',
    format: 'editorial',
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
    format: 'editorial',
    edition: '013',
    category: 'AI & Agents',
    title: 'Autonome agents in logistiek: wat werkt en wat niet.',
    dek:
      'Gepubliceerde agent-cases bij DHL, FedEx en anderen, naast elkaar gelegd. Wat er meetbaar verbeterde, wat stilletjes weer uit ging, en wat je hieruit kunt halen.',
    publishedAt: '2026-04-22',
    readMinutes: 8,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'gradient',
    posterTag: 'AI & AGENTS',
    posterTopic: 'Autonome agents in logistiek.',
  },
  {
    slug: 'last-click-is-een-gewoonte',
    format: 'editorial',
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
    format: 'editorial',
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

/**
 * Related-articles per slug — primair LLM-gekozen op topic-overlap.
 * Genereren met `npm run related:generate`. Fallback wanneer geen
 * mapping bestaat: eerste N andere artikelen (oude gedrag).
 */
import relatedMapping from './related-articles.json'
const RELATED: Record<string, string[]> = relatedMapping as Record<string, string[]>

export function getRelatedArticles(currentSlug: string, count = 3) {
  const explicit = RELATED[currentSlug]
  if (explicit && explicit.length > 0) {
    const matched = explicit
      .map((slug) => articles.find((a) => a.slug === slug))
      .filter((a): a is Article => Boolean(a))
    if (matched.length > 0) return matched.slice(0, count)
  }
  // Fallback — willekeurige 3 anderen
  return articles.filter((a) => a.slug !== currentSlug).slice(0, count)
}

export const editorials = () => articles.filter((a) => a.format === 'editorial')
export const dispatches = () => articles.filter((a) => a.format === 'dispatch')
