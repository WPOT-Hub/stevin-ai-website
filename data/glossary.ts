/**
 * Stevin Woordenboek, programmatic SEO playbook "wat is X".
 *
 * Doel: vangen van NL-zoekers in onderzoeksfase. "Wat is uplift-meting",
 * "wat is MMM", "wat is performance max": funnel-feeders naar editorials.
 *
 * Toon: zelfde regels als Stevin Journal (geen academisch jargon, korte
 * heldere uitleg, attribueer claims, MKB-toegankelijk).
 *
 * URL-patroon: /woordenboek/<slug>
 */

export interface GlossaryTerm {
  slug: string
  /** Display-term ("Uplift-meting") */
  term: string
  /** Korte 1-zin definitie (gebruikt in meta-description en hub-listing) */
  shortDefinition: string
  /** Volledige uitleg, 200-400 woorden, in MKB-Nederlands */
  fullDefinition: string
  /** Concreet voorbeeld of context, 80-120 woorden */
  example: string
  /** Stevin's praktijk-perspectief, 80-120 woorden */
  stevinView: string
  /** Optioneel: gerelateerde editorial-slugs (links naar /blog/...) */
  relatedArticles?: string[]
  /** Optioneel: gerelateerde glossary-termen (interne navigatie) */
  relatedTerms?: string[]
  /** Categorie voor filtering en hub-page */
  category: 'meetbaarheid' | 'platforms' | 'methodiek' | 'ai' | 'attributie'
  /** ISO publicatiedatum */
  publishedAt: string
  updatedAt?: string
}

