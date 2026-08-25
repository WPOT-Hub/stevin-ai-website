# Juridische doorlichting, 25 aug 2026

Doorlichting van de vier klantdocumenten (Algemene Voorwaarden, Verwerkersovereenkomst, Privacyverklaring, NDA) tegen drie meetlatten: wat het product echt doet, wat het aanbod op /tarieven belooft, en hoe vergelijkbare aanbieders het inrichten.

Bronnen: een vijandige tweede lezing door Codex, een eigen controle van de bevindingen tegen de code, en een structuurvergelijking met Aizy (tryaizy.com) en Swoep (swoep.ai). Van die twee is uitsluitend gekeken welke onderwerpen ze afdekken en hoe ze het opbouwen. Er is geen tekst overgenomen: juridische teksten zijn auteursrechtelijk beschermd en beschrijven bovendien hun product, niet het onze.

**Voorbehoud:** dit is geen juridisch advies. Aan het eind staat welke punten een jurist vereisen.

---

## 1. Geverifieerd, niet aangenomen

Codex noemde als zwaarste punt dat de voorwaarden autonome AI-acties ontkennen terwijl het platform ze uitvoert. **Dat is nagetrokken en het klopt niet voor de huidige situatie.**

- Artikel 3 stelt: "het platform wijzigt uit zichzelf niets in je advertentieaccounts" en een voorbereide actie gebeurt "pas na expliciete review door een mens".
- In de code bestaat `pauseMetaCampaign` (src/alerts/actions.ts), maar die wordt **alleen geïmporteerd en nergens aangeroepen**. Er is geen cron of job die hem draait.
- Sinds 25 aug vraagt de klant-koppeling (portalConnect.ts) bovendien geen schrijfrechten meer op Meta, alleen lezen.

Conclusie: de tekst was op 25 aug feitelijk juist, maar dat is niet het punt.

**Uitgangspunt van Koen (25 aug): schrijf de voorwaarden voor wat het platform KAN, niet voor wat vandaag aanstaat.** Elke tekstwijziging kost een versiebump en dus een ronde waarin alle klanten opnieuw akkoord moeten geven. Dat wil je niet elke keer dat er een functie aangaat. Bovendien is inmiddels bevestigd dat agents campagnewerk gaan uitvoeren waar dat is overeengekomen.

Dat draait de conclusie om: punt 1 is **geen voorbereidend werk maar het eerste dat af moet**, en de tekst moet het volledige bereik dekken.

De constructie die dat oplost zonder herhaald bumpen: **de voorwaarden beschrijven de buitengrens en het mechanisme, de dienstverleningsovereenkomst per klant zet vast wat er feitelijk aanstaat.** Dus in de voorwaarden: Stevin kan acties voorstellen, na goedkeuring uitvoeren, of binnen vastgelegde grenzen zelfstandig uitvoeren; per koppeling legt de klant vast welke van de drie geldt, binnen welke accounts, budgetten en drempels; alles wordt gelogd en is opvraagbaar; buiten de bevoegdheid handelen is een tekortkoming van Stevin. Een functie aanzetten is dan een wijziging in de instelling van die klant, niet in het document.

Zin die dan uit artikel 3 moet, omdat hij de buitengrens juist dichttimmert: "het platform wijzigt uit zichzelf niets in je advertentieaccounts".

---

## 2. Waar het aanbod en de voorwaarden uit elkaar lopen

Dit is het meest Stevin-specifieke deel en kwam niet uit de vergelijking met anderen, maar uit het naast elkaar leggen van /tarieven en de voorwaarden.

| Belofte op /tarieven | Staat het in de voorwaarden | Risico |
|---|---|---|
| "Geen marge op je mediabudget" | Half. Artikel 5 zegt dat het budget niet op onze factuur staat en rechtstreeks aan het platform wordt betaald. De belofte zelf (geen commissie, geen opslag) staat er niet. | Dit is je scherpste onderscheid tegenover bureaus. Als het alleen in verkoopcopy staat en niet in het contract, is het een marketingclaim in plaats van een afspraak. Juist dit hoor je contractueel te durven vastleggen. |
| Jaarbetaling met korting (1.399 vs 1.499, 399 vs 499) | Nee. Artikel 5 kent alleen maandelijkse facturatie vooraf; artikel 11 alleen maandelijkse opzegging. | Iemand betaalt een jaar vooruit met korting en zegt na een maand op. Wat dan? Geen terugbetalingsregel, geen looptijdafspraak. Dit is een gat dat geld kost. |
| Drie sporen, waarvan "wij starten je op" expliciet tijdelijk is (zes tot twaalf maanden, daarna 399) | Nee. Er is geen begrip van sporen, geen overgang, geen verschil in looptijd. | De overgang naar 399 is een prijs- en scopewijziging die nergens is geregeld. |
| "Alsnog zelf overnemen kan altijd" en "kun je later omdraaien zonder dat je iets kwijtraakt" | Nee. | Dit is een harde belofte over overdraagbaarheid. Zonder clausule is het een intentie. |
| "Elk besluit vastgelegd met de reden erbij" en "een dossier dat van jou is" | Nee. Artikel 9 zegt alleen dat ingebrachte data van de klant blijft. Het dossier en de besluitenlog zijn ons werkproduct en niet toegewezen. | Dit ondergraaft "je marketing-brein blijft van jou". Precies de belofte waarop je verkoopt, is juridisch niet gedekt. |
| "Pay per fix, prijs vooraf" | Nee. | Meerwerk zonder contractuele basis. |
| Prijs geldt voor "een bedrijf met een merk en een winkel"; meer vestigingen, merken of webshops kosten meer | Nee. | Zonder definitie ontstaat discussie over wat een extra vestiging of merk is, precies bij een klant als Cardoen met meerdere vestigingen. |
| Diagnose als voordeur, "binnen twee weken", op eigen cijfers | Nee. | Het instapproduct is nergens geregeld: prijs, levering, wat als het uitloopt. |

