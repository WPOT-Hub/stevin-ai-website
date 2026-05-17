# Stevin Journal — drafts 17 mei 2026

Acht dispatches in backfill voor de afgelopen twee weken (3-17 mei 2026).
Per stuk: titel, slug, dek, body (3 paragrafen), Stevin-perspectief, bron.
Schrijfregels gevolgd: nieuws-lead voorop, korte alinea's, geen em-dashes,
geattribueerde claims, geen accenten in NL, geen academisch jargon.

Bij goedkeuring kopieer ik per artikel naar `data/articles.ts` plus een nieuwe
slug-pagina onder `app/[locale]/blog/[slug]/page.tsx`. Editie-nummers 024-031.

---

## #024 — OpenAI opent ChatGPT Ads Manager voor alle Amerikaanse adverteerders

**Category:** Distributie
**Slug:** `openai-chatgpt-ads-manager-cpc-self-serve`
**Title:** OpenAI opent ChatGPT Ads Manager voor alle Amerikaanse adverteerders met CPC-bieden
**Dek:** OpenAI laat het minimum-budget van 50.000 dollar vallen en zet een self-serve Ads Manager in beta. Cost-per-click wordt het nieuwe bied-model.

### Body

OpenAI heeft op 5 mei zijn ChatGPT Ads-platform uitgebreid met een self-serve Ads Manager en een cost-per-click biedoptie. Volgens Axios kunnen Amerikaanse adverteerders zich nu direct aanmelden en campagnes inkopen zonder agency-tussenkomst. Het minimum-budget van 50.000 dollar dat tot vorige week gold, is geschrapt.

OpenAI mikt op 2,5 miljard dollar advertentie-omzet dit jaar en 100 miljard in 2030. De Ads Manager komt ook beschikbaar via partners zoals Dentsu, Omnicom, Publicis en WPP, plus ad-tech-leveranciers Adobe, Criteo, Kargo, Pacvue en StackAdapt. De pilot wordt in de komende maanden uitgerold naar het Verenigd Koninkrijk, Japan, Brazilie, Mexico en Zuid-Korea.

Het bedrijf voegde ook nieuwe meet-tools toe waarmee adverteerders campagnes kunnen analyseren en optimaliseren. Een directe vergelijking met Google Ads of Meta is nog moeilijk te maken, omdat het inventaris-volume in ChatGPT lager is en de auction-dynamiek nog opbouwt. Wel ligt er nu voor het eerst een instap zonder vendor-call.

### Stevin-perspectief

Voor bureau-eigenaars en in-house teams betekent dit dat je een testbudget kunt vrijmaken zonder eerst een verkoopgesprek met OpenAI te plannen. De relevante vraag is niet of ChatGPT Ads werkt, maar of jouw doelgroep daar zit en of CPC-attributie in jouw stack landt. Begin klein, meet wat doorklikt, en bewaar de tijd die je vroeger kwijt was aan minimum-spend-besprekingen voor het echte werk.

