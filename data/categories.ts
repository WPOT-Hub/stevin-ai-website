export interface Category {
  name: string
  slug: string
  description: string
  intro: string
}

export const categories: Category[] = [
  {
    name: 'Advertising',
    slug: 'advertising',
    description: 'Advertentieplatformen voor het bereiken van je doelgroep via betaalde kanalen.',
    intro: 'Adverteren is de motor van je leadgeneratie. Maar zonder de juiste koppelingen met tracking, CRM en opvolging verdwijnt een groot deel van je budget in een zwart gat. Stevin.AI verbindt je advertentiekanalen met de rest van je marketingstack, zodat je niet alleen kliks meet maar echte klanten ziet binnenkomen.',
  },
  {
    name: 'Analytics & Tracking',
    slug: 'analytics-tracking',
    description: 'Tools voor het meten, analyseren en begrijpen van je marketingprestaties.',
    intro: 'Zonder goed ingerichte tracking neem je beslissingen op gevoel. Analytics en tracking vormen het fundament van elke marketingbeslissing. Stevin.AI zorgt dat je meetplan klopt, je data betrouwbaar is en je rapportages aansluiten op wat je echt wilt weten.',
  },
  {
    name: 'CRM & Sales',
    slug: 'crm-sales',
    description: 'CRM-systemen voor het beheren en opvolgen van leads en klanten.',
    intro: 'Een lead die niet wordt opgevolgd is een gemiste kans. CRM is de schakel tussen marketing en omzet. Stevin.AI koppelt je CRM aan advertenties, formulieren en automation, zodat leads automatisch op de juiste plek terechtkomen en snel worden opgepakt.',
  },
  {
    name: 'Email & Automation',
    slug: 'email-automation',
    description: 'Platforms voor e-mailmarketing, marketing automation en workflow-integraties.',
    intro: 'Marketing automation versnelt opvolging en voorkomt dat leads koud worden. Van welkomstflows tot lead nurturing: Stevin.AI richt je automations in zodat ze aansluiten op je campagnes, CRM en commerciële doelen.',
  },
  {
    name: 'CMS & Ecommerce',
    slug: 'cms-ecommerce',
    description: 'Content management systemen en e-commerceplatformen voor je online aanwezigheid.',
    intro: 'Je website of webshop is het scharnierpunt van je marketing. Hier komen bezoekers binnen, vullen ze formulieren in en doen ze aankopen. Stevin.AI zorgt dat je CMS of e-commerceplatform goed is verbonden met tracking, CRM en automation.',
  },
  {
    name: 'CDP & Data Warehousing',
    slug: 'cdp-data-warehousing',
    description: 'Customer data platforms en data warehouses voor het centraliseren van klantdata.',
    intro: 'Klantdata zit vaak verspreid over tientallen tools. Een CDP of data warehouse brengt alles samen. Stevin.AI helpt bij het opzetten en koppelen van je datainfrastructuur, zodat je een compleet beeld krijgt van je klanten en campagnes.',
  },
  {
    name: 'Consent & Tagging',
    slug: 'consent-tagging',
    description: 'Tools voor cookieconsent, privacy-compliance en server-side tagging.',
    intro: 'Privacy en consent zijn geen bijzaak meer. Zonder goede consent-implementatie verlies je data en loop je juridische risico\'s. Stevin.AI implementeert consent management en server-side tagging zodat je compliant meet zonder dataverlies.',
  },
  {
    name: 'Reporting & Dashboards',
    slug: 'reporting-dashboards',
    description: 'Dashboard- en rapportagetools voor overzicht en inzicht in je resultaten.',
    intro: 'Rapportages moeten helder zijn en aansluiten op je KPI\'s. Geen ruis, geen overbodige data. Stevin.AI bouwt dashboards die je in één oogopslag laten zien wat werkt, wat niet werkt en waar je moet bijsturen.',
  },
  {
    name: 'Workflow & Operations',
    slug: 'workflow-operations',
    description: 'Projectmanagement- en workflowtools voor efficiënte marketingoperaties.',
    intro: 'Marketing draait niet alleen om campagnes, maar ook om processen. Goede workflows zorgen dat niets blijft liggen. Stevin.AI koppelt je operationele tools aan je marketingstack zodat taken, briefings en opvolging soepel verlopen.',
  },
  {
    name: 'ATS & Recruitment',
    slug: 'ats-recruitment',
    description: 'Applicant tracking systems en recruitment marketing tools voor het werven en opvolgen van kandidaten.',
    intro: 'Recruitment marketing vraagt om dezelfde aanpak als leadgeneratie: de juiste kanalen, goede tracking, snelle opvolging en inzicht in wat werkt. Stevin.AI koppelt je ATS aan je wervingscampagnes zodat kandidaten automatisch worden verwerkt en het hele wervingsproces meetbaar wordt.',
  },
]
