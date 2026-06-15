export interface FAQ {
  question: string
  answer: string
}

/**
 * FAQ-data per blog-post slug, voor FAQPage JSON-LD op editorials.
 *
 * Source-of-truth: `data/article-faqs.json` (genereren met `npm run faq:generate`).
 * Handmatig editen van die JSON mag, het script overschrijft alleen
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
    answer: 'Stevin is een AI-laag over je hele bedrijf. Een dashboard toont wat gebeurde, Stevin ziet wat nu speelt en zet de volgende stap. Het begint in marketing en sales, waar het al bewezen is en als eerste resultaat levert. Daar signaleert het waar omzet of marge weglekt voordat je het zelf doorhebt. Een advertentie die geld kostte maar niets opleverde, zag Stevin al op 4 april, niet pas in het maandoverzicht. Vanuit dat bewezen punt komen er stap voor stap agents bij voor de rest van je bedrijf, van eerste klantcontact tot offerte en opvolging. In de praktijk merk je het eerst in marketing en sales.',
  },
  {
    question: 'Voor wie is Stevin bedoeld?',
    answer: 'Voor ondernemers, agency owners en in-house marketing teams. De ondernemer die zijn bedrijf runt en minder tijd kwijt wil aan papierwerk: offertes, gemiste oproepen en planning lopen via Stevin, zodat de handen vrij blijven voor het werk zelf. De agency owner die meer klanten wil bedienen met dezelfde mensen. Het in-house marketing team dat elke euro herleidbaar wil naar resultaat, zonder dashboards die elkaar tegenspreken en zonder grip te verliezen over versnipperde data.',
  },
  {
    question: 'Welke platforms koppelen jullie?',
    answer: 'De systemen die je al gebruikt. Van mail, agenda, WhatsApp, CRM, offerte- en facturatiesoftware en boekhouding tot de marketingkanalen: Google, Meta en GA4, Search Console, Shopify, HubSpot en meer. Werk je met publiek of fans, dan koppelen we net zo goed Spotify, YouTube, TikTok en de socials waar het gebeurt. Directe koppelingen, geen losse tussenlaag die kan haperen. De marketing- en kanaalkoppelingen zijn het meest uitgekristalliseerd, de bredere bedrijfssystemen koppelen we erbij naarmate je meer van je bedrijf via Stevin laat lopen. Werkt jouw software er niet standaard tussen, bijvoorbeeld je offerteprogramma of je boekhouding? Dan koppelen we hem alsnog, zonder dat jij een IT-traject in hoeft.',
  },
  {
    question: 'Hoe verschilt Stevin van een dashboard-tool?',
    answer: 'Een dashboard wacht tot jij het opent en toont wat al gebeurde. Stevin draait het om: hij ziet wat nu speelt en trekt zelf aan de bel. Hij monitort continu, herkent afwijkingen tegen wat normaal is voor jouw bedrijf (niet generieke drempels) en koppelt er een concrete vervolgstap aan. Een gemiste oproep, een offerte die blijft liggen, een campagne die inzakt: Stevin merkt het en meldt het bij je, jij hoeft het niet zelf op te zoeken.',
  },
  {
    question: 'Zijn mijn data veilig?',
    answer: 'Ja. Servers en AI in Europa, geen data buiten Europa. Elke organisatie draait in een eigen afgeschermde omgeving: jouw klantgegevens blijven van jou en zijn voor niemand anders zichtbaar, ook niet voor ons en ook niet voor andere klanten. Wil je nog een stap verder, dan kan het zelfs volledig lokaal: AI die op je eigen servers draait, zodat er niets je deur uit hoeft. Volledig volgens de privacywet (AVG), geen externe volgcookies. Wat voor het ene bedrijf geldt, lekt niet door naar het andere.',
  },
  {
    question: 'Wat kost het?',
    answer: 'Vaste maandprijzen, afgestemd op je bedrijf en het aantal koppelingen, vanaf een paar honderd euro per maand. Geen verborgen kosten. Werk je ook met advertentiebudget, dan rekenen we daar geen percentage of marge overheen. Plan een gesprek voor een voorstel op maat.',
  },
  {
    question: 'Hoe snel ben ik operationeel?',
    answer: 'De systemen die je al draait zijn meestal binnen een dag gekoppeld, of dat nu je mail en agenda zijn of Google, Meta en GA4. Daarna heeft Stevin even tijd nodig: de eerste weken leert hij wat normaal is voor jouw bedrijf, want zonder dat ijkpunt is elk signaal ruis. Hoe meer hij ziet, hoe scherper en concreter het wordt. Verwacht dus geen wonderen op dag een, wel een systeem dat week na week beter aanvoelt wat bij jou een echt signaal is. In een kort gesprek schetsen we wat realistisch is voor jouw situatie.',
  },
]

const homepageFaqsEN: FAQ[] = [
  {
    question: 'What exactly does Stevin do?',
    answer: 'Stevin is an AI layer across your whole business. A dashboard shows what happened, Stevin sees what is going on right now and takes the next step. It starts in marketing and sales, where it is already proven and delivers results first. There it spots where revenue or margin is leaking away before you notice it yourself. An ad that cost money but returned nothing, Stevin saw it on April 4th, not weeks later in the monthly overview. From that proven starting point, agents are added step by step for the rest of your business, from first customer contact to quote and follow-up. In practice, you notice it first in marketing and sales.',
  },
  {
    question: 'Who is Stevin for?',
    answer: 'For entrepreneurs, agency owners and in-house marketing teams. The business owner who runs the shop and wants less time lost to paperwork: quotes, missed calls and scheduling run through Stevin, so your hands stay free for the actual work. The agency owner who wants to serve more clients with the same people. The in-house marketing team that wants every euro traceable to results, without dashboards that contradict each other and without losing grip on scattered data.',
  },
  {
    question: 'Which platforms do you connect?',
    answer: 'The systems you already use. From email, calendar, WhatsApp, CRM, quoting and invoicing software and accounting, through to the marketing channels: Google, Meta and GA4, Search Console, Shopify, HubSpot and more. Work with an audience or fans? Then we connect Spotify, YouTube, TikTok and the socials where it happens just as easily. Direct connections, no separate middle layer that can break down. The marketing and channel connections are the most refined, and we add the broader business systems as you run more of your business through Stevin. Does your software not fit in by default, your quoting program or your accounting for example? Then we connect it anyway, without you having to take on an IT project.',
  },
  {
    question: 'How is Stevin different from a dashboard tool?',
    answer: 'A dashboard waits until you open it and shows what already happened. Stevin turns that around: it sees what is going on right now and flags it itself. It monitors continuously, recognises deviations from what is normal for your business (not generic thresholds) and ties a concrete next step to it. A missed call, a quote left sitting, a campaign losing steam: Stevin notices it and brings it to you, you do not have to go looking for it yourself.',
  },
  {
    question: 'Is my data safe?',
    answer: 'Yes. Servers and AI in Europe, no data outside Europe. Every organisation runs in its own sealed-off environment: your customer data stays yours and is visible to no one else, not to us and not to other clients. Want to go a step further? Then it can even run fully on-premise: AI on your own servers, so nothing has to leave your door. Fully in line with the privacy law (GDPR), no external tracking cookies. What applies to one business does not leak through to another.',
  },
  {
    question: 'What does it cost?',
    answer: 'Fixed monthly prices, matched to your business and the number of connections, starting from a few hundred euros per month. No hidden costs. If you also work with advertising budget, we do not charge any percentage or margin on top of it. Schedule a call for a tailored proposal.',
  },
  {
    question: 'How quickly am I up and running?',
    answer: 'The systems you already run are usually connected within a day, whether that is your email and calendar or Google, Meta and GA4. After that, Stevin needs a little time: in the first weeks it learns what is normal for your business, because without that baseline every signal is just noise. The more it sees, the sharper and more concrete it gets. So do not expect miracles on day one, but a system that week by week gets better at telling a real signal from background noise. In a short call we sketch what is realistic for your situation.',
  },
]

const FAQS_BY_LOCALE: Record<string, FAQ[]> = {
  nl: homepageFaqsNL,
  en: homepageFaqsEN,
}

export function getHomepageFaqs(locale: string): FAQ[] {
  return FAQS_BY_LOCALE[locale] ?? homepageFaqsNL
}

// Backwards compat, verwijderen als geen consumer meer over is
export const homepageFaqs = homepageFaqsNL