Losse vondst, al gerepareerd: de voorwaarden somden de gedekte systemen op zonder **app.stevin.ai** (het klantportaal) en **crm.stevin.ai**. Aangevuld, plus een zin dat de opsomming een toelichting is en geen beperking, zodat het volgende subdomein niet opnieuw buiten de tekst valt.

---

## 2b. De grootste bevinding: we verkopen diensten, de voorwaarden dekken alleen een product

Getoetst aan wat er echt op de factuur staat bij Boersma Witgoed, de eerste betalende klant (facturen 2026-023 en 2026-024, 24 aug 2026):

| Wat we factureren | Wat het is | Gedekt in de voorwaarden |
|---|---|---|
| Opstart reparatiekanaal, 1.600 euro eenmalig (regulier 3.200, Founding Partner-tarief) | Een project: landingspagina bouwen, Google Ads-campagnes opzetten, meting inrichten | Nee. Geen woord over opstart, oplevering, termijn of wat er geldt als het niet af komt. |
| Stevin-abonnement, 499 per maand, "inclusief het AI-verbruik binnen het platform" | Software | Ja, hier zijn de voorwaarden voor geschreven. |
| Retainer beheer en optimalisatie, 399 per maand: "uren en AI-verbruik buiten het platform, beheer van de campagnes, aanpassingen aan de landingspagina en kleine ontwikkelklussen" | Menselijke dienstverlening plus ontwikkelwerk | Nee. Niets over uren, meerwerk, wie de campagne beheert, aansprakelijkheid voor gemaakte wijzigingen. |
| De landingspagina draait op reparatie.boersmawitgoed.nl, gebouwd door ons, gehost op onze Vercel, via een CNAME in hun DNS | Bouw en hosting op het domein van de klant | Nee. Geen eigendom van de gebouwde site, geen garantie, geen afspraak over beschikbaarheid of wat er bij vertrek gebeurt. |

**De kern:** de Algemene Voorwaarden beschrijven een SaaS-platform ("Stevin levert twee dingen"), terwijl we feitelijk drie dingen verkopen: software, mensenwerk en bouwwerk. De helft van de omzet bij Boersma (399 van de 898 per maand, plus de volledige opstart van 1.600) valt buiten de tekst.

Dat is een groter gat dan welk artikel-28-detail ook, en het is meteen zichtbaar voor iedereen die de factuur naast de voorwaarden legt.

Daar komen twee dingen bovenop die het aanbod uitbreiden:

- **Externen op klantopdrachten.** Voor bepaalde klanten worden freelancers en externe leveranciers ingezet. Zij krijgen daarmee toegang tot advertentieaccounts, CRM-gegevens en mogelijk e-mail van de klant. Dat moet twee kanten op geregeld: naar de klant toe (subverwerker of onder onze verantwoordelijkheid, met dezelfde geheimhouding en dezelfde plichten doorgelegd, en wij blijven volledig aansprakelijk), en naar de freelancer toe (een eigen geheimhoudings- en verwerkingsafspraak, rug aan rug met wat wij de klant beloven). Nu bestaat geen van beide. De verwerkersovereenkomst noemt alleen technische leveranciers, geen mensen.
- **Agentic campagnebeheer.** Waar campagnewerk is overeengekomen gaan agents dat deels uitvoeren. Zie de opmerking bij punt 1: dit maakt het schrijven van het bevoegdheidskader urgent in plaats van voorbereidend.

## 3. Wat de vergelijking leert

Aizy is de dichtstbijzijnde spiegel: Nederlands, advertentieoptimalisatie met AI, zelfde rechtbank (Zeeland-West-Brabant). Swoep zit dichter op ons agent-verhaal (koppelt aan bestaande systemen, voert acties uit).

Waar zij iets hebben dat wij missen:

