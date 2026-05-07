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
    answer: 'Stevin is een marketing intelligence platform dat 24/7 met je marketingstack verbonden is en signaleert waar omzet, marge of merkwaarde weglekt — vóór reguliere rapportage het oppikt. Wat fout ging in april, zag Stevin op 4 april. Per signaal krijg je diagnose én concreet advies, niet alleen een grafiek die daalt.',
  },
  {
    question: 'Voor wie is Stevin bedoeld?',
    answer: 'Voor bureau-eigenaars die portfolio\'s van klanten beheren en voor in-house marketingteams die hun eigen merk diep willen sturen. Bureaus gebruiken Stevin om met hetzelfde aantal mensen meer klanten kwalitatief te bedienen; in-house teams om grip te krijgen op versnipperde data over Google, Meta, GA4, CRM en e-commerce.',
  },
  {
    question: 'Welke platforms koppelen jullie?',
    answer: 'De relevante marketing-stack: Google Ads, Meta, TikTok, LinkedIn, GA4, Search Console, Shopify, Klaviyo, HubSpot, Salesforce, Mailchimp, ClickUp en meer. Native koppelingen — geen Zapier-tussenlaag. Voor minder gangbare bronnen werken we met een open MCP-laag waarmee we per klant maatwerk-koppelingen toevoegen zonder bouw-traject.',
  },
  {
    question: 'Hoe verschilt Stevin van een dashboard-tool?',
    answer: 'Een dashboard wacht tot jij het opent. Stevin tikt jou. Het platform monitort continu, detecteert afwijkingen tegen wat normaal is voor jouw account (niet generieke drempels), legt symptoom aan oorzaak — frequency, thumbstop, GTM-firing, concurrent-bod — en levert concreet advies. Push, geen pull. Dashboards zijn verleden tense, Stevin is present tense plus advies.',
  },
  {
    question: 'Zijn mijn data veilig?',
    answer: 'Ja. EU-gehoste servers, EU-gehoste AI, geen data buiten Europa. Elke organisatie draait in een afgeschermde omgeving — data van klant A is technisch onbereikbaar voor klant B, ook intern bij ons. Volledig AVG-compliant, geen third-party tracking cookies. Adviezen die Stevin geeft voor één bureau lekken niet door naar een ander.',
  },
  {
    question: 'Wat kost het?',
    answer: 'Vaste maandprijzen, afgestemd op het aantal klanten en koppelingen. Geen marge op je mediabudget, geen percentage van spend, geen verborgen kosten. Plan een gesprek voor een voorstel op maat.',
  },
  {
    question: 'Hoe snel ben ik operationeel?',
    answer: 'De gangbare koppelingen (Google, Meta, GA4) zijn binnen een dag live. Daarna leert het platform 1-2 weken wat normaal is voor jouw accounts voordat de eerste signalen scherp worden. Vanaf week 3 levert Stevin betrouwbaar diagnose plus advies.',
  },
]
