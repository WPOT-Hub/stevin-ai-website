# CONCEPT Bijlage bij de Verwerkersovereenkomst: verwerkingsactiviteiten per dienst

> **Status: concept, nog niet geldig.** Niet aan klanten voorleggen voordat Koen dit heeft doorgenomen en de TODO-KOEN-punten zijn ingevuld.
>
> Opgesteld september 2026. Dit document is de bijlage als bedoeld in artikel 28 lid 3 AVG. Het beschrijft per dienst het doel van de verwerking, de verwerkingshandelingen, de gegevenscategorieën, de betrokkenen, de bewaartermijnen en de toegestane actiebevoegdheid.
>
> **Relatie tot de bestaande Verwerkersovereenkomst.** Deze bijlage vervangt en vervangt artikel 2 en artikel 3 van de huidige live Verwerkersovereenkomst. Artikel 4 (verplichtingen verwerker), artikel 5 (subverwerkers), artikel 6 (doorgifte), artikel 7 (beveiliging), artikel 8 (datalekken), artikel 9 (audit), artikel 10 (aansprakelijkheid) en artikel 11 (toepasselijk recht) blijven ongewijzigd van kracht. De subverwerkerslijst in artikel 5 wordt vervangen door CONCEPT_SUBVERWERKERS.md.
>
> **Let op:** artikel 4 van de huidige Verwerkersovereenkomst zegt "binnen 60 dagen na einde overeenkomst". Dit klopt niet meer: het bewaarschema in sectie 0 van deze bijlage (ontleend aan A11 van de Algemene Voorwaarden) geldt in de plaats daarvan. Bij publicatie moet ook het bewaarartikel in de Verwerkersovereenkomst worden bijgewerkt.

---

## Sectie 0. Bewaarschema (woordelijk gelijk in alle klantdocumenten)

Na beeindiging bewaren wij je gegevens dertig dagen, uitsluitend zodat je ze kunt exporteren of terugkrijgen. Je kiest zelf tussen teruggave en verwijdering. Uiterlijk op dag zevenendertig verwijderen wij ze uit onze actieve systemen, inclusief de daarvan afgeleide gegevens en tussenbestanden. Geïsoleerde back-ups zetten wij niet terug voor andere doeleinden en worden uiterlijk negentig dagen na beeindiging overschreven. Beveiligings- en auditlogs bewaren wij maximaal twaalf maanden. Contracten, facturen en andere gegevens die onder een wettelijke administratieplicht vallen, bewaren wij uitsluitend gedurende die wettelijke termijn.

> **Toelichting:** dit schema staat woordelijk identiek in artikel A11 van de Algemene Voorwaarden. Bij publicatie moet het ook identiek in de Privacyverklaring en de Geheimhoudingsovereenkomst staan. Zie de inconsistentietabel in RAPPORT.md.

---

## Sectie 1. B-1: Het platform (signalering, analyse, rapportage)

**Doel:** Levering van het Stevin-platform voor de duur van het abonnement, inclusief koppelingen met marketingbronnen, meting, signalering, dashboards, rapportage en de AI-adviseur.

**Verwerkingshandelingen:**
- Ophalen van data via OAuth-koppelingen (lezen via API)
- Geautomatiseerd analyseren en interpreteren
- Opslaan in de centrale database
- Presenteren via het klantportaal en dashboards
- Genereren van signalen, adviezen en rapportages
- Verzenden van notificaties naar platformgebruikers

**Gegevenscategorieën:**
- Contactgegevens van platformgebruikers: naam, zakelijk e-mailadres, rol
- Campagne- en advertentiedata: instellingen, budgetten, advertentie-inhoud, vertoningen, klikken, kosten
- Zoekgedragsdata: search queries zoals beschikbaar via Search Console (anoniem geaggregeerd)
- Analyticsdata: sessies, paginabezoeken, gebeurtenissen via GA4 (pseudoniem)
- Leads en prospects in gekoppeld CRM: naam, e-mailadres, telefoonnummer, bedrijf, functie, dealdata
- Conversiedata: klik-ID's, formulierinzendingen (deels anoniem of pseudoniem)

**Betrokkenen:**
- Gebruikers van de klant (contactpersonen en beheerders die het platform gebruiken)
- Eindklanten van de klant voor zover aanwezig in gekoppelde systemen (CRM, GA4)
- Leads en prospects in het CRM of de advertentieaccounts van de klant

**Bewaartermijn:** Conform het schema in sectie 0 van deze bijlage.

