# CONCEPT Subverwerkerslijst Stevin.AI

> **Status: concept, nog niet geldig.** Niet publiceren voordat Koen dit heeft doorgenomen en de TODO-KOEN-punten zijn ingevuld.
>
> Opgesteld september 2026. Dit document is de gezaghebbende lijst van alle derde partijen die namens Stevin persoonsgegevens verwerken. Het vervangt de soms uiteenlopende lijsten in de Verwerkersovereenkomst en de Privacyverklaring.
>
> **Opbouw:** Deel A beschrijft subverwerkers in de zin van artikel 28 lid 4 AVG: partijen die in opdracht van Stevin persoonsgegevens verwerken die toebehoren aan klanten van Stevin. Deel B beschrijft verwerkers die Stevin inschakelt voor haar eigen verwerkingen als verwerkingsverantwoordelijke (websiteleads, marketing, eigen adminstratie).

---

## Deel A. Subverwerkers voor klantdata

De partijen in dit deel verwerken gegevens die toebehoren aan klanten van Stevin of aan de eindklanten van die klanten. De Verwerkersovereenkomst en haar bijlage zijn hierop van toepassing. Wijzigingen in dit deel worden minimaal 30 dagen vooraf gemeld aan klanten.

| Naam | Rechtsvorm en land | Dienst | Gegevenscategorieën | Doorgiftegrondslag |
|------|--------------------|--------|---------------------|--------------------|
| **Supabase Inc.** | Corp., VS (verwerking in EU-regio Frankfurt) | Databasehosting: opslag van alle klantdata, campagnedata, CRM-koppelingsdata | Alle persoonsgegevens die via het platform worden verwerkt | SCC (EU 2021/914) + EU-verwerking |
| **Amazon Web Services EMEA SARL** | SARL, Luxemburg (EU) | Compute en objectopslag: verwerking en opslag in EU-Frankfurt | Alle persoonsgegevens die via de infrastructuur worden verwerkt | Binnen EER, geen doorgifte |
| **Vercel Inc.** | Corp., VS (voorkeur EU-regio) | Frontend-hosting: de portaalomgeving die klanten en hun medewerkers gebruiken | Account- en sessiedata van platformgebruikers | SCC (EU 2021/914) + voorkeur EU-verwerking |
| **Cloudflare Inc.** | Corp., VS | CDN, DNS en DDoS-bescherming: alle verkeer naar Stevin-domeinen loopt via Cloudflare | IP-adressen, HTTP-metadata van bezoekers | SCC (EU 2021/914) |
| **Anthropic PBC** | Corp., VS | AI-inferentie: primaire AI-verwerking binnen het platform (Claude-modellen) | Campagnedata en andere gegevens in prompts, uitsluitend voor de betreffende klant | SCC (EU 2021/914); geen training op klantdata |
| **OpenAI Ireland Ltd** | Ltd, Ierland (EU) | AI-inferentie: aanvullende AI-verwerking | Campagnedata en andere gegevens in prompts | Binnen EER; geen training op klantdata |
| **Mistral AI SAS** | SAS, Frankrijk (EU) | AI-inferentie: EU-gebaseerde AI-verwerking | Campagnedata en andere gegevens in prompts | Binnen EER; geen training op klantdata |
| **Resend Inc.** | Corp., VS (verwerking in EU waar mogelijk) | Transactionele e-mail: platformnotificaties, rapportages | E-mailadressen van platformgebruikers, berichtinhoud | SCC (EU 2021/914) |
| **Slack Technologies LLC** | LLC, VS | Interne notificaties: Stevin-medewerkers ontvangen meldingen over klantaccounts via Slack | Kan beknopte klantdata bevatten in notificatieteksten | SCC (EU 2021/914) |
| **CloudTalk a.s.** | a.s., Slowakije (EU) | Telefonie en gespreksopnamen: indien telefonie is overeengekomen | Stemdata, transcriptiedata, gespreksmetadata | Binnen EER |
| **Google Ireland Ltd** | Ltd, Ierland (EU) | Google Ads API, GA4 API, Search Console API: ophalen van campagne- en analysedata namens klanten | Campagnedata (anoniem of pseudoniem), conversiepixels | Binnen EER |
| **Ingeschakelde externen** | Wisselend (zie hieronder) | Campagnebeheer, bouw, meetinrichting of andere Module-2 en Module-3-werkzaamheden | Zelfde als de dienst waarvoor zij worden ingezet | Binnen EER indien van toepassing; anders SCC |

> **TODO-KOEN: verwerkersovereenkomsten AI-leveranciers.** De AV stellen dat met Anthropic, OpenAI en Mistral is vastgelegd dat zij niet op klantdata trainen. Bevestig dat de data-processing addenda met al deze partijen daadwerkelijk getekend zijn. Zonder getekende addenda belooft het contract iets namens een ander.

