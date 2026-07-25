/**
 * Vendor-vergelijkings-pages, programmatic SEO playbook "X vs Y".
 *
 * Doel: vangen van comparison-zoekers die in vergelijkingsfase zitten.
 * Hoog-intent verkeer ("X vs Y" = bijna-koop), high-conversion potentie.
 *
 * Source-of-truth: dit bestand. Per vergelijking: 1 unieke pagina met
 * Stevin's praktijk-perspectief over wanneer welke vendor beter past.
 *
 * URL-patroon: /vergelijken/<slug-a>-vs-<slug-b>
 * Slug-format: alfabetisch gesorteerd (klaviyo-vs-mailchimp, niet
 * mailchimp-vs-klaviyo), voorkomt duplicate content.
 */

export interface ComparisonSection {
  /** Sectie-titel ("Wanneer kies je Klaviyo", "Wanneer kies je Mailchimp", etc.) */
  heading: string
  /** Body-tekst, 1-3 alinea's. */
  body: string
}

export interface Comparison {
  /** Slug = `${slugA}-vs-${slugB}`, alfabetisch gesorteerd. */
  slug: string
  /** Vendor A slug (matcht data/integrations.ts) */
  slugA: string
  /** Vendor B slug (matcht data/integrations.ts) */
  slugB: string
  /** Display-naam A (bv. "Klaviyo") */
  nameA: string
  /** Display-naam B (bv. "Mailchimp") */
  nameB: string
  /** SERP-titel, pakt comparison-zoekers */
  title: string
  /** Meta-description, max 160 chars */
  dek: string
  /** TL;DR, 1-2 zinnen voor wie te lui is om te scrollen */
  tldr: string
  /** Wanneer kies je A (~120-180 wrd, concrete praktijk) */
  whenA: string
  /** Wanneer kies je B (~120-180 wrd, concrete praktijk) */
  whenB: string
  /** Kosten-vergelijking (~80-120 wrd) */
  costs: string
  /** Stevin's veld-observatie, wat we in de praktijk zien (~120-180 wrd) */
  stevinView: string
  /** Optioneel: 3-5 FAQs voor FAQPage JSON-LD */
  faqs?: { question: string; answer: string }[]
  /** Publicatiedatum (ISO) */
  publishedAt: string
  /** Optioneel: laatst bijgewerkt */
  updatedAt?: string
}

