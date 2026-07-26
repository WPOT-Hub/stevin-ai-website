// Content voor de SEO-landingspagina's uit docs/SEO_PAGE_STRUCTURES_2026-07-05.md.
// NL-only (canonical naar NL via localizedMetadata translated:false). Een pagina
// toevoegen = een object hier + een dunne route in app/[locale]/<slug>/page.tsx
// + de slug in app/sitemap.ts (nlOnlyPages).
//
// Schrijfregels: geen em-dash of en-dash, geen accenten, zoekintentie in de
// eerste alinea, keyword natuurlijk in H1, koppen en FAQ. Tracking-problemen
// heten tracking-gaten of dataverlies.

export interface SeoLandingPageContent {
  slug: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  h1: string
  h1Accent: string
  sub: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  pain: { eyebrow: string; h2: string; items: { title: string; desc: string }[] }
  solution: { eyebrow: string; h2: string; sub: string; steps: { title: string; desc: string }[] }
  list: { eyebrow: string; h2: string; items: string[] }
  ctaSlot: { eyebrow: string; h3: string; sub: string; btn: string }
  faq: { question: string; answer: string }[]
  related: { label: string; href: string }[]
}

export const seoLandingPages: SeoLandingPageContent[] = [
  {
    slug: 'marketing-intelligence',
    metaTitle: 'Marketing intelligence: van data naar besluit',
    metaDescription:
      'Marketing intelligence brengt je ads, GA4, CRM en tracking samen in een helder verhaal. Zie wat aandacht nodig heeft voordat je rapportage het oppikt.',
    eyebrow: 'Marketing intelligence',
    h1: 'Marketing intelligence die besluitvorming',
    h1Accent: 'sneller maakt',
    sub: 'Marketing intelligence is het samenbrengen van data uit ads, GA4, CRM en tracking in een verhaal waar je op kunt sturen. Geen dashboard dat vertelt wat er gebeurd is, maar signalen die zeggen wat er nu aandacht nodig heeft.',
    ctaPrimary: { label: 'Plan een demo', href: '/contact' },
    ctaSecondary: { label: 'Bekijk de aanpak', href: '/werkwijze' },
    pain: {
      eyebrow: 'Het probleem',
      h2: 'Waarom dashboards alleen niet genoeg zijn',
      items: [
        {
          title: 'Een dashboard kijkt terug',
          desc: 'Rapportage vertelt wat er vorige maand gebeurde. Tegen de tijd dat een dip zichtbaar is in het maandrapport, heeft die al weken budget gekost.',
        },
        {
          title: 'Data leeft in losse tools',
          desc: 'Ads, analytics, CRM en formulieren spreken elkaar niet. Niemand ziet het hele plaatje, dus beslissingen worden op halve informatie genomen.',
        },
        {
          title: 'Tracking-gaten blijven onzichtbaar',
          desc: 'Kapotte events, ontbrekende consent-signalen en dataverlies vallen pas op als de cijfers al niet meer kloppen. Dan stuur je campagnes op ruis.',
        },
      ],
    },
    solution: {
      eyebrow: 'De oplossing',
      h2: 'Wat marketing intelligence bij Stevin betekent',
      sub: 'Stevin legt een intelligentielaag over je bestaande marketingstack. Jouw data blijft van jou, Stevin maakt er besluiten van.',
      steps: [
        {
          title: 'Bronnen verzamelen',
          desc: 'Google Ads, GA4, Search Console, Meta, CRM en formulieren komen samen in een profiel per klant of merk.',
        },
        {
          title: 'Signaleren',
          desc: 'Stevin vergelijkt wat er gebeurt met wat er hoort te gebeuren en signaleert afwijkingen, kansen en tracking-issues.',
        },
        {
          title: 'Prioriteren',
          desc: 'Niet honderd meldingen, maar een korte lijst met wat er echt toe doet, gewogen op impact en urgentie.',
        },
        {
          title: 'Delen en opvolgen',
          desc: 'Signalen landen bij je team of bureau, met context en een voorgestelde actie. Van inzicht naar uitvoering in een stap.',
        },
      ],
    },
    list: {
      eyebrow: 'Use cases',
      h2: 'Waar marketing intelligence direct verschil maakt',
      items: [
        'Budgetverschuivingen zien voordat het maandrapport ze laat zien',
        'Dalende conversies herleiden naar de bron: campagne, pagina of tracking',
        'Tracking-gaten en dataverlies signaleren voordat ze beslissingen raken',
        'Meerdere merken of vestigingen volgen zonder tien dashboards open te hebben',
        'Rapportage terugbrengen van dagen naar minuten, met context erbij',
      ],
    },
    ctaSlot: {
      eyebrow: 'Zien hoe het werkt',
      h3: 'Bekijk je eigen data in Stevin',
      sub: 'In een demo van 30 minuten koppelen we een bron en zie je welke signalen Stevin uit jouw data haalt.',
      btn: 'Plan een demo',
    },
    faq: [
      {
        question: 'Wat is marketing intelligence?',
        answer:
          'Marketing intelligence is het structureel verzamelen, combineren en interpreteren van marketingdata zodat je er beslissingen op kunt nemen. Het verschil met rapportage: intelligence kijkt vooruit en signaleert, een rapport kijkt terug en beschrijft.',
      },
      {
        question: 'Hoe verschilt dit van een dashboard of reporting-tool?',
        answer:
          'Een dashboard toont cijfers en laat de interpretatie aan jou. Marketing intelligence doet die interpretatie: het vergelijkt bronnen, weegt afwijkingen en vertaalt data naar een concreet advies of signaal. Je bespaart de analyse-stap, niet alleen de verzamelstap.',
      },
      {
        question: 'Werkt dit met consent en AVG?',
        answer:
          'Ja. Stevin werkt op geaggregeerde campagne- en analyticsdata en respecteert consent mode. Formulierdata wordt waar nodig gehasht verwerkt en jouw data wordt nooit gedeeld met andere klanten.',
      },
      {
        question: 'Voor wie is marketing intelligence interessant?',
        answer:
          'Voor bureaus die meerdere klanten volgen, voor merken met meerdere kanalen of vestigingen, en voor in-house teams die sneller willen schakelen dan hun maandrapportage. Zodra je meer dan een kanaal en meer dan een paar campagnes draait, loont een intelligentielaag.',
      },
    ],
    related: [
      { label: 'Leadopvolging', href: '/leadopvolging' },
      { label: 'Google Ads en GA4', href: '/google-ads-ga4' },
      { label: 'First-party data', href: '/first-party-data' },
    ],
  },
  {
    slug: 'leadopvolging',
    metaTitle: 'Leadopvolging automatiseren zonder leads te missen',
    metaDescription:
      'Leadopvolging automatiseren: elk formulier, elke call en elk signaal op een plek, direct doorgestuurd naar je team of CRM. Geen warme lead blijft liggen.',
    eyebrow: 'Leadopvolging',
    h1: 'Leadopvolging die geen warme lead',
    h1Accent: 'laat liggen',
    sub: 'Wie zijn leadopvolging wil automatiseren, wil twee dingen: sneller reageren en niets missen. Stevin brengt formulieren, calls en signalen uit al je bronnen samen en stuurt ze direct naar de juiste persoon of je CRM.',
    ctaPrimary: { label: 'Vraag een demo aan', href: '/contact' },
    ctaSecondary: { label: 'Website met CRM', href: '/website-met-crm' },
    pain: {
      eyebrow: 'Het probleem',
      h2: 'Waar leads nu verdwijnen',
      items: [
        {
          title: 'Gemiste leads',
          desc: 'Een formulier landt in een mailbox, een gemiste call blijft een gemiste call. Zonder centrale plek weet niemand dat er iets binnenkwam.',
        },
        {
          title: 'Te late opvolging',
          desc: 'De kans op contact daalt hard na het eerste uur. Een lead die vrijdag binnenkomt en maandag wordt gebeld, is vaak al ergens anders klant.',
        },
        {
          title: 'Geen zicht op status',
          desc: 'Is deze aanvraag al opgepakt? Door wie? Zonder statusoverzicht wordt opvolging afhankelijk van geheugen en goede wil.',
        },
      ],
    },
    solution: {
      eyebrow: 'De oplossing',
      h2: 'Zo automatiseer je leadopvolging',
      sub: 'Elke lead volgt dezelfde route: binnenkomen, verrijken, doorsturen, opvolgen. Stevin bewaakt die route en signaleert als een stap blijft hangen.',
      steps: [
        {
          title: 'Lead binnen',
          desc: 'Formulieren, telefoontjes en campagne-leads komen op een plek binnen, met bron, pagina en campagnecontext erbij.',
        },
        {
          title: 'Verrijking',
          desc: 'Bedrijf, kanaal en intentie worden aangevuld, zodat je team direct weet wie er belt of mailt en waarom.',
        },
        {
          title: 'Routing',
          desc: 'De lead gaat automatisch naar de juiste persoon, vestiging of pijplijn in je CRM. Met alert via mail of Slack.',
        },
        {
          title: 'Opvolging bewaakt',
          desc: 'Blijft een lead te lang op nieuw staan, dan krijgt het team een seintje. Niets valt stil tussen systemen.',
        },
      ],
    },
    list: {
      eyebrow: 'Wat je eruit haalt',
      h2: 'Leadopvolging automatiseren in de praktijk',
      items: [
        'Reactietijd van dagen naar minuten, ook buiten kantooruren',
        'Elke lead met bron en campagne erbij, dus je weet wat werkt',
        'Automatische koppeling naar je CRM of een simpele gedeelde lijst',
        'Alerts per team of vestiging, zodat de juiste persoon reageert',
        'Zicht op de hele funnel: van klik tot klant',
      ],
    },
    ctaSlot: {
      eyebrow: 'Direct starten',
      h3: 'Laat geen lead meer liggen',
      sub: 'We zetten de route van formulier naar opvolging in een week staand. Je ziet per lead waar die vandaan komt en wie hem oppakt.',
      btn: 'Vraag een demo aan',
    },
    faq: [
      {
        question: 'Hoe snel wordt een lead doorgestuurd?',
        answer:
          'Direct. Zodra een formulier binnenkomt of een call wordt geregistreerd, gaat er binnen enkele seconden een melding naar de juiste persoon en wordt de lead in je CRM of leadlijst gezet.',
      },
      {
        question: 'Werkt dit met bestaande CRM systemen?',
        answer:
          'Ja. Stevin koppelt met gangbare CRM systemen zoals HubSpot, Pipedrive en Salesforce, en kan ook zonder CRM werken met een gedeelde leadlijst en mail- of Slack-alerts.',
      },
      {
        question: 'Kan leadopvolging per team of vestiging worden ingericht?',
        answer:
          'Ja. Leads worden gerouteerd op regio, dienst of campagne, zodat elke vestiging of elk team alleen de eigen leads ziet en opvolgt. Handig voor bedrijven met meerdere locaties.',
      },
      {
        question: 'Wat gebeurt er met leads buiten kantooruren?',
        answer:
          'Die worden gewoon geregistreerd en doorgestuurd, met een automatische bevestiging naar de aanvrager. Je team ziet de volgende ochtend precies wat er is binnengekomen en wat prioriteit heeft.',
      },
    ],
    related: [
      { label: 'Website met CRM', href: '/website-met-crm' },
      { label: 'Marketing automation', href: '/marketing-automation' },
      { label: 'Lead generatie', href: '/lead-generatie' },
    ],
  },
  {
    slug: 'marketing-voor-bureaus',
    metaTitle: 'Marketing voor bureaus: grip op alle klanten',
    metaDescription:
      'Marketing voor bureaus: een plek voor data, signalen en rapportage van al je klanten. Minder tijd kwijt aan rapporten, sneller schakelen per account.',
    eyebrow: 'Voor bureaus',
    h1: 'Marketing voor bureaus met grip op data,',
    h1Accent: 'opvolging en rapportage',
    sub: 'Een marketingbureau dat tien of vijftig klanten draait, verliest tijd aan tool-gehop en rapportages. Stevin geeft bureaus een plek voor alle klantdata, met signalen per account en rapportage die zichzelf schrijft.',
    ctaPrimary: { label: 'Plan een bureau-demo', href: '/contact' },
    ctaSecondary: { label: 'Voor marketingteams', href: '/voor-marketingteams' },
    pain: {
      eyebrow: 'Het probleem',
      h2: 'Waar bureau-uren nu verloren gaan',
      items: [
        {
          title: 'Te veel losse tools',
          desc: 'Per klant een ander dashboard, een andere login, een ander exportje. Consultants zijn meer aan het verzamelen dan aan het adviseren.',
        },
        {
          title: 'Te weinig overzicht per klant',
          desc: 'Welke accounts hebben vandaag aandacht nodig? Zonder signaallaag zie je problemen pas bij de maandelijkse check of als de klant belt.',
        },
        {
          title: 'Rapportage kost te veel tijd',
          desc: 'Elke maand dezelfde screenshots, dezelfde tabellen, dezelfde toelichting. Uren die niet factureerbaar zijn en niemand energie geven.',
        },
      ],
    },
    solution: {
      eyebrow: 'De oplossing',
      h2: 'Een werklaag over al je klantaccounts',
      sub: 'Stevin koppelt de bronnen van elke klant een keer en houdt ze daarna continu in de gaten. Jouw team ziet per dag wat aandacht nodig heeft.',
      steps: [
        {
          title: 'Multi-client overzicht',
          desc: 'Alle klanten in een lijst, gesorteerd op urgentie. Accounts zonder bijzonderheden vragen geen aandacht.',
        },
        {
          title: 'Signalen per klant',
          desc: 'Dalende conversies, tracking-issues, budgetafwijkingen of kansen: per account, met context en voorgestelde actie.',
        },
        {
          title: 'Samenwerking',
          desc: 'Performance marketeers, strategen en accountmanagers werken op dezelfde data. Reviews en besluiten blijven per klant gescheiden.',
        },
        {
          title: 'Snellere rapportage',
          desc: 'De cijfers en de verhaallijn staan klaar. Je consultant controleert en verstuurt, in plaats van te knippen en plakken.',
        },
      ],
    },
    list: {
      eyebrow: 'Voor wie',
      h2: 'Gebouwd voor de mensen in het bureau',
      items: [
        'Performance teams: sneller zien welk account vandaag aandacht nodig heeft',
        'Strategen: trends over klanten heen, onderbouwd met echte data',
        'Accountmanagers: altijd een actueel verhaal richting de klant',
        'Eigenaren: minder niet-factureerbare uren aan rapportage en QA',
        'Klanten van het bureau: transparantie zonder extra werk',
      ],
    },
    ctaSlot: {
      eyebrow: 'Voor jouw bureau',
      h3: 'Zie je eigen klantportfolio in Stevin',
      sub: 'In een bureau-demo koppelen we een of twee accounts en zie je hoe signalen, reviews en rapportage per klant werken.',
      btn: 'Plan een bureau-demo',
    },
    faq: [
      {
        question: 'Hoe scheid je klanten van elkaar?',
        answer:
          'Elke klant is een eigen omgeving met eigen databronnen, signalen en instellingen. Data en learnings van de ene klant werken nooit door naar een andere klant, en teamleden zien alleen de accounts waar ze rechten op hebben.',
      },
      {
        question: 'Kunnen meerdere teams of consultants samenwerken?',
        answer:
          "Ja. Rollen en rechten bepalen wie welke klant ziet en wie signalen mag beoordelen. Reviews en besluiten worden per bureau en per klant gelogd, zodat overdracht tussen collega's geen kennisverlies betekent.",
      },
      {
        question: 'Hoe werkt rapportage voor bureau-klanten?',
        answer:
          'Stevin zet de cijfers en de belangrijkste gebeurtenissen per klant klaar in een deelbaar overzicht. Het bureau bepaalt wat de klant ziet. De maandrapportage wordt daarmee een controle-taak van minuten in plaats van een productie-taak van uren.',
      },
      {
        question: 'Vervangt Stevin de tools die het bureau al gebruikt?',
        answer:
          'Nee. Stevin is een laag over Google Ads, GA4, Meta, Search Console en je CRM heen. Je blijft in die tools werken waar dat nodig is; Stevin zorgt dat je weet wanneer en waarom.',
      },
    ],
    related: [
      { label: 'Marketing intelligence', href: '/marketing-intelligence' },
      { label: 'Lead generatie', href: '/lead-generatie' },
      { label: 'Voor marketingteams', href: '/voor-marketingteams' },
    ],
  },
  {
    slug: 'website-met-crm',
    metaTitle: 'Website met CRM-koppeling: leads direct bruikbaar',
    metaDescription:
      'Een website met CRM-koppeling maakt van elk formulier een opvolgbare lead: capture, verrijking, routing en tracking in een route. Netjes met consent.',
    eyebrow: 'Website met CRM',
    h1: 'Een website met CRM-koppeling die leads',
    h1Accent: 'direct bruikbaar maakt',
    sub: 'Wie zoekt naar een website met CRM wil af van losse formulieren die in een mailbox belanden. De route hoort te zijn: bezoeker vult in, lead staat verrijkt in je CRM, opvolging start meteen. Dat is precies wat Stevin bouwt.',
    ctaPrimary: { label: 'Plan een demo', href: '/contact' },
    ctaSecondary: { label: 'Bekijk diensten', href: '/diensten' },
    pain: {
      eyebrow: 'Het probleem',
      h2: 'Website en sales werken los van elkaar',
      items: [
        {
          title: 'Leads verdwijnen tussen systemen',
          desc: 'Het formulier mailt naar info@, iemand moet het overtypen in het CRM, en bij drukte gebeurt dat niet. De lead bestaat dan officieel niet.',
        },
        {
          title: 'Geen context bij de aanvraag',
          desc: 'Je ziet een naam en een mailadres, maar niet via welke campagne, pagina of zoekterm iemand binnenkwam. Opvolgen wordt gokken.',
        },
        {
          title: 'Tracking los van de werkelijkheid',
          desc: 'Wat de website meet en wat sales ziet zijn twee werelden. Conversies kloppen niet met het CRM en niemand weet welk kanaal echt klanten oplevert.',
        },
      ],
    },
    solution: {
      eyebrow: 'De oplossing',
      h2: 'Een route van bezoeker naar opvolgbare lead',
      sub: 'Website, formulieren, tracking en CRM als een systeem, met consent netjes geregeld vanaf de eerste paginaweergave.',
      steps: [
        {
          title: 'Website als instappunt',
          desc: "Snelle pagina's met formulieren die werken, inclusief spam-filtering en een bevestiging naar de aanvrager.",
        },
        {
          title: 'Lead capture met context',
          desc: "Elke inzending gaat mee met bron, campagne, landingspagina en bezochte pagina's. Persoonsdata alleen met consent en waar nodig gehasht.",
        },
        {
          title: 'CRM als opvolgcentrum',
          desc: 'De lead staat direct in je CRM of leadlijst, toegewezen aan de juiste persoon of vestiging, met alert naar het team.',
        },
        {
          title: 'Meten wat het oplevert',
          desc: 'Conversies stromen terug naar je campagnes, zodat Google en Meta leren op echte leads in plaats van klikken.',
        },
      ],
    },
    list: {
      eyebrow: 'Use cases',
      h2: 'Wat je met website plus CRM oplost',
      items: [
        'Offerteaanvragen die binnen minuten bij de juiste persoon liggen',
        'Formulieren met campagnecontext, dus je weet welke advertentie de lead bracht',
        'Gemiste telefoontjes die alsnog als lead geregistreerd worden',
        'Een leadlijst per vestiging of team, zonder handmatig doorsturen',
        'Conversiedata terug naar Google Ads en Meta voor beter bieden',
      ],
    },
    ctaSlot: {
      eyebrow: 'Van website naar systeem',
      h3: 'Laat je website voor sales werken',
      sub: 'We bekijken je huidige route van formulier naar opvolging en laten zien waar leads en data nu verloren gaan.',
      btn: 'Plan een demo',
    },
    faq: [
      {
        question: 'Moet ik een nieuw CRM aanschaffen?',
        answer:
          'Nee. Stevin koppelt je website aan het CRM dat je al gebruikt, zoals HubSpot, Pipedrive of Salesforce. Heb je nog geen CRM, dan kan een gedeelde leadlijst met alerts een prima startpunt zijn.',
      },
      {
        question: 'Hoe zit het met privacy en consent?',
        answer:
          'De koppeling werkt met consent mode: zonder toestemming worden geen marketingcookies gezet en gaat er geen persoonsdata naar advertentieplatformen. Formulierdata voor conversiemeting wordt gehasht verstuurd.',
      },
      {
        question: 'Werkt dit ook met mijn bestaande website?',
        answer:
          'Ja. De formulier- en trackingroute is ook op een bestaande website in te richten. Een volledig nieuwe website is alleen nodig als de huidige technisch niet meer te redden is.',
      },
      {
        question: 'Wat kost een website met CRM-koppeling?',
        answer:
          'Dat hangt af van wat er al staat: alleen de koppeling en tracking inrichten is dagen werk, een volledige website met CRM-route is een project. Plan een demo en je krijgt een eerlijke inschatting op basis van je huidige situatie.',
      },
    ],
    related: [
      { label: 'Leadopvolging', href: '/leadopvolging' },
      { label: 'Diensten', href: '/diensten' },
      { label: 'Google Ads en GA4', href: '/google-ads-ga4' },
    ],
  },
  {
    slug: 'google-ads-ga4',
    metaTitle: 'Google Ads en GA4 goed koppelen en meten',
    metaDescription:
      'Google Ads en GA4 die echt op elkaar aansluiten: key events, consent mode v2 en attributie zonder tracking-gaten. Stuur campagnes op echte conversies.',
    eyebrow: 'Google Ads en GA4',
    h1: 'Google Ads en GA4 die echt',
    h1Accent: 'op elkaar aansluiten',
    sub: 'Google Ads en GA4 samen goed laten meten is de basis onder elke campagnebeslissing. Toch wijken de cijfers bij de meeste accounts af: andere conversies, ontbrekende key events en consent die half is ingericht. Dat is te fixen.',
    ctaPrimary: { label: 'Vraag een tracking-check aan', href: '/contact' },
    ctaSecondary: { label: 'Onze diensten', href: '/diensten' },
    pain: {
      eyebrow: 'Het probleem',
      h2: 'Waarom je rapportage niet klopt',
      items: [
        {
          title: 'Twee systemen, twee waarheden',
          desc: 'Google Ads telt 40 conversies, GA4 ziet er 12. Zonder heldere eventdefinitie en attributiekeuze blijft dat gat onverklaarbaar.',
        },
        {
          title: 'Campagnes sturen op onvolledige data',
          desc: 'Slim bieden werkt alleen met goede conversiedata. Tracking-gaten en dataverlies betekenen dat het algoritme leert op ruis.',
        },
        {
          title: 'Consent half geregeld',
          desc: 'Zonder consent mode v2 verlies je meetbaarheid in de EU en riskeer je dat conversies stilletjes wegvallen. Met een verkeerde inrichting meet je juist te veel.',
        },
      ],
    },
    solution: {
      eyebrow: 'De aanpak',
      h2: 'Tracking op orde in vier stappen',
      sub: 'Geen herbouw van je hele setup, maar de keten van klik tot conversie een keer goed: events, key events, consent en attributie.',
      steps: [
        {
          title: 'Eventdefinitie',
          desc: 'Een eventnaam per conversie, consequent over website, GTM en GA4. Geen dubbele of dode events meer.',
        },
        {
          title: 'Key events in GA4',
          desc: 'De juiste events als key event gemarkeerd en geimporteerd in Google Ads, zodat beide systemen dezelfde conversies tellen.',
        },
        {
          title: 'Consent mode v2',
          desc: 'Default denied, update bij toestemming, en enhanced conversions met gehashte data. Meetbaar en verdedigbaar.',
        },
        {
          title: 'Doorlopende bewaking',
          desc: 'Stevin signaleert als een event stopt met vuren of als conversies opeens afwijken. Tracking-issues zie je dezelfde dag, niet volgend kwartaal.',
        },
      ],
    },
    list: {
      eyebrow: 'De checklist',
      h2: 'Dit hoort er minimaal te staan',
      items: [
        'Eventnamen die overal hetzelfde zijn: site, GTM, GA4 en Google Ads',
        'Key events in GA4 gemarkeerd en gekoppeld aan Google Ads conversies',
        'Consent mode v2 met default denied en nette update-flow',
        'UTM-conventies die standhouden over campagnes en kanalen heen',
        'Server-side meting waar dat de datakwaliteit echt verbetert',
        'Een alert als de keten ergens breekt',
      ],
    },
    ctaSlot: {
      eyebrow: 'Tracking-check',
      h3: 'Weet binnen een week waar je meting breekt',
      sub: 'We lopen de hele keten na van advertentieklik tot conversie in GA4 en Google Ads, en je krijgt een concrete fixlijst.',
      btn: 'Vraag een tracking-check aan',
    },
    faq: [
      {
        question: 'Waarom tellen Google Ads en GA4 verschillende conversies?',
        answer:
          'Ze meten anders: Google Ads telt op klikmoment en eigen attributie, GA4 op sessies en eigen modellen. Daarbovenop komen verschillen in eventdefinitie en consent. Het gat volledig sluiten kan niet, het verklaren en verkleinen wel.',
      },
      {
        question: 'Wat is consent mode v2 en is het verplicht?',
        answer:
          'Consent mode v2 is de manier waarop Google toestemming van bezoekers doorkrijgt. Voor adverteren op EU-verkeer met Google-producten is het in de praktijk noodzakelijk: zonder correcte signalen verlies je conversiemeting en doelgroepfuncties.',
      },
      {
        question: 'Verlies ik data door consent goed in te richten?',
        answer:
          'Je meet minder individuele bezoekers, maar houdt bruikbare conversiedata over via modellering en enhanced conversions met gehashte formulierdata. Een correcte inrichting levert per saldo betrouwbaardere sturing op dan stiekem doormeten.',
      },
      {
        question: 'Kan Stevin dit ook bewaken na de inrichting?',
        answer:
          'Ja, dat is juist het punt. Eenmalig inrichten is het halve werk; events breken bij elke site-update. Stevin houdt de keten in de gaten en signaleert dezelfde dag als er iets stopt met meten.',
      },
    ],
    related: [
      { label: 'First-party data', href: '/first-party-data' },
      { label: 'Marketing intelligence', href: '/marketing-intelligence' },
      { label: 'Analytics-integraties', href: '/integraties/analytics-tracking' },
    ],
  },
  {
    slug: 'first-party-data',
    metaTitle: 'First-party data als basis voor je marketing',
    metaDescription:
      'First-party data strategie: eigen data verzamelen met consent, koppelen aan je CRM en activeren in campagnes. Minder afhankelijk van platformen.',
    eyebrow: 'First-party data',
    h1: 'First-party data als basis voor',
    h1Accent: 'schaalbare marketing',
    sub: 'First-party data is de data die klanten en bezoekers rechtstreeks aan jou geven: formulieren, aankopen, gedrag op je eigen site. Wie die data netjes verzamelt en activeert, is minder afhankelijk van platformen en advertentieprijzen.',
    ctaPrimary: { label: 'Plan een demo', href: '/contact' },
    ctaSecondary: { label: 'Marketing intelligence', href: '/marketing-intelligence' },
    pain: {
      eyebrow: 'Het probleem',
      h2: 'Leunen op andermans data wordt duurder',
      items: [
        {
          title: 'Minder zichtbaarheid in platformen',
          desc: 'Cookies verdwijnen, tracking wordt beperkt en platformen houden data steeds meer bij zichzelf. Wie alleen op third-party data leunt, meet en target steeds slechter.',
        },
        {
          title: 'Afhankelijkheid van externe data',
          desc: 'Als je doelgroepen en inzichten alleen in Google en Meta leven, huur je je eigen klantkennis. Stopt de campagne, dan stopt de kennis.',
        },
        {
          title: 'Eigen data ligt versnipperd',
          desc: 'CRM, formulieren, nieuwsbrief en analytics bestaan naast elkaar. De data is er wel, maar niemand kan er een doelgroep of beslissing van maken.',
        },
      ],
    },
    solution: {
      eyebrow: 'De aanpak',
      h2: 'Van losse data naar eigen datafundament',
      sub: 'Eigen data verzamelen met consent, samenbrengen rond de klant en activeren waar het rendeert. Jouw data blijft van jou.',
      steps: [
        {
          title: 'Verzamel eigen signalen',
          desc: 'Formulieren, aankopen, mail-interactie en sitegedrag, verzameld op je eigen domein met consent als uitgangspunt.',
        },
        {
          title: 'Koppel aan je CRM',
          desc: 'Bezoeker wordt lead, lead wordt klant: een profiel per relatie in plaats van losse records in vijf tools.',
        },
        {
          title: 'Activeer in campagnes',
          desc: 'Gehashte klantlijsten en conversies terug naar Google en Meta voor beter bieden, lookalikes en uitsluitingen.',
        },
        {
          title: 'Meet en verbeter',
          desc: 'Stevin bewaakt de datakwaliteit en signaleert dataverlies, zodat je fundament betrouwbaar blijft.',
        },
      ],
    },
    list: {
      eyebrow: 'Use cases',
      h2: 'Wat first-party data concreet oplevert',
      items: [
        'Enhanced conversions: betere meting met gehashte formulierdata',
        'Klantlijsten voor retargeting en lookalikes zonder third-party cookies',
        'Segmentatie op echt gedrag: wie kocht, wie vroeg offerte aan, wie werd stil',
        'E-mail en campagnes op dezelfde klantdata in plaats van losse lijsten',
        'Rapportage op klanten en omzet in plaats van klikken',
      ],
    },
    ctaSlot: {
      eyebrow: 'Strategie-sessie',
      h3: 'Bouw je eigen datafundament',
      sub: 'We brengen in kaart welke first-party data je al hebt, wat er mist en wat activatie per kanaal oplevert.',
      btn: 'Plan een demo',
    },
    faq: [
      {
        question: 'Wat is first-party data precies?',
        answer:
          'Data die je rechtstreeks van je eigen klanten en bezoekers krijgt: formulier-inzendingen, aankopen, mail-interactie en gedrag op je eigen website. Third-party data is door anderen verzameld en verhandeld; die bron droogt op.',
      },
      {
        question: 'Is first-party data verzamelen AVG-proof?',
        answer:
          'Ja, mits je het goed inricht: een duidelijke grondslag, consent voor marketingdoeleinden, en hashing waar persoonsdata naar advertentieplatformen gaat. Eigen data met toestemming is juist de meest verdedigbare vorm van datagebruik.',
      },
      {
        question: 'Heb ik hier een groot datateam voor nodig?',
        answer:
          'Nee. Voor de meeste bedrijven is dit een kwestie van de bestaande bronnen goed koppelen: website, CRM en campagnes. Stevin legt die verbindingen en bewaakt ze, zonder dat je een datawarehouse-project hoeft te starten.',
      },
      {
        question: 'Wat is het verschil met een CDP?',
        answer:
          'Een CDP is een systeem om klantdata op te slaan en te segmenteren, vaak een fors project. Stevin begint bij de praktische kant: de data die je al hebt verzamelen, koppelen en activeren in de kanalen waar je nu adverteert.',
      },
    ],
    related: [
      { label: 'Google Ads en GA4', href: '/google-ads-ga4' },
      { label: 'Marketing intelligence', href: '/marketing-intelligence' },
      { label: 'Platform', href: '/platform' },
      { label: 'Wat is first-party data?', href: '/woordenboek/first-party-data' },
    ],
  },
  {
    slug: 'lead-generatie',
    metaTitle: 'Lead generatie die meer oplevert dan traffic',
    metaDescription:
      'Lead generatie draait om drie dingen: de juiste bron, goede data en snelle opvolging. Zo haal je meer gekwalificeerde leads uit dezelfde campagnes.',
    eyebrow: 'Lead generatie',
    h1: 'Lead generatie die meer oplevert',
    h1Accent: 'dan alleen traffic',
    sub: 'Lead generatie verbeteren begint zelden bij meer budget. De winst zit in de keten: de juiste bronnen, formulieren die converteren, data die klopt en opvolging die snel is. Stevin pakt die keten als geheel.',
    ctaPrimary: { label: 'Plan een demo', href: '/contact' },
    ctaSecondary: { label: 'Onze diensten', href: '/diensten' },
    pain: {
      eyebrow: 'Het probleem',
      h2: 'Veel volume, weinig klanten',
      items: [
        {
          title: 'Traffic zonder leads',
          desc: 'Bezoekers komen wel, maar vullen niets in. Vaak ligt dat niet aan het aanbod maar aan de pagina, het formulier of de match met de zoekintentie.',
        },
        {
          title: 'Leads van lage kwaliteit',
          desc: 'Formulieren vol met verkeerde aanvragen betekenen meestal dat campagnes op de verkeerde termen of doelgroepen draaien. Zonder terugkoppeling blijft dat zo.',
        },
        {
          title: 'Opvolging als bottleneck',
          desc: 'De duurste lead is de lead die niemand opvolgt. Als sales pas na dagen reageert, was het campagnebudget grotendeels voor niets.',
        },
      ],
    },
    solution: {
      eyebrow: 'De aanpak',
      h2: 'De hele keten, niet een losse knop',
      sub: 'Van bron tot klant: elke stap meetbaar, elke stap verbeterbaar. Dat is het verschil tussen leads kopen en lead generatie bouwen.',
      steps: [
        {
          title: 'Bronkwaliteit',
          desc: 'Welke campagnes, zoektermen en kanalen leveren leads die klant worden? Budget schuift naar wat aantoonbaar werkt.',
        },
        {
          title: 'Conversie op de pagina',
          desc: "Landingspagina's en formulieren die aansluiten op de zoekintentie, met zo min mogelijk drempels.",
        },
        {
          title: 'Data die klopt',
          desc: 'Elke lead met bron en campagne, conversies terug naar de platformen, tracking-gaten gesignaleerd voordat ze sturen op ruis.',
        },
        {
          title: 'Snelle opvolging',
          desc: 'Leads direct naar de juiste persoon of het CRM, met bewaking op reactietijd. Snelheid is de goedkoopste conversieverbetering.',
        },
      ],
    },
    list: {
      eyebrow: 'Kanalen',
      h2: 'Waar de leads vandaan komen',
      items: [
        'Paid media: campagnes gestuurd op leads en klanten, niet op klikken',
        "Organisch: pagina's die zoekintentie beantwoorden en converteren",
        'Owned media: e-mail en klantdata die slapende leads wakker maken',
        'Website: formulieren, call tracking en chat als meetbare instappunten',
        'CRM: bestaande relaties als bron voor herhaalaankopen en referrals',
      ],
    },
    ctaSlot: {
      eyebrow: 'Meer uit je funnel',
      h3: 'Zie waar jouw leadketen lekt',
      sub: 'We lopen de route van campagne tot opvolging na en laten zien waar de meeste winst zit: bron, pagina, data of snelheid.',
      btn: 'Plan een demo',
    },
    faq: [
      {
        question: 'Wat is lead generatie?',
        answer:
          'Lead generatie is het structureel binnenhalen van aanvragen van potentiele klanten, bijvoorbeeld via campagnes, vindbaarheid en je website. Goede lead generatie stopt niet bij het formulier maar regelt ook datakwaliteit en opvolging.',
      },
      {
        question: 'Wat kost een lead?',
        answer:
          "Dat verschilt per branche en kanaal, van enkele euro's tot honderden euro's per aanvraag. Belangrijker dan de kale kosten per lead is de kosten per klant: een duurdere lead die vaker klant wordt, is meestal de betere koop.",
      },
      {
        question: 'Werkt dit voor B2B en lokale bedrijven?',
        answer:
          'Ja, juist. B2B en lokale dienstverleners hebben vaak lange beslistrajecten en hoge orderwaardes, waardoor elke gemiste of te laat opgevolgde lead direct geld kost. De keten van bron tot opvolging is daar het snelst terug te verdienen.',
      },
      {
        question: 'Hoe snel zie ik resultaat?',
        answer:
          'Tracking en opvolging verbeteren levert vaak binnen weken zichtbaar meer bruikbare leads op uit hetzelfde budget. Structureel betere bronkwaliteit en organische groei zijn een kwestie van maanden. We benoemen vooraf wat wanneer realistisch is.',
      },
    ],
    related: [
      { label: 'Leadopvolging', href: '/leadopvolging' },
      { label: 'Marketing voor bureaus', href: '/marketing-voor-bureaus' },
      { label: 'Diensten', href: '/diensten' },
    ],
  },
  {
    slug: 'ai-briefing',
    metaTitle: 'AI-briefing voor je volgende campagne',
    metaDescription:
      'Een campagne-briefing die weet wat er eerder gebeurde: cijfers uit vorige campagnes, wat werkte en wat niet, concurrent-hooks en concrete eerste acties.',
    eyebrow: 'AI-briefing',
    h1: 'Een campagne-briefing die weet wat er',
    h1Accent: 'eerder al gebeurde',
    sub: 'Brief mijn volgende campagne is geen los prompt-veld. Stevin haalt cijfers uit vergelijkbare eerdere campagnes, eerder gegeven advies en de uitkomst daarvan, en concurrent-hooks erbij, en zet dat om in een concrete briefing met hooks, creatieve concepten en eerste acties.',
    ctaPrimary: { label: 'Plan een demo', href: '/contact' },
    ctaSecondary: { label: 'Platform', href: '/platform' },
    pain: {
      eyebrow: 'Het probleem',
      h2: 'Waarom een lege pagina de briefing vertraagt',
      items: [
        {
          title: 'Elke briefing begint opnieuw',
          desc: 'Wat er vorige campagne gebeurde zit in iemands hoofd of in een oud rapport. Bij de volgende briefing wordt dat zelden er echt bij gepakt.',
        },
        {
          title: 'Oude campagnes blind kopieren',
          desc: 'Het WK is niet de Olympische Spelen, en vorig kwartaal is niet dit kwartaal. Zonder context wordt een succesvolle aanpak klakkeloos herhaald op een moment dat niet vergelijkbaar is.',
        },
        {
          title: 'Concurrent-signalen blijven liggen',
          desc: 'Wat concurrenten nu testen in hun advertenties is vaak wel zichtbaar, maar niemand heeft tijd om dat structureel te vertalen naar een eigen, veilige hoek.',
        },
      ],
    },
    solution: {
      eyebrow: 'Hoe het werkt',
      h2: 'Van campagne-geheugen naar concrete briefing',
      sub: 'De AI-briefing redeneert over drie lagen: wat je eigen data laat zien, wat er extern speelt, en welk marktmoment relevant is. Elk advies krijgt een bron of wordt expliciet als hypothese benoemd.',
      steps: [
        {
          title: 'Campagne-geheugen',
          desc: 'Kosten, conversies en CPA van vergelijkbare eerdere campagnes, plus eerder gegeven advies en of dat wel of niet werkte.',
        },
        {
          title: 'Concurrent-hooks',
          desc: 'Wat concurrenten nu testen in hun advertenties, vertaald naar een veilige eigen invalshoek. Nooit letterlijk gekopieerd.',
        },
        {
          title: 'Externe signalen',
          desc: 'Platform-storingen, beleidswijzigingen en marktmomenten die relevant zijn voor dit product of deze doelgroep, met een reden en een vervaldatum.',
        },
        {
          title: 'Concrete briefing',
          desc: 'Hooks, adcopy-angles, creatieve concepten per kanaal en eerste acties, met per punt de bron of de hypothese erbij.',
        },
      ],
    },
    list: {
      eyebrow: 'Wat de briefing bevat',
      h2: 'Geen los advies, een compleet startpunt',
      items: [
        'Wat eerder wel en niet werkte, met cijfers erbij',
        'Wat nu anders is dan de vorige keer, expliciet benoemd',
        'Creatieve concepten per format en kanaal, met hook en cta',
        'Concurrent-inzichten met een veilige eigen vertaling, nooit een kopie',
        "Eerste acties en risico's, zodat je team direct kan starten",
      ],
    },
    ctaSlot: {
      eyebrow: 'Zelf zien',
      h3: 'Genereer een briefing op je eigen data',
      sub: 'In een demo laten we zien hoe de briefing wordt opgebouwd uit jouw eerdere campagnes en welke controle je daarop hebt.',
      btn: 'Plan een demo',
    },
    faq: [
      {
        question: 'Hoe haalt de AI data op uit vorige campagnes?',
        answer:
          'Zodra Google Ads, Meta of je CRM gekoppeld zijn, herkent Stevin vergelijkbare eerdere campagnes op basis van product, doelgroep of kanaal en haalt daar kosten, conversies en CPA uit. Ook eerder gegeven advies en of dat wel of niet werkte, telt mee.',
      },
      {
        question: 'Kopieert de AI gewoon een oude campagne?',
        answer:
          'Nee, dat is een harde regel in de briefing zelf. Bij elke vergelijking benoemt de briefing waarom iets lijkt, waarom het nu anders is, en waar onzekerheid zit. Een sterk moment uit het verleden wordt nooit klakkeloos herhaald.',
      },
      {
        question: 'Gaat er iets automatisch de deur uit?',
        answer:
          'Nee. De briefing is altijd een concept dat een consultant bekijkt. Bij alles wat budget, pauzeren of klantcommunicatie raakt, markeert het systeem zelf dat er eerst een menselijke check nodig is.',
      },
      {
        question: 'Werkt dit ook met concurrentie-inzichten?',
        answer:
          'Ja. Hooks die concurrenten testen in hun advertenties worden meegenomen, maar altijd vertaald naar een veilige eigen invalshoek voor jouw merk. Letterlijk overnemen gebeurt niet.',
      },
    ],
    related: [
      { label: 'Marketing intelligence', href: '/marketing-intelligence' },
      { label: 'Marketing voor bureaus', href: '/marketing-voor-bureaus' },
      { label: 'Platform', href: '/platform' },
    ],
  },
]

export function getSeoLandingPage(slug: string): SeoLandingPageContent | undefined {
  return seoLandingPages.find((p) => p.slug === slug)
}