**Bron:** [Axios — OpenAI launches self-serve ad platform](https://www.axios.com/2026/05/05/openai-self-serve-ad-platform)

---

## #025 — Klaviyo koppelt klantdata aan Claude voor agentic marketing-workflows

**Category:** Platform
**Slug:** `klaviyo-anthropic-claude-mcp-agentic-workflows`
**Title:** Klaviyo koppelt klantdata aan Claude voor agentic marketing-workflows
**Dek:** Klaviyo opent zijn MCP-server breder naar Claude.ai en Claude Cowork. Rapporten, audits en campagne-briefs draaien vanaf nu vanuit een prompt.

### Body

Klaviyo kondigde op 7 mei een uitgebreide integratie met Anthropic aan waarmee Claude direct toegang krijgt tot Klaviyo-klantdata via het Model Context Protocol. Volgens de aankondiging in het Klaviyo-newsroom kunnen merken vanuit Claude.ai en Claude Cowork prestatie-rapporten, segment-analyses en kant-en-klare campagne-briefs genereren zonder data te exporteren of een tweede dashboard te openen.

De nieuwe MCP Connector koppelt aan een Query Metric Aggregates-tool die ruwe prestatie-cijfers blootlegt. Claude kan daarmee Klaviyo-rapporten ophalen, doorredeneren op meerdere flows en customer-profielen, en concept-content schrijven voor een campagne. In Claude Cowork draaien deze stappen in een enkele sessie waarin Claude data trekt, copy schrijft en bestanden opslaat in een gedeelde map.

Klaviyo is daarmee na HubSpot en een handvol andere CRM-leveranciers een van de eerste martech-platforms die hun datalaag expliciet openzet voor agent-workflows. Het bedrijf positioneert dit als eerste stap richting wat ze "operational AI" noemen, waarin de marketeer een uitkomst beschrijft en het werk afgerond terugkrijgt.

### Stevin-perspectief

Voor in-house teams die op Klaviyo draaien betekent dit dat je rapportage-werk dat nu een dagdeel kost, in principe naar een chatprompt verschuift. De vraag aan je bureau wordt scherper: als de prompt het rapport schrijft, waar zit dan jullie waarde? Het antwoord ligt in de duiding en de keuzes die volgen, niet in het exporteren van cijfers. Wij bouwen Stevin met dat antwoord in het achterhoofd.

**Bron:** [Klaviyo — Expanded integration with Anthropic](https://www.klaviyo.com/newsroom/klaviyo-anthropic-expanded-integration)

---

## #026 — EU AI Act krijgt Omnibus-akkoord, deadlines voor hoge-risico-systemen schuiven

**Category:** Beleid
**Slug:** `eu-ai-act-omnibus-akkoord-deadlines-uitgesteld`
**Title:** EU AI Act krijgt Omnibus-akkoord, deadlines voor hoge-risico-systemen schuiven
**Dek:** EU-wetgevers bereikten op 7 mei politiek akkoord over aanpassingen van de AI Act. Compliance-deadlines voor hoge-risico-AI worden verlengd, regels rond AI-generated content worden verscherpt.

### Body

De EU-instellingen hebben op 7 mei een politiek akkoord bereikt over de zogenoemde AI Act Omnibus. Volgens Morrison Foerster verheldert het pakket bestaande verplichtingen, schuift het de compliance-deadlines voor hoge-risico-AI-systemen op en introduceert het nieuwe regels rond AI-gegenereerde intieme content.

De overgebleven bepalingen van de AI Act worden op 2 augustus 2026 van toepassing. Verboden voor AI-systemen met onaanvaardbaar risico golden al sinds 2 februari 2025, en regels voor general-purpose modellen zoals ChatGPT, Claude en Gemini sinds augustus 2025. Boetes voor de zwaarste overtredingen lopen op tot 7 procent van de wereldwijde jaaromzet, standaard non-compliance tot 3 procent.

Voor marketing-bureaus die AI gebruiken om EU-consumentendata te verwerken, valt het werk binnen de scope van de wet. Inzetters van hoge-risico-AI-systemen moeten fundamental-rights-impact-assessments uitvoeren, menselijk toezicht inrichten, gebruikslogs bijhouden voor post-market-monitoring en medewerkers AI-literacy-training geven. De categorieen die het meest raken aan marketing-werk zijn AI die individuen scoort of evalueert, en AI in werving en HR.

### Stevin-perspectief

Voor bureau-eigenaars is dit het moment om twee dingen te checken. Eerst: welke AI-tools draaien er in jullie stack die persoonsdata van EU-consumenten verwerken, en heeft de leverancier al een DPIA klaarliggen. Dan: welke van jullie eigen workflows valt onder hoge-risico, en wie houdt daar de logs van bij. De boetes zijn theoretisch, de toezichthouders zijn dat niet meer.

**Bron:** [Morrison Foerster — European Digital Compliance, May 2026](https://www.mofo.com/resources/insights/260501-european-digital-compliance-key-digital-regulation)

---

## #027 — LinkedIn rolt Off-Platform Event Ads wereldwijd uit

**Category:** Platform
**Slug:** `linkedin-off-platform-event-ads-globale-uitrol`
**Title:** LinkedIn rolt Off-Platform Event Ads wereldwijd uit voor externe event-funnels
**Dek:** LinkedIn-event-ads sturen vanaf 6 mei direct door naar je eigen registratie, livestream of CRM. De flow blijft op LinkedIn, de data en het formulier bij jou.

### Body

LinkedIn maakte Off-Platform Event Ads op 6 mei wereldwijd beschikbaar. Volgens Sourcegeek kunnen marketeers vanaf nu event-advertenties in de LinkedIn-feed serveren die rechtstreeks doorlinken naar externe registratiepagina's, eigen event-sites, livestreams of formulieren. Tot voor kort moest de aanmelding binnen LinkedIn-omgeving plaatsvinden, met beperkte controle over de vervolg-data.

Het voordeel zit in het behouden van je eigen stack: CRM-velden, consent-flow, opvolg-mails en attributie blijven aan jouw kant. LinkedIn levert de doelgroep en het beeld in de feed, jij houdt de hand op het inschrijfproces. Voor B2B-organisatoren van webinars, conferenties en demo's verlaagt dit de drempel om LinkedIn als top-of-funnel-kanaal te gebruiken zonder afscheid te nemen van bestaande event-tools.

De rol-out volgde op twee algemene LinkedIn-trends. Posts met externe links krijgen ongeveer 60 procent minder bereik dan posts zonder, en LinkedIn schoof in het algoritme naar wat het zelf "Depth and Authority" noemt: minder viral-reach, meer professionele substantie. Off-Platform Event Ads geven adverteerders een betaalde route om die link-frictie te omzeilen.

### Stevin-perspectief

Voor in-house teams die nu webinars en demo's runnen via Hopin, Goldcast of een eigen pagina, is dit het moment om de event-flow opnieuw te tekenen. Vraag aan je bureau: trek je LinkedIn-aanmelders direct in onze CRM, of blijven ze in LinkedIn-formulieren hangen waarvan we de data later moeten matchen. Het verschil tussen die twee zit in de snelheid van je opvolging.

**Bron:** [Sourcegeek — How the LinkedIn Algorithm Works (2026 Update)](https://www.sourcegeek.com/en/news/how-the-linkedin-algorithm-works-2026-update)

---

## #028 — YouTube Brandcast 2026: TV-checkout, AI-sponsoring en Affiliate Boost

**Category:** Platform
**Slug:** `youtube-brandcast-2026-tv-checkout-ai-sponsoring`
**Title:** YouTube Brandcast 2026: TV-checkout, AI-sponsoring en Affiliate Boost gepresenteerd
**Dek:** YouTube zette op 13 mei in op connected-TV-shopping en AI-gedreven sponsoring. CTV-conversies stegen volgens Google met meer dan 200 procent jaar-op-jaar in Q1 2026.

### Body

YouTube presenteerde op 13 mei tijdens Brandcast 2026 in Lincoln Center een reeks nieuwe advertentie-formats. De aankondiging op de YouTube-blog noemt drie hoofdthema's: connected-TV-commerce, AI-gedreven sponsoring en uitgebreide creator-deals.

Buy with Google Pay laat kijkers vanaf hun TV in twee klikken een aankoop afronden. YouTube meldt dat conversies vanuit CTV-advertenties in Q1 2026 met meer dan 200 procent jaar-op-jaar groeiden. Custom Sponsorships gebruikt AI om video's te selecteren die passen bij het moment dat een merk wil bereiken, en Masthead met Custom Content Shelf staat marketeers toe om naast hun hero-creative aanvullende content te tonen.

Voor creators komt er Affiliate Partnerships Boost, waarmee merken organische content kunnen amplifyen waarin hun producten al getagd zijn. Multimodal Video Creation gebruikt Gemini, Nano Banana en Veo om van brief naar productie te gaan in een paar prompts. YouTube kondigde tegelijk nieuwe creator-shows aan met onder anderen Trevor Noah, Alex Cooper en Kareem Rahma.

### Stevin-perspectief

Voor bureau-eigenaars die klanten in retail en D2C bedienen, verschuift de YouTube-vraag van "is video belangrijk" naar "hoe meet je een aankoop die op de TV begint en op de telefoon eindigt". De praktische test is simpel: zet een kleine campagne op met CTV-checkout, en kijk of je analytics-stack de conversie kan toewijzen zonder hand-werk. Lukt dat niet, dan ligt het werk eerst bij de meet-laag, niet bij het format.

**Bron:** [YouTube Blog — Brandcast 2026 advertiser updates](https://blog.google/products-and-platforms/products/youtube/youtube-brandcast-2026-advertiser-updates/)

---

## #029 — Anthropic lanceert Claude for Small Business met vijftien workflows

**Category:** Platform
**Slug:** `anthropic-claude-small-business-vijftien-workflows`
**Title:** Anthropic lanceert Claude for Small Business met vijftien workflows
**Dek:** Anthropic introduceerde op 13 mei een pakket connectors en agent-workflows voor ondernemers, met integraties naar QuickBooks, HubSpot, Canva en Google Workspace.

### Body

Anthropic lanceerde op 13 mei Claude for Small Business, een pakket connectors en agentische workflows gericht op ondernemers. Volgens SiliconANGLE bevat het pakket vijftien skills die beschrijven hoe Claude payroll plant, boekhouding afstemt, campagnes runt en nieuwe medewerkers onboardt. Het verbindt met QuickBooks, PayPal, HubSpot, Canva, DocuSign, Google Workspace en Microsoft 365.

Er is geen extra prijskaartje bovenop de bestaande Claude-licentie en de partner-tools die een bedrijf al gebruikt. Anthropic startte tegelijk een tour van tien Amerikaanse steden, beginnend op 14 mei in Chicago, waar 100 lokale ondernemers per stop een halve dag gratis AI-fluency-training en een hands-on workshop krijgen.

De marketing-specifieke workflows draaien om campagne-management, social-distributie en het volgen van prestatie-rapportages. Claude voert ze niet alleen uit, maar plant ze ook in: een prompt zoals "plan een launch voor mijn nieuwe lijn" wordt opgebroken in deel-taken die over meerdere connectors lopen. Het is daarmee Anthropic's eerste poging om de SMB-doelgroep direct te bedienen in plaats van via Claude-API-bouwers.

### Stevin-perspectief

Voor in-house marketeers in een MKB-bedrijf opent dit een serieuze vraag: welke workflows die je nu uitbesteedt aan een freelancer of bureau, kunnen straks vanuit een chatprompt draaien. Het antwoord zal per workflow verschillen, en de eerlijke meting is hoeveel her-werk Claude oplevert versus hoeveel tijd het bespaart. Wij volgen dit dichtbij omdat het direct raakt aan wat een bureau-eigenaar de komende twaalf maanden moet uitleggen aan zijn klanten.

**Bron:** [SiliconANGLE — Anthropic launches Claude for Small Business](https://siliconangle.com/2026/05/13/anthropic-launches-claude-small-business-new-automation-workflows/)

---

## #030 — Insider One koopt Bluecore voor 400-merken retail-portefeuille

**Category:** Markt
**Slug:** `insider-one-koopt-bluecore-retail-martech-ipo`
**Title:** Insider One koopt Bluecore voor 400-merken retail-portefeuille richting IPO
**Dek:** Istanbul-gebaseerde Insider One nam op 13 mei Bluecore over en bouwt zijn Amerikaanse retail-footprint uit. De deal is een opmaat naar een geplande beursgang.

### Body

Insider One kondigde op 13 mei de overname aan van Bluecore, een retail-martech-platform dat ruim 400 Amerikaanse enterprise-merken bedient zoals Sephora, J.Crew, The North Face, Ralph Lauren en Bloomingdale's. De voorwaarden van de transactie zijn niet bekendgemaakt. Volgens Bloomberg positioneert Insider One de deal als opmaat naar een geplande IPO.

Bluecore brengt zijn Transparent ID Network mee, een identificatie-graaf die meer dan 10 miljard shopper-events per dag verwerkt. Die data-laag versterkt Insider One's modellen voor retail- en commerce-campagnes. Voor Insider One, dat zichzelf "agentic customer engagement platform" noemt, is dit de tweede grote stap richting de Amerikaanse enterprise-retail-markt.

De deal past in een bredere consolidatie-trend onder customer-engagement-platforms. Sinds eind 2025 zijn meerdere zelfstandige CDP- en e-mail-platforms opgekocht of gefuseerd, deels gedreven door de noodzaak om AI-agent-workflows aan een grotere data-laag te koppelen. Voor de top-tien retailers betekent het dat hun martech-vendor-landschap krimpt; voor de middenmoot dat de keuze tussen specialist en suite scherper wordt.

### Stevin-perspectief

Voor in-house teams die op Bluecore draaien, is de eerstvolgende vraag aan de account-manager wanneer roadmap-prioriteiten zullen schuiven, en welke integraties met Insider One-tools verplicht worden. Voor bureaus die merken adviseren over vendor-keuze: martech-consolidatie betekent minder leveranciers maar bredere lock-in. De middenmoot-retailers die nu kiezen, kopen de komende drie jaar effectief de roadmap van een acquirer, niet alleen de software.

**Bron:** [Bloomberg — Insider One Buys Bluecore in AI Marketing Drive Ahead of IPO](https://www.bloomberg.com/news/articles/2026-05-13/insider-one-buys-bluecore-in-ai-marketing-drive-ahead-of-ipo)

---

## #031 — Google AI Max verlaat beta met AI Brief en Shopping-uitbreiding

**Category:** Platform
**Slug:** `google-ai-max-uit-beta-ai-brief-shopping`
**Title:** Google AI Max verlaat beta met AI Brief en uitbreiding naar Shopping
**Dek:** Google maakte AI Max voor Search algemeen beschikbaar in mei. AI Brief laat adverteerders met eigen tekst sturen wat het systeem mag zeggen en wie het mag bereiken.

### Body

Google heeft AI Max voor Search-campagnes deze maand uit beta gehaald, een jaar na de eerste aankondiging tijdens Google Marketing Live 2025. Op de Google Ads-blog meldt het bedrijf dat campagnes met de volledige feature-set gemiddeld 7 procent meer conversies of conversie-waarde halen bij een vergelijkbare CPA of ROAS.

De grootste toevoeging is AI Brief, een tool waarmee adverteerders in eigen woorden context geven over hun bedrijf, welke boodschappen passen en welk publiek ze willen bereiken. Het systeem accepteert messaging-guidelines, matching-guidelines en audience-guidelines als instructies. AI Max breidt daarnaast uit naar Shopping-campagnes en travel-specifieke ad-formats, en Final URL Expansion ondersteunt verplichte tekst-disclaimers voor compliance-redenen.

Vanaf september 2026 worden Dynamic Search Ads, automatisch gegenereerde assets en campagne-brede broad-match-campagnes automatisch geupgrade naar AI Max. Voor adverteerders die nu nog op klassieke DSA draaien, betekent dat een verplichte migratie binnen vier maanden. Google Marketing Live 2026 op 20 mei zal naar verwachting meer details geven over hoe de upgrade verloopt en welke controles bewaard blijven.

### Stevin-perspectief

Voor performance-marketeers en bureau-eigenaars is dit niet een nieuw product, maar een verandering in wie de zoekwoorden kiest. AI Brief geeft je instrument om dat sturend bij te werken in plaats van achteraf te corrigeren. De praktische stap is: schrijf nu een brief-document per klant met messaging, no-go's en doelgroep-omschrijving, en gebruik dat als input zodra je migreert. Dan hou je in september je werk over voor de gevallen waar de prompt niet uitpakt zoals verwacht.

**Bron:** [Google — Steer performance with new AI Max features](https://blog.google/products/ads-commerce/ai-max-new-features/)