**Actiebevoegdheid:** Niveau 1 (voorstellen) als standaard voor alle advertentieaccounts, tenzij per koppeling schriftelijk anders is vastgelegd conform artikel A6 van de Algemene Voorwaarden.

---

## Sectie 2. B-2: Campagnebeheer

**Doel:** Uitvoering van overeengekomen campagnebeheer en -optimalisatie (Module 2 van de Algemene Voorwaarden): het beheren, aanpassen en optimaliseren van campagnes, budgetten, zoekwoorden en advertenties in klantsystemen.

**Verwerkingshandelingen:**
- Lezen van campagnedata en accountinstellingen
- Aanpassen van campagne-instellingen, biedstrategieen, advertentie-inhoud en budgetten
- Aanmaken of pauzeren van campagnes, advertentiegroepen en advertenties
- Aanpassen van landingspagina's die onder het beheer vallen
- Bijhouden van een dossier van uitgevoerde acties, de reden en de uitkomst

**Gegevenscategorieën:**
- Campagne- en advertentiedata: instellingen, budgetten, advertentie-inhoud, prestatiedata
- Audience-data: doelgroepsegmenten zoals remarketing-lijsten op basis van pixelgedrag (pseudoniem)

**Betrokkenen:**
- Eindklanten en prospects van de klant als onderdeel van advertentiedoelgroepen (anoniem of pseudoniem via het advertentieplatform)
- Contactpersonen bij de klant als beheerders van de accounts

**Bewaartermijn:** Conform het schema in sectie 0 van deze bijlage. Het dossier van uitgevoerde acties wordt bij beeindiging overgedragen aan de klant (zie artikel M2.3 en A11 van de Algemene Voorwaarden).

**Actiebevoegdheid:** Niveau 2 (uitvoeren na goedkeuring door de klant) of niveau 3 (zelfstandig uitvoeren binnen vastgelegde grenzen), afhankelijk van wat per koppeling schriftelijk is vastgelegd conform artikel A6 van de Algemene Voorwaarden. Goedkeuring voor elke individuele actie ligt altijd bij de klant of een door de klant aangewezen persoon.

---

## Sectie 3. B-3: Acties door medewerkers en AI-agents in klantaccounts

**Doel:** Uitvoering van individuele, vooraf bevoegde acties in klantsystemen, door onze medewerkers, door door ons ingeschakelde externen, of door geautomatiseerde systemen (AI-agents), conform het bevoegdheidskader uit artikel A6 van de Algemene Voorwaarden.

**Verwerkingshandelingen:**
- Uitvoeren van afgebakende handelingen binnen de schriftelijk vastgelegde grenzen (accounts, soorten acties, budgetten, drempels)
- Vastleggen van wat is gedaan, wanneer, op grond waarvan, en wie of wat het heeft uitgevoerd en goedgekeurd
- Indien communicatie namens de klant onder de bevoegdheid valt: opstellen en verzenden van berichten

**Gegevenscategorieën:**
- Campagne- en advertentiedata: zelfde als B-2
- Communicatiedata: indien de bevoegdheid communicatie namens de klant omvat, dan de inhoud van die communicatie

**Betrokkenen:**
- Eindklanten en prospects van de klant voor zover zij doelgroep zijn van de betreffende acties
- Ontvangers van communicatie indien communicatie-acties zijn overeengekomen

**Bewaartermijn:** Conform het schema in sectie 0 van deze bijlage.

**Actiebevoegdheid:** Niveau 2 of niveau 3, zoals per koppeling en per klant schriftelijk vastgelegd. AI-agents mogen alleen op niveau 3 zelfstandig handelen, en alleen binnen de grenzen die voor dat account zijn vastgelegd. Goedkeuring voor een actie op niveau 2 ligt altijd bij de klant.

> **Noot voor de implementatie:** De bevoegdhedenmatrix per klant (welke accounts, welke soorten acties, welke budgetten, wie mag goedkeuren) maakt deel uit van de opdrachtbevestiging of dienstverleningsovereenkomst, niet van deze bijlage. Deze bijlage beschrijft het kader; de matrix vult het per klant in.

---

## Sectie 4. B-4: Bouw en hosting van landingspagina's

**Doel:** Ontwerp, bouw en hosting van landingspagina's op het domein van de klant (Module 3 van de Algemene Voorwaarden).

**Verwerkingshandelingen:**
- Bouwen en beheren van webpagina's
- Hosten op Stevin-infrastructuur (Vercel), gekoppeld aan het domein van de klant via een CNAME
- Verwerken van formulierinzendingen, indien de klant dat heeft ingericht
- Overdragen van bestanden en inhoud bij beeindiging of op verzoek

