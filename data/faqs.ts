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

const homepageFaqsNL: FAQ[] = [
  {
    question: 'Wat doet Stevin precies?',
    answer: 'Stevin is een AI-laag over je operatie. Het start in marketing en sales, waar het signaleert waar omzet, marge of merkwaarde weglekt voordat de reguliere rapportage het oppikt, en daar eerst resultaat levert. Wat fout ging in april, zag Stevin al op 4 april. Van daaruit bouwt Stevin verder met agents op elke afdeling, van eerste klantcontact tot onderhoud.',
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

const homepageFaqsEN: FAQ[] = [
  {
    question: 'What does Stevin actually do?',
    answer: 'Stevin is an AI layer across your operation. It starts in marketing and sales, where it flags where revenue, margin or brand value is leaking before regular reporting catches it, and delivers results there first. What went wrong in April, Stevin saw on April 4th. From there Stevin builds further with agents in every department, from first customer contact to ongoing support.',
  },
  {
    question: 'Who is Stevin built for?',
    answer: 'For agency owners managing portfolios of clients, and for in-house marketing teams wanting deep control over their brand. Agencies use Stevin to serve more clients well with the same headcount; in-house teams to get grip on fragmented data across Google, Meta, GA4, CRM and e-commerce.',
  },
  {
    question: 'Which platforms do you integrate with?',
    answer: 'The relevant marketing stack: Google Ads, Meta, TikTok, LinkedIn, GA4, Search Console, Shopify, Klaviyo, HubSpot, Salesforce, Mailchimp, ClickUp and more. Native integrations — no Zapier middleware. For less common sources we use an open MCP layer that lets us add custom integrations per client without a build project.',
  },
  {
    question: 'How is Stevin different from a dashboard tool?',
    answer: 'A dashboard waits for you to open it. Stevin taps you on the shoulder. The platform monitors continuously, detects deviations from what\'s normal for your account (not generic thresholds), connects symptom to cause — frequency, thumbstop rate, GTM-firing, competitor bidding — and delivers concrete advice. Push, not pull. Dashboards are past tense; Stevin is present tense plus advice.',
  },
  {
    question: 'Is my data safe?',
    answer: 'Yes. EU-hosted servers, EU-hosted AI, no data outside Europe. Every organization runs in an isolated environment — data from client A is technically unreachable for client B, even internally for us. Fully GDPR-compliant, no third-party tracking cookies. Advice Stevin gives one agency does not leak to another.',
  },
  {
    question: 'What does it cost?',
    answer: 'Fixed monthly pricing, tuned to the number of clients and integrations. No margin on your media spend, no percentage of spend, no hidden costs. Book a call for a tailored proposal.',
  },
  {
    question: 'How fast am I operational?',
    answer: 'The common integrations (Google, Meta, GA4) are live within a day. After that the platform learns for 1-2 weeks what\'s normal for your accounts before signals become sharp. From week 3 onward Stevin reliably delivers diagnosis plus advice.',
  },
]

const FAQS_BY_LOCALE: Record<string, FAQ[]> = {
  nl: homepageFaqsNL,
  en: homepageFaqsEN,
}

export function getHomepageFaqs(locale: string): FAQ[] {
  return FAQS_BY_LOCALE[locale] ?? homepageFaqsNL
}

// Backwards compat — verwijderen als geen consumer meer over is
export const homepageFaqs = homepageFaqsNL