export const comparisons: Comparison[] = [
  {
    slug: 'aizy-vs-stevin',
    slugA: 'aizy',
    slugB: 'stevin',
    nameA: 'Aizy',
    nameB: 'Stevin.AI',
    title: 'Aizy vs Stevin.AI: welke past bij jouw bedrijf?',
    dek: 'Twee AI-marketingbedrijven uit Breda, twee verschillende keuzes. Aizy stuurt op prestatie en automatisering, Stevin.AI op controle en eigenaarschap. Een eerlijke vergelijking.',
    tldr: 'Aizy is gebouwd voor bedrijven die vanaf ongeveer 5.000 euro per maand adverteren en het werk willen uitbesteden aan een systeem dat 24/7 optimaliseert. Stevin.AI is gebouwd voor bedrijven die willen dat het klopt en dat controleerbaar blijft, met een lagere instap en eigenaarschap dat vastligt.',
    whenA: `Kies Aizy als je maandelijkse advertentiebudget richting de 5.000 euro of hoger gaat en je vooral prestatie zoekt. Hun model draait om automatische optimalisatie over Google, Meta en TikTok, met een vaste expert die op de doelen stuurt. Ze omschrijven het zelf als "AI verwerkt de data, mensen geven richting".

Ze zijn opgericht in 2024 in Breda en haalden sindsdien ongeveer 3,5 miljoen euro op. Dat betekent capaciteit: meer mensen, sneller doorontwikkelen, en een langere adem dan een klein bureau. Ze bedienen onder meer retail en e-commerce, automotive, health en B2B.

Wil je alle drie de grote advertentiekanalen in een pakket en past je budget bij hun instapniveau, dan is dat een logische keuze.`,
    whenB: `Kies Stevin.AI als je eerst wilt weten of het klopt voordat je ergens aan vastzit. Het begint niet met een contract maar met een diagnose op je eigen cijfers: telt je meting echte aanvragen, staan je accounts op naam van je eigen bedrijf, en wie staat er geregistreerd als betaler van je advertenties.

Daarna zetten we het fundament goed en beheren we actief, met signalen die dag en nacht meekijken, ook op ons eigen werk. Elke wijziging krijgt een naam, een moment en een reden, in een logboek waar je altijd in kunt kijken. Onder alles ligt een marketinggeheugen dat onthoudt wat werkte per seizoen en kanaal, zodat een volgende campagne niet bij nul begint.

En het belangrijkste verschil: accounts, data en kennis blijven van jou, met een exit die vanaf dag een is ingebouwd.`,
    costs: `Aizy hanteert vaste pakketten (stand juli 2026): 199 euro per maand om zelf te draaien, 850 euro voor Google en Meta onder 2.000 euro advertentiebudget, 1.400 euro tot 5.000 euro budget, 1.850 euro daarboven, en maatwerk boven de 10.000 euro. Beheer begint dus bij 850 euro per maand.

Stevin.AI begint bij 399 euro per maand, en volledig beheer is maatwerk na de diagnose. Geen verborgen marges op je mediabudget en geen instaptarief dat stiekem verdubbelt.

Het praktische verschil zit in de onderkant: zit je onder de 2.000 euro advertentiebudget per maand, dan val je onder Aizy's instapniveau voor beheer. Controleer bij beide partijen de actuele tarieven, want prijzen veranderen.`,
    stevinView: `Wij denken dat dit geen keuze is tussen goed en slecht, maar tussen twee opvattingen over wat je koopt.

Aizy verkoopt prestatie en gemak: zet het aan, het systeem optimaliseert, jij houdt tijd over. Voor een bedrijf met budget en haast is dat een aantrekkelijk aanbod.

Wij verkopen zekerheid: dat de basis klopt, dat je kunt zien wat er gebeurt en waarom, en dat je zonder verlies weg kunt lopen. Dat is trager te verkopen, want een diagnose duurt langer dan een aanmelding.

Een ding is opvallend en het is te controleren: op de publieke pagina's van Aizy staat niets over eigenaarschap van je advertentie-accounts, niets over eigenaarschap van je data, en geen opzegtermijn (gecontroleerd juli 2026). Dat hoeft niets te betekenen, maar het zijn wel de vragen die wij bewust vooraan zetten. Stel ze aan elke partij waarmee je praat, ook aan ons.`,
    faqs: [
      {
        question: 'Zijn Aizy en Stevin.AI concurrenten?',
        answer: 'Deels. Beide combineren AI met menselijke expertise voor advertising, en beide zitten in Breda. Maar de instap verschilt: Aizy richt zich op bedrijven vanaf ongeveer 5.000 euro advertentiebudget per maand, Stevin.AI begint lager en start altijd met een diagnose.',
      },
      {
        question: 'Wie is goedkoper?',
        answer: 'Stevin.AI heeft een lagere instap (vanaf 399 euro per maand tegenover 850 euro voor Aizy\'s eerste beheerpakket). Bij hogere advertentiebudgetten hangt het af van wat je nodig hebt; beide werken dan met maatwerk.',
      },
      {
        question: 'Blijven mijn accounts van mij?',
        answer: 'Bij Stevin.AI ja, dat is vastgelegd: accounts op naam van je eigen bedrijf, exporteerbare data en een overdraagbaar dossier. Vraag dit bij elke partij expliciet na en laat het op papier zetten, wat je ook kiest.',
      },
      {
        question: 'Kan ik overstappen als het niet bevalt?',
        answer: 'Dat hangt af van hoe het geregeld is. Controleer drie dingen: op wiens naam staan de advertentie-accounts, kun je je data exporteren, en wat is de opzegtermijn. Bij Stevin.AI is de exit vanaf dag een ingebouwd.',
      },
    ],
    publishedAt: '2026-07-25',
  },
  {
    slug: 'klaviyo-vs-mailchimp',
    slugA: 'klaviyo',
    slugB: 'mailchimp',
    nameA: 'Klaviyo',
    nameB: 'Mailchimp',
    title: 'Klaviyo vs Mailchimp: welke past bij jouw e-commerce stack?',
    dek:
      'Klaviyo of Mailchimp voor je e-mail en SMS? De keuze hangt af van platform (Shopify of niet), automation-complexiteit en groei-pad.',
    tldr:
      'Op Shopify: Klaviyo, vrijwel altijd. Op WooCommerce of dienstverlening onder 10.000 contacten: Mailchimp is goedkoper. Boven 10.000 contacten: Klaviyo (e-commerce) of ActiveCampaign (B2B).',
    whenA:
      'Klaviyo wint zodra je serieus e-commerce doet. De product-feed-koppeling met Shopify (en WooCommerce, BigCommerce) werkt out-of-the-box: viewed product, added to cart, started checkout, post-purchase, alles trigger-baar zonder developer. Voor D2C-merken die op revenue per email sturen, is Klaviyo de standaard. De ingebouwde abandonment-flows leveren in onze data 30-40 procent van totale email-revenue, zonder dat iemand er meer naar omkijkt na de eerste setup. Voor wie SMS erbij wil: Klaviyo heeft het native, Mailchimp moet via een derde-partij integratie.',
    whenB:
      'Mailchimp blijft sterk voor wie onder de 10.000 contacten zit en geen complexe automations nodig heeft. Onder die drempel is het simpelweg goedkoper en eenvoudiger. Voor dienstverleners (agencies, consultants, content-makers) zonder product-feed is een groot deel van Klaviyo\'s waarde verspild. Mailchimp\'s drag-and-drop builder en templates zijn voor nieuwsbrief-werk prima. Vermijden: Mailchimp\'s meer geavanceerde automation-features zijn niet vergelijkbaar met Klaviyo of ActiveCampaign, wie tegen die grens aanloopt, migreert sowieso.',
    costs:
      'Mailchimp Free: 500 contacten, 1.000 sends per maand. Standard: $20/maand voor 500 contacten, schaalt op tot $1.700+ bij 100k contacten. Klaviyo: gratis tot 250 contacten en 500 sends. Daarboven start vanaf $20/maand voor 500 contacten en stijgt tot ongeveer $1.380 bij 50k contacten. Klaviyo is bij vergelijkbaar volume duurder dan Mailchimp, maar de ROI per contact ligt voor e-commerce structureel hoger.',
    stevinView:
      'Wij migreren regelmatig van Mailchimp naar Klaviyo wanneer een klant tegen de 10.000-contacten-grens komt of zijn flows niet meer in Mailchimp passen. Andersom zien we zelden. Tegelijk: voor klanten zonder product-feed (B2B-dienstverleners, content-creators) raden we vaak ActiveCampaign aan, die zit qua prijs tussen Mailchimp en Klaviyo, maar heeft wel volwassen automations en CRM-functionaliteit ingebouwd. De keuze is dus driehoeks: Mailchimp (klein, simpel), Klaviyo (e-commerce, schaalbaar), ActiveCampaign (alles ertussenin met sales-component).',
    faqs: [
      {
        question: 'Is Klaviyo duurder dan Mailchimp?',
        answer:
          'Bij vergelijkbaar contacten-volume: ja, ongeveer 20-30 procent. Maar de revenue per email ligt voor e-commerce structureel hoger door de product-feed-integratie. Voor merken met €100k+ jaarlijkse e-mail-omzet is de Klaviyo-meerprijs vaak in twee maanden terugverdiend.',
      },
      {
        question: 'Kan ik makkelijk migreren van Mailchimp naar Klaviyo?',
        answer:
          'Ja, Klaviyo heeft een native importer voor Mailchimp-lists, segmenten en historische send-data. Reken op ongeveer een week werk inclusief het herbouwen van automations, omdat triggers en logica conceptueel verschillen. Test campaigns en flows uitgebreid voor je de oude Mailchimp-account opzegt.',
      },
      {
        question: 'Werkt Mailchimp ook voor Shopify?',
        answer:
          'Technisch ja, maar de integratie is duidelijk minder diepgaand dan Klaviyo\'s. Product-recommendations en abandoned-cart-flows zijn beperkter. Voor een serieuze Shopify-shop is Klaviyo de logische keuze, niet Mailchimp.',
      },
      {
        question: 'Heeft Klaviyo SMS ingebouwd?',
        answer:
          'Ja, Klaviyo SMS draait op hetzelfde platform en in dezelfde flows. Mailchimp heeft geen native SMS, daar moet je een aparte tool zoals Postscript of Attentive bij koppelen, wat de stack onnodig complex maakt.',
      },
    ],
    publishedAt: '2026-05-05',
  },
  {
    slug: 'shopify-vs-woocommerce',
    slugA: 'shopify',
    slugB: 'woocommerce',
    nameA: 'Shopify',
    nameB: 'WooCommerce',
    title: 'Shopify vs WooCommerce: hosted of zelf onderhouden?',
    dek:
      'Shopify is hosted en betaalbaar tot grote schaal. WooCommerce is gratis maar vergt WordPress-onderhoud. De echte kostenvergelijking ligt in tijd, niet in licentie.',
    tldr:
      'Shopify voor 80 procent van D2C-merken. WooCommerce voor wie al op WordPress draait en de onderhoudslast accepteert. Bij verwachte omzet boven €5 mln/jaar: Shopify Plus of een ander enterprise-platform.',
    whenA:
      'Shopify wint op time-to-launch, hosting-stabiliteit en checkout-conversie. Een nieuw merk dat in 2-4 weken live wil, is op Shopify sneller dan op WooCommerce, geen hosting-keuze, geen security-updates, geen plugin-conflicten. Voor merken zonder vaste developer is het verschil structureel: een Shopify-shop draait jaren vrijwel onderhoudsloos. Apps voegen functionaliteit toe (reviews, abonnementen, shipping), maar elke app verlangzaamt je site, wij hanteren een richtlijn van maximaal 10 actieve apps per shop.',
    whenB:
      'WooCommerce wint wanneer je al WordPress gebruikt voor content-marketing en de overlap waardevol is. Plus: voor zeer specifieke product-flows (ingewikkelde configurators, B2B-prijzen per klant, abonnementen met custom voorwaarden) heeft WooCommerce meer plugin-flexibiliteit dan Shopify. Maar de prijs is onderhoud: hosting moet kloppen (Kinsta of WP Engine, geen shared hosting), security-updates moet iemand bijhouden, plugin-conflicten moeten worden opgelost. Reken op 2-4 uur per maand structureel onderhoud, plus incident-tijd bij een grote WordPress-update.',
    costs:
      'Shopify Basic: $29/maand. Standard: $79. Advanced: $299. Plus: vanaf $2.300/maand. WooCommerce zelf is gratis, maar reken: WordPress hosting €30-200/maand, betaalde plugins €200-500/jaar, security-tools €100-300/jaar, plus developer-uren €60-120 per uur voor onderhoud (gemiddeld 4 uur/maand). Bij groei lopen WooCommerce-kosten onverwacht op door tools en development-tijd; Shopify-kosten zijn voorspelbaar.',
    stevinView:
      'Wij migreren WooCommerce-shops naar Shopify gemiddeld drie jaar na launch, wanneer onderhoud-tijd niet meer in verhouding staat tot omzet. Andersom (Shopify naar WooCommerce) zien we vrijwel nooit. De enige reden om bewust voor WooCommerce te kiezen in 2026 is wanneer een specifieke business-flow op Shopify niet kan en jouw use case extreem niet-standaard is. Voor 95 procent van D2C-merken is Shopify Standard of Advanced de juiste keuze. Boven €5 mln omzet: tijd om Shopify Plus te overwegen, vooral voor checkout-customization en multi-currency.',
    faqs: [
      {
        question: 'Wat kost Shopify werkelijk per maand?',
        answer:
          'Naast het abonnement (vanaf $29) reken op $30-150/maand aan apps voor reviews, e-mail, shipping en analytics. Plus 2,4-2,9 procent transactiekosten op Shopify Payments (lager dan Stripe-direct). Totaal voor een MKB-shop: $80-250 per maand all-in.',
      },
      {
        question: 'Is WooCommerce echt gratis?',
        answer:
          'De plugin is gratis, de rest niet. Hosting, betaalde extensions, security-tools, een developer voor onderhoud, bij elkaar vergelijkbaar met Shopify Standard, maar met meer tijd-investering en risico op downtime bij plugin-conflicten of WordPress-updates.',
      },
      {
        question: 'Wat als ik later wil migreren tussen de twee?',
        answer:
          'WooCommerce naar Shopify is een goed begaan pad: meeste data (klanten, orders, producten) komt mee via importers. Andersom is moeilijker omdat WooCommerce geen native Shopify-importer heeft. Als je twijfelt: start op Shopify, migreren naar WooCommerce wanneer je echt iets specifieks nodig hebt is altijd nog mogelijk.',
      },
    ],
    publishedAt: '2026-05-05',
  },
  {
    slug: 'hubspot-vs-salesforce',
    slugA: 'hubspot',
    slugB: 'salesforce',
    nameA: 'HubSpot',
    nameB: 'Salesforce',
    title: 'HubSpot vs Salesforce: welk CRM past bij jouw groei-fase?',
    dek:
      'HubSpot is sneller live, Salesforce is flexibeler op enterprise-schaal. De keuze hangt af van team-grootte, processen-complexiteit en RevOps-capaciteit.',
    tldr:
      'Tot 50 sales-medewerkers en standaard processen: HubSpot. Vanaf complexe sales-cycli, multi-product, multi-region: Salesforce. Zonder fulltime RevOps-iemand: kies HubSpot ongeacht groottre.',
    whenA:
      'HubSpot wint op tijd-tot-waarde. Een team van 5-30 sales-medewerkers is binnen twee weken operationeel inclusief automation, deal-tracking en rapportages. De interface is intuitief genoeg dat consultants \'m vrijwel zonder training gebruiken. Marketing-automation, CMS en service-desk zitten op hetzelfde platform, voor MKB die niet wil versplinteren tussen 4 tools is dat een groot voordeel. Pricing schaalt voorspelbaar mee. Beperking: bij sales-flows die echt afwijken van standaard (B2B met 18-maanden sales-cycli, multi-stakeholder approval, custom pricing per klant) loop je tegen HubSpot\'s limieten aan.',
    whenB:
      'Salesforce wint zodra je sales-proces niet in een standaard-template past. Custom objects, custom validation rules, custom workflows via Apex, wat je je ook voorstelt, Salesforce kan het. Voor enterprises met 50+ sales en complexe sales-cycli is het de standaard, juist omdat de flexibiliteit zo groot is. Maar die flexibiliteit heeft een prijs: zonder een toegewijde Salesforce-administrator (intern of extern) loopt elke implementatie binnen twee jaar uit op een rommelige config waar niemand meer doorheen kijkt. Reken op €40k-150k implementatie-kosten en daarna €40k-80k per jaar voor administrator + licenties.',
    costs:
      'HubSpot Sales Starter: €18/seat/maand. Pro: €90/seat. Enterprise: €150/seat. Marketing Hub: vanaf €18/maand voor 1k contacten, schaalt op tot €3.300/maand voor 10k. Salesforce Sales Cloud: $25/seat (Starter), $80/seat (Pro), $165/seat (Enterprise), $330/seat (Unlimited). Daarbovenop: implementatie-partner kost typisch €40-150k voor middle-market, plus jaarlijks 15-25 procent van licentie-kosten aan onderhoud.',
    stevinView:
      'Wij raden HubSpot aan voor MKB onder 50 sales-medewerkers, tenzij er een specifieke Salesforce-vereiste vanuit een groot moederbedrijf of regelgeving is. Salesforce-implementaties die wij overnemen zijn vaak 18+ maanden bezig zonder duidelijke ROI. Het probleem is zelden de software, maar het ontbreken van iemand die de configuratie consistent houdt. HubSpot dwingt simpelheid af door minder configurable te zijn, voor de meeste MKB is dat een feature, niet een bug. Boven 50 medewerkers en/of multi-product: Salesforce wordt onvermijdelijk, plan een fulltime admin in.',
    faqs: [
      {
        question: 'Kan ik later migreren van HubSpot naar Salesforce?',
        answer:
          'Ja, contact-data, deals en activity-history komen mee via importers of via een ETL-tool zoals Fivetran. Reken op een 2-4 maanden migratie-traject inclusief het hertraining van het sales-team op de Salesforce-interface, die fundamenteel anders werkt dan HubSpot.',
      },
      {
        question: 'Wat kost een Salesforce-implementatie werkelijk?',
        answer:
          'Naast licenties (€100-300/seat/maand): implementatie-partner €40k-150k voor MKB, plus jaarlijks 15-25 procent van licentie-kosten aan administrator-tijd. Voor een 50-mans sales-team is dat al snel €100k+ jaar-een en €60k+ structureel. Bij HubSpot loopt dat richting de €40k-€80k jaar-een en €30-50k structureel.',
      },
      {
        question: 'Welk CRM heeft betere AI-functionaliteit?',
        answer:
          'Beide hebben sinds 2025 een eigen AI-laag (HubSpot Breeze, Salesforce Einstein). In de praktijk: Salesforce Einstein is geavanceerder maar vereist meer data en setup om iets nuttigs te doen. HubSpot Breeze is laagdrempeliger en levert sneller iets op, maar is minder krachtig op grote datasets.',
      },
    ],
    publishedAt: '2026-05-05',
  },
  {
    slug: 'amplitude-vs-mixpanel',
    slugA: 'amplitude',
    slugB: 'mixpanel',
    nameA: 'Amplitude',
    nameB: 'Mixpanel',
    title: 'Amplitude vs Mixpanel: welke product-analytics past beter?',
    dek:
      'Amplitude rekent per event, Mixpanel per Monthly Tracked User. Voor apps met veel events per user is Mixpanel goedkoper, voor apps met veel users en weinig events andersom.',
    tldr:
      'Reken eerst je event/user-ratio uit. Boven ~50 events per actieve user per maand: Mixpanel goedkoper. Onder 50 events per user: Amplitude goedkoper. Beide tools zijn qua functionaliteit zeer vergelijkbaar.',
    whenA:
      'Amplitude wint voor apps met laag event-volume per user. Free-tier: 10 miljoen events per maand zonder seat-limiet, ruim voor de meeste startups. De charts en dashboards zijn iets duidelijker dan Mixpanel voor wie minder dataervaring heeft. Cohort-analyses en retention zijn out-of-the-box krachtig. Amplitude wordt vaker gebruikt door product-managers omdat de interface meer op product-discoverability is gebouwd dan op marketing-funnels.',
    whenB:
      'Mixpanel wint voor apps waar gebruikers veel events triggeren, gaming-apps, productivity-tools met veel acties per sessie, complexe SaaS-dashboards. Pricing op MTU (Monthly Tracked User) betekent dat je betaalt per actieve user, niet per actie die ze nemen. Voor apps met 10k MTU die elk 200 events doen, is Mixpanel structureel goedkoper dan Amplitude. Plus: Mixpanel\'s impact-analysis (oorzaak en gevolg tussen features) is iets sterker dan Amplitude\'s gelijkwaardige tool.',
    costs:
      'Amplitude Free: 10M events/maand, onbeperkte seats. Plus: vanaf $49/maand. Growth: custom pricing vanaf ongeveer $1.500/maand. Mixpanel Free: 1M events of 100k MTU. Growth: vanaf $24/maand voor 100k events, schaalt op MTU. Voor 10k MTU met 200 events/user/maand (= 2M events): Amplitude Plus dekt dat ruim, Mixpanel zit op Growth-tier rond $250-400/maand.',
    stevinView:
      'Wij zien teams die kiezen op basis van wat een collega ergens anders gebruikt heeft, niet op basis van hun eigen event/user-ratio. Reken voor je tekent, het verschil is in pricing makkelijk een factor 2-3, en migreren is vrijwel onmogelijk zonder data te verliezen of opnieuw te tracken. Twee praktische tips: (1) start met de free-tier van beide, run dezelfde events parallel een maand, kijk welke charts duidelijker zijn voor jouw team. (2) Investeer in een tracking-plan-document voor je events-schema gaat draaien, beide tools worden waardeloos als events inconsistent worden benoemd.',
    faqs: [
      {
        question: 'Welke tool heeft betere A/B-test-functionaliteit?',
        answer:
          'Beide hebben experimentation-features, maar geen van beide vervangt een dedicated tool als Optimizely of GrowthBook. Voor serieuze experiment-programma\'s gebruik je Amplitude/Mixpanel voor analyse, een dedicated tool voor uitvoering.',
      },
      {
        question: 'Kunnen Amplitude of Mixpanel naar GA4 vervangen?',
        answer:
          'Nee, andere doelen. GA4 is marketing-attribution (welke kanalen leveren welke conversies). Amplitude/Mixpanel zijn product-analytics (hoe gedragen users zich in je app). Vrijwel alle SaaS-bedrijven hebben beide nodig.',
      },
      {
        question: 'Hoe migreer ik tussen Amplitude en Mixpanel?',
        answer:
          'Niet makkelijk. Historische data komt niet mee tenzij je via een data-warehouse (BigQuery, Snowflake) opnieuw exporteert en importeert. Een project van 1-3 maanden inclusief opnieuw bouwen van charts en dashboards. Beslis liever vooraf zorgvuldig dan dat je achteraf wisselt.',
      },
    ],
    publishedAt: '2026-05-05',
  },
  {
    slug: 'google-ads-vs-meta-ads',
    slugA: 'google-ads',
    slugB: 'meta-ads',
    nameA: 'Google Ads',
    nameB: 'Meta Ads',
    title: 'Google Ads vs Meta Ads: welk kanaal voor welke conversie?',
    dek:
      'Google Ads vangt zoek-intentie, Meta Ads bouwt vraag op via interesse-targeting. De juiste verdeling hangt af van product-fase en awareness-niveau.',
    tldr:
      'Vraag-vangst (mensen zoeken al jouw product): Google. Vraag-creatie (mensen weten nog niet dat ze je product willen): Meta. Voor de meeste D2C-merken is een 60/40 of 50/50-verdeling Google/Meta gezond.',
    whenA:
      'Google Ads wint voor producten waar mensen actief naar zoeken. Branded search (jouw merknaam), category-search ("AI-marketing-tool", "boekhoudpakket MKB"), local search ("loodgieter Breda"), Google vangt mensen op het moment dat ze al een vraag hebben. Voor B2B en gevestigde merken is dat vaak 50-70 procent van het budget. Performance Max werkt voor e-commerce maar consumeert ongeveer 30-40 procent branded search die je toch al had, gebruik bewust en sluit branded uit als je echte uplift wilt zien.',
    whenB:
      'Meta Ads wint voor producten die mensen niet zelf opzoeken. Een nieuw skincare-merk, een nieuwe SaaS-feature, een lifestyle-product, niemand googelt daar specifiek op. Meta\'s targeting (interesses, look-alikes, retargeting) bouwt vraag op via creatieve content. Voor D2C-startups is Meta vaak 60-80 procent van het budget in jaar een, daarna verschuift het naar Google naarmate de naamsbekendheid groeit. Belangrijke caveat: Meta\'s eigen attribution overschat zichzelf systematisch, meet alleen op echte uplift via geo-test of holdout, niet op platform-rapportage.',
    costs:
      'Beide platforms werken op auction-pricing, dus "kost" per platform varieert sterk. Indicaties voor Nederland: Google Search CPC €0,80-€8 (afhankelijk van categorie). Meta CPM €4-€18 (afhankelijk van doelgroep en creatief). Voor een typisch MKB-D2C-budget van €5k/maand: ongeveer 1.500-3.000 conversies via Meta vs 200-800 via Google Search. Maar conversie-waarde verschilt: Google-conversies zijn vaak hoger-intent dus hogere AOV.',
    stevinView:
      'De praktijk: 80 procent van accounts die wij overnemen heeft te weinig Google budget allocated, branded search is meestal te low maar vangt soms 70 procent van warme conversies. Tegelijk overschat Meta zichzelf in dashboards met 30-50 procent door modeled conversies. De juiste budget-verdeling tussen de twee komt niet uit platform-attributie, maar uit een uplift-meting. Wij draaien op alle nieuwe accounts binnen het eerste kwartaal een geo-test of holdout op zowel Google als Meta, uitkomsten wijken structureel 20-40 procent af van wat de platforms zelf rapporteren. Pas dan kun je serieus over budget-allocatie praten.',
    faqs: [
      {
        question: 'Welk kanaal heeft betere ROI?',
        answer:
          'Hangt volledig af van product, markt en awareness-niveau. Voor zoek-intentieproducten (B2B-tools, services, lokaal) is Google\'s ROI doorgaans hoger. Voor visueel D2C en lifestyle-merken is Meta\'s ROI vaak beter, vooral in vroege fase. Een uplift-test op beide platforms is de enige manier om voor jouw bedrijf zeker te weten welke beter presteert.',
      },
      {
        question: 'Moet ik beide platforms gebruiken of kan ik een kiezen?',
        answer:
          'Voor de meeste merken: beide. Google vangt vraag, Meta bouwt vraag. Een kanaal alleen leidt tot diminishing returns. Uitzondering: pure lokaal MKB (loodgieter, kapper) kan vaak met alleen Google goed uit. Pure D2C-startup zonder budget voor beide: start met Meta, voeg Google later toe naarmate naamsbekendheid groeit.',
      },
      {
        question: 'Wat is de gemiddelde verdeling tussen Google en Meta?',
        answer:
          'Voor MKB-D2C in Nederland zien wij meestal 50/50 of 60/40 (Google/Meta) als gezond startpunt. Voor B2B vaak 70/30 richting Google. Voor pure D2C-startups in jaar een: 30/70 of 20/80 richting Meta. Het juiste antwoord hangt af van uplift-test-uitkomsten, niet van een vuistregel.',
      },
    ],
    publishedAt: '2026-05-05',
  },
]

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug)
}