> **TODO-KOEN: Cloudflare.** Is de verwerkersovereenkomst met Cloudflare afgesloten? Cloudflare verwerkt IP-adressen van alle bezoekers en maakt die op verzoek beschikbaar. Voor de DPA is dit relevant.

> **TODO-KOEN: ingeschakelde externen.** Per actieve externe vastleggen: naam, rechtsvorm, land, voor welke klant ingezet, welke gegevens zij verwerken, en of zij in Stevin's omgeving werken (persoon onder Stevin's gezag, geen subverwerker) of in hun eigen omgeving (dan wel subverwerker, dan ook aan klant melden). Huidige status: nog niet per persoon vastgelegd.

> **TODO-KOEN: GoHighLevel.** Voor sommige klanten is GoHighLevel gebruikt als CRM en telefonieplafform. Als Stevin GoHighLevel-data van een klant beheert of benadert, is GoHighLevel een subverwerker en moet het op deze lijst staan. Bevestig per klant of GoHighLevel actief is en in welke rol.

---

## Deel B. Verwerkers voor Stevin's eigen verwerkingen

De partijen in dit deel verwerken gegevens waarvoor Stevin zelf verwerkingsverantwoordelijke is: websiteleads, eigen marketing, contractadministratie en beveiligingsmonitoring. De Verwerkersovereenkomst die Stevin met haar klanten sluit, is hierop niet van toepassing.

| Naam | Rechtsvorm en land | Dienst | Gegevenscategorieën | Doorgiftegrondslag |
|------|--------------------|--------|---------------------|--------------------|
| **Supabase Inc.** | Corp., VS (EU-regio) | Opslag van websiteleads en interne CRM-data van Stevin | Naam, e-mail, organisatie van websitebezoekers die contact opnemen | SCC (EU 2021/914) |
| **Resend Inc.** | Corp., VS | Verzending van marketinge-mails en opvolgingse-mails door Stevin | E-mailadressen van prospects | SCC (EU 2021/914) |
| **Google Ireland Ltd** | Ltd, Ierland (EU) | Google Analytics 4 op stevin.ai, Google Ads conversitemeting, Google Search Console | Pseudonieme bezoekerdata, cookie-ID's, IP-adressen (geanonimiseerd) | Binnen EER |
| **Microsoft Corporation** | Corp., VS | Microsoft Clarity op stevin.ai (heatmaps, sessie-opnames) | Pseudonieme gedragsdata van websitebezoekers | SCC (EU 2021/914) |
| **Apollo.io Inc.** | Corp., VS | B2B-dataverrijking voor Stevin's eigen prospecting | Openbaar beschikbare zakelijke contactgegevens | SCC (EU 2021/914) |
| **Apify Technologies s.r.o.** | s.r.o., Tsjechie (EU) | Webcrawling voor openbare bedrijfsinformatie t.b.v. Stevin's prospecting | Openbaar beschikbare bedrijfs- en contactdata | Binnen EER |
| **Reoon Technology** | Wisselend | E-mailvalidatie voor Stevin's eigen verzendlijsten | E-mailadressen (geverifieerd, geen inhoud) | TODO-KOEN: land en doorgiftegrondslag |
| **Cloudflare Inc.** | Corp., VS | CDN, DNS, beveiligingslogging voor stevin.ai | IP-adressen, verkeersmetadata | SCC (EU 2021/914) |

> **TODO-KOEN: Reoon.** Bevestig de rechtsvorm, het land en de doorgiftegrondslag voor Reoon Technology.

> **Noot.** Apollo.io en Apify verwerken openbaar beschikbare zakelijke gegevens voor Stevin's eigen prospecties. Zij zijn verwerkers voor Stevin's verwerkingen als verwerkingsverantwoordelijke, niet subverwerkers onder de klant-DPA. Stevin is verwerkingsverantwoordelijke voor die prospecting-data.

---

## Bijlage: toelichting op de doorgiftegrondslagen

**Binnen EER:** Verwerking vindt uitsluitend plaats binnen de Europese Economische Ruimte. Geen aanvullende doorgiftegrondslag nodig.

**SCC (EU 2021/914):** De verwerker hanteert de Standaard Contractsbepalingen vastgesteld door de Europese Commissie op 4 juni 2021. Waar de verwerker ook over een adequaatheidsbesluit, bindende bedrijfsregels of een certificering onder het EU-VS Gegevensprivacyraamwerk beschikt, geldt die aanvullend.

> **Voor de jurist:** Controleer per partij of de SCC's daadwerkelijk zijn opgenomen in de verwerkersovereenkomst of de servicevoorwaarden, en of een Transfer Impact Assessment (TIA) vereist is gezien de toegang van autoriteiten in het betreffende land. Voor Anthropic (VS) en Slack (VS) is dit het meest relevant gezien de mogelijke reikwijdte van FISA 702 en vergelijkbare wetgeving.
