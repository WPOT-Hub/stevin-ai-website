export interface FAQ {
  question: string
  answer: string
}

/**
 * FAQ-data per blog-post slug — voor FAQPage JSON-LD op editorials.
 *
 * Source-of-truth: `data/article-faqs.json` (genereren met `npm run faq:generate`).
 * Handmatig editen van die JSON mag — het script overschrijft alleen
 * slugs die opnieuw worden gegenereerd.
 *
 * Doel: LLM-citation. Perplexity, ChatGPT en Claude.ai gebruiken FAQPage
 * structured data als primaire context-bron bij retrieval. Een artikel met
 * 3-5 expliciete Q&A's wordt structureel vaker geciteerd.
 */
import articleFaqsData from './article-faqs.json'
export const articleFaqs: Record<string, FAQ[]> = articleFaqsData as Record<string, FAQ[]>

export function getArticleFaqs(slug: string): FAQ[] | null {
  const list = articleFaqs[slug]
  if (!list || list.length === 0) return null
  return list
}

export const homepageFaqs: FAQ[] = [
  {
    question: 'Wat doet Stevin precies?',
    answer: 'Stevin koppelt al je digitale kanalen — van advertenties en social media tot streaming en e-commerce — in één platform. Onze AI analyseert die data 24/7, signaleert afwijkingen en levert concrete actiepunten. Geen passieve dashboards, maar directe inzichten waarmee je kunt ingrijpen.',
  },
  {
    question: 'Voor wie is Stevin bedoeld?',
    answer: 'Voor iedereen die grip wil op versnipperde data. Agencies, inhouse teams en promotoren gebruiken Stevin om meerdere accounts vanuit één systeem te beheren en de markt te scannen. Artiesten gebruiken het om cross-channel momentum te volgen en fan-signalen te filteren. Het platform is hetzelfde, de toepassing verschilt.',
  },
  {
    question: 'Welke platforms koppelen jullie?',
    answer: 'Meer dan 220 integraties: van Meta, Google en TikTok tot Spotify, Shopify, Klaviyo en tientallen andere platforms. De koppelingen zijn native — geen middleware, geen vertraging. Mis je een specifiek platform? Neem contact op, we bouwen continu door.',
  },
  {
    question: 'Hoe verschilt Stevin van een dashboard-tool?',
    answer: 'Dashboards tonen data. Stevin analyseert, correleert en handelt. Het platform detecteert anomalieën, combineert signalen uit verschillende kanalen en geeft concrete aanbevelingen. Bovendien leert het platform je tone of voice en past rapportages aan op jouw klanten.',
  },
  {
    question: 'Zijn mijn data veilig?',
    answer: 'Ja. We draaien op EU-gehoste servers, gebruiken EU-gehoste AI en slaan geen data op buiten Europa. Elke klant zit in een volledig afgeschermde omgeving — data van het ene account is technisch onbereikbaar voor een ander. Volledig AVG-compliant, zonder third-party tracking cookies.',
  },
  {
    question: 'Wat kost het?',
    answer: 'We werken met vaste maandprijzen, afgestemd op je situatie en het aantal koppelingen. Geen marge op mediabudget, geen verborgen kosten. Plan een gesprek voor een voorstel op maat.',
  },
  {
    question: 'Hoe snel ben ik operationeel?',
    answer: 'Gemiddeld een week, afhankelijk van de complexiteit. De meeste koppelingen zijn binnen een dag live, daarna richten we het platform in met alerts, rapportages en AI-analyses.',
  },
]