- **Aizy regelt expliciet dat de klant verantwoordelijk blijft voor budgetten en resultaten ondanks automatisering.** Wij automatiseren meer dan zij en hebben dit niet.
- **Aizy heeft een prijswijzigingsartikel, een looptijdartikel en een klachtentermijn.** Wij hebben geen van drieën uitgewerkt.
- **Aizy legt de aansprakelijkheid op zes maanden vergoedingen.** Wij zitten op drie maanden met een maximum van 5.000 euro, wat in de eerste maanden vrijwel nul is.
- **Aizy noemt zijn subverwerkers concreet (AWS, Databricks).** Wij noemen er meer, maar de lijsten in de verwerkersovereenkomst en de privacyverklaring komen niet overeen.
- **Swoep zegt expliciet dat klantdata niet wordt gebruikt om algemene modellen te trainen.** Wij beloven dat ook, maar in twee documenten net anders geformuleerd ("geen training op klantdata" tegenover "waar mogelijk gestript").

Waar wij het beter doen, en wat je moet vasthouden:

- Onze opzegging is maandelijks; Aizy hanteert twaalf maanden met de volle som bij tussentijds stoppen. Dat past bij "je gaat niet vooruitbetalen voor iets dat we samen willen beeindigen". Niet overnemen dus.
- Aizy staat zichzelf in de verwerkersvoorwaarden toe om data te gebruiken voor AI-training en algoritme-ontwikkeling. Wij beloven het tegenovergestelde. Dat is een echt verschil in ons voordeel, mits onze eigen tekst consistent is (zie hierboven).
- Onze meldtermijn bij een datalek is 24 uur, bij Aizy 48.

---

## 4. Volgorde van aanpakken

Uitgangspunt: **één keer goed schrijven voor het volledige bereik**, zodat er niet per functie of per klant opnieuw gebumpt hoeft te worden.

**Moet in de eerstvolgende versie (voor Cardoen en voor de volgende Boersma-achtige klant):**

1. **Diensten naast software.** De voorwaarden dekken nu alleen het platform. Voeg toe: opstart en projectwerk (oplevering, termijn, meerwerk), doorlopend beheer op uren, ontwikkel- en bouwwerk, en bouw of hosting van een pagina op het domein van de klant (eigendom van wat we bouwen, wat er bij vertrek gebeurt). Zonder dit valt bij Boersma de helft van de maandomzet en de volledige opstart buiten het contract.
2. **Bevoegdheidskader voor acties, inclusief agents.** Zie punt 1 hierboven: buitengrens in de voorwaarden, feitelijke instelling per klant. Dit dekt meteen het handmatige beheer (mensen die in accounts werken) en het agentic beheer dat eraan komt.
3. **Externen.** Freelancers en externe leveranciers die aan klantopdrachten werken: doorgelegde geheimhouding, dezelfde verwerkingsplichten, wij blijven aansprakelijk, en de klant weet dat het kan. Plus rug aan rug een eigen overeenkomst met die externen zelf.
4. **AI Act artikel 50 in het product.** Sinds 2 aug 2026 moet bij de eerste interactie zichtbaar zijn dat je met AI praat. Een juridische pagina volstaat niet. Dit is productwerk, geen tekstwerk. (Deels geregeld voor de portal-chat; verifieren waar het nog ontbreekt.)
5. **Verwerkersovereenkomst compleet maken.** De opsomming dekt niet wat we echt doen: e-mail lezen, audio, transcriptie, AI-inference, communicatie genereren, acties uitvoeren. Een klantjurist valt hier als eerste over.
6. **De beloftes uit het aanbod contractueel maken**, met voorrang voor: geen marge op mediabudget, eigendom van dossier en besluitenlog, en de jaarbetaling-versus-opzegging-mismatch.

**Kort daarna:** bewaartermijnen gelijktrekken (de vier documenten noemen nu 30, 60, 90 en 7 tot 30 dagen door elkaar), aansprakelijkheid herzien, subverwerkerslijsten gelijk maken, looptijd en prijswijziging uitwerken.

**Vereist echt een jurist, niet alleen een tekstwijziging:** de artikel 28-conformiteit van de verwerkersovereenkomst, de aansprakelijkheidsregeling (zeker richting Belgische klanten, waar onrechtmatige B2B-bedingen strenger worden getoetst), de opname- en transcriptieregeling (in Belgie geldt opname in beginsel alleen met toestemming van alle deelnemers), en de vraag hoe de documenten aantoonbaar worden overeengekomen (een webpagina is geen overeenkomst; onder Nederlands recht moeten voorwaarden voor of bij het sluiten beschikbaar zijn).

---

## 5. Aandachtspunt bij doorvoeren

Elke tekstwijziging vraagt een versiebump, en het akkoord-systeem legt een hash van het document vast op het moment van tekenen. Verandert de tekst zonder bump, dan komt de vastgelegde hash niet meer overeen met wat er live staat en verzwakt het bewijs. Bump je wel, dan moeten bestaande klanten opnieuw akkoord geven.

Doe daarom **een versiebump voor het hele pakket**, niet per wijziging. Verzamel eerst alle aanpassingen, dan één keer bumpen, dan één ronde opnieuw accepteren. Dat pad werkt sinds vandaag ook echt (het was tot 25 aug stuk voor iedere gewone gebruiker).
