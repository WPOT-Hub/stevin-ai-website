export interface Integration {
  name: string
  slug: string
  /**
   * 13 sep 2026 (W-078): 'live' betekent dat er in de Hub een connector bestaat
   * die deze bron daadwerkelijk uitleest, en dat er klantdata mee is opgehaald.
   * Ontbreekt het veld, dan zegt de pagina daar bewust niets over: we hebben
   * geen koppeling draaien, maar we beweren ook niet dat het niet kan.
   * Nooit 'live' zetten zonder dat er een module in src/connectors/ staat.
   */
  status?: 'live'
  category: string
  shortDescription: string
  description: string
  useCase: string
  howWeUseIt: string
  problemsSolved: string[]
  relatedSlugs: string[]
  faqs?: { question: string; answer: string }[]
}

// W-535 (12 okt 2026): alleen de koppelingen die we echt uitlezen (status
// 'live') staan hier nog, als namen op het overzicht /integraties. De losse
// detail- en categoriepagina's zijn weg: de live koppelingen en de categorieen
// gaan met een 301 naar /integraties, de rest geeft 410 (data/redirects.json en
// data/gone-urls.json). De 243 andere systemen staan in de git-geschiedenis.
export const integrations: Integration[] = [

  // ========== ADVERTISING ==========
  {
    name: 'Google Ads',
    slug: 'google-ads',
    status: 'live',
    category: 'advertising',
    shortDescription: 'Adverteren op Google Search, Display, Shopping en YouTube.',
    description: 'Google Ads is het grootste advertentieplatform ter wereld. Van zoekadvertenties tot shopping en display: het biedt directe toegang tot koopintentie. Maar zonder goede tracking, landingspagina\'s en opvolging is het ook een platform waar budget snel wordt verspild.',
    useCase: 'Leads en klanten genereren via zoekintentie, remarketing en shopping-campagnes.',
    howWeUseIt: 'Stevin.AI koppelt Google Ads aan je CRM, tracking en automation. We zorgen dat conversies correct worden doorgemeten, dat leads automatisch worden opgepakt en dat je campagnes worden geoptimaliseerd op basis van echte klantwaarde, niet alleen klikken.',
    problemsSolved: [
      'Conversies worden niet goed doorgemeten',
      'Leads uit Google Ads worden niet snel genoeg opgevolgd',
      'Geen inzicht in welke campagnes echt klanten opleveren',
      'Budget gaat naar klikken die verderop in de funnel niets opleveren',
    ],
    relatedSlugs: ['google-analytics-4', 'google-tag-manager', 'hubspot', 'looker-studio'],
    faqs: [
      { question: 'Beheert Stevin.AI ook mijn Google Ads campagnes?', answer: 'Ja, we beheren campagnes en zorgen dat ze technisch goed zijn ingericht, gekoppeld aan tracking en CRM, en geoptimaliseerd op echte resultaten.' },
      { question: 'Rekenen jullie marge op mijn advertentiebudget?', answer: 'Nee. Je betaalt je mediabudget rechtstreeks aan Google. Wij rekenen geen marge of commissie op je ad spend.' },
    ],
  },
  {
    name: 'Meta Ads',
    slug: 'meta-ads',
    status: 'live',
    category: 'advertising',
    shortDescription: 'Adverteren op Facebook en Instagram voor bereik en leadgeneratie.',
    description: 'Meta Ads biedt toegang tot Facebook en Instagram. Ideaal voor bereik, retargeting en leadgeneratie. De kracht zit in de targeting en het volume, maar zonder goede tracking en opvolging zie je niet wat het oplevert.',
    useCase: 'Leadgeneratie, retargeting en merkbekendheid via social advertising.',
    howWeUseIt: 'Stevin.AI koppelt Meta Ads aan je CRM en automation. We implementeren de Conversions API voor betrouwbare datadoorgifte en zorgen dat leads uit lead forms direct in je CRM terechtkomen met de juiste opvolging.',
    problemsSolved: [
      'Leads uit lead forms worden niet automatisch opgepakt',
      'Conversiedata is onbetrouwbaar door cookieverlies',
      'Geen koppeling tussen advertenties en daadwerkelijke omzet',
    ],
    relatedSlugs: ['google-analytics-4', 'hubspot', 'activecampaign', 'zapier'],
  },
  {
    name: 'LinkedIn Ads',
    slug: 'linkedin-ads',
    status: 'live',
    category: 'advertising',
    shortDescription: 'B2B-advertenties op LinkedIn voor gerichte leadgeneratie.',
    description: 'LinkedIn Ads is het belangrijkste B2B-advertentieplatform. De kosten per klik zijn hoger, maar de kwaliteit van leads is vaak beter. Dat maakt goede opvolging en tracking extra belangrijk.',
    useCase: 'B2B-leadgeneratie en account-based marketing via LinkedIn.',
    howWeUseIt: 'Stevin.AI koppelt LinkedIn Ads aan je CRM en zorgt dat leads uit LinkedIn Lead Gen Forms automatisch worden gesynchroniseerd. We meten door tot op klantniveau zodat je weet welke campagnes echt omzet opleveren.',
    problemsSolved: [
      'Hoge kosten per lead zonder inzicht in kwaliteit',
      'Lead Gen Forms zijn niet gekoppeld aan CRM',
      'Geen zicht op ROI van LinkedIn campagnes',
    ],
    relatedSlugs: ['hubspot', 'salesforce', 'google-analytics-4', 'zapier'],
  },
  {
    name: 'TikTok Ads',
    slug: 'tiktok-ads',
    status: 'live',
    category: 'advertising',
    shortDescription: 'Adverteren op TikTok voor bereik bij jongere doelgroepen.',
    description: 'TikTok Ads groeit snel als advertentiekanaal, vooral voor merken die jongere doelgroepen willen bereiken. Het platform biedt unieke creatieve mogelijkheden maar vraagt om goede tracking en meetbaarheid.',
    useCase: 'Merkbekendheid en conversies bij jongere doelgroepen via korte video-advertenties.',
    howWeUseIt: 'Stevin.AI implementeert de TikTok Events API en koppelt het platform aan je tracking en CRM. Zo meet je niet alleen views en kliks, maar ook daadwerkelijke conversies en leads.',
    problemsSolved: [
      'Onbetrouwbare conversiedata door privacy-restricties',
      'Geen koppeling met CRM of opvolgingsprocessen',
      'Lastig om ROI te meten',
    ],
    relatedSlugs: ['google-analytics-4', 'google-tag-manager', 'meta-ads'],
  },
  {
    name: 'Pinterest Ads',
    slug: 'pinterest-ads',
    status: 'live',
    category: 'advertising',
    shortDescription: 'Visuele advertenties op Pinterest voor inspiratie en aankoop.',
    description: 'Pinterest Ads richt zich op gebruikers in de inspiratie- en planningsfase. Ideaal voor e-commerce en merken met visuele producten. De intentie is hoog, maar tracking is essentieel om resultaat te meten.',
    useCase: 'Product discovery en conversies via visuele advertenties.',
    howWeUseIt: 'Stevin.AI integreert Pinterest met je webshop, tracking en productfeeds. We zorgen dat je Pinterest Tag correct is geimplementeerd en dat conversies betrouwbaar worden doorgemeten.',
    problemsSolved: [
      'Productfeeds zijn niet goed gekoppeld',
      'Conversietracking is niet goed ingericht',
      'Geen inzicht in welke pins converteren',
    ],
    relatedSlugs: ['shopify', 'woocommerce', 'google-analytics-4', 'google-tag-manager'],
  },
  {
    name: 'YouTube Ads',
    slug: 'youtube-ads',
    status: 'live',
    category: 'advertising',
    shortDescription: 'Video-advertenties op YouTube voor bereik en conversie.',
    description: 'YouTube Ads is onderdeel van het Google-ecosysteem en biedt krachtige mogelijkheden voor video-advertising. Van awareness tot conversie: video is een steeds belangrijker onderdeel van de marketingmix.',
    useCase: 'Merkbekendheid en retargeting via video-advertenties.',
    howWeUseIt: 'Stevin.AI richt YouTube-campagnes in binnen je Google Ads-account en zorgt dat viewthrough-conversies en doelgroepen correct worden doorgemeten en hergebruikt in je andere kanalen.',
    problemsSolved: [
      'Geen inzicht in de bijdrage van video aan conversies',
      'YouTube-doelgroepen worden niet hergebruikt in andere kanalen',
    ],
    relatedSlugs: ['google-ads', 'google-analytics-4', 'dv360'],
  },
  {
    name: 'DV360',
    slug: 'dv360',
    status: 'live',
    category: 'advertising',
    shortDescription: 'Programmatic advertising via Google Display & Video 360.',
    description: 'DV360 is Google\'s demand-side platform voor programmatic advertising. Het biedt toegang tot premium inventaris en geavanceerde targeting op grote schaal.',
    useCase: 'Programmatic display en video advertising op schaal.',
    howWeUseIt: 'Stevin.AI zet DV360 in als onderdeel van grotere mediastrategieen. We zorgen dat programmatic campagnes goed zijn gekoppeld aan je tracking en dat resultaten worden meegenomen in je overall rapportage.',
    problemsSolved: [
      'Programmatic campagnes draaien los van performance-kanalen',
      'Geen geintegreerd overzicht van alle mediakanalen',
    ],
    relatedSlugs: ['google-ads', 'google-analytics-4', 'looker-studio'],
  },
  {
    name: 'Snapchat Ads',
    slug: 'snapchat-ads',
    status: 'live',
    category: 'advertising',
    shortDescription: 'Adverteren op Snapchat voor jongere doelgroepen en AR-formats.',
    description: 'Snapchat Ads biedt toegang tot een jongere doelgroep via Stories, Spotlight en AR Lenses. Sterk voor merken met visueel sterke creatives en consumentengericht aanbod.',
    useCase: 'Bereik en conversie bij jongere doelgroepen via vertical video en AR.',
    howWeUseIt: 'Stevin.AI implementeert de Snap Pixel en Conversions API en koppelt Snapchat aan je tracking, CRM en MMM zodat je echte incrementele bijdrage meet.',
    problemsSolved: [
      'Conversiedata is onbetrouwbaar zonder server-side koppeling',
      'Snapchat-bijdrage ontbreekt in de bredere mediamix',
    ],
    relatedSlugs: ['tiktok-ads', 'meta-ads', 'google-analytics-4'],
  },

  // ========== ANALYTICS & TRACKING ==========
  {
    name: 'Google Analytics 4',
    slug: 'google-analytics-4',
    status: 'live',
    category: 'analytics-tracking',
    shortDescription: 'Websiteanalyse en conversietracking van Google.',
    description: 'Google Analytics 4 is de standaard voor websiteanalyse. Het biedt inzicht in gebruikersgedrag, verkeersbronnen en conversies. Maar alleen als het goed is ingericht, en dat is bij veel bedrijven niet het geval.',
    useCase: 'Meten van websiteverkeer, conversies en gebruikersgedrag.',
    howWeUseIt: 'Stevin.AI richt GA4 correct in: van enhanced measurement tot custom events, conversiedoelen en koppelingen met Google Ads. We zorgen dat je data betrouwbaar is en dat je rapportages aansluiten op je commerciele doelen.',
    problemsSolved: [
      'GA4 is niet goed geconfigureerd',
      'Conversies worden niet correct gemeten',
      'Geen koppeling tussen websitedata en campagneprestaties',
      'Rapportages geven geen bruikbaar inzicht',
    ],
    relatedSlugs: ['google-tag-manager', 'google-ads', 'looker-studio', 'google-search-console'],
    faqs: [
      { question: 'Kan Stevin.AI mijn bestaande GA4 verbeteren?', answer: 'Ja. We auditen je huidige setup, corrigeren fouten en richten events en conversies opnieuw in zodat je data betrouwbaar wordt.' },
    ],
  },
  {
    name: 'Google Tag Manager',
    slug: 'google-tag-manager',
    status: 'live',
    category: 'analytics-tracking',
    shortDescription: 'Tagmanagement voor het beheren van tracking en pixels.',
    description: 'Google Tag Manager is het centrale punt voor al je tracking. Pixels, events, conversies: alles wordt via GTM beheerd. Goed ingericht bespaart het tijd en voorkomt fouten. Slecht ingericht veroorzaakt dataverlies.',
    useCase: 'Centraal beheer van alle tracking-tags en marketing-pixels.',
    howWeUseIt: 'Stevin.AI richt GTM in volgens best practices: overzichtelijke containers, correcte triggers, datalayer-implementatie en server-side tagging waar nodig. We zorgen dat al je tools betrouwbare data ontvangen.',
    problemsSolved: [
      'Tags vuren niet correct of dubbel',
      'Geen overzicht in de GTM-container',
      'Datalayer is niet of slecht geimplementeerd',
      'Server-side tagging is niet opgezet',
    ],
    relatedSlugs: ['google-analytics-4', 'google-ads', 'meta-ads', 'cookiebot'],
  },
  {
    name: 'Google Search Console',
    slug: 'google-search-console',
    status: 'live',
    category: 'analytics-tracking',
    shortDescription: 'Inzicht in je organische zoekprestaties in Google.',
    description: 'Google Search Console laat zien hoe je website presteert in organische zoekresultaten. Van indexering tot zoekwoorden en technische problemen.',
    useCase: 'Monitoren van organische zoekprestaties en technische SEO-issues.',
    howWeUseIt: 'Stevin.AI gebruikt Search Console data om SEO-kansen te identificeren en landingspagina\'s te optimaliseren voor zowel organisch als betaald verkeer.',
    problemsSolved: [
      'Geen inzicht in organische zoekprestaties',
      'Technische SEO-problemen worden niet gedetecteerd',
    ],
    relatedSlugs: ['google-analytics-4', 'semrush', 'ahrefs'],
  },
  {
    name: 'Google Sheets',
    slug: 'google-sheets',
    status: 'live',
    category: 'analytics-tracking',
    shortDescription: 'Google Sheets koppeling voor marketingdata, rapportages en workflows.',
    description: 'Een Google Sheets koppeling brengt marketingdata, leadlijsten en rapportage-exports samen zonder handmatig kopieren. Sheets werkt goed als flexibele tussenlaag, mits de bron, eigenaar en controles per datastroom duidelijk zijn.',
    useCase: 'Marketing- en CRM-data verzamelen, valideren en rapporteren zonder dat Sheets het systeem van waarheid wordt.',
    howWeUseIt: 'Stevin koppelt Google Sheets aan onder meer advertenties, CRM en rapportage-tools via API, Zapier of Make. We leggen per tabblad vast welke bron leidend is, richten foutmeldingen in voor uitgevallen imports en zorgen dat een export niet stilzwijgend een handmatig proces wordt.',
    problemsSolved: [
      'Marketing- en CRM-data moet handmatig worden overgezet',
      'Rapportages gebruiken een Sheet waarvan de herkomst onduidelijk is',
      'Imports stoppen zonder dat iemand het ziet',
    ],
    relatedSlugs: ['looker-studio', 'zapier', 'make', 'google-analytics-4'],
    faqs: [
      { question: 'Kunnen jullie Google Sheets koppelen aan ons CRM of advertenties?', answer: 'Ja. We bekijken eerst welke bron leidend moet blijven en kiezen daarna een API-koppeling, Zapier, Make of een gecontroleerde export. De bedoeling is dat data niet handmatig hoeft te worden overgezet.' },
      { question: 'Is Google Sheets geschikt als centrale database?', answer: 'Meestal niet. Sheets werkt goed als tijdelijke tussenlaag, controlelijst of rapportage-export. Voor klant-, order- of campagnedata blijft het bronsysteem leidend.' },
      { question: 'Hoe voorkomen jullie dat een Sheet ongemerkt veroudert?', answer: 'We maken de datastroom zichtbaar, leggen eigenaar en bron vast en richten controles in voor uitgevallen imports of afwijkende waarden.' },
    ],
  },

  // ========== EMAIL & AUTOMATION ==========
  {
    name: 'Mailchimp',
    slug: 'mailchimp',
    status: 'live',
    category: 'email-automation',
    shortDescription: 'E-mailmarketing en basisautomation voor mkb.',
    description: 'Mailchimp is een van de bekendste e-mailmarketingplatformen. Eenvoudig te gebruiken, met mogelijkheden voor nieuwsbrieven, automations en landingspagina\'s.',
    useCase: 'E-mailnieuwsbrieven en basisautomation voor mkb.',
    howWeUseIt: 'Stevin.AI koppelt Mailchimp aan je CRM en leadbronnen zodat nieuwe leads automatisch in de juiste lijst terechtkomen en de juiste opvolgingsflow krijgen.',
    problemsSolved: [
      'Nieuwe leads worden niet automatisch toegevoegd aan e-maillijsten',
      'E-mailcampagnes zijn niet gekoppeld aan CRM-data',
    ],
    relatedSlugs: ['hubspot', 'zapier', 'shopify', 'wordpress'],
  },
  {
    name: 'Klaviyo',
    slug: 'klaviyo',
    status: 'live',
    category: 'email-automation',
    shortDescription: 'E-mailmarketing en automation specifiek voor e-commerce.',
    description: 'Klaviyo is de standaard voor e-commerce e-mailmarketing. Krachtige segmentatie, automation en integraties met webshopplatformen.',
    useCase: 'Geavanceerde e-mailmarketing en automation voor webshops.',
    howWeUseIt: 'Stevin.AI koppelt Klaviyo aan je webshop, advertenties en tracking zodat je flows en segmenten worden gevoed met de juiste data voor maximale relevantie.',
    problemsSolved: [
      'E-mailflows zijn niet afgestemd op klantgedrag',
      'Segmentatie is te breed of niet datagedreven',
    ],
    relatedSlugs: ['shopify', 'woocommerce', 'google-analytics-4', 'meta-ads'],
  },

  // ========== CMS & E-COMMERCE ==========
  {
    name: 'Shopify',
    slug: 'shopify',
    status: 'live',
    category: 'cms-ecommerce',
    shortDescription: 'Populair e-commerceplatform voor webshops.',
    description: 'Shopify is het meest populaire e-commerceplatform voor mkb. Gebruiksvriendelijk, schaalbaar en met uitgebreide integratiemogelijkheden.',
    useCase: 'Webshops met koppeling aan marketing en analytics.',
    howWeUseIt: 'Stevin.AI koppelt je Shopify-webshop aan advertenties, tracking, e-mail en analytics. We zorgen dat conversies correct worden gemeten, productfeeds up-to-date zijn en klantdata naar je CRM stroomt.',
    problemsSolved: [
      'E-commerce tracking is niet goed ingericht',
      'Productfeeds zijn niet gesynchroniseerd met advertentiekanalen',
      'Klantdata bereikt het CRM niet',
    ],
    relatedSlugs: ['google-ads', 'meta-ads', 'klaviyo', 'google-analytics-4'],
  },
  {
    name: 'WooCommerce',
    slug: 'woocommerce',
    status: 'live',
    category: 'cms-ecommerce',
    shortDescription: 'E-commerce plugin voor WordPress.',
    description: 'WooCommerce maakt van elke WordPress-site een webshop. Flexibel en open-source, met volledige controle over je data.',
    useCase: 'E-commerce op WordPress met flexibiliteit en controle.',
    howWeUseIt: 'Stevin.AI implementeert tracking, productfeeds en CRM-koppelingen voor WooCommerce zodat je webshop volledig is geintegreerd met je marketingstack.',
    problemsSolved: [
      'WooCommerce-data is niet gekoppeld aan marketingtools',
      'E-commerce tracking is onvolledig',
    ],
    relatedSlugs: ['wordpress', 'google-analytics-4', 'klaviyo', 'google-ads'],
  },

  // ========== SOCIAL & COMMUNITY ==========
  {
    name: 'Instagram Graph API',
    slug: 'instagram-graph-api',
    status: 'live',
    category: 'social-community',
    shortDescription: 'Organische Instagram metrics, comment monitoring en engagement analyse.',
    description: 'Instagram is de visuele etalage voor artiesten, merken en creators. De Graph API geeft toegang tot reach, impressions, follower groei en comment data op account- en postniveau.',
    useCase: 'Organisch bereik monitoren, fan-engagement filteren en sentiment analyse.',
    howWeUseIt: 'Stevin.AI haalt dagelijks je Instagram metrics op, filtert high-intent comments uit de ruis en genereert Advisor cards voor engagement-kansen die je anders zou missen.',
    problemsSolved: [
      'Duizenden comments maar geen overzicht van wat belangrijk is',
      'Organische performance wordt niet gekoppeld aan ads-strategie',
      'Geen inzicht in follower groei trends per regio',
    ],
    relatedSlugs: ['facebook-graph', 'tiktok-creator-tools', 'youtube-studio'],
  },
  {
    name: 'Facebook Graph',
    slug: 'facebook-graph',
    status: 'live',
    category: 'social-community',
    shortDescription: 'Facebook Page insights, post engagement en community management.',
    description: 'Facebook Pages blijven een belangrijk kanaal voor communities, events en directe communicatie met fans. De Graph API biedt toegang tot page-level metrics en post performance.',
    useCase: 'Page performance monitoren en community engagement tracking.',
    howWeUseIt: 'Stevin.AI synchroniseert je Facebook Page data en combineert het met Instagram en andere kanalen voor een cross-platform overzicht van je organisch bereik.',
    problemsSolved: [
      'Facebook data staat los van je andere social kanalen',
      'Post engagement wordt niet systematisch geanalyseerd',
    ],
    relatedSlugs: ['instagram-graph-api', 'meta-ads', 'youtube-studio'],
  },

  // ========== FEED MANAGEMENT ==========
  {
    name: 'Google Merchant Center',
    slug: 'google-merchant-center',
    status: 'live',
    category: 'feed-management',
    shortDescription: 'Productdata voor Google Shopping, Free Listings en Performance Max.',
    description: 'Google Merchant Center is het hart van je Google Shopping strategie. Producttitels, beschrijvingen, prijzen en beschikbaarheid bepalen hoe en of je producten verschijnen in Shopping resultaten.',
    useCase: 'Google Shopping feed beheer, productdata kwaliteit en free listings optimalisatie.',
    howWeUseIt: 'Stevin.AI monitort je Merchant Center op disapprovals, datakwaliteit issues en performance per productgroep. Feed problemen worden direct gesignaleerd voordat ze je campagnes beinvloeden.',
    problemsSolved: [
      'Product disapprovals worden te laat ontdekt',
      'Feed datakwaliteit is inconsistent',
      'Geen inzicht in welke productgroepen het meest opleveren',
    ],
    relatedSlugs: ['channable', 'google-ads', 'shopify'],
  },
]
