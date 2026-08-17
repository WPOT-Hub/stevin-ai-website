export interface Category {
  name: string
  slug: string
  description: string
  intro: string
  /**
   * Engelse categorienaam. Alleen invullen wanneer `name` Nederlands is: de
   * meeste namen zijn al taalneutraal ("CRM & Sales", "Feed Management") en
   * horen in beide talen hetzelfde te blijven. Zonder dit veld toonde
   * /en/integraties een Nederlandse categorienaam in de tabel en de
   * categorie-navigatie.
   */
  nameEn?: string
}

/** Categorienaam voor de actieve taal, met de NL-naam als terugval. */
export function categoryName(category: Category, locale: string): string {
  return locale === 'en' ? category.nameEn ?? category.name : category.name
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
    intro: 'Marketing automation versnelt opvolging en voorkomt dat leads koud worden. Van welkomstflows tot lead nurturing: Stevin.AI richt je automations in zodat ze aansluiten op je campagnes, CRM en commerciele doelen.',
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
    intro: 'Rapportages moeten helder zijn en aansluiten op je KPI\'s. Geen ruis, geen overbodige data. Stevin.AI bouwt dashboards die je in een oogopslag laten zien wat werkt, wat niet werkt en waar je moet bijsturen.',
  },
  {
    name: 'Workflow & Operations',
    slug: 'workflow-operations',
    description: 'Projectmanagement- en workflowtools voor efficiente marketingoperaties.',
    intro: 'Marketing draait niet alleen om campagnes, maar ook om processen. Goede workflows zorgen dat niets blijft liggen. Stevin.AI koppelt je operationele tools aan je marketingstack zodat taken, briefings en opvolging soepel verlopen.',
  },
  {
    name: 'ATS & Recruitment',
    slug: 'ats-recruitment',
    description: 'Applicant tracking systems en recruitment marketing tools voor het werven en opvolgen van kandidaten.',
    intro: 'Recruitment marketing vraagt om dezelfde aanpak als leadgeneratie: de juiste kanalen, goede tracking, snelle opvolging en inzicht in wat werkt. Stevin.AI koppelt je ATS aan je wervingscampagnes zodat kandidaten automatisch worden verwerkt en het hele wervingsproces meetbaar wordt.',
  },
  {
    name: 'Streaming & Audio',
    slug: 'streaming-audio',
    description: 'Streaming- en muziekplatformen voor het monitoren van plays, listeners en chart-posities.',
    intro: 'Als artiest of label wil je weten hoe je muziek presteert op de belangrijkste platformen. Stevin.AI haalt streaming data binnen en correleert het met je social media en advertentie-activiteiten, zodat je ziet welke acties daadwerkelijk streams en listeners opleveren.',
  },
  {
    name: 'Social & Community',
    slug: 'social-community',
    description: 'Social media platformen en community tools voor organisch bereik, engagement en sentiment.',
    intro: 'Social media is waar je publiek leeft. Maar het monitoren van meerdere platformen tegelijk kost uren. Stevin.AI centraliseert je organische data, filtert de ruis en laat alleen de signalen zien die actie vereisen, van fan-engagement tot crisisdetectie.',
  },
  {
    name: 'Live & Ticketing',
    slug: 'live-ticketing',
    description: 'Platforms voor live events, ticketing en tour management.',
    intro: 'Live optredens zijn de ruggengraat van een artiestencarriere. Stevin.AI koppelt ticketing- en eventdata aan je online performance, zodat je ziet hoe social buzz, streaming pieken en advertenties zich vertalen naar uitverkochte shows.',
  },
  {
    name: 'Creator Tools',
    slug: 'creator-tools',
    description: 'Tools voor content creators, distributie en monetisatie.',
    intro: 'Van muziekdistributie tot link-in-bio tools en patronage: creator tools zijn het bindweefsel van je online aanwezigheid. Stevin.AI monitort hoe deze kanalen presteren en waar je kansen laat liggen.',
  },
  {
    name: 'Finance & ERP',
    slug: 'finance-erp',
    description: 'Boekhoudsoftware, ERP-systemen en financiele tools voor business intelligence.',
    intro: 'Marketing en finance horen bij elkaar. Stevin.AI koppelt je financiele data aan je marketingresultaten, zodat je niet alleen weet hoeveel leads er binnenkomen maar ook wat ze daadwerkelijk opleveren aan omzet en marge.',
  },
  {
    name: 'Creative Intelligence',
    slug: 'creative-intelligence',
    description: 'Tools voor creatieve analyse, ad testing, visuele intelligentie en competitor creative scanning.',
    intro: 'Creatie en data horen niet in aparte silo\'s. Creative Intelligence tools laten je zien welke visuele patronen, hooks en formats de markt domineren. Stevin.AI koppelt deze inzichten aan je campagneperformance zodat je creatieve briefings worden onderbouwd met harde data, niet alleen onderbuikgevoel.',
  },
  {
    name: 'Market & Audience Intelligence',
    slug: 'market-audience-intelligence',
    description: 'Marktonderzoek, audience insights, share of search en competitieve intelligentie.',
    intro: 'Begrijp je markt voordat je erin investeert. Van share of search tot consumentengedrag en concurrentie-analyse: Stevin.AI centraliseert marktdata uit meerdere bronnen en vertaalt het naar actiegerichte inzichten voor je strategie en media-allocatie.',
  },
  {
    name: 'Media Monitoring & PR',
    slug: 'media-monitoring-pr',
    description: 'Mediamonitoring, social listening, persanalyse en reputatiemanagement.',
    intro: 'Wat er over je merk wordt gezegd bepaalt je reputatie. Van persberichten tot social mentions en forumthreads: Stevin.AI scant alle bronnen, filtert de ruis en escaleert alleen de signalen die actie vereisen. Zodat je nooit meer verrast wordt door een negatief artikel of een viral klacht.',
  },
  {
    name: 'Feed Management',
    slug: 'feed-management',
    description: 'Productfeed optimalisatie, shopping feeds en e-commerce advertentie-aansturing.',
    intro: 'Je productfeed is de directe link tussen je voorraad en je advertenties. Slechte feeds betekenen slechte resultaten, ongeacht hoeveel budget je inzet. Stevin.AI koppelt feed management aan campagneperformance en voorraaddata, zodat budget wasters automatisch worden uitgezet en topproducten extra zichtbaarheid krijgen.',
  },
  {
    name: 'DAM & Creative Ops',
    slug: 'dam-creative-ops',
    description: 'Digital Asset Management, creatieve workflow en productie-automatisering.',
    intro: 'Creatieve productie is vaak de bottleneck in de campagnecyclus. DAM en Creative Ops tools versnellen het proces van briefing tot publicatie. Stevin.AI koppelt creatieve performance data terug naar het productieproces, zodat je team niet meer 5 man op reporting hoeft te zetten maar op creatie kan focussen.',
  },
  {
    name: 'MLR & Compliance',
    slug: 'mlr-compliance',
    description: 'Medische, juridische en regulatoire goedkeuring en compliance checks.',
    intro: 'In gereguleerde industrieen zoals farma en healthcare duurt de goedkeuringscyclus 2 tot 4 weken. Stevin.AI fungeert als pre-filter: content wordt automatisch gescand op veelvoorkomende compliance risico\'s voordat het het MLR-traject ingaat. Resultaat: snellere goedkeuring en minder herwerk.',
  },
  {
    name: 'MMM & Attribution',
    slug: 'mmm-attribution',
    description: 'Marketing Mix Modeling, multi-touch attribution en uplift-meting.',
    intro: 'Weten dat je campagne kliks oplevert is niet genoeg. MMM en attribution bewijzen of je marketing daadwerkelijk incrementele omzet genereert. Stevin.AI combineert geavanceerde statistische modellen met campagnedata om de echte waarde van elk kanaal en elke creatieve uiting te onderbouwen, van awareness tot conversie.',
  },
  {
    name: 'Bouw & Techniek',
    nameEn: 'Construction & Engineering',
    slug: 'bouw-techniek',
    description: 'Bouw-, installatie- en techniek-software: projectadministratie, calculatie, werkbonnen en aanbesteding.',
    intro: 'In de bouw en techniek staat informatie verspreid over mail, WhatsApp, planning, calculatie en de projectsoftware. Stevin legt een werklaag boven die systemen. Het leest projecten, offertes, leveringen en planning, en zet losse informatie om in signalen en acties, voordat kleine problemen groot worden. Niet om de bestaande software te vervangen, maar om te zorgen dat wat erin staat op tijd bij de juiste persoon komt.',
  },
]