**Gegevenscategorieën:**
- Bezoekersdata: IP-adressen, tijdstempels, browsertypes (geanonimiseerd voor meting via meetinrichting)
- Formulierinzendingen: naam, e-mailadres, telefoonnummer en andere velden die de klant configureert

**Betrokkenen:**
- Bezoekers van de pagina (eindklanten en prospects van de klant)

**Bewaartermijn:** Conform het schema in sectie 0 van deze bijlage. Formulierinzendingen worden doorgezet naar het CRM of de tool die de klant aanwijst; onze opgeslagen kopie valt onder het schema in sectie 0.

**Actiebevoegdheid:** Niet van toepassing (er is geen toegang tot bestaande accounts van de klant bij het bouwen van een landingspagina). Beheer na oplevering valt onder de gemaakte afspraken over beheer en kan vallen onder B-2 of B-3.

---

## Sectie 5. B-5: Meetinrichting

**Doel:** Inrichten van meetinfrastructuur voor campagne- en websitemeting, waaronder tagbeheer, gebeurtenisregistratie en conversiekoppeling (bijv. GA4, Google Ads-conversies, Meta Pixel).

**Verwerkingshandelingen:**
- Inrichten van tags en scripts in de taglayer (bijv. Google Tag Manager)
- Configureren van gebeurtenissen, doelen en conversies in GA4 en advertentieplatforms
- Koppelen van conversiesignalen aan advertentieaccounts
- Valideren van datakwaliteit en correctheid van de meting

**Gegevenscategorieën:**
- Websitebezoekersdata: pseudonieme gebruikers-ID's, gedragsgebeurtenissen, paginabezoeken
- Conversiedata: anonieme of gehashte formulier- en transactiedata
- Campagnekoppeling: klik-ID's van advertentieplatforms

**Betrokkenen:**
- Websitebezoekers en eindklanten van de klant die converteren of de website bezoeken

**Bewaartermijn:** Data die via de meting in GA4 of het advertentieplatform belandt, valt onder de retentie-instellingen van die platforms; de klant beheert die instellingen zelf. Onze eigen kopieën van configuraties en validatielogs: conform het schema in sectie 0 van deze bijlage.

**Actiebevoegdheid:** Niveau 2 (inrichten na goedkeuring van de klant). Geen zelfstandige toegang tot de data in externe analyseomgevingen buiten het overeengekomen ophalen voor rapportage (B-1).

---

## Sectie 6. B-6: CRM- en e-mailkoppelingen

**Doel:** Signalering en analyse op basis van CRM-data en inboxkoppelingen; uitvoeren van e-mailacties indien dat is overeengekomen.

**Verwerkingshandelingen:**
- Lezen van CRM-records (contacten, deals, activiteiten, notes)
- Lezen van e-mailberichten of -metadata indien de klant een inboxkoppeling heeft ingeschakeld
- Genereren van signalen, adviezen en opvolgingstaken op basis van CRM- en e-maildata
- Verzenden van e-mails namens de klant indien dat uitdrukkelijk is overeengekomen en de klant daarvoor niveau 2 of niveau 3 heeft vastgelegd

**Gegevenscategorieën:**
- Contactgegevens: naam, e-mailadres, telefoonnummer, organisatie, functie
- Communicatiedata: e-mailonderwerpen en e-mailinhoud voor zover de klant die koppelt, historische correspondentie
- Dealdata: dealfase, waarde, activiteiten, aantekeningen

**Betrokkenen:**
- Contactpersonen, leads en eindklanten in het CRM van de klant
- Gesprekspartners in de gekoppelde inbox

**Bewaartermijn:** Conform het schema in sectie 0 van deze bijlage. Gelezen e-mailinhoud wordt niet langer bewaard dan nodig voor het genereren van de betreffende signalen en adviezen.

**Actiebevoegdheid:** Niveau 1 (lezen en signaleren) als standaard. Niveau 2 of niveau 3 voor het versturen van e-mails of het bijwerken van CRM-records namens de klant, alleen indien dat uitdrukkelijk is overeengekomen en per koppeling is vastgelegd.

> **TODO-KOEN:** Welke CRM-systemen zijn per klant actief gekoppeld? Bevestig dit per klant, zodat de relevante CRM-leveranciers als subverwerker in Deel A van CONCEPT_SUBVERWERKERS.md kunnen worden opgenomen. Voor Boersma Witgoed: is GoHighLevel de actieve CRM-koppeling?

