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
    slug: 'google-ai-max-uit-beta-ai-brief-shopping',
    format: 'dispatch',
    edition: '031',
    category: 'Platform',
    title: 'Google AI Max verlaat beta met AI Brief en uitbreiding naar Shopping.',
    dek: 'Google maakte AI Max voor Search algemeen beschikbaar in mei. AI Brief laat adverteerders met eigen tekst sturen wat het systeem mag zeggen en wie het mag bereiken.',
    publishedAt: '2026-05-17',
    readMinutes: 3,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'gradient',
    posterTag: 'PLATFORM',
    posterTopic: 'Google AI Max algemeen beschikbaar.',
    source: { url: 'https://blog.google/products/ads-commerce/ai-max-new-features/', name: 'Google Ads Blog' },
  },
  {
    slug: 'insider-one-koopt-bluecore-retail-martech-ipo',
    format: 'dispatch',
    edition: '030',
    category: 'Markt',
    title: 'Insider One koopt Bluecore voor 400-merken retail-portefeuille richting IPO.',
    dek: 'Istanbul-gebaseerde Insider One nam op 13 mei Bluecore over en bouwt zijn Amerikaanse retail-footprint uit. De deal is een opmaat naar een geplande beursgang.',
    publishedAt: '2026-05-17',
    readMinutes: 3,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'solid',
    posterTag: 'MARKT',
    posterTopic: 'Insider One koopt Bluecore.',
    source: { url: 'https://www.bloomberg.com/news/articles/2026-05-13/insider-one-buys-bluecore-in-ai-marketing-drive-ahead-of-ipo', name: 'Bloomberg' },
  },
  {
    slug: 'anthropic-claude-small-business-vijftien-workflows',
    format: 'dispatch',
    edition: '029',
    category: 'Platform',
    title: 'Anthropic lanceert Claude for Small Business met vijftien workflows.',
    dek: 'Anthropic introduceerde op 13 mei een pakket connectors en agent-workflows voor ondernemers, met integraties naar QuickBooks, HubSpot, Canva en Google Workspace.',
    publishedAt: '2026-05-17',
    readMinutes: 3,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'gradient',
    posterTag: 'PLATFORM',
    posterTopic: 'Claude komt naar MKB.',
    source: { url: 'https://siliconangle.com/2026/05/13/anthropic-launches-claude-small-business-new-automation-workflows/', name: 'SiliconANGLE' },
  },
  {
    slug: 'youtube-brandcast-2026-tv-checkout-ai-sponsoring',
    format: 'dispatch',
    edition: '028',
    category: 'Platform',
    title: 'YouTube Brandcast 2026: TV-checkout, AI-sponsoring en Affiliate Boost gepresenteerd.',
    dek: 'YouTube zette op 13 mei in op connected-TV-shopping en AI-gedreven sponsoring. CTV-conversies stegen volgens Google met meer dan 200 procent jaar-op-jaar in Q1 2026.',
    publishedAt: '2026-05-17',
    readMinutes: 3,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'solid',
    posterTag: 'PLATFORM',
    posterTopic: 'TV-checkout op YouTube.',
    source: { url: 'https://blog.google/products-and-platforms/products/youtube/youtube-brandcast-2026-advertiser-updates/', name: 'YouTube Blog' },
  },
  {
    slug: 'linkedin-off-platform-event-ads-globale-uitrol',
    format: 'dispatch',
    edition: '027',
    category: 'Platform',
    title: 'LinkedIn rolt Off-Platform Event Ads wereldwijd uit voor externe event-funnels.',
    dek: 'LinkedIn-event-ads sturen vanaf 6 mei direct door naar je eigen registratie, livestream of CRM. De flow blijft op LinkedIn, de data en het formulier bij jou.',
    publishedAt: '2026-05-17',
    readMinutes: 3,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'gradient',
    posterTag: 'PLATFORM',
    posterTopic: 'LinkedIn opent event-funnel.',
    source: { url: 'https://www.sourcegeek.com/en/news/how-the-linkedin-algorithm-works-2026-update', name: 'Sourcegeek' },
  },
  {
    slug: 'eu-ai-act-omnibus-akkoord-deadlines-uitgesteld',
    format: 'dispatch',
    edition: '026',
    category: 'Beleid',
    title: 'EU AI Act krijgt Omnibus-akkoord, deadlines voor hoge-risico-systemen schuiven.',
    dek: 'EU-wetgevers bereikten op 7 mei politiek akkoord over aanpassingen van de AI Act. Compliance-deadlines schuiven, regels rond AI-generated content worden verscherpt.',
    publishedAt: '2026-05-17',
    readMinutes: 4,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'solid',
    posterTag: 'BELEID',
    posterTopic: 'EU AI Act schuift deadlines op.',
    source: { url: 'https://www.mofo.com/resources/insights/260501-european-digital-compliance-key-digital-regulation', name: 'Morrison Foerster' },
  },
  {
    slug: 'klaviyo-anthropic-claude-mcp-agentic-workflows',
    format: 'dispatch',
    edition: '025',
    category: 'Platform',
    title: 'Klaviyo koppelt klantdata aan Claude voor agentic marketing-workflows.',
    dek: 'Klaviyo opent zijn MCP-server breder naar Claude.ai en Claude Cowork. Rapporten, audits en campagne-briefs draaien vanaf nu vanuit een prompt.',
    publishedAt: '2026-05-17',
    readMinutes: 3,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'gradient',
    posterTag: 'PLATFORM',
    posterTopic: 'Klaviyo opent voor Claude.',
    source: { url: 'https://www.klaviyo.com/newsroom/klaviyo-anthropic-expanded-integration', name: 'Klaviyo Newsroom' },
  },
  {
    slug: 'openai-chatgpt-ads-manager-cpc-self-serve',
    format: 'dispatch',
    edition: '024',
    category: 'Distributie',
    title: 'OpenAI opent ChatGPT Ads Manager voor alle Amerikaanse adverteerders met CPC-bieden.',
    dek: 'OpenAI laat het minimum-budget van 50.000 dollar vallen en zet een self-serve Ads Manager in beta. Cost-per-click wordt het nieuwe bied-model.',
    publishedAt: '2026-05-17',
    readMinutes: 3,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'solid',
    posterTag: 'DISTRIBUTIE',
    posterTopic: 'ChatGPT Ads zonder vendor-call.',
    source: { url: 'https://www.axios.com/2026/05/05/openai-self-serve-ad-platform', name: 'Axios' },
  },
  {
    slug: 'publicis-liveramp-22-miljard-wat-bureau-eigenaars-nu-moeten-weten',
    format: 'dispatch',
    edition: '023',
    category: 'Markt',
    title: 'Publicis koopt LiveRamp voor 2,2 miljard. Wat dat betekent voor bureau-eigenaars die nu niets doen.',
    dek:
      'Publicis legt 2,2 miljard dollar neer voor LiveRamp om data-samenwerking en AI-agents te kunnen leveren aan haar grootste klanten. Voor bureau-eigenaars zonder miljardenbudget is dat geen reden om te wachten.',
    publishedAt: '2026-05-17',
    readMinutes: 4,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'gradient',
    posterTag: 'MARKT',
    posterTopic: 'Publicis koopt LiveRamp voor 2,2 miljard.',
    source: {
      url: 'https://www.adweek.com/agencies/publicis-to-acquire-liveramp-for-22-billion/',
      name: 'Adweek',
    },
  },
  {
    slug: 'google-ads-gemini-dashboards-real-time',
    format: 'dispatch',
    edition: '022',
    category: 'Platform',
    title: 'Google Ads krijgt Gemini-aangedreven dashboards voor real-time inzicht.',
    dek:
      'Google integreert zijn Gemini-modellen direct in het Ads-dashboard. Natuurlijke-taal-vragen en cross-campagne-analyse worden de belangrijkste functies.',
    publishedAt: '2026-05-13',
    readMinutes: 2,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'gradient',
    posterTag: 'PLATFORM',
    posterTopic: 'Google Ads bakt Gemini in.',
    source: {
      url: 'https://searchengineland.com',
      name: 'Search Engine Land',
    },
  },
  {
    slug: 'lecun-ami-labs-jepa-tegen-llms',
    format: 'dispatch',
    edition: '021',
    category: 'Onderzoek',
    title: 'Yann LeCun verlaat Meta en haalt een miljard op voor een AI-richting tegen LLMs.',
    dek:
      'De Franse onderzoeker stopt na twaalf jaar bij Meta en start AMI Labs in Parijs. Het is de grootste seed-ronde ooit voor een Europees techbedrijf.',
    publishedAt: '2026-05-13',
    readMinutes: 3,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'solid',
    posterTag: 'ONDERZOEK',
    posterTopic: 'LeCun zet een miljard tegen LLMs.',
    source: {
      url: 'https://www.technologyreview.com/2026/01/22/1131661/yann-lecuns-new-venture-ami-labs/',
      name: 'MIT Technology Review',
    },
  },
  {
    slug: 'conde-nast-search-onder-tien-procent',
    format: 'dispatch',
    edition: '020',
    category: 'Markt',
    title: 'Condé Nast verwacht dat search nog minder dan tien procent van zijn traffic levert.',
    dek:
      'De uitgever van Vogue, GQ en The New Yorker zegt openlijk dat zoekmachines hun rol als verkeer-leverancier verliezen. AI Overviews dekken steeds vaker de hele lezersvraag.',
    publishedAt: '2026-05-13',
    readMinutes: 2,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'solid',
    posterTag: 'MARKT',
    posterTopic: 'Conde Nast ziet search verdampen.',
    source: {
      url: 'https://searchengineland.com',
      name: 'Search Engine Land',
    },
  },
  {
    slug: 'amazon-ads-22-procent-groei-q1-2026',
    format: 'dispatch',
    edition: '019',
    category: 'Platform',
    title: 'Amazon\'s advertentie-omzet groeit 22 procent in eerste kwartaal.',
    dek:
      'Amazon Ads draaide $17,2 miljard in Q1 op een $70 miljard run-rate. Forrester noemt Amazon leider in omnichannel-advertising voor connected TV en commercial media.',
    publishedAt: '2026-05-05',
    readMinutes: 2,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'solid',
    posterTag: 'PLATFORM',
    posterTopic: 'Amazon Ads pakt 22% groei.',
    source: {
      url: 'https://www.emerce.nl/nieuws/kwart-meer-reclameinkomsten-amazon',
      name: 'Emerce',
    },
  },
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
    slug: 'ai-cowboys-marketing-2026',
    format: 'editorial',
    edition: '016',
    category: 'Observatie',
    title: 'AI in marketing is fantastisch. En dit jaar gaan er bedrijven aan ten onder.',
    dek:
      'Net zo veel bedrijven gaan dit jaar aan AI ten onder als bedrijven die er miljoenen mee winnen. Een eerlijke observatie van wie er nu ongezien rechten weggeeft, wie zelf hard aan het vibecoden is, en waarom dit voelt als 2008 in online marketing.',
    publishedAt: '2026-05-07',
    readMinutes: 10,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'gradient',
    posterTag: 'OBSERVATIE',
    posterTopic: 'Cowboys met Claude Code zijn de nieuwe cowboys van 2008.',
  },
  {
    slug: 'beste-transcriptietool-2026',
    format: 'editorial',
    edition: '015',
    category: 'Werkmethode',
    title: 'We hebben acht transcriptietools getest. Plaud wint.',
    dek:
      'Van Whisper en Gemini tot AI-notitieapps en Echo Scribe. Twee jaar testen levert één duidelijke winnaar op, met kanttekeningen. En een eerlijk gesprek over de leercurve eronder.',
    publishedAt: '2026-05-07',
    readMinutes: 9,
    author: { name: 'Stevin Journal', role: 'Redactie' },
    posterStyle: 'solid',
    posterTag: 'WERKMETHODE',
    posterTopic: 'De beste transcriptietool getest.',
  },
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
