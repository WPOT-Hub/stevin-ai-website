export interface Service {
  title: string
  slug: string
  shortDescription: string
  description: string
  whyImportant: string
  howItConnects: string
  features: string[]
  icon: string
}

export const services: Service[] = [
  {
    title: 'Paid Media',
    slug: 'paid-media',
    shortDescription: 'Advertenties die sturen op klanten, niet alleen op kliks.',
    description: 'We beheren campagnes op Google, Meta, LinkedIn en andere kanalen. Niet op basis van verborgen marge op je mediabudget, maar op basis van resultaat. Door campagnes te koppelen aan CRM en tracking weten we welke campagnes daadwerkelijk klanten opleveren — en optimaliseren we daarop.',
    whyImportant: 'Zonder goede koppeling tussen advertenties en opvolging stuur je op de verkeerde cijfers. Veel bedrijven optimaliseren op kosten per klik terwijl ze zouden moeten sturen op kosten per klant.',
    howItConnects: 'Paid media is de bovenkant van het systeem. Het genereert verkeer en leads. Maar de waarde wordt pas zichtbaar als tracking, landingspagina\'s, CRM en opvolging goed op elkaar aansluiten.',
    features: [
      'Google Ads (Search, Shopping, Display, YouTube)',
      'Meta Ads (Facebook & Instagram)',
      'LinkedIn Ads',
      'TikTok, Pinterest en Microsoft Advertising',
      'Campagne-optimalisatie op basis van klantwaarde',
      'Geen marge op je mediabudget',
    ],
    icon: '📡',
  },
  {
    title: 'Landing Pages & CRO',
    slug: 'landing-pages-cro',
    shortDescription: 'Pagina\'s die converteren. Niet alleen mooi, maar effectief.',
    description: 'We bouwen en optimaliseren landingspagina\'s die zijn ontworpen om te converteren. Van formulieroptimalisatie tot A/B-testen: elke pagina is een schakel in het systeem dat van klik een klant maakt.',
    whyImportant: 'Een campagne is pas zo goed als de pagina waar het verkeer op landt. Slechte landingspagina\'s verspillen advertentiebudget en laten leads weglopen.',
    howItConnects: 'Landingspagina\'s zijn de brug tussen je advertenties en je CRM. Het formulier dat een bezoeker invult, moet automatisch de juiste opvolging triggeren.',
    features: [
      'Landingspagina-ontwerp en -bouw',
      'Formulieroptimalisatie',
      'A/B-testen',
      'Conversie-analyse via heatmaps en sessie-opnames',
      'Koppeling met CRM en automation',
      'Mobiele optimalisatie',
    ],
    icon: '🎯',
  },
  {
    title: 'Marketing Automation',
    slug: 'marketing-automation',
    shortDescription: 'Geautomatiseerde opvolging die geen lead laat liggen.',
    description: 'We richten marketing automation in zodat leads op het juiste moment de juiste boodschap krijgen. Van welkomstflows tot lead scoring en nurturing: automation versnelt opvolging en verhoogt conversie.',
    whyImportant: 'Handmatige opvolging is te traag en te foutgevoelig. Marketing automation zorgt dat elke lead wordt opgepakt — ook als je team druk is.',
    howItConnects: 'Automation is de verbinding tussen marketing en sales. Het scoort leads, stuurt opvolgingsmails en waarschuwt sales wanneer een lead klaar is voor contact.',
    features: [
      'E-mail automation en drip campaigns',
      'Lead scoring en segmentatie',
      'Welkomstflows en nurturing',
      'Trigger-based messaging',
      'Koppeling met CRM en advertentiekanalen',
      'WhatsApp en SMS automation',
    ],
    icon: '⚡',
  },
  {
    title: 'CRM & Leadopvolging',
    slug: 'crm-leadopvolging',
    shortDescription: 'Zorg dat geen enkele lead tussen wal en schip valt.',
    description: 'We richten je CRM in zodat het werkt als verlengstuk van je marketing. Leads komen automatisch binnen, worden gescoord en verdeeld, en sales weet precies wat een lead heeft gedaan voor het eerste gesprek.',
    whyImportant: 'De meeste leads gaan verloren door trage of slechte opvolging. Een goed ingericht CRM voorkomt dat en geeft sales de context die ze nodig hebben.',
    howItConnects: 'CRM is de plek waar marketing en sales samenkomen. Het moet gevoed worden door campagnes, tracking en automation — en het moet terugkoppelen welke leads klant worden.',
    features: [
      'CRM-inrichting en -optimalisatie',
      'Automatische leadverwerking',
      'Lead scoring en toewijzing',
      'Pipeline management',
      'Rapportage op lead-to-klant ratio',
      'Koppeling met alle marketingkanalen',
    ],
    icon: '🤝',
  },
  {
    title: 'Tracking & Inzicht',
    slug: 'tracking-inzicht',
    shortDescription: 'Weet wat werkt. Meet wat ertoe doet.',
    description: 'We richten je tracking in zodat je weet welke marketinginspanningen echt resultaat opleveren. Van GA4 en GTM tot server-side tagging en dashboards: we zorgen dat je data betrouwbaar is en je rapportages bruikbaar.',
    whyImportant: 'Zonder goede tracking neem je beslissingen op gevoel. Dat kost geld. Betrouwbare data is de basis voor elke optimalisatie.',
    howItConnects: 'Tracking is het zenuwstelsel van je marketingstack. Het verbindt advertenties, website, CRM en automation en maakt zichtbaar waar je rendement zit.',
    features: [
      'Google Analytics 4 implementatie',
      'Google Tag Manager (client- en server-side)',
      'Conversietracking over alle kanalen',
      'Consent management en Consent Mode',
      'Dashboards in Looker Studio of Power BI',
      'Data-audit en meetplan',
    ],
    icon: '📊',
  },
]