---

## Sectie 7. B-7: Telefonie en gesprekstranscripten

**Doel:** Verwerking van gespreksopnamen en transcripten voor kwaliteitsanalyse, opvolgingssignalen of andere overeengekomen doeleinden, op verzoek en met kennisgeving van de klant.

**Verwerkingshandelingen:**
- Ophalen van gespreksopnamen of transcripten via de telefonie-integratie (CloudTalk of vergelijkbare dienst)
- Analyseren van inhoud voor signalering of opvolging
- Opslaan van transcripten in de database
- Genereren van adviezen of opvolgingstaken op basis van gesprekken

**Gegevenscategorieën:**
- Stemdata: geluidsopnamen van telefoongesprekken
- Transcriptiedata: tekstuele weergave van de inhoud van gesprekken
- Gespreksmetadata: tijdstip, duur, beller-ID, gespreksrichting, klantnummer

**Betrokkenen:**
- Bellers en gebelden (eindklanten, prospects en medewerkers van de klant)

**Bewaartermijn:** Conform het schema in sectie 0 van deze bijlage. Stemopnamen worden niet langer bewaard dan voor het overeengekomen doel noodzakelijk.

**Actiebevoegdheid:** Niveau 1 (analyse en rapportage). Geen inhoudswijzigingen in externe telefonie-omgevingen en geen uitgaande acties op basis van gesprekken zonder expliciete goedkeuring door de klant.

> **TODO-KOEN:** Is telefonieverwerking voor een van de huidige klanten actief? Zo ja, beantwoord dan voor die klant de volgende vragen voordat deze dienst live gaat:
>
> 1. Welke dienst wordt gebruikt (CloudTalk, GoHighLevel of anders)? Is de verwerkersovereenkomst met die leverancier getekend?
> 2. Worden bellers voorafgaand aan het gesprek geïnformeerd dat het gesprek wordt opgenomen en verwerkt? In Nederland is dat verplicht voor de klant als verwerkingsverantwoordelijke; de klant is verantwoordelijk voor die melding.
> 3. In Belgie geldt dat alle deelnemers aan een gesprek toestemming moeten geven voor opname. Als klanten Belgische eindklanten hebben, is een Belgisch nummer of een Belgisch privegesprek extra aandachtspunt.
> 4. Wat is de bewaartermijn die de klant wenst voor opnamen? Is die korter dan 90 dagen (de back-upgrens in sectie 0)?

---

## Sectie 8. B-8: Werk door ingeschakelde externen

**Doel:** Uitvoering van werkzaamheden in het kader van een of meer van de diensten B-2 t/m B-7 door freelancers of externe leveranciers die door Stevin zijn ingeschakeld.

**Verwerkingshandelingen:** Zelfde als de dienst waarvoor de externe is ingezet (zie B-2 t/m B-7 hierboven).

**Gegevenscategorieën:** Zelfde als de dienst waarvoor de externe is ingezet.

**Betrokkenen:** Zelfde als de dienst waarvoor de externe is ingezet.

**Bewaartermijn:** Externen verwijderen de gegevens bij het einde van de opdracht, conform de overeenkomst die zij met Stevin hebben gesloten (CONCEPT_LEVERANCIER_EN_FREELANCER.md). De bewaartermijn voor de gegevens bij Stevin zelf is conform het schema in sectie 0 van deze bijlage.

**Actiebevoegdheid:** Externen handelen binnen dezelfde grenzen als Stevin's eigen medewerkers voor dezelfde dienst. De bevoegdhedenmatrix per klant geldt ongeacht wie de actie uitvoert.

> **Voor de jurist:** Of een externe als subverwerker wordt aangemerkt (artikel 28 lid 4 AVG) of als persoon die onder de verantwoordelijkheid van Stevin verwerkt (artikel 29 AVG), hangt af van de feitelijke situatie. Werkt de externe in Stevin's omgeving, op Stevin's accounts en met door Stevin verstrekte toegang, dan is hij een persoon onder Stevin's verantwoordelijkheid en hoeft hij niet als subverwerker aan klanten te worden gemeld. Werkt hij in zijn eigen omgeving, met zijn eigen tools of in zijn eigen cloudopslag, dan is hij subverwerker en moet hij wel worden gemeld (inclusief de 30-dagenperiode voor bezwaar door de klant).
>
> **TODO-KOEN:** Leg per actieve externe vast of hij in Stevin's omgeving werkt of in zijn eigen omgeving. Dat bepaalt of hij op de subverwerkerslijst komt.