export const glossary: GlossaryTerm[] = [
  {
    slug: 'uplift-meting',
    term: 'Uplift-meting',
    category: 'meetbaarheid',
    shortDefinition:
      'Een uplift-meting bepaalt hoeveel extra omzet of conversies een marketing-actie heeft veroorzaakt, vergeleken met wat er zonder die actie was gebeurd.',
    fullDefinition:
      'Een uplift-meting (ook: lift-test of incremental measurement) is een experiment-vorm die de oorzaak-en-gevolg-relatie tussen een marketing-actie en sales blootlegt. Anders dan attribution-modellen, die credit toewijzen aan touchpoints, meet uplift het verschil tussen een groep die wel en een groep die niet aan de campagne is blootgesteld. De drie meest-gebruikte vormen zijn geo-tests (regio met campagne vs regio zonder), holdout-groepen (deel van publiek krijgt geen advertenties) en audience-splits (random toewijzing). Het resultaat is geen interval-vrij getal, maar een schatting met een geloofwaardigheidsinterval. Een serieuze uplift-meting zegt bijvoorbeeld: deze campagne leverde tussen de 14 en 22 procent extra omzet, met 80 procent zekerheid. Voor budget-besluiten boven enkele tienduizenden euro\'s is dat de juiste meeteenheid.',
    example:
      'Een D2C-merk wil weten of zijn Meta-campagne van €15.000 per maand echt bijdraagt aan sales. Een uplift-meting splitst Nederland in twee gelijke regio\'s: een krijgt de campagne (test), een niet (controle). Na 6 weken vergelijken we omzet per regio. Verschil = de echte bijdrage van Meta. Als de test-regio 18 procent hogere conversie heeft dan de controle, is de uplift 18 procent, onafhankelijk van wat het Meta-dashboard claimt.',
    stevinView:
      'Wij draaien op nieuwe accounts standaard binnen het eerste kwartaal een uplift-meting op de twee duurste kanalen. Uitkomsten wijken structureel 20-40 procent af van wat platform-eigen attributie zegt. Vooral branded search en retargeting blijken vaker overschat: ze vangen vraag die er toch al was. Een uplift-meting is geen luxe maar de enige manier om budget-allocatie op feiten te baseren in plaats van op platform-rapportage.',
    relatedArticles: ['last-click-is-een-gewoonte', 'mmm-is-een-hypothese'],
    relatedTerms: ['mmm', 'attribution', 'geo-test', 'holdout-groep'],
    publishedAt: '2026-05-05',
  },
  {
    slug: 'mmm',
    term: 'Marketing Mix Modeling (MMM)',
    category: 'methodiek',
    shortDefinition:
      'Marketing Mix Modeling is een statistische techniek die schat hoeveel elk marketing-kanaal bijdraagt aan totale sales, gebruikt voor budget-allocatie.',
    fullDefinition:
      'Marketing Mix Modeling (MMM) is een statistische methode die historische data over sales en marketing-bestedingen combineert met externe variabelen (seizoen, prijs, promotie, weer, concurrentie) om te schatten welk kanaal hoeveel bijdraagt aan omzet. De output is een decompositie per kanaal (bijvoorbeeld: search levert 28 procent, social 19 procent, TV 11 procent), een response-curve per kanaal (waar zit diminishing returns) en een marginale ROI-schatting. Cruciaal is dat elke schatting een interval heeft, een goed MMM zegt niet "search = 28 procent", maar "mediaan 28 procent, geloofwaardigheidsinterval 19-36 procent". MMM beantwoordt de budget-allocatie-vraag op kwartaal- of jaarbasis, niet de dagelijkse optimalisatie-vraag.',
    example:
      'Een retailer met €5 miljoen marketing-budget wil weten hoe te verdelen over Google, Meta, TV, e-mail en print voor 2026. Een MMM-analyse op 2 jaar wekelijkse data laat zien: TV heeft hoge contributie maar zit op de plat van zijn response-curve (extra TV-budget levert weinig op). Google en Meta hebben nog ruimte. Aanbeveling: 15 procent verschuiven van TV naar digital. De MMM bepaalt niet welke ad of campagne, maar welke verdeling tussen kanalen.',
    stevinView:
      'Wij gebruiken Google\'s open source Meridian voor MMM-werk omdat de software-prijs naar nul ging. Maar de discipline blijft hetzelfde: minimaal 2 jaar wekelijkse data, max 20 kanalen, en kalibratie met uplift-experimenten. Een MMM zonder experiment-kalibratie reflecteert vooral de priors van de modelbouwer, niet de werkelijkheid. Behandel MMM-output als hypothese, niet als rapport.',
    relatedArticles: ['mmm-is-een-hypothese', 'last-click-is-een-gewoonte'],
    relatedTerms: ['uplift-meting', 'attribution', 'response-curve', 'meridian'],
    publishedAt: '2026-05-05',
  },
  {
    slug: 'attribution',
    term: 'Attribution',
    category: 'attributie',
    shortDefinition:
      'Attribution is het toewijzen van credit voor een conversie aan de marketing-touchpoints die eraan vooraf gingen. Verschillende modellen verdelen credit op verschillende manieren.',
    fullDefinition:
      'Attribution beantwoordt de vraag: welk kanaal of welke ad krijgt de eer voor deze sale? Last-click geeft alle credit aan het laatste touchpoint. First-click aan het eerste. Linear verdeelt gelijk over alle touchpoints. Time-decay geeft meer gewicht aan recente touchpoints. Position-based (U-shaped) geeft meer aan eerste en laatste, minder aan tussenliggende. Data-driven attribution gebruikt machine learning om patronen te vinden. Belangrijk: attribution is geen meting van effect, het is een verdeel-mechanisme. Twee modellen kunnen identieke data anders interpreteren en tot tegengestelde budget-besluiten leiden. Voor de vraag "welk kanaal levert echt extra sales op" is attribution het verkeerde gereedschap. Daarvoor heb je uplift-experimenten of MMM nodig.',
    example:
      'Een klant ziet eerst een YouTube-advertentie, dan een LinkedIn-post, klikt drie weken later op een branded Google-advertentie en koopt. Last-click attribution geeft 100 procent credit aan Google. First-click geeft 100 procent aan YouTube. Linear geeft elk een derde. Welk model klopt? Geen van alle. Ze delen credit op. Of YouTube of LinkedIn echt de aankoop hebben veroorzaakt, kun je alleen via een uplift-test bepalen.',
    stevinView:
      'Attribution is bruikbaar als operationeel dashboard (welke campagnes krijgen verkeer, welke landingspagina\'s converteren), niet als investeringsmodel. We zien teams die op last-click sturen budget verschuiven naar kanalen die vraag oogsten in plaats van bouwen, kortetermijn winst, langetermijn kannibalisatie. Gebruik attribution voor debugging, uplift voor budget.',
    relatedArticles: ['last-click-is-een-gewoonte', 'mmm-is-een-hypothese'],
    relatedTerms: ['uplift-meting', 'mmm', 'last-click', 'data-driven-attribution'],
    publishedAt: '2026-05-05',
  },
  {
    slug: 'last-click',
    term: 'Last-click attribution',
    category: 'attributie',
    shortDefinition:
      'Last-click attribution wijst alle credit voor een conversie toe aan het laatste meetbare contact voor de aankoop, ongeacht wat eraan vooraf ging.',
    fullDefinition:
      'Last-click attribution is het oudste en meest-gebruikte attributie-model. Een klant ziet drie weken lang YouTube, LinkedIn en display, zoekt daarna op je merknaam, klikt op een branded search-advertentie en koopt, last-click zegt: search leverde de conversie. Het model is intuitief en geeft elke week een concreet getal, wat goed past in CPA-targets en weekrapportages. Het probleem: last-click meet geen effect, het verdeelt credit. Het weet niet of de klant ook had gekocht zonder die laatste klik. Wat het structureel doet: kanalen die dicht op de aankoop staan (branded search, retargeting, affiliate) worden overschat, kanalen die eerder vraag bouwen (display, YouTube, LinkedIn) worden onderschat. Voor budget-besluiten leidt dat vrijwel altijd tot verschuiving naar vraag-oogstende kanalen, ten koste van vraag-bouwende. Korte termijn lijkt het te werken; lange termijn slijt de pijplijn.',
    example:
      'Een D2C-merk stuurt op last-click. ROAS op branded search is 8,5, top. ROAS op YouTube is 0,8, weg ermee. Drie maanden later: branded search-volume daalt 30 procent (geen YouTube meer = minder mensen die jou zoeken). Last-click had de bron van de vraag onzichtbaar gemaakt. Een uplift-test had laten zien dat YouTube 4-6 weken eerder vraag genereerde die later via search converteerde.',
    stevinView:
      'Last-click verdwijnt niet omdat het past in hoe teams sturen, niet omdat het waar is. Performance-marketeers krijgen targets op CPA, finance wil concrete getallen, dashboards tonen conversies per bron. Last-click levert elke week antwoord. Onze lijn: degradeer last-click tot operationeel signaal voor de week, niet investeringsmodel voor het jaar. Combineer met minimaal twee uplift-tests per jaar op de duurste kanalen.',
    relatedArticles: ['last-click-is-een-gewoonte'],
    relatedTerms: ['attribution', 'uplift-meting', 'mmm'],
    publishedAt: '2026-05-05',
  },
  {
    slug: 'performance-max',
    term: 'Performance Max',
    category: 'platforms',
    shortDefinition:
      'Performance Max (PMax) is Google\'s geautomatiseerde campagne-type dat advertenties laat draaien over Search, Display, YouTube, Gmail, Discover en Maps, gestuurd door een bidding-doel.',
    fullDefinition:
      'Performance Max is sinds 2021 Google\'s vlaggenschip-campagne-type. In plaats van per netwerk (Search, Display, YouTube) aparte campagnes op te zetten, geef je Google: een doel (bijvoorbeeld "maximaliseer conversies bij CPA €40"), assets (kopjes, beschrijvingen, video\'s, afbeeldingen), en een product-feed (voor e-commerce). Google\'s algoritme bepaalt vervolgens welke combinatie van plaatsing, audience en creative het beste presteert. Sterke punten: hoog volume, eenvoudige setup, goede e-commerce-prestaties bij voldoende conversiedata. Zwakke punten: weinig transparantie over waar je advertenties draaien, geen controle over zoekwoord-niveau, en cannibaliseert vaak branded search (mensen die je toch al zoeken krijgen een PMax-advertentie en het algoritme claimt de credit).',
    example:
      'Een Shopify-merk start met PMax na 30 dagen Smart Shopping. Eerste maand: omzet stijgt 40 procent. Tweede maand: stijgt nog 5 procent. Derde maand: vlak. Wat blijkt: 35 procent van PMax-conversies kwam van branded search-zoekers die zonder PMax ook waren binnengekomen. De netto-uplift was 12-15 procent, niet 40. Pas na uitsluiting van branded zoekwoorden via account-level negative keywords werd duidelijk wat PMax echt opleverde.',
    stevinView:
      'PMax werkt voor e-commerce met een schone product-feed en minimaal 30 conversies per maand op campagne-niveau. Onder die drempel raadt het algoritme. Tip: sluit branded zoekwoorden uit via account-level negatives, draai branded apart in een Search-campagne. En reken op een uplift-test in maand twee, het Google-dashboard overschat PMax structureel met 20-40 procent door branded cannibalization.',
    relatedArticles: [],
    relatedTerms: ['google-ads', 'attribution', 'uplift-meting'],
    publishedAt: '2026-05-05',
  },
  {
    slug: 'cac',
    term: 'CAC (Customer Acquisition Cost)',
    category: 'meetbaarheid',
    shortDefinition:
      'CAC is wat het je gemiddeld kost om een nieuwe klant binnen te halen, berekend als totale marketing-uitgaven gedeeld door aantal nieuwe klanten in dezelfde periode.',
    fullDefinition:
      'Customer Acquisition Cost is de centrale metric voor wie wil weten of marketing rendabel is. Formule: alle marketing- en sales-kosten in een periode gedeeld door het aantal nieuwe klanten dat in diezelfde periode is binnengekomen. Belangrijk: CAC is alleen betekenisvol in verhouding tot Lifetime Value (LTV). Een CAC van €120 is goed als LTV €600 is, slecht als LTV €80 is. De gangbare vuistregel LTV:CAC = 3:1 of hoger; onder 1:1 verlies je geld op elke klant. Twee veelgemaakte fouten: (1) alleen advertenties tellen, niet de tijd van sales-team of de tools, onderschat CAC structureel. (2) Channel-CAC (per kanaal) verwarren met totale CAC (per klant). Een klant ziet meestal meerdere touchpoints; alle kanalen gezamenlijk dragen bij aan een CAC.',
    example:
      'Een B2B SaaS spendeert per maand €30k op marketing en €25k op sales-salarissen. In dezelfde maand komen 12 nieuwe klanten binnen. CAC = (€30.000 + €25.000) / 12 = €4.583. Bij een MRR van €350 en gemiddelde levensduur van 18 maanden, is LTV €6.300. Verhouding LTV:CAC = 1,4:1, onder de gezonde drempel. Tijd om of CAC te verlagen of LTV te verhogen via upsells of langere retentie.',
    stevinView:
      'Wij rekenen voor klanten altijd de "volledige CAC" door, inclusief tools (HubSpot, advertentie-platforms, attribution-software), de tijd van een marketing-manager, en bureau-kosten. Vrijwel elke klant onderschat zijn CAC met 30-50 procent door alleen de mediabudget te tellen. Dat is geen academische exercitie: een CAC die in de boeken €200 is maar in werkelijkheid €350, betekent dat je sturing en investeringsbeslissingen op verkeerde getallen baseert.',
    relatedTerms: ['ltv', 'roas', 'uplift-meting'],
    publishedAt: '2026-05-05',
  },
  {
    slug: 'ltv',
    term: 'LTV (Lifetime Value)',
    category: 'meetbaarheid',
    shortDefinition:
      'Lifetime Value is de totale omzet die een klant gemiddeld oplevert over de hele duur van de klantrelatie, en bepaalt hoeveel je rendabel kunt uitgeven om die klant binnen te halen.',
    fullDefinition:
      'Lifetime Value (LTV) of Customer Lifetime Value (CLV) is de tegen-metric van CAC. Hoeveel verdien je gemiddeld aan een klant van begin tot eind? Voor een SaaS: maandelijks abonnement maal gemiddelde levensduur, eventueel plus upsells. Voor e-commerce: gemiddeld order maal aantal orders per jaar maal aantal jaren actief. Bij abonnementen redelijk simpel; bij one-off-aankopen complexer omdat retentie veel grilliger is. Belangrijke valkuilen: (1) bruto-omzet versus marge, gebruik marge, anders overschat je LTV fors. (2) Cohort-effecten, klanten van vandaag gedragen zich anders dan die van twee jaar geleden, dus oude data is geen voorspelling. (3) LTV is een schatting met onzekerheid, geen exact getal, vooral bij jonge bedrijven of veranderende markten.',
    example:
      'Een D2C-merk verkoopt face cream van €45 per pot. Gemiddelde klant koopt 4 potten per jaar gedurende 2,5 jaar. Bruto LTV = €45 × 4 × 2,5 = €450. Marge na productie en fulfillment: 55 procent. Echte LTV (op marge) = €248. Met een CAC van €80 is LTV:CAC = 3,1:1, gezond. Op bruto-omzet zou je denken 5,6:1, maar dat is een vertekening van de werkelijke economics.',
    stevinView:
      'Wij rekenen LTV bij klanten altijd op marge, niet op bruto-omzet. Plus: we kijken naar LTV per cohort (klanten binnengekomen in Q1 vs Q3 vs vorig jaar) om trends te zien. Stijgende CAC met dalende LTV is een rood signaal dat budget onmiddellijk moet worden bijgesteld. Dalende CAC met stijgende LTV is signaal om te accelereren. Beide kanten van de verhouding bewegen, en je moet beide tracken.',
    relatedTerms: ['cac', 'roas', 'cohort-analyse'],
    publishedAt: '2026-05-05',
  },
  {
    slug: 'roas',
    term: 'ROAS (Return On Ad Spend)',
    category: 'meetbaarheid',
    shortDefinition:
      'ROAS is de omzet gedeeld door advertentie-uitgaven binnen een platform, een operationele metric voor campagne-efficientie, maar geen volledige profitability-meting.',
    fullDefinition:
      'Return On Ad Spend (ROAS) is een platform-metric: hoeveel omzet heb je per euro advertentiebudget gegenereerd? ROAS van 4 betekent: €4 omzet per €1 ad spend. Het is bruikbaar voor het vergelijken van campagnes binnen een platform of voor dagelijkse bid-strategieen, maar heeft beperkingen voor strategische beslissingen. Ten eerste: ROAS rapporteert wat het platform claimt te hebben opgeleverd, niet wat echt extra is gegenereerd, voor dat laatste heb je uplift-meting nodig. Ten tweede: ROAS rekent met bruto-omzet, niet marge. Een ROAS van 3 op een product met 25 procent marge is verlies (€3 omzet × 0,25 marge = €0,75 op €1 spend). Ten derde: branded-search-ROAS is bijna altijd misleidend hoog omdat het mensen vangt die je toch al wilden bereiken.',
    example:
      'Een e-commerce-shop ziet in Google Ads ROAS van 6,2 op zoekcampagnes en 2,8 op shopping. Op het oog: shop minder, search meer. Maar: marge op gesponsorde producten is 30 procent, marge op aangeboden producten 18 procent. Echte profit-ROAS = search 1,86 (winst), shopping 0,5 (verlies). En 70 procent van de search-ROAS komt van branded zoekwoorden, sluit je die uit, dan zakt search-ROAS naar 1,9. De sturing op platform-ROAS leidde tot verkeerde conclusies.',
    stevinView:
      'ROAS is fine voor dagelijkse optimalisatie en bid-strategieen, slecht voor budget-allocatie. Wij rapporteren altijd zowel platform-ROAS als profit-ROAS (op marge), en draaien een uplift-test om te zien wat van die ROAS echt incrementeel is. De gap tussen die drie cijfers (platform / profit / uplift) is vaak een factor 2-3, en in die gap zitten de echte business-besluiten.',
    relatedTerms: ['cac', 'ltv', 'uplift-meting', 'attribution'],
    publishedAt: '2026-05-05',
  },
  {
    slug: 'agentic-ai',
    term: 'Agentic AI',
    category: 'ai',
    shortDefinition:
      'Agentic AI verwijst naar AI-systemen die zelfstandig taken uitvoeren in meerdere stappen, niet alleen vragen beantwoorden, denk: e-mails sturen, afspraken inplannen, beslissingen nemen.',
    fullDefinition:
      'Agentic AI (of AI-agents) is een term die in 2024-2026 mainstream werd voor AI-systemen die acties ondernemen in plaats van alleen output produceren. Een chatbot beantwoordt; een agent boekt een vergaderzaal. Het verschil zit in drie eigenschappen: (1) autonomie, de agent neemt zelf vervolgstappen, (2) context, de agent leest binnenkomende informatie zoals e-mails en weet wat er staat, (3) communicatie, de agent praat terug via dezelfde kanalen waar mensen op zitten. Veel vendors gebruiken "agent" nu voor wat in 2019 al RPA (Robotic Process Automation) of een chatbot heette, Gartner schat dat van duizenden vendors er ongeveer 130 echt agentic zijn (2025). Dat fenomeen heet "agent washing".',
    example:
      'DHL Supply Chain laat sinds 2025 AI-agents van HappyRobot afspraken inplannen met chauffeurs, achteraan e-mailen wanneer een rit niet binnenkomt en bij urgente magazijn-issues de juiste mensen bereiken. Volume: honderdduizenden e-mails en miljoenen telefoonminuten per jaar door een agent. Dat is wat agentic AI in de praktijk doet: operationele communicatie op schaal die anders aan een planner of dispatcher zou hangen.',
    stevinView:
      'Agentic AI levert waarde op smalle, repetitieve workflows met duidelijke meetbare KPI\'s. Voor brede "los al onze problemen op"-doelstellingen falen pilots structureel, Gartner verwacht dat meer dan 40 procent van agentic-AI-projecten voor eind 2027 wordt afgeblazen. Onze lijn voor klanten: kies een workflow, kies een vendor, meet over 90 dagen op latency, override-rate, exception-rate en payback. Wel meten, niet hopen.',
    relatedArticles: ['autonome-agents-90-dagen', '95-procent-ai-pilots-mislukt'],
    relatedTerms: ['agent-washing', 'rpa'],
    publishedAt: '2026-05-05',
  },
  {
    slug: 'agent-washing',
    term: 'Agent washing',
    category: 'ai',
    shortDefinition:
      'Agent washing is het verschijnsel dat vendors hun bestaande tools (RPA, workflows, chatbots) hernoemen tot "agentic AI" om mee te liften op de hype, zonder dat de onderliggende technologie wezenlijk verandert.',
    fullDefinition:
      'Agent washing is een term die Gartner in 2025 introduceerde voor de praktijk waarbij vendors bestaande tools opnieuw verkopen onder de noemer "agentic AI". Volgens Gartner zijn van duizenden vendors die zich agentic noemen er ongeveer 130 daadwerkelijk agentic, de rest is RPA, een chatbot, of een workflow-tool met een nieuw frontje. Het probleem voor kopers: marketing-claims zijn niet meer onderscheidend, en serieuze vendor-selectie vergt diep technisch begrip. Drie signalen van agent washing: (1) de demo werkt alleen op het ene voorgekookte voorbeeld, (2) er is geen API of integratie met andere tools, alles draait binnen het vendor-platform, (3) de pricing is per-seat in plaats van per-task of per-outcome.',
    example:
      'Een bestaande customer-service-tool die in 2019 al een rule-based chatbot bood, brand zichzelf in 2025 om naar "AI-agent". De technologie eronder is hetzelfde decision-tree-systeem. Marketing-pitch: "onze AI-agent handelt customer-service-tickets autonoom af". Realiteit: dezelfde scripted flows, met een GPT-laag eroverheen voor natuurlijker taalgebruik. Geen autonome besluitvorming, geen context-overstijgend handelen. Echte agentic AI zou niet alleen een ticket beantwoorden, maar bijvoorbeeld zelf besluiten of escalatie naar een menselijke agent nodig is, op basis van veranderende context.',
    stevinView:
      'In vendor-selectie raden wij aan: vraag elke potentiele agent-vendor om een proof-of-concept op jouw data en jouw workflow, niet op hun demo. Vraag naar de underlying architecture: gebruikt het LLM\'s voor besluitvorming, of zijn het scripted flows? Vraag naar pricing op basis van tasks of outcomes, niet seats, agent washing-vendors prefereren seat-based omdat hun tool nauwelijks tasks uitvoert. Bij twijfel: vergelijk twee vendors parallel op dezelfde workflow, kijk wie er over 30 dagen nog meebehouden override-rate onder 20 procent levert.',
    relatedArticles: ['autonome-agents-90-dagen'],
    relatedTerms: ['agentic-ai', 'rpa'],
    publishedAt: '2026-05-05',
  },
  {
    slug: 'first-party-data',
    term: 'First-party data',
    category: 'meetbaarheid',
    shortDefinition:
      'First-party data is de data die je zelf verzamelt bij je eigen klanten en bezoekers, op je eigen website, in je eigen CRM en je eigen advertentieaccounts, zonder tussenpartij.',
    fullDefinition:
      'First-party data is alles wat je zelf hebt opgehaald: bestellingen in je webshop, aanvragen via je formulier, gesprekken in je CRM, gedrag op je eigen site. Daarnaast bestaat second-party data (de first-party data van een partner, gedeeld met jou) en third-party data (gekocht bij een partij die het elders verzamelde). Die laatste categorie loopt snel terug, want browsers blokkeren cookies van derden en de privacywetgeving stelt zwaardere eisen. Het gevolg is dat de kwaliteit van je advertenties steeds meer afhangt van wat je zelf hebt. Twee dingen bepalen of first-party data iets waard is. Ten eerste: staat het op jouw naam? Een advertentieaccount of meetopstelling die van je bureau is, betekent dat de opgebouwde geschiedenis daar blijft als je weggaat. Ten tweede: is het aan elkaar geknoopt? Losse data in vijf systemen die elkaar niet kennen levert geen beeld op, alleen vijf halve beelden.',
    example:
      'Een installatiebedrijf adverteert op Google, krijgt aanvragen via een formulier en verwerkt die in een CRM. De advertenties melden dertig conversies. In het CRM staan achttien echte aanvragen, waarvan zeven een offerte werden en twee een opdracht. Alleen door die twee bronnen aan elkaar te knopen zie je welke zoektermen omzet opleverden en welke alleen formulieren. Dat koppelen kan alleen met first-party data, want de advertentieplatformen weten niet wat er in je CRM gebeurt.',
    stevinView:
      'Wij zetten de accounts en de meetopstelling op naam van de klant zelf, ook als wij ze beheren. Dat klinkt als een detail tot iemand wil wisselen: dan gaat de opgebouwde geschiedenis mee in plaats van achter te blijven. Begin klein. Zorg eerst dat aanvragen uit je site in je CRM landen met de bron erbij, en dat je advertentieaccounts op je eigen naam staan. Dat zijn twee middagen werk en het is de basis waar al het meten daarna op rust.',
    relatedTerms: ['attribution', 'last-click', 'uplift-meting'],
    publishedAt: '2026-07-27',
  },
  {
    slug: 'feed-management',
    term: 'Feed management',
    category: 'platforms',
    shortDefinition:
      'Feed management is het klaarmaken en actueel houden van je productgegevens voor advertentie- en verkoopkanalen, zodat titel, prijs, voorraad en beeld overal kloppen.',
    fullDefinition:
      'Een productfeed is het bestand waarmee je webshop zijn artikelen doorgeeft aan kanalen als Google Shopping, Meta, Bol of een vergelijkingssite. Feed management is het werk eromheen: velden vullen die je shop niet standaard levert, titels herschrijven naar wat mensen echt zoeken, categorieen toewijzen, artikelen zonder voorraad eruit halen en de prijs synchroon houden. Het is onzichtbaar werk dat direct doorwerkt in wat je advertenties kosten. Een product met een slechte titel wordt getoond op de verkeerde zoekopdracht, en dan betaal je voor een klik die nooit een klant wordt. Een product dat uitverkocht is maar nog in de feed staat, kost je geld en een teleurgestelde bezoeker. De meeste winst zit niet in het bieden maar in de feed: welke artikelen doen mee, hoe heten ze, en klopt wat erin staat.',
    example:
      'Een webshop in autoaccessoires heeft 4.000 artikelen met titels uit het magazijnsysteem, zoals "ART-4471 mat zw". Niemand zoekt daarop. Na het herschrijven van de titels naar "rubberen automat zwart, set van vier" gaan dezelfde artikelen meedoen op zoekopdrachten die mensen werkelijk intypen. Er is geen euro extra budget nodig; de advertenties komen alleen op de goede plek terecht.',
    stevinView:
      'Wij behandelen de feed als onderdeel van de campagne, niet als techniek die iemand anders doet. Bij een webshop kijken we eerst naar de feed voordat we aan biedingen beginnen, want een verkeerde titel of een ontbrekende maat kost meer dan een verkeerd bod. En net als bij de rest: de feed en de regels eromheen blijven van de klant, zodat een overstap geen herbouw is.',
    relatedTerms: ['performance-max', 'roas'],
    publishedAt: '2026-07-27',
  },
]

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return glossary.find((t) => t.slug === slug)
}
